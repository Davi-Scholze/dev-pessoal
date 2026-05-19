---
name: transcribe-audio
description: Transcreve arquivos de audio (WhatsApp .ogg/.opus, MP3, WAV, M4A) para texto em portugues usando faster-whisper local. 100% offline, zero custo, zero envio externo. TRIGGER quando o usuario passar caminho de arquivo de audio para entender/resumir/extrair texto, ou perguntar se voce consegue ouvir/entender audios.
---

> **Bundled via vendoring (2026-05-18)** — origem: `~/.claude/skills/transcribe-audio/` (License: MIT, declarado em "Custo: Zero. Modelo MIT, ffmpeg LGPL, faster-whisper MIT"). Re-implementação verbatim preservada com atribuição obrigatória. Ver `manifest.yaml` desta pasta + `LICENSES.md` na raiz do KODAI.

# Skill: Transcribe Audio (faster-whisper local)

Transcreve audios localmente usando o modelo `faster-whisper` (variante otimizada do Whisper da OpenAI). Roda 100% offline, sem custo, sem enviar dados pra internet. Ideal para audios de WhatsApp, gravacoes de reuniao, podcasts, etc.

## Quando usar

- Usuario passa caminho(s) de arquivo de audio (.ogg, .opus, .mp3, .wav, .m4a, .flac, .aac)
- Usuario pergunta "voce consegue ouvir/entender audio?"
- Usuario pede pra "transcrever / resumir / entender" um audio
- Audios de WhatsApp em qualquer formato

## Quando NAO usar

- Video files (mp4, mov) — o usuario pode quere o audio do video, mas confirme antes de extrair
- Streaming/URL ao vivo — esta skill so transcreve arquivo local
- Idiomas exoticos sem confirmacao — default e portugues; perguntar se for outro

## Pre-requisitos

### Software necessario

1. **Python 3.10+** com `pip`
2. **ffmpeg** no PATH (para decodificar .ogg/.opus/.m4a etc)
3. **faster-whisper** instalado via pip

Detalhes de instalacao em [scripts/install.md](scripts/install.md).

### Verificacao rapida

```bash
python --version           # >= 3.10
ffmpeg -version | head -1  # qualquer versao recente
pip show faster-whisper    # >= 1.0
```

Se faltar algo, siga `scripts/install.md` antes de tentar transcrever.

## Modelos disponiveis (ordem de qualidade)

| Modelo | Tamanho | RAM | Quando usar |
|---|---|---|---|
| `tiny` | ~75MB | 1GB | Teste rapido, qualidade baixa |
| `base` | ~145MB | 1GB | Audio simples, sem ruido |
| **`small`** | ~485MB | 2GB | **Default — equilibrio bom** |
| `medium` | ~1.5GB | 5GB | Sotaque/audio ruim, termos proprios |
| `large-v3` | ~3GB | 10GB | Maxima qualidade |

Recomendacao: comecar com `small`. Escalar para `medium` se a transcricao trocar termos proprios ou perder palavras.

## Fluxo de execucao

### Passo 1 — Verificar ambiente

```bash
ffmpeg -version | head -1
pip show faster-whisper
```

Se faltar algo, instalar conforme [install.md](scripts/install.md). Pedir OK do usuario antes de instalar (eh modificacao no ambiente local dele).

### Passo 2 — Confirmar arquivos e idioma

Listar os audios que vai transcrever, confirmar com o usuario:
- Quantos arquivos
- Tamanho de cada
- Idioma (default `pt`)
- Modelo a usar (default `small`)

### Passo 3 — Rodar o script

```bash
python scripts/transcribe.py \
  --model small \
  --language pt \
  "caminho/para/audio1.ogg" \
  "caminho/para/audio2.ogg"
```

Opcoes:
- `--model {tiny,base,small,medium,large-v3}` — default `small`
- `--language pt` — default `pt`
- `--prompt "contexto"` — texto livre para guiar termos proprios (nomes, jargão)
- `--save-txt` — default true; salva `<audio>.txt` ao lado do arquivo

### Passo 4 — Apresentar resultado

Para cada audio, apresentar ao usuario:
- Duracao detectada
- Idioma detectado + confianca
- Transcricao com timestamps `[XX.Xs]` por segmento
- Caminho do `.txt` salvo

### Passo 5 — Acoes pos-transcricao (sob pedido)

- **Resumir:** sintese do conteudo em bullets curtos
- **Extrair acoes:** lista de tarefas/decisoes mencionadas
- **Identificar interlocutores:** se houver indicios
- **Salvar em doc:** se o projeto tiver pasta de notas/decisoes

Nunca fazer essas acoes automaticamente — perguntar ao usuario o que ele quer com a transcricao.

## Exemplo de uso

```
Usuario: "Transcreve esses 3 audios pra mim"

Claude:
1. Verifica ffmpeg + faster-whisper
2. Confirma: 3 arquivos OGG, ~5min total, modelo small
3. Roda: python scripts/transcribe.py --model small --language pt "audio1.ogg" "audio2.ogg" "audio3.ogg"
4. Apresenta transcricao + caminho dos .txt
5. Pergunta o que fazer com o resultado
```

## Notas de qualidade

### Termos proprios trocados

Whisper pode trocar nomes proprios e termos da empresa por palavras foneticamente parecidas. Mitigacao:

1. **Reler com modelo maior** (`medium` ou `large-v3`)
2. **Passar contexto via `--prompt`**, ex:
   ```
   --prompt "Conversa entre Pablo e Davi sobre TrackOps, Transpossegue, Navortech, OmniSmart, Field Control, RedGPS"
   ```
3. **Editar manualmente** com base no entendimento — Whisper pode errar palavras isoladas mas raramente erra o sentido

### Audio ruim / barulho de fundo

- Tentar `medium`
- Pedir VAD (`vad_filter=True` no script — ja eh padrao)
- Se persistir, pedir ao usuario reenvio com audio melhor

### Idioma misto (PT + EN)

Whisper detecta o predominante e tenta traduzir o resto. Para conversas em ingles tecnico misturadas com portugues, especificar `--language pt` forca tudo para portugues; ou `--language en` se predominar ingles.

## Privacidade & seguranca

- 100% local — nada vai pra internet apos download do modelo
- Modelos ficam em `~/.cache/huggingface/hub/models--Systran--faster-whisper-{size}/`
- Audios de origem nao sao modificados
- `.txt` gerado fica na mesma pasta do audio — usuario decide se commita ou apaga

## Custo

Zero. Modelo MIT, ffmpeg LGPL, faster-whisper MIT. Nada de API, nada de cobrança.

## Limitacoes

- CPU-only por default (sem GPU): ~30-60s de processamento por minuto de audio com modelo `small`
- Em GPU NVIDIA com CUDA configurado: 5-10x mais rapido
- Nao faz diarizacao (separar quem falou) — usar pyannote se precisar

## Customizacao por projeto

Se o projeto tiver vocabulario muito especifico, criar arquivo `.transcribe-prompt` na raiz do projeto com termos para passar via `--prompt`. Ex:

```
# .transcribe-prompt
TrackOps, Transpossegue, Navortech, Pablo, Davi, OmniSmart, Field Control, RedGPS, BWS, espelhamento, cooperado
```

Skill le esse arquivo automaticamente se existir no diretorio atual.
