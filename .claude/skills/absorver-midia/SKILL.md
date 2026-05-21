---
name: absorver-midia
description: >
  Orquestrador multimodal universal — ingere mídia (URL YouTube/Instagram/Vimeo/
  Twitter/LinkedIn/etc OU arquivo local de vídeo/áudio/imagem) e produz
  contexto sintetizado pronto pra absorção no KOD.AI. Pipeline: download (yt-dlp)
  → áudio extraído + transcrito (faster-whisper local via /transcribe-audio) →
  frames-chave (ffmpeg scene-change) → descrição multimodal (Claude vision) →
  síntese estruturada (narrativa + decisões + tópicos) → inbox-davi/<data>-<tema>/
  pronto pra /absorver-contexto OU /absorver-referencia. Use sempre que disser
  "absorve esse vídeo", "/absorver-midia <url>", "transcreve essa reunião",
  "absorve esse YouTube/Instagram/podcast", "captura esse vídeo gravado",
  "preciso virar contexto esse áudio/vídeo".
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion

tier: employee
reports_to: null

version: 0.1.0
status: DRAFT

handoff_in:
  required:
    source: "URL externa (YouTube/Instagram/Vimeo/etc) OU path local de mídia"
  optional:
    tema: "slug curto pro nome da pasta inbox (auto se ausente — usa título do vídeo)"
    autoria: "propria | externa (auto-pergunta se ausente — externa força protocolo REFERENCE-ABSORB)"
    max_frames: "cap de frames extraídos (default 15)"
    max_duration_min: "cortar vídeo se > X minutos (default sem corte)"
    engine_transcribe: "local (default faster-whisper) | cloud-whisper | gemini"

handoff_out:
  produces:
    inbox_path: "inbox-davi/<YYYY-MM-DD>-<tema-slug>/"
    transcript: "transcript.md com timestamps"
    frames: "frames/<N>.jpg + frames/descriptions.md"
    sintese: "sintese.md com narrativa + decisões + tópicos + sugestão de absorção"
    manifest: "manifest.yaml com metadata"
  paths:
    - "inbox-davi/<YYYY-MM-DD>-<tema-slug>/"

quality_gates:
  - "Source (URL ou path) validado antes de download"
  - "Autoria (própria/externa) confirmada antes de absorção"
  - "Transcript completo gerado (não vazio)"
  - "Mínimo 3 frames-chave extraídos (vídeos > 30s)"
  - "Síntese tem: narrativa, decisões, tópicos, sugestão de bucket"
  - "Manifest.yaml com source + autor + data + duração"
  - "Material externo: anti-pollution flag levantado pra trechos verbatim"

requires:
  blocking:
    - "yt-dlp instalado (pip install yt-dlp)"
    - "ffmpeg + ffprobe no PATH"
    - "Skill /transcribe-audio disponível"
  recommended:
    - "Workspace tem inbox-<stakeholder>/ (cria se não tiver)"
    - "logs/events.ndjson existe (event log)"
---

# Skill: `/absorver-midia`

Orquestrador único pra ingerir qualquer mídia (URL ou arquivo) → produzir contexto sintetizado em inbox pronto pra próxima absorção (com gate humano).

## Princípio

> **Mídia bruta vira contexto sintetizado em inbox, não vira pack/contexto direto.** Síntese estruturada + transcript completo + frames descritos ficam disponíveis pro humano decidir o próximo passo (`/absorver-contexto`, `/absorver-referencia`, `/capturar-contexto-cliente`, ou só arquivar).

Conexão com estrela polar: KOD.AI "vê" reuniões, vídeos, podcasts — extrai sinal alto, descarta ruído, propõe onde ancorar. Sem orquestrador único, peças soltas (`/transcribe-audio`, `/capturar-video`, `/capturar-imagem`) não conversam.

## Quando disparar

**Triggers explícitos:**
- "/absorver-midia <url-ou-path>"
- "absorve esse vídeo" + (URL ou path em seguida)
- "transcreve essa reunião" + path
- "vira contexto esse YouTube/podcast"
- "captura esse Instagram/Reels"

**Triggers contextuais:**
- Usuário cola URL `youtube.com/watch?v=...`, `instagram.com/reel/...`, `vimeo.com/...`, `linkedin.com/posts/...`, etc com instrução de absorção
- Usuário aponta arquivo `.mp4/.mov/.webm/.mp3/.wav/.m4a/.opus` com instrução de absorção
- Pipeline `/auditar-projeto` detecta mídia em projeto consumidor que vale absorver

