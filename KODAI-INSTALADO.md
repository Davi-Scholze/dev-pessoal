# KODAI-INSTALADO — Projetos Dev Pessoais

> Inventário do que foi instalado via KOD.AI /instalar.
> Atualizar sempre que um pack ou contexto-domínio for adicionado/removido.
> Última atualização: 2026-05-21 (sync upstream 0.6.0-dev commit e9ea7e6 — +10 skills, +6 rules, +8 políticas, +2 contextos-domínio, +4 packs)

---

## Versão instalada

| Campo | Valor |
|---|---|
| Versão KOD.AI | `0.6.0-dev` (sync 2026-05-21, commit upstream `e9ea7e6`) |
| Perfil | `completo` |
| Data instalação inicial | 2026-05-15 |
| Última atualização | 2026-05-21 (`/atualizar-kodai` modo total — propagação 10 skills + 6 rules path-scoped) |
| Upstream | github.com/Davi-Scholze/kod-ai |
| Modo | Pasta-mãe existente (Categoria C) |

---

## O que foi adicionado

### Arquivos KOD.AI novos
- [x] `_memoria/empresa.md` — contexto do negócio
- [x] `_memoria/estrategia.md` — foco e prioridades
- [x] `_memoria/preferencias.md` — tom, estilo, evitar
- [x] `_negocio/identidade/design-guide.md` — paleta dark minimalist
- [x] `_negocio/MAPA.md` — mapa consolidado (entrada rápida + detalhado; MAPA_PESSOAL.md mesclado em 2026-05-21 via `/organizar`)
- [x] `_negocio/PENDENCIAS.md` — fila priorizada
- [x] `_negocio/PROMPT_MASTER_HANDOFF.md` — estado vivo completo
- [x] `KODAI-INSTALADO.md` — este arquivo

### O que já existia (mantido intocado)
- [x] `CLAUDE.md` — regras de IA (compatível com KOD.AI)
- [x] `AGENTS.md` — 18 agentes SCHOLZE-STACK (compatível)
- [x] `.claude/rules/regras-sessao.md` — regras operacionais (extensão local, movida 2026-05-21 via `/organizar`)
- [x] `_negocio/contextos/` — biblioteca de conhecimento
- [x] `docs/` — documentação
- [x] `_dev/ferramentas/` — templates e catálogos
- [x] `.claude/` — SCHOLZE-STACK (agents, skills, hooks, commands)
- [x] `Repositorios/` — code repos

### Skills KOD.AI propagadas em `.claude/skills/` (atualizado 2026-05-21)

**Universais nativas v0.4 (14):** abrir, absorver-contexto, absorver-referencia, atualizar, capturar, capturar-contexto-cliente, check-in, criar-contexto, criar-pack, criar-perfil, mapear-rotinas, salvar, ver, writing-plans

**Universais v0.5 (5):** ativar-notebooklm, evoluir-contexto, sugerir-pesquisa, auditar-projeto, capturar-imagem

**Universais v0.6-dev (4):** capturar-video, faxina, **absorver-midia** ✨, **validar-handoff** ✨

**Bundled Tier 3 Anthropic (16):** brainstorming, transcribe-audio, executing-plans, subagent-driven-development, notebooklm, google-workspace, dev-browser, excalidraw-diagram, code-review ✨, verification-before-completion ✨, finishing-a-development-branch ✨, using-git-worktrees ✨, systematic-debugging ✨, test-driven-development ✨, writing-skills ✨, skill-creator ✨

**Instalação/gestão (6):** adicionar-pack, atualizar-kodai, instalar, listar-disponiveis, remover-pack, trocar-perfil

✨ = propagadas em 2026-05-21 via `/atualizar-kodai`

Convivem lado-a-lado com as ~20 skills técnicas do SCHOLZE-STACK (accessibility-axe, conventional-commits, debug-systematic, code-review-checklist, etc.). Total atual em `.claude/skills/`: **67**.

### Regras path-scoped em `.claude/rules/` (propagadas 2026-05-21)

Camada complementar ao `AGENTS.md` raiz — regras injetadas só quando glob de arquivo corresponde:

| Regra | Glob | O que opera |
|---|---|---|
| `commit-on-step.md` | `**/*` | regra-base 7 (commit a cada passo) |
| `gitignore-aditivo.md` | `**/.gitignore` | nunca sobrescrever .gitignore |
| `sql-migrations.md` | `**/migrations/*.sql` | DDL exige aprovação humana |
| `playwright-output-path.md` | `.mcp.json` + `*.spec.*` | Playwright nunca escreve na raiz |
| `ui-cycle-trigger.md` | `*.tsx/jsx/vue/svelte` | ciclo Ver→Analisar→Propor→Testar→Reportar |
| `tests-when-modifying.md` | `*.test.*` + `tests/**` | TDD obrigatório |

Preservado: `regras-sessao.md` (extensão SCHOLZE local — regras operacionais de toda sessão).

### Hook SessionStart adicionado em `.claude/settings.json` (2026-05-18)

