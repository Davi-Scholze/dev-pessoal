#!/usr/bin/env node
/**
 * KOD.AI Hook — check-upstream-age
 *
 * Disparo:    SessionStart
 * Eixo:       Orchestration
 * Versão:     1.0
 * Atualizado: 2026-05-23
 *
 * Operacionaliza o princípio fundacional 2Co 12:9-10:
 * "drift silencioso do clone KODAI/" vira "detector visível que alerta antes
 * de virar problema".
 *
 * Roda no início de cada sessão e checa:
 * 1. Existe KODAI/ clonado? → se não, silencioso
 * 2. Quando foi o último pull? (git -C KODAI log -1 --format=%cr)
 * 3. Há commits novos no upstream? (git -C KODAI fetch + rev-list)
 *
 * 3 estados possíveis:
 *   - Idade <7 dias E zero commits novos → silencioso (tudo OK)
 *   - Idade 7-30 dias OU 1-5 commits novos → alerta SOFT
 *   - Idade >30 dias OU >5 commits novos → alerta FIRME (sugere /atualizar-kodai agora)
 *
 * NÃO bloqueia, NÃO faz pull automático (humano decide). Apenas reporta.
 *
 * Fail-safe: se hook quebrar (rede offline, git ausente), segue silencioso.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function run(cmd, options = {}) {
  try {
    return execSync(cmd, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
      ...options
    }).trim();
  } catch (_) {
    return null;
  }
}

function main() {
  const workspaceRoot = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const kodaiPath = path.join(workspaceRoot, 'KODAI');

  // 1. KODAI clonado?
  if (!fs.existsSync(kodaiPath) || !fs.existsSync(path.join(kodaiPath, '.git'))) {
    // Não tem clone, silencioso (não é workspace KOD.AI ou ainda não rodou /instalar)
    return ok();
  }

  // 2. Quando foi o último commit local (proxy de "última atualização")
  const lastCommitDate = run(`git -C "${kodaiPath}" log -1 --format=%ct`);
  const lastCommitHash = run(`git -C "${kodaiPath}" log -1 --format=%h`);
  const lastCommitWhen = run(`git -C "${kodaiPath}" log -1 --format=%cr`);

  if (!lastCommitDate) {
    return ok(); // não conseguiu ler git
  }

  const lastCommitTs = parseInt(lastCommitDate, 10) * 1000;
  const ageMs = Date.now() - lastCommitTs;
  const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));

  // 3. Há commits novos no upstream?
  // Fetch silencioso (timeout 5s)
  const fetchResult = run(`git -C "${kodaiPath}" fetch origin --quiet 2>/dev/null`);
  const behindCount = parseInt(
    run(`git -C "${kodaiPath}" rev-list --count HEAD..origin/main 2>/dev/null`) || '0',
    10
  );

  // Lógica de alerta
  const alerts = [];

  if (ageDays >= 30 || behindCount > 5) {
    alerts.push({
      level: 'FIRME',
      msg: `⚠️ KOD.AI desatualizado: ${ageDays} dia(s) sem pull, ${behindCount} commit(s) novo(s) no upstream. Recomendo rodar /atualizar-kodai AGORA.`
    });
  } else if (ageDays >= 7 || behindCount >= 1) {
    alerts.push({
      level: 'SOFT',
      msg: `📌 KOD.AI: ${ageDays} dia(s) sem pull, ${behindCount} commit(s) novo(s) no upstream. Considere /atualizar-kodai quando puder.`
    });
  }

  if (alerts.length === 0) {
    return ok(); // tudo recente
  }

  const additionalContext =
    `# KOD.AI — Alerta de upstream drift (hook check-upstream-age)\n\n` +
    `Clone local: \`KODAI/\` @ ${lastCommitHash} (${lastCommitWhen})\n` +
    `Commits novos no upstream Davi-Scholze/kod-ai: ${behindCount}\n\n` +
    alerts.map(a => `**${a.level}:** ${a.msg}`).join('\n\n') +
    `\n\nPra atualizar:\n` +
    `- Skill: \`/atualizar-kodai\` (pull + re-propaga skills/rules/hooks preservando customizações)\n` +
    `- Manual: \`git -C KODAI pull\` (sem re-propagação)`;

  process.stdout.write(JSON.stringify({
    continue: true,
    additionalContext
  }));
  process.exit(0);
}

function ok() {
  process.stdout.write(JSON.stringify({ continue: true }));
  process.exit(0);
}

try {
  main();
} catch (err) {
  // Fail-safe
  try {
    fs.appendFileSync('.claude/hooks-errors.log',
      `[${new Date().toISOString()}] check-upstream-age FAIL: ${err.message}\n`);
  } catch (_) {}
  ok();
}
