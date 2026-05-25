---
name: seo
description: >
  Orquestrador SEO completo em 8 passos pra cliente SMB BR. 1) pesquisa de
  demanda + intenção; 2) análise de concorrência (top 10 SERP); 3) Google
  Business / GMB (perfil + categorias + serviços + posts); 4) on-page audit
  (técnico + conteúdo); 5) estratégia de conteúdo (clusters + calendário); 6)
  Google Ads briefing (alimenta /anuncio-google); 7) checklist de implementação
  priorizado; 8) GEO/AI-search (citação por LLMs + structured data). Output_dir
  carimbado por data. Use quando disser "auditar SEO", "estratégia SEO completa",
  "/seo", "posicionar site no Google".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - WebSearch
  - WebFetch
  - AskUserQuestion
---

# Skill: `/seo`

Pipeline SEO completo — **8 passos** — produzindo plano executável + briefing pra Google Ads + checklist priorizado.

## Princípio

> **SEO é orquestração, não tática isolada.** Não adianta "fazer on-page" sem pesquisa de demanda. Não adianta "rodar Ads" sem entender SERP. A skill produz 8 artefatos que se alimentam em cascata.

## Quando disparar

- "/seo [cliente_slug]"
- "auditar SEO do <cliente>"
- "estratégia SEO completa"
- "posicionar site no Google"
- "como aparecer no Google pra <termo>"

## Dependências

| Recurso | Onde |
|---|---|
| Briefing cliente | `_negocio/clientes/<slug>/briefing.md` (gerado por `/novo-projeto` A9) |
| Site/landing URL | obrigatório (próprio cliente ou concorrente referência) |
| Região + nicho | obrigatório (define escopo SERP) |
| Output | `_negocio/clientes/<slug>/marketing/seo/<YYYY-MM-DD>/` |

## Workflow 8 passos

### Passo 1 — Pesquisa de demanda + intenção

**Input:** nicho + região + serviços/produtos do briefing.

**Processo:**
1. Brainstorm 50-100 termos-semente (mistura: termos do briefing + sinônimos + variações regionais)
2. WebSearch pra cada cluster (sinais de volume: autocomplete Google, "pesquisas relacionadas", "People Also Ask")
3. Classificar intenção:
   - **Transacional** — "comprar X", "contratar X", "X em <cidade>" (alta conversão)
   - **Comercial** — "melhor X", "X vs Y", "X com preço" (média conversão)
   - **Informacional** — "como fazer X", "o que é X" (top of funnel — conteúdo, não Ads)
   - **Navegacional** — "<marca>" (não atacar)
4. Priorizar **top 20** (mix de intenção comercial + transacional, com volume razoável e concorrência viável)

**Output:** `01-pesquisa-demanda.md` (50-100 termos classificados + top 20 priorizados)

### Passo 2 — Análise de concorrência (top 10 SERP)

**Input:** top 10 termos priorizados (Passo 1).

**Processo:**
1. WebSearch cada termo → coletar top 10 resultados orgânicos + 3 Ads + Maps pack (se local)
2. Pra cada top 3 da SERP: WebFetch landing → catalogar (título, meta, h1, palavras totais, autoridade aparente, schema markup)
3. Identificar **gaps**:
   - Termos onde concorrentes são fracos (low DA, conteúdo raso)
   - Formatos ausentes (vídeo, FAQ, calculadora, tabela comparativa)
   - Long-tail não atacadas

**Output:** `02-concorrencia-serp.md` (top 10 SERP por termo + gaps explorável)

### Passo 3 — Google Business / GMB

**Input:** dados do briefing (endereço, telefone, horário, fotos).

**Processo:**
1. Checklist do perfil GMB ideal:
   - Categorias (1 principal + 4-9 secundárias)
   - Serviços catalogados (cada um com descrição 200-300 char)
   - Descrição da empresa (≤750 char, com keywords naturais)
   - Atributos (delivery, Wi-Fi, acessibilidade, pagamento etc — conforme nicho)
   - Fotos (mín 10: fachada/equipe/produto/ambiente)
   - Horário comercial + horários especiais (feriados)
   - Posts (frequência ideal: 1/semana, formato evento/oferta/novidade)