**NÃO disparar:**
- Mídia trivial sem valor de contexto (vídeo demo de 30s, áudio de "ok"/"obrigado")
- URL sem instrução explícita (usuário só compartilhando)
- Material com copyright restrito explícito (DRM, paywall que não autoriza re-uso)

## Workflow (7 fases)

### Fase 1 — Pré-flight

1. **Detectar tipo de input:**
   - URL → resolver via yt-dlp (`yt-dlp --simulate <url>` checa se suportado)
   - Path local → checar arquivo existe + formato suportado (`.mp4/.mov/.webm/.avi/.mkv/.m4v/.mp3/.wav/.m4a/.opus/.ogg`)

2. **Validar dependências:**
   - `yt-dlp --version` (se URL)
   - `ffmpeg -version` + `ffprobe -version`
   - Existência de `/transcribe-audio` skill

3. **Perguntar autoria** (gate humano):
   ```
   AskUserQuestion:
     "Esse material é:"
     - (A) Próprio (seu / da sua empresa / equipe)
     - (B) Externo (YouTube de outro autor, podcast público, etc)
     - (C) Cliente (gravação de reunião com cliente — usa fluxo cliente)
   ```
   - Se (B): forçar protocolo `REFERENCE-ABSORB.md` no fim (anti-pollution + atribuição)
   - Se (C): bridge pra `/capturar-contexto-cliente` no fim

4. **Identificar tema/slug:**
   - URL: usar título extraído via `yt-dlp --get-title` → slugificar
   - Path local: pedir tema se não declarado em flag

5. **Criar diretório inbox:**
   - `inbox-davi/<YYYY-MM-DD>-<tema-slug>/` (cria se não existe)

### Fase 2 — Download (se URL)

```bash
yt-dlp \
  --output "inbox-davi/<data>-<tema>/source.%(ext)s" \
  --format "best[ext=mp4]/best" \
  --write-info-json \
  --write-thumbnail \
  --write-subs --sub-langs pt,en \
  --no-playlist \
  <URL>
```

Salva:
- `source.mp4` (ou similar)
- `source.info.json` (metadata yt-dlp: título, autor, duração, descrição)
- `source.<ext>.jpg` (thumbnail)
- `source.<lang>.vtt` (legendas se disponíveis — usar como ground truth quando existir)

Se path local: pular Fase 2 (já temos source).

### Fase 3 — Áudio + transcrição

```bash
# Extrair áudio em formato leve
ffmpeg -i source.mp4 -vn -acodec libopus -b:a 32k audio.opus

# Invocar /transcribe-audio internamente
# (script bash chama: python ~/.claude/skills/transcribe-audio/scripts/transcribe.py audio.opus)
```

Output: `transcript.md`:

```markdown
---
type: transcript
source: source.mp4
duration_sec: 1842
engine: faster-whisper
language: pt-br
generated: 2026-05-20T15:00:00Z
---

# Transcript — <tema>

[00:00:00] <segmento 1>
[00:00:12] <segmento 2>
...
```

**Se legendas oficiais (`.vtt`) disponíveis:** preferir ao transcript gerado (mais preciso). Manter ambos pra comparação.

### Fase 4 — Frames-chave (só vídeos)

```bash
ffmpeg -i source.mp4 \
  -vf "select='gt(scene,0.4)',scale=640:-1" \
  -vsync vfr \
  -frames:v 15 \
  "frames/frame-%03d.jpg"
```

Cap em **15 frames** por default (configurável via `--max-frames`).

Se vídeo curto (< 30s): pular extração (não tem mudança suficiente de cena).

### Fase 5 — Descrição multimodal dos frames

Pra cada frame em `frames/frame-NNN.jpg`:

1. Claude lê imagem via Read tool (multimodal)
2. Pergunta interna ao próprio Claude: "Descreva esta cena em 1-2 frases. Foque em pessoas, objetos, contexto."
3. Append em `frames/descriptions.md`:

```markdown
## frame-001.jpg (~00:00:23)
<descrição 1-2 frases>

## frame-002.jpg (~00:01:45)
<descrição>
```

Áudio puro (sem vídeo): pular Fase 4-5.

