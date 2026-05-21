---
name: verification-before-completion
description: >
  Antes de qualquer claim de "completo / passou / corrigido / pronto", roda
  verificação fresca e cita evidência. Evidência antes da asserção, sempre.
  Use antes de commit, PR, declarar tarefa pronta, ou expressar satisfação.
  Operacionaliza a regra-base 10 (honestidade em claims).
allowed-tools: [Read, Bash, Grep]
---

# Skill — Verification Before Completion

## A Lei de Ferro

> **Sem evidência fresca, sem claim de sucesso.**

Se você não rodou o comando de verificação **nesta mensagem**, não pode afirmar que ele passa.

Claim de "completo / fixado / passing" sem evidência adjacente é **desonestidade**, não eficiência. Esta skill operacionaliza a regra-base 10 do KOD.AI (honestidade em claims) com mecânica concreta.

## Por que esta skill existe

Padrões de falha históricos:

- "Should work now" / "Probably passes" → não rodou
- "Agent said success" → não checou o diff do agente
- "Linter passou" → linter não compila código
- "Tests passed last time" → última vez ≠ esta vez
- "Eu fiz a mudança óbvia" → óbvio não é evidência

Cada um desses padrões já gerou trabalho dobrado, perda de confiança, ou bug em produção. A skill bloqueia o reflexo de declarar pronto antes da prova.

## A função de gate

```
ANTES de qualquer claim de status, satisfação, ou conclusão:

1. IDENTIFICAR: qual comando prova este claim?
2. RODAR: executar o comando COMPLETO (fresh, não cache)
3. LER: output completo, exit code, contagem de falhas
4. VERIFICAR: output confirma o claim?
   - Se NÃO → declarar status real com evidência adjacente
   - Se SIM → declarar claim COM evidência citada
5. SÓ ENTÃO: emitir o claim

Pular qualquer passo = mentir, não verificar.
```

A função vale para **qualquer** comunicação que sugira sucesso — frase direta, paráfrase, sinônimo, implicação.

---

## Tabela de claim × evidência

| Claim | Evidência mínima |
|---|---|
| "Testes passam" | Output do comando de teste: 0 falhas + exit code 0 |
| "Linter limpo" | Output do linter: 0 errors + 0 warnings (ou só não-bloqueantes) |
| "Build sucesso" | Comando de build: exit 0 |
| "Bug corrigido" | Reproduzir sintoma original → ver que **não acontece mais** |
| "Regression test funciona" | Ciclo red-green confirmado (sem fix → falha; com fix → passa) |
| "Agente completou" | Diff de VCS mostrando as mudanças (não o relatório do agente) |
| "Requisito atendido" | Checklist linha-por-linha do plano + cada item verificado |
| "Deploy ok" | URL de produção respondendo + funcionalidade nova acessível |

Linha esquerda **sem** linha direita = claim vazio. Reescreve pra "status real".

---

## Red Flags — STOP IMEDIATO

Pare a si mesmo se for tentado a:

- Usar palavras "should", "probably", "seems to", "deve estar", "provavelmente"
- Expressar satisfação antes de verificar ("ótimo!", "perfeito!", "feito!", "tranquilo!")
- Commit / push / PR sem rodar verificação adjacente
- Confiar no relatório de sucesso de um sub-agente sem checar diff
- Aceitar verificação parcial como prova ("o linter passou, então...")
- Pensar "só dessa vez não preciso" / "agora dá pra confiar" / "tá cansado, deixa"
- **Qualquer fraseado** que implique sucesso sem ter rodado o comando

Se algum desses gatilhos disparar, **volta pra função de gate**.

---

## Prevenção de racionalização

| Desculpa | Realidade |
|---|---|
| "Tem que funcionar agora" | RODA a verificação |
| "Estou confiante" | Confiança ≠ evidência |
| "Só essa vez" | Não tem exceção |
| "Linter passou" | Linter ≠ compilador ≠ teste de funcionalidade |
| "O agente disse sucesso" | Verifica independente (diff, output real) |
| "Estou cansado" | Cansaço ≠ desculpa |
| "Verificação parcial dá" | Parcial prova parcial — apenas |
| "A regra é pra X, eu estou fazendo Y" | Espírito sobre a letra |

---

## Padrões concretos

### Testes

```
✅  [Roda comando de teste]  [Vê: 34/34 pass + exit 0]  "Todos os testes passam"
❌  "Deve estar passando agora" / "Parece correto"
```

### Regression test (red-green)

```
✅  Escreve teste → Roda (passa) → Reverte fix → Roda (DEVE FALHAR) → Restaura → Roda (passa)
❌  "Escrevi um regression test" (sem ciclo red-green confirmado)
```

### Build

```
✅  [Roda build]  [Vê: exit 0]  "Build passa"
❌  "Linter passou" (linter não compila)
```

### Requisitos

```
✅  Relê o plano → Cria checklist → Verifica cada item → Reporta gaps OU conclusão com evidência
❌  "Testes passam, feature está completa"
```

### Delegação a agente

```
✅  Agente reporta sucesso → Checa diff VCS → Verifica mudanças → Reporta estado real
❌  Confiar no relatório do agente sem ler o diff
```

---

## Quando aplicar

**Sempre antes de:**

- Qualquer variação de claim de sucesso/conclusão
- Qualquer expressão de satisfação
- Qualquer afirmação positiva sobre estado do trabalho
- Commit, PR, declaração de "feito"
- Mover pro próximo passo / próxima task
- Delegar a sub-agente (verificar antes de assumir output bom)

**Aplica a:**

- Frases exatas ("testes passam")
- Paráfrases ("o código tá compilando bem agora")
- Sinônimos ("tudo verde")
- Implicações ("podemos seguir")
- Comunicação tácita (commit sem comentário implica "feito")

---

## Casamento com regras-base + outras políticas/skills

- **Regra-base 10** (honestidade em claims) — esta skill é o **operacional** dela
- **Regra-base 12** (`/complete` antes de done) — pipeline obrigatório usa esta skill como gate final
- **`metodologias/testes.md`** seção "Status honesto + Evidence Bloc" — formato de Evidence que esta skill produz
- **`politicas/documentar-cada-implementacao.md`** — após verificação confirmada, propagar pra inbox/memória/CLAUDE.md
- **Skill `code-review`** — code review **sem** evidência de teste passando é claim parcial
- **`politicas/escuta-antes-de-agir.md`** — esta skill nunca dispensa o gate humano; complementa

---

## A linha de baixo

Sem atalhos pra verificação. **Roda o comando. Lê o output. Aí declara o resultado.**

Não-negociável.

---

## Atribuição

Re-implementação universalizada da skill `verification-before-completion` Anthropic Superpowers (Apache-2.0). Iron Law + Gate Function + Red Flags preservados como decisões centrais; tabela claim×evidência expandida; casamento com regras-base e políticas KOD.AI adicionado.
