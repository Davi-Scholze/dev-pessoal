---
tipo: analise
data: 2026-05-21
operador: claude-opus-4-7 (sessão Davi)
fontes:
  - ./Ecossistema de Parceiros — Visão Estratégica KOD.AI.md
  - ./Evolução Viva de Contexto — Arquitetura de Aprendizado do KOD.AI.md
  - ./Evolução Estrutural do KOD.AI — Infraestrutura Viva de Contexto para IA.md
  - KODAI/AGENTS.md
  - KODAI/docs/STRATEGIC-NORTH.md
  - KODAI/2-PACKS/packs/ia/contexto-profundo/ (DRAFT)
  - KODAI/1-ESQUELETO/politicas/memoria-3-tier.md (recém-absorvido)
status: analise-pra-brainstorming
---

# Análise Arquitetural — 3 docs estratégicos Davi cruzados com KOD.AI 0.6.0-dev

> O Doc 3 pediu explicitamente: "Analise profundamente toda a arquitetura atual do KOD.AI e comece a estruturar o sistema pensando no objetivo de longo prazo." Este arquivo entrega essa análise como input pra um `/brainstorming` futuro com Davi.

## Sumário executivo

Os 3 docs convergem em UMA visão arquitetural: **KOD.AI como Context Operating System + Knowledge Infrastructure + AI Context Engineering Platform**. Essa visão tem 3 pilares conceituais novos (não totalmente formalizados no KOD.AI atual):

1. **Candidate-to-Core** — gate de curadoria entre uso real e incorporação no core
2. **Lineage / contexto pai-filho** — metadata semântico de origem e evolução
3. **Closed Loop Evolution** — workflow sistemático pesquisa → uso → validação → refinamento → core

O estado atual do KOD.AI **já implementa pedaços** dessa visão, mas falta a integração explícita dos 3 conceitos.

---

## Estado atual do KOD.AI (o que já existe)

### Já implementado (em produção dogfooding)

| Capacidade | Onde mora | Status |
|---|---|---|
| Status canônicos (STUB/DRAFT/FUNCIONAL/BATTLE-TESTED/PARKED) | `1-ESQUELETO/regras-base.md` regra 5 | Em uso em todos os manifests |
| Evidence Bloc obrigatório | `regras-base.md` regra 11 + hook `check-completion-claims.js` | Mecânico + textual |
| Memória 3-tier (Core ≤5KB + Recall + Archival) | `politicas/memoria-3-tier.md` (absorvido 2026-05-20) | DRAFT — não tem operacionalização |
| Versionamento isolado por pack | regra-base 6 | Em uso |
| Contribuição reversa | skill `/upstream-update` (7 tasks impl + fixtures 6/6) | DRAFT — aguarda piloto NV-Dev |
| Auditoria de projeto consumidor | skill `/auditar-projeto` (8 fases) | DRAFT — aguarda piloto NV-Dev |
| Contexto profundo (livros 200+ pgs) | pack `2-PACKS/packs/ia/contexto-profundo/` | DRAFT — 3 backends (Anthropic cache + NotebookLM + RAG futuro) |
| Handoff contracts (entre skills) | `politicas/handoff-contracts.md` + skill `/validar-handoff` | DRAFT |
| Reflexion por skill | `politicas/reflexion-per-skill.md` | DRAFT — `reflections.md` por skill |
| Quality gates com Critic grounding | `politicas/quality-gates-com-critic-grounding.md` | DRAFT |
| Squad 3-tier (Coordinator/Director/Employee) | `politicas/squad-3-tier.md` | DRAFT |
| Portabilidade orquestração | `politicas/portabilidade-orquestracao-24-7.md` | DRAFT |
| Event log NDJSON | `politicas/event-log-ndjson.md` | DRAFT — append-only |

### O que NÃO existe (gap identificado pelos 3 docs)

