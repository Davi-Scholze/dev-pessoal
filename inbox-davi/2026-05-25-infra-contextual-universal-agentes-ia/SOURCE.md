# KOD.AI — Infraestrutura Contextual Universal para IA
## Base de Conhecimento Global: Agentes, Sistemas Operacionais IA-First, SaaS e Operação Empresarial

---

## 1. VISÃO GERAL

O KOD.AI é uma infraestrutura contextual universal que permite que qualquer IA
(Claude, Gemini, Codex, ChatGPT, NotebookLM, copilots e agentes) ajude usuários
a construir, operar e evoluir sistemas empresariais inteligentes.

**Não é um produto. É um sistema operacional contextual para IA.**

Tudo que um cliente precisa — agentes, workflows, memória, CRM, analytics,
automação — pode ser construído progressivamente sobre essa base.

---

## 2. VISÃO ARQUITETURAL — O Stack de Agentes IA em 2025/2026

### 2.1 A Pirâmide de Complexidade
Nível 5: AI-First Business OS (CRM + Analytics + Automação integrados)
Nível 4: Multi-Agent Systems (Orchestration + Crews + Pipelines autônomos)
Nível 3: Agentes Operacionais (Memória persistente + Tools + RAG)
Nível 2: Agentes Simples (LLM + Tools básicas + Context window)
Nível 1: Chatbots/Assistentes (Prompt + Response)

### 2.2 Os 6 Blocos Fundamentais de Qualquer Sistema de Agentes

**BLOCO 1 — LLM CORE (O Cérebro)**
- Modelos: GPT-4o/4.1, Claude Sonnet/Opus, Gemini 2.5, DeepSeek, Llama
- Gateway unificado: LiteLLM (100+ LLMs em formato OpenAI)
- Pattern: sempre abstrair o provider para ser model-agnostic

**BLOCO 2 — TOOLS & INTEGRATIONS (Os Braços)**
- Function calling / Tool use (OpenAI, Anthropic)
- MCP — Model Context Protocol (padrão Anthropic para conexão universal)
- Tipos: web search, code execution, APIs externas, database queries, file ops
- Frameworks: OpenAI Agents SDK tools, LangChain tools, CrewAI tools

**BLOCO 3 — MEMORY & CONTEXT (A Memória)**
- Short-term: context window da conversa ativa
- Long-term: Mem0 (universal memory layer), LangMem (LangGraph-native)
- Episodic: histórico de sessões (Redis, Postgres)
- Semantic: vector embeddings (Pinecone, Weaviate, Supabase pgvector)
- Entity linking: extração e linkagem de entidades entre memórias

**BLOCO 4 — ORCHESTRATION (O Sistema Nervoso)**
- Single-agent: ReAct loop, Chain of Thought
- Multi-agent: LangGraph (graphs), CrewAI (crews/flows), AutoGen (multi-actor)
- Workflows: n8n (visual + AI-native, 400+ integrações), Temporal (durable execution)
- Padrões: supervisor, peer-to-peer, hierarchical, pipeline

**BLOCO 5 — RAG & KNOWLEDGE (A Base de Dados Contextual)**
- Retrieval-Augmented Generation: busca semântica + geração
- Vector databases: Weaviate, Pinecone, Supabase pgvector, Qdrant
- Hybrid search: semântico (embeddings) + keyword (BM25) + entity
- Knowledge graphs: para contexto relacional complexo
- Document processing: LlamaIndex, LlamaParse (130+ formatos)

**BLOCO 6 — INFRA & DEPLOYMENT (O Corpo)**
- Backend: Supabase (Postgres + Auth + Realtime + Storage + Edge Functions)
- Durable execution: Temporal (agentes que sobrevivem a falhas)
- Streaming: SSE, WebSockets para UX em tempo real
- Observability: LangSmith, Pydantic Logfire, OpenTelemetry
- Deployment: Docker, Railway, AWS, GCP, Vercel

---

## 3. FRAMEWORKS — MAPA COMPLETO 2025/2026

### 3.1 Orquestração de Agentes

