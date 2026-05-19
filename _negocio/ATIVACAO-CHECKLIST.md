# ATIVAÇÃO — Checklist do estado operacional

> Inventário do que está **ATIVO** vs **GABARITO/NÃO-ATIVADO** no KOD.AI desta pasta-mãe.
> Snapshot: 2026-05-21.

---

## ✅ Ativos e funcionando

### Skills (56 em `.claude/skills/`)

| Categoria | Total | Status |
|---|---|---|
| KOD.AI nativas v0.4 | 14 | propagadas + reconhecidas |
| KOD.AI nativas v0.5 | 5 | `ativar-notebooklm`, `evoluir-contexto`, `sugerir-pesquisa`, `auditar-projeto`, `capturar-imagem` |
| KOD.AI nativas v0.6-dev | 3 | `capturar-video`, `faxina`, `organizar` |
| Bundled (Anthropic Superpowers + outros) | 17 | reconhecidas |
| SCHOLZE-STACK + utilitárias | ~17 | reconhecidas |

Validação operacional desta sessão: `/abrir`, `/notebooklm`, `/faxina`, `/organizar` rodaram end-to-end com sucesso.

### Hooks (`.claude/settings.json`)

| Hook | Trigger | Status |
|---|---|---|
| `/abrir` auto-disparo | SessionStart | ✅ ATIVO (confirmado nesta sessão) |
| `block-dangerous.py` (SCHOLZE) | PreToolUse | ✅ ATIVO |
| `log-metrics.py` (SCHOLZE) | PostToolUse | ✅ ATIVO |

### NotebookLM Library (8 notebooks registrados)

| Notebook | Use count | Status |
|---|---|---|
| TrackOps - Documentação Completa | 0 | registrado |
| Spec-Driven Development (SDD) | 0 | registrado |
| App Meu Dojo | 0 | registrado |
| Decon | 0 | registrado |
| Negocio e Mercado | 0 | registrado |
| Google Integrations | 0 | registrado |
| SCHOLZE-STACK Master Config | 0 | registrado |
| **KODAI — Project Context Architecture** | 0 | ⭐ registrado 2026-05-21 (esta sessão) |

**Auth status:** 5 dias de idade, dentro do limite preventivo de 30 dias. ✅ OK.

**Validação:** 1 query rodada nesta sessão contra "Engenharia de Contexto para LLMs" sobre CAG vs RAG retornou resposta substancial com citações. Skill operacional.

### Memory (`C:\Users\usuario\.claude\projects\.../memory/`)

| Tipo | Status |
|---|---|
| MEMORY.md (índice) | ✅ atualizado 2026-05-21 |
| user_profile.md | ✅ |
| project_decon.md | ✅ |
| project_dojo.md | ✅ |
| project_lar_antonia.md | ✅ |
| project_scholze_stack.md | ⚠️ leve drift (não atualizado pós-E12-E14) |
| project_kodai.md | ✅ atualizado 2026-05-21 (v0.5.0 + 0.6.0-dev) |
| feedback_git_identity_pasta_mae.md | ✅ criado 2026-05-21 |

---

## ⚠️ Gabarito presente mas NÃO ativado

### Hooks JS do KODAI (`KODAI/1-ESQUELETO/hooks/`)

| Hook | O que faz | Por que NÃO ativado |
|---|---|---|
| `pre-commit-guard.js` | Bloqueia force push em main, DDL sem aprovação, escrita destrutiva em `.gitignore`/`.env`, `--no-verify` | Não habilitado em `.claude/settings.json`. Risco: pode bloquear comandos legítimos se mal calibrado |
| `check-completion-claims.js` | Bloqueia "feito/done/completo" sem Evidence Bloc adjacente | Não habilitado. Risco: ser irritante se calibração for muito strict |
| `inject-warning.js` | Injeta avisos contextuais (ex: "vc tá editando arquivo grande, atenção") | Não habilitado |

**Próximo passo pra ativar:** sessão dedicada (~1 sessão) testando 1 hook por vez com Davi monitorando.

### Skills nunca invocadas (use_count = 0)

Os 8 NotebookLMs têm `use_count: 0` cada (mesmo o "Engenharia de Contexto" que eu rodei query nesta sessão — provavelmente porque a query foi direta via URL, não pelo `notebook_manager.py use`). Sugere que **toda a library está acessível mas pouquíssimo aproveitada**.

