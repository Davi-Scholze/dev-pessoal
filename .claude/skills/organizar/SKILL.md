---
name: organizar
description: >
  Reorganiza estruturalmente uma pasta (pasta-mãe multi-repo, repo solo
  grande, repo solo pequeno, ou monorepo) aplicando layout canônico do KOD.AI.
  Compõe `/faxina` (higiene de lixo) + reorganização estrutural (consolidar
  diretórios + agrupar `.md` soltos + aplicar convenção `_memoria/`, `_negocio/`,
  `_dev/`) usando `git mv` pra preservar histórico. Detecta tipo de projeto
  automaticamente. NUNCA deleta — sempre reversível via `--rollback <data>`.
  Atualiza referências em `.md` quando arquivo é movido. Funciona em sistema
  pequeno (1 arquivo + 1 src/) até guarda-chuva multi-repo (8+ projetos).
  Use sempre que o usuário disser "organiza essa pasta", "/organizar", "tá
  desorganizado", "arrumar estrutura", "aplica layout canônico", "reorganiza",
  "muitos .md soltos na raiz", "agrupa o que é semelhante", "padroniza a
  estrutura desse projeto". Modo default `--dry-run` (só plano). Modo
  `--apply` executa após OK. Modo `--rollback <data>` reverte.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Skill
---

# Skill: `/organizar`

Reorganização estrutural não-destrutiva. Escala de sistema pequeno até guarda-chuva multi-repo.

## Princípio fundamental

> *"Higiene remove lixo. Estrutura remove confusão. Ambas propõem; o humano decide."*

`/organizar` é o orquestrador estrutural completo. NUNCA deleta — toda movimentação preserva histórico via `git mv` + cria `.organizar-rollback-<data>.md` com instruções de reversão. Atualiza referências em `.md` afetados (search & replace de paths).

## Quando disparar

**Triggers explícitos:**
- "/organizar"
- "organiza essa pasta" / "arrumar estrutura" / "reorganiza"
- "aplica layout canônico" / "padroniza essa estrutura"
- "tá desorganizado" / "muitos .md soltos na raiz" / "agrupa o que é semelhante"
- "tá uma bagunça estrutural" (vs `/faxina` que pega lixo orgânico)

**Triggers contextuais (sugerir):**
- Detectou ≥6 `.md` soltos na raiz que poderiam ser agrupados
- Detectou estrutura atual diverge ≥30% do layout-alvo canônico do tipo detectado
- Detectou pastas com nomes redundantes (`tools/` + `ferramentas/` + `scripts/`)
- Detectou que último `/organizar` foi há > 90 dias OU nunca
- Detectou pasta-mãe sem agrupamento `_memoria/_negocio/_dev/` convencionado

**NÃO disparar quando:**
- Sistema tem < 10 arquivos (não tem o que organizar)
- Usuário está em meio a desenvolvimento ativo (interrompe foco)
- Não tem `.git` (não consegue preservar histórico com `git mv`)
- Layout atual JÁ bate ≥90% com canônico (organização adicional é over-engineering)

## Modos de operação

| Modo | Flag | O que faz |
|---|---|---|
| **Plano** (default) | `--dry-run` ou sem flag | Detecta tipo + diagnostica + gera plano de reorganização. Não move nada. |
| **Aplicação** | `--apply` | Após OK explícito, executa `git mv` em batch + atualiza refs em `.md`. |
| **Rollback** | `--rollback <data>` | Reverte uma reorganização anterior pelo `<data>`. |
| **Listar** | `--list` | Lista todas as reorganizações registradas (`.organizar-rollback-*.md`). |
| **Só higiene** | `--apenas-faxina` | Chama `/faxina` sozinha, sem reorganização estrutural. |
| **Só estrutura** | `--apenas-estrutura` | Pula `/faxina`, foca em layout canônico. |
| **Forçar tipo** | `--tipo <pasta-mae\|projeto-solo-grande\|projeto-solo-pequeno\|monorepo>` | Override de detecção automática. |

## Workflow 7 fases

### Fase 1 — Pré-flight + detecção de tipo

1. Detectar tipo de projeto (heurística):
   - **pasta-mãe (multi-repo guarda-chuva):** tem `KODAI-INSTALADO.md` OU `KODAI/` na raiz + `Repositorios/` OU ≥2 `.git/` em subpastas
   - **projeto-solo-grande:** tem `.git/` próprio + `src/` ou `app/` ou `lib/` + ≥30 arquivos
   - **projeto-solo-pequeno:** tem `.git/` próprio + < 30 arquivos OU sem `src/` (é CLI/script/util)
   - **monorepo:** tem `package.json` raiz com `workspaces` OU `pnpm-workspace.yaml` OU `turbo.json` + `packages/` ou `apps/`
