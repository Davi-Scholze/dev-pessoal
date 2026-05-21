---
name: test-driven-development
description: >
  TDD com Iron Law: 'sem código de produção sem teste falhando primeiro'.
  Ciclo Red-Green-Refactor disciplinado. Use ao implementar QUALQUER feature
  nova, bugfix, ou mudança de comportamento. Combina com
  systematic-debugging (cria failing test na Fase 4 dele) e
  verification-before-completion (Iron Law similar).
allowed-tools: [Read, Write, Edit, Bash]
---

# Skill — Test-Driven Development (TDD)

## Princípio

Escreve o teste primeiro. Vê falhar. Escreve código mínimo pra passar.

**Decisão central:** se você não viu o teste falhar, você não sabe se ele testa a coisa certa.

Tests-after passam imediatamente. Passar imediatamente **não prova nada** — pode estar testando o caminho errado, a implementação em vez do comportamento, ou caso que você esqueceu de pensar.

Test-first **força** você a ver o teste falhar — provando que ele de fato testa algo.

---

## A Lei de Ferro

> **Sem código de produção sem teste falhando primeiro.**

Escreveu código antes do teste? **Apaga.** Começa de novo.

Sem exceção:

- Não mantém como "referência"
- Não "adapta" enquanto escreve os testes
- Não olha
- Apagar significa apagar

Implementa do zero, guiado pelos testes. Ponto.

---

## Quando aplicar

**Sempre:**

- Features novas
- Bug fixes
- Refactors
- Mudanças de comportamento

**Exceções (pergunta antes ao decisor humano):**

- Protótipos descartáveis
- Código gerado (codegen)
- Arquivos de configuração

Se está pensando "pula TDD só dessa vez" — para. Isso é racionalização.

---

## Red-Green-Refactor

```
RED         → escreve 1 teste mínimo que descreve o que deve acontecer
  ↓
Verifica    → roda teste; CONFIRMA que falha (e falha do jeito certo)
RED          se passa imediatamente: testando comportamento existente, refaz teste
  ↓
GREEN       → escreve código MÍNIMO que faz o teste passar
  ↓
Verifica    → roda teste; CONFIRMA que passa + outros testes não-quebrados
GREEN
  ↓
REFACTOR    → limpa duplicação, melhora nomes, extrai helpers
              (sem adicionar comportamento; testes permanecem verdes)
  ↓
Próximo ciclo (RED de novo, pra próxima feature/edge case)
```

### RED — escreve teste que falha

Um teste mínimo, comportamento real, nome claro.

✅ Bom:

```typescript
test('retry executa 3 tentativas antes de aceitar sucesso', async () => {
  let attempts = 0;
  const operation = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'success';
  };

  const result = await retryOperation(operation);

  expect(result).toBe('success');
  expect(attempts).toBe(3);
});
```

Nome claro, testa comportamento real, uma coisa só.

❌ Ruim:

```typescript
test('retry funciona', async () => {
  const mock = jest.fn()
    .mockRejectedValueOnce(new Error())
    .mockRejectedValueOnce(new Error())
    .mockResolvedValueOnce('success');
  await retryOperation(mock);
  expect(mock).toHaveBeenCalledTimes(3);
});
```

Nome vago, testa o mock e não o código.

### Verifica RED

**OBRIGATÓRIO.** Nunca pula.

```bash
<comando de teste> <path/do/teste>
```

Confirma:

- Teste **falha** (não erro de import / sintaxe)
- Mensagem de falha é a esperada
- Falha porque a feature não existe (não porque tem typo)

**Teste passou?** Você está testando comportamento existente. Refaz o teste.

**Teste deu erro?** Conserta o erro, roda de novo até falhar **corretamente**.

### GREEN — código mínimo

Escreve o mais simples possível que passa o teste.

✅ Bom: só o suficiente.

❌ Ruim: over-engineered ("YAGNI"). Não adiciona opções, hooks, callbacks que o teste não exige.

Não:

- Adiciona features
- Refatora outro código
- "Melhora" além do teste

### Verifica GREEN

**OBRIGATÓRIO.**

Confirma:

- Teste passa
- Outros testes não quebraram
- Output limpo (sem warnings de side effect)

**Teste falha?** Conserta o **código**, não o teste.

**Outros testes quebraram?** Conserta agora, antes de seguir.

### REFACTOR

**Depois** do verde:

- Remove duplicação
- Melhora nomes
- Extrai helpers

Mantém testes verdes. **Não adiciona comportamento novo nessa fase.**

### Próximo

Próximo teste falhando, próxima feature/edge case.

---

## Bons testes

| Qualidade | Bom | Ruim |
|---|---|---|
| **Mínimo** | Uma coisa só. "and" no nome? Quebra em dois. | `test('valida email e domínio e whitespace')` |
| **Claro** | Nome descreve o **comportamento** | `test('teste1')` |
| **Mostra intenção** | Demonstra como o código deve ser usado | Esconde o que o código deveria fazer |

---

## Por que a ordem importa

### "Escrevo testes depois pra verificar"

Tests-after passam imediatamente. Passar imediatamente **não prova nada**:

- Pode testar coisa errada
- Pode testar implementação, não comportamento
- Pode pular edge case que você esqueceu
- Você nunca viu o teste pegar o bug

### "Já testei manual todos os edge cases"

Manual é ad-hoc:

- Sem registro do que foi testado
- Não roda de novo quando código muda
- Fácil esquecer caso sob pressão
- "Funcionou quando testei" ≠ comprehensive

