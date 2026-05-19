---
name: brainstorming
description: >
  Use ANTES de qualquer trabalho criativo — criar feature, construir componente,
  adicionar funcionalidade, modificar comportamento. Explora intenção do usuário,
  requisitos e design ANTES da implementação. Termina com design aprovado +
  spec escrita pronta pra `/break` + `/plan`. Use sempre que disser "vamos
  desenhar X", "/brainstorming", "preciso pensar nisso antes de codar",
  "como abordar essa feature", ou ao receber pedido de criar algo novo.
allowed-tools: [Read, Write, Bash, Glob, Grep, AskUserQuestion]
---

# /brainstorming — Brainstorming colaborativo de design

> Status: **FUNCIONAL** (bundled em 2026-05-18 do Anthropic Superpowers via re-implementação).

## Por que existe

Sem brainstorming, IA pula pro código com premissas erradas. **Suposições não-examinadas viram trabalho desperdiçado.** Projetos "simples demais pra precisar design" são os piores ofensores — onde retrabalho silencioso é maior.

Esta skill **força** etapa de design antes de qualquer implementação. Termina com:
- Design aprovado pelo Davi
- Spec escrita em `docs/decisoes/<data>-<tema>.md` (KOD.AI default)
- Skill `/break` (ou `writing-plans` se bundled depois) invocada pra próxima fase

## Hard Gate

**NÃO** invoque skill de implementação, NÃO escreva código, NÃO inicie scaffold, NÃO toque arquivos de implementação **até que o design tenha sido apresentado e o Davi aprovou**. Vale pra **todo** projeto independente da percepção de simplicidade.

## Workflow

### Passo 1 — Explorar contexto do projeto

Antes de perguntar nada, lê:
- Arquivos relevantes ao tema
- Docs em `docs/` se houver
- Commits recentes (`git log --oneline -10`)
- Pendências em `_negocio/PENDENCIAS.md` ou inbox

Não pula essa etapa — perguntar sem contexto produz design ruim.

### Passo 2 — Verificar escopo (decompor se necessário)

Se o pedido descreve múltiplos subsistemas independentes (ex: "plataforma com chat + storage + billing + analytics"), **NÃO** começar a desenhar. **Decompor primeiro:**

> "Isso aqui me parece N subsistemas independentes: [lista]. Cada um merece spec própria. Sugiro começar pelo X porque [razão]. Faz sentido?"

Cada sub-projeto vira sua própria spec → plan → implementação.

### Passo 3 — Perguntas clarificadoras (uma por vez)

**Nunca enfileira.** Uma pergunta, espera resposta, próxima.

Foco em entender:
- **Propósito** — o que o usuário quer alcançar (não só o que pediu)
- **Restrições** — limites técnicos, prazo, orçamento, dependências
- **Critério de sucesso** — como saber se ficou bom

Prefere perguntas com opções (AskUserQuestion estruturado) sobre texto aberto. Cada pergunta uma mensagem.

### Passo 4 — Propor 2-3 abordagens

Apresenta com tradeoffs explícitos:

```
Abordagem A — [nome] (recomendada)
  Como: [resumo 2-3 linhas]
  Pros: [pontos fortes]
  Contras: [pontos fracos]

Abordagem B — [nome]
  ...

Abordagem C — [nome]
  ...

Eu recomendo A porque [razão]. Mas quero saber o que tu pensa antes de fechar.
```

Lidera com sua recomendação + razão. Sem hedge.

### Passo 5 — Apresentar design (em seções)

Após escolha de abordagem, escreve design escalado à complexidade:
- **Simples:** 5-10 linhas
- **Nuançado:** 200-300 palavras por seção

Cobre tipicamente:
- **Arquitetura** — componentes principais e como se conectam
- **Componentes** — cada peça e sua responsabilidade
- **Fluxo de dados** — como info circula
- **Erros** — o que pode dar errado, como tratar
- **Testes** — como validar (matriz mínima)

**Apresenta seção por seção.** Após cada, pergunta:
> "Essa parte tá fazendo sentido? Antes de seguir, ajusta algo?"

Volta e clarifica se algo não bate.

