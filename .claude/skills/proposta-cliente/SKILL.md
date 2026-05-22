---
name: proposta-cliente
description: >
  Workflow completo pra atender cliente novo de venda consultiva (DFY/DWY/DIY): captura
  material recebido (prints, URLs, áudios, links) → mapeia estado atual do cliente
  (site/app/sistema existente) → pesquisa o melhor da categoria (concorrentes + benchmarks)
  → gera proposta TOP com escopo + ticket + entregáveis em formato consumível pelo cliente.
  Use quando: operador disser "vamos atender cliente X", "preparar proposta pra Y", "recebi
  material desse cliente", colar URLs/prints com tom "atendimento de cliente", ou no
  pré-flight de venda consultiva. Sai do modo "improvisar proposta de cabeça" — entra
  no modo "orquestrar 6 fases com material curado". Orquestra: /capturar-imagem +
  /absorver-contexto + /mapear-concorrente + /sugerir-pesquisa + /pedir-contexto. Output
  final: arquivo `propostas/<cliente>-<YYYY-MM-DD>.md` pronto pra exportar PDF.
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

# Skill: `/proposta-cliente`

Workflow orquestrador de 6 fases pra gerar proposta consultiva TOP pra cliente novo. Cobre venda DFY (Done For You), DWY (Done With You) e DIY (Do It Yourself).

## Quando disparar

**Triggers explícitos:**
- `/proposta-cliente <nome-cliente>`
- "Preparar proposta pra <cliente>"
- "Vamos atender <cliente>"
- "Material desse cliente: ..." (com URLs/prints adjacentes)

**Triggers contextuais (auto-disparo proposto):**
- Operador cola URLs + prints + texto com tom "atendimento de cliente novo"
- Operador menciona nome de empresa/profissional + "querem contratar a gente"
- Inbox stakeholder `inbox-<cliente>/` recebe material substancial e operador comenta "vamos preparar proposta"

**NÃO disparar quando:**
- Cliente já é existente (workflow é `/atualizar-projeto` ou similar)
- É discussão técnica não-comercial (escolha de stack, decisão arquitetural)
- Operador pediu só pesquisa de mercado sem cliente específico (use `/sugerir-pesquisa` direto)

## Pré-requisitos

- Projeto consumidor com KOD.AI instalado + `_memoria/empresa.md` populado (precisa saber QUEM vende: serviços oferecidos, modelo de venda — DFY/DWY/DIY, faixas de ticket)
- **`_memoria/preferencias.md`** define tom da proposta (formal? consultivo? direto?)
- **Material do cliente** (mínimo: nome + 1-2 referências — URL site, print, breve descrição)
- Pasta `propostas/` no projeto consumidor (criada automaticamente se não existir)

Se faltar material → auto-dispara `/pedir-contexto` antes de seguir.

## Argumentos

```
/proposta-cliente <nome>                          → workflow completo 6 fases, modo padrão
/proposta-cliente <nome> --quick                  → pula pesquisa profunda, só captura+mapeamento+proposta
/proposta-cliente <nome> --deep                   → adiciona análise comparativa de 3+ concorrentes
/proposta-cliente --update <nome>                 → revisa proposta existente (cliente mudou requisito)
/proposta-cliente <nome> --ticket <faixa>         → força faixa de ticket (R$1k/5k/15k/20k+) — afeta escopo
```

## Workflow (6 fases)

### Fase 1 — Identificação e pré-flight

1. **Dados básicos do cliente:**
   - Nome (humano ou empresa)
   - Vertical (academia esportiva? clínica? escola? agência? indústria?)
   - Tamanho aproximado (autônomo / pequeno / médio / grande)
   - Como chegou (indicação de quem? rede própria? Instagram Ads? busca orgânica?)
   - Material já recebido (URL? prints? áudio?)

2. **Cliente já existe no projeto?**
   - Glob `propostas/<cliente>*.md` → se sim, propor `--update` ao invés de criar nova
   - Glob `inbox-<cliente>/` → se sim, ler material acumulado

