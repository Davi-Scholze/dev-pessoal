---
name: relatorio-ads
description: >
  Gera relatório semanal/mensal de performance Google Ads + Meta Ads + orgânico
  Instagram/Facebook num único Markdown + tabela CSV. Lê via API (Google Ads
  API + Meta Marketing API) ou via export manual (CSV do Ads Editor + arquivo
  exportado do Business Suite). Calcula CPA, CTR, conversões, ROAS quando
  configurado. Compara semana atual vs anterior (delta). Output_dir carimbado
  por data. Use quando disser "relatório semanal", "/relatorio-ads", "como
  estão os Ads", "performance da campanha".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - WebFetch
  - AskUserQuestion
---

# Skill: `/relatorio-ads`

Relatório consolidado **Google Ads + Meta Ads + orgânico** — semanal ou mensal — pronto pra entregar ao cliente.

## Princípio

> **Cliente recebe 1 PDF/print, KOD.AI consolida 3 fontes.** Sem cliente abrir 3 dashboards. Sem agência cobrar consultoria pra ler número.

## Quando disparar

- "/relatorio-ads [cliente] [semana|mes]"
- "relatório semanal de <cliente>"
- "como estão os Ads do <cliente>"
- "performance da campanha"

## Modos

| Modo | Como puxa dados | Quando usar |
|---|---|---|
| **API** (recomendado) | Google Ads API + Meta Marketing API | Cliente com retainer recorrente + credenciais configuradas |
| **CSV manual** (fallback) | Davi exporta CSV do Ads Editor / Business Suite e passa path | Cliente novo / sem API configurada |

## Setup API (1× por cliente)

### Google Ads API
```env
# _negocio/clientes/<slug>/.env
GOOGLE_ADS_DEVELOPER_TOKEN=...        # Davi (account-level)
GOOGLE_ADS_CLIENT_ID=...               # OAuth app
GOOGLE_ADS_CLIENT_SECRET=...
GOOGLE_ADS_REFRESH_TOKEN=...           # OAuth cliente
GOOGLE_ADS_CUSTOMER_ID=...             # Account do cliente
GOOGLE_ADS_LOGIN_CUSTOMER_ID=...       # MCC Davi (se aplicável)
```

### Meta Marketing API
```env
META_AD_ACCOUNT_ID=act_...
META_MARKETING_TOKEN=...               # System User Token (longa duração)
```

Path exato pro `.env`: `_negocio/clientes/<slug>/.env` (segue `[[envs_e_secrets]]`).

## Workflow 5 passos

### Passo 1 — Definir janela + objetivo

```
1. Janela: última semana / últimas 4 semanas / mês corrente / customizado?
2. Comparação: vs semana anterior / vs mesmo período mês passado / sem comparação?
3. Foco: visão executiva (1 página) / detalhada (5 páginas) / técnica (todas métricas)?
```

### Passo 2 — Coleta de dados

**Google Ads (via API ou CSV):**
- Por campanha: impressões, cliques, CTR, CPC médio, custo, conversões, CPA, ROAS
- Por grupo: idem
- Top 10 keywords: idem
- Top 10 search terms (busca real): impressões + cliques + custo
- Negativas candidatas (termos com custo + 0 conversão)

**Meta Ads (via API ou CSV Business Suite export):**
- Por campanha: alcance, frequência, impressões, cliques link, CTR, custo, conversões, CPA, ROAS
- Por adset: idem
- Top 5 criativos por gasto: CTR + thumbstop ratio + 3s view
- Top 5 audiências por desempenho

**Orgânico Instagram/Facebook (via Graph API Insights):**
- Alcance + impressões + cliques perfil + visitas perfil
- Top 5 posts por engajamento
- Follower growth (gain/loss/net)
- Stories: alcance + saídas + replies

### Passo 3 — Cálculos derivados

```
CTR = cliques / impressões
CPC = custo / cliques
CPA = custo / conversões (se conversão configurada)
ROAS = receita atribuída / custo (se valor de conversão configurado)
Δ vs período anterior = (atual - anterior) / anterior × 100
```

### Passo 4 — Estrutura do relatório

