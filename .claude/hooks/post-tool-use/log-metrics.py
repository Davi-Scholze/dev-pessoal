#!/usr/bin/env python3
"""
Hook H7 — log-metrics
Grava métricas de uso de ferramentas em ~/.claude/metrics.jsonl
para análise posterior de tokens consumidos e padrões de uso.
"""
import sys
import json
import os
from datetime import datetime, timezone

METRICS_FILE = os.path.expanduser("~/.claude/metrics.jsonl")

def main():
    try:
        raw = sys.stdin.read()
        if not raw.strip():
            sys.exit(0)

        data = json.loads(raw)

        # Extrair informações disponíveis
        metric = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "tool": data.get("tool_name", "unknown"),
            "session": os.environ.get("CLAUDE_SESSION_ID", "unknown"),
            "project": os.path.basename(os.getcwd()),
        }

        # Adicionar info de tokens se disponível
        if "usage" in data:
            usage = data["usage"]
            metric["tokens_in"] = usage.get("input_tokens", 0)
            metric["tokens_out"] = usage.get("output_tokens", 0)

        # Adicionar resultado simplificado (sem dados sensíveis)
        if "tool_result" in data:
            result = data["tool_result"]
            if isinstance(result, dict):
                metric["result_type"] = result.get("type", "unknown")
            elif isinstance(result, str):
                metric["result_len"] = len(result)

        # Gravar no arquivo de métricas
        os.makedirs(os.path.dirname(METRICS_FILE), exist_ok=True)
        with open(METRICS_FILE, 'a', encoding='utf-8') as f:
            f.write(json.dumps(metric, ensure_ascii=False) + '\n')

    except Exception:
        pass  # nunca bloquear por erro de logging

    sys.exit(0)

if __name__ == "__main__":
    main()
