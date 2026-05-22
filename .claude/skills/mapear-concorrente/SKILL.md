---
name: mapear-concorrente
description: >
  Investiga concorrente direto do produto-âncora do projeto consumidor em workflow de 5 fases
  (investigar → matriz comparativa → propor implementação dos gaps → garantir superioridade
  defensável → registrar como conceito em competitive-intelligence). Use quando o usuário enviar
  URL (Instagram, YouTube, site, Capterra, G2, App Store, Play Store) OU nome de um
  concorrente, ou disser "mapear concorrente", "/mapear-concorrente", "analisa esse
  concorrente", "como nos diferenciamos de X?", "esse aqui faz o que a gente faz?". Sai do
  modo "perguntar" — entra no modo "executar workflow" automaticamente quando trigger detectado.
  NUNCA copia features verbatim; sempre extrai princípios universais e propõe implementação
  adaptada ao produto-âncora.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - WebFetch
  - AskUserQuestion
  - SlashCommand
---

# Skill: `/mapear-concorrente`

Workflow de 5 fases pra investigar concorrente direto do produto-âncora e fechar gaps de feature/UX/pricing — sem copiar verbatim, com plano de implementação acionável.

## Quando disparar

**Triggers explícitos:**
- `/mapear-concorrente <url-ou-nome>`
- "Mapear concorrente X"
- "Analisa esse concorrente: <url>"
- "Como nos diferenciamos de <nome>?"
- "Esse aqui faz o que a gente faz?" (após colar URL)

**Triggers contextuais (auto-disparo, sem confirmação):**
- Usuário cola URL de Instagram (`instagram.com/<perfil>`), YouTube (`youtube.com/@<canal>`), site comercial, ou listing de marketplace (Capterra, G2, App Store, Play Store) **com tom de "olha esse aqui"**
- Usuário menciona nome de empresa/produto seguido de pergunta "o que eles fazem?"
- Operador estabeleceu padrão operacional (ex: "todo concorrente que eu enviar, faz X") — esta skill operacionaliza esse padrão

**NÃO disparar quando:**
- URL é referência neutra (ex: artigo de blog, documentação técnica)
- Usuário pediu pesquisa genérica de mercado (use `/sugerir-pesquisa`)
- Concorrente já foi mapeado nas últimas 30 dias (idempotência — checar `competitive-intelligence/conceitos/`)

## Pré-requisitos

- Projeto consumidor com **produto-âncora identificável** em `_memoria/empresa.md` OU `_negocio/MAPA.md` OU contexto-domínio dedicado
- Pasta `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/` existe (se ausente, propõe criar via `/criar-contexto`)
- Internet disponível (skill depende de `WebFetch` ou consultas via `/notebooklm`)

## Argumentos

```
/mapear-concorrente <url-ou-nome>                    → workflow completo, modo padrão
/mapear-concorrente <url-ou-nome> --quick             → só matriz comparativa (sem propor implementação)
/mapear-concorrente <url-ou-nome> --deep              → adiciona pesquisa Deep Search Gemini + NotebookLM
/mapear-concorrente --update <slug-existente>         → re-mapeia concorrente já registrado (atualização)
```

## Workflow (5 fases)

### Fase 1 — Identificação e contexto

1. **Detectar produto-âncora** do projeto consumidor:
   - Read `_memoria/empresa.md` → seção "O que faz" + "Principais entregas"
   - Read `_negocio/MAPA.md` se existir → seção produto principal
   - Read `KODAI/3-CONTEXTOS-DOMINIO/*/manifest.yaml` cujo `nichos_compativeis` bate com o projeto
   - Resultado: variável `produto_ancora` (ex: "App SaaS de gestão de academia esportiva BR")

2. **Parsear input do concorrente:**
   - URL → identifica tipo (Instagram, YouTube, site, marketplace listing)
   - Nome → pergunta (uma vez) qual URL principal pra começar

3. **Verificar idempotência:**
   - Glob `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/*.md`
   - Se concorrente já tem conceito → ler data; se <30 dias, propor `--update` ao invés de re-mapear

4. **Reportar pré-flight:**
   ```
   Concorrente: <nome ou URL>
   Produto-âncora detectado: <produto_ancora>
   Já mapeado? <sim+data | não>
   Modo: <padrão | quick | deep | update>
   ```

### Fase 2 — Investigação profunda

Coleta de evidências em paralelo (WebFetch + ferramentas auxiliares):

1. **Site principal** — WebFetch com prompt focado em: posicionamento, features listadas, pricing público, depoimentos, equipe
2. **Listing em marketplace** (Capterra, G2, App Store, Play Store) — features oficiais + avaliações + pontos negativos
3. **Instagram/YouTube** — tom de comunicação, frequência de posts, engajamento, casos de uso destacados
4. **LinkedIn da empresa** (se aplicável) — tamanho do time, vagas abertas (sinal de prioridades), funding
5. **Modo `--deep`:** gera prompt pra Deep Search Gemini + cria NotebookLM dedicado (chama internamente `/ativar-notebooklm`)

Output da Fase 2: arquivo temporário `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/.wip/<slug>-evidencias.md` com evidências coletadas (NÃO commitar — é working memory).

### Fase 3 — Matriz comparativa

Constrói tabela canônica:

```markdown
| Feature/Aspecto | <Concorrente> | <Produto-âncora> | Status |
|---|---|---|---|
| <feature 1> | ✅ Tem | ✅ Tem | Paridade |
| <feature 2> | ✅ Tem | ❌ Falta | GAP — implementar |
| <feature 3> | ❌ Não tem | ✅ Tem | Diferencial defensável |
| <feature 4> | ⚠ Tem mas pior | ✅ Tem melhor | Vantagem técnica |
| <pricing> | <valor> | <valor> | <análise> |
| <ux/onboarding> | <observação> | <observação> | <análise> |
```

