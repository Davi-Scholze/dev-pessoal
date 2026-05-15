# SKILL: lgpd-dsr-endpoint

## Quando invocar
Ao implementar o endpoint de Data Subject Request (DSR) obrigatório pela LGPD.

## Entrada
Stack do projeto (Next.js / Supabase Edge Function).

## Saída esperada
Endpoint `/api/lgpd/dsr` funcional com suporte a exportação e exclusão.

## Implementação Next.js + Supabase
```typescript
// src/app/api/lgpd/dsr/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

const DSRSchema = z.object({
  type: z.enum(['export', 'delete', 'rectify', 'portability']),
  details: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = DSRSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  // Log da solicitação (sem dados PII nos logs)
  console.log('dsr.request', { type: parsed.data.type, userId: user.id })

  if (parsed.data.type === 'export') {
    // Colete todos os dados do usuário em todas as tabelas
    const userData = await collectUserData(supabase, user.id)
    return NextResponse.json({ data: userData })
  }

  if (parsed.data.type === 'delete') {
    // Soft delete de todos os dados + schedule de purge em 30 dias
    await scheduleDataDeletion(user.id)
    return NextResponse.json({ message: 'Exclusão agendada para 30 dias' })
  }

  return NextResponse.json({ message: 'Solicitação recebida. Prazo: 15 dias úteis.' })
}
```

## Requisitos legais
- Prazo de resposta: 15 dias úteis (art. 18, LGPD)
- Log de todas as solicitações por 5 anos
- Comprovante de atendimento enviado por email
- Para exclusão: período de graça de 30 dias antes do purge definitivo
