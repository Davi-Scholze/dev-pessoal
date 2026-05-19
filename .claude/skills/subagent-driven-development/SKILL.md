---
name: subagent-driven-development
description: >
  Use ao executar plano de implementação na sessão atual quando tasks são
  majoritariamente independentes. Dispatcha subagent fresh por task com
  review em duas fases (spec compliance primeiro, depois code quality).
  Alternativa ao `/executing-plans` (que é pra sessão separada). Use sempre
  que disser "executa esse plano com subagents", "/subagent-driven-development",
  "manda paralelo", "implementa essa spec na mesma sessão", ou após
  `/writing-plans` produzir plano com tasks independentes.
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, TodoWrite, Task]
---

# /subagent-driven-development — Execução paralela via subagents

> Status: **FUNCIONAL** (bundled em 2026-05-18 do Anthropic Superpowers via re-implementação. 3 companion prompts vendored com atribuição em `implementer-prompt.md`, `spec-reviewer-prompt.md`, `code-quality-reviewer-prompt.md`).

## Princípio

Executa plano dispatching **subagent fresh por task** com **review em duas fases**: spec compliance primeiro, code quality depois.

**Por que subagents:** você delega tasks a agentes especializados com contexto isolado. Curadoria precisa das instruções + contexto garante foco e sucesso. Subagents **nunca herdam** sua sessão; você constrói exatamente o que precisam. Isso preserva seu contexto pra coordenação.

**Princípio central:** fresh subagent por task + two-stage review (spec, depois quality) = alta qualidade, iteração rápida.

## Quando usar

```
Tem plano de implementação?
   sim → Tasks majoritariamente independentes?
              sim → Fica nesta sessão?
                       sim → /subagent-driven-development  (esta skill)
                       não → /executing-plans (sessão separada)
              não → execução manual ou volta pra /brainstorming
   não → /writing-plans primeiro
```

## vs `/executing-plans` (sessão paralela)

| Aspecto | subagent-driven-development | executing-plans |
|---|---|---|
| Sessão | Mesma (sem context switch) | Separada (handoff) |
| Contexto por task | Fresh subagent (isolado) | Mesma sessão (acumulativo) |
| Reviews | Two-stage automático após cada task | Manual / opcional |
| Velocidade | Iteração rápida sem human-in-loop | Mais checkpoints humanos |

## Processo (workflow completo)

```
1. Lê plano UMA vez, extrai TODAS as tasks com texto completo + contexto
2. Cria TodoWrite com todas as tasks
3. Para cada task em ordem:
   a. Dispatch implementer subagent (./implementer-prompt.md)
   b. Implementer faz perguntas? → responde + re-dispatch
   c. Implementer implementa, testa, comita, self-review
   d. Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)
   e. Spec reviewer confirma código bate com spec? Se não → implementer fixa → re-review
   f. Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)
   g. Code quality reviewer aprova? Se não → implementer fixa → re-review
   h. Marca task complete em TodoWrite
4. Após todas as tasks: dispatch final code reviewer pra implementação inteira
5. Usa /finishing-a-development-branch (se bundled futuro) pra fechar
```

## Seleção de modelo

Usa o **modelo menos poderoso que aguenta cada role** pra economizar custo e ganhar velocidade.

| Tarefa | Modelo |
|---|---|
| Implementação mecânica (1-2 arquivos, spec clara) | Cheap (Haiku) |
| Integração + judgment (multi-arquivo, padrões) | Standard (Sonnet) |
| Arquitetura, design, review | Mais capaz disponível (Opus) |

**Sinais de complexidade da task:**
- Toca 1-2 arquivos com spec completa → cheap
- Toca múltiplos arquivos com integration → standard
- Requer judgment de design ou entendimento amplo do codebase → mais capaz

## Lidando com status do implementer

Subagents implementer reportam um de 4 status:

### DONE
Prossegue pra spec compliance review.

### DONE_WITH_CONCERNS
Implementer completou o trabalho mas sinalizou dúvidas. **Leia as preocupações antes de prosseguir.** Se são sobre correctness/scope, trate antes da review. Se são observations (ex: "esse arquivo cresceu demais"), anote e prossegue.

### NEEDS_CONTEXT
Implementer precisa de informação que não foi fornecida. **Forneça o contexto que falta + re-dispatch.**

