# PROMPT MASTER HANDOFF — Projetos Dev Pessoais

> Estado vivo. Atualize ao final de cada sessão significativa.
> Última atualização: 2026-05-25 **TARDE — sessão Fase 0 dojo COMPLETA** (17 commits dojo + 3 memórias críticas novas ⭐ + refactor unified + Vercel production live)

---

## Brief atual

Workspace pessoal de Davi Scholze. SCHOLZE-STACK implantado (18 agentes, ~20 skills técnicas, 8 hooks). KOD.AI 0.6.0-dev sincronizado (upstream commit `85b2e00`).

**Sessão 2026-05-25 — RECONCILIAÇÃO MASSIVA + AGENTES IA + LIAM OTTLEY (em andamento):**

Sequência: pull KODAI (18 commits novos da Navortech via outro PC) → ativação 19 skills + 3 hooks → resolução conflito SDD via 6 commands delegate → apaga 20 stubs (clean code) → log-rotation política universal + hook → agentes-ia foundation completa (contexto + 6 packs + skill `/criar-agente` + perfil) → absorção curada Liam Ottley (+1 conceito + Voice Agent + scripts venda) → fluxo brutos formalizado (`_brutos-novos/` gitignored).

**Métricas da sessão:**
- 9 commits pasta-mãe locais (todos aguardando push — bloqueio C1 PAT)
- 3 commits upstream KOD.AI pushed (`6ca94f9`, `7dcc96b`, `85b2e00`)
- Skills: 89 → 72 (eliminou 20 stubs, manteve só skills funcionais ou DRAFT genuíno)
- Hooks: 5 → 9 ativos (3 novos KODAI Navortech + log-rotation novo)
- Contextos-domínio: 8 → 9 (+`agentes-ia-construcao` DRAFT v0.1.1 com 10 conceitos)
- Packs upstream: 12 → 18 (+6 `ia/agentes-*` STUB)
- NotebookLMs: 79 → 81 (+1 Infra Contextual + 1 Liam Ottley)
- Memória persistente: `project_kodai.md` reescrito; `feedback_fluxo_brutos.md` criado

**Decisões estratégicas:**
1. **KOD.AI é Infraestrutura Contextual Universal pra agentes IA** — direção explícita formalizada em `KODAI/docs/decisoes/2026-05-25_kodai-infra-agentes-ia-universal.md`. Vendor-neutral via LiteLLM, progressive disclosure tier 1→5.
2. **Absorção curada > absorção verbatim** — do Liam Ottley peguei só 3 itens (AAA→AIOS evolução + Voice + scripts venda). Rejeitei explicitamente 6 itens (funil YouTube, Skool, garantia 50%, Hostinger, "AIOS 7 dias" claim, lock-in n8n).
3. **Fluxo brutos formalizado** — Davi salva em `_brutos-novos/` gitignored; IA processa + move pra `inbox-davi/<data>-<tema>/`. Memória persistente registrada.
4. **Clean code KOD.AI** — apaguei 18 stubs SCHOLZE-STACK + 2 duplicados; só ficou skill com implementação real OU DRAFT/STUB com lineage v1 + critério PASS_FUNCIONAL explícito.

**Sessão 2026-05-21 (sessão 4 — virada de foco KOD.AI prático + piloto dojo):**

**Insight central:** KOD.AI evolui na prática, não em pesquisa. Foco mudou pra colocar KOD.AI em uso REAL → dojo virou primeiro piloto, Navortech foi segundo (concluído 2026-05-23).

**Sessão 2026-05-21 (concluída):**
- `git pull` upstream KOD.AI (47 arquivos) + `/atualizar-kodai` total (10 skills + 6 rules propagadas)
- K9 resolvido: 2 hooks JS KOD.AI ativos (Stop + UserPromptSubmit)
- K3, K5, K6, K7, K8, K12 reconciliadas/resolvidas; K10 marcado PARKED (não-aplicável-CLI)

