---
name: faxina
description: >
  Varre raiz da pasta-mãe + repos consumidores, detecta lixo orgânico
  (duplicatas via SHA256, órfãos sem referência, arquivos fora-do-lugar, prints
  soltos, brutos duplicados na raiz, pastas vazias) e MOVE pra
  `.faxina-quarentena/<data>/<bucket>/` (NUNCA deleta). Gera relatório
  pra confirmação humana antes de aplicar. Reversível em 1 comando. Use
  periodicamente (toda 2-4 semanas) ou quando o usuário disser "faxina",
  "/faxina", "limpa raiz", "arruma essa pasta", "tem muita coisa solta",
  "varre o que tá fora do lugar". Modo default `--dry-run` (só lista). Modo
  `--apply` move pra quarentena após OK. Modo `--restore <data>` reverte.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

# Skill: `/faxina`

Higiene periódica não-destrutiva de pasta-mãe + repos. NUNCA deleta — sempre quarentena reversível.

## Princípio fundamental

> *"A faxina não decide. Ela propõe. O humano decide."*

Toda movimentação vai pra `.faxina-quarentena/<data>/` com `RATIONALE.md` adjacente. Restauração é 1 comando. Delete real só acontece se o usuário rodar `/faxina --purge <data>` depois de N dias (default: 30) com OK explícito.

## Quando disparar

**Triggers explícitos:**
- "/faxina"
- "limpa raiz" / "arruma essa pasta" / "varre lixo"
- "tem muita coisa solta" / "tá uma bagunça"
- "faxina periódica" / "higiene"

**Triggers contextuais (sugerir):**
- Detectou ≥10 arquivos soltos na raiz da pasta-mãe que não são `*.md` canônicos
- Detectou ≥5 PNGs/JPGs soltos na raiz (regra `imagens.md` quebrada)
- Detectou pastas vazias > 3 em qualquer subnível
- Detectou último `/faxina` foi há > 30 dias (heurística via último `.faxina-quarentena/<data>/`)
- Detectou duplicatas SHA256 entre raiz e `contextos/bruto/`

**NÃO disparar quando:**
- Pasta tem < 50 arquivos no total (não tem o que limpar)
- Usuário está em meio a desenvolvimento ativo (interrompe foco)
- Não tem `.git` (não é projeto rastreável)

## Modos de operação

| Modo | Flag | O que faz |
|---|---|---|
| **Inventário** (default) | `--dry-run` ou sem flag | Varre + classifica + reporta. Não move nada. |
| **Quarentena** | `--apply` | Após OK explícito, move classificados pra `.faxina-quarentena/<data>/`. |
| **Restauração** | `--restore <data>` | Reverte uma faxina anterior pelo `<data>`. Move tudo de volta pros paths originais. |
| **Purga** | `--purge <data>` | Delete real de uma quarentena antiga (após N dias). **Pede OK explícito.** |
| **Listar quarentenas** | `--list` | Lista todas as `.faxina-quarentena/<data>/` existentes + idade + tamanho. |

## Workflow 7 passos

### Passo 1 — Pré-flight check

1. Detectar se está em pasta-mãe (tem `KODAI-INSTALADO.md` ou `_memoria/`) OU repo (tem `.git`)
2. Verificar `git status` — se houver mudanças não commitadas, **pausar** e perguntar se deve continuar (faxina pode embaralhar com mudanças em progresso)
3. Criar `.faxina-quarentena/` no `.gitignore` se não estiver (aditivo, regra `.claude/rules/gitignore-aditivo.md`)

### Passo 2 — Varredura (5 buckets)

**Bucket 1 — Duplicatas SHA256:**
- Calcular SHA256 de todos arquivos > 1KB na raiz
- Comparar com SHA256 de arquivos em `contextos/bruto/**` e `inbox-*/**`
- Match exato → candidato a quarentena (manter o canônico, mover a duplicata)

**Bucket 2 — Arquivos fora-do-lugar:**
- PNG/JPG na raiz → deveria estar em `mapeamento/evidencias/` ou `.playwright-mcp/`
- `.mp4`/`.mov` na raiz → deveria estar em `inbox-*/videos/` ou `mapeamento/`
- Arquivos com nome genérico (`Untitled-*`, `New Document*`, `screenshot.png`, `image.png`) — provavelmente lixo
- `*.tmp`, `*.bak`, `*.swp`, `*.swo`, `*.DS_Store`, `Thumbs.db`

