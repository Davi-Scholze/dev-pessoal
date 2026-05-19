---
name: absorver-contexto
description: >
  Absorve contexto-domínio (conhecimento de negócio, regras, princípios) de
  projetos consumidores e propõe integração no KOD.AI em 4 buckets
  (equivalente/complementar/novo universal/ideia melhor) — sem copiar verbatim,
  com gate humano por item. Estende o protocolo
  `2-PACKS/_template-pack/REFERENCE-ABSORB.md` (Modo CONTEXT). Use sempre que o
  usuário disser "absorver contexto", "/absorver-contexto", "trazer contexto
  desse projeto pro KODAI", "comparar contextos", "ver o que tem nessa pasta
  que pode virar universal", ou apontar uma pasta com material reutilizável.
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion]
---

# /absorver-contexto — Absorção de contexto-domínio em 4 buckets

> Status: **STUB** (nasce STUB; promove a DRAFT após 1º uso real com Evidence Bloc do `/complete` da spec consumidora — `docs/decisoes/2026-05-18-absorcao-contexto-bidirecional.md`).

## Princípio

KOD.AI cresce ao **aprender do mundo**: quando um projeto consumidor tem contexto valioso (regras, princípios, decisões, padrões), essa skill lê, compara com o que o KODAI já tem, e propõe absorção — sem copiar verbatim, com governance.

Espelha (e reusa) o protocolo `REFERENCE-ABSORB.md` (Modo CONTEXT) que já provou anti-verbatim PASS contra MazyOS em 2026-05-17. A diferença: trabalha com conhecimento de domínio, não com capacidade técnica (pack).

Dois modos:
- **PULL** — usuário aponta um path (`/absorver-contexto <path>`); skill lê, classifica, aplica
- **PROMPT** — usuário invoca sem path (`/absorver-contexto --prompt`); skill gera template pra outra sessão capturar contexto, recebe colado de volta via `inbox-absorvido/`

## Workflow

### Passo 1 — Entrada (modo PULL)

Usuário invoca `/absorver-contexto <path>` (ou via `/atualizar` que sugere proativamente).

Validação imediata:
- Path existe? (`Test-Path` no Windows, `test -d` no Unix)
- Path é read-only ou tem material só de leitura? (regra-base **2: raw sagrado** — não modificar fonte)
- Há manifests no destino (`3-CONTEXTOS-DOMINIO/`)? Lista pra cruzar com idempotência (Passo 4)

Se modo PROMPT: ver seção [Modo PROMPT] abaixo. O resto do workflow assume modo PULL.

### Passo 2 — Pre-flight  ▸  **[GATE 1]**

Aplica a **Fase 0** do `REFERENCE-ABSORB.md` (Modo CONTEXT):
- Path da fonte está acessível e íntegro?
- `3-CONTEXTOS-DOMINIO/` no KOD.AI tem estrutura íntegra (não vazio, não corrompido)?
- Davi aprova escopo: "vou ler N arquivos em `<path>` e cruzar com M contextos KOD.AI. Confirma?"

### Passo 3 — Inventário (read-only)

Aplica **Fase 1** do `REFERENCE-ABSORB.md`. Inventaria sem modificar:

1. **Glob recursivo `*.md`** no path apontado
2. Pra cada `.md` encontrado:
   - Lê primeiras N linhas pra extrair título (H1 ou nome do arquivo) + 1-2 linhas de resumo
   - Calcula `sha256` do conteúdo completo
   - Registra path absoluto + título + hash + tamanho
3. Pra arquivos não-`.md`:
   - Avisa explicitamente: `⚠ Skipping <file> (não-markdown — fora de escopo desta spec)`
   - Não tenta processar
4. **Não modifica fonte** (raw sagrado)

Output do inventário em **dois formatos**:

**Tabela markdown (UI pro usuário ler):**

```markdown
## Inventário — <path>

| # | Arquivo | Título | Tamanho | Hash (8 chars) |
|---|---------|--------|---------|----------------|
| 1 | `_negocio/contextos/01-email-smtp-transacional.md` | "E-mail SMTP transacional" | 4.2KB | a3f4d2e1 |
| 2 | `regras/01-ia-nao-pirar.md` | "IA não pirar" | 1.8KB | f7b2c901 |
| ... |
```