```markdown
# Relatório Ads — <Cliente> — <Semana N> (DD/MM a DD/MM)

## TL;DR (1 parágrafo)
Investido R$X. Gerou Y conversões. CPA médio R$Z (Δ vs anterior). Destaque: <melhor campanha>. Atenção: <pior campanha>.

## Google Ads
### Performance por campanha
| Campanha | Investido | Cliques | CTR | CPA | Conversões | Δ Conv vs ant |
|---|---|---|---|---|---|---|
| ... |
### Top 10 search terms (busca real)
### Recomendações
- Negativas a adicionar: ...
- Lances a ajustar: ...
- Copies a testar: ...

## Meta Ads
[mesma estrutura]
### Recomendações
- Audiências a expandir / pausar
- Criativos com fadiga (3s view caindo)
- ...

## Orgânico
[posts + follower growth + recomendação de frequência]

## Próximos passos (3-5 itens, priorizado)
1. ...
2. ...
```

### Passo 5 — Output canônico

```
_negocio/clientes/<slug>/marketing/relatorios/ads-<YYYY-MM-DD>/
├── relatorio.md                Markdown formatado pro cliente
├── relatorio.pdf               Opcional (Pandoc render)
├── dados-google-ads.csv        Raw exportado
├── dados-meta-ads.csv          Raw exportado
├── dados-organico.csv          Raw exportado
├── graficos/                   PNGs opcionais (matplotlib via Bash)
└── manifest.yaml
```

## Quality Gates

```yaml
quality_gates:
  - "Janela + comparação definidas no briefing"
  - "Dados das 3 fontes coletados (ou justificado se uma fonte faltar)"
  - "CTR + CPA + Δ calculados sem división por zero (handle 0 conv)"
  - "TL;DR ≤1 parágrafo (8-12 linhas) — executivo lê primeiro"
  - "Recomendações: mín 3 por canal + priorizadas"
  - "Próximos passos: 3-5 itens com responsável + prazo"
  - "Raw CSV anexo (cliente audita se quiser)"
  - "Anti-pollution: zero benchmark inventado (só dados reais)"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| "ROAS 5× no Meta" sem conversion API configurada | Número fantasma | Indicar quando ROAS é estimado vs medido |
| Relatório de 30 páginas | Cliente não lê | Visão executiva 1 página + apêndice detalhado |
| Sem comparação | Não dá pra dizer se melhorou | Sempre Δ vs período anterior |
| Recomendações genéricas ("aumente budget") | Sem acionabilidade | Quanto / em qual campanha / por quê |
| Esconder métricas ruins | Cliente perde confiança | Honestidade — apontar problemas com plano |
| Sem raw CSV | Cliente não pode auditar | CSV sempre anexo |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "relatório gerado + cliente quer ajustar campanhas"
    skill: anuncio-google
    razao: "Recriar CSV Ads Editor com ajustes recomendados"
  - condicao: "performance ruim + faltam dados de conversão"
    skill: analisar-dados
    razao: "Auditar tracking (pixel, GA4, conversões)"
  - condicao: "relatório aprovado + cliente quer publicar próximo conteúdo"
    skill: publicar-tema
    razao: "Próximo tema do calendário"

requires_skills_anteriores:
  - condicao: "cliente novo + campanhas não rodaram ainda"
    skill: anuncio-google
    razao: "Precisa campanha ativa pra ter o que reportar"
```

## Limitações honestas

- **Conversion API Meta** depende de configuração no servidor do cliente (pixel + CAPI) — sem isso, ROAS é estimado
- **Atribuição multi-touch** não modelada — usa atribuição padrão da plataforma (last-click)
- **LTV** não calculado — exige integração CRM (próxima skill)
- **Comparação YoY** limitada se cliente é novo (<1 ano)
- **Não substitui Data Studio / Looker Studio** em retainers premium — gera bom MVP
- **Custo da API Meta**: gratuita até 200 calls/hora por token (default)

## Origem

Frente A5 do plano 16 frentes Davi 2026-05-22. Padrão observado em relatórios de agências digitais (RD Station, Mlabs, Resultados Digitais) — re-implementação universalizada:
- **Vocabulário público:** CTR, CPC, CPA, ROAS, attribution, lookback window
- **APIs oficiais:** Google Ads API (developers.google.com/google-ads/api) + Meta Marketing API (developers.facebook.com/docs/marketing-api)
- **Marca NÃO usada:** zero referência a "Mazzeo IA" / "MazyOS"

Skill base pra **pacote-padrão Davi** Pilar 5 — CRM-light + KPIs Recorrentes.
