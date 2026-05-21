---
name: using-git-worktrees
description: >
  Cria worktree git isolado pra feature work, com seleção de diretório
  inteligente + verificação de segurança (gitignore confirmado). Use antes
  de executar plano de implementação grande, antes de iniciar feature que
  precisa isolar do workspace atual, ou quando outra sessão paralela do
  Claude Code estiver na mesma branch. Combina com /complete e
  finishing-a-development-branch.
allowed-tools: [Bash, Read, AskUserQuestion, Edit, Write]
---

# Skill — Worktree git pra isolamento

## Princípio

Git worktree cria **workspace isolado** compartilhando o mesmo repositório git — permite trabalhar em múltiplas branches **simultaneamente** sem switch (com tudo que switch quebra: arquivos não-commitados, processos em execução, dev server, etc).

Decisão central: **seleção sistemática de diretório + verificação de segurança = isolamento confiável**. Pular qualquer dos dois cria sujeira no repo principal ou contamina entre worktrees.

---

## Quando rodar

- Antes de executar plano de implementação grande (`/executing-plans` ou `/subagent-driven-development`)
- Antes de feature que precisa **isolamento do workspace ativo** (ex: refactor grande enquanto outra sessão trabalha em hotfix)
- Quando duas sessões IA paralelas precisam tocar branches diferentes do mesmo repo
- Antes de spike experimental que talvez seja descartado

## Quando NÃO precisa

- Mudança pequena (1-3 arquivos) na branch atual — `git checkout -b` direto basta
- Hotfix urgente que vai pra main em minutos
- Projeto com 1 dev solo + 1 sessão IA por vez

---

## Seleção de diretório (prioridade)

Ordem de preferência:

### 1. Diretório existente

```bash
# Em ordem de prioridade
ls -d .worktrees 2>/dev/null     # Preferido (oculto)
ls -d worktrees 2>/dev/null      # Alternativa (visível)
```

Se existir, **usa**. Se ambos existirem, `.worktrees` ganha.

### 2. Preferência no `CLAUDE.md`

```bash
grep -i "worktree.*diret" CLAUDE.md 2>/dev/null
```

Se `CLAUDE.md` declara preferência (`worktrees ficam em <path>`), usa **sem perguntar**.

### 3. Pergunta ao usuário

Se nem 1 nem 2, `AskUserQuestion` com opções:

```
Não encontrei diretório de worktree configurado. Onde criar?

1. .worktrees/ (project-local, oculto)
2. <pasta-global pra worktrees, ex: ~/dev-worktrees/<projeto>/>
3. Definir outro path
```

Após decisão, **salvar a escolha no `CLAUDE.md`** do projeto pra próximas sessões — evita repetir a pergunta.

---

## Verificação de segurança

### Pra diretório project-local (`.worktrees/` ou `worktrees/`)

**OBRIGATÓRIO** verificar que o diretório está no `.gitignore` antes de criar worktree:

```bash
# Respeita gitignore local + global + system
git check-ignore -q .worktrees 2>/dev/null && echo "OK: ignored" || echo "FAIL: not ignored"
```

**Se NÃO está ignored:**

Aplica política `gitignore-aditivo.md`:

1. Adiciona `.worktrees/` (ou `worktrees/`) no `.gitignore` via append
2. Cabeçalho `# === Adicionado por KOD.AI em <YYYY-MM-DD> ===`
3. Commit do `.gitignore`
4. Aí sim cria worktree

**Por quê crítico:** sem `.gitignore`, conteúdo da worktree (incluindo arquivos não-commitados de feature em curso) **vaza** pro `git status` da branch principal — corrompe o estado do repo.

### Pra diretório global (`~/dev-worktrees/...` ou equivalente fora do repo)

Sem verificação de gitignore — está fora do repo.

---

## Passos de criação

### 1. Detecta nome do projeto

```bash
project=$(basename "$(git rev-parse --show-toplevel)")
```

### 2. Cria worktree com branch nova

