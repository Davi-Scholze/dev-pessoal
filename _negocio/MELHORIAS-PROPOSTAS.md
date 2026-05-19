# MELHORIAS PROPOSTAS — KOD.AI

> Análise crítica feita em 2026-05-21 alinhada com objetivo declarado do KOD.AI nessa fase:
> *"Preparar regras + estruturas para aguentar contextos de diferentes objetivos, tamanhos, universais ou específicos."*
>
> Cada melhoria tem: **diagnóstico (gap) → proposta concreta → custo → impacto**.

---

## Categoria A — Capacidade de contexto (alinhado ao objetivo declarado)

### A1 — Contexto profundo (CAG + Prompt Caching)

**Gap:** KOD.AI tem skills pra capturar contexto LEVE (`/capturar`, `/capturar-imagem`, `/capturar-video`, `/transcribe-audio`) mas não tem mecanismo formal pra **contexto profundo** — livros de domínio, specs 200+ páginas, transcripts longos.

**Proposta:** Pack novo `KODAI/2-PACKS/packs/ia/contexto-profundo/` com 3 backends:
- Anthropic Prompt Caching (default multi-cliente, escala melhor)
- NotebookLM (secundário, free pra dogfooding Davi)
- RAG vector DB (futuro, quando KB > janela do LLM)

Padrão emergente "JIT + Cache aquecido" capturado em pesquisa 2026-05-21 (`docs/decisoes/2026-05-21_pesquisa-contexto-profundo.md`).

**Custo:** spec + 1 backend default (~3-5 sessões). **Impacto:** desbloqueia 4 arquivos pesados + 3 NotebookLMs do Davi + qualquer cliente futuro com livro de domínio.

### A2 — Captura de contexto de cliente (pipeline completo)

**Gap:** `/capturar-contexto-cliente` é apenas guia de prompt pra Davi rodar manualmente. Não há automação do pipeline áudio → transcript → entrevista estruturada → `_memoria/empresa.md` populado.

**Proposta:** Skill nova `/onboarding-cliente` que orquestra:
1. Receber áudio/vídeo do stakeholder (via `/capturar-video` ou path direto)
2. Extrair áudio + transcrever (`/transcribe-audio`)
3. Gerar **entrevista estruturada** de 8-10 perguntas baseadas no domínio detectado
4. Sintetizar respostas em rascunho de `_memoria/empresa.md` + `_memoria/preferencias.md` + `_memoria/estrategia.md`
5. Apresentar pra Davi revisar item-por-item + ajustar

**Custo:** ~5-7 sessões. **Impacto:** instalar em cliente novo cai de 2h pra 30min.

### A3 — Contextos-domínio populados (templates, não verbatim)

**Gap:** Filosofia v0.2+ diz "KOD.AI não entrega domínio pronto". Justo. Mas hoje só há `_template-contexto/` vazio. Falta **template específico por vertical** que o cliente preenche.

**Proposta:** 3-5 templates de contexto-domínio em `KODAI/3-CONTEXTOS-DOMINIO/`:
- `_template-contexto/` (já existe, OK)
- `_template-contabilidade/` — frame de perguntas pra contadores (regimes, regulamentações)
- `_template-clinica/` — frame pra área de saúde (LGPD especial, prontuário, agendamento)
- `_template-ecommerce/` — frame pra varejo online (estoque, pagamento, logística)
- `_template-saas-b2b/` — frame pra SaaS (onboarding, billing, multi-tenant)
- `_template-ong/` — frame pra terceiro setor

Cada template é **frame de captura** (perguntas estruturadas), não conteúdo. Cliente populá via `/onboarding-cliente`.

**Custo:** ~2 sessões por template (10 sessões total). **Impacto:** acelera instalação em vertical novo de "do zero" pra "preencher frame".

### A4 — Política de **classificação de sensibilidade de contexto**

**Gap:** KOD.AI trata todo contexto igual. Mas há diferenças críticas:
- **Público** (manual do produto público) → pode subir em NotebookLM, prompt cache, qualquer hosting
- **Interno** (specs internas, design docs) → só localmente, não vai pra serviços terceiros sem OK
- **Confidencial** (briefing de cliente, NDA) → criptografia, acesso restrito, auditoria
- **PII** (CPF, RG, endereço) → política LGPD especial

**Proposta:** Política `politicas/classificacao-contexto.md` + tag `sensibilidade: <publico|interno|confidencial|pii>` nos cabeçalhos YAML obrigatória. Skills + hooks **respeitam** o tag (ex: `/notebooklm` se recusa a enviar confidencial; `/capturar-imagem` PII pausa pedindo confirmação).

**Custo:** ~2 sessões pra política + 1 sessão pra retrofit nas skills existentes. **Impacto:** habilita uso B2B sério (clientes corporativos não usam framework sem isso).

