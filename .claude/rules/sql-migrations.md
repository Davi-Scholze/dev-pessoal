---
tipo: rule
eixo: orchestration
escopo: "**/migrations/*.sql"
versão: 1.0
atualizado: 2026-05-20
fontes:
  - 1-ESQUELETO/politicas/aprovacao-schema-banco.md
  - 1-ESQUELETO/hooks/pre-commit-guard.js
related:
  - ../../1-ESQUELETO/politicas/aprovacao-schema-banco.md
  - ../../2-PACKS/packs/infra/supabase-config-maxima/SKILL.md
  - ../hooks/pre-commit-guard.js
---

# Regra: DDL exige aprovação humana

## Quando se aplica

Qualquer arquivo de migração SQL em path `**/migrations/*.sql` (ou variantes: `db/migrations/`, `supabase/migrations/`, `prisma/migrations/`).

Glob secundário em texto de bash invocado pelo agente: comandos contendo `ALTER TABLE`, `DROP TABLE`, `DROP SCHEMA`, `TRUNCATE`, `CREATE TABLE`, `DELETE FROM <tabela>` sem `WHERE`.

## O que fazer

1. **Antes** de criar/editar migração com DDL: anunciar ao usuário os 4 dados da política `explicar-acao-custosa`:
   - O QUE: qual tabela/coluna/índice será criado/alterado/removido
   - QUANTO: tempo estimado da migração (pequena: <1s; média: 1-30s; grande: >30s = pode causar downtime)
   - RISCO: blast radius (FKs afetadas, dados perdidos, queries que quebrarão)
   - REVERSÃO: rollback SQL exato pronto (down migration ou comando manual)
2. **Aguardar OK explícito em texto** do decisor antes de aplicar
3. Migrar em ambiente isolado primeiro (staging > dev > local) quando houver
4. Backup verificado antes (PITR ligado, dump recente, snapshot do bucket)

## O que NÃO fazer

- Aplicar DDL direto em produção sem aprovação textual
- Pular o anúncio de 4 dados "porque é uma alteração pequena"
- Confiar em "shouldn't have side effects" sem testar
- Modificar migração já aplicada em produção (criar nova migração de correção em vez)

## Antipadrões relacionados

- **#2 Hook + regra dupla** — esta regra textual + hook `pre-commit-guard.js` formam gate mecânico + orientação
- **#5 Prioridades contraditórias** — "seja rápido" não vence "não destrua dados"; ranking implícito é segurança > velocidade

## Garantia mecânica

Hook `pre-commit-guard.js` intercepta SQL DDL no Bash. Esta regra textual cobre o caso de criação/edição de **arquivo** de migração (que o hook não pega — ele só pega execução).

## Política irmã

- `politicas/aprovacao-schema-banco.md` — política universal completa
- `politicas/explicar-acao-custosa.md` — 4 dados antes de ação custosa
- `packs/infra/supabase-config-maxima` — checklist Supabase RLS + DDL
