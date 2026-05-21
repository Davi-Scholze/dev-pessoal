---
name: writing-skills
description: >
  Como escrever skill bem — princípios de estrutura, frontmatter pushy,
  progressive disclosure, TDD aplicada a documentação. Use ao criar skill
  nova ou editar existente. Requer entender test-driven-development primeiro
  (o ciclo Red-Green-Refactor adapta a este domínio). Combina com
  skill-creator (workflow operacional de criar+iterar).
allowed-tools: [Read, Write, Edit, Bash, Glob]
---

# Skill — Como escrever skills bem

## Princípio

> **Escrever skill é TDD aplicado a documentação.**

Você escreve **test cases** (cenários de pressão com sub-agente), **vê falhar** (baseline: agente sem a skill viola a regra), **escreve a skill** (documentação), **vê passar** (agente com a skill cumpre), e **refatora** (fecha brechas que a skill deixou abertas).

Decisão central: **se você não viu agente falhar SEM a skill, você não sabe se a skill ensina o que importa.**

Requer entender `test-driven-development` primeiro — o ciclo Red-Green-Refactor é o mesmo, só que aplicado a comportamento de agente sob pressão, não a função em código.

---

## O que é skill (e o que NÃO é)

**Skill é:** referência reutilizável de técnica, padrão, ou ferramenta provada. Ajuda instâncias futuras de IA a achar e aplicar abordagem efetiva.

**Skill NÃO é:** narrativa de "como resolvi este problema uma vez". Não é blog post. Não é diário.

| Skill é | Skill não é |
|---|---|
| Técnica reutilizável | One-off solution |
| Padrão de raciocínio | Standard prática já bem documentada em outro lugar |
| Referência ferramentas/API | Convenção de projeto específico (vai pra `CLAUDE.md`) |
| Guia pra IA | Constraint mecânica (se dá pra automatizar com regex/validação, automatize) |

---

## TDD mapeada a skills

| TDD em código | TDD em skill |
|---|---|
| **Test case** | Cenário de pressão com sub-agente |
| **Production code** | Skill document (SKILL.md) |
| **Test fails (RED)** | Agente viola regra sem a skill (baseline) |
| **Test passes (GREEN)** | Agente cumpre quando skill presente |
| **Refactor** | Fechar brechas mantendo conformidade |
| **Escrever teste primeiro** | Rodar cenário baseline ANTES de escrever skill |
| **Ver falhar** | Documentar as racionalizações que o agente usa |
| **Código mínimo** | Skill mínima que endereça aquelas violações específicas |
| **Ver passar** | Verificar que agente agora cumpre |
| **Ciclo refactor** | Achar nova racionalização → fechar → re-verificar |

O processo inteiro de criação de skill segue RED-GREEN-REFACTOR.

---

## Quando criar skill

**Crie quando:**

- A técnica não foi intuitivamente óbvia pra você
- Você referenciaria isso de novo em outros projetos
- O padrão aplica amplamente (não específico ao projeto)
- Outras pessoas/IAs se beneficiariam

**NÃO crie pra:**

- Solução one-off
- Prática padrão bem documentada em outro lugar
- Convenção de projeto específico (vai pra `CLAUDE.md`)
- Constraint mecânica (use regex/validation/linter)

---

## Tipos de skill

| Tipo | O que é | Exemplos |
|---|---|---|
| **Técnica** | Método concreto com passos | `using-git-worktrees`, `condition-based-waiting` |
| **Padrão** | Modo de pensar problemas | `flatten-with-flags`, `test-invariants` |
| **Referência** | Docs de API, sintaxe, ferramenta | docs de framework, syntax guide |

---

## Estrutura de diretório

```
skills/
  <nome-da-skill>/
    SKILL.md              # Referência principal (obrigatória)
    <arquivo-suporte>.*   # Apenas se necessário
```

**Namespace flat:** todas as skills num só espaço pesquisável.

**Arquivos separados pra:**

1. **Referência pesada** (100+ linhas) — API docs, sintaxe abrangente
2. **Ferramentas reutilizáveis** — scripts, templates, código que executa

**Mantém inline:**

- Princípios e conceitos
- Code patterns curtos (< 50 linhas)
- Tudo mais

---

## Estrutura do `SKILL.md`

### Frontmatter YAML (obrigatório)

```yaml
---
name: <slug-em-kebab>             # letras, números, hifens (sem parênteses ou espaços)
description: >                     # quando usar (terceira pessoa, "Use when...")
  Frase 1 sobre o que a skill faz
  + lista de gatilhos explícitos pra IA disparar
allowed-tools: [Tool, Tool, ...]   # subset de tools permitidas (opcional)
---
```

**Max 1024 caracteres** no frontmatter total. Mais que isso = compressão.

### `name`

Slug kebab-case. Sem parênteses, sem espaços, sem caracteres especiais. Exemplos:
- `code-review` ✅
- `Code Review` ❌
- `code_review` ❌ (underline, preferir hífen)

### `description` — TERCEIRA PESSOA, foca em **quando usar**

Não escreva sobre **o que a skill faz** em primeira pessoa. Escreve sobre **quando aplicar**.

✅ Bom:

```yaml
description: >
  Use when encountering any bug, test failure, or unexpected behavior,
  before proposing fixes. Especially when under time pressure or after
  multiple failed fix attempts.
```

❌ Ruim:

```yaml
description: >
  This skill helps debug things systematically.
```

### Descrição "pushy" — combate sub-trigger

IA tem tendência a **sub-disparar** skills (não usar quando seria útil). Combate com descrição explícita de gatilhos:

✅ Pushy (correto):

```yaml
description: >
  Como construir dashboard interno simples e rápido. Use SEMPRE que o
  usuário mencionar dashboard, visualização de dados, métricas internas,
  ou quiser exibir QUALQUER tipo de dado da empresa — mesmo se NÃO disser
  explicitamente 'dashboard'.
```

❌ Tímida:

```yaml
description: >
  Como construir dashboard interno simples e rápido.
```

A frase "mesmo se NÃO disser explicitamente X" e a lista de gatilhos triplica a taxa de disparo correta.

---

## Progressive Disclosure (3 níveis)

Skills carregam em 3 níveis:

| Nível | O que tem | Quando carrega |
|---|---|---|
| 1 | Metadata (name + description) | Sempre em contexto (~100 palavras) |
| 2 | Corpo de `SKILL.md` | Quando skill dispara (< 500 linhas ideal) |
| 3 | Recursos bundled | Sob demanda (scripts executam sem precisar carregar) |

**Padrões-chave:**

- Mantém `SKILL.md` sob 500 linhas. Se ultrapassar, **adiciona hierarquia** com ponteiros claros pra onde ler depois
- Referencia arquivos auxiliares **explicitamente** ("ver `<arquivo>.md` quando precisar de X")
- Pra arquivo auxiliar > 300 linhas, inclui table of contents

---

## Anti-padrões clássicos

| ❌ Errado | ✅ Certo |
|---|---|
| Descrição em primeira pessoa ("Esta skill faz...") | Terceira pessoa focada em "Use when..." |
| Descrição tímida ("ajuda com X") | Lista de gatilhos explícitos (pushy) |
| Skill como diário de incidente | Skill como referência reutilizável |
| 1000 linhas no `SKILL.md` | Hierarquia: principal < 500 + auxiliares |
| Frontmatter > 1024 chars | Compressão obrigatória |
| `name` com espaço/parêntese/underscore | kebab-case sempre |
| Skill pra coisa que regex/linter resolve | Automatiza no harness, não em prosa |

---

## Padrão de pressure scenario (RED na fonte)

Antes de escrever skill, monta cenário onde sub-agente sem a skill **provavelmente falha**:

```
You are an agent helping a developer. The developer asks you to <ação que
deveria seguir um padrão específico>.

<contexto que torna a tentação grande de pular o padrão>

What do you do?
```

Roda 3-5 vezes. Documenta:

1. **Quais racionalizações** o agente usa
2. **Em qual passo** ele desvia
3. **Quão consistente** é o desvio (3/5? 5/5?)

Skill mínima endereça **essas racionalizações específicas**. Não tenta cobrir tudo.

---

## Como medir que a skill funciona

Após escrever skill, roda o **mesmo** pressure scenario, agora com a skill carregada:

- ✅ Agente cumpre 3/5 vezes → progresso, mas falha em 2/5 = brechas a fechar
- ✅ Agente cumpre 5/5 vezes → GREEN; entra em REFACTOR procurando edge cases
- ❌ Agente cumpre 0-2/5 vezes → skill não tá ensinando o que importa, reescreve

REFACTOR: depois de GREEN, vê **se há nova racionalização** que a skill não previu. Se sim → expande a skill → re-mede.

---

## Casamento com outras skills/políticas

- **`test-driven-development`** — **pré-requisito** desta skill (TDD em código é base do TDD em skill)
- **`skill-creator`** — workflow operacional de criar+iterar; usa esta skill como guia de **como escrever bem** durante a criação
- **`code-review`** — review de PR que adiciona skill nova usa esta como referência de qualidade
- **`verification-before-completion`** — antes de declarar skill "pronta", roda o pressure scenario fresco (Iron Law aplicada a skill)
- **`/criar-pack`** (KOD.AI) — pra packs (capacidades técnicas), não skills universais
- **`/criar-contexto`** (KOD.AI) — pra contextos-domínio, não skills

---

## Checklist antes de declarar skill pronta

- [ ] Frontmatter com `name` (kebab-case) + `description` em 3ª pessoa, pushy, focada em "when"
- [ ] Frontmatter sob 1024 chars
- [ ] `SKILL.md` corpo sob 500 linhas (ou hierarquia clara com ponteiros pra auxiliares)
- [ ] Pressure scenario rodado **antes** de escrever (RED documentado)
- [ ] Skill mínima endereça as racionalizações observadas
- [ ] Pressure scenario re-rodado **depois** (GREEN confirmado, idealmente 5/5)
- [ ] REFACTOR rodado — nova racionalização achada e fechada (ou confirmado que não há)
- [ ] Casamento com outras skills/políticas declarado
- [ ] Anti-padrões listados pra o leitor evitar

Não conseguiu marcar tudo? Skill não está pronta.

---

## Diretrizes oficiais (Anthropic)

Pra padrões oficiais Anthropic de skill authoring, ver `anthropic-best-practices.md` (não bundled aqui — link no manifest). Este documento adiciona padrões e diretrizes que complementam a abordagem TDD-driven desta skill.

---

## Atribuição

Re-implementação universalizada da skill `writing-skills` Anthropic Superpowers (Apache-2.0). Decisão central preservada: skill writing é TDD aplicado a documentação. Mapeamento TDD → Skills + pressure scenario como mecanismo RED + descrição "pushy" como combate a sub-trigger + 3 níveis de progressive disclosure preservados. Estrutura reorganizada, tabela "Skill é / não é" reformulada, casamento explícito com skills KOD.AI adicionado. Branding Superpowers e referência a `anthropic-best-practices.md` (não bundled) preservada como ponteiro externo.