---

## Categoria B — Skills proativas (que disparam SEM o humano invocar)

### B1 — Ativar `secrets-scan` no pre-commit hook

**Gap:** Skill `secrets-scan` existe no catálogo SCHOLZE. Detectaria PAT em texto plano. Mas só dispara on-demand. Hoje commitamos PAT inadvertidamente nesta sessão — só o GitHub Push Protection pegou.

**Proposta:** Hook `.claude/hooks/pre-commit-secrets-scan.js` (gabarito KOD.AI já tem `pre-commit-guard.js` — estende) que roda secrets-scan ANTES de cada `git commit`. Bloqueia se detectar.

**Custo:** ~1 sessão. **Impacto:** zero credencial commitada acidentalmente daqui pra frente.

### B2 — `/evoluir-contexto` rodando proativamente

**Gap:** Skill `/evoluir-contexto` (v0.5) detecta drift mas só dispara on-demand.

**Proposta:** Hook `.claude/hooks/post-session-evolve.js` (ou cron) que roda `/evoluir-contexto` ao final de cada N sessões OU mensalmente. Sugere ao Davi:
- Contextos > 90 dias sem update
- Notebooks órfãos
- Contradições entre memória e workspace real

**Custo:** ~2 sessões. **Impacto:** contextos não viram lixo antigo.

### B3 — Auto-detecção de contexto bruto em mensagens

**Gap:** Quando Davi cola material grande no chat (transcript, briefing, print), skill `/capturar` precisa ser invocada manualmente.

**Proposta:** Hook `inject-warning.js` (gabarito) estendido pra detectar:
- Mensagem do usuário > 500 palavras
- Padrões "transcrição de áudio", "briefing", "Denize disse..."
- Path absoluto de arquivo grande

Quando detecta, sugere `/capturar` automaticamente. Não força — só sugere.

**Custo:** ~1 sessão. **Impacto:** brutos nunca mais perdidos por esquecimento de capturar.

---

## Categoria C — Robustez operacional

### C1 — Hooks JS ativados (não só gabarito)

**Gap:** 3 hooks JS em `KODAI/1-ESQUELETO/hooks/` são gabarito. `.claude/settings.json` da pasta-mãe não tem `hooks` configurados pra eles.

**Proposta:** Habilitar progressivamente:
1. `pre-commit-guard.js` (PreToolUse Bash) — bloqueia force push, DDL sem aprovação, escrita destrutiva em `.gitignore`/`.env`
2. `check-completion-claims.js` (PostToolUse) — bloqueia "feito/done/completo" sem Evidence Bloc
3. `inject-warning.js` (UserPromptSubmit) — injeta avisos contextuais

**Custo:** 1 sessão pra habilitar + 2-3 sessões pra calibrar (sem virar irritante). **Impacto:** enforcement mecânico das regras-base 7, 11, 12.

### C2 — Prompt caching configurado de verdade

**Gap:** `KODAI/.claude/hooks/prompt_cache_config.md` documenta 3 candidatos a cache (pacote AGENTS+PRECEDENCE+CONTEXT-OS, SKILL.md longas, MCP/tools). Mas Claude Code "gerencia auto" e não há evidência de cache hit rate medido em sessões reais.

**Proposta:** 
1. Validar via `/check-in` que pacote canônico está no cache (cabeçalhos `cache_control`)
2. Skill `/medir-cache` nova que reporta hit rate (extraindo da telemetria do Claude Code se acessível, ou estimando manualmente)
3. Documentar tempos antes/depois em `99_meta/audit_log.md`

**Custo:** ~2 sessões. **Impacto:** valida claim de "30-90% redução em custo" — sem isso, é só teoria.

### C3 — Testes para skills do KOD.AI

**Gap:** Skills KOD.AI são `.md` operacionais. Não há testes que validem que skill X invoca skill Y quando deveria. Refactor pode quebrar composição (`/auditar-projeto` → `/absorver-contexto`) sem ninguém notar.

**Proposta:** Suite de testes de invocação em `KODAI/tests/` com cenários:
- "Mensagem com palavra 'organizar' → IA invoca `/organizar`"
- "Path de imagem no chat → IA sugere `/capturar-imagem`"
- "Fim de sessão → handoff atualizado?"

Pode ser scripted (Python/JS) ou checklist manual.

**Custo:** ~3 sessões. **Impacto:** regressão controlada.

---

## Categoria D — Multi-LLM (regra-base 9 — portátil)

### D1 — Validar em Cursor + Aider

**Gap:** KOD.AI mira ser portátil (AGENTS.md em vez de só CLAUDE.md, etc.) mas só foi testado em Claude Code. Pode quebrar silenciosamente em outro host.

