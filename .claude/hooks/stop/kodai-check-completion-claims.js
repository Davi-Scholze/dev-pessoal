#!/usr/bin/env node
/**
 * KOD.AI Hook — check-completion-claims
 *
 * Disparo:    Stop (fim de turno da IA)
 * Eixo:       Orchestration
 * Versão:     1.0
 * Atualizado: 2026-05-20
 *
 * Operacionaliza: regra-base 10 (honestidade em claims) + 12 (/complete).
 *
 * Bloqueia turno final da IA que contém claim de sucesso forte ("E2E
 * validado", "completo", "100% funcional", "tudo testado", "done") SEM
 * Evidence Bloc adjacente (timestamp + comando rodado + output literal +
 * critério de sucesso + resultado).
 *
 * Anti-padrão capturado:
 *   IA diz "E2E validado" após escrever código sem rodar teste.
 *   Sem Evidence, claim é vazio. Hook força evidência adjacente.
 *
 * Fail-safe: se hook quebrar, harness permite turno (logging só).
 *
 * Veja também:
 * - politicas/escuta-antes-de-agir.md
 * - regras-base.md (regras 10, 12)
 * - 1-ESQUELETO/skills-universais/verification-before-completion/SKILL.md
 */

'use strict';

const fs = require('fs');

// Stop hook input vem via stdin como JSON
let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const finalMessage = (input.lastAssistantMessage || input.message || '').toString();

    if (!finalMessage) {
      return ok();
    }

    // Palavras-claim que exigem Evidence Bloc adjacente
    const claimPatterns = [
      /\bE2E\b/i,
      /\bvalidad[oa]\b/i,
      /\bcompleto\b/i,
      /\bcompleta\b/i,
      /\b100%\s*funcional\b/i,
      /\btudo\s+testado\b/i,
      /\bdone\b/i,
      /\bfinalizad[oa]\b/i,
      /\btestes?\s+passar(am|aram|am todos)\b/i,
    ];

    const matchedClaims = claimPatterns
      .map(re => finalMessage.match(re))
      .filter(Boolean)
      .map(m => m[0]);

    if (matchedClaims.length === 0) {
      return ok();
    }

    // Sinais de Evidence Bloc adjacente
    const evidenceSignals = [
      /EVIDENCE[\s_-]*BLOC?/i,
      /timestamp:?\s*\d{4}-\d{2}-\d{2}/i,
      /comando:?\s*[`$]/i,
      /output observado:?/i,
      /critério de sucesso:?/i,
      /\bexit code:?\s*0\b/i,
      /\b(passou|✅\s*PASSOU)\b/i,
    ];

    const hasEvidence = evidenceSignals.some(re => re.test(finalMessage));

    if (hasEvidence) {
      return ok();
    }

    // Bloqueia
    const reason =
      `🛑 Hook check-completion-claims bloqueou o turno.\n\n` +
      `Você usou claim(s) de sucesso forte: ${matchedClaims.join(', ')}\n` +
      `**SEM** Evidence Bloc adjacente (timestamp + comando + output + critério).\n\n` +
      `Regra-base 10 (honestidade em claims) + Iron Law da skill ` +
      `verification-before-completion: sem evidência fresca, sem claim.\n\n` +
      `Ações possíveis:\n` +
      `1. Rodar o comando que prova o claim e citar output literal\n` +
      `2. Trocar palavra forte por "implementado" / "código escrito" (sem claim)\n` +
      `3. Marcar status real (DRAFT / FUNCIONAL / PARKED) em vez de "done"`;

    block(reason);
  } catch (err) {
    // Fail-safe: hook quebrou → permite turno + loga
    fs.appendFileSync('.claude/hooks-errors.log',
      `[${new Date().toISOString()}] check-completion-claims FAIL: ${err.message}\n`);
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
