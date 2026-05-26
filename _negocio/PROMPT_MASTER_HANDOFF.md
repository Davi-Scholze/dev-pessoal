# PROMPT MASTER HANDOFF — Projetos Dev Pessoais

> Estado vivo. Atualize ao final de cada sessão significativa.
> Última atualização: 2026-05-26 noite — **CONTRATO-DE-TRABALHO estabelecido + absorção Decision Maker + Textura Pipeline + brief v8 Dojô lockado**

---

## Sessão 2026-05-26 noite — CONTRATO + Absorção Design + Brief v8 Dojô

> **Formato resumo curto** (canonizado em [`CONTRATO-DE-TRABALHO.md`](../CONTRATO-DE-TRABALHO.md) seção Persistência).

### Estado atual

- **Dojô landing v7 em prod** (commit `f65e508`) — fix rejeição v6 aplicado (kanji ambient removido, bgImages athletes B&W, 2 cards modalidades restaurados em /sobre). URL: https://dojofs-davi-scholzes-projects.vercel.app
- **Brief v8 lockado** retroativamente em `Repositorios/dojo-familia-scholze/_negocio/contextos/briefs/2026-05-26_landing-publico-v8.md` — 6 decisões + 3 buckets + 3 lógicas + 4 prompts ready-to-use
- **CONTRATO DE TRABALHO** estabelecido como precedência máxima — fluxo iterativo 5 etapas + 6 NÃOs + 8 SIMs + 6 gates de controle humano
- **KOD.AI upstream** ganhou skill `design-brief-locker` + pack `website-premium-animated` (commit `1a0568c` em https://github.com/Davi-Scholze/kod-ai)
- **Pasta inbox/** criada em Dojô pra fluxo estruturado de fotos/refs/vídeos com template README

### Decisões tomadas nesta sessão

1. **Absorver Decision Maker (Textura) + Pipeline 11 fases** — viraram skill + pack upstream KOD.AI. Resolve a raiz do v6 ruim (pulei brief).
2. **Atualizar regra `ui-cycle-trigger.md` v1.0→v1.1** — adiciona Fase 0 BRIEF obrigatória antes do VER existente. Atualização propagada em pasta-mãe + KODAI upstream.
3. **CONTRATO DE TRABALHO Davi ↔ IA** — Davi propôs texto integral, IA formalizou estrutura, Davi validou. Lei eterna em qualquer projeto pessoal dele. Precedência máxima.
4. **5 decisões pra v8 Dojô fechadas:**
   - (1) Fotos: estrutura `_negocio/identidade/inbox/<data>_<sessão>/` com template README. Esquece Midjourney ($).
   - (2) Display font: trocar Cormorant Garamond por **Fraunces** (Google Fonts free) ou Editorial New se Davi quiser
   - (3) Cerejeira: **Nano Banana** (sugestão Davi — gera pétala B&W, IA anima via Framer Motion). Free no Google AI Studio.
   - (4) Headline: IA roda Prompt 1, gera 3 variações, Davi escolhe
   - (5) Marcação aula: agente no site (formulário 4 perguntas) + Supabase + **CallMeBot WhatsApp** notifica pai (free) + email backup

### Pendências

- [ ] **Davi mandar fotos do pai** em `Repositorios/dojo-familia-scholze/_negocio/identidade/inbox/<data>_sessao-fotos-sensei/` (template README pronto pra preencher)
- [ ] **Davi gerar pétalas cerejeira B&W no Nano Banana** (Google AI Studio free) e jogar em `inbox/<data>_assets-ia/` — prompt PT-BR otimizado a entregar
- [ ] IA implementar v8 do Dojô aplicando brief lockado (após fotos + cerejeira chegarem OU após Davi dar OK pra começar pelo que não depende deles)
- [ ] IA gerar 3 variações de headline (Prompt 1 do brief v8) pra Davi escolher
- [ ] IA implementar agente-marcação no site (Sprint nova — Supabase + form + CallMeBot + email) — adia pra depois da v8 visual
- [ ] Promover policy `copy-banned-words` DRAFT → FUNCIONAL após 3 usos reais da skill design-brief-locker (KODAI upstream)
- [ ] Vídeo loop judô B&W (pendente original) — adia ou substitui pela cerejeira Nano Banana

### Próximos passos (ordem quando Davi voltar)

1. Davi dá `/clear`, abre nova sessão no terminal VS Code
2. IA roda Sessão Zero (`/abrir`) — lê CONTRATO + memória crítica nova + handoff + brief v8
3. IA primeira mensagem: 3 links (prod / preview último commit / dev local quando rodar) + status
4. IA pergunta: começa pelo que não depende de Davi (Fraunces + headline + remover últimos kanji + smoke test) OU espera fotos + cerejeira primeiro?

### Riscos conhecidos

- **CONTRATO ainda não testado em condição real** — primeira sessão pós-contrato vai validar se eu (IA) consigo respeitar fluxo iterativo sem regredir pra modo "executora automática"
- **Brief v8 tem 5 decisões pendentes** — se Davi mandar "começa logo" sem responder essas 5, vou produzir output parcial/genérico de novo
- **Foto real do pai depende de Davi** — sem ela, hero v8 continua com stock Unsplash (compromisso aceitável temporário, mas brief lockou "faixa real")
- **CallMeBot free tier sem SLA** — se cair em produção real do agente-marcação, leads ficam parados (mitigação: email backup obrigatório, refatorar pra WhatsApp Business API Meta se volume justificar)

---

---

## Sessão 2026-05-26 — META-EVOLUÇÃO KOD.AI (Fase 1 do backlog Davi)

Davi disse "todo vapor" → executei 9 frentes substantivas em sequência. Critério "100% arrumado pra desbloquear Fase 2 (dojo)" do backlog: **8 de 9 itens objetivos cumpridos**, **falta aprovação textual Davi**.

### Frentes concluídas (9/10)

| # | Frente | Artefato | Commit |
|---|---|---|---|
| 1 | Audit profundo skills+agents | `KODAI/docs/SKILLS-DEEP-MAP.md` | `b21d016` |
| 2 | Plugins mercado audit + instalação | `KODAI/docs/PLUGINS-MERCADO-AUDIT.md` + frontend-design + Impeccable v3.1.1 instalados via `claude plugin install` | `4ff44df` + `086e108` |
| 3 | /absorver-midia smoke test (vídeo Kelvin Cleto) | `_negocio/inbox-davi/2026-05-26-kelvin-cleto-playbook-escalar-ia-2026/` (660-line transcript + 15 frames + sintese 17 insights) | `073baa9` + `e4dbc03` |
| 4 | Política `resiliencia-sem-llm.md` | upstream + memória crítica `feedback_ia_opcional_nao_obrigatoria` no MEMORY.md | `2042b9b` |
| 5 | Audit absorção NotebookLM (81 entries) | `KODAI/docs/NOTEBOOKLM-ABSORPTION-AUDIT.md` (taxa real 28%, 3 contextos vazios) | `152383a` |
| 6 | Audit LGPD 3 projetos consumidores | `KODAI/docs/LGPD-AUDIT-PROJETOS-CONSUMIDORES.md` + 🚨 ALERTA P0 grants-etl `.env` commitado | `b6400f3` |
| 7 | Spec workflow Framer Motion ← YouTube | `KODAI/docs/decisoes/2026-05-26_spec-motion-extraction-from-video.md` | `8969664` |
| 8 | Política `quando-usar-sdd.md` (3 modos) | upstream — argila/sprint formal/fix | `0355b92` |
| 9 | Política `fluxo-agilidade-dev.md` (4 pilares) | upstream — live preview + smoke + pedir-contexto + retrospectiva | `1265174` |
| 10 | Skill /atualizar-linkedin | DEFERRED (Davi marcou opcional — fica próxima sessão) | — |

### Estado plugins Claude Code (após esta sessão)

```
$ claude plugin list
- context7@claude-plugins-official (existente)
- frontend-design@claude-plugins-official (NOVO)
- impeccable@impeccable v3.1.1 (NOVO)
```

Plugins entram em efeito após restart sessão Claude Code.

### Memórias críticas atualizadas

Nova entrada no `MEMORY.md` seção ⭐ CRÍTICAS:
- `feedback_ia_opcional_nao_obrigatoria.md` — política `resiliencia-sem-llm.md` upstream + 5 padrões fallback

### Críticos identificados que precisam decisão Davi

**🚨 P0 ABSOLUTO:** `grants-etl-pipeline/.env` está commitado no git. Contém `MSSQL_SA_PASSWORD` em texto + dados PII de funcionários (CPF + nome) no banco `ETL_Convenios`. Sem `.gitignore` no repo. Banco é local-only mas higiene exige fix.

**P0 dojo:** Sprint 1a sem RIPD, sem página `/legal/privacidade`, sem tabela `consentimentos_lgpd`. Sistema vai processar dados de MENORES (Art. 14 LGPD). Pai do Cristiano não pode usar com alunos reais sem documentação mínima.

**P0 decon:** links "Política de Privacidade" são `href="#"` (página inexistente).

### 14 decisões pendentes Davi (consolidadas)

**Bloco plugins (frente #2):**
- **D1** Testar `get-shit-done-cc` em `grants-etl-pipeline/` projeto isolado? (rec IA: SIM 1 semana)
- **D2** Agendar tarefa trimestral `/upstream-update` vs superpowers v5.x? (rec IA: SIM 2026-08)
- **D3** Absorver scripts auxiliares skill-creator do repo Anthropic? (rec IA: SIM próxima sessão dedicada)

**Bloco /absorver-midia (frente #3):**
- **D4** Absorver vídeo Kelvin Cleto via `/absorver-referencia` (atualiza `kelvin-cleto-vs-kodai.md` + cria `meeting-extractions-schema.md` + pack STUB `ia/agentes-meeting-analyzer/`) OU arquivar inbox-only?

**Bloco NotebookLM (frente #5):**
- **D5** Aprovar plano absorção P0 (preencher 3 contextos vazios + vincular 7 CNTX UNI Meta)? (rec IA: SIM, 4-8h dedicado eleva taxa 28%→45%)
- **D6** Formalizar taxonomia 15 clusters em `docs/decisoes/`?
- **D7** Hook/skill `/audit-notebooklm-coverage` periódica (mensal)? (rec: depois P0/P1)

**Bloco LGPD (frente #6):**
- **D8** Rotacionar MSSQL_SA agora ou só próximo uso?
- **D9** Limpar histórico git grants-etl-pipeline (git-filter-repo)?
- **D10** decon base legal: checkbox consentimento OU legítimo interesse documentado?
- **D11** dojo RIPD esqueleto agora ou aguardar Sprint 4?
- **D12** Criar skills `/lgpd-ripd` + `/lgpd-dsr-endpoint` + pack `seguranca/lgpd-by-design/` upstream priorizar?

**Bloco motion extraction (frente #7):**
- **D13** Spec `/extrair-motion-de-video`: prototipar agora ou backlog até caso real?
- **D14** Absorver agent `animation-engineer` pro upstream (junto com skill nova)?

### Critério "100% arrumado" pra desbloquear Fase 2 (dojo Sprint 1a continuação)

- [X] Todas skills KOD.AI mapeadas em `SKILLS-DEEP-MAP.md` ✓
- [X] Zero duplicatas/conflitos identificados ✓ (8 clusters mapeados)
- [X] Plugins mercado instalados E testados E integrados ✓ (2 instalados, 4 decisões doc)
- [X] `/absorver-midia` testado E funcional com 1+ vídeo absorvido ✓ (Evidence Bloc 7/7 PASS)
- [X] Política `resiliencia-sem-llm.md` upstream criada ✓
- [X] Política `quando-usar-sdd.md` upstream criada ✓
- [X] Audit notebooks completo (relatório gaps mapeados) ✓
- [X] Audit LGPD completo (gaps mapeados) ✓
- [ ] **Davi aprovou textualmente "KOD.AI 100% pronto, pode voltar pro dojo"** ← PENDENTE

**8/9 critérios objetivos cumpridos.** Falta sua decisão sobre as 14 perguntas pendentes + aprovação textual pra desbloquear retomada do Sprint 1a dojo.

### Sumário commits desta sessão

**Upstream KODAI (`Davi-Scholze/kod-ai` branch main, 7 commits):**
1. `b21d016` docs(skills-deep-map): audit profundo 72 skills + 18 agents
2. `4ff44df` docs(plugins-mercado): audit 6 plugins ecossistema CC
3. `086e108` docs(plugins-mercado): Evidence Bloc 2 plugins instalados
4. `2042b9b` feat(politicas): resiliencia-sem-llm v1.0
5. `152383a` docs(notebooklm-audit): absorção 81 notebooks
6. `b6400f3` docs(lgpd-audit): 3 projetos consumidores + ALERTA P0
7. `8969664` spec(motion-extraction): /extrair-motion-de-video v0.1
8. `0355b92` feat(politicas): quando-usar-sdd v1.0 (3 modos)
9. `1265174` feat(politicas): fluxo-agilidade-dev v1.0 (4 pilares)

**Pasta-mãe (`Davi-Scholze/dev-pessoal` branch master, 2 commits):**
1. `073baa9` feat(inbox-davi): smoke test /absorver-midia Kelvin Cleto (parcial)
2. `e4dbc03` feat(inbox-davi): integra transcript + sintese FINAL 7/7 fases

---

## Estado anterior

> Resumo da última sessão preservado abaixo para contexto histórico.



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

**Sessão 2026-05-25 NOITE — Sprint 1a dojo 40% + backlog massivo Davi:**

### Onde paramos AGORA (estado real)

- Fase 0 dojo: 100% (sessão tarde) — Evidence Bloc fechado, single-app Next.js + Supabase + Vercel + CI verde
- **Sprint 1a dojo: 40% percebido pelo Davi** (sessão noite) — redesign landing multi-section (6 seções: header sticky + hero cinematográfico + sobre + modalidades + filosofia + CTA + footer) + login split-screen com foto B&W + navegação real entre páginas + 4 fotos Unsplash livres
- **URL prod live:** https://dojofs-davi-scholzes-projects.vercel.app
- Davi disse: *"de 0,0001% saiu para 40%"* — ainda falta 60%

### O que rolou hoje à noite (após sessão tarde)

1. **Postmortem UI-cycle violation** documentado em `_negocio/POSTMORTEM-2026-05-25-ui-cycle-violation.md` (Parte 1 audit + Parte 2 causas raiz + Parte 3 plano em 5 camadas)
2. **Hook `enforce-ui-cycle.js`** criado em `.claude/hooks/pre-tool-use/` — bloqueia Edit/Write em UI sem ack do marker `.claude/.ui-cycle-acknowledged` (10min validity). Smoke test 5/5 PASS. Bloqueou edit de fato 1x na sessão.
3. **Settings.json registra hook** PreToolUse com matcher Edit|Write|MultiEdit
4. **Memória ⭐ NOVA #1:** `feedback_invocar_skills_design_obrigatorio` — sempre invocar frontend-designer + design-reviewer + ver/dev-browser pra UI
5. **Memória ⭐ NOVA #2:** `feedback_estudar_refs_antes_de_codar_ui` — WebFetch refs + buscar fotos stock + SITE multi-section + smoke estrutural
6. **Primeira tentativa redesign falhou** — agents leram código sem ver refs → 0,0001% melhoria
7. **Segunda tentativa** — WebFetch 4 refs + 4 fotos Unsplash CDN validadas + landing 5 seções + login split-screen → 40% Davi aprovou

### Backlog massivo Davi (capturado verbatim + organizado)

**Arquivo:** `_negocio/inbox-davi/2026-05-25-backlog-pos-sprint1a-40pct.md` (13 observações Davi + 7 buckets)

**7 buckets:**
- **A** Sprint 1a dojo: 8 itens A1-A9 que faltam (Magic Link debug + animações não aplicadas + mobile hamburger + fotos reais + páginas dedicadas + vídeo bg + dashboard atualizado + header tech debt + Sprint 1b/1c)
- **B** Meta-evolução KOD.AI: 6 itens (aprofundar uso skills + eliminar duplicatas + usar todo poder + audit notebooks + LGPD nos projetos + workflow Framer Motion ← YouTube)
- **C** Skills mercado a investigar: 6 plugins (`/skill-creator` oficial + `/superpowers` + get-shit-done + `/review`+`/ultrareview` + frontend-design plugin + Impeccable.style)
- **D** Metodologia: SDD aplicabilidade (modo argila vs sprint formal vs fix) + agilidade testes tempo real + IA pedir contexto + retrospectiva
- **E** Features avançadas: facescan + post Instagram automático marcando alunos
- **F** Meta próxima sessão: construir atendente IA
- **G** Automação pessoal Davi: LinkedIn auto-update via API

### ORDEM REAL DECIDIDA por Davi (não negociar)

**Davi disse textual:** *"antes de continuarmos com o dojo-familia-scholze de onde paramos, nós alimentamos, estruturamos e aplicamos os contextos e objetivos universais e gerais do KODAI, revisamos tudo para garantir que o KODAI vai sempre entregar perfeição e fazemos as coisas que mandei anteriormente, só depois que tudo estiver 100% arrumado, implementado, testado, ativo e validado seguiremos com o dojo de onde paramos."*

**Sequência fixa:**

1. **PRIMEIRO (manhã/dia):** Meta-evolução KOD.AI até 100% arrumado/testado/validado:
   - **B.1+B.2** Audit profundo skills+agents + eliminar duplicatas/conflitos
   - **C.1-C.6** Instalar+testar plugins mercado (skill-creator, superpowers, get-shit-done, /review+/ultrareview, frontend-design, Impeccable)
   - **I.1-I.3** Validar `/absorver-midia` funcional + testar com vídeo Davi `g5NBAkfO-ks` ("O Playbook Invisível Para Escalar Sua Empresa Com IA em 2026")
   - **H.1-H.2** Política `resiliencia-sem-llm.md` upstream + memória crítica nova "IA é opcional não obrigatória"
   - **B.4** Audit absorção notebooks NotebookLM (79 entradas)
   - **B.5** Audit LGPD nos projetos consumidores
   - **B.6** Workflow Framer Motion ← vídeos YouTube
   - **D.1** Política `quando-usar-sdd.md` (modos: argila/sprint/fix)
   - **D.2-D.4** Fluxo agilidade + testes tempo real
   - **G.1** Skill `/atualizar-linkedin` (opcional)

2. **SEGUNDO** (só após Davi aprovar textualmente "KOD.AI 100% pronto"): continuar dojo Sprint 1a → 1b → 1c
   - **A.1** Magic Link debug
   - **A.2** Aplicar animações Framer Motion já existentes
   - **A.3** Mobile nav hamburger
   - **A.7** /dashboard atualizado
   - **A.4-A.9** Refinamento + Sprint 1b/1c

3. **F.1** atendente IA (bonus se sobrar tempo)

### Critérios "100% arrumado" pra desbloquear volta ao dojo

- [ ] Todas skills KOD.AI mapeadas em `KODAI/docs/SKILLS-DEEP-MAP.md`
- [ ] Zero duplicatas/conflitos identificados
- [ ] Plugins mercado instalados E testados E integrados
- [ ] `/absorver-midia` testado E funcional com vídeo Davi absorvido
- [ ] Política `resiliencia-sem-llm.md` upstream criada
- [ ] Política `quando-usar-sdd.md` upstream criada
- [ ] Audit notebooks completo (gaps mapeados)
- [ ] Audit LGPD completo (gaps mapeados)
- [ ] Davi aprovou textualmente "KOD.AI 100% pronto, pode voltar pro dojo"

### 5 memórias ⭐ críticas ativas (carregam toda Sessão Zero)

1. `feedback_modelo_negocio_kodai_consolidado` — agência + framework
2. `feedback_realidade_financeira_davi` — bootstrap radical
3. `feedback_executar_nao_delegar_setup` — automação via PAT/API
4. `feedback_pedir_permissao_acoes_externas` — antes de email/SMS/post/cobrança
5. `feedback_tudo_dentro_do_repo_do_sistema` — secrets `.env.local` repo
6. `feedback_default_single_app_unified` — 1 Next.js cobre tudo
7. `feedback_invocar_skills_design_obrigatorio` — frontend-designer + design-reviewer obrigatórios
8. `feedback_estudar_refs_antes_de_codar_ui` — WebFetch refs + fotos + multi-section + smoke estrutural

### Hooks KOD.AI ativos

- `enforce-ui-cycle.js` (PreToolUse Edit|Write|MultiEdit) — **bloqueia mecanicamente**
- `auto-suggest-skills.js` (UserPromptSubmit) — sugestões contextuais
- `inject-warning.js` (UserPromptSubmit) — políticas
- `check-completion-claims.js` (Stop) — Iron Law
- `block-dangerous.py` + `pre-commit-guard.js` (PreToolUse Bash) — segurança
- `poluicao-detector.js` + `auto-log-rotation.js` (PostToolUse) — higiene

---

## Histórico — sessão 2026-05-25 TARDE (Fase 0 dojo COMPLETA)

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
