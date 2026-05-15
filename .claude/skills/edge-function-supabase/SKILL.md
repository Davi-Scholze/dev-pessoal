# SKILL: edge-function-supabase

## Quando invocar
Ao criar lógica de servidor que precisa rodar próximo ao usuário, processar webhooks ou executar em edge runtime.

## Entrada
Descrição da operação a executar na edge function.

## Saída esperada
Edge function Supabase funcional com auth, validação e logging.

## Template padrão
```typescript
// supabase/functions/minha-funcao/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://esm.sh/zod@3'

const RequestSchema = z.object({
  userId: z.string().uuid(),
  action: z.string(),
})

serve(async (req: Request) => {
  try {
    // Auth obrigatória
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    // Validação de input
    const body = await req.json()
    const parsed = RequestSchema.safeParse(body)
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400 })
    }

    // Lógica
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error('edge-function-error', err)
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 })
  }
})
```

## Deploy
```bash
supabase functions deploy minha-funcao --no-verify-jwt  # apenas para webhooks públicos
supabase functions deploy minha-funcao                   # com JWT obrigatório (padrão)
```