```bash
# Path da worktree
path="<diretorio-escolhido>/<nome-da-branch>"

git worktree add "$path" -b "<nome-da-branch>"
cd "$path"
```

### 3. Setup do projeto na nova worktree

Auto-detecta e roda comando apropriado:

```bash
# Node.js
if [ -f package.json ]; then npm install; fi

# Rust
if [ -f Cargo.toml ]; then cargo build; fi

# Python
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
if [ -f pyproject.toml ]; then poetry install || uv pip install -e .; fi

# Go
if [ -f go.mod ]; then go mod download; fi

# Ruby
if [ -f Gemfile ]; then bundle install; fi
```

Em monorepo (vários `package.json`), perguntar qual subpasta antes do `cd`.

### 4. Verifica baseline limpa

Roda testes pra garantir que worktree começa limpa:

```bash
# Comando apropriado ao stack
npm test            # JS/TS
cargo test          # Rust
pytest              # Python
go test ./...       # Go
bundle exec rspec   # Ruby
```

**Se testes falham:** reporta falhas, **pergunta** ao usuário se vale continuar (pode ser pre-existing issue na branch base) ou investigar primeiro.

**Se testes passam:** reporta pronto.

### 5. Reporta path completo

```
Worktree pronta em <path-completo>
Tests passing (<N> tests, 0 failures)
Pronto pra implementar <feature-name>
```

---

## Resumo rápido

| Situação | Ação |
|---|---|
| `.worktrees/` existe | Usa (verifica ignored) |
| `worktrees/` existe | Usa (verifica ignored) |
| Ambos existem | Usa `.worktrees/` |
| Nenhum existe | Checa `CLAUDE.md` → pergunta usuário |
| Diretório não ignored | Adiciona ao `.gitignore` + commit |
| Testes falham na baseline | Reporta + pergunta |
| Sem `package.json`/`Cargo.toml`/etc | Pula setup de deps |

---

## Anti-padrões

| ❌ Errado | ✅ Certo |
|---|---|
| Pular verificação de gitignore | Sempre verifica antes de criar project-local |
| Inventar localização ("vou criar em `~/temp/`") | Segue prioridade: existente → `CLAUDE.md` → pergunta |
| Prosseguir com testes falhando sem perguntar | Reporta + gate humano |
| Hardcoded de `npm install` em projeto Rust | Auto-detecta por arquivos do projeto |
| Não salvar escolha no `CLAUDE.md` após perguntar | Sempre persiste preferência |

---

## Red flags — NUNCA

- Criar worktree project-local sem confirmar gitignore
- Pular verificação de baseline de testes
- Prosseguir com testes falhando sem perguntar
- Assumir localização quando ambíguo
- Pular leitura de `CLAUDE.md`

## Sempre

- Seguir prioridade: existente → `CLAUDE.md` → pergunta
- Verificar gitignore pra project-local
- Auto-detectar e rodar setup de deps
- Verificar baseline limpa de testes
- Salvar escolha no `CLAUDE.md` quando perguntar

---

## Integração

**Chamada por:**

- `brainstorming` (Fase 4) — quando design aprovado e implementação vai começar
- `subagent-driven-development` — antes de despachar tasks (isolamento necessário)
- `executing-plans` — antes de executar batches (isolamento necessário)
- Qualquer skill que precise workspace isolado

**Combina com:**

- `finishing-a-development-branch` — limpa a worktree criada por esta skill nas opções 1 e 4
- `multi-conta-github` (playbook) — se feature exige conta git diferente, worktree isola também a config local
- `verification-before-completion` — verifica baseline na Etapa 4

---

## Atribuição

Re-implementação universalizada da skill `using-git-worktrees` Anthropic Superpowers (Apache-2.0). Seleção de diretório (3 níveis de prioridade) e verificação de gitignore preservadas como decisão central. Detecção de stack expandida (Node/Rust/Python pip+poetry/Go/Ruby). Integração com `gitignore-aditivo.md` (política KOD.AI) e `multi-conta-github.md` (playbook) explícita.
