# PROMPT MASTER HANDOFF — Projetos Dev Pessoais

> Estado vivo. Atualize ao final de cada sessão significativa.
> Última atualização: 2026-05-22 (sync KODAI 0.6.0-dev + ativação hooks K9)

---

## Brief atual

Workspace pessoal de Davi Scholze. SCHOLZE-STACK implantado (18 agentes, ~20 skills técnicas, 8 hooks). KOD.AI 0.6.0-dev sincronizado (upstream commit `e9ea7e6`).

**Sessão 2026-05-22 (concluída):**
- `git pull` upstream KOD.AI (47 arquivos, +7151/-143)
- `/atualizar-kodai` modo total: propagou 10 skills universais novas + 6 rules path-scoped pra `.claude/`
- K9 resolvido: 2 hooks JS KOD.AI ativados em `.claude/settings.json` (Stop + UserPromptSubmit)
- K3 verificado como resolvido (paths upstream já parametrizados)
- PENDENCIAS.md reconciliada (K1 marcada como implementada, K12 nova)
- Memórias `project_kodai.md` + MEMORY.md atualizadas

Inventário atual da pasta-mãe: **67 skills** + **8 rules** + **5 hooks ativos**.

---

## Estado por projeto/repo

### decon-sistema (Prioridade 1)
- **Branch:** main
- **Status:** MVP landing page concluído (React 19 + Vite + Tailwind v3)
- **Bloqueado em:** assets de marca (logo, foto Denize, og-image) + transcrição áudio Denize
- **Próxima ação:** Davi transcreve áudio real de atendimento da Denize → Claude mapeia sistema Domínio

### KOD.AI (Prioridade 2)
- **Branch:** main
- **Versão:** 0.6.0-dev (último sync upstream commit `e9ea7e6` em 2026-05-22)
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
1. **D1 Decon Fase 1:** Davi grava áudio Denize → `/transcribe-audio` (ou nova skill `/absorver-midia`) → mapeamento Domínio
2. **K4 Piloto NV-Dev:** `/auditar-projeto` em Navortech-Desenvolvimento → `/upstream-update` end-to-end (requer outra máquina, ~60-90min)
3. **K2 Brainstorming:** `/brainstorming` arquitetura contexto-profundo com Davi (CAG + Prompt Caching + política `memoria-3-tier` recém-chegada do upstream)
4. **K12 Validação local:** fixtures sintéticas pro anti-pollution `checks.js` (parte do K1 factível sem NV-Dev)

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
- ~~Paths hardcoded KODAI~~ RESOLVIDO (verificado 2026-05-22 — já parametrizados upstream)

---

## Bloqueios

| Bloqueio | Projeto | Quem resolve |
|---|---|---|
| Áudio Denize não transcrito | Decon | Davi |
| Assets de marca ausentes | Decon | Davi (gerar/obter) |
