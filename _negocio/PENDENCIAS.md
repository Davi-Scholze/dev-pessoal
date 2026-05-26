# PENDENCIAS — Projetos Dev Pessoais

> Matriz **única e consolidada** de tudo aberto (KOD.AI + projetos + pessoal).
> Última consolidação: 2026-05-21 sessão 4 (virada de foco KOD.AI prático + piloto dojo Fase 3 completa).
> Cabeça > 7 itens P0 = sinal de overload. Pare, priorize, reduza.

---

## 🎯 Foco atual (atualizado 2026-05-25 NOITE — Sprint 1a dojo 40% + backlog massivo capturado)

**Sprint 1a dojo: 40% percebido pelo Davi após redesign multi-section + login split-screen + fotos Unsplash + navegação.**

URL prod: https://dojofs-davi-scholzes-projects.vercel.app

**Próxima sessão (Davi escolhe ordem):**
- **A1** Magic Link debug (não funciona com email real)
- **A2** Aplicar animações Framer Motion já existentes na nova landing (pula 40→60%)
- **A3** Mobile nav hamburger
- **A7** /dashboard atualizado pro mesmo nível visual
- **F1** Construir atendente IA (meta declarada Davi)

**Backlog completo capturado em:** `_negocio/inbox-davi/2026-05-25-backlog-pos-sprint1a-40pct.md` (13 observações Davi verbatim + 7 buckets organizados).

**KOD.AI evolução crítica salvada hoje:**
- Memória ⭐ `feedback_invocar_skills_design_obrigatorio` (sessão tarde)
- Memória ⭐ `feedback_estudar_refs_antes_de_codar_ui` (sessão noite)
- Hook `enforce-ui-cycle.js` ATIVO em `.claude/hooks/pre-tool-use/`
- Postmortem `POSTMORTEM-2026-05-25-ui-cycle-violation.md`

**Foco anterior (histórico):** KOD.AI = agência IA SMB BR + framework open-source. Davi = fundador. Cada cliente = instância dedicada. Pricing STRATEGIC-NORTH v1.4.

## 🎯 Foco anterior (histórico — 2026-05-21 sessão 4 — continuação após Kicksite + visão de venda revisada)

**KOD.AI evolui na prática, não em pesquisa.** Foco mudou pra colocar KOD.AI em uso REAL:

1. **AMANHÃ 2026-05-22:** Auditar Navortech-Desenvolvimento (segundo piloto KOD.AI) — plano em `inbox-davi/2026-05-22-plano-nv-dev.md`
2. **Em curso:** Piloto dojo (primeiro cliente = pai)
   - Contexto-domínio `gestao-academia-esportiva-br` DRAFT (6 conceitos, 1.700+ linhas)
   - 3 concorrentes mapeados (FaceDojo, Next Fit, Kicksite) em `competitive-intelligence/conceitos/`
   - Skill `/mapear-concorrente` promovida DRAFT → FUNCIONAL
   - **REVISÃO ESTRATÉGICA 2026-05-21 sessão 4:** MeuDojo NÃO é SaaS B2B genérico tabelado — é modelo adaptável vendável (tickets R$1-20k DFY/DWY/DIY + recorrência opcional, estilo Kelvin Cleto). Doc revisado em `Repositorios/dojo-familia-scholze/contextos/modelo-de-venda-2026-05-21.md`
3. **Depois:** decidir próximos (continuar dojo → FUNCIONAL via Evidence Bloc OU outras frentes do KOD.AI)
4. Decon Fase 1 + KOD.AI v0.2.0 (`ia/agente-ia-humanizado`) + outros itens DRAFT → **adiados** até decisão pós-Navortech

## 🚧 Frentes do KOD.AI (atualizado 2026-05-25 sessão massiva pós-Navortech + agentes-ia + Liam)