Categorias-padrão a sempre cobrir:
- **Features funcionais** (CRUD + diferenciadores)
- **Pricing + planos** (faixas, trial, freemium)
- **UX/onboarding** (tempo até primeiro valor)
- **Posicionamento** (target persona, slogan, tom)
- **Tração observável** (número de clientes citados, reviews, MRR estimado se público)
- **Stack técnico** (se inferível via BuiltWith / Wappalyzer / vagas)
- **Lacunas defensáveis** (o que concorrente NÃO faz e produto-âncora faria)

### Fase 4 — Propor implementação dos gaps

Para cada linha "GAP — implementar" da matriz:

1. **Avaliar valor:** gera score (1-5) baseado em:
   - Quantos % dos casos de uso reais do produto-âncora a feature cobre
   - Custo de implementação estimado (S/M/L/XL)
   - Risco regulatório/LGPD
2. **Priorizar por ROI:** valor / custo
3. **Propor onde implementar:**
   - Atualização em conceito existente do contexto-domínio do produto-âncora
   - Pack novo (se a feature for capacidade técnica universal — `/criar-pack`)
   - Spec via `/spec` se exige decisão arquitetural maior
4. **Garantir superioridade (não só paridade):**
   - Identifica 1-2 ângulos onde produto-âncora pode fazer **melhor** que concorrente
   - Documenta como "diferenciador defensável"

Output da Fase 4: plano de ação em linguagem de tarefa executável (não abstrata).

### Fase 5 — Registrar como conceito + commit

1. **Criar arquivo** `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/<slug-concorrente>-vs-<slug-produto>.md`

   Estrutura canônica:
   ```markdown
   # <Concorrente> vs <Produto-âncora> — análise comparativa

   > Mapeamento automático via /mapear-concorrente em <data>.
   > Status: DRAFT (aguarda primeiro plano de implementação dos gaps validado em produção).

   ## Resumo executivo (≤5 linhas)
   ## Matriz comparativa
   ## Lacunas defensáveis identificadas (a implementar)
   ## Diferenciadores que o produto-âncora já tem (manter + amplificar)
   ## Plano de implementação proposto (priorizado por ROI)
   ## Decisões pendentes (humano)
   ## Fontes consultadas
   ```

2. **Atualizar `competitive-intelligence/DOMINIO.md`** seção "Concorrentes mapeados" com linha do novo concorrente

3. **Atualizar `competitive-intelligence/manifest.yaml`** com `merged_inputs[]` registrando a fonte

4. **Anti-pollution:**
   - n-gram ≥5 PASS contra evidências coletadas (não copia frases do site do concorrente)
   - Marca-zero: pode citar nome do concorrente (é necessário pra ser análise comparativa) — mas NÃO copia slogan/copy verbatim
   - PII-zero
   - Atribuição em metadata: lineage com `source: <URL>`

5. **Commit + push imediato** (preferência local — commit-on-step):
   - `feat(competitive-intelligence): mapeia concorrente <nome> via /mapear-concorrente`
   - Mover `.wip/<slug>-evidencias.md` pra `.wip/_processados/` ou deletar

6. **Mover arquivo wip da Fase 2** pra `.wip/_processados/` (auditoria)

7. **Reportar ao Davi:**
   - Path do conceito criado
   - Resumo dos N gaps identificados (top 3 por ROI)
   - Top 1 diferenciador defensável
   - Próximas ações sugeridas (qual gap atacar primeiro)

## Modo `--update`

Quando concorrente já tem conceito (idempotência da Fase 1.3):
1. Lê conceito atual
2. Roda Fase 2 (re-investigar — informações podem ter mudado)
3. Diff: features novas que concorrente lançou + features que removeu
4. Atualiza matriz + plano
5. Commit com mensagem `chore(competitive-intelligence): re-mapeia <concorrente> (atualizacao)`

## Política irmã + skills relacionadas

- `3-CONTEXTOS-DOMINIO/competitive-intelligence/` — destino canônico dos conceitos gerados
- `/criar-contexto` — invocada se `competitive-intelligence/` não existir
- `/notebooklm` — consulta opcional pra modo `--deep` (criar notebook dedicado por concorrente)
- `/ativar-notebooklm` — vincula notebook criado em modo `--deep`
- `/sugerir-pesquisa` — alternativa quando NÃO é concorrente específico (pesquisa neutra de mercado)
- `/absorver-contexto` — pra absorver doc completo de concorrente (ex: PDF "como vender contra X")

## Limitações honestas

- **Pesquisa web pública limitada:** WebFetch pode falhar em sites com auth/JS-heavy/rate-limit. Modo `--deep` mitiga via NotebookLM
- **Não acessa dados privados:** sem API do concorrente, não vê DB/uso real — só o que é público
- **Inferências sobre stack/MRR são especulativas:** marcar explicitamente quando claim depende de dado não-verificável
- **Não decide implementação sozinha:** sempre propõe, gate humano em decisões críticas (ex: feature regulada como biometria)
- **Marca-zero parcial:** nome do concorrente aparece (necessário pra análise) — mas slogans/copy verbatim NÃO
- **Idempotência baseada em data:** se concorrente lança feature nova em 5 dias e skill já rodou hoje, não re-detecta (use `--update` explícito)

## Critérios de PASS

1. Conceito gerado em `competitive-intelligence/conceitos/` com estrutura canônica
2. Matriz comparativa preenchida em pelo menos 6 categorias-padrão
3. Pelo menos 1 lacuna defensável proposta com plano de implementação
4. Anti-pollution PASS (n-gram + marca-zero parcial + PII-zero)
5. Commit + push no upstream
6. Reporte conciso ao Davi (≤10 linhas no terminal)
