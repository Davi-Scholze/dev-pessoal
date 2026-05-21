---
tipo: analise-decisao
data: 2026-05-21
operador: claude-opus-4-7
decisao_origem: C2 do Q&A 2026-05-21
status: recomendacao-teste-controlado
related:
  - "../../KODAI/docs/STRATEGIC-NORTH.md (Spec v1.2 menciona)"
  - "../MAPA.md (registro de adocao)"
---

# Análise Aprofundada — Obsidian no KOD.AI

> Resposta C2 de Davi: "estou inclinado a testar... e acho que pode nos ensinar muito".
> Pediu análise aprofundada antes de decidir.

## Pergunta-mãe

KOD.AI tem **67 skills + 8 rules + 10 packs + 3 contextos-domínio + 79 NotebookLMs** + 8 políticas universais + N artefatos. **Filesystem + grep funcionam, mas a escala já está alta.** Obsidian agrega real ou é distração?

## Vantagens reais (concretas no contexto KOD.AI)

### 1. Graph View — navegar a rede de `related:` + `[[links]]` visualmente

KOD.AI já usa `related:` em manifests e `[[name]]` em memórias. Obsidian **renderiza isso como grafo navegável**. Pra explorar:

- "Quais packs cruzam com `sistemas-empresariais-br`?" → grafo mostra cluster
- "Qual o footprint de `politicas/escuta-antes-de-agir`?" → quem cita
- "Manifest órfão (zero `related:` apontando pra ele)?" → nodo isolado no grafo

**Hoje:** isso exige `grep -r "sistemas-empresariais"` + leitura mental. Lento + erro humano.

### 2. Backlinks automáticos

Obsidian mostra "Linked Mentions" em cada arquivo — quem cita este arquivo. Sem precisar buscar manual.

**Hoje:** `grep -r "ui-responsivo-smb"` toda vez que quer saber dependências.

### 3. Dataview (plugin) — queries SQL-like sobre manifests YAML

```dataview
TABLE status, version, lineage.taxa_sucesso
FROM "2-PACKS/packs"
WHERE status = "DRAFT"
SORT lineage.taxa_sucesso DESC
```

**Hoje:** exige script Python ad-hoc pra cada query similar.

### 4. Templates Mustache nativos

Criar pack/contexto novo = um clique no template. KOD.AI tem skills `/criar-pack`, `/criar-contexto` que fazem isso programaticamente. Obsidian dá interface visual + completion.

**Útil pra:** Davi criar coisas rápido sem chamar skill toda vez.

### 5. Hot reload + preview

Editar markdown e ver preview lado-a-lado. **Útil pra docs longos** (DOMINIO.md de 10 seções) — ver hierarquia + cross-refs em tempo real.

### 6. Search robusto

Obsidian Search aceita queries booleanas, regex, tag filters, dates. Mais expressivo que grep puro pra exploração ad-hoc.

## Desvantagens reais (concretas)

### 1. Vendor lock-in **suave** (não duro)

- **Markdown vanilla** funciona em qualquer editor — não há lock-in real do conteúdo
- **Frontmatter YAML** idem
- **Risco:** plugins que reescrevem arquivos (ex: Templater avançado, Excalidraw embeds com formato proprietário)

**Como evitar:** restringir plugins ao mínimo essencial (Graph view, Backlinks, Dataview read-only). Banir plugins que mudam estrutura do filesystem.

### 2. `.obsidian/` config local pode poluir repo

Cada usuário tem preferências (workspace layout, plugins ativados). Comitar `.obsidian/` no repo causa conflito entre usuários (Davi, Sasa, IA).

**Como evitar:** `.obsidian/` no `.gitignore`. Cada dev tem config local. Eventualmente commitar APENAS `.obsidian/community-plugins.json` (lista de plugins recomendados) — pra outros consumidores saberem o stack.

### 3. Curva de configuração inicial

Obsidian "fora da caixa" é minimal. Pra rodar Dataview + bons templates + atalhos, leva 1-3h de setup.

**Risco:** Davi gasta horas configurando em vez de produzir. **Como evitar:** começar com setup MÍNIMO (só Graph + Backlinks built-in), expandir só quando necessidade aparecer.

### 4. Performance em vault grande

Vault com 1000+ arquivos pode lentificar Graph view (renderização). Hoje KOD.AI tem ~300 arquivos `.md` — bom. Mas vai crescer.

**Como evitar:** monitorar; se travar, restringir Graph view a subpasta específica.

### 5. Pode virar "outro lugar pra olhar"

KOD.AI já tem: filesystem + git + memórias + MAPA + PENDENCIAS + handoff. **Obsidian é mais um layer.** Risco: Davi olha em 1 lugar quando devia olhar em outro.

**Como evitar:** Obsidian é **viewer**, não source-of-truth. Filesystem continua canônico. `MAPA.md` continua "entrada rápida". Obsidian = "exploração visual sob demanda".

### 6. Não substitui Skills KOD.AI

Skills (`/atualizar-kodai`, `/auditar-projeto`, `/upstream-update`) são **lógica executável** — Obsidian não roda código. Obsidian acelera **leitura/navegação**, não operação.

