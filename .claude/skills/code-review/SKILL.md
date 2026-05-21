---
name: code-review
description: >
  Revisão de código recém-escrito com sistema de confiança (≥80% bloqueia
  ruído). Foca em bugs reais, segurança, performance e qualidade — não
  nitpicking. Use quando o usuário pede "revisa", "verifica", "olha esse
  código", "tem algum problema?", antes de commit/merge/PR. Combina com
  /complete e regra-base 12.
allowed-tools: [Read, Grep, Glob, Bash]
---

# Skill — Code Review (alta confiança, baixo ruído)

## Princípio

Code review tem 2 modos de falha:

- **Ruído** — flag de tudo (incluindo coisas que não são problema real); revisor humano para de ler depois do 5º falso positivo
- **Silêncio** — só aprova; bugs reais passam

Esta skill resolve com **threshold de confiança** explícito: cada achado tem score 0-100; **só reporta os com ≥ 80**. Inferências fracas, "preferência de estilo", "talvez seja" ficam fora.

Origem: re-implementação da skill `code-review` Anthropic Superpowers (Apache-2.0). Conteúdo reformulado pra encaixar nas convenções do KOD.AI; estrutura e exemplos adaptados; threshold ≥ 80 preservado como decisão central.

---

## Quando rodar

Ativar quando o usuário pedir explicitamente OU quando o agente prepara `/complete`:

- "Revisa esse código"
- "Verifica se tá certo"
- "Tem algum problema?"
- "Olha esse PR"
- Antes de merge em branch principal
- Antes de declarar tarefa como "feita"
- Auto-disparada por `/complete` (pipeline `test-runner → qa-verifier → code-review`)

## Escopo

| Como o usuário pede | Escopo de revisão |
|---|---|
| Sem especificação | `git diff` (mudanças não-commitadas + commitadas vs branch base) |
| "Revisa esse arquivo" | Arquivo apontado, integralmente |
| "Revisa o PR" | Diff do PR contra base |
| "Revisa a função X" | Função X + chamadas que ela faz |

Sempre **ler `CLAUDE.md` do projeto** antes — as diretrizes específicas do projeto sobrepõem o padrão genérico.

---

## Sistema de confiança

Cada potencial issue recebe score:

| Score | Significado | Reportar? |
|---|---|---|
| 100 | Certeza absoluta — código mostra explicitamente | ✅ Sempre |
| 90-99 | Quase certeza — evidência clara, contexto confirma | ✅ Sempre |
| 80-89 | Muito provável — padrão conhecido de bug, mas falta um teste pra confirmar | ✅ Sempre |
| 60-79 | Pode ser problema, depende de uso externo não visível | ❌ NÃO reporta |
| < 60 | Especulação / preferência de estilo | ❌ NÃO reporta |

**Não negociável:** itens com score < 80 ficam **fora** do relatório. Comentar dúvidas verbalmente em chat se vale, mas não no relatório formal.

---

## Dimensões de análise

### Bugs e lógica

- Condições sempre true ou sempre false
- Off-by-one errors (loops, slicing)
- Race conditions em código async/concurrent
- Null / undefined / None não-tratado em path acessível
- Tratamento de erro ausente em chamada que pode falhar
- Ordem de operação errada (timezone, encoding, comparação)
- Lógica invertida (variáveis com nome contraditório à intenção)

### Segurança

- Injeção (SQL, XSS, Command, NoSQL, LDAP)
- Dados sensíveis (token, senha, PII) em log ou response
- Auth bypassável (rota sem guard, role check ausente)
- Chaves/segredos hardcoded ou em código versionado
- Lógica de negócio sensível executada no cliente (frontend)
- CORS / CSRF mal configurado
- Validação de input ausente em endpoint público

### Performance

