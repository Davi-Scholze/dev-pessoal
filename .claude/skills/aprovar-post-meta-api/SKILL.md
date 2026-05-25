---
name: aprovar-post-meta-api
description: >
  Publica posts/carrosséis aprovados no Instagram + Facebook via Meta Graph API.
  Lê output de /gerar-carrossel ou /publicar-tema (slides PNG + legendas),
  valida pré-flight (tokens, page_id, instagram_business_account_id, media size),
  faz upload + publica + grava response no manifest. Suporta agendamento via
  scheduled_publish_time. Use quando disser "publicar carrossel aprovado",
  "/aprovar-post-meta-api", "subir pro Instagram", "agendar post Meta".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - AskUserQuestion
---

# Skill: `/aprovar-post-meta-api`

Publica posts Instagram + Facebook via **Meta Graph API** — sem clicar no app, sem app de agendamento de terceiros.

## Princípio

> **Aprovado por Davi → publicado em <60s.** Sem gambiarra, sem Buffer/Hootsuite. Direto Meta Graph API com token de Page do cliente.

## Quando disparar

- "/aprovar-post-meta-api <path-do-carrossel>"
- "publicar carrossel aprovado"
- "subir pro Instagram + Facebook"
- "agendar post pra <data>"

Pré-requisito: peça já aprovada via `/live-preview` (gate humano).

## Dependências

| Recurso | Onde |
|---|---|
| Pasta da peça | output de `/gerar-carrossel` ou `/publicar-tema` |
| Tokens Meta | `.env` do cliente (Page Access Token longa duração) |
| Page ID + IG Business Account ID | `_negocio/clientes/<slug>/integracoes/meta.yaml` |
| Aprovação humana | flag `aprovado: true` no manifest da peça OU OK explícito do Davi |

## Setup inicial (1× por cliente)

Antes do primeiro uso, o cliente precisa:

1. **Página Facebook** vinculada a um **Business Manager**
2. **Conta Instagram Business** (não pessoal) vinculada à Página
3. **App Meta for Developers** com permissão `pages_manage_posts` + `instagram_content_publish`
4. **Page Access Token de longa duração** (60 dias, renovação automática via refresh)

KOD.AI gera **link exato** pro `.env` do cliente seguir feedback `[[envs_e_secrets]]`:

```env
# _negocio/clientes/<slug>/.env (NUNCA commitar)
META_APP_ID=...
META_APP_SECRET=...
META_PAGE_ID=...
META_PAGE_ACCESS_TOKEN=...   # long-lived 60d
META_IG_BUSINESS_ACCOUNT_ID=...
```

Estrutura de pasta: tudo em `_negocio/clientes/<slug>/integracoes/meta.yaml` (config não-sensível) + `_negocio/clientes/<slug>/.env` (sensível, gitignored).

## Workflow 5 passos

### Passo 1 — Pré-flight

```bash
# Validar tokens (sem publicar)
curl -s "https://graph.facebook.com/v21.0/me?access_token=$META_PAGE_ACCESS_TOKEN" | jq .

# Verificar permissões
curl -s "https://graph.facebook.com/v21.0/me/permissions?access_token=$META_PAGE_ACCESS_TOKEN" | jq '.data[] | select(.status=="granted") | .permission'
```

Checagens:
- Token válido (expira em ≥7 dias)
- Permissões `pages_manage_posts` + `instagram_content_publish` granted
- Page ID + IG Business Account ID conferem com `meta.yaml`
- Slides PNG existem + ≤8MB cada + dimensões 1080×1350 ou 1080×1080

Se algo falha → reporta exato + para. Nunca publica com pré-flight quebrado.

### Passo 2 — Decidir formato

| Tipo input | Formato Meta | Endpoint |
|---|---|---|
| 1 slide | Single image post | `/{ig-user-id}/media` (image_url) + `/media_publish` |
| 2-10 slides | Carousel | `/{ig-user-id}/media` (carousel_item × N) + `/media` (carousel) + `/media_publish` |
| 1 vídeo curto | Reels | `/{ig-user-id}/media` (media_type=REELS, video_url) + `/media_publish` |

### Passo 3 — Upload + publicação

**Carrossel (2-10 slides):**

```bash
# 3.1 — Upload de cada item do carrossel (paralelo)
for i in 1..N; do
  curl -X POST "https://graph.facebook.com/v21.0/$IG_ID/media" \
    -F "image_url=$PUBLIC_URL_SLIDE_$i" \
    -F "is_carousel_item=true" \
    -F "access_token=$TOKEN"
  # → retorna creation_id por slide
done

# 3.2 — Criar container do carrossel
curl -X POST "https://graph.facebook.com/v21.0/$IG_ID/media" \
  -F "media_type=CAROUSEL" \
  -F "children=$CREATION_ID_1,$CREATION_ID_2,...,$CREATION_ID_N" \
  -F "caption=$CAPTION_FROM_LEGENDAS_INSTAGRAM_MD" \
  -F "access_token=$TOKEN"
# → retorna container_id

# 3.3 — Publicar
curl -X POST "https://graph.facebook.com/v21.0/$IG_ID/media_publish" \
  -F "creation_id=$CONTAINER_ID" \
  -F "access_token=$TOKEN"
# → retorna media_id final
```

**Importante:** as imagens precisam estar **publicamente acessíveis via URL** (Meta puxa). KOD.AI usa 3 estratégias:
1. **Upload pra bucket público temporário** (Cloudflare R2 / S3 público com TTL 24h)
2. **GitHub raw URL** (se cliente aceita PNGs no repo, mais simples mas público pra sempre)
3. **Cliente já hospeda** (CDN próprio)

