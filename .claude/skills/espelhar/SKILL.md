---
name: espelhar
description: >
  Reflete mudanças efetivas da sessão (commits, arquivos novos, edits significativos, decisões
  tomadas, gaps identificados) nos arquivos vivos do projeto consumidor: PROMPT_MASTER_HANDOFF.md,
  PENDENCIAS.md, _negocio/MAPA.md e memórias persistentes. Sai do modo "atualizo no fim da sessão
  quando lembrar" — entra no modo "espelhamento estruturado e auditável". Use quando: operador
  disser "espelha", "/espelhar", "atualiza memória", "registra o que fizemos"; ao final de sessão
  significativa (≥5 tool uses + ≥1 commit); após criação de skill/contexto/pack importante; antes
  de fechar conversa pra próxima Sessão Zero ter contexto fresco. NUNCA inventa progresso — só
  espelha o que efetivamente aconteceu (git log + arquivos modificados são fonte de verdade).
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

# Skill: `/espelhar`

Reflete mudanças reais da sessão nos arquivos vivos do projeto — sem inventar, com auditabilidade via git.

## Quando disparar

**Triggers explícitos:**
- `/espelhar`
- "Espelha o que fizemos"
- "Atualiza memória"
- "Registra a sessão"
- "Atualiza handoff/pendencias"

**Triggers contextuais (auto-disparo proposto):**
- **Final de sessão** com ≥5 tool uses + ≥1 commit no projeto consumidor (handoff fica desatualizado se não rodar)
- **Após criação de artefato significativo** — skill nova, contexto-domínio novo, pack novo, conceito ≥200 linhas
- **Após resolução de pendência P0/P1** (PENDENCIAS.md fica desatualizado)
- **Após mudança de foco estratégico** (memórias persistentes precisam refletir)
- **Antes de operador dizer "boa noite" ou similar** (próxima Sessão Zero precisa de contexto fresco — operador não confiável pra lembrar de rodar)

**NÃO disparar quando:**
- Sessão com <5 tool uses + 0 commits (nada significativo aconteceu — espelhar = ruído)
- Operador acabou de rodar `/espelhar` há <30 turnos (idempotência)
- Operador está focado em outra coisa e não pediu (use modo `--silencioso` que registra "deveria espelhar mas não interrompi")
- Operador pediu `/atualizar` (skill maior que reconcilia projeto inteiro — escopo diferente, `/espelhar` é leve)

## Pré-requisitos

- Projeto consumidor com KOD.AI instalado
- Arquivos vivos canônicos existem:
  - `_negocio/PROMPT_MASTER_HANDOFF.md` (estado vivo da sessão)
  - `_negocio/PENDENCIAS.md` (fila priorizada)
  - `_negocio/MAPA.md` (mapa do projeto)
  - `_memoria/empresa.md`, `_memoria/preferencias.md`, `_memoria/estrategia.md`
  - Memória persistente em `~/.claude/projects/<projeto-slug>/memory/` (opcional)
- Git rastreando mudanças (commits são fonte de verdade do que efetivamente mudou)

## Argumentos

```
/espelhar                          → workflow completo (handoff + pendencias + memorias)
/espelhar --quick                  → so handoff (skip pendencias e memorias)
/espelhar --silencioso             → registra que deveria espelhar mas nao interrompeu fluxo
/espelhar --dry-run                → mostra diff sem aplicar (operador confirma)
/espelhar --escopo <area>          → so espelha area especifica (ex: skills, contextos, decisoes)
```

## Workflow (5 fases)

### Fase 1 — Detectar mudanças efetivas desde última execução

Fontes de verdade pra detectar mudanças:

1. **Git log do projeto consumidor:**
   ```bash
   git log --since="<última-execução-espelhar>" --pretty=format:"%h %ai %s" --all
   git diff --stat <último-sha-espelhado>..HEAD
   ```
   Captura: commits, arquivos modificados, linhas adicionadas/removidas.

2. **Git log do KODAI upstream** (se aplicável):
   ```bash
   git -C KODAI log --since="<última-execução>" --pretty=format:"%h %ai %s"
   ```
   Captura: skills/contextos/packs criados no upstream desde último espelhamento.

