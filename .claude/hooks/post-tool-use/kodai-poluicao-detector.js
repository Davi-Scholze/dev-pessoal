/**
 * poluicao-detector.js
 *
 * Hook PostToolUse — detecta poluição estrutural em workspace KOD.AI e alerta.
 *
 * Gatilhos:
 *   1. Pastas temporárias > 100MB
 *   2. .md órfãos na raiz pasta-mãe
 *   3. .gitignore drift (pastas tmp sem entry)
 *   4. Pastas vazias > 1 dia
 *
 * NÃO bloqueia trabalho — apenas alerta no stdout.
 *
 * Política: politicas/poluicao-detection.md
 * Skill alvo: skills-universais/organizar (sugere rodar)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const CONFIG = {
  thresholdMB: 100,
  diasRollbackMax: 30,
  diasPastaVaziaMax: 1,
  canonMd: ['CLAUDE.md', 'AGENTS.md', 'KODAI-INSTALADO.md', 'README.md'],
  rollbackPattern: /^\.organizar-rollback-.*\.md$/,
  tmpPatterns: ['.kodai-tmp-', '.kodai-absorcoes', '.faxina-quarentena'],
};

function calcSizeMB(dirPath) {
  let total = 0;
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dirPath, entry.name);
      try {
        if (entry.isDirectory()) {
          total += calcSizeMB(full);
        } else if (entry.isFile()) {
          const stat = fs.statSync(full);
          total += stat.size;
        }
      } catch (_) {
        // ignora arquivos inacessíveis
      }
    }
  } catch (_) {
    return 0;
  }
  return total / (1024 * 1024); // bytes → MB
}

function diasDesde(date) {
  return (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
}

function detectarPoluicao(workspaceRoot) {
  const alertas = [];
  let entries;
  try {
    entries = fs.readdirSync(workspaceRoot);
  } catch (_) {
    return alertas; // sem permissão de leitura → silencioso
  }

  // Gatilho 1 — pastas temporárias grandes
  for (const entry of entries) {
    const full = path.join(workspaceRoot, entry);
    let isDir = false;
    try {
      isDir = fs.statSync(full).isDirectory();
    } catch (_) {
      continue;
    }
    if (!isDir) continue;

    const matchTmp = CONFIG.tmpPatterns.some(p => entry.startsWith(p));
    if (matchTmp) {
      const sizeMB = Math.round(calcSizeMB(full));
      if (sizeMB > CONFIG.thresholdMB) {
        alertas.push(`${entry}/ tem ${sizeMB}MB (threshold ${CONFIG.thresholdMB}MB) — considerar limpeza`);
      }
    }
  }

  // Gatilho 1b — rollbacks antigos sem ciclo de purge
  for (const entry of entries) {
    if (CONFIG.rollbackPattern.test(entry)) {
      try {
        const stat = fs.statSync(path.join(workspaceRoot, entry));
        const idade = diasDesde(stat.mtime);
        if (idade > CONFIG.diasRollbackMax) {
          alertas.push(`${entry} está há ${Math.round(idade)} dias sem purge — mover pra _archive/ ou deletar`);
        }
      } catch (_) {}
    }
  }

  // Gatilho 2 — .md órfãos na raiz
  const mdFiles = entries.filter(f => f.endsWith('.md') && !f.startsWith('.'));
  const orfaos = mdFiles.filter(f => !CONFIG.canonMd.includes(f));
  if (orfaos.length >= 3) {
    alertas.push(`${orfaos.length} .md não-canônicos na raiz: ${orfaos.slice(0, 5).join(', ')}${orfaos.length > 5 ? '…' : ''}`);
  }

  // Gatilho 4 — gitignore drift
  let gitignore = '';
  try {
    gitignore = fs.readFileSync(path.join(workspaceRoot, '.gitignore'), 'utf-8');
  } catch (_) {}

  for (const entry of entries) {
    const matchTmp = CONFIG.tmpPatterns.some(p => entry.startsWith(p));
    if (matchTmp && gitignore && !gitignore.includes(entry)) {
      // checa só os tmp-* explícitos (não wildcards)
      if (!gitignore.match(new RegExp(`^\\s*\\.kodai-tmp-`, 'm'))) {
        alertas.push(`${entry}/ não está em .gitignore — adicionar`);
      }
    }
  }

  return alertas;
}

function main() {
  // Workspace root = cwd ou env var
  const workspaceRoot = process.env.CLAUDE_PROJECT_DIR || process.cwd();

  // Detecta apenas se estamos em workspace KOD.AI (tem _memoria/ ou KODAI-INSTALADO.md)
  const isKodaiWorkspace =
    fs.existsSync(path.join(workspaceRoot, '_memoria')) ||
    fs.existsSync(path.join(workspaceRoot, 'KODAI-INSTALADO.md'));

  if (!isKodaiWorkspace) {
    return; // silencioso fora de workspace KOD.AI
  }

  // Verifica arquivo de silenciamento opcional
  if (fs.existsSync(path.join(workspaceRoot, '.claude/hooks/poluicao-silenciado'))) {
    return;
  }

  const alertas = detectarPoluicao(workspaceRoot);

  if (alertas.length > 0) {
    console.log('🧹 Detector de poluição estrutural:');
    alertas.forEach(a => console.log(`  - ${a}`));
    console.log('💡 Sugestão: rodar `/organizar` ou `/faxina --dry-run` quando puder.');
    console.log('   (Hook não bloqueia — apenas alerta. Silenciar: criar .claude/hooks/poluicao-silenciado)');
  }
}

main();