Skills KOD.AI que aparentemente nunca foram disparadas em sessão real (não em produção):
- `/criar-pack`, `/criar-contexto`, `/criar-perfil` — só usadas no setup inicial do KOD.AI
- `/listar-disponiveis`, `/remover-pack`, `/trocar-perfil` — manutenção rara
- `/excalidraw-diagram` — antes de decisões arquiteturais grandes; ainda não foi disparada nesta pasta-mãe
- `/dev-browser` + `/ver` — quando houver UI; decon-sistema ainda sem deploy
- `/lgpd-ripd`, `/lgpd-dsr-endpoint`, `/secrets-scan` (do SCHOLZE) — operacionais mas não exercitadas

**Não é problema** — skills são esperadas de disparar **quando o cenário pede**. Mas vale confirmar que estão prontas pra quando o cenário aparecer.

---

## 🚨 Issues conhecidos (de sessões anteriores)

| Issue | Severidade | Resolução planejada |
|---|---|---|
| **PAT em `.claude/settings.local.json:80`** | 🚨 Alta | Davi resolve amanhã (revogar + sanitizar + reset --mixed) |
| **Token GitHub antigo `ghp_Zht254O3...`** referenciado em commit | Alta | Revogar em github.com/settings/tokens |
| 4 commits locais aguardando push da pasta-mãe | Média | Após resolver PAT |
| `project_scholze_stack.md` memory levemente desatualizado | Baixa | `/atualizar` na próxima sessão |

---

## Skills/comandos que valem reativar/exercitar próxima sessão

| Skill | Por quê |
|---|---|
| `/notebooklm` (queries em mais notebooks) | Aproveitar 8 notebooks registrados; cada query baixa "rotura desconhecida" do contexto |
| `/skill-creator` | Validar workflow auto-criando próxima skill (em vez de criar manualmente) |
| `/criar-pack` | Quando popular `ia/agente-ia-humanizado` |
| `/break` (SDD) | Aplicar à spec `/upstream-update` (D1-D10 prontas) |

---

## Métricas de saúde KOD.AI nesta pasta-mãe

| Métrica | Valor | Status |
|---|---|---|
| Skills propagadas | 56 | ✅ |
| NotebookLMs registrados | 8 | ✅ |
| Auth NotebookLM age | 5 dias | ✅ (limite 30d) |
| Hooks ativos | 3 (SCHOLZE+SessionStart) | ⚠️ (gabarito KOD.AI: 3 não-ativados) |
| Commits locais não-pushed | 4 | ⚠️ (PAT bloqueando) |
| Match score layout-canonico | ~95% | ✅ (pós-`/organizar` desta sessão) |
| `.md` na raiz | 4 | ✅ (era 8, reduziu 50%) |
| Versão KOD.AI instalada | v0.5.0 + 0.6.0-dev | ✅ atualizado 2026-05-21 |

---

## Conclusão do sweep

**Estado atual:** KOD.AI está **operacional** na pasta-mãe — não é só "documentação". Skills disparam, hooks funcionam, NotebookLMs respondem queries, memory persiste entre sessões.

**Gaps prioritários** (em ordem de impacto):

1. **Hooks JS do KODAI inativos** — gabarito tem; enforcement mecânico ausente. **Próximo passo:** sessão dedicada pra habilitar `pre-commit-guard.js` primeiro (mais conservador), monitorar 1-2 sessões, depois habilitar outros.
2. **PAT exposto** — bloqueia push da pasta-mãe + risco de segurança. **Próximo passo:** Davi resolve amanhã.
3. **NotebookLMs sub-utilizados** — 8 registrados, todos `use_count: 0`. **Próximo passo:** integrar consultas obrigatórias na skill `/atualizar` ou via gatilhos (`metodologias/estrutura-de-contexto.md` já tem gatilhos formalizados — falta enforcement).

KOD.AI saiu de "framework esboçado" e está em "framework operacional dogfood-validated". Próximo nível ("framework de produção fora-do-criador") exige Salto 1 (consumidor não-Davi) + Salto 2 (Evidence Bloc real em produção) — ver `MELHORIAS-PROPOSTAS.md` Cat. F.