2. Verificar `.git/` presente. Se não: PARAR (`git mv` exige git).
3. Verificar `git status` — se sujo: PARAR e perguntar (reorganização pode embaralhar com mudanças em progresso).
4. Verificar identidade git local (`user.email`) — se conflita com escopo (ex: pasta pessoal com identidade trabalho), AVISAR.
5. Criar `.organizar-rollback-<data>.md` (placeholder) e adicionar `.organizar-rollback-*.md` + `.faxina-quarentena/` ao `.gitignore` (aditivo).

### Fase 2 — Diagnóstico estrutural

Comparar estrutura atual contra layout-alvo canônico do tipo detectado. Métricas:

| Métrica | Cálculo | Interpretação |
|---|---|---|
| **Match score** | % de paths canônicos presentes | ≥90% = pouca reorganização; 50-90% = média; <50% = grande |
| **Drift** | Lista de paths atuais que NÃO existem no canônico | Indica reorganização necessária |
| **Faltas** | Lista de paths canônicos que NÃO existem aqui | Indica falta de estrutura (ex: `_memoria/` ausente) |
| **Anti-padrões** | Detecções específicas (8 listas) | Trigger pra movimentação específica |

Lista de **8 anti-padrões** detectados:

1. **Muitos `.md` soltos na raiz** (>5 não-canônicos) → propor agrupamento em `_negocio/` ou `docs/`
2. **MAPA + MAPA_PESSOAL duplicados** → propor consolidação
3. **`ferramentas/` + `tools/` + `scripts/` coexistindo** → propor unificação em `_dev/tools/`
4. **`identidade/` + `contextos/` + `_memoria/` em níveis diferentes** → propor agrupamento sob `_negocio/`
5. **`docs/` no mesmo nível de `src/`** (projeto-solo) → OK, deixa
6. **Pastas vazias > 1 dia** → delegar pra `/faxina` Bucket 4
7. **Repos pessoais sem `_memoria/` próprio** → propor criar
8. **`.md` órfão** (sem referência) → delegar pra `/faxina` Bucket 3

### Fase 3 — Higiene (delegação a `/faxina`)

Invoca skill `/faxina` em modo `--dry-run` pra detectar lixo orgânico (5 buckets). Apresenta inventário combinado: lixo (faxina) + reorganização (organizar). Se houver lixo, oferece aplicar faxina **antes** da reorganização (evita mover lixo desnecessariamente).

### Fase 4 — Layout-alvo + plano de movimentação

Carrega template canônico de `1-ESQUELETO/templates/layouts/<tipo>.md`. Gera **plano de movimentação** linha-por-linha:

```
# Plano de reorganização — <pasta> (tipo: <tipo-detectado>)

## Movimentações propostas (N items)

| # | De | Para | Tipo | Confiança |
|---|---|---|---|---|
| 1 | identidade/ | _negocio/identidade/ | git mv -- dir | ALTA |
| 2 | contextos/ | _negocio/contextos/ | git mv -- dir | ALTA |
| 3 | MAPA.md | _negocio/MAPA.md | git mv | MÉDIA (verificar se MAPA_PESSOAL.md fica) |
| 4 | PENDENCIAS.md | _negocio/PENDENCIAS.md | git mv | ALTA |
| 5 | PROMPT_MASTER_HANDOFF.md | _negocio/PROMPT_MASTER_HANDOFF.md | git mv | ALTA |
| 6 | ferramentas/ | _dev/ferramentas/ | git mv -- dir | ALTA |
| 7 | docs/ | _dev/docs/ | git mv -- dir | MÉDIA (docs pode ser canônico raiz) |

## Referências em .md a atualizar (M arquivos)

| Arquivo | Path antigo | Path novo | Linhas |
|---|---|---|---|
| CLAUDE.md | MAPA_PESSOAL.md | _negocio/MAPA_PESSOAL.md ou _negocio/MAPA.md | linhas 23, 47 |
| AGENTS.md | identidade/ | _negocio/identidade/ | linhas 12, 89 |
| ... | ... | ... | ... |

## Anti-padrões NÃO corrigidos automaticamente (precisam decisão)

- MAPA.md vs MAPA_PESSOAL.md — qual é o canônico? (decisão humana)
- REGRAS_SESSAO.md — extensão local, deixar raiz OU mover pra `.claude/rules/regras-sessao.md`?

## Resumo
Total movimentações: N
Total refs a atualizar: M
Match score depois: X% (era Y%)
Risco estimado: BAIXO (reversível via /organizar --rollback <data>)
```