### BLOCKED
Implementer não consegue completar. Avalia o blocker:
1. **Problema de contexto:** mais contexto + re-dispatch com mesmo modelo
2. **Precisa mais reasoning:** re-dispatch com modelo mais capaz
3. **Task muito grande:** quebra em pedaços menores
4. **Plano errado:** escala pro humano

**Nunca** ignore escalation ou force o mesmo modelo a retry sem mudanças. Se o implementer disse que está parado, algo precisa mudar.

## Templates de prompt (companion files)

Os 3 prompts companion vivem nesta pasta:

- [`implementer-prompt.md`](implementer-prompt.md) — dispatcha implementer subagent
- [`spec-reviewer-prompt.md`](spec-reviewer-prompt.md) — dispatcha spec compliance reviewer
- [`code-quality-reviewer-prompt.md`](code-quality-reviewer-prompt.md) — dispatcha code quality reviewer

Os 3 são **vendored verbatim do source** (Apache-2.0, atribuição preservada). Editar pra adaptação fina ao KOD.AI fica como queue futuro.

## Vantagens

### vs Execução manual

- Subagents seguem TDD naturalmente
- Contexto fresh por task (sem confusão)
- Parallel-safe (subagents não interferem)
- Subagent pode fazer perguntas (antes E durante o trabalho)

### vs `/executing-plans`

- Mesma sessão (sem handoff)
- Progresso contínuo (sem espera)
- Review checkpoints automáticos

### Quality gates

- Self-review pega issues antes do handoff
- Two-stage review: spec compliance, depois code quality
- Review loops garantem que fixes funcionam
- Spec compliance previne over/under-building

### Custo

- Mais invocations de subagent (implementer + 2 reviewers por task)
- Controller faz mais prep (extrair todas as tasks upfront)
- Review loops adicionam iterações
- **Mas:** pega issues cedo (mais barato que debug depois)

## Red flags

**Nunca:**

- Começar implementação em main/master sem consentimento explícito do usuário
- Pular reviews (spec compliance OU code quality)
- Prosseguir com issues não-fixados
- Dispatch múltiplos implementation subagents em paralelo (conflitos)
- Fazer subagent **ler** arquivo de plano (fornece o **texto completo** em vez)
- Pular scene-setting context (subagent precisa entender onde a task encaixa)
- Ignorar perguntas do subagent (responde antes de deixar continuar)
- Aceitar "close enough" em spec compliance (spec reviewer achou issues = não está done)
- Pular review loops (reviewer achou issues = implementer fixa = review again)
- Deixar self-review do implementer substituir review real (ambos necessários)
- **Iniciar code quality review antes de spec compliance estar ✅** (ordem errada)
- Avançar pra próxima task enquanto reviews têm issues abertos

### Se subagent faz perguntas
- Responde claro e completo
- Fornece contexto adicional se necessário
- Não force ele pra implementação

### Se reviewer acha issues
- Implementer (mesmo subagent) fixa
- Reviewer revisa de novo
- Repete até aprovado
- **Não pula o re-review**

### Se subagent falha task
- Dispatch fix subagent com instruções específicas
- Não tenta fixar manualmente (poluição de contexto)

## Skills relacionadas

- **`/writing-plans`** — cria o plano que essa skill executa
- **`/executing-plans`** — alternativa pra sessão separada
- **`/test-driven-development`** (queue futuro) — subagents seguem TDD por task
- **`/requesting-code-review`** (queue futuro) — template pros reviewers
- **`/finishing-a-development-branch`** (queue futuro) — fechamento pós-execução
- **`/using-git-worktrees`** (queue futuro) — worktree isolada antes de começar

## Atribuição

Esta skill foi **bundled em 2026-05-18** por re-implementação do `subagent-driven-development` do plugin **Anthropic Superpowers** (`~/.claude/skills/subagent-driven-development/`). Os 3 prompts companion (`implementer-prompt.md`, `spec-reviewer-prompt.md`, `code-quality-reviewer-prompt.md`) foram **vendored verbatim** com atribuição preservada no manifest + LICENSES.md raiz.

## Diferenças vs source original

- Workflow em texto numerado (substitui DOT graph)
- Tom PT-BR direto
- Adicionado: notas "queue futuro" pra skills referenciadas que ainda não estão bundled
- Prompts companion vendored (não re-implementados)
- Removido: exemplo de workflow longo (mantido essencial; exemplo verbose pode virar `examples/` futuro)