3. **Material suficiente?**
   - Se houver ≥1 URL acessível + 1-2 prints/descrição → seguir
   - Se faltar material → auto-dispara `/pedir-contexto`

4. **Reportar pré-flight:**
   ```
   Cliente: <nome>
   Vertical: <vertical> (confirmar)
   Tamanho: <small | medium | large | enterprise>
   Material recebido: <lista compacta>
   Já mapeado? <não | sim — última proposta em <data>>
   Modo: <padrão | quick | deep | update>
   Ticket-alvo provável: <R$1k | R$5k | R$15k | R$20k+ — baseado no tamanho>
   ```

### Fase 2 — Captura completa do material do cliente

Para cada item recebido, dispara skill apropriada:

| Tipo | Skill disparada | Output |
|---|---|---|
| URL site/app/sistema cliente | `WebFetch` + análise + salva resumo | `inbox-<cliente>/<data>-site-analise.md` |
| Print/screenshot | `/capturar-imagem` | `inbox-<cliente>/imagens/...` + metadata |
| Vídeo demo/walkthrough | `/capturar-video` ou `/absorver-midia` | `inbox-<cliente>/videos/...` |
| Áudio call/reunião | `/transcribe-audio` | `inbox-<cliente>/transcripts/...` |
| Doc PDF/MD com requisitos | `/absorver-contexto` (modo cliente, NÃO universal) | `inbox-<cliente>/docs/...` |
| URL NotebookLM | `/ativar-notebooklm` | vínculo na library |

**Resultado Fase 2:** pasta `inbox-<cliente>/` populada com TODO material organizado + classificado.

### Fase 3 — Mapeamento do estado atual do cliente

A partir do material capturado, construir mapa do que cliente **JÁ TEM** hoje:

```markdown
## Estado atual do cliente <nome>

### Presença digital
- Site: <URL> (stack: <Wordpress/custom/Wix/etc> · UX: <bom/médio/ruim> · velocidade: <fast/slow>)
- Instagram: <URL> (frequência posts: <X/semana> · engajamento: <alto/médio/baixo>)
- App/sistema: <tem/não tem> (qual: <nome> · custo mensal estimado: <R$X>)
- Email marketing: <usa/não usa>

### Operação atual
- Tamanho: <X alunos/clientes/funcionários>
- Tempo no mercado: <Y anos>
- Receita estimada: <faixa>
- Principais processos manuais (dores): <lista>

### Stack técnico identificado
- Frontend: <inferido>
- Backend: <inferido>
- Pagamento: <inferido>
- CRM: <usa X / não usa>

### Dores relatadas (do material recebido)
- <dor 1>
- <dor 2>
- <dor 3>

### O que está funcionando bem
- <ponto forte 1>
- <ponto forte 2>
```

### Fase 4 — Pesquisa do melhor (benchmarks + concorrentes)

Pra cliente saber "onde poderia chegar", pesquisar o estado da arte do vertical:

1. **Concorrentes diretos do cliente:**
   - Se vertical tem concorrentes já mapeados em `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/` → usar
   - Se não → dispara `/mapear-concorrente <concorrente-1>` + `/mapear-concorrente <concorrente-2>` (mínimo 2)

2. **Benchmarks de UX/feature:**
   - Pesquisar players globais do vertical (mesmo se não competirem direto com cliente)
   - Usar `/sugerir-pesquisa` se faltar conhecimento

3. **Tendências do vertical:**
   - Últimos 12 meses do mercado (regulação, tech shift, fusões)
   - Modo `--deep` cria NotebookLM dedicado

4. **Output Fase 4:**
```markdown
## Estado da arte do vertical <vertical>

### Top 3 concorrentes diretos do cliente
| Concorrente | Diferencial | Pricing | O que cliente perde por não ter |
|---|---|---|---|
| ... |

### Features-padrão do vertical (commodity)
- <feature 1> — todo concorrente tem
- <feature 2> — idem

### Features diferenciadoras (lacunas defensáveis)
- <feature A> — ninguém faz bem, oportunidade pro cliente
- <feature B> — idem

### Tendências 12-24 meses
- <tendência 1>
- <tendência 2>
```

