---
type: sintese
source: https://youtu.be/g5NBAkfO-ks
autor: Kelvin Cleto
data_captura: 2026-05-26
data_publicacao: 2026-05-26
duracao_min: 23.25
language: pt-br
bucket_sugerido: contexto-dominio (competitive-intelligence refresh + agentes-ia-construcao cross-ref)
status: PARCIAL (visual + metadata + cross-ref completa; integração de transcript pendente — Fase 3 in-progress no background)
related:
  - manifest.yaml
  - frames/descriptions.md
  - transcript.md (aguardando)
  - "../../../KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md"
  - "../../../KODAI/3-CONTEXTOS-DOMINIO/agentes-ia-construcao/DOMINIO.md"
  - "../../../KODAI/docs/STRATEGIC-NORTH.md (v1.3 §Concorrentes — Concorrente A)"
---

# Síntese — Kelvin Cleto: Playbook Invisível Escalar Empresa com IA 2026

> **Status honesto:** esta síntese é PARCIAL. Baseada em metadata + 15 frames descritos visualmente + cross-ref com `kelvin-cleto-vs-kodai.md`. Integração de transcript faster-whisper aguarda Fase 3 do pipeline (background task `b87dr5hg1`).

---

## Fonte

- **Tipo:** vídeo YouTube (público)
- **Origem:** https://youtu.be/g5NBAkfO-ks
- **Autor:** Kelvin Cleto (canal Kelvin Cleto, **Concorrente A canônico do KOD.AI**)
- **Atribuição obrigatória:** SIM (autoria externa)
- **Duração:** 23min15s
- **Data publicação:** 2026-05-26 (HOJE — material fresco)
- **CTA embutido:** workshop pago "Sistema Operacional de IA" em 30/05 (countdown visível no frame final)

---

## Narrativa visual reconstruída (sem transcript)

Vídeo segue estrutura clássica de "playbook teaser":

1. **Setup conceitual** (frames 1, 3, 5, 7) — Kelvin apresenta diagrama Miro central: **"O Cérebro"** (Dia-a-Dia + Integração + Processamento + Armazenamento) ↔ **"Os Agentes"** (Skills Gerais + Estratégicas). Introduz papel do **"Dono do Negócio"** como figura que orquestra. Formaliza filosofia **"Usar → Quebrar → Refazer"** com citação verbatim na tela: *"Precisamos ser AI First, deixa entender as fronteiras e usar no dia a dia"*.

2. **Demo técnica real** (frames 2, 8, 11, 12) — Kelvin alterna pro VS Code mostrando projeto `claude-code` com extrações JSON estruturadas em 7+ categorias (`extractions`, `follow_ups_pending`, `objections`, `claims`, `pain_points`, `frameworks`, `quotes`, `questions_doubts`, `wins_celebrations`). Exemplos reais visíveis: feedback literal de alunos do programa Accelera 360 (Felipe Antero, Ronaldo Silva) com timestamps + contexto + métrica de result.

3. **Catálogo de outputs possíveis** (frame 9) — Kelvin mapeia 3 categorias do que agentes IA podem criar: **Skills**, **Ferramentas**, **Próprio SaaS**. Frase na tela: *"vai nascer uma noção do que é ou não possível"*.

4. **Operacionalização tática** (frame 10) — cards kanban com tarefas-exemplo: *"Link do Webinário no Canal"*, *"Link do Instagram no Canal"*, *"Link do Webinário nos Vídeos"*, *"Testar criativos / conjuntos / campanhas diferentes"*. Demonstra agentes/automação aplicada em distribuição de conteúdo + ads.

5. **Demo SaaS próprio** (frames 13, 14) — Kelvin abre **"Growth AI"** (aplicação web própria) com sidebar Dashboard + Clientes, mostrando agente *"Accelera 2 (ZAP)"* (WhatsApp). Isso operacionaliza a categoria "Próprio SaaS" do f9 — Kelvin VENDE seu próprio sistema construído com IA.

6. **CTA final** (frame 15) — tela cheia preta com countdown "84 dias / 15 horas" + chamada *"Workshop Sistema Operacional de IA 30/05 — 555 ONLINE — Garantir Vaga"*.

