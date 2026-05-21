---
tipo: rascunho-spec
data: 2026-05-21
operador: claude-opus-4-7
status: rascunho-pra-brainstorming
fontes:
  - ./Evolução Viva de Contexto — Arquitetura de Aprendizado do KOD.AI.md
  - ./ANALISE-ARQUITETURAL.md (item 11)
  - KODAI/1-ESQUELETO/skills-universais/upstream-update/SKILL.md
  - KODAI/1-ESQUELETO/politicas/quality-gates-com-critic-grounding.md
  - KODAI/1-ESQUELETO/politicas/handoff-contracts.md
disclaimer: |
  Rascunho inicial pra acelerar /brainstorming. Davi pode reescrever
  qualquer parte. Spec 2 da sequencia (depois de lineage, antes de closed-loop).
---

# Rascunho: Spec `candidate-to-core` (Spec 2 da sequência)

> **Motivação do Davi (Doc 2):** "Nem toda melhoria local deve voltar automaticamente para o Core. O sistema deve possuir uma camada intermediária: `candidate-to-core` — onde melhorias potencialmente universais são separadas para análise, comparação, validação, benchmark, curadoria."

## Estado atual vs gap

**Hoje (`/upstream-update` Modelo A):**
```
projeto consumidor descobre melhoria
  ↓
/upstream-update --modelo A
  ↓
anti-pollution checks (7 SIM)
  ↓
SE PASS → commit direto em Davi-Scholze/kod-ai main
SE FAIL → bloqueia
```

**Gap:** sem camada intermediária pra avaliação humana de **valor real**. Anti-pollution garante higiene (sem marca/PII/credencial), mas não garante que a contribuição é **boa**.

## Proposta de fluxo

```
projeto consumidor descobre melhoria
  ↓
/upstream-update --modelo A
  ↓
anti-pollution checks (7 SIM)
  ↓
SE PASS → vai pra KODAI/candidates/<data>-<slug>/ (NOVA camada)
  ↓
Davi (ou DAO futura) revisa
  ├── Aprovado    → /promover-candidate → commit upstream main
  ├── Rejeitado   → arquiva em candidates/rejected/<motivo>/
  └── Discussao   → fica em candidates/ até decisão (com timeout 30d)
```

## Estrutura proposta

```
KODAI/
├── candidates/                              # NOVA pasta
│   ├── README.md                            # explica gate + estados
│   ├── 2026-05-22-pack-marketing-tiktok/    # exemplo
│   │   ├── proposal.md                      # o que adiciona/muda
│   │   ├── evidence.md                      # uso real que motivou
│   │   ├── anti-pollution-pass.yaml         # snapshot dos 7 checks
│   │   ├── benchmark.md                     # comparação com existente
│   │   ├── files/                           # arquivos propostos
│   │   │   └── 2-PACKS/packs/marketing/tiktok/
│   │   └── status.yaml                      # pending|approved|rejected|in-review
│   ├── rejected/                            # candidates arquivados
│   │   └── 2026-05-15-pack-pessoal-tarefas/
│   │       └── motivo.md                    # explica por que não passou
│   └── INDEX.md                             # lista todos candidatos ativos
```

## Schema do `status.yaml`

```yaml
candidate_id: 2026-05-22-pack-marketing-tiktok
status: pending | in-review | approved | rejected | timed-out
origem:
  consumidor: <nome-do-projeto-ou-davi>
  data_submissao: 2026-05-22
  via: /upstream-update --modelo A
  identidade_git: davi.scholze28@gmail.com
checks_passados:
  - 1_anti_verbatim: PASS
  - 2_cinco_naos: PASS
  - 3_marca_zero: PASS
  - 4_pii_zero: PASS
  - 5_license: MIT
  - 6_evidence_bloc: PASS
  - 7_atribuicao: PASS
benchmark:
  conflito_com: []            # outros packs/contextos que conflitam
  duplica_com: []             # capacidade já existente que duplica
  estende: ["packs/marketing/seo"]  # se estende algo
  cruza_com: ["3-CONTEXTOS-DOMINIO/sistemas-empresariais-br"]
revisao:
  reviewer: davi-scholze       # quem revisou
  data_revisao: null
  veredicto: null              # approved | rejected | needs-changes
  razao: null                  # texto livre
  changes_requested: []        # se needs-changes, lista de mudanças
timeout:
  expira_em: 2026-06-21        # 30d default
  acao_no_timeout: reject-with-prejudice  # ou archive-as-stale
```

## Comandos novos

### `/promover-candidate <candidate-id>`

Workflow:
1. Lê `candidates/<id>/status.yaml` — confirma status `approved`
2. Move arquivos de `candidates/<id>/files/` pra paths finais do upstream
3. Atualiza `lineage:` (Spec 1) no manifest: `origin: candidate-to-core` → `upstream`
4. Atualiza `lineage.validado_por` com referência ao Evidence Bloc do consumidor
5. Commit no upstream main
6. Arquiva `candidates/<id>/` em `candidates/promoted/<id>/` com timestamp
7. Atualiza `candidates/INDEX.md`
8. Notifica consumidor (via evento NDJSON ou status no `.upstream-history.yaml`)

