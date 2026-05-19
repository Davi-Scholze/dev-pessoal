---
name: mapear-rotinas
description: >
  Mapeia tarefas repetitivas que o usuário faz no dia a dia e gera skills
  personalizadas pra automatizá-las. Faz entrevista curta sobre o que se
  repete toda semana, propõe skills concretas e cria as aprovadas em
  `.claude/skills/`. Use sempre que o usuário disser "mapear rotinas",
  "criar skills personalizadas", "automatizar minhas tarefas", "o que dá
  pra automatizar", "/mapear-rotinas", ou quando detectar padrão de
  repetição em 2+ turnos da conversa atual ("já fiz isso outro dia
  também", "toda semana eu...", "sempre que cliente X pede...").
allowed-tools: [Read, Write, Glob, Bash]
---

# /mapear-rotinas — Mapeamento de tarefas repetitivas em skills

Skill de descoberta + criação. Objetivo: transformar o que o usuário repete em automações ativas.

Segue o workflow oficial Anthropic skill-creator (capture intent → interview → draft → test → iterate).

## Workflow

### Passo 1 — Capture intent (do contexto)

Se a conversation atual já contém workflow que o usuário pediu pra automatizar:
- Extrair: tools usados, sequência de steps, correções feitas, formato input/output
- Confirmar com usuário antes de prosseguir pra interview

Se não há contexto direto, ir pra Passo 2.

### Passo 2 — Entrevista de descoberta

3 perguntas, uma por vez:

1. "Quais 3 tarefas você repete toda semana e gostaria de não ter que pensar mais?"
   *(ex: 'criar carrossel', 'mandar relatório pro cliente', 'fazer briefing')*

2. "Pra cada uma delas, qual o input típico?"
   *(ex: 'um link de notícia', 'um arquivo de planilha', 'um nome de cliente')*

3. "E o que você espera de output?"
   *(ex: '5 slides em PNG', 'um email pronto pra enviar', 'um PDF resumindo')*

### Passo 3 — Conferir catálogo existente

Antes de criar skill nova, conferir se já existe coisa parecida em:

- `<KODAI>/2-PACKS/META-INDEX.md` (packs disponíveis)
- `<KODAI>/1-ESQUELETO/skills-universais/` (skills universais KOD.AI)
- `.claude/skills/` (skills locais já criadas no projeto)

Se sim:
> "A tarefa X já é resolvida pela skill `/<nome>` (existe em `<path>`). Quer ativar ela em vez de criar nova? Ou prefere uma versão customizada?"

### Passo 4 — Proposta de skills (uma a uma)

Pra cada tarefa SEM cobertura existente, propor:

```
### /<nome-da-skill>
**O que faz:** <uma frase>
**Input:** <o que recebe>
**Output:** <o que entrega>
**Dependências:** <arquivos de _memoria/, _negocio/identidade/, ou ferramentas externas>
**Trigger:** <palavras que ativam>
```

Mostrar todas as propostas juntas e perguntar:
> "Quais skills dessa lista você quer que eu crie agora? (todas, algumas, ou nenhuma — também pode pedir ajustes)"

### Passo 5 — Criação das skills aprovadas

Pra cada skill aprovada:

1. **Criar pasta** `.claude/skills/<nome>/`
2. **Criar `SKILL.md`** com:
   - Frontmatter: `name`, `description` (**PUSHY** — lista de gatilhos explícitos, instrução pra não undertrigger)
   - Workflow estruturado em passos
   - Lista de dependências (arquivos de contexto, ferramentas externas)
   - Regras claras (o que sempre fazer, o que nunca fazer)
3. **Se a skill precisar de templates ou exemplos**, criar dentro da pasta da skill
4. **Calibrar tom e regras** conforme `_memoria/preferencias.md` e `_memoria/empresa.md`

### Passo 6 — Teste prompts opcional

Pra cada skill criada, perguntar:
> "Quer que eu crie 2-3 prompts de teste pra validar que a skill triggera certo?"

Se sim:
- Criar `<skill>/test-prompts.md` com casos:
  - Caso óbvio (deve triggerar)
  - Caso ambíguo (deveria triggerar mas formulação diferente)
  - Caso oposto (NÃO deve triggerar — checa false positive)

### Passo 7 — Resumo

```
Criei [N] skills:
✓ /<nome1> — em .claude/skills/<nome1>/SKILL.md
✓ /<nome2> — em .claude/skills/<nome2>/SKILL.md
...

Pra usar: digita / e o nome da skill em qualquer sessão.
Pra ajustar uma skill depois: edita o SKILL.md correspondente.
Pra testar trigger accuracy: roda os prompts em test-prompts.md
```

## Regras

- **Não criar skill pra tarefa que aconteceu uma vez só** — tem que ser repetível
- **Não criar mais de 5 skills por sessão** — se usuário pedir mais, dividir em rodadas
- **Cada skill criada precisa pushy description** — sem isso a skill nunca triggera
- **Cada skill precisa de `allowed-tools` whitelist** (princípio segurança)
- Se skill depender de ferramenta que usuário não tem (ex: API Notion sem MCP), avisar antes de criar e oferecer versão simplificada
- Local default: `.claude/skills/<nome>/` (escopo projeto). Se for útil em qualquer projeto: oferecer instalar global em `~/.claude/skills/<nome>/`.

## Falhas conhecidas

- Skill sem trigger acionar: description não é "pushy" o suficiente. Use `/criar-perfil` skill-description-optimizer (futuro v1.2).
- Tarefa que parecia repetível só aconteceu 1 vez: deletar skill com pouco uso após 30 dias.
