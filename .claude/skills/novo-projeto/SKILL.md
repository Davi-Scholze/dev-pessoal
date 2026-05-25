---
name: novo-projeto
description: >
  Workflow LEVE pra criar novo cliente/projeto dentro de pasta KOD.AI já instalada
  (multi-cliente — _negocio/clientes/<slug>/ ou repos/<projeto>/). Entrevista 4
  perguntas → cria pasta dedicada com CLAUDE.md herdado + briefing.md + subpastas
  conforme entregas. Use quando disser "novo cliente", "novo projeto",
  "/novo-projeto", "começar projeto pra X", ou pedir pra estruturar trabalho novo.
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

# Skill: `/novo-projeto`

Onboarding leve de cliente/projeto dentro de workspace KOD.AI multi-cliente.

## Princípio

> **Não é `/instalar` (que cria pasta-mãe inteira).** É workflow MAIS LEVE pra adicionar cliente/projeto novo dentro de pasta KOD.AI já existente.

## Quando disparar

- "novo cliente"
- "novo projeto"
- "/novo-projeto"
- "começar projeto pra X"
- "estruturar trabalho novo pra Y"

**NÃO usar:**
- Workspace ainda não inicializado → use `/instalar`
- Cliente já existe → não criar duplicata
- Projeto interno KOD.AI (não cliente) → usa `/criar-pack` ou `/criar-contexto`

## Workflow (4 perguntas + setup)

### Passo 1 — Entrevista (4 perguntas)

```
1. Qual o nome do projeto/cliente? (pra gerar slug kebab-case)
2. É (a) cliente novo, (b) projeto interno, (c) iniciativa pessoal Davi?
3. Qual o objetivo principal? (1 frase)
4. Que tipo de entrega vai ter? (ads, site, conteúdo, automação, proposta — pode ser mais de 1)
```

### Passo 2 — Decidir local baseado em resposta 2

| Resposta 2 | Local |
|---|---|
| (a) Cliente novo | `_negocio/clientes/<slug>/` |
| (b) Projeto interno | `_negocio/projetos/<slug>/` (cria se não existir) |
| (c) Iniciativa pessoal | `_negocio/iniciativas/<slug>/` ou conforme estrutura existente |

Confirmar com Davi antes de criar.

### Passo 3 — Estrutura base criada

```
<slug>/
├── CLAUDE.md          Auto-instruções (herda da raiz + específicas)
├── 00-briefing.md     Briefing coletado na entrevista
├── _index.md          MoC (Map of Content)
└── <subpastas conforme entregas>
    ├── marketing/     se mencionou ads/conteúdo
    ├── site/          se mencionou site
    ├── propostas/     se mencionou proposta
    ├── automacao/     se mencionou automação
    └── ...
```

### Passo 4 — CLAUDE.md template (herdado)

```markdown
# <Nome Projeto/Cliente>

> Criado em <data>. Pasta dedicada — instruções aqui sobrescrevem raiz quando relevantes.

## Sobre

<resposta 3 — objetivo>

## Tipo

<resposta 2>

## Entregas previstas

- <entrega 1>
- <entrega 2>
- ...

## Onde salvar o que

- Briefings e contexto: nesta pasta
- Entregas: subpastas criadas (marketing/, site/, propostas/, etc)

## Contexto herdado da raiz

Este projeto herda automaticamente:
- Tom de voz: `../../_memoria/preferencias.md`
- Marca: `../../_negocio/identidade/design-guide.md`
- Negócio Davi: `../../_memoria/empresa.md`
- Skills KOD.AI: `../../.claude/skills/` (todas disponíveis)

Não duplicar essas informações aqui.

## Específico deste projeto

<vazio — preencher com regras que valem só pra este cliente conforme descobrir>

## Próximas ações

- [ ] Capturar primeiro brief com cliente (`/capturar`)
- [ ] Validar pacote de entrega (`PACOTE-DAVI-PADRAO.md` ajustado)
- [ ] Configurar identidade visual (se diferente da default)
- [ ] Setup técnico das entregas (skills específicas)
```

### Passo 5 — Briefing.md (auto-preenchido)

```markdown
---
title: <Nome>
type: briefing
slug: <slug>
created: <YYYY-MM-DD>
status: novo
tipo: <cliente | projeto-interno | iniciativa-pessoal>
---

# Briefing — <Nome>

## Objetivo
<resposta 3>

## Tipo
<resposta 2>

## Entregas previstas
<resposta 4 — lista>

## Próximas perguntas a fazer ao cliente
- Quem é o decisor? (econômico + técnico)
- Qual o prazo esperado?
- Qual o orçamento aproximado?
- Há concorrentes / referências?
- Dores principais?
- Métricas de sucesso?

## Status atual
- [x] Pasta criada
- [ ] Briefing inicial completo
- [ ] Identidade visual definida (se diferente da default)
- [ ] Setup técnico iniciado
```

