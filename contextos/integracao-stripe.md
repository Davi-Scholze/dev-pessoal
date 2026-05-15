# Contexto — Integrações Stripe Brasil
> Referência rápida para todos os projetos com pagamentos.
> Última revisão: 2026-05-15

## Modelo de Integração Recomendado

```
Frontend → Stripe.js (tokenização, nunca dados de cartão brutos)
        ↓
Backend (Next.js API Route ou Edge Function)
        → Stripe SDK (criar PaymentIntent / Subscription)
        ↓
Stripe Webhook → validar assinatura → processar evento
```

## Dependências

```bash
# Backend
npm install stripe

# Frontend
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## Variáveis de Ambiente (.env.example)

```env
STRIPE_SECRET_KEY=sk_live_...         # NUNCA no frontend
STRIPE_PUBLISHABLE_KEY=pk_live_...    # seguro para frontend
STRIPE_WEBHOOK_SECRET=whsec_...       # validação de webhooks
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Validação de Webhook (obrigatória)

```typescript
// src/app/api/stripe/webhook/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      // processar pagamento confirmado
      break
    case 'customer.subscription.deleted':
      // cancelar acesso
      break
    default:
      // evento não tratado — ignorar silenciosamente
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
```

## PaymentIntent (Pagamento Único)

```typescript
// src/app/api/stripe/payment-intent/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { amount, currency = 'brl' } = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount,        // em centavos: R$49,90 → 4990
    currency,
    automatic_payment_methods: { enabled: true }
  })

  return Response.json({ clientSecret: paymentIntent.client_secret })
}
```

## Subscriptions (Recorrência)

```typescript
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent']
})
```

## Estrutura de Pastas

```
src/
├── app/api/stripe/
│   ├── webhook/route.ts       ← valida assinatura, processa eventos
│   ├── payment-intent/route.ts
│   └── create-subscription/route.ts
└── services/stripe/
    ├── client.ts              ← instância singleton do Stripe SDK
    └── helpers.ts             ← formatBRL, centsToReal, etc.
```

## 10 Regras Inegociáveis

1. Nunca logar ou salvar CVV, número completo do cartão
2. Sempre validar assinatura do webhook antes de processar
3. `STRIPE_SECRET_KEY` apenas no backend (nunca no cliente)
4. Amounts sempre em centavos (R$49,90 = 4990)
5. Idempotency key em toda criação de PaymentIntent
6. Tratamento explícito de `payment_intent.payment_failed`
7. Teste com cartões de teste antes de ir para produção
8. Nunca confiar no status do frontend — confirmar via webhook
9. LGPD: não armazenar dados de cartão localmente (Stripe vault)
10. Reembolsos via API (`stripe.refunds.create`) — nunca manual

## Cartões de Teste (Stripe Test Mode)

| Cenário | Número |
|---------|--------|
| Aprovado | 4242 4242 4242 4242 |
| Recusado | 4000 0000 0000 0002 |
| 3D Secure | 4000 0025 0000 3155 |
| Saldo insuficiente | 4000 0000 0000 9995 |

Data: qualquer data futura. CVV: qualquer 3 dígitos.

## LGPD + Stripe

- Não armazenar dados de pagamento localmente — usar Stripe como vault
- `customer.id` (Stripe) é o único dado que fica no banco próprio
- Em caso de exclusão de conta: `stripe.customers.del(customerId)`
- Log de transações: guardar apenas `payment_intent_id`, `amount`, `status` (sem PAN)
