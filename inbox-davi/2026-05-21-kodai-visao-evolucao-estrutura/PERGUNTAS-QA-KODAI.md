---
tipo: qa-pendente
data: 2026-05-21
proposito: Item 6 do /goal — "fazer perguntas, saber qual o nível do KOD.AI"
status: aguarda-resposta-davi
---

# Perguntas pendentes — KOD.AI nível atual + direção

> Davi responde uma de cada vez (preferência registrada em `_memoria/preferencias.md`).
> Cada resposta tem ação concreta vinculada — não é Q&A acadêmico.

---

## Bloco A — Estrela polar (Doc 1 + Doc 3 do pacote 2026-05-21)

### Pergunta A1 — Validação da visão de longo prazo

Os 3 docs estratégicos do pacote (Ecossistema de Parceiros + Evolução Viva de Contexto + Evolução Estrutural) viraram a **base autoritativa da estrela polar** do KOD.AI?

- (a) Sim, são autoritativos — promover frente `aberto-objetivo-longo-prazo-kodai.md` para `ready-for-spec`
- (b) Sim em parte — quais conceitos manter / cortar
- (c) Não — são exploração; estrela polar fica indefinida até nova rodada
- (d) Outro

**Ação se (a) ou (b):** atualizo `KODAI/docs/STRATEGIC-NORTH.md` consolidando + movo frente aberta.

### Pergunta A2 — Horizonte temporal

Os 3 horizontes propostos na análise (curto ≤6m, médio 6-18m, longo 18m+) batem com sua intuição de prazo, ou você quer um cronograma mais agressivo / mais conservador?

**Ação:** ajusta roadmap em `STRATEGIC-NORTH.md` + reordena specs futuras.

### Pergunta A3 — Modelo de negócio KOD.AI

Frente já aberta na fila (Decisões aguardando). Bate em alguma destas opções?

- (a) Open-core gratuito (DAO-style — modelo Davi-only por anos)
- (b) Paid product (assinatura + suporte profissional)
- (c) Serviço/consultoria (KOD.AI é meio, não fim — venda implementação)
- (d) Híbrido (open-core + paid features + serviços premium)

**Ação:** decisão registrada em ADR + ajuste licença (atual `proprietary` → talvez MIT/Apache).

---

## Bloco B — Conceitos novos a formalizar (Doc 2 + Doc 3)

### Pergunta B1 — Candidate-to-core

A proposta de gate intermediário entre `/upstream-update` Modelo A e merge no upstream main faz sentido?

- (a) Sim, criar `KODAI/candidates/<data>-<tema>/` agora
- (b) Sim, mas deixar pra quando aparecer ≥2 consumidores reais (junto com Modelo B/C)
- (c) Não — gate atual via anti-pollution + Davi-curador é suficiente
- (d) Repensar — talvez seja "candidate-to-fork" antes de chegar no core

**Ação se (a):** spec `2026-05-22_candidate-to-core.md` + estrutura de pasta + workflow.

### Pergunta B2 — Lineage no manifest

Estender YAML manifest com campos `lineage.{parent, derives_from, contextos_filhos, validado_por, taxa_sucesso, nichos_compatíveis}` — quando?

- (a) Agora (próxima sessão) — atualizo 5-10 manifests piloto
- (b) Quando o piloto NV-Dev (amanhã) revelar precisão de quais campos importam
- (c) Outro

**Ação:** spec lineage + atualização incremental de manifests.

### Pergunta B3 — Closed Loop Evolution

O workflow proposto (pesquisa → impl → uso → validação → reflexão → refinamento → curadoria → core → distribuição) já tem 5 elos implementados. Faltam 3 (refinamento trigger, candidate gate, métrica de tech debt).

- (a) Construir os 3 elos faltantes em 1 spec única (workflow consolidado)
- (b) Spec separada por elo (mais ciclos, mais granular)
- (c) Não construir ainda — deixar emergir do uso real

---

## Bloco C — Operacional + ecossistema (Doc 1)

### Pergunta C1 — Primeiro parceiro universal

Doc 1 lista 9 categorias de parceiros universais (contabilidade, seguros, jurídico, pagamentos, financeiro, etc). Por onde começar?

- (a) Contabilidade — Decon já é cliente piloto natural (você + Denize)
- (b) Pagamentos — necessidade técnica recorrente em todo projeto
- (c) Infraestrutura — fundação técnica primeiro
- (d) Outro

**Ação:** primeiro pack de parceiro definido — pack `2-PACKS/packs/parceiros/<categoria>/` + manifest com `partner_type: universal | nicho`.

### Pergunta C2 — Obsidian sim/não

Doc 3 sugere Obsidian como atalho de curto prazo pra graph thinking.

- (a) Sim — adoto Obsidian já, com regra de não acoplar futuro
- (b) Não — Markdown puro + grep + diagramas mermaid são suficientes
- (c) Testo 1-2 semanas e decido

**Ação se (a):** vault Obsidian apontando pra `KODAI/` + plugin de grafo configurado.

---

## Bloco D — Pendências da fila (item 5 do goal)

### Pergunta D1 — Ordem de ataque

Lista atual factível (pós-vídeos transcritos):

- (a) Aprofundar par UX-Responsividade SMB → virar pack `dev/ui-responsivo-smb` (FUNCIONAL — sua frente Decon usa direto)
- (b) Aprofundar par CNTX SMB → virar contexto-domínio `sistemas-empresariais-br`
- (c) Brainstorming arquitetural (sequência das specs B1/B2/B3 acima)
- (d) Tudo paralelo se der tempo

### Pergunta D2 — Stack Dojô (J1 da fila P1)

Confirmar React Native + Expo + TypeScript pra dojo-familia-scholze?

- (a) Confirmado — gera spec inicial + estrutura
- (b) Outro stack — qual
- (c) Adiar — Decon Fase 1 primeiro

---

## Bloco E — Multi-cliente (preparação pra sexta-feira)

### Pergunta E1 — Primeiro projeto consumidor

Você mencionou "até o fim da semana — instalar KOD.AI funcional em projetos e começar a criar projetos com ele". Quais projetos?

- (a) decon-sistema (Decon — já existe, instalar via `/instalar` perfil contábil)
- (b) dojo-familia-scholze (greenfield — instalar perfil mobile)
- (c) Cliente novo externo (não-Davi) — qual?
- (d) Tudo acima

**Ação:** pra cada projeto, criar plano de instalação + perfil customizado se necessário (`/criar-perfil`).

### Pergunta E2 — Identidade visual do KOD.AI

O `_negocio/identidade/design-guide.md` está em DRAFT (dark minimalist). Vale formalizar antes do primeiro consumidor externo?

- (a) Sim — sessão dedicada de design system
- (b) Não — visual é só pra material interno; KOD.AI vende pela substância
- (c) Após primeiro consumidor (deixar uso real ditar)

---

## Como responder

Você pode responder no formato:
```
A1: a — promova frente
B1: b — defer até 2 consumidores
C2: c — testar 2 semanas
```

Ou em prosa livre — eu interpreto e ajo. Cada resposta gera ação concreta na sessão (commit, spec, decisão arquitetural).