| Framework | Uso Principal | Complexidade | Stars |
|---|---|---|---|
| LangGraph | Multi-agent stateful, production | Alta | 50k+ |
| CrewAI | Multi-agent collaborative teams | Média | 30k+ |
| OpenAI Agents SDK | Handoffs + guardrails, OpenAI-native | Baixa-Média | 25k+ |
| PydanticAI | Type-safe, FastAPI-like feel | Média | 15k+ |
| Agno | Platform + ops + multi-framework | Alta | 10k+ |
| AutoGen/MS Agent | Enterprise multi-agent | Alta | 45k+ |
| Semantic Kernel | .NET + Python enterprise | Alta | 25k+ |
| Vercel AI SDK | TypeScript/React frontend | Média | 15k+ |

### 3.2 LangGraph — O Framework de Referência para Produção

**Por que LangGraph lidera:**
- Usado por Klarna, Replit, Elastic em produção
- Primitivos de baixo nível = customização total
- State management nativo (GraphState)
- Human-in-the-loop built-in
- Memory store nativo + LangMem
- Streaming token-by-token nativo
- LangSmith para debug/observability
- Durable execution via LangSmith Deployment

**Arquitetura básica LangGraph:**
```python
from langgraph.graph import StateGraph, END

def agent_node(state): ...  # chama LLM com tools
def tool_node(state): ...   # executa tools

graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)
graph.add_conditional_edges("agent", should_continue)
graph.add_edge("tools", "agent")
app = graph.compile(checkpointer=MemorySaver())
```

### 3.3 CrewAI — Times Autônomos para Tarefas Complexas

**Arquitetura CrewAI:**
- **Flows**: backbone da aplicação, event-driven, gerencia estado
- **Crews**: times de agentes autônomos com roles específicos
- **Agents**: LLM + instructions + tools + role + goal
- **Tasks**: unidades de trabalho com output esperado

**Quando usar:** research pipelines, content generation teams, análise multi-perspectiva

### 3.4 OpenAI Agents SDK — Handoffs e Guardrails

**Conceitos chave:**
- Agents como ferramentas de outros agentes (AgentTool)
- Handoffs: delegação entre agentes especializados
- Guardrails: validação de input/output
- Sessions: histórico automático de conversas
- Tracing: built-in para debug

### 3.5 PydanticAI — Framework Type-Safe

**Diferenciais:**
- Output estruturado garantido com Pydantic validation
- Dependency injection (contexto tipado para tools e instructions)
- Suporte a todos os principais providers
- MCP, A2A e UI event streams integrados
- Durable execution para workflows longos
- "FastAPI feeling" para GenAI

---

## 4. MEMÓRIA OPERACIONAL — O Diferencial Competitivo

### 4.1 Tipos de Memória
MEMÓRIA EPISÓDICA    → O que aconteceu nessa conversa?
MEMÓRIA SEMÂNTICA    → O que o usuário/empresa sabe?
MEMÓRIA PROCEDURAL   → Como executar determinada tarefa?
MEMÓRIA DECLARATIVA  → Fatos e dados estruturados

### 4.2 Mem0 — Universal Memory Layer

**Estado da arte (benchmarks 2026):**
- LoCoMo: 91.6 (+20 pts sobre algoritmo anterior)
- LongMemEval: 94.8 (+27 pts, +53.6 em assistant memory recall)
- BEAM 1M tokens: 64.1

**Funcionamento:**
1. Extração de fatos relevantes de conversas (single-pass, sem UPDATE/DELETE)
2. Entity linking — entidades extraídas, embedded e linkadas
3. Multi-signal retrieval: semântico + BM25 keyword + entity matching
4. Temporal reasoning: ranking por data e relevância temporal

**Integração:**
```python
from mem0 import Memory
memory = Memory()
memory.add(messages, user_id="cliente_123")
results = memory.search(query, filters={"user_id": "cliente_123"})
```

### 4.3 LangMem — Memória Nativa LangGraph

**Modos:**
- **Hot path**: agente gerencia própria memória durante conversa ativa
- **Background**: memory manager extrai e consolida automaticamente em background

```python
from langmem import create_manage_memory_tool, create_search_memory_tool
tools = [create_manage_memory_tool(namespace=("memories",)),
         create_search_memory_tool(namespace=("memories",))]
agent = create_react_agent("anthropic:claude-3-5-sonnet-latest", tools=tools, store=store)
```

---

## 5. VECTOR DATABASES & RAG — Infraestrutura Semântica

### 5.1 Weaviate — Vector DB de Referência

