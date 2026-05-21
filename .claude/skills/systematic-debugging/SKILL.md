---
name: systematic-debugging
description: >
  Debugging em 4 fases (root cause → pattern → hipótese → implementação)
  com gate de Iron Law 'sem fix antes de investigar root cause'. Use em
  qualquer bug, test failure, comportamento inesperado, perf, build
  quebrado, integração quebrada — ANTES de propor fix. Combina com
  test-driven-development (cria failing test antes de fix) e
  verification-before-completion (confirma fix de fato).
allowed-tools: [Read, Bash, Grep, Glob]
---

# Skill — Systematic Debugging (root cause antes do fix)

## Princípio

Fixes aleatórios desperdiçam tempo e criam bugs novos. Patch rápido mascara causa raiz e o bug volta amanhã com outra cara.

**Iron Law:**

> Sem investigação de root cause, sem proposta de fix.

Violar a letra dessa lei é violar o espírito de debugging. Vale **especialmente** em emergência — quando "só um fix rápido" parece tentador.

## Quando aplicar

Em **qualquer** issue técnica:

- Teste falhando
- Bug em produção
- Comportamento inesperado
- Problema de performance
- Build quebrado
- Integração quebrada (multi-componente)

**Aplicar especialmente quando:**

- Pressão de tempo (emergência faz chutar)
- "Só um fix rápido" parece óbvio
- Já tentou múltiplos fixes
- Fix anterior não resolveu
- Você não entende completamente a issue

**NÃO pular quando:**

- Issue parece simples (bug simples tem causa simples, processo é rápido)
- Tá com pressa (chutar garante retrabalho)
- Alguém quer fix AGORA (sistemático é mais rápido que tentativa-erro)

---

## As 4 fases (sequenciais, sem pular)

### Fase 1 — Root Cause Investigation

**ANTES de qualquer fix:**

1. **Ler mensagens de erro com cuidado**
   - Não pular erros nem warnings
   - Stack trace inteira
   - Anota linha + arquivo + código de erro

2. **Reproduzir consistentemente**
   - Passos exatos pra reproduzir?
   - Acontece toda vez?
   - Se intermitente → coleta mais evidência antes de adivinhar

3. **Checar mudanças recentes**
   - O que mudou que poderia causar?
   - `git diff`, commits recentes, deps novas, config alterada
   - Diferenças de ambiente

4. **Em sistema multi-componente: instrumentar fronteiras**

   Quando sistema tem múltiplos componentes (CI → build → signing, API → service → DB):

   ANTES de propor fix, adicionar diagnóstico em cada fronteira:

   ```
   Pra CADA fronteira de componente:
     - Log do dado que entra
     - Log do dado que sai
     - Verifica propagação de env/config
     - Verifica estado em cada camada

   Rodar 1x pra coletar evidência mostrando ONDE falha
   ENTÃO analisar evidência pra identificar componente falho
   ENTÃO investigar aquele componente especificamente
   ```

5. **Tracear data flow**

   Quando erro está fundo na call stack:

   - Onde o valor ruim **originou**?
   - O que **chamou** isso com valor ruim?
   - Sobe a call stack até a fonte
   - **Fix na fonte, não no sintoma**

### Fase 2 — Pattern Analysis

Encontrar o padrão antes de fixar:

1. **Achar exemplo que funciona** no mesmo codebase (código similar que opera bem)
2. **Comparar com referência canônica** — se está aplicando um padrão (lib, framework), ler a doc/exemplo de referência **integralmente**, não só skimming
3. **Identificar diferenças** — listar **todas** as diferenças entre versão que funciona e versão quebrada, mesmo as "que não podem importar"
4. **Entender dependências** — o que mais precisa estar setup pra esse código funcionar?

### Fase 3 — Hipótese e Teste

Método científico:

1. **Uma hipótese clara**: "Acho que X é a root cause porque Y" — específica, escrita, não vaga
2. **Teste mínimo** — menor mudança possível pra validar a hipótese; **uma** variável por vez
3. **Verificar antes de seguir**
   - Funcionou? → Fase 4
   - Não funcionou? → **nova** hipótese (não empilha fixes em cima)
4. **Quando não sei** — assumir explicitamente "não entendo X", pesquisar mais, pedir ajuda

### Fase 4 — Implementação

Fix da causa raiz, não do sintoma:

1. **Criar teste que falha** reproduzindo o bug (combina com skill `test-driven-development` se disponível)
2. **Aplicar UM fix** — endereça a causa identificada; **uma** mudança; **sem** "já que estou aqui, refactor isso também"
3. **Verificar** — teste passa agora? outros testes não-quebrados? issue de fato resolvida? (skill `verification-before-completion` com Iron Law aplica)
4. **Se fix não funciona** — **STOP**. Quantos fixes já tentou?
   - **< 3 fixes** → volta pra Fase 1, re-analisa com info nova
   - **≥ 3 fixes falharam** → **questiona arquitetura** (passo 5)
   - **Não tenta** o 4º fix sem discutir
