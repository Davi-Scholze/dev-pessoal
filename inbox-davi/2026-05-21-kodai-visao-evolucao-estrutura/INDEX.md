---
tipo: inbox-bruto
data: 2026-05-21
origem: docs escritos por Davi Scholze
status: bruto-sagrado
relacionado:
  - "../../KODAI/docs/decisoes/2026-05-20_aberto-objetivo-longo-prazo-kodai.md (frente estrela polar)"
  - "../../KODAI/docs/decisoes/2026-05-20_aberto-contexto-profundo.md (frente arquitetural)"
  - "../../KODAI/docs/STRATEGIC-NORTH.md"
---

# Bruto: 3 docs estratégicos KOD.AI escritos por Davi (2026-05-21)

> **Bruto sagrado** — não reescrever, não resumir. Material original do Davi. Promoção pra fluxo/spec/contexto KOD.AI só com OK explícito + sessão dedicada (CLAUDE.md regra 2).

## Os 3 docs

1. **`Ecossistema de Parceiros — Visão Estratégica KOD.AI.md`**
   - Visão de longo prazo: KOD.AI como ecossistema operacional SMB IA-first
   - 2 tipos de parceiros (universais: contabilidade/jurídico/pagamentos vs nicho: kimonos/escolas/clínicas)
   - KOD.AI como hub operacional / camada de integração / sistema operacional empresarial modular
   - **Encaixa em:** frente aberta `aberto-objetivo-longo-prazo-kodai.md` (estrela polar 3/5/10 anos)

2. **`Evolução Viva de Contexto — Arquitetura de Aprendizado do KOD.AI.md`**
   - Visão de aprendizado contínuo: KOD.AI Core + Instâncias Empresariais + Sistema de Evolução
   - Conceito **candidate-to-core** — gate de curadoria antes de incorporar
   - Git como sistema de evolução de conhecimento (não só código)
   - Closed Loop Evolution: pesquisa → uso real → validação → refinamento → curadoria → core → distribuição
   - **Encaixa em:** frente aberta `aberto-contexto-profundo.md` + política `memoria-3-tier` recém-absorvida

3. **`Evolução Estrutural do KOD.AI — Infraestrutura Viva de Contexto para IA.md`**
   - Visão arquitetural: Context Operating System + Knowledge Infrastructure + AI Context Engineering Platform
   - 20 pontos de análise pedidos ao agente (gargalos, lineage, candidate-to-core, knowledge graph, embeddings, semantic search)
   - Status canônicos: STUB/DRAFT/FUNCIONAL/BATTLE-TESTED/PARKED (já adotado em manifests)
   - Futuro híbrido: Git + Markdown + DB Contextual + Embeddings + Knowledge Graph + Context Loading Engine
   - Curto prazo: avalia Obsidian pra graph thinking sem acoplar futuro
   - Longo prazo: sistema contextual próprio, graph engine, vector DB, semantic ranking, lineage engine
   - **Encaixa em:** frente aberta `aberto-contexto-profundo.md` (junto com #2)

## Padrão emergente nos 3

Davi convergiu em **3 conceitos que ainda não estão formalizados no KOD.AI**:

| Conceito | Status KOD.AI atual | Spec proposta |
|---|---|---|
| **Candidate-to-core** | Não existe — `/upstream-update` é o caminho atual, mas sem camada intermediária de curadoria | Spec dedicada — gate entre `/auditar-projeto` → `/upstream-update` |
| **Lineage / contexto pai-filho** | Não existe — manifests têm `version` mas não `parent`/`derives_from` | Spec — estender YAML manifest com campos lineage |
| **Closed Loop Evolution** | Parcial — Evidence Bloc captura validação, mas não há refinamento sistemático | Spec — workflow `/refinar-contexto` ou política `reflexao-por-skill` extendida |

## Cruzamento com material upstream recém-absorvido

A absorção de 2026-05-20 (framework MIT vendas IA) trouxe 8 políticas que **conversam direto** com a visão de Davi:

- `memoria-3-tier.md` (Core/Recall/Archival) ↔ visão de "infraestrutura viva de contexto"
- `handoff-contracts.md` ↔ `candidate-to-core` (gate de validação)
- `reflexion-per-skill.md` ↔ "Closed Loop Evolution" do doc #2
- `quality-gates-com-critic-grounding.md` ↔ "curadoria humana" do doc #2

## Próximos passos sugeridos

1. **Davi confirma** que esses docs viraram a base da estrela polar KOD.AI
2. `/brainstorming` da arquitetura "candidate-to-core + lineage + closed loop" — destila spec executável
3. Mover frentes abertas `aberto-objetivo-longo-prazo-kodai.md` e `aberto-contexto-profundo.md` de `aberto` pra `ready-for-spec`
4. Avaliar pack STUB `2-PACKS/packs/ia/contexto-profundo/` (já criado) à luz desses docs

## Decisões pendentes (precisam Davi)

- [ ] Esses 3 docs são autoritativos pra estrela polar? (default: sim, até dizer o contrário)
- [ ] Aproveitar agora pra `/brainstorming` ou guardar pra sessão dedicada?
- [ ] Obsidian sim/não pra curto prazo (doc #3 menciona como exploração)