**Capacidades:**
- Semântico + keyword (BM25) + hybrid search numa única query
- RAG integrado (generative search)
- Reranking built-in
- Multi-tenancy, replication, RBAC para enterprise
- Vectorizers automáticos (OpenAI, Cohere, HuggingFace)
- TTL por coleção (dados expiram automaticamente)

**Use cases:** RAG systems, semantic search, chatbots, recommendation engines

### 5.2 Pinecone — Vector DB Managed

**Posicionamento:** cloud-managed, zero-ops, enterprise-grade
**Ideal para:** startups que querem velocidade sem ops de infra

### 5.3 Supabase pgvector — Full-Stack + Vector

**Posicionamento:** Postgres + Vector + Auth + Storage + Edge Functions
**Ideal para:** aplicações full-stack que não querem infra separada
**Vantagem competitiva:** um só sistema para tudo — relacional + vetorial + auth

### 5.4 Padrões RAG Avançados
BÁSICO:      Query → Embed → Retrieval → LLM
HYBRID:      Query → Embed + BM25 → Rerank → LLM
AGENTIC RAG: Query → Agent decides retrieval strategy → Multi-source → LLM
GRAPH RAG:   Query → Knowledge Graph traversal → Contextual → LLM

---

## 6. ORQUESTRAÇÃO & WORKFLOWS — Automação Operacional

### 6.1 n8n — Plataforma de Automação AI-Native

**Posicionamento:** "Zapier para devs" com IA integrada
- 400+ integrações nativas
- AI Agent workflows baseados em LangChain
- Fair-code: self-host ou cloud
- Visual building + custom code (JS/Python)
- 900+ templates prontos
- SSO, advanced permissions para enterprise

**Modelo de venda:** Setup fee + mensalidade hospedagem + automações

### 6.2 Temporal — Durable Execution

**Problema que resolve:** agentes que falham no meio de workflows longos
**Solução:** workflows que sobrevivem a falhas, reiniciam do ponto exato
**Ideal para:** agentes que rodam por horas/dias, processos críticos de negócio
**Use cases AI:** agent workflows, AI pipelines de longa duração, processamento assíncrono

### 6.3 Padrões de Orchestration Multi-Agent
SUPERVISOR:    Um agente orquestra N agentes especializados
PEER-TO-PEER:  Agentes se comunicam diretamente (handoffs)
HIERARCHICAL:  Crews dentro de Flows, managers e workers
PIPELINE:      Output de um agente → input do próximo
DEBATE:        Múltiplos agentes discutem até consenso

---

## 7. MCP — MODEL CONTEXT PROTOCOL

### O Padrão Universal de Ferramentas

**O que é:** protocolo criado pela Anthropic para conectar IAs a qualquer fonte de dados ou ferramenta

**Analogia:** "USB-C para IA" — uma interface universal

**Por que importa para KOD.AI:**
- Claude, Codex, Cursor, Gemini, todos suportam MCP
- Permite criar servidores MCP que qualquer IA conecta
- Padroniza como agentes acessam: bancos de dados, APIs, arquivos, serviços

**Exemplos de MCP servers:** GitHub, Google Drive, Slack, Postgres, filesystem, Weaviate, Mem0

**Padrão de implementação:**
```typescript
// Servidor MCP simples
const server = new McpServer({ name: "meu-servico" });
server.tool("buscar_cliente", { query: z.string() }, async ({ query }) => {
  return { content: [{ type: "text", text: await db.search(query) }] };
});
```

---

## 8. STACKS MODERNAS — REFERÊNCIAS DE IMPLEMENTAÇÃO REAL

### 8.1 Stack Mínimo Viável para Agente Operacional
LLM:        Claude Sonnet ou GPT-4o (via LiteLLM)
Framework:  PydanticAI ou OpenAI Agents SDK
Memory:     Mem0 (managed) ou LangMem
Storage:    Supabase (Postgres + pgvector)
Tools:      MCP servers customizados
Deploy:     Railway ou Vercel (backend) + Docker

### 8.2 Stack Avançado para Multi-Agent System
LLM:           LiteLLM (model-agnostic gateway)
Orchestration: LangGraph (stateful graphs)
Crews:         CrewAI (collaborative teams)
Memory:        Mem0 + LangMem + Redis (session)
Vector DB:     Weaviate (hybrid search)
RAG:           LlamaIndex + LlamaParse
Workflows:     n8n (automações visuais)
Durable Exec:  Temporal (long-running)
Backend:       Supabase + Edge Functions
Observability: LangSmith + OpenTelemetry
Deploy:        Docker + GCP/AWS

