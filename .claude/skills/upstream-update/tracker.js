#!/usr/bin/env node
/**
 * KOD.AI /upstream-update — Status tracker
 *
 * Versão:     1.0
 * Atualizado: 2026-05-21
 * Spec:       docs/decisoes/2026-05-20-upstream-update-mecanismo.md
 * Task:       docs/decisoes/tasks/2026-05-21_upstream-update/task-03-status-tracker.md
 *
 * CRUD de .upstream-history.yaml no clone-do-consumidor.
 * Schema documentado em status-tracker.md.
 *
 * Uso CLI:
 *   node tracker.js init [--consumer-name N --consumer-email E --consumer-github G]
 *   node tracker.js add --items-json <path> --submission-meta-json <path> [--attribution-json <path>]
 *   node tracker.js update --contribution-id <id> --new-status <status> [--reason <text>]
 *   node tracker.js status
 *   node tracker.js list
 *   node tracker.js stats
 *   node tracker.js search --status <pending|merged|approved|rejected|failed>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ============================================================================
// Constantes
// ============================================================================

const HISTORY_FILE = '.upstream-history.yaml';
const SCHEMA_VERSION = '1.0';
const VALID_STATUSES = new Set(['pending', 'approved', 'merged', 'rejected', 'failed']);
const VALID_METHODS = new Set(['A_direct_push', 'B_pr_fork', 'C_pr_fork_gated']);

// ============================================================================
// YAML minimal (sem dependência externa)
// ============================================================================

function yamlStringify(obj, indent = 0) {
  if (obj === null || obj === undefined) return 'null';
  if (typeof obj === 'boolean' || typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') {
    // quote se contém chars especiais
    if (/[:#@`*&!|>%]|^\s|\s$|\n/.test(obj)) {
      return JSON.stringify(obj);
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return '\n' + obj.map(item => {
      const pre = ' '.repeat(indent) + '- ';
      const val = yamlStringify(item, indent + 2);
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        return pre + val.trimStart();
      }
      return pre + val;
    }).join('\n');
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';
    return entries.map(([k, v]) => {
      const pre = ' '.repeat(indent) + k + ':';
      const val = yamlStringify(v, indent + 2);
      if (val.startsWith('\n')) return pre + val;
      return pre + ' ' + val;
    }).join('\n');
  }
  return String(obj);
}

function yamlParse(content) {
  // Parser muito simples — apenas o suficiente pra ler .upstream-history.yaml
  // Para schema complex, sugere usar js-yaml em produção. Aqui é zero-dep.
  // Como simplificação: assumimos que escreve via yamlStringify acima.
  // Leitura: estratégia naive line-by-line indent-based.
  const lines = content.split('\n');
  const root = {};
  const stack = [{ obj: root, indent: -1 }];

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();

    // pop stack até indent menor
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    const parent = stack[stack.length - 1].obj;

    // Item de array
    if (trimmed.startsWith('- ')) {
      const itemStr = trimmed.slice(2);
      if (!Array.isArray(parent.__lastValue)) {
        // converte parent[key] em array
      }
      // Caso 1: item simples
      if (!itemStr.includes(':')) {
        if (!Array.isArray(parent)) continue;
        parent.push(parseValue(itemStr));
        continue;
      }
      // Caso 2: item objeto (- key: value)
      const itemObj = {};
      const [k, ...vparts] = itemStr.split(':');
      const v = vparts.join(':').trim();
      itemObj[k.trim()] = v ? parseValue(v) : {};
      if (!Array.isArray(parent)) {
        // assume que ultima chave deveria ser array
      } else {
        parent.push(itemObj);
        stack.push({ obj: itemObj, indent });
      }
      continue;
    }

    // key: value | key:
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1).trim();

    if (!value) {
      // bloco nested (próximas linhas com mais indent)
      // peek próxima não-vazia
      const nextLine = lines[lines.indexOf(line) + 1] || '';
      const nextIsArray = nextLine.trim().startsWith('- ');
      parent[key] = nextIsArray ? [] : {};
      stack.push({ obj: parent[key], indent });
    } else {
      parent[key] = parseValue(value);
    }
  }
  return root;
}

function parseValue(s) {
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null' || s === '~') return null;
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
  if (s.startsWith('"') && s.endsWith('"')) {
    try { return JSON.parse(s); } catch { return s; }
  }
  return s;
}

// ============================================================================
// Read/Write
// ============================================================================

function read() {
  if (!fs.existsSync(HISTORY_FILE)) {
    return defaultHistory();
  }
  try {
    return yamlParse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
  } catch (err) {
    console.error(`Erro lendo ${HISTORY_FILE}: ${err.message}`);
    return defaultHistory();
  }
}

function write(history) {
  validateSchema(history);
  fs.writeFileSync(HISTORY_FILE, yamlStringify(history));
}

function defaultHistory() {
  return {
    schema_version: SCHEMA_VERSION,
    consumidor: {},
    contributions: [],
    stats: {
      total_contributions: 0,
      total_merged: 0,
      total_rejected: 0,
      total_pending: 0,
      total_failed: 0,
      cumulative_items_merged: 0
    }
  };
}

// ============================================================================
// Validação
// ============================================================================

function validateSchema(history) {
  if (!history.schema_version) throw new Error('schema_version ausente');
  if (!Array.isArray(history.contributions)) throw new Error('contributions deve ser array');

  const ids = new Set();
  for (const c of history.contributions) {
    if (!c.id) throw new Error('contribuição sem id');
    if (ids.has(c.id)) throw new Error(`id duplicado: ${c.id}`);
    ids.add(c.id);
    if (c.submission && !VALID_STATUSES.has(c.submission.status)) {
      throw new Error(`status inválido em ${c.id}: ${c.submission.status}`);
    }
  }
}

// ============================================================================
// Commands
// ============================================================================

function init(opts = {}) {
  if (fs.existsSync(HISTORY_FILE)) {
    console.log(`${HISTORY_FILE} já existe; mantendo.`);
    return read();
  }
  const history = defaultHistory();
  if (opts.consumerName) history.consumidor.nome = opts.consumerName;
  if (opts.consumerEmail) history.consumidor.email = opts.consumerEmail;
  if (opts.consumerGithub) history.consumidor.github = opts.consumerGithub;
  if (opts.brandWords) history.consumidor.brand_words = opts.brandWords;
  write(history);
  console.log(`${HISTORY_FILE} inicializado.`);

  // Adiciona ao .gitignore se ausente
  ensureGitignoreEntry();
  return history;
}

function ensureGitignoreEntry() {
  const giPath = '.gitignore';
  if (!fs.existsSync(giPath)) return;
  const content = fs.readFileSync(giPath, 'utf-8');
  if (content.includes(HISTORY_FILE)) return;
  fs.appendFileSync(giPath, `\n# === Adicionado por KOD.AI /upstream-update ===\n${HISTORY_FILE}\n`);
  console.log(`${HISTORY_FILE} adicionado ao .gitignore.`);
}

function add(items, submission, attribution = {}) {
  const history = read();
  const id = crypto.randomBytes(4).toString('hex');
  const now = new Date();

  if (!VALID_METHODS.has(submission.method)) {
    throw new Error(`method inválido: ${submission.method}`);
  }

  const contrib = {
    id,
    date: now.toISOString().split('T')[0],
    timestamp: now.toISOString(),
    item_count: items.length,
    items,
    submission: {
      ...submission,
      review_date: submission.review_date || now.toISOString().split('T')[0]
    },
    attribution: {
      opt_in: attribution.opt_in === true,
      visible_in_commit: attribution.opt_in === true,
      co_authored_by: attribution.opt_in === true && history.consumidor.nome
        ? `${history.consumidor.nome} <${history.consumidor.email}>`
        : null
    },
    audit: {
      operator: process.env.CLAUDE_MODEL || process.env.OPERATOR || 'unknown',
      timestamp_start: now.toISOString(),
      timestamp_end: null,
      override_used: submission.override_used === true,
      override_razao: submission.override_razao || null
    }
  };

  history.contributions.push(contrib);
  history.stats.total_contributions++;
  if (submission.status === 'merged') {
    history.stats.total_merged++;
    history.stats.cumulative_items_merged += items.length;
    history.stats.last_success_date = contrib.date;
  } else if (submission.status === 'pending') {
    history.stats.total_pending++;
  } else if (submission.status === 'rejected') {
    history.stats.total_rejected++;
    history.last_failure = { contribution_id: id, date: contrib.date, reason: submission.reason };
    history.stats.last_failure_date = contrib.date;
  } else if (submission.status === 'failed') {
    history.stats.total_failed++;
  }
  write(history);
  return contrib;
}

function update(contribId, newStatus, reason = null) {
  if (!VALID_STATUSES.has(newStatus)) {
    throw new Error(`status inválido: ${newStatus}`);
  }
  const history = read();
  const c = history.contributions.find(x => x.id === contribId);
  if (!c) {
    console.error(`Contribuição ${contribId} não encontrada`);
    process.exit(2);
  }
  const oldStatus = c.submission.status;
  c.submission.status = newStatus;
  c.submission.review_date = new Date().toISOString().split('T')[0];
  if (reason) c.submission.reason = reason;
  c.audit.timestamp_end = new Date().toISOString();

  // Re-calcula stats (simples — decrementa old, incrementa new)
  const key = (s) => `total_${s}`;
  if (history.stats[key(oldStatus)] > 0) history.stats[key(oldStatus)]--;
  history.stats[key(newStatus)] = (history.stats[key(newStatus)] || 0) + 1;

  if (newStatus === 'merged') {
    history.stats.cumulative_items_merged += c.items.length;
    history.stats.last_success_date = c.submission.review_date;
  } else if (newStatus === 'rejected') {
    history.last_failure = { contribution_id: contribId, date: c.submission.review_date, reason };
    history.stats.last_failure_date = c.submission.review_date;
  }

  write(history);
  return c;
}

function status() {
  const history = read();
  return {
    pending: history.stats.total_pending || 0,
    merged: history.stats.total_merged || 0,
    rejected: history.stats.total_rejected || 0,
    failed: history.stats.total_failed || 0,
    total: history.stats.total_contributions,
    last_success: history.stats.last_success_date,
    last_failure: history.last_failure
  };
}

function list() {
  return read();
}

function stats() {
  return read().stats;
}

function search(filterStatus) {
  const history = read();
  return history.contributions.filter(c => c.submission.status === filterStatus);
}

// ============================================================================
// CLI
// ============================================================================

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[key] = val;
    } else {
      args._.push(argv[i]);
    }
  }
  return args;
}

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];

  try {
    switch (cmd) {
      case 'init': {
        init({
          consumerName: args['consumer-name'],
          consumerEmail: args['consumer-email'],
          consumerGithub: args['consumer-github'],
          brandWords: args['brand-words'] ? args['brand-words'].split(',') : null
        });
        break;
      }
      case 'add': {
        const items = JSON.parse(fs.readFileSync(args['items-json']));
        const submission = JSON.parse(fs.readFileSync(args['submission-meta-json']));
        const attribution = args['attribution-json']
          ? JSON.parse(fs.readFileSync(args['attribution-json']))
          : {};
        const contrib = add(items, submission, attribution);
        console.log(JSON.stringify(contrib, null, 2));
        break;
      }
      case 'update': {
        const c = update(args['contribution-id'], args['new-status'], args.reason);
        console.log(JSON.stringify(c, null, 2));
        break;
      }
      case 'status':
        console.log(JSON.stringify(status(), null, 2));
        break;
      case 'list':
        console.log(JSON.stringify(list(), null, 2));
        break;
      case 'stats':
        console.log(JSON.stringify(stats(), null, 2));
        break;
      case 'search':
        console.log(JSON.stringify(search(args.status), null, 2));
        break;
      default:
        console.error('Uso: node tracker.js [init|add|update|status|list|stats|search]');
        process.exit(1);
    }
  } catch (err) {
    console.error('ERRO:', err.message);
    process.exit(1);
  }
}

module.exports = { init, add, update, status, list, stats, search, read, write };
