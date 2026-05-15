# SKILL: git-flow-strict

## Quando invocar
Ao criar branches, fazer commits ou abrir PRs. Garante padrão consistente de versionamento.

## Entrada
Tipo de mudança + descrição curta.

## Saída esperada
Branch criada + commits no padrão + PR aberto se solicitado.

## Padrão de branches
```
feat/<slug>      # nova feature
fix/<slug>       # correção de bug
refactor/<slug>  # refactor sem mudança de comportamento
chore/<slug>     # configuração, deps, docs
hotfix/<slug>    # correção urgente em produção
```

## Padrão de commits (Conventional Commits PT-BR)
```
feat(escopo): adiciona [o que]
fix(escopo): corrige [o que]
refactor(escopo): reorganiza [o que]
docs(escopo): atualiza [o que]
chore(escopo): [ajuste]
```

## PRs
- Título: mesmo formato do commit principal
- Descrição: ## Resumo + ## Critérios de aceitação + ## Como testar
- Labels: feature / bug / refactor / docs / breaking-change

## Restrições
- Nunca commite direto em main ou master
- Nunca force push em branch compartilhada
- Sempre squash merge ao fechar PR (histórico limpo)
