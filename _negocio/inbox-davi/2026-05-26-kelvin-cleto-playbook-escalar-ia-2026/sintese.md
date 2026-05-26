---
type: sintese
source: https://youtu.be/g5NBAkfO-ks
autor: Kelvin Cleto
data_captura: 2026-05-26
data_publicacao: 2026-05-26
duracao_min: 23.25
language: pt-br
bucket_sugerido: contexto-dominio (competitive-intelligence refresh + agentes-ia-construcao cross-ref)
status: FUNCIONAL (pipeline /absorver-midia completo — 7/7 fases PASS)
related:
  - manifest.yaml
  - transcript.md (660 linhas faster-whisper)
  - frames/descriptions.md
  - "../../../KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md"
  - "../../../KODAI/3-CONTEXTOS-DOMINIO/agentes-ia-construcao/DOMINIO.md"
  - "../../../KODAI/docs/STRATEGIC-NORTH.md"
---

# Síntese — Kelvin Cleto: Playbook Invisível Escalar Empresa com IA 2026

> Síntese FINAL após integração transcript faster-whisper (660 linhas, 23:15 PT-BR, prob=1.00). Pipeline `/absorver-midia` PASS 7/7 fases. Material absorvido em 2026-05-26 (vídeo publicado no MESMO DIA).

---

## Fonte

- **Tipo:** vídeo YouTube (público)
- **Origem:** https://youtu.be/g5NBAkfO-ks
- **Autor:** Kelvin Cleto (canal Kelvin Cleto — **Concorrente A canônico KOD.AI**)
- **Atribuição obrigatória:** SIM (autoria externa)
- **Duração:** 23min15s
- **Data publicação:** 2026-05-26 (HOJE)
- **CTA embutido:** workshop pago "Sistema Operacional de IA" em 30/05 (R$47/tarde 1pm-8pm) + funil pra Acelera 360

---

## Narrativa (3 parágrafos)

Kelvin Cleto abre apresentando seu próprio **playbook documentado** pra construir "infraestrutura de IA" do próprio negócio. Estrutura central: 3 pilares (**O Cérebro** + **Os Agentes** + **O Dono**), com ênfase forte no terceiro — sem o dono USANDO IA pessoalmente, terceirizar não funciona porque ele "não conhece as fronteiras do que dá ou não pra fazer". Filosofia central: **dogfood ("comida de cachorro")** = dono usa → quebra → refaz → aprende. Anti-perfeição, pró-iteração.

Demonstra na prática mostrando: VS Code com projeto `claude-code` que extrai reuniões + WhatsApp + Teams + ClickUp + e-mail em **JSON estruturado** com schema canônico (extractions, follow_ups_pending, objections, claims, pain_points, frameworks, quotes, questions_doubts, wins_celebrations). Mostra ferramentas próprias construídas com IA (Growth AI = SaaS próprio + skill "Thumb Maker" que gerou thumbs deste mesmo vídeo + automação que transcreve YouTube → cérebro → gera e-mail de notificação). Stack revelada: **Claude (principal — R$8k+/mês Claude Max espalhado entre colaboradores)** + OpenAI (secundário) + n8n + ContaZul + Sped (NF) + Asaas + Open Design (Anthropic) + Telegram + WhatsApp.

Fecha com 3 alavancas econômicas da "infraestrutura de IA" (**aumentar faturamento** via funis IA + **aumentar margem** via redução custo operacional — landing pages que custavam R$800-1500 agora saem R$0 + **escalabilidade** — contabilidade regional vira nacional). Cita resultado próprio: **Acelera 360 faturou R$2,7M no primeiro ano (2025)**. Fórmula: "infraestrutura é intersecção entre IA + processos + estratégia". Termina com CTA pro workshop pago 30/05.

---

## Pessoas envolvidas

- **Kelvin Cleto** — orador único, 34 anos, ex-fundador General Plains (insurtech BR, vendeu 50.1% pro grupo IS em 2022, exit em 2025), agora à frente da **Acelera 360**
- **Felipe Antero** — aluno Accelera 360 (mencionado no JSON visível no VS Code)
- **Ronaldo Silva** — aluno Accelera 360 (idem)
- **Time CS Acelera 360** — citado como rodando no Telegram em modelo "piloto assistido"
- **KCG** — consultoria mencionada do Kelvin (uso interno ClickUp)

---

## 17 insights destilados (universalizáveis)

### Arquitetura (3)

1. **3 pilares canônicos:** Cérebro (dados) + Agentes (skills) + Dono (que usa). Sem Pilar 3, os outros 2 não geram resultado.