### Passo 6 — Atualizar índices

- `_negocio/clientes/_index.md` (ou equivalente) — adicionar linha do novo cliente
- `_memoria/empresa.md` — anotar "atendendo cliente X" se for primeiro do tipo

### Passo 7 — Sugerir próximas skills

Output da skill termina com bloco "Próximo passo":

```
✅ Pasta criada em <path>.

📍 Sugestões próximas:
1. /capturar — registrar primeira conversa/email com cliente
2. /proposta-cliente — gerar proposta comercial (se ainda não tem)
3. /mapear-concorrente — entender concorrentes do cliente (existente FUNCIONAL)
4. /seo (futuro A10) — preparar site + Google
```

## Regras

1. **Nunca sobrescreve pasta existente.** Verifica antes de criar (`test -e`).
2. **Slug kebab-case sem acento.** "Clínica Dr. José" → `clinica-dr-jose`.
3. **CLAUDE.md herdado.** Não duplica info da raiz.
4. **Subpastas só conforme entregas.** Não criar `marketing/` se cliente não pediu marketing.
5. **Briefing.md sempre.** Mesmo vazio (preenchido depois).

## Casos especiais

### Cliente que vira projeto recorrente

Inicia como `_negocio/clientes/<slug>/`. Se virar conta-mãe (vários projetos pro mesmo cliente):
- Move pra `_negocio/clientes/<slug>/`
- Cria subpastas `<slug>/projeto-2024-Q1/`, `<slug>/projeto-2024-Q2/`, etc

### Projeto interno que vira venda

Inicia como `_negocio/projetos/<slug>/`. Se virar pacote vendável:
- Promove pra pack universal `2-PACKS/packs/<categoria>/<slug>/`
- Mantém versão cliente em `_negocio/clientes/<primeiro-cliente>/<slug>/`

### Iniciativa pessoal Davi

Pode ficar fora de `_negocio/` se for de Davi-pra-Davi (ex: dogfooding novo). Default: `_negocio/iniciativas/`.

## Anti-padrões

| Padrão | Por quê problemático | Correção |
|---|---|---|
| Criar `clientes/<slug>/` sem confirmar tipo | Pode ser projeto interno disfarçado | Pergunta 2 sempre obrigatória |
| Slug com acento ou espaço | Quebra `git mv`, paths, URLs | Slugify obrigatório |
| Criar todas subpastas mesmo sem entrega | Polui pasta com vazias | Só criar subpasta mencionada |
| Pular briefing.md | Cliente futuro fica sem contexto | Briefing.md sempre, mesmo vazio |
| Não atualizar `_index.md` | MoC desatualizado | Update obrigatório |

## Bridging com outras skills (auto-instrução)

```yaml
sugere_proxima_skill:
  - condicao: "cliente novo + sem briefing real ainda"
    skill: capturar
    razao: "Registrar primeira conversa/email cliente"
  - condicao: "cliente novo + proposta pendente"
    skill: proposta-cliente
    razao: "Gerar proposta comercial inicial"
  - condicao: "cliente B2B + concorrência relevante"
    skill: mapear-concorrente
    razao: "Entender concorrentes antes de posicionar"
  - condicao: "projeto inclui site"
    skill: seo
    razao: "Preparar SEO + Google Power desde início"
```

## Limitações honestas

- **Não substitui `/instalar`** (instalar inicializa pasta-mãe completa; `/novo-projeto` adiciona cliente dentro)
- **Não cria CNPJ / credenciais cliente** (só estrutura)
- **Davi modera convenção `_negocio/clientes/` vs `_negocio/projetos/`** — em pasta-mãe muito grande, pode precisar refatorar
- **Não automatiza onboarding com cliente** (humano faz reunião + entrevista — esta skill só estrutura pasta)

## Origem

Davi 2026-05-22 — frente A9 (paridade MazyOS). MazyOS tem `/novo-projeto` análogo. KOD.AI tinha `/instalar` (pesado) + `/criar-pack/contexto/perfil` (universal) mas FALTAVA fluxo leve pra adicionar cliente novo. Esta skill fecha o gap.

Re-implementação universalizada (anti-pollution): conceito "novo projeto + CLAUDE.md herdado" é padrão público da indústria multi-tenant. Estrutura própria adaptada a `_negocio/clientes/` KOD.AI.

Frente: A9 em `docs/decisoes/2026-05-22_frentes-abertas-consolidado.md`.