**Sessão 2026-05-21 (continuação — absorção pacote Davi):**
- Bloco 1: 3 docs estratégicos KOD.AI + 2 docs pareados com NotebookLM → `inbox-davi/` (bruto sagrado)
- Bloco 2: 68 novos NotebookLMs catalogados (79 total na library oficial da skill `/notebooklm`)
- Bloco 3: 5 vídeos YouTube → batch `/absorver-midia` (interrompido na 1ª tentativa, re-disparado v3 com curtos primeiro)
- ANALISE-ARQUITETURAL.md (20 pontos do Doc 3 do Davi cruzando com KODAI atual)
- PERGUNTAS-QA-KODAI.md (14 perguntas em 5 blocos — aguarda respostas)
- Pack `dev/ui-responsivo-smb` DRAFT criado no upstream (commit `d53abde`)
- Contexto-domínio `sistemas-empresariais-br` DRAFT criado no upstream (commit `d53abde`)
- 2 patches no `/absorver-midia` (search path + transcribe.py args)

**Sessão 2026-05-21 (sessão 4 — virada de foco KOD.AI prático + piloto dojo):**

**Insight central:** KOD.AI evolui na prática, não em pesquisa. Foco mudou pra colocar KOD.AI em uso REAL → dojo virou primeiro piloto, Navortech será segundo amanhã.

**Absorção dojo (Fases 1-3 completas):**

- **Fase 1** (commit `0a2c29f` repo dojo): 4 brutos novos do Downloads copiados pra `Repositorios/dojo-familia-scholze/contextos/bruto/` (mvp-fluxos + novas-ideias + site-pai-netlify + 1 PDF)
- **Fase 2** (commit `95d78a3` repo dojo): 5 screenshots do dojo (logos + marketing + presença digital) classificados via `/capturar-imagem` em 3 sub-pastas (`_negocio/identidade/logos-e-marca/`, `/marketing-exemplos/`, `/presenca-digital/`), com OCR + metadata adjacente
- **Fase 2.5** (commit `f6a314a` repo dojo): 4 assets oficiais reais entregues pelo pai (logo redondo branco + retangular preto + banner YouTube + certificado template PDF) → `_negocio/identidade/logos-e-marca/oficial/` + INDEX.md rico (paleta + tipografia + filosofia institucional + hierarquia confirmados)
- **Fase 3a** (commit `e406149` KODAI upstream): contexto-domínio universal **`gestao-academia-esportiva-br`** criado (DRAFT) — DOMINIO.md 5 personas canônicas + 3 conceitos (lgpd-menor + verticalizacao-saas-b2b + white-label) + manifest com lineage v1 (8 derives_from) + EXPAND-PROMPTS.md + notebooklm.md síntese
- **Fase 3b** (commit `9873d45` KODAI upstream): 2 merges Bucket B aplicados — `sistemas-empresariais-br/DOMINIO.md` ganhou seções 11 (verticalização SaaS B2B SMB) e 12 (operação multi-tenant white-label); `competitive-intelligence/DOMINIO.md` ganhou seção com 7 benchmarks UX academia esportiva (Kicksite/OnMat/Zen Planner/etc) + lacuna marketplace B2B identificada
- **Fase 3c** (commit `ac26617` KODAI upstream): 2 conceitos técnicos adicionados ao gestao-academia-esportiva-br — `conceitos/stack-tecnica-mobile-saas-vertical.md` (172 linhas) + `conceitos/infra-custos-saas-vertical-br.md` (178 linhas)

**URL Netlify do pai visitada** (commit `d91385b` repo dojo): WebFetch confirmou título "Família Scholze — Graduações JJ & Judô" — protótipo minimalista, registro de graduações; decisão de NÃO virar fonte universal (já capturado via perspectivas).

**Inventário final do contexto novo:** 11 arquivos, 1.507 linhas, 5 conceitos universais, anti-pollution PASS (marca-zero + n-gram ≥5 + 5 NÃOs), DRAFT aguardando primeiro uso real.

**Sessão 2026-05-21 (sessão 4 — FINAL: concorrentes + modelo venda revisado + 4 skills novas):**

**Continuação após criação do contexto-domínio:**

