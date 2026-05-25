---
name: spec
description: >
  Skill 1/6 do pipeline canônico KOD.AI (/spec → /break → /plan → /execute →
  /review → /complete). Cria especificação formal de feature/mudança antes
  de qualquer código. Output: arquivo em docs/decisoes/<YYYY-MM-DD>_<topico>.md
  com problema, hipóteses, escopo, contratos (handoff_in/out), quality gates,
  riscos, decisões tomadas + alternativas descartadas. Pré-condição pra /break
  + commits. Use quando disser "vamos especificar X", "/spec <topico>",
  "preciso de spec antes de codar", "abrir feature nova".
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - AskUserQuestion
---

# Skill: `/spec` — Especificação Formal (passo 1/6 do pipeline)

> **Sem spec aprovada, sem código.** Regra-base 3 inviolável.

## Princípio

Toda mudança não-trivial começa com **spec escrita** que captura:

- **Problema** que motiva a mudança
- **Hipóteses** sendo testadas
- **Escopo** explícito (o quê entra E o quê NÃO entra)
- **Contratos** (handoff_in / handoff_out / quality_gates)
- **Riscos + mitigações**
- **Alternativas consideradas + por quê foram descartadas**
- **Critérios de aceitação** mensuráveis

Spec é **artefato persistente** em `docs/decisoes/<YYYY-MM-DD>_<topico>.md`. Sobrevive a sessões.

## Quando disparar

- "/spec <tema>"
- "vamos especificar X"
- "preciso de spec antes de codar"
- "abrir feature nova"
- "spec pra <componente>"
- Antes de `/break` (regra inviolável)

**NÃO usar** pra:
- Fix de 1 linha sem implicação arquitetural (commit direto + msg clara)
- Refactor cosmético (rename variável, formatação)
- Documentação que não muda comportamento

## Workflow 5 passos

### 1. Briefing (1 pergunta única se faltar contexto)

```
Antes de escrever spec, confirmo 3 pontos:
1. Problema central — 1 frase. O que queremos resolver?
2. Cliente/projeto alvo (se aplicável): default = ambiente atual
3. Tamanho estimado: small (1 sessão) / medium (2-3 sessões) / large (>1 semana)?
```

Se Davi já trouxe contexto completo na mensagem, pular pra passo 2.

### 2. Pesquisa de contexto adjacente

Carregar antes de escrever:

- `docs/decisoes/` — buscar specs relacionadas (mesmo tema, mesma área)
- `STRATEGIC-NORTH.md` v1.4 — alinhar com tese composta + 3 níveis
- Contextos-domínio relacionados (se feature toca vertical específico)
- Memórias relevantes em `~/.claude/memory/`

### 3. Escrita da spec (formato canônico)

Template:

```markdown
---
tipo: spec
data: YYYY-MM-DD
status: aberto | em-andamento | implementado | descartado
escopo: <projeto/cliente/global>
nivel_operacional: L1 | L2 | L3 | meta
related:
  - <docs relacionadas>
lineage:
  origin: <upstream | downstream-absorption>
  derived_from: <contexto>
---

# Spec — <Título Curto>

## Problema

[1-2 parágrafos. O quê dói hoje? Quem dói? Qual é a evidência (não chute)?]

## Hipótese central

[1 frase verificável. Ex: "Se adicionarmos X, então Y vai melhorar Z em N%."]

## Escopo

### Dentro
- ...

### Fora
- ...

## Contratos (handoff)

### Input (handoff_in)
- ...

### Output (handoff_out)
- ...

### Quality Gates
- ...

## Riscos + mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|

## Alternativas consideradas

| Alternativa | Por quê descartei |
|---|---|

## Critérios de aceitação

- [ ] ...
- [ ] ...

## Próximo passo

→ `/break` decomporá esta spec em tasks atômicas.
```

### 4. Validação da spec (auto-check)

Antes de salvar, checklist:

- [ ] Problema tem evidência concreta (não é "acho que")
- [ ] Hipótese é falsificável (consigo provar errado)
- [ ] Escopo "fora" é explícito (nem só "dentro")
- [ ] Contratos têm handoff_in/out + quality_gates declarados
- [ ] Mín 2 alternativas consideradas (mesmo que descartadas)
- [ ] Critérios de aceitação são mensuráveis
- [ ] `nivel_operacional` alinhado com [`regra-ouro-l1-antes-de-l3`](../../politicas/regra-ouro-l1-antes-de-l3.md)

### 5. Persistência + commit

```bash
# Salvar
docs/decisoes/$(date +%Y-%m-%d)_<topico>.md

# Commit (regra-base 7 — commit a cada passo)
git add docs/decisoes/<arquivo>
git commit -m "spec(<escopo>): <titulo curto>"
git push  # default Davi (commit + push imediato)
```

## Quality Gates

```yaml
quality_gates:
  - "Spec persistida em docs/decisoes/<data>_<topico>.md"
  - "Frontmatter YAML completo (tipo, data, status, escopo, lineage)"
  - "Problema com evidência concreta"
  - "Hipótese falsificável"
  - "Escopo explícito (dentro + FORA)"
  - "Mín 2 alternativas consideradas"
  - "Critérios de aceitação mensuráveis"
  - "Commit + push imediato (extensão local Davi)"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| "Vou codar e depois escrevo a spec" | Spec retroativa não captura tradeoffs reais | Spec **antes** de qualquer código |
| Spec vaga ("melhorar o sistema") | Não dá pra `/break` | Problema concreto + hipótese falsificável |
| Sem "fora do escopo" | Escopo explode no /execute | Listar explicitamente o que NÃO entra |
| Spec sem alternativas | Esconde tradeoffs | Mín 2 alternativas + razão de descarte |
| Critérios subjetivos ("ficar bom") | Não dá pra validar | Mensuráveis ("≥80% cobertura testes", "Lighthouse mobile ≥90") |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "spec persistida + aprovada (status = em-andamento)"
    skill: break
    razao: "Decompor spec em tasks atômicas"
  - condicao: "spec toca múltiplos níveis L1/L2/L3"
    skill: niveis-operacionais-l1-l2-l3
    razao: "Verificar regra de ouro antes de planejar L3"

requires_skills_anteriores:
  - condicao: "tema vago / cliente quer brainstorm primeiro"
    skill: brainstorming
    razao: "Explorar opções abertamente antes de comprometer com spec"
  - condicao: "feature toca infra externa (DNS, conta SaaS, deploy)"
    skill: verificar-infra-real
    razao: "Política irmã — não fantasiar infra"
```

## Limitações honestas

- Spec não substitui POC quando hipótese exige experimentação real (combinar: `/brainstorming` + POC + `/spec` consolida)
- Specs grandes (>5 sub-features) vira mini-projeto — `/break` decompõe em sub-specs
- Versionamento: spec status muda (aberto → em-andamento → implementado), conteúdo permanece imutável (criar nova spec se mudar de rumo)

## Origem

Skill canônica do pipeline KOD.AI (`/spec → /break → /plan → /execute → /review → /complete`) divulgado em CLAUDE.md + regras-sessao.md. Criada 2026-05-22 pós-audit (item 2 YELLOW) — fecha gap entre promessa nos docs e implementação real.
