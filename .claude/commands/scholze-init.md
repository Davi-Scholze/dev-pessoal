# /scholze-init

Inicializa o CLAUDE.md local em um repositório filho, seguindo o padrão SCHOLZE-STACK (Camada 3).

## Como usar
```
/scholze-init
```

Rode dentro do diretório do repositório filho que deseja inicializar.

## O que faz

1. Detecta a stack do projeto (lê package.json, requirements.txt, Cargo.toml)
2. Cria `.claude/CLAUDE.md` local com:
   - Stack detectada
   - Scripts de dev/build/test do projeto
   - Padrões específicos do projeto
   - Referência ao CLAUDE.md da pasta-mãe
3. Cria `.env.example` se não existir
4. Cria `scripts/setup.sh` básico

## Template gerado

```markdown
# [Nome do Projeto] — CLAUDE.md Local
> Camada 3 do SCHOLZE-STACK. Estende a pasta-mãe.
> Leia CLAUDE.md da pasta-mãe primeiro.

## Stack
- **Framework:** [detectado]
- **Runtime:** [detectado]
- **DB:** [se encontrado]

## Comandos principais
\`\`\`bash
npm run dev     # servidor de desenvolvimento
npm run build   # build de produção
npm run test    # testes
npm run lint    # lint
\`\`\`

## Padrões específicos deste projeto
[a preencher]

## Skills domain-specific
[a criar em .claude/skills/ deste projeto]
```

## Critério de sucesso
`.claude/CLAUDE.md` criado e legível por uma nova sessão de IA sem contexto adicional.