5. **Se 3+ fixes falharam: questiona arquitetura**

   Sinal de que problema **não** é hipótese errada, é arquitetura errada:

   - Cada fix revela novo coupling em lugar diferente
   - Fixes exigem refactor massivo pra implementar
   - Cada fix cria sintoma novo em outro lugar

   **Pausa e pergunta:**
   - Esse padrão é fundamentalmente correto?
   - Estamos "insistindo por inércia"?
   - Vale refatorar arquitetura em vez de mais um fix de sintoma?

   Conversa com o decisor humano. Esta não é hipótese falhada — é **arquitetura errada**.

---

## Red Flags — STOP e volta pra Fase 1

Se você se pegar pensando:

- "Fix rápido agora, investigo depois"
- "Vou só mudar X e ver se passa"
- "Adiciona 3 mudanças e roda os testes"
- "Pula o teste, valido manualmente"
- "Provavelmente é X, vou fixar"
- "Não entendo completamente mas isso pode funcionar"
- "Padrão diz X mas vou adaptar diferente"
- "Aqui estão os problemas: [lista fixes sem investigação]"
- Propondo solução **antes** de tracear data flow
- **"Mais um fix" (após 2 tentativas)**
- **Cada fix revela novo problema em outro lugar**

Todos esses = **STOP**. Volta pra Fase 1.

Se 3+ fixes falharam → questiona arquitetura (Fase 4.5).

## Sinais do decisor humano de que está errando

- "Não tava acontecendo?" → você assumiu sem verificar
- "Vai mostrar que...?" → faltou coletar evidência
- "Pare de chutar" → propondo fix sem entender
- "Pensa fundo nisso" → questiona fundamento, não sintoma
- "A gente tá travado?" (frustrado) → abordagem não funciona

→ STOP. Volta pra Fase 1.

---

## Racionalizações comuns

| Desculpa | Realidade |
|---|---|
| "Issue simples, não precisa processo" | Bug simples tem causa simples, processo roda rápido |
| "Emergência, sem tempo pra processo" | Sistemático é mais rápido que tentativa-erro |
| "Tento isso primeiro, investigo depois" | Primeiro fix vira padrão. Faz certo do início |
| "Teste depois de confirmar fix" | Fix sem teste não vinga. Teste primeiro prova |
| "Múltiplos fixes ao mesmo tempo poupa tempo" | Não consegue isolar o que funcionou |
| "Referência longa, vou adaptar o padrão" | Entendimento parcial garante bug |
| "Tô vendo o problema, deixa eu fixar" | Ver sintoma ≠ entender causa raiz |
| "Mais um fix" (após 2+ falhas) | 3+ falhas = problema arquitetural |

---

## Resumo

| Fase | Atividades | Critério de saída |
|---|---|---|
| **1. Root Cause** | Ler erros, reproduzir, checar mudanças, coletar evidência multi-camada | Entender **o quê** e **por quê** |
| **2. Pattern** | Achar exemplo funcional, comparar | Identificar **diferenças** |
| **3. Hipótese** | Formar teoria, testar minimamente | **Confirmar** ou nova hipótese |
| **4. Implementação** | Criar teste, fixar, verificar | Bug resolvido + testes passando |

---

## Quando processo revela "não tem root cause"

Se investigação sistemática mostra que issue é **realmente** ambiental, timing-dependent, ou externa:

1. Processo foi completo — não é falha
2. Documenta o que investigou (Evidence Bloc)
3. Implementa tratamento apropriado (retry, timeout, mensagem de erro)
4. Adiciona monitoring/logging pra investigação futura

**Mas:** 95% dos casos "sem root cause" são investigação incompleta.

---

## Casamento com outras skills/políticas

- **`test-driven-development`** — Fase 4 passo 1 (criar teste que falha) reusa a skill
- **`verification-before-completion`** — Fase 4 passo 3 (verificar fix) usa Iron Law dela
- **`code-review`** — após Fase 4 implementada, code review do diff antes de merge
- **`escuta-antes-de-agir`** — investigação é exploratória até a Fase 4; antes disso, IA não toca código
- **`explicar-acao-custosa`** — se Fase 4 propõe refactor grande (arquitetura), anuncia 4 dados antes
- **Regra-base 10** (honestidade) — Evidence Bloc da Fase 4 confirma fix
- **Regra-base 12** (`/complete` antes de done) — debugging fechado entra no funil pré-done

---

## Atribuição

Re-implementação universalizada da skill `systematic-debugging` Anthropic Superpowers (Apache-2.0). Iron Law + 4 fases + red flags + racionalizações comuns preservados como decisão central. Sinais de decisor humano + tabela de racionalização + casamento com regras-base e políticas KOD.AI adicionado. Branding "Jesse" / "Anthropic Superpowers" e referências a sub-arquivos (`root-cause-tracing.md`, `defense-in-depth.md`, `condition-based-waiting.md`) substituídos por princípios incorporados ao texto.
