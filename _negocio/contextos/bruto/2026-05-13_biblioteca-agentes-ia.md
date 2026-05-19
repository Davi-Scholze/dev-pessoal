# Contexto Bruto — Biblioteca de Agentes de IA
> Recebido em: 2026-05-13
> Status: BRUTO — não processar sem aprovação explícita
> Origem: onboarding de conhecimento enviado pelo Davi na sessão de 2026-05-13
> Aplicável a: todos os projetos

---

# A. AGENTES PRONTOS (líderes de mercado 2025–2026)

1. **Claude Code** (Anthropic) — agente de programação no terminal. npm install -g @anthropic-ai/claude-code
2. **ChatGPT Agent Mode / Codex** (OpenAI) — navega web, executa código, manipula arquivos. Sem instalação.
3. **Devin 2.0** (Cognition AI) — engenheiro autônomo colaborativo. app.devin.ai (~US$20+/mês). Bom para tarefas longas e PRs completos.
4. **Manus** (Manus AI) — agente generalista, pesquisa profunda, decks, planilhas, automação. manus.im
5. **Microsoft 365 Copilot + Copilot Studio** — padrão corporativo, toca SharePoint/Teams/Outlook/Dynamics.
6. **Salesforce Agentforce** — líder em CRM/atendimento/vendas em grandes empresas.
7. **Google Gemini Enterprise + Vertex AI Agent Engine** — integrado ao Workspace e Vertex AI.
8. **Replit Agent / Lovable / Bolt.new / v0 (Vercel) / Cursor** — constroem apps web completas a partir de prompts.
9. **Perplexity + Perplexity Comet** — agente de pesquisa/navegação, substitui parte do Google.
10. **Outros:** Taskade Genesis, Arahi AI, FwdSlash, Blaxel, Zapier Agents, n8n AI Agents.

---

# B. FRAMEWORKS PARA CONSTRUIR AGENTES PRÓPRIOS

| Framework | Instalação | Quando usar |
|-----------|-----------|-------------|
| LangGraph | pip install -U langgraph langchain langchain-openai | Produção séria, fluxos com estado, HITL |
| CrewAI | pip install crewai crewai-tools | Multi-agente rápido por papéis |
| AutoGen / AG2 (MS) | pip install "autogen-agentchat" "autogen-ext[openai]" | Conversa entre agentes |
| OpenAI Agents SDK | pip install openai-agents | Stack OpenAI puro, handoffs nativos |
| Google ADK | pip install google-adk | Stack Google/Gemini/Vertex |
| Semantic Kernel | pip install semantic-kernel | Empresas Microsoft, C#/Python |
| Pydantic AI | pip install pydantic-ai | Python tipado, FastAPI |
| LlamaIndex Agents | pip install llama-index | RAG pesado em documentos |
| Mastra (TypeScript) | npm install @mastra/core | Times JS/TS, Node |
| Dify / Flowise / n8n | Self-host via Docker | No-code/low-code visual |

**Protocolo padrão:** MCP (Model Context Protocol, Anthropic) — "USB-C dos agentes". Suportado por Claude, ChatGPT, Gemini e todos os frameworks acima.

---

# C. PADRÕES DE ARQUITETURA

- **ReAct** — loop pensar→agir→observar. Base de tudo.
- **Plan-and-Execute / Plan-Reflect** — planejador → executor → crítico (Devin, Manus).
- **Multi-agente por papéis** — pesquisador + escritor + revisor (CrewAI).
- **RAG agêntico** — agente decide quando/o-que buscar na base vetorial.
- **HITL com checkpoints** — interrupt_before em ações irreversíveis (LangGraph nativo).
- **Tool use tipado** — schemas Pydantic/Zod em toda ferramenta. Reduz alucinação.
- **Memória em camadas** — curto prazo (conversa), trabalho (scratchpad), longo prazo (vetorial).
- **Subagentes / handoffs** — especialistas que se passam controle.
- **Guardrails** — validação de PII, toxicidade, jailbreak, formato.
- **Observabilidade** — LangSmith, Langfuse, Arize, Helicone.
- **Avaliação contínua** — dataset de regressão com 20–50 casos.

---

# D. RECEITA NÍVEL MUNDIAL — PRIMEIRO AGENTE

1. Defina UMA tarefa estreita e profunda
2. Modele como grafo de estados explícitos (LangGraph)
3. Ferramentas via MCP sempre que existir servidor pronto
4. Schemas tipados para entrada/saída de toda ferramenta
5. Checkpointer persistente (SQLite/Postgres) desde o dia 1
6. Nó de reflexão antes de finalizar (auto-crítica)
7. HITL em ações irreversíveis (gastar dinheiro, deploy, e-mail)
8. Tracing ligado desde o primeiro commit (LangSmith/Langfuse)
9. Dataset de avaliação automatizada antes de mexer em prompt/modelo
10. Comece estreito → expanda escopo só após confiabilidade
