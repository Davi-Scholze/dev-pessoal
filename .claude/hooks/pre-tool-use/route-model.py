#!/usr/bin/env python3
"""
Hook H1 — route-model
Lê o input da tool (via stdin como JSON) e sugere o modelo correto.
Não bloqueia — apenas imprime sugestão para orientar o agente orquestrador.
"""
import sys
import json

def suggest_model(tool_input: dict) -> str | None:
    text = json.dumps(tool_input).lower()

    heavy_keywords = ["architect", "design system", "migration", "threat model",
                      "refactor grande", "ripd", "spec técnica", "decisão arquitetural"]
    light_keywords = ["classify", "extract", "format", "commit message",
                      "sumarizar", "listar", "categorizar"]

    if any(k in text for k in heavy_keywords):
        return "OPUS + Plan Mode"
    if any(k in text for k in light_keywords):
        return "HAIKU"
    return None

def main():
    try:
        raw = sys.stdin.read()
        if not raw.strip():
            sys.exit(0)
        data = json.loads(raw)
        tool_input = data.get("tool_input", data)
        suggestion = suggest_model(tool_input)
        if suggestion:
            print(f"[SCHOLZE-STACK] Modelo sugerido para esta tarefa: {suggestion}", file=sys.stderr)
    except Exception:
        pass  # hook não deve bloquear por erro próprio
    sys.exit(0)

if __name__ == "__main__":
    main()
