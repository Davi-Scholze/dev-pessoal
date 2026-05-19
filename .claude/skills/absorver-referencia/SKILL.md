---
name: absorver-referencia
description: >
  Absorve um framework de referência externo (comprado, provado) e produz um
  pack KOD.AI re-implementado + governado (Evidence Bloc, LGPD, honestidade,
  multi-cliente) — sem copiar verbatim. Aplica o protocolo
  `2-PACKS/_template-pack/REFERENCE-ABSORB.md` com gates humanos. Use sempre
  que o usuário disser "absorver referência", "/absorver-referencia", "portar
  skill de X pro KOD.AI", "transformar esse framework em pack", "ingerir
  SKILL.md externo", ou ao trabalhar com fontes externas isoladas que
  precisam virar capacidade nativa do KOD.AI.
allowed-tools: [Read, Write, Bash, Glob, Grep]
---

# /absorver-referencia — Absorção de referência externa em pack governado

> Status: **STUB** (nasce STUB; promove a DRAFT após 1º uso real com Evidence Bloc do `/complete`).

## Princípio

KOD.AI ganha músculo absorvendo capacidade de frameworks de referência externos (comprados, provados) — **sem copiar verbatim**. Esta skill é o **motor** que aplica o protocolo definido em `2-PACKS/_template-pack/REFERENCE-ABSORB.md` fase por fase, com gates humanos entre elas.

Não traduz. Não copia. **Reimplementa o método** a partir do entendimento, na voz e arquitetura do KOD.AI, somando a governança que a fonte não tem (Evidence Bloc, LGPD, honestidade, multi-cliente).

Reusa `/criar-pack` internamente para o scaffold (Passo 2). O resto é o protocolo REFERENCE-ABSORB aplicado com fidelidade.

## Workflow

### Passo 1 — Entrevista (uma pergunta por vez)

Nunca enfileira. Pergunta, espera resposta, próxima:

1. "Qual o framework de referência? (nome + URL OU 'privado/comprado')"
2. "Como você tem licença/autorização de uso?"
3. "Onde está a fonte ISOLADA? (path local read-only, fora do workspace de trabalho)"
4. "Qual versão/commit vamos absorver?"
5. "Qual(is) skill(s) ou módulo(s) da fonte vão virar este pack?"
6. "Categoria do pack alvo? (consulta `TAXONOMIA.md` — não cria categoria nova solo)"
7. "Nome do pack? (kebab-case, estável)"

Registrar todas as respostas como insumo para o `REFERENCE-ABSORB.md`.

### Passo 2 — Pre-flight  ▸  **[GATE 1]**

Aplica a **Fase 0** do `2-PACKS/_template-pack/REFERENCE-ABSORB.md`:
- Validar pré-requisitos (fonte existe? pack alvo livre? categoria válida na `TAXONOMIA.md`? licença clara?)
- Chamar `/criar-pack` internamente para o scaffold STUB do pack alvo (clona `_template-pack/`, preenche manifesto base)
- Apresentar resumo do escopo a Davi → **Davi aprova antes de qualquer ação posterior**

### Passo 3 — Inventário read-only

Aplica a **Fase 1** do REFERENCE-ABSORB:
- Ler arquivos da fonte que descrevem a(s) capacidade(s) (geralmente `SKILL.md` ou equivalente)
- Listar: capacidades expostas, dependências externas, formato/arquitetura, pontos de proteção de IP vs método genérico
- **Não modificar nada. Não copiar texto.** Aplica regra-base **2** (raw sagrado) — a fonte isolada nunca é alterada

### Passo 4 — Mapa origem→KOD.AI + governança somada  ▸  **[GATE 2]**

Aplica a **Fase 2** do REFERENCE-ABSORB:
- Produzir tabela mestra (passo da fonte → equivalente KOD.AI → governança somada)
- Governança a considerar por padrão: Evidence Bloc (regra-base **12**), LGPD (regra-base **4**), honestidade (regra-base **10**), multi-cliente
- **Davi aprova o mapa antes da reimplementação** — esse é o contrato da absorção

### Passo 5 — Reimplementação

