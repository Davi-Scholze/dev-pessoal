---
name: upstream-update
description: >
  Envia material universal absorvido localmente (pasta-mãe ou repo
  consumidor) de volta pro upstream `Davi-Scholze/kod-ai`. Modelo A
  (Davi-only, commit direto na main) é default v0.6. Modelos B/C (PR via
  fork trusted/aberto-gated) são opcionais, deferidos até ≥2 consumidores
  reais. Consome pitch gerado por `/auditar-projeto` Fase 8. Aplica
  anti-poluição em 7 SIM bloqueantes (anti-verbatim n-gram≥5, cinco-NÃOs,
  marca-zero, PII-zero, license, regra-base, atribuição) antes de qualquer
  push. Atribuição opt-in. Status tracking em `.upstream-history.yaml`.
  Use quando o usuário disser "/upstream-update", "contribuir upstream",
  "mandar isso pro KODAI", "subir contexto absorvido", "fazer pitch pro
  upstream", "publicar essa política/skill no kod-ai".
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Skill
---

# Skill: `/upstream-update`

> Orquestrador de contribuição **consumidor → upstream `Davi-Scholze/kod-ai`**. Loop fechado de absorção bidirecional.

## Princípio fundamental

> *"Conteúdo absorvido localmente (via `/auditar-projeto` + `/absorver-contexto`/`/absorver-referencia`) PRECISA passar pelo anti-poluição checklist antes de subir pro upstream. Davi é único merger em Modelo A."*

## Quando disparar

**Triggers explícitos:**
- "/upstream-update"
- "contribuir upstream" / "mandar isso pro KODAI" / "subir contexto absorvido"
- "fazer pitch pro upstream" / "publicar essa skill no kod-ai"

**Triggers contextuais:**
- `/auditar-projeto` acabou de gerar `.kodai-auditoria/<data>/upstream-pitch.md` (sugere `/upstream-update` automaticamente após o usuário revisar o pitch)
- Davi pede revisão do que está pronto pra upstream

**NÃO disparar quando:**
- Pitch ainda não existe (não rodou `/auditar-projeto` ou pitch falhou)
- `_negocio/contextos/bruto/` ou `inbox-*/` (bruto sagrado — NUNCA contribuir)
- Items com `Sensibilidade: confidencial` ou `pii` sem DPA do upstream

## Modos de operação

| Modo | Flag | O que faz |
|---|---|---|
| **Modelo A** (default v0.6) | `--modelo A` ou sem flag | Commit direto em `Davi-Scholze/kod-ai` main (só Davi pode) |
| **Modelo B** (opcional) | `--modelo B` | PR via fork — trusted consumer (futuro, ≥2 consumidores reais) |
| **Modelo C** (opcional) | `--modelo C` | PR via fork + gate automático — qualquer consumer (futuro) |
| **Dry run** | `--dry-run` | Roda anti-poluição + gera plano, não faz push |
| **Override anti-poluição** | `--override-anti-pollution` | Só Modelo A; exige razão escrita + log em audit_log |
| **Atribuição** | `--attribution true\|false` | Default false; opt-in pra Co-Authored-By no commit |

## Workflow 7 fases

### Fase 1 — Detect (ler pitch)

Lê `<consumidor>/.kodai-auditoria/<data>/upstream-pitch.md` gerado por `/auditar-projeto` Fase 8.

Parse extrai:
- `consumidor`: nome, email, GitHub, brand_words (declarados na auditoria)
- `items`: lista de paths source → upstream_path + bucket (NOVO/REFINA/ALTERA/DESCARTA) + license + sensibilidade
- `attribution_opt_in`: true | false (escolha do consumidor)

Se pitch ausente: **PARA** com mensagem "Rode `/auditar-projeto` primeiro pra gerar pitch".

### Fase 2 — Validar local (anti-poluição)

Invoca `checks.js` (ver `anti-pollution-checklist.yaml`) com os 7 SIM bloqueantes:

1. Anti-verbatim n-gram≥5
2. Cinco NÃOs (tom/marca/exemplos/estrutura/claim)
3. Marca-zero (brand_words declarados pelo consumidor)
4. PII-zero (CPF/RG/email pessoal/credencial)
5. License compatível (MIT/Apache/BSD ou trabalho próprio)
6. Evidence Bloc adjacente
7. Atribuição visível

Resultado: `{ allPass: bool, failures: [...], detalhes: {...} }`.

Se algum check falha + sem `--override-anti-pollution` → **PARA** + reporta razão específica.

### Fase 3 — Preparar branch upstream

```bash
cd "$KODAI_UPSTREAM_PATH"  # clone local do Davi-Scholze/kod-ai
git config user.email  # valida: davi.scholze28@gmail.com (NUNCA Navortech)
git status --short  # exige working tree clean
git checkout main
git pull origin main  # sync com upstream
```

Modelo A continua direto na main. Modelo B/C cria branch dedicada (`upstream-<data>-<hash>`).

### Fase 4 — Format (empacotar items)

Para cada item aprovado:
1. `mkdir -p <upstream_path>/parent/`
2. `cp <source_path> <upstream_path>`
3. Inserir/atualizar header YAML com:
   - `Fontes:` (preserva origem)
   - Rodapé "Origem: <consumidor> em <data> via `/upstream-update`" (atribuição opt-in)
4. Se item modifica arquivo existente, gerar diff legível

### Fase 5 — Submit

**Modelo A:**
- `git add -A`
- Commit message gerado:
  ```
  feat(upstream): <N> items de <consumidor> via /upstream-update
  
  Items absorvidos:
  - <bucket>: <upstream_path> (de <source_path>)
  ...
  
  Anti-poluição: 7 SIM PASS
  
  Co-Authored-By: <consumidor> <email>  # se attribution opt-in
  ```
- `git push origin main` direto

**Modelo B/C** (futuros):
- `git push <fork-remote> upstream-<data>`
- `gh pr create --base main --head upstream-<data> --title "..." --body "$(template)"`

### Fase 6 — Track

Atualiza `<consumidor>/.upstream-history.yaml` via `tracker.js`:
```yaml
contributions:
  - id: <hash>
    date: <data>
    item_count: <N>
    items: [...]
    submission:
      method: A_direct_push  # ou B_pr_fork, C_pr_fork_gated
      commit_sha: <sha>      # Modelo A
      pr_url: <url>          # Modelo B/C
      status: merged         # Modelo A é auto-merged
    attribution: {...}
    audit: {...}
```

### Fase 7 — Cleanup (manual após confirmação)

NÃO automatiza delete da quarentena `mapeamento/` no consumidor. Apenas reporta:

> "Items merged em upstream commit `<sha>`. Pra limpar quarentena do consumidor, rode `/faxina --purge mapeamento/` quando confirmar que tudo OK."

## Anti-poluição checklist (D3 da spec)

Detalhe em `anti-pollution-checklist.yaml`. Resumo dos 7 SIM:

| # | Check | Bloqueante |
|---|---|---|
| 1 | Anti-verbatim n-gram≥5 | SIM |
| 2 | Cinco NÃOs (tom/marca/exemplos/estrutura/claim) | SIM |
| 3 | Marca-zero (brand_words) | SIM |
| 4 | PII-zero (CPF/RG/email pessoal/credencial) | SIM |
| 5 | License compatível | SIM |
| 6 | Evidence Bloc adjacente | SIM |
| 7 | Atribuição visível | SIM |

Check 8 (categoria mapeada) é **NÃO bloqueante** — permite proposta de categoria nova com justificativa.

## Override humano (Modelo A apenas)

`/upstream-update --override-anti-pollution --razao "<texto>"`

