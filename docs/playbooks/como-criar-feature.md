# Playbook — Como Criar uma Feature (Fluxo SDD)

> Seguir este fluxo para qualquer feature nova, sem exceção.
> Metodologia: Spec-Driven Development (SCHOLZE-STACK Seção 3)

## Fluxo Obrigatório

```
/spec  →  aprovação explícita  →  /break  →  /plan  →  /execute  →  /review
```

**Nunca pular etapas. Nunca avançar sem aprovação do Davi.**

---

## Etapa 1 — /spec (Especificação)

Criar arquivo em `contextos/fluxos/YYYY-MM-DD_nome-feature.md` com:

```markdown
## Feature: [Nome]
## Objetivo
[O que o usuário consegue fazer depois que isso existir]

## Critérios de Aceite
- [ ] CA1: ...
- [ ] CA2: ...
- [ ] CA3: ...

## Fora do Escopo
- [o que NÃO será feito nesta iteração]

## Impacto em sistemas existentes
- [o que pode quebrar ou ser afetado]
```

**Saída esperada:** arquivo de spec aprovado pelo Davi.

---

## Etapa 2 — /break (Quebrar em Tarefas)

Transformar spec em lista de tarefas atômicas:

```markdown
## Tarefas
- [ ] T1: Criar migration `YYYYMMDD_HHMMSS_nome.sql`
- [ ] T2: Criar endpoint `POST /api/recurso`
- [ ] T3: Criar componente `<NomeComponente />`
- [ ] T4: Criar testes unitários
- [ ] T5: Criar teste E2E
```

Cada tarefa deve caber em 1 commit. Se não couber, quebrar mais.

---

## Etapa 3 — /plan (Planejar Execução)

Para cada tarefa, definir:
- Arquivos que serão criados ou modificados
- Dependências entre tarefas (ordem de execução)
- Riscos e pontos de atenção

---

## Etapa 4 — /execute (Executar)

- Uma tarefa por vez
- Mostrar diff antes de confirmar
- Aguardar aprovação antes do próximo passo
- Não misturar comportamento e estrutura no mesmo commit

---

## Etapa 5 — /review (Revisar)

Checklist antes de qualquer commit:

```
[ ] Testes passando (unit + integration)
[ ] Sem credenciais hardcoded
[ ] Sem console.log em produção
[ ] RLS configurado (se nova tabela)
[ ] LGPD: campos PII declarados no RIPD
[ ] .env.example atualizado (se novas variáveis)
[ ] Mobile-first validado
[ ] CLAUDE.md local atualizado (se necessário)
```

---

## Convenção de Commits

```
feat(escopo): adiciona [nome da feature]
fix(escopo): corrige [descrição do bug]
refactor(escopo): reorganiza [o que foi reorganizado]
test(escopo): adiciona testes para [componente/função]
chore(escopo): [ajuste de config/dependência]
```
