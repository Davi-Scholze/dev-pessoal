---
tipo: rascunho-spec
data: 2026-05-21
operador: claude-opus-4-7
status: rascunho-pra-brainstorming
fontes:
  - ./ANALISE-ARQUITETURAL.md (item 10: lineage / pai-filho)
  - ./Evolução Estrutural do KOD.AI — Infraestrutura Viva de Contexto para IA.md
  - KODAI/2-PACKS/_template-pack/ (estrutura manifest atual)
  - KODAI/3-CONTEXTOS-DOMINIO/_template-contexto/
disclaimer: |
  Rascunho inicial pra acelerar o `/brainstorming` futuro. Davi pode reescrever
  qualquer parte — nenhuma decisão é final. Apresenta UMA opção concreta pra
  abrir o debate, não impor solução.
---

# Rascunho: Spec `lineage-no-manifest` (Spec 1 da sequência proposta)

> **Status:** rascunho-pra-brainstorming. Aguarda `/brainstorming` com Davi pra virar spec aprovada em `KODAI/docs/decisoes/2026-MM-DD_lineage-no-manifest.md`.

## Motivação (do Doc 3 do Davi)

> "Um contexto deve possuir: origem / versões / histórico / validação / nível de maturidade / nichos compatíveis / dependências / relações semânticas / quem validou / onde foi usado / taxa de sucesso / status / lineage / embeddings futuros / contexto relacionado / contexto pai/filho / data de evolução"

Estado atual KOD.AI: manifests têm `version` + `status` + `Atualizado` + `related:` (links manuais), mas faltam **lineage explícito + tracking de validação**.

## Proposta de schema (extensão do YAML manifest)

Adicionar bloco `lineage:` opcional a todo manifest de pack/contexto/skill. Compatível com manifests existentes (campos opcionais).

```yaml
# Campos EXISTENTES (não mudam)
name: <slug>
version: <semver>
status: STUB | DRAFT | FUNCIONAL | BATTLE-TESTED | PARKED
type: pack | contexto-dominio | skill
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
description: |
  ...
related:
  - ../<path>

# Campos NOVOS — lineage (opcionais)
lineage:
  # Origem do artefato
  origin: upstream | fork-local | candidate-to-core | extension
  # ^ upstream = veio do Davi-Scholze/kod-ai oficial
  # ^ fork-local = consumidor criou localmente
  # ^ candidate-to-core = está em revisão pra subir
  # ^ extension = consumidor mantém local sem intenção de subir

  # Encadeamento
  parent: <slug-or-null>
  # ^ artefato anterior do qual este derivou (ex: dev/ui-responsivo-smb derivou de... nada, mas pode futuramente derivar de uma versão geral dev/ui-responsivo)

  derives_from:
  # ^ múltiplas fontes (absorção bilateral / referências externas / NotebookLMs)
  - source: "MazyOS framework SEO"
    type: external-reference
    anti_pollution_passed: true
    date: 2026-05-17
  - source: "NotebookLM 216c85a8 (UX-Responsividade SMB)"
    type: notebooklm-fonte-ancorada
    anti_pollution_passed: true
    date: 2026-05-21

  contextos_filhos: []
  # ^ artefatos que derivam deste (auto-preenchido pelo /upstream-update quando novo derivado é criado)

  # Validação operacional
  validado_por:
  - projeto: "decon-sistema"
    data: 2026-05-22
    evidence_path: "docs/decisoes/2026-05-22-decon-fase2-evidence.md"
    resultado: pass | fail | partial
  - projeto: "NV-Dev"
    data: 2026-05-22
    evidence_path: "..."
    resultado: pass

  taxa_sucesso: 0.0-1.0
  # ^ auto-calculado a partir de validado_por (passes / total)
  # ^ null se < 3 validações (amostra insuficiente)

  nichos_compativeis:
  # ^ contextos-domínio onde este artefato faz sentido
  - "sistemas-empresariais-br"
  - "saas-multi-tenant"
  nichos_incompativeis:
  - "apps-native-mobile-only"

  # Relações semânticas (complementa o `related:` existente)
  relacoes_semanticas:
    depende_de: ["politicas/escuta-antes-de-agir"]
    complementa: ["packs/marketing/seo"]
    substitui: ["packs/dev/ui-antigo-stub"]
    similar_a: ["packs/dev/ui-mobile-native"]
```

## Migração proposta

### Fase 1 — Schema opcional + 5-10 manifests piloto

- Adicionar `lineage:` em manifests existentes que **já têm origem clara**:
  - `2-PACKS/packs/marketing/seo/` → `lineage.derives_from: [MazyOS]`
  - `2-PACKS/packs/dev/ui-responsivo-smb/` → `lineage.derives_from: [NotebookLM 216c85a8, doc Davi 2026-05-21]`
  - `3-CONTEXTOS-DOMINIO/sistemas-empresariais-br/` → `lineage.derives_from: [NotebookLM 26782f74, doc Davi 2026-05-21]`
  - `3-CONTEXTOS-DOMINIO/ai-ecosystem-strategy/` → `lineage.derives_from: [a16z NotebookLM, ...]`
  - `1-ESQUELETO/politicas/memoria-3-tier.md` → `lineage.derives_from: [framework MIT vendas IA 2026-05-20]`