3. **Arquivos novos desde último espelhamento:**
   ```bash
   find _negocio _memoria inbox-* contextos -newer <arquivo-marcador> -type f
   ```
   Captura: brutos novos absorvidos, conceitos criados, decisões tomadas.

4. **Última execução:** lê marker em `.kodai-espelhar-last-run.yaml` com timestamp + SHA do último commit espelhado.

Output da Fase 1: lista estruturada de mudanças categorizadas.

### Fase 2 — Categorizar mudanças

Cada mudança detectada vai pra uma categoria canônica:

| Categoria | Exemplo | Destino canônico |
|---|---|---|
| **Skill criada/atualizada** | `feat(skills): /pedir-contexto DRAFT` | PROMPT_MASTER_HANDOFF (nova seção) + memória `project_kodai` |
| **Contexto-domínio criado/atualizado** | `feat(contexto/gestao-academia-esportiva-br)` | PROMPT_MASTER_HANDOFF + memória do contexto |
| **Pack criado/atualizado** | `feat(packs/comercial/modelos-venda-ia)` | PROMPT_MASTER_HANDOFF + KODAI-INSTALADO.md (se aplicável) |
| **Conceito de competitive-intelligence** | `feat(competitive-intelligence): mapeia X` | PROMPT_MASTER_HANDOFF (lista de mapeamentos) |
| **Bruto sagrado adicionado** | `docs(contextos/bruto/2026-XX-XX_tema.md)` | PROMPT_MASTER_HANDOFF (mencionar input recebido) |
| **Decisão estratégica** | `docs(memoria/estrategia): virada de foco X` | _memoria/estrategia.md + memória `project_X` |
| **Pendência resolvida** | (heurística: ✅ adicionado em PENDENCIAS ou item desmarcado) | PENDENCIAS.md (marcar resolvido) |
| **Pendência nova identificada** | (heurística: gap detectado no fluxo, decisão pendente) | PENDENCIAS.md (adicionar) |
| **Cliente/projeto novo** | Nova pasta `inbox-<cliente>/` OU pasta `Repositorios/<projeto>/` | PROMPT_MASTER_HANDOFF + MAPA.md |
| **Mudança de foco** | `_memoria/estrategia.md` editado em seção "Próximas prioridades" | Memória persistente `project_X` + reporte canônico Sessão Zero |

### Fase 3 — Gerar updates estruturados

Pra cada categoria, gerar update específico:

#### 3.1 — PROMPT_MASTER_HANDOFF.md

Adicionar/atualizar:
- Header: "Última atualização: <data> (sessão N — <tema curto>)"
- Nova seção "**Sessão YYYY-MM-DD (sessão N — <tema>):**" com bullets dos commits/mudanças mais relevantes
- Atualizar "**Próxima ação**" (movendo "Próxima ação anterior" pra histórico se foi cumprida)
- Atualizar "**Bloqueios**" (adicionando novos, removendo resolvidos)
- Atualizar "**Estado por projeto/repo**" se algum mudou estado

#### 3.2 — PENDENCIAS.md

- Marcar resolvidas: itens que mudaram status (P0 → resolvido) — adicionar `**RESOLVIDO YYYY-MM-DD** (commit `<sha>`)` no item
- Adicionar novas: pendências derivadas das mudanças detectadas
- Re-priorizar se necessário (cabeça da fila deve refletir foco atual)
- Header: "Última consolidação: <data> sessão N"

#### 3.3 — _negocio/MAPA.md

- Atualizar se estrutura do projeto mudou (novo repo, nova pasta principal, nova categoria de conteúdo)
- Inventários numéricos (skills, contextos, packs) se valor mudou significativamente

#### 3.4 — _memoria/estrategia.md

- Adicionar entry em "Histórico de mudança de foco" se foco mudou
- Atualizar "Próximas prioridades" se reordenou

#### 3.5 — Memórias persistentes (`~/.claude/projects/<slug>/memory/`)

Pra cada memória relevante:
- `project_<X>.md` — atualizar descrição + adicionar entry "Estado atualizado em <data>" se mudança significativa
- `feedback_<X>.md` — atualizar se nova regra/feedback foi estabelecido na sessão
- `reference_<X>.md` — atualizar se referência externa mudou

