# Contexto Bruto — Como Agências de IA Estruturam e Vendem Sistemas de Marketing
> Recebido em: 2026-05-13
> Status: BRUTO — não processar sem aprovação explícita
> Origem: pesquisa de campo na internet (dados reais de 2025–2026)

---

# 1. CARROSSÉIS COM IA (como os melhores fazem)

## Stack técnica real
- **Open Carrusel** (github.com/Hainrixz/open-carrusel): Next.js + Claude CLI + Puppeteer
  - Claude gera cada slide como string HTML/CSS completa
  - Puppeteer (headless Chromium) captura screenshot exato → PNG do Instagram
  - Arquivo `config.json` centraliza marca (cores, fontes, modo claro/escuro)

## Fluxo padrão das agências
1. Claude recebe `brand config` + tópico
2. Gera `roteiro.md` (conteúdo de cada slide)
3. `render.js` / Puppeteer renderiza em 1350px (máximo Instagram)
4. `legenda.md` com caption + hashtags gerado automaticamente
5. ZIP com todos os slides para download/entrega

## Automação com n8n (templates prontos)
- n8n #3693: GPT + Imgur + Instagram Graph API → publica direto
- n8n #4028: GPT-Image-1 gera sequência de imagens → TikTok/Instagram
- n8n #12413: Gemini + Google Slides como template visual → Meta Graph API

## O que cobram
- Setup do sistema: R$17.000 a R$45.000
- Retainer mensal (produção recorrente): R$4.500 a R$11.000/mês

---

# 2. GOOGLE ADS COM IA (fluxos reais)

## MCPs disponíveis agora
- **github.com/cohnen/mcp-google-ads** — open-source, 5 tools: list_accounts, execute_gaql_query, get_campaign_performance, get_ad_performance, run_gaql
- **AdKit (adkit.so)** — comercial, Google Ads + Meta Ads direto no Claude
- **Composio (composio.dev)** — hub com 250+ integrações incluindo Google e Meta Ads

## 10 workflows reais com prompts

| Workflow | Prompt resumido |
|----------|----------------|
| Full Account Audit | "Puxe campanhas ativas. Sinalize zero conversões com gasto >$100" |
| Relatório semanal | "Performance semana vs anterior. Mudanças %. Formate como tabela HTML" |
| Budget Pacing | "Projete fim do mês, alerte se variação >±15%" |
| Creative Performance | "Parse nomes de anúncios, agrupe por ROAS" |
| Cross-Channel Attribution | "Compare conversões reportadas vs reais. Sinalize ratio >1.3" |
| Audience Overlap | "Compare pares de conjuntos de anúncios. Sinalize sobreposição >50%" |
| Negative Keywords | "Termos com $50+ gasto e zero conversões. Sugira negativos" |
| Landing Page QA | "Verifique URLs, status 404/500, presença de gtag e fbq" |
| Competitor Monitoring | "Ad Library semanal. Identifique anúncios novos vs parados" |
| Anomaly Detection | "Sinalize desvio >2 sigma da média 7 dias" |

## Prompts prontos (copiar e usar)
```
Negative Keywords:
"Identify high-spend queries with zero conversions that do not match our brand intent.
Focus on users looking for 'free' versions or competitors we don't want to target,
and format them as a negative keyword list for a 'Broad Match' campaign."

Budget Reallocation:
"Analyze my current ROAS across 'Brand' and 'Generic' campaigns. If I have an additional
$5,000 this month, which specific campaigns are currently limited by budget but maintaining
a ROAS above 4.0?"
```

---

# 3. ESTRUTURA DE PASTAS PARA MÚLTIPLOS CLIENTES

## Template padrão
```
~/work/
├── CLAUDE.md                    ← padrões globais (suas preferências, convenções)
├── shared/
│   ├── components/
│   ├── templates/
│   └── prompts/                 ← prompts validados por workflow
├── client-empresa-A/
│   ├── CLAUDE.md                ← contexto específico: stack, tom, histórico
│   ├── dados/
│   │   ├── brand-guide.md
│   │   ├── entrevista.md
│   │   └── referencias-visuais/
│   ├── marketing/
│   │   ├── carrosséis/
│   │   ├── ads/
│   │   └── relatorios/
│   └── saidas/
└── client-empresa-B/
    └── ...
```

## Como o Claude herda o contexto
- CLAUDE.md raiz: padrões de código, estilo, convenções git (todos os clientes)
- CLAUDE.md por cliente: voz de marca, stack, histórico, métricas-chave
- Clientes nunca veem contexto uns dos outros — completamente isolado

## Regra de ouro
Máximo 3 níveis de pasta. CLAUDE.md total (root + cliente) ≤ 2.000 palavras.

---

# 4. MCPs MAIS USADOS EM PRODUÇÃO

## Tier 1 — Essenciais
| MCP | Função |
|-----|--------|
| GitHub MCP | Repos, PRs, CI/CD |
| PostgreSQL MCP | Banco em linguagem natural |
| Slack MCP | Relatórios, alerts, comunicação |
| Google Drive MCP | Documentos e planilhas de clientes |
| Notion MCP | Base de conhecimento, CRM simples |
| Fetch MCP | Buscar conteúdo web para análise |

