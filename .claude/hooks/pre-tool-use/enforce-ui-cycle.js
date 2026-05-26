#!/usr/bin/env node
/**
 * KOD.AI Hook — enforce-ui-cycle (PreToolUse)
 *
 * Matcher: Edit|Write|MultiEdit
 * Eixo:    Orchestration (gate de qualidade visual)
 * Versão:  1.0
 * Criado:  2026-05-25 após postmortem UI-cycle violation Sprint 1a dojo
 *
 * Bloqueia mecanicamente Edit/Write/MultiEdit em arquivos visuais (.tsx,
 * .jsx, .vue, .svelte, componentes em components/, páginas em app/) quando
 * IA NÃO reconheceu explicitamente o ciclo UI canônico KOD.AI.
 *
 * Operacionaliza a regra `.claude/rules/ui-cycle-trigger.md`:
 *   100% das mudanças UI têm screenshot antes/depois + 3 viewports +
 *   invocação de design skills (frontend-designer, tailwind-shadcn-scaffold,
 *   responsive-mobile-first, dev-browser, ver, design-reviewer).
 *
 * Como IA bypassa LEGITIMAMENTE (depois de invocar design skills):
 *   1. Invocar uma skill/agent de design (frontend-designer, etc)
 *   2. Write em `.claude/.ui-cycle-acknowledged` (timestamp atual)
 *      → marca compromisso explícito de aplicar o ciclo
 *   3. Marker expira em 10min — pra cada nova sessão de UI, novo ack
 *
 * Fail-safe: se hook quebrar, exit 0 (não bloqueia harness — log silencioso).
 *
 * Relacionado:
 *   - .claude/rules/ui-cycle-trigger.md (regra path-scoped)
 *   - feedback_invocar_skills_design_obrigatorio.md (memória crítica)
 *   - _negocio/POSTMORTEM-2026-05-25-ui-cycle-violation.md
 */

'use strict';

const fs = require('fs');
const path = require('path');

const MARKER_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE || process.cwd(),
  'Documents',
  'Projetos Dev Pessoais',
  '.claude',
  '.ui-cycle-acknowledged'
);

// Janela de validade do reconhecimento (10 min) — força reauth em sessões longas
const ACK_VALIDITY_MS = 10 * 60 * 1000;

// Patterns de arquivo UI — bate em qualquer um, dispara o gate
const UI_PATTERNS = [
  /\.(tsx|jsx|vue|svelte)$/i,
  /[\\/]components[\\/].*\.(ts|js)$/i,
  /[\\/]app[\\/].*\.(tsx|jsx)$/i,
  /[\\/]pages[\\/].*\.(tsx|jsx)$/i,
];

// Patterns que EXCLUEM o gate (config, types gerados, etc — não são UI visual)
const EXCLUDE_PATTERNS = [
  /next-env\.d\.ts$/,
  /tsconfig.*\.json$/,
  /\.config\.(ts|js|mjs|cjs)$/i,
  /[\\/]middleware\.(ts|js)$/i, // middleware Next.js não é UI
  /[\\/]actions\.(ts|js)$/i, // Server Actions não são UI
  /[\\/]route\.(ts|js)$/i, // Route handlers não são UI
  /\.test\.(tsx|jsx)$/i, // testes
  /\.spec\.(tsx|jsx)$/i,
  /\.stories\.(tsx|jsx)$/i, // Storybook
  /[\\/]types?[\\/]/, // arquivos de types
  /[\\/]lib[\\/]i18n[\\/]/, // i18n config
];

function isUIFile(filePath) {
  if (!filePath) return false;
  const normalized = filePath.replace(/\\/g, '/');

  // Excluído tem prioridade
  for (const pattern of EXCLUDE_PATTERNS) {
    if (pattern.test(normalized)) return false;
  }

  // Match UI
  for (const pattern of UI_PATTERNS) {
    if (pattern.test(normalized)) return true;
  }

  return false;
}

