# PROMPT MASTER HANDOFF — Projetos Dev Pessoais

> Estado vivo. Atualize ao final de cada sessão significativa.
> Última atualização: 2026-05-21 (sessão 2 — absorção pacote Davi + pack/contexto novos)

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

Inventário atual da pasta-mãe: **67 skills** + **8 rules** + **5 hooks ativos**.
Library NotebookLM: **79 notebooks** catalogados (taxonomia CNTX UNI/EPCF/SMB).

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

**Próxima sessão (escolher uma frente):**
1. **Responder PERGUNTAS-QA-KODAI.md (14 perguntas)** — destrava conceitos novos (candidate-to-core, lineage, closed-loop) + estrela polar + sequência de specs
2. **D1 Decon Fase 1:** Davi grava áudio Denize → `/absorver-midia` (pipeline pronto + patched) → mapeamento Domínio
3. **K4 Piloto NV-Dev:** `/auditar-projeto` em Navortech-Desenvolvimento → `/upstream-update` end-to-end (requer outra máquina, ~60-90min)
4. **Promover packs DRAFT → FUNCIONAL** com Evidence Bloc — começar por `dev/ui-responsivo-smb` aplicado em decon-sistema OU `sistemas-empresariais-br` no mapeamento da Denize
5. **Sintetizar vídeos transcritos** (quando batch terminar) — gerar `sintese.md` por vídeo com narrativa + decisões + tópicos + sugestão de absorção

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