### 8.3 Stack AI-First SaaS
Frontend:      Next.js + Vercel AI SDK (streaming UI)
Backend:       Supabase (tudo: DB, Auth, Storage, Functions)
AI Gateway:    LiteLLM Proxy (multi-provider, cost tracking)
Agents:        LangGraph (logic) + CrewAI (tasks)
Memory:        Mem0 (user personalization)
Search:        Weaviate (semantic) + Postgres (relacional)
Automação:     n8n (integrações)
Infra:         Railway + Cloudflare

---

## 9. VISÃO OPERACIONAL — COMO VENDER E OPERAR

### 9.1 O Modelo de Negócio KOD.AI

**Tier 1 — Agente Simples (Setup Rápido)**
- Chatbot inteligente com RAG sobre documentos do cliente
- Responde perguntas sobre produtos, políticas, FAQs
- Stack: LLM + Supabase + Mem0
- Preço: R$ 2.000-5.000 setup + R$ 500-800/mês
- Prazo: 1-2 semanas

**Tier 2 — Agente Operacional (Automação Real)**
- Agente que executa tarefas: qualifica leads, atualiza CRM, envia emails, gera relatórios
- Integrado a ferramentas existentes (HubSpot, Notion, Slack, Google Workspace)
- Stack: LangGraph + n8n + Mem0 + Supabase
- Preço: R$ 8.000-15.000 setup + R$ 1.500-3.000/mês
- Prazo: 3-4 semanas

**Tier 3 — Sistema Multi-Agent (Operação Completa)**
- Time de agentes: vendas, suporte, análise, operações
- Dashboard IA-first, analytics em tempo real, CRM inteligente
- Stack: LangGraph + CrewAI + Weaviate + Supabase + n8n + Temporal
- Preço: R$ 25.000-60.000 setup + R$ 5.000-15.000/mês
- Prazo: 6-12 semanas

### 9.2 Como Começar Simples (SMB)

**Semana 1-2:** Mapear processos do cliente, identificar 1 dor crítica
**Semana 3-4:** Agente simples com RAG sobre documentos do cliente
**Mês 2:** Adicionar memória de usuário + integrações básicas (Notion, email)
**Mês 3:** Automações de workflow (n8n) + notificações
**Mês 4+:** Expandir para multi-agent conforme valor gerado

### 9.3 Framework de Descoberta de Valor

Perguntas para qualquer cliente:
1. Qual processo consome mais tempo da sua equipe hoje?
2. Quais dados você tem mas não consegue usar bem?
3. Qual pergunta sua equipe responde 50x por semana?
4. O que você deixa de fazer por falta de tempo?
5. Onde seu cliente espera mais para ser respondido?

Cada resposta é um módulo de agente a ser construído.

---

## 10. VISÃO SAAS IA-FIRST — DO SETUP À PLATAFORMA

### 10.1 A Jornada do Setup ao SaaS
Fase 1: AGÊNCIA CUSTOMIZADA
→ Setup + mensalidade por cliente
→ Aprende padrões, dores comuns
→ Cria templates reutilizáveis
Fase 2: PRODUTO VERTICAL
→ Verticalize para 1 nicho (ex: clínicas, e-commerce, imobiliárias)
→ Onboarding padronizado (< 1 semana)
→ Multi-tenant na mesma infra
Fase 3: PLATAFORMA HORIZONTAL
→ Marketplace de agentes
→ Templates prontos para qualquer nicho
→ Usuário final configura sem código
Fase 4: AI OPERATING SYSTEM
→ Toda a operação da empresa roda sobre IA
→ Agentes autônomos com supervisão mínima
→ Auto-melhoria via feedback loops

### 10.2 Monetização Progressiva

**Modelo Agência:** Alto valor unitário, baixo volume, alta personalização
- Melhor para validar e construir IP

**Modelo Produto:** Médio valor, médio volume, onboarding eficiente
- Melhor para escalar com equipe pequena

**Modelo Plataforma:** Baixo valor unitário, alto volume, self-service
- Melhor depois de ter product-market fit claro

### 10.3 Multi-tenancy Architecture

