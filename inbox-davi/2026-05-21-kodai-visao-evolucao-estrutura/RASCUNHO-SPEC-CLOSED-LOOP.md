---
tipo: rascunho-spec
data: 2026-05-21
operador: claude-opus-4-7
status: rascunho-pra-brainstorming
fontes:
  - ./Evolução Viva de Contexto — Arquitetura de Aprendizado do KOD.AI.md
  - ./ANALISE-ARQUITETURAL.md (item 12 + 16-18)
  - KODAI/1-ESQUELETO/politicas/reflexion-per-skill.md
  - KODAI/1-ESQUELETO/politicas/event-log-ndjson.md
  - KODAI/1-ESQUELETO/politicas/memoria-3-tier.md
disclaimer: |
  Rascunho inicial pra acelerar /brainstorming. Spec 3 da sequencia.
  Depende de Spec 1 (lineage) e Spec 2 (candidate-to-core) estarem aprovadas.
---

# Rascunho: Spec `closed-loop-evolution` (Spec 3 da sequência)

> **Motivação do Davi (Doc 2):** "A longo prazo, o KOD.AI deve funcionar como um sistema de evolução contínua: pesquisa → implementação → uso real → validação → refinamento → curadoria → atualização do core → nova distribuição"

## Estado atual vs gap

**5 dos 8 elos do loop JÁ existem no KOD.AI:**

| Elo | Status | Implementação atual |
|---|---|---|
| 1. Pesquisa | ✓ | `/sugerir-pesquisa` + NotebookLM |
| 2. Implementação | ✓ | SDD (`/spec → /break → /plan → /execute`) |
| 3. Uso real em projeto | ✓ | `/instalar` em projeto consumidor |
| 4. Validação | ✓ | Evidence Bloc (regra-base 11) + `reflections.md` por skill |
| 5. Refinamento | ⚠️ existe parcial | `reflections.md` captura mas não dispara mudança automática |
| 6. Curadoria | ⚠️ depende Spec 2 | sem candidate-to-core formal, vai direto pra main |
| 7. Atualização do core | ✓ | `/upstream-update` Modelo A |
| 8. Nova distribuição | ✓ | `/atualizar-kodai` pull em consumidores |

**3 elos faltam ou incompletos:** trigger explícito de refinamento (5) + gate candidate-to-core (6 — Spec 2) + métrica de "esse contexto pediu refinamento N vezes — tech debt" (cross-cutting).

## Proposta do Spec 3

### Componente 1: Skill `/refinar-contexto <slug>`

Workflow:

```
1. Lê reflections.md do contexto/pack/skill alvo
2. Lê lineage.validado_por (Spec 1) — quantas vezes foi usado, quais resultados
3. Identifica padrões:
   - 3+ reflexões com mesma issue → refinamento sugerido
   - taxa_sucesso < 0.5 com ≥3 amostras → candidate-to-park
   - "needs_clarification" repetido → docs do artefato estão ambíguas
4. Gera proposta de refinamento em candidate-to-core/2026-MM-DD-refinamento-<slug>/
   - proposal.md (diff proposto)
   - evidence.md (reflexões + lineage que motivaram)
5. Submete via /upstream-update --candidate
```

### Componente 2: Métrica de tech debt por artefato

```yaml
# Novo campo no manifest YAML (extensão da Spec 1 lineage)
tech_debt:
  reflexoes_pendentes: 3                    # auto-contagem
  ultima_revisao: 2026-04-15
  status: green | yellow | red
  # ^ green = saudavel (sem reflexoes acumuladas)
  # ^ yellow = 3-5 reflexoes pendentes (sugerir refinamento)
  # ^ red = 6+ reflexoes OU taxa_sucesso < 0.5 (refinamento OU park urgente)
  proxima_revisao_em: 30d
```

Auto-calculado por skill `/calcular-tech-debt` (cron mensal ou disparado manualmente).

### Componente 3: Skill `/loop-status`

Reporta estado do closed-loop:

```
Closed Loop Status — KODAI (2026-05-22)
========================================
Pesquisa:      12 frentes abertas + 79 NotebookLMs catalogados
Implementação: 6 specs aprovadas + 3 em rascunho
Uso real:      1 dogfooding (Davi) + 0 consumidores externos
Validação:     8 Evidence Blocs registrados (mai/26)
Refinamento:   3 sugestões pending em candidates/
Curadoria:     2 candidates aguardando review
Distribuição:  5 consumidores rodaram /atualizar-kodai (último: ontem)

Métricas:
- Tech debt yellow: 4 artefatos
- Tech debt red:    0 artefatos
- Velocidade do loop: 14 dias média (research -> core)
- Taxa de promoção candidate: 80% (4 de 5 últimos)
```

