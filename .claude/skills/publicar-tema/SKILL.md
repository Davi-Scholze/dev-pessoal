---
name: publicar-tema
description: >
  Orquestrador de pipeline de conteúdo. Recebe um tema central e produz pacote
  multi-formato em uma rodada: artigo blog (SEO-aware) + carrossel
  Instagram/TikTok/LinkedIn (via /gerar-carrossel) + 3 legendas adaptadas (Insta,
  FB, LinkedIn) + sugestões de hashtags + ganchos. Tudo num único output_dir
  carimbado por data, pronto pra Davi aprovar via /live-preview e publicar via
  /aprovar-post-meta-api. Use quando disser "publicar tema X", "tema da semana",
  "criar conteúdo completo sobre Y", "/publicar-tema".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - AskUserQuestion
---

# Skill: `/publicar-tema`

Pipeline completo de conteúdo a partir de **1 tema** → pacote multi-formato pronto pra aprovar e publicar.

## Princípio

> **Um tema → vários formatos → uma rodada de aprovação.** Davi escolhe o tema; KOD.AI monta artigo + carrossel + legendas adaptadas pra cada canal, em paralelo, num único output_dir.

## Quando disparar

- "/publicar-tema <tema>"
- "publicar tema da semana"
- "criar conteúdo completo sobre <tema>"
- "pacote de conteúdo <tema>"

Anti-padrão: NÃO usar pra peça única isolada (use `/gerar-carrossel` direto, ou só artigo).

## Dependências

| Recurso | Onde |
|---|---|
| Briefing negócio | `_memoria/empresa.md` |
| Tom de voz | `_memoria/preferencias.md` |
| Foco/estratégia | `_memoria/estrategia.md` |
| Cliente (se aplicável) | `_negocio/clientes/<slug>/` |
| Pesquisa SEO (opcional) | `_negocio/clientes/<slug>/marketing/seo/` |
| Skill geradora carrossel | `2-PACKS/packs/midia/carrossel-visual/` (A1) |

## Workflow 5 passos

### Passo 1 — Briefing do tema

```
1. Tema central? (1 linha)
2. Objetivo: educar | vender | posicionar | engajar?
3. Público-alvo? (perfil + dor)
4. Cliente específico? (slug) — opcional
5. Canais finais? (default: blog + Instagram + Facebook + LinkedIn)
```

Se `marketing/seo/01-pesquisa-demanda.md` existe → puxar termos prioritários relacionados ao tema.

### Passo 2 — Esqueleto do tema (núcleo único)

Gerar **núcleo conceitual** que vai alimentar todos os formatos:

- **Tese central** (1 frase, polêmica ou contraintuitiva quando possível)
- **3 sub-pontos** (estrutura do raciocínio)
- **2 exemplos concretos** (case ou analogia)
- **CTA** (ação esperada do leitor)

Este núcleo vira a "verdade canônica" — todos os formatos adaptam dele.

### Passo 3 — Geração em paralelo

**3a. Artigo blog (Markdown)**
- 800-1500 palavras
- Estrutura: gancho + tese + 3 sub-pontos com exemplos + CTA
- SEO-aware: keywords da pesquisa demanda (se existe) injetadas naturalmente em h1, h2, primeiro parágrafo, slug
- Meta description ≤155 caracteres
- Slug em kebab-case
- Saída: `artigo.md` + frontmatter (title, slug, meta_description, tags, data)

**3b. Carrossel** (invoca `/gerar-carrossel` com tema + núcleo)
- 8 slides (capa + 6 conteúdo + CTA final)
- `live_preview: auto` modo batch viewport mobile
- Saída: `carrossel/slide-01.png ... slide-08.png` + `legendas-carrossel.md`

**3c. 3 legendas adaptadas**

| Canal | Tom | Estrutura | Limite |
|---|---|---|---|
| **Instagram** | Próximo, emoji-friendly, gancho forte | Hook + corpo + CTA + 8-15 hashtags | 2.200 char (idealmente <500 antes do "mais") |
| **Facebook** | Médio, mais explicativo | Hook + 2-3 parágrafos + CTA + link blog | 5.000 char (idealmente 100-250 palavras) |
| **LinkedIn** | Profissional, autoral, sem emoji excessivo | Story-driven (gancho pessoal) + insight + 3 takeaways + CTA + 3-5 hashtags pro | 3.000 char (idealmente 1.300-2.000) |

### Passo 4 — Sugestões e gatilhos

