---
name: capturar-video
description: >
  Captura vídeo enviado pelo usuário (path local, link, screen-recording),
  extrai metadata (duração, resolução, codec), classifica nos 3 tipos paralelos
  da política `imagens.md` adaptada pra vídeo (bruto sagrado / evidência
  permanente / validação efêmera), oferece extração de áudio via
  `/transcribe-audio` quando aplicável, sugere destino + nome canônico, salva
  com metadata adjacente. Use sempre que o usuário enviar vídeo
  (.mp4/.mov/.webm/.avi/.mkv/.m4v), colar screen-recording, ou disser "captura
  esse vídeo", "/capturar-video", "salva essa gravação", "registra esse demo",
  "anota esse screen-recording". Auto-disparo opcional quando detectar vídeo
  no input do usuário sem comando explícito.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - AskUserQuestion
  - Skill
---

# Skill: `/capturar-video`

Ritual de captura de vídeo com classificação automática + salvamento canônico + ponte opcional pra transcrição.

## Quando disparar

**Triggers explícitos:**
- "/capturar-video"
- "captura esse vídeo" / "salva essa gravação" / "registra esse demo"
- "anota esse screen-recording" / "guarda esse vídeo" / "esse mp4"

**Triggers contextuais (auto-disparo proposto):**
- Usuário arrastou arquivo `.mp4/.mov/.webm/.avi/.mkv/.m4v` pra Claude Code
- Usuário menciona path absoluto/relativo de vídeo (`C:\...\demo.mp4`)
- Usuário cola link do YouTube/Loom/Vimeo/Google Drive de vídeo curto pessoal (não conteúdo público)
- Usuário responde a uma pergunta sua com referência a vídeo

**NÃO disparar quando:**
- Vídeo é referência pública longa (filme, palestra) — usar bookmark/link em `referencias/`
- Vídeo é output de `/ver` Playwright (já tem `--output-dir` próprio)
- Vídeo está sendo discutido apenas como ilustração (passa direto, não vira arquivo)

## Workflow 6 passos

### Passo 1 — Inspecionar metadata via `ffprobe` (ou `mediainfo`)

```bash
ffprobe -v quiet -print_format json -show_format -show_streams "<path>"
```

Extrair:
- **Duração** (segundos → mm:ss)
- **Resolução** (1920x1080, 2560x1440, etc)
- **Codec** (h264, hevc, vp9, av1)
- **Bitrate** (estimativa de qualidade)
- **Tem áudio?** (stream `codec_type=audio` presente)
- **Tamanho do arquivo** (bytes → MB)

Se `ffprobe` não estiver instalado, anunciar: `ffprobe ausente; instale via 'choco install ffmpeg' (Windows) / 'brew install ffmpeg' (Mac)`. Continuar com metadata mínima (tamanho + extensão).

### Passo 2 — Descrever conteúdo (best-effort)

Claude **não lê vídeo nativamente** — diferente da `/capturar-imagem`. Estratégias:

1. **Pedir descrição ao usuário em 1 frase** ("Sobre o que é o vídeo?")
2. **Extrair 1-3 frames-chave** via `ffmpeg` (início / meio / fim) → ler frames como imagem:
   ```bash
   ffmpeg -i "<video>" -vf "select='eq(n,0)+eq(n,N/2)+eq(n,N-1)'" -vsync vfr "frame-%03d.png"
   ```
3. **Se tem áudio**, sugerir `/transcribe-audio` (ver Passo 5)

Reportar:
- O que aparece nos frames (se extraídos)
- Provável intenção (demo? bug recording? gravação stakeholder? tutorial?)

### Passo 3 — Classificar nos 3 tipos

