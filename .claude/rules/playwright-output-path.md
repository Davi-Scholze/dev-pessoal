---
tipo: rule
eixo: orchestration
escopo: "**/.mcp.json,**/playwright.config.*,**/*.spec.{ts,js}"
versão: 1.0
atualizado: 2026-05-20
fontes:
  - 1-ESQUELETO/politicas/imagens.md
  - 1-ESQUELETO/metodologias/ver-analisar-propor-testar-reportar.md
related:
  - ../../1-ESQUELETO/politicas/imagens.md
  - ../../1-ESQUELETO/skills-universais/dev-browser/SKILL.md
  - ../../1-ESQUELETO/skills-universais/ver/SKILL.md
---

# Regra: Playwright nunca escreve na raiz do projeto

## Quando se aplica

Configuração de Playwright MCP (`.mcp.json` com server `playwright`) ou arquivos de teste E2E (`*.spec.ts`, `*.spec.js`, `playwright.config.*`).

## O que fazer

1. `.mcp.json` deve passar `--output-dir <fora-da-raiz>` pro server Playwright. Ex Windows: `--output-dir C:/Users/<user>/AppData/Local/playwright-mcp/`
2. Screenshot **efêmero** (validação de fluxo) → deixa Playwright escolher path → cai em `--output-dir`
3. Screenshot **evidência permanente** (documenta bug/decisão) → mover **depois** pra `mapeamento/evidencias/<data>/` ou `inbox-<pessoa>/screenshots/`
4. Em `.spec.ts` / `playwright.config.*`: `screenshotPath` e `videoPath` apontam pra subpasta gitignored (`.playwright-mcp/`, `test-results/`)

## O que NÃO fazer

- Passar `filename` relativo pro `browser_take_screenshot` (ex: `"snapshot.png"` ou `"./foo.png"`) — server resolve relativo ao cwd = raiz do projeto = polui o repo
- Commitar PNGs soltos na raiz
- Salvar evidência direto via `--output-dir` (efêmero primeiro, curadoria depois)
- Esquecer de adicionar `.playwright-mcp/` no `.gitignore`

## Antipadrões relacionados

- **#2 Context stuffing visual** — PNGs efêmeros na raiz inflam `git status` e contexto da IA
- Política `gitignore-aditivo` — append do delta `.playwright-mcp/` + `/*.png`

## Política irmã + skill

- `politicas/imagens.md` — 3 tipos (Bruto / Evidência permanente / Validação efêmera)
- `skills-universais/ver/` — passo 1 do ciclo UI já respeita esta regra
- `skills-universais/dev-browser/` — wrapper genérico Playwright MCP