### Fase 5 — Síntese: gap atual vs ideal + recomendações

Cruzar **estado atual cliente** (Fase 3) com **estado da arte** (Fase 4):

```markdown
## Gap analysis

### O que cliente JÁ TEM bem (manter + amplificar)
- <ponto forte 1>: amplificar como?

### O que cliente NÃO TEM e perde dinheiro/clientes por isso
| Gap | Impacto estimado | Custo de implementar (no nosso ticket) | Prioridade |
|---|---|---|---|
| <gap 1> | <impacto $> | <S/M/L> | Alta |
| ... |

### O que cliente JÁ TEM mas faz mal
- <ponto fraco>: como nossa solução melhora

### Diferencial defensável que cliente pode capturar
- <feature/posicionamento único do mercado que cliente pode ocupar>
```

### Fase 6 — Geração da proposta TOP

Output canônico em `propostas/<cliente>-<YYYY-MM-DD>.md`:

```markdown
# Proposta — <Cliente> × <Empresa do operador>

> Preparada por <operador> em <data>.
> Validade: 30 dias.
> Cliente: <nome + vertical + tamanho>.

## 1. Diagnóstico do estado atual

<síntese de 3-5 bullets do estado atual do cliente — Fase 3 condensada>

## 2. Oportunidade identificada

<síntese de 2-3 bullets sobre onde cliente perde dinheiro/clientes hoje>

## 3. Solução proposta

### Escopo (módulos incluídos)

<lista de módulos do catálogo do operador que serão entregues>

### Entregáveis

- <entregável 1 — concreto, mensurável>
- <entregável 2 — idem>
- <entregável 3>

### Cronograma

<fases + duração estimada — ex: Setup (sem 1-2) → Implementação (sem 3-6) → Treinamento (sem 7) → Go-live (sem 8)>

### Stack técnico

<stack principal + por que é melhor pro caso do cliente>

## 4. Investimento

### Ticket setup
**R$ <X>** (à vista 5% desconto OU 3x sem juros no cartão OU 50% início + 50% entrega)

### Recorrência mensal (opcional)
**R$ <Y>/mês** — manutenção + atualizações + suporte tier <X>

### Garantias
- <garantia 1: ex: "se em 30 dias não estiver ao seu gosto, devolvemos 100%">
- <garantia 2>
- <garantia 3>

## 5. Por que escolher esse caminho

<3-5 bullets que diferenciam o operador da concorrência mapeada na Fase 4>

## 6. Próximos passos se aprovar

1. Assinatura proposta (clique aqui)
2. Pagamento 50% (Pix/Cartão)
3. Kickoff call em até 3 dias úteis
4. Setup inicia semana seguinte

## 7. Próximos passos se quiser conversar antes

- WhatsApp <número>
- Email <email>
- Call agendada <link>

## 8. Material consultado

- Site cliente: <URL>
- Concorrentes analisados: <lista>
- Benchmark global do vertical: <fontes>
```

### Output final da Fase 6

1. Arquivo `propostas/<cliente>-<YYYY-MM-DD>.md` salvo
2. Bonus: `propostas/<cliente>-<YYYY-MM-DD>-EXECUTIVE-SUMMARY.md` (1 página pra cliente que não lê tudo)
3. Bonus opcional: render `.pdf` via Pandoc se disponível (`pandoc <arquivo>.md -o <arquivo>.pdf`)
4. Atualiza `inbox-<cliente>/README.md` registrando proposta entregue + data
5. Commit + push imediato no repo do projeto consumidor

## Modo `--update`