| Tipo | Quando | Onde salva | Commit? |
|---|---|---|---|
| **Bruto sagrado** | Vídeo de stakeholder (gravação reunião, demo cliente, video-call salvo) | `inbox-<stakeholder>/videos/<data>-<tema>.<ext>` OU `_negocio/contextos/<dominio>/raw/<data>-<tema>/` | ✅ Sim — **sagrado** |
| **Evidência permanente** | Screen-recording de bug, demo de feature, tutorial gravado | `mapeamento/evidencias/<data>/<tema>.<ext>` OU `docs/evidencias/` | ✅ Sim (mas ver §Tamanho) |
| **Validação efêmera** | Playwright screen-recording de teste E2E, gravação temporária pra verificar fluxo | `.playwright-mcp/` ou `tmp/` (gitignored) | ❌ Não |

**Atenção tamanho:** vídeo > 50MB no git polui clone. Para evidências grandes, considerar `git lfs` ou subir pra Google Drive/Vimeo privado e salvar **só** o link + metadata. Decisão fica com o usuário no Passo 4.

### Passo 4 — Confirmar tipo + nome + estratégia de armazenamento

`AskUserQuestion` com 4 opções de tipo (A/B/C/D) + 1 pergunta sobre armazenamento se tamanho > 50MB:

**Pergunta 1 — Tipo:**
- (A) Bruto sagrado — de stakeholder; **NUNCA edita depois**
- (B) Evidência permanente — documenta decisão/bug/feature
- (C) Validação efêmera — vai pra gitignored
- (D) Outra coisa — texto livre

**Pergunta 2 (condicional, só se > 50MB) — Armazenamento:**
- (A) Commitar local (vai inflar o repo) — só se < 100MB e crítico
- (B) Usar `git lfs` (precisa ter Git LFS instalado)
- (C) Subir pra Google Drive/Vimeo + salvar só o link no repo (recomendado p/ > 100MB)
- (D) Manter local fora do git (`.gitignored`) + link num arquivo `.md`

Nome canônico: `YYYY-MM-DD-<tema-curto-kebab>.<ext>` (mesmo padrão das imagens).

### Passo 5 — Oferecer extração de áudio + transcrição

Se vídeo tem stream de áudio (detectado no Passo 1):

`AskUserQuestion`:
> "Vídeo tem áudio. Quer extrair e transcrever via `/transcribe-audio` (faster-whisper local, 100% offline)?"
> - (A) Sim, extrai áudio + transcreve + salva transcript adjacente
> - (B) Sim, extrai áudio mas só salva `.mp3`/`.wav` (transcreve depois)
> - (C) Não, só salva o vídeo

Se (A) ou (B):
```bash
ffmpeg -i "<video>" -vn -acodec libmp3lame -q:a 4 "<video-sem-ext>.mp3"
```
Salva `.mp3` adjacente. Se (A), invoca skill `/transcribe-audio` com o `.mp3` → gera `.transcript.md`.

### Passo 6 — Salvar + metadata adjacente

Cria arquivo `.md` adjacente ao vídeo com metadata canônica:

```markdown
---
tipo: video
classificacao: bruto-sagrado | evidencia-permanente | validacao-efemera
data: 2026-05-20
origem: <stakeholder | usuario-direto | screen-recording | url>
duracao: <mm:ss>
resolucao: <WxH>
codec: <h264 | hevc | vp9 | av1>
tamanho_mb: <int>
tem_audio: true | false
armazenamento: local-git | git-lfs | link-externo | local-gitignored
url_externa: <opcional, se armazenamento=link-externo>
audio_extraido: true | false
transcript_path: <opcional, se transcript gerado>
tema: <tema/contexto>
descricao: <1-2 frases descrevendo o que aparece>
frames_chave:
  - <path frame 1 se extraído>
  - <path frame 2>
  - <path frame 3>
related:
  - <paths relacionados>
---

# <Título descritivo>

<contexto expandido + decisões associadas + timestamps relevantes se for vídeo longo>

## Timeline (opcional)

| Timestamp | Conteúdo |
|---|---|
| 00:00 | <intro> |
| 02:15 | <ponto-chave 1> |
| ... | ... |
```

