---
name: pedir-contexto
description: >
  Detecta gap de contexto (foto/print/link/vídeo/áudio/doc/credencial faltando) durante execução
  de outra skill OU em conversa livre, e pede ATIVAMENTE ao usuário o material necessário em
  formato específico — não fica adivinhando, não fica tentando alternativas silenciosamente.
  Use quando: WebFetch falhar (ECONNREFUSED, 404, vazio), conceito sem fonte ancorada, usuário
  pedir análise sem enviar material, pré-flight de skill identificar input ausente, ou skill
  detectar lacuna explícita. Sai do modo "tentar mais N URLs" ou "inventar baseado em
  suposição" — entra no modo "pedir formato específico ao humano". Sempre oferece 2-3
  alternativas de como prover (URL direta, NotebookLM, screenshot, paste de texto). Após
  receber, dispara skill de absorção apropriada (/capturar-imagem, /absorver-contexto,
  /ativar-notebooklm, /transcribe-audio).
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - SlashCommand
---

# Skill: `/pedir-contexto`

Skill ativa que pede contexto ao humano quando KOD.AI detecta que precisa. Anti-padrão: ficar tentando alternativas silenciosamente ou inventar baseado em palpite.

## Quando disparar

**Triggers explícitos:**
- `/pedir-contexto <tipo>` (ex: `/pedir-contexto foto-logo-cliente`)
- "Pede ao Davi um print de X"
- "Preciso de mais contexto sobre Y, pede pra ele"
- "Faltam fontes pra Z"

**Triggers contextuais (auto-disparo, sem confirmação):**
- **WebFetch falha** consecutivamente (≥2 URLs ECONNREFUSED / 404 / vazio) durante skill ativa
- **Skill ativa pede input que não foi fornecido** (ex: `/mapear-concorrente <nome>` sem URL acessível)
- **Conceito sem fonte ancorada** sendo criado/atualizado (`competitive-intelligence/conceitos/X.md` sem NotebookLM/WebFetch validado)
- **Operador faz claim que exige evidência** mas não anexa material ("vamos analisar esse concorrente Y" sem URL)
- **Pré-flight de outra skill identifica input ausente** (ex: `/proposta-cliente` sem material do cliente, `/absorver-contexto` sem path apontado)

**NÃO disparar quando:**
- WebFetch falhou só 1 vez (tentar 1-2 alternativas razoáveis primeiro)
- Operador já está em meio a outra interação e gap é resolvido por contexto adjacente
- Material já existe no projeto (`/sugerir-pesquisa` é melhor caminho — verificar primeiro)
- Gap é fácil de resolver via heurística sem precisar input humano (ex: nome → slug)

## Pré-requisitos

- Identificar **tipo de contexto faltando** (foto, print, link, vídeo, áudio, doc texto, credencial, NotebookLM)
- Identificar **finalidade do contexto** (referência design, análise técnica, decisão de roadmap, etc)
- Identificar **skill ou tarefa bloqueada** pelo gap (pra explicar urgência ao usuário)

## Argumentos

```
/pedir-contexto <tipo>                       → pede contexto do tipo, formato livre
/pedir-contexto <tipo> --para <skill-alvo>   → contextualiza pra skill específica (mais info no pedido)
/pedir-contexto --silencioso                 → registra gap sem perguntar (próxima sessão usa)
```

## Workflow (4 fases)

### Fase 1 — Identificação do gap

Antes de pedir, IA deve internalizar:

1. **Tipo de contexto:** foto | print | link/URL | vídeo | áudio | doc texto | credencial/token | NotebookLM | dados estruturados (CSV/JSON)
2. **Finalidade:** referência design | análise técnica concorrente | decisão arquitetural | input pra implementação | evidência pra documentação | validação humana
3. **Skill/tarefa bloqueada:** qual skill ativa OU intenção do usuário fica travada sem isso
4. **Tentativas já feitas:** o que JÁ tentei (WebFetch URLs X/Y/Z, busca em pasta, NotebookLM disponíveis)
5. **Alternativas:** 2-3 formatos diferentes de prover (cliente decide qual é mais fácil)

### Fase 2 — Formatação do pedido

Pedido segue template canônico:

```
🔍 Preciso de contexto adicional pra continuar.

**Contexto:** <skill/tarefa em curso e por que travou>

**O que tentei até agora:**
- <tentativa 1: ex: WebFetch https://X.com → ECONNREFUSED>
- <tentativa 2: ex: busca em pasta-mãe por arquivo Y → não achei>

**Preciso de [<tipo de contexto>]:**

**Finalidade:** <uma frase explicando pra que vai servir>

**Como prover (escolha o mais fácil):**

(a) <opção mais simples — ex: URL específica de fonte que funcione>
(b) <opção alternativa — ex: criar NotebookLM e me passar ID>
(c) <opção de fallback — ex: screenshot/paste manual>

**Exemplo do que estou buscando:** <descrição concreta — ex: "logo redondo do cliente em SVG ou PNG alta resolução pra usar no design-guide.md">

Depois que receber, vou disparar [<skill de absorção apropriada>] automaticamente.
```

### Fase 3 — Aguardar resposta

Operador responde de 4 formas possíveis:
1. **Envia o material** (URL/foto/print/etc) → ir pra Fase 4
2. **Não tem agora** → registrar gap em `pendencias-contexto.md` + sinalizar skill bloqueada
3. **Aponta material já existente** ("já mandei isso, está em X") → buscar no projeto + retomar
4. **Refina o pedido** ("você quer X ou Y?") → re-formatar pedido mais específico

### Fase 4 — Absorção via skill apropriada

Material recebido → dispara skill correspondente automaticamente:

| Tipo recebido | Skill disparada |
|---|---|
| URL imagem ou path local `.png/.jpg/.webp/.heic/.gif/.bmp/.tiff` | `/capturar-imagem` |
| URL vídeo ou path local `.mp4/.mov/.webm/.avi/.mkv` | `/capturar-video` ou `/absorver-midia` |
| Áudio `.ogg/.opus/.mp3/.wav/.m4a` | `/transcribe-audio` |
| URL YouTube/Instagram/etc com mídia | `/absorver-midia` |
| URL site/doc texto | WebFetch direto + decisão de absorver via `/absorver-contexto` se for material rico |
| URL NotebookLM | `/ativar-notebooklm` |
| Paste de texto direto | `/capturar` (inbox stakeholder) ou `/absorver-contexto` (se for conhecimento universal) |
| Path de pasta | `/absorver-contexto <path>` |
| Credencial (.env, token) | manual + lembrete LGPD/segurança (não absorver via skill, instrução de armazenar em secret manager) |

### Modo `--silencioso`

Pra quando IA detecta gap mas operador já está ocupado (ex: meio de outra discussão):
1. Registra gap em `<projeto>/.kodai-gaps/<YYYY-MM-DD>-<tipo>.md` com contexto completo
2. Retoma fluxo atual sem interromper
3. Próxima sessão, `/abrir` (Sessão Zero) cita gaps registrados no reporte canônico
4. Operador decide quando endereçar

Estrutura `.kodai-gaps/<arquivo>.md`:
```yaml
---
tipo: foto | print | link | video | audio | doc | credencial | notebooklm
finalidade: ...
skill_bloqueada: ...
tentativas_feitas:
  - ...
sugestoes_de_como_prover:
  - opcao_a: ...
  - opcao_b: ...
  - opcao_c: ...
status: open | resolvido | descartado
data: YYYY-MM-DD
---

# Gap de contexto: <tipo>

<contexto detalhado da skill que travou>
```

## Casos de uso comuns

### Caso 1: WebFetch falhou em concorrente sem NotebookLM

Skill `/mapear-concorrente <nome>` tenta WebFetch em 3 URLs prováveis. Todas falham. Auto-dispara `/pedir-contexto`:

```
🔍 Preciso de contexto pra mapear <Concorrente> — site não está acessível.

Contexto: skill /mapear-concorrente, fase 2 (investigação profunda).

Tentei:
- WebFetch <url-1> → ECONNREFUSED
- WebFetch <url-2> → 404
- WebFetch <url-3> → página vazia

Preciso de [link de fonte rica OU NotebookLM dedicado OU material manual]:

Finalidade: extrair features, pricing, posicionamento do <Concorrente> pra matriz comparativa.

Como prover:
(a) URL específica do <Concorrente> que funcione (Capterra, G2, blog, página WordPress)
(b) Criar NotebookLM com fontes do concorrente e me passar ID/URL
(c) Mandar screenshots manuais do site + colar texto do pricing

Exemplo: link do site oficial + 1-2 screenshots do pricing OU notebook com 5-10 fontes públicas.
```

### Caso 2: Pré-flight de /proposta-cliente sem material

Skill `/proposta-cliente <cliente>` no início precisa de material do cliente. Sem material, dispara:

```
🔍 Pra preparar proposta TOP pro <cliente>, preciso de material atual deles.

Contexto: skill /proposta-cliente, fase 1 (identificação).

Preciso de [referências visuais + estado atual + dores]:

Finalidade: mapear o que cliente JÁ TEM → pesquisar o melhor → gerar proposta diferenciada.

Como prover:
(a) URLs (site, Instagram, app, sistema atual) + 3-5 screenshots/prints
(b) Link de Google Drive/Dropbox com material já compilado
(c) Áudio/transcrição de conversa anterior + prints quando você lembrar

Exemplo: link site + print de tela principal + print de pricing/planos atuais + 1 frase sobre maior dor relatada por eles.
```

### Caso 3: Gap detectado pela IA durante implementação

Editando `design-guide.md` do cliente, percebo que não tenho hex exato da paleta — só descrição visual.

```
🔍 Pra popular hex exatos do design-guide, preciso amostragem do logo oficial.

Contexto: implementando design-guide.md do MeuDojo.

Tentei: extrair hex visualmente do PNG → impreciso.

Preciso de [arquivo SVG do logo OU hex já calculado]:

Finalidade: tokens de cor em Tailwind config + componentes.

Como prover:
(a) Manda o SVG do logo (cores ficam no XML)
(b) Abra logo no Figma/Photoshop, pega hex do vermelho e me diz (ex: "#D32F2F")
(c) Print do color picker em qualquer ferramenta

Sem isso, vou usar aproximação `#D32F2F` (vermelho-sangue padrão) com flag "verificar" no design-guide.
```

## Política irmã + skills relacionadas

- `1-ESQUELETO/politicas/escuta-antes-de-agir.md` — princípio universal (leia antes de agir)
- `1-ESQUELETO/politicas/honestidade-em-claims.md` — não inventar quando falta evidência
- `1-ESQUELETO/skills-universais/sugerir-pesquisa` — alternativa quando NÃO precisa de input humano (auto-pesquisa)
- `1-ESQUELETO/skills-universais/capturar` — captura genérica
- `1-ESQUELETO/skills-universais/capturar-imagem` — disparada após pedir foto
- `1-ESQUELETO/skills-universais/capturar-video` — disparada após pedir vídeo
- `1-ESQUELETO/skills-universais/transcribe-audio` — disparada após pedir áudio
- `1-ESQUELETO/skills-universais/ativar-notebooklm` — disparada após receber URL notebook
- `1-ESQUELETO/skills-universais/absorver-contexto` — disparada após receber material rico
- `1-ESQUELETO/skills-universais/absorver-midia` — disparada após receber URL YouTube/Insta/etc
- `1-ESQUELETO/skills-universais/mapear-concorrente` — consumidor frequente (WebFetch falha → pede via /pedir-contexto)
- `1-ESQUELETO/skills-universais/proposta-cliente` — consumidor frequente (pré-flight pede material)

## Limitações honestas

- **Não substitui automação real:** se gap é resolvível por código (ex: ler arquivo que JÁ existe), pega o caminho fácil primeiro
- **Não pede demais:** se gap é pequeno e pode ser inferido com risco controlado, sinaliza inferência ao invés de pedir
- **Não infinita-loop:** se 2 pedidos consecutivos pra mesmo tipo de contexto falharem (operador não respondeu ou recusou), recua e segue com inferência marcada
- **Modo `--silencioso` é fallback ético:** quando operador está claramente focado em outra coisa, não interromper — registra gap pra próxima

## Critérios de PASS

1. Pedido formatado com 5 elementos canônicos (contexto, tentativas, tipo necessário, finalidade, alternativas)
2. Ao menos 2 alternativas de como prover oferecidas
3. Exemplo concreto do que está buscando (não pedido vago)
4. Após receber material, dispara skill de absorção apropriada (não fica "ok, recebi, valeu")
5. Modo `--silencioso` registra gap em `.kodai-gaps/` quando não pode interromper
6. Idempotência: não pede mesmo gap 2x na mesma sessão sem novo contexto

## Por que esta skill existe

Estabelecida em 2026-05-21 sessão 4 quando KOD.AI tentou mapear OnMat e Kimono via WebFetch — todas URLs falharam, ficou tentando alternativas silenciosamente em vez de pedir ao operador. Operador (Davi) explicitamente identificou esse comportamento como anti-padrão: "KODAI precisa pedir mais contexto caso precise — links, prints, fotos, vídeos". Skill operacionaliza esse pedido em workflow estruturado, evitando o anti-padrão "tentar mais N URLs em silêncio".

Cruza com a regra-base `feedback_nao_perder_contextos` (memory persistente): processar todos os pontos do operador + pedir o que faltar é parte do contrato.
