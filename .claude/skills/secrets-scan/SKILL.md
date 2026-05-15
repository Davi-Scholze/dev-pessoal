# SKILL: secrets-scan

## Quando invocar
Antes de qualquer commit ou push. Automatizado via Hook 4 (check-secrets.py).

## Entrada
Diff do git (`git diff --staged`) ou path de arquivos a escanear.

## Saída esperada
Lista de credenciais detectadas com localização exata. Exit 1 se encontrar algo.

## Padrões de detecção
```python
# Padrões regex que indicam credenciais
PATTERNS = [
    r'sk_live_[a-zA-Z0-9]+',          # Stripe secret key
    r'pk_live_[a-zA-Z0-9]+',          # Stripe public key (em server-side)
    r'AIza[0-9A-Za-z\-_]{35}',        # Google API key
    r'ghp_[a-zA-Z0-9]{36}',           # GitHub personal token
    r'AKIA[0-9A-Z]{16}',              # AWS access key
    r'(?i)(password|secret|token)\s*=\s*["\'][^"\']{8,}["\']',  # Generic
    r'-----BEGIN (RSA |EC )?PRIVATE KEY-----',  # Private keys
]
```

## Como corrigir quando encontrado
1. NÃO faça commit com a credencial
2. Revogue a credencial imediatamente na plataforma
3. Adicione ao `.gitignore` o arquivo que continha
4. Mova para `.env` e adicione `.env.example` com placeholder
5. Se já commitado: use `git filter-repo` ou `BFG Repo Cleaner`

## Restrições
- Esta skill é executada automaticamente pelo Hook 4
- Para forçar scan manual: `python .claude/hooks/pre-commit/check-secrets.py`
