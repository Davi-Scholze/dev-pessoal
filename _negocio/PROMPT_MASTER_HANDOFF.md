# PROMPT MASTER HANDOFF — Projetos Dev Pessoais

> Estado vivo. Atualize ao final de cada sessão significativa.
> Última atualização: 2026-05-15

---

## Brief atual

Workspace pessoal de Davi Scholze. SCHOLZE-STACK implantado (18 agentes, 20 skills, 8 hooks). KOD.AI instalado via /instalar nesta pasta-mãe (v0.1.0-camada1, perfil: completo).

Foco desta semana: organizar KOD.AI + iniciar Decon Fase 1.

---

## Estado por projeto/repo

### decon-sistema (Prioridade 1)
- **Branch:** main
- **Status:** MVP landing page concluído (React 19 + Vite + Tailwind v3)
- **Bloqueado em:** assets de marca (logo, foto Denize, og-image) + transcrição áudio Denize
- **Próxima ação:** Davi transcreve áudio real de atendimento da Denize → Claude mapeia sistema Domínio

### KOD.AI (Prioridade 2)
- **Branch:** main
- **Versão:** v0.1.0-camada1
- **Status:** Fase 1 completa. Instalado na pasta-mãe via /instalar hoje (2026-05-15)
- **Problema pendente:** paths hardcoded em PROMPT-DE-ADOCAO.md, ROTEIRO-INSTALACAO.md, COMO-USAR.md
- **Próxima ação:** corrigir paths (trivial, Regra 9) + popular contabilidade-br DOMINIO.md

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

**Imediato (esta sessão):**
1. Corrigir paths hardcoded no KODAI (PROMPT-DE-ADOCAO.md, ROTEIRO-INSTALACAO.md, COMO-USAR.md)
2. Commit + push KODAI com correções
3. Commit + push dev-pessoal com arquivos KOD.AI install (_memoria/, _negocio/identidade/, _negocio/MAPA.md, _negocio/PENDENCIAS.md, _negocio/PROMPT_MASTER_HANDOFF.md, KODAI-INSTALADO.md)

**Próxima sessão:**
1. Davi traz transcrição áudio Denize → iniciar mapeamento Decon Fase 1

---

## Logins de teste

- GitHub: Davi-Scholze (autenticado via gh CLI + GITHUB_TOKEN env var)
- Vercel: (a configurar quando assets estiverem prontos)
- Supabase: (a configurar no decon-sistema)

---

## Decisões pendentes

- Stack final Dojô (confirmado? React Native + Expo?)
- Token GitHub antigo `ghp_Zht254O3...` — revogar em github.com/settings/tokens
- ~~KOD.AI: manter em Repositorios/ ou criar alias na raiz?~~ RESOLVIDO: movido para raiz `KODAI/` (spec 2026-05-15)

---

## Bloqueios

| Bloqueio | Projeto | Quem resolve |
|---|---|---|
| Áudio Denize não transcrito | Decon | Davi |
| Assets de marca ausentes | Decon | Davi (gerar/obter) |
