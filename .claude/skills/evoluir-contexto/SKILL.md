---
name: evoluir-contexto
description: >
  Identifica proativamente quando um contexto do KOD.AI precisa de
  atualização (data >90 dias, contradição com input do usuário, lacuna
  evidente em consulta NotebookLM, eixo importante sem notebook). Não
  age destrutivamente — apenas sinaliza com sugestão específica. Quando
  aprovado, gera prompt padrão pra extensão Claude Chrome alimentar
  NotebookLM. Use sempre que detectar drift de contexto ou usuário pedir
  "evoluir contexto", "/evoluir-contexto", "atualiza esse contexto",
  "esse contexto tá velho".
allowed-tools: [Read, Write, Bash, Glob, Grep, AskUserQuestion]
---

# Skill — Evoluir Contexto (manutenção proativa)

## Princípio

Contexto envelhece. Fontes externas evoluem. Novo input contradiz documentação antiga. **Skill detecta drift e sinaliza** — usuário decide ação. Nunca atualiza silenciosamente; nunca inventa fontes; nunca pula anti-verbatim.

Combate context rot (capítulo 7 do CONTEXT-OS) preservando o princípio: **bruto é sagrado** + **anti-verbatim em qualquer integração** + **gate humano em ALTERA/DESCARTA** (mapeamento iterativo §5).

## Triggers de detecção

### 1. Contexto antigo

Arquivo `.md` com `Atualizado: <data>` no header **>90 dias** da data atual.

Detectado via:

```bash
# Listar .md com Atualizado > 90 dias
find . -name "*.md" -exec grep -l "Atualizado: 2026-0" {} \;  # exemplo
# Ou via skill /atualizar que tem auto-descoberta proativa
```

### 2. Contradição

Usuário menciona algo que **contradiz ou expande** o documentado:

- "Na real é assim: X" (contradiz)
- "Falta cobrir Y" (lacuna apontada)
- "Esse contexto não bate com o estado atual" (drift)

### 3. Lacuna em consulta NotebookLM

Quando skill `/notebooklm` consulta um tópico e a resposta indica:

- "Não tenho informação sobre X"
- Resposta superficial em comparação com expectativa
- Citações esparsas (poucas fontes)

### 4. Eixo importante sem NotebookLM vinculado

Pasta tem `README.md` declarando eixo Grounding ou Orchestration importante, mas sem `notebooklm.url`. Sinal de cobertura externa faltando.

## Comportamento

### Passo 1 — Sinalizar ao usuário com sugestão específica e acionável

NÃO sugerir genericamente. Formato:

> "O contexto **[X]** tem **[N] dias** sem atualização. Sugiro pesquisar **[tópico específico]** pra complementar o NotebookLM **[Y]**.
>
> Quer que eu gere o prompt padrão pra extensão Claude Chrome pesquisar agora?"

Se trigger for contradição ou lacuna:

> "Você acabou de mencionar **[X]**, mas o contexto **[arquivo.md]** diz **[Y]**. Possível drift detectado.
>
> Opções:
> 1. Atualizar `arquivo.md` agora com sua versão (passa pelo mapeamento iterativo — categoria ALTERA exige confirmação)
> 2. Pesquisar mais e alimentar NotebookLM **[Z]** pra ter visão atualizada
> 3. Ignorar — esta menção era pontual, não atualização estrutural
>
> Qual prefere?"

### Passo 2 — Não tomar ação destrutiva

- **Nunca** sobrescreve o `.md` antigo sem OK
- **Nunca** invalida o NotebookLM
- **Nunca** apaga referências
- **Apenas propõe**

### Passo 3 — Quando aprovado, gerar prompt padrão pra extensão Claude Chrome

```
Pesquise as melhores referências internacionais sobre: [TEMA].

Adicione até 100 fontes de alta qualidade no NotebookLM [URL]:
artigos, repositórios GitHub, papers, documentações oficiais.
Prioridade pra inglês + fontes técnicas de autoridade.

Se o NotebookLM oferecer resistência ou não aceitar de primeira,
persista e force a adição em lotes até completar.

Após adicionar, atualize o markdown [ARQUIVO] com:
- Novas fontes encontradas (top 10 listadas)
- Novos tópicos cobertos
- Data de atualização atualizada (campo "Atualizado:" do header)
- Seção "Aprofundamento via NotebookLM" expandida

Retorne o markdown atualizado completo.
Execute agora, sem perguntar confirmação.
```

Substituir `[TEMA]`, `[URL]`, `[ARQUIVO]` pelos valores do contexto em questão.

### Passo 4 — Após retorno da extensão (próxima sessão)

Quando usuário voltar com markdown atualizado, aplicar:

1. **Anti-verbatim PASS** obrigatório (n-gram ≥5 + 5 NÃOs)
2. Comparar versão nova vs antiga via mapeamento iterativo (NOVO/CONFIRMA/REFINA aplica direto; ALTERA/DESCARTA pergunta)
3. Atualizar `Atualizado:` no header pra data de hoje
4. Versão bumpa (0.1 → 0.2 ou 1.0 → 1.1 dependendo da escala)
5. Adicionar entrada em `99_meta/audit_log.md` registrando atualização

## Output padrão (sinalização)

Formato 3 linhas:

```
⚠️ Contexto [arquivo.md] tem [N] dias sem atualização.
   Sugestão: pesquisar [tópico específico] pra complementar NotebookLM [Y].
   Quer gerar prompt da extensão Claude Chrome agora?
```

## Antipadrões

- **Atualizar contexto silenciosamente sem sinalizar** — quebra mapeamento iterativo categoria ALTERA
- **Inventar fontes** — sempre passar pelo fluxo NotebookLM (rastreabilidade)
- **Pular anti-verbatim** ao integrar conteúdo novo (regra absoluta da absorção)
- **Sugestão genérica** ("seu contexto tá velho") — sempre específica (qual arquivo + qual tópico + qual notebook)
- **Detectar e nem reportar** porque "não é crítico" — sinalizar é low-cost; ignorar acumula drift

## Quando NÃO usar

- Contexto recém-criado (< 30 dias) sem trigger explícito do usuário
- Bruto sagrado (`_negocio/contextos/bruto/`) — esse NÃO atualiza, é histórico
- Templates (`templates/`, `_template-pack/`, `_template-contexto/`) — atualizam só via release do KOD.AI

## Política irmã + skill

- `/sugerir-pesquisa` — quando RESPOSTA não cabe nos contextos atuais
- `/absorver-contexto` — processa material novo recebido
- `/atualizar` — varredura geral periódica (Passo 5: detecção de contextos externos)
- `metodologias/mapeamento-iterativo.md` — 5 categorias aplicam (NOVO/CONFIRMA/REFINA/ALTERA/DESCARTA)
- `politicas/escuta-antes-de-agir.md` — gate humano em ALTERA/DESCARTA
- `99_meta/audit_log.md` — registro de atualizações

## Atribuição

Skill nova KOD.AI v0.5 — formaliza o comportamento de manutenção proativa de contextos. Princípio: contextos envelhecem; detectar drift cedo é mais barato que retrabalho acumulado. Integra com mapeamento iterativo (5 categorias) + anti-verbatim + extensão Claude Chrome (intake de pesquisa profunda).