### Fase 5 — Gate humano (granularidade configurável)

`AskUserQuestion` com 5 opções:

> "Aplicar plano de reorganização?"
> - (A) Aplica TUDO (movimentações ALTA + MÉDIA + refs)
> - (B) Aplica só ALTA (deixa MÉDIA pra revisar manualmente)
> - (C) Item-por-item (mais lento, mais seguro)
> - (D) Aplica faxina mas pula reorganização estrutural
> - (E) Cancela — não aplica nada

Se (C), iterar item-por-item com `(aplica | pula | cancela tudo)`.

Para **anti-padrões com decisão pendente** (ex: MAPA vs MAPA_PESSOAL), pergunta separada antes da Fase 6.

### Fase 6 — Aplicação atômica + atualização de refs

Para cada movimentação aprovada (em ordem topológica — dirs primeiro, depois arquivos dentro):

1. `mkdir -p <dir-alvo-parent>` se necessário
2. `git mv "<de>" "<para>"` (preserva histórico)
3. **Atualizar refs:** grep `<de>` em todos os `.md` da pasta → search & replace pra `<para>` (com confirmação se houver >5 refs no mesmo arquivo)
4. Append em `.organizar-rollback-<data>.md`:
   ```markdown
   ## Movimentação #N
   - **De:** `<de>`
   - **Para:** `<para>`
   - **Comando reverso:** `git mv "<para>" "<de>"`
   - **Refs atualizadas:** N arquivos, M linhas
   - **Confiança:** ALTA | MÉDIA
   ```

Após todas as movimentações:
- 1 commit único: `refactor(layout): aplica /organizar para layout canônico <tipo>` (preferência: 1 commit pra reorganização ser atômica no histórico)
- OU 1 commit por movimentação (regra-base 7) — escolha do usuário via flag `--commit-mode <atomic|per-move>`

### Fase 7 — Validação pós-reorganização + reporte

**Validações automáticas:**
1. Todos os paths antigos NÃO existem mais (`! test -e <de>`)
2. Todos os paths novos EXISTEM (`test -e <para>`)
3. Refs em `.md` foram atualizadas (grep retorna 0 ocorrências dos paths antigos em `.md` não-rollback)
4. `git log --follow <para>` mostra histórico completo (não quebrou follow)
5. Match score atual vs layout-alvo ≥85%

**Reporte final:**

```
✅ Reorganização <data> aplicada (tipo: <tipo>)
- N movimentações executadas
- M refs em .md atualizadas
- Match score: X% → Y% (+Δ%)
- Histórico preservado via git mv
- Rollback: /organizar --rollback <data> ou ler .organizar-rollback-<data>.md

Pendentes (não-automatizadas):
- <item-1> (precisa decisão humana)
- <item-2>

Próximos passos sugeridos:
1. Verificar IDE/editor não tem refs hardcoded fora de .md (settings, .vscode/, etc)
2. Rodar build/tests do projeto pra garantir nada quebrou
3. Em ≥30 dias se tudo OK, considerar /organizar --purge <data> (delete .organizar-rollback-<data>.md)
4. Compartilhar o layout canônico aplicado: /upstream-update (futuro)
```

## Rollback (`--rollback <data>`)

1. Ler `.organizar-rollback-<data>.md`
2. Para cada movimentação (ordem reversa — último primeiro):
   - `git mv "<para>" "<de>"`
   - Reverter refs em `.md` afetados (search & replace inverso)
3. Commit: `revert(layout): /organizar --rollback <data>`
4. Marcar `.organizar-rollback-<data>.md` com nota `REVERTIDO em <data-atual>`
5. Reportar quais movimentações voltaram

## Casos especiais

### Reorganização em pasta-mãe multi-repo

- Default: opera só na **raiz da pasta-mãe**, NÃO entra em repos aninhados
- Flag `--include-repos` força reorganizar TAMBÉM dentro de cada repo (detecta tipo de cada um)
- Cada repo aninhado vira sub-reorganização própria com `.organizar-rollback-<data>.md` próprio

