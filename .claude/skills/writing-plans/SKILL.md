---
name: writing-plans
description: >
  Use quando você tem uma spec aprovada ou requisitos pra task multi-step,
  ANTES de tocar código. Escreve plano de implementação executável task-a-task,
  com paths exatos, código completo em cada passo, comandos exatos, TDD frequente.
  Termina com plano commitado + opção de execução (subagent vs inline). Use sempre
  que disser "agora plano", "/writing-plans", "preciso plano antes de codar",
  "quebrar essa spec em tarefas executáveis", ou após `/brainstorming` aprovar spec.
allowed-tools: [Read, Write, Bash, Glob, Grep, AskUserQuestion]
---

# /writing-plans — Escrita de planos de implementação

> Status: **FUNCIONAL** (bundled em 2026-05-18 do Anthropic Superpowers via re-implementação).

## Princípio

Plano bom assume que quem executa **tem zero contexto** do codebase. Documenta tudo: quais arquivos tocar por task, código completo, testes, comandos exatos com output esperado. Quebra trabalho em tarefas bite-size. **DRY. YAGNI. TDD. Commits frequentes.**

Premissa do leitor: engenheiro hábil, mas conhece pouco do toolset/domínio do projeto, e não tem grande intuição de design de testes.

## Quando usar

- Após `/brainstorming` aprovar spec
- Ao receber requisitos pra task multi-step (3+ commits)
- Quando precisa quebrar trabalho em sequência executável
- ANTES de qualquer commit de implementação

## Quando NÃO usar

- Mudança trivial de 1-2 linhas (escreve direto)
- Bug fix óbvio sem ambiguidade
- Rename de variável sem impacto comportamental

## Anúncio de início

Ao começar:

> "Estou usando `/writing-plans` pra criar o plano de implementação."

## Contexto: worktree dedicada

Idealmente roda em **worktree dedicada** (criada pelo `/brainstorming` ou manualmente via `git worktree`). Isola o trabalho do plano sendo escrito.

## Onde salvar

Padrão KOD.AI:

```
docs/decisoes/tasks/<YYYY-MM-DD>-<tema>/PLAN.md
```

Preferências do projeto sobrescrevem.

## Verificação de escopo

Se a spec cobre **múltiplos subsistemas independentes**, devia ter sido quebrada em sub-specs no `/brainstorming`. Se não foi:

> "Esta spec parece cobrir N subsistemas independentes: [lista]. Sugiro fazer plano separado pra cada — cada plano produz software funcional e testável por si só. Faz sentido?"

Cada sub-plano roda independente.

## Estrutura de arquivos (mapear antes das tasks)

**Antes de definir tasks**, mapeia quais arquivos serão criados ou modificados e qual a responsabilidade de cada. **Decisões de decomposição se fixam aqui.**

Princípios:

- **Unidades com boundaries claras e interfaces bem-definidas.** Cada arquivo tem 1 responsabilidade.
- **Arquivos pequenos focados > grandes que fazem demais.** Você raciocina melhor sobre código que cabe no contexto; edits são mais confiáveis em arquivos focados.
- **Arquivos que mudam juntos vivem juntos.** Split por responsabilidade, não por camada técnica.
- **Em codebase existente:** segue padrões estabelecidos. Não restrutura unilateralmente — mas se um arquivo que você está modificando cresceu demais, incluir split no plano é razoável.

Essa estrutura informa a decomposição em tasks. Cada task produz mudanças self-contained que fazem sentido independente.

## Granularidade bite-sized (cada passo = 1 ação 2-5 min)

Padrão de passos por task:

- "Escreve o teste que falha" — passo
- "Roda pra confirmar que falha" — passo
- "Implementa código mínimo pra teste passar" — passo
- "Roda testes pra confirmar que passam" — passo
- "Commit" — passo

## Header obrigatório do plano

Todo plano começa com:

```markdown
# [Feature Name] — Plano de Implementação

> Pra executores agentic: USE `/executing-plans` ou `/subagent-driven-development`
> (se bundled) pra implementar task-a-task. Passos usam checkbox `- [ ]` pra tracking.

**Goal:** [1 frase descrevendo o que constrói]

**Arquitetura:** [2-3 frases sobre abordagem]

**Stack:** [Tecnologias/bibliotecas chave]

---
```