Aplica a **Fase 3** do REFERENCE-ABSORB:
- Ler o trecho correspondente da fonte **uma única vez** → **fechar o arquivo** → escrever do entendimento
- Voz e arquitetura do KOD.AI
- Cada reference/recipe termina com bloco "Governança KOD.AI somada"
- Trabalhar com a fonte fechada reduz drasticamente cópia inadvertida

### Passo 6 — Revisão de conteúdo  ▸  **[GATE 3]**

Aplica a **Fase 4** do REFERENCE-ABSORB:
- Apresentar a Davi: lista de arquivos novos/modificados, diff resumido, blocos de governança somada
- Davi revisa antes da checagem automatizada; pode pedir ajustes (volta a Passo 5)

### Passo 7 — Checagem anti-verbatim + proveniência  ▸  **[GATE 4]**

Aplica a **Fase 5** do REFERENCE-ABSORB:
1. Executar a checagem definida no **Anexo B** do protocolo: n-gram ≥ 5 palavras consecutivas + checklist humano de 5 perguntas
2. Preencher `sources/proveniencia.md` conforme **Anexo A** (11 campos fixos) com método, resultado e evidência — honestamente, regra-base **10**. **Não maquiar.**
3. **FAIL** → bloqueia Passo 8 e volta a Passo 5 reescrever os trechos identificados
4. **PASS** → apresentar a Davi para autorização

### Passo 8 — Fechamento + handoff  ▸  **[GATE 5]**

Aplica a **Fase 6** do REFERENCE-ABSORB:
1. Atualizar `CHANGELOG.md` global do KOD.AI + `CHANGELOG.md` do pack
2. Status do pack: permanece **STUB**. Vai a **DRAFT** apenas após Evidence Bloc do `/complete` da spec consumidora (regra-base **12** — nunca declarar "done" sem evidência)
3. Propor commit a Davi. Commit acontece **somente com OK explícito** (regra-base **7**)

Handoff ao final (mensagem-template):

> "Pack `<categoria>/<nome>` absorvido de `<fonte>`. Status: STUB. Checagem anti-verbatim PASS. Proveniência registrada em `sources/proveniencia.md`. Vai a DRAFT após Evidence Bloc do `/complete` da spec consumidora."

## Diferença vs skills parecidas

| Skill | Faz o quê |
|---|---|
| `/criar-pack` | Cria pack STUB **sem fonte** (entrevista + scaffold do template) |
| `/criar-contexto` | Cria contexto-domínio novo dentro do KOD.AI (uso raro hoje — Camada 3 mudou de filosofia) |
| `/capturar-contexto-cliente` | Gera prompt-guia para pesquisar contexto de NEGÓCIO de cliente; resultado vive no projeto consumidor, não no KOD.AI |
| `/absorver-referencia` | Cria pack absorvendo **método** de uma fonte externa comprada/provada, com governança KOD.AI somada e checagem anti-verbatim |

Diferença-chave vs `/criar-pack`: aqui há **fonte externa de método**, anti-verbatim, proveniência, governança somada. `/criar-pack` é "do zero"; `/absorver-referencia` é "do zero **inspirado** em referência isolada".

## Regras

- **Anti-verbatim inegociável** — reimplementar do método, nunca copiar SKILL.md fonte. Anexo B do REFERENCE-ABSORB define o método de checagem; Passo 7 executa.
- **Gates humanos inegociáveis** — 5 gates explícitos no protocolo; Davi aprova entre fases sensíveis. Sem gate = não avança.
- **Fonte sagrada** — regra-base **2**: a fonte isolada nunca é alterada; somente leitura. Aplicada no Passo 3.
- **Honestidade** — regra-base **10**: relatório de checagem é honesto (PASS ou FAIL); proveniência registra a verdade; nunca maquiar. Aplicada no Passo 7 e na entrevista (não inventar dados).
- **Commit a cada passo** — regra-base **7**: commit só com OK explícito de Davi, no Passo 8 (Gate 5).
- **`/complete` antes de "done"** — regra-base **12**: status só vai a DRAFT após Evidence Bloc do `/complete` da spec consumidora.
- **Sessão dedicada recomendada** — para não inflar o contexto da sessão principal (boa prática KOD.AI).
- **Sem fallback automático** se `/criar-pack` (chamada interna no Passo 2) falhar — propaga o erro com contexto e para; Davi decide próximo passo.