---

## Stack visual identificada (sem transcript ainda)

| Camada | Componentes mencionados visualmente |
|---|---|
| **Cérebro — Dia-a-Dia** | Google Meet, Phone, Slack, WhatsApp, Teams, SaaS (genérico) |
| **Cérebro — Integração** | n8n (laranja), Asaas (roxo), outros ícones |
| **Cérebro — Processamento** | Bloco com código + ícone bot (Claude Code provável) |
| **Cérebro — Armazenamento** | Google Drive/Chrome com raio (storage) |
| **Os Agentes — Skills** | Gerais + Estratégicas (taxonomia 2 níveis) |
| **Os Agentes — Outputs** | Skills, Ferramentas, Próprio SaaS |
| **SaaS próprio Kelvin** | Growth AI (plataforma com agentes WhatsApp tipo "Accelera 2 ZAP") |
| **Programa pago** | Accelera 360 (alunos + extrações de calls JSON estruturadas) |

---

## Cross-ref com KOD.AI (3 contextos relevantes)

### 1. `competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md`

Atualização sugerida ao conceito existente:
- **Convergência confirmada:** stack "Cérebro + Agentes" alinha com KOD.AI tier model (L1 = Cérebro/integração determinística, L2 = IA assistiva, L3 = agentes autônomos do STRATEGIC-NORTH v1.4)
- **NOVO observado:** Kelvin usa **Claude Code como backbone de extração JSON estruturada** — mesmo padrão técnico do KOD.AI mas com schema próprio em 7-9 categorias
- **NOVO observado:** SaaS próprio (Growth AI) é o **paralelo direto** ao que KOD.AI vende como "instância dedicada por cliente" (decisão `feedback_modelo_negocio_kodai_consolidado`)
- **Lacuna confirmada:** Kelvin TEM SaaS próprio em produção; KOD.AI ainda não tem (Dojô case 0 está construindo)

### 2. `agentes-ia-construcao/DOMINIO.md` (KOD.AI)

Cross-ref ao pack-pirâmide 5 níveis:
- Kelvin opera essencialmente em **Nível 4 (Agentes parciais + handoff humano)** com aspirações de Nível 5 (AI-First Business OS)
- O 6-bloco fundamentals KOD.AI (LLM Core / Tools-MCP / Memory / Orchestration / RAG / Infra) tem correspondência direta com "Cérebro + Agentes" do Kelvin (Cérebro = Memory + RAG + Infra; Agentes = LLM Core + Tools + Orchestration)

### 3. `STRATEGIC-NORTH.md v1.4`

- Os **3 níveis L1/L2/L3** do KOD.AI são **alternativa explícita** ao modelo Kelvin de "tudo é agente". KOD.AI prega L1 sólido antes de L3 — Kelvin opera mais agressivamente em L3 desde o início
- A **regra de ouro** ("nunca venda L3 antes de L1 sólido") é potencial diferencial pitch vs Kelvin

---

## Decisões / insights destilados (preliminares — refinar com transcript)

1. **Filosofia "Usar → Quebrar → Refazer"** (f7) — princípio universal aplicável ao KOD.AI. Anti-perfeição, pró-iteração. Já alinha com Davi feedback `feedback_realidade_financeira_davi` (bootstrap radical, primeiro caso = aprendizado, não perfeição). **Universalizável.**

2. **Schema JSON 7+ categorias de extração de reunião** (f2, f8, f11) — `extractions`, `follow_ups_pending`, `objections`, `claims`, `pain_points`, `frameworks`, `quotes`, `questions_doubts`, `wins_celebrations`. **Candidato a pack KOD.AI** `ia/agentes-meeting-analyzer/` (re-implementação universalizada com nome próprio + atribuição). Cross-ref ao `_bundled-skills-manifest.yaml`.

3. **Taxonomia "Skills / Ferramentas / Próprio SaaS"** (f9) — 3 outputs possíveis de agentes IA. KOD.AI tem skills + packs + decisão "instância dedicada por cliente" — overlap conceitual com SaaS. Reflexão: **KOD.AI deveria documentar explicitamente que vende sistemas (= SaaS dedicado) E framework (= skills + packs)**.