### Passo 6 — Princípios de design

Aplica em todo design:

- **Isolamento + clareza:** cada unidade tem 1 propósito claro, comunica via interface bem-definida, pode ser entendida/testada independente
- **Boundaries por responsabilidade**, não por camada técnica
- **YAGNI ruthlessly:** remove qualquer feature não-essencial
- **Unidades pequenas e focadas** > grandes que fazem demais
- **Em código existente:** explora estrutura primeiro, segue padrões; só refactora o que está no caminho

### Passo 7 — Escrever spec

Após design aprovado, escreve em:

```
docs/decisoes/<YYYY-MM-DD>-<topico>.md
```

(Path KOD.AI default — preferências do projeto sobrescrevem.)

Estrutura típica da spec:
- Status + Origem
- Visão Geral
- Problema (sintoma, por que é problema, quem é afetado)
- Solução proposta
- Decisões pendentes (D1, D2...)
- Critérios de aceite
- Fora de escopo
- Conexões com outras specs

Commit imediato após escrever (preferência commit+push).

### Passo 8 — Self-review da spec

Após escrever, **revisa com olhos frescos**:

1. **Placeholders:** algum "TBD", "TODO", seção incompleta, requisito vago? **Conserta inline.**
2. **Consistência interna:** seções se contradizem? Arquitetura bate com descrições de feature?
3. **Escopo:** dá pra plano único, ou precisa decompor?
4. **Ambiguidade:** algum requisito pode ser lido de 2 formas diferentes? **Escolhe uma, deixa explícito.**

Conserta inline. Sem re-review depois.

### Passo 9 — Gate humano do Davi

Após self-review, pede:

> "Spec escrita e commitada em `<path>`. Dá uma olhada e me diz se quer ajustar antes do `/break`."

**Aguarda resposta.** Se pedir mudanças, aplica e roda self-review de novo. Só prossegue após OK.

### Passo 10 — Transição pra `/break`

Quando aprovada, anuncia:

> "Spec aprovada. Próximo passo: `/break` — quebrar em tasks atômicas."

E invoca `/break` (ou `/plan` se bundled depois).

**Estado terminal: invocar `/break`.** NÃO invoca skill de implementação direto. NÃO invoca `/criar-pack`, `/criar-contexto` etc. ÚNICO próximo passo é `/break` (ou `/plan`).

## Princípios-chave

- **Uma pergunta por vez** — não sobrecarrega
- **Multiple choice quando possível** — mais fácil que aberto
- **YAGNI ruthlessly** — corta features não-essenciais
- **Explora alternativas** — sempre 2-3 abordagens antes de fechar
- **Validação incremental** — apresenta design, aprova, avança
- **Seja flexível** — volta e clarifica quando algo não bate

## Antipattern: "Isso é simples demais pra ter design"

Todo projeto passa por esse processo. Todo list, função utility, mudança de config — todos. **Projetos "simples" são onde suposições não-examinadas causam mais desperdício.** Design pode ser curto (algumas frases pra projetos verdadeiramente simples), mas **você DEVE apresentar e obter aprovação.**

## Atribuição (D5 confirmado: atribuição obrigatória mesmo em re-implementação)

Esta skill foi **bundled em 2026-05-18** por re-implementação a partir do `brainstorming` do plugin **Anthropic Superpowers** (`~/.claude/skills/brainstorming/`). Conceito original + método + checklist de etapas vêm do trabalho da Anthropic. Re-implementação em voz KOD.AI sem cópia verbatim; ver `manifest.yaml` desta pasta + `LICENSES.md` na raiz do KODAI.

## Diferenças vs source original

- Spec destination: `docs/decisoes/` (padrão KOD.AI) vs `docs/superpowers/specs/` (padrão Superpowers)
- Next skill invoked: `/break` (padrão KOD.AI) vs `writing-plans` (padrão Superpowers)
- Removido: seção "Visual Companion" (depende de feature específica não-portada nesta onda; pode virar bundle futuro)
- Removido: bloco DOT graph (substituído por workflow numerado em texto — mais terse)
- Adaptado: preferência commit+push imediato no Passo 7 (regra Davi 2026-05-18)