| Conceito do Davi | Status atual KOD.AI | Gap |
|---|---|---|
| **Candidate-to-core** | `/upstream-update` Modelo A vai direto pra main; B/C deferidos | Falta camada intermediária `candidates/` com benchmark/curadoria explícita |
| **Lineage / pai-filho** | Manifest tem `version` mas não `parent`/`derives_from`/`contexto_filho` | Estender YAML manifest com campos lineage |
| **Closed Loop Evolution** | Evidence Bloc captura validação, `reflections.md` captura refinamento, mas não há trigger explícito de "promover refinamento ao core" | Workflow `/refinar-contexto` ou `/promover-refinamento` |
| **Knowledge Graph / relações semânticas** | `[[name]]` links em memórias + `related:` em manifests | Sem grafo explorável (Obsidian seria atalho — Davi mencionou) |
| **Lineage engine / context loading** | Skills carregadas via progressive disclosure (3 níveis) | Sem priorização semântica baseada em relevância dinâmica |
| **Embeddings / vector DB** | RAG vector listado como backend futuro do pack `contexto-profundo` | Não implementado |
| **Ecossistema de parceiros** | Não existe nenhuma estrutura | Vazio — visão de longo prazo |

---

## Análise dos 20 pontos pedidos no Doc 3

### 1-3. Estrutura atual + gargalos + limitações do modelo

**Estrutura atual (5 camadas):**
- `0-INSTALACAO/` — bootstrap + perfis
- `1-ESQUELETO/` — regras + políticas + metodologias + skills universais + hooks + templates + memoria-template
- `2-PACKS/` — capacidades técnicas (HOW)
- `3-CONTEXTOS-DOMINIO/` — conhecimento de negócio (WHAT) — agora é mecanismo de captura, não biblioteca pré-pronta
- `docs/` — decisões + planning + changelog

**Gargalos futuros (identificados):**
1. **Filesystem-only não escala pra knowledge graph** — grep não substitui semantic search quando o catálogo ultrapassa ~500 itens
2. **Sem lineage explícito** — quando pack `seo` deriva de absorção MazyOS, o vínculo está em prosa no manifest, não em campo estruturado consultável
3. **Sem candidate-to-core** — `/upstream-update` Modelo A vai direto, sem benchmark contra existente
4. **Progressive disclosure manual** — humano decide quando carregar bundle; falta engine que prevê relevância
5. **Multi-cliente nativo ainda não testado** — primeiro consumidor não-Davi é o teste estrutural real (L1 da fila — sexta-feira)

### 4-5. Escalabilidade contextual + necessidade futura de DB

**Curto prazo (atual + 6 meses):** Markdown + YAML + git resolvem até ~200 itens. Cabe na cabeça humana + grep funciona.

**Médio prazo (6-18 meses):** Quando passar de ~200 itens, precisar:
- Índice estruturado (SQLite local ou JSON aninhado) com schema declarado
- Embeddings opcional pra busca semântica (não substitui o filesystem — complementa)
- Knowledge graph leve (mermaid ou Obsidian-style) pra visualizar relações

**Longo prazo (18m+):** Se KOD.AI virar plataforma com N consumidores:
- Vector DB próprio (Qdrant local ou Postgres+pgvector) pra cross-tenant similarity
- Graph engine (Neo4j ou Kuzu) pra lineage explorável
- Context loading engine que prioriza por relevância + sensibilidade + frescor

### 6. Separação CORE vs LOCAL

**Atual:**
- CORE = `Davi-Scholze/kod-ai` upstream
- LOCAL = `<projeto-consumidor>/KODAI/` (clone) + extensões em `.claude/skills/` etc

**Gap:** não há mecanismo formal de "isso é minha extensão local que NÃO sobe pro core". O `/upstream-update` faz a curadoria por intenção do humano, mas sem marca estrutural.

**Proposta:** campo `lineage.origin` no manifest com valores `upstream | fork-local | candidate-to-core | extension`. Cada projeto consumidor pode ter overrides locais marcados como `extension` (não migram automaticamente).

