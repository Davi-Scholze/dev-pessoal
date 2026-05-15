# Contexto Bruto — Arquitetura e Implementação de Pagamentos
> Recebido em: 2026-05-13
> Status: BRUTO — não processar sem aprovação explícita
> Origem: onboarding de conhecimento enviado pelo Davi na sessão de 2026-05-13
> Aplicável a: decon-sistema (billing clientes), dojo-familia-scholze (mensalidades alunos/SaaS)
> ⚠️ INCOMPLETO — faltam as seções: "Coleta de Evidências", padrões de webhook idempotente, split payment, marketplaces
> Status: aceito como está — não será complementado. Use a skill `/payments-br` para suprir o que falta.

---

# REPOSITÓRIOS INTERNACIONAIS (padrão-ouro)

- github.com/stripe-samples → família "checkout-*", "subscription-use-cases", "accept-a-payment"
- github.com/vercel/nextjs-subscription-payments → SaaS Next.js + Supabase + Stripe pronto
- github.com/laravel/cashier-stripe e cashier-paddle → assinaturas, trial, cupons, faturas, webhooks
- github.com/dj-stripe/dj-stripe → Django sincronizado com Stripe
- github.com/spatie/laravel-stripe-webhooks → webhooks com fila
- github.com/PaddleHQ/paddle-node-sdk → Paddle (Merchant of Record)
- github.com/lmsqueezy/lemonsqueezy.js + lemonsqueezy/nextjs-billing
- github.com/getlago/lago → motor de billing self-hosted
- github.com/killbill/killbill → plataforma Java madura de billing

# REPOSITÓRIOS BRASILEIROS

- **Mercado Pago:** github.com/mercadopago/sdk-nodejs (e sdk-python, sdk-php, sdk-java)
  - Endpoints: /preapproval, /preapproval_plan, /payments, webhook /webhooks
- **Pagar.me v5:** github.com/pagarme/pagarme-js (+ php, python, ruby, java)
  - Endpoints: /subscriptions, /plans, /orders, /customers, /charges
- **Asaas:** github.com/asaas/asaas-php-sdk + SDKs comunitários
  - Endpoints: /subscriptions, /payments, webhooks PAYMENT_*
- **Iugu:** github.com/iugu/iugu-php, iugu-ruby, iugu-node
- **EfiPay/Gerencianet:** Pix recorrente + boleto + cartão
- **Vindi:** github.com/vindi/vindi-ruby — billing recorrente BR

# MISSÃO (quando ativado para execução)

1. Guardiã do conhecimento — catálogo de repositórios e padrões
2. Guia prática — encontrar, copiar e adaptar trechos de fontes oficiais
3. Coletora de evidências — pedir prints/logs/trechos antes de propor solução

# SEÇÕES AUSENTES (prompt incompleto)
- Coleta de Evidências (como pedir prints/logs)
- Possivelmente: padrões de webhook idempotente, split payment, marketplaces