2. **"Cérebro" ≠ planilha/PDF/Obsidian** — é banco de dados estruturado, schema próprio, pra agente **consumir** (não pra humano ler). Origem: reuniões Teams, WhatsApp, ClickUp, vídeos YouTube transcritos, e-mails, suporte cliente.

3. **Schema canônico de extrações de reunião** (9 categorias observadas no VS Code do Kelvin):
   ```json
   {
     "extractions": [],
     "follow_ups_pending": [],
     "objections": [],
     "claims": [],
     "pain_points": [],
     "frameworks": [],
     "quotes": [],
     "questions_doubts": [],
     "wins_celebrations": []
   }
   ```
   Cada item com `date`, `from`, `result`, `context`. **Candidato a pack KOD.AI** `ia/agentes-meeting-analyzer/` STUB (re-implementação universalizada — anti-pollution n-gram ≥5).

### Filosofia (3)

4. **Dogfood inviolável:** "Aquilo que você quer que as pessoas façam, aplica no teu negócio. Faz, usa." Anti-perfeição, pró-iteração. Padrão: USAR → QUEBRAR → REFAZER.

5. **Dono evangelizador, não delegador:** "Se você não aplicar, não usar, não tentar fazer, você não vai conseguir terceirizar, porque você não vai saber as fronteiras." Dono que usa vira "evangelizador" do procedimento na empresa.

6. **Anti-céticos:** "O cético trava. Quando você terceiriza pro funcionário fazer pra você, e fica sentado esperando, o resultado vai ser zero. Porque ninguém vai estar tão comprometido com o negócio como o dono."

### Stack (3)

7. **LLM principal Claude (8k+/mês)** — Kelvin verbatim: *"hoje eu tenho um custo de aproximadamente uns 8 mil e pouco por mês de Cloud, porque eu coloco o Cloud Max na mão de cada colaborador que faz sentido"*. OpenAI como secundário ("meu psicólogo"). Resposta a objeção de preço: *"se Anthropic fechar/encarecer, tem OpenAI + outros + LLMs gratuitas open-source — não entre no mérito, foca em gerar resultado".*

8. **Stack completo identificado:**
   - LLM: Claude (Cloud) + OpenAI (secundário) + LLMs gratuitas (fallback futuro)
   - Automação: n8n
   - Integração + storage: Google Drive
   - SaaS contábil: ContaZul (despesas + tipificação)
   - SaaS NF: Sped (emissão automática por agente)
   - Pagamento: Asaas (visto nos frames)
   - CRM: próprio, configurado com IA
   - Mensageria: Telegram + WhatsApp
   - SaaS próprio: **Growth AI** (Kelvin demonstrou)
   - UI prototyping: **Open Design** (Anthropic) — Kelvin construiu protótipo navegável que virou base do dev real
   - Outras citações (não-verificadas): Open Cloud, PepeClip, Previve

9. **Acelera 360 = ecossistema/agência + escola** — vende para empresários transformação digital + cursos/workshops. Não vende "IA isolada", vende "infraestrutura de crescimento com IA".

### Modelo de negócio (4)

10. **3 alavancas econômicas canônicas** da infraestrutura de IA pra empresa cliente:
    - **Faturamento:** vender mais via IA (funis, marketing interno IA, geração de criativos)
    - **Margem:** reduzir custo operacional (landing pages R$800-1500 → R$0 via Claude; thumbnails feitas por agente; código + automação sem dev externo)
    - **Escalabilidade:** processo estruturado permite atender nacional, não só regional (ex: contabilidade regional vira nacional)

11. **Fórmula explícita:** *"Infraestrutura é a intersecção entre inteligência artificial, processos e estratégia."* (não é só "IA", não é só "automação")

12. **Resultado financeiro próprio:** Acelera 360 faturou **R$2,7M no primeiro ano (2025)** — métrica de validação social do playbook.

13. **Funil canônico Kelvin:**
    ```
    YouTube / Instagram → landing page → CRM →
    workshop pago R$47 (qualifica) → oferta Acelera 360 / Escola
    ```
    Automações específicas no funil: transcrição YouTube → cérebro (auto); geração e-mail notificação novo vídeo; geração post LinkedIn (desativado — "não dá retorno B2C"); ContaZul tipifica despesas (funcionário envia WhatsApp → tipifica + lança); Agente Sped emite NF automaticamente.

### Skills/Agentes (4)

14. **Hierarquia de skills observada:**
    - **Skills gerais** (do negócio)
    - **Skills estratégicas** (CEO, CFO, planejamento, análise dados, identificação padrões/problemas)
    - **Skills por setor** (financeiro, conciliação bancária)
    - **Skills com integrações específicas** (ContaZul, iPad NF, Asaas)

