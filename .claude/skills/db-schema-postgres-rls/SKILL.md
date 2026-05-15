# SKILL: db-schema-postgres-rls

## Quando invocar
Ao criar ou modificar tabelas no Postgres/Supabase. Garante RLS, indexes e constraints corretos.

## Entrada
Descrição das entidades e relacionamentos necessários.

## Saída esperada
SQL completo com tabelas, policies RLS e indexes.

## Template padrão
```sql
-- Habilitar extensão de UUID
create extension if not exists "uuid-ossp";

-- Tabela com padrões obrigatórios
create table public.resources (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null check (char_length(name) <= 100),
  description text,
  metadata    jsonb default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz  -- soft delete
);

-- Index obrigatório em FK e colunas de busca
create index idx_resources_user_id on public.resources(user_id);
create index idx_resources_created_at on public.resources(created_at desc);
create index idx_resources_active on public.resources(user_id) where deleted_at is null;

-- RLS obrigatório
alter table public.resources enable row level security;

create policy "users_own_resources" on public.resources
  for all using (auth.uid() = user_id);

-- Trigger para updated_at automático
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger resources_updated_at
  before update on public.resources
  for each row execute function update_updated_at();
```

## Restrições
- UUID em toda primary key (nunca serial/integer)
- RLS habilitado em toda tabela com dados de usuário
- Soft delete com `deleted_at` em dados críticos (nunca DELETE direto)