### 7-10. Como contextos devem evoluir + relações + knowledge graph + lineage

**Esquema proposto (extensão do manifest YAML atual):**

```yaml
# Existente
name: <slug>
version: <semver>
status: STUB | DRAFT | FUNCIONAL | BATTLE-TESTED | PARKED
# NOVO — lineage explícito
lineage:
  origin: upstream | fork-local | candidate-to-core | extension
  parent: <slug-or-null>          # contexto base do qual derivou
  derives_from:                    # múltiplas fontes (absorção bilateral)
    - source: "MazyOS framework SEO"
      type: external-reference
      anti_pollution_passed: true
      date: 2026-05-17
  contextos_filhos: []             # contextos que derivam deste (auto-preenchido pelo /upstream-update)
  validado_por:                    # quem usou + onde
    - projeto: "NV-Dev"
      data: 2026-05-22
      evidence_path: "docs/decisoes/.../EVIDENCE.md"
  taxa_sucesso: 0.0-1.0            # auto-calculado por validações
  nichos_compatíveis: ["contabilidade-br", "saas-multi-tenant"]
relacoes_semanticas:
  - depende_de: ["politicas/escuta-antes-de-agir"]
  - complementa: ["packs/marketing/seo"]
  - substitui: []
  - similar_a: []
```

### 11. Candidate-to-core (gap principal)

**Proposta de fluxo:**

```
projeto consumidor descobre melhoria
  ↓
/upstream-update Modelo A push direto NÃO vai mais — vai pra...
  ↓
KODAI/candidates/<data>-<tema>/
  ├── proposal.md (mudança proposta)
  ├── evidence.md (uso real que motivou)
  ├── anti-pollution-pass.yaml (checks já rodaram)
  └── benchmark.md (comparação com existente: o que muda, o que melhora, o que regride)
  ↓
Davi (ou DAO futura) revisa
  ↓
Aprovado → /promover-candidate → vai pra core (upstream main)
Rejeitado → arquiva em candidates/rejected/ com razão
Em discussão → fica em candidates/ até decisão
```

**Spec a escrever:** `KODAI/docs/decisoes/2026-MM-DD_candidate-to-core.md`

### 12. Closed Loop Evolution (workflow)

**Proposta:**

```
pesquisa (já existe: /sugerir-pesquisa + NotebookLM)
  ↓
implementação (já existe: SDD /spec → /break → /plan → /execute)
  ↓
uso real em projeto (já existe: instalação via /instalar)
  ↓
validação (já existe: Evidence Bloc + reflexions per skill)
  ↓
refinamento (NOVO: /refinar-contexto consome reflections.md + propõe mudança)
  ↓
curadoria (NOVO: candidate-to-core gate)
  ↓
atualização do core (já existe: /upstream-update Modelo A)
  ↓
nova distribuição (já existe: /atualizar-kodai pull em consumidores)
```

**3 elos faltam:** trigger explícito de refinamento + gate candidate-to-core + métrica de "esse contexto pediu refinamento N vezes — virou tech debt"

### 13-14. Metadata contextual + versionamento

Já adequado — versioning semver por pack + status canônico. Falta lineage (item 10).

### 15. Battle-tested

**Atual:** definido em `regras-base.md` regra 5 como "≥2 clientes em produção, zero regressões em 60 dias".

**Gap:** ninguém aplica ainda — KOD.AI tem 1 dogfooding (Davi) e 0 clientes externos. Quando o primeiro consumidor não-Davi entrar (sexta-feira), preciso de processo formal de tracking pra promoção FUNCIONAL → BATTLE-TESTED.

### 16-18. Evolução contínua + memory infra + context orchestration

**Memory infra:** `memoria-3-tier.md` (recém-absorvido) é a base. **Operacionalização** ainda não existe:
- Core ≤5KB sempre carregado → MAPA.md + _memoria/empresa.md + _memoria/preferencias.md atendem
- Recall on-demand → grep funciona, mas falta indexação semântica
- Archival → git log + busca textual; falta cold storage real (S3-glacier-like)

