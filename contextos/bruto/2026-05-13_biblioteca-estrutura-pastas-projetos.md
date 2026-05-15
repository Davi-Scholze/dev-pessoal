# Contexto Bruto — Estrutura de Pastas e Organização de Projetos
> Recebido em: 2026-05-13
> Status: BRUTO — não processar sem aprovação explícita
> Origem: onboarding de conhecimento enviado pelo Davi na sessão de 2026-05-13
> Aplicável a: todos os projetos

---

# SOFTWARE TRADICIONAL (Clean Architecture + Monorepo + DDD)

```
my-product/
├── apps/                 # pontos de entrada (api-gateway, web, mobile)
├── libs/                 # bibliotecas compartilhadas
├── modules/              # 1 pasta por Bounded Context (DDD)
│   └── <contexto>/
│       ├── domain/         # entidades, value objects, interfaces
│       ├── application/    # use cases, CQRS, handlers
│       ├── infrastructure/ # DB, HTTP, filas, e-mail
│       └── presentation/   # controllers, DTOs, mapeamentos
├── tools/                # scripts de CI/CD, geradores
├── docs/                 # documentação
└── tests/                # testes E2E e integração entre módulos
```

Princípios:
- Dependências fluem de FORA pra DENTRO (infra → app → domain)
- Organize por feature/bounded context, não por tipo técnico
- Domínio nunca importa framework
- Cada módulo deve poder virar microsserviço

Ferramentas: Nx, Turborepo, pnpm workspaces, Bazel, Pants

---

# DATA SCIENCE / ML (Cookiecutter Data Science v2 — DrivenData)

```
my-ml-project/
├── data/
│   ├── raw/         # IMUTÁVEL. Dump original. Nunca editar.
│   ├── external/    # dados de terceiros
│   ├── interim/     # transformações intermediárias
│   └── processed/   # datasets finais canônicos
├── notebooks/       # convenção: 1.0-jqp-initial-exploration.ipynb
├── references/      # dicionários de dados, manuais, papers
├── reports/figures/
├── models/
└── src/
    ├── config.py / dataset.py / features.py / plots.py
    └── modeling/ (train.py, predict.py)
```

Regras: data/raw/ NUNCA modificado, notebooks = exploração, código de produção vai em src/

---

# SISTEMAS COM IA / LLM / RAG (padrão emergente 2025–2026)

```
my-ai-app/
├── AGENTS.md             # regras p/ QUALQUER agente de IA (fonte única)
├── CLAUDE.md             # entry-point Claude Code → aponta p/ AGENTS.md
├── .claude/              # configs do Claude Code
├── .cursor/rules/        # regras .mdc do Cursor
│
├── data/                 # MATÉRIA-PRIMA e derivados mecânicos
│   ├── raw/        # PDFs, HTMLs, transcrições (imutável)
│   ├── interim/    # texto extraído/OCR, ainda não chunked
│   ├── processed/  # chunks prontos para embedding
│   ├── embeddings/ # vetores (parquet/npz) + metadados
│   └── eval/       # golden Q&A pairs
│
├── contexts/             # ARTEFATOS CURADOS p/ alimentar prompts
│   ├── system_prompts/
│   ├── few_shot_examples/
│   ├── personas/
│   └── tools/      # JSON Schemas de function calling
│
├── prompts/              # templates Jinja/LangChain versionados
│
├── src/
│   ├── ingestion/    # raw → interim → processed
│   ├── indexing/     # embeddings + escrita no vector store
│   ├── retrieval/    # busca híbrida, reranking
│   ├── generation/   # chamadas LLM, chains, agents
│   ├── evaluation/   # RAGAS, TruLens
│   ├── guardrails/   # filtros PII, moderação
│   └── api/          # FastAPI/serving
```

**DISTINÇÃO CRÍTICA:**
- `data/` → material extraído ou gerado mecanicamente do mundo
- `contexts/` → material CURADO INTENCIONALMENTE para o LLM ler

---

# CONTEXT ENGINEERING (camada de instruções para IA)

- AGENTS.md = fonte única de verdade (estilo, commits, testes, deploy)
- CLAUDE.md = ponteiro curto p/ AGENTS.md
- .cursorrules/.cursor/rules/*.mdc = idem p/ Cursor
- CI valida que os arquivos existem e estão íntegros

---

# DOCUMENTAÇÃO (framework Diátaxis)

```
docs/
├── tutorials/    # aprendizado guiado
├── how-to/       # receitas
├── reference/    # API specs (consulta seca)
└── explanation/  # conceitos, "porquês", ADRs
```

Complementos: docs/adr/ (Architecture Decision Records), docs/runbooks/ (operação)
Ferramentas: MkDocs Material, Docusaurus

---

# FONTES E TEMPLATES

- Cookiecutter DS: cookiecutter-data-science.drivendata.org
- Clean Architecture: ardalis/CleanArchitecture
- Template AI-first: github.com/greynewell/agentic-template
- Padrão AGENTS.md: agents.md spec
- Diátaxis: diataxis.fr
- Awesome MLOps: github.com/kelvins/awesome-mlops