```python
# Padrão Supabase RLS para multi-tenant
-- Row Level Security: cada tenant vê só seus dados
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON agents
USING (tenant_id = auth.jwt()->>'tenant_id');

# Padrão Weaviate multi-tenant
client.collections.create("AgentMemory",
  multi_tenancy_config=Configure.multi_tenancy(enabled=True))
collection.tenants.create([Tenant(name="cliente_xyz")])
```

---

## 11. CONTEXT ENGINEERING — A NOVA ENGENHARIA DE PROMPTS

### O que é Context Engineering

Context Engineering é a prática de projetar, gerenciar e evoluir o contexto que uma IA recebe para executar bem em sistemas de produção.

É a diferença entre um agente que parece inteligente e um agente que **opera** inteligentemente.

### Os 7 Pilares do Context Engineering

1. **System Context:** quem é o agente, seus objetivos, restrições e personalidade
2. **Operational Context:** o estado atual do negócio, dados em tempo real
3. **User Context:** histórico do usuário, preferências, comportamento passado (Mem0)
4. **Task Context:** o que precisa ser feito nessa sessão específica
5. **Tool Context:** quais ferramentas estão disponíveis e quando usar cada uma
6. **Business Context:** políticas, regras, SLAs, fluxos aprovados
7. **Feedback Context:** aprendizados de interações anteriores, erros cometidos

### Context Injection Patterns
STATIC:      Contexto fixo no system prompt (regras, persona)
DYNAMIC:     Contexto buscado em runtime (Mem0 search, RAG)
PROGRESSIVE: Contexto revelado conforme necessidade (progressive disclosure)
COMPRESSED:  Resumos de contexto longo para caber no window
STRUCTURED:  XML/JSON formatado para LLMs processarem melhor

### O Ciclo de Evolução Contextual
INTERAÇÃO → EXTRAÇÃO → CONSOLIDAÇÃO → INDEXAÇÃO → RETRIEVAL → MELHORIA
↑                                                              ↓
←←←←←←←←←← FEEDBACK LOOP CONTÍNUO ←←←←←←←←←←←←←←←←←←←←←←←←

---

## 12. PADRÕES ARQUITETURAIS — RECEITAS PRONTAS

### 12.1 Padrão: Customer Support Agent
Input: mensagem do cliente
→ Mem0.search(mensagem, user_id)  # busca histórico
→ RAG.search(mensagem)             # busca base de conhecimento
→ LLM(system + memories + docs + mensagem)
→ Mem0.add(conversa, user_id)     # salva nova memória
Output: resposta personalizada com contexto histórico

### 12.2 Padrão: Research Pipeline (CrewAI)
Flow: research_flow
Step 1: PlannerCrew
- ResearchPlannerAgent → define sub-questões
Step 2: ResearchCrew
- WebResearchAgent × N (paralelo)
- cada agente pesquisa 1 sub-questão
Step 3: SynthesisCrew
- AnalystAgent → consolida findings
- WriterAgent → produz relatório final
Flow: salva resultado no estado, notifica stakeholders

### 12.3 Padrão: Sales CRM Agent
Trigger: novo lead (webhook CRM)
→ Lead enrichment agent (busca web + LinkedIn)
→ Qualification agent (pontua lead por ICP)
→ if score > 7:
→ Personalization agent (cria abordagem customizada)
→ CRM update agent (atualiza HubSpot)
→ Notification agent (alerta vendedor via Slack)
→ else:
→ Nurturing agent (adiciona a sequência automatizada)
→ Mem0.add(interação, lead_id)

### 12.4 Padrão: Autonomous Business Monitor
Schedule: a cada 1h (Temporal workflow)
→ DataCollectionAgents (paralelo):

FinancialAgent: métricas de receita
OperationsAgent: tickets, SLA, churn
MarketingAgent: campanhas, CAC, leads
→ AnalysisAgent: anomalias e tendências
→ if anomalia_crítica:
→ AlertAgent → Slack/email CEO/CTO
→ RecommendationAgent → sugere ação
→ ReportAgent → dashboard IA-first (atualiza DB)
→ Mem0.add(análise, org_id)  # aprende padrões do negócio


---

## 13. ROADMAP PROGRESSIVO — IMPLEMENTAÇÃO KOD.AI

### Sprint 1 (Semana 1-2): Fundação

- [ ] Setup LiteLLM como AI gateway (model-agnostic)
- [ ] Setup Supabase (Postgres + pgvector + Auth)
- [ ] Agente simples com PydanticAI ou OpenAI Agents SDK
- [ ] Mem0 para memória básica de usuário
- [ ] RAG com documentos do cliente (Weaviate ou Supabase pgvector)