15. **Open Cloud / Open Design** — Kelvin usa SDK/CLI Anthropic intensivamente. Constrói SaaS próprios (Growth AI) sem time grande de dev.

16. **"Thumb Maker"** = skill própria do Kelvin que substituiu pessoa real que fazia thumbnails. Construída em 60 dias. Padrão de "skill que substitui posição operacional".

17. **CS Telegram piloto assistido** — Kelvin colocou time de Customer Success rodando no Telegram em modelo onde IA assiste, humano valida. Base de conhecimento: vídeos + aulas + treinamentos passados. Padrão **L2 IA Assistiva** do STRATEGIC-NORTH v1.4.

---

## Trechos textuais verbatim (atribuição obrigatória)

> *"Esse daqui é o playbook que eu usei, na verdade, que eu documentei pra criar a infraestrutura de IA do meu negócio."* — Kelvin Cleto, [00:00:00]

> *"Eu não tô falando de planilha, PDF que você joga na janela da IA. Não, eu tô falando de dados estruturados reais... cérebro, um banco de dados bem estruturado... não pra você ler. Eu tô falando de um armazenamento feito para uma agente de inteligência artificial consumir."* — [00:00:12]

> *"Aquilo que você quer que as pessoas façam, aplica no teu negócio. Faz, usa, entendeu?"* — [00:05:53] (filosofia dogfood)

> *"Eu falo que a infraestrutura é a intersecção entre inteligência artificial, processos e estratégia."* — [00:15:52]

> *"Se você acha que pagar 500 reais no Cloud é caro, entendo uma coisa, hoje eu tenho um custo de aproximadamente uns 8 mil e pouco por mês de Cloud, porque eu coloco o Cloud Max que é o que diz na mão de cada colaborador."* — [00:20:48]

> *"2025 com a acelera, a gente, basicamente ele bateu 2,7 milhões no primeiro ano de operação"* — [00:22:48]

**Anti-pollution:** trechos verbatim acima exigem **paráfrase n-gram ≥5** antes de absorção no KOD.AI universal OU citação explícita atribuída a Kelvin Cleto.

---

## Cross-ref com KOD.AI (atualização sugerida)

### `competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md` — Update 2026-05-26

Adicionar seção:

```markdown
## Update 2026-05-26 — Playbook "Infraestrutura de IA 2026"

Vídeo público (https://youtu.be/g5NBAkfO-ks) sintetiza a tese atual do Kelvin
em 3 pilares canônicos (Cérebro / Agentes / Dono). Confirma:

- Stack: Claude principal (R$8k+/mês Claude Max) + OpenAI secundário + n8n + ContaZul + Sped + Asaas
- Funil: YouTube → landing → CRM → workshop pago → Acelera 360
- Filosofia dogfood ("Usar → Quebrar → Refazer")
- Resultado: R$2.7M faturamento Acelera 360 em 2025 (validação financeira)
- SaaS próprio: Growth AI (plataforma com agentes WhatsApp tipo "Accelera 2 ZAP")

Convergência confirmada com STRATEGIC-NORTH v1.4:
- "Cérebro" = L1 (dados estruturados + integração + storage)
- "Agentes" = L2/L3 (skills + IA assistiva + agentes autônomos)
- "Dono evangelizador" alinha com bootstrap radical Davi (feedback_realidade_financeira_davi)

Divergência crítica (oportunidade defensável KOD.AI):
- Kelvin NÃO menciona LGPD em momento nenhum do vídeo
- Kelvin NÃO menciona governança Evidence Bloc / regras-base
- Kelvin NÃO menciona multi-tenant nativo (cada cliente parece projeto isolado)
- Kelvin NÃO menciona resiliência sem LLM (depende 100% Claude/OpenAI)
- Kelvin tem máquina de venda funil-de-massa; KOD.AI prioriza venda consultiva direta (bootstrap)
```

### `agentes-ia-construcao/conceitos/` — Conceito NOVO sugerido

`meeting-extractions-schema.md` (re-implementação universalizada do schema 9 categorias do Kelvin, sem usar branding Acelera):

