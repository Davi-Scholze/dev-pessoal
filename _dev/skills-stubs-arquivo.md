# Skills SCHOLZE-STACK STUB — arquivadas em 2026-05-25

> Estas skills foram apagadas de `.claude/skills/` na limpeza KOD.AI de 2026-05-25.
> Motivo: stubs vazios (SKILL.md com 22-62 linhas, sem implementação concreta).
> Este arquivo preserva a INTENÇÃO original como candidatos a pack KOD.AI futuro.

## Removidas por substituto direto (7)

| Skill removida | Substituto canônico |
|---|---|
| `code-review-checklist` | skill bundled `code-review` (Anthropic, 233 linhas) |
| `refactor-safely` | agente `refactor-surgeon` em `.claude/agents/` + skill bundled refactor |
| `secrets-scan` | hook `pre-commit-guard.js` ativo no settings.json |
| `lgpd-ripd` | contexto-domínio `lgpd-seguranca-universal` v0.1.0 (Navortech) |
| `lgpd-dsr-endpoint` | contexto-domínio `lgpd-seguranca-universal` cobre RIPD + DSR + worst-case |
| `responsive-mobile-first` | contexto-domínio `responsividade-mobile-first` + pack `dev/ui-responsivo-smb` |
| `conventional-commits` | política universal `politicas/commits.md` + rule `commit-on-step.md` |

## Removidas por serem stubs vazios sem implementação (11)

São intenções não-implementadas. Cada uma pode virar pack KOD.AI quando houver necessidade real + Evidence Bloc do uso.

| Skill removida | Pack candidato futuro |
|---|---|
| `accessibility-axe` | `qualidade/accessibility-axe-core` |
| `api-design-rest` | `dev/api-design-rest` |
| `db-schema-postgres-rls` | `infra/supabase-config-maxima` (já DRAFT — incorporar) |
| `design-tokens` | conteúdo real (tokens.json) movido pra `_negocio/identidade/design-tokens.json`; stub apagado |
| `e2e-runner` | `qualidade/e2e-playwright` |
| `edge-function-supabase` | `infra/supabase-config-maxima` (já DRAFT — incorporar) |
| `expo-scaffold` | `mobile/expo-scaffold` |
| `git-flow-strict` | política universal `politicas/git-flow.md` candidata |
| `react-native-nativewind` | `mobile/react-native-nativewind` |
| `tailwind-shadcn-scaffold` | `dev/tailwind-shadcn-scaffold` |
| `vitest-unit` | `qualidade/vitest-unit` |

## Por que apagar?

Davi 2026-05-25 sessão pós-Navortech: "*Se elas inflam, apaga. O KODAI precisa ser clean code, se algo é repetido, ou lixo, não podemos ficar.*"

Stubs sem implementação concreta inflam o catálogo de skills (89 → 71 após esta limpeza), confundem `auto-suggest-skills` (hook que sugere skills relevantes) com ruído, e ocupam contexto da IA sem entregar valor.

## Resgate

Se precisar reativar alguma:
1. Restaurar via `git show <commit-anterior>:.claude/skills/<nome>/SKILL.md > .claude/skills/<nome>/SKILL.md`
2. **Mas só faça isso depois de implementar conteúdo real.** Stub voltar = lixo voltar.
