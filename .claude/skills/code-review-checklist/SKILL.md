# SKILL: code-review-checklist

## Quando invocar
Antes de aprovar qualquer PR. Delega para o agente code-reviewer.

## Entrada
Diff do PR ou lista de arquivos modificados.

## Saída esperada
Relatório de revisão com veredito e lista de issues por severidade.

## Checklist rápido (para PRs pequenos, <200 linhas)
- [ ] Lógica resolve o problema descrito?
- [ ] Sem `any` TypeScript, sem console.log, sem código comentado
- [ ] Input validado com Zod em toda fronteira
- [ ] Sem credenciais hardcoded
- [ ] Testes adicionados para comportamento novo
- [ ] Sem efeito colateral não documentado

## Para PRs grandes (>200 linhas): delegar ao agente code-reviewer
Use: `@code-reviewer revise este PR contra o checklist completo`

## Severidades
- BLOQUEADOR: segurança, perda de dados, regressão funcional
- IMPORTANTE: qualidade, manutenibilidade, padrões do projeto
- SUGESTÃO: style, naming, micro-otimizações
