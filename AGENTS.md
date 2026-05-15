# AGENTS.md — Agentes e MCPs para Projetos Pessoais
> Guia global de agentes de IA, MCPs e modelos de negócio.
> Válido para todos os projetos pessoais de Davi Scholze.
> Última atualização: 2026-05-13

---

## Os 6 Agentes com Maior Demanda (dados reais 2025-2026)

| # | Agente | O que faz | Skill |
|---|--------|-----------|-------|
| 1 | **Auditoria de Ads** | Analisa conta Google/Meta, gera relatório de oportunidades | `/ads-audit` |
| 2 | **Conteúdo Instagram** | Carrosséis, captions, hashtags com identidade da marca | `/content-creator` |
| 3 | **Relatório Semanal** | Coleta dados de múltiplas plataformas, envia resumo executivo | `/ads-audit` |
| 4 | **Qualificação de Leads** | Triagem e segmentação automática no CRM | `/agentes-ia` |
| 5 | **SEO** | Audit, geração de artigos, meta-dados | (manual) |
| 6 | **Monitoramento de Concorrentes** | Rastreia anúncios e conteúdo semanalmente | `/ads-audit` |

---

## MCPs por Tier

### Tier 1 — Essenciais (instalar em qualquer projeto)

| MCP | Função | Instalar |
|-----|--------|---------|
| GitHub MCP | Repos, PRs, CI/CD | Via Claude Code settings |
| PostgreSQL MCP | Banco em linguagem natural | Via Claude Code settings |
| Slack MCP | Relatórios, alerts, comunicação | Via Claude Code settings |
| Google Drive MCP | Documentos e planilhas de clientes | Via Claude Code settings |
| Notion MCP | Base de conhecimento, CRM simples | Via Claude Code settings |
| Fetch MCP | Buscar conteúdo web para análise | Via Claude Code settings |

### Tier 2 — Marketing (agências e projetos com campanhas)

| MCP | Função | Repositório |
|-----|--------|------------|
| Google Ads MCP | list_accounts, execute_gaql_query, get_campaign_performance | github.com/cohnen/mcp-google-ads |
| Meta Ads MCP | Campanhas Meta, audiences, creative performance | github.com/pipeboard-co/meta-ads-mcp |
| Puppeteer MCP | Screenshots, carrosséis, automação de browser | Via Claude Code settings |
| Browserbase MCP | Automação cloud (alternativa ao Puppeteer) | browserbase.com |
| AdKit | Google Ads + Meta Ads direto no Claude (comercial) | adkit.so |
| Composio | Hub com 250+ integrações de uma vez | composio.dev |

### Tier 3 — Orquestração (sistemas complexos)

| MCP | Função |
|-----|--------|
| n8n MCP | Acesso direto a workflows n8n via Claude |
| Airtable MCP | Banco de dados flexível como memória de agente |
| Claude Squad | Múltiplos agentes Claude Code em paralelo |
| CC Usage | Dashboard de consumo e custos por cliente |

---

## Como Instalar MCPs

```json
// ~/.claude/settings.json → mcpServers
{
  "mcpServers": {
    "google-ads": {
      "command": "npx",
      "args": ["-y", "mcp-google-ads"],
      "env": {
        "GOOGLE_ADS_DEVELOPER_TOKEN": "",
        "GOOGLE_ADS_CLIENT_ID": "",
        "GOOGLE_ADS_CLIENT_SECRET": "",
        "GOOGLE_ADS_REFRESH_TOKEN": ""
      }
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

---

## Casos Reais (benchmarks para precificação)

| Quem | O que faz | Resultado |
|------|-----------|-----------|
| RSL/A | 2 pessoas, Claude como 3º funcionário, 9 MCPs | 3× output, <R$1.140/mês de custo |
| Prime Pixel Digital | Auditoria SEO com Claude | Custo R$11 em API → cobra R$2.850–R$11.400 |
| Consultor anônimo | 15 agentes go-to-market B2B | R$12.000/deliverable, preços 4× |
| Anuj (Medium) | Solo + contractors estratégicos | R$171.000/mês, margem 70% |

---

## Modelo de Negócio (como vender agentes)

### Tabela de preços de referência

| Serviço | Setup/Projeto | Retainer Mensal |
|---------|--------------|-----------------|
| Workflow simples (1 automação) | R$8.500–R$28.500 | R$2.850–R$8.550 |
| Auditoria de Ads (IA) | R$2.850–R$11.400 | — |
| Carrosséis automáticos | R$17.000–R$45.000 | R$4.500–R$11.000 |
| Departamento completo | R$57.000–R$199.000 | R$8.550–R$22.800 |
| Consultoria hora | R$570–R$2.565/hora | — |

### Fórmula de proposta baseada em ROI

```
1. Calcular quanto o cliente perde por mês com processo manual
   (ex: 1.200 briefs/ano × 18min = 360h × custo/hora)
2. Proposta = 30% do ROI anual projetado
3. Payback típico: 4–6 meses
4. Apresentar como: "Isso paga sozinho em X meses"
```

### 5 modelos de engajamento

1. **Projeto único** — escopo fixo, entrega única, sem recorrência
2. **Retainer mensal** — manutenção, expansão, monitoramento
3. **Híbrido (projeto + retainer)** — mais recomendado: constrói + sustenta
4. **Performance-based** — % do resultado ou por lead/agendamento
5. **SaaS** — taxa fixa mensal + add-ons por resultado

---

## Ganhos de Produtividade por Tarefa (RSL/A — dados reais)

| Tarefa | Antes | Depois |
|--------|-------|--------|
| Blog post completo | 8 horas | 2–3 horas |
| Sequência 5 emails | 4 horas | 45 min |
| Feature de website | 40 horas | 8 horas |
| Projetos de site/mês | 2 | 5 |
| Automações/mês | 10 | 30 |

---

## Nichos Mais Lucrativos

| Nicho | Automação | Ticket |
|-------|-----------|--------|
| Clínicas/saúde | Agendamento, recall, intake | R$11.400–R$28.500/mês |
| Jurídico | Revisão de contratos, minutas | R$39.900–R$114.000 |
| Marketing digital | Relatórios automáticos, audit ads | R$33.060/mês |
| Imóveis | Drip campaigns, follow-up | R$2.850–R$5.130/mês |
| E-commerce | Descrições de produto, SEO | R$1.710–R$2.850/mês |

---

## Skills Relacionadas

- `/ads-audit` — auditoria Google Ads e Meta Ads
- `/content-creator` — pipeline de carrosséis com render.js + Puppeteer
- `/agentes-ia` — LangGraph, RAG, MCP servers, observabilidade
- `/trafego-pago` — Google/Meta/TikTok Ads, criativos com IA