### Fase 4 — Apresentar diff + commit

1. **Diff visível** ao operador (cada arquivo modificado em formato git diff)
2. **Modo `--dry-run`:** para aqui, operador confirma
3. **Modo padrão:** se diff é trivial (≤3 arquivos, mudanças óbvias), aplica sem perguntar; se ≥4 arquivos OU mudanças sensíveis (decisão estratégica, mudança de foco), pergunta antes
4. **Aplica edits** (Edit por arquivo, não Write — preservar conteúdo existente)
5. **Commit + push** dos arquivos de memória/handoff/pendencias atualizados:
   - Mensagem: `docs(memoria): espelha sessao N — <N> commits + <N> skills + <N> contextos`
   - Push só se branch não está bloqueada por C1/segurança

### Fase 5 — Atualizar marker + reportar

1. Atualiza `.kodai-espelhar-last-run.yaml`:
   ```yaml
   last_run: <ISO timestamp>
   last_commit_sha: <último SHA espelhado>
   mudancas_categorizadas:
     skills_criadas: <count>
     contextos_atualizados: <count>
     packs_criados: <count>
     conceitos_competitive_intel: <count>
     pendencias_resolvidas: <count>
     pendencias_novas: <count>
     mudancas_foco: <count>
   arquivos_atualizados:
     - <path 1>
     - <path 2>
   ```

2. **Reporte conciso** (≤10 linhas no terminal):
   - Quantos arquivos atualizados
   - Top 3 mudanças refletidas
   - Próxima execução sugerida (ex: "rode `/espelhar` de novo após próxima feature significativa")

## Modo `--silencioso`

Quando IA detecta que DEVERIA espelhar (≥5 tool uses + ≥1 commit) mas operador está claramente focado em outra coisa:
1. Registra "espelhamento pendente" em `.kodai-espelhar-pending.yaml` com lista de mudanças não espelhadas
2. Próxima `/abrir` (Sessão Zero) menciona "X mudanças pendentes de espelhamento" no reporte canônico
3. Operador decide quando rodar manualmente

## Casos de uso comuns

### Caso 1: Final de sessão significativa

Sessão com 10 commits no KODAI upstream + 3 commits no repo dojo + 2 commits pasta-mãe local. Antes de operador fechar conversa:

```
✓ Espelhamento da sessão 4 (2026-05-21) concluído

Arquivos atualizados (5):
- _negocio/PROMPT_MASTER_HANDOFF.md (nova seção sessão 4)
- _negocio/PENDENCIAS.md (3 pendencias resolvidas + 2 novas)
- _memoria/estrategia.md (virada de foco KOD.AI → prática)
- memory/project_kodai.md (atualizado: 70 skills + 4 contextos + skill /mapear-concorrente FUNCIONAL)
- memory/project_dojo.md (virou piloto 1 KOD.AI, modelo de venda revisado R$1-20k)

Top 3 mudanças refletidas:
1. 3 skills DRAFT criadas (/pedir-contexto, /proposta-cliente, /espelhar)
2. /mapear-concorrente promovida DRAFT → FUNCIONAL (3 concorrentes mapeados)
3. Modelo de venda MeuDojo revisado (não-SaaS-puro → DFY/DWY/DIY adaptável)

Marker atualizado: .kodai-espelhar-last-run.yaml (SHA <last-commit>)
Próxima execução sugerida: após próxima feature significativa OU início próxima sessão
```

### Caso 2: Após criação de skill nova (auto-disparo)

Operador acabou de criar skill `/X` via `/criar-skill` ou similar. Auto-espelha:

```
✓ Detectado: skill /X criada em KODAI/1-ESQUELETO/skills-universais/X/
Espelhamento incremental aplicado:
- PROMPT_MASTER_HANDOFF.md: +bullet "Skill /X DRAFT criada (commit <sha>)"
- memory/project_kodai.md: total de skills atualizado (N → N+1)
```

### Caso 3: Modo --dry-run antes de commit grande

Operador quer ver o que vai mudar antes de aplicar:

