# Layout override — Projetos Dev Pessoais

> Override do layout canônico `pasta-mae` definido em
> `KODAI/1-ESQUELETO/templates/layouts/pasta-mae.md`.
> Lido pela skill `/organizar` antes de propor reorganização.
> Estabelecido: 2026-05-21 (via primeira execução de `/organizar`).

## Overrides ativos

### `docs/` mantém na raiz (não migra pra `_dev/docs/`)

**Razão:** convenção forte do GitHub renderiza `docs/` na raiz como navegação primária do repo. Mover pra `_dev/docs/` quebra essa expectativa pra qualquer pessoa que olhe esta pasta-mãe no GitHub.

**Decisão:** Davi Scholze, 2026-05-21.

**Implicação pra `/organizar`:** quando rodar nesta pasta-mãe, não propor mover `docs/`. Validação `match score` pós-aplicação considera `docs/` raiz como CORRETO (não-drift).

---

## Outros overrides considerados (mas não adotados)

Nenhum por enquanto.

## Como adicionar novo override

1. Adicionar seção `### <pasta-ou-arquivo>` nova
2. Documentar razão e data
3. `/organizar` lê automaticamente este arquivo na Fase 2 (diagnóstico)

## Reverter um override

Remover a seção correspondente. Próxima execução de `/organizar` propõe a reorganização canônica.