### Sistema pequeno (CLI/script/util)

- Layout canônico mínimo (só `README.md` + `src/` + `tests/` + `docs/` opcional)
- Skill detecta e NÃO força agrupamento `_negocio/_dev/` (over-engineering pra sistema pequeno)
- Match score relaxado (basta `README.md` + 1 dir de código)

### Monorepo (workspaces)

- Layout canônico: `packages/` + `apps/` + `_memoria/` raiz + `_negocio/` raiz + `tools/`
- NÃO move código entre `packages/<x>/` e `apps/<y>/` (estrutura de produto, não de organização)
- Foca em `_memoria/`, `_negocio/`, `tools/` + agrupamento de `.md` raiz

### Conflito de nome no destino

- Se `<para>` já existe: PAUSA e pergunta:
  - (A) Sobrescrever (raro — perdeu o destino existente, exige `git mv -f`)
  - (B) Renomear `<para>` pra `<para>.before-organizar-<data>` e continuar
  - (C) Pular essa movimentação
  - (D) Cancelar tudo

### Bruto sagrado (regra-base 2)

- Arquivos em `contextos/bruto/` e `inbox-*/` são **sagrados** — `/organizar` pode **mover a pasta inteira** (preservando estrutura interna), mas NUNCA renomeia ou reagrupa arquivos individuais dentro
- Se mover `contextos/bruto/` pra `_negocio/contextos/bruto/`, a pasta inteira vai junto

### `KODAI/` clone (upstream)

- **NUNCA** move arquivos dentro de `KODAI/` — é clone do upstream, mudanças sobem via `/upstream-update`, não via `/organizar`
- Pode mover a PASTA `KODAI/` inteira se layout-alvo pedir (raro)

### `.git/`, `.claude/`, `node_modules/`, `_memoria/`, `.faxina-quarentena/`

- **NUNCA** toca essas pastas (config IA, sistema, gitignored)
- Apenas reporta se houver desvio inesperado

## Política irmã + skills relacionadas

- `politicas/layout-canonico.md` — definição dos 4 layouts canônicos por tipo
- `templates/layouts/<tipo>.md` — template-alvo de cada tipo
- `politicas/explicar-acao-custosa.md` — Fase 4 + Fase 5 implementam 4 dados (O QUE, QUANTO, RISCO, REVERSÃO)
- `.claude/rules/commit-on-step.md` — Fase 6 respeita (commit por movimentação ou commit atômico)
- `skills/faxina/` — composta na Fase 3 (lixo orgânico)
- `skills/auditar-projeto/` — auditoria mais abrangente (8 fases inclui inventário + classificação); `/organizar` é a **execução** depois da auditoria
- `1-ESQUELETO/regras-base.md` regra 2 — bruto sagrado nunca tocado individualmente

## Limitações honestas

- **Refs hardcoded em código (.ts/.js/.py)** — busca de refs é só em `.md` por default; flag `--include-code` estende pra `.ts/.tsx/.js/.jsx/.py/.json` (mais lento, mais risco de falsos positivos)
- **Refs em settings JSON/YAML de IDE** — não tocadas; usuário deve verificar manualmente
- **Conflitos de merge em PRs abertos** — reorganização em branch ativa pode causar merge hell em PRs paralelos; recomendado em branch dedicada `chore/organizar-<data>`
- **`git mv` não funciona em arquivos staged + modified** — Fase 1 pausa se `git status` sujo
- **Sem detecção de "código órfão"** — apenas estrutura; código realmente sem uso fica intacto
- **Layouts canônicos podem evoluir** — versão do template fica registrada em `.organizar-rollback-<data>.md` pra reprodutibilidade

## Critérios de PASS

1. NENHUM arquivo perdido (todas movimentações via `git mv` preservam histórico)
2. `.organizar-rollback-<data>.md` gerado pra TODA reorganização
3. Reversão funciona em 1 comando
4. Bruto sagrado intocado (pasta pode mover; arquivos dentro nunca renomeados)
5. `KODAI/` clone NUNCA tocado por dentro
6. Refs em `.md` atualizadas automaticamente
7. `git log --follow` funciona em todos os arquivos movidos
8. Match score pós-reorganização ≥85% do layout-alvo
9. Gate humano em 5 níveis de granularidade (A/B/C/D/E + item-por-item)
10. Funciona em sistema pequeno (10 arquivos) e grande (10k+ arquivos)