| Frente | Tipo | Custo | Status |
|---|---|---|---|
| **`/pedir-contexto`** | Skill | M | DRAFT — aguarda 3 usos reais pra FUNCIONAL |
| **`/proposta-cliente`** | Skill | L | DRAFT — aguarda 2 propostas reais |
| **`/espelhar`** | Skill | M | DRAFT — rodada 1x nesta sessão (2026-05-25); aguarda 2+ usos pra FUNCIONAL |
| **`/status-decisao`** | Skill | S | DRAFT — dogfooding aplicado nos 4 manifests novos |
| **`/criar-agente`** 🆕 | Skill | L | DRAFT (criada 2026-05-25, commit `14c6be1`) — aguarda 2 execuções end-to-end |
| **Contexto-domínio `agentes-ia-construcao`** 🆕 | Contexto | XL | DRAFT v0.1.1 (10 conceitos + 2 NotebookLMs + spec) — aguarda primeiro agente real em produção |
| **6 packs `ia/agentes-*`** 🆕 | Packs | XL | STUB (manifests + READMEs) — aguardam Evidence Bloc por bloco |
| **Política `log-rotation` v1.0 + hook** 🆕 | Política + Hook | M | FUNCIONAL upstream (`6ca94f9`) — smoke test passou nesta pasta-mãe |
| **6 commands SDD delegate** 🆕 | Commands | S | FUNCIONAL pasta-mãe (resolve conflito com user-global) |
| **Hook PostToolUse "intelligent"** pra `/espelhar` auto | Hook JS | M | Roadmap (sem urgência — `/espelhar` manual funciona) |
| **`seguranca/pentest-automated`** | Pack | L | Pendente (sem urgência pré-MVP) |
| **Vídeo YouTube w0H1-b044KY (Liam)** | Bruto | S | Pendente `/absorver-midia` — próxima sessão |
| **Mapear OnMat + Kimono + outros concorrentes** | Tarefa | M | Aguarda NotebookLM dedicado OU material manual |
| **Política `secrets-organization-multi-cliente.md`** 🆕 | Política universal | M | Subir pro upstream KODAI consolidando princípio "tudo dentro do repo" + estrutura `.env.local` canônica + `.gitignore` blindado + workflow CI. Origem: incidente 2026-05-25 sessão Fase 0 dojo (memória `feedback_tudo_dentro_do_repo_do_sistema`) |
| **Hook upstream `enforce-ui-cycle.js`** 🆕 | Hook KOD.AI | M | Subir hook + settings.json template + atualização da regra path-scoped `ui-cycle-trigger.md` com seção "Enforcement mecânico" pra upstream `KODAI/1-ESQUELETO/hooks/` + `0-INSTALACAO/templates/`. Origem: postmortem 2026-05-25 Sprint 1a dojo (15 violações da regra em 1 dia). Memória crítica ⭐ `feedback_invocar_skills_design_obrigatorio`. |
| **Atualizar skill `/break` upstream** 🆕 | Skill KOD.AI | S | Adicionar template obrigatório no `/break`: se spec toca UI, criar sub-tasks de design (frontend-designer mockup + dev-browser screenshot + design-reviewer audit) ANTES das tasks de implementação. Origem: mesmo postmortem 2026-05-25. |
| **Atualizar skill `/execute` upstream** 🆕 | Skill KOD.AI | S | Adicionar gate pré-task: se task vai tocar UI sem task de design correspondente no plano, ABORT + voltar pro `/break`. Composição com hook `enforce-ui-cycle.js`. Origem: mesmo postmortem. |
| **Atualizar hook `auto-suggest-skills.js` upstream** 🆕 | Hook KOD.AI | S | Adicionar patterns detectando intent visual/design/tela/componente/layout no prompt do Davi → sugerir `frontend-designer` agent + `tailwind-shadcn-scaffold` + `dev-browser`/`ver` skills. Origem: postmortem. |
| **Audit profundo skills+agents KOD.AI** 🆕 NOITE | Meta-framework | XL | Pesquisar web + docs pra entender 100% cada ferramenta (`/skill-creator`, `/superpowers`, `/review`, `/ultrareview`, Impeccable, etc), mapear quando usar cada uma, eliminar conflitos/duplicatas, garantir KOD.AI usa todo poder em todos projetos. Davi 2026-05-25 noite. |
| **Política `quando-usar-sdd.md` upstream** 🆕 NOITE | Política KOD.AI | M | Definir 3 modos: "argila" (descoberta livre sem SDD formal), "sprint formal" (SDD canônico completo), "fix/refactor pequeno" (commit direto). Davi sentiu que SDD atrasa em fase inicial "moldando argila". |
| **Workflow Framer Motion ← YouTube vídeo** 🆕 NOITE | Skill nova KOD.AI | L | Skill que recebe URL YouTube + ponto específico no vídeo, extrai curva de animação (easing, duração, eixo), gera variant Framer Motion adaptado desktop+mobile. Compor com `/absorver-midia`. Davi 2026-05-25 noite. |
| **Audit KOD.AI absorveu TODOS notebooks** 🆕 NOITE | Meta-framework | M | Cruzar library NotebookLM (79 entradas) × contextos-domínio × packs. Reportar gaps. Davi pergunta: "se alimentou deles?" |
| **Audit LGPD nos projetos consumidores** 🆕 NOITE | Auditoria | M | Cada projeto KOD.AI tem mapa LGPD? `lgpd-auditor` agent é invocado em forms novos? Pack `seguranca/lgpd-by-design` existe + aplicado? |
| **Skill `/atualizar-linkedin`** 🆕 NOITE | Skill nova | L | Integração LinkedIn API + auto-summarize commits/decisões em posts profissionais + drafts pra Davi revisar. Logar KOD.AI ao LinkedIn. Automação pessoal Davi. |

