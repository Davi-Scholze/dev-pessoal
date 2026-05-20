#!/usr/bin/env node
/**
 * KOD.AI /upstream-update — Modelo B (PR via fork — trusted contributors)
 *
 * Versão:     0.1.0-stub
 * Status:     STUB (futuro v0.7+)
 * Atualizado: 2026-05-21
 * Spec:       docs/decisoes/2026-05-20-upstream-update-mecanismo.md
 * Task:       docs/decisoes/tasks/2026-05-21_upstream-update/task-06-modelo-B-pr-fork-trusted.md
 *
 * Implementar quando aparecerem ≥2 consumidores reais querendo contribuir
 * (Decisão D5 da spec).
 *
 * Workflow planejado:
 *   1. Verificar consumidor está em upstream-contributors.yaml (trust check)
 *   2. Anti-pollution local (mesmo de Modelo A)
 *   3. gh repo fork Davi-Scholze/kod-ai (na conta do consumidor)
 *   4. Aplicar items no clone do fork
 *   5. git push <fork-remote> upstream-<data>-<hash>
 *   6. gh pr create --base main --head upstream-... --title "..." --body <PR-template>
 *   7. Trust level "high" pode pular review humano se 7 checks PASS
 *   8. Track em .upstream-history.yaml com method: B_pr_fork
 *
 * Status atual: stub que retorna mensagem clara.
 */

'use strict';

function modeloB(opts) {
  console.error('🚧 Modelo B (PR via fork — trusted contributors) ainda NÃO implementado.');
  console.error('');
  console.error('Critérios pra ativar (Decisão D5 da spec):');
  console.error('  - ≥2 consumidores reais com 6+ meses de uso documentado');
  console.error('  - Modelo A battle-tested em dogfooding Davi (KOD.AI v0.6.0 release)');
  console.error('');
  console.error('Pra propor entrada como trusted contributor:');
  console.error('  Abrir issue em github.com/Davi-Scholze/kod-ai/issues com label');
  console.error('  "candidate-trusted-contributor" + projeto consumidor + 1-2 exemplos');
  console.error('  de material universal pronto pra upstream.');
  console.error('');
  console.error('Implementação técnica esperada:');
  console.error('  - Veja docs/decisoes/tasks/2026-05-21_upstream-update/task-06-modelo-B-pr-fork-trusted.md');
  console.error('  - gh CLI + workflow GitHub Action no fork');
  console.error('  - upstream-contributors.yaml (estado atual: vazio)');

  return { status: 'not_implemented', razao: 'Modelo B — aguardando D5 critério' };
}

if (require.main === module) {
  const result = modeloB({});
  process.exit(2);  // não-implementado = fail
}

module.exports = { modeloB };