### Sprint 2 (Semana 3-4): Operação

- [ ] LangGraph para workflows stateful
- [ ] n8n para automações de integração
- [ ] MCP server para ferramentas customizadas
- [ ] LangSmith para observabilidade e debug
- [ ] Dashboard básico (Next.js + Vercel AI SDK)

### Sprint 3 (Mês 2): Multi-Agent

- [ ] CrewAI para times colaborativos de agentes
- [ ] Temporal para workflows de longa duração
- [ ] Weaviate com hybrid search avançado
- [ ] LangMem para memória contextual rica
- [ ] Multi-tenancy na infra (RLS + namespace isolation)

### Sprint 4 (Mês 3+): AI-First Platform

- [ ] Sistema de feedback loops automáticos
- [ ] Auto-melhoria de prompts via LangSmith evals
- [ ] CRM IA-first com contexto total do cliente
- [ ] Analytics em tempo real com agente interpretador
- [ ] Marketplace interno de templates de agentes

---

## 14. REFERÊNCIAS E LINKS ESSENCIAIS

### Documentações Oficiais
- LangGraph: https://www.langchain.com/langgraph + https://github.com/langchain-ai/langgraph
- CrewAI: https://docs.crewai.com/en/introduction
- OpenAI Agents SDK: https://github.com/openai/openai-agents-python
- PydanticAI: https://ai.pydantic.dev/
- AutoGen / MS Agent Framework: https://microsoft.github.io/autogen/stable/
- Semantic Kernel: https://github.com/microsoft/semantic-kernel
- LiteLLM: https://github.com/BerriAI/litellm
- Agno: https://github.com/agno-agi/agno
- Vercel AI SDK: https://github.com/vercel/ai

### Memória & Contexto
- Mem0: https://github.com/mem0ai/mem0 + https://docs.mem0.ai/
- LangMem: https://github.com/langchain-ai/langmem

### Vector Databases
- Weaviate: https://github.com/weaviate/weaviate
- Supabase: https://supabase.com/docs/guides/ai
- Pinecone: https://docs.pinecone.io/

### Workflows & Orchestration
- n8n: https://github.com/n8n-io/n8n + https://n8n.io/ai/
- Temporal: https://github.com/temporalio/temporal

### RAG & Knowledge
- LlamaIndex: https://github.com/run-llama/llama_index
- GPT Researcher: https://github.com/assafelovic/gpt-researcher

### Protocolos
- MCP: https://modelcontextprotocol.io/introduction

### NotebookLM KOD.AI
- https://notebooklm.google.com/notebook/10eac452-7fc8-412d-ae63-909293f198bd

---

## 15. GLOSSÁRIO OPERACIONAL

**Agent:** LLM + instructions + tools + memory + guardrails
**Crew:** time de agentes com roles colaborativos (CrewAI)
**Flow:** orquestrador event-driven que gerencia estado e chama crews (CrewAI)
**Graph:** estrutura de nós e arestas para controle de fluxo (LangGraph)
**Handoff:** delegação de uma tarefa de um agente para outro especialista
**RAG:** Retrieval-Augmented Generation — buscar docs relevantes antes de gerar
**MCP:** Model Context Protocol — padrão para conectar IAs a ferramentas/dados
**pgvector:** extensão Postgres para busca vetorial (embeddings)
**Embedding:** representação numérica de texto para busca semântica
**Durable Execution:** workflows que sobrevivem a falhas e reiniciam do ponto exato
**Human-in-the-loop:** checkpoint onde humano revisa/aprova antes de continuar
**Context Window:** limite de tokens que o LLM processa de uma vez
**System Prompt:** instruções base que definem comportamento do agente
**Tool Calling:** capacidade do LLM de invocar funções externas
**Orchestration:** coordenação de múltiplos agentes/sistemas para uma tarefa complexa
**Memory Store:** banco de dados de memórias persistentes do agente
**Semantic Search:** busca por significado (via embeddings), não por keywords exatas
**Hybrid Search:** semântico + keyword + entity matching combinados
**Multi-tenancy:** arquitetura onde múltiplos clientes compartilham infra com isolamento
**Feedback Loop:** ciclo onde outputs do agente melhoram seu comportamento futuro