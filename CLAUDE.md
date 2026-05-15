# CLAUDE.md — Projetos Dev Pessoais
> Regras globais de IA para todos os projetos pessoais de Davi Scholze.
> Leia este arquivo no início de cada sessão.
> Última atualização: 2026-05-13

## Quem sou eu
- **Nome:** Davi Pereira Scholze
- **Perfil:** Desenvolvedor especialista em IA, ETL, dados, automação e sistemas web
- **CLT:** Navortech (trackops — rastreamento veicular), seg–sex 08–16
- **Tempo:** limitado — leia MAPA_PESSOAL.md para contexto completo
- **Projetos pessoais:** decon-sistema (prioridade 1), dojo-familia-scholze (prioridade 2), lar-antonia (prioridade 3)

## Leitura obrigatória (ordem)

1. `MAPA_PESSOAL.md` — visão geral e estado atual (sempre primeiro)
2. `REGRAS_SESSAO.md` — regras operacionais de toda sessão
3. `ferramentas/skills/CATALOGO.md` — skills disponíveis
4. CLAUDE.md do projeto específico (se existir)

## Estrutura deste espaço

```
Projetos Dev Pessoais/
├── CLAUDE.md                  ← você está aqui
├── MAPA_PESSOAL.md            ← entrada rápida (leia antes de qualquer sessão)
├── REGRAS_SESSAO.md           ← regras operacionais de toda sessão
├── Repositorios/
│   ├── decon-sistema/         ← sistema privado (prioridade 1)
│   │   └── contextos/bruto/   ← contexto bruto do projeto
│   │   └── contextos/fluxos/  ← contexto aprovado para dev
│   ├── grants-etl-pipeline/   ← ETL público
│   └── dojo-familia-scholze/  ← app artes marciais (prioridade 2)
│       └── contextos/bruto/
│       └── contextos/fluxos/
├── contextos/
│   ├── CONTEXTO_GERAL.md      ← fonte de verdade de todos os projetos
│   ├── bruto/                 ← contexto bruto recebido em sessões
│   ├── fluxos/                ← contexto processado, pronto para dev
│   ├── notebooklm/            ← notebooks NotebookLM
│   └── prompts/               ← prompts reutilizáveis
├── ferramentas/
│   └── skills/
│       └── CATALOGO.md        ← todas as skills disponíveis
└── docs/
    └── INDEX.md               ← mapa completo de documentação
```

## Regra de Contexto Bruto

Todo contexto que chega em sessão (mensagens longas, descrições de negócio, áudios transcritos, prints, ideias soltas) segue este fluxo:

```
ENTRADA → contextos/bruto/YYYY-MM-DD_descricao.md  ← salvar imediatamente, sem processar
                ↓ (somente com OK explícito do Davi)
          contextos/fluxos/YYYY-MM-DD_descricao.md  ← processado, estruturado, pronto para dev
```

**Regras:**
- Contexto bruto é salvo como recebido — sem reescrever, sem resumir, sem estruturar
- Nunca usar contexto bruto como base para código sem promovê-lo a fluxo antes
- A promoção (bruto → fluxo) exige aprovação explícita e acontece em sessão dedicada
- Cada repositório tem sua própria pasta `contextos/bruto/` e `contextos/fluxos/`
- Nomear arquivos com data: `YYYY-MM-DD_descricao-curta.md`

## Regras inegociáveis

1. **SDD obrigatório** — qualquer feature ou bug segue: `/spec` → `/break` → `/plan` → `/execute` → `/review`
2. **Pausa visual** — antes de cada commit, explicar o que foi feito e pedir aprovação
3. **Passo a passo** — nunca avançar para a próxima etapa sem aprovação explícita
4. **Zero credenciais no código** — sempre via `.env`, nunca hardcoded
5. **Economia de contexto** — leia MAPA_PESSOAL.md antes de qualquer arquivo completo
6. **Commits em português** — imperativo, padrão: `tipo(escopo): descrição`
7. **Skills primeiro** — antes de resolver manualmente, verificar `ferramentas/skills/CATALOGO.md`
8. **Contexto antes de código** — para features complexas, consulte NotebookLM antes de implementar
9. **Modularização** — arquivos > 400 linhas devem ser sinalizados para refatoração
10. **Handoff completo** — ao fim de cada sessão, atualizar `contextos/CONTEXTO_GERAL.md`
11. **Mobile-first** — em qualquer interface, desenvolver mobile primeiro
12. **Segurança sempre** — LGPD em formulários, validar webhooks, nunca logar dados sensíveis