---

## 🚨 Crítico (resolver antes de qualquer trabalho novo)

| # | Pendência | Projeto | Bloqueia? |
|---|---|---|---|
| ~~**C1**~~ | ~~PAT atual `ghp_QUCC...fBRdi` exposto no remote URL~~ **RESOLVIDO 2026-05-25 Fase 2**: PAT revogado + novo PAT via `gh auth login` (Windows Credential Manager encrypted) + remote URL limpo + env var `GITHUB_TOKEN` User removida + 10 commits pushed (até `c09c5c5`) | — | — |
| ~~**C2**~~ | ~~Revogar token GitHub antigo `ghp_Zht254O3...`~~ **RESOLVIDO 2026-05-25** (Davi revogou em github.com/settings/tokens) | — | — |

---

## P0 — Fazer agora (1-2 sessões)

### Decon (case familiar paralelo — Denize Scholze, mãe)

| # | Pendência | Próxima ação |
|---|---|---|
| D1 | **Transcrição áudio Denize** — desbloqueia toda a Fase 1 (mapeamento Domínio) | Davi grava ou pega áudio existente → `/transcribe-audio` |
| D2 | **Assets de marca** — logo.png, denize-profile.jpg, og-image.jpg | Davi gera (ou contrata) |
| D3 | **Deploy Vercel** decon-sistema | Após assets prontos |
| D4 🆕 | **Decon como case parceiro universal** (modelo STRATEGIC-NORTH v1.1 Doc 1) — quando KOD.AI agência amadurecer, Decon vira **parceiro contabilidade** pra outros clientes da agência (cross-sell SMB) | Após primeiro fechamento externo |

### KOD.AI (foco da fase atual: contexto)

