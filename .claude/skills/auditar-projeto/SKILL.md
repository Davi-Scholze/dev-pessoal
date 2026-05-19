---
name: auditar-projeto
description: >
  Audita projeto consumidor existente (pasta-mãe ou repo) em 8 fases — pré-flight, inventário,
  classificação por 3 eixos, cross-ref com KOD.AI, plano humano-aprovado, execução via
  /absorver-contexto + /absorver-referencia, quarentena, upstream-pitch. Use quando
  o usuário disser "auditar projeto", "/auditar-projeto", "varre minha pasta-mãe", "o que tem
  aí que vale pro KODAI?", "absorve o que tem nesse projeto", ou ao apontar projeto já maduro
  com 6+ meses de evolução pra ingestão curada. Modo default audit-only (não instala, não
  absorve — só gera inventário + classificação + plano). Modo opt-in --with-install dispara
  /instalar se KODAI ausente. Modo opt-in --execute aplica absorção dos itens aprovados no
  plano.md. NUNCA deleta — sempre quarentena. NUNCA toca credencial/PII (pausa com alarme).
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - SlashCommand
---

# Skill: `/auditar-projeto`

Orquestrador de 8 fases pra ingerir projeto consumidor já maduro sem destruir o existente, capturando o universal pra evoluir o KOD.AI.

## Quando disparar

**Triggers explícitos:**
- "/auditar-projeto" (com ou sem argumentos)
- "auditar projeto" / "auditar essa pasta" / "varre minha pasta-mãe"
- "o que tem aqui que valeria pro KOD.AI?"
- "absorve o que tem nesse projeto"
- "auto-mapeamento" (vocabulário do Davi no bruto)

**Triggers contextuais:**
- Usuário aponta para pasta-mãe com 845MB+ de contextos + repos já estruturados
- Após `/instalar` em projeto que NÃO era greenfield (heurística de detecção)
- Quando `/atualizar` Passo 5 detecta material em pastas-irmãs com volume significativo

**NÃO disparar quando:**
- Pasta greenfield (vazia ou com <10 arquivos `.md`) → `/instalar` direto
- Já existe `.kodai-auditoria/<data>/plano.md` recente (<24h) sem resume request
- Usuário pediu `/atualizar-kodai` (sync upstream, escopo diferente)

## Argumentos

```
/auditar-projeto <path>                  → modo audit-only default (D10-C)
/auditar-projeto <path> --with-install   → roda /instalar se KOD.AI ausente (D10-B)
/auditar-projeto <path> --execute        → executa absorção dos itens aprovados em plano.md
/auditar-projeto <path> --resume         → re-lê plano.md editado pelo usuário (checkboxes) e executa
/auditar-projeto <path> --confirmar-delete <data>     → 1º OK pra apagar itens em quarentena
/auditar-projeto <path> --confirmar-delete <data> --confirmacao-final   → 2º OK obrigatório (D3-C)
```

## 8 Fases (decisões D1-D10 já consolidadas — ver spec)

### Fase 1 — Pré-flight (D10)

1. Detectar tipo de projeto:
   - `greenfield` → menos de 10 `.md` + sem `.git` → propor `/instalar` em vez
   - `projeto-solo-com-kodai` → tem `KODAI-INSTALADO.md` na raiz
   - `pasta-mae-com-repos` → tem `repos/` + múltiplos `CLAUDE.md`
   - `repo-isolado` → tem `.git` mas sem KODAI-INSTALADO.md
   - `monorepo` → tem `packages/` ou `apps/` em estrutura JS
2. Detectar KOD.AI ausente:
   - Modo default (`audit-only`): segue sem instalar
   - Modo opt-in (`--with-install`): dispara `/instalar` antes
3. Verificar dependências mínimas: `git` instalado, permissões de leitura na pasta
4. Criar `.kodai-auditoria/<YYYY-MM-DD>/` + `pre-flight.yaml`

### Fase 2 — Inventário passivo

Filtros default aplicam (não-negociáveis):
- skip `.env*`, `*secret*`, `*credential*`, `node_modules/`, `.git/`, `.venv/`, `dist/`, `build/`
- skip mídia pesada: `.opus|.mp3|.mp4|.mov|.zip|.tar|.exe|.dmg`
- skip arquivos > 500KB (configurável)
- ler **apenas texto** — binários ficam fora do inventário

