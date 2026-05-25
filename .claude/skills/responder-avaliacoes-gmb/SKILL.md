---
name: responder-avaliacoes-gmb
description: >
  Lê reviews recentes do Google Business Profile (GMB) do cliente via API +
  gera draft de resposta personalizada pra cada review (tom + assinatura
  conforme _memoria/preferencias.md + briefing cliente). Drafts vão pra fila
  de aprovação humana antes de postar. Suporta categorização (positivo /
  neutro / negativo / fake-suspect). Use quando disser "responder reviews",
  "/responder-avaliacoes-gmb", "tem review novo no Google", "responder GMB".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - WebFetch
  - AskUserQuestion
---

# Skill: `/responder-avaliacoes-gmb`

Resposta humanizada a reviews do **Google Business Profile (GMB)** — em escala — com tom do cliente preservado.

## Princípio

> **100% das reviews respondidas em <24h, com voz do cliente.** Sem template robótico ("Obrigado pelo feedback!"). Sem deixar review negativo penando 7 dias.

## Quando disparar

- "/responder-avaliacoes-gmb [cliente_slug]"
- "responder reviews do <cliente>"
- "tem review novo no Google?"
- "responder GMB"

## Setup API (1× por cliente)

Google Business Profile API exige:
1. Cliente concede acesso à conta GMB no Google My Business
2. OAuth2 com escopo `https://www.googleapis.com/auth/business.manage`
3. Cliente aprova via consentimento OAuth

```env
# _negocio/clientes/<slug>/.env
GMB_CLIENT_ID=...
GMB_CLIENT_SECRET=...
GMB_REFRESH_TOKEN=...
GMB_ACCOUNT_ID=...
GMB_LOCATION_ID=...
```

**Nota:** Google Business Profile API tem migrado endpoints (Performance API + Business Information API + Reviews API separadas após depreciação 2024). KOD.AI usa Reviews endpoint atual: `accounts/{account_id}/locations/{location_id}/reviews`.

## Workflow 5 passos

### Passo 1 — Coletar reviews recentes

```bash
curl -s "https://mybusiness.googleapis.com/v4/accounts/$ACCOUNT_ID/locations/$LOCATION_ID/reviews" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq .
```

Filtrar:
- Sem `reviewReply` (não respondida ainda) OU
- `updateTime` últimas 24h-7d (configurável)

### Passo 2 — Classificar

Pra cada review, classificar em:

| Categoria | Critério | Prioridade |
|---|---|---|
| **5★ entusiasmado** | 5 estrelas + comment > 50 char | Alta — chance de viralizar |
| **5★ curto** | 5 estrelas + comment < 50 char | Média |
| **4★ neutro-positivo** | 4 estrelas + comment com ressalva | Média |
| **3★ neutro** | 3 estrelas | Alta — chance de virar 5★ ou 1★ |
| **1-2★ negativo legítimo** | 1-2 estrelas + comment com detalhe específico | URGENTE — resposta <2h |
| **1-2★ fake-suspect** | 1-2 estrelas + sem comment OU comment genérico OU perfil novo | URGENTE — denúncia + resposta |

### Passo 3 — Gerar draft personalizado

Carregar contexto:
- `_memoria/empresa.md` (quem é o cliente)
- `_memoria/preferencias.md` (tom de voz)
- `_negocio/clientes/<slug>/briefing.md` (serviços/produtos)

Pra cada review, gerar draft com **3 blocos**:

1. **Acolhimento personalizado** (nome do reviewer se disponível + reconhecimento específico do que ele disse — não genérico)
2. **Conteúdo** (varia por categoria):
   - 5★: agradecer + amplificar (mencionar serviço/produto específico + convite implícito)
   - 3★ neutro: agradecer + perguntar como pode melhorar (sem defensividade)
   - Negativo legítimo: pedir desculpas + reconhecer + propor canal direto (telefone/email) + assinar pessoa real
   - Negativo fake: ser cortês + pedir esclarecimento ("não encontramos seu atendimento em nossos registros") + denunciar paralelamente
3. **Assinatura** (nome real + cargo — não "Equipe X" robótico)

### Passo 4 — Fila de aprovação humana

Drafts vão pra `_negocio/clientes/<slug>/integracoes/gmb-respostas-fila.md`:

