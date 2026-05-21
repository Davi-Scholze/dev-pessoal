# CNTX SMB — Sistemas Empresariais: ERP, Contabilidade, NF-e, SaaS Multi-tenant & Operação
> Versão: 1.0 | Data: 21/05/2026 | NotebookLM: https://notebooklm.google.com/notebook/26782f74-7405-4b68-a960-114e154c087a

---

## 📌 ESTRUTURA DO NOTEBOOK (26 fontes)

### Categoria 1 — ERPs Open-Source (GitHub)
| Repo | Stars | Stack | Destaque |
|------|-------|-------|----------|
| frappe/erpnext | 34.8k | Python/JS | Contabilidade dupla entrada, multi-company, REST API |
| odoo/odoo | 50.8k | Python | Maior ecossistema ERP open-source do mundo |
| Dolibarr/dolibarr | 7.2k | PHP | ERP CRM leve, ideal para PMEs, REST API |
| aureuserp/aureuserp | 10.6k | Laravel+FilamentPHP | Novo, modular, MIT license, plugins |
| akaunting/akaunting | 9.8k | Laravel | Contabilidade online multi-tenant nativa |
| invoiceninja/invoiceninja | ~7k | Laravel | Faturamento, quotes, CRM, projetos |
| idurar/idurar-erp-crm | 8.4k | MERN Stack | ERP/CRM moderno Node.js+React |
| ever-co/ever-gauzy | 3.7k | TypeScript/NestJS | ERP+CRM+HRM+ATS, headless APIs |
| twentyhq/twenty | ~25k | TypeScript/NestJS | Alternativa ao Salesforce, CRM moderno |
| nocobase/nocobase | 22.5k | TypeScript | No-code ERP builder com AI |
| jishenghua/jshERP | 4.3k | Java/Spring | ERP vendas+estoque+financeiro SaaS |

### Categoria 2 — Emissão Fiscal e NF-e (GitHub)
| Repo | Stars | Stack | Destaque |
|------|-------|-------|----------|
| webmaniabr/NFe-NodeJS | 35 | Node.js | SDK oficial NF-e WebmaniaBR |
| Gary-Rainer.../fiscal-deadlines | 0 | Python/Streamlit | Dashboard prazos fiscais (DAS, SPED, DCTF) |
| mrmgomes/boleto-utils | 61 | JavaScript | Validação de todos tipos de boleto |
| guilhermearaujo/boleto.js | 160 | JavaScript | Geração de boletos bancários |
| gerencianet/gn-api-sdk-node | 67 | Node.js | SDK Gerencianet (Pix + boletos) |
| efipay/sdk-node-apis-efi | 26 | JavaScript | EFÍ Pay APIs (Pix, boletos, cobranças) |
| firefly-iii/firefly-iii | 23.3k | PHP | Gestão financeira pessoal/empresa |
| vas3k/TaxHacker | 5.7k | TypeScript | AI para análise de notas/invoices |

### Categoria 3 — Documentação Oficial
| Fonte | URL | Conteúdo |
|-------|-----|----------|
| NFE.io Docs | https://nfe.io/docs/ | API REST NF-e, NFS-e, NFC-e, Reforma Tributária |
| ERPNext Docs | https://docs.erpnext.com/docs/en/accounting | Módulo contábil completo |
| Frappe API Docs | https://docs.frappe.io/framework/user/en/api | Framework REST API |

### Categoria 4 — YouTube (Vídeos Relevantes)
| Vídeo | Canal | Conteúdo |
|-------|-------|----------|
| API NFSe Nacional: Como integrar e simplificar | TecnoSpeed | Integração NFS-e via API |
| API Nota Fiscal: como integrar ao seu software? | TecnoSpeed | NF-e API para desenvolvedores |
| Ferramentas de Automação na Área Fiscal – Parte 1 | Paulo Farias (CIOnaNuvem) | RPA e automação fiscal |

### Categoria 5 — Contexto Canônico Sintetizado (Texto)
Documento de 10 seções cobrindo toda a arquitetura, integrações e padrões.

---

## 🧠 PRINCIPAIS APRENDIZADOS