## Estrutura de task

````markdown
### Task N — [Componente]

**Arquivos:**
- Criar: `path/exato/para/file.py`
- Modificar: `path/exato/para/existente.py:123-145`
- Test: `tests/path/exato/para/test.py`

- [ ] **Passo 1: Escreve o teste que falha**

```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

- [ ] **Passo 2: Roda teste pra confirmar que falha**

Roda: `pytest tests/path/test.py::test_name -v`
Esperado: FAIL com "function not defined"

- [ ] **Passo 3: Implementação mínima**

```python
def function(input):
    return expected
```

- [ ] **Passo 4: Roda teste pra confirmar que passa**

Roda: `pytest tests/path/test.py::test_name -v`
Esperado: PASS

- [ ] **Passo 5: Commit**

```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: adiciona feature específica"
```
````

## Sem placeholders

Cada passo tem o conteúdo exato que o engenheiro precisa. **Essas são falhas do plano** — nunca escreva:

- "TBD", "TODO", "implementar depois", "preencher detalhes"
- "Adicionar tratamento de erro apropriado" / "adicionar validação" / "lidar com edge cases"
- "Escrever testes pra cima" (sem código de teste)
- "Similar à Task N" (repete o código — o engenheiro pode ler tasks fora de ordem)
- Passos que descrevem o que fazer sem mostrar como (blocos de código obrigatórios pra passos de código)
- Referências a tipos/funções/métodos não definidos em nenhuma task

## Lembre-se

- Paths exatos sempre
- Código completo em cada passo — se o passo muda código, mostra o código
- Comandos exatos com output esperado
- DRY, YAGNI, TDD, commits frequentes

## Self-review

Após escrever o plano completo, **revisa com olhos frescos** comparando com a spec:

**1. Cobertura da spec:** percorre cada seção/requisito da spec. Aponta task que implementa cada um. Lista gaps.

**2. Scan de placeholders:** procura red flags da seção "Sem placeholders" acima. Conserta.

**3. Consistência de tipos:** tipos, assinaturas, propriedades nas tasks tardias batem com o que foi definido nas tasks iniciais? Função chamada `clearLayers()` na Task 3 mas `clearFullLayers()` na Task 7 é bug.

Conserta inline. Sem re-review depois. Se acha requisito da spec sem task, **adiciona a task.**

## Handoff de execução

Após salvar o plano, oferece escolha:

> "Plano completo salvo em `docs/decisoes/tasks/<filename>.md`. Duas opções de execução:
>
> **1. Subagent-Driven (recomendado)** — dispatch fresh subagent por task, review entre tasks, iteração rápida
>
> **2. Inline Execution** — executa tasks nesta sessão usando `/executing-plans`, com checkpoints batched
>
> Qual abordagem?"

### Se Subagent-Driven:
- **REQUIRED SUB-SKILL:** `/subagent-driven-development` (se bundled)
- Fresh subagent por task + two-stage review

### Se Inline Execution:
- **REQUIRED SUB-SKILL:** `/executing-plans` (se bundled)
- Batch execution com checkpoints pra review

## Atribuição

Esta skill foi **bundled em 2026-05-18** por re-implementação a partir do `writing-plans` do plugin **Anthropic Superpowers** (`~/.claude/skills/writing-plans/`). Estrutura + método + checklist vêm do trabalho da Anthropic. Re-implementação em voz KOD.AI sem cópia verbatim; ver `manifest.yaml` desta pasta + `LICENSES.md` na raiz do KODAI.

## Diferenças vs source original

- Path de salvar: `docs/decisoes/tasks/` (padrão KOD.AI) vs `docs/superpowers/plans/`
- Header obrigatório referencia `/executing-plans` ou `/subagent-driven-development` (com nota "se bundled" — pendente até próxima onda)
- Tom adaptado pra português (source é EN)
- Removido: bloco "Spec coverage from another agent" (premissa diferente — KOD.AI pode rodar inline)