**Context orchestration:** progressive disclosure (3 níveis) está OK. Falta:
- Prioridade dinâmica (qual skill carregar primeiro baseado em sinal do prompt do usuário)
- Cache hits explícitos (hoje Anthropic harness faz automaticamente)

### 19. Reaproveitamento entre empresas

Não testado. Vai ser estressado com sexta-feira. Variáveis:
- Como evitar leak de marca/contexto de cliente A em sugestão pra cliente B?
- Como propagar melhorias validadas em cliente A pra outros sem violar privacidade?
- Resposta canônica: o **candidate-to-core** gate é justamente isso — passa pelo anti-pollution (sem marca/PII/credencial) + curadoria humana.

### 20. Arquitetura ideal de longo prazo

**3 horizontes:**

**Curto (≤6 meses):** Continuar Markdown + YAML + git. Adicionar:
- Campos `lineage` em manifests
- Pasta `candidates/` no upstream
- Workflow `/refinar-contexto`

**Médio (6-18 meses):** Camada de indexação:
- `index.sqlite` autogerado por cron/hook (manifests + lineage + topics + status)
- Skill `/buscar-contexto` que usa o index
- Optional: embeddings local (fastembed) pra similarity search

**Longo (18m+):** Plataforma:
- Vector DB compartilhado entre projetos consumidores (opt-in, anonymized)
- Graph DB pra lineage cross-projeto
- API REST do KOD.AI Core consumível por outras IAs (não só Claude Code)
- Marketplace de packs validados

---

## Convergências com material upstream recém-absorvido (2026-05-20)

Os 8 políticas absorvidas em 2026-05-20 **conversam diretamente** com a visão de Davi:

| Política upstream | Doc Davi | Convergência |
|---|---|---|
| `memoria-3-tier.md` | Doc 3 (memory infrastructure) | Já bate — Core ≤5KB + Recall + Archival = "memory infra" do Davi |
| `handoff-contracts.md` | Doc 2 (candidate-to-core) | Handoff valida transição entre skills — similar a candidate gate entre projetos |
| `event-log-ndjson.md` | Doc 2 (Git como sistema de evolução) | Event log complementa git log com schema estruturado |
| `reflexion-per-skill.md` | Doc 2 (Closed Loop Evolution) | Reflexion = passo de "refinamento" do loop |
| `quality-gates-com-critic-grounding.md` | Doc 2 (curadoria) | Critic skill = curador automatizado pre-humano |
| `portabilidade-orquestracao-24-7.md` | Doc 1 (ecossistema) | Skill→agent permite KOD.AI rodar 24/7 servindo parceiros |

**Conclusão:** o KOD.AI já tem ~70% dos blocos da visão Davi formalizados como política. Falta:
- Integração explícita (workflow encadeando os 8 políticas)
- 3 conceitos sem política: candidate-to-core + lineage + closed-loop trigger
- Operacionalização (políticas em DRAFT, não FUNCIONAL ainda)

---

## Proposta concreta de próximos passos

### Imediato (próxima sessão de brainstorming com Davi)

1. **Validar esta análise** — Davi confirma que os 3 docs viraram a base + que os 3 conceitos novos (candidate-to-core, lineage, closed-loop) são prioritários
2. **Decidir Obsidian sim/não** — para curto prazo (graph thinking + exploração visual sem acoplar futuro)
3. **Sequenciar specs:**
   - Spec 1: `lineage-no-manifest.md` (extensão YAML — baixo risco, alto valor)
   - Spec 2: `candidate-to-core.md` (workflow novo — médio risco, alto valor)
   - Spec 3: `closed-loop-evolution.md` (consolida 8 políticas existentes — médio risco, médio valor)

### Curto prazo (próximas 2-4 semanas)

