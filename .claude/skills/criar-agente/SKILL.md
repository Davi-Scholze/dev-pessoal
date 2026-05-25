---
name: criar-agente
description: >
  Wizard universal pra criar agente IA do nível 1 (chatbot) ao 5 (AI-First
  Business OS). Faz entrevista curta (tier comercial + padrão + stack
  preferido) e gera scaffold inicial: pasta do agente + agent.py/agent.ts
  + manifest + .env template + integração com os 6 packs (LLM Core, Tools/MCP,
  Memory, Orchestration, RAG, Infra). Mapeia automaticamente pra um dos 4
  padrões prontos quando aplicável (Customer Support, Research Pipeline,
  Sales CRM, Business Monitor). Use sempre que disser "criar agente IA",
  "/criar-agente", "novo agente pra cliente X", "preciso de chatbot/agente
  pra Y", "como começo um agente", "wizard agente".
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
---

# Skill: `/criar-agente` — Wizard Universal de Agentes IA

> **Princípio:** "**Não é produto. É infraestrutura.**" Esta skill é o pontapé inicial — gera scaffold; refinamento real acontece nas próximas sessões via skills compositoras (`/spec`, `/break`, `/plan`, `/execute`, `/complete`).

## Contexto-domínio obrigatório

Ler antes de invocar: [`3-CONTEXTOS-DOMINIO/agentes-ia-construcao/DOMINIO.md`](../../../3-CONTEXTOS-DOMINIO/agentes-ia-construcao/DOMINIO.md)

## Workflow

### Passo 1 — Entrevista (4 perguntas via AskUserQuestion)

#### P1 — Tier comercial

> "Qual o tier do agente?"

- (1) **Agente Simples** — chatbot + RAG sobre docs (R$ 2-5k setup, 1-2 sem)
- (2) **Agente Operacional** — executa tarefas (lead, CRM, email) (R$ 8-15k setup, 3-4 sem)
- (3) **Multi-Agent System** — time completo + dashboard (R$ 25-60k setup, 6-12 sem)

#### P2 — Padrão pronto (se aplicável)

> "Encaixa em algum dos 4 padrões catalogados?"

- (A) **Customer Support** (atende cliente 24/7)
- (B) **Research Pipeline** (pesquisa profunda em horas)
- (C) **Sales CRM** (qualifica + atualiza CRM)
- (D) **Business Monitor** (saber o que tá acontecendo)
- (E) **Custom** (descrever em texto livre)

#### P3 — Stack base

> "Stack preferido?"

- (X) **Python** (PydanticAI / LangGraph / CrewAI — mais maduro pra agentes)
- (Y) **TypeScript** (Vercel AI SDK / OpenAI Agents SDK — frontend-first)
- (Z) **Híbrido** (Python backend + TS frontend — recomendado tier 3)

#### P4 — Cliente/projeto

> "Pra qual cliente/projeto? (nome curto, ex: 'denize-decon', 'dojo', 'cliente-novo')"

Texto livre → vira `<cliente_slug>`.

### Passo 2 — Decisão automática de packs ativados

Baseado nas respostas, ativar packs do upstream `KODAI/2-PACKS/packs/ia/agentes-*` por tier:

| Tier | Packs ativados |
|---|---|
| 1 | `agentes-llm-core` + `agentes-rag-knowledge` + `agentes-infra-deploy` |
| 2 | + `agentes-memory` + `agentes-tools-mcp` |
| 3 | + `agentes-orchestration` |

E padrão pronto sugere stack específico — registrado no manifest do agente.

### Passo 3 — Criar pasta do agente

Path: `agentes/<cliente_slug>/` na raiz do projeto consumidor (NÃO no upstream KODAI).

Estrutura criada:

```
agentes/<cliente_slug>/
├── README.md              ← brief (tier, padrão, stack, packs)
├── manifest.yaml          ← lineage v1 + handoff_in/out + quality_gates
├── agent.py OR agent.ts   ← scaffold inicial (template do padrão escolhido)
├── prompts/
│   ├── system.md          ← system prompt placeholder
│   └── tools.md           ← descrição de tools (a popular)
├── .env.example           ← chaves necessárias (LiteLLM, Mem0, Supabase)
├── tests/
│   └── smoke.py           ← teste mínimo "agente responde olá"
└── docs/
    └── briefing.md        ← briefing do cliente (preencher)
```

### Passo 4 — Gerar manifest.yaml com lineage v1