**YAML estruturado (interno, consumido pelo Passo 4 da Task 03):**

```yaml
inventory:
  source_path: <path absoluto>
  scanned_at: <ISO timestamp>
  items:
    - path: _negocio/contextos/01-email-smtp-transacional.md
      title: "E-mail SMTP transacional"
      size_bytes: 4200
      content_hash: sha256:a3f4d2e1...
      content_excerpt: |
        Primeiras ~5 linhas do conteúdo pra preview...
    - ...
  skipped:
    - path: assets/logo.png
      reason: non-markdown
```

### Passo 4 — Classificar em 4 buckets  ▸  **[GATE 2]**

Aplica **Fase 2-CONTEXT** do `REFERENCE-ABSORB.md`. Compara cada item do inventário com `3-CONTEXTOS-DOMINIO/` do KODAI usando heurística estratificada (D3=B confirmado).

#### 4.1 — Indexar contextos KODAI existentes

Antes de classificar, monta índice in-memory dos contextos KODAI:

```yaml
kodai_contexts:
  - slug: <nome-da-pasta>
    titles:                          # H1 + H2 do README.md do contexto
      - <título principal>
      - <subtítulo 1>
    principles:                       # listas numeradas extraídas
      - <princípio 1>
      - ...
    manifest:                         # se já existe (idempotência)
      absorbed_from:
        path: ...
        content_hash: ...
```

Glob: `3-CONTEXTOS-DOMINIO/*/README.md` (ignora `_template-contexto/`).

#### 4.2 — Classificação primária (heurística rápida)

Pra cada item do inventário (Passo 3), aplica em ordem:

**a) Idempotência (sempre primeiro):**
- Calcula match com manifests existentes
- Se `content_hash` idêntico → marca `(já absorvido em <data>) — skip` e PULA pro próximo item
- Se `absorbed_from.path` igual mas hash diferente → marca `(origem modificada desde <data>)` e segue classificando normal pra propor re-absorção

**b) Comparação de tópicos:**
- Extrai do item externo: título (H1 ou nome arquivo), top-3 headers H2
- Compara com `titles` de cada contexto KODAI usando matching por palavra-chave (case-insensitive, ignora artigos/preposições)
- **Score de sobreposição**: 0-100% (palavras comuns / total palavras únicas)

**c) Comparação de princípios** (se item tem lista numerada de princípios):
- Extrai princípios numerados do item (`^\d+\.\s+.+` ou `^- .+` se H2 = "Princípios")
- Compara com `principles` do contexto KODAI mais semelhante por tópico
- **Score de princípios**: 0-100% (princípios match / total princípios externo)

**d) Score combinado**: `0.7 * topic_score + 0.3 * principles_score`

#### 4.3 — Atribuição inicial de bucket (thresholds)

Com base no **score combinado** com o contexto KODAI mais semelhante:

| Score combinado | Bucket inicial | Ação |
|---|---|---|
| ≥ **80%** | **(A) Equivalente** | KODAI já cobre — propõe SKIP |
| 30-79% | **(B) Complementar** | KODAI tem o tópico — propõe MERGE |
| 5-29% | **(C/D ambíguo)** | escalation → LLM fallback (4.4) |
| < 5% | **(C) Novo universal** | KODAI não tem nada similar — propõe CRIAR |

Threshold 80% é **configurável** (futuro: arquivo `.kodai-absorption-config.yaml`). Inicial baseado em heurística — ajustar conforme experiência.

**Caso especial bucket D (ideia melhor):** detectado em 4.4 (LLM fallback) — heurística pura não consegue determinar "superior". Se `score ≥ 80%` mas item externo tem MAIS princípios numerados que o KODAI equivalente OU exemplos mais recentes (data > KODAI), escalation → LLM.

#### 4.4 — LLM fallback (apenas itens ambíguos)

Para itens marcados como `(C/D ambíguo)` em 4.3, ou bucket A com sinais de superioridade, pergunta ao próprio Claude com prompt explícito:

```
Tenho um item externo:
---
<conteúdo do item externo, max 500 palavras>
---

E um contexto KODAI possivelmente relacionado:
---
<conteúdo do README.md do contexto KODAI, max 500 palavras>
---

Classifique em UM bucket:
- (A) Equivalente — KODAI já cobre com mesma profundidade
- (B) Complementar — KODAI tem o tópico mas externo adiciona ângulo/exemplo/regra (descreva o ângulo)
- (C) Novo universal — KODAI não tem nada sobre esse tópico específico
- (D) Ideia melhor — KODAI tem mas externo tem versão superior (descreva o que é superior)

Responda em YAML:
bucket: <A|B|C|D>
confidence: <0.0-1.0>
reasoning: |
  <1-3 frases>
```

Output do LLM merged no resultado da heurística.

#### 4.5 — AskUserQuestion quando 100% ambíguo

Se após 4.4 a confidence do LLM for < 0.5 OU contradizir heurística forte (ex: heurística diz A com score 90%, LLM diz C), invoca:

```
AskUserQuestion: "Item <título> tem classificação ambígua. Bucket sugerido?"
Opções:
- A — equivalente (skip)
- B — complementar (merge)
- C — novo universal (criar)
- D — ideia melhor (substituir)
```

Davi decide.

#### 4.6 — Output: lista plana estruturada (formato A)

Após classificar todos os itens, produz **lista plana estruturada** consumível pelo Passo 5 (storage):

```yaml
classification:
  scanned_at: <ISO timestamp>
  total_items: <N>
  buckets:
    A: <count>
    B: <count>
    C: <count>
    D: <count>
    skip_idempotent: <count>
  items:
    - source_path: _negocio/contextos/05-sistema-de-testes-universal.md
      source_hash: sha256:...
      bucket: B
      target_kodai_context: 1-ESQUELETO/metodologias/testes.md
      score: 0.45
      confidence: heuristic
      reasoning: "Tópico 'testes' presente em ambos; externo adiciona seção sobre testes de regressão visual"
      proposed_action: merge_section
    - source_path: regras/02-alerta-cobrancas-recorrentes.md
      source_hash: sha256:...
      bucket: C
      target_kodai_context: null
      score: 0.02
      confidence: heuristic
      reasoning: "Nenhum contexto KODAI cobre alertas de cobranças recorrentes"
      proposed_action: create_new
      proposed_slug: alertas-cobrancas-recorrentes
    - ...
```

#### 4.7 — Apresentação ao Davi (gate humano)

Renderiza tabela markdown amigável + lista plana em YAML pra debug:

```markdown
## Triagem de Absorção — <source_path>

**Resumo:** 18 itens — A:2 (skip) · B:5 (merge) · C:9 (criar) · D:2 (substituir) · skip-idempotent:0

### Bucket A — Equivalente (skip)
| # | Item | Match KODAI | Score |
|---|------|-------------|-------|
| 1 | ... | ... | 92% |

### Bucket B — Complementar (merge)
...

### Bucket C — Novo universal (criar)
...

### Bucket D — Ideia melhor (substituir + backup)
...
```

**Davi aprova item por item** (AskUserQuestion ou texto livre tipo "B-1 OK, B-2 muda pra C, C-3 skip, resto OK").

Resultado: lista filtrada do que vai pro Passo 5.

### Passo 5 — Aplicar por bucket  ▸  **[GATE 3]**

Aplica **Fase 3** do `REFERENCE-ABSORB.md` (reimplementação) com lógica por bucket. Iteração item por item, **sempre commit+push imediato após cada item** (preferência Davi — não batch).

#### 5.1 — Bucket A (equivalente) — SKIP

Não cria nada. Não modifica nada. Apenas registra em log:

```yaml
- source_path: <path>
  bucket: A
  action: skipped
  reason: equivalent_to_existing
  matched_kodai: <slug>
```

Avança pro próximo item.

#### 5.2 — Bucket B (complementar) — MERGE

1. **Identifica seção alvo no contexto KODAI existente:**
   - LLM ou heurística determina onde encaixar (qual H2 do README.md do contexto KODAI matched)
   - Gera proposta de localização (`<contexto>/README.md` linha X)

2. **Reformula o trecho externo na voz KOD.AI** (regra fechar-arquivo-e-escrever do REFERENCE-ABSORB Fase 3):
   - Lê item externo UMA VEZ
   - Fecha
   - Escreve seção nova de zero baseada no entendimento (não cópia)

3. **Gera diff visível:**
   ```diff
   --- 3-CONTEXTOS-DOMINIO/<slug>/README.md
   +++ proposta de merge
   @@ -42,7 +42,15 @@
    ## Princípios
    ...
   +
   +### Ângulo adicional absorvido de <source>
   +
   +<conteúdo reformulado>
   ```

