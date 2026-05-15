# Padrão de Estrutura de Projeto

> Convenção de pastas por tipo de projeto no SCHOLZE-STACK.
> Aplicar ao criar novos repositórios filhos ou reorganizar existentes.

## Next.js (Web — SaaS / Sistema)

```
[nome-projeto]/
├── .claude/
│   └── CLAUDE.md          ← Camada 3 do SCHOLZE-STACK
├── src/
│   ├── app/               ← App Router (Next.js 15)
│   │   ├── (auth)/        ← grupo de rotas autenticadas
│   │   ├── api/           ← Route Handlers
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/            ← Shadcn/UI (gerado, não editar)
│   │   └── [feature]/     ← componentes por feature
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── utils.ts
│   ├── services/
│   │   ├── google/        ← integrações Google
│   │   ├── stripe/        ← pagamentos
│   │   └── [servico]/
│   └── types/
│       └── index.ts       ← tipos compartilhados + Zod schemas
├── supabase/
│   ├── migrations/
│   └── functions/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── dados/                  ← brand-config.json, entrevista.md (clientes)
├── credentials/            ← NUNCA commitar (.gitignore)
├── .env
├── .env.example
└── CLAUDE.md              ← Camada 3 (alternativa a .claude/CLAUDE.md)
```

## React Native / Expo (Mobile)

```
[nome-projeto]/
├── .claude/
│   └── CLAUDE.md
├── app/                    ← Expo Router (file-based)
│   ├── (tabs)/
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── ui/
│   └── [feature]/
├── hooks/
├── lib/
│   └── supabase.ts
├── assets/
│   ├── images/
│   └── fonts/
├── tests/
└── .env.example
```

## Python (ETL / Automação)

```
[nome-projeto]/
├── .claude/
│   └── CLAUDE.md
├── src/
│   ├── extract/
│   ├── transform/
│   ├── load/
│   └── utils/
├── tests/
├── scripts/
│   └── setup.sh
├── credentials/            ← NUNCA commitar
├── requirements.txt
├── .env
└── .env.example
```

## Convenções Gerais (todos os tipos)

| Item | Regra |
|------|-------|
| Nomenclatura de pastas | `kebab-case` |
| Nomenclatura de arquivos TS/TSX | `PascalCase` para componentes, `camelCase` para utils |
| Nomenclatura de arquivos Python | `snake_case` |
| Migrations SQL | `YYYYMMDD_HHMMSS_descricao.sql` |
| Variáveis de ambiente | `SCREAMING_SNAKE_CASE` |
| IDs em banco | UUID (nunca serial/integer) |
| Timestamps | `TIMESTAMPTZ NOT NULL DEFAULT now()` |
| Secrets | Sempre em `credentials/` ou `.env`, nunca no código |
| Tamanho máximo de arquivo | 400 linhas — acima disso, sinalizar para refatoração |

## Arquivos Obrigatórios em Todo Repositório

```
[ ] .env.example       ← todas as variáveis, sem valores reais
[ ] .gitignore         ← inclui .env, credentials/, *.key, *.pem
[ ] CLAUDE.md          ← Camada 3, ≤100 linhas
[ ] README.md          ← setup mínimo para rodar o projeto
```
