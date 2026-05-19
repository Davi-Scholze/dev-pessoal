# Catálogo de Skills Disponíveis
> Todas as skills são globais — funcionam em qualquer projeto.
> Ativação: mencione o nome ou use `/nome-da-skill` na conversa.
> Última atualização: 2026-05-13

---

## Skills de Desenvolvimento

### frontend-design
**Uso:** Interfaces web production-grade — anti "AI slop", design com direção estética real
**Quando usar:** Componentes, páginas, dashboards, landing pages com qualidade visual alta
**Ativar:** "cria a interface de X" ou `/frontend-design`

### mobile-dev
**Uso:** Apps mobile com React Native + Expo — Clean Architecture, EAS Build, animações
**Quando usar:** Qualquer desenvolvimento mobile para iOS/Android (Dojô app)
**Ativar:** "cria a tela de X no mobile" ou `/mobile-dev`

### playwright-testing
**Uso:** Testes E2E automatizados + Playwright MCP para ver o app ao vivo
**Quando usar:** Testar UI, validar fluxos, ciclo obrigatório de mudanças visuais no decon
**Ativar:** "testa isso no browser" ou `/playwright-testing`

### agentes-ia
**Uso:** Design e implementação de agentes autônomos — LangGraph, RAG, MCP servers
**Quando usar:** Automatizar fluxos com LLM, construir pipelines de IA, RAG
**Ativar:** "cria um agente para X" ou `/agentes-ia`

### code-review
**Uso:** Revisão estruturada de código — bugs, segurança, qualidade (confiança ≥80%)
**Quando usar:** Antes de merge, após implementação
**Ativar:** "revisa esse código" ou `/code-review`

### git-flow
**Uso:** Fluxos git inteligentes — commit, branch, PR, histórico limpo
**Quando usar:** Commits estruturados, branches, PRs
**Ativar:** "faz o commit" ou `/git-flow`

---

## Skills de Negócio

### payments-br
**Uso:** Integração de pagamentos BR — Pix, boleto, assinatura recorrente (Asaas, Pagar.me)
**Quando usar:** Implementar cobrança no Dojô (mensalidades) ou Decon (billing clientes)
**Ativar:** "implementa pagamento de X" ou `/payments-br`

### trafego-pago
**Uso:** Campanhas Google/Meta/TikTok, criativos com IA, análise de performance
**Quando usar:** Captação de clientes para Decon, marketing do app Dojô
**Ativar:** "monta campanha para X" ou `/trafego-pago`

### parsear-os
**Uso:** Extrai dados de documentos não estruturados (PDFs, OSs, relatórios)
**Quando usar:** Transformar texto bruto em JSON/CSV/tabela estruturada
**Ativar:** "extrai os dados desse documento" ou `/parsear-os`

---

## Skills de Design e Referência

### web-design-ref
**Uso:** Biblioteca de referências internacionais de web design por vertical
**Quando usar:** Buscar inspiração, benchmark visual, analisar padrões de UX
**Ativar:** "me dá referências de X" ou `/web-design-ref`

### excalidraw-diagram
**Uso:** Diagramas de arquitetura, fluxos, modelos de dados
**Quando usar:** Visualizar sistemas, fluxos ETL, arquitetura de banco
**Ativar:** "cria um diagrama de X" ou `/excalidraw-diagram`

### antigravity
**Uso:** UIs com animações físicas, partículas, efeitos visuais especiais
**Quando usar:** Interfaces memoráveis, mágicas ou incomuns
**Ativar:** "faz algo impressionante visualmente" ou `/antigravity`

---

## Skills de Produtividade

### notebooklm
**Uso:** Consultar notebooks do Google NotebookLM com respostas baseadas em fontes
**Quando usar:** Antes de implementar features complexas, pesquisa com citações
**Ativar:** `/notebooklm` ou "consulte o notebooklm sobre X"

### backup-sessao
**Uso:** Salvar e restaurar contexto de sessão (tarefas, decisões, bloqueios)
**Quando usar:** Ao fim de sessões longas, antes de encerrar
**Ativar:** "salva o backup da sessão" ou `/backup-sessao`

### dev-browser
**Uso:** Abre e testa aplicações web no browser durante desenvolvimento
**Quando usar:** Testar UI, checar responsividade, inspecionar requests
**Ativar:** "abre no browser" ou `/dev-browser`

### google-workspace
**Uso:** Criar/editar Google Docs, Sheets, Drive, Forms
**Quando usar:** Gerar relatórios, planilhas, documentação no Google
**Ativar:** "cria um doc no Google" ou `/google-workspace`

---

## Comandos SDD (Metodologia Obrigatória)

| Comando | Descrição |
|---------|-----------|
| `/spec` | Cria especificação antes de qualquer código |
| `/break` | Quebra spec em tarefas menores |
| `/plan` | Planeja execução de uma tarefa |
| `/execute` | Executa com ciclo completo |
| `/review` | Revisa implementação antes de merge |
| `/context` | Checa status de MCPs e contexto atual |
| `/sdd-init` | Inicializa SDD em um novo projeto |

---

## Como adicionar novas skills

1. Criar `~/.claude/skills/nome-da-skill.md` com frontmatter YAML + instruções
2. Adicionar entrada neste catálogo
3. Registrar no `_negocio/MAPA.md`