- **3 concorrentes mapeados via `/mapear-concorrente`** (skill criada nesta mesma sessão):
  - FaceDojo (Zedscript Automações LTDA, BR) — commit `2d5c170`
  - Next Fit (BR, enterprise fitness 18k+ academias) — commit `be7c919`
  - Kicksite (EUA, ~20 anos artes marciais) — commit `b2afa49`
  - 3 conceitos em `competitive-intelligence/conceitos/` com matriz comparativa + lacunas defensáveis + plano implementação ROI
  - **Limitação documentada honestamente:** OnMat + Kimono falharam (URLs WebFetch ECONNREFUSED/404) — fonte: limitação técnica WebFetch em SaaS modernos. Mitigação: NotebookLM dedicado OU material manual via `/pedir-contexto` (skill criada hoje pra exato esse caso)

- **`/mapear-concorrente` promovida DRAFT → FUNCIONAL** após 2 execuções end-to-end validadas (FaceDojo + Next Fit) — primeira skill universal nativa promovida nesta pasta-mãe

- **REVISÃO ESTRATÉGICA CRÍTICA do MeuDojo (commit `3e1eab0` KODAI upstream):**
  - Davi clarificou: MeuDojo **NÃO** é SaaS B2B genérico tabelado (R$80-450/mês com gating por feature)
  - É **modelo adaptável vendável**: tickets project-based **R$1k/5k/15k/20k+ DFY/DWY/DIY + recorrência opcional** (estilo Kelvin Cleto)
  - 15 features confirmadas viram **MÓDULOS opt-in por tenant** (`features_habilitadas` jsonb)
  - **Bootstrap-mode declarado:** Davi sem capital, ganharia vendendo o sistema → CompreFace self-hosted (não Rekognition) + Evolution API self-hosted + escalar com receita real
  - Doc estruturado em `Repositorios/dojo-familia-scholze/contextos/modelo-de-venda-2026-05-21.md`

- **Memory persistente NOVA: `feedback_nao_perder_contextos.md`** estabelecida — regra crítica: processar TODOS pontos da mensagem do Davi via TodoWrite, nunca deixar 2-3 pra trás

- **4 SKILLS NOVAS DRAFT criadas (análise honesta KOD.AI vs fluxo desejado):**
  1. **`/pedir-contexto`** (commit `28227bc`) — pede ATIVAMENTE material faltando (5 elementos canônicos: contexto + tentativas + tipo + finalidade + 2-3 alternativas)
  2. **`/proposta-cliente`** (commit `28227bc`) — workflow 6 fases pra atender cliente DFY/DWY/DIY → proposta TOP `.md`
  3. **`/espelhar`** (commit `7bac71b`) — reflete mudanças efetivas (git como fonte de verdade) nos arquivos vivos
  4. **`/status-decisao`** (commit `f568188`) — tag semântica do ciclo de vida (8 status canônicos) + histórico auditável
  - Todas com lineage v1 (Spec 1) + anti-pollution PASS + propagadas pra runtime pasta-mãe
  - Dogfooding aplicado: `/status-decisao` formaliza status_historico nos 4 manifests novos

- **Update em `/mapear-concorrente`:** auto-fallback via `/pedir-contexto` quando ≥2 URLs WebFetch falham (anti-padrão OnMat/Kimono resolvido)

Inventário atual da pasta-mãe: **72 skills** (era 67 + 5 propagadas hoje: mapear-concorrente + pedir-contexto + proposta-cliente + espelhar + status-decisao) + 8 rules + 5 hooks ativos.
Library NotebookLM: 79 notebooks catalogados.
KOD.AI upstream agora tem **4 contextos-domínio**, **8 conceitos** em competitive-intelligence, **6 conceitos** em gestao-academia-esportiva-br, **70 skills universais** (4 novas DRAFT + 1 promovida FUNCIONAL).
**13 commits no upstream pushed** nesta sessão.

---

## Estado por projeto/repo

### decon-sistema (Prioridade 1)
- **Branch:** main
- **Status:** MVP landing page concluído (React 19 + Vite + Tailwind v3)
- **Bloqueado em:** assets de marca (logo, foto Denize, og-image) + transcrição áudio Denize
- **Próxima ação:** Davi transcreve áudio real de atendimento da Denize → Claude mapeia sistema Domínio