```yaml
# Schema canônico de extração estruturada de reunião/call
categorias_canonicas:
  extractions: "Insights e learnings extraídos da conversa"
  follow_ups_pending: "Ações combinadas com responsável + prazo"
  objections: "Resistências do cliente/aluno + tratamento aplicado"
  claims: "Afirmações relevantes (do cliente, do produto, do mercado)"
  pain_points: "Dores identificadas (com classificação severidade)"
  frameworks: "Modelos mentais ou métodos referenciados"
  quotes: "Trechos verbatim valiosos (com atribuição)"
  questions_doubts: "Perguntas do participante (entra no FAQ futuro)"
  wins_celebrations: "Resultados/conquistas mencionados"

cada_item:
  date: "ISO 8601"
  from: "Pessoa que falou"
  result: "Síntese do item em 1 frase"
  context: "Onde aconteceu (call X, e-mail Y, msg WhatsApp grupo Z)"
```

### `niveis-operacionais-l1-l2-l3/DOMINIO.md` — Confirmação prática

Adicionar como case real: "Kelvin Cleto Acelera 360 demonstrou pipeline L1+L2+L3 funcional em 2026-05-26 vídeo público — R$2.7M faturamento valida tese de níveis."

---

## Sugestão de absorção

- **Bucket primário:** `competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md` (UPDATE 2026-05-26)
- **Bucket secundário:** `agentes-ia-construcao/conceitos/meeting-extractions-schema.md` (NOVO conceito universalizado)
- **Bucket terciário:** Pack `2-PACKS/packs/ia/agentes-meeting-analyzer/` STUB (re-implementação técnica do schema + workflow)
- **Skill sugerida pra absorção:** `/absorver-referencia inbox-davi/2026-05-26-kelvin-cleto-playbook-escalar-ia-2026/`
- **Anti-pollution flags:**
  - Marcas "Acelera 360", "Growth AI", "Accelera 2 (ZAP)", "Thumb Maker", "KCG", "General Plains" — NÃO copiar pra contexto universal
  - Citações verbatim do orador → paráfrase n-gram ≥5 OU atribuição explícita ao Kelvin
  - Schema JSON 9 categorias → universalizar (já feito acima — sem marca Acelera)

---

## Próximos passos recomendados

1. **Davi decide:** absorver via `/absorver-referencia` (executa 3 buckets acima) OU arquivar como inbox-only (referência sem absorção formal)
2. **Se absorver:** rodar update `kelvin-cleto-vs-kodai.md` + criar `meeting-extractions-schema.md` + criar pack STUB `ia/agentes-meeting-analyzer/`
3. **Cross-ref oportunidade defensável:** atualizar STRATEGIC-NORTH v1.5 mencionando que Kelvin tem 4 lacunas conhecidas (LGPD, governança Evidence Bloc, multi-tenant, resiliência sem LLM) — KOD.AI cobre todas
4. **Aplicação imediata Dojô:** schema de extração pode ser usado pra capturar reuniões Davi ↔ pai (Sensei Cristiano) e converter automaticamente em backlog/decisões

---

## Limitações honestas

- **Trechos com ruído Whisper:** linhas 537-564 do transcript têm loop "que ter que ter" (Whisper hallucination em silêncio/transição) — ignorar bloco
- **Marcas citadas não-validadas:** "Open Cloud", "PepeClip", "Previve" — podem ser nomes pessoais do Kelvin, marcas reais, ou erros de transcrição. Não absorver como ferramentas validadas sem verificar
- **Dados financeiros não-verificados:** R$2.7M Acelera 2025 + R$8k/mês Claude = números do próprio Kelvin (sem auditoria externa)
- **Workshop preço R$47** = preço de teaser (provavelmente pra qualificar leads, não receita primária — produto principal é Acelera 360 escola)

---

## Evidence Bloc — Pipeline `/absorver-midia` 7/7 fases PASS

| Fase | Status | Comando/resultado |
|---|---|---|
| 1. Pré-flight | PASS | yt-dlp 2026.03.17 + ffmpeg 8.1.1 + faster-whisper 1.2.1 validados |
| 2. Download | PASS | source.mp4 50.18 MiB em 2s |
| 3. Áudio + Transcript | PASS | audio.opus 5.4 MiB (32kbps) + transcript.md 660 linhas faster-whisper small int8 CPU (1395.5s reconhecidos) |
| 4. Frames | PASS | 15/15 via ffmpeg scene-change threshold 0.4 |
| 5. Descrição multimodal | PASS | Claude vision direto nos 15 frames → descriptions.md |
| 6. Síntese estruturada | PASS | sintese.md com narrativa + 17 insights + cross-ref + verbatim |
| 7. Manifest + reporte | PASS | manifest.yaml + commit + push |

**Conclusão validação:** skill `/absorver-midia` está FUNCIONAL end-to-end em arquitetura Davi (Windows + Python 3.14.3 + faster-whisper modelo small CPU). Promoção DRAFT → FUNCIONAL aprovada pelo Evidence Bloc desta sessão.