### 1. O Mercado SMB Brasileiro tem Características Únicas
- **Obrigatoriedade fiscal**: toda empresa emite NF-e/NFS-e → fiscal é OBRIGATÓRIO, não opcional
- **SPED**: relatórios digitais à Receita Federal criam demanda por sistemas integrados
- **Open Finance**: Pluggy e Belvo abrem dados bancários para automação de conciliação
- **PIX**: pagamento instantâneo criou nova categoria de APIs de cobrança no Brasil

### 2. Multi-tenancy é o Padrão SaaS
- **Estratégia mais comum**: Shared DB com coluna `tenant_id` em todas as tabelas
- **Mais segura**: Row-Level Security (RLS) no PostgreSQL — zero risco de cross-tenant
- **Mais cara**: DB por tenant (só para enterprise/alto compliance)
- **Middleware padrão**: subdomínio (`empresa.app.com`) → resolve tenant_id no request

### 3. ERPNext é o Melhor ERP Open-Source para Base
- 34.8k stars, contabilidade de dupla entrada completa
- Multi-company nativo (funciona como multi-tenant com isolamento de dados)
- REST API completa (Frappe Framework)
- Comunidade ativa, documentação extensa
- Pode ser customizado com apps Python

### 4. Emissão Fiscal via API é o Caminho
- **Nunca** emitir NF-e diretamente contra SEFAZ em produção sem intermediário
- APIs como NFE.io, Tecnospeed, WebmaniaBR abstraem toda complexidade XML/assinatura
- Fluxo: sistema → POST /nfe → provedor → SEFAZ → webhook de retorno
- Custo: ~R$ 0,05 a R$ 0,30 por NF-e (dependendo do volume e provedor)

### 5. O Modelo SaaS + Contabilidade tem LTV Altíssimo
- Sistemas B2B empresariais: LTV médio 5-10+ anos
- Lock-in natural: dados históricos, NFs arquivadas (obrigação legal 5 anos), integrações
- Melhor canal: parceiro contador (indica dezenas de clientes)
- Bundle contabilidade+sistema é modelo poderoso de diferenciação

---

## 🔍 PADRÕES ENCONTRADOS

### Padrão 1: Event-Driven Business Operations
PedidoAprovado
→ EmitirNFe (fiscal service)
→ AtualizarEstoque (inventory service)
→ GerarFinanceiro (financial service)
→ NotificarCliente (notification service)
Todos os grandes ERPs usam este padrão. Implementar com BullMQ ou RabbitMQ.

### Padrão 2: Bounded Contexts para Sistemas Empresariais
[Fiscal] ←→ [Financeiro] ←→ [Vendas]
↕              ↕            ↕
[Contábil] ←→ [Compras] ←→ [Estoque]
↕
[RH/DP]
Cada context tem seu próprio modelo de dados e API interna.

### Padrão 3: Integração Contábil Padrão
Sistema SMB
↓ (lançamentos estruturados)
Middleware/API (mapeia plano de contas)
↓
Sistema Contábil do Contador (Domínio, Fortes, Senior, etc.)
↓
SPED + Obrigações Acessórias (gerado automaticamente)

### Padrão 4: Conciliação Financeira Automática
OFX/CSV do banco → parse → lançamentos
+
Contas a receber/pagar no sistema
↓
Match automático: valor + data ± 2 dias
↓
Conciliados: ✅ auto-baixa
Exceções: 📋 fila para revisão humana

### Padrão 5: SaaS Retention Flywheel
Cliente usa o sistema
↓
Dados acumulam (NFs, histórico financeiro, clientes)
↓
Custo de saída aumenta (migração dolorosa)
↓
Expansão de módulos (mais MRR, mais dados)
↓
Churn próximo de zero após 12 meses

---

## 🏆 MELHORES FONTES

### GitHub — ERPs
1. **frappe/erpnext** → Melhor ERP open-source para base técnica
   - URL: https://github.com/frappe/erpnext
   - Por que: contabilidade completa, multi-tenant, 34k+ stars, REST API

2. **aureuserp/aureuserp** → Mais moderno (Laravel 13 + FilamentPHP 5)
   - URL: https://github.com/aureuserp/aureuserp
   - Por que: 10.6k stars em poucos meses, MIT, plugin system

