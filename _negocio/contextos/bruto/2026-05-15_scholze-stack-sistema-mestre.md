# SCHOLZE-STACK — Sistema Mestre de Configuração de IA (2026)
> Recebido em: 2026-05-15
> Status: BRUTO — salvo como recebido
> Origem: SCHOLZE-STACK — Sistema Mestre de Configuração de IA (2026).pdf
> Aplicável a: todos os projetos (referência global de configuração de IA)
> NotebookLM associado: https://notebooklm.google.com/notebook/df3e9d6f-d902-480c-b719-7a7f143ed361

---

## Sobre Este Documento

Documento mestre que define o sistema operacional de IA (Claude Code + agentes especializados + skills + MCPs + hooks) para desenvolvimento de qualquer produto de software ponta-a-ponta (mobile + desktop + backend).

Autor: Davi Pereira Scholze | Versão: 1.0 | Maio de 2026
Repositório público: github.com/Davi-Scholze/scholze-stack

---

## SEÇÃO 1 — Os 7 Princípios Não-Negociáveis

1. **PLAN BEFORE EXECUTE** — toda mudança não-trivial começa com Plan Mode. Plano = lista numerada de etapas + critério de aceitação + estimativa de impacto.
2. **CONTEXTO MÍNIMO SUFICIENTE** — CLAUDE.md raiz ≤ 200 linhas. Skills lazy-loaded. Sub-agents com contexto isolado. Meta: 60-80% de redução de tokens.
3. **MODELO CERTO PARA CADA TAREFA** — Haiku: classificação/extração. Sonnet: implementação padrão. Opus: arquitetura, refactor complexo. Opus Plan Mode: antes de mudança grande.
4. **AGENTES ESPECIALIZADOS SOBRE GENERALISTAS** — 18 agentes com 1 responsabilidade cada.
5. **ENFORCEMENT POR HOOK, NÃO POR DOCUMENTO** — regra em CLAUDE.md é sugestão; regra em hook é obrigação.
6. **REPRODUTIBILIDADE TOTAL** — projeto clonável e executável em < 5 minutos. Exige: README, .env.example, scripts/setup.sh, docker-compose.yml, CLAUDE.md local.
7. **DESIGN, SEGURANÇA E LGPD COMO REQUISITOS DE PRIMEIRA CLASSE** — validados em cada PR contra design tokens, axe-core (≥95), Snyk/Semgrep, checklist LGPD.

---

## SEÇÃO 2 — Arquitetura de 3 Camadas

- **Camada 1 — GLOBAL** (`~/.claude/`): identidade/estilo do dono, atalhos pessoais, hooks globais de segurança, métricas centralizadas.
- **Camada 2 — PASTA-MÃE** (`./dev-pessoal/.claude/`): CLAUDE.md raiz, REGRAS_SESSAO.md, 18 agentes, 40+ skills, 8 hooks de enforcement, templates de cliente, .mcp.json.
- **Camada 3 — PROJETO** (`./Repositorios/<projeto>/.claude/`): CLAUDE.md local, skills domain-specific, contextos de integração do cliente.
- **Regra de Precedência:** Projeto > Pasta-Mãe > Global.

---

## SEÇÃO 3 — Estratégia 4-Tier de Modelos

| Tier | Modelo | Casos de uso |
|------|--------|-------------|
| 1 | Haiku 4.5 | Classificação, extração, sumarização, commit message |
| 2 | Sonnet 4.5 (default) | Implementação de feature, fix de bug, código de componente, code review pequeno |
| 3 | Opus 4.5 | Arquitetura, refactor >500 linhas, debug difícil, RIPD, spec técnica |
| 4 | Opus + Plan Mode | Decisão arquitetural multi-serviço, escolha de stack, migração, threat modeling |

Hook pre-tool-use: ["classify","extract","format"] → Haiku; ["architect","design system","migration","threat model"] → Opus+Plan; else → Sonnet.

---

## SEÇÃO 4 — Estrutura de Pastas da Pasta-Mãe

```
dev-pessoal/
├── .claude/
│   ├── agents/          # 18 sub-agentes especializados (.md)
│   ├── skills/          # 40+ skills lazy-loaded (SKILL.md + recursos)
│   ├── commands/        # slash commands /scholze:*
│   ├── hooks/           # 8 hooks de enforcement (bash + py)
│   ├── output-styles/   # estilos de saída (concise default)
│   └── settings.json    # configurações do projeto
├── .mcp.json            # MCPs ativos para a pasta-mãe
├── CLAUDE.md            # 200 linhas máx, índice + princípios
├── REGRAS_SESSAO.md     # regras de comportamento da IA
├── MAPA_PESSOAL.md      # identidade/estilo do dono
├── AGENTS.md            # catálogo dos 18 agentes
├── Repositorios/
├── contextos/
│   ├── integracao-supabase.md
│   ├── integracao-google-apis.md
│   └── integracao-stripe.md
├── docs/
│   ├── playbooks/       # como fazer X em qualquer projeto
│   ├── decisoes/        # ADRs cross-projeto
│   └── padroes/         # convenções universais
└── ferramentas/
    └── scholze-stack/   # o plugin (submódulo futuro)
```