**Bucket 3 — Órfãos (sem referência):**
- Arquivos `.md` na raiz NÃO referenciados em `CLAUDE.md`, `AGENTS.md`, `MAPA.md`, `KODAI-INSTALADO.md`, `PENDENCIAS.md`, `PROMPT_MASTER_HANDOFF.md`, ou em qualquer outro `.md` da raiz
- Heurística: grep `<nome-arquivo>` em todos `.md` da pasta — 0 matches = órfão candidato

**Bucket 4 — Pastas vazias:**
- `find . -type d -empty -not -path "./.git/*" -not -path "./node_modules/*"` (excluindo `.git` e `node_modules`)
- Pastas vazias > 1 dia de idade (não criadas agora)

**Bucket 5 — Logs/cache antigos:**
- `*.log` > 7 dias
- `.cache/`, `__pycache__/`, `.pytest_cache/`, `.next/cache/`, `dist/`, `build/` (se gitignored, deixar; se não, sinalizar)
- `node_modules/` de projetos arquivados (não tocados há > 90 dias)

### Passo 3 — Classificação + cross-check

Para cada candidato, classificar em:
- **CONFIANÇA ALTA** — duplicata SHA256 exata, ou lixo óbvio (`Thumbs.db`)
- **CONFIANÇA MÉDIA** — fora-do-lugar mas pode ter razão (PNG solto pode ser referência ativa)
- **CONFIANÇA BAIXA** — órfão `.md` (pode estar referenciado em local não-óbvio)

Cross-check antes de propor:
- Para cada candidato MÉDIA/BAIXA: grep no histórico git recente (`git log --all --oneline -- <path>`) — se foi commitado nos últimos 30 dias, downgrade pra BAIXA ou pular
- Para `.md` órfão: grep em commits recentes mencionando o nome do arquivo

### Passo 4 — Reportar inventário (sempre, antes de qualquer movimento)

Formato:

```
# Faxina <data> — Inventário (dry-run)

## Bucket 1 — Duplicatas SHA256 (N itens)
- <path-na-raiz> ↔ <canonico-em-contextos> (SHA256: abc123...)
  → Sugerido: mover <path-na-raiz> pra quarentena

## Bucket 2 — Fora-do-lugar (N itens)
- screenshot-2026-05-19.png (raiz) → deveria estar em mapeamento/evidencias/
  → Sugerido: mover pra quarentena

## Bucket 3 — Órfãos (N itens, CONFIANÇA BAIXA)
- NOTAS-ANTIGAS.md (raiz, 0 referências em .md)
  → Sugerido: revisar manualmente antes de quarentena

## Bucket 4 — Pastas vazias (N itens)
- scripts/ (vazia, criada há 90+ dias)
  → Sugerido: remover

## Bucket 5 — Caches (N itens, total: XGB)
- .pytest_cache/ (não gitignored — adicionar a .gitignore + remover do tracking)

## Resumo
Total candidatos: NNN
Tamanho recuperável: X GB
Risco estimado: BAIXO (todos vão pra quarentena reversível)
```

### Passo 5 — Gate humano

`AskUserQuestion` com 3 opções:

> "Aplicar a faxina movendo TUDO o classificado pra `.faxina-quarentena/<data>/`?"
> - (A) Sim, aplica tudo (mais comum — quarentena é reversível)
> - (B) Aplica só CONFIANÇA ALTA + MÉDIA (deixa BAIXA pra revisar manualmente)
> - (C) Deixa só MÉDIA + ALTA com aprovação item-por-item (mais lento, mais seguro)
> - (D) Cancela — não aplica nada

Se (C), iterar por item BAIXA/MÉDIA com pergunta individual `(quarentena | manter | cancela tudo)`.

### Passo 6 — Aplicação

Criar estrutura:
```
.faxina-quarentena/
└── 2026-05-21/
    ├── RATIONALE.md          # por que cada item foi movido
    ├── bucket-1-duplicatas/
    ├── bucket-2-fora-lugar/
    ├── bucket-3-orfaos/
    ├── bucket-4-pastas-vazias/
    └── bucket-5-caches/
```

Para cada item:
1. Calcular path relativo original (`./pasta/arquivo.ext`)
2. `mkdir -p .faxina-quarentena/<data>/bucket-N/<dirname-original>`
3. `mv "<path-original>" ".faxina-quarentena/<data>/bucket-N/<path-original>"`
4. Append em `RATIONALE.md`:
   ```markdown
   ## <bucket-N>/<path-original>
   - **Origem:** `<path-original>`
   - **Razão:** duplicata SHA256 de `<canonico>` | fora-do-lugar | órfão | pasta vazia | cache não-gitignored
   - **SHA256:** `<hash>` (se aplicável)
   - **Confiança:** ALTA | MÉDIA | BAIXA
   - **Restaurar com:** `/faxina --restore 2026-05-21` ou `mv ".faxina-quarentena/<data>/bucket-N/<path>" "<path-original>"`
   ```

