# Setup do ambiente — transcribe-audio

Guia para preparar a maquina pra rodar a skill `transcribe-audio` em qualquer projeto.

## Resumo das dependencias

| Item | Por que precisa | Onde instalar |
|---|---|---|
| Python 3.10+ | Roda o script | sistema |
| ffmpeg | Decodifica .ogg/.opus/.m4a | PATH do sistema |
| faster-whisper | Modelo de transcricao | venv do Python ou global |

Custo total: zero. Disco: ~600MB para o modelo `small`. RAM em uso: ~2GB durante transcricao.

## Windows

### 1. Python

Verifique se ja tem:

```bash
python --version
```

Se < 3.10 ou nao instalado, baixe em https://www.python.org/downloads/ e marque "Add Python to PATH" no instalador.

### 2. ffmpeg

#### Opcao A — winget (recomendado)

```powershell
winget install --id=Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements --silent
```

Pode demorar alguns minutos. Apos finalizar, abra **um novo terminal** para o PATH atualizar.

#### Opcao B — manual (se winget falhar)

```powershell
# Baixar
$url = "https://github.com/GyanD/codexffmpeg/releases/download/8.1/ffmpeg-8.1-essentials_build.zip"
Invoke-WebRequest -Uri $url -OutFile "$env:USERPROFILE\ffmpeg.zip"

# Extrair
Expand-Archive -Path "$env:USERPROFILE\ffmpeg.zip" -DestinationPath "$env:USERPROFILE\ffmpeg" -Force

# Adicionar ao PATH do usuario
$ffmpegBin = "$env:USERPROFILE\ffmpeg\ffmpeg-8.1-essentials_build\bin"
[System.Environment]::SetEnvironmentVariable(
  "PATH",
  "$ffmpegBin;" + [System.Environment]::GetEnvironmentVariable("PATH", "User"),
  "User"
)
```

Abrir um novo terminal e validar:

```bash
ffmpeg -version
```

### 3. faster-whisper

```bash
pip install faster-whisper
```

Validar:

```bash
pip show faster-whisper
```

Deve aparecer `Version: 1.x`.

## macOS

```bash
# ffmpeg
brew install ffmpeg

# faster-whisper
pip3 install faster-whisper
```

## Linux (Debian/Ubuntu)

```bash
sudo apt update
sudo apt install -y ffmpeg python3-pip
pip3 install faster-whisper
```

## Teste rapido

Apos instalar tudo, rodar:

```bash
python -c "from faster_whisper import WhisperModel; print('OK')"
ffmpeg -version | head -1
```

Se ambos funcionarem, a skill esta pronta. O modelo sera baixado automaticamente na primeira transcricao (~485MB para `small`, fica em `~/.cache/huggingface/`).

## Problemas comuns

### "ffmpeg: command not found" mesmo apos instalar

PATH nao atualizado. Abrir um novo terminal. Em alguns casos no Windows, pode ser necessario reiniciar o VS Code ou fazer logout/login.

### "torch wheel nao disponivel para Python X.Y"

`faster-whisper` usa CTranslate2 (nao depende de PyTorch). Se aparecer erro de torch, e provavelmente algum projeto tendo conflito. Usar venv isolada:

```bash
python -m venv ~/.venv-transcribe
source ~/.venv-transcribe/bin/activate   # Windows: ~/.venv-transcribe/Scripts/activate
pip install faster-whisper
```

### Download do modelo trava

Verificar conexao. Em rede lenta, pode levar 5-10min para baixar 485MB. Apos baixar, transcricoes posteriores sao instantaneas (modelo fica em cache).

### Modelo carrega mas transcricao demora muito

CPU-only e o esperado: ~30-60s por minuto de audio em modelo `small`. Para acelerar 5-10x, configurar GPU NVIDIA com CUDA — fora do escopo deste guia.

### Erro de encoding no Windows

Sempre rodar com `PYTHONIOENCODING=utf-8`:

```bash
PYTHONIOENCODING=utf-8 python scripts/transcribe.py "audio.ogg"
```