4. **Davi aprova diff** (AskUserQuestion: aceitar / editar / rejeitar)

5. **Aplica:**
   - Edit no `README.md` do contexto KODAI
   - **Atualiza** `manifest.yaml` do contexto adicionando entrada em `merged_inputs`:
     ```yaml
     merged_inputs:
       - from: <source_path>
         date: <YYYY-MM-DD>
         content_hash: sha256:<hash>
         section_added: <H2 título>
         anti_verbatim: { ngram: PASS, five_nos: PASS }
     ```

6. **Commit + push imediato:** `feat(_negocio/contextos/<slug>): merge ângulo absorvido de <source-name>`

#### 5.3 — Bucket C (novo universal) — CRIA PASTA NOVA

1. **Determina slug da nova pasta:**
   - Primary: slug do H1 do conteúdo externo (D-extra-2 = B confirmado)
     - Ex: "# Sistema de Testes Universal" → `sistema-de-testes-universal`
     - Lowercase, espaços viram `-`, remove pontuação, max 50 chars
   - Fallback: slug do nome do arquivo origem
     - Ex: `01-email-smtp-transacional.md` → `email-smtp-transacional`
   - Se ambos colidem com pasta existente em `3-CONTEXTOS-DOMINIO/`: append `-<N>` ou pergunta ao Davi

2. **Cria estrutura usando template:**
   ```bash
   # Reusa /criar-contexto internamente OU copia template
   cp -r 3-CONTEXTOS-DOMINIO/_template-contexto/ 3-CONTEXTOS-DOMINIO/<slug>/
   ```

3. **Reformula conteúdo externo na voz KOD.AI:**
   - Lê item externo UMA VEZ
   - Fecha
   - Escreve `<slug>/README.md` de zero baseado no entendimento
   - Re-organiza estrutura (não copia H1/H2/listas idênticas)
   - Re-expressa exemplos (cria paralelos, não copia)
   - Remove menções de marca/empresa da fonte

4. **Cria `manifest.yaml`:**
   ```yaml
   absorved_from:
     path: <caminho absoluto da fonte>
     date: <YYYY-MM-DD>
     content_hash: sha256:<hash>
     original_author: <opcional, se mencionado>
   absorbed_at: <ISO timestamp local com offset>
   bucket: C
   status: STUB
   anti_verbatim:
     ngram_check: PASS
     five_nos_check: PASS
   notes: |
     Pasta criada via /absorver-contexto. Conteúdo reformulado a partir do
     entendimento; estrutura re-organizada; exemplos paralelos.
   ```

5. **Davi aprova conteúdo** (AskUserQuestion: aceitar / editar / rejeitar)

6. **Aplica e commit + push:** `feat(_negocio/contextos/<slug>): novo contexto absorvido de <source-name>`

7. (Passo 7 vai gerar `EXPAND-PROMPTS.md` automaticamente após este)

#### 5.4 — Bucket D (ideia melhor) — SUBSTITUI COM BACKUP

1. **Identifica contexto KODAI alvo** (do output da classificação Passo 4)

2. **Cria backup ANTES de tocar** (D-extra-1 = A: sempre backup):
   ```bash
   mkdir -p 3-CONTEXTOS-DOMINIO/<slug>/_backup/
   cp 3-CONTEXTOS-DOMINIO/<slug>/README.md \
      3-CONTEXTOS-DOMINIO/<slug>/_backup/<YYYY-MM-DD>-README-pre-substituicao.md
   ```

3. **Reformula conteúdo externo na voz KOD.AI** (mesma regra do bucket C):
   - Lê uma vez, fecha, reescreve

4. **Gera diff de substituição (antigo → novo):**
   ```
   3 arquivos alterados:
   - 3-CONTEXTOS-DOMINIO/<slug>/_backup/<data>-README-pre-substituicao.md (NOVO)
   - 3-CONTEXTOS-DOMINIO/<slug>/README.md (SUBSTITUÍDO)
   - 3-CONTEXTOS-DOMINIO/<slug>/manifest.yaml (ATUALIZADO bucket=D + nota)
   ```

5. **Davi aprova substituição** (extra caution: bucket D é o mais agressivo)

