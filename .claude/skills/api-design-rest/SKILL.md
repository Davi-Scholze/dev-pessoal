# SKILL: api-design-rest

## Quando invocar
Ao criar endpoints de API REST. Garante contratos consistentes e documentados.

## Entrada
Descrição do recurso e operações necessárias.

## Saída esperada
Definição completa dos endpoints com schema Zod de request/response.

## Convenções obrigatórias
```
GET    /api/resources          # lista (com paginação cursor)
GET    /api/resources/:id      # detalhe
POST   /api/resources          # criar
PATCH  /api/resources/:id      # atualizar parcialmente
DELETE /api/resources/:id      # deletar (soft delete se aplicável)
```

## Template de endpoint Next.js
```typescript
// src/app/api/resources/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const CreateResourceSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = CreateResourceSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  // ... lógica de negócio
}
```

## Padrões de resposta
- Sucesso: `{ data: T }`
- Erro: `{ error: { code: string, message: string, details?: any } }`
- Lista: `{ data: T[], meta: { total: number, cursor?: string } }`
- Paginação: cursor-based (não offset) para listas grandes
