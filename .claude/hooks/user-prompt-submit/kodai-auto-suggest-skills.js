#!/usr/bin/env node
/**
 * KOD.AI Hook — auto-suggest-skills
 *
 * Disparo:    UserPromptSubmit
 * Eixo:       Orchestration
 * Versão:     1.0
 * Atualizado: 2026-05-23
 *
 * Operacionaliza o princípio fundacional KOD.AI 2Co 12:9-10:
 * "humano não precisa lembrar de invocar skills — sistema lembra por ele".
 *
 * Detecta padrões de intenção no prompt do usuário e SUGERE skills
 * relevantes via additionalContext. NÃO bloqueia, NÃO força execução —
 * apenas torna disponível ao Claude a lista de skills KOD.AI aplicáveis
 * pra o turno atual.
 *
 * Anti-padrão evitado:
 *   Skill nova fica "instalada mas esquecida" porque humano nunca
 *   lembra de digitar /spec ou /complete. Sistema observa o prompt e
 *   injeta lembrete contextual.
 *
 * Fail-safe: se hook quebrar, harness segue sem injeção (logging).
 *
 * Veja também:
 * - 1-ESQUELETO/hooks/inject-warning.js (hook irmão — sugere POLÍTICAS)
 * - 1-ESQUELETO/skills-universais/*\/SKILL.md (catálogo das skills sugeridas)
 * - politicas/auto-instrucao-pipeline.md
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

    const suggestions = [];

    // Mapa intenção → skill sugerida (KOD.AI universais)
    const patterns = [
      // Pipeline canônico /spec → /complete
      { re: /\b(spec|especifica|especificar|requirements|abrir feature|nova feature|design feature)\b/i,
        skill: '/spec', motivo: 'criar especificação formal antes de codar (regra-base 3 inviolável)' },
      { re: /\b(quebrar|decompor|break down|subtask|fatiar)\b/i,
        skill: '/break', motivo: 'decompor spec em tasks atômicas' },
      { re: /\b(planejar|plano de execu|implementation plan)\b/i,
        skill: '/plan', motivo: 'plano executável passo-a-passo' },
      { re: /\b(executar plano|execute plan|implementar a spec)\b/i,
        skill: '/execute', motivo: 'implementar com commits granulares' },
      { re: /\b(revis(a|ar) c[oó]digo|code review|review do que fiz)\b/i,
        skill: '/review', motivo: 'revisão estruturada antes de declarar pronto' },
      { re: /\b(done|completo|fechad[oa]|pronto|finaliz|terminei|acabei|deploy pronto)\b/i,
        skill: '/complete', motivo: 'Evidence Bloc obrigatório antes de declarar (regra-base 11+12)' },

      // Brainstorming + decisão
      { re: /\b(brainstorm|explorar op[cç][oõ]es|o que voc[eê] acha|faz sentido|hedge|imagina)\b/i,
        skill: '/brainstorming', motivo: 'explorar intenção antes de comprometer com spec' },
      { re: /\b(decis(a|ã)o arquitetural|escolher entre|trade.?off|qual o melhor caminho)\b/i,
        skill: '/spec', motivo: 'decisão arquitetural merece spec com alternativas documentadas' },

      // Captura / contexto / referencial
      { re: /\b(capturar contexto|stakeholder|cliente.*disse|reuni(a|ã)o|audio)\b/i,
        skill: '/capturar OU /capturar-contexto-cliente', motivo: 'salvar contexto stakeholder na hora (regra-base 1)' },
      { re: /\b(absorver|absorvi|youtube|instagram|tiktok|video|midia)\b/i,
        skill: '/absorver-midia', motivo: 'destilar mídia externa em inbox sintetizado' },
      { re: /\b(notebook|notebooklm|fonte ancorada|pesquisa em not)\b/i,
        skill: '/notebooklm', motivo: 'consultar notebooks com citações' },
      { re: /\b(transcrever|audio|opus|ogg|whisper)\b/i,
        skill: '/transcribe-audio', motivo: 'transcrição offline via faster-whisper' },

      // Auditoria / status
      { re: /\b(audit|auditar|inventariar|mapear o que tem|gap analysis)\b/i,
        skill: '/auditar-projeto OU /kodai-status', motivo: 'inventário factual em 4 quadrantes' },
      { re: /\b(estado.*kodai|kodai status|kodai instalado|onda)\b/i,
        skill: '/kodai-status', motivo: 'reporte de versão + onda + skills+rules+hooks contagem' },

      // Reversibilidade / cuidado
      { re: /\b(rollback|reverter|desfazer|undo kodai|me arrependi)\b/i,
        skill: '/kodai-rollback', motivo: 'desfaz KOD.AI lendo KODAI-INSTALADO.md (--dry-run default)' },
      { re: /\b(faxina|limpeza|limpar tmp|poluiu|polui|md órf)\b/i,
        skill: '/faxina', motivo: 'limpeza com --dry-run safe + --apply após OK' },
      { re: /\b(reorganizar|organizar estrutura|arrumar pasta|estrutura cao)\b/i,
        skill: '/organizar', motivo: 'reorganização explícita (NUNCA automática)' },

      // UI / Frontend
      { re: /\b(componente|tsx|jsx|css|tailwind|responsiv|mobile|breakpoint)\b/i,
        skill: '/ver + /dev-browser', motivo: 'ciclo UI obrigatório (ver→analisar→propor→testar→reportar)' },
      { re: /\b(carrossel|instagram post|social media|criar criativo)\b/i,
        skill: '/aprovar-post-meta-api OU /excalidraw-diagram', motivo: 'peça visual com identidade da marca aplicada' },

      // Testes / TDD
      { re: /\b(teste|test|tdd|spec test|unit|e2e|playwright|jest|vitest)\b/i,
        skill: '/test-driven-development + /verification-before-completion', motivo: 'red→green→refactor + Iron Law' },
      { re: /\b(qa|quality|verifica|validar|evidence)\b/i,
        skill: '/qa-verifier OU /verification-before-completion', motivo: 'adversarial verification + Evidence Bloc' },

      // Git / branch
      { re: /\b(commit|git|push|branch|worktree|merge)\b/i,
        skill: '/salvar OU /using-git-worktrees', motivo: 'commit padronizado / branch isolada' },
      { re: /\b(fechar branch|merge branch|finalizar branch)\b/i,
        skill: '/finishing-a-development-branch', motivo: 'merge/PR/cleanup estruturado' },

      // Multi-agente / paralelismo
      { re: /\b(paralelizar|paralelo|sub.?agent|despachar agente)\b/i,
        skill: '/dispatching-parallel-agents OU /subagent-driven-development', motivo: 'tasks independentes em paralelo' },

      // Debugging
      { re: /\b(bug|debug|error|crash|n[aã]o funciona|quebrou|exception|stack trace)\b/i,
        skill: '/systematic-debugging', motivo: 'investigar root cause antes de propor fix' },

      // KOD.AI gerenciamento
      { re: /\b(atualizar kodai|update kodai|pull kodai|nova vers[aã]o kodai)\b/i,
        skill: '/atualizar-kodai', motivo: 'pull do upstream + re-propagar skills com diff' },
      { re: /\b(novo pack|pack novo|criar pack)\b/i,
        skill: '/criar-pack OU /adicionar-pack', motivo: 'novo pack KOD.AI estruturado' },
      { re: /\b(perfil novo|trocar perfil|outro perfil)\b/i,
        skill: '/criar-perfil OU /trocar-perfil', motivo: 'perfis catalogados em 0-INSTALACAO/perfis/' },
      { re: /\b(upstream|contribuir kodai|pr kodai|davi-scholze)\b/i,
        skill: '/upstream-update', motivo: 'PR pro Davi-Scholze/kod-ai (anti-pollution check obrigatório)' },

      // Status decisão (acompanhamento)
      { re: /\b(status.*decis|onde est[aá] essa decis|atualizar status|decis(a|ã)o pendente)\b/i,
        skill: '/status-decisao', motivo: 'atualizar status de decisão em docs/decisoes/' },

      // LGPD / Compliance (skills novas D12 — 2026-05-26)
      { re: /\b(lgpd|ripd|art\.?\s*37|tratamento.*dados|dpo|encarregado|registro.*opera)\b/i,
        skill: '/lgpd-ripd', motivo: 'gerar RIPD adaptado ao stack — Art. 37 LGPD (skill criada D12)' },
      { re: /\b(dsr|art\.?\s*18|direito.*titular|deletar.*dados|exportar.*dados|portabilidade.*dados|consentimento.*revog)\b/i,
        skill: '/lgpd-dsr-endpoint', motivo: 'gerar endpoint /api/lgpd/dsr — Art. 18 LGPD (skill criada D12)' },
      { re: /\b(menor|crian[cç]a|aluno|art\.?\s*14|dados.*saude|alergia|biometria)\b/i,
        skill: '/lgpd-ripd + agent lgpd-auditor', motivo: 'regime especial Art. 14 (menor) + Art. 11 (sensível) — RIPD + audit obrigatório' },
      { re: /\b(honeypot|disclaimer|cookie banner|consentimento form|checkbox lgpd)\b/i,
        skill: 'pack seguranca/lgpd-by-design/recipes', motivo: 'recipe pronto pra form público LGPD-compliant (pack criado D12)' },

      // UI / Design upgrade (plugins instalados 2026-05-26)
      { re: /\b(landing|hero|estilo visual|estetica|brutalist|maximalist|playful|luxury|design system|brand)\b/i,
        skill: '/frontend-design (plugin Anthropic)', motivo: 'intenção estética ANTES de codar UI (plugin instalado 2026-05-26)' },
      { re: /\b(impeccable|typeset|colorize|audit ui|critique ui|polish ui)\b/i,
        skill: '/impeccable audit|polish|critique|typeset|colorize (plugin Bakaus)', motivo: '7 domínios design + 27 anti-padrões (plugin v3.1.1 instalado 2026-05-26)' },

      // GSD audit cluster (28 mantidas — críticas marcadas ⭐)
      { re: /\b(milestone|fechar vers[aã]o|release v\d|fechar sprint)\b/i,
        skill: '/gsd-new-milestone OR /gsd-complete-milestone OR /gsd-audit-milestone', motivo: 'milestone-scope: cerimônia de versão (KOD.AI cobre feature-scope)' },
      { re: /\b(audit.*fix|corrigir issues|automated fix|auto.?fix)\b/i,
        skill: '/gsd-audit-fix ⭐', motivo: 'audit-to-fix pipeline automatizado (KOD.AI não tem equivalente)' },
      { re: /\b(forensic|post.?mortem|workflow failed|investigar falha)\b/i,
        skill: '/gsd-forensics ⭐', motivo: 'post-mortem GSD workflow failure (KOD.AI não tem equivalente)' },
      { re: /\b(ship|criar pr|abrir pr|track merge|push.*branch)\b/i,
        skill: '/gsd-ship ⭐ OR /finishing-a-development-branch', motivo: 'GSD ship pra PR automation; KOD.AI finishing pra cleanup' },
      { re: /\b(uat|user acceptance|conversational test|testar feature)\b/i,
        skill: '/gsd-verify-work (conversational) + /qa-verifier (adversarial)', motivo: 'dual quality gate UAT + adversarial matrix' },
      { re: /\b(autonomous|rodar tudo|automatico|sem parar|deixa rodar)\b/i,
        skill: '/gsd-autonomous', motivo: 'autonomous mode end-to-end (KOD.AI sempre HITL — usar GSD se quer automation)' },
      { re: /\b(sketch|prot[oó]tipo html|mockup throwaway)\b/i,
        skill: '/gsd-sketch', motivo: 'protótipo HTML throwaway pra UI rápida' },
      { re: /\b(spike|experimentar|validar viabilidade tecnica|time.?box)\b/i,
        skill: '/gsd-spike', motivo: 'exploração técnica time-boxed' },
      { re: /\b(graphify|knowledge graph|dependencias visualiz)\b/i,
        skill: '/gsd-graphify', motivo: 'knowledge graph do projeto (único)' },
      { re: /\b(mapear codebase|stack doc|architecture doc|gerar readme)\b/i,
        skill: '/gsd-map-codebase OR /gsd-docs-update', motivo: 'codebase intelligence + doc auto-generation' },

      // Meeting analyzer (pack STUB criado D4 — Kelvin Cleto)
      { re: /\b(reuni(a|ã)o|call|extracao|follow.?up|objec(a|ã)o|pain.?point|wins celebrations)\b/i,
        skill: 'pack ia/agentes-meeting-analyzer (STUB)', motivo: 'schema 9 categorias pra extrair inteligência de reuniões (pack STUB criado 2026-05-26)' },

      // Matriz de uso QUANDO-GSD-VS-KODAI (referência humana)
      { re: /\b(qual skill|que skill usar|skill apropriada|gsd ou kodai|quando usar)\b/i,
        skill: 'consultar KODAI/docs/QUANDO-GSD-VS-KODAI.md', motivo: 'matriz canônica de decisão skill-por-situação (criada 2026-05-26)' },
    ];

    for (const p of patterns) {
      if (p.re.test(userPrompt)) {
        suggestions.push({ skill: p.skill, motivo: p.motivo });
      }
    }

    if (suggestions.length === 0) {
      return ok();
    }

    // Dedup por skill name (caso múltiplos patterns disparem mesma sugestão)
    const seen = new Set();
    const unique = suggestions.filter(s => {
      if (seen.has(s.skill)) return false;
      seen.add(s.skill);
      return true;
    });

    // Limita a 5 sugestões pra não inflar contexto
    const top = unique.slice(0, 5);

    const additionalContext =
      `# KOD.AI — Skills sugeridas pelo hook auto-suggest\n\n` +
      `Detectei ${top.length} skill(s) relevante(s) ao prompt do usuário. ` +
      `Considere invocar antes de prosseguir (princípio fundacional 2Co 12:9-10 — ` +
      `sistema lembra o que o humano poderia esquecer):\n\n` +
      top.map(s => `- **${s.skill}** — ${s.motivo}`).join('\n') +
      `\n\nLista completa de skills disponíveis: \`Get-ChildItem .claude/skills -Directory\` ou \`ls .claude/skills/\``;

    process.stdout.write(JSON.stringify({
      continue: true,
      additionalContext
    }));
    process.exit(0);
  } catch (err) {
    fs.appendFileSync('.claude/hooks-errors.log',
      `[${new Date().toISOString()}] auto-suggest-skills FAIL: ${err.message}\n`);
    ok();
  }
});

function ok() {
  process.stdout.write(JSON.stringify({ continue: true }));
  process.exit(0);
}