6. **Aplica:**
   - Substitui `README.md`
   - Atualiza `manifest.yaml`:
     ```yaml
     bucket: D
     superseded_at: <ISO timestamp>
     previous_backup: _backup/<YYYY-MM-DD>-README-pre-substituicao.md
     replacement_reason: |
       <Por que a versão externa é superior — vindo da reasoning do LLM Passo 4.4>
     ```

7. **Commit + push imediato:** `refactor(_negocio/contextos/<slug>): substitui por versão superior absorvida de <source-name>`

#### 5.5 — Tratamento de itens marcados "(origem modificada)"

Da idempotência (Passo 4.2.a): se hash mudou mas path origem é o mesmo, item aparece marcado.

Davi decide explicitamente:
- **Re-absorver:** trata como item novo, mas guarda referência ao manifest anterior em `previous_absorptions`
- **Skip:** mantém estado anterior, marca em log "skipped (origin changed but user opted out)"

#### 5.6 — Output final do Passo 5

Resultado consolidado:

```yaml
applied:
  scanned_at: <ISO timestamp>
  total_input: <N>
  applied_by_bucket:
    A: <count> (skipped)
    B: <count> (merged)
    C: <count> (created)
    D: <count> (replaced)
  skipped_idempotent: <count>
  skipped_user_choice: <count>
  manifests_created: [<paths>]
  manifests_updated: [<paths>]
  backups_created: [<paths>]
  commits: [<sha-list>]
```

**Reformulação não-verbatim:** TODA reformulação segue regra do `REFERENCE-ABSORB.md` Fase 3 — lê origem UMA VEZ, fecha, escreve do entendimento. Não deixar fonte aberta lado a lado.

### Passo 6 — Anti-verbatim PASS  ▸  **[GATE 4]**

Aplica **Fase 5** do `REFERENCE-ABSORB.md` (Modo CONTEXT):

1. **Primário — n-gram ≥ 5 palavras:** busca sequências de ≥5 palavras consecutivas idênticas entre o absorvido e a fonte. PASS = 0 matches.
2. **Secundário — 5 NÃOs adaptados a contexto:** checklist do `REFERENCE-ABSORB.md` (NÃO copia tom literal, NÃO mantém marca, NÃO copia exemplos verbatim, NÃO copia estrutura idêntica, NÃO atribui claim da fonte ao KOD.AI). Qualquer "sim" = FAIL.

Se FAIL: bloqueia Passo 7. Volta ao Passo 5 e reescreve trechos identificados. Não maquia.

Se PASS: registra no `manifest.yaml` de cada item bucket C/D.

### Passo 7 — Expansão (apenas bucket C)

Para cada item absorvido como **bucket C** (novo universal), gera automaticamente `EXPAND-PROMPTS.md` ao lado do `manifest.yaml`. **NÃO gera pra buckets A, B ou D** (D6=B confirmado).

#### 7.1 — Quando gerar

Imediatamente após o storage bucket C (Passo 5.3) completar — antes do commit. Faz parte do mesmo passo de criação.

#### 7.2 — Estrutura do EXPAND-PROMPTS.md

Arquivo em `3-CONTEXTOS-DOMINIO/<slug>/EXPAND-PROMPTS.md`:

```markdown
# Prompts de Expansão — <título do contexto>

> Gerado automaticamente pelo `/absorver-contexto` em <data>.
> Rode quando quiser **expandir** esse contexto com fontes externas atuais.

---

## 🔍 Prompt 1 — Deep Search Gemini

> Cole no Deep Search do Gemini. Resultado: expansão com fontes acadêmicas,
> casos da indústria e tendências.

```
# Deep Search — <título do contexto>

**Tópico central:** <título do contexto + 1 linha de descrição>

**O que o KOD.AI já capturou (não repetir, expandir além):**

<lista dos princípios extraídos do README.md do contexto absorvido>

**Pesquisar e retornar:**

1. **Fontes acadêmicas e papers recentes** (últimos 2 anos) que abordam esse tópico
2. **Best practices da indústria** — referências: empresas reconhecidas, cases públicos
3. **Casos de uso reais e antipatterns** — exemplos concretos do que funciona e do que falha
4. **Métricas e KPIs aplicáveis** — como medir adoção/sucesso desse tópico
5. **Tendências futuras** — próximos 12-24 meses, mudanças regulatórias, tech shifts
6. **Críticas/limitações** — o que esse tópico NÃO resolve, onde costuma falhar

