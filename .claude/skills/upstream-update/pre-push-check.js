#!/usr/bin/env node
/**
 * KOD.AI /upstream-update — Pre-push check (hook integrado opcional)
 *
 * Pode ser instalado como git hook em .git/hooks/pre-push no upstream clone
 * pra garantir que TODO push pra main passa pelo anti-pollution antes.
 *
 * Versão:     1.0
 * Atualizado: 2026-05-21
 *
 * Instalação (manual, opcional):
 *   ln -sf "<path-deste-arquivo>" "<upstream-clone>/.git/hooks/pre-push"
 *   chmod +x "<upstream-clone>/.git/hooks/pre-push"
 *
 * Comportamento:
 *   - Se branch sendo pushed é 'main' E commit message contém "via /upstream-update"
 *     → roda checks.js sobre arquivos modificados
 *     → se algum check FAIL, bloqueia push
 *   - Caso contrário, deixa passar (não interfere em commits normais)
 *
 * Fail-safe: se hook quebra, push continua (não bloqueia work).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // Lê stdin do git pre-push hook: <local-ref> <local-sha> <remote-ref> <remote-sha>
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) process.exit(0);

  const lines = input.split('\n');
  for (const line of lines) {
    const [localRef, localSha] = line.split(/\s+/);
    if (!localRef.endsWith('/main')) continue;

    // Pega commit message do localSha
    const msg = execSync(`git log -1 --format=%B ${localSha}`).toString();
    if (!msg.includes('via /upstream-update')) continue;

    // É um commit de /upstream-update — validar
    console.error('pre-push-check: detectado commit /upstream-update; validando anti-poluição...');

    // Lê arquivos modificados no commit
    const changedFiles = execSync(`git diff-tree --no-commit-id --name-only -r ${localSha}`)
      .toString()
      .split('\n')
      .filter(f => f.trim());

    // Carrega checks.js (assume que está em KODAI/1-ESQUELETO/skills-universais/upstream-update/)
    const checksPath = path.resolve(__dirname, 'checks.js');
    if (!fs.existsSync(checksPath)) {
      console.error('pre-push-check: checks.js não encontrado em', checksPath, '— deixando passar');
      process.exit(0);
    }

    const checks = require(checksPath);

    // Roda check rápido (PII apenas — outros checks exigem source pra comparar)
    let blocked = false;
    for (const file of changedFiles) {
      if (!file.endsWith('.md')) continue;
      if (!fs.existsSync(file)) continue;

      const content = fs.readFileSync(file, 'utf-8');
      const piiResult = checks.piiScan(content);
      if (!piiResult.pass) {
        console.error(`pre-push-check: PII detectado em ${file}: ${piiResult.razao}`);
        blocked = true;
      }
    }

    if (blocked) {
      console.error('\n🛑 pre-push-check: push bloqueado por PII detectada.');
      console.error('   Sanitize antes de re-push.');
      process.exit(1);
    }
  }

  process.exit(0);
} catch (err) {
  // Fail-safe: erros no hook não bloqueiam push
  console.error('pre-push-check: erro interno (deixando passar):', err.message);
  process.exit(0);
}