3. **ever-co/ever-gauzy** → Stack TypeScript moderna, headless APIs
   - URL: https://github.com/ever-co/ever-gauzy
   - Por que: NestJS + Angular, PostgreSQL, Redis, ERP/CRM/HRM completo

4. **akaunting/akaunting** → Multi-tenant nativo, App Store de módulos
   - URL: https://github.com/akaunting/akaunting
   - Por que: focado em contabilidade, Laravel, App Store para extensões

5. **idurar/idurar-erp-crm** → Stack MERN moderna, AGPL
   - URL: https://github.com/idurar/idurar-erp-crm
   - Por que: Node.js + React + MongoDB, 8.4k stars, rápido de customizar

### GitHub — Fiscal e Boletos
6. **webmaniabr/NFe-NodeJS** → SDK NF-e mais ativo para Node.js
   - URL: https://github.com/webmaniabr/NFe-NodeJS

7. **guilhermearaujo/boleto.js** → Geração de boletos mais popular
   - URL: https://github.com/guilhermearaujo/boleto.js

8. **efipay/sdk-node-apis-efi** → SDK EFÍ Pay (Pix + boletos + cobranças)
   - URL: https://github.com/efipay/sdk-node-apis-efi

### Documentação
9. **NFE.io Docs** → Melhor documentação de API fiscal no Brasil
   - URL: https://nfe.io/docs/
   - Por que: cobre NF-e, NFS-e, NFC-e, Reforma Tributária, Webhooks

10. **ERPNext Accounting Docs** → Módulo contábil mais completo open-source
    - URL: https://docs.erpnext.com/docs/en/accounting

---

## 🎬 MELHORES VÍDEOS

| # | Título | Canal | URL | Por que assistir |
|---|--------|-------|-----|-----------------|
| 1 | API NFSe Nacional: Como integrar e simplificar | TecnoSpeed | https://www.youtube.com/watch?v=0wLYo5wWshU | Integração NFS-e real, padrões de API |
| 2 | API Nota Fiscal: como integrar ao seu software? | TecnoSpeed | https://www.youtube.com/watch?v=UHptafh9plk | NF-e para desenvolvedores, fluxo completo |
| 3 | Ferramentas de Automação na Área Fiscal – Parte 1 | CIOnaNuvem | https://www.youtube.com/watch?v=MblPnWEGxmE | RPA fiscal, automações reais |
| 4 | SaaS Single-tenant vs Multi-tenant | Rocketseat | YouTube search | Arquitetura multi-tenant, decisões de design |
| 5 | Design Pattern: Como arquitetar multi-tenant | Full Cycle | YouTube search | Padrões arquiteturais detalhados |

---

## 🔗 LINKS MAIS IMPORTANTES

### ERPs e Sistemas Base
- https://github.com/frappe/erpnext — ERPNext (melhor open-source)
- https://github.com/odoo/odoo — Odoo (maior ecossistema)
- https://github.com/aureuserp/aureuserp — AureusERP (mais moderno)
- https://github.com/akaunting/akaunting — Akaunting (contabilidade multi-tenant)
- https://github.com/invoiceninja/invoiceninja — Invoice Ninja (faturamento)
- https://github.com/idurar/idurar-erp-crm — IDURAR (MERN ERP)
- https://github.com/ever-co/ever-gauzy — Gauzy (TypeScript ERP)
- https://github.com/Dolibarr/dolibarr — Dolibarr (ERP CRM simples)
- https://github.com/twentyhq/twenty — Twenty (CRM moderno)
- https://github.com/nocobase/nocobase — NocoBase (no-code ERP)

### Fiscal e NF-e
- https://nfe.io/docs/ — Documentação NFE.io (melhor API fiscal BR)
- https://github.com/webmaniabr/NFe-NodeJS — SDK Node.js NF-e
- https://github.com/Gary-Rainer-Chumacero-Vanderlei/fiscal-deadlines — Dashboard prazos fiscais

### Boletos e Cobranças
- https://github.com/guilhermearaujo/boleto.js — Geração de boletos JS
- https://github.com/gerencianet/gn-api-sdk-node — Gerencianet/EFÍ SDK
- https://github.com/efipay/sdk-node-apis-efi — EFÍ Pay APIs
- https://github.com/mrmgomes/boleto-utils — Validação de boletos