2. Estratégia de **reviews**:
   - Meta: 5-10 reviews novos/mês
   - Canal de pedido (após-venda WhatsApp + QR Code no balcão)
   - Política de resposta (responder 100% em <24h)

**Output:** `03-gmb-checklist.md` (perfil completo + roteiro de posts 8 semanas + política reviews)

### Passo 4 — Audit on-page (técnico + conteúdo)

**Input:** URL do site cliente.

**Processo:**
1. **Técnico** (WebFetch + análise manual):
   - HTTPS + redirect 301 corretos
   - Sitemap.xml acessível
   - robots.txt sem bloqueio indevido
   - Velocidade aparente (Lighthouse referência — não rodar, indicar comando)
   - Mobile-first (3 viewports — referência [[responsividade-mobile-first]])
   - Schema.org markup (LocalBusiness, Service, FAQPage, Product conforme nicho)
2. **Conteúdo** (página por página, top 5 páginas):
   - Title tag (≤60 char, keyword + diferencial + CTA)
   - Meta description (≤155 char, keyword + benefício + CTA)
   - H1 único + keyword principal
   - H2/H3 hierárquicos
   - Densidade keyword 0.5-2.5% (sem stuffing)
   - Alt text em imagens
   - Links internos (anchor descritiva)
   - CTAs claros (acima da dobra mobile)

**Output:** `04-onpage-audit.md` (técnico + conteúdo página-a-página + lista de correções priorizadas)

### Passo 5 — Estratégia de conteúdo (clusters + calendário)

**Input:** top 20 termos (Passo 1) + gaps (Passo 2).

**Processo:**
1. Agrupar termos em **clusters** (3-7 clusters típicos):
   - Cluster pillar (página core, ex: "/servicos/fornecimento-papelaria")
   - Cluster spokes (artigos blog que linkam pra pillar)
2. Calendário 12 semanas (1 artigo/semana mín):
   - 60% spokes informacionais (top of funnel)
   - 30% comparativos comerciais ("X vs Y", "melhor X")
   - 10% transacional (LP de oferta / case)
3. Cada artigo: keyword principal + 2-3 secundárias + intenção + ângulo
4. Cross-linking entre artigos (mínimo 3 links internos por peça)

**Output:** `05-estrategia-conteudo.md` (clusters + calendário 12 semanas + ângulos por artigo)

### Passo 6 — Google Ads briefing (alimenta `/anuncio-google` A2)

**Input:** top 20 termos (Passo 1) + análise SERP Ads (Passo 2).

**Processo:**
1. Selecionar **8-12 termos** com **intenção transacional + comercial** (informacionais ficam pra conteúdo)
2. Sugerir orçamento mensal baseado em CPC aparente + tráfego projetado
3. Listar negativas globais (≥20 termos)
4. Sugerir extensões (sitelinks, callouts, structured snippets, location)
5. Linkar pra skill `/anuncio-google` (A2) com handoff pronto

**Output:** `06-google-ads.md` (briefing pronto pra `/anuncio-google` consumir)

### Passo 7 — Checklist de implementação priorizado

**Input:** todas as ações dos passos 3-6.

**Processo:**
1. Lista de tarefas com:
   - **Impacto** (alto / médio / baixo) — quanto move SERP/conversão
   - **Esforço** (1-2h / 1 dia / 1 semana)
   - **Bloqueio** (cliente / Davi / KOD.AI / dev)
2. Ordenar por matriz Impacto × Esforço (quick wins primeiro)
3. Agrupar em sprints de 2 semanas

**Output:** `07-checklist-implementacao.md` (sprint plan 8 semanas)

### Passo 8 — GEO / AI-search (citação por LLMs)

**Input:** todos os outputs acima.

**Processo:**
1. **Generative Engine Optimization (GEO):** preparar conteúdo pra ser citado por LLMs (ChatGPT, Perplexity, Claude, Google AI Overviews)
2. Checklist:
   - Schema.org rico (Organization + LocalBusiness + Service + FAQPage + Article)
   - Conteúdo estruturado (listas, tabelas, definições explícitas)
   - "Statement-of-fact" em primeira frase de cada seção
   - FAQs explícitos no final do artigo
   - Citações de fontes autoritativas (links externos pra .gov, .edu, sites oficiais)
   - Author bio + expertise sinalizada (E-E-A-T do Google)
