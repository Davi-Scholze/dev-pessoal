---
name: validar-handoff
description: >
  Valida handoff payload (YAML/JSON) contra schema declarado em `handoff_in:` do
  manifest da skill alvo. Bloqueia invocação se schema falhar — retorna campos
  faltantes + remediation acionável. Usado em pipelines multi-skill (Director
  invocando Employee, ou fluxo /spec → /break → /plan → /execute → /complete)
  pra prevenir handoffs não-estruturados que amplificam erros ~17×. Use sempre
  que disser "validar handoff", "/validar-handoff <skill>", "checa briefing
  antes de invocar", ou quando pipeline encadeia 2+ skills com dependência.
allowed-tools:
  - Read
  - Bash
  - Glob
---

# Skill: `/validar-handoff`

Gate de validação estruturada entre skills. Operacionaliza `politicas/handoff-contracts.md`.

## Princípio

> **Pesquisa pública sobre multi-agent reliability cita amplificação de erros ~17× em handoffs não-estruturados.** Validator zero contra esse problema: schema declarativo + check determinístico antes de invocar.

## Quando disparar

**Triggers explícitos:**
- "/validar-handoff <skill-name> --payload <yaml>"
- "checa briefing antes de invocar X"
- "valida handoff pra Y"

**Triggers contextuais:**
- Director chamando Employee em squad-3-tier
- Pipeline encadeado `/spec → /break → /plan → /execute → /review → /complete`
- Qualquer invocação cross-tier (Coordinator → Director, Director → Employee)

**NÃO disparar:**
- Skill standalone sem dependência de input estruturado
- Skill manual onde humano vai responder dúvidas no momento
- Pra economizar tempo em pipeline trivial (1 skill só)

## Modos de operação

| Modo | Flag | O que faz |
|---|---|---|
| **Check** (default) | `--check` (default) | Valida payload contra schema; retorna PASS/BLOCKED/DEGRADED |
| **Strict** | `--strict` | PASS só se todos `required` + todos `recommended` presentes |
| **Dry-run** | `--dry-run` | Mostra schema esperado sem validar payload (debug) |
| **List schemas** | `--list <skill-name>` | Lista handoff_in declarado na skill alvo (debug) |

## Workflow

### Passo 1 — Localizar manifest da skill alvo

```bash
# Padrão de busca
find <kodai-root>/1-ESQUELETO/skills-universais/<skill-name>/ -name "SKILL.md" -o -name "manifest.yaml"
find <kodai-root>/2-PACKS/packs/**/<skill-name>/ -name "SKILL.md" -o -name "manifest.yaml"
```

Se skill não encontrada: retornar `BLOCKED` com mensagem "skill <name> não encontrada no KODAI ativo".

### Passo 2 — Parsear `handoff_in:` do frontmatter

Ler YAML frontmatter do SKILL.md alvo. Extrair:

```yaml
handoff_in:
  required:
    <field1>: <type or description>
    <field2>: <type or description>
  optional:
    <field3>: <type or description>
  schema:
    <field1>: <type/format>
    <field2>: <type/format>
```

Se skill não declara `handoff_in:`: retornar `DEGRADED` com aviso "skill não tem contrato declarado — handoff não pode ser validado". Não bloqueia (compatibilidade com skills legadas).

### Passo 3 — Validar payload contra schema

Pra cada field declarado:

| Tipo de check | Lógica |
|---|---|
| **Required presence** | Field em `required:` está presente no payload? Se não: BLOCKED |
| **Optional + recommended** | Field em `optional:` ausente: warning. Se modo `--strict`: BLOCKED |
| **Type check (se schema declarado)** | Field tem tipo/formato declarado (string, path, enum, json-object)? Se inválido: BLOCKED |
| **Path exists (se field é path)** | Path declarado existe no filesystem? Se não: BLOCKED com remediation |

### Passo 4 — Retornar resultado estruturado

**PASS:**

```yaml
status: PASS
skill: <skill-name>
payload_valid: true
checks_passed: [<field1>, <field2>, ...]
warnings: []
```

**BLOCKED:**

```yaml
status: BLOCKED
skill: <skill-name>
payload_valid: false
missing_required:
  - field: <name>
    schema: <type/format declarado>
    remediation: <ação acionável pra preencher>
invalid_fields:
  - field: <name>
    expected: <schema>
    received: <atual>
    remediation: <correção>
```

**DEGRADED:**

```yaml
status: DEGRADED
skill: <skill-name>
payload_valid: true
warnings:
  - "field <name> optional ausente — skill vai usar default"
  - "field <name> recommended ausente — output pode ser genérico"
proceed: true
```

### Passo 5 — Logar evento (opcional)

Se `logs/events.ndjson` existe no workspace, append evento:

```json
{
  "timestamp": "2026-05-20T14:23:00Z",
  "skill": "validar-handoff",
  "action": "complete",
  "status": "ok",
  "target_skill": "<skill-validada>",
  "result": "PASS|BLOCKED|DEGRADED",
  "duration_ms": <N>
}
```

## Exemplos de uso

