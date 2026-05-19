# PENDENCIAS — Projetos Dev Pessoais

> Matriz **única e consolidada** de tudo aberto (KOD.AI + projetos + pessoal).
> Última consolidação: 2026-05-21 (cabe na pergunta-cabeça do `/abrir`).
> Cabeça > 7 itens P0 = sinal de overload. Pare, priorize, reduza.

---

## 🚨 Crítico (resolver antes de qualquer trabalho novo)

| # | Pendência | Projeto | Bloqueia? |
|---|---|---|---|
| C1 | **PAT exposto no commit local `4db5ae4`** da pasta-mãe — push bloqueado pelo GitHub Push Protection. Revogar token + sanitizar `.claude/settings.local.json:80` + `git reset --mixed HEAD~3` + recommit + adicionar `.claude/settings.local.json` ao `.gitignore` | Pasta-mãe | Push de 4 commits locais (`4db5ae4`, `79b5a65`, `e336246`, `c34dc4b`) |
| C2 | **Revogar token GitHub antigo `ghp_Zht254O3...`** referenciado em commit antigo | Segurança | Risco de credencial em histórico |

---

## P0 — Fazer agora (1-2 sessões)

### Decon (prioridade 1 do negócio)

| # | Pendência | Próxima ação |
|---|---|---|
| D1 | **Transcrição áudio Denize** — desbloqueia toda a Fase 1 (mapeamento Domínio) | Davi grava ou pega áudio existente → `/transcribe-audio` |
| D2 | **Assets de marca** — logo.png, denize-profile.jpg, og-image.jpg | Davi gera (ou contrata) |
| D3 | **Deploy Vercel** decon-sistema | Após assets prontos |

### KOD.AI (foco da fase atual: contexto)

| # | Pendência | Próxima ação |
|---|---|---|
| K1 | **`/upstream-update` → `/break`** (D1-D10 RESOLVIDAS 2026-05-21) | 7 tasks atômicas: 5 obrigatórias Modelo A + 2 opcionais B/C |
| K2 | **Spec arquitetural de contexto-profundo** — pesquisa NotebookLM já feita, falta destilação | `/brainstorming` com Davi (CAG + Prompt Caching recomendado pela pesquisa) |
| K3 | **Corrigir paths hardcoded** em `KODAI/0-INSTALACAO/PROMPT-DE-ADOCAO.md` + `ROTEIRO-INSTALACAO.md` + `docs/COMO-USAR.md` (`C:\Users\Usuario\Documents\Davi\KODAI\` antigo) | Trivial — search & replace |
| K4 | **Piloto `/auditar-projeto` contra Navortech-Desenvolvimento** | Próxima sessão na máquina certa (~60-90min) |

---

## P1 — Próximas 2-4 semanas

### KOD.AI — Estrutura

| # | Pendência | Por quê |
|---|---|---|
| K5 | Popular `contabilidade-br/DOMINIO.md` (STUB → DRAFT) | Decon ganha contexto sem reinventar |
| K6 | Verificar coerência `_negocio/MAPA.md` pós-organizar (já consolidado em 2026-05-21) | Após push da pasta-mãe |
| K7 | Atualizar memory `project_scholze_stack.md` (E12-E14 concluídos) | Mantém memória coerente |
| K8 | Atualizar memory `project_kodai.md` com v0.6.0-dev + skill `/organizar` + nova absorção | Já parcialmente feito 2026-05-21; revisar |

### KOD.AI — Skills + Hooks

| # | Pendência | Por quê |
|---|---|---|
| K9 | **Ativar hooks JS no projeto consumidor** — `check-completion-claims.js`, `pre-commit-guard.js`, `inject-warning.js` existem como gabarito mas não estão habilitados em `.claude/settings.json` | Enforcement mecânico das regras-base 7, 11, 12 |
| K10 | **Configurar prompt caching** efetivamente (não só doc) | Reduz custo + latência em 30-90% sessões longas |
| K11 | **Skill `/skill-creator`** rodar pra criar próxima skill (validar workflow) | Auto-validação do bundle Tier 3 |

### Dojô (prioridade 2)

| # | Pendência | Decisão |
|---|---|---|
| J1 | Confirmar stack (React Native + Expo + TypeScript?) | Davi decide |
| J2 | Estrutura inicial do app | Após J1 |

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
