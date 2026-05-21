---
tipo: rule
eixo: orchestration
escopo: "**/.gitignore"
versão: 1.0
atualizado: 2026-05-20
fontes:
  - 1-ESQUELETO/politicas/gitignore-aditivo.md
  - 1-ESQUELETO/hooks/pre-commit-guard.js
related:
  - ../../1-ESQUELETO/politicas/gitignore-aditivo.md
  - ../hooks/pre-commit-guard.js
---

# Regra: `.gitignore` aditivo (nunca sobrescrever)

## Quando se aplica

Qualquer operação que toque `.gitignore` em qualquer pasta do projeto. Glob `**/.gitignore` captura raiz + qualquer subpasta com `.gitignore` próprio.

## O que fazer

1. **Ler** o `.gitignore` existente integralmente
2. Identificar regras já presentes (linha por linha; comentários começam com `#`)
3. Calcular **delta** (regras novas que faltam)
4. Anexar delta no **final** do arquivo com cabeçalho identificador:
   ```
   # === Adicionado por KOD.AI em YYYY-MM-DD (origem: <skill/pack>) ===
   <regras novas>
   ```
5. Idempotência: se regra já existe (exata ou em padrão equivalente), pular silenciosamente

## O que NÃO fazer

- `echo "X" > .gitignore` (redirect destrutivo)
- `Write(.gitignore, "<conteúdo novo>")` em arquivo existente sem ler antes
- Sobrescrever `.gitignore` em projeto consumidor "porque o template tem versão mais nova"
- Remover regras existentes mesmo que pareçam obsoletas (`.env.backup-jan2024` pode ser referência a backup que ainda existe)

## Antipadrões relacionados

- **#7 Informações voláteis** — `.gitignore` referencia secrets e paths locais que mudam por máquina; sobrescrever destrói esse conhecimento
- Política `escuta-antes-de-agir` aplica: leitura antes de qualquer write

## Garantia mecânica

Hook `.claude/hooks/pre-commit-guard.js` (PreToolUse Bash) intercepta `> .gitignore` e `echo ... > .gitignore`. Esta regra textual + hook formam camada dupla.