| # | Pendência | Próxima ação |
|---|---|---|
| K1 | **`/upstream-update` IMPLEMENTADA** (7 tasks done 2026-05-21; modelo A + stubs B/C) | Aguarda piloto NV-Dev (ver K4) — esta sessão validou propagação local |
| K2 | **Spec arquitetural de contexto-profundo** — pesquisa NotebookLM feita + 3 docs Davi 2026-05-21 destravam | `/brainstorming` com Davi consumindo `inbox-davi/.../ANALISE-ARQUITETURAL.md` |
| K3 | ~~Corrigir paths hardcoded~~ **RESOLVIDO** (verificado 2026-05-21) | — |
| K4 | ~~**Piloto `/auditar-projeto` contra Navortech-Desenvolvimento**~~ **RESOLVIDO 2026-05-23** (auditoria + correções + instalação KODAI na pasta-mãe Navortech-Desenvolvimento + remoção pasta Davi/KODAI legado; gerou 18 commits upstream incluindo 19 skills + 3 hooks + 5 contextos-domínio universais) | — |
| K12 | ~~Validar anti-pollution checks com fixtures locais~~ **RESOLVIDO 2026-05-21** | 6 fixtures sintéticas; runner 6/6 OK |
| K13 | ~~Responder PERGUNTAS-QA-KODAI.md~~ **RESOLVIDO 2026-05-21** (20 perguntas respondidas; STRATEGIC-NORTH v1.2 publicado) | — |
| K14 | **Síntese dos 5 vídeos Kelvin Cleto** (decisão D3: opção `a` — automática por vídeo + análise comparativa transversal) | Automático pós-batch v4 (task `bkohk7j6z`); plano em `PENDING-KELVIN-CLETO-ABSORPTION.md` |
| K15 | **Promover packs DRAFT → FUNCIONAL** — PARCIAL: `gestao-academia-esportiva-br` criado DRAFT em 2026-05-21 sessão 4 via /absorver-contexto modo máximo (não promovido ainda — exige Evidence Bloc do app dojo real) | (a) Aplicar `gestao-academia-esportiva-br` no app dojo real (J3) + (b) `dev/ui-responsivo-smb` em decon-sistema Fase 2 (adiado) + (c) `sistemas-empresariais-br` no mapeamento Denize Fase 1 (adiado) |
| K25 | **Contexto novo `gestao-academia-esportiva-br` DRAFT** criado 2026-05-21 sessão 4 (11 arquivos, 1.507 linhas, 5 conceitos: lgpd-menor + verticalizacao-saas-b2b + white-label + stack-tecnica-mobile + infra-custos-br). 2 merges Bucket B aplicados em `sistemas-empresariais-br` (+seções 11, 12) e `competitive-intelligence` (+7 benchmarks UX). Anti-pollution PASS. | Aguarda Evidence Bloc do app dojo real (J3) pra promover FUNCIONAL |
| K16 | ~~Spec 1 (lineage)~~ **PARCIAL 2026-05-21**: MANIFEST-SCHEMA + 2 templates + 6 manifests piloto com lineage; Task D (auto-preencher /upstream-update) ainda pendente | Task D pode esperar Spec 2 |
| K17 | **Spec 2 (candidate-to-core)** | Rascunho pronto; ativar após Spec 1 Task D OU ≥2 consumidores reais |
| K18 | **Spec 3 (closed-loop-evolution)** | Rascunho pronto; ativar após Specs 1+2 FUNCIONAL + ≥3 consumidores OU ≥20 reflexões |
| K21 | **Síntese 5 vídeos Kelvin Cleto + análise comparativa** RESOLVIDO 2026-05-21 | 5 sinteses.md + `competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md` |
| K22 | **Pack `comercial/modelos-venda-ia` DRAFT** RESOLVIDO 2026-05-21 | Manifest + README + SKILL — Fase A do STRATEGIC-NORTH |
| K23 | **Pack `atendimento/customer-success-ia` DRAFT** RESOLVIDO 2026-05-21 | Manifest + README — retention de primeiro caso |
| K24 | **STRATEGIC-NORTH v1.3** RESOLVIDO 2026-05-21 | 7 diferenciais KOD.AI explícitos + concorrentes mapeados + velocidade comercial |
| K19 | **Teste Obsidian (2 semanas)** decisão C2 — análise em `_negocio/contextos/analise-obsidian-kodai.md` | Davi instala vault + 5 plugins built-in + Dataview; reavaliação 2026-06-04 com hipóteses H1-H5 |
| K20 | **Stack Dojô confirmada** decisão D1: React Native + Expo + TypeScript (por enquanto, sujeita a revisão) | Sem ação imediata — usado no momento de criar sistema Dojô |

