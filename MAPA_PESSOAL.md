# Mapa Pessoal — Projetos Dev Davi Scholze
> Entrada rápida. Leia isso ANTES de abrir qualquer outro arquivo.
> Última atualização: 2026-05-13

## TL;DR

Espaço central de desenvolvimento pessoal. 3 repositórios ativos, ferramentas de IA configuradas, metodologia SDD em uso.

## Prioridade dos projetos

| # | Projeto | Fase | Status |
|---|---------|------|--------|
| 1 | **decon-sistema** | Fase 1: mapear Domínio + automatizar fluxos da Denize | Em andamento |
| 2 | **dojo-familia-scholze** | App mobile para professores de artes marciais | Planejamento |
| 3 | **lar-antonia** | Manutenção | Contrato ativo até dez/2026 |

## Repositórios ativos

| Repo | Stack | Caminho |
|------|-------|---------|
| decon-sistema | React 19 + Vite + Tailwind v3 | `Repositorios/decon-sistema/` |
| dojo-familia-scholze | React Native + Expo (a confirmar) | `Repositorios/dojo-familia-scholze/` |
| grants-etl-pipeline | Python, SQL Server, Power BI | `Repositorios/grants-etl-pipeline/` |

## Skills disponíveis (`~/.claude/skills/`)

### Desenvolvimento
| Skill | Comando | Para quê |
|-------|---------|---------|
| frontend-design | `/frontend-design` | Interfaces web production-grade |
| mobile-dev | `/mobile-dev` | Apps React Native + Expo |
| playwright-testing | `/playwright-testing` | Testes E2E + Playwright MCP ao vivo |
| agentes-ia | `/agentes-ia` | Agentes LLM, RAG, MCP servers |
| code-review | `/code-review` | Revisão estruturada de código |
| git-flow | `/git-flow` | Commits, branches, PRs |

### Negócio / Marketing
| Skill | Comando | Para quê |
|-------|---------|---------|
| payments-br | `/payments-br` | Pix, boleto, assinatura (Asaas, Pagar.me) |
| trafego-pago | `/trafego-pago` | Google/Meta Ads, criativos com IA |
| ads-audit | `/ads-audit` | Auditoria Google Ads + Meta Ads (10 workflows) |
| content-creator | `/content-creator` | Carrosséis Instagram (render.js + Puppeteer) |
| parsear-os | `/parsear-os` | Extrair dados de documentos |

### Design e Referência
| Skill | Comando | Para quê |
|-------|---------|---------|
| web-design-ref | `/web-design-ref` | Referências internacionais de design |
| excalidraw-diagram | `/excalidraw-diagram` | Diagramas de arquitetura |
| antigravity | `/antigravity` | UIs com efeitos visuais especiais |

### Produtividade
| Skill | Comando | Para quê |
|-------|---------|---------|
| notebooklm | `/notebooklm` | Consultar notebooks com citações |
| backup-sessao | `/backup-sessao` | Salvar/restaurar contexto de sessão |
| dev-browser | `/dev-browser` | Testar app no browser |
| google-workspace | `/google-workspace` | Google Docs, Sheets, Drive |

## Comandos SDD (metodologia obrigatória)

`/spec` → `/break` → `/plan` → `/execute` → `/review` → `/context`

## NotebookLMs

Ver: `contextos/notebooklm/README.md`
- 2 notebooks catalogados (TrackOps, SDD)
- 41 notebooks a identificar (requer re-autenticação)

## Onde está cada coisa

| O que | Onde |
|-------|------|
| Regras de IA | `CLAUDE.md` |
| Regras operacionais de sessão | `REGRAS_SESSAO.md` |
| Skills | `ferramentas/skills/CATALOGO.md` |
| Agentes, MCPs, modelo de negócio | `AGENTS.md` |
| Estado completo dos projetos | `contextos/CONTEXTO_GERAL.md` |
| Contexto bruto (não processar) | `contextos/bruto/` |
| Contexto aprovado para dev | `contextos/fluxos/` |
| NotebookLMs | `contextos/notebooklm/` |
| Prompts reutilizáveis | `contextos/prompts/` |
| Template novo cliente | `ferramentas/templates/cliente-novo/` |
| Docs gerais | `docs/INDEX.md` |

## Bibliotecas de conhecimento prontas para uso

Salvas em `contextos/bruto/` — acionar via skill ou mencionar o tema:

- Web Design Internacional → `/web-design-ref`
- Software Gestão de Dojos → consultar direto ou acionar em sessão de dojo
- Portais Contábeis Internacionais → consultar em sessão de decon
- Estrutura de Pastas (Clean Architecture, RAG, etc.) → padrão aplicado nos repos
- Agentes de IA → `/agentes-ia`
- Fluxos Dev e Testes (SDLC, TDD, pirâmide de testes) → base de toda implementação
- Pagamentos BR ⚠️ (incompleto — aguarda reenvio) → `/payments-br`
- Tráfego Pago com IA → `/trafego-pago`
- Agências IA + Sistemas Marketing (pesquisa de campo) → `/ads-audit` + `/content-creator`
- Sistema Produção de Conteúdo (referência de profissional) → `/content-creator`

## Próximos passos gerais

- [ ] Definir stack final do dojo-familia-scholze
- [ ] Criar estrutura interna dos repos (docs/, .sdd/)
- [ ] Fase 1 Decon: mapear sistema Domínio
