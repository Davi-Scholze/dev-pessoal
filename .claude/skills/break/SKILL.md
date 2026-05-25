---
name: break
description: >
  Skill 2/6 do pipeline canônico KOD.AI. Decompõe spec aprovada em tasks
  atômicas comitáveis. Cada task = 1 commit ideal (regra-base 7). Output:
  seção 'tasks' adicionada à spec OU arquivo break separado. Cada task tem
  ID + descrição + dependências + estimativa + critério de done. Use quando
  disser "/break <spec>", "decompor spec", "quebrar em tasks", "vamos
  fragmentar".
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
---

# Skill: `/break` — Decomposição em Tasks Atômicas (passo 2/6 do pipeline)

> **Tarefa atômica = 1 commit ideal.** Se não consegue dar diff curto + mensagem clara, não é atômica.

## Princípio

Spec aprovada (de `/spec`) ainda é grande pra implementar. `/break` decompõe em **tasks atômicas**:

- **Cada task** = 1 unidade de trabalho que vira **1 commit limpo** (regra-base 7)
- **Diff alvo:** ≤500 linhas de mudança
- **Tempo alvo:** 15min-2h de trabalho focado
- **Dependências explícitas:** task X depende de Y
- **Critério de done:** verificável (sem ambiguidade)

Tasks ficam **na própria spec** (seção `## Tasks`) OU em arquivo separado `docs/decisoes/<data>_<topico>.tasks.md` quando spec é muito grande.

## Quando disparar

- "/break <spec-path>"
- "decompor spec X em tasks"
- "quebrar em tasks"
- "vamos fragmentar"
- Após `/spec` (regra inviolável: sem spec aprovada, não rodar `/break`)

## Workflow 5 passos

### 1. Carregar spec

```bash
# Ler spec aprovada
cat docs/decisoes/<data>_<topico>.md
```

Validar:
- Status = `em-andamento` (não `aberto` puro nem `descartado`)
- Escopo declarado (dentro + fora)
- Contratos handoff_in/out presentes
- Critérios de aceitação mensuráveis

Se faltar algum → ABORT + sugerir `/spec` pra completar antes.

### 2. Identificar eixos de decomposição

Aplicar heurísticas (na ordem):

| Eixo | Quando aplicar | Exemplo |
|---|---|---|
| **Camadas** | Stack vertical (DB → API → UI) | Migration + Endpoint + Frontend |
| **Slices verticais** | Features paralelas independentes | Cadastro cliente + Cadastro produto |
| **Setup vs Feature vs Cleanup** | Toda task tem 3 fases | Provisão infra + impl + remover legacy |
| **TDD red-green-refactor** | Quando há testes | Test red + impl green + refactor |
| **Risk-first** | Alta incerteza | POC + spec final + impl |

Referência: [`metodologias/slice-fluxo-visao.md`](../../metodologias/slice-fluxo-visao.md).

### 3. Escrever tasks (formato canônico)

```markdown
## Tasks

### T1 — <título imperativo curto>

- **Tipo:** setup | feature | refactor | test | docs | infra
- **Depende de:** _(nenhuma)_ | T0
- **Estimativa:** 30min | 1h | 2h
- **Critério de done:**
  - [ ] <verificável 1>
  - [ ] <verificável 2>
- **Commit alvo:** `<tipo>(<escopo>): <descrição>`
- **Notas:** _(opcional, contexto pra implementer)_

### T2 — <título imperativo curto>

- **Depende de:** T1
- ...
```

### 4. Validação (auto-check)

Antes de finalizar:

- [ ] Tasks têm ID único (T1, T2, ...) + numeração contínua
- [ ] Dependências formam DAG (sem ciclo)
- [ ] Estimativas somam ao escopo da spec (consistência)
- [ ] Cada task tem ≥1 critério de done verificável
- [ ] Pelo menos 1 task de teste/validação (se aplicável)
- [ ] Última task é "complete + push" (sintetiza Evidence Bloc)

### 5. Persistir + commit

```bash
# Opção A (preferida) — adicionar seção à spec existente
# Editar docs/decisoes/<data>_<topico>.md adicionando ## Tasks

# Opção B (spec grande) — arquivo separado
# Criar docs/decisoes/<data>_<topico>.tasks.md

git add docs/decisoes/<...>
git commit -m "break(<escopo>): decompõe spec <topico> em N tasks atômicas"
git push
```

## Quality Gates

```yaml
quality_gates:
  - "Spec referenciada existe + status em-andamento"
  - "Tasks têm ID T1...TN contínuo"
  - "DAG válido (sem dependência circular)"
  - "Cada task ≤500 linhas diff estimadas"
  - "Cada task ≤2h estimadas"
  - "Cada task tem critério de done verificável"
  - "Última task = complete + Evidence Bloc"
  - "Commit + push imediato"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Task de 8h "implementar feature" | Não cabe em 1 commit | Decompor em sub-tasks 1-2h |
| Critério de done vago ("ficar bom") | Não dá pra fechar | Verificável (output, métrica, teste passa) |
| Ciclo de dependência (T1→T2→T1) | DAG inválido | Reordenar OU mesclar tasks |
| Tasks sem dependência declarada | Ordem aleatória vira problema | Default = sequencial; declarar paralelo explicitamente |
| Pular tasks de teste | Code vira BUG amplificado | Mín 1 task de validação por feature |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "tasks decompostas + DAG validado"
    skill: plan
    razao: "Plano executável com ordem + paralelização"
  - condicao: "DAG complexo (>10 tasks com paralelismo)"
    skill: plan
    razao: "Plano explícito vira crítico"
  - condicao: "tasks simples (≤3) lineares"
    skill: execute
    razao: "Pular /plan, ir direto pro executor"

requires_skills_anteriores:
  - condicao: "spec não foi escrita"
    skill: spec
    razao: "Sem spec, não decompor"
```

## Limitações honestas

- Estimativas são chutes — usar histórico pra calibrar
- Tasks muito atômicas (5min cada) = overhead burocrático; tasks muito grandes (>2h) = não atômicas
- Dependências entre features pode forçar tasks "cross-cutting" — documentar
- Re-break: se tasks falham repetidamente, /break de novo após retrospectiva

## Origem

Skill canônica do pipeline KOD.AI. Criada 2026-05-22 pós-audit (item 2 YELLOW). Princípio "1 task = 1 commit" da regra-base 7 + extensão local Davi (commit + push imediato).
