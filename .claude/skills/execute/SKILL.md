---
name: execute
description: >
  Skill 4/6 do pipeline canônico KOD.AI. Executa tasks do plano com commits
  granulares (1 task = 1 commit). Reporta progresso em cada checkpoint.
  Aborta no primeiro fail respeitando stop-criteria do plano. Compõe com
  /executing-plans (bundled) + /subagent-driven-development (paralelo).
  Use quando disser "/execute <spec>", "rodar plano", "implementar tasks".
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

# Skill: `/execute` — Executor de Plano (passo 4/6 do pipeline)

> **1 task = 1 commit + push imediato.** Sem batch no fim do dia. Sem `--no-verify`. Sem pular checkpoints.

## Princípio

`/plan` definiu **como** executar. `/execute` **faz acontecer**, respeitando:

- **Granularidade:** 1 task = 1 commit limpo
- **Checkpoints:** parar e reportar nos pontos definidos pelo plano
- **Stop-criteria:** abortar quando plano disser
- **Iron Law:** nunca declarar "done" sem Evidence Bloc (vira `/complete`)
- **Commit + push imediato:** extensão local Davi (default desta pasta)

## Quando disparar

- "/execute <spec-path>"
- "rodar plano"
- "implementar tasks"
- "executar"
- Após `/plan` (ou direto após `/break` se tasks ≤3 simples)

## Workflow 7 passos

### 1. Carregar spec + tasks + plano

```bash
cat docs/decisoes/<spec>.md
# Validar: ## Tasks + ## Plano presentes
```

### 2. Pre-flight (se aplicável)

Se plano envolve infra/deploy/banco, rodar [`/verificar-infra-real`](../verificar-infra-real/) antes (política inviolável).

### 3. Loop por task (sequencial OU paralelo conforme plano)

Para cada task na ordem do plano:

```
3.1 Anunciar task começando — "Iniciando T<N>: <título>"
3.2 Implementar
3.3 Auto-validar critério de done da task
3.4 git add <arquivos da task>
3.5 git commit -m "<tipo>(<escopo>): <descrição imperativa>"
3.6 git push origin main (default Davi)
3.7 Reportar diff + screenshot (se UI) + Evidence breve
3.8 Se task = checkpoint → pausar pra Davi confirmar antes de seguir
```

**Paralelismo** (se plano declarar): invocar sub-agentes background via `Agent(run_in_background=true)`. Política irmã: [`coordinator-na-sessao-pai.md`](../../politicas/coordinator-na-sessao-pai.md).

### 4. Aplicar stop-criteria

Se algum critério bater:

```
- ABORT no fail crítico → reverter task em progresso
- Pausar + reportar Davi
- Se necessário, voltar pra /spec ou /plan
```

### 5. Validar ciclo UI (se aplicável)

Tasks que mexem em UI disparam regra [`ui-cycle-trigger`](../../.claude/rules/ui-cycle-trigger.md):

```
VER → ANALISAR → PROPOR → TESTAR → REPORTAR
```

Via Playwright MCP + 3 viewports.

### 6. Eventos persistidos

Cada task gera linha em `logs/events.ndjson` (política [`event-log-ndjson.md`](../../politicas/event-log-ndjson.md)):

```json
{"ts":"2026-05-22T15:00Z","skill":"execute","task":"T2","status":"done","commit":"<hash>","duration_min":47}
```

### 7. Síntese pós-execução

Ao final de todas tasks:

- Diff total + N commits + push status
- Tasks com Evidence Bloc separado por estado
- Próximo passo: `/review` ou `/complete`

## Quality Gates

```yaml
quality_gates:
  - "Spec + tasks + plano carregados"
  - "Pre-flight rodado se aplicável"
  - "1 task = 1 commit (nunca batch)"
  - "Commit message no formato Conventional Commits"
  - "Push imediato pós-cada commit (default Davi)"
  - "Checkpoints respeitados (pausa pra confirmação)"
  - "Stop-criteria aplicados em fail"
  - "UI cycle aplicado em mudanças visuais"
  - "Event log NDJSON gravado por task"
  - "Sem --no-verify / --force / --skip-tests"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Batch commits no fim do dia | Histórico ruim, hard to revert | Commit a cada task |
| `--no-verify` pra fazer passar | Hook existe por motivo | Investigar fail, corrigir |
| Pular checkpoint "porque tá tudo bem" | Davi perde controle | Sempre pausar nos checkpoints |
| Continuar após stop-criteria bater | Cascata de bugs | ABORT explícito |
| Esquecer push | Trabalho fica local | Push imediato (extensão local Davi) |
| UI change sem ciclo Ver→Reportar | Bug visual escapa | Playwright MCP obrigatório |

## Bridging

```yaml
sugere_proxima_skill:
  - condicao: "todas tasks done sem fails"
    skill: review
    razao: "Review estruturada antes de /complete"
  - condicao: "task UI completa"
    skill: ver
    razao: "Validação visual antes de seguir"
  - condicao: "task falhou + sintoma estranho"
    skill: systematic-debugging
    razao: "Debug antes de retry"

requires_skills_anteriores:
  - condicao: "plano não definido"
    skill: plan
    razao: "Sem plano, não executar (exceto tasks triviais ≤3)"
  - condicao: "infra externa mencionada"
    skill: verificar-infra-real
    razao: "Política inviolável"
```

## Composição com skills bundled

`/execute` **compõe**:
- `/executing-plans` (metodologia bundled — Anthropic Superpowers): princípios de execução disciplinada
- `/subagent-driven-development` (bundled): paralelização via sub-agentes
- `/test-driven-development` (bundled): se task envolve TDD

## Limitações honestas

- Pode falhar por motivo fora do escopo (infra, dependência externa, quota) — escalar pra Davi
- Paralelização limitada a 3 sub-agentes (quota Anthropic)
- Reverter task = `git reset --hard` é destrutivo — pedir confirmação Davi
- Sem suporte a branch merge complexo (1 branch principal default — Davi tem 1 branch)

## Origem

Skill canônica pipeline KOD.AI. Composto sobre `/executing-plans` (bundled) + extensão local Davi (commit+push imediato). Criada 2026-05-22 pós-audit item 2.