### Passo 7 — Reportar pós-aplicação + sugerir próximos passos

```
✅ Faxina <data> aplicada
- N itens movidos pra .faxina-quarentena/<data>/
- Tamanho recuperado: X GB
- RATIONALE: .faxina-quarentena/<data>/RATIONALE.md

Próximos passos:
1. Use o projeto normalmente por alguns dias
2. Se algo quebrar, /faxina --restore <data> reverte tudo
3. Em 30+ dias, considere /faxina --purge <data> pra delete real (pede OK)
```

## Restauração (`--restore <data>`)

1. Ler `.faxina-quarentena/<data>/RATIONALE.md`
2. Para cada item: `mv ".faxina-quarentena/<data>/bucket-N/<path>" "<path-original>"`
3. Reportar quais itens voltaram
4. Manter `RATIONALE.md` com nota `RESTAURADO em <data-atual>`

## Purga (`--purge <data>`)

**Comando perigoso** — delete real, irrecuperável fora do git.

Workflow:
1. Verificar idade da quarentena (default mínimo: 30 dias)
2. Listar todos itens que serão purgados
3. `AskUserQuestion` com confirmação dupla:
   - "Confirmar purga de N itens da quarentena `<data>`?"
   - "Tem CERTEZA? Este delete é irreversível fora do git."
4. Se 2 confirmações: `rm -rf .faxina-quarentena/<data>/`
5. Reportar

## Casos especiais

### Faxina em monorepo (repos aninhados)

- Default: opera só na pasta-mãe (raiz + subpastas que NÃO são repos próprios)
- Detectar `.git/` em subpasta = repo aninhado → **pular** (faxinar separadamente)
- Flag `--include-repos` força entrar em repos aninhados (raro)

### Faxina em projeto com submodules

- Pular pastas de submodules (detectar via `.gitmodules`)
- Cada submodule é responsável pela própria faxina

### Pasta `_memoria/` ou `contextos/bruto/`

- **NUNCA** mover arquivos dessas pastas (são canônicas)
- Apenas detectar duplicatas APONTANDO pra essas pastas (mover a duplicata, não o canônico)

### `.claude/skills/` (dogfooding)

- **NUNCA** mover (é o coração do sistema)
- Apenas reportar se houver desvio inesperado de estrutura

### Bruto sagrado (regra-base 2)

- Arquivos em `contextos/bruto/` e `inbox-*/` são **sagrados**
- Faxina **nunca** toca neles
- Faxina pode mover **cópias** desses arquivos que estão fora do lugar (na raiz, por exemplo)

## Política irmã + hook

- `politicas/imagens.md` — PNGs/JPGs soltos na raiz são alvo principal do Bucket 2
- `.claude/rules/gitignore-aditivo.md` — `.faxina-quarentena/` é adicionado aditivamente
- `politicas/explicar-acao-custosa.md` — Passo 4 + Passo 5 implementam os 4 dados
- `skills/auditar-projeto/` — auditoria mais abrangente (8 fases); faxina é a higiene leve
- `1-ESQUELETO/regras-base.md` regra 2 — bruto sagrado nunca tocado

## Limitações honestas

- **Não detecta lixo dentro de pastas profundas** — varre raiz + 2 níveis por default; mais profundo é caso-a-caso
- **Heurística de órfãos é imperfeita** — `.md` órfão pode estar referenciado em commit message, README de subprojeto, ou no NotebookLM (fora do alcance)
- **`node_modules/` antigo** é sinalizado mas não movido (pode ser reinstalado, mas é tempo perdido)
- **Sem hash perceptual** — duplicatas só por SHA256 exato; arquivos similares com 1 byte diferente passam
- **Não roda paralelo** — varredura sequencial; pode demorar em pasta-mãe com 100k+ arquivos

## Critérios de PASS

1. NENHUM arquivo deletado sem 2 OKs explícitos (purga)
2. RATIONALE.md gerado pra toda quarentena
3. Reversão funciona em 1 comando
4. Bruto sagrado nunca tocado
5. `.faxina-quarentena/` no `.gitignore` (aditivo)
6. Inventário rodando em < 30s em pasta de 10k arquivos
7. Faxina não interrompe trabalho em progresso (pausa se `git status` sujo)
