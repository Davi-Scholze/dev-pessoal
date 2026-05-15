# SKILL: conventional-commits

## Quando invocar
Ao gerar mensagem de commit automaticamente a partir de um diff.

## Entrada
`git diff --staged` ou descrição das mudanças.

## Saída esperada
Mensagem de commit pronta para usar, no formato:
```
tipo(escopo): descrição imperativa em português

[corpo opcional explicando o porquê, não o quê]

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Tipos válidos
- `feat` — nova funcionalidade visível ao usuário
- `fix` — correção de bug
- `refactor` — mudança de código sem mudança de comportamento
- `docs` — documentação apenas
- `style` — formatação, sem lógica
- `test` — adição ou correção de testes
- `chore` — configuração, deps, scripts de build
- `perf` — melhoria de performance

## Regras
- Escopo: nome do módulo, feature ou arquivo principal (ex: `auth`, `dashboard`, `api`)
- Descrição: imperativo, sem maiúscula inicial, sem ponto final, máximo 72 caracteres
- Corpo: quando o porquê não é óbvio (bug não-óbvio, trade-off importante)
- BREAKING CHANGE: use `!` após o tipo: `feat!(auth): muda formato do token`
