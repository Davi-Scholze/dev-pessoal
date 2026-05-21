#!/usr/bin/env python3
"""
absorver-midia — orquestrador Python

Pipeline:
  1. Pré-flight (detectar URL vs path, validar deps)
  2. Download (yt-dlp se URL)
  3. Áudio + transcrição (via /transcribe-audio)
  4. Frames-chave (ffmpeg scene-change)
  5. Descrição multimodal (Claude vision — feito pelo wrapper LLM, não aqui)
  6. Síntese estruturada (Claude — feito pelo wrapper LLM, não aqui)
  7. Manifest + event log + reporte

Este script roda Fases 1-4 (deterministic CLI). Fases 5-6 são produzidas
pelo agente Claude (multimodal + síntese semântica) consumindo os artefatos
deste script.

Status: SKELETON — não testado contra mídia real ainda. Promove a FUNCIONAL
quando piloto contra 3 mídias reais passar.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


# -------------------- Utilitários --------------------


def check_dep(cmd: str) -> bool:
    """Confere se uma CLI está no PATH."""
    return shutil.which(cmd) is not None


def run(cmd: list[str], cwd: Path | None = None, check: bool = True) -> subprocess.CompletedProcess:
    """Wrapper de subprocess.run com defaults sensatos."""
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, check=check)


def slugify(text: str, max_len: int = 50) -> str:
    """Slug kebab-case minúsculo sem acento."""
    import re
    import unicodedata

    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text[:max_len] or "sem-titulo"


def today() -> str:
    return datetime.now(timezone.utc).date().isoformat()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# -------------------- Fase 1 — Pré-flight --------------------


def preflight(source: str) -> dict:
    """Detecta URL vs path local. Valida deps mínimas."""
    is_url = source.startswith(("http://", "https://", "www."))

    deps_required = ["ffmpeg", "ffprobe"]
    if is_url:
        deps_required.append("yt-dlp")

    missing = [d for d in deps_required if not check_dep(d)]
    if missing:
        raise RuntimeError(
            f"Dependências faltando no PATH: {missing}. "
            f"Instale antes de prosseguir: yt-dlp via pip, ffmpeg via package manager."
        )

    if not is_url:
        path = Path(source)
        if not path.exists():
            raise RuntimeError(f"Arquivo local não existe: {source}")
        if path.suffix.lower() not in (
            ".mp4", ".mov", ".webm", ".avi", ".mkv", ".m4v",
            ".mp3", ".wav", ".m4a", ".opus", ".ogg",
            ".jpg", ".jpeg", ".png", ".webp", ".heic",
        ):
            raise RuntimeError(f"Formato não suportado: {path.suffix}")

    return {"is_url": is_url, "source": source}


# -------------------- Fase 2 — Download (se URL) --------------------


def download(source: str, inbox_dir: Path) -> Path:
    """Baixa mídia via yt-dlp. Retorna path do arquivo principal."""
    inbox_dir.mkdir(parents=True, exist_ok=True)
    out_template = str(inbox_dir / "source.%(ext)s")

    cmd = [
        "yt-dlp",
        "--output", out_template,
        "--format", "best[ext=mp4]/best",
        "--write-info-json",
        "--write-thumbnail",
        "--write-subs", "--sub-langs", "pt,en",
        "--no-playlist",
        source,
    ]
    run(cmd)

    # Localizar arquivo baixado (varia por extensão)
    candidates = list(inbox_dir.glob("source.*"))
    main = next(
        (p for p in candidates if p.suffix.lower() in (".mp4", ".mkv", ".webm", ".m4a", ".mp3")),
        None,
    )
    if not main:
        raise RuntimeError(f"yt-dlp baixou mas não achei arquivo principal em {inbox_dir}")
    return main


def get_metadata(source_info_json: Path) -> dict:
    """Extrai metadata do .info.json gerado pelo yt-dlp."""
    if not source_info_json.exists():
        return {}
    data = json.loads(source_info_json.read_text(encoding="utf-8"))
    return {
        "title": data.get("title", ""),
        "uploader": data.get("uploader", ""),
        "upload_date": data.get("upload_date", ""),
        "duration": data.get("duration", 0),
        "description": data.get("description", "")[:500],
        "webpage_url": data.get("webpage_url", ""),
    }


# -------------------- Fase 3 — Áudio + transcrição --------------------


def extract_audio(source_path: Path, audio_path: Path) -> Path:
    """Extrai áudio em opus 32kbps. Retorna path do áudio."""
    # Se já é áudio puro, copia
    if source_path.suffix.lower() in (".mp3", ".wav", ".m4a", ".opus", ".ogg"):
        shutil.copy(source_path, audio_path.with_suffix(source_path.suffix))
        return audio_path.with_suffix(source_path.suffix)

    cmd = [
        "ffmpeg", "-y",
        "-i", str(source_path),
        "-vn",
        "-acodec", "libopus",
        "-b:a", "32k",
        str(audio_path),
    ]
    run(cmd)
    return audio_path


def transcribe(audio_path: Path, transcript_path: Path, engine: str = "local") -> Path:
    """Invoca /transcribe-audio internamente."""
    if engine == "local":
        # Localiza script da skill transcribe-audio — procura local primeiro
        # (propagada em .claude/skills/ da pasta-mae), depois global (~/.claude/skills/)
        candidate_dirs = [
            Path.cwd() / ".claude" / "skills" / "transcribe-audio" / "scripts",
            Path.home() / ".claude" / "skills" / "transcribe-audio" / "scripts",
        ]
        transcribe_script = None
        for skill_dir in candidate_dirs:
            cand = skill_dir / "transcribe.py"
            if cand.exists():
                transcribe_script = cand
                break
        if transcribe_script is None:
            raise RuntimeError(
                f"Skill /transcribe-audio não localizada em nenhum dos: {[str(d) for d in candidate_dirs]}. "
                f"Instalar antes de usar absorver-midia."
            )

        # Invoca via subprocess
        # transcribe.py salva <audio>.txt automaticamente; movemos pra transcript_path depois.
        cmd = [
            sys.executable,
            str(transcribe_script),
            str(audio_path),
            "--language", "pt",
            "--no-context-file",  # nao puxa .transcribe-prompt da raiz da pasta-mae
        ]
        run(cmd)
        # transcribe_script gera <audio>.txt — copia conteudo pra transcript_path em md
        auto_txt = audio_path.with_suffix(".txt")
        if auto_txt.exists():
            transcript_path.write_text(auto_txt.read_text(encoding="utf-8"), encoding="utf-8")
        else:
            raise RuntimeError(f"transcribe.py nao gerou {auto_txt} — verificar")
    elif engine == "cloud-whisper":
        raise NotImplementedError("engine=cloud-whisper ainda não implementado — usar local")
    elif engine == "gemini":
        raise NotImplementedError("engine=gemini ainda não implementado — usar local")
    else:
        raise RuntimeError(f"Engine desconhecido: {engine}")

    return transcript_path


# -------------------- Fase 4 — Frames-chave --------------------


def extract_frames(source_path: Path, frames_dir: Path, max_frames: int = 15) -> list[Path]:
    """Extrai frames-chave via ffmpeg scene-change. Retorna lista de paths."""
    # Skip pra áudio puro ou imagem
    if source_path.suffix.lower() not in (".mp4", ".mov", ".webm", ".avi", ".mkv", ".m4v"):
        return []

    # Verifica duração — pula vídeos < 30s
    duration = get_video_duration(source_path)
    if duration < 30:
        return []

    frames_dir.mkdir(parents=True, exist_ok=True)
    out_template = str(frames_dir / "frame-%03d.jpg")

    cmd = [
        "ffmpeg", "-y",
        "-i", str(source_path),
        "-vf", "select='gt(scene,0.4)',scale=640:-1",
        "-vsync", "vfr",
        "-frames:v", str(max_frames),
        out_template,
    ]
    run(cmd)

    return sorted(frames_dir.glob("frame-*.jpg"))


def get_video_duration(source_path: Path) -> float:
    """Duração em segundos via ffprobe."""
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(source_path),
    ]
    result = run(cmd)
    try:
        return float(result.stdout.strip())
    except ValueError:
        return 0.0


# -------------------- Fase 7 — Manifest + event log --------------------


def write_manifest(inbox_dir: Path, payload: dict) -> Path:
    """Escreve manifest.yaml estruturado."""
    manifest_path = inbox_dir / "manifest.yaml"
    lines = ["type: midia-absorvida"]
    for k, v in payload.items():
        if isinstance(v, list):
            lines.append(f"{k}:")
            for item in v:
                lines.append(f"  - {item}")
        elif isinstance(v, dict):
            lines.append(f"{k}:")
            for sk, sv in v.items():
                lines.append(f"  {sk}: {sv}")
        else:
            lines.append(f"{k}: {v}")
    manifest_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return manifest_path


def log_event(workspace_root: Path, skill: str, action: str, **fields) -> None:
    """Append em logs/events.ndjson (politica event-log-ndjson)."""
    log_path = workspace_root / "logs" / "events.ndjson"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    event = {"timestamp": now_iso(), "skill": skill, "action": action, **fields}
    with log_path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(event, ensure_ascii=False) + "\n")


# -------------------- Main --------------------


def main():
    parser = argparse.ArgumentParser(
        description="absorver-midia — orquestrador multimodal (URL/arquivo → contexto sintetizado)"
    )
    parser.add_argument("source", help="URL externa OU path local de mídia")
    parser.add_argument("--tema", help="slug pra nome do inbox (auto se URL)")
    parser.add_argument(
        "--autoria",
        choices=["propria", "externa", "cliente"],
        required=True,
        help="Origem do material (afeta absorção downstream)",
    )
    parser.add_argument("--max-frames", type=int, default=15)
    parser.add_argument("--max-duration-min", type=int, default=0, help="0 = sem corte")
    parser.add_argument(
        "--engine",
        choices=["local", "cloud-whisper", "gemini"],
        default="local",
    )
    parser.add_argument(
        "--workspace-root",
        type=Path,
        default=Path.cwd(),
        help="raiz do workspace (pra inbox-davi/ + logs/)",
    )
    args = parser.parse_args()

    # Fase 1 — pré-flight
    preflight_result = preflight(args.source)

    # Determinar inbox-dir
    tema = args.tema or slugify(args.source.split("/")[-1] or "midia")
    inbox_dir = args.workspace_root / "inbox-davi" / f"{today()}-{tema}"
    inbox_dir.mkdir(parents=True, exist_ok=True)

    log_event(
        args.workspace_root,
        skill="absorver-midia",
        action="start",
        source=args.source[:200],
        autoria=args.autoria,
        inbox=str(inbox_dir.relative_to(args.workspace_root)),
    )

    try:
        # Fase 2 — download (se URL)
        if preflight_result["is_url"]:
            source_path = download(args.source, inbox_dir)
            info_json = inbox_dir / "source.info.json"
            metadata = get_metadata(info_json)
        else:
            source_path = Path(args.source)
            # copia pro inbox pra manter raw sagrado lá
            local_copy = inbox_dir / f"source{source_path.suffix}"
            shutil.copy(source_path, local_copy)
            source_path = local_copy
            metadata = {
                "title": source_path.stem,
                "duration": get_video_duration(source_path) if source_path.suffix.lower() in (".mp4", ".mov", ".webm", ".avi", ".mkv", ".m4v") else 0,
            }

        # Fase 3 — áudio + transcrição
        audio_path = inbox_dir / "audio.opus"
        try:
            audio_path = extract_audio(source_path, audio_path)
        except subprocess.CalledProcessError:
            # Imagem pura — pula transcrição
            audio_path = None

        transcript_path = inbox_dir / "transcript.md"
        if audio_path:
            transcribe(audio_path, transcript_path, engine=args.engine)

        # Fase 4 — frames-chave (só vídeo)
        frames_dir = inbox_dir / "frames"
        frames = extract_frames(source_path, frames_dir, max_frames=args.max_frames)

        # Fase 7 — manifest
        payload = {
            "source": args.source[:300],
            "autor": metadata.get("uploader", "desconhecido") if args.autoria == "externa" else "proprio",
            "autoria": args.autoria,
            "tema_slug": tema,
            "data_captura": now_iso(),
            "duracao_sec": int(metadata.get("duration", 0)),
            "artifacts": [
                f"source: {source_path.name}",
                f"transcript: {transcript_path.name if audio_path else 'N/A'}",
                f"frames_count: {len(frames)}",
                f"audio: {audio_path.name if audio_path else 'N/A'}",
            ],
            "status": "synthesized-pending-absorption",
            "proximo_passo": "Claude lê este manifest + transcript + frames → produz sintese.md + sugere skill absorção",
        }
        manifest_path = write_manifest(inbox_dir, payload)

        log_event(
            args.workspace_root,
            skill="absorver-midia",
            action="complete",
            status="ok",
            inbox=str(inbox_dir.relative_to(args.workspace_root)),
            frames=len(frames),
            duracao_sec=payload["duracao_sec"],
        )

        # Reporte
        print(f"\n✓ /absorver-midia concluída (Fases 1-4 + 7)")
        print(f"Inbox: {inbox_dir}")
        print(f"Artefatos: source + transcript + {len(frames)} frames + manifest")
        print(f"\nPróximo passo: Claude consome este inbox pra gerar:")
        print(f"  - frames/descriptions.md (descrição multimodal — Fase 5)")
        print(f"  - sintese.md (síntese estruturada — Fase 6)")
        print(f"E sugere skill de absorção: /absorver-contexto | /absorver-referencia | /capturar-contexto-cliente")
        return 0

    except Exception as e:
        log_event(
            args.workspace_root,
            skill="absorver-midia",
            action="error",
            status="error",
            error_type=type(e).__name__,
            error_message=str(e)[:300],
        )
        print(f"❌ Erro: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