4. **Growth AI como demonstração de SaaS vendável** (f13, f14) — Kelvin executou o "Próprio SaaS" e vende como case. **KOD.AI precisa do equivalente: Dojô (case 0) live em produção como demonstração**. Reforça urgência de fechar Sprint 1 do dojo após meta-evolução KOD.AI desta sessão.

5. **Workshop como funil de venda** (f15) — vídeo de 23min é teaser pra workshop pago "Sistema Operacional de IA". Padrão de funil que KOD.AI ainda não tem (sem capital pra ads, sem workshop monetizado). Memória `feedback_realidade_financeira_davi` aplica — KOD.AI prioriza primeiro caso pago via venda consultiva direta, não via funil de massa.

---

## Pessoas envolvidas (visíveis)

- **Kelvin Cleto** — orador único, dono Acelera 360 + Growth AI
- **Felipe Antero** — aluno Accelera 360 (mencionado no JSON f2/f8)
- **Ronaldo Silva** — aluno Accelera 360 (idem)

---

## Trechos textuais visíveis (não-transcript)

> *"Precisamos ser AI First, deixa entender as fronteiras e usar no dia a dia"* — slide Miro f7

> *"vai nascer uma noção do que é ou não possível"* — slide Miro f9

> *"Workshop Sistema Operacional de IA — 30/05 — 555 ONLINE — Garantir Vaga"* — slide CTA f15

> *"Engajamento alto com ideação - todo o ponto da ideia, um projeto, demais"* — feedback Felipe Antero capturado no JSON f8

(Trechos verbatim acima são captura visual de slides. **Anti-pollution flag:** se absorvidos no KOD.AI universal, paráfrase n-gram ≥5 obrigatória ou citação atribuída explícita.)

---

## Sugestão de absorção

- **Bucket primário:** `competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md` (atualizar com observação 2026-05-26)
- **Bucket secundário:** `agentes-ia-construcao/conceitos/` (criar conceito novo `meeting-extractions-schema.md` baseado nos 9 campos JSON observados, universalizado)
- **Bucket terciário:** `2-PACKS/packs/ia/` (avaliar pack `agentes-meeting-analyzer/` STUB)
- **Skill sugerida:** `/absorver-referencia inbox-davi/2026-05-26-kelvin-cleto-playbook-escalar-ia-2026/`
- **Anti-pollution flags:**
  - Marca "Acelera 360" + "Growth AI" + "Accelera 2 (ZAP)" — NÃO copiar pra contexto universal
  - Trechos verbatim → paráfrase n-gram ≥5 antes de absorção
  - Branding visual Kelvin (estética estúdio + polo preta) — irrelevante pra KOD.AI

---

## Próximos passos recomendados

1. **AGUARDAR transcript** (Fase 3 background — task `b87dr5hg1`)
2. **Reabrir esta síntese** quando transcript chegar; refinar insights 1-5 acima com citações verbatim do orador
3. **Decisão Davi:** absorver via `/absorver-referencia` OU arquivar como inbox-only (referência sem absorção)
4. **Se absorver:** atualizar `kelvin-cleto-vs-kodai.md` com seção "Update 2026-05-26" + criar conceito novo `meeting-extractions-schema.md`
5. **Spec separada:** considerar pack `ia/agentes-meeting-analyzer/` STUB se schema JSON for valioso

---

## Limitações honestas desta síntese

- **Sem transcript:** insights são reconstruídos visualmente. Pode haver insights críticos só no áudio (frameworks, exemplos numéricos, citações de outros autores)
- **Sem áudio analisado:** tom da fala, ênfase, pausas — perdidos
- **Análise frames:** 15 frames pra 23min = amostra esparsa; podem ter momentos importantes entre cenas
- **Cross-ref limitada:** baseado em `kelvin-cleto-vs-kodai.md` v1.0 (2026-05-21); versão mais recente pode ter detalhes

Status canônico desta síntese após integração transcript: PARCIAL → FUNCIONAL.