```markdown
## Review #1 [URGENTE — 1★]
**De:** João Silva
**Estrelas:** 1
**Comentário:** "Atendimento horrível, esperei 2h sem resposta..."
**Quando:** 2026-05-22 14:30

**Draft de resposta:**
> João, sentimos muito pelo ocorrido. Isso não reflete nosso padrão de atendimento. Por favor, entre em contato direto comigo pelo WhatsApp (XX) XXXXX-XXXX para que possamos entender o que aconteceu e resolver. — Carlos, Atendimento

**Categoria:** negativo-legitimo
**Aprovar?** [ ] sim [ ] editar [ ] pular

---
```

**Davi (ou cliente) aprova/edita** antes de postar.

### Passo 5 — Postar respostas aprovadas

```bash
curl -X PUT "https://mybusiness.googleapis.com/v4/accounts/$ACCOUNT_ID/locations/$LOCATION_ID/reviews/$REVIEW_ID/reply" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"comment\": \"$RESPOSTA_APROVADA\"}"
```

Atualizar fila + gravar event log NDJSON:
```
_negocio/clientes/<slug>/integracoes/gmb-respostas.ndjson
```

## Quality Gates

```yaml
quality_gates:
  - "100% das reviews coletadas categorizadas"
  - "Draft personalizado (não-template) com nome + referência específica"
  - "Tom de voz alinhado com _memoria/preferencias.md"
  - "Assinatura com nome real (não 'Equipe X')"
  - "Aprovação humana antes de postar"
  - "Reviews 1-2★ marcadas URGENTE (resposta <2h)"
  - "Reviews fake-suspect denunciadas paralelamente"
  - "Event log NDJSON gravado"
  - "Anti-pollution: zero copy-paste entre clientes diferentes"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Template "Obrigado pelo feedback!" | Robótico, parece IA preguiçosa | Personalizar com nome + referência ao que reviewer disse |
| Defender em vez de acolher em 1★ | Briga pública | Reconhecer + canal direto |
| Ignorar review 3★ | Perde oportunidade de virar 5★ | Perguntar como melhorar |
| Não denunciar fakes | Score artificialmente baixo | Denúncia + resposta cortês paralela |
| Postar sem aprovação humana | Resposta errada vira print viral | Sempre fila de aprovação |
| Demorar >24h em qualquer review | Score cai + cliente irritado | Cron diário 09:00 |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "muitas reviews 1-2★ no mesmo tema (atendimento/produto)"
    skill: analisar-dados
    razao: "Padrão crítico — analisar sentimento + frequência por tema"
  - condicao: "review fake denunciada + não removida em 7d"
    skill: capturar
    razao: "Capturar caso pra escalar ao Google Support"
  - condicao: "cliente quer relatório mensal de reviews"
    skill: relatorio-ads
    razao: "Adicionar bloco de reviews ao relatório semanal/mensal"

requires_skills_anteriores:
  - condicao: "cliente sem GMB API configurada"
    skill: seo (A10 — Passo 3 GMB checklist)
    razao: "GMB precisa estar configurado + cliente conceder acesso API"
```

## Limitações honestas

- **Google Business Profile API limita 200 reviews por request** — paginar se necessário
- **Reviews antigas (>3 anos)** nem sempre retornadas via API
- **Denúncia de fake é manual** (não há endpoint API público) — abre flag na UI do GMB
- **Sentiment analysis automático** não usado em v1 (categorização por estrelas + heurística texto)
- **Multi-localização** (cliente com várias filiais): cobre, mas exige `location_id` por filial no `meta.yaml`
- **Não substitui equipe de SAC** em volume >50 reviews/semana — KOD.AI gera draft, humano valida

## Origem

Frente A6 do plano 16 frentes Davi 2026-05-22. Padrão Google Business Profile API oficial — re-implementação universalizada:
- **Documentação fonte:** developers.google.com/my-business/reference/rest
- **Vocabulário:** review reply, location, reviewer, rating (público)
- **Marca NÃO usada:** zero referência a "Mazzeo IA" / "MazyOS"

Skill base pra **pacote-padrão Davi** Pilar 2 — Google Power (GMB ativo + reviews respondidas).