**Proposta:** 
1. Instalar Cursor + abrir pasta-mãe → ver se `AGENTS.md` é lido + skills aparecem como `.cursorrules`-equivalente
2. Idem Aider (`.aider.conf.yml`)
3. Documentar incompatibilidades em `docs/portabilidade.md`
4. Eventualmente: skill `/sync-vendor-formats` que gera arquivos derivados (Cursor, Aider) a partir de `AGENTS.md`

**Custo:** ~3 sessões (test + doc). **Impacto:** "portátil" deixa de ser claim e vira realidade.

### D2 — Marketplace plugin Claude Code

**Gap:** KOD.AI tem pasta `.claude-plugin/` mencionada mas não está publicada.

**Proposta:** Publicar como plugin marketplace pra que outros devs instalem com 1 comando.

**Custo:** 1-2 sessões. **Impacto:** distribuição.

---

## Categoria E — Spec → Implementação (frentes ready-to-execute)

| Frente | Status | Próxima ação |
|---|---|---|
| `/upstream-update` | D1-D10 RESOLVIDAS 2026-05-21 | `/break` em 7 tasks |
| Contexto-profundo | Pesquisa 2026-05-21 OK | `/brainstorming` → spec → impl |
| `/auditar-projeto` | Skill criada, falta piloto | Rodar contra Navortech-Desenvolvimento |
| `/skill-creator` | Bundled tier-3 OK | Usar pra criar próxima skill (auto-validar workflow) |

---

## Categoria F — Especialização vertical

### F1 — Pack `ia/agente-ia-humanizado`

**Gap:** Não existe pack. Roadmap KOD.AI tem como "v0.2.0 primeiro pack FUNCIONAL". Davi quer ele.

**Proposta:** Criar pack que ensina IA a soar como o cliente (extrai tom + vocab + frame mental de brutos de stakeholder).

**Custo:** ~5-8 sessões + Evidence Bloc. **Impacto:** primeiro pack BATTLE-TESTED. Estratégico.

### F2 — Pack `lgpd-compliance`

**Gap:** Regra-base 4 (LGPD em formulários) é regra mas não pack. Falta operacional.

**Proposta:** Pack que entrega: skill `/lgpd-scan`, política `politicas/lgpd-coleta-dados.md` enriquecida, template de RIPD (Relatório de Impacto), checklist de consentimento, DSR endpoint scaffold.

KOD.AI já tem `/lgpd-dsr-endpoint` + `/lgpd-ripd` no catálogo SCHOLZE como skill — pack consolida tudo.

**Custo:** ~3 sessões. **Impacto:** clientes corporativos confortáveis.

### F3 — Pack `mobile-first` (RN+Expo)

**Gap:** Regra-base 8 (mobile-first) é regra mas não pack. Dojô vai precisar.

**Proposta:** Pack com scaffold Expo + NativeWind + design tokens responsivos + e2e Maestro.

**Custo:** ~5-8 sessões. **Impacto:** Dojô destrava + qualquer projeto RN futuro.

---

## Sugestão de priorização (próximas 4-6 sessões)

| Sessão | Foco | Resultado |
|---|---|---|
| 1 | C1 (hooks JS ativados em `.claude/settings.json`) | Enforcement mecânico das regras 7/11/12 |
| 2 | A4 (classificação de sensibilidade) | Pre-requisito pra A1 e A2 |
| 3 | E1 — `/upstream-update` `/break` em 7 tasks | Spec executável |
| 4-5 | A1 — pack contexto-profundo (Anthropic Cache + skill /contexto-profundo) | Destrava 4 arquivos + 3 NotebookLMs do Davi |
| 6 | E3 — piloto `/auditar-projeto` NV-Dev | Salto 1 do KOD.AI (primeira prova fora-do-dogfooding) |

Total: ~6 sessões pra fechar core do "fase atual: aguentar contextos".

---

## O que esta lista NÃO cobre (deliberadamente)

- **Estrela polar 3/5/10 anos** — exige `/brainstorming` com Davi, não cabe em sugestão
- **Modelo de negócio** — Davi decide
- **Marketplace dependencies** (Cursor plugins, Aider hooks) — fora de escopo da fase atual
- **Refactor de SKILL.md longas** (algumas passam de 300 linhas — anti-padrão recente) — deixar pra sessão dedicada
- **i18n / l10n** — KOD.AI assume PT-BR; multi-idioma é futuro

---

## Como esta lista evolui

- Adicionar entradas conforme novas observações
- Mover concluídas pra `CHANGELOG.md` do KODAI
- Re-priorizar a cada `/atualizar`
- Sub-skill futura: `/sugerir-melhorias` que regenera esta lista olhando estado atual do workspace