### Exemplo 1 — Validar handoff pra `/lp-builder` (futura)

```
/validar-handoff lp-builder --payload "
  niche_slug: clinicas-derma-sp
  angle: DOR
  output_format: html-standalone
"
```

Output esperado se `niche_slug` e `angle` em `required` e ambos presentes:

```yaml
status: PASS
checks_passed: [niche_slug, angle, output_format]
```

### Exemplo 2 — BLOCKED por faltar required

```
/validar-handoff lp-builder --payload "
  output_format: html-standalone
"
```

Output:

```yaml
status: BLOCKED
missing_required:
  - field: niche_slug
    schema: "string slug kebab-case"
    remediation: "rodar /mapear-nicho primeiro pra produzir nicho mapped em contextos/<slug>/"
  - field: angle
    schema: "enum [DOR | OPORTUNIDADE | SISTEMA]"
    remediation: "escolher 1 dos 3 ângulos; default DOR se nicho tem dor quantificada"
```

### Exemplo 3 — Modo dry-run (debug)

```
/validar-handoff lp-builder --dry-run
```

Output:

```yaml
status: DRY_RUN
skill: lp-builder
handoff_in:
  required:
    niche_slug: "string slug kebab-case"
    angle: "enum [DOR | OPORTUNIDADE | SISTEMA]"
  optional:
    output_format: "html | markdown | html-standalone (default: html)"
```

## Regras não-negociáveis

1. **Validator é gate, não orquestrador.** Decide PASS/BLOCKED; não invoca skill alvo.
2. **Schema é fonte da verdade.** Se schema declarado diverge do corpo da skill, schema vence (skill deve seguir).
3. **Skills sem `handoff_in:` retornam DEGRADED**, não BLOCKED (compat skills legadas).
4. **Remediation acionável em BLOCKED.** "Falta X" não basta — diga "rode Y pra produzir X".
5. **Path checks no filesystem** quando field é tipo `path` (não confiar só em string).
6. **Sem side effects.** Validator não escreve arquivos, não invoca skills, não muda estado.
7. **Mensagens em PT-BR** consistente com KOD.AI.

## Casos especiais

### Skill alvo é Coordinator (tier 1)

Coordinator tem `handoff_in:` mínimo (`objective:` free-text). Validator passa fácil. OK.

### Skill alvo é Critic

Critic recebe path de output a validar. Schema típico:

```yaml
handoff_in:
  required:
    target_output_path: "path do output a auditar"
  optional:
    schema_reference: "path da spec esperada"
```

### Skill alvo declara `requires.blocking`

`requires.blocking:` é diferente de `handoff_in.required:`:

- `handoff_in.required` — campos do payload de invocação
- `requires.blocking` — pré-requisitos do workspace (arquivos que precisam existir)

Validator checa AMBOS quando aplicável. BLOCKED se qualquer um falha.

## Limitações honestas

- **Schema YAML estático:** não captura validações complexas tipo "X só válido se Y AND Z". Pra isso, validator chama helper Python/JS (futuro).
- **Não substitui revisão humana semântica:** schema garante estrutura, não verdade.
- **Skills antigas (pré-política) retornam DEGRADED** — não bloqueante, mas usuário não sabe se output vai sair OK.
- **Path checks dependem de filesystem real** — em pipeline dry-run, paths podem não existir ainda (use `--dry-run` flag pra pular).
- **Sem support pra schema dinâmico** (ex: campo depende de tipo de outro campo). Schema é estático.

## Critérios de PASS desta skill

1. Skill alvo é localizada (SKILL.md ou manifest.yaml encontrado)
2. `handoff_in:` é parseado corretamente do frontmatter
3. Required fields presentes no payload → PASS
4. Required ausente → BLOCKED com remediation acionável
5. Path field validado contra filesystem quando aplicável
6. Output estruturado YAML/JSON (não prosa livre)
7. Skills legadas sem `handoff_in:` → DEGRADED (não BLOCKED)
8. Sem side effects (não escreve, não invoca)

## Política irmã + skills relacionadas

- `politicas/handoff-contracts.md` — política universal que esta skill operacionaliza
- `politicas/squad-3-tier.md` — Director chama validar-handoff antes de invocar Employee
- `politicas/event-log-ndjson.md` — validator pode logar resultado em event log
- `1-ESQUELETO/regras-base.md` regra 10 (honestidade em claims) — schema garante claims rastreáveis
- Skills KOD.AI que invocam outras skills (futuras Directors) devem chamar validar-handoff em cada boundary

## Origem (proveniência)

Padrão observado em framework MIT brasileiro de vendas IA (absorvido 2026-05-20) — skill `validate-handoff` paralela. Pesquisa pública sobre multi-agent error amplification (handoffs não-estruturados amplificam ~17×) é referência geral da indústria. Re-implementação universalizada:
- Vocabulário ajustado pro KOD.AI (skill em vez de agent; modo dry-run específico)
- Output schema próprio (YAML/JSON estruturado pra parse downstream)
- Anti-pollution: paráfrase + estrutura própria + atribuição em metadata
