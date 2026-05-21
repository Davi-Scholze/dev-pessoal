# NotebookLM — Library Catalogada

> Catálogo de todos os NotebookLMs do Davi vinculados à skill `/notebooklm`.
> Source-of-truth oficial: `~/.claude/skills/notebooklm/data/library.json` (79 notebooks).
> Última atualização: 2026-05-21 (taxonomia CNTX UNI/EPCF/SMB consolidada via lista Davi)

---

## Taxonomia adotada

| Prefixo | Significado | Quando usar |
|---|---|---|
| **CNTX UNI** | Contexto Universal | Conhecimento transversal técnico (multi-projeto) — arquitetura, stack, UI/UX, qualidade, segurança, metodologia |
| **CNTX EPCF** | Contexto Específico de Projeto | Único projeto/produto — KOD.AI, MeuDojo, TrackOps, Decon |
| **CNTX SMB** | Contexto SMB | Sistemas empresariais small/medium business (Brasil) |

---

## Como usar

1. Active a skill: `"consulte o notebooklm sobre [tema]"` ou `/notebooklm`
2. Skill abre o browser, autentica (cache persistente), seleciona o notebook certo via topics/tags e retorna resposta com citações
3. Se notebook não estiver na library, criar entrada via `/ativar-notebooklm` ou editar `library.json`

---

## Catálogo por categoria

### CNTX UNI — [Meta] IA & Engenharia de Contexto / Claude Code (9)

- Especialista em Claude Code — `5d27dbd5`
- Engenharia de Contexto para IAs — `0a35ebd8` ⭐ canônico
- Estrutura de Contextos para IA — `d1f1e975` ⭐ canônico
- Claude Essentials: 7 Daily Skills — `fa25b951`
- Claude Code — Skills, Agents, MCPs e Superpowers — `6e41649d`
- Prompt & Context Engineering for Coding Agents — `713e5a95`
- Harness Engineering for AI Coding Agents — `9837921b`
- External Platform Context Folder for AI Coding Agents — `a983bf02`
- Token Economy — Claude Code & Anthropic API — `445c6a63`

### CNTX UNI — [Arquitetura] (7)

- Software Architecture Patterns — `4067feb5`
- Domain-Driven Design (DDD) prático — `fcd117ee`
- Multi-tenant SaaS Architecture — `d3bc41bf`
- Event-Driven Architecture — `1aaa0a23`
- API Design & Contracts — `8458ea29`
- System Integration Patterns ⭐ — `c97cf8d7`
- Authorization Patterns — `c94bfac5`

### CNTX UNI — [Stack] Tecnologias (10)

- React 19 — Hooks & Performance — `17700937`
- React State Management — `addb32ba`
- Supabase Auth & RLS — `7de26581`
- Supabase Edge Functions & Realtime — `fd0df7f6`
- PostgreSQL Avançado — `5f4af17c`
- Vite — Build, Dev Server, Plugins — `63feddd2`
- Vercel — Deploy, CI/CD, Edge — `a240759d`
- Login, Auth & User Management — Web — `d53549c2`
- JavaScript Barcode and QR Code Scanning — `bb3af2f6`
- PWA Progressive Web Apps (estado da arte 2026) — `91e8f0fc`

### CNTX UNI — [UI/UX] & Design (8)

- Operational Dashboards — KPIs, Drill-down — `5c5df5c3`
- Data Tables Avançadas — `c4a94d71`
- Forms & Data Entry — `804f6b00`
- Advanced Filters & Bulk Selection — `8b5710f7`
- Search Experience — Autocomplete, Facets — `129bd4a6`
- Data Visualization — Charts, Dashboards — `be70a808`
- CSS Layout, Positioning & Dark-Mode Dashboards — `80755a80`
- **UX Universal + Responsividade SMB — Base Canônica** — `216c85a8` (pareado com doc local em `inbox-davi/`)

### CNTX UNI — [Qualidade] Testes, Debugging & Performance (6)

- Testing React — Vitest, Testing Library, E2E — `93d17dd2`
- Systematic Debugging — `7432c36a`
- Observability & Error Tracking — `cb1cc8f7`
- Frontend Resilience — Error Boundaries — `c04f41a5`
- SEO Técnico & Performance Web — `6675b1e0`
- Validação e Testes — Engenharia de Qualidade — `c0f73e7b`

### CNTX UNI — [Operação] Workflows & DevOps (3)

- Workflow Automation — Queues, State Machines — `ff3282b1`
- Webhooks & Idempotency Patterns — `872662e9`
- URLs, Domínios e DNS — `c346b667`

### CNTX UNI — [Metodologia] Desenvolvimento (3)

- Spec-Driven Development com Claude Code — `7e25223f` ⭐
- Git Flow — Conventional Commits — `5d7486f4`
- Clean Code e Refactoring em JavaScript/React — `a02951f8`

### CNTX UNI — [Integração] & APIs Externas (1)

- Google Drive & Sheets API — `11879679`

### CNTX UNI — [Negócio] & Compliance (5)

- CRM & Sales Pipeline Patterns — `e7821468`
- Field Service / Service Order Systems — `e882f591`
- LGPD + SaaS Multi-Tenancy — `34259a27`
- B2B Revenue Engineering — `1b70ca58`
- Competitive Intelligence — Análise de Concorrentes SaaS — `baa4b34f`

