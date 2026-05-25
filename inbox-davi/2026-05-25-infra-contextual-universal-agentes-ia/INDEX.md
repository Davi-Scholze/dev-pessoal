# Inbox 2026-05-25 — Infraestrutura Contextual Universal pra IA (agentes)

## Origem
Documento estratégico colado pelo Davi em 2026-05-25 sessão pós-faxina + log-rotation.
Define KOD.AI como **sistema operacional contextual universal** pra qualquer IA (Claude, Gemini, Codex, ChatGPT, NotebookLM, copilots) ajudar usuários a construir agentes do nível 1 (chatbot) ao nível 5 (AI-First Business OS).

Arquivo original mantido em `../Infraestrutura Contextual Universal para IA.md` (raiz pasta-mãe — Davi vai mover quando achar lugar canônico).

Vídeo de estudo paralelo: https://youtu.be/w0H1-b044KY?si=Jfnh_L5TPBut_6nA (Davi assistindo enquanto IA absorve)
NotebookLM vinculado: https://notebooklm.google.com/notebook/10eac452-7fc8-412d-ae63-909293f198bd

## Conteúdo principal (15 seções)

1. Visão — KOD.AI não é produto, é OS contextual pra IA
2. Pirâmide de complexidade (5 níveis) + 6 blocos fundamentais
3. Frameworks 2025/2026 — LangGraph, CrewAI, OpenAI Agents SDK, PydanticAI, Agno, AutoGen, Semantic Kernel
4. Memória operacional — Mem0 + LangMem + 4 tipos (episódica, semântica, procedural, declarativa)
5. Vector DBs + RAG — Weaviate, Pinecone, Supabase pgvector + 4 padrões RAG
6. Orquestração — n8n + Temporal + 5 padrões multi-agent (supervisor, peer-to-peer, hierarchical, pipeline, debate)
7. MCP — Model Context Protocol como "USB-C para IA"
8. Stacks de referência — mínimo viável / avançado multi-agent / AI-First SaaS
9. Modelo de negócio — 3 tiers (R$ 2-5k / R$ 8-15k / R$ 25-60k setup)
10. Jornada SaaS — Agência → Vertical → Plataforma → AI OS
11. Context Engineering — 7 pilares + 5 patterns de injection
12. Padrões prontos — Customer Support, Research Pipeline, Sales CRM, Business Monitor
13. Roadmap 4 sprints — Fundação → Operação → Multi-Agent → AI-First
14. Referências oficiais (15 links)
15. Glossário operacional (20 termos)

## Status de absorção

| Item | Status |
|---|---|
| Cópia bruta SOURCE.md | ✓ |
| NotebookLM ativado | ⏳ /ativar-notebooklm |
| Contexto-domínio KODAI | ⏳ criar `agentes-ia-construcao` upstream |
| 6 packs STUB upstream | ⏳ criar `ia/agentes-*` |
| Skill `/criar-agente` | ⏳ criar wizard |
| Perfil `agentes-builder` | ⏳ criar |
| Spec formal | ⏳ docs/decisoes/2026-05-25_kodai-infra-agentes-ia-universal.md |
| AGENTS.md upstream | ⏳ atualizar referenciando visão |
| Vídeo YouTube absorvido | ⏳ próxima sessão via /absorver-midia |

## Alinhamento com KOD.AI atual

Boa parte da fundação conceitual JÁ EXISTE:
- `politicas/portabilidade-orquestracao-24-7.md` — antecipa skill→agent via `runtime:` no manifest
- `politicas/memoria-3-tier.md` — alinhada com Mem0/LangMem (Core/Recall/Archival)
- `politicas/handoff-contracts.md` — alinhada com handoffs OpenAI Agents SDK
- `politicas/squad-3-tier.md` — alinhada com supervisor/peer-to-peer/hierarchical
- `politicas/quality-gates-com-critic-grounding.md` — alinhada com guardrails
- `politicas/event-log-ndjson.md` + `log-rotation.md` (criado hoje) — fundação pra observability

Esta implementação **materializa** essa fundação em packs/contexto/skill/perfil concretos.

## Próximos passos (ordem)

1. [HOJE] Capturar bruto + ativar NotebookLM + criar contexto-domínio + 6 packs STUB + skill + perfil + spec + commit upstream
2. [PRÓXIMA SESSÃO] `/absorver-midia <video-youtube>` pra capturar refinamentos do vídeo
3. [APÓS USO REAL] Promover packs DRAFT → FUNCIONAL com Evidence Bloc do primeiro agente construído