### Fase 2 — Auto-preenchimento via /upstream-update

Modificar skill `/upstream-update` (já implementada) pra:
- Quando aceitar contribuição, popular `lineage.contextos_filhos` no parent automaticamente
- Validar `lineage.origin` está coerente (`candidate-to-core` durante revisão → vira `upstream` após merge)

### Fase 3 — Validação cruzada

Skill nova (ou extensão `/auditar-projeto`) que cruza:
- Manifests com `lineage.validado_por: []` por > 90 dias → flagging "validação stale"
- Manifests com `taxa_sucesso < 0.5` → flagging "candidate-to-park"
- Manifests cujo `parent` foi promovido pra BATTLE-TESTED mas filho continua STUB → flagging "filho não acompanha"

### Fase 4 — Index consultável (opcional, médio prazo)

Skill `/buscar-contexto` que indexa todos manifests em `index.sqlite` por:
- Topics
- Lineage chain (até N níveis)
- Taxa de sucesso
- Nichos compatíveis

Permite query: "Quais packs FUNCIONAL com lineage que passou por ≥2 projetos diferentes?"

## Riscos identificados

| Risco | Mitigação |
|---|---|
| Schema explode em manifests pequenos (STUB) | Campos opcionais; STUB pode ter só `lineage.origin: fork-local` ou omitir bloco inteiro |
| Manual update de lineage = drift | Auto-preencher via skill (`/upstream-update`, `/refinar-contexto`) sempre que possível |
| `validado_por` vira spam de dogfooding | Restringir a validações com Evidence Bloc explícito; não conta uso casual |
| `taxa_sucesso` < 3 amostras = enganoso | Retornar `null` até ≥3 amostras (não 0.0 que parece "ruim") |
| Conflito com `related:` existente | `related` = links navegacionais (broad). `relacoes_semanticas` = tipos formais (depende_de / complementa / substitui / similar_a). Coexistem. |
| Bagunça nos campos `derives_from` em packs múltiplas fontes | Cada source vira item de array (já contemplado no schema) |

## Critério de aceitação proposto

Spec vira FUNCIONAL quando:

- [ ] Schema `lineage:` documentado em `KODAI/0-INSTALACAO/MANIFEST-SCHEMA.md` (novo)
- [ ] 5-10 manifests piloto têm `lineage:` populado
- [ ] `/upstream-update` modificada pra auto-preencher `contextos_filhos`
- [ ] Testado: contribuição via `/upstream-update` produz lineage chain correto
- [ ] Documentação em `AGENTS.md` (regra-base 7 ou seção nova "Lineage")

## Decisões pendentes (precisam Davi)

- [ ] Concorda com os 4 valores de `lineage.origin`? (upstream / fork-local / candidate-to-core / extension)
- [ ] `taxa_sucesso` null vs 0.0 quando amostra insuficiente — qual?
- [ ] `contextos_filhos` auto-preenchido vs manual?
- [ ] Schema `derives_from` aceita só `external-reference` + `notebooklm-fonte-ancorada` OU lista aberta?
- [ ] `relacoes_semanticas.substitui` deve setar `status: PARKED` no substituído automaticamente?

## Próximos passos

1. **`/brainstorming` com Davi** consumindo este rascunho — destila decisões pendentes
2. **Spec aprovada** em `KODAI/docs/decisoes/2026-MM-DD_lineage-no-manifest.md`
3. **`/break` da spec** em tasks atômicas:
   - Task A: documentar schema em `MANIFEST-SCHEMA.md`
   - Task B: atualizar `_template-pack/manifest.yaml` + `_template-contexto/manifest.yaml`
   - Task C: popular 5-10 manifests piloto
   - Task D: estender `/upstream-update` com auto-preenchimento
   - Task E: Evidence Bloc + atualizar AGENTS.md
4. **`/execute`** + **`/review`** + **`/complete`**

## Cruzamento com outras specs propostas

- **Spec 2 (candidate-to-core):** consome `lineage.origin = candidate-to-core` durante revisão
- **Spec 3 (closed-loop-evolution):** consome `lineage.validado_por` + `taxa_sucesso` pra disparar refinamento
- **Política `memoria-3-tier`:** lineage entra no tier Recall (consultável on-demand)

---

## Disclaimer (regra-base 11)

Este rascunho **NÃO É** spec aprovada. É **proposta inicial** pra acelerar o brainstorming. Davi tem palavra final em:
- Quais campos manter / cortar
- Quais valores enumeráveis (origin, type, etc)
- Quando começar (próxima sessão? após Decon? após primeiro consumidor não-Davi?)
- Se vale a pena agora ou se deve aguardar mais sinal de uso real

Honestidade: zero código rodando, zero validação empírica. É design pra debate.
