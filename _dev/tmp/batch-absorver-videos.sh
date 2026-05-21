#!/usr/bin/env bash
# Batch /absorver-midia em série pros 5 vídeos do pacote Davi 2026-05-21.
# Inclui vídeo 1 que falhou na primeira tentativa (erro path /transcribe-audio — patched).

set -uo pipefail  # NÃO usa -e pra continuar mesmo se um vídeo falhar

# Garantir ffmpeg no PATH (sessão atual não recarrega user PATH)
export PATH="/c/Users/usuario/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin:$PATH"

cd "/c/Users/usuario/Documents/Projetos Dev Pessoais"

# Limpa inboxes parciais (download + extração feitos, mas sem transcript/frames/manifest)
rm -rf inbox-davi/2026-05-21-qpl8-lqquf4 inbox-davi/2026-05-21-ifpsw14vfzs

VIDEOS=(
    "https://www.youtube.com/live/QpL8_lQquf4"
    "https://youtu.be/IfPSw14VfZs"
    "https://youtu.be/mVN2Q_EUPwE"
    "https://youtu.be/69XDrNFXNco"
    "https://youtu.be/u0njPG-rXj8"
)

LOG_DIR="_dev/tmp/batch-logs"
mkdir -p "$LOG_DIR"

echo "===== Batch /absorver-midia 2026-05-21 ====="
echo "5 vídeos em série. Log: $LOG_DIR/"
echo ""

for i in "${!VIDEOS[@]}"; do
    n=$((i + 1))  # vídeo 1..5
    url="${VIDEOS[$i]}"
    log="$LOG_DIR/video-${n}.log"

    echo "[$(date '+%H:%M:%S')] Vídeo $n/5 iniciando: $url"
    echo "Log: $log"

    python .claude/skills/absorver-midia/scripts/run.py "$url" --autoria externa > "$log" 2>&1
    exit_code=$?

    if [ $exit_code -eq 0 ]; then
        echo "[$(date '+%H:%M:%S')] Vídeo $n: OK"
    else
        echo "[$(date '+%H:%M:%S')] Vídeo $n: FALHOU (exit $exit_code) — ver $log"
    fi
    echo ""
done

echo "===== Batch concluído ====="
ls -la inbox-davi/2026-05-21-* 2>&1 | head -30
