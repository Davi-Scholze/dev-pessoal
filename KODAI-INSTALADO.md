# KODAI-INSTALADO — Projetos Dev Pessoais

> Inventário do que foi instalado via KOD.AI /instalar.
> Atualizar sempre que um pack ou contexto-domínio for adicionado/removido.
> Última atualização: 2026-05-25 (sync upstream 0.6.0-dev commit 80f5f07 — +19 skills, +3 hooks JS, +5 contextos-domínio universais via Navortech + 6 commands delegate SDD + remoção 2 stubs duplicados)

---

## Versão instalada

| Campo | Valor |
|---|---|
| Versão KOD.AI | `0.6.0-dev` (sync 2026-05-25, commit upstream `80f5f07`) |
| Perfil | `completo` |
| Data instalação inicial | 2026-05-15 |
| Última atualização | 2026-05-25 (`/atualizar-kodai` modo total pós-Navortech — propagação 19 skills + 3 hooks JS + ativação settings.json) |
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

### Skills KOD.AI propagadas em `.claude/skills/` (atualizado 2026-05-25)

**Universais nativas v0.4 (14):** abrir, absorver-contexto, absorver-referencia, atualizar, capturar, capturar-contexto-cliente, check-in, criar-contexto, criar-pack, criar-perfil, mapear-rotinas, salvar, ver, writing-plans

**Universais v0.5 (5):** ativar-notebooklm, evoluir-contexto, sugerir-pesquisa, auditar-projeto, capturar-imagem

**Universais v0.6-dev (4):** capturar-video, faxina, absorver-midia, validar-handoff

**Universais v0.6 sessão 4 (5):** mapear-concorrente, pedir-contexto, proposta-cliente, espelhar, status-decisao

**Universais v0.6 Navortech (19) 🆕:**
- **Pipeline SDD canônico (6):** spec, break, plan, execute, review, complete
- **Gestão KOD.AI (2):** kodai-status, kodai-rollback
- **Bloco-A Navortech (7):** analisar-dados, aprovar-post-meta-api, email-profissional, novo-projeto, publicar-tema, relatorio-ads, responder-avaliacoes-gmb
- **Bloco-A SEO (1):** seo (orquestrador)
- **Bloco-B Navortech (1):** live-preview
- **QA Navortech (2):** qa-verifier, test-runner

**Bundled Tier 3 Anthropic (16):** brainstorming, transcribe-audio, executing-plans, subagent-driven-development, notebooklm, google-workspace, dev-browser, excalidraw-diagram, code-review, verification-before-completion, finishing-a-development-branch, using-git-worktrees, systematic-debugging, test-driven-development, writing-skills, skill-creator

**Instalação/gestão (6):** adicionar-pack, atualizar-kodai, instalar, listar-disponiveis, remover-pack, trocar-perfil

🆕 = propagadas em 2026-05-25 via `/atualizar-kodai` (origem Navortech absorption)

Convivem lado-a-lado com as **18 skills técnicas SCHOLZE-STACK STUB** (accessibility-axe, api-design-rest, code-review-checklist, conventional-commits, db-schema-postgres-rls, design-tokens, e2e-runner, edge-function-supabase, expo-scaffold, git-flow-strict, lgpd-dsr-endpoint, lgpd-ripd, react-native-nativewind, refactor-safely, responsive-mobile-first, secrets-scan, tailwind-shadcn-scaffold, vitest-unit — todas < 65 linhas, descriptions placeholder; candidatas a população real ou remoção em decisão futura).

Total atual em `.claude/skills/`: **89** (91 - 2 stubs duplicados removidos).

**Removidos em 2026-05-25:**
- `spec-driven-dev` (22 linhas) — substituído pela skill universal `spec` + 6 commands delegate
- `debug-systematic` (27 linhas) — substituído pela skill bundled `systematic-debugging` (233 linhas, robusta)

**✓ Conflito SDD RESOLVIDO 2026-05-25:** criados 6 commands delegate em `.claude/commands/` (`spec.md`, `break.md`, `plan.md`, `execute.md`, `review.md`, `complete.md`) que invocam as skills universais KOD.AI quando user digita `/spec` etc. Substitui os commands SDD legados globais em `~/.claude/commands/` por precedência project-level. UX `/spec` preservada, pipeline novo (com Evidence Bloc + handoff contracts) é o que roda.

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

### Hooks ativos em `.claude/settings.json` (atualizado 2026-05-25)

| Evento | Hooks ativos | Origem |
|---|---|---|
| SessionStart | echo "/abrir" + kodai-check-upstream-age 🆕 | SCHOLZE + KODAI |
| PreToolUse (Bash) | block-dangerous.py + kodai-pre-commit-guard | SCHOLZE + KODAI |
| PostToolUse (.*) | log-metrics.py + kodai-poluicao-detector 🆕 | SCHOLZE + KODAI |
| Stop | kodai-check-completion-claims | KODAI |
| UserPromptSubmit | kodai-inject-warning + kodai-auto-suggest-skills 🆕 | KODAI |

🆕 = ativados 2026-05-25 via `/atualizar-kodai` (origem Navortech sync)