### Passo 7 — Reportar (final)

Reporta:
- Path final do vídeo + tipo + estratégia de armazenamento
- Path da metadata adjacente
- Path do transcript (se gerado)
- Frames-chave extraídos (se houve)
- Próximos passos sugeridos (consultar transcript em /skill X / referenciar evidência em decisao Y / etc)

## Casos especiais

### Screen-recording de bug

- Tipo (B) Evidência permanente
- Destino: `mapeamento/evidencias/<data>/bug-<tema>.mp4`
- Metadata expandida: stack trace transcrita do áudio (se narrou) + componente afetado + passos pra reproduzir
- **Sempre extrair frames-chave** (início = estado pré-bug; meio = ação que dispara; fim = erro)

### Gravação de reunião com stakeholder

- Tipo (A) Bruto sagrado
- Destino: `inbox-<stakeholder>/videos/<data>-reuniao-<tema>.mp4`
- **NUNCA alterar** (regra-base 2)
- **Sempre oferecer transcrição** (Passo 5 opção A) — reuniões viram transcript pesquisável
- Metadata: participantes + decisões capturadas + ações geradas

### Demo de feature (próprio)

- Tipo (B) Evidência permanente
- Destino: `docs/demos/<feature>/<data>.mp4` OU `mapeamento/demos/`
- Útil pra showcase futuro, documentação, treinamento
- Metadata: feature documentada + versão do produto + roteiro

### Loom/Vimeo/YouTube privado

- Tipo (A) ou (B) dependendo da origem
- **Armazenamento (C) link-externo** sempre (vídeos hospedados não baixar)
- Salvar só `.md` com link + metadata + transcript (se disponível na plataforma)
- Se quiser baixar mesmo assim: `yt-dlp` (mas considerar storage)

### Playwright video output

- **NÃO usar `/capturar-video`** — Playwright tem `--output-dir` próprio (regra `.claude/rules/playwright-output-path.md`)
- Se vídeo precisar virar evidência permanente, mover manualmente após teste

### WhatsApp video (mp4 baixado de conversa)

- Tipo (A) Bruto sagrado (é stakeholder communication)
- Destino: `inbox-<stakeholder>/videos/<data>-<tema>.mp4`
- **Áudio quase sempre relevante** — oferecer transcrição
- Metadata: data conversa + interlocutor + decisão capturada

## Política irmã

- `politicas/imagens.md` — define 3 tipos canônicos (vídeo herda os mesmos)
- `.claude/rules/playwright-output-path.md` — Playwright nunca escreve na raiz
- `skills/transcribe-audio/` — pipeline de transcrição (faster-whisper offline)
- `skills/capturar-imagem/` — companheira pra imagem estática
- `skills/capturar/` — captura textual de stakeholder
- `skills/ver/` — Playwright UI cycle (caso de uso distinto)

## Limitações honestas

- **Claude não lê vídeo nativamente** — extração de frames + descrição manual é o workaround
- **Sem detecção de PII em vídeo** — se gravação contém CPF/cartão na tela, usuário deve recortar antes
- **Sem comparação de vídeos** — não detecta duplicatas via hash perceptual
- **Sem geração/edição de vídeo** — apenas captura/classificação/transcrição
- **`ffprobe`/`ffmpeg` requerido** pra metadata + frames + extração de áudio — skill degrada graciosamente se ausente (avisa + continua com metadata mínima)
- **`yt-dlp` requerido** se quiser baixar de YouTube/Vimeo — não default

## Critérios de PASS

1. Vídeo salvo no destino correto pela classificação
2. Metadata adjacente `.md` criada com formato canônico
3. Bruto sagrado **nunca** editado depois
4. Áudio extraído quando relevante (com confirmação do usuário)
5. Path retornado ao usuário pra referência futura
6. Skill responde em ≤3 turnos (inspeção + classificação + salvamento)
7. Em caso de vídeo > 50MB, estratégia de armazenamento confirmada com usuário