---

## P1 — Próximas 2-4 semanas

### KOD.AI — Estrutura

| # | Pendência | Por quê |
|---|---|---|
| K5 | ~~Popular `contabilidade-br/DOMINIO.md`~~ **OBSOLETO** (KOD.AI v0.2.0 mudou filosofia — Camada 3 deixou de ser domínios pré-prontos; agora captura sob demanda via `/capturar-contexto-cliente`. `contabilidade-br/` removido do upstream) | — |
| K6 | ~~Verificar coerência `_negocio/MAPA.md`~~ **RESOLVIDO 2026-05-21** (MAPA reconciliado com sync 0.6.0-dev) | — |
| K7 | ~~Atualizar memory `project_scholze_stack.md`~~ **RESOLVIDO 2026-05-21** (memória mantida; E1-E14 ainda válidos como histórico) | — |
| K8 | ~~Atualizar memory `project_kodai.md`~~ **RESOLVIDO 2026-05-21** (memória reescrita com 67 skills + 8 rules + 5 hooks) | — |

### KOD.AI — Skills + Hooks

| # | Pendência | Por quê |
|---|---|---|
| K9 | ~~**Ativar hooks JS no projeto consumidor**~~ **RESOLVIDO 2026-05-21** (`check-completion-claims.js` em Stop + `inject-warning.js` em UserPromptSubmit + `kodai-pre-commit-guard.js` em PreToolUse já ativos) | — |
| K10 | ~~**Configurar prompt caching** efetivamente~~ **PARKED — não-aplicável-CLI** (verificado 2026-05-21 em `KODAI/.claude/hooks/prompt_cache_config.md`: harness Anthropic gerencia automaticamente; sem flag em `settings.json`. Re-abrir quando KOD.AI tiver SDK Anthropic custom) | Documentação intacta em `prompt_cache_config.md` |
| K11 | **Skill `/skill-creator`** rodar pra criar próxima skill (validar workflow) | Auto-validação do bundle Tier 3 — requer skill em mente |

### Dojô case 0 KOD.AI (NÃO cobrar do pai — case study + validação)

| # | Pendência | Decisão / Próxima ação |
|---|---|---|
| J1 | ~~Confirmar stack~~ **REVISADO 2026-05-25**: NÃO React Native + Expo. Stack final: **PWA universal (Vite + React + Next.js site + Supabase + Asaas + vite-plugin-pwa)**. Decisão completa em `dojo-familia-scholze/contextos/mapeamento/ARQUITETURA-MESTRE.md` | — |
| J2 | **Estrutura inicial do app** — scaffold monorepo (apps/site Next.js + apps/app Vite PWA + packages/ui+lib+supabase) | **Próxima sessão (pós-/clear) — Sprint 1** |
| J3 | **Implementar Sprint 1**: login Magic Link + tela "Bem-vindo Sensei" + identidade visual do pai aplicada | Próxima sessão |
| J4 | ~~Material absorvido do pai~~ **PRONTO** (4 brutos + 9 imagens classificadas + 4 assets oficiais reais + INDEX em `_negocio/identidade/`). Davi confirmou que ESSES são todos os assets disponíveis. | Aplicar em design-guide no Sprint 1 |
| J5 🆕 | Sprint 2-4: CRUD alunos + presença + graduação + certificado + landing | Sprints sucessivos |
| J6 🆕 | **NÃO cobrar do pai** — case study importa mais que receita. Custo infra (R$ 0 free tiers + R$ 80 domínios futuros) sai do bolso quando 1º cliente externo fechar | — |

