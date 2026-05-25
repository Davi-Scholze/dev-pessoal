/**
 * auto-log-rotation.js
 *
 * Hook PostToolUse — rotação automática de logs append-only KOD.AI.
 *
 * Pipeline:
 *   1. Fastpath (<5ms): stat de paths conhecidos em logs/
 *   2. Se algum > threshold → rotate atômico pra logs/archive/<nome>-<data-hora>.<ext>
 *   3. Diariamente (gated por logs/.last-rotation-check): comprime >30d, quarentena >180d
 *
 * NÃO bloqueia tool use por erro de rotação — graceful degradation (stderr only).
 *
 * Política: politicas/log-rotation.md
 * Skills relacionadas: faxina (destino quarentena), kodai-status (reporta tamanho logs/)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const DEFAULTS = {
  threshold_mb: 1,
  archive_dir: 'logs/archive',
  compress_after_days: 30,
  quarantine_after_days: 180,
};

// Paths candidatos a rotação (padrão; pode ser estendido por .kodai-log-rotation.json)
const DEFAULT_GLOB_PATTERNS = [
  'logs/*.ndjson',
  'logs/*.log',
  'logs/*.jsonl',
];

// Paths SAGRADOS — nunca tocar
const SACRED_PATHS = [
  '_negocio/contextos/bruto',
  'inbox-',
  '.faxina-quarentena',
  '.git',
  'node_modules',
];

const MARKER_FILE = 'logs/.last-rotation-check';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function readConfig(cwd) {
  const configPath = path.join(cwd, '.kodai-log-rotation.json');
  if (!fs.existsSync(configPath)) return DEFAULTS;
  try {
    const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return { ...DEFAULTS, ...userConfig };
  } catch (e) {
    process.stderr.write(`[auto-log-rotation] config inválido em ${configPath}: ${e.message}\n`);
    return DEFAULTS;
  }
}

function isSacred(filePath) {
  return SACRED_PATHS.some(s => filePath.includes(s));
}

function listLogs(cwd) {
  const logsDir = path.join(cwd, 'logs');
  if (!fs.existsSync(logsDir)) return [];
  const results = [];
  try {
    const entries = fs.readdirSync(logsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && /\.(ndjson|log|jsonl)$/.test(entry.name)) {
        results.push(path.join(logsDir, entry.name));
      }
    }
  } catch (e) {
    process.stderr.write(`[auto-log-rotation] erro ao listar logs/: ${e.message}\n`);
  }
  return results;
}

function tsName() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function logEvent(filePath, event) {
  try {
    const line = JSON.stringify({ ts: new Date().toISOString(), ...event }) + '\n';
    fs.appendFileSync(filePath, line);
  } catch (e) {
    process.stderr.write(`[auto-log-rotation] erro ao logar evento: ${e.message}\n`);
  }
}

function rotateFile(filePath, archiveDir, cwd) {
  try {
    if (isSacred(filePath)) return;
    const stat = fs.statSync(filePath);
    if (stat.size === 0) return;

    const absArchiveDir = path.join(cwd, archiveDir);
    fs.mkdirSync(absArchiveDir, { recursive: true });

    const base = path.basename(filePath);
    const ext = path.extname(base);
    const stem = path.basename(base, ext);
    const archivePath = path.join(absArchiveDir, `${stem}-${tsName()}${ext}`);

    // Log o evento de rotação no próprio arquivo ANTES de mover (auditoria)
    logEvent(filePath, {
      event: 'log_rotation',
      from: path.relative(cwd, filePath),
      to: path.relative(cwd, archivePath),
      size_bytes: stat.size,
    });

    fs.renameSync(filePath, archivePath);
    // Recriar arquivo vazio pra próximos eventos não falharem
    fs.writeFileSync(filePath, '');
  } catch (e) {
    process.stderr.write(`[auto-log-rotation] falha rotacionando ${filePath}: ${e.message}\n`);
  }
}

function compressOld(archiveDir, compressAfterDays, cwd) {
  const absArchiveDir = path.join(cwd, archiveDir);
  if (!fs.existsSync(absArchiveDir)) return;
  const cutoff = Date.now() - compressAfterDays * ONE_DAY_MS;
  try {
    const entries = fs.readdirSync(absArchiveDir);
    for (const name of entries) {
      if (name.endsWith('.gz')) continue;
      const full = path.join(absArchiveDir, name);
      try {
        const stat = fs.statSync(full);
        if (stat.mtimeMs < cutoff) {
          const buf = fs.readFileSync(full);
          const gz = zlib.gzipSync(buf);
          fs.writeFileSync(full + '.gz', gz);
          fs.unlinkSync(full);
        }
      } catch (e) {
        process.stderr.write(`[auto-log-rotation] falha comprimindo ${full}: ${e.message}\n`);
      }
    }
  } catch (e) {
    process.stderr.write(`[auto-log-rotation] falha listando archives: ${e.message}\n`);
  }
}

function quarantineAncient(archiveDir, quarantineAfterDays, cwd) {
  const absArchiveDir = path.join(cwd, archiveDir);
  if (!fs.existsSync(absArchiveDir)) return;
  const cutoff = Date.now() - quarantineAfterDays * ONE_DAY_MS;
  const today = new Date().toISOString().slice(0, 10);
  const quarDir = path.join(cwd, '.faxina-quarentena', 'logs-archive', today);
  try {
    const entries = fs.readdirSync(absArchiveDir);
    for (const name of entries) {
      const full = path.join(absArchiveDir, name);
      try {
        const stat = fs.statSync(full);
        if (stat.mtimeMs < cutoff) {
          fs.mkdirSync(quarDir, { recursive: true });
          fs.renameSync(full, path.join(quarDir, name));
        }
      } catch (e) {
        process.stderr.write(`[auto-log-rotation] falha quarentenando ${full}: ${e.message}\n`);
      }
    }
  } catch (e) {
    process.stderr.write(`[auto-log-rotation] falha listando archives: ${e.message}\n`);
  }
}

function shouldRunDailyCheck(cwd) {
  const markerPath = path.join(cwd, MARKER_FILE);
  if (!fs.existsSync(markerPath)) return true;
  try {
    const stat = fs.statSync(markerPath);
    return Date.now() - stat.mtimeMs > ONE_DAY_MS;
  } catch (e) {
    return true;
  }
}

function touchMarker(cwd) {
  const markerPath = path.join(cwd, MARKER_FILE);
  try {
    fs.mkdirSync(path.dirname(markerPath), { recursive: true });
    fs.writeFileSync(markerPath, new Date().toISOString());
  } catch (e) {
    process.stderr.write(`[auto-log-rotation] falha atualizando marker: ${e.message}\n`);
  }
}

function main() {
  const cwd = process.cwd();
  const config = readConfig(cwd);
  const thresholdBytes = config.threshold_mb * 1024 * 1024;

  // Fastpath: rotacionar logs que passaram threshold
  const candidates = listLogs(cwd);
  for (const filePath of candidates) {
    try {
      const stat = fs.statSync(filePath);
      if (stat.size > thresholdBytes) {
        rotateFile(filePath, config.archive_dir, cwd);
      }
    } catch (e) {
      // ignore (race ou permission)
    }
  }

  // Daily housekeeping (gated)
  if (shouldRunDailyCheck(cwd)) {
    compressOld(config.archive_dir, config.compress_after_days, cwd);
    quarantineAncient(config.archive_dir, config.quarantine_after_days, cwd);
    touchMarker(cwd);
  }

  // Consume stdin silently (PostToolUse payload — não precisamos dele)
  if (!process.stdin.isTTY) {
    process.stdin.resume();
    process.stdin.on('data', () => {});
    process.stdin.on('end', () => process.exit(0));
    setTimeout(() => process.exit(0), 100);
  } else {
    process.exit(0);
  }
}

main();
