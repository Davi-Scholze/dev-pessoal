#!/usr/bin/env python3
"""
Hook H4 — check-secrets
Detecta credenciais e chaves de API no diff staged.
Exit 1 = bloqueia commit. Exit 0 = permite.
"""
import sys
import subprocess
import re

SECRET_PATTERNS = [
    (r'sk_live_[a-zA-Z0-9]{20,}', "Stripe secret key (sk_live_)"),
    (r'pk_live_[a-zA-Z0-9]{20,}', "Stripe public key em server-side (pk_live_)"),
    (r'sk_test_[a-zA-Z0-9]{20,}', "Stripe test key no código (use .env)"),
    (r'AIza[0-9A-Za-z\-_]{35}', "Google API key (AIza...)"),
    (r'ghp_[a-zA-Z0-9]{36}', "GitHub personal access token"),
    (r'ghs_[a-zA-Z0-9]{36}', "GitHub server token"),
    (r'AKIA[0-9A-Z]{16}', "AWS access key ID"),
    (r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----', "Private key embeddada no código"),
    (r'(?i)(?:password|passwd|secret|api_key|apikey)\s*=\s*["\'][^"\']{8,}["\']', "Credencial hardcoded"),
    (r'(?i)(?:database_url|db_url)\s*=\s*["\']postgresql://[^@]+:[^@]+@', "Database URL com credenciais"),
    (r'Bearer\s+eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+', "JWT token hardcoded"),
    (r'(?i)supabase.*service_role.*["\'][a-zA-Z0-9\-_.]+["\']', "Supabase service role key"),
]

# Arquivos a ignorar (falsos positivos comuns)
IGNORE_FILES = [
    r'\.env\.example$',
    r'\.md$',
    r'check-secrets\.py$',
    r'node_modules/',
    r'\.git/',
    r'CHANGELOG',
]

def get_staged_diff() -> str:
    result = subprocess.run(
        ['git', 'diff', '--cached'],
        capture_output=True, text=True
    )
    return result.stdout

def should_ignore_file(filepath: str) -> bool:
    return any(re.search(p, filepath) for p in IGNORE_FILES)

def main():
    diff = get_staged_diff()
    if not diff:
        sys.exit(0)

    violations = []
    current_file = None

    for line in diff.split('\n'):
        if line.startswith('+++ b/'):
            current_file = line[6:]
        if not line.startswith('+') or line.startswith('+++'):
            continue
        if current_file and should_ignore_file(current_file):
            continue

        content = line[1:]  # remove o "+"
        for pattern, description in SECRET_PATTERNS:
            if re.search(pattern, content):
                violations.append((current_file, description, content[:80]))
                break  # um match por linha é suficiente

    if violations:
        print(f"\n🔐 [SCHOLZE-STACK] CREDENCIAL DETECTADA — commit BLOQUEADO!\n", file=sys.stderr)
        for filepath, description, snippet in violations:
            print(f"  Arquivo: {filepath}", file=sys.stderr)
            print(f"  Tipo: {description}", file=sys.stderr)
            print(f"  Trecho: {snippet}", file=sys.stderr)
            print("", file=sys.stderr)
        print("  AÇÕES OBRIGATÓRIAS:", file=sys.stderr)
        print("  1. Remova a credencial do código", file=sys.stderr)
        print("  2. Revogue a credencial na plataforma (ela está comprometida)", file=sys.stderr)
        print("  3. Adicione ao .env e referencie via process.env", file=sys.stderr)
        print("  4. Adicione o arquivo ao .gitignore se necessário", file=sys.stderr)
        sys.exit(1)

    sys.exit(0)

if __name__ == "__main__":
    main()
