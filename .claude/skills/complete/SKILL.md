---
name: complete
description: >
  Skill 6/6 do pipeline canônico KOD.AI — fechamento com Iron Law (regra-base
  12). Produz Evidence Bloc obrigatório: timestamp + comando rodado + output
  literal + critério de sucesso + resultado. Atualiza status da spec
  (em-andamento → implementado). Update handoff pra próxima sessão. Compõe
  /verification-before-completion (bundled — Iron Law) + /finishing-a-development-branch.
  Use quando disser "/complete", "fechar feature", "declarar done", "fim
  da spec".
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

# Skill: `/complete` — Fechamento com Evidence Bloc (passo 6/6 do pipeline)

> **Sem Evidence Bloc, NÃO existe "done".** Iron Law (regra-base 12). Hook `check-completion-claims.js` bloqueia mecanicamente.

## Princípio

Cada passo do pipeline foi anti-claim:
- `/spec` exigiu hipótese falsificável
- `/break` exigiu critério de done verificável
- `/plan` exigiu stop-criteria explícitos
- `/execute` exigiu commits granulares
- `/review` exigiu veredito explícito

`/complete` fecha o ciclo gerando **Evidence Bloc** que prova:

```
EVIDENCE BLOC — <feature>
- Timestamp: 2026-MM-DD HH:MM TZ
- Quem rodou: <IA/sub-agente/humano>
- Comando/Ação: <exato — copy-paste>
- Output observado: <literal — log/screenshot/queries DB>
- Critério de sucesso: <da spec>
- Resultado: ✅ PASSOU / 🟡 PARCIAL / 🔴 FALHOU
- Limitações conhecidas: <o que NÃO foi testado>
```

Sem Evidence Bloc adjacente, palavras como `testado`, `validado`, `E2E`, `completo`, `funcional`, `done` são **proibidas** (hook bloqueia).

## Quando disparar

- "/complete"
- "fechar feature"
- "declarar done"
- "fim da spec"
- Após `/review` APROVADO (regra inviolável)

## Workflow 7 passos

### 1. Pré-condições

Verificar antes de prosseguir:

- [ ] `/review` reportou APROVADO?
- [ ] Tasks da spec todas com commit?
- [ ] Push remoto sincronizado?
- [ ] Critérios de aceitação da spec verificados?

Se faltar algum → ABORT + sugerir passo anterior.

### 2. Coletar evidência empírica

Pra cada critério de aceitação da `/spec`, coletar:

- **Comando exato** que validou (curl, query, screenshot, teste)
- **Output literal** (não-parafraseado — copy-paste)
- **Critério de sucesso** declarado na spec
- **Resultado** (PASSOU/PARCIAL/FALHOU)
- **Limitações** (o que ficou pra futuro)

### 3. Compor com `/verification-before-completion` (bundled)

Invocar skill bundled `verification-before-completion` (Anthropic Superpowers — Iron Law metodológica). Garante:

- 0 claims sem evidência
- 0 promessas vazias ("vai funcionar amanhã")
- 0 "rebaixamento implícito" de testes

### 4. Atualizar status da spec

```yaml
# Frontmatter da docs/decisoes/<spec>.md
status: implementado  # antes era em-andamento
data_complete: 2026-MM-DD
commits_finais: [hash1, hash2, ...]
```

E adicionar seção:

```markdown
## Evidence Bloc — Complete <data>

[blocos por critério de aceitação]

## Lessons learned
- ...

## Próximas iterações sugeridas
- ...
```

### 5. Atualizar handoff

Política irmã [`status-honesto-handoff.md`](../../politicas/status-honesto-handoff.md):

Criar `inbox-davi/<YYYY-MM-DD>-resumo.md` (ou append se já existe):

```markdown
## Sessão <data> — <tema>

### O que foi feito
- Spec <topico> — status: FUNCIONAL ou BATTLE-TESTED — Evidence Bloc em [link]

### O que NÃO foi testado (deixado pra Davi)
- ...

### OK pendente Davi
- [ ] Davi confirma "validado" pra promover BATTLE-TESTED
```

