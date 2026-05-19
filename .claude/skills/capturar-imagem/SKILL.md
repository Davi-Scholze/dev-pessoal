---
name: capturar-imagem
description: >
  Captura imagem enviada pelo usuário (path local, paste de screenshot, link de imagem),
  descreve nativamente (Claude multi-modal), classifica nos 3 tipos da política
  imagens.md (bruto sagrado / evidência permanente / validação efêmera), sugere
  destino + nome canônico, salva com header de metadata adjacente. Use sempre que
  o usuário enviar imagem (.png/.jpg/.jpeg/.webp/.heic/.gif/.bmp/.tiff), colar
  screenshot, ou disser "captura essa imagem", "/capturar-imagem", "salva esse
  print", "registra esse mockup", "anota esse design". Auto-disparo opcional
  quando detectar imagem no input do usuário sem comando explícito (sugere ritual).
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - AskUserQuestion
---

# Skill: `/capturar-imagem`

Ritual de captura de imagem com classificação automática + salvamento canônico.

## Quando disparar

**Triggers explícitos:**
- "/capturar-imagem"
- "captura essa imagem" / "salva esse print" / "registra esse mockup"
- "anota esse design" / "guarda essa foto" / "esse screenshot"

**Triggers contextuais (auto-disparo proposto):**
- Usuário cola screenshot direto na conversa
- Usuário arrastou arquivo `.png/.jpg/.jpeg/.webp/.heic/.gif/.bmp/.tiff` pra Claude Code
- Usuário menciona path absoluto ou relativo de imagem (`C:\...\foto.png`)
- Usuário responde a uma pergunta sua com imagem

**NÃO disparar quando:**
- Imagem é evidência de erro/log (usar `/capturar` com stakeholder)
- Imagem é resultado de `/ver` (Playwright MCP — já tem fluxo próprio)
- Imagem está em meio a discussão técnica como ilustração efêmera (passa direto, não vira arquivo)

## Workflow 5 passos

### Passo 1 — Ler imagem nativamente

Claude lê imagem multi-modal direto (PNG/JPG/WebP/HEIC suportados). Descreve:
- O que aparece (objetos, texto OCR, pessoas — sem identificar)
- Qualidade/clareza (resolução, blur, ruído)
- Provável intenção do usuário (mockup? evidência? print de bug? referência de design?)

### Passo 2 — Classificar nos 3 tipos da `politicas/imagens.md`

| Tipo | Quando | Onde salva | Nomeação |
|---|---|---|---|
| **Bruto sagrado** | Usuário envia material de stakeholder (foto cliente, print conversa, mockup recebido) | `inbox-<stakeholder>/imagens/<data>-<tema>.<ext>` | `2026-05-20-fluxo-checkout.png` |
| **Evidência permanente** | Documenta decisão/bug que precisa ficar | `mapeamento/evidencias/<data>/<tema>.<ext>` ou `docs/evidencias/` | `2026-05-20-bug-login-mobile.png` |
| **Validação efêmera** | Screenshot temporário (validar X em desktop, depois descartar) | `.playwright-mcp/` ou `tmp/` (gitignored) | livre |

### Passo 3 — Confirmar tipo + nome com usuário

`AskUserQuestion` com 4 opções:
- (A) Bruto sagrado — de stakeholder; **NUNCA edita depois**
- (B) Evidência permanente — documenta decisão/bug
- (C) Validação efêmera — vai pra gitignored
- (D) Outra coisa — texto livre

Usuário também pode propor nome alternativo.

### Passo 4 — Salvar + metadata adjacente

Salva imagem no destino. **Adicional:** cria arquivo `.md` adjacente com metadata:

```markdown
---
tipo: imagem
classificacao: bruto-sagrado | evidencia-permanente | validacao-efemera
data: 2026-05-20
origem: <stakeholder | usuario-direto | screenshot | url>
descricao: <texto curto descrevendo o que aparece>
ocr: <texto OCR detectado se aplicável>
tema: <tema/contexto>
related:
  - <paths relacionados>
---

# <Título descritivo>

<descrição expandida + contexto + decisões associadas>
```

### Passo 5 — Reportar

Reporta:
- Path final + tipo classificado
- Trecho da descrição
- Próximos passos sugeridos (consultar imagem em /skill X / referenciar em decisao Y / passar pra design / etc)

## Casos especiais

### Screenshot de bug/erro

Usuário cola print de erro de console / stack trace / página com problema:
- Sugerir tipo (B) Evidência permanente
- Destino: `mapeamento/evidencias/<data>/bug-<tema>.png`
- Metadata expandida: stack trace transcrita + componente afetado + reprodução

### Mockup/design recebido de stakeholder

- Tipo (A) Bruto sagrado
- Destino: `inbox-<stakeholder>/imagens/<data>-mockup-<tela>.png`
- **NUNCA alterar** (regra-base 2 — bruto sagrado)
- Metadata: stakeholder + tela + breakpoint sugerido + decisões pendentes

### Print de Slack/WhatsApp/Email

- Tipo (A) Bruto sagrado (é stakeholder communication)
- Destino: `inbox-<stakeholder>/imagens/<data>-<tema>.png`
- Metadata: data conversa + interlocutor + decisão capturada
- **OCR obrigatório** se contém texto — facilita busca futura

### Imagem de referência (Pinterest, Behance, etc)

- Tipo (B) Evidência permanente
- Destino: `identidade/referencias/<data>-<tema>.<ext>` ou `mapeamento/referencias/`
- Metadata: URL original + por que essa referência + onde aplicar

### Screenshot de teste UI (resultado de /ver)

- **NÃO usar `/capturar-imagem`** — `/ver` tem fluxo próprio com `--output-dir` da regra `.claude/rules/playwright-output-path.md`
- Se evidência permanente, mover manualmente após `/ver` pra `mapeamento/evidencias/`

## Política irmã

- `politicas/imagens.md` — define 3 tipos (referência canônica)
- `.claude/rules/playwright-output-path.md` — Playwright nunca escreve na raiz
- `skills/ver/` — captura via Playwright (caso de uso diferente)
- `skills/capturar/` — captura textual de stakeholder
- `skills/transcribe-audio/` — captura audio de stakeholder
- `skills/capturar-video/` — companheira pra vídeo

## Limitações honestas

- **Sem OCR avançado:** Claude lê texto em imagens mas não substitui Tesseract pra documentos densos
- **Sem detecção de PII em imagem:** se foto contém CPF/RG/cartão, **usuário deve cortar antes de enviar**
- **Sem comparação de imagens:** não detecta duplicatas via hash perceptual (futuro)
- **Sem geração de imagem:** apenas captura/classificação

## Critérios de PASS

1. Imagem salva no destino correto pela classificação
2. Metadata adjacente `.md` criada com formato canônico
3. Bruto sagrado **nunca** editado depois
4. Path retornado ao usuário pra referência futura
5. Skill responde a triggers em ≤2 turnos (descrição + classificação + salvamento)