## Arquivos novos propostos

```
KODAI/
├── 1-ESQUELETO/
│   └── skills-universais/
│       ├── refinar-contexto/
│       │   ├── SKILL.md
│       │   ├── manifest.yaml
│       │   └── scripts/refinar.py
│       ├── calcular-tech-debt/
│       │   ├── SKILL.md
│       │   ├── manifest.yaml
│       │   └── scripts/calcular.py
│       └── loop-status/
│           ├── SKILL.md
│           ├── manifest.yaml
│           └── scripts/status.py
├── docs/
│   └── CLOSED-LOOP.md  # documenta os 8 elos + métricas + comandos
```

## Riscos identificados

| Risco | Mitigação |
|---|---|
| Refinamento automático = drift sem controle | `/refinar-contexto` PROPÕE candidate, não aplica direto. Sempre passa por curadoria (Spec 2) |
| Tech debt vira métrica de vaidade | Status `red` força ação: refinamento OU PARK. Não fica indefinido. |
| `reflections.md` vira spam | Política `reflexion-per-skill` já trata: só capturar reflexão se há lição genuína (não comentário trivial). |
| `/loop-status` puxa muito do filesystem | Cache em `KODAI/.cache/loop-status.json` com TTL 1h. Recalcula quando solicitado com `--fresh`. |
| Métricas dependem de Spec 1 (lineage) e Spec 2 (candidates) | Implementar Spec 3 SOMENTE após Specs 1+2 aprovadas e em uso. Não inverter ordem. |

## Critério de aceitação

Spec vira FUNCIONAL quando:

- [ ] 3 skills implementadas (`/refinar-contexto`, `/calcular-tech-debt`, `/loop-status`)
- [ ] `CLOSED-LOOP.md` documenta os 8 elos + comandos
- [ ] `tech_debt:` campo populado em ≥5 artefatos piloto
- [ ] 1 ciclo end-to-end real:
  - `reflections.md` acumula 3 entradas em algum pack
  - `/refinar-contexto` propõe candidate
  - Davi promove ou rejeita
  - `lineage.contextos_filhos` atualiza
  - `/loop-status` reflete corretamente

## Decisões pendentes (precisam Davi)

1. **Threshold de refinamento:** 3 reflexões? 5? Configurável por artefato?
2. **Tech debt status:** verde/amarelo/vermelho é OK? Ou números brutos (0-10)?
3. **Cron mensal vs sob demanda:** rodar `/calcular-tech-debt` automaticamente ou só manual?
4. **Velocidade do loop:** definir SLA (ex: research → core em ≤30 dias)? Ou observatório passivo?
5. **`/loop-status` mostra info pra Davi-only ou pra consumidores externos também?**

## Próximos passos

1. **`/brainstorming` com Davi** — destila 5 decisões (após Specs 1+2 aprovadas e em uso)
2. **Spec aprovada** em `KODAI/docs/decisoes/2026-MM-DD_closed-loop-evolution.md`
3. **`/break`** em tasks
4. **`/execute`** com piloto end-to-end

## Cruzamento com outras specs

- **Spec 1 (lineage):** consome `lineage.validado_por` + `taxa_sucesso` pra calcular tech debt
- **Spec 2 (candidate-to-core):** `/refinar-contexto` gera candidates, segue gate de curadoria
- **Política `reflexion-per-skill`:** fonte de dados primária (reflections.md por skill)
- **Política `event-log-ndjson`:** `/loop-status` agrega eventos do NDJSON pra métricas

## Quando vale ativar

**Espera-se ativar Spec 3 SOMENTE quando:**
- Specs 1 e 2 estão FUNCIONAL (em uso real)
- KOD.AI tem ≥3 consumidores rodando (precisa amostra mínima pra tech debt fazer sentido)
- OU dogfooding gerou ≥20 reflexões acumuladas

**Antes disso:** componentes manuais bastam (reflections.md + revisão Davi pontual).

---

## Disclaimer (regra-base 11)

Rascunho pra debate. Davi tem palavra final em:
- Thresholds (refinamento, tech debt)
- Frequência de cálculo
- SLA do loop
- Visibilidade pra terceiros

Zero código rodando, zero validação empírica. Esta é a spec mais ambiciosa das 3 — exige Specs 1+2 maduras antes.
