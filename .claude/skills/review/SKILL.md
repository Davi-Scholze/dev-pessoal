---
name: review
description: >
  Skill 5/6 do pipeline canônico KOD.AI. Review estruturada pós-execução
  antes de /complete. Audita diff agregado, valida critérios de aceitação
  da spec, identifica regressões, propõe melhorias. Wrapper semântico sobre
  /code-review (bundled). Use quando disser "/review <spec>", "revisar
  feature", "code review", "auditar entrega antes do complete".
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
---

# Skill: `/review` — Review Estruturada (passo 5/6 do pipeline)

> **Antes de declarar done, alguém vê do lado de fora.** Self-review do executor não basta.

## Princípio

`/execute` produz código + commits. `/review` valida **do lado de fora**:

- Diff agregado bate com escopo da `/spec`?
- Critérios de aceitação cumpridos?
- Regressões introduzidas?
- Anti-padrões do projeto presentes?
- Anti-pollution OK (marcas, secrets, PII)?
- Testes cobrem o que importa?
- Documentação atualizada?

Review **NÃO conserta bugs** — reporta. Quem conserta é executor (volta pra `/execute`).

## Quando disparar

- "/review <spec-path>"
- "revisar feature"
- "code review"
- "auditar entrega antes do complete"
- Após `/execute` antes de `/complete` (regra inviolável em features médias/grandes)

**Pular pra features triviais** (1-2 tasks lineares) — vai direto pro `/complete`.

## Workflow 6 passos

### 1. Carregar contexto

```bash
# Spec + tasks + plano + commits
git log --oneline origin/main..HEAD  # commits da feature
git diff origin/main...HEAD --stat   # arquivos tocados
```

### 2. Auditar diff contra spec

Para cada critério de aceitação da spec, verificar evidência no diff:

| Critério | Evidência no diff | Status |
|---|---|---|
| ... | path:linha | ✓ atendido |
| ... | _(não encontrado)_ | ✗ FALHA |

### 3. Detectar regressões

- Buscar testes alterados (não só novos): se teste antigo foi modificado, **por quê**?
- Pesquisar imports/exports removidos que outros módulos usavam
- Verificar mudanças em manifests/contratos: outras skills dependem?

### 4. Anti-pollution scan

```
grep -r "Mazzeo|MazyOS|Vagner|navortech\.com|navortech\.dev|<outras_marcas_proibidas>" <diff>
```

Verificar:
- Marcas concorrentes em corpo de doc (vs metadata = OK)
- Secrets vazados (.env, tokens, keys)
- PII de cliente (sem permissão explícita)
- Vocabulário verbatim copiado de fonte externa (n-gram ≥5)

### 5. Composição com `/code-review` (bundled)

Invocar a skill bundled `code-review` (metodologia Anthropic Superpowers) pra análise técnica profunda:

- Coupling alto entre módulos
- Abstrações prematuras
- Duplicação evitável
- Type safety
- Error handling completeness

### 6. Output

```markdown
# Review — <spec> — <data>

## Veredito
[APROVADO ✓ pode ir pra /complete] OU [REJEITADO ✗ — voltar /execute]

## Spec compliance
- N/M critérios de aceitação atendidos
- [lista falhas com evidência]

## Regressões detectadas
- (nenhuma) OU [lista path:linha + impacto]

## Anti-pollution
- ✓ Marcas: nenhum leak no corpo
- ✓ Secrets: nenhum
- ✓ PII: nenhum
- ✓ N-gram: nenhum verbatim suspeito

## Melhorias propostas (não-bloqueantes)
1. ...
2. ...

## Próximo passo
[/complete OU /execute correções]
```

## Quality Gates

```yaml
quality_gates:
  - "Spec carregada + critérios de aceitação enumerados"
  - "Diff agregado conferido contra critérios"
  - "Anti-pollution scan executado"
  - "Regressões verificadas"
  - "/code-review (bundled) invocado em features médias/grandes"
  - "Veredito explícito (APROVADO/REJEITADO)"
  - "Melhorias separadas em bloqueantes vs não-bloqueantes"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Self-review do executor | Bias confirmation | Sub-agente OU humano externo (Davi) |
| Aprovar "porque rodou" | Iron Law violada | Critérios de aceitação verificáveis |
| Pular anti-pollution scan | Leak vira viral | Sempre rodar grep marcas |
| Sugerir 50 melhorias | Bloqueia /complete | Mín 3 bloqueantes; demais como TODO futuro |
| Review sem testar | Diff lê bem mas quebra | Rodar /test-runner antes |

## Bridging

```yaml
sugere_proxima_skill:
  - condicao: "review APROVADO"
    skill: complete
    razao: "Declarar done com Evidence Bloc"
  - condicao: "review REJEITADO"
    skill: execute
    razao: "Voltar pra corrigir tasks apontadas"
  - condicao: "feature complexa precisa adversarial"
    skill: qa-verifier
    razao: "Sub-agente adversarial reproduz matriz E2E"

requires_skills_anteriores:
  - condicao: "tasks não executadas"
    skill: execute
```

## Composição com bundled

- `/code-review` (bundled Anthropic) — análise técnica profunda
- `/qa-verifier` (downstream-absorption) — adversarial E2E
- `/test-runner` (downstream-absorption) — pipeline mecânico

## Limitações

- Review sem rodar app não pega bugs de runtime
- Anti-pollution scan é grep — false negative se marca foi obfuscada
- Spec compliance depende de critérios mensuráveis (se `/spec` falhou aqui, review também)

## Origem

Pipeline canônico KOD.AI. Wrapper sobre `/code-review` bundled + adições anti-pollution + spec compliance check. Criada 2026-05-22 pós-audit item 2.
