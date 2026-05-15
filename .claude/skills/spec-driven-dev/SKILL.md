# SKILL: spec-driven-dev

## Quando invocar
Antes de implementar qualquer feature não-trivial. O agente planner deve rodar esta skill antes de escrever uma linha de código.

## Entrada
Descrição do problema ou feature em linguagem natural.

## Saída esperada
Arquivo `docs/specs/<feature-slug>.md` com:
- Problema: o que está errado ou o que falta
- Soluções consideradas: ≥2 opções com prós/contras
- Decisão: qual solução foi escolhida e por quê
- Contratos: tipos TypeScript, schema Zod, endpoints de API
- Critérios de aceitação: lista testável de comportamentos esperados
- Fora do escopo: o que NÃO faz parte desta spec

## Fluxo
`/spec` → aprovação humana → `/break` → `/plan` → `/execute` → `/review`

## Regra de ouro
Spec é contrato. O que não está na spec não é implementado.