Output: `inventario.yaml` com `{path, size_bytes, mtime, ext, hash, readable}` por arquivo.

### Fase 3 — Classificação por 3 EIXOS canônicos

Cada arquivo recebe tupla `{eixo, ação}`:

**Eixos:**
- `GROUNDING` — o que IA cria/produz (regras de negócio, schema, design system)
- `ORCHESTRATION` — o que IA é/tem (.claude/, skills, hooks, regras de interação)
- `META` — estrutura sobre estrutura (templates, índices, ADRs estruturais)

**Ações:**
- `UNIVERSAL_DIRETO` — eixo claro + sem marca/persona/IDs do projeto
- `UNIVERSALIZAR` — eixo claro com marca dentro, mas estrutura aproveitável
- `MANTÉM_NO_PROJETO` — eixo Grounding específico ao produto
- `GATE_HUMANO` — sinais conflitantes

**Filtros de proteção (D5-B — ALARME e pausa):**

Regex que **pausam fase** com alarme:
- Credenciais: `sk_(live|test)_[a-zA-Z0-9]{20,}`, `ghp_[a-zA-Z0-9]{36}`, JWTs, AWS keys
- PII BR: CPF, CNPJ, telefone, email pessoal (gmail/hotmail/etc)
- IDs infra: Supabase project IDs, Vercel deployment IDs

Quando detectado: **🚨 ALARME** + pausa + arquivo marcado `BLOCKED_BY_SAFETY` + reporte ao usuário.

Output: `classificacao.yaml` com `{path, eixo, acao, razao, target_kodai, gate_humano}`.

### Fase 4 — Cross-reference KOD.AI

Pra cada item `UNIVERSAL_DIRETO` ou `UNIVERSALIZAR`, comparar com KOD.AI atual:

| Categoria | Significado | IA aplica sozinha? |
|---|---|---|
| `NOVO` | inédito sem conflito | ✅ batch approve (D4-C) |
| `CONFIRMA` | duplicado, fonte detalha menos | ✅ skip silencioso |
| `REFINA` | complementa existente | ❌ item-por-item (D4-C) |
| `ALTERA` | muda significado | ❌ **sempre gate humano** |
| `DESCARTA` | conflita com regra-base | ❌ **sempre gate humano** |

Output: `cross-ref-kodai.yaml`.

### Fase 5 — Plano humano-legível

Gera `plano.md` com 1 seção por item:

```markdown
## [#NN] <título>
**Origem:** <path>
**Tamanho:** XKB
**Eixo:** ORCHESTRATION
**Ação:** UNIVERSALIZAR
**Cross-ref:** NOVO
**Destino KOD.AI:** <path>
**Anti-verbatim necessário?** SIM
**Risco:** baixo|médio|alto
**Razão:** <2-3 frases>
**Trecho representativo:**
```<5-10 linhas>```
### Ação proposta
- [ ] Aprovar absorção
- [ ] Pular
- [ ] Diferir (re-avaliar em 30 dias)
- [ ] Anonimizar antes (eu mexo, re-rodo)
```

**Gate híbrido (D4-C):**
- Itens `NOVO`+`CONFIRMA`: batch único "aprovar tudo?"
- Itens `REFINA`/`ALTERA`/`DESCARTA`: item-por-item obrigatório

### Fase 6 — Execução (modo `--execute`)

Pra cada item com checkbox marcado:
- Se `UNIVERSAL_DIRETO`: invoca `/absorver-contexto <path> --destination <target>`
- Se `UNIVERSALIZAR`: invoca `/absorver-referencia <path>` com anti-verbatim PASS obrigatório
- Se anti-verbatim falha (D8-A): **bloqueia absorção**, reporta no `EVIDENCE.md`
- Commit granular por item absorvido (regra-base 7)

Output: `EVIDENCE.md` com bloc por item.

### Fase 7 — Quarentena (D3-C — 2 OKs)

Após absorção bem-sucedida:
1. Item original **NÃO é deletado** do projeto consumidor
2. Move para `.absorcao-quarentena/<data>/<path-original>`
3. Registra em `quarentena-log.yaml` com hash + data + destino KOD.AI