### KOD.AI (Prioridade 2)
- **Branch:** main
- **Versão:** 0.6.0-dev (último sync upstream commit `e9ea7e6` em 2026-05-21)
- **Status:** Sistema dogfooding fechado — `/atualizar-kodai` funcional, hooks K9 ativos, /upstream-update implementada aguardando piloto
- **Próxima ação:** Piloto NV-Dev em outra máquina (K4) OU `/brainstorming` contexto-profundo com Davi (K2)

### dojo-familia-scholze (Prioridade 3)
- **Branch:** main
- **Status:** Sem código. Planejamento.
- **Próxima ação:** Confirmar stack (React Native + Expo + TypeScript) → criar estrutura inicial

### lar-antonia (Prioridade 4)
- **Status:** Manutenção ativa. Visitas toda terça-feira, 30 minutos.
- **Contrato:** até dez/2026

### grants-etl-pipeline (trabalho técnico)
- **Status:** Ativo (uso interno Navortech/pessoal)
- **Stack:** Python + SQL Server + Power BI

---

## Próxima ação

**Sessão 2026-05-25 TARDE — Fase 0 dojo 100% COMPLETA com Evidence Bloc:**

### O que rolou nesta sessão (continuação tarde — execução completa Fase 0)
1. Skill `/abrir` Sessão Zero carregando 5 memórias críticas + KODAI canon
2. `/spec` Fase 0 setup dojo scaffold (12 tasks atômicas + DAG + checkpoints + stop-criteria)
3. `/break` decompondo em 12 tasks + estimativa 9h30min
4. `/plan` com 9 fases + 7 checkpoints + 4 stop-criteria
5. `/execute` rodou T1-T11:
   - **T1 preflight** — Node 24 + npm 11 + gh keyring funcionais
   - **T2 monorepo** — npm workspaces + `.gitignore` blindado
   - **T3-T5 packages** — `@dojo-fs/{ui,lib,supabase}` tipados (shadcn + zod schemas + Supabase client factory)
   - **T6 apps/site** — Next.js 15 + App Router + landing pública SSR
   - **T7 apps/app** — Vite + React 19 + PWA (depois deletado em refactor unified)
   - **T8 Supabase** — project criado sa-east-1 + migration 0001_init_multi_tenant aplicada via Management API (6/6 PASS) + types gerados
   - **T9 i18n** — i18next pt-BR/en + LanguageSwitch
   - **T10 CI + Vercel** — GitHub Actions verde + 2 projects criados via API + GitHub App Vercel instalado
   - **REFACTOR UNIFIED** — Davi rejeitou multi-app ("ter dois links é a maior burra"), consolidei em single-app Next.js + Serwist + dashboard absorvido
   - **T11 docs** — CLAUDE.md reescrito + README.md criado + ARQUITETURA-MESTRE v1.1 com reversão documentada
6. `/complete` — **Evidence Bloc 9 categorias + 19 critérios + lessons learned + tech debt registrada**

### 3 memórias ⭐ CRÍTICAS novas (próxima Sessão Zero carrega)
- `feedback_pedir_permissao_acoes_externas` — antes de email/SMS/cobrança/post pedir permissão textual
- `feedback_tudo_dentro_do_repo_do_sistema` — secrets no `.env.local` do repo, não em `Documents/`
- `feedback_default_single_app_unified` — 1 Next.js cobre tudo, não multi-app

### URLs production (dojô case 0)
- **Repo:** https://github.com/Davi-Scholze/dojo-familia-scholze (private, 17 commits Fase 0)
- **Vercel:** https://dojofs-davi-scholzes-projects.vercel.app (Hobby tier, auto-deploy push em master)
- **Supabase:** project `mubcbbrwoeblvqaiebou` em sa-east-1 (Free tier, 2 tables + RLS multi-tenant)
- **CI:** GitHub Actions verde, run 26413463584

