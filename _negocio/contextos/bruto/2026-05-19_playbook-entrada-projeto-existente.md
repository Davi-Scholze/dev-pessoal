Tipo: playbook
Eixo: orchestration
Escopo: global
Versão: 1.0 | Atualizado: 2026-05-19
Status: FUNCIONAL
Fontes:
  - docs/CONTEXT-OS.md
  - 1-ESQUELETO/metodologias/estrutura-de-contexto.md
related:
  - skills/auditar-projeto
  - PRECEDENCE.md
---

# Playbook — Entrar em Projeto Existente

## Princípio absoluto
**NUNCA reorganizar o que já existe. NUNCA mover arquivos sem aprovação. ACRESCENTAR cirurgicamente o que falta.**

## Protocolo de 3 fases

### Fase 1 — AUDITAR (só leitura, zero alterações)
□ Mapear estrutura de pastas existente
□ Identificar toda documentação existente (mesmo que informal)
□ Identificar stack, convenções de nomenclatura adotadas
□ Mapear o que existe × o que falta (sem julgamento)
□ Perguntar ao dev: "O que está funcionando bem? O que você sente falta?"

### Fase 2 — PROPOR (gate humano obrigatório)
□ Apresentar mapa do que existe
□ Propor APENAS o que falta, adaptando nomenclatura ao padrão existente
□ Mostrar onde cada novo arquivo ficará
□ Aguardar aprovação explícita antes de criar qualquer arquivo

### Fase 3 — INJETAR (cirúrgico, no escopo aprovado)
□ Criar apenas o aprovado
□ Nunca alterar código
□ Nunca mover arquivos existentes
□ Nunca renomear sem permissão explícita
□ Confirmar ao final o que foi criado/modificado

## Mapeamento de equivalências

| Se o projeto já tem... | Equivale a... | O que fazer |
|---|---|---|
| README.md detalhado | 00_project_overview.md | Referenciar, não duplicar |
| Pasta /docs | docs/ KODAI | Acrescentar dentro, não criar nova |
| .env.example | preferencias.md (parcial) | Criar _memoria/ se aprovado |
| Figma/Notion linkado | identidade/ + flows | Adicionar link como fonte |
| CHANGELOG.md | 05_dev_log.md | Complementar, não substituir |
| Schema SQL/Prisma | 01_database_schema.md | Doc derivado, não substitui fonte |
| package.json com scripts | preferencias.md | Documentar convenções de scripts |
| /tests existente | Criar .claude/rules/tests-when-modifying.md |