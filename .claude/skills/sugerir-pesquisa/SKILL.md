---
name: sugerir-pesquisa
description: >
  Detecta gaps de contexto durante a sessão e sugere ao usuário pesquisar
  + alimentar NotebookLM. Nunca inventa nem alucina — sinaliza a lacuna
  com clareza + sugere ação específica + acionável. Use quando a pergunta
  do usuário não pode ser respondida com contextos atuais, quando gap
  identificado em eixo sem NotebookLM, ou quando usuário pede algo que
  exige conhecimento que o projeto não tem. Triggers comuns: "/sugerir-
  pesquisa", "preciso saber sobre X", "não tenho contexto pra Y".
allowed-tools: [Read, Bash, Glob, Grep]
---

# Skill — Sugerir Pesquisa (gap-detection)

## Princípio

**Honestidade absoluta** (regra-base 10): se não tem contexto pra responder bem, **não responder por baixo**. **Sinaliza a lacuna** com clareza, propõe ação específica e acionável.

Combina com `evoluir-contexto` (proativo) — esta skill é **gap-detection durante interação**.

## Triggers

### 1. Pergunta sem contexto suficiente

Usuário pergunta sobre tópico que **nenhum contexto do KOD.AI cobre**:

- Tema novo (ex: tecnologia recém-lançada que KOD.AI ainda não absorveu)
- Tema fora do escopo dos packs/contextos-domínio instalados
- Detalhe profundo que excede o que documentação atual cobre

### 2. Gap identificado em eixo sem NotebookLM

Pasta de eixo importante (`2-PACKS/packs/<categoria>/<pack>/` ou `3-CONTEXTOS-DOMINIO/<vertical>/`) **sem `notebooklm.url`** + sem fontes externas declaradas no header.

### 3. Dependência de fonte externa atualizada

Resposta dependeria de doc oficial recente, regulamentação atualizada, paper específico — coisa que **WebFetch ou NotebookLM** resolveria mas não temos local.

### 4. Pedido excede conhecimento do projeto

Usuário pede algo (criar pack pra X) que exige **conhecimento de domínio que o projeto não tem** documentado.

### 5. Explícito

- "preciso saber sobre X"
- "não tenho contexto pra Y"
- "/sugerir-pesquisa"
- "pesquisa isso pra mim"

## Comportamento

### Passo 1 — Não inventar

**Iron Law:** sem contexto adequado, NÃO emitir resposta confiante. Política `verification-before-completion` (skill bundled) aplica: sem evidência fresca, sem claim.

### Passo 2 — Não alucinar

Não citar fontes que não viu (`respostas-com-referencias` política: anti-alucinação obrigatório). Não inventar URL, paper, autor. Não dizer "Anthropic recomenda X" sem ter o link do doc atual.

### Passo 3 — Sinalizar o gap com clareza absoluta

Formato:

```
🚧 Lacuna de contexto detectada.

Não tenho cobertura suficiente sobre **[X]** pra responder com confiança.

Detalhe:
- O que está documentado: [resumo do que existe — nem inflar nem omitir]
- O que falta: [específico — tópico/profundidade/atualização]
- Por que importa: [conexão com a pergunta do usuário]
```

### Passo 4 — Sugerir ação específica e acionável

Não sugerir genericamente ("pesquisa mais"). Sempre:

```
Sugestão:
- Pesquisar **[tópico específico em palavras de busca]**
- Alimentar NotebookLM **[URL ou "criar novo notebook pra X"]**
- Foco em [tipo de fonte: docs oficiais / papers / repos GitHub / análise comparativa]

Quer que eu gere o prompt pra extensão Claude Chrome agora?
```

Se aceitar, delegar pra `/evoluir-contexto` que tem o prompt padrão pronto.

### Passo 5 — Após pesquisa retornada (próxima sessão)

Quando o usuário voltar com NotebookLM atualizado + markdown:

1. Aplicar `/absorver-contexto` ou `/absorver-referencia` conforme o caso
2. Anti-verbatim PASS obrigatório
3. Atualizar contexto local + criar `notebooklm.url` se aplicável
4. Audit log entry

## Output padrão

```
🚧 Lacuna detectada: [tópico]
   Cobertura atual: [resumo]
   Falta: [específico]
   Sugestão: pesquisar [palavras de busca] e alimentar NotebookLM [URL ou "novo"]
   Quer que eu gere o prompt pra extensão Claude Chrome?
```

## Antipadrões

- **Responder por baixo sem contexto adequado** — viola regra-base 10 (honestidade)
- **Esconder lacunas do usuário** — quebra confiança a médio prazo
- **Sugerir pesquisa genérica** ("pesquise sobre o assunto") — sem palavras de busca específicas é inútil
- **Citar fonte que não viu** — alucinação garantida; sempre verificar via WebFetch ou marcar `[não verificado]`
- **Responder e SÓ DEPOIS** mencionar que era lacuna — sinaliza ANTES, sempre

## Diferença vs `/evoluir-contexto`

| Aspecto | `/sugerir-pesquisa` | `/evoluir-contexto` |
|---|---|---|
| Trigger | Gap DURANTE interação (resposta exigiria contexto que falta) | Drift PROATIVO (contexto velho, contradição, eixo sem notebook) |
| Quando dispara | Em tempo real, dentro da pergunta do usuário | Em varredura ou ao detectar contradição com input |
| Ação | Sinalizar lacuna + sugerir pesquisar | Sinalizar drift + sugerir atualizar existente |
| Output | "Não tenho contexto sobre X — pesquisar?" | "Contexto X tem N dias — atualizar?" |

Ambas convergem no mesmo prompt padrão pra extensão Claude Chrome quando aprovadas.

## Política irmã + skill

- `/evoluir-contexto` — manutenção proativa (drift)
- `/ativar-notebooklm` — vincular notebook quando o usuário trouxer
- `respostas-com-referencias` (política) — modo pesquisa profunda + anti-alucinação
- `referencias-externas` (política) — validação trio Design/Script/Sistema
- `verification-before-completion` (skill bundled) — Iron Law
- `regras-base.md` regra 10 — honestidade em claims

## Atribuição

Skill nova KOD.AI v0.5 — formaliza o comportamento de **gap-detection durante interação**. Diferente de `/evoluir-contexto` (proativo, drift) — esta é **reativa** (sinaliza quando resposta exigiria contexto que falta).

Honestidade absoluta: prefere sinalizar lacuna a inventar resposta. Combate o antipadrão #1 ("instruções em prosa sem comandos acionáveis") aplicado a resposta da IA — sempre sugere comando concreto pra preencher a lacuna.
