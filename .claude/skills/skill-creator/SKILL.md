---
name: skill-creator
description: >
  Workflow operacional pra CRIAR + ITERAR + OTIMIZAR skills. Captura
  intent → desenha → testa → grava eval → revisa → repete. Pareia com
  writing-skills (princípios de skill bem escrita). Use quando o usuário
  disser "criar skill", "/skill-creator", "iterar essa skill", "rodar
  evals", "benchmark de skill", "otimizar descrição da skill".
allowed-tools: [Read, Write, Edit, Bash, AskUserQuestion, Glob, Grep]
---

# Skill — Skill Creator (workflow operacional)

## Princípio

Criar skill **não é escrever uma vez e esquecer** — é ciclo iterativo: capturar intent → desenhar draft → testar com prompts reais → revisar resultado → refinar. Sem ciclo, skill nasce frágil; com ciclo, skill chega a BATTLE-TESTED.

Esta skill é **workflow operacional**. Os **princípios** de como escrever bem (frontmatter pushy, progressive disclosure, TDD aplicada a documentação) ficam em `writing-skills` (bundled — irmã). Use ambas juntas.

---

## Estágios do ciclo

```
1. Capturar intent          → Entrevista curta com o usuário
2. Pesquisar (paralelo)     → Skills similares + best practices via subagentes
3. Escrever draft           → Aplica writing-skills (frontmatter + estrutura)
4. Test prompts             → Cria 2-3 prompts reais que disparariam a skill
5. Rodar evals              → Com skill vs sem skill (baseline) em paralelo
6. Gradear + benchmark      → Pass rate / tempo / tokens por configuração
7. Apresentar ao usuário    → Outputs qualitativos + métricas quantitativas
8. Ler feedback             → Onde melhorou; onde piorou; nova rodada se precisa
9. Iterar até suficiente    → Cada iteração foca nos test cases com complaint
10. Otimizar descrição      → Pushy pra triggering correto (combate sub-trigger)
```

Use a posição do usuário no ciclo pra decidir o que fazer. Não rodar passos já feitos sem motivo.

---

## Passo a passo

### Estágio 1 — Capturar intent

Antes de escrever qualquer coisa, entender:

| Pergunta | Por quê importa |
|---|---|
| O que a skill deve **habilitar** o agente a fazer? | Define a função em 1 frase |
| **Quando** a skill deve disparar? | Define a description com gatilhos |
| **Formato de saída esperado?** | Schema, estrutura, exemplos |
| **Test cases verificáveis?** | Skills com output objetivo se beneficiam de eval; outputs subjetivos (estilo, design) raramente |

Extrai respostas do histórico da conversa primeiro. Usuário pode ter dito tudo sem perceber ("transforma isso em skill") — releia turnos anteriores antes de perguntar.

### Estágio 2 — Pesquisar em paralelo

Antes de escrever, verificar:

- **Skill similar já existe** no KOD.AI? Busca em `1-ESQUELETO/skills-universais/` + `1-ESQUELETO/skills-universais/_bundled-skills-manifest.yaml`
- **Best practices** específicas ao domínio? Se sim, sub-agente Explore pesquisa
- **MCPs/APIs** relevantes? Lista pra incluir em `allowed-tools`

Em paralelo, não inline. Sub-agente faz o trabalho de pesquisa enquanto você continua entrevista com usuário.

### Estágio 3 — Escrever draft

Aplicar `writing-skills` (bundled). Componentes obrigatórios:

```yaml
---
name: <slug-kebab>
description: >
  Use when <gatilho 1> ou <gatilho 2> ou ... — pushy, 3ª pessoa, lista
  triggers explícitos (combate sub-trigger).
allowed-tools: [<tools necessárias>]
---

# Skill — <Nome legível>

## Princípio
<o que a skill faz + por que existe — 2-3 parágrafos>

## Workflow
<passos sequenciais>

## Anti-padrões
<table>

## Casamento com outras skills/políticas
<lista>

## Atribuição (se re-implementação)
<fonte + licença + estratégia>
```

Sem essa estrutura mínima, skill não nasce viável.

### Estágio 4 — Test prompts

Após draft, propõe 2-3 prompts realistas:

> "Aqui estão 2-3 test cases que eu rodaria. Confere?
>
> 1. *<prompt 1>* — espero output: <descrição>
> 2. *<prompt 2>* — espero output: <descrição>
> 3. *<prompt 3>* — espero output: <descrição>
>
> Quer adicionar mais? Mudar algum?"

Salva em `<skill-name>-workspace/evals/evals.json`:

```json
{
  "skill_name": "<nome>",
  "evals": [
    { "id": 1, "prompt": "<prompt>", "expected_output": "<descrição>", "files": [] }
  ]
}
```

### Estágio 5 — Rodar evals em paralelo

Pra cada test case, **2 rodadas simultâneas no mesmo turno**:

- **Com a skill** carregada — sub-agente recebe path da skill + prompt + salva outputs em `iteration-N/eval-<ID>/with_skill/`
- **Baseline sem skill** — mesmo prompt sem skill carregada, salva em `iteration-N/eval-<ID>/without_skill/`

Não rodar uma config primeiro e a outra depois — disparar **ambas no mesmo turno** em background.

Cada eval ganha `eval_metadata.json` com `eval_id` + `eval_name` descritivo (não "eval-0") + `prompt` + `assertions` (inicialmente vazio).

### Estágio 6 — Gradear + benchmark

Enquanto runs estão em background, **rascunha assertions** quantitativas. Bons critérios:

- **Objetivamente verificáveis** (regex, exit code, contagem)
- **Nomes descritivos** ("output contains 'X'", não "assertion 1")
- **Sem forçar subjetivo** — pra skills de estilo/design, deixar qualitativo

Quando runs terminam:

1. **Grade cada run** — assertion-by-assertion, salva em `grading.json` por run (campos exatos: `text` / `passed` / `evidence`)
2. **Aggregate em benchmark** — pass rate + tempo + tokens por configuração (with_skill vs without_skill), com mean ± stddev
3. **Análise de patterns** — assertions que sempre passam (não-discriminantes), evals de alta variância (flaky), trade-offs tempo×tokens

### Estágio 7 — Apresentar ao usuário

Mostra outputs qualitativos + métricas quantitativas:

```markdown
## Resultado iteração N

**Pass rate:** <X>% com skill vs <Y>% sem (delta: +<Z>%)
**Tempo médio:** <X>s com skill vs <Y>s sem
**Tokens médios:** <X> com skill vs <Y> sem (delta: +<Z>)

### Outputs por test case

[Tabela com link pros outputs reais — usuário lê e dá feedback]
```

### Estágio 8 — Ler feedback

Usuário deixa comentários por eval. Lê `feedback.json` ou equivalente:

```json
{
  "reviews": [
    { "run_id": "eval-1-with_skill", "feedback": "<comentário>" }
  ]
}
```

**Feedback vazio = OK.** Foca refinamento nos evals com complaint específico.

### Estágio 9 — Iterar até suficiente

**Generalizar a partir do feedback** — usuário comenta em poucos exemplos, mas a skill será usada em milhões de prompts. Não enfia constraints específicas que só servem pros test cases revisados — tenta mudar **metáfora**, **padrão de raciocínio**, **estrutura** se houver problema estrutural.

Cada iteração = pasta `iteration-N/`. Salva snapshot da skill anterior (`skill-snapshot/`) pra baseline da próxima rodada apontar pra **versão anterior** em vez de "sem skill".

### Estágio 10 — Otimizar descrição (pushy)

Após N iterações satisfatórias, otimiza a `description` pra disparo correto. Tendência da IA é **sub-disparar**.

✅ Pushy correto:

```yaml
description: >
  Use SEMPRE que o usuário mencionar X, Y, Z ou QUALQUER variação —
  mesmo se NÃO disser explicitamente "X". Especialmente quando: <cenário 1>,
  <cenário 2>, <cenário 3>.
```

❌ Tímido:

```yaml
description: Helps with X tasks.
```

Pushy triplica taxa de disparo correto sem aumentar falsos positivos (regra-base 4 do KOD.AI).

---

## Quando uma skill não vale a pena

- Caso de uso **único** (one-off) — fica na conversa, não vira skill
- Convenção **específica ao projeto** — vai pra `AGENTS.md`, não skill
- Coisa **automatizável com regex/linter** — vira hook ou validation, não skill
- Tópico **bem documentado** em outro lugar (docs oficiais, repos canônicos) — referenciar, não recriar

Se em dúvida: **não criar**. Skill ruim cria ruído.

---

## Tipos comuns de skill

| Tipo | Exemplos |
|---|---|
| **Técnica** | `using-git-worktrees`, `condition-based-waiting`, `systematic-debugging` |
| **Padrão de raciocínio** | `brainstorming`, `flatten-with-flags`, `test-invariants` |
| **Referência (API/sintaxe)** | docs vendoring (ex: `notebooklm`), `transcribe-audio` |
| **Workflow operacional** | esta própria skill, `executing-plans`, `finishing-a-development-branch` |
| **Gate de qualidade** | `code-review`, `verification-before-completion` |

---

## Comunicação com o usuário

Skills atendem usuários com **familiaridade variada** com termos técnicos. Default: usar termos como "evaluation", "benchmark", "JSON", "assertion" **apenas** quando o usuário já demonstrou conforto com eles. Em dúvida, explicar brevemente:

> "Vou rodar **evals** — testes que comparam a skill funcionando vs sem skill. Resultado vira pass-rate + tempo médio."

---

## Anti-padrões

| ❌ Errado | ✅ Certo |
|---|---|
| Escrever skill e esquecer (sem evals) | Ciclo iterativo com test prompts + feedback |
| Test prompts inventados ("escrevi 5 cases") | Test prompts vindos do usuário real |
| Rodar with-skill primeiro, baseline depois | Disparar ambos no mesmo turno (paralelo) |
| Constraints específicas pros 3 cases revisados | Generalizar — usuário revisa 3, skill rodará em N |
| `description` tímida ("helps with X") | Pushy com lista de triggers + variações |
| Skill duplicando o que já existe | Pesquisar antes de criar |
| Pular feedback do usuário | Feedback dirige refinamento; sem ele, IA inventa rumo |

---

## Atribuição

Re-implementação universalizada da skill `skill-creator` Anthropic Superpowers (Apache-2.0, 33KB fonte → ~280 linhas compactas). Workflow de 10 estágios + estrutura de eval (paralelo with/without skill) + decisão "pushy" + comunicação com usuário variado preservados como decisão central. Scripts auxiliares específicos da fonte (`aggregate_benchmark.py`, `eval-viewer/generate_review.py`, `agents/grader.md`, `agents/analyzer.md`) NÃO bundled — referenciados conceitualmente; usuário implementa conforme stack. Casamento com `writing-skills` (irmã, princípios) e `subagent-driven-development` (paralelização) adicionado. Tom KOD.AI alinhado.