### Próxima sessão dojo — Sprint 1
Spec a criar em `docs/decisoes/2026-05-XX_sprint-1-auth-cadastro.md`:
- Auth Magic Link real (`/login` com Supabase browser client)
- Middleware Next.js gating `/dashboard` (redirect se sem sessão)
- Form cadastro professor + criação dojo
- Form cadastro alunos básico
- Migration 0002 (turmas + alunos detalhados — DDL exige OK textual Davi)
- Atualizar policies RLS pra novas tables

### Tech debt registrada (limpa antes/durante Sprint 1)
- 2 moderate vulnerabilities postcss interno Next.js (aguardar bump natural)
- `<img>` em `/dashboard/page.tsx` → trocar por `<Image>` Next.js
- Lighthouse PWA + SEO scores medir manualmente
- Pasta física `apps/app/` vazia pode persistir até Davi fechar IDE (Git já removeu do tree)
- Domínio `dojofamiliascholze.com.br` aguarda primeira venda real

### Dívidas no upstream KOD.AI
- Pack canônico `dev/pwa-nextjs-unified-saas/` substituindo DRAFTs antigos `dev/pwa-vite-react` + `dev/pwa-nextjs-ssr`
- Política universal `secrets-organization-multi-cliente.md` em `1-ESQUELETO/politicas/`

---

## Histórico — sessão 2026-05-25 manhã (pré-Fase 0)

### O que rolou nesta sessão completa
1. Pull KODAI upstream (18 commits da Navortech) + ativação 19 skills + 3 hooks
2. Resolução conflito SDD (6 commands delegate)
3. Apagar 20 stubs SCHOLZE (clean code)
4. Política universal `log-rotation` v1.0 + hook FUNCIONAL
5. **Fundação completa de `agentes-ia-construcao`** (contexto + 6 packs STUB + skill `/criar-agente` + perfil + spec)
6. Absorção curada Liam Ottley (+1 conceito + Voice Agent + scripts venda)
7. Fluxo brutos formalizado (`_brutos-novos/` gitignored)
8. C1+C2 RESOLVIDOS (PATs revogados + `gh auth keyring` + push 10 commits)
9. **Conversa estratégica dojo: posicionamento KOD.AI consolidado** — agência (vende sistemas) + framework (open-source) de mesmo nome; cada cliente = instância dedicada; pricing canônico STRATEGIC-NORTH v1.4
10. **Documento mestre dojo `ARQUITETURA-MESTRE.md`** criado (506 linhas) + corrigido pra alinhar com posicionamento agência
11. **Memórias persistentes CRÍTICAS** estabelecidas: modelo negócio + realidade financeira Davi (zero capital, bootstrap MazyOS-style)
12. **Skill `/abrir` evoluída**: Passo 1.5 carrega ATIVAMENTE KODAI canon (`AGENTS.md` + `STRATEGIC-NORTH.md`) + memórias críticas — evita IA hesitar em decisões estratégicas em sessões futuras
13. CLAUDE.md raiz pasta-mãe atualizado com ordem de leitura canônica obrigatória

### Decisões estratégicas confirmadas pelo Davi

- **KOD.AI** = agência IA SMB BR + framework open-source de mesmo nome (igual Vercel/Next.js)
- **Davi = fundador KOD.AI** (não é "MeuDojo founder")
- **Cliente 0 = Dojô Família Scholze (pai)** — **NÃO COBRAR** (case study + validação)
- **Cliente 1 (paralelo)** = professor que Davi já conversou (academia conhecida)
- **Caso familiar paralelo** = Decon (mãe Denize, escritório contábil — pode ser parceiro universal modelo STRATEGIC-NORTH v1.1)
- **Bootstrap radical** — zero capital, mas plano viável: pré-vende pacote completo → 50% upfront → reinveste → próximo cliente
- **Sem $ pra domínios agora** — Davi aguarda primeiro fechamento pra comprar `kodai.com.br` + `dojofamiliascholze.com.br`

### Próxima sessão (Davi vai dar /clear)

