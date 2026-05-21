#!/usr/bin/env node
/**
 * KOD.AI Hook — inject-warning
 *
 * Disparo:    UserPromptSubmit
 * Eixo:       Orchestration
 * Versão:     1.0
 * Atualizado: 2026-05-20
 *
 * Operacionaliza:
 * - politicas/alerta-cobrancas-recorrentes.md
 * - politicas/verificar-infra-real.md
 * - politicas/aprovacao-schema-banco.md
 * - politicas/escuta-antes-de-agir.md
 *
 * Detecta palavras-chave no prompt do usuário e INJETA lembrete
 * contextual no contexto da IA antes dela processar o turno. NÃO bloqueia
 * — apenas garante que a política relevante esteja "carregada" pela IA
 * no momento certo (combate sub-trigger).
 *
 * Categorias detectadas:
 *   - Cobrança / billing: trial, renovação, upgrade, billing, auto-recharge
 *   - Infra externa: DNS, SMTP, domínio, deploy, secret, credencial, SSL
 *   - Schema de banco: ALTER TABLE, DROP, migration, schema
 *   - Ação custosa: subagent, paralelizar, deploy, backup, restore
 *
 * Fail-safe: se hook quebrar, harness segue sem injeção (logging).
 *
 * Veja também:
 * - politicas/engenharia-de-contexto.md (princípio "menor conjunto de
 *   tokens de alto sinal" — hook reforça política certa no momento certo)
 */

'use strict';

const fs = require('fs');

let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const userPrompt = (input.userPrompt || input.prompt || input.message || '').toString();

    if (!userPrompt) {
      return ok();
    }

    const detections = [];

    const categories = [
      {
        name: 'cobranças e billing',
        re: /\b(trial|renova(c|ç)(a|ã)o|upgrade|billing|auto[\s_-]?recharge|cobran(c|ç)a|recorrente|assinatura)\b/i,
        warning:
          `⚠️ Política **alerta-cobrancas-recorrentes**: antes de orientar serviço pago, ` +
          `entregue os 4 dados obrigatórios no FIM da resposta: Status (trial/pago) / Quando vira ` +
          `pago / Quanto custa / Renovação automática ON-OFF. Nunca chute preço — busque via ` +
          `API/MCP OU peça print do painel.`
      },
      {
        name: 'infra externa',
        re: /\b(DNS|SMTP|dom(i|í)nio|deploy|secret|credencial|SSL|MX record|nslookup|certificate)\b/i,
        warning:
          `⚠️ Política **verificar-infra-real**: antes de planejar passos que dependem de ` +
          `infraestrutura externa, RODE comando de verificação (nslookup / curl -I / gh repo view / ` +
          `vercel ls / supabase projects list) e cole o output ANTES do plano. Strings em memória ` +
          `não provam existência de domínio/conta/serviço.`
      },
      {
        name: 'schema de banco',
        re: /\b(ALTER TABLE|DROP TABLE|DROP SCHEMA|migration|schema|RLS|row level security|policy SQL)\b/i,
        warning:
          `⚠️ Política **aprovacao-schema-banco**: nunca CREATE/ALTER/DROP tabela/coluna/índice/RLS/` +
          `constraint/função sem OK explícito do decisor em texto. Pausar pra perguntar custa minutos. ` +
          `Retrabalho de schema custa dias. Combine com hook pre-commit-guard que bloqueia DDL no Bash.`
      },
      {
        name: 'ação custosa',
        re: /\b(subagent|paralelizar|paraleliz|backup|restore|destrutiv|wipe|reset)\b/i,
        warning:
          `⚠️ Política **explicar-acao-custosa**: antes de despachar subagent, deploy, paralelizar 3+ ` +
          `agentes, backup/restore, ou script destrutivo — ANUNCIE 4 dados (O QUE / QUANTO TEMPO / ` +
          `RISCO / REVERSÃO) e PARE de emitir até receber OK explícito.`
      },
      {
        name: 'modo exploratório',
        re: /\b(ser(a|á) que|acha que|o que vc acha|faz sentido|pensar junto|imagina|hedge)\b/i,
        warning:
          `⚠️ Política **escuta-antes-de-agir**: linguagem hedging detectada. Default em ambiguidade ` +
          `= EXPLORATÓRIO (responder em prosa com hipóteses, NÃO tocar arquivo). Se realmente é ` +
          `executivo, peça confirmação clara antes de agir.`
      },
    ];

    for (const cat of categories) {
      if (cat.re.test(userPrompt)) {
        detections.push(cat);
      }
    }

    if (detections.length === 0) {
      return ok();
    }

    const additionalContext =
      `# KOD.AI — Lembrete de políticas (hook inject-warning)\n\n` +
      `Detectei palavras-chave em ${detections.length} categoria(s) no prompt do usuário. ` +
      `Carregue mentalmente as políticas abaixo antes de responder:\n\n` +
      detections.map(d => `- **${d.name}** — ${d.warning}`).join('\n\n');

    process.stdout.write(JSON.stringify({
      continue: true,
      additionalContext
    }));
    process.exit(0);
  } catch (err) {
    fs.appendFileSync('.claude/hooks-errors.log',
      `[${new Date().toISOString()}] inject-warning FAIL: ${err.message}\n`);
    ok();
  }
});

function ok() {
  process.stdout.write(JSON.stringify({ continue: true }));
  process.exit(0);
}
