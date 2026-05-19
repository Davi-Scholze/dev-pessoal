# Biblioteca — Google Integrations Context
> Recebido em: 2026-05-14
> Status: BRUTO — salvo como recebido
> Origem: GOOGLE_INTEGRATIONS_CONTEXT.pdf
> Aplicável a: todos os projetos (referência global de integrações Google)

---

## Sobre Este Documento

Contexto global para sistemas com integrações Google — uso em IAs, Cursor, Claude Projects e pasta mãe de projetos.

O diferencial entregue aos clientes é inteligência de negócio embutida: dados de analytics, tráfego pago e automações integrados diretamente no sistema — gerando 3 fontes de receita: desenvolvimento inicial + manutenção mensal + gestão de tráfego recorrente.

---

## Integrações Google Disponíveis (4 Níveis)

### Nível 1 — Básico (padrão mínimo, todo projeto recebe)
- Google Tag Manager (GTM) instalado no HTML
- GA4 Property conectada via GTM
- Eventos: pageview, CTA click, form submit
- Google Search Console vinculado
- **Tempo:** 2–3 horas

### Nível 2 — Tráfego Pago Integrado
Inclui tudo do Nível 1 +
- Google Ads vinculado ao GA4 (conversões importadas)
- Eventos de conversão por tipo de negócio
- Meta Pixel (se necessário)
- Looker Studio configurado
- **Tempo:** 1 dia

### Nível 3 — Dashboard de Analytics no Sistema
Inclui tudo do Nível 2 +
- GA4 Data API v1 via Service Account
- Dashboard embeddado no painel admin do cliente
- Relatório automático semanal via Google Sheets API
- Google Calendar API se houver agendamento
- **Tempo:** 3–5 dias

### Nível 4 — Plataforma Completa / SaaS
Inclui tudo do Nível 3 +
- Google Ads API programática
- Google Drive, Gmail, People APIs
- Multi-tenant, webhooks, alertas automáticos
- **Tempo:** 2–4 semanas

---

## Autenticação: Service Account (Padrão)

1. Criar projeto no Google Cloud Console (console.cloud.google.com)
2. Ativar as APIs necessárias (Analytics Data API, Calendar API, etc.)
3. IAM e Admin → Contas de Serviço → Criar → Baixar JSON
4. No GA4: Admin → Gerenciamento de acesso → Adicionar email da service account como Leitor
5. Salvar o JSON em `./credentials/` e **NUNCA commitar no git**
6. Usar `GOOGLE_APPLICATION_CREDENTIALS` no `.env` apontando para o arquivo JSON

---

## SDKs e Dependências por API

| API | Node.js | Python |
|-----|---------|--------|
| GA4 Data API | `npm install @google-analytics/data` | `pip install google-analytics-data` |
| Google Workspace (Calendar, Drive, Sheets, Gmail) | `npm install googleapis` | `pip install google-api-python-client` |
| Google Ads API | `npm install google-ads-api` | `pip install google-ads` |
| Auth | `npm install google-auth-library` | `pip install google-auth` |
| Maps (Frontend) | `npm install @googlemaps/js-api-loader` | — |

---

## Variáveis de Ambiente Obrigatórias (.env.example)

```env
GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account.json
GOOGLE_CLOUD_PROJECT_ID=seu-projeto-id
GA4_PROPERTY_ID=123456789
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GTM_CONTAINER_ID=GTM-XXXXXXX
GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXX
GOOGLE_OAUTH_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=xxxxxxxxxxxxxxx
```

---

## 8 Regras Obrigatórias para Todas as Integrações

1. **NUNCA** hardcodar credenciais — sempre usar variáveis de ambiente (`.env`)
2. **SEMPRE** criar `.env.example` com todas as variáveis (sem valores reais)
3. **SEMPRE** try/catch + logging em todas as chamadas de API Google
4. **SEMPRE** implementar exponential backoff para rate limits
5. Cada cliente = um projeto separado no Google Cloud
6. Solicitar apenas escopos mínimos necessários no OAuth
7. Implementar cache nas chamadas GA4 Data API (dados mudam a cada 4h no mínimo)
8. Estrutura de pastas: `src/services/google/` com um arquivo por integração

---

## 6 Perguntas que a IA Deve Fazer Antes de Implementar

1. Qual nível de integração desejado para este projeto? (Nível 1, 2, 3 ou 4)
2. Qual a linguagem/framework do projeto? (Node.js, Python, PHP, React, Vue, Next.js…)
3. O cliente já tem conta no Google Analytics (GA4) e Google Ads?
4. Qual o tipo de negócio do cliente? (e-commerce, serviços, saúde, educação, imobiliário…)
5. O sistema precisa de relatório automático para o cliente? (Sheets ou dashboard interno)
6. Há funções de agendamento? Se sim, integrar Google Calendar.

---

## Documentação Oficial

### GA4 Data API
- Visão Geral: https://developers.google.com/analytics/devguides/reporting/data/v1
- Quickstart: https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-clientlibraries
- Schema (dimensões e métricas): https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema

### Google Workspace APIs
- Todos os produtos: https://developers.google.com/workspace/products
- Google Calendar: https://developers.google.com/workspace/calendar/api/guides/overview
- Google Drive: https://developers.google.com/drive/api/guides/about-sdk
- Gmail API: https://developers.google.com/gmail/api/guides

### Google Tag Manager e Ads
- GTM Developer Docs: https://developers.google.com/tag-platform/tag-manager
- GTM + Google Ads Conversions: https://developers.google.com/tag-platform/tag-manager/server-side/ads-conversion-tracking
- Google Ads API: https://developers.google.com/google-ads/api/docs/start
- Conversões Google Ads: https://developers.google.com/google-ads/api/docs/conversions/overview

---

## Vídeos YouTube de Referência

- **Google Analytics MCP Setup Tutorial** (oficial, 35k views) — buscar no YouTube
- **Connecting to the GA4 Reporting API** — Kevin McLaughlin (50k views)
- **Google Analytics Dashboard [ReactJS and Express]** — buscar no YouTube
- **Google Ads Conversion Tracking com GTM (2026)** — Analytics Mania (23k views)
- **Build a Calendar Scheduling Platform Node.js + React** — TechWithEmma (16k views, 9 horas)
