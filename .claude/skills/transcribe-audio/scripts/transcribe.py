"""
Skill transcribe-audio - script reutilizavel.

Transcreve um ou mais audios para texto usando faster-whisper local.
100% offline, zero custo.

Uso:
    python transcribe.py [opcoes] <arquivo1> [arquivo2 ...]

Opcoes:
    --model {tiny,base,small,medium,large-v3}  default: small
    --language LANG                             default: pt
    --prompt "TEXTO"                            contexto para termos proprios
    --no-save-txt                               nao gerar .txt ao lado do audio
    --no-context-file                           ignorar .transcribe-prompt da pasta atual
"""
from __future__ import annotations

import argparse
import io
import sys
from pathlib import Path

try:
    from faster_whisper import WhisperModel
except ImportError:
    print("ERRO: faster-whisper nao esta instalado.", file=sys.stderr)
    print("Instale com: pip install faster-whisper", file=sys.stderr)
    sys.exit(2)


def carregar_prompt_do_projeto(usar_arquivo: bool) -> str:
    """Le .transcribe-prompt da pasta atual se existir, retorna conteudo."""
    if not usar_arquivo:
        return ""
    arquivo = Path.cwd() / ".transcribe-prompt"
    if arquivo.exists():
        return arquivo.read_text(encoding="utf-8").strip()
    return ""


def transcrever(
    audios: list[str],
    modelo: str,
    idioma: str,
    prompt_contexto: str,
    salvar_txt: bool,
) -> int:
    """Transcreve a lista de audios. Retorna 0 se tudo OK, 1 se algum falhou."""
    falhou = False

    print(f"Carregando modelo {modelo} (download na 1a vez)...", flush=True)
    model = WhisperModel(modelo, device="cpu", compute_type="int8")
    print("Modelo carregado.\n", flush=True)

    for caminho in audios:
        nome = Path(caminho).name
        print(f"=== {nome} ===", flush=True)
        if not Path(caminho).exists():
            print("[ARQUIVO NAO ENCONTRADO]\n", flush=True)
            falhou = True
            continue

        try:
            segmentos, info = model.transcribe(
                caminho,
                language=idioma,
                beam_size=5,
                initial_prompt=prompt_contexto or None,
                vad_filter=True,
            )
            print(
                f"[duracao: {info.duration:.1f}s | "
                f"idioma: {info.language} ({info.language_probability:.0%})]",
                flush=True,
            )

            texto_completo: list[str] = []
            for seg in segmentos:
                linha = f"[{seg.start:6.1f}s] {seg.text.strip()}"
                print(linha, flush=True)
                texto_completo.append(seg.text.strip())

            if salvar_txt:
                txt_path = Path(caminho).with_suffix(".txt")
                txt_path.write_text(" ".join(texto_completo), encoding="utf-8")
                print(f"-> salvo em {txt_path}", flush=True)

            print("", flush=True)
        except Exception as exc:
            print(f"[ERRO ao transcrever]: {exc}\n", flush=True)
            falhou = True

    return 1 if falhou else 0


def main() -> int:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

    parser = argparse.ArgumentParser(
        description="Transcreve audios para texto via faster-whisper local",
    )
    parser.add_argument("audios", nargs="+", help="Caminhos dos audios a transcrever")
    parser.add_argument(
        "--model",
        default="small",
        choices=["tiny", "base", "small", "medium", "large-v3"],
        help="Modelo Whisper (default: small)",
    )
    parser.add_argument(
        "--language",
        default="pt",
        help="Codigo do idioma (default: pt)",
    )
    parser.add_argument(
        "--prompt",
        default="",
        help="Texto de contexto para guiar termos proprios",
    )
    parser.add_argument(
        "--no-save-txt",
        action="store_true",
        help="Nao salvar .txt ao lado do audio",
    )
    parser.add_argument(
        "--no-context-file",
        action="store_true",
        help="Ignorar arquivo .transcribe-prompt da pasta atual",
    )
    args = parser.parse_args()

    prompt_arquivo = carregar_prompt_do_projeto(not args.no_context_file)
    prompt_final = " ".join(filter(None, [prompt_arquivo, args.prompt])).strip()

    if prompt_final:
        print(f"Contexto: {prompt_final[:120]}{'...' if len(prompt_final) > 120 else ''}\n", flush=True)

    return transcrever(
        audios=args.audios,
        modelo=args.model,
        idioma=args.language,
        prompt_contexto=prompt_final,
        salvar_txt=not args.no_save_txt,
    )


if __name__ == "__main__":
    sys.exit(main())