**Formato de saída desejado:**
Markdown estruturado por seção, pronto pra absorção. Inclua links das fontes
quando possível. Resposta em ~1500-2500 palavras.
```

---

## 📚 Prompt 2 — NotebookLM

> Cole no NotebookLM com fontes carregadas. Resultado: síntese cruzada
> de múltiplas perspectivas.

```
# NotebookLM — <título do contexto>

**Contexto inicial (carregar como fonte 1):**
- Arquivo: `<path do README.md absorvido>`
- Resumo: <1 frase>

**Sugestões de outras fontes pra carregar no notebook:**
- <Sugestão 1 — ex: livro canônico do tema, link>
- <Sugestão 2 — ex: paper seminal, link>
- <Sugestão 3 — ex: case-study público, link>
- <Sugestão 4 — ex: documentação oficial de ferramenta, link>

**Pergunta-chave principal:**
"Comparando as N fontes carregadas, quais princípios são consenso?
Quais divergências existem? O que minha fonte original (KOD.AI) está
deixando passar ou simplificando demais?"

**Perguntas secundárias (rode após a principal):**
- "Quais perguntas não-óbvias um expert dessa área faria sobre minha fonte?"
- "Liste 3 contraexemplos da minha tese principal."
- "Sintetize em 5-10 bullets o estado da arte atual."
- "Que skills/contextos universais o KODAI deveria ter pra dominar esse tópico?"

**Formato de saída:** markdown estruturado, com citações das fontes
(formato [Fonte N: trecho relevante]).
```

---

## 🔁 Re-absorver após expansão

Quando você tiver resultado dos prompts acima, salve a resposta em:
`<este-diretório>/expansao-<YYYY-MM-DD>.md`

Então rode:
`/absorver-contexto --expand <este-diretório>`

A skill faz **merge** das novas informações ao `README.md` deste contexto,
mantendo o anti-verbatim PASS e atualizando o `manifest.yaml.expansions[]`.

---

## Histórico de expansões

| Data | Fonte de expansão | Anti-verbatim |
|------|-------------------|---------------|
| _(nada ainda)_ | — | — |
```

#### 7.3 — Geração contextual (preenche placeholders)

Skill substitui placeholders no template acima com:
- `<título do contexto>` ← H1 do README absorvido
- `<lista dos princípios>` ← extrai listas numeradas/bulleted do README absorvido
- `<sugestões de fontes>` ← LLM gera 3-5 sugestões plausíveis baseado no tema (ex: pra "sistema de testes universal" sugere "Test-Driven Development by Kent Beck", "xUnit Test Patterns", "Google Testing Blog")
- `<path do README.md>` ← path local absoluto

#### 7.4 — Modo `--expand` (re-absorver após expansão)

Quando Davi rodar `/absorver-contexto --expand <pasta-do-contexto>/`:

1. Lê `manifest.yaml` da pasta — identifica que é re-expansão (não primeira absorção)
2. Lê o arquivo `expansao-<data>.md` mais recente (ou último se houver vários)
3. Aplica heurística do Passo 4 mas com **comparação só contra o README.md atual** (não contra outros contextos KODAI — escopo é refinamento)
4. Resultado: classifica trechos da expansão como:
   - Já cobertos (skip)
   - Novos (adicionar ao README)
   - Refinamentos (substituir trecho com versão melhor)
5. Apresenta diff ao Davi (gate humano)
6. Aplica + atualiza `manifest.yaml.expansions[]`:
   ```yaml
   expansions:
     - date: <YYYY-MM-DD>
       source_path: expansao-<YYYY-MM-DD>.md
       additions: <count>
       refinements: <count>
       anti_verbatim: { ngram: PASS, five_nos: PASS }
   ```
7. Adiciona linha em "Histórico de expansões" do EXPAND-PROMPTS.md
8. Commit + push

#### 7.5 — Output do Passo 7

```yaml
expansion_prompts_generated:
  - context_slug: <slug>
    path: 3-CONTEXTOS-DOMINIO/<slug>/EXPAND-PROMPTS.md
    deep_search_prompt: <preview 200 chars>
    notebooklm_prompt: <preview 200 chars>
```