4. Implementar Spec 1 (lineage) — atualizar 5-10 manifests piloto
5. Operacionalizar `memoria-3-tier.md` (passar de DRAFT → FUNCIONAL via dogfooding Davi)
6. Piloto NV-Dev consumindo o KOD.AI com lineage funcionando (cruza com K4 da fila)

### Médio prazo (1-3 meses)

7. Implementar Spec 2 (candidate-to-core) — `KODAI/candidates/` + workflow
8. Implementar Spec 3 (closed-loop) — workflow + skill `/refinar-contexto`
9. Primeiro consumidor não-Davi roda KOD.AI com tudo isso (estressa multi-cliente)

### Longo prazo (3-12 meses)

10. Camada de indexação (`index.sqlite` + skill `/buscar-contexto`)
11. Ecossistema de parceiros (primeira integração com 1 parceiro universal — provável: contabilidade — Decon é o cliente piloto)
12. Reavaliar Obsidian vs sistema próprio vs marketplace plugin Claude Code

---

## Riscos identificados

| Risco | Mitigação |
|---|---|
| Over-engineering pra futuro hipotético | Toda spec inclui critério "vale só se 1+ caso real esperando" |
| Lineage manual fica desatualizado | `/upstream-update` e `/atualizar-kodai` atualizam lineage automaticamente |
| Candidate-to-core vira gargalo de revisão | Davi como único curador inicial; modelo B/C ativa quando ≥2 consumidores |
| Obsidian cria lock-in mesmo informal | Tratar como visualizador externo, não fonte de verdade |
| 8 políticas DRAFT não viram FUNCIONAL | Cada uma precisa Evidence Bloc dogfooding — meta: 1 FUNCIONAL/semana até onda 3 |

---

## Cruzamento com a fila atual (P2 abertas em `docs/decisoes/2026-05-20_aberto-*.md`)

Os 3 docs do Davi **fecham parcialmente** 2 frentes abertas:

| Frente aberta | Doc Davi que fecha | Status pós-análise |
|---|---|---|
| `aberto-objetivo-longo-prazo-kodai.md` (estrela polar) | Doc 1 (Ecossistema) + Doc 3 (visão de longo prazo) | **ready-for-spec** (era `aberto`) — falta brainstorm + spec executável |
| `aberto-contexto-profundo.md` | Doc 2 (Evolução Viva) + Doc 3 (memory infra) | **implementado-em-DRAFT** (já era) + os docs do Davi confirmam direção |
| `aberto-lgpd-seguranca-dev.md` | (não tocado) | Aguarda pesquisa NotebookLM |
| `aberto-plano-seguranca-dev.md` | (não tocado) | Aguarda pesquisa |
| `aberto-agentes-investigadores-mercado.md` | (parcial — Doc 1 menciona ecossistema) | Aguarda spec |
| `aberto-referencias-codigo-mundial.md` | (não tocado) | Aguarda pesquisa |

---

## Honestidade (regra-base 11)

**O que esta análise É:**
- Síntese estruturada cruzando 3 docs do Davi com estado atual KOD.AI
- Proposta de roadmap em 3 horizontes (curto/médio/longo)
- Mapa de gaps + convergências com upstream
- Material pronto pra `/brainstorming` futuro

**O que esta análise NÃO É:**
- Spec executável (precisa /brainstorming + /spec dedicados)
- Decisão arquitetural autoritativa (Davi tem palavra final)
- Validação empírica (zero código rodando — só leitura)
- Promessa de implementação (3 conceitos novos = 3 specs futuras, cada uma com /spec → /break → /plan → /execute → /review → /complete)

**Limitações conhecidas:**
- Doc 1 (Ecossistema de Parceiros) recebeu menos análise técnica — é visão de longo prazo mais difusa
- Não consultei NotebookLMs de concorrentes (Kelvin Cleto, a16z) que podem ter padrões prontos
- Não rodei `/notebooklm` contra "Engenharia de Contexto para LLMs" pra confirmar best practices da literatura
