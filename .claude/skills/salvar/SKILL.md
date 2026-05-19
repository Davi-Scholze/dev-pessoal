---
name: salvar
description: >
  Salva o trabalho no GitHub (commit + push). Na primeira vez configura
  o repositório remoto via `gh` CLI. Fácil pra quem nunca usou git.
  Use sempre que o usuário disser "salvar", "salva no github", "commit",
  "push", "fazer backup", "vai pro git", "/salvar", ou quando terminar
  uma tarefa significativa (skill /complete já rodou).
allowed-tools: [Bash]
---

# /salvar — Salvar no GitHub

Skill de uma função só: garantir que o trabalho do usuário está no GitHub. Fácil pra quem nunca usou git.

## Workflow

### Primeira vez (repositório não inicializado)

Detectar com `git rev-parse --is-inside-work-tree` (silenciar erros). Se falhar:

1. Perguntar:
   > "Esse é o primeiro syncar. Você já tem um repositório criado no GitHub pra esse workspace?
   >
   > 1. Sim, me passa a URL (ex: https://github.com/usuario/nome.git)
   > 2. Não, vou criar agora — me dá um nome pro repositório (ex: meu-negocio)"

2. **Se opção 1 (já tem):**
   ```bash
   git init
   git add .
   git commit -m "Setup inicial via KOD.AI"
   git branch -M main
   git remote add origin <URL>
   git push -u origin main
   ```

3. **Se opção 2 (criar agora):**
   - Verificar se `gh` está instalado: `gh --version`
   - Se sim:
     ```bash
     git init
     git add .
     git commit -m "Setup inicial via KOD.AI"
     gh repo create <nome> --private --source=. --push
     ```
   - Se não: instruir usuário a instalar `gh` (https://cli.github.com/) OU criar repo manualmente em github.com/new e voltar com a URL.

### Commits seguintes (já configurado)

1. Rodar `git status`. Se não tiver mudanças, responder:
   > "Tá tudo sincronizado, sem mudança nova."
   E parar.

2. Mostrar `git status` curto pro usuário e perguntar:
   > "Vou comitar tudo isso. Quer descrever a mudança em uma frase ou usa o resumo automático?"

3. Se usuário fornecer mensagem, usar. Se não, gerar mensagem baseada em arquivos alterados:
   - Formato: `<tipo>(<escopo>): <descrição>`
   - Detectar tipo: `feat` (arquivos novos), `fix` (mudanças em testes existentes), `docs` (só `.md`), `chore` (configs), etc.

4. Executar:
   ```bash
   git add .
   git commit -m "<mensagem>"
   git push
   ```

5. Confirmar com link do repositório:
   ```bash
   git remote get-url origin
   ```
   Responder: "Sincronizado. Ver no GitHub: `<URL>`"

## Regras

- **Nunca usar `--force`** sem o usuário pedir explicitamente
- **Nunca rodar `git reset --hard`** ou outras destrutivas sem confirmação clara
- Se push falhar por divergência (alguém comitou no remoto):
  - Avisar usuário
  - Oferecer `git pull --rebase` antes de tentar de novo
  - **Nunca resolver merge conflict automaticamente** — pedir orientação
- Se usuário ainda não tiver `git config user.name` ou `user.email`, perguntar e configurar com `git config --global` na primeira vez

## Sinais de problema

| Sintoma | Ação |
|---|---|
| `gh: command not found` | Instruir instalação |
| `Permission denied (publickey)` | Sugerir setup SSH ou usar HTTPS |
| `Updates were rejected because the remote contains work` | Oferecer `git pull --rebase` |
| Arquivo > 100MB no commit | Avisar (limite GitHub), sugerir `.gitignore` ou git-lfs |
