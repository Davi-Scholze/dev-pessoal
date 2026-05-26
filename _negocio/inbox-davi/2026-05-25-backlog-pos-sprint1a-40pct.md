---
tipo: backlog-bruto-captura
data: 2026-05-25
origem: Davi (input direto fim de sessão Sprint 1a redesign 40%)
status: BRUTO — não processar sem OK explícito, mas TODOS os itens precisam virar tarefas ou decisões
contexto: |
  Sprint 1a dojo chegou a 40% após redesign multi-section + login split-screen
  + fotos Unsplash. Davi quer continuar amanhã. Mandou 13 observações pra salvar.
  Tudo aqui é palavra do Davi — apenas organizado, não interpretado.
related:
  - ../PROMPT_MASTER_HANDOFF.md
  - ../PENDENCIAS.md
  - ../../Repositorios/dojo-familia-scholze/docs/decisoes/2026-05-25_sprint-1a-auth-magic-link-dashboard.md
  - ../POSTMORTEM-2026-05-25-ui-cycle-violation.md
---

# Backlog Davi — fim Sprint 1a redesign 40% (2026-05-25)

Davi disse: *"Não perca nem uma observação, nem um contexto... salve absolutamente tudo para que amanhã a gente continue pondo em prática"*.

Salvo aqui na íntegra + organizado em 7 buckets. **Memória `nao-perder-contextos` aplica.**

---

## VERBATIM DAVI (intacto, sem reescrita)

> Vc vai salvar tudo isso ai aonde paramos, tudo que ainda falta de fontes endend e depois dos flcos e testes mais isso tudo:
>
> . quero que o KODAI aprofunde seu conoexto, endetimetnode uso e momeno para todos os agentes de skilsls que possuímos, mapear perfeitamente todos.. pesquisar profundamente ia web e documentações para entender 100% de todas as ferramentas que temos, como e uando podemos e vamos usar de acrodo com nossos fluxos e ideias. Para nunca deixar de usar e sempre usar todaos... para n ter skills que se conflita, para n ter skis iguais, sempre as melhorese mais poderosas.
>
> . Frame motinon de cerejeira... tem como crir fram motion limpo e adaptativo dando para desktop e mobile com base em vídeos do youotube? Tipo pegar cisa espescifcas..
>
> . /skill creator foi usado para criar as skilss nativadas do KODAI? Vale a pena usar para as próximas?	/skill superpowers... usamos essas Skill? KODA USA TODA ESSAS:SKILLS:
> /plugin install skill-creator@claude-plugins-official
> /plugin install superpowers@claude-plugins-official
> npx get-shit-done-cc --claude --global
> /review & /ultrareview
> /plugin install frontend-design@claude-plugins-official
> A skill: Impeccable🔻🔻 Link para o Impeccable 🔻🔻
> https://impeccable.style????? Es~toa todas ativas? quero as que eu n tiver ainda
>
> . SDD é válido em todo momento? Eexmplo: Estou no começo do desenvolvimento de um sistema eu vai ser completo, para desktop e mobile... mas preciso ir fazendo ele de forma dinâmica, testanto e fazendo as paginas as funcionalidades as tabelas doo banco, como se eu tivesse moldadno uma argia... sinto que o sdd me atrasa nisso e barra minha eficientecia e criativaidae. Eu quero eficienca, resiliência facilidade e praticidade quando for esdesevolver meus sitemas... falando certinho, falando dos links, dando exemplos, mudando e testando...
>
> . Quando os sistemas forem caaz defazer o que o facedojo faz com reconhecimento facial vai ser bom n so pra confirmar quem foi na aula mas quando o sistema criar o post atuomatico já marcar quem foi
>
> . Durante a execução da criação do sistema do dojo-familia-scholze quais são as melhorias que podemos fazer ara o desenvovlimeto ser mais eifcietn
>
> . Quero agilidade de criação es desenvolsimento dos sitemas, testes ali em tempo real depois testes automatizados
>
> . KODAi atualizado com todos os notebooksl? J a se alimentou deles... e outra ele usa todo o seu porder em toos os projetos que faaz?
>
> . LGPD usado no desenvolviment e o Mapa, todo o poder do KODAI entrou no mapa e entra no mapa dos projetos específicos que fazemos:??
>
> . Mmeta de hoje: Construir um atendente
>
> .  Precisa de mais contexto para construir e validar o que o usuário pediu? Precisa solicitar ou pesqusira.
>
> . Atualizar meu LinkedIn com tudo que estou fazendo - logar KODAI a ele e automatiaxar automaticamente

---

## BUCKET A — Sprint 1a dojo: onde paramos + o que ainda falta

Estado: **40% conforme Davi**. Site deploy: https://dojofs-davi-scholzes-projects.vercel.app

