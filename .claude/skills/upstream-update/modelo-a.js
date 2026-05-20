#!/usr/bin/env node
/**
 * KOD.AI /upstream-update — Modelo A (direct push)
 *
 * Versão:     1.0
 * Atualizado: 2026-05-21
 * Spec:       docs/decisoes/2026-05-20-upstream-update-mecanismo.md
 * Task:       docs/decisoes/tasks/2026-05-21_upstream-update/task-04-modelo-A-direct-push.md
 *
 * Davi-only — commit direto em Davi-Scholze/kod-ai/main.
 * Implementa as 7 fases da SKILL.md em modo Modelo A.
 *
 * Uso CLI:
 *   node modelo-a.js --pitch-path <path> --upstream-path <path-clone-kodai>
 *                    [--dry-run] [--attribution true|false]
 *                    [--override-anti-pollution --razao "<texto>"]
 *
 * Variáveis ambiente reconhecidas:
 *   KODAI_UPSTREAM_PATH  — path local do clone do Davi-Scholze/kod-ai
 *   CLAUDE_MODEL         — propagado pro tracker.audit.operator
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const checks = require('./checks.js');
const tracker = require('./tracker.js');

// ============================================================================
// Constantes
// ============================================================================

const EXPECTED_GIT_EMAIL = 'davi.scholze28@gmail.com';
const UPSTREAM_REMOTE = 'origin';
const UPSTREAM_BRANCH = 'main';

// ============================================================================
// Parse pitch
// ============================================================================

function parsePitch(pitchPath) {
  if (!fs.existsSync(pitchPath)) {
    throw new Error(`Pitch não encontrado: ${pitchPath}. Rode /auditar-projeto primeiro.`);
  }
  const content = fs.readFileSync(pitchPath, 'utf-8');

  // Schema simples do pitch (gerado por /auditar-projeto Fase 8):
  // YAML frontmatter + seções markdown:
  //   ## Items
  //   - source: <path>
  //     upstream: <path>
  //     bucket: <X>
  //     category: <X>
  //     license: <X>
  //     sensibilidade: <X>
  //   ## Brand_words: [Navortech, NV-Dev, ...]
  //   ## Attribution: true|false

  const items = [];
  const itemRegex = /-\s*source:\s*(.+?)\n\s*upstream:\s*(.+?)\n\s*bucket:\s*(.+?)\n\s*category:\s*(.+?)\n\s*license:\s*(.+?)\n\s*sensibilidade:\s*(.+?)(?=\n-|\n##|$)/gs;
  let m;
  while ((m = itemRegex.exec(content)) !== null) {
    items.push({
      source_path: m[1].trim(),
      upstream_path: m[2].trim(),
      bucket: m[3].trim(),
      category: m[4].trim(),
      license: m[5].trim(),
      sensibilidade: m[6].trim()
    });
  }

  const brandMatch = content.match(/##\s*Brand_?words:\s*\[(.+?)\]/i);
  const brandWords = brandMatch
    ? brandMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''))
    : [];

  const attributionMatch = content.match(/##\s*Attribution:\s*(true|false)/i);
  const attributionOptIn = attributionMatch ? attributionMatch[1].toLowerCase() === 'true' : false;

  return { items, brandWords, attributionOptIn };
}

// ============================================================================
// Fase 1 — Detect
// ============================================================================

function fase1Detect(opts) {
  console.log('Fase 1: Detect — lendo pitch...');
  const pitchPath = opts.pitchPath ||
    path.join('.kodai-auditoria', 'latest', 'upstream-pitch.md');
  const pitch = parsePitch(pitchPath);

  if (pitch.items.length === 0) {
    throw new Error('Pitch sem items. Verifique formato (deve ter ## Items com source/upstream/bucket).');
  }

  // Bloqueia sensibilidade alta
  const bloqueados = pitch.items.filter(i =>
    i.sensibilidade === 'confidencial' || i.sensibilidade === 'pii'
  );
  if (bloqueados.length > 0) {
    throw new Error(
      `${bloqueados.length} items com Sensibilidade: confidencial/pii NÃO podem ir pra upstream. ` +
      `Ver politica classificacao-contexto.md. Items: ${bloqueados.map(i => i.source_path).join(', ')}`
    );
  }

  console.log(`  → ${pitch.items.length} items, ${pitch.brandWords.length} brand_words, attribution=${pitch.attributionOptIn}`);
  return pitch;
}

// ============================================================================
// Fase 2 — Validar local (anti-poluição)
// ============================================================================

function fase2Validar(pitch, opts) {
  console.log('Fase 2: Validar anti-poluição...');

  const perItem = {};
  const failures = [];

  for (const item of pitch.items) {
    const result = checks.runAllChecks(item.source_path, {
      sourcePaths: [item.source_path],
      brandWords: pitch.brandWords,
      itemMetadata: { license: item.license },
      upstreamPath: item.upstream_path
    });

    perItem[item.source_path] = result;
    if (!result.allPass) {
      failures.push({
        item: item.source_path,
        failures: result.failures,
        detalhes: result.detalhes
      });
    }
  }

  if (failures.length > 0 && !opts.overrideAntiPollution) {
    console.error('Anti-poluição FAIL em', failures.length, 'items:');
    failures.forEach(f => console.error(`  - ${f.item}: ${f.failures.join(', ')}`));
    throw new Error('Anti-poluição falhou. Use --override-anti-pollution --razao "<texto>" pra forçar (Modelo A apenas).');
  }

  if (opts.overrideAntiPollution) {
    if (!opts.razao || opts.razao.length < 30) {
      throw new Error('Override exige --razao com ≥30 chars.');
    }
    logOverride(failures, opts);
  }

  console.log(`  → ${pitch.items.length} items validados (${failures.length} com override)`);
  return { perItem, failures, allPass: failures.length === 0 || opts.overrideAntiPollution };
}

function logOverride(failures, opts) {
  const auditPath = path.join(opts.upstreamPath, '99_meta', 'audit_log.md');
  if (!fs.existsSync(auditPath)) return;  // não força criação
  const entry = `\n## Override anti-pollution ${new Date().toISOString()}\n` +
    `- Items: ${failures.map(f => f.item).join(', ')}\n` +
    `- Failures: ${failures.map(f => f.failures.join(',')).join(' | ')}\n` +
    `- Razão: "${opts.razao}"\n` +
    `- Aprovado por: Davi (via /upstream-update --override-anti-pollution)\n`;
  fs.appendFileSync(auditPath, entry);
}

// ============================================================================
// Fase 3 — Preparar branch upstream
// ============================================================================

function fase3PreparBranch(opts) {
  console.log('Fase 3: Preparando branch upstream...');
  const upstreamPath = opts.upstreamPath || process.env.KODAI_UPSTREAM_PATH;
  if (!upstreamPath || !fs.existsSync(upstreamPath)) {
    throw new Error(`Upstream path inválido: ${upstreamPath}. Setar via --upstream-path ou KODAI_UPSTREAM_PATH.`);
  }

  // Validar identidade git LOCAL
  const email = execSync(`git -C "${upstreamPath}" config user.email`).toString().trim();
  if (email !== EXPECTED_GIT_EMAIL) {
    throw new Error(
      `Identidade git incorreta no upstream clone: ${email}. ` +
      `Esperado: ${EXPECTED_GIT_EMAIL}. Setar via: git -C "${upstreamPath}" config user.email ${EXPECTED_GIT_EMAIL}`
    );
  }

  // Validar working tree limpa
  const status = execSync(`git -C "${upstreamPath}" status --short`).toString().trim();
  if (status) {
    throw new Error(
      `Upstream clone com working tree suja:\n${status}\nCommitar/stash antes de /upstream-update.`
    );
  }

  // Checkout main + pull
  execSync(`git -C "${upstreamPath}" checkout ${UPSTREAM_BRANCH}`, { stdio: 'pipe' });
  execSync(`git -C "${upstreamPath}" pull ${UPSTREAM_REMOTE} ${UPSTREAM_BRANCH}`, { stdio: 'pipe' });

  console.log(`  → Branch ${UPSTREAM_BRANCH} pulled de ${UPSTREAM_REMOTE} (identidade ${email})`);
  return upstreamPath;
}

// ============================================================================
// Fase 4 — Format (empacotar items)
// ============================================================================

function fase4Format(pitch, upstreamPath, attributionOptIn) {
  console.log('Fase 4: Format — empacotando items...');
  const consumerName = process.env.CONSUMER_NAME || 'Davi Scholze';
  const dataStr = new Date().toISOString().split('T')[0];

  for (const item of pitch.items) {
    const targetPath = path.join(upstreamPath, item.upstream_path);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(item.source_path, targetPath);

    // Adicionar atribuição no rodapé (se opt_in) OU em comentário HTML (anônimo)
    const attribLine = attributionOptIn
      ? `\n\n---\n\n> Origem: ${consumerName} em ${dataStr} via \`/upstream-update\` Modelo A\n`
      : `\n\n<!-- attribution: consumidor-externo:${dataStr} via /upstream-update Modelo A -->\n`;
    fs.appendFileSync(targetPath, attribLine);

    console.log(`  → ${item.upstream_path} (${item.bucket})`);
  }
}

// ============================================================================
// Fase 5 — Submit (Modelo A: commit direto)
// ============================================================================

function fase5Submit(pitch, upstreamPath, attributionOptIn, opts) {
  console.log('Fase 5: Submit Modelo A — commit direto...');

  if (opts.dryRun) {
    console.log('  → DRY RUN — pulando commit + push');
    return { sha: 'dry-run-sha', method: 'A_direct_push', status: 'dry_run' };
  }

  execSync(`git -C "${upstreamPath}" add -A`, { stdio: 'pipe' });

  const consumerName = process.env.CONSUMER_NAME || 'Davi Scholze';
  const consumerEmail = process.env.CONSUMER_EMAIL || EXPECTED_GIT_EMAIL;

  const lines = [
    `feat(upstream): ${pitch.items.length} items de ${consumerName} via /upstream-update`,
    '',
    'Items absorvidos:',
    ...pitch.items.map(i => `- ${i.bucket}: ${i.upstream_path} (de ${i.source_path})`),
    '',
    'Anti-poluição: 7 SIM PASS' + (opts.overrideAntiPollution ? ` (com override: ${opts.razao})` : ''),
    ''
  ];

  if (attributionOptIn) {
    lines.push(`Co-Authored-By: ${consumerName} <${consumerEmail}>`);
  }

  const message = lines.join('\n');
  const messageFile = path.join(upstreamPath, '.git', 'UPSTREAM_UPDATE_MSG.tmp');
  fs.writeFileSync(messageFile, message);

  try {
    execSync(`git -C "${upstreamPath}" commit -F "${messageFile}"`, { stdio: 'pipe' });
  } finally {
    fs.unlinkSync(messageFile);
  }

  const sha = execSync(`git -C "${upstreamPath}" rev-parse HEAD`).toString().trim();

  execSync(`git -C "${upstreamPath}" push ${UPSTREAM_REMOTE} ${UPSTREAM_BRANCH}`, { stdio: 'pipe' });

  console.log(`  → commit ${sha.slice(0, 8)} pushed pra ${UPSTREAM_REMOTE}/${UPSTREAM_BRANCH}`);
  return { sha, method: 'A_direct_push', status: 'merged' };
}

// ============================================================================
// Fase 6 — Track
// ============================================================================

function fase6Track(pitch, submissionResult, attributionOptIn, opts) {
  console.log('Fase 6: Track — registrando em .upstream-history.yaml...');

  // tracker.js opera no cwd; cwd está no consumidor (não no upstream)
  const items = pitch.items.map(i => ({
    source_path: i.source_path,
    upstream_path: i.upstream_path,
    category: i.category,
    bucket: i.bucket,
    license: i.license,
    sensibilidade: i.sensibilidade
  }));

  const submission = {
    method: submissionResult.method,
    branch: UPSTREAM_BRANCH,
    pr_url: null,
    commit_sha: submissionResult.sha,
    status: submissionResult.status,
    reviewer: 'davi-scholze',
    review_date: new Date().toISOString().split('T')[0],
    override_used: !!opts.overrideAntiPollution,
    override_razao: opts.razao || null
  };

  const attribution = {
    opt_in: attributionOptIn
  };

  // Init se necessário
  if (!fs.existsSync('.upstream-history.yaml')) {
    tracker.init({
      consumerName: process.env.CONSUMER_NAME || 'Davi Scholze',
      consumerEmail: process.env.CONSUMER_EMAIL || EXPECTED_GIT_EMAIL,
      consumerGithub: 'Davi-Scholze',
      brandWords: pitch.brandWords
    });
  }

  const contrib = tracker.add(items, submission, attribution);
  console.log(`  → contribuição ${contrib.id} registrada (status: ${submission.status})`);
  return contrib;
}

// ============================================================================
// Fase 7 — Cleanup (manual)
// ============================================================================

function fase7Cleanup(submissionResult) {
  console.log('Fase 7: Cleanup — manual após confirmação.');
  console.log(`  → Items merged em commit ${submissionResult.sha?.slice(0, 8)}.`);
  console.log(`  → Pra limpar quarentena: /faxina --purge mapeamento/ (quando confirmar tudo OK).`);
}

// ============================================================================
// Orquestrador
// ============================================================================

async function modeloA(opts) {
  const consumerCwd = process.cwd();
  try {
    // Fase 1
    const pitch = fase1Detect(opts);

    // Fase 2
    const validation = fase2Validar(pitch, opts);
    if (!validation.allPass) {
      throw new Error('Validação falhou e sem override.');
    }

    // Fase 3
    const upstreamPath = fase3PreparBranch(opts);
    opts.upstreamPath = upstreamPath; // pra audit_log

    // Fase 4
    fase4Format(pitch, upstreamPath, pitch.attributionOptIn);

    // Fase 5
    const submissionResult = fase5Submit(pitch, upstreamPath, pitch.attributionOptIn, opts);

    // Voltar pro consumidor pra Fase 6
    process.chdir(consumerCwd);

    // Fase 6
    const contrib = fase6Track(pitch, submissionResult, pitch.attributionOptIn, opts);

    // Fase 7
    fase7Cleanup(submissionResult);

    return {
      status: submissionResult.status,
      contributionId: contrib.id,
      commitSha: submissionResult.sha,
      upstreamUrl: submissionResult.sha
        ? `https://github.com/Davi-Scholze/kod-ai/commit/${submissionResult.sha}`
        : null,
      items: pitch.items.length
    };
  } catch (err) {
    process.chdir(consumerCwd);
    throw err;
  }
}

// ============================================================================
// CLI
// ============================================================================

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[key] = val;
    }
  }
  return args;
}

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2));
  const opts = {
    pitchPath: args['pitch-path'],
    upstreamPath: args['upstream-path'],
    dryRun: args['dry-run'] === true,
    attributionOptIn: args.attribution === 'true',
    overrideAntiPollution: args['override-anti-pollution'] === true,
    razao: args.razao
  };

  modeloA(opts)
    .then(result => {
      console.log('\n✓ /upstream-update Modelo A concluído:');
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.status === 'merged' || result.status === 'dry_run' ? 0 : 1);
    })
    .catch(err => {
      console.error('\nFAIL:', err.message);
      process.exit(2);
    });
}

module.exports = { modeloA, parsePitch };