### `/rejeitar-candidate <candidate-id> --razao "<texto>"`

Workflow:
1. Move `candidates/<id>/` pra `candidates/rejected/<id>/`
2. Cria `motivo.md` com razão + alternativa sugerida
3. Atualiza `candidates/INDEX.md`
4. Notifica consumidor

### `/listar-candidates` (skill nova ou extensão `/atualizar-kodai`)

Lista todos candidatos com status, ordenados por data + prioridade.

## Modificação no `/upstream-update`

Modelo A atual vai DIRETO pra main. **Proposta:** mudar pra DEFAULT ir pra `candidates/`.

```diff
# modelo-a.js (KODAI/1-ESQUELETO/skills-universais/upstream-update/)
- destino = "main branch direto"
+ destino = "candidates/<data>-<slug>/"
+ git commit message: "candidate(<categoria>): <descrição> — aguarda revisão"
+ push pra branch candidates/<id>  # OPCIONAL — se quiser PR-style
```

**Davi-only flag opcional:** `--skip-candidate` pra Davi pular o gate em commits triviais (typo, docs). Logado em audit log.

## Riscos identificados

| Risco | Mitigação |
|---|---|
| Davi-curador vira gargalo (KODAI tem 1 consumidor hoje = Davi) | Modelo A ainda permite `--skip-candidate` em casos óbvios. Gate só fica obrigatório quando ≥2 consumidores reais (D5 ampliado). |
| `candidates/` poluir o upstream com lixo abandonado | Timeout 30d default + auto-archive como stale. Manutenção via skill `/limpar-candidates` mensal. |
| Cada candidate vira uma branch git → branches infinitas | Default: commits no `candidates/` ficam só na main (não cria branch). Branch só se reviewer pedir. |
| Conflito com `/upstream-update` Modelo B/C (futuros) | Modelo B (PR via fork) reusa o `candidates/` schema — abre PR direto da pasta candidate quando reviewer aprova. |
| Schema `benchmark` pede análise manual difícil | Skill `/benchmark-candidate` automatiza match contra packs existentes (compara topics, keywords, paths). Sugere conflito/duplica, humano confirma. |
| Timeout 30d arbitrário | Configurável via `candidates/policy.yaml`. Default 30d, mas pode ser estendido por candidate. |

## Critério de aceitação

Spec vira FUNCIONAL quando:

- [ ] `KODAI/candidates/` criado + `README.md` + `INDEX.md` + `policy.yaml`
- [ ] `/upstream-update` modificado pra default-route pra candidates
- [ ] `/promover-candidate` + `/rejeitar-candidate` + `/listar-candidates` implementados
- [ ] 1 piloto real: contribuição (mesmo trivial) passa pelo fluxo completo (submit → review → promote)
- [ ] Evidence Bloc com SHA do commit promovido + link da pasta candidate
- [ ] Documentação em `KODAI/docs/UPSTREAM-CONTRIBUTING.md` atualizada

## Decisões pendentes (precisam Davi)

1. **Default-route pra `candidates/` ou opt-in?** Default-route é mais seguro mas adiciona fricção em commits triviais. Opt-in via flag `--candidate` é mais leve mas pode ser esquecido.
2. **Timeout default:** 30d, 60d, ou sem timeout (Davi-pace)?
3. **Auto-benchmark via `/benchmark-candidate`** vale construir agora ou deixar manual até ter ≥10 candidatos/mês?
4. **Branch git por candidate?** (mais formal, prepara Modelo B futuro) OU **só commits em candidates/ na main**? (mais leve)
5. **Notification ao consumidor:** apenas via `.upstream-history.yaml` (passivo, ele tem que checar) OU também via email/webhook (ativo, mas custo de infra)?

## Próximos passos

1. **`/brainstorming` com Davi** — destila 5 decisões pendentes
2. **Spec aprovada** em `KODAI/docs/decisoes/2026-MM-DD_candidate-to-core.md`
3. **`/break`** em tasks atômicas (estrutura pasta + comandos + modificar /upstream-update + piloto)
4. **`/execute`** com Evidence Bloc
5. **Piloto real:** Davi faz 1 contribuição trivial via novo fluxo → valida end-to-end

## Cruzamento com outras specs

- **Spec 1 (lineage):** candidate herda lineage; quando promovido, `lineage.origin` muda de `candidate-to-core` → `upstream`
- **Spec 3 (closed-loop):** loop completo passa pelo candidate gate. Refinamento via `/refinar-contexto` pode disparar novo candidate.
- **Política `quality-gates-com-critic-grounding`:** Critic skill é o **reviewer automatizado pre-humano** do candidate. Roda checks + sugere veredicto pra Davi confirmar.

---

## Disclaimer (regra-base 11)

Rascunho pra debate. Davi tem palavra final em:
- Default-route vs opt-in
- Timeout policy
- Auto-benchmark agora vs depois
- Branch git por candidate vs só commit
- Notification ativa vs passiva

Zero código rodando, zero validação empírica.
