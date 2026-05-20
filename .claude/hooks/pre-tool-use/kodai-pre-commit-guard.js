#!/usr/bin/env node
/**
 * KOD.AI Hook — pre-commit-guard
 *
 * Disparo:    PreToolUse(Bash)
 * Eixo:       Orchestration
 * Versão:     1.0
 * Atualizado: 2026-05-20
 *
 * Operacionaliza:
 * - politicas/aprovacao-schema-banco.md (SQL DDL exige aprovação)
 * - politicas/gitignore-aditivo.md (não sobrescrever .gitignore)
 * - politicas/explicar-acao-custosa.md (4 dados antes de destrutiva)
 * - regras-base.md (regra 9 — Política C: grandes pergunta antes)
 *
 * Intercepta comandos Bash arriscados antes da execução. Em caso de
 * comando destrutivo sem confirmação explícita do usuário no histórico
 * recente, bloqueia.
 *
 * Padrões interceptados:
 *   - SQL DDL: DROP TABLE/SCHEMA/DATABASE, TRUNCATE, ALTER TABLE,
 *     DELETE FROM
 *   - File destrutivo: rm -rf /, find ... -delete em paths fora do projeto
 *   - Git perigoso: push --force, reset --hard em main, branch -D em main
 *   - Override .gitignore: > .gitignore (redirect que sobrescreve)
 *
 * Fail-safe: se hook quebrar, harness permite execução (logging).
 *
 * Veja também:
 * - politicas/escuta-antes-de-agir.md
 * - politicas/aprovacao-schema-banco.md
 * - politicas/gitignore-aditivo.md
 */

'use strict';

const fs = require('fs');

let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const tool = input.toolName || input.tool || '';
    if (tool !== 'Bash') {
      return ok();
    }

    const command = (input.toolInput?.command || input.command || '').toString();
    if (!command) {
      return ok();
    }

    // Padrões destrutivos
    const dangerous = [
      // SQL DDL
      { re: /\bDROP\s+(TABLE|SCHEMA|DATABASE|INDEX)\b/i,
        msg: 'SQL DDL destrutivo (DROP) — política aprovacao-schema-banco' },
      { re: /\bTRUNCATE\b/i,
        msg: 'SQL TRUNCATE — política aprovacao-schema-banco' },
      { re: /\bALTER\s+TABLE\b/i,
        msg: 'SQL ALTER TABLE — política aprovacao-schema-banco' },
      { re: /\bDELETE\s+FROM\s+\w+(?!\s+WHERE)/i,
        msg: 'SQL DELETE sem WHERE — política aprovacao-schema-banco' },

      // File destrutivo
      { re: /\brm\s+-rf?\s+\/(?!tmp|var\/tmp)/,
        msg: 'rm -rf em path raiz — política escuta-antes-de-agir' },
      { re: /\brm\s+-rf?\s+~/,
        msg: 'rm -rf em home — política escuta-antes-de-agir' },

      // Git perigoso
      { re: /\bgit\s+push\s+(--force|-f)\b.*\b(main|master)\b/,
        msg: 'git push --force em main/master — política explicar-acao-custosa' },
      { re: /\bgit\s+reset\s+--hard\b/,
        msg: 'git reset --hard — política escuta-antes-de-agir' },
      { re: /\bgit\s+branch\s+-D\s+(main|master)\b/,
        msg: 'git branch -D em main/master — bloqueado sempre' },

      // Override .gitignore
      { re: />\s*\.gitignore\b/,
        msg: 'Redirect que sobrescreve .gitignore — política gitignore-aditivo' },
      { re: /\becho\s+.*>\s*\.gitignore\b/,
        msg: 'echo > .gitignore — política gitignore-aditivo (use Edit com append)' },

      // Hook bypass
      { re: /--no-verify\b/,
        msg: '--no-verify (bypass de pre-commit) — sem permissão explícita do Davi' },
    ];

    for (const { re, msg } of dangerous) {
      if (re.test(command)) {
        const reason =
          `🛑 Hook pre-commit-guard bloqueou execução.\n\n` +
          `Comando: \`${command}\`\n` +
          `Motivo: ${msg}\n\n` +
          `Ações possíveis:\n` +
          `1. Aplicar política irmã: anunciar 4 dados (O QUE / QUANTO / RISCO / REVERSÃO) antes de executar\n` +
          `2. Pedir confirmação literal do usuário (palavra exata "confirmo destrutiva")\n` +
          `3. Se for engano, escolher comando equivalente não-destrutivo`;
        return block(reason);
      }
    }

    return ok();
  } catch (err) {
    fs.appendFileSync('.claude/hooks-errors.log',
      `[${new Date().toISOString()}] pre-commit-guard FAIL: ${err.message}\n`);
    ok();
  }
});

function ok() {
  process.stdout.write(JSON.stringify({ continue: true }));
  process.exit(0);
}

function block(reason) {
  process.stdout.write(JSON.stringify({ continue: false, reason }));
  process.exit(2);
}