### A.1 Magic Link no `/login` provavelmente quebrado
- Davi reportou: "no login não dá pra acessar com nenhum email"
- Não debuguei — pode ser Server Action falhando silencioso, OR site_url Supabase desatualizado, OR email indo pra spam
- Próxima sessão: testar com email real (com permissão prévia) + ver logs Supabase

### A.2 Animações Framer Motion existem mas NÃO foram aplicadas no novo redesign
- `apps/site/components/MotionConfig.tsx` (15 variants) + `apps/site/app/dashboard/components/DashboardSections.tsx` (6 wrappers) **existem em código**
- Mas a nova landing `/` redesenhada + novo `/login` split-screen **NÃO estão usando** (esqueci de aplicar)
- Hero não revela em cascata, citação Jigoro Kano não anima entrada, cards modalidade não staggeram, linha dojo-red não desenha
- Próxima sessão: aplicar variants em todas seções

### A.3 Mobile nav sem hamburger menu
- Em mobile, `<nav>` da landing tem `hidden md:flex` — Sobre/Modalidades/Filosofia somem
- Só botão "Entrar" continua visível
- Próxima sessão: implementar hamburger (Sheet/Drawer shadcn) com mesmas opções

### A.4 Fotos Unsplash são placeholder
- 4 fotos usadas: BJJ B&W + aerial kick + karatê artístico + 2 atletas
- Não são do dojô real, não são do pai Sensei Cristiano
- Davi mencionou que quer pegar vídeos/fotos da internet também (queries de qualidade)
- Próxima sessão: substituir gradualmente quando pai mandar OR buscar melhor curadoria

### A.5 Sem páginas `/sobre`, `/modalidades`, `/contato` dedicadas
- Atualmente links são âncoras na home (`#sobre`, `#modalidades`, `#filosofia`)
- Aceitável MVP, mas SEO + profundidade pedem páginas próprias
- Próxima sessão Sprint 1c+: criar `/sobre/page.tsx`, `/modalidades/page.tsx` etc

### A.6 Sem vídeo background no hero
- Davi mencionou querer vídeo cinematográfico no hero (referência possível: rig.ai? andrewolf?)
- Próxima sessão: buscar vídeo livre (Pexels videos / Mixkit) ou pedir pro pai gravar 15s do tatame

### A.7 `/dashboard` não foi atualizado pro mesmo nível visual
- Só `/` e `/login` ganharam redesign
- `/dashboard` continua versão da sessão anterior (menos rica, menos hierárquica)
- Próxima sessão: aplicar mesmo padrão visual + Framer Motion + identidade

### A.8 `header.tsx` do dashboard com tech debt
- Usa `<img>` em vez de `<Image>` Next
- Usa tokens shadcn genéricos (border-border, bg-background/95, text-muted-foreground) em vez de dojo-*
- Tech debt registrada no audit anterior (design-reviewer)

### A.9 Sprint 1b/1c não começou
- Tela de cadastro professor + criação dojo (Sprint 1b)
- Tela alunos + turmas (Sprint 1c)
- Migration 0003 com colunas profile detalhado (faixa, modalidade, anos_experiencia, foto, federação)

---

## BUCKET B — Meta-evolução do framework KOD.AI

> Davi quer KOD.AI mais profundo, sem skills duplicadas/conflitantes, sempre usando todo seu poder.

### B.1 Aprofundar contexto + entendimento de USO de TODOS agentes/skills
- Davi quer: pesquisa web + documentações pra entender 100% de cada ferramenta
- Mapear quando cada skill/agent é útil, quando NÃO é, qual o trigger correto
- Cruzar com fluxos reais (Sprint dojo é exemplo)
- Output: documento de referência `KODAI/docs/SKILLS-DEEP-MAP.md` (a criar)

### B.2 Eliminar skills duplicadas/conflitantes
- Davi quer auditoria: "para n ter skills que se conflitam, para n ter skills iguais, sempre as melhores e mais poderosas"
- Exemplo conhecido: `/capturar` + `/capturar-contexto-cliente` + `/capturar-imagem` + `/capturar-video` — onde cada uma se aplica? Conflitam?
- Output: tabela "decisão de uso" + migration plan se houver duplicação

### B.3 KOD.AI deve usar TODO seu poder em TODOS projetos
- Davi pergunta: "ele usa todo o seu poder em todos os projetos que faz?"
- Atualmente: nem skills de design foram usadas no Sprint 1a até Davi pedir
- Solução: hooks proativos + checklist por tipo de tarefa + auditoria pós-sprint

### B.4 KOD.AI absorveu TODOS os notebooks NotebookLM?
- Library tem 79 entradas catalogadas
- Davi pergunta: "se alimentou deles?"
- Próxima sessão: rodar audit cruzando library × contextos-domínio × packs

