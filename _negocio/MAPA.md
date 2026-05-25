# MAPA — Projetos Dev Pessoais

> Entrada rápida + mapa detalhado consolidado. Leia ANTES de qualquer outro arquivo.
> Atualizado: 2026-05-25 sessão massiva pós-Navortech + agentes-ia + Liam (sync KOD.AI 0.6.0-dev commit `85b2e00`)

## TL;DR

Espaço central de desenvolvimento pessoal de Davi Scholze. SCHOLZE-STACK 100% implantado. KOD.AI 0.6.0-dev como **Infraestrutura Contextual Universal pra agentes IA** (direção estratégica formalizada 2026-05-25). 2 instâncias KODAI rodando (pasta-mãe + Navortech-Desenvolvimento). 3-4 projetos ativos.

## Estado atual

**2026-05-25:** KOD.AI 0.6.0-dev (`85b2e00`). Pasta-mãe com **72 skills** (era 89, apaguei 20 stubs clean code) + 8 rules path-scoped + **9 hooks ativos** (6 KOD.AI JS + 3 SCHOLZE Python — incluindo `auto-log-rotation` novo) + 6 commands SDD delegate + 9 contextos-domínio upstream (incluindo `agentes-ia-construcao` DRAFT v0.1.1 com 10 conceitos + 2 NotebookLMs) + 18 packs upstream (incluindo 6 `ia/agentes-*` STUB novos). Fluxo brutos formalizado via `_brutos-novos/` gitignored. Próxima ação imediata: resolver C1 (PAT exposto bloqueia push de 9 commits locais) → conversa sobre dojo → eventualmente clonar Navortech aqui pra agentes IA substituindo Omnismart.

## Prioridade dos projetos

| # | Projeto | Fase atual | Status |
|---|---|---|---|
| 1 | **decon-sistema** | Fase 1: mapear Domínio + automatizar fluxos da Denize | Aguardando transcrição áudio Denize |
| 2 | **KOD.AI** | 0.6.0-dev (sync `e9ea7e6`) — `/upstream-update` implementada, aguarda piloto NV-Dev | Em evolução ativa |
| 3 | **dojo-familia-scholze** | Planejamento — stack a definir (React Native + Expo?) | Parado |
| 4 | **lar-antonia** | Manutenção | Contrato ativo até dez/2026 |

## Repositórios

| Repo | Path local | Stack | Branch |
|---|---|---|---|
| decon-sistema | `Repositorios/decon-sistema/` | React 19 + Vite + Tailwind v3 | main |
| dojo-familia-scholze | `Repositorios/dojo-familia-scholze/` | React Native + Expo (a confirmar) | main |
| grants-etl-pipeline | `Repositorios/grants-etl-pipeline/` | Python + SQL Server + Power BI | main |
| controle-financeiro | `Repositorios/controle-financeiro/` | (a confirmar) | a confirmar |
| KOD.AI (clone upstream) | `KODAI/` (raiz da pasta-mãe) | Markdown + YAML | main |

## Onde está cada coisa

| O que preciso | Onde |
|---|---|
| Pendências consolidadas | [`_negocio/PENDENCIAS.md`](_negocio/PENDENCIAS.md) |
| Estado vivo + handoff | [`_negocio/PROMPT_MASTER_HANDOFF.md`](_negocio/PROMPT_MASTER_HANDOFF.md) |
| Regras operacionais de sessão | [`.claude/rules/regras-sessao.md`](.claude/rules/regras-sessao.md) |
| Agentes + MCPs + negócio | [`AGENTS.md`](AGENTS.md) |
| Regras de IA + stack + metodologia | [`CLAUDE.md`](CLAUDE.md) |
| Memória do negócio | [`_memoria/`](_memoria/) |
| Identidade visual | [`_negocio/identidade/design-guide.md`](_negocio/identidade/design-guide.md) |
| Skills (dogfooding KOD.AI + SCHOLZE) | [`.claude/skills/`](.claude/skills/) |
| Catálogo de skills SCHOLZE (legacy) | [`_dev/ferramentas/skills/CATALOGO.md`](_dev/ferramentas/skills/CATALOGO.md) |
| Contexto bruto (sagrado — não tocar) | [`_negocio/contextos/bruto/`](_negocio/contextos/bruto/) |
| Contexto aprovado pra dev | [`_negocio/contextos/fluxos/`](_negocio/contextos/fluxos/) |
| NotebookLMs vinculados | [`_negocio/contextos/notebooklm/`](_negocio/contextos/notebooklm/) |
| Prompts reutilizáveis | [`_negocio/contextos/prompts/`](_negocio/contextos/prompts/) |
| Estado completo dos projetos | [`_negocio/contextos/CONTEXTO_GERAL.md`](_negocio/contextos/CONTEXTO_GERAL.md) |
| KOD.AI clone (universal) | [`KODAI/`](KODAI/) |
| O que foi instalado via KOD.AI | [`KODAI-INSTALADO.md`](KODAI-INSTALADO.md) |
| Template novo cliente | [`_dev/ferramentas/templates/cliente-novo/`](_dev/ferramentas/templates/cliente-novo/) |
| Docs gerais | [`docs/INDEX.md`](docs/INDEX.md) |
| Override de layout | [`_layout-override.md`](_layout-override.md) |