- N+1 queries (loop fazendo query individual)
- Loop dentro de loop desnecessário (O(n²) onde O(n) basta)
- Falta de índice em coluna usada em WHERE/JOIN
- Memória não liberada (event listener, timer, conexão)
- Bundle JS gigante (importação completa de lib quando só usa 1 função)
- Re-render desnecessário em componente React (sem memoization onde merece)

### Qualidade

- Código duplicado (DRY violation) — só flag se 3+ ocorrências
- Convenções do projeto violadas (path do `CLAUDE.md`)
- Arquivos tocados fora do escopo da tarefa
- Nomes confusos / enganadores (variável `total` que não é total)
- Funções > 50 linhas / arquivos > 500 linhas
- Comentários desatualizados que contradizem o código

---

## Formato do relatório

```markdown
## Code Review — <escopo revisado>

**Resultado:** APROVADO | APROVADO COM RESSALVAS | REPROVADO

### 🔴 Críticos (confiança 90-100)

**<descrição do problema>**
- Arquivo: `<caminho>:<linha>`
- Problema: <explicação clara em 1-2 frases>
- Fix sugerido: <código ou instrução específica>
- Confiança: <score>

### 🟡 Importantes (confiança 80-89)

**<descrição>**
- Arquivo: `<caminho>:<linha>`
- Problema: <explicação>
- Sugestão: <como corrigir>
- Confiança: <score>

### ✅ Confirmado OK

- <o que foi verificado e está correto>
- <prevenção / refactor positivo digno de nota>
```

Regra de classificação do **Resultado**:

| Achados | Resultado |
|---|---|
| Zero 🔴 + zero 🟡 | APROVADO |
| Zero 🔴 + ≥1 🟡 | APROVADO COM RESSALVAS |
| ≥1 🔴 | REPROVADO |

---

## Integração com `/complete` (regra-base 12)

`/complete` orquestra pipeline pré-done:

```
1. test-runner (mecânico) — typecheck → lint → unit → integration → build → e2e
2. qa-verifier (adversarial) — reproduz matriz em contexto limpo
3. code-review (esta skill) — diff vs base, threshold ≥ 80
4. Evidence Bloc consolidado
```

Resultado REPROVADO em qualquer um dos 3 → `/complete` aborta, não emite "done".

## Casamento com outras políticas/metodologias

- **`metodologias/testes.md`** seção "Status honesto + Evidence Bloc" — code-review é parte do Evidence pra promoção de status
- **`politicas/escuta-antes-de-agir.md`** — code-review é leitura passiva, sempre OK; aplicar mudanças sugeridas exige consentimento
- **`politicas/explicar-acao-custosa.md`** — se review propõe refactor grande (>50 linhas), tratar como ação custosa
- **`metodologias/mapeamento-iterativo.md`** — se review detecta drift entre código e doc mapeado, classifica como REFINA/ALTERA

---

## Anti-padrões

| ❌ Errado | ✅ Certo |
|---|---|
| Listar 30 nits de estilo | Só ≥ 80% confiança |
| "Talvez tenha problema aqui" | Score < 60 não vira issue |
| "Esse trecho é meio feio" | Sem estética; só bug/segurança/perf/qualidade objetiva |
| Sugerir mudança sem fix específico | Toda issue tem fix sugerido OU "investigar X antes de fix" |
| Aprovar sem ler `CLAUDE.md` | Sempre ler CLAUDE.md primeiro |
| "Tudo OK" sem listar **o quê** foi verificado | Confirmar OK explícita com escopo |

---

## Quando NÃO usar

- Pull request gigante (>500 linhas mudadas) — quebrar em chunks revisíveis antes
- Código em linguagem que a IA não domina bem — pedir review humana
- Refactor estilístico puro (rename de variável local) — não vale o tempo

---

## Atribuição

Re-implementação universalizada da skill `code-review` Anthropic Superpowers (Apache-2.0). Threshold de confiança ≥ 80 preservado como decisão central. Estrutura, dimensões expandidas e integração com `/complete` adaptadas pra KOD.AI.
