---
name: capturar-contexto-cliente
description: >
  Gera um prompt-guia para o usuário capturar o contexto de NEGÓCIO
  específico do cliente/projeto via pesquisa (extensão Chrome do Claude
  Code) → Google Doc → NotebookLM. Use sempre que o usuário disser
  "capturar contexto", "/capturar-contexto-cliente", "preciso entender
  esse vertical", "não tenho contexto desse negócio", "pesquisa o que
  esse cliente precisa", ou no onboarding quando NÃO houver contexto-
  domínio pronto (que é o caso padrão — KOD.AI não entrega domínio
  pré-pronto). Dispare também a qualquer momento, não só no /instalar.
allowed-tools: [Read, Write, Bash, Glob]
---

# /capturar-contexto-cliente — Captura de contexto de negócio específico

> Status: **STUB** (nasce STUB; promove a DRAFT após 1º uso real com Evidence Bloc).

## Princípio

KOD.AI **não entrega conhecimento de negócio pré-pronto**. Entrega o geral
(esqueleto, regras, metodologias). O específico de cada cliente é **capturado
sob demanda** — sempre fresco, nunca um STUB desatualizado.

Esta skill não pesquisa sozinha: ela **gera o prompt-guia** que o usuário roda
numa sessão dedicada (extensão Chrome do Claude Code, com acesso a web), que
produz Google Doc + NotebookLM. O resultado volta e vira o contexto-domínio
daquele projeto.

Reusa o padrão do `2-PACKS/_template-pack/RESEARCH-PROMPT.md`, mas para
**conhecimento de negócio do cliente**, não pack técnico.

## Workflow

### Passo 1 — Entrevista mínima (uma pergunta por vez)

Nunca enfileira. Pergunta, espera, próxima:

1. "Que tipo de negócio/cliente é esse? (vertical — ex: clínica odontológica, escritório contábil, dojo)"
2. "Em uma frase, o que esse negócio faz e pra quem?"
3. "Qual o problema concreto que o sistema/projeto vai resolver pra ele?"
4. "Tem regulação específica que você já sabe que se aplica? (ex: LGPD saúde, ISS, CFM) — se não souber, tudo bem, a pesquisa cobre."
5. "Tem material bruto já (PDF, áudio transcrito, print)? Onde está?"

### Passo 2 — Gerar o prompt-guia parametrizado

Criar arquivo `<projeto>/contextos/captura/<YYYY-MM-DD>-<vertical>-PROMPT.md`
com este conteúdo (preenchendo `<...>` com as respostas do Passo 1):

```markdown
# PROMPT-GUIA DE CAPTURA — <vertical>

> Cole numa sessão Claude Code (extensão Chrome, com web). Sessão DEDICADA,
> não a principal. Objetivo: pesquisar e consolidar o contexto de negócio
> deste vertical em 1 Google Doc + 1 NotebookLM.

Você é um pesquisador-arquiteto de domínio. Pesquise o vertical abaixo e
produza material consumível.

## Vertical
<resposta Q1 + Q2>

## Problema a resolver
<resposta Q3>

## O que pesquisar
1. **Regras e regulação** do vertical (leis, normas, órgãos) <inclua Q4 se houver>
2. **Fluxos típicos** de operação do negócio (como funciona o dia a dia)
3. **Stakeholders** (quem são, dores, vocabulário próprio)
4. **Players e benchmarks** (concorrentes, softwares de referência do setor)
5. **Integrações comuns** (com que sistemas esse negócio costuma falar)
6. **Anti-patterns** (erros conhecidos ao construir pra esse vertical)

Filtros: fontes ≤18 meses para regulação; prioriza fontes oficiais.

## Entregáveis
1. **Google Doc** consolidado: `KODAI — Contexto <vertical>` com as 6 seções acima
2. **NotebookLM** `KODAI — <vertical>`, importando o Google Doc + fontes-chave
3. **System prompt do NotebookLM** (cole em Customize):
   "Você é especialista no vertical <vertical>. Responda só com base nas
   fontes deste notebook, citando. Quando faltar info, diga antes de adivinhar."

## Reporta de volta
- URL do Google Doc
- URL do NotebookLM
- Lista das fontes principais usadas
```

Mostrar ao usuário o caminho do arquivo gerado e instruir:

> "Gerei o prompt-guia em `<caminho>`. Abra uma sessão Claude Code dedicada
> (extensão Chrome), cole o conteúdo, e rode. Quando terminar, me traga as 2
> URLs (Google Doc + NotebookLM)."

### Passo 3 — Receber resultado e registrar contexto

Quando o usuário trouxer as URLs:

1. Clonar `<KODAI>/3-CONTEXTOS-DOMINIO/_template-contexto/` para
   `<projeto>/contextos/dominio/<vertical>/`
2. Preencher o `DOMINIO.md`:
   - `status: DRAFT` (tem material real agora)
   - links do Google Doc + NotebookLM em `sources/`
   - gatilhos de ativação a partir das respostas do Passo 1
3. Registrar em `<projeto>/KODAI-INSTALADO.md` na seção de contextos:
   `| <vertical> | DRAFT | capturado <data> | <URL NotebookLM> |`
4. Material bruto (Q5), se houver, copiar para `_negocio/contextos/dominio/<vertical>/_bruto/`
   (sagrado — nunca alterar; Regra 2 do KOD.AI)

### Passo 4 — Handoff

> "Contexto `<vertical>` capturado e registrado como DRAFT. O NotebookLM fica
> como fonte consultável. Quando o projeto validar em uso real, promove pra
> FUNCIONAL com Evidence Bloc."

## Diferença vs skills parecidas

| Skill | Faz o quê |
|---|---|
| `/capturar` | Salva input bruto de stakeholder no inbox (não pesquisa) |
| `/criar-contexto` | Cria contexto-domínio NOVO dentro do KOD.AI (produto) |
| `/capturar-contexto-cliente` | Gera prompt-guia → pesquisa → Doc+NotebookLM → contexto do PROJETO consumidor |

A diferença-chave: esta skill produz contexto **para o projeto do cliente**,
não para o KOD.AI. KOD.AI continua só com o geral.

## Regras

- **Não pesquisa sozinha** — gera o prompt-guia; a pesquisa roda em sessão dedicada
- **Uma pergunta por vez** na entrevista
- **Contexto sempre DRAFT ao nascer** (Regra 10 KOD.AI — honestidade)
- **`_bruto/` sagrado** (Regra 2)
- **Não duplica** — se já existe `_negocio/contextos/dominio/<vertical>/`, propõe estender