## Comandos SDD (metodologia obrigatória)

`/spec` → `/break` → `/plan` → `/execute` → `/review` → `/complete`

## Comandos KOD.AI mais usados

| Comando | Para quê |
|---|---|
| `/abrir` | Sessão Zero — auto-disparo via hook SessionStart |
| `/atualizar` | Reconciliação memória ↔ workspace |
| `/atualizar-kodai` | Sync com upstream (git pull + propagação) |
| `/capturar` | Inbox stakeholder (texto) |
| `/capturar-imagem` | Imagem em 3 tipos (bruto/evidência/efêmera) |
| `/capturar-video` | Vídeo + extração de áudio + frames-chave |
| `/transcribe-audio` | Faster-whisper local offline |
| `/faxina` | Higiene não-destrutiva (quarentena) |
| `/organizar` | Reorganização estrutural (4 layouts) |
| `/auditar-projeto` | Auditoria 8 fases |
| `/notebooklm` | Query a NotebookLMs catalogados |
| `/salvar` | commit + push amigável |

Catálogo completo: [`.claude/skills/`](.claude/skills/) e [`KODAI/1-ESQUELETO/skills-universais/README.md`](KODAI/1-ESQUELETO/skills-universais/README.md).

## NotebookLMs vinculados

Library local: 7 notebooks ativos (TrackOps, SDD, Meu Dojo, Decon, Negocio e Mercado, Google Integrations, SCHOLZE-STACK).

Notebooks canônicos do KOD.AI (na conta Google):
- **Estrutura de Contextos para IA** — `d1f1e975-4317-42d2-9787-6e1f819e9e1d` (~70 fontes)
- **Engenharia de Contexto para LLMs** — `0a35ebd8-5d7c-46e7-9b3f-4f813b105775` (~75 fontes)

Re-auth periódica: ver [`KODAI/99_meta/notebooklm_auth.md`](KODAI/99_meta/notebooklm_auth.md).

## Bibliotecas de conhecimento (em `_negocio/contextos/bruto/`)

Bruto sagrado — leitura como referência, sem editar:

- **Web Design Internacional** → padrão pra UIs
- **Software Gestão de Dojos** → contexto pro app Dojô
- **Portais Contábeis Internacionais** → contexto pro Decon
- **Estrutura de Pastas** (Clean Architecture, RAG, etc.) → padrão aplicado nos repos
- **Agentes de IA**
- **Fluxos Dev e Testes** (SDLC, TDD, pirâmide de testes)
- **Pagamentos BR**
- **Tráfego Pago com IA**
- **Agências IA + Sistemas Marketing**
- **Sistema Produção de Conteúdo**
- **KOD.AI Auto-mapeamento** (2026-05-19)
- **KOD.AI Estrutura + Contextos** (2026-05-16)

## Próximos passos

**Imediato (factível aqui):**
- `/brainstorming` arquitetura contexto-profundo com Davi (CAG + Prompt Caching + política `memoria-3-tier`)
- C2: revogar token GitHub antigo `ghp_Zht254O3...` em github.com/settings/tokens

**Próxima máquina ou contexto específico (não-factível aqui):**
- D1: Decon Fase 1 — Davi traz transcrição áudio Denize → mapear sistema Domínio
- K4: Piloto NV-Dev `/auditar-projeto` + `/upstream-update` end-to-end (outra máquina, ~60-90min)
- Assets de marca Decon (logo, foto Denize, og-image)

**Próximas semanas:**
- Definir stack final do dojo-familia-scholze
- Deploy Vercel decon-sistema (após assets prontos)

**Maiores frentes abertas (KOD.AI):**
- Spec arquitetural de contexto profundo (CAG + Prompt Caching) — pesquisa feita 2026-05-21; política `memoria-3-tier` upstream destravou parte
- 5 frentes abertas em `KODAI/docs/decisoes/2026-05-20_aberto-*.md`
- Estrela polar de 3/5/10 anos do KOD.AI

## Próxima ação concreta

Ver [`_negocio/PROMPT_MASTER_HANDOFF.md`](_negocio/PROMPT_MASTER_HANDOFF.md) seção "Próxima ação".