### Financeiro e Contabilidade
- https://github.com/firefly-iii/firefly-iii — Firefly III (gestão financeira)
- https://github.com/vas3k/TaxHacker — AI para análise fiscal
- https://docs.erpnext.com/docs/en/accounting — ERPNext Accounting docs

### APIs Brasileiras (requerem cadastro)
- https://nfe.io — NF-e, NFS-e, NFC-e API
- https://app.omie.com.br/api/v1/ — Omie ERP API
- https://developer.bling.com.br — Bling API v3
- https://pluggy.ai — Open Finance Brasil
- https://asaas.com/api — Cobranças Pix/boleto

---

## 🏗️ ARQUITETURAS REUTILIZÁVEIS

### Stack Recomendada para Sistema SMB SaaS Brasileiro
Frontend: Next.js 14 (App Router) + TailwindCSS + Shadcn/UI
Backend: NestJS (Node.js) ou Laravel (PHP)
Banco: PostgreSQL + Row-Level Security (multi-tenant)
Cache: Redis (sessions, filas, cache por tenant)
Filas: BullMQ (para emails, NFe, relatórios assíncronos)
Fiscal: NFE.io API ou Tecnospeed
Cobrança: EFÍ Pay (Pix) + Asaas (boleto + recorrência)
Banking: Pluggy (extrato OFX automático)
Email: SendGrid ou Amazon SES
WhatsApp: Evolution API (self-hosted) ou Twilio
Analytics: Mixpanel ou Amplitude
Infra: AWS (ECS + RDS + ElastiCache) ou Vercel + Supabase

### Schema Multi-tenant Minimalista (PostgreSQL)
```sql
-- Todas as tabelas têm tenant_id
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL, -- subdomínio
  name VARCHAR(255) NOT NULL,
  plan VARCHAR(50) DEFAULT 'basic',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row-Level Security
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON invoices
  USING (tenant_id = current_setting('app.tenant_id')::UUID);

-- Set em cada request:
-- SET app.tenant_id = 'uuid-do-tenant';
```

### Fluxo de Emissão NF-e (Pseudocódigo)
```typescript
// 1. Trigger: quando pedido é aprovado
async function emitirNFe(pedido: Pedido): Promise<NFe> {
  const payload = {
    natureza_operacao: "Venda de mercadoria",
    data_emissao: new Date().toISOString(),
    emitente: await getEmitenteData(pedido.tenant_id),
    destinatario: pedido.cliente,
    produtos: pedido.itens.map(toNFeItem),
    totais: calcularTotais(pedido),
    transporte: { modalidade: 0 } // sem frete
  };

  // POST para NFE.io ou Tecnospeed
  const response = await nfeClient.post('/nfe', payload);

  // Salvar XML e DANFE (obrigação 5 anos)
  await storage.save(`nfe/${response.chave_nfe}.xml`, response.xml);

  // Atualizar status no sistema
  await db.pedidos.update({ id: pedido.id }, {
    nfe_chave: response.chave_nfe,
    nfe_status: 'autorizada',
    nfe_danfe_url: response.danfe_url
  });

  // Notificar cliente
  await emailService.send({
    to: pedido.cliente.email,
    template: 'nfe_emitida',
    data: { danfe_url: response.danfe_url }
  });

  return response;
}
```

---

## 📊 PADRÕES EMPRESARIAIS EFICIENTES

### 1. DRE Automatizada em Tempo Real
Receita Bruta (NFs emitidas)
(-) Impostos (ICMS, PIS, COFINS, ISS)
= Receita Líquida
(-) CMV/CPV (custo dos produtos/serviços)
= Lucro Bruto
(-) Despesas Operacionais (classificadas por centro de custo)
= EBITDA
(-) Depreciação/Amortização
= EBIT
(-) Resultado Financeiro
= EBT
(-) IR/CSLL
= Lucro Líquido
Atualizada automaticamente a cada NF emitida e pagamento registrado.

### 2. Fluxo de Caixa Projetado
Realizado (pagamentos já ocorridos - extrato bancário)
+
Previsto (contas a pagar/receber com vencimento futuro)
+
Projeção (recorrências configuradas)
= Saldo Projetado por dia/semana/mês

### 3. Régua de Cobrança Automática