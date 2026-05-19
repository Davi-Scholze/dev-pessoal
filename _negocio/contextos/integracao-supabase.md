# Contexto — Integrações Supabase
> Referência rápida para todos os projetos com Supabase.
> Última revisão: 2026-05-15

## Stack Padrão

```
Supabase (PostgreSQL + Auth + Storage + Edge Functions)
  + Drizzle ORM ou Prisma (type-safe queries)
  + Zod (schema compartilhado frontend/backend)
  + RLS em TODAS as tabelas (sem exceção)
```

## Schema Base (toda tabela deve ter)

```sql
CREATE TABLE public.exemplo (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger updated_at automático
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.exemplo
  FOR EACH ROW EXECUTE FUNCTION moddatetime(updated_at);

-- RLS obrigatório
ALTER TABLE public.exemplo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_data" ON public.exemplo
  FOR ALL USING (auth.uid() = user_id);
```

## RLS — Padrões Comuns

```sql
-- Leitura pública
CREATE POLICY "public_read" ON public.exemplo
  FOR SELECT USING (true);

-- Dono pode tudo
CREATE POLICY "owner_all" ON public.exemplo
  FOR ALL USING (auth.uid() = user_id);

-- Admin pode tudo (via custom claim)
CREATE POLICY "admin_all" ON public.exemplo
  FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
```

## Edge Functions (Deno)

```typescript
// supabase/functions/exemplo/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return new Response('Unauthorized', { status: 401 })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return new Response('Unauthorized', { status: 401 })

  // lógica da função aqui

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

## Variáveis de Ambiente (.env.example)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # NUNCA expor no frontend
SUPABASE_JWT_SECRET=               # para verificação de JWT customizado
```

## Estrutura de Pastas

```
supabase/
├── migrations/
│   └── YYYYMMDD_HHMMSS_descricao.sql   ← sempre com rollback comentado
├── functions/
│   └── nome-funcao/
│       └── index.ts
└── seed.sql
src/lib/
└── supabase.ts    ← cliente singleton
```

## Regras Inegociáveis

1. RLS em TODAS as tabelas — sem exceção
2. `SUPABASE_SERVICE_ROLE_KEY` nunca no frontend
3. Migrations com rollback comentado no final do arquivo
4. UUID como PK em toda tabela (nunca serial/integer)
5. `updated_at` automático via trigger em toda tabela
6. Zod para validar input antes de insert/update
7. Auth obrigatório em toda Edge Function (verificar JWT)
8. Testar RLS em modo anon + modo autenticado antes de deploy

## Autenticação — Fluxo Padrão (Next.js)

```typescript
// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

## LGPD + Supabase

- Campos PII (CPF, RG, email pessoal): declarar no RIPD
- Deletar dados via `CASCADE` quando usuário solicitar exclusão
- Log de consentimento: tabela `consent_log` com `purpose`, `granted_at`, `ip`
- Não logar queries com dados sensíveis no Supabase Dashboard