### B.5 LGPD no desenvolvimento E no Mapa de cada projeto
- Davi pergunta: "LGPD usado no desenvolvimento e o Mapa, todo o poder do KODAI entrou no mapa e entra no mapa dos projetos específicos?"
- Auditar: cada projeto consumidor KOD.AI tem mapa LGPD?
- Auditar: `lgpd-auditor` agent é invocado em formulários novos?
- Pack `seguranca/lgpd-by-design` existe? Está aplicado?

### B.6 Framer Motion baseado em vídeos YouTube
- Davi pergunta: "Frame motion de cerejeira... tem como criar frame motion limpo e adaptativo dando para desktop e mobile com base em vídeos do youtube? Tipo pegar coisas específicas?"
- Workflow novo proposto: cliente cola URL YouTube → IA extrai animação específica (curva, easing, duração) via análise visual frame-a-frame → implementa em Framer Motion adaptado pra desktop+mobile
- Pode usar `/absorver-midia` skill como base + adicionar análise de motion
- Requires: yt-dlp + ffmpeg + análise de movimento (Claude vision por frame)

---

## BUCKET C — Skills/plugins do mercado a investigar/instalar

Davi listou pra confirmar se KOD.AI tem ou precisa instalar:

| Skill / Plugin | Comando install | Status atual | Ação próxima sessão |
|---|---|---|---|
| skill-creator (oficial) | `/plugin install skill-creator@claude-plugins-official` | KOD.AI tem skill própria `/criar-pack` + `/criar-contexto` + `writing-skills` bundled — verificar se oficial supera | Investigar + comparar |
| superpowers (oficial) | `/plugin install superpowers@claude-plugins-official` | Atualmente KOD.AI tem **11+ skills bundled** Anthropic Superpowers em `1-ESQUELETO/skills-universais/_bundled-skills-manifest.yaml` — pode estar desatualizado | Verificar versão + instalar atualizações |
| get-shit-done | `npx get-shit-done-cc --claude --global` | NÃO instalado | Pesquisar o que é + decidir |
| /review e /ultrareview | (provavelmente skills do `/review` plugin) | KOD.AI tem `/code-review` skill própria — `/review` e `/ultrareview` são separados | Pesquisar + comparar |
| frontend-design plugin | `/plugin install frontend-design@claude-plugins-official` | KOD.AI tem `frontend-designer` agent — pode haver diferença | Investigar |
| Impeccable | https://impeccable.style | NÃO conhecido | Investigar — pode ser design system / framework de UI premium |

Davi: *"Está todas ativas? Quero as que eu n tiver ainda"* — significa: instalar as que faltam.

---

## BUCKET D — Metodologia e processo de desenvolvimento

### D.1 SDD é sempre válido? (decisão arquitetural KOD.AI)

**Davi verbatim:** *"SDD é válido em todo momento? Exemplo: Estou no começo do desenvolvimento de um sistema que vai ser completo, para desktop e mobile... mas preciso ir fazendo ele de forma dinâmica, testando e fazendo as páginas as funcionalidades as tabelas do banco, como se eu tivesse moldando uma argila... sinto que o SDD me atrasa nisso e barra minha eficiência e criatividade. Eu quero eficiência, resiliência facilidade e praticidade quando for desenvolver meus sistemas... falando certinho, falando dos links, dando exemplos, mudando e testando..."*

**Diagnóstico:** SDD canônico KOD.AI (`/spec → /break → /plan → /execute → /review → /complete`) tem overhead pesado por feature. Em fase inicial de "moldar argila" (descoberta + iteração rápida), pode atrasar.

**Possíveis modos a definir:**
- **Modo "argila" (descoberta inicial)** — sem SDD formal. Davi e IA conversam, testam, mudam. SQL ad-hoc. Componentes evoluem. Commit a cada passo SIM, mas sem `/spec` longa.
- **Modo "sprint formal" (features críticas / após validação)** — SDD canônico completo
- **Modo "fix/refactor pequeno"** — direto via commit, sem spec

**Próxima sessão:** discutir + criar política `quando-usar-sdd.md` no KODAI upstream. Talvez memória crítica nova.

### D.2 Agilidade: testes em tempo real + automatizados depois

**Davi verbatim:** *"Quero agilidade de criação e desenvolvimento dos sistemas, testes ali em tempo real depois testes automatizados"*

**Fluxo proposto:**
1. **Dev local com hot reload** — Davi vê mudança em real-time no browser (Playwright MCP? `live-preview` skill?)
2. **Smoke tests automáticos a cada commit** — CI já roda typecheck + build
3. **E2E tests automatizados** — Sprint 4+ via Playwright spec
4. **Visual regression** — opcional Sprint 5+