Default recomendado: opção 1 (R2 com TTL — barato + temporário).

### Passo 4 — Facebook Page (paralelo ou subsequente)

Mesma legenda + imagens, endpoint diferente:

```bash
# Single image
curl -X POST "https://graph.facebook.com/v21.0/$PAGE_ID/photos" \
  -F "url=$PUBLIC_URL" \
  -F "caption=$CAPTION_FROM_LEGENDAS_FACEBOOK_MD" \
  -F "access_token=$TOKEN"

# Multiple images (álbum)
curl -X POST "https://graph.facebook.com/v21.0/$PAGE_ID/feed" \
  -F "message=$CAPTION" \
  -F "attached_media[0]={\"media_fbid\":\"<id1>\"}" \
  -F "attached_media[1]={\"media_fbid\":\"<id2>\"}" \
  -F "access_token=$TOKEN"
```

### Passo 5 — Pós-publicação

- Atualiza `manifest.yaml` da peça com:
  - `published_at: <timestamp ISO>`
  - `instagram_media_id: <id>`
  - `facebook_post_id: <id>`
  - `instagram_permalink: https://instagram.com/p/<shortcode>`
  - `facebook_permalink: <url>`
- Loga em `_negocio/clientes/<slug>/integracoes/meta-publicacoes.ndjson` (append-only, evento por publicação)
- Reporta pro Davi: link Instagram + link Facebook + insights iniciais (após 5min, se quiser)

## Quality Gates

```yaml
quality_gates:
  - "Pré-flight 100% verde antes de qualquer upload"
  - "Aprovação humana registrada (manifest.aprovado=true OU OK textual Davi)"
  - "Imagens 1080×1350 ou 1080×1080 + ≤8MB cada"
  - "Legenda Instagram ≤2.200 char + sem emojis quebrados em UTF-8"
  - "Hashtags ≤30 (limite Instagram)"
  - "Token expira em ≥7 dias (refresh se necessário antes)"
  - "Manifest atualizado com IDs Meta + permalinks"
  - "Event log NDJSON gravado"
  - "Imagens públicas tem TTL razoável (≤7d) ou versionadas"
```

## Agendamento

```bash
# Adicionar scheduled_publish_time (Unix timestamp, máx 75 dias futuro)
# Funciona em Facebook (não em Instagram via API direta — Instagram limita)
curl -X POST "https://graph.facebook.com/v21.0/$PAGE_ID/feed" \
  -F "message=$CAPTION" \
  -F "scheduled_publish_time=$UNIX_TIMESTAMP" \
  -F "published=false" \
  -F "access_token=$TOKEN"
```

**Limite Instagram:** API direta não suporta scheduled publish. Pra agendamento Insta, KOD.AI mantém fila local (`_negocio/clientes/<slug>/integracoes/meta-fila.yaml`) + cron diário que dispara `aprovar-post-meta-api` na hora alvo.

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Token curto (1h) | Expira no meio do upload | Long-lived 60d com refresh |
| URL local file:// | Meta não acessa | Bucket público OU CDN |
| Imagem 1920×1080 | Insta rejeita (não-quadrado/portrait) | 1080×1080 ou 1080×1350 |
| Sem rate limit aware | 403 em massa | 1 publicação por minuto (folga) |
| Esquecer media_publish | Container criado mas não publicado | Sempre 2 calls (create + publish) |
| Token no commit | Vaza pública | `.env` SEMPRE gitignored |
| Sem manifest update | Não dá pra rastrear depois | Manifest + NDJSON obrigatórios |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "post publicado + cliente quer relatório de performance"
    skill: relatorio-ads
    razao: "Adicionar post ao tracker (orgânico + pago)"
  - condicao: "post publicado + responses começam a chegar"
    skill: responder-avaliacoes-gmb
    razao: "Coordenar respostas (Insta DM + GMB reviews mesmo cliente)"

requires_skills_anteriores:
  - condicao: "peça não foi aprovada via /live-preview"
    skill: live-preview
    razao: "Gate humano obrigatório antes de publicar"
  - condicao: "carrossel não existe ainda"
    skill: gerar-carrossel
    razao: "Precisa output canônico pra consumir"
```

## Limitações honestas

- **Reels e Stories** ainda não cobertos por essa versão (próxima iteração)
- **Threads** (Meta) não tem API pública estável (2026-05) — fora de escopo
- **Instagram Stories scheduled** via API direta não funciona — usa fila local + cron
- **Token refresh automático** depende de cron próprio (não built-in da Meta)
- **Rate limits Meta:** 4800 calls/24h per token (default) — KOD.AI mantém 1 call/min folga
- **Não substitui Hootsuite premium** em multi-tenant 50+ clientes (mas é gratuito e direto)

## Origem

Frente A4 do plano 16 frentes Davi 2026-05-22. Padrão Meta Graph API oficial — re-implementação universalizada:
- **Documentação fonte:** developers.facebook.com/docs/instagram-api + /docs/graph-api
- **Conceitos públicos:** Page Access Token, Graph API versioning, carousel containers, scheduled_publish_time
- **Marca NÃO usada:** zero referência a "Mazzeo IA" / "MazyOS"

Skill base pra **pacote-padrão Davi** Pilar 1 — Site Responsivo + Social Pronto.