**Objetivo:** desenvolver **apresentação pro cliente 0 (Dojô Família Scholze)** — começar o sistema de fato:
1. Sessão Zero automática já vai carregar TODO o canon + memórias críticas (skill `/abrir` v2 evoluída nesta sessão garante)
2. Scaffold monorepo (apps/site + apps/app + packages/*) — começar mesmo sem domínio (Vercel subdomínio gratuito até primeiro fechamento)
3. Sprint 1 do dojo: scaffold + login + tela "Bem-vindo Sensei" + identidade visual do pai aplicada
4. Em paralelo: outreach manual ao professor já conversado (pré-venda)

### Frentes adiadas (esperam $)
- Domínios `kodai.com.br` + `dojofamiliascholze.com.br` (R$ 80 total)
- MEI KOD.AI (gratuito mas pode esperar 1ª venda)
- Apple Dev (PWA elimina necessidade — adiado indefinidamente)
- Ferramentas pagas (Cursor Pro, etc) — só após receita

**Loop de captura validado end-to-end** na sessão sexta 2026-05-23 (Navortech): `/auditar-projeto` → `/absorver-contexto` → `/upstream-update` → propagação automática via `git pull` + `/atualizar-kodai`. 18 commits geraram nesta pasta-mãe.

**Próximas sessões (decisão consciente após dojo):**
- Validar end-to-end skills DRAFT em uso real (`/criar-agente`, `/proposta-cliente`, `/espelhar`, `/pedir-contexto`, `/status-decisao`) → promove DRAFT → FUNCIONAL
- Implementar primeiro agente real (Decon? Dojô? cliente novo via Navortech?) → promove `agentes-ia-construcao` + 6 packs `ia/agentes-*` STUB → FUNCIONAL
- Absorver vídeo YouTube `w0H1-b044KY` (Liam Ottley) via `/absorver-midia` → refinamento dos conceitos agentes-ia
- Decon Fase 1 (mapeamento Domínio Denize via áudio transcrito — D1 da fila)
- Promover packs `infra/supabase-config-maxima` + `infra/vercel-config-maxima` DRAFT → FUNCIONAL com Evidence Bloc

**Frentes adiadas (mas viva):**
- Hook PostToolUse "intelligent" pra disparar `/espelhar` automaticamente em momentos-chave (roadmap)
- Pack `seguranca/pentest-automated` (sem urgência pré-MVP)
- Mapear OnMat + Kimono + outros concorrentes (precisa NotebookLM dedicado OU material manual via `/pedir-contexto`)
- Templates concretos dos 4 padrões prontos de agente (Customer Support, Research, Sales CRM, Business Monitor) — só após primeiro caso real

---

## Logins de teste

- GitHub: Davi-Scholze (autenticado via gh CLI + GITHUB_TOKEN env var)
- Vercel: (a configurar quando assets estiverem prontos)
- Supabase: (a configurar no decon-sistema)

---

## Decisões pendentes

- ~~Stack final Dojô~~ RESOLVIDO 2026-05-21 sessão 4: React Native + Expo + TypeScript + Supabase + Asaas (confirmado em `gestao-academia-esportiva-br/conceitos/stack-tecnica-mobile-saas-vertical.md`)
- Token GitHub antigo `ghp_Zht254O3...` — revogar em github.com/settings/tokens (C2 da fila crítica) — **resolução agendada pra Fase 2 desta sessão (hoje 2026-05-25)**
- PAT atual `ghp_QUCC...fBRdi` exposto no remote URL pasta-mãe — **rotacionar agora na Fase 2**
- Foco pós-dojo (Decon Fase 1 OU primeiro agente real? OU Navortech-Omnismart replacement?) — decidir após conversa dojo hoje
- ~~KOD.AI: manter em Repositorios/ ou criar alias na raiz?~~ RESOLVIDO: movido para raiz `KODAI/` (spec 2026-05-15)
- ~~Paths hardcoded KODAI~~ RESOLVIDO (verificado 2026-05-21 — já parametrizados upstream)

---

## Bloqueios

| Bloqueio | Projeto | Quem resolve |
|---|---|---|
| Áudio Denize não transcrito | Decon | Davi |
| Assets de marca ausentes | Decon | Davi (gerar/obter) |