### Fase 6 — Síntese estruturada

Claude lê:
- `source.info.json` (metadata)
- `transcript.md`
- `frames/descriptions.md` (se existir)

Produz `sintese.md`:

```markdown
---
type: sintese
source: <URL ou path>
autor: <nome ou "próprio">
data_captura: 2026-05-20
data_publicacao: <do info.json se URL>
duracao_min: <N>
language: pt-br
bucket_sugerido: <contexto-dominio | pack | inbox-only | absorver-referencia>
---

# Síntese — <tema>

## Fonte

- **Tipo:** vídeo | áudio | imagem | reunião gravada
- **Origem:** <URL ou path>
- **Autor:** <nome>
- **Atribuição obrigatória:** sim (se externa) | não (próprio)
- **Duração:** <N> min
- **Data publicação original:** <data>

## Narrativa (3-5 parágrafos)

<contexto + o que aconteceu + arco da conversa/apresentação>

## Pessoas envolvidas (se identificáveis)

- <nome ou descrição>: <papel/contribuição>

## Decisões / insights destilados (bullets — itens absorvíveis)

- <insight 1 universalizável>
- <insight 2 universalizável>
- ...

## Tópicos cobertos

- <tópico 1>
- <tópico 2>

## Trechos textuais notáveis

> "<citação verbatim quando vale capturar>" — <pessoa>, [<timestamp>]

(Cuidado: se autoria externa, trechos verbatim acima do limite de fair use precisam paráfrase no destino final do KOD.AI.)

## Sugestão de absorção

- **Bucket:** <contexto-dominio | pack | inbox-only | absorver-referencia>
- **Path sugerido:** <onde absorver no KODAI>
- **Anti-pollution flags:** <trechos que exigem paráfrase n-gram ≥5 antes de absorção>
- **Skill sugerida:** `/absorver-contexto` | `/absorver-referencia` | `/capturar-contexto-cliente`
- **Justificativa:** <1-2 frases>

## Comparação com contextos KOD.AI existentes (cross-ref)

- Tópico X tem overlap com `3-CONTEXTOS-DOMINIO/<dominio>/` → complementar?
- Tópico Y tem overlap com pack `2-PACKS/packs/<categoria>/<pack>/` → enriquecer?
- Tópico Z é NOVO universal → criar artefato novo

## Próximo passo recomendado

<1-3 ações concretas>
```

### Fase 7 — Manifest + event log + reporte

`manifest.yaml`:

```yaml
type: midia-absorvida
source: <URL ou path>
autor: <nome>
autoria: propria | externa | cliente
tema_slug: <slug>
data_captura: 2026-05-20T15:00:00Z
duracao_sec: <N>
artifacts:
  - transcript: transcript.md
  - frames_count: <N>
  - descriptions: frames/descriptions.md
  - sintese: sintese.md
  - source_metadata: source.info.json
status: synthesized-pending-absorption
proximo_passo: <skill sugerida>
```

**Event log** (se existir `logs/events.ndjson`):

```bash
kodai-log absorver-midia complete \
  source=<URL_short> \
  duracao_sec=<N> \
  frames=<N> \
  status=synthesized-pending-absorption
```

**Reporte pro Davi** (3-5 linhas):

```
✓ /absorver-midia concluída
Fonte: <título / arquivo>
Output: inbox-davi/<data>-<tema>/ (transcript + frames + sintese + manifest)
Autoria: <própria | externa | cliente>
Bucket sugerido: <contexto-dominio | pack | inbox-only>
Próximo passo: /<skill-sugerida> inbox-davi/<data>-<tema>/

Quer absorver agora ou revisar antes?
```

## Regras não-negociáveis

1. **Material externo:** sempre forçar atribuição visível + anti-pollution check antes de absorver no KOD.AI universal.
2. **Material de cliente:** sempre tratar como confidencial (`politicas/classificacao-contexto.md` — nível `confidencial` mínimo).
3. **Skill NÃO absorve sozinha** — produz inbox sintetizado + sugestão; humano dispara `/absorver-*`.
4. **Inbox é sagrado** (regra-base 1 + 2) — `transcript.md` + `source.mp4` + frames ficam intactos depois de absorção.
5. **Limite de duração padrão:** sem corte, mas alerta se vídeo > 60min (custo de tokens + tempo).
6. **Não vaza credenciais** — `source.info.json` pode conter dados; revisar antes de commit se inbox for git-tracked.
7. **Português Brasil** como idioma default na síntese.
8. **Honestidade em claims** (regra-base 10) — se transcrição tem trechos `[INAUDIBLE]` ou baixa qualidade, sinalizar na síntese.

