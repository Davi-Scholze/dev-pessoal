#!/usr/bin/env python3
"""
Hook H2 — block-dangerous
Bloqueia comandos Bash perigosos antes de executar.
Exit 1 = bloqueia a tool. Exit 0 = permite.
"""
import sys
import json
import re

BLOCKED_PATTERNS = [
    (r'\brm\s+-rf\b', "rm -rf detectado — use trash ou especifique paths"),
    (r'\bdrop\s+(?:table|database|schema)\b', "DROP TABLE/DATABASE bloqueado — use migration controlada"),
    (r'\bgit\s+push\s+(?:--force|-f)\b.*(?:main|master)', "Force push em main/master bloqueado"),
    (r'\bgit\s+reset\s+--hard\b', "git reset --hard bloqueado — crie backup antes"),
    (r'\btruncate\s+table\b', "TRUNCATE TABLE bloqueado — use DELETE com WHERE"),
    (r'\bchmod\s+-R\s+777\b', "chmod 777 recursivo bloqueado — use permissões específicas"),
    (r'\bdd\s+if=', "dd if= bloqueado — operação destrutiva de baixo nível"),
    (r'\bkill\s+-9\s+1\b', "kill -9 PID 1 bloqueado"),
    (r'\bgit\s+push\s+origin\s+--delete\b', "Deleção de branch remota bloqueada — confirme manualmente"),
]

def main():
    try:
        raw = sys.stdin.read()
        if not raw.strip():
            sys.exit(0)

        data = json.loads(raw)
        tool_name = data.get("tool_name", "")

        if tool_name not in ("Bash", "bash"):
            sys.exit(0)

        command = data.get("tool_input", {}).get("command", "")
        command_lower = command.lower()

        for pattern, reason in BLOCKED_PATTERNS:
            if re.search(pattern, command_lower, re.IGNORECASE):
                print(f"\n🚫 [SCHOLZE-STACK] Comando bloqueado por segurança:", file=sys.stderr)
                print(f"   Motivo: {reason}", file=sys.stderr)
                print(f"   Comando: {command[:100]}...", file=sys.stderr)
                print(f"\n   Para executar mesmo assim, rode manualmente no terminal.", file=sys.stderr)
                sys.exit(1)

        sys.exit(0)

    except json.JSONDecodeError:
        sys.exit(0)  # não bloqueia se não conseguir parsear
    except Exception as e:
        print(f"[SCHOLZE-STACK] Erro no hook block-dangerous: {e}", file=sys.stderr)
        sys.exit(0)

if __name__ == "__main__":
    main()