### D.3 IA pedir mais contexto/pesquisa quando precisa validar
- Davi verbatim: *"Precisa de mais contexto para construir e validar o que o usuário pediu? Precisa solicitar ou pesquisar"*
- Existe skill `/pedir-contexto` em KOD.AI — verificar se está sendo invocada nas situações certas
- Existe skill `/sugerir-pesquisa` — idem

### D.4 Melhorias no processo durante desenvolvimento do dojo
- Davi verbatim: *"Durante a execução da criação do sistema do dojo-familia-scholze quais são as melhorias que podemos fazer para o desenvolvimento ser mais eficiente"*
- Meta-aprendizado: capturar lições aprendidas DURANTE Sprint 1a
- Já capturado em: `POSTMORTEM-2026-05-25-ui-cycle-violation.md` + memórias críticas novas
- Pode ter mais — fazer retrospectiva pós-Sprint 1a (após chegar 100%)

---

## BUCKET E — Features avançadas futuras dojo

### E.1 Facescan + post automático Instagram marcando alunos
- Davi verbatim: *"Quando os sistemas forem capaz de fazer o que o facedojo faz com reconhecimento facial vai ser bom n so pra confirmar quem foi na aula mas quando o sistema criar o post automático já marcar quem foi"*
- Combina: face recognition (CompreFace self-hosted — decisão MVP) + Instagram Graph API + Meta tagging
- Sprint 3+ pelo roadmap ARQUITETURA-MESTRE
- Adicionar à lista de features Fase 2

---

## BUCKET F — Meta da próxima sessão

### F.1 Construir um atendente IA
- Davi verbatim: *"Meta de hoje: Construir um atendente"*
- Interpretação: chatbot IA (WhatsApp + web) que atende prospects do dojô antes de matricular
- KOD.AI tem contexto-domínio `agentes-ia-construcao` (DRAFT v0.1 com 6 packs + skill `/criar-agente` wizard 4 perguntas)
- Provavelmente Davi quer: rodar `/criar-agente` skill, definir tier comercial (L1/L2/L3?), escolher padrão Customer Support, plugar Supabase + WhatsApp Evolution API
- **PRÓXIMA SESSÃO COMEÇA POR AQUI** ou pela continuação do dojo? Davi decide

---

## BUCKET G — Automação pessoal Davi (fora do KOD.AI/dojo)

### G.1 LinkedIn automatizado
- Davi verbatim: *"Atualizar meu LinkedIn com tudo que estou fazendo - logar KODAI a ele e automatizar automaticamente"*
- Pode virar skill `/atualizar-linkedin` integrada com LinkedIn API
- Auto-summarize commits/decisões em posts profissionais
- Integração com `git log` + project_kodai memory
- Postar 1x/semana automaticamente OR drafts pra Davi revisar

---

## ORDEM SUGERIDA PRÓXIMA SESSÃO

Não decido — Davi escolhe. Mas em ordem de impacto vs custo:

| Prioridade | Bucket | Item | Custo | Impacto |
|---|---|---|---|---|
| 🥇 P0 | A | A1 (Magic Link debug) | 30min | Desbloqueia fluxo end-to-end |
| 🥇 P0 | A | A2 (aplicar animações que já existem) | 1h | Pula de 40% pra 60% percebido |
| 🥈 P1 | A | A3 (mobile hamburger) | 30min | UX mobile-first essencial |
| 🥈 P1 | A | A7 (dashboard atualizado) | 2h | Consistência visual |
| 🥉 P2 | F | F1 (atendente IA) | 4-8h | Davi pediu como meta |
| 🥉 P2 | C | C1-C6 (skills mercado) | 1-2h cada | Capacidade futura |
| 🥉 P2 | D | D1 (SDD aplicabilidade) | 30min decisão | Define modo de trabalho |
| ⚫ P3 | A | A4-A6, A8-A9 | varia | Refinamento + features |
| ⚫ P3 | B | B1-B6 (meta-KOD.AI) | dias | Investimento de framework |
| ⚫ P3 | G | G1 (LinkedIn) | 2-4h | Automação pessoal |

---

## NÃO ESQUECER

- **Memória `nao-perder-contextos`** aplica — IA processa TODOS pontos.
- **Memória `pedir-permissao-acoes-externas`** — antes de testar Magic Link real OR postar LinkedIn.
- **Memória `tudo-dentro-do-repo-do-sistema`** — secrets LinkedIn vão pro `.env.local` do projeto.
- **Memória `estudar-refs-antes-de-codar-ui`** — pra cada nova UI, WebFetch refs + fotos antes de codar.
- **Memória `invocar-skills-design-obrigatorio`** — invocar frontend-designer + design-reviewer.
- **Hook `enforce-ui-cycle.js`** ativo — vai bloquear Edit/Write em UI sem ack do marker.