**Delete real** só com 2 OKs separados:
```
/auditar-projeto <path> --confirmar-delete <data>        ← 1º OK
/auditar-projeto <path> --confirmar-delete <data> --confirmacao-final   ← 2º OK obrigatório
```
Sem tempo mínimo forçado (D3-C), mas mecanismo recomenda 7 dias.

### Fase 8 — Upstream-pitch (D6-A)

Gera `upstream-pitch.md` em markdown puro pra Davi colar em sessão do KOD.AI upstream:

```markdown
# Pitch: contribuição de <projeto> em <data>
N itens absorvidos:
- Item 1: <path KOD.AI> ← <path original>
- ...
Pra trazer pro upstream:
- git pull origin main (no clone do KOD.AI)
- Aplicar diffs já commitados local
- Disparar /upstream-update --from <projeto>
```

**NÃO dispara `/upstream-update` automaticamente** (D6-A) — Davi cola manualmente quando quiser.

## Heurística de pré-triagem (D9-C)

Se durante Fase 2 detectar pastas conhecidamente já triadas:
- `kodai-contribuicoes/` (heurística default)
- `upstream/` (heurística default)
- `share/` (heurística default)

Ou marcador YAML opt-in:
```yaml
# .kodai-pre-triado.yaml na raiz do projeto consumidor
pre_triados:
  - _negocio/contextos/universal/
  - docs/lessons-learned/
```

Esses paths **pulam Fases 3-4** e vão direto pra Fase 5 (plano) com etiqueta `PRE_TRIADO`.

## .claude/ preexistente (D7-A)

Política aditiva (não-destrutiva):
- Skills do KOD.AI propagadas pra `.claude/skills/<nome>/` apenas se NÃO existe homônimo
- Conflito de nome: pula + reporta em `EVIDENCE.md` ("já existe — não substituído")
- Hooks do KOD.AI propagados pra `.claude/hooks/` com nomes prefixados `kodai-<hook>.js` se conflito
- Backup: NÃO move preexistente — usuário decide

## Regras de negócio operacionais

- **Leitura passiva é separada de escrita.** Fases 1-4 nunca escrevem em arquivo do consumidor (só em `.kodai-auditoria/`).
- **Credencial/PII detectada ALARMA** (D5-B) — pausa fase, espera revisão humana antes de seguir.
- **Anti-verbatim PASS obrigatório** em `UNIVERSALIZAR` (D8-A) — falha = bloqueia.
- **Quarentena obrigatória** antes de qualquer delete (D3-C).
- **Sessão paralela git** (Davi tem 2 contas na máquina): mecanismo **só toca config local**, nunca `--global`.
- **Reuso de absorvedores**: usa `/absorver-contexto` e `/absorver-referencia` no motor — não duplica lógica.

## Critérios de PASS (regra-base 12 — Iron Law)

Skill considerada implementada quando:
1. Piloto real PASS contra `Navortech-Desenvolvimento` — 100+ arquivos classificados, 17 itens pré-triados detectados via heurística D9
2. Plano humano-legível gerado em `plano.md`
3. Anti-verbatim PASS em todos itens `UNIVERSALIZAR` absorvidos
4. Nenhum arquivo com credencial/PII vazou
5. Quarentena funcional (itens absorvidos NÃO deletados imediatamente)
6. `EVIDENCE.md` completo com bloc por item

## Relações

- **Spec:** [`docs/decisoes/2026-05-20-auto-mapeamento-projeto-consumidor.md`](../../../docs/decisoes/2026-05-20-auto-mapeamento-projeto-consumidor.md)
- **Spec-irmã:** [`docs/decisoes/2026-05-20-upstream-update-mecanismo.md`](../../../docs/decisoes/2026-05-20-upstream-update-mecanismo.md)
- **Motores:** `/absorver-contexto`, `/absorver-referencia`
- **Auto-descoberta cross-ref:** `/atualizar` Passo 5
- **Filtros segurança:** alinhado com `regras-base.md` regra 4 (LGPD) + regra 5 (zero credenciais)
- **Metodologia:** [`mapeamento-iterativo.md`](../../metodologias/mapeamento-iterativo.md) (5 categorias)
- **Eixos:** [`estrutura-de-contexto.md`](../../metodologias/estrutura-de-contexto.md) (Grounding/Orchestration/Meta)