Requisitos:
1. Apenas Modelo A (Davi)
2. `--razao` é OBRIGATÓRIO + ≥30 caracteres
3. Auto-log em `KODAI/99_meta/audit_log.md`:
   ```markdown
   ## Override anti-pollution <data>
   - Item: <path>
   - Check falhou: <qual>
   - Razao: "<texto Davi>"
   - Aprovado por: Davi
   ```

Modelo B/C NÃO permitem override (gate é rigoroso).

## Sensibilidade (regra-base — política `classificacao-contexto.md`)

**NUNCA contribuir** items com:
- `Sensibilidade: confidencial` (mesmo com DPA — material confidencial é por-cliente, não universal)
- `Sensibilidade: pii` (LGPD)
- Marca-do-consumidor detectada (mesmo se brand_words não declarados — check 3 com heurística defensiva)

## Status tracking + sub-skill futura

`.upstream-history.yaml` no clone-do-consumidor é fonte canônica de status. Detalhe em `status-tracker.md`.

Sub-skill futura: `/check-status-upstream` (v0.7) — reporta status no formato canônico (5-7 linhas).

## Identidade git (validação obrigatória)

Fase 3 VALIDA antes de qualquer push:
- `git config user.email` no clone upstream = `davi.scholze28@gmail.com`
- **NUNCA** committer como Navortech (relacionado: `feedback_git_identity_pasta_mae.md`)

Falha: PARA + reporta + sugere `git config user.email davi.scholze28@gmail.com` LOCAL no upstream clone.

## Política irmã + skills

- `politicas/classificacao-contexto.md` — gate de sensibilidade
- `politicas/engenharia-de-contexto.md` — princípio base
- `politicas/escuta-antes-de-agir.md` — leitura externa pausa antes
- `politicas/gitignore-aditivo.md` — `.upstream-history.yaml` adicionado aditivamente
- `politicas/entrada-em-projeto-existente.md` — NÃO reorganizar upstream estrutura
- `skills/auditar-projeto/SKILL.md` — gera pitch consumido por esta skill
- `skills/absorver-contexto/SKILL.md` — 4 buckets classificação
- `skills/absorver-referencia/SKILL.md` — anti-verbatim canônico
- `metodologias/mapeamento-equivalencias.md` — tabela X↔Y pro upstream_path
- `regras-base.md` (regras 2, 4, 5, 10, 11)

## Limitações honestas

- **Modelo A é Davi-only** — outros consumidores aguardam Modelo B/C abrirem
- **Anti-verbatim n-gram=5** pode falso-positivo em items legitimamente parecidos (override existe com log)
- **Cinco NÃOs heurístico** — não é determinístico, pode passar verbatim sutil
- **Sem rollback automático** de contribuição merged — se ruim depois, revert manual no upstream + tracking em manifest do item
- **Modelo B/C ainda não-implementados** — `--modelo B/C` retorna erro "futuro"
- **Piloto contra NV-Dev deferido** pra sessão dedicada na máquina certa (~60-90min)

## Critérios de PASS (v0.6.0 release)

1. Skill operacional dogfood Davi → KODAI
2. Piloto real: `/auditar-projeto` em NV-Dev → `/upstream-update` → commit em `Davi-Scholze/kod-ai`
3. Anti-poluição bloqueia anti-verbatim FAIL + marca + credencial + PII
4. `.upstream-history.yaml` registrando submissão + status
5. Atribuição opt-in funcional (testar com true E false)
6. Evidence Bloc completo em `docs/decisoes/tasks/2026-05-21_upstream-update/EVIDENCE.md`
7. `docs/UPSTREAM-CONTRIBUTING.md` publicado (Modelo B/C como "futuro")

## Próximos passos pós-implementação

1. Piloto NV-Dev → Evidence Bloc
2. Release `v0.6.0-upstream-update` (tag + CHANGELOG)
3. Aguardar ≥2 consumidores reais aparecerem pra ativar Modelo B
4. Implementar Modelo C quando B estiver battle-tested (D5 critério)
