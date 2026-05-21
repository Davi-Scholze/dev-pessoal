---
tipo: readme
eixo: orchestration
escopo: .claude/rules/
versão: 1.0
atualizado: 2026-05-20
related:
  - ../../AGENTS.md
  - ../../PRECEDENCE.md
  - ../../1-ESQUELETO/metodologias/estrutura-de-contexto.md
---

# `.claude/rules/` — Regras escopadas por glob

## O que vive aqui

Regras **path-scoped**: cada arquivo declara um `escopo` glob no header e a regra **só é injetada no contexto da IA** quando o agente acessa arquivo correspondente. Refinamento do nível 5 da `PRECEDENCE.md` (AGENTS.md de subpasta), implementando o padrão Anthropic Effective Context Engineering (set/2025) capturado via NotebookLM em 2026-05-20.

Mantém regras específicas **fora do contexto global** — combate context rot e respeita progressive disclosure (regra-de-ouro 3 de `estrutura-de-contexto.md`).

## Arquivos principais

- `commit-on-step.md` — regra-base 7 (commit a cada passo) ativa em qualquer edit
- `gitignore-aditivo.md` — sobrescrita de `.gitignore` proibida
- `sql-migrations.md` — DDL exige aprovação humana (combina com hook `pre-commit-guard`)
- `playwright-output-path.md` — Playwright nunca escreve na raiz do projeto
- `ui-cycle-trigger.md` — ciclo Ver→Analisar→Propor→Testar→Reportar em arquivos de UI
- `tests-when-modifying.md` — TDD obrigatório ao tocar `*.test.*`

## Como usar

Hook ou system prompt do projeto consumidor lê este diretório no início + monitora arquivos editados. Quando glob corresponder, a regra é **injetada no contexto da IA** com prefixo `## Regra escopada: <nome>`.

A camada `.claude/rules/` é **complementar** ao `AGENTS.md` raiz, não substituta:

- `AGENTS.md` raiz = regras universais do projeto (sempre carregadas)
- `.claude/rules/<nome>.md` = regras específicas a paths (carregadas só quando relevante)

## NotebookLM vinculado

https://notebooklm.google.com/notebook/d1f1e975-4317-42d2-9787-6e1f819e9e1d (Estrutura de Contextos — Fonte #38)

## Relações com outras pastas

- `../../AGENTS.md` — fonte única; aponta pra este diretório como camada complementar
- `../../PRECEDENCE.md` — nível 5 desta hierarquia
- `../../1-ESQUELETO/politicas/` — políticas universais (sempre carregadas); regras path-scoped operacionalizam essas políticas em paths específicos
- `../hooks/` — quando regra precisa de garantia mecânica, vira hook JS