#### 7.6 — Skills bundled relevantes (item #9 do roadmap)

Quando o roadmap item #9 (KOD.AI all-in-one bundle) estiver implementado, esta task pode delegar a:
- `/notebooklm` — invocação direta sem precisar copiar/colar prompt (futuro)
- Skill futura de auto-pesquisa via API Gemini

Por ora: usuário roda manual.

### Passo 8 — Fechamento  ▸  **[GATE 5]**

Aplica **Fase 6** do `REFERENCE-ABSORB.md`:

1. Atualiza `KODAI/CHANGELOG.md` (entrada "[Não lançado]" ou release)
2. Atualiza `3-CONTEXTOS-DOMINIO/dominios-ativos.md` se cliente consumidor tiver
3. **Commit + push imediato** (preferência Davi 2026-05-18: ver `Documents/Davi/CLAUDE.md` Extensões locais)
4. Reporta resumo ao Davi:
   - Buckets aplicados (contagem por A/B/C/D)
   - Anti-verbatim PASS confirmado
   - EXPAND-PROMPTS gerados (qtd)
   - Próximas ações sugeridas

## Modo PROMPT

Quando `/absorver-contexto --prompt` é invocado (sem path), skill atua como **gerador de template** pra outra sessão capturar contexto. Útil quando o projeto-alvo está em outra pasta (outra sessão do Claude Code) e o Davi quer extrair conhecimento sem migrar arquivos.

### Fluxo end-to-end (Modo PROMPT)

```
1. Davi: /absorver-contexto --prompt
2. Skill: gera template pronto pra colar
3. Davi: copia, abre outra sessão Claude Code no projeto-alvo, cola
4. IA da outra sessão: produz resposta estruturada (markdown)
5. Davi: copia a resposta e cola em arquivo dentro de inbox-absorvido/
6. Skill (sessão original): detecta novo arquivo no inbox-absorvido/, processa
   como inventário (entra em Passo 4 do modo PULL: classificar, aplicar, etc)
```

### Passo P1 — Gerar template

Quando invocada com `--prompt`, skill imprime template formatado (markdown blockquote) pronto pra colar:

```
COPIE E COLE em uma sessão do Claude Code aberta no projeto que você quer
absorver contexto:

═══════════════════════════════════════════════════════════════════

> Você é um agente do KOD.AI vindo absorver contexto deste projeto pra
> uma biblioteca universal de conhecimento. Preciso que você liste
> todos os contextos UNIVERSAIS (não específicos a este projeto) que
> você usa: regras, princípios, boas práticas, decisões arquiteturais,
> padrões de UI/UX, processos, convenções de código, etc.
>
> Para cada um, descreva:
> - **Nome/tema** (uma linha, descritivo)
> - **Motivação** (por que existe, qual problema resolve)
> - **Princípios principais** (lista numerada, 3-7 itens)
> - **Exemplos concretos** (1-3 exemplos curtos)
> - **Origem** (quem capturou, quando, em qual decisão se souber)
>
> **Formato:** markdown puro, uma seção **H2** por contexto.
> NÃO inclua:
> - Código de implementação específico (só princípios)
> - Coisas estritamente específicas a este projeto/sistema
> - Credenciais, paths absolutos, dados pessoais
>
> Quando terminar, retorne a resposta completa em UM bloco markdown que
> eu possa copiar inteiro.

═══════════════════════════════════════════════════════════════════

Depois que a outra sessão responder:

1. Copia a resposta completa
2. Cola em um arquivo NOVO dentro de:
   <pasta-atual>/inbox-absorvido/<YYYY-MM-DD>-<tema>.md
3. Volta aqui e diga "absorver inbox-absorvido/<arquivo>"
   OU rode /absorver-contexto <pasta>/inbox-absorvido/<arquivo>.md
```

### Passo P2 — Recepção via inbox-absorvido/

Davi cria arquivo em `inbox-absorvido/<YYYY-MM-DD>-<tema>.md` colando o output da outra sessão. Estrutura recomendada da pasta:

```
inbox-absorvido/
├── README.md           # explica como funciona (gerado uma vez pela skill)
├── 2026-05-18-tema-x.md
├── 2026-05-19-tema-y.md
└── _processados/       # após absorção bem-sucedida, arquivo move pra cá
    └── 2026-05-15-tema-z.md
```