## Tier 2 — Marketing (mais usados por agências)
| MCP | Link |
|-----|------|
| Google Ads MCP | github.com/cohnen/mcp-google-ads |
| Meta Ads MCP | github.com/pipeboard-co/meta-ads-mcp |
| Shopify AI Toolkit | claudefa.st |
| Puppeteer MCP | automação de browser, screenshots, carrosséis |
| Browserbase MCP | automação cloud |

## Tier 3 — Orquestração
| MCP | Função |
|-----|--------|
| n8n MCP | Acesso direto a workflows n8n via Claude |
| Composio | Hub com 250+ integrações de uma vez |
| Airtable MCP | Banco de dados flexível como memória de agente |
| Claude Squad | Múltiplos agentes Claude Code em paralelo |
| CC Usage | Dashboard de consumo e custos por cliente |

---

# 5. SKILLS E AGENTES QUE MAIS VENDEM

## Caso RSL/A (2 pessoas, 9 MCPs, 3x mais output)
MCPs ativos: Sanity CMS, Vercel, GoHighLevel (CRM), Notion, Google Workspace, GitHub, Gemini, Stripe

| Tarefa | Antes | Depois |
|--------|-------|--------|
| Blog post completo | 8 horas | 2-3 horas |
| Sequência 5 emails | 4 horas | 45 min |
| Feature de website | 40 horas | 8 horas |
| Projetos de site/mês | 2 | 5 |
| Automações/mês | 10 | 30 |

## Os 6 agentes com maior demanda
1. **Agente de Auditoria de Ads** — analisa conta Google/Meta, gera relatório de oportunidades
2. **Agente de Conteúdo Instagram** — carrosséis, captions, hashtags com identidade da marca
3. **Agente de Relatório Semanal** — coleta dados de múltiplas plataformas, envia resumo executivo
4. **Agente de Qualificação de Leads** — triagem e segmentação automática no CRM
5. **Agente de SEO** — audit, geração de artigos, meta-dados
6. **Agente de Monitoramento de Concorrentes** — rastreia anúncios e conteúdo semanalmente

## Caso consultor anônimo (15 agentes especializados)
- Pipeline: pesquisa → posicionamento → mensagens → copywriting → validação
- Entregam: go-to-market packages para B2B
- Antes: 2 semanas. Depois: 4 horas
- Valor cobrado: $12.000 por deliverable
- Aumentou preços 4x

---

# 6. PREÇOS E MODELOS DE NEGÓCIO

## Tabela de referência
| Serviço | Setup / Projeto | Retainer Mensal |
|---------|----------------|-----------------|
| Workflow simples (1 automação) | R$8.500 - R$28.500 | R$2.850 - R$8.550 |
| Departamento completo (sales/ops) | R$57.000 - R$199.000 | R$8.550 - R$22.800 |
| Auditoria de Ads (IA) | R$2.850 - R$11.400 | — |
| Retainer marketing automation | — | R$5.700 - R$28.500 |
| Consultoria hora | R$570 - R$2.565/hora | — |

## 5 modelos de engajamento
1. **Projeto único** — escopo fixo, entrega única
2. **Retainer mensal** — manutenção, expansão, monitoramento
3. **Híbrido (projeto + retainer)** — mais recomendado: constrói + sustenta
4. **Performance-based** — % do resultado ou por lead/agendamento
5. **SaaS** — taxa fixa mensal + add-ons por resultado

## Fórmula de precificação baseada em ROI
- Auditoria: quanto o cliente perde por mês com processo manual?
- Proposta: cobrar 30% do ROI anual projetado
- Exemplo real documentado: empresa com 1.200 briefs/ano, 18 min cada = 360h
  → Projeto: R$79.800 → Retainer: R$5.130/mês → Payback: 4,9 meses

## Nichos mais lucrativos
| Nicho | Automação | Preço |
|-------|-----------|-------|
| Clínicas/saúde | Agendamento, recall, intake | R$11.400-R$28.500/mês |
| Imóveis | Drip campaigns, follow-up | R$2.850-R$5.130/mês |
| E-commerce | Descrições de produto, SEO | R$1.710-R$2.850/mês |
| Jurídico | Revisão de contratos | R$39.900-R$114.000 |
| Marketing digital | Relatórios automáticos, audit ads | R$33.060/mês |

---

# 7. CASOS REAIS

| Quem | O que faz | Resultado |
|------|-----------|-----------|
| RSL/A | Agência marketing, 2 pessoas, Claude como 3º funcionário | 3x output, <R$1.140/mês de custo |
| Prime Pixel Digital | Auditoria SEO com Claude | Custo: R$11 em API → cobra R$2.850-R$11.400 |
| Consultor anônimo | 15 agentes go-to-market B2B | $12.000/deliverable, preços 4x maiores |
| Anuj (Medium) | Solo, contractors estratégicos | R$171.000/mês, margem 70% |
| Polsia (Indie Hackers) | Plataforma AI autônoma | Quase R$2.850.000/mês em 3 meses |
| Agência anônima | Automação de call center | 27 clientes em 18 meses, R$228.000 MRR |

---

# PRÓXIMAS DECISÕES (aguarda aprovação)
- [ ] Instalar Google Ads MCP e Meta Ads MCP?
- [ ] Criar skill `content-creator` baseada no pipeline de carrosséis?
- [ ] Criar skill `ads-audit` para auditoria de contas?
- [ ] Definir estrutura de pastas padrão por cliente?
