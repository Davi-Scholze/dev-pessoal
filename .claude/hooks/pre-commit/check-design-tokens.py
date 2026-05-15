#!/usr/bin/env python3
"""
Hook H3 — check-design-tokens
Detecta valores hardcoded de design (cores, font-sizes, spacing) em arquivos staged.
Exit 1 = bloqueia commit. Exit 0 = permite.
"""
import sys
import subprocess
import re

# Padrões que indicam tokens hardcoded (apenas em arquivos de estilo/componentes)
VIOLATIONS = [
    (r'(?<!["\'])#[0-9a-fA-F]{3,8}(?!["\w])',
     "Cor literal (#xxx) — use token semântico como var(--color-accent-default)"),
    (r'(?<!\w)(?:color|background|border-color)\s*:\s*(?:rgb|hsl|oklch)\([^)]+\)',
     "Cor literal em CSS — use variável CSS do token de design"),
    (r'font-size\s*:\s*\d+(?:\.\d+)?px',
     "font-size literal — use escala tipográfica do Tailwind (text-sm, text-base...)"),
    (r'(?:margin|padding|gap)\s*:\s*(?:\d+(?:\.\d+)?px\s*){1,4}',
     "Spacing literal — use escala de 4px do Tailwind (p-4, gap-6...)"),
]

# Extensões a verificar
TARGET_EXTENSIONS = {'.tsx', '.jsx', '.ts', '.js', '.css', '.scss', '.module.css'}

# Padrões de arquivo para ignorar
IGNORE_PATTERNS = [
    r'tokens\.json$',
    r'\.min\.(css|js)$',
    r'vendor/',
    r'node_modules/',
    r'__generated__',
]

def get_staged_files() -> list[str]:
    result = subprocess.run(
        ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
        capture_output=True, text=True
    )
    return result.stdout.strip().split('\n') if result.stdout.strip() else []

def should_check(filepath: str) -> bool:
    import os
    ext = os.path.splitext(filepath)[1].lower()
    if ext not in TARGET_EXTENSIONS:
        return False
    return not any(re.search(p, filepath) for p in IGNORE_PATTERNS)

def check_file(filepath: str) -> list[tuple[int, str, str]]:
    violations = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            for lineno, line in enumerate(f, 1):
                # Pula linhas comentadas
                stripped = line.strip()
                if stripped.startswith('//') or stripped.startswith('*') or stripped.startswith('#'):
                    continue
                for pattern, message in VIOLATIONS:
                    if re.search(pattern, line):
                        violations.append((lineno, line.rstrip(), message))
    except FileNotFoundError:
        pass
    return violations

def main():
    staged_files = get_staged_files()
    all_violations = []

    for filepath in staged_files:
        if not should_check(filepath):
            continue
        file_violations = check_file(filepath)
        for lineno, line, message in file_violations:
            all_violations.append((filepath, lineno, line, message))

    if all_violations:
        print(f"\n🎨 [SCHOLZE-STACK] Design tokens violados em {len(all_violations)} local(is):", file=sys.stderr)
        for filepath, lineno, line, message in all_violations[:10]:  # mostra até 10
            print(f"\n  {filepath}:{lineno}", file=sys.stderr)
            print(f"  → {message}", file=sys.stderr)
            print(f"  → {line[:80]}", file=sys.stderr)
        if len(all_violations) > 10:
            print(f"\n  ... e mais {len(all_violations) - 10} violações.", file=sys.stderr)
        print(f"\n  Corrija usando tokens de .claude/skills/design-tokens/tokens.json", file=sys.stderr)
        sys.exit(1)

    sys.exit(0)

if __name__ == "__main__":
    main()
