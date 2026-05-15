# Contexto — Integrações Google APIs
> Referência rápida para todos os projetos. Baseado em: `bruto/2026-05-14_biblioteca-google-integrations.md`
> Última revisão: 2026-05-15

## Escolha o Nível Antes de Implementar

| Nível | O que inclui | Tempo estimado |
|-------|-------------|----------------|
| **1 — Básico** | GTM + GA4 + Search Console | 2–3h |
| **2 — Tráfego Pago** | + Google Ads + Meta Pixel + Looker Studio | 1 dia |
| **3 — Dashboard** | + GA4 Data API + dashboard admin + Sheets | 3–5 dias |
| **4 — SaaS Completo** | + Ads API + Drive + Gmail + People + webhooks | 2–4 semanas |

**Pergunta obrigatória ao cliente:** qual nível de integração? Só avançar com resposta explícita.

## Autenticação (Padrão: Service Account)

```
1. Google Cloud Console → Criar projeto dedicado por cliente
2. APIs & Services → Habilitar as APIs necessárias
3. IAM → Contas de Serviço → Criar → Baixar JSON
4. GA4 Admin → Gerenciamento de acesso → Adicionar service account como Leitor
5. Salvar JSON em ./credentials/  (NUNCA commitar — está no .gitignore)
6. .env: GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account.json
```

## Dependências por API

| API | Node.js | Python |
|-----|---------|--------|
| GA4 Data API | `@google-analytics/data` | `google-analytics-data` |
| Calendar, Drive, Sheets, Gmail | `googleapis` | `google-api-python-client` |
| Google Ads | `google-ads-api` | `google-ads` |
| Auth | `google-auth-library` | `google-auth` |
| Maps (frontend) | `@googlemaps/js-api-loader` | — |

## Estrutura de Pastas (obrigatória)

```
src/services/google/
├── analytics.ts    ← GA4 Data API
├── calendar.ts     ← Calendar API
├── drive.ts        ← Drive API
├── sheets.ts       ← Sheets API
└── ads.ts          ← Google Ads API (Nível 4)
```

## Variáveis de Ambiente (.env.example)

```env
GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account.json
GOOGLE_CLOUD_PROJECT_ID=
GA4_PROPERTY_ID=
GA4_MEASUREMENT_ID=G-
GTM_CONTAINER_ID=GTM-
GOOGLE_MAPS_API_KEY=
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
```

## 8 Regras Inegociáveis

1. Nunca hardcodar credenciais — sempre `.env`
2. Sempre criar `.env.example` (sem valores reais)
3. Sempre `try/catch` + logging em toda chamada de API
4. Sempre exponential backoff para rate limits
5. Cada cliente = projeto separado no Google Cloud
6. Escopos OAuth mínimos necessários
7. Cache nas chamadas GA4 Data API (dados mudam a cada 4h)
8. Um arquivo por integração em `src/services/google/`

## 6 Perguntas Antes de Implementar

1. Qual nível de integração? (1, 2, 3 ou 4)
2. Qual a stack do projeto? (Next.js, React, Python…)
3. O cliente já tem GA4 e Google Ads configurados?
4. Qual o tipo de negócio? (e-commerce, serviços, saúde…)
5. Precisa de relatório automático? (Sheets ou dashboard interno)
6. Há agendamento? → integrar Google Calendar

## Referência de Documentação

- GA4 Data API: `developers.google.com/analytics/devguides/reporting/data/v1`
- Google Workspace APIs: `developers.google.com/workspace/products`
- GTM Developer Docs: `developers.google.com/tag-platform/tag-manager`
- Google Ads API: `developers.google.com/google-ads/api/docs/start`
