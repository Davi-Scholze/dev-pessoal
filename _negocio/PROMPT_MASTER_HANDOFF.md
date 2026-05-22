# PROMPT MASTER HANDOFF — Projetos Dev Pessoais

> Estado vivo. Atualize ao final de cada sessão significativa.
> Última atualização: 2026-05-21 (sessão 4 — virada de foco KOD.AI prático + piloto dojo)

---

## Brief atual

Workspace pessoal de Davi Scholze. SCHOLZE-STACK implantado (18 agentes, ~20 skills técnicas, 8 hooks). KOD.AI 0.6.0-dev sincronizado (upstream commit `e9ea7e6`).

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

Inventário atual da pasta-mãe: **67 skills** + **8 rules** + **5 hooks ativos**.
Library NotebookLM: **79 notebooks** catalogados (taxonomia CNTX UNI/EPCF/SMB).
KOD.AI upstream agora tem **4 contextos-domínio** (ai-ecosystem-strategy, competitive-intelligence, sistemas-empresariais-br, **gestao-academia-esportiva-br** ✨).

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

**Amanhã 2026-05-22 — frente única confirmada:**

**Auditar Navortech-Desenvolvimento** via `/auditar-projeto` + `/upstream-update` end-to-end (segundo piloto KOD.AI). Plano detalhado em `inbox-davi/2026-05-22-plano-nv-dev.md` (gerado na sessão 3 de 2026-05-21). Tempo estimado: 60-90min. Requer estar na máquina correta com acesso ao repo Navortech.

**Após Navortech (a decidir):**
- Continuar piloto dojo (próximo passo: aplicar `gestao-academia-esportiva-br` DRAFT em código real → promover FUNCIONAL via Evidence Bloc)
- Responder o que sobrou de PERGUNTAS-QA-KODAI.md (se restou — sessão 3 absorveu 20 perguntas)
- Promover outros packs DRAFT → FUNCIONAL com aprendizados dos pilotos
- Retomar Decon Fase 1 (mapeamento Domínio Denize)

**Frentes adiadas (mas viva):**
- Sintetizar vídeos Kelvin Cleto (5 sínteses já existem desde sessão 3 — K21 RESOLVIDO)
- Decon Fase 1 (aguardando decisão pós-Navortech)

---

## Logins de teste

- GitHub: Davi-Scholze (autenticado via gh CLI + GITHUB_TOKEN env var)
- Vercel: (a configurar quando assets estiverem prontos)
- Supabase: (a configurar no decon-sistema)

---

## Decisões pendentes

- Stack final Dojô (confirmado? React Native + Expo?)
- Token GitHub antigo `ghp_Zht254O3...` — revogar em github.com/settings/tokens (C2 da fila crítica)
- ~~KOD.AI: manter em Repositorios/ ou criar alias na raiz?~~ RESOLVIDO: movido para raiz `KODAI/` (spec 2026-05-15)
- ~~Paths hardcoded KODAI~~ RESOLVIDO (verificado 2026-05-21 — já parametrizados upstream)

---

## Bloqueios

| Bloqueio | Projeto | Quem resolve |
|---|---|---|
| Áudio Denize não transcrito | Decon | Davi |
| Assets de marca ausentes | Decon | Davi (gerar/obter) |