---

## SEÇÃO 5 — Stack Definitiva de MCPs (4 Tiers)

**Tier 1 — Essenciais:** filesystem, github, git, memory
**Tier 2 — Backend/Dados:** postgres, supabase, sqlite
**Tier 3 — Produtividade:** google-drive, google-calendar, slack, notion, linear
**Tier 4 — Especializados:** playwright-cli, puppeteer, brave-search, sequential-thinking

Regra: nunca mais de 8 MCPs ativos simultâneos. Usar perfis por tarefa.

---

## SEÇÃO 6 — Skills Essenciais por Domínio

Skill = SKILL.md (≤50 linhas) + templates/ + scripts/ + references/

- **Domínio 1 — Dev base (10):** spec-driven-dev, plan-mode-runner, git-flow-strict, conventional-commits, semver-release, dependency-update-safe, refactor-safely, code-review-checklist, debug-systematic, performance-profile
- **Domínio 2 — Frontend (8):** design-tokens, component-from-figma, tailwind-shadcn-scaffold, accessibility-axe, responsive-mobile-first, animation-framer-motion, state-zustand-tanstack, form-rhf-zod
- **Domínio 3 — Backend (7):** api-design-rest, api-design-trpc, db-schema-postgres-rls, edge-function-supabase, rate-limit-upstash, cron-jobs, queue-jobs
- **Domínio 4 — Mobile/Desktop (5):** expo-scaffold, react-native-nativewind, tauri-scaffold, push-notifications, deeplinks
- **Domínio 5 — Segurança/LGPD (6):** secrets-scan, snyk-semgrep-run, csp-headers, lgpd-ripd, lgpd-dsr-endpoint, lgpd-consent-granular
- **Domínio 6 — Testes (4):** vitest-unit, vitest-integration, playwright-e2e, maestro-mobile-e2e
- **Domínio 7 — Observabilidade (3):** sentry-setup, posthog-events, metrics-logger

---

## SEÇÃO 7 — Os 18 Agentes Especializados

**Orquestração:** master-orchestrator, planner, researcher
**Frontend:** frontend-designer, design-reviewer, animation-engineer
**Backend:** backend-architect, db-engineer, integration-engineer
**Mobile/Desktop:** mobile-engineer, desktop-engineer
**Qualidade:** test-architect, e2e-architect, code-reviewer, refactor-surgeon
**Segurança/LGPD:** security-guardian, lgpd-auditor
**DevOps:** devops-engineer

Formato: `---\nname / description / tools / model\n---\n<system prompt ≤30 linhas>`

---

## SEÇÃO 8 — Padrões de Orquestração Multi-Agente

1. **Orchestrator-Worker (default):** master-orchestrator despacha workers em paralelo via Task tool.
2. **Pipeline Linear:** researcher → planner → backend-architect → frontend-designer → test-architect → code-reviewer → security-guardian → lgpd-auditor.
3. **Parallel Worktrees (Claude Squad):** smtg-ai/claude-squad com tmux + git worktrees. `brew install smtg-ai/tap/claude-squad`.
4. **Observação Centralizada:** hooks post-tool-use emitem eventos WebSocket. Dashboard React em tempo real. Repo: github.com/disler/claude-code-hooks-multi-agent-observability.

Regra de ouro: nunca >5 agentes sem dashboard de observação.

---

## SEÇÃO 9 — Hooks de Enforcement (8 Obrigatórios)

| # | Evento | Arquivo | Função |
|---|--------|---------|--------|
| H1 | PreToolUse | route-model.py | Força modelo correto por tipo de tarefa |
| H2 | PreToolUse | block-dangerous.py | Bloqueia rm -rf, drop database, force push em main |
| H3 | PreCommit | check-design-tokens.py | Detecta cores literais e valores hardcoded |
| H4 | PreCommit | check-secrets.py | Detecta padrões de credenciais no diff |
| H5 | PrePush | run-tests.sh | Executa vitest + lint |
| H6 | PrePush | check-lgpd.py | Detecta PII sem finalidade declarada |
| H7 | PostToolUse | log-metrics.py | Grava em ~/.claude/metrics.jsonl |
| H8 | PostToolUse | observability.py | Emite evento WebSocket para dashboard |

---

## SEÇÃO 10 — Metodologia SDD + Superpowers

Fluxo: INTAKE → RESEARCH → SPEC → PLAN → IMPLEMENT → TEST → REVIEW → MERGE → RETRO

---

## SEÇÃO 11 — Design System: Sites de Referência

**Tier 1 (diário):** Awwwards, Mobbin, Land-book, Godly
**Tier 2 (semanal):** Lapa Ninja, SiteInspire, Minimal Gallery, httpster, One Page Love, SaaS Landing Page
**Tier 3 (mensal):** Dribbble, Behance, Cosmos, Refero, Page Flows

