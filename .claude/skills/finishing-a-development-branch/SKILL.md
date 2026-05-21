---
name: finishing-a-development-branch
description: >
  Guia a finalização de branch de desenvolvimento depois da implementação:
  verifica testes, apresenta 4 opções estruturadas (merge local / PR / manter
  / descartar), executa a escolhida e faz cleanup. Use quando o trabalho
  está pronto e precisa decidir como integrar. Combina com /complete e
  using-git-worktrees.
allowed-tools: [Bash, Read, AskUserQuestion]
---

# Skill — Finalizar branch de desenvolvimento

## Princípio

Implementação pronta ≠ trabalho integrado. O caminho do "tá pronto" pro "tá no main" tem **4 desfechos legítimos** — e cada um exige passos diferentes. Sem estrutura, a IA pergunta vago ("o que você quer fazer?") ou age sozinha (merge antes do usuário decidir, deleta sem confirmação, etc).

Esta skill estrutura o fechamento em 5 passos sequenciais: **verifica testes → identifica base → apresenta 4 opções → executa escolha → cleanup**.

---

## Os 5 passos

### Passo 1 — Verifica testes

Antes de apresentar qualquer opção:

```bash
# Comando do projeto (varia por stack)
npm test          # JS/TS
pytest            # Python
go test ./...     # Go
cargo test        # Rust
bundle exec rspec # Ruby
```

**Se testes falham:**

```
Testes falhando (N falhas). Precisa corrigir antes de fechar:

<lista das falhas>

Não posso prosseguir com merge/PR até testes passarem.
```

Para. Não avança pro Passo 2.

**Se testes passam:** segue.

> Esta skill **delega** a `verification-before-completion` se Iron Law já estiver em jogo na sessão. Se não, esta skill aplica o gate mínimo (rodar comando + checar exit 0).

### Passo 2 — Identifica base branch

```bash
# Tenta detectar
git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null
```

Se ambíguo, pergunta:

```
Esta branch saiu de `main`? (sim/não — em caso de outra branch, diga qual)
```

### Passo 3 — Apresenta 4 opções

Exato 4. Sem explicar cada uma (mata o sinal).

```
Implementação completa. Como integrar?

1. Merge local em <base-branch>
2. Push + criar Pull Request
3. Manter branch como está (deixar pra depois)
4. Descartar este trabalho

Qual opção?
```

Aguarda escolha explícita. Não infere.

### Passo 4 — Executa a escolha

#### Opção 1 — Merge local

```bash
git checkout <base-branch>
git pull --ff-only
git merge <feature-branch>

# Re-rodar testes no resultado mergeado (não pula!)
<comando de teste>

# Se testes passam:
git branch -d <feature-branch>
```

Depois → Passo 5 (cleanup worktree).

#### Opção 2 — Push + PR

```bash
git push -u origin <feature-branch>

gh pr create --title "<título curto>" --body "$(cat <<'EOF'
## Resumo
<2-3 bullets do que mudou>

## Test Plan
- [ ] <passos de verificação>
EOF
)"
```

Depois → Passo 5 (cleanup worktree).

#### Opção 3 — Manter como está

Reporta:

```
Branch <nome> mantida. Worktree preservada em <path>.
```

**Não faz cleanup** — usuário vai voltar pra ela.

#### Opção 4 — Descartar

**Confirma com mensagem explícita antes de qualquer destruição:**

```
Vou apagar permanentemente:
- Branch <nome>
- N commits: <lista de SHAs>
- Worktree em <path>

Digite 'descartar' pra confirmar (exato).
```

Aguarda confirmação **literal** "descartar". Qualquer outra coisa → aborta.

Se confirmado:

```bash
git checkout <base-branch>
git branch -D <feature-branch>
```

Depois → Passo 5 (cleanup worktree).

### Passo 5 — Cleanup worktree

Vale **só** pras opções 1, 2 e 4 (opção 3 mantém worktree).

```bash
# Verifica se está em worktree
git worktree list | grep $(git branch --show-current)

# Se sim:
git worktree remove <worktree-path>
```

---

## Resumo das 4 opções

| Opção | Merge | Push | Mantém worktree | Apaga branch |
|---|---|---|---|---|
| 1. Merge local | ✅ | — | — | ✅ |
| 2. Push + PR | — | ✅ | ✅ | — |
| 3. Manter como está | — | — | ✅ | — |
| 4. Descartar | — | — | — | ✅ (force) |

---

## Erros comuns a evitar

| ❌ Erro | ✅ Certo |
|---|---|
| Pular verificação de testes pra "fechar logo" | Sempre verificar antes das opções |
| Pergunta aberta ("o que você quer fazer?") | Exatos 4 cards estruturados |
| Cleanup automático de worktree em qualquer opção | Só opções 1 e 4 |
| Descartar sem confirmação literal | Sempre exige texto exato "descartar" |

## Red flags — NUNCA

- Prosseguir com testes falhando
- Merge sem re-rodar teste no resultado mergeado
- Apagar trabalho sem confirmação literal
- Force-push sem pedido explícito do usuário

## Sempre

- Verificar testes ANTES de oferecer opções
- Apresentar **exatamente 4 opções** (não 3, não 5)
- Confirmação literal "descartar" pra opção 4
- Cleanup worktree **só** opções 1 e 4

---

## Integração

**Chamada por:**

- `/complete` (regra-base 12) — pode ser o passo final do funil pré-done
- `subagent-driven-development` — após todas as tasks completas
- `executing-plans` — após todos os batches completos

**Combina com:**

- `using-git-worktrees` — limpa worktree criada por aquela skill
- `verification-before-completion` — Iron Law confirma testes passando antes das opções
- `code-review` — review do diff final antes da escolha (especialmente Opção 2 PR)

---

## Atribuição

Re-implementação universalizada da skill `finishing-a-development-branch` Anthropic Superpowers (Apache-2.0). Estrutura de 5 passos + 4 opções preservada como decisão central. Comandos de teste expandidos por stack (JS/Python/Go/Rust/Ruby). Integração com `/complete` (regra-base 12) e outras skills KOD.AI adicionada.