### 6. Event log final

```json
{"ts":"2026-MM-DDTHH:MM:SSZ","skill":"complete","spec":"<topico>","status":"implementado","commits":N,"duration_total_min":M,"critérios_atendidos":"N/M","limitações":"<lista>"}
```

Append em `logs/events.ndjson`.

### 7. Commit + push final

```bash
git add docs/decisoes/<spec>.md inbox-davi/<data>-resumo.md logs/events.ndjson
git commit -m "complete(<escopo>): <spec> implementada com Evidence Bloc"
git push origin main
```

## Quality Gates (Iron Law)

```yaml
quality_gates:
  - "/review status: APROVADO"
  - "Todas tasks com commit + push"
  - "Cada critério de aceitação tem Evidence Bloc"
  - "Output observado é literal (não parafraseado)"
  - "Resultado explícito (PASSOU/PARCIAL/FALHOU) por critério"
  - "Limitações declaradas (o que NÃO foi testado)"
  - "Spec status atualizado pra implementado"
  - "Handoff inbox-davi/<data>-resumo.md atualizado"
  - "Event log NDJSON gravado"
  - "Hook check-completion-claims passou (nada bloqueado)"
  - "Commit + push final"
```

## Anti-padrões críticos (bloqueados por hook)

| Padrão | Por quê problemático | Correção |
|---|---|---|
| "E2E validado" sem Evidence Bloc | Iron Law violada | Bloco com timestamp + comando + output literal |
| "Tudo funcionando" sem teste rodado | Claim vazio | Rodar teste, colar output |
| Promover FUNCIONAL → BATTLE-TESTED sem OK humano | Pula nível | Aguardar "validado" textual do Davi |
| Esquecer limitações | Mente futura sessão | Listar explicitamente o que NÃO foi testado |
| Parafrasear output | Distorce evidência | Copy-paste literal |
| Commit em batch (skipping checkpoints anteriores) | Histórico vira útil pra revert | 1 task = 1 commit (regra-base 7) |
| Push esquecido | Trabalho local não conta | Push imediato (default Davi) |

## Bridging

```yaml
sugere_proxima_skill:
  - condicao: "complete OK + spec virou FUNCIONAL"
    skill: salvar
    razao: "Persistir estado no PROMPT_MASTER_HANDOFF + memórias"
  - condicao: "complete OK + Davi vai testar manualmente"
    skill: live-preview
    razao: "Davi valida visualmente antes de BATTLE-TESTED"
  - condicao: "feature complexa exige absorção pra core"
    skill: upstream-update
    razao: "Loop cliente → core (sentido bidirecional)"

requires_skills_anteriores:
  - condicao: "review não aprovou"
    skill: review
    razao: "Sem APROVADO, não declarar complete"
  - condicao: "tasks pendentes"
    skill: execute
```

## Composição com bundled / hooks

- **Bundled** `/verification-before-completion` — Iron Law metodológica
- **Bundled** `/finishing-a-development-branch` — workflow git de fechamento
- **Hook** `check-completion-claims.js` — bloqueia mecanicamente claims sem Evidence Bloc
- **Política** `status-honesto-handoff.md` — formato handoff sessão→sessão
- **Política** `event-log-ndjson.md` — append-only log

## Limitações

- Evidence Bloc gera overhead — em micro-mudanças (typo, rename) é excessivo (usar commit direto + msg clara)
- BATTLE-TESTED requer OK textual humano — em autonomous-mode sem humano, máx FUNCIONAL
- Janela de validade Evidence Bloc é arbitrária — não captura mudanças semânticas depois

## Origem

Skill canônica pipeline KOD.AI. Composto sobre `/verification-before-completion` (bundled) + `/finishing-a-development-branch` (bundled) + hook `check-completion-claims.js` + política `status-honesto-handoff.md`. Criada 2026-05-22 pós-audit item 2 — fecha pipeline 6/6.
