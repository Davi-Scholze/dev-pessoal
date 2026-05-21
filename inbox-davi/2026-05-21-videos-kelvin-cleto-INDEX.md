---
tipo: indice-mestre-videos
data: 2026-05-21
proposito: catalogo dos 5 videos do Kelvin Cleto (concorrente direto KODAI) absorvidos via /absorver-midia
status: aguardando-transcricoes-completarem
---

# Índice mestre — 5 vídeos Kelvin Cleto (2026-05-21)

> **TODOS os 5 vídeos enviados por Davi neste pacote são do mesmo autor:** Kelvin Cleto — já mapeado como **concorrente KODAI** no NotebookLM `a30c744e` ("CONCORRENTE KODAI - Kelvin Cleto: The Infrastructure of AI Entrepreneurship").

## Implicação estratégica

Estes 5 vídeos são **inputs diretos** para:

| Eixo / Frente | Por quê |
|---|---|
| `aberto-objetivo-longo-prazo-kodai.md` (estrela polar) | Kelvin tem posicionamento IDÊNTICO ao KODAI ("AI First OS", "Claude como OS da empresa") — entender o que ele já capturou + onde KODAI se diferencia |
| Doc 1 do Davi (Ecossistema de Parceiros) | Kelvin vende serviços + sistemas — modelo de negócio comparável |
| Contexto `competitive-intelligence` upstream | Material rico pra atualizar análise de concorrentes SaaS |
| Pergunta A3 do Q&A (modelo de negócio KOD.AI) | Vídeos mostram o modelo real de receita do Kelvin |
| `PERGUNTAS-QA-KODAI.md` pergunta A1 (validação estrela polar) | Confirmar/refinar estrela polar contra benchmark real |

## Catálogo dos 5 vídeos

| # | URL | Título | Duração | Slug inbox |
|---|---|---|---|---|
| 1 | `youtu.be/IfPSw14VfZs` | Como Estou Usando IA Na Minha Empresa Em 2026 (me copie) | 32.2min | `2026-05-21-ifpsw14vfzs` |
| 2 | `youtu.be/mVN2Q_EUPwE` | Meu setup REAL de IA: Claude Code + OpenClaw + Mission Control (sem enfeite) | 15.8min | `2026-05-21-mvn2q-eupwe` |
| 3 | `youtu.be/69XDrNFXNco` | Pare de Rodar Tráfego Pago pra Vender IA (Faça Isso Antes) | 13.0min | `2026-05-21-69xdrnfxnco` |
| 4 | `youtu.be/u0njPG-rXj8` | Esqueça Agentes: Vendi CLAUDE como OS da Empresa (Caso Real) | 19.4min | `2026-05-21-u0njpg-rxj8` |
| 5 | `youtube.com/live/QpL8_lQquf4` | **AI First OS - Criando seu próprio Sistema operacional de IA** (live) | **117min (1h57m)** | `2026-05-21-qpl8-lqquf4` |

**Duração total:** 197.4 min (~3.3h de conteúdo)
**Tempo estimado de transcrição:** ~30-35min faster-whisper small em série
**Tempo wall total do batch:** ~45-60min (download + audio + transcribe + frames + manifest)

## Temas mapeados (pré-transcrição)

### Vídeo 1 — Como uso IA na minha empresa em 2026 (32min)
**Tema esperado:** aplicação prática IA em rotinas empresariais. Provável fonte de padrões operacionais reutilizáveis.

### Vídeo 2 — Setup REAL: Claude Code + OpenClaw + Mission Control (16min)
**Tema esperado:** stack técnica detalhada. **Concorrência direta** ao SCHOLZE-STACK + KOD.AI. Material precioso pra ver onde KOD.AI já tem (ou não) o que Kelvin demonstra.

### Vídeo 3 — Pare de rodar tráfego pago pra vender IA (13min)
**Tema esperado:** go-to-market sem ads. Captação orgânica + redes. Útil pro plano de negócio KOD.AI.

### Vídeo 4 — Vendi Claude como OS da Empresa (Caso Real) (19min)
**Tema esperado:** caso real de venda. **Material crítico pra modelo de receita KOD.AI** (pergunta A3 do Q&A).

### Vídeo 5 — AI First OS - Criando seu próprio Sistema Operacional de IA (1h57m live)
**Tema esperado:** **a aula mestra do concorrente.** Posicionamento, arquitetura, filosofia. Provável que cubra TUDO que KOD.AI faz. Análise comparativa obrigatória.

## Plano de absorção pós-batch

Quando todos os 5 vídeos completarem (transcript.md + manifest.yaml + frames/):

### Fase 1 — Síntese estruturada por vídeo (automática)

Por vídeo, gerar `sintese.md` no inbox dele com:
- **Narrativa:** sumário em 1-2 parágrafos
- **Decisões mapeadas:** lista de escolhas técnicas/comerciais que Kelvin defende
- **Tópicos extraídos:** keywords + categorias
- **Sugestão de absorção:** qual skill chamar (`/absorver-contexto` vs `/absorver-referencia` vs só arquivar)

### Fase 2 — Análise comparativa transversal

Arquivo único `ANALISE-COMPARATIVA-KELVIN-CLETO.md` (ou commit num doc do upstream `competitive-intelligence/`):

- **O que Kelvin tem que KOD.AI também tem** — convergência
- **O que Kelvin tem que KOD.AI não tem** — gap (avaliar se vale)
- **O que KOD.AI tem que Kelvin não tem** — diferencial (validar)
- **Posicionamento textual:** comparar frase canônica ("KOD.AI é a melhor empresa de contexto do mundo" vs frase do Kelvin)
- **Modelo de receita:** o que Kelvin cobra, por quê, como entrega
- **Stack técnica:** o que ele usa vs SCHOLZE-STACK + KOD.AI

### Fase 3 — Atualização do KOD.AI

Possíveis ações dependendo do que análise revelar:
- Atualizar `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/` com síntese fresca
- Cruzar com `aberto-objetivo-longo-prazo-kodai.md` (frente estrela polar)
- Pequenos ajustes no `STRATEGIC-NORTH.md` se Kelvin revelar gap importante
- NÃO copiar verbatim ideias — re-implementar quando aplicável (regra anti-pollution)

## Anti-pollution levantado

**Autoria = externa** (declarada na chamada `/absorver-midia --autoria externa`). Implica:

- Trechos verbatim do Kelvin NÃO viram texto do KOD.AI
- Conceitos podem ser re-implementados universalizados com atribuição explícita
- `REFERENCE-ABSORB.md` protocol aplicado quando virar contribuição upstream
- `checks.js` anti-pollution validado quando promover qualquer trecho

## Status atual do batch

- Batch v3 disparado: task `bnrezfnd3`
- Ordem: vídeos 1-4 (curtos) primeiro, vídeo 5 (live) por último
- Estimativa de conclusão: ~18:00 UTC (45-60min após início 17:04)
- Monitor ativo: `b4m4ydbb5` (filtra OK/FALHOU por vídeo)

## Cruzamento com notebooks existentes

NotebookLM `a30c744e` ("CONCORRENTE KODAI - Kelvin Cleto") já tem análise prévia do Kelvin (anterior aos 5 vídeos). Estes 5 vídeos **expandem** o material disponível pra esse notebook. Sugestão: adicionar os 5 vídeos como **novas fontes** no notebook ao final da absorção, pra que `/notebooklm` queries futuras tenham acesso direto.