## O que aprende com testar (decisão Davi: "pode nos ensinar muito")

### Hipóteses testáveis em 2 semanas

1. **H1:** "Graph view revela dependências escondidas que grep não mostra fácil"
   - Teste: abrir vault, identificar 3 cross-refs surpresas (que Davi não esperava)
2. **H2:** "Dataview query economiza ≥30min/semana de scripts ad-hoc"
   - Teste: contar quantas queries Dataview Davi roda vs quantos scripts Python ad-hoc evitou
3. **H3:** "Templates Obsidian aceleram criação de pack/contexto novo"
   - Teste: criar 1 contexto-domínio com template Obsidian. Comparar tempo vs `/criar-contexto` skill
4. **H4:** "Backlinks evitam refactor que quebra references"
   - Teste: renomear 1 política, ver se Obsidian flagga arquivos que citavam
5. **H5:** "Obsidian funciona OK com 8 plugins minimalistas"
   - Teste: instalar Graph view, Backlinks, Dataview, Templater. Performance OK?

### Sinal verde após 2 semanas

Se ≥3 das 5 hipóteses validarem positivamente E zero plugin reescrever arquivo → **adoção formal**.

### Sinal vermelho

- Plugin reescreveu arquivo de forma incompatível com KOD.AI schema
- Performance degradou (>2s pra abrir grafo)
- Davi passou >5h configurando e <1h produzindo
- Filesystem virou inconsistente entre o que Obsidian salva e o que IA lê

→ **Não adotar** + documentar aprendizados pra Specs futuras (lineage / candidate-to-core ganham requisitos).

## Recomendação técnica (minha análise)

### Sim, testar

**Por quê:**
- Escala atual do KOD.AI (300+ arquivos) **justifica** ferramenta visual
- Investimento mínimo (Obsidian = grátis + 1h setup)
- Risco baixo (markdown vanilla é portável)
- Aprendizado provável valioso (mesmo se decidir não adotar, ensina sobre graph thinking)

### Mas com regras claras

**Regras do teste (2 semanas):**

1. **Markdown vanilla SÓ** — sem plugins que mudam formato de arquivo
2. **Plugins permitidos (whitelist):** Graph View (built-in), Backlinks (built-in), Dataview (read-only), Templater (cuidadoso), Search
3. **Plugins proibidos (blacklist):**
   - Excalidraw (formato proprietário)
   - Kanban (modifica arquivo)
   - Tasks (escreve em arquivo)
   - Qualquer plugin "premium" pago
4. **`.obsidian/` no `.gitignore`** desde dia 1
5. **Filesystem continua canônico** — Obsidian é viewer
6. **Reavaliação em 14 dias** (2026-06-04) com hipóteses H1-H5

### Setup proposto pro teste

```
1. Abrir Obsidian → "Open folder as vault"
2. Apontar pra C:\Users\usuario\Documents\Projetos Dev Pessoais\
3. .obsidian/app.json com configurações minimalistas:
   - readableLineLength: false  (usa largura toda)
   - showLineNumber: true
4. Plugins comunidade:
   - Dataview (de blacurnow, popular)
5. Plugins built-in ativos:
   - Graph view
   - Backlinks
   - Outgoing links
   - Outline
   - Tag pane
   - File recovery
6. Tema: padrão escuro (alinhado com identidade visual KOD.AI)
```

### O que Obsidian NÃO substitui (não desligar)

- Skills KOD.AI (continuam fonte de operação)
- Git (continua source of truth)
- `MAPA.md` (continua entrada rápida)
- Memórias (continuam auto-carregadas)
- Hooks JS (continuam enforcing regras)
- NotebookLM (continua fonte ancorada)

Obsidian = **camada extra de exploração visual**, não substituto.

## Decisão final (baseada em delegação Davi)

**TESTAR por 2 semanas** com setup minimalista + whitelist/blacklist de plugins + `.obsidian/` gitignored.

**Próximas ações:**

1. ✓ Esta análise registrada (este arquivo)
2. Adicionar `.obsidian/` ao `.gitignore` (preventivo, mesmo antes de instalar)
3. Davi instala Obsidian + vault apontando pra pasta-mãe + 5 plugins built-in + Dataview
4. 14 dias de uso real
5. Reavaliação em `2026-06-04` — fechar análise + decisão final

## Cruzamento com STRATEGIC-NORTH

Doc 3 do Davi (Evolução Estrutural) mencionou Obsidian como "atalho de curto prazo sem acoplar futuro". Esta análise operacionaliza essa intenção.

**Importante:** se Obsidian validar como graph viewer útil, **NÃO substitui** plano de longo prazo (knowledge graph próprio + embeddings + index.sqlite). É bridge enquanto sistema próprio não existe.

## Atribuição

Análise produzida pelo claude-opus-4-7 a pedido explícito de Davi ("queria uma análise aprofundada"). Inputs: experiência operacional KOD.AI 2026-05-21 + estado atual filesystem + Doc 3 (Evolução Estrutural) + delegação Q&A.
