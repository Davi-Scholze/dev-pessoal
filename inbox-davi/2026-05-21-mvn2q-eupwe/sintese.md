---
tipo: sintese-midia
data: 2026-05-21
video: https://youtu.be/mVN2Q_EUPwE
titulo: "Meu setup REAL de IA: Claude Code + OpenClaw + Mission Control (sem enfeite)"
autor: Kelvin Cleto
duracao_min: 15.8
absorvido_em: inbox-davi/2026-05-21-mvn2q-eupwe/
autoria: externa
---

# Síntese — Vídeo 2: Stack técnico Kelvin (Claude Code + OpenClaw + Mission Control + GSD)

## Narrativa

Kelvin mostra o setup técnico operacional dele: múltiplas instâncias de Claude Code rodando, OpenClaw como camada, Tenacity OS / Mission Control coordenando agentes, e biblioteca **GSD (Get Shit Done)** para gerenciamento de contexto + SDD.

Mostra que ele NÃO codifica do zero — pega código existente no GitHub e customiza com GSD pra colocar branding do cliente. Aponta para SDD (Spec Driven Development) como metodologia central pra evitar estouro de janela de contexto em projetos grandes.

Vira o vídeo para uma aula de negócio: "**20 trabalhos de R$1k = R$20k; 10 trabalhos de R$2k = mesmo R$20k**". Apresenta 3 modelos de venda (DFY/DWY/DIY) + as 6 alavancas de crescimento.

Termina denunciando o "estado da marmota" (paralisia analítica) e empurrando ação: "escolhe um nicho, sai vendendo".

## Decisões técnicas mapeadas

| Decisão | Detalhe |
|---|---|
| **Stack pessoal** | Claude Code + OpenClaw + Mission Control (Tenacity OS) + GSD |
| **GSD (Get Shit Done)** | Skill Claude que aplica SDD — gerencia contexto + spec |
| **SDD (Spec Driven Development)** | Metodologia central — software começa por especificação, não código |
| **Customizar > criar do zero** | Pega código GitHub + aplica GSD pra branding cliente |
| **Mission Control** | Coordena múltiplos agentes IA em missão única |

## Decisões comerciais mapeadas

| Decisão | Detalhe |
|---|---|
| **3 modelos de venda** | DFY (Done For You), DWY (Done With You), DIY (Do It Yourself) |
| **Fórmula de ticket** | 20 trabalhos × R$1k = 10 trabalhos × R$2k = R$20k |
| **6 alavancas de crescimento** | Oferta → Marketing → Vendas → Onboard → Entrega → Feedback (volta pra oferta) |
| **Ordem das alavancas** | Começar por **Oferta** (descobrir o que vender), NÃO por Entrega |
| **Antipattern: "estado da marmota"** | Paralisia analítica — ficar pensando "será que é SaaS, será que é micro-SaaS" |
| **Sai vendendo** | "Escolhe nicho que tem 20k+ players + muito retrabalho + dor de vendas" |

## Tópicos extraídos

`Claude Code`, `OpenClaw`, `Mission Control`, `Tenacity OS`, `GSD (Get Shit Done)`, `SDD (Spec Driven Development)`, `DFY DWY DIY`, `6 alavancas crescimento`, `estado da marmota`, `nicho 20k players`, `software começa pela especificação`

## Cruzamento com KOD.AI — VALIOSO ⭐

| Conceito Kelvin | Em KOD.AI |
|---|---|
| **SDD como base** | KOD.AI tem SDD como **regra inegociável** (`CLAUDE.md` regra 1: `/spec → /break → /plan → /execute → /review → /complete`) — **convergência total** |
| **GSD (skill Claude)** | KOD.AI faz isso via skills `/spec`, `/break`, `/plan` nativas. **Diferencial KODAI: governança Evidence Bloc + 12 regras-base + anti-pollution** |
| **3 modelos venda DFY/DWY/DIY** | Não existe formalizado no KODAI; vale criar pack/contexto `comercial/modelos-venda-ia` |
| **6 alavancas crescimento** | Não existe; pode virar contexto-domínio `business/alavancas-crescimento-saas` ou pack `marketing/funil-completo` |
| **Mission Control coord agentes** | KOD.AI tem squad-3-tier (Coordinator/Director/Employee) — política `squad-3-tier.md` recém-absorvida |
| **"Estado da marmota"** | Política KODAI já cobre via `escuta-antes-de-agir.md` + `verification-before-completion.md` |

## Sugestão de absorção

**`/absorver-contexto`** — múltiplas absorções possíveis:

1. **Pack novo `comercial/modelos-venda-ia`** (categoria comercial/ existente vazia) — DFY/DWY/DIY como padrão de produtização
2. **Contexto-domínio `business/alavancas-crescimento-saas`** ou estender o existente — as 6 alavancas
3. **Reforço em `politicas/escuta-antes-de-agir`** — antipattern "marmota" complementa

**Validação cruzada:** SDD do Kelvin = SDD do KOD.AI. Davi não está sozinho na intuição — metodologia tem aderência de mercado.

## Anti-pollution

- ❌ NÃO copiar frases verbatim (n-gram ≥5 anti-pollution check)
- ❌ "GSD" / "OpenClaw" / "Tenacity OS" são marcas — NÃO usar nos artefatos KODAI
- ❌ "Acelera 360" / "Kelvin Cleto" — só em atribuição
- ✓ Conceitos universais (SDD, DFY/DWY/DIY, 6 alavancas) — re-implementar com terminologia própria
- ✓ Convergência SDD valida direção KOD.AI

## Aprendizado destaque

**KOD.AI e Kelvin chegaram na mesma conclusão por caminhos diferentes:** SDD é a base. Isso aumenta confiança na estrela polar v1.2.

**Gap identificado:** KOD.AI não tem produtização comercial (DFY/DWY/DIY). É **lacuna estratégica** — F2/F3/F4 do Q&A diferiu isso, mas o concorrente já tem.