Total: **5 hooks JS KOD.AI + 3 hooks Python SCHOLZE** = 8 hooks ativos.

---

## Contextos-domínio ativos no upstream

> Política v0.2.0: contexto-domínio só entra quando há síntese curada com NotebookLM pareado.

| Domínio | Status | Path no KOD.AI | Origem |
|---|---|---|---|
| ai-ecosystem-strategy | DRAFT (+ lineage v1) | `KODAI/3-CONTEXTOS-DOMINIO/ai-ecosystem-strategy/` | absorção a16z (2026-05-20) |
| competitive-intelligence | DRAFT (+ lineage v1 + Kelvin + 3 concorrentes) | `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/` | absorção (2026-05-20) + análises (2026-05-21) |
| sistemas-empresariais-br | DRAFT (+ lineage v1 + Bucket B) | `KODAI/3-CONTEXTOS-DOMINIO/sistemas-empresariais-br/` | Davi 2026-05-21 (par doc+notebook 26782f74) |
| gestao-academia-esportiva-br | DRAFT (+ lineage v1 + 6 conceitos) | `KODAI/3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/` | Davi 2026-05-21 sessão 4 (piloto dojo) |
| **contabilidade-br** 🆕 | **DRAFT** | `KODAI/3-CONTEXTOS-DOMINIO/contabilidade-br/` | **bloco-C MazyOS absorption 2026-05-22** |
| **responsividade-mobile-first** 🆕 | **DRAFT** | `KODAI/3-CONTEXTOS-DOMINIO/responsividade-mobile-first/` | **bloco-C MazyOS absorption 2026-05-22** |
| **lgpd-seguranca-universal** 🆕 | **DRAFT v0.1.0** | `KODAI/3-CONTEXTOS-DOMINIO/lgpd-seguranca-universal/` | **Navortech 2026-05-23 (LGPD+GDPR+CCPA worst-case)** |
| **niveis-operacionais-l1-l2-l3** 🆕 | **DRAFT (+ sub-L1/L2/L3)** | `KODAI/3-CONTEXTOS-DOMINIO/niveis-operacionais-l1-l2-l3/` | **Navortech 2026-05-22 (direção estratégica v1.4)** |

🆕 = adicionado entre 2026-05-22 e 2026-05-23 via Navortech absorption (commits 17182ce, 3d236cd, a473ef2)
+ lineage v1 = bloco `lineage:` populado conforme Spec 1 aprovada

---

## Packs ativos

Nenhum pack FUNCIONAL ainda — promoção exige Evidence Bloc com uso real.

### Packs DRAFT/STUB no upstream

| Pack | Status | Onde | Origem |
|---|---|---|---|
| `marketing/seo` | DRAFT (+ lineage v1) | upstream | absorção MazyOS 2026-05-17 |
| `ia/contexto-profundo` | DRAFT | upstream | pesquisa NotebookLM 2026-05-21 |
| `infra/supabase-config-maxima` | DRAFT (+ lineage v1) | upstream | absorção onda 2 |
| `infra/vercel-config-maxima` | DRAFT | upstream | absorção onda 2 |
| `integracoes/email-smtp-transacional` | DRAFT | upstream | absorção onda 2 |
| `infra/mcp-server-template` | STUB | upstream | absorção 2026-05-20 |
| `infra/qr-scanner-web` | STUB | upstream | absorção 2026-05-20 |
| `infra/pwa-webgpu` | docs | upstream | absorção 2026-05-20 |
| `ia/face-recognition` | notebooklm-only | upstream | absorção 2026-05-20 |
| `dev/ui-responsivo-smb` | DRAFT (+ lineage v1) | upstream | Davi 2026-05-21 (par doc+notebook 216c85a8) |
| `comercial/modelos-venda-ia` | DRAFT (+ lineage v1) | upstream | gap Kelvin 2026-05-21 (DFY/DWY/DIY + 6 alavancas) |
| `atendimento/customer-success-ia` | DRAFT (+ lineage v1) | upstream | gap Kelvin 2026-05-21 (N1/N2 WhatsApp+Claude) |
| **`infra/multi-tenant-saas-architecture`** 🆕 | **DRAFT** | upstream | **Navortech 2026-05-22 (direção L1/L2/L3)** |

🆕 = adicionado em 2026-05-22 via Navortech sync (commit `a473ef2`)
+ lineage v1 = bloco `lineage:` populado conforme Spec 1 aprovada

## Políticas universais novas pós-Navortech (sync 2026-05-25)

4 políticas adicionais em `KODAI/1-ESQUELETO/politicas/` (consultadas via referência, não copiadas):

- `regra-ouro-l1-antes-de-l3.md` — sempre confirmar L1 (entender o usuário) antes de saltar pra L3 (executar)
- `capturar-contexto-stakeholder.md` — formalização de captura de input externo
- `coordinator-na-sessao-pai.md` — padrão Coordinator/Director/Employee aplicado ao Claude na sessão pai
- `status-honesto-handoff.md` — handoff nunca infla progresso; status verdadeiro mesmo se incompleto

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
