---
tipo: rule
eixo: orchestration
escopo: "**/*"
versão: 1.0
atualizado: 2026-05-20
fontes:
  - 1-ESQUELETO/regras-base.md (regra 7)
  - 1-ESQUELETO/politicas/commits.md
related:
  - ../../1-ESQUELETO/regras-base.md
  - ../../1-ESQUELETO/politicas/commits.md
  - ../../1-ESQUELETO/politicas/documentar-cada-implementacao.md
---

# Regra: commit a cada passo concluído

## Quando se aplica

Sempre que o agente concluir uma unidade lógica de trabalho — arquivo criado, função implementada, refactor isolado, política nova, manifest atualizado. Escopo glob é universal (`**/*`) porque a regra cobre qualquer mudança que faz parte de progresso rastreável.

## O que fazer

1. Identificar o ponto natural de fechamento (uma feature pequena, uma seção concluída, um bug fixado)
2. `git add <arquivos relacionados>` (granular — não usar `git add -A` sem revisar)
3. `git commit -m "<tipo>(<escopo>): <descrição imperativa>"` seguindo Conventional Commits
4. Push imediato (extensão local KOD.AI: "commit + push imediato é default")

## O que NÃO fazer

- Acumular 47 arquivos no fim do dia em 1 commit gigante
- Esquecer `git status` antes de commit (`.env` vaza pro repo)
- Force push em `main`/`master` (regra-base + hook `pre-commit-guard` bloqueia)
- `--no-verify` sem permissão explícita do Davi
- Commit message vago (`update`, `fix bug`, `WIP`)

## Antipadrões relacionados (do CONTEXT-OS §10)

- **#3 Diretivas ambíguas** — "fix bug" não diz qual bug; usar formato `fix(<escopo>): <bug específico>`
- **#1 Instruções em prosa sem comando acionável** — esta regra é **comando** explícito, não orientação vaga

## Política irmã

- `politicas/commits.md` — formato completo + Política C de pasta-mãe
- `politicas/documentar-cada-implementacao.md` — propagação de estado após commit