```yaml
name: agente-<cliente_slug>
tipo: agente
tier_comercial: 1 | 2 | 3
padrao: customer-support | research-pipeline | sales-crm | business-monitor | custom
stack: python | typescript | hibrido
status: STUB

packs_ativos:
  - ia/agentes-llm-core
  - ia/agentes-rag-knowledge
  - ia/agentes-infra-deploy
  # + condicionais por tier

handoff_in:
  expected: { input: text, user_id: string, session_id: string }

handoff_out:
  produces: { response: text, actions: array, memory_updates: array }

quality_gates:
  - schema_response: validated
  - latency_p95: < 5s
  - cost_per_interaction: < $0.05
  - safety_score: > 0.9

lineage:
  derives_from:
    - 3-CONTEXTOS-DOMINIO/agentes-ia-construcao
    - 2-PACKS/packs/ia/agentes-* (packs ativos)
  origin: /criar-agente em <data> pra cliente <slug>
  evidence: STUB — promoção pra FUNCIONAL após Evidence Bloc em produção

criterios_PASS_FUNCIONAL:
  - 30+ dias em produção
  - 100+ interações reais (não testes)
  - Métricas dentro de quality_gates
  - Evidence Bloc no docs/evidencias/
```

### Passo 5 — Gerar scaffold do código

Template depende do padrão escolhido. Exemplos:

**Tier 1 + Customer Support + Python:**

```python
# agent.py
from litellm import completion
from mem0 import Memory
from supabase import create_client

memory = Memory()
supabase = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])

def responder(mensagem: str, user_id: str) -> str:
    historico = memory.search(mensagem, filters={"user_id": user_id})
    docs = supabase.rpc("buscar_kb", {"query": mensagem}).execute()

    system = open("prompts/system.md").read()
    response = completion(
        model="claude-3-5-sonnet-20241022",
        messages=[
            {"role": "system", "content": system},
            {"role": "system", "content": f"Histórico: {historico}\nDocs: {docs.data}"},
            {"role": "user", "content": mensagem}
        ]
    )

    memory.add(
        messages=[{"role": "user", "content": mensagem}, {"role": "assistant", "content": response.choices[0].message.content}],
        user_id=user_id
    )
    return response.choices[0].message.content
```

Outros padrões: ver `KODAI/3-CONTEXTOS-DOMINIO/agentes-ia-construcao/conceitos/padroes-prontos-agentes-comuns.md`.

### Passo 6 — Reportar próximos passos

Output canônico:

```
✓ Agente <slug> scaffold criado em agentes/<slug>/

Tier: <X> | Padrão: <Y> | Stack: <Z>
Packs ativados: <N>

Próximos passos:
1. Preencher prompts/system.md com persona + objetivos
2. Configurar .env com chaves dos providers
3. Rodar tests/smoke.py pra validar setup
4. /spec agentes/<slug>/feature-X pra primeira feature concreta
5. Após >30 dias em produção: gerar Evidence Bloc pra promover STUB → FUNCIONAL
```

## Regras

- **NUNCA criar agente na raiz do upstream KODAI** — agentes vivem em `agentes/` do projeto consumidor
- **SEMPRE incluir manifest.yaml com lineage v1** — sem isso, agente não é discoverable
- **SEMPRE incluir handoff_in/out + quality_gates** (política handoff-contracts)
- **NUNCA promover STUB → FUNCIONAL sem Evidence Bloc** (regra-base 11)
- Em caso de dúvida no padrão: oferecer Custom + perguntar detalhes do uso

## Anti-padrões

- ❌ Pular entrevista e chutar stack
- ❌ Criar agente sem packs declarados
- ❌ Esquecer .env.example (cliente precisa saber o que configurar)
- ❌ Scaffold com mock data (deveria estar vazio pronto pra preencher)

## Composição com outras skills

- `/spec agentes/<slug>/feature` — formaliza primeira feature
- `/break` → `/plan` → `/execute` → `/review` → `/complete` — pipeline canônico SDD
- `/criar-pack` — se padrão exigir capacidade técnica nova
- `/criar-contexto` — se cliente exigir conhecimento de domínio novo
- `/mapear-concorrente` — pra entender o que o produto-âncora do cliente precisa diferenciar

## Lineage

- Fonte: SOURCE.md curado pelo Davi 2026-05-25 (seções 8 Stacks + 9 Modelo de Negócio + 12 Padrões + 13 Roadmap)
- Contexto-domínio canônico: agentes-ia-construcao
- Packs irmãos: 6 packs `ia/agentes-*`
- Perfil de instalação: `agentes-builder.yaml`
