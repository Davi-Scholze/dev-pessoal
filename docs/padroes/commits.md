# Padrão de Commits

> Conventional Commits em português para todos os projetos.
> Obrigatório para commits em `dev-pessoal` e em todos os repositórios filhos.

## Formato

```
tipo(escopo): descrição imperativa em português

[corpo opcional — WHY, não WHAT]

[rodapé: Breaking change ou referência de issue]
```

## Tipos

| Tipo | Quando usar |
|------|------------|
| `feat` | Nova funcionalidade para o usuário |
| `fix` | Correção de bug |
| `refactor` | Mudança de código sem alterar comportamento |
| `test` | Adiciona ou corrige testes |
| `docs` | Atualiza documentação |
| `chore` | Configurações, dependências, scripts |
| `style` | Formatação, espaço, ponto-e-vírgula (sem lógica) |
| `perf` | Melhoria de performance |
| `ci` | Mudanças em CI/CD |
| `revert` | Reverte commit anterior |

## Escopos Comuns

| Escopo | O que cobre |
|--------|------------|
| `auth` | Autenticação e autorização |
| `api` | Endpoints e rotas de API |
| `db` | Migrations, schema, queries |
| `ui` | Componentes e páginas |
| `hooks` | Hooks Claude Code em `.claude/hooks/` |
| `agents` | Agentes em `.claude/agents/` |
| `skills` | Skills em `.claude/skills/` |
| `config` | Configurações gerais |
| `deps` | Dependências (package.json, requirements.txt) |

## Exemplos

```
feat(auth): adiciona login com Google OAuth
fix(api): corrige validação de CNPJ no cadastro de clientes
refactor(db): extrai trigger updated_at para função compartilhada
test(auth): adiciona testes de integração para fluxo de login
docs(playbooks): adiciona guia de onboarding de cliente
chore(deps): atualiza Supabase para 2.39.0
feat(ui): implementa componente de seleção de plano mobile-first
```

## Regras

1. Imperativo, minúsculo: "adiciona" (não "Adicionado" ou "adicionando")
2. Sem ponto final na descrição
3. Máximo 72 caracteres na primeira linha
4. Corpo opcional separado por linha em branco
5. Breaking changes: `BREAKING CHANGE:` no rodapé
6. Referência de issue: `Closes #123` no rodapé
7. Co-autoria: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

## Breaking Changes

```
feat(api)!: renomeia endpoint /usuarios para /users

BREAKING CHANGE: clientes que usam /usuarios devem migrar para /users.
Período de migração: 30 dias (até 2026-06-15).
```
