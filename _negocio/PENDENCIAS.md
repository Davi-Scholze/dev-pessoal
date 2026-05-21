# PENDENCIAS — Projetos Dev Pessoais

> Matriz **única e consolidada** de tudo aberto (KOD.AI + projetos + pessoal).
> Última consolidação: 2026-05-21 sessão 2 (absorção pacote Davi + pack/contexto novos).
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
| K1 | **`/upstream-update` IMPLEMENTADA** (7 tasks done 2026-05-21; modelo A + stubs B/C) | Aguarda piloto NV-Dev (ver K4) — esta sessão validou propagação local |
| K2 | **Spec arquitetural de contexto-profundo** — pesquisa NotebookLM feita + 3 docs Davi 2026-05-21 destravam | `/brainstorming` com Davi consumindo `inbox-davi/.../ANALISE-ARQUITETURAL.md` |
| K3 | ~~Corrigir paths hardcoded~~ **RESOLVIDO** (verificado 2026-05-21) | — |
| K4 | **Piloto `/auditar-projeto` contra Navortech-Desenvolvimento + `/upstream-update` end-to-end** | Próxima sessão na máquina certa (~60-90min) |
| K12 | ~~Validar anti-pollution checks com fixtures locais~~ **RESOLVIDO 2026-05-21** | 6 fixtures sintéticas; runner 6/6 OK |
| K13 | **Responder PERGUNTAS-QA-KODAI.md** (14 perguntas em 5 blocos sobre estrela polar/conceitos novos/operacional/pendências/multi-cliente) | Davi responde uma de cada vez — cada resposta gera ação concreta |
| K14 | **Síntese dos 5 vídeos transcritos** (quando batch terminar) — gerar `sintese.md` por vídeo + sugestão de absorção | Automático pós-batch: Claude consome inbox + frames + transcript → sintese.md |
| K15 | **Promover packs DRAFT → FUNCIONAL** com Evidence Bloc | Começar por `dev/ui-responsivo-smb` aplicado em decon-sistema OU `sistemas-empresariais-br` no mapeamento Denize |
| K16 | **Specs arquiteturais novas** propostas pela ANALISE-ARQUITETURAL: lineage no manifest + candidate-to-core + closed-loop-evolution | Sequência baixo→médio risco; spec 1 (lineage) primeiro |

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
