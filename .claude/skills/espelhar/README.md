# Skill: `/espelhar`

> Skill universal pra refletir mudanças reais da sessão nos arquivos vivos do projeto.
> Status: **DRAFT** (criada 2026-05-21 sessão 4).

## Quick start

```
/espelhar                          # workflow completo (handoff + pendencias + memorias)
/espelhar --quick                  # só handoff
/espelhar --silencioso             # registra pendência sem interromper
/espelhar --dry-run                # mostra diff sem aplicar (operador confirma)
/espelhar --escopo <area>          # só espelha área específica
```

## O que faz

5 fases automáticas:
1. **Detectar mudanças efetivas** — git log + arquivos novos desde último espelhamento
2. **Categorizar** — skill criada, contexto atualizado, pack novo, conceito de competitive-intel, pendência resolvida/nova, mudança de foco, etc
3. **Gerar updates estruturados** — destinos canônicos pra cada categoria
4. **Apresentar diff + commit** — modo `--dry-run` mostra antes; modo padrão aplica se trivial
5. **Marker + reporte** — `.kodai-espelhar-last-run.yaml` atualizado + reporte ≤10 linhas

## Arquivos atualizados (destinos canônicos)

- `_negocio/PROMPT_MASTER_HANDOFF.md` — nova seção da sessão
- `_negocio/PENDENCIAS.md` — marca resolvidas, adiciona novas
- `_negocio/MAPA.md` — se estrutura mudou
- `_memoria/estrategia.md` — se foco mudou
- Memórias persistentes em `~/.claude/projects/<slug>/memory/`

## Por que existe

Estabelecida na análise honesta KOD.AI vs fluxo desejado (2026-05-21 sessão 4). Operador descreveu fluxo: "em tempo real a IA possa ir espelhando tudo isso em contexto, de forma que a gente não perca contextos, saiba que 'esse descartamos', 'esse melhoramos', 'esse está funcionando'".

Sem skill estruturada, atualização depende de IA lembrar — frequentemente esquecido OU feito tardio (contexto já difuso).

## Anti-pollution

- Git como fonte de verdade — **NUNCA inventa progresso**
- Categorização é heurística — operador deve revisar em casos complexos
- Não atualiza upstream KODAI (escopo é projeto consumidor)

## Quando NÃO usar

- Sessão sem commits significativos
- Já rodou `/espelhar` há <30 turnos (idempotência)
- Operador pediu `/atualizar` (skill maior, escopo projeto inteiro)

## Detalhes

Ver `SKILL.md` (workflow 5 fases + matriz categoria→destino + 3 casos de uso + modos especiais + limitações honestas).