function isAckRecent() {
  try {
    const stat = fs.statSync(MARKER_PATH);
    const ageMs = Date.now() - stat.mtimeMs;
    return ageMs < ACK_VALIDITY_MS;
  } catch (_) {
    return false; // marker não existe = não reconheceu
  }
}

function emitBlock(filePath) {
  // stderr aparece pro Claude. Mensagem detalhada com instruções de bypass legítimo.
  const msg = `
╔══════════════════════════════════════════════════════════════════════╗
║  🛑 KOD.AI ENFORCE-UI-CYCLE — Edit/Write BLOQUEADO                   ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  Arquivo: ${filePath}
║                                                                      ║
║  Este arquivo é VISUAL (.tsx/.jsx/component/page).                   ║
║  A regra .claude/rules/ui-cycle-trigger.md exige antes de edit:      ║
║                                                                      ║
║    1. Invocar AGENT 'frontend-designer'   (gera componente com       ║
║       design tokens + identidade visual do cliente)                  ║
║       OU                                                             ║
║       Invocar SKILL 'tailwind-shadcn-scaffold' (scaffold com shadcn) ║
║                                                                      ║
║    2. Se arquivo já existe: invocar SKILL 'ver' OU 'dev-browser'     ║
║       pra screenshot ANTES via Playwright MCP                        ║
║                                                                      ║
║    3. Implementar baseado no mockup do agent                         ║
║                                                                      ║
║    4. Validar via 'dev-browser' em 3 viewports (1920/768/390)        ║
║                                                                      ║
║    5. Antes de declarar done: AGENT 'design-reviewer' audita         ║
║       (Awwwards/Mobbin + axe-core)                                   ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  COMO BYPASSAR LEGITIMAMENTE (após cumprir o ciclo):                 ║
║                                                                      ║
║   Write em arquivo:                                                  ║
║     C:/Users/usuario/Documents/Projetos Dev Pessoais/                ║
║     .claude/.ui-cycle-acknowledged                                   ║
║                                                                      ║
║   Conteúdo sugerido (1 linha):                                       ║
║     "ack <data-iso> — invoquei <skill/agent> pra <arquivo>"          ║
║                                                                      ║
║   Marker expira em 10 minutos. Próxima sessão de UI exige novo ack.  ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  Memória crítica: feedback_invocar_skills_design_obrigatorio.md      ║
║  Postmortem:      _negocio/POSTMORTEM-2026-05-25-ui-cycle-violation  ║
║  Regra:           .claude/rules/ui-cycle-trigger.md                  ║
╚══════════════════════════════════════════════════════════════════════╝
`.trim();

  process.stderr.write(msg + '\n');
  process.exit(2); // 2 = bloqueia tool no harness Claude Code
}

function main() {
  let raw = '';
  process.stdin.on('data', (chunk) => {
    raw += chunk;
  });
  process.stdin.on('end', () => {
    try {
      if (!raw.trim()) return process.exit(0);

      const input = JSON.parse(raw);
      const toolName = input.tool_name || '';
      const toolInput = input.tool_input || {};

      // Só atua em Edit/Write/MultiEdit
      if (!['Edit', 'Write', 'MultiEdit'].includes(toolName)) {
        return process.exit(0);
      }

      const filePath = toolInput.file_path || '';

      // Não é UI? libera.
      if (!isUIFile(filePath)) {
        return process.exit(0);
      }

      // É UI mas IA reconheceu o ciclo recentemente? libera.
      if (isAckRecent()) {
        return process.exit(0);
      }

      // É UI e sem ack → bloqueia.
      emitBlock(filePath);
    } catch (err) {
      // fail-safe: se hook quebrar, NÃO bloqueia harness
      process.stderr.write(`[enforce-ui-cycle] erro interno (fail-open): ${err.message}\n`);
      process.exit(0);
    }
  });
}

main();