Quando cliente já tem proposta + agora pede ajuste (escopo cresceu, escopo diminuiu, ticket revisado):
1. Lê proposta atual
2. Compara com novo input
3. Diff: o que mudou (escopo + ticket + cronograma)
4. Gera nova versão `propostas/<cliente>-<YYYY-MM-DD>-v2.md`
5. Mantém versão anterior pra histórico

## Política irmã + skills relacionadas

- `2-PACKS/packs/comercial/modelos-venda-ia/` (pack DRAFT no upstream) — origem dos modelos DFY/DWY/DIY
- `2-PACKS/packs/atendimento/customer-success-ia/` (pack DRAFT) — pós-venda
- `3-CONTEXTOS-DOMINIO/competitive-intelligence/` — destino de concorrentes mapeados na Fase 4
- `1-ESQUELETO/skills-universais/pedir-contexto` — auto-disparada na Fase 1 se faltar material
- `1-ESQUELETO/skills-universais/capturar-imagem` — usada na Fase 2 pra prints
- `1-ESQUELETO/skills-universais/capturar-video` — usada na Fase 2 pra vídeos
- `1-ESQUELETO/skills-universais/transcribe-audio` — usada na Fase 2 pra áudios
- `1-ESQUELETO/skills-universais/absorver-midia` — usada na Fase 2 pra URLs ricas
- `1-ESQUELETO/skills-universais/absorver-contexto` — modo CLIENTE (não universal) pra material rico
- `1-ESQUELETO/skills-universais/mapear-concorrente` — usada na Fase 4 (≥2 concorrentes)
- `1-ESQUELETO/skills-universais/sugerir-pesquisa` — usada na Fase 4 se faltar conhecimento de vertical

## Limitações honestas

- **Não fecha venda sozinha:** gera proposta TOP, mas conversão depende do operador (follow-up, call, negociação humana)
- **Tickets calculados são estimativa:** baseado em complexidade do escopo + tamanho do cliente; operador deve validar/ajustar manualmente
- **Stack técnico do cliente é inferido:** WebFetch + BuiltWith + heurística; pode errar (ex: SPA carregada via JS pode mascarar stack real)
- **Sem CRM nativo:** skill gera proposta mas não tracking de pipeline (interessado → enviada → respondeu → fechou); usar pack `comercial/crm-funil-vendas` quando criado
- **Sem rendering PDF nativo:** depende de `pandoc` ou outra ferramenta externa; output canônico é `.md`
- **Não substitui call de descoberta humana:** cliente novo geralmente precisa de 30-60min de call pra extrair dores reais — material capturado é COMPLEMENTAR, não substituto

## Critérios de PASS

1. Arquivo `propostas/<cliente>-<YYYY-MM-DD>.md` gerado com 8 seções canônicas
2. Estado atual do cliente mapeado (Fase 3) com ≥4 categorias preenchidas
3. ≥2 concorrentes pesquisados na Fase 4 (cited no material consultado)
4. ≥3 gaps identificados na Fase 5 com impacto estimado
5. Ticket + cronograma + entregáveis explícitos na Fase 6
6. Executive summary (1 página) gerado como bonus
7. Material consultado citado (transparência pra cliente)
8. Commit + push imediato no projeto consumidor

## Por que esta skill existe

Estabelecida em 2026-05-21 sessão 4 quando Davi descreveu o workflow desejado de atendimento de cliente:

> "Pego referências visuais do meu clientes, prints... copio e colo coisas, links... a partir disso o KODAI já mapeia e entende o atual, com isso já pesquisa o melhor, para chegarmos ao cliente com a proposta TOP, claro, tudo isso o dev vai ir melhorando e buscando outras referências"

Skill operacionaliza esse workflow em 6 fases estruturadas, evitando o anti-padrão "improvisar proposta de cabeça" sem material curado. Combina com modelo de venda revisado MeuDojo (tickets R$1-20k DFY/DWY/DIY + recorrência opcional) — mas é skill UNIVERSAL aplicável a qualquer projeto consumidor de KOD.AI que atenda cliente externo.
