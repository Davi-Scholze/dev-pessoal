# /scholze-doctor

Health-check da pasta-mãe contra o checklist do SCHOLZE-STACK (Seção 20).

## Como usar
```
/scholze-doctor
```

## O que verifica

### Estrutura obrigatória
- [ ] `.claude/agents/` com 18 arquivos .md
- [ ] `.claude/skills/` com pelo menos 20 skills
- [ ] `.claude/commands/` com os 3 comandos /scholze:*
- [ ] `.claude/hooks/` com os 8 scripts
- [ ] `.claude/settings.json` com hooks configurados
- [ ] `.mcp.json` existe
- [ ] CLAUDE.md ≤ 200 linhas

### Documentação
- [ ] `_negocio/MAPA.md` existe e foi atualizado nos últimos 30 dias
- [ ] `.claude/rules/regras-sessao.md` existe
- [ ] `AGENTS.md` existe com referência aos 18 agentes
- [ ] `docs/playbooks/` com pelo menos 2 playbooks
- [ ] `docs/decisoes/README.md` existe

### Repositórios filhos (para cada repo em Repositorios/)
- [ ] Tem `.claude/` ou `CLAUDE.md` local
- [ ] Tem `.env.example`
- [ ] Está no git com remote configurado

### NotebookLM
- [ ] Library tem pelo menos: SDD, App Meu Dojo, Decon, SCHOLZE-STACK
- [ ] Verificar com: `python ~/.claude/skills/notebooklm/scripts/run.py notebook_manager.py list`

## Saída esperada
```
SCHOLZE-STACK Doctor Report — [data]
✓ 18/18 agentes presentes
✓ 20/20 skills presentes
✗ CLAUDE.md tem 202 linhas (máximo: 200)
✓ hooks configurados
...
Score: 14/16 itens OK
```

## Critério de sucesso
Score ≥ 14/16. Itens críticos (agentes, hooks, CLAUDE.md) sempre marcados ✓.
