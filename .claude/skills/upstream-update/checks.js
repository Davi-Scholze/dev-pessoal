#!/usr/bin/env node
/**
 * KOD.AI /upstream-update — Anti-pollution checks (7 SIM)
 *
 * Versão:     1.0
 * Atualizado: 2026-05-21
 * Spec:       docs/decisoes/2026-05-20-upstream-update-mecanismo.md
 * Task:       docs/decisoes/tasks/2026-05-21_upstream-update/task-02-anti-pollution-checklist.md
 *
 * Implementa os 7 SIM bloqueantes da D3 da spec.
 *
 * Uso CLI:
 *   node checks.js <item_path> [--source-paths <bruto-dir>] [--brand-words <word1,word2>]
 *
 * Output: JSON em stdout com { allPass, failures, detalhes, summary }
 * Exit:   0 se PASS, 2 se FAIL, 1 se erro
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ============================================================================
// Helpers
// ============================================================================

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return null;
  }
}

function walkDir(dir, ext = '.md') {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  return normalize(text).split(/\s+/).filter(w => w.length > 2);
}

// ============================================================================
// Check 1 — Anti-verbatim n-gram >= 5
// ============================================================================

function nGrams(tokens, n) {
  const grams = new Set();
  for (let i = 0; i <= tokens.length - n; i++) {
    grams.add(tokens.slice(i, i + n).join(' '));
  }
  return grams;
}

function antiVerbatim(itemContent, sourcePaths, ngramSize = 5) {
  const itemTokens = tokenize(itemContent);
  const itemGrams = nGrams(itemTokens, ngramSize);

  const matches = [];
  for (const sourcePath of sourcePaths) {
    const sourceFiles = fs.statSync(sourcePath).isDirectory()
      ? walkDir(sourcePath, '.md')
      : [sourcePath];

    for (const sFile of sourceFiles) {
      const sContent = readFile(sFile);
      if (!sContent) continue;
      const sTokens = tokenize(sContent);
      const sGrams = nGrams(sTokens, ngramSize);

      for (const gram of itemGrams) {
        if (sGrams.has(gram)) {
          matches.push({ ngram: gram, source: sFile });
          if (matches.length > 10) break; // limita output
        }
      }
      if (matches.length > 10) break;
    }
    if (matches.length > 10) break;
  }

  return {
    pass: matches.length === 0,
    matches_count: matches.length,
    sample_matches: matches.slice(0, 5),
    razao: matches.length > 0
      ? `${matches.length} n-grams de 5+ palavras consecutivas idênticas a source(s)`
      : null
  };
}

// ============================================================================
// Check 2 — Cinco NÃOs (heurístico)
// ============================================================================

function cincoNaos(itemContent, sourceContent) {
  if (!sourceContent) return { pass: true, razao: 'source não fornecido (skip)' };

  const itemSentences = itemContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const sourceSentences = sourceContent.split(/[.!?]+/).filter(s => s.trim().length > 10);

  // Heurística simplificada: contagem de sentence-level matches normalizados
  const itemSentencesNorm = new Set(itemSentences.map(s => normalize(s).slice(0, 80)));
  const sourceSentencesNorm = new Set(sourceSentences.map(s => normalize(s).slice(0, 80)));

  const intersection = [...itemSentencesNorm].filter(s => sourceSentencesNorm.has(s));

  const falhas = [];
  if (intersection.length > 0) {
    falhas.push({
      sub_check: 'claim',
      detalhe: `${intersection.length} sentences (truncadas em 80 chars) iguais ao source`,
      samples: intersection.slice(0, 3)
    });
  }

  // Estrutura: compara ordem de headings h2/h3
  const itemHeadings = (itemContent.match(/^##+\s+.+$/gm) || []).map(h => h.toLowerCase());
  const sourceHeadings = (sourceContent.match(/^##+\s+.+$/gm) || []).map(h => h.toLowerCase());
  if (itemHeadings.length > 0 && sourceHeadings.length > 0) {
    const samePositions = itemHeadings.filter((h, i) => sourceHeadings[i] === h).length;
    const similaridade = samePositions / Math.max(itemHeadings.length, sourceHeadings.length);
    if (similaridade > 0.7) {
      falhas.push({
        sub_check: 'estrutura',
        detalhe: `${(similaridade * 100).toFixed(0)}% das seções na mesma ordem`,
        threshold: '70%'
      });
    }
  }

  return {
    pass: falhas.length === 0,
    falhas,
    razao: falhas.length > 0 ? `${falhas.length} sub-check(s) falharam` : null
  };
}

// ============================================================================
// Check 3 — Marca-zero
// ============================================================================

function marcaZero(itemContent, brandWords) {
  if (!brandWords || brandWords.length === 0) {
    return { pass: true, razao: 'brand_words não declaradas (skip — Davi declara via /auditar-projeto)' };
  }

  const lines = itemContent.split('\n');
  const matches = [];

  for (const word of brandWords) {
    const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    lines.forEach((line, idx) => {
      // Exceção: linhas de atribuição
      if (/origem:|fontes:|atribui|attribution/i.test(line)) return;
      const m = line.match(re);
      if (m) matches.push({ word, line: idx + 1, sample: line.trim().slice(0, 100) });
    });
  }

  return {
    pass: matches.length === 0,
    matches_count: matches.length,
    matches: matches.slice(0, 10),
    razao: matches.length > 0
      ? `${matches.length} matches de brand_words (${[...new Set(matches.map(m => m.word))].join(', ')})`
      : null
  };
}

// ============================================================================
// Check 4 — PII-zero
// ============================================================================

const PII_PATTERNS = {
  cpf: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g,
  cnpj: /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g,
  telefone_br: /\+?55\s?\(?\d{2}\)?\s?9?\d{4}-?\d{4}/g,
  email_pessoal: /[a-z0-9._%+-]+@(gmail|hotmail|yahoo|outlook|protonmail|icloud)\.com/gi,
  github_pat: /ghp_[A-Za-z0-9]{36}/g,
  github_pat_fg: /github_pat_[A-Za-z0-9_]{82}/g,
  openai_key: /sk-[A-Za-z0-9]{48}/g,
  anthropic_key: /sk-ant-[A-Za-z0-9-]{90,}/g,
  aws_key: /AKIA[A-Z0-9]{16}/g,
  slack_token: /xox[bp]-[A-Za-z0-9-]{10,}/g,
  jwt: /eyJ[A-Za-z0-9_-]{20,}\.eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/g
};

function piiScan(itemContent) {
  const lines = itemContent.split('\n');
  const detected = [];

  for (const [tipo, re] of Object.entries(PII_PATTERNS)) {
    lines.forEach((line, idx) => {
      // Exceção: fixtures de teste comentadas
      if (/exemplo_doc_de_teste|fixture|PATTERN ::/i.test(line)) return;
      const m = line.match(re);
      if (m) {
        for (const match of m) {
          const masked = match.slice(0, 4) + '...' + match.slice(-2);
          detected.push({ tipo, line: idx + 1, masked });
        }
      }
    });
  }

  return {
    pass: detected.length === 0,
    detected_count: detected.length,
    detected: detected.slice(0, 10),
    razao: detected.length > 0
      ? `${detected.length} PII detectado (${[...new Set(detected.map(d => d.tipo))].join(', ')})`
      : null
  };
}

// ============================================================================
// Check 5 — License compatível
// ============================================================================

const LICENSE_ACCEPT = new Set([
  'MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause',
  'Unlicense', 'CC0-1.0', 'derivative-original-author', 'own'
]);

const LICENSE_REJECT = new Set([
  'GPL-2.0', 'GPL-3.0', 'AGPL-3.0', 'LGPL-3.0',
  'proprietary', 'SSPL-1.0', 'none-declared'
]);

function licenseCheck(itemContent, itemMetadata = {}) {
  // Tenta extrair license do frontmatter YAML
  let license = itemMetadata.license || null;

  if (!license) {
    const yamlMatch = itemContent.match(/^---\n([\s\S]+?)\n---/);
    if (yamlMatch) {
      const licenseLine = yamlMatch[1].match(/^license:\s*([^\n]+)/im);
      if (licenseLine) license = licenseLine[1].trim();
    }
  }

  if (!license) {
    return {
      pass: false,
      razao: 'License não declarada (frontmatter sem campo `license:`)',
      sugestao: 'Adicionar `license: <X>` no YAML header'
    };
  }

  if (LICENSE_ACCEPT.has(license)) {
    return { pass: true, license };
  }

  if (LICENSE_REJECT.has(license)) {
    return {
      pass: false,
      license,
      razao: `License '${license}' não compatível com KOD.AI`,
      sugestao: 'Re-implementar do zero (own) ou usar fonte com license compatível'
    };
  }

  return {
    pass: false,
    license,
    razao: `License '${license}' desconhecida — não está em accept/reject list`,
    sugestao: 'Verificar manifest.yaml accept/reject; adicionar se aplicável'
  };
}

// ============================================================================
// Check 6 — Evidence Bloc
// ============================================================================

function evidenceBloc(itemPath) {
  const itemDir = path.dirname(itemPath);
  const candidates = [
    path.join(itemDir, 'EVIDENCE.md'),
    path.join(itemDir, '..', 'EVIDENCE.md'),
    path.join(itemDir, '..', '..', 'EVIDENCE.md')
  ];

  let evidenceFile = null;
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      evidenceFile = c;
      break;
    }
  }

  if (!evidenceFile) {
    return {
      pass: false,
      razao: 'EVIDENCE.md não encontrado em ../../ ../ ou ./',
      sugestao: 'Criar EVIDENCE.md adjacente com matriz mínima + relato honesto'
    };
  }

  const content = readFile(evidenceFile);
  const camposMinimos = ['data', 'operador', 'matriz', 'resultado', 'relato'];
  const camposPresentes = camposMinimos.filter(c =>
    new RegExp(`\\b${c}`, 'i').test(content)
  );

  if (camposPresentes.length < camposMinimos.length - 1) { // tolerância de 1
    return {
      pass: false,
      evidenceFile,
      razao: `EVIDENCE.md presente mas campos faltando: ${camposMinimos.filter(c => !camposPresentes.includes(c)).join(', ')}`,
      sugestao: 'Preencher campos: ' + camposMinimos.join(', ')
    };
  }

  return { pass: true, evidenceFile };
}

// ============================================================================
// Check 7 — Atribuição visível
// ============================================================================

function atribuicaoCheck(itemContent) {
  const formatosAceitos = [
    /^>\s*origem:\s*.+\s+em\s+\d{4}-\d{2}-\d{2}\s+via\s+\/upstream-update/im,
    /^fontes:[\s\S]*?-\s*.+/im,
    /<!--\s*attribution:\s*.+:.+\s*-->/im,
    /Atribuicao:\s*.+/im,
    /Re-implementacao universalizada de/im  // padrão existente no KODAI
  ];

  const matches = formatosAceitos.filter(re => re.test(itemContent));

  if (matches.length === 0) {
    return {
      pass: false,
      razao: 'Nenhum formato de atribuição reconhecido encontrado',
      sugestao: 'Adicionar rodapé "> Origem: <consumidor> em <data> via /upstream-update"'
    };
  }

  return { pass: true, formatos_detectados: matches.length };
}

// ============================================================================
// Check 8 — Categoria mapeada (NÃO bloqueante)
// ============================================================================

function categoriaMapeada(itemMetadata = {}, upstreamPath = '') {
  const categoriasValidas = [
    '1-ESQUELETO/politicas/',
    '1-ESQUELETO/metodologias/',
    '1-ESQUELETO/skills-universais/',
    '2-PACKS/packs/ia/',
    '2-PACKS/packs/marketing/',
    '2-PACKS/packs/infra/',
    '2-PACKS/packs/integracoes/',
    '2-PACKS/packs/seguranca/',
    '3-CONTEXTOS-DOMINIO/'
  ];

  const bate = categoriasValidas.some(c => upstreamPath.includes(c));

  return {
    pass: true,  // não bloqueante
    bate_categoria_existente: bate,
    upstream_path: upstreamPath,
    sugestao: bate
      ? null
      : 'Não bate em categoria existente. Propor categoria nova com justificativa em manifest.yaml'
  };
}

// ============================================================================
// Run all
// ============================================================================

function runAllChecks(itemPath, opts = {}) {
  const itemContent = readFile(itemPath);
  if (!itemContent) {
    return {
      allPass: false,
      error: `Item path não legível: ${itemPath}`,
      exitCode: 1
    };
  }

  const sourcePaths = opts.sourcePaths || [];
  const brandWords = opts.brandWords || [];
  const itemMetadata = opts.itemMetadata || {};
  const sourceContent = opts.sourceContent ||
    (sourcePaths[0] && fs.existsSync(sourcePaths[0]) && fs.statSync(sourcePaths[0]).isFile()
      ? readFile(sourcePaths[0])
      : '');
  const upstreamPath = opts.upstreamPath || '';

  const results = {
    '1_anti_verbatim': antiVerbatim(itemContent, sourcePaths),
    '2_cinco_naos': cincoNaos(itemContent, sourceContent),
    '3_marca_zero': marcaZero(itemContent, brandWords),
    '4_pii_zero': piiScan(itemContent),
    '5_license': licenseCheck(itemContent, itemMetadata),
    '6_evidence_bloc': evidenceBloc(itemPath),
    '7_atribuicao': atribuicaoCheck(itemContent),
    '8_categoria': categoriaMapeada(itemMetadata, upstreamPath)
  };

  const bloqueantes = ['1_anti_verbatim','2_cinco_naos','3_marca_zero','4_pii_zero','5_license','6_evidence_bloc','7_atribuicao'];
  const failures = bloqueantes.filter(k => !results[k].pass);
  const allPass = failures.length === 0;

  return {
    allPass,
    failures,
    detalhes: results,
    summary: {
      total_checks_bloqueantes: bloqueantes.length,
      passed: bloqueantes.length - failures.length,
      failed: failures.length,
      categoria_proposicao_nova: !results['8_categoria'].bate_categoria_existente
    },
    exitCode: allPass ? 0 : 2
  };
}

// ============================================================================
// CLI
// ============================================================================

if (require.main === module) {
  const args = process.argv.slice(2);
  const itemPath = args[0];
  if (!itemPath) {
    console.error('Uso: node checks.js <item_path> [--source-paths <dir1,dir2>] [--brand-words <w1,w2>] [--upstream-path <path>]');
    process.exit(1);
  }

  const opts = { sourcePaths: [], brandWords: [], upstreamPath: '' };
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--source-paths' && args[i+1]) opts.sourcePaths = args[++i].split(',');
    if (args[i] === '--brand-words' && args[i+1]) opts.brandWords = args[++i].split(',');
    if (args[i] === '--upstream-path' && args[i+1]) opts.upstreamPath = args[++i];
  }

  const result = runAllChecks(itemPath, opts);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.exitCode);
}

module.exports = {
  antiVerbatim,
  cincoNaos,
  marcaZero,
  piiScan,
  licenseCheck,
  evidenceBloc,
  atribuicaoCheck,
  categoriaMapeada,
  runAllChecks
};