## Prioridade de projetos

| Prioridade | Projeto | Fase atual |
|-----------|---------|-----------|
| 1 | **decon-sistema** | Fase 1: mapear Domínio + automatizar fluxos da Denize |
| 2 | **dojo-familia-scholze** | App mobile para professores de artes marciais |
| 3 | **lar-antonia** | Manutenção — contrato até dez/2026 |

## Stack por projeto

| Projeto | Stack |
|---------|-------|
| decon-sistema | React 19 + Vite + Tailwind v3 + React Router |
| dojo-familia-scholze | React Native + Expo + TypeScript (a confirmar) |
| grants-etl-pipeline | Python, SQL Server, Power BI |

## Metodologia SDD

| Comando | Quando usar |
|---------|------------|
| `/spec` | Criar especificação antes de qualquer código |
| `/break` | Quebrar spec em tarefas menores |
| `/plan` | Planejar execução de uma tarefa |
| `/execute` | Executar tarefa com ciclo completo |
| `/review` | Revisar antes de merge/commit |
| `/context` | Checar status de MCPs e contexto atual |
| `/sdd-init` | Inicializar SDD em novo projeto |

## Padrão de commits

```
feat(escopo): adiciona nova funcionalidade
fix(escopo): corrige bug em X
refactor(escopo): reorganiza estrutura de Y
docs(escopo): atualiza documentação
chore(escopo): ajuste de configuração
```

## Check-in de sessão

```
Projeto: [nome]
Spec ativa: [nome] | nenhuma spec ativa
Status: [X]% concluído
Bloqueios: [lista | nenhum]
```

## MCPs recomendados

### Tier 1 — Essenciais
GitHub MCP, PostgreSQL MCP, Slack MCP, Google Drive MCP, Notion MCP, Fetch MCP

### Tier 2 — Marketing (quando houver campanhas)
- Google Ads MCP: `github.com/cohnen/mcp-google-ads`
- Meta Ads MCP: `github.com/pipeboard-co/meta-ads-mcp`
- Puppeteer MCP (carrosséis + screenshots)

Ver `AGENTS.md` para instruções de instalação e tabela completa.

## Pipeline de Conteúdo (carrosséis)

```
dados/entrevista.md + brand-config.json
        ↓ /content-creator
roteiro.md → render.js → Puppeteer → PNG 1350px
        ↓
instagram/slide-01.png ... slide-08.png + legenda.md
```

## Modelo de Negócio (referência)

| Serviço | Ticket |
|---------|--------|
| Auditoria de Ads | R$2.850–R$11.400 |
| Carrosséis automáticos | R$17.000–R$45.000 setup + R$4.500–R$11.000/mês |
| Workflow simples | R$8.500–R$28.500 |
| Retainer marketing | R$5.700–R$28.500/mês |

**Fórmula:** Custo real (API) = R$10–50 por entrega. Cobrar 30% do ROI anual recuperado.

Ver `AGENTS.md` para casos reais, nichos lucrativos e modelos de engajamento.

## Template para novos clientes

```
ferramentas/templates/cliente-novo/  ← copiar para Repositorios/[nome-cliente]/
```

## Referências rápidas

| O que | Onde |
|-------|------|
| Regras operacionais de sessão | `REGRAS_SESSAO.md` |
| Skills disponíveis | `ferramentas/skills/CATALOGO.md` |
| Estado de todos os projetos | `contextos/CONTEXTO_GERAL.md` |
| Agentes, MCPs e modelo de negócio | `AGENTS.md` |
| NotebookLMs | `contextos/notebooklm/README.md` |
| Bibliotecas de conhecimento | `contextos/bruto/` (ver REGRAS_SESSAO.md) |
| Template de novo cliente | `ferramentas/templates/cliente-novo/` |
| Mapa geral | `MAPA_PESSOAL.md` |