---

## P2 — Próximos 1-3 meses

### KOD.AI — Frentes abertas (em `KODAI/docs/decisoes/2026-05-20_aberto-*.md`)

| Frente | Status | Próximo |
|---|---|---|
| `aberto-objetivo-longo-prazo-kodai.md` | aberto | `/brainstorming` com Davi (não pesquisa pura) — destila estrela polar 3/5/10 anos |
| `aberto-contexto-profundo.md` | **pesquisado 2026-05-21** | `/brainstorming` + spec + piloto contra 1 dos 4 arquivos pesados |
| `aberto-lgpd-seguranca-dev.md` | aberto | Pesquisa via NotebookLM + spec |
| `aberto-plano-seguranca-dev.md` | aberto | Pesquisa + spec |
| `aberto-agentes-investigadores-mercado.md` | aberto | Spec |
| `aberto-referencias-codigo-mundial.md` | aberto | Pesquisa |

### KOD.AI — Packs FUNCIONAIS (sair de STUB)

| Pack | Status atual | Pra virar FUNCIONAL |
|---|---|---|
| `marketing/seo` | DRAFT | Usar em 1 projeto real + Evidence Bloc |
| `infra/supabase-config-maxima` | DRAFT | Aplicar em decon-sistema + Evidence |
| `infra/vercel-config-maxima` | DRAFT | Aplicar em decon-sistema + Evidence |
| `infra/hospedagem-decisao` | STUB | Popular |
| `integracoes/email-smtp-transacional` | DRAFT | Aplicar em decon (envio de NFSe?) + Evidence |
| `ia/agente-ia-humanizado` | não-existe | Criar — 1º pack FUNCIONAL com Evidence Bloc (P1 estratégico) |

---

## P3 — Médio prazo (3-9 meses)

| # | Pendência | Por quê |
|---|---|---|
| L1 | Primeiro **consumidor não-Davi** rodando `/instalar` | Salto 1 — estressa multi-cliente nativo |
| L2 | Primeiro pack **BATTLE-TESTED** com Evidence Bloc real em produção | Salto 2 — KOD.AI vira "framework de produção" |
| L3 | **Marketplace plugin** Claude Code | Distribuição |
| L4 | Compatibilidade testada multi-LLM (Cursor, Aider, Continue.dev) | regra-base 9 — portátil |
| L5 | Lar Antônia — manutenção até dez/2026 | Contrato ativo |

---

## Decisões aguardando

| Decisão | Contexto | Quem decide |
|---|---|---|
| Modelo de negócio KOD.AI (open-core / paid product / serviço / híbrido) | Estrela polar — frente aberta P2 | Davi (via `/brainstorming`) |
| Licença KOD.AI atual (proprietary) vs MIT/Apache | Depende de modelo de negócio | Davi |
| Stack Dojô confirmada | Necessário antes de iniciar dev | Davi |
| Quando ativar Modelo B do `/upstream-update` (trusted contributors) | Quando aparecerem ≥2 consumidores reais | Davi (gating) |

---

## Skills/comandos úteis pra esta lista

- `/abrir` (auto via SessionStart hook) — lê esta lista todo início de sessão
- `/atualizar` — reconcilia esta lista com estado real do workspace
- `/check-in` — reporta cabeça da fila no formato canônico
- `/sugerir-pesquisa` — detecta gap de contexto que precisa pesquisa pra destravar item
- `/faxina` — limpa lixo orgânico que pode estar mascarando pendência real
- `/organizar` — reorganiza estrutura (após `/faxina`) se necessário
- `/notebooklm` — query a NotebookLMs vinculados pra destravar frentes-pesquisa
