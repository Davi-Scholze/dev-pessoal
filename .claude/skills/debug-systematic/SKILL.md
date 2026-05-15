# SKILL: debug-systematic

## Quando invocar
Ao encontrar um bug que não é óbvio. Previne o ciclo de tentar fixes aleatórios.

## Entrada
Descrição do comportamento inesperado + ambiente (dev/staging/prod) + frequência.

## Processo obrigatório (5 etapas)
1. **Reproduza:** crie o caso mínimo que reproduz o problema
2. **Isole:** binário — remova código até o bug desaparecer (identifica a causa)
3. **Hipótese:** formule 1-3 hipóteses de causa raiz com evidências
4. **Teste a hipótese:** adicione logs/breakpoints para confirmar ou refutar
5. **Fix + teste de regressão:** corrija + adicione teste que teria capturado o bug

## Ferramentas por contexto
- **Frontend:** React DevTools, Network tab, `console.error` listeners
- **Backend:** logs estruturados, `EXPLAIN ANALYZE` para queries lentas
- **Mobile:** Expo DevTools, Flipper, `__DEV__` guards

## Anti-padrões a evitar
- Não adicione `console.log` aleatórios sem remover depois
- Não faça múltiplas mudanças simultâneas — isole uma variável por vez
- Não assuma a causa — valide com dados antes de corrigir

## Saída esperada
Diagnóstico com: causa raiz identificada + fix aplicado + teste de regressão criado
