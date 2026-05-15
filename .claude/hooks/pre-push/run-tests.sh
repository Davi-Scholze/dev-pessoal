#!/bin/bash
# Hook H5 — run-tests
# Executa lint e testes antes de push.
# Se não há package.json, apenas avisa e passa.

if [ ! -f "package.json" ]; then
    echo "[SCHOLZE-STACK] Sem package.json — pulando testes." >&2
    exit 0
fi

echo "[SCHOLZE-STACK] Rodando lint..." >&2
if npm run lint --if-present 2>/dev/null; then
    echo "✓ Lint passou" >&2
else
    echo "✗ Lint falhou — corrija antes de fazer push" >&2
    exit 1
fi

echo "[SCHOLZE-STACK] Rodando testes..." >&2
if npm run test --if-present -- --run 2>/dev/null; then
    echo "✓ Testes passaram" >&2
else
    echo "✗ Testes falharam — corrija antes de fazer push" >&2
    exit 1
fi

exit 0