Dispara `/abrir` automaticamente no início de cada sessão (Sessão Zero v0.2.1). Hooks PreToolUse (block-dangerous.py) e PostToolUse (log-metrics.py) do SCHOLZE-STACK preservados.

---

## Contextos-domínio ativos no upstream

> Política v0.2.0: contexto-domínio só entra quando há síntese curada com NotebookLM pareado.

| Domínio | Status | Path no KOD.AI | Origem |
|---|---|---|---|
| ai-ecosystem-strategy | DRAFT | `KODAI/3-CONTEXTOS-DOMINIO/ai-ecosystem-strategy/` | absorção a16z (2026-05-20) |
| competitive-intelligence | DRAFT | `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/` | absorção (2026-05-20) |
| **sistemas-empresariais-br** ✨ | **DRAFT** | `KODAI/3-CONTEXTOS-DOMINIO/sistemas-empresariais-br/` | **Davi 2026-05-21 (par doc+notebook 26782f74)** |

✨ = adicionado na sessão 2026-05-21 (commit upstream `d53abde`)

---

## Packs ativos

Nenhum pack FUNCIONAL ainda — promoção exige Evidence Bloc com uso real.

### Packs DRAFT/STUB no upstream

| Pack | Status | Onde | Origem |
|---|---|---|---|
| `marketing/seo` | DRAFT | upstream | absorção MazyOS 2026-05-17 |
| `ia/contexto-profundo` | DRAFT | upstream | pesquisa NotebookLM 2026-05-21 |
| `infra/supabase-config-maxima` | DRAFT | upstream | absorção onda 2 |
| `infra/vercel-config-maxima` | DRAFT | upstream | absorção onda 2 |
| `integracoes/email-smtp-transacional` | DRAFT | upstream | absorção onda 2 |
| `infra/mcp-server-template` | STUB | upstream | absorção 2026-05-20 |
| `infra/qr-scanner-web` | STUB | upstream | absorção 2026-05-20 |
| `infra/pwa-webgpu` | docs | upstream | absorção 2026-05-20 |
| `ia/face-recognition` | notebooklm-only | upstream | absorção 2026-05-20 |
| **`dev/ui-responsivo-smb`** ✨ | **DRAFT** | upstream | **Davi 2026-05-21 (par doc+notebook 216c85a8)** |

✨ = adicionado na sessão 2026-05-21 (commit upstream `d53abde`)

## Políticas universais novas no upstream (sync 2026-05-21)

8 políticas em `KODAI/1-ESQUELETO/politicas/` (absorção 2026-05-20 framework MIT vendas IA):

- `memoria-3-tier.md` — Core/Recall/Archival, file-based, sem vector DB
- `handoff-contracts.md` — `handoff_in/out + quality_gates` no manifest
- `event-log-ndjson.md` — `logs/events.ndjson` append-only
- `reflexion-per-skill.md` — Reflexion pattern (Shinn et al. 2023)
- `squad-3-tier.md` — Coordinator/Director/Employee, cost 10/20/70
- `quality-gates-com-critic-grounding.md` — Critic com tool grounding
- `portabilidade-orquestracao-24-7.md` — Skill→agent via `runtime:`
- `notebooklm-fonte-ancorada.md` — gating de fonte ancorada

## Metodologias e docs novos (sync 2026-05-21)

- `KODAI/1-ESQUELETO/metodologias/vendas-ia-por-valor-aios.md` (substitui `vendas-pe-no-peito.md`)
- `KODAI/1-ESQUELETO/templates/layouts/pasta-mae-PARA-johnny-decimal.md`
- `KODAI/docs/STRATEGIC-NORTH.md`

---

## Fonte do KOD.AI nesta máquina

```
C:\Users\usuario\Documents\Projetos Dev Pessoais\KODAI\
```
(raiz da pasta-mãe — regra: clone do KOD.AI fica na raiz quando a pasta tem múltiplos repos)

---

## Conflitos detectados (resolvidos)

| Item | Classificação | Resolução |
|---|---|---|
| MAPA.md vs MAPA_PESSOAL.md | (b) Diverge — mesmo escopo, nomes diferentes | **Consolidado em `_negocio/MAPA.md`** (2026-05-21 via `/organizar`); MAPA_PESSOAL.md em quarentena |
| REGRAS_SESSAO.md | (a) Extra local — não está no template | **Movido pra `.claude/rules/regras-sessao.md`** (2026-05-21 via `/organizar`) |
| `.claude/` (SCHOLZE-STACK) | (a) Extra local — extensão local | Mantido intocado |
| `_dev/ferramentas/` | (a) Extra local | Movido de `ferramentas/` pra `_dev/ferramentas/` (2026-05-21) |
| `docs/` raiz | Override do template | Mantido na raiz por opção do usuário; registrado em `_layout-override.md` (2026-05-21) |

---

## Para atualizar o KOD.AI

```
cd KODAI
git pull origin main
```

Depois, na sessão Claude Code desta pasta:
```
/atualizar-kodai
```
