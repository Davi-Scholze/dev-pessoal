---
name: executing-plans
description: >
  Use quando você tem um plano de implementação escrito pra executar (idealmente
  em sessão separada da que escreveu) com checkpoints de review. Carrega plano,
  revisa criticamente, executa todas as tasks task-a-task, reporta quando completo.
  Termina com `/finishing-a-development-branch` (se bundled futuro). Use sempre
  que disser "executa esse plano", "/executing-plans", "manda ver", "implementa
  o plano da spec X", ou após `/writing-plans` produzir plano aprovado.
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, TodoWrite]
---

# /executing-plans — Execução de planos de implementação

> Status: **FUNCIONAL** (bundled em 2026-05-18 do Anthropic Superpowers via re-implementação).

## Princípio

Carrega plano, revisa criticamente, executa **todas** as tasks task-a-task, reporta quando completo. Esta skill é a contraparte de [`/writing-plans`](../writing-plans/SKILL.md) — ele escreve o plano, ela executa.

## Anúncio de início

> "Estou usando `/executing-plans` pra implementar esse plano."

## Quando usar

- Você tem plano escrito (via `/writing-plans` ou outro)
- Quer executar em sessão dedicada (separação cognitiva escrita vs execução)
- Tasks do plano são lineares ou minimamente dependentes
- Você NÃO tem acesso a subagents (se tiver, prefira `/subagent-driven-development`)

## Quando NÃO usar

- Plano não está escrito → roda `/writing-plans` antes
- Você tem subagents disponíveis → prefere `/subagent-driven-development` (mais paralelo + reviews automáticos)
- Mudança trivial sem multi-task

## Workflow

### Passo 1 — Carregar e revisar o plano

1. **Lê** o arquivo do plano (geralmente `docs/decisoes/tasks/<data>-<tema>/PLAN.md` em projetos KOD.AI)
2. **Revisa criticamente** — identifica perguntas ou preocupações:
   - Algum passo é vago demais?
   - Algum arquivo referenciado não existe?
   - Algum tipo/função usado em task tardia foi definido em task anterior?
   - Comandos têm output esperado?
3. **Se há preocupações:** levanta com o usuário ANTES de começar. Não tente "ajeitar no meio".
4. **Se zero preocupações:** cria TodoWrite com todas as tasks + segue Passo 2.

### Passo 2 — Executar tasks (uma de cada vez)

Para cada task em ordem:

1. **Marca task como `in_progress`** no TodoWrite
2. **Segue cada passo exatamente como o plano descreve** — passos são bite-sized (2-5 min)
3. **Roda verificações** quando o plano pede:
   - Roda teste e confere que **falha** quando esperado
   - Roda teste e confere que **passa** quando esperado
   - Cole o output **real**, não o esperado
4. **Marca task como `completed`** apenas após todas as verificações passarem
5. **Avança pra próxima task**

### Passo 3 — Concluir desenvolvimento

Após todas as tasks completas e verificadas:

> "Vou usar `/finishing-a-development-branch` pra concluir esse trabalho."

E invoca `/finishing-a-development-branch` (se bundled em onda futura — por ora, segue fluxo KOD.AI normal de commit + push imediato + Evidence Bloc + bump VERSION quando aplicável).

## Quando PARAR e pedir ajuda

**PARE de executar imediatamente quando:**

- Bate em **blocker** (dependência ausente, teste falha persistente, instrução pouco clara)
- Plano tem **gaps críticos** que impedem começar
- **Você não entende** uma instrução
- Verificação **falha repetidamente** (não rebrand de teste pra fazer passar)

> "Não consigo seguir o passo X da task Y porque [razão]. Como prosseguir?"

**Sempre pergunte em vez de chutar.**

## Quando voltar pra etapas anteriores

**Volta pro Passo 1 (revisão) quando:**

- Usuário atualiza o plano baseado no teu feedback
- A abordagem fundamental precisa ser repensada

**Não force passagem por blocker** — pare e pergunte.

## Lembrar

- **Revisa plano criticamente primeiro** (não pula etapa de leitura)
- **Segue passos exatamente** (não improvise)
- **Não pula verificações** (executa cada comando, cola output real)
- **Referencia skills quando o plano pede** (ex: TDD, code review, etc — quando bundled)
- **Pare quando bloqueado, não chute**
- **Nunca comece implementação na branch main/master sem consentimento explícito** — usa worktree ou feature branch

## Integração com fluxo KOD.AI

- **Worktree isolada (preferível):** se `/using-git-worktrees` bundled em onda futura, abre worktree dedicada
- **Commit + push imediato** após cada task (preferência Davi 2026-05-18)
- **TodoWrite** rastreia progresso visível pro usuário
- **Honestidade em claims (regra 10):** task só vira `completed` com verificação real, não "achei que funciona"

## Skills relacionadas

- **`/writing-plans`** — escreve o plano que esta skill executa
- **`/brainstorming`** — produz spec antes do plano
- **`/subagent-driven-development`** — alternativa pra mesmo-sessão com paralelismo + reviews
- **`/finishing-a-development-branch`** (queue futuro) — fechamento pós-execução

## Atribuição

Esta skill foi **bundled em 2026-05-18** por re-implementação a partir do `executing-plans` do plugin **Anthropic Superpowers** (`~/.claude/skills/executing-plans/`). Estrutura e processo originais Anthropic. Re-implementação em voz KOD.AI sem cópia verbatim; ver `manifest.yaml` desta pasta + `LICENSES.md` na raiz do KODAI.

## Diferenças vs source original

- Path do plano: `docs/decisoes/tasks/` (padrão KOD.AI)
- Próxima skill terminal: nota "se bundled em onda futura" pra `/finishing-a-development-branch`
- Tom PT-BR direto
- Adicionado: preferência commit+push imediato (regra Davi 2026-05-18)
- Adicionado: nota sobre worktree opcional (`/using-git-worktrees` queue)
