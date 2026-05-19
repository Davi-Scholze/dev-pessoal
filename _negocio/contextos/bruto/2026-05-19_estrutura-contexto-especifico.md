Tipo: metodologia
Eixo: orchestration
Escopo: global
Versão: 1.0 | Atualizado: 2026-05-19
Status: FUNCIONAL
Fontes:
  - docs/CONTEXT-OS.md
  - 1-ESQUELETO/metodologias/estrutura-de-contexto.md
  - NotebookLM: KODAI — Project Context Architecture
related:
  - AGENTS.md
  - PRECEDENCE.md
  - docs/playbooks/auditar-projeto-existente.md
---

# Estrutura de Contexto de Projeto

## A regra de consulta obrigatória

Antes de executar qualquer tarefa:

Verificar se existe contexto relacionado no NotebookLM do projeto
Consultar documentação relacionada nos arquivos docs/ do projeto
Cruzar o contexto encontrado com as regras do AGENTS.md
Só então executar


**Gatilhos obrigatórios de consulta:**
- Criar funcionalidade nova → consulte docs/01_database_schema.md + docs/03_user_flows.md
- Decisão arquitetural → consulte docs/decisoes/ + NotebookLM
- Alterar fluxo importante → consulte docs/03_user_flows.md + _memoria/estrategia.md
- Resolver conflito de abordagem → consulte PRECEDENCE.md

## Estrutura canônica para projeto novo
/projeto
├── AGENTS.md              ← Orchestration: fonte única de regras da IA
├── CLAUDE.md              ← Pointer para AGENTS.md
├── PRECEDENCE.md          ← 8 níveis de precedência
│
├── _memoria/              ← Grounding: fatos fixos sobre o projeto
│   ├── empresa.md         ← Identidade, visão, valores
│   ├── preferencias.md    ← Stack, padrões, decisões técnicas
│   └── estrategia.md      ← Roadmap, prioridades
│
├── identidade/
│   └── design-guide.md    ← Tokens de design, componentes
│
├── docs/                  ← Meta: documentação viva
│   ├── 00_project_overview.md
│   ├── 01_database_schema.md
│   ├── 02_api_specs.md
│   ├── 03_user_flows.md
│   ├── 04_todo_backlog.md
│   ├── 05_dev_log.md
│   ├── decisoes/          ← ADRs (Architecture Decision Records)
│   └── playbooks/         ← Gabaritos operacionais
│
├── contextos/
│   ├── bruto/             ← Raw sagrado — NUNCA alterar
│   └── mapeamento/        ← Destilado curado
│
└── .claude/
├── skills/
├── hooks/
└── rules/             ← Path-scoped rules por glob

## O Markdown Central (AGENTS.md) — o que vai e não vai

**✅ VAI:**
- Identidade (nome, stack, linguagem de código)
- Visão em 2-3 frases
- Padrões obrigatórios (naming, commits, estrutura)
- Regras arquiteturais não-negociáveis
- Comportamento esperado da IA
- Pointers para docs/ e NotebookLM

**❌ NÃO VAI:**
- Schemas completos → docs/01_database_schema.md
- Histórico de decisões → docs/decisoes/
- Bugs e logs → docs/05_dev_log.md
- Backlog completo → docs/04_todo_backlog.md
- Specs de API → docs/02_api_specs.md

Limite: AGENTS.md deve ter no máximo 200-300 linhas.

## Contextos Cruzados — como usar

Em vez de carregar tudo, carregar exatamente o que a tarefa precisa:
Desenvolvendo [funcionalidade]:
→ Consulte [arquivo] para entender [aspecto]
→ Ignore o restante por enquanto

Exemplo real:
"Estou desenvolvendo a tela de notas do aluno.

Consulte docs/01_database_schema.md para a query Supabase
Consulte docs/03_user_flows.md para aluno vs professor
O que implementar?"


## Regra do Commit de Documentação

Nenhum código vai para o próximo commit sem a documentação atualizada:

Marcar tarefa em 04_todo_backlog.md
Atualizar 05_dev_log.md (o que foi feito, decisões, problemas)
Atualizar docs/ relacionados se algo mudou
commit: "docs: atualiza contexto após [feature]"


Atalho — IA atualiza a si mesma:
"IA, terminamos [feature].

Marque [tarefa] em 04_todo_backlog.md como concluída
Atualize 05_dev_log.md com resumo
Verifique se 01_database_schema.md precisa atualização"


## Progressividade do contexto (3 níveis)

| Nível | O que carrega | Quando |
|---|---|---|
| 1 | Cabeçalho/metadata do arquivo | Sempre |
| 2 | Corpo do arquivo | Quando referenciado explicitamente |
| 3 | Arquivos auxiliares bundled | Sob demanda, quando relevante |

## Anti-padrões a evitar

| Padrão | Problema | Correção |
|---|---|---|
| AGENTS.md com 500+ linhas | Context stuffing | Extrair para docs/ |
| Contexto só no chat | Perde ao fechar sessão | Persistir em .md |
| Docs duplicadas | Confusão sobre fonte da verdade | Uma fonte por info |
| Regras vagas ("seja cuidadoso") | Não acionável | Tornar específico |
| Info volátil no AGENTS.md | Invalida cache | Volátil vai em docs/ |

🔗 Link do NotebookLM
O notebook foi criado e está disponível em:
https://notebooklm.google.com/notebook/dca269d8-e6dd-43b5-ac11-8fcf288cc6a5
Você pode adicionar este link no seu CONTEXT-OS.md como fonte adicional, e incluir nos dois arquivos acima no campo Fontes:.