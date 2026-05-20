---
Tipo: docs
Eixo: meta
Escopo: skill /upstream-update
Sensibilidade: publico
Versão: 1.0
Atualizado: 2026-05-21
related:
  - SKILL.md
  - tracker.js
  - manifest.yaml
---

# Status Tracker — `.upstream-history.yaml`

> Formato canônico do arquivo que registra histórico de contribuições upstream feitas pelo consumidor.
> Implementação em `tracker.js`. Arquivo fica no clone-do-consumidor (NÃO commitado — gitignored).

## Localização

```
<consumidor>/
└── .upstream-history.yaml   # gitignored
```

## Schema completo

```yaml
schema_version: "1.0"

consumidor:
  nome: "Davi Scholze"
  email: "davi.scholze28@gmail.com"
  github: "Davi-Scholze"
  brand_words:
    - "Navortech"
    - "NV-Dev"
    - "navortech.dev"
    - "Decon"
    - "Denize"

contributions:
  - id: "c1a2b3c4"                          # hash curto (8 chars hex)
    date: "2026-05-21"
    timestamp: "2026-05-21T14:30:00-03:00"
    item_count: 3
    items:
      - source_path: "_negocio/contextos/bruto/2026-05-19_playbook-entrada-projeto-existente.md"
        upstream_path: "1-ESQUELETO/politicas/entrada-em-projeto-existente.md"
        category: "REFINA"                  # NOVO | REFINA | ALTERA | DESCARTA
        bucket: "complementar"              # 4 buckets de /absorver-contexto
        license: "derivative-original-author"
        sensibilidade: "publico"
        anti_pollution_per_item:
          1_anti_verbatim: pass
          2_cinco_naos: pass
          3_marca_zero: pass
          4_pii_zero: pass
          5_license: pass
          6_evidence_bloc: pass
          7_atribuicao: pass
      - source_path: "..."
        upstream_path: "1-ESQUELETO/metodologias/mapeamento-equivalencias.md"
        category: "NOVO"
        bucket: "novo_universal"
        # ... mesma estrutura
    submission:
      method: "A_direct_push"               # A_direct_push | B_pr_fork | C_pr_fork_gated
      branch: "main"                        # Modelo A é direto
      pr_url: null                          # null em Modelo A
      commit_sha: "abc123def456"
      status: "merged"                      # pending | approved | rejected | merged | failed
      reviewer: "davi-scholze"              # auto em Modelo A
      review_date: "2026-05-21"
      reason: null                          # preenchido se rejected
    attribution:
      opt_in: true
      visible_in_commit: true
      co_authored_by: "Davi Scholze (NV-Dev) <davi.scholze28@gmail.com>"
    audit:
      operator: "claude-opus-4-7"
      timestamp_start: "2026-05-21T14:30:00-03:00"
      timestamp_end: "2026-05-21T14:35:00-03:00"
      override_used: false
      override_razao: null

  - id: "d4e5f6g7"
    date: "2026-05-22"
    item_count: 1
    items: [...]
    submission:
      status: "rejected"
      reason: "anti_verbatim_fail (>5 n-grams idênticas)"
    # ...

last_failure:                               # estado mais recente de falha (dashboard rápido)
  contribution_id: "d4e5f6g7"
  date: "2026-05-22"
  reason: "anti_verbatim_fail"
  items_que_falharam:
    - "_negocio/contextos/bruto/<x>.md"

stats:
  total_contributions: 2
  total_merged: 1
  total_rejected: 1
  total_pending: 0
  total_failed: 0
  last_success_date: "2026-05-21"
  last_failure_date: "2026-05-22"
  cumulative_items_merged: 3
```

## Statuses canônicos

| Status | Significado |
|---|---|
| `pending` | Submetido (Modelo B/C); aguarda review do Davi |
| `approved` | Davi aprovou via PR review; aguarda merge |
| `merged` | Mergeado no upstream (Modelo A é auto-merged) |
| `rejected` | Davi rejeitou; ver `reason` + `last_failure` |
| `failed` | Erro técnico (push falhou, identidade git errada, etc.); ver `reason` |

## API `tracker.js`

### Commands (CLI)

```bash
node tracker.js init [--consumer-name <N> --consumer-email <E> --consumer-github <G>]
node tracker.js add --items-json <path> --submission-meta-json <path>
node tracker.js update --contribution-id <id> --new-status <status> [--reason <text>]
node tracker.js status                                                    # JSON com summary
node tracker.js list                                                      # YAML completo do .upstream-history.yaml
node tracker.js stats                                                     # estatísticas
node tracker.js search --status <pending|merged|...>                      # filtra contribuições
```

### Exit codes

- `0` — sucesso
- `1` — erro (arquivo não legível, schema inválido, etc.)
- `2` — contribuição não encontrada (update/search)

## Validação de schema

Toda gravação valida:

- `schema_version` presente
- `contributions[].id` único
- `contributions[].submission.status` em [pending, approved, merged, rejected, failed]
- `contributions[].items` tem ≥1 entrada
- Datas em formato ISO 8601 (YYYY-MM-DD ou full ISO)

## `.gitignore` aditivo (aplicado automaticamente)

```
# .gitignore (no consumidor)
.upstream-history.yaml
```

Razão: arquivo contém histórico operacional + metadata de submissões; é estado local, não versionado entre máquinas.

Se quiser backup, exportar manualmente pra `_dev/backups/upstream-history-<data>.yaml`.

## Sub-skill futura proposta

`/check-status-upstream` (v0.7+) — wrapper humano-friendly:

```
✓ Upstream Status — 2026-05-22
Pending: 0 contribuições em revisão
Last success: 2026-05-21 (3 itens merged)
Last failure: 2026-05-22 (anti_verbatim_fail em <item>)
Total submissões: 2 (1 merged + 1 rejected)
Próxima ação: revisar item 'd4e5f6g7' e re-submeter pós-correção
```

## Quando atualizar este doc

- Quando schema do `.upstream-history.yaml` mudar
- Quando novos statuses forem adicionados
- Quando `tracker.js` ganhar comandos novos
- Versão incrementa em cada mudança