- **Hashtags**: 8-15 pra Instagram (mix de volume), 3-5 pra LinkedIn (nicho)
- **Hooks alternativos**: 3 variações da primeira linha (pra A/B test futuro)
- **Imagens extras** (opcional): se cliente tem identidade visual estabelecida, gerar 1 imagem destaque pro blog via DALL-E (custo $0.05)
- **Próxima skill sugerida**: `/aprovar-post-meta-api` se cliente tem Meta Graph token configurado

### Passo 5 — Empacotamento + /live-preview

Empacotar em output_dir único:

```
_negocio/clientes/<slug>/marketing/conteudo/tema-<slug>-<YYYY-MM-DD>/
├── briefing.md                Tema + objetivo + público
├── nucleo.md                  Tese + 3 sub-pontos + exemplos + CTA
├── artigo.md                  Blog completo (Markdown + frontmatter)
├── carrossel/                 Output da skill /gerar-carrossel
│   ├── slide-01.html...png
│   ├── ...
│   ├── slide-08.html...png
│   └── carrossel.html         Index pra /live-preview
├── legendas/
│   ├── instagram.md
│   ├── facebook.md
│   └── linkedin.md
├── hashtags.md                Listas curadas por canal
├── hooks-alternativos.md      3 variações da primeira linha
└── manifest.yaml              Metadata + status
```

Disparar `/live-preview` modo batch com:
- Carrossel.html (mobile)
- artigo.md preview (desktop + mobile)
- Legendas (preview lateral)

## Quality Gates

```yaml
quality_gates:
  - "Núcleo conceitual gerado primeiro (não adapta formato isoladamente)"
  - "Artigo entre 800-1500 palavras"
  - "Meta description ≤155 char"
  - "Slug kebab-case + sem acentos"
  - "Carrossel 8 slides exatos (capa + 6 + CTA)"
  - "3 legendas adaptadas (Insta + FB + LinkedIn) com tom DIFERENTE"
  - "Hashtags Insta entre 8-15; LinkedIn entre 3-5"
  - "Hooks alternativos: mínimo 3 variações"
  - "/live-preview disparado pós-empacotamento"
  - "Anti-pollution: zero marca proibida em qualquer output"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Copiar artigo → carrossel literal | Carrossel vira muro de texto | Núcleo conceitual primeiro, formato adapta |
| Legendas idênticas pra 3 canais | LinkedIn vira Insta com terno | Tom + estrutura específicos por canal |
| Hashtags genéricas (#sucesso #vida) | Alcance zero | Mix nicho + volume baseado no público |
| Pular briefing porque "já sei o tema" | Output desfocado | 5 perguntas curtas resolvem |
| Gerar tudo + só depois mostrar | Davi descobre problemas tarde | Cada formato passa por gate antes do empacotamento |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "pacote aprovado + Meta Graph API configurado"
    skill: aprovar-post-meta-api
    razao: "Publicar Instagram + Facebook + agendar LinkedIn (futuro)"
  - condicao: "artigo aprovado + blog tem deploy automation"
    skill: deploy-blog
    razao: "Publicar artigo no blog (skill futura)"
  - condicao: "performance do tema vai virar relatório"
    skill: relatorio-ads
    razao: "Adicionar tema ao tracker semanal"

requires_skills_anteriores:
  - condicao: "cliente novo + sem briefing"
    skill: novo-projeto
    razao: "Pasta cliente + briefing antes de gerar conteúdo"
  - condicao: "tema sem pesquisa SEO de base"
    skill: seo (A10 — Passo 1 demanda)
    razao: "Pesquisa de demanda alimenta keywords do artigo + carrossel"
```

## Limitações honestas

- **Não substitui editor/copywriter premium** — gera primeira versão sólida, humano refina
- **Carrossel + artigo são complementares, não redundantes** — núcleo é o mesmo, profundidade difere
- **SEO depende da pesquisa de demanda** — sem ela, artigo é "bom texto" mas não posiciona
- **3 legendas é o que escala em 1 rodada** — TikTok/YouTube Shorts/Twitter ficam pra próxima skill
- **Aprovação visual humana é obrigatória** — `/live-preview` é o gate, não opcional

## Origem

Frente A3 do plano 16 frentes Davi 2026-05-22. Pipeline observado em workflows de conteúdo de agências digitais (Hubspot, Resultados Digitais, ContentMarketingInstitute) — re-implementação universalizada:
- **Conceitos públicos:** pillar content, hub-and-spoke, content atomization, multi-format adaptation
- **Vocabulário:** todos termos públicos da indústria de marketing de conteúdo
- **Marca NÃO usada:** zero referência a "Mazzeo IA" / "MazyOS" / "yayforms"

Skill base pra **pacote-padrão Davi** Pilar 4 — Contexto Fiel + Conteúdo Recorrente.
