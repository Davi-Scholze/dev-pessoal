#!/usr/bin/env python3
"""
Hook H8 — observability
Placeholder para futura integração com dashboard WebSocket.
Quando o dashboard estiver rodando em localhost:8765, emite eventos em tempo real.
Por enquanto, grava em arquivo de eventos local.

Para ativar o dashboard: ver docs/playbooks/como-monitorar-agentes.md (futuro)
"""
import sys
import json
import os
from datetime import datetime, timezone

EVENTS_FILE = os.path.expanduser("~/.claude/observability-events.jsonl")
DASHBOARD_URL = "ws://localhost:8765"

def emit_event(event: dict):
    # Tenta emitir via WebSocket (futuro)
    try:
        import websockets
        import asyncio
        async def send():
            async with websockets.connect(DASHBOARD_URL, open_timeout=0.5) as ws:
                await ws.send(json.dumps(event))
        asyncio.run(send())
        return
    except Exception:
        pass  # Dashboard não está rodando — silenciosamente prossegue

    # Fallback: grava em arquivo local
    try:
        os.makedirs(os.path.dirname(EVENTS_FILE), exist_ok=True)
        with open(EVENTS_FILE, 'a', encoding='utf-8') as f:
            f.write(json.dumps(event, ensure_ascii=False) + '\n')
    except Exception:
        pass

def main():
    try:
        raw = sys.stdin.read()
        if not raw.strip():
            sys.exit(0)

        data = json.loads(raw)
        event = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "type": "tool_use",
            "tool": data.get("tool_name", "unknown"),
            "project": os.path.basename(os.getcwd()),
            "agent": os.environ.get("CLAUDE_AGENT_NAME", "main"),
        }
        emit_event(event)

    except Exception:
        pass

    sys.exit(0)

if __name__ == "__main__":
    main()