Cria a pasta automaticamente na primeira invocação modo PROMPT se não existir.

### Passo P3 — Processar como inventário

Quando Davi aponta o arquivo (ou roda novamente `/absorver-contexto inbox-absorvido/<arquivo>.md`):

1. Lê o arquivo
2. **Parsing especial:** o arquivo NÃO é uma pasta com múltiplos `.md` — é UM arquivo com múltiplas seções H2, cada uma sendo um "item" virtual
3. **Para cada H2:**
   - Extrai título (texto após `## `)
   - Extrai conteúdo da seção
   - Calcula hash do conteúdo (sha256)
   - Trata como item de inventário virtual
4. Output: mesmo formato YAML do Passo 3 (lista de itens), mas com `source_path` apontando pro arquivo + `source_section` indicando o H2
5. **A partir daqui, segue fluxo idêntico ao modo PULL** (Passo 4 classifica, Passo 5 aplica, etc)

### Passo P4 — Pós-processamento

Após absorção bem-sucedida (Passo 8 do workflow PULL):

1. Move o arquivo de `inbox-absorvido/<arquivo>.md` pra `inbox-absorvido/_processados/<arquivo>.md`
2. Adiciona linha no `inbox-absorvido/README.md` registrando processamento
3. Em caso de falha (FAIL anti-verbatim ou Davi recusou tudo): permanece no inbox raiz com sufixo `.<status>` (`.failed-anti-verbatim`, `.rejected-user`)

### Vantagens vs PULL direto

- **Captura de conhecimento implícito:** outra IA pode extrair contextos que NÃO estão escritos em arquivos no projeto (vivem só na cabeça das pessoas via conversas com a IA)
- **Sanitização automática:** outra sessão filtra dados específicos do projeto antes de mandar
- **Audit trail:** o `inbox-absorvido/` documenta o "input cru" antes da absorção pra revisão futura

### Limitações

- Depende de outra sessão IA estar disponível
- Pode perder fidelidade se a outra IA reformular demais
- Davi tem que rodar manualmente em duas sessões (não é 100% automatizado)

## Regras

1. **Raw sagrado:** não modifica fonte (regra-base 2)
2. **Anti-verbatim obrigatório:** PASS antes de fechar (regra-base 10)
3. **Gate humano por item:** nunca batch (regra-base 7)
4. **Idempotente:** re-runs marcam "já absorvido" via hash sha256
5. **LGPD:** se contexto absorvido tem dado pessoal/lead, marcar com flag `lgpd-sensitive: true` no manifest
6. **Honestidade:** sem claims de "absorvido com sucesso" sem PASS no anti-verbatim
7. **Commit + push imediato** ao fechar (preferência local Davi)

## Saída esperada (manifest.yaml)

Para cada item bucket C/D em `3-CONTEXTOS-DOMINIO/<slug>/manifest.yaml`:

```yaml
absorved_from:
  path: c:\Users\Usuario\Documents\<projeto>\contextos\<arquivo>.md
  date: 2026-MM-DD
  content_hash: sha256:<hash>
  original_author: <opcional>
absorbed_at: <ISO timestamp>
bucket: <C | D>
status: <STUB | DRAFT | FUNCIONAL>
anti_verbatim:
  ngram_check: PASS
  five_nos_check: PASS
notes: |
  <Reformulação aplicada, governance somada, etc>
```

## Skills relacionadas

- **`/atualizar`** — sugere absorção proativamente via Passo 5 (D2=B auto-descoberta restrita em pastas-irmãs + anti-spam via `.absorcao-history.yaml`)
- **`/criar-contexto`** — invocada internamente pelo bucket C (cria pasta com template `3-CONTEXTOS-DOMINIO/_template-contexto/`)
- **`/absorver-referencia`** — irmã pra absorver pack/skill (não contexto)
- **`/atualizar-kodai`** — atualização interna; não relacionada a absorção externa

## Quando NÃO usar

- Contexto super-específico de um único projeto que **não é reutilizável** universalmente (mantenha no projeto, não vire universal)
- Material que viola licença/autoria (sempre verificar antes)
- Conteúdo proprietário de cliente (entra como contexto-cliente via `/capturar-contexto-cliente`, não como universal)
- Código de implementação (vai pra `/absorver-referencia` que cria pack)