3. Verificação manual periódica: perguntar nos LLMs ("qual o melhor X em <cidade>?") e ver se o cliente aparece

**Output:** `08-geo-ai-search.md` (checklist GEO + verificação trimestral)

## Output canônico

```
_negocio/clientes/<slug>/marketing/seo/<YYYY-MM-DD>/
├── 01-pesquisa-demanda.md
├── 02-concorrencia-serp.md
├── 03-gmb-checklist.md
├── 04-onpage-audit.md
├── 05-estrategia-conteudo.md
├── 06-google-ads.md           Alimenta /anuncio-google (A2)
├── 07-checklist-implementacao.md
├── 08-geo-ai-search.md
└── manifest.yaml
```

## Quality Gates

```yaml
quality_gates:
  - "Top 20 termos priorizados com intenção classificada (Passo 1)"
  - "Top 10 SERP analisada pra cada termo top 10 (Passo 2)"
  - "GMB checklist cobre 7 dimensões (categorias, serviços, descrição, atributos, fotos, horário, posts)"
  - "On-page audit cobre 5 páginas mín (técnico + conteúdo)"
  - "Estratégia conteúdo: mín 3 clusters + calendário 12 semanas"
  - "Google Ads briefing: 8-12 termos transacional/comercial + ≥20 negativas"
  - "Checklist priorizado em matriz impacto × esforço"
  - "GEO checklist com Schema.org + FAQs + E-E-A-T"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Só on-page sem pesquisa demanda | Otimiza pra termos que ninguém busca | Passo 1 sempre primeiro |
| Concorrência genérica ("Compete com Magazine Luiza") | Comparação inútil | Top 10 da SERP local + nicho exato |
| GMB ignorado em negócio local | Perde 40-60% da busca | Passo 3 obrigatório em local-business |
| "Vamos rodar Ads" sem SEO base | Custo alto sem orgânico = bidding war | Ads em paralelo com conteúdo, não substituto |
| Calendário sem cross-linking | SEO mais fraco; site fica como lista de posts | Mín 3 links internos por artigo |
| Esquecer GEO | LLMs viram tráfego dominante 2026+ | Passo 8 obrigatório |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "Passo 6 concluído + cliente vai rodar Ads"
    skill: anuncio-google
    razao: "Briefing pronto pra gerar CSV Ads Editor"
  - condicao: "Passo 5 concluído + cliente vai produzir conteúdo recorrente"
    skill: publicar-tema
    razao: "Cada tema do calendário vira pacote multi-formato"
  - condicao: "Passo 4 detectou problemas técnicos (não-mobile / sem schema)"
    skill: mapear-concorrente
    razao: "Aprofundar gap analysis técnico"

requires_skills_anteriores:
  - condicao: "cliente novo + sem briefing"
    skill: novo-projeto
    razao: "Pasta cliente + briefing antes de SEO"
```

## Limitações honestas

- **Pesquisa de demanda usa WebSearch + heurísticas** — não tem volume Keyword Planner real
- **Análise SERP é snapshot** — SERP muda diariamente; refazer trimestralmente
- **GMB requer acesso do cliente** — KOD.AI gera checklist, cliente executa no Google Business
- **On-page audit é manual** — não roda Lighthouse/Screaming Frog ainda (futuro pack `seo-audit-tools`)
- **GEO ainda evolui rápido** — checklist atual baseado em padrões públicos 2025-2026; revalidar 6/6 meses
- **Não substitui SEO consultor sênior** em mercados muito competitivos (top 3 nacional)

## Origem

Frente A10 do plano 16 frentes Davi 2026-05-22. Padrão observado em metodologias públicas SEO (Backlinko, Ahrefs blog, Moz Beginner's Guide, Google Search Central) — re-implementação universalizada:
- **Conceitos públicos:** intent classification, SERP analysis, content clusters, pillar-and-spoke, E-E-A-T, schema.org, GEO/AEO
- **Vocabulário:** todos termos públicos da indústria SEO
- **Marca NÃO usada:** zero referência a "Mazzeo IA" / "MazyOS" / outras

Skill base pra **pacote-padrão Davi** Pilar 2 — Google Power (orquestrador que alimenta `/anuncio-google` A2).