Automatizado é sistemático. Roda igual toda vez.

### "Apagar X horas de trabalho é desperdício"

Sunk cost fallacy. O tempo já se foi. A escolha agora é:

- Apaga e reescreve com TDD (X horas, alta confiança)
- Mantém e adiciona testes depois (30 min, baixa confiança, bugs prováveis)

O "desperdício" é manter código que você não pode confiar.

### "TDD é dogmático, pragmático é adaptar"

TDD **é** pragmático:

- Acha bugs antes do commit (mais rápido que debugar produção)
- Previne regressão (testes pegam break imediato)
- Documenta comportamento (testes mostram como usar)
- Habilita refactor (muda livre, testes pegam break)

"Pragmático" shortcuts = debug em produção = mais lento.

### "Tests-after atingem o mesmo objetivo"

Não. Tests-after responde "o que isso faz?". Tests-first responde "o que isso **deveria** fazer?".

Tests-after está enviesado pela sua implementação. Você testa o que **construiu**, não o que é **requerido**.

Tests-first força descoberta de edge case **antes** de implementar. Tests-after verifica que você lembrou de tudo (você não lembrou).

---

## Racionalizações comuns

| Desculpa | Realidade |
|---|---|
| "Simples demais pra testar" | Código simples quebra. Teste leva 30 segundos. |
| "Testo depois" | Testes passando imediato não provam nada |
| "Tests-after atingem o mesmo" | Tests-after responde 'o que isso faz?'; tests-first responde 'o que deveria fazer?' |
| "Já testei manual" | Ad-hoc ≠ sistemático |
| "Apagar X horas é desperdício" | Sunk cost. Manter código sem teste é dívida técnica |
| "Mantenho como referência, escrevo teste primeiro" | Você vai adaptar. Apagar significa apagar. |
| "Preciso explorar primeiro" | Tudo bem. Joga fora a exploração e começa TDD |
| "Teste difícil = design ruim" | **Verdade.** Difícil de testar = difícil de usar. Escuta o teste. |
| "TDD vai me atrasar" | TDD é mais rápido que debugar. Pragmático = test-first. |
| "Existing code não tem testes" | Está melhorando? Adiciona teste pro código novo. |

---

## Red Flags — STOP e recomeça

Se você se pegar:

- Escrevendo código antes do teste
- Adicionando teste depois da implementação
- Vendo teste passar imediatamente sem ter feito ele falhar primeiro
- Sem conseguir explicar **por que** o teste falhou
- "Testes adicionados depois"
- "Só dessa vez, depois faço certo"
- "Mantém código como referência"
- "Já gastei X horas, apagar seria desperdício"
- "TDD é dogmático, sou pragmático"
- "Este caso é diferente porque..."

**Todos → apaga código, começa de novo com TDD.**

---

## Checklist antes de declarar concluído

- [ ] Toda função/método novo tem teste
- [ ] Vi cada teste falhar antes de implementar
- [ ] Cada teste falhou pela razão esperada (feature faltando, não typo)
- [ ] Código escrito é o **mínimo** pra passar cada teste
- [ ] Todos os testes passam
- [ ] Output limpo (sem warnings de side effect)
- [ ] Testes usam código real (mocks só se inevitável)
- [ ] Edge cases e erros cobertos

Não conseguiu marcar tudo? Pulou TDD. Recomeça.

---

## Quando empacar

| Problema | Solução |
|---|---|
| Não sei como testar | Escreve a API que **você queria** ter. Escreve assertion primeiro. |
| Teste muito complicado | Design muito complicado. Simplifica interface. |
| Tem que mockar tudo | Código muito acoplado. Usa dependency injection. |
| Setup do teste enorme | Extrai helpers. Ainda complexo? Simplifica design. |

---

## Integração com debugging

Bug encontrado? **Escreve teste falhando que reproduz**. Segue ciclo TDD. Teste prova o fix **e** previne regressão.

Combina com skill `systematic-debugging` (Fase 4 passo 1 dela: criar teste que falha).

**Nunca conserta bug sem teste primeiro.**

---

## Regra final

```
Código de produção  →  teste existe e falhou primeiro
Caso contrário      →  não é TDD
```

Sem exceções sem permissão explícita do decisor humano.

---

## Casamento com outras skills/políticas

- **`systematic-debugging`** — Fase 4 passo 1 (criar teste que falha) reusa este ciclo
- **`verification-before-completion`** — Iron Law similar (verificação fresca); TDD adiciona ordem (falha antes da implementação)
- **`code-review`** — review do diff após GREEN+REFACTOR; threshold ≥ 80 também aplica
- **`metodologias/testes.md`** — TDD é um modo de gerar cobertura; metodologia universal cobre níveis (Smoke/Sprint/Regression/Full)
- **Regra-base 10** (honestidade) — claims de "testado" exigem Evidence; TDD produz Evidence natural
- **Regra-base 12** (`/complete` antes de done) — `/complete` requer testes; TDD garante existência

---

## Atribuição

Re-implementação universalizada da skill `test-driven-development` Anthropic Superpowers (Apache-2.0). Iron Law + ciclo Red-Green-Refactor + racionalizações comuns + red flags + checklist preservados como decisão central. Tom KOD.AI alinhado; branding "Jesse"/"your human partner" substituído por "decisor humano"; referência ao arquivo auxiliar `testing-anti-patterns.md` incorporada como parágrafo no texto.
