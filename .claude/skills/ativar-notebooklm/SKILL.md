---
name: ativar-notebooklm
description: >
  Detecta link de NotebookLM colado pelo usuário + contexto/markdown
  adjacente na mesma mensagem e vincula automaticamente à pasta correta
  da estrutura KOD.AI. Use sempre que o usuário enviar URL
  notebooklm.google.com junto com contexto sobre um tema, ou disser
  "ativar notebooklm", "vincula esse notebook", "/ativar-notebooklm",
  "esse notebooklm é sobre X". Cria notebooklm.url + adiciona à library
  da skill /notebooklm + reporta ativação.
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep]
---

# Skill — Ativar NotebookLM (intake)

## Princípio

Usuário cola **link de NotebookLM + contexto** ("esse notebook é sobre X") na **mesma mensagem**. Skill deve **detectar automaticamente** e **vincular** sem fricção. Combate sub-trigger (regra-base 4): trigger por presença do link, não só por comando explícito.

## Trigger

**Auto-disparo** quando a mensagem do usuário contém:

- URL `notebooklm.google.com/notebook/<id>` (regex)
- + Contexto adjacente identificando tema/eixo (mesmo parágrafo, paragrafo anterior, ou anexo `.md`)

**Disparo explícito** quando o usuário diz:

- "ativar notebooklm" / "vincula esse notebook" / "/ativar-notebooklm"
- "esse notebooklm é sobre X" / "esse notebook trata de Y"

## Workflow

### Passo 1 — Detectar URL automaticamente

Regex: `https?://notebooklm\.google\.com/notebook/([a-f0-9-]{36})`

Extrair `notebook_id` (UUID).

### Passo 2 — Identificar tema/eixo do contexto enviado

Heurísticas:

1. **Anexo `.md`** com cabeçalho YAML → ler `Eixo:` e `Tipo:` do header
2. **Parágrafo de contexto** mencionando tema → matching contra:
   - Eixos: "estrutura de contexto" / "engenharia de contexto" → meta
   - Domínio: nome de negócio, produto, vertical → grounding
   - Comportamento da IA: regras, políticas, hooks → orchestration
3. **Sem contexto claro** → perguntar ao usuário em UMA pergunta única:

   > "Detectei link de NotebookLM. Antes de vincular: esse notebook é sobre **estrutura/engenharia de contexto** (meta), **conhecimento de um cliente/vertical** (grounding), ou **comportamento da IA** (orchestration)?"

### Passo 3 — Mapear pra pasta correta da estrutura KOD.AI

| Eixo + tema | Pasta destino |
|---|---|
| Meta — estrutura de contexto | `1-ESQUELETO/metodologias/` (linka a `estrutura-de-contexto.md`) |
| Meta — engenharia de contexto | `1-ESQUELETO/politicas/` (linka a `engenharia-de-contexto.md`) |
| Grounding — domínio de negócio específico | `3-CONTEXTOS-DOMINIO/<slug-do-vertical>/` (criar se não existir via `/criar-contexto`) |
| Grounding — capacidade técnica (pack) | `2-PACKS/packs/<categoria>/<slug>/` (criar se não existir via `/criar-pack`) |
| Orchestration — comportamento universal | `1-ESQUELETO/politicas/` ou `1-ESQUELETO/metodologias/` (decisão por tipo de regra) |
| Sem fit claro | `contextos/bruto/<data>-<tema>.md` (sagrado, processar depois) |

### Passo 4 — Criar/atualizar `notebooklm.url` na pasta destino

Arquivo: `<pasta-destino>/notebooklm.url`

Conteúdo (texto puro, sem extra):

```
https://notebooklm.google.com/notebook/<id>
```

Se já existe `notebooklm.url`: **comparar URLs**. Se forem o mesmo notebook, idempotente (pular). Se forem diferentes, perguntar antes de sobrescrever:

> "Pasta já tem `notebooklm.url` apontando pra outro notebook. Substitui ou mantém o antigo + adiciona o novo como `notebooklm-2.url`?"

### Passo 5 — Adicionar à library da skill `/notebooklm`

Reusa `notebook_manager.py add` do `~/.claude/skills/notebooklm/`:

```bash
cd ~/.claude/skills/notebooklm
PYTHONIOENCODING=utf-8 py scripts/run.py notebook_manager.py add \
  --url "<URL detectada>" \
  --name "<nome derivado do contexto>" \
  --description "<descrição derivada do contexto enviado pelo usuário>" \
  --topics "<topics derivados>"
```

**Nome derivado:** se contexto tem H1 do `.md` anexado, usar; senão "Notebook — <tema detectado>".

**Description:** primeira frase do `.md` anexado OU primeira sentença do parágrafo do usuário.

**Topics:** extrair 3-5 palavras-chave do contexto (substantivos técnicos).

### Passo 6 — Se houver markdown anexado, salvar como bruto + criar referência

1. Salvar conteúdo do `.md` em `contextos/bruto/<YYYY-MM-DD>_<slug>.md` (sagrado, intocado)
2. Adicionar header `Fontes:` com link pro notebook no bruto
3. Criar reference em pasta destino (não verbatim — re-implementação universalizada quando aplicável)

### Passo 7 — Confirmação ao usuário

Output padrão:

```
✓ NotebookLM "<nome>" vinculado.
  Pasta destino: <caminho da pasta>
  notebooklm.url: <caminho>/notebooklm.url
  Library: <id-na-library>
  Bruto: <caminho-bruto-se-aplicável>

Pronto pra operar. Consulte via skill /notebooklm ou disparando
/evoluir-contexto pra detecção de novas fontes.
```

## Antipadrões

- **Ignorar o link enviado** — se URL veio no prompt, processar (anti-sub-trigger)
- **Pedir confirmação desnecessária** quando o contexto está claro (descrição + tema explícito = direto pra Passo 4)
- **Duplicar arquivos** se já existir um para o mesmo tema — melhorar o existente em vez de criar paralelo
- **Inventar tema/eixo** quando contexto for vago — perguntar em UMA pergunta única (Passo 2.3) em vez de chutar
- **Atualizar silenciosamente** notebooklm.url existente — sempre confirmar antes de sobrescrever

## Quando NÃO usar

- Link de NotebookLM **sem contexto** algum (usuário só cola URL sem dizer nada) → perguntar tema primeiro
- NotebookLM já vinculado e usuário **não está pedindo mudança** → mencionar o vínculo existente e seguir
- Link inválido (não passa no regex) → reportar erro de formato

## Atribuição

Skill nova KOD.AI v0.5 — formaliza o comportamento de intake de NotebookLM externo. Princípio capturado da prática observada nesta sessão (Davi cola contexto + link, espera vinculação automática). Combina com `notebooklm` (bundled — biblioteca + auth), `/capturar` (gravação de input do usuário), `/absorver-contexto` (processamento do conteúdo).

## Política irmã + skill

- `notebooklm` (bundled) — skill que consulta os notebooks via browser auth
- `/capturar` — registra input do usuário em inbox-stakeholder/
- `/absorver-contexto` — processa material reutilizável
- `/evoluir-contexto` — detecta quando notebook precisa atualização
- `/sugerir-pesquisa` — sugere quando criar/expandir notebook
- `99_meta/notebooklm_auth.md` — manutenção da auth (re-auth 30d)