68 sistemas de design como DESIGN.md em `.claude/skills/design-systems/`

---

## SEÇÃO 12 — Design Tokens Recomendados

Arquivo: `.claude/skills/design-tokens/tokens.json`

- **color:** primitives OKLCH (neutral/brand 50-950) + semantic (bg-canvas, fg-default, accent, success, warning, danger, info)
- **spacing:** base 4px — 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- **radius:** sm:6 / md:10 / lg:14 / xl:20 / full
- **typography:** Inter Variable (sans) + JetBrains Mono (mono), escala Major Third (mobile) / Perfect Fourth (desktop)
- **motion:** ease-standard: cubic-bezier(0.2,0,0,1), ease-emphasized: cubic-bezier(0.3,0,0,1), duration: fast:150/base:250/slow:400
- **elevation:** shadow-1 a shadow-5 + ring focus accessibility

Regra dura: Hook 3 bloqueia commit com cor literal, font-size numérico ou spacing fora da escala.

---

## SEÇÃO 13 — Mobile-First & Cross-Platform

**Stack recomendada:** Next.js 15 + React 19 + Tailwind 4 + Shadcn/UI | Expo SDK 52 + NativeWind | Tauri 2.0 | Supabase (Postgres+Auth+Storage+Realtime+Edge Functions) | Zustand + TanStack Query

**Padrões mobile obrigatórios:** bottom navigation, pull-to-refresh, skeleton loaders, haptic feedback, safe-area-inset, empty states com CTA, touch targets 44×44pt, swipe gestures.

**Padrões desktop:** command palette (Ctrl+K), keyboard shortcuts modal "?", multi-window, tray icon, drag-and-drop.

---

## SEÇÃO 14 — Segurança & LGPD

**Código:** Snyk+Semgrep no CI, Trivy para containers, npm audit, Gitleaks em pre-push, Renovate bot.
**Aplicação:** Supabase Auth/Clerk, RLS + checagem dupla, Zod em toda fronteira, Upstash rate limiting, CSP/HSTS/X-Frame-Options.
**LGPD (5 artefatos por projeto):** RIPD, Registro de operações, Política de Privacidade, Termo de Consentimento granular, Endpoint DSR (/api/lgpd/dsr).

---

## SEÇÃO 15 — Token Economy (60-80% de economia)

8 regras: CLAUDE.md curto, skills lazy-loaded, sub-agents isolados, /clear agressivo, modelo certo, prompt caching, sem dump de logs, output-style concise.

---

## SEÇÃO 16 — Testes E2E (CLI + Skills sobre MCP)

**Pirâmide:** Unit 70% (Vitest), Integration 20% (Vitest+MSW+Testcontainers), E2E 10% (Playwright via CLI).
**Skill e2e-runner:** scripts/run-suite.sh + record-flow.sh + templates/page-object.ts + a11y-check.ts.
**Mobile E2E:** Maestro ou Detox para Expo.

---

## SEÇÃO 17 — Empacotamento como Plugin

Estrutura: `.claude-plugin/plugin.json` + agents/ + skills/ + commands/ + hooks/ + mcps/ + templates/ + docs/
Instalação: `/plugin marketplace add Davi-Scholze/scholze-stack`
Repo público futuro: github.com/Davi-Scholze/scholze-stack

---

## SEÇÃO 18 — Modelo de Comercialização

- **Open Core (grátis):** princípios, estrutura de pastas, lista de MCPs/agents/skills.
- **Pro (US$149 / R$750 one-time):** 18 agentes proprietários, 40+ skills, hooks, templates, DESIGN.md, onboarding.
- **Enterprise/Consultoria (R$5k-15k):** customização, integração, treinamento, suporte 90 dias.

Canais: Gumroad, LinkedIn/X, Discord BR vibe coders.
Posicionamento: "O sistema operacional de IA para desenvolvedores brasileiros."

---

## SEÇÃO 19 — Métricas de Sucesso

Hook metrics-logger → `~/.claude/metrics.jsonl`. Dashboard Node.

Meta inicial: 60% menos tokens, 40% mais velocidade, zero vulnerabilidades críticas, Lighthouse ≥95, axe-core ≥95.

---

## SEÇÃO 20 — Checklist de Implantação na Pasta-Mãe

- [ ] 1. Clonar plugin em ferramentas/scholze-stack/
- [ ] 2. Copiar .claude/ do plugin para raiz da pasta-mãe
- [ ] 3. Personalizar CLAUDE.md raiz (≤200 linhas)
- [ ] 4. Ajustar MAPA_PESSOAL.md
- [ ] 5. Instalar MCPs Tier 1
- [ ] 6. Configurar hooks
- [ ] 7. Rodar /scholze:init em cada repo filho
- [ ] 8. Validar com /scholze:doctor
- [ ] 9. Criar primeiro feature usando SDD
- [ ] 10. Medir métricas baseline