## Limitações honestas

- **faster-whisper local:** erro ~5-10% em PT-BR; baixo em ambientes ruidosos / sotaques fortes
- **Diarization v1 ausente** — reunião com 4+ pessoas vira "fala única" no transcript. v2 futura com pyannote.
- **Frames-chave podem perder informação** — cena estática mas com áudio importante: confiar no transcript
- **Vídeos longos (>1h):** custo + tempo. Considerar `--max-duration-min` flag
- **URLs autenticadas** (Instagram privado, YouTube unlisted): yt-dlp pode falhar — fallback download manual
- **Copyright / direitos autorais / LGPD** é responsabilidade do humano — skill avisa mas não bloqueia
- **Síntese semântica depende do modelo** — alucinações são possíveis; trechos críticos sempre validar contra transcript
- **Conta de tokens custosa em vídeos longos** — descrição de 15 frames + síntese de transcript de 1h pode ser 10-20k tokens

## Casos especiais

### Reunião gravada (Zoom/Meet/Teams)

- Geralmente arquivo local `.mp4`
- Autoria: confirmar quem participou + se há cliente envolvido (categoriza confidencial)
- Pular Fase 4-5 (frames) se for só voz + slides estáticos
- Síntese foca em: pessoas, decisões tomadas, ações combinadas, prazos

### Podcast (áudio puro)

- Skip Fase 4 (frames) e 5 (descriptions)
- Transcript + síntese focada em narrativa + insights

### Vídeo de apresentação / curso

- Frames-chave capturam slides
- Síntese reconstrói roteiro pedagógico
- Bucket típico: `absorver-referencia` se material externo educativo

### Reels/Shorts (vídeo < 60s)

- Sem extração de frames (curto demais)
- Transcript bruto + 1 frame thumbnail
- Síntese mínima — geralmente vai pra inbox sem absorção subsequente

### Foto (imagem estática)

- Pular tudo até Fase 5 (descrição direta da imagem)
- Síntese mínima — usa output de `/capturar-imagem`
- Considerar usar `/capturar-imagem` diretamente em vez desta skill

## Quando promover DRAFT → FUNCIONAL

1. Testado contra 3 mídias reais: 1 vídeo YouTube + 1 áudio podcast + 1 reunião Zoom gravada
2. Output de qualidade (transcript completo + frames + síntese acionável)
3. Bridge `/absorver-contexto` validado em 1 piloto end-to-end
4. Custo de tokens medido + cap em vídeos > 30min
5. Diarization v2 (opcional) testada se Davi pedir

## Política irmã + skills relacionadas

- `politicas/notebooklm-fonte-ancorada.md` — pra fontes que viram NotebookLM em vez de inbox
- `politicas/classificacao-contexto.md` — nível de sensibilidade do inbox produzido
- `politicas/reflexion-per-skill.md` — skill registra learnings em `memory/per-skill/absorver-midia/`
- `politicas/event-log-ndjson.md` — loga start/complete/error
- `skills-universais/transcribe-audio/` — invocada internamente
- `skills-universais/capturar-video/`, `/capturar-imagem/` — peças componentes (esta skill orquestra)
- `skills-universais/absorver-contexto/`, `/absorver-referencia/` — skills downstream pós-absorção
- `regras-base.md` regra 1 (captura imediata em inbox), regra 2 (raw sagrado), regra 10 (honestidade em claims)

## Origem (proveniência)

Pedido Davi 2026-05-20:

> "KODAI ser capaz de ver gravações de reuniões, áudios, vídeos Instagram, vídeos YouTube, vídeos normais, fotos e a partir de tudo isso gerar transcrições inteligentes, gerar contexto, organizar contexto."

Spec arquitetural: `docs/decisoes/2026-05-20_skill-absorver-midia.md` (D1-D9 aprovadas com defaults).

Ferramentas usadas (todas públicas + permissivas):
- yt-dlp (Unlicense, OSS)
- ffmpeg (LGPL/GPL OSS)
- faster-whisper (MIT)
- Claude multimodal (Anthropic API)