```
$ /espelhar --dry-run

📋 Diff proposto (5 arquivos):

1. _negocio/PROMPT_MASTER_HANDOFF.md
   + Nova seção "Sessão 2026-05-21 (sessão 4 — espelhamento incremental)"
   + Bullets: 3 skills DRAFT + Kicksite mapeado + modelo venda revisado

2. _negocio/PENDENCIAS.md
   ~ K4 (Piloto NV-Dev) — atualizado pra "amanhã 2026-05-22"
   + J3 (Implementar app dojo usando gestao-academia-esportiva-br) — adicionado

[... outros diffs ...]

Confirma? (sim/não/edita)
```

## Política irmã + skills relacionadas

- `1-ESQUELETO/politicas/honestidade-em-claims.md` — base (não inventar progresso)
- `1-ESQUELETO/politicas/documentar-cada-implementacao.md` — princípio que `/espelhar` operacionaliza
- `1-ESQUELETO/skills-universais/atualizar` — skill maior que reconcilia projeto inteiro (escopo: identificar drift; `/espelhar` é leve, foca em commits/mudanças recentes)
- `1-ESQUELETO/skills-universais/check-in` — skill de "estado atual" (reporta sem espelhar; `/espelhar` aplica mudanças)
- `1-ESQUELETO/skills-universais/abrir` — Sessão Zero (consome `/espelhar` da sessão anterior pra ter contexto fresco)
- `1-ESQUELETO/skills-universais/salvar` — commit + push genérico (pode disparar `/espelhar` antes do push)
- `1-ESQUELETO/skills-universais/pedir-contexto` — irmã (skill ativa de comunicação humana)
- `1-ESQUELETO/skills-universais/proposta-cliente` — irmã (orquestradora)

## Limitações honestas

- **Detecta mudanças via git + filesystem** — se operador NÃO commitou, `/espelhar` não vê
- **Categorização é heurística** — pode misturar categorias em casos complexos; operador deve revisar
- **Não substitui curadoria humana** — é primeira passagem; decisões estratégicas precisam revisão consciente
- **Não atualiza arquivos do upstream KOD.AI** — escopo é projeto consumidor; mudanças no upstream são tarefa do operador
- **Não roda automaticamente sem hook** — atualmente disparo manual OU outras skills chamam internamente; hook PostToolUse "intelligent" é roadmap futuro
- **Marker `.kodai-espelhar-last-run.yaml`** pode ficar dessincronizado se múltiplas sessões paralelas — operador deve garantir 1 sessão por vez OU ignorar marker e re-espelhar tudo desde data X

## Critérios de PASS

1. Arquivos vivos atualizados refletindo commits/mudanças efetivas (git como fonte de verdade)
2. Categorização aplicada (mudanças vão pros destinos canônicos corretos)
3. Diff apresentado em modo `--dry-run` se solicitado
4. Modo `--silencioso` registra pendência sem interromper
5. Commit + push das atualizações de memória/handoff/pendencias (se autorizado)
6. Marker `.kodai-espelhar-last-run.yaml` atualizado
7. Reporte conciso (≤10 linhas no terminal)
8. Idempotência: rodar 2x em sequência não duplica entradas (usa marker de última execução)

## Por que esta skill existe

Estabelecida em 2026-05-21 sessão 4 após análise honesta KOD.AI vs fluxo desejado identificar gap claro: **espelhamento em tempo real** dos arquivos vivos. Sem skill estruturada, atualização depende de IA lembrar manualmente no fim da sessão — frequentemente esquecido OU feito tardio (quando contexto da sessão já está difuso).

Cruza com regra-base `feedback_nao_perder_contextos`: se IA pode esquecer de processar ponto da mensagem, também pode esquecer de espelhar progresso da sessão. `/espelhar` operacionaliza o espelhamento em rito formal — git é fonte de verdade, heurística categoriza, edits aplicam.

Companion skill de `/pedir-contexto` (skill ativa pra pedir) e `/proposta-cliente` (skill ativa pra atender) — completam a tríade de skills propostas na análise honesta da sessão 4.

Roadmap futuro: virar hook PostToolUse "intelligent" que detecta momentos-chave automaticamente e dispara `/espelhar` sem precisar lembrar.
