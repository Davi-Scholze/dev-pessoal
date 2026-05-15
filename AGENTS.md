# AGENTS.md — Agentes, MCPs e Modelo de Negócio
> Guia global de agentes de IA, MCPs e modelo de negócio.
> Válido para todos os projetos pessoais de Davi Scholze.
> Última atualização: 2026-05-15

---

## 18 Agentes Especializados (SCHOLZE-STACK)

Cada agente vive em `.claude/agents/<nome>.md`. O `master-orchestrator` é o ponto de entrada padrão.

### Orquestração

| Agente | Modelo | Quando invocar |
|--------|--------|----------------|
| `master-orchestrator` | Sonnet | Primeira parada de qualquer pedido; classifica e despacha |
| `planner` | Opus | Antes de qualquer feature complexa; produz plano com critérios de aceite |
| `researcher` | Sonnet | Antes de decisão arquitetural; consulta NotebookLM + web |

### Frontend / Design

| Agente | Modelo | Quando invocar |
|--------|--------|----------------|
| `frontend-designer` | Sonnet | Criar/refatorar componentes React, páginas, layouts |
| `design-reviewer` | Sonnet | Review de qualquer PR com mudança visual |
| `animation-engineer` | Sonnet | Micro-interações, transições, Framer Motion / Reanimated |

### Backend / Dados

| Agente | Modelo | Quando invocar |
|--------|--------|----------------|
| `backend-architect` | Opus | Modelagem de schema, contratos de API, decisões arquiteturais |
| `db-engineer` | Sonnet | Migrations Postgres, RLS, índices, otimizações |
| `integration-engineer` | Sonnet | Conectar APIs externas (Stripe, Google, WhatsApp) |

### Mobile / Desktop

| Agente | Modelo | Quando invocar |
|--------|--------|----------------|
| `mobile-engineer` | Sonnet | Features React Native + Expo + NativeWind |
| `desktop-engineer` | Sonnet | Features Tauri 2.0 (Rust + WebView) |

### Qualidade

| Agente | Modelo | Quando invocar |
|--------|--------|----------------|
| `test-architect` | Sonnet | Definir pirâmide de testes; cobertura ausente em área crítica |
| `e2e-architect` | Sonnet | Criar/atualizar specs Playwright de fluxos críticos |
| `code-reviewer` | Sonnet | Review de PR contra checklist de qualidade e segurança |
| `refactor-surgeon` | Opus | Arquivo > 400 linhas; reorganização de módulo |

### Segurança / LGPD

| Agente | Modelo | Quando invocar |
|--------|--------|----------------|
| `security-guardian` | Sonnet | Review de PR que toca auth, dados ou infra |
| `lgpd-auditor` | Sonnet | PR com formulários, banco ou APIs que coletam dados do usuário |

### DevOps

| Agente | Modelo | Quando invocar |
|--------|--------|----------------|
| `devops-engineer` | Sonnet | CI/CD, Docker, deploy Vercel/Fly.io/EAS, observabilidade |

---

## MCPs por Tier

### Tier 1 — Ativos (configurados em `.mcp.json`)

| MCP | Função |
|-----|--------|
| `filesystem` | Acesso ao sistema de arquivos local |
| `github` | Repos, PRs, issues, CI/CD |
| `git` | Operações git no repositório atual |
| `memory` | Memória persistente entre sessões |

### Tier 2 — Marketing (adicionar quando houver campanhas)

| MCP | Função | Repositório |
|-----|--------|------------|
| Google Ads MCP | Auditoria e otimização de campanhas | `github.com/cohnen/mcp-google-ads` |
| Meta Ads MCP | Campanhas Facebook/Instagram | `github.com/pipeboard-co/meta-ads-mcp` |
| Puppeteer MCP | Screenshots, carrosséis, automação | `@modelcontextprotocol/server-puppeteer` |

### Tier 3 — Orquestração avançada

| MCP | Função |
|-----|--------|
| n8n MCP | Workflows n8n via Claude |
| Airtable MCP | Banco flexível como memória de agente |
| Claude Squad | Múltiplos agentes em paralelo (tmux + worktrees) |

### Como adicionar MCP ao `.mcp.json`

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "google-ads": {
      "command": "npx",
      "args": ["-y", "mcp-google-ads"],
      "env": {
        "GOOGLE_ADS_DEVELOPER_TOKEN": "${GOOGLE_ADS_TOKEN}",
        "GOOGLE_ADS_CLIENT_ID": "${GOOGLE_ADS_CLIENT_ID}",
        "GOOGLE_ADS_CLIENT_SECRET": "${GOOGLE_ADS_CLIENT_SECRET}",
        "GOOGLE_ADS_REFRESH_TOKEN": "${GOOGLE_ADS_REFRESH_TOKEN}"
      }
    }
  }
}
```

---

## Os 6 Agentes de Negócio com Maior Demanda

| # | Agente | O que faz | Skill |
|---|--------|-----------|-------|
| 1 | Auditoria de Ads | Analisa conta Google/Meta, gera relatório de oportunidades | `/ads-audit` |
| 2 | Conteúdo Instagram | Carrosséis, captions, hashtags com identidade da marca | `/content-creator` |
| 3 | Relatório Semanal | Coleta dados de múltiplas plataformas, resumo executivo | `/ads-audit` |
| 4 | Qualificação de Leads | Triagem e segmentação automática no CRM | `/agentes-ia` |
| 5 | SEO | Audit, geração de artigos, meta-dados | (manual) |
| 6 | Monitoramento de Concorrentes | Rastreia anúncios e conteúdo semanalmente | `/ads-audit` |

---

## Casos Reais (benchmarks para precificação)

| Quem | O que faz | Resultado |
|------|-----------|-----------|
| RSL/A | 2 pessoas, Claude como 3º funcionário, 9 MCPs | 3× output, <R$1.140/mês de custo |
| Prime Pixel Digital | Auditoria SEO com Claude | Custo R$11 em API → cobra R$2.850–R$11.400 |
| Consultor anônimo | 15 agentes go-to-market B2B | R$12.000/deliverable, preços 4× |
| Anuj (Medium) | Solo + contractors estratégicos | R$171.000/mês, margem 70% |

---

## Modelo de Negócio

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

## Ganhos de Produtividade (RSL/A — dados reais)

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