### CNTX UNI — Segurança (2)

- Guia de Hardening e Práticas de Segurança — `648aa320`
- Hub de Inteligência: Ameaças em Supply Chain — `1f9ab16d`

---

### CNTX EPCF — KOD.AI / Estratégia de IA (5)

- KOD.AI Executive Report: 2026 Multi-Agent Corporate Ecosystem — `991b01dd`
- KOD.AI Strategic Blueprint for B2B AI Automation Dominance — `3b2cf0ec`
- KODAI — Project Specific Context Architecture — `dca269d8`
- CONCORRENTE — Kelvin Cleto: Infrastructure of AI Entrepreneurship — `a30c744e`
- CONCORRENTE — a16z: O Sistema Completo (Frameworks, Infra) — `625a77d6`

### CNTX EPCF — MeuDojo / FaceDojo (6)

- MeuDojo: MVP Roadmap and Strategic Phasing — `6cdda2e2`
- MeuDojo: Infrastructure and Cost Scaling Strategy — `6bf88476`
- MeuDojo: Business Strategy and Commercial Roadmap — `36c5c1df`
- FaceDojo — Análise Completa, Stack Técnico e Ferramentas — `44ed14eb`
- Open Source Facial Recognition State of the Art — `0a20dc1a`
- Next Fit — Análise Completa do Sistema Concorrente — `23a6ad42`

### CNTX EPCF — TrackOps / Field Control (5)

- TrackOps: Operational Intelligence and SaaS Logistics — `67fffe56`
- Field Control — Operacional Navortech — `ec8d0025`
- Field Control API — Webhooks, REST, Parsing — `0188ed30`
- RedGPS / OnPartner — Telemetry, GPS, Sensors — `f84532b7`
- Benchmark Rastreamento Veicular — Brasil — `5d9d2518`

### CNTX EPCF — Decon Digital / Contabilidade & BPO (2)

- Decon Digital: Accounting Ecosystem and Platform Roadmap — `5ca0ea45`
- Referências do Nicho (Contabilidade & BPO) — `9fa5c0e4`

### CNTX EPCF — Integrações Google / Ferramentas (3)

- Google Integrations — Context & Sources — `44650f3d`
- Google Admin Console — Workspace, Directory, Groups — `2f9c96a5`
- Omnismart — Messaging Platform & Captação de Serviços — `46aab0f7`

---

### CNTX SMB — Sistemas Empresariais (1)

- **Sistemas Empresariais: ERP, Contabilidade, NF-e, SaaS Multi-tenant** — `26782f74` (pareado com doc local em `inbox-davi/`)

---

## Notebooks pré-existentes (preservados na library)

| ID | Nome | URL |
|---|---|---|
| `trackops---documentação-completa` | TrackOps - Documentação Completa | `e52f79b6` |
| `spec-driven-development-(sdd)` | Spec-Driven Development (SDD) — versão antiga | `1d2242d3` |
| `app-meu-dojo` | App Meu Dojo (versão antiga) | `6cdda2e2` |

> **Verificação 2026-05-21:** zero duplicatas por URL (script Python rodado contra `library.json`). Os IDs antigos têm URLs **diferentes** dos novos:
> - SDD antigo `1d2242d3` ≠ novo `7e25223f` (notebooks distintos)
> - `app-meu-dojo` URL `6cdda2e2` coincide com `MeuDojo MVP novo` — script `add-notebooks-2026-05-21.py` PULOU duplicata (8 pulados de 76 enviados).
>
> Resultado final: 79 notebooks únicos por URL.

---

## Pares doc-local + NotebookLM

2 notebooks têm doc local sintetizado em `inbox-davi/2026-05-21-contextos-pareados-notebooklm/`:

| Notebook | Doc local | Candidato a |
|---|---|---|
| `216c85a8` (UX-Responsividade SMB) | `UX-Responsividade-SMB-Canonical.md` | Pack `2-PACKS/packs/dev/ui-responsivo-smb/` |
| `26782f74` (CNTX SMB Sistemas Empresariais) | `CNTX SMB — Sistemas Empresariais.md` | Contexto-domínio `3-CONTEXTOS-DOMINIO/sistemas-empresariais-br/` |

---

## Próximos passos

1. ~~Consolidar duplicatas~~ **RESOLVIDO 2026-05-21** (zero duplicatas por URL verificadas)
2. **Promover pares doc+notebook a pack/contexto-domínio** — ✓ feito 2026-05-21:
   - `216c85a8` (UX) → pack `dev/ui-responsivo-smb` DRAFT (upstream commit `d53abde`)
   - `26782f74` (CNTX SMB) → contexto `sistemas-empresariais-br` DRAFT (upstream commit `d53abde`)
3. **Cruzar com `KODAI/3-CONTEXTOS-DOMINIO/`** — notebooks `dca269d8`, `991b01dd`, `baa4b34f` podem alimentar `ai-ecosystem-strategy` e `competitive-intelligence` upstream (futuro)
4. **Auditar notebooks "CONCORRENTE KODAI"** (Kelvin Cleto, a16z) para o eixo aberto `aberto-objetivo-longo-prazo-kodai.md`
5. **Script utilitário:** `_dev/tmp/add-notebooks-2026-05-21.py` preservado pra futuras adições em batch
