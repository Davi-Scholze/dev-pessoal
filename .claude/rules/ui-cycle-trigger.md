---
tipo: rule
eixo: orchestration
escopo: "**/*.tsx,**/*.jsx,**/*.vue,**/*.svelte,**/components/**/*.{ts,js,html,css}"
versão: 1.1
atualizado: 2026-05-26
fontes:
  - 1-ESQUELETO/metodologias/ver-analisar-propor-testar-reportar.md
  - 1-ESQUELETO/regras-base.md (regra 11)
  - 1-ESQUELETO/skills-universais/design-brief-locker/SKILL.md (NOVO — Fase 0 BRIEF)
  - 2-PACKS/packs/design/website-premium-animated/PLAYBOOK.md (NOVO — pipeline 11 fases)
related:
  - ../../1-ESQUELETO/metodologias/ver-analisar-propor-testar-reportar.md
  - ../../1-ESQUELETO/skills-universais/design-brief-locker/SKILL.md
  - ../../1-ESQUELETO/skills-universais/ver/SKILL.md
  - ../../1-ESQUELETO/skills-universais/dev-browser/SKILL.md
  - ../../2-PACKS/packs/design/website-premium-animated/PLAYBOOK.md
---

# Regra: ciclo UI obrigatório ao editar componente

## Quando se aplica

Edição de arquivos visuais — componentes React/Vue/Svelte, CSS, HTML, templates. Glob captura `.tsx`/`.jsx`/`.vue`/`.svelte` + qualquer arquivo em `components/`.

## O que fazer

0. **BRIEF** (NOVO 2026-05-26 — pré-requisito não-negociável) — verificar se existe brief lockado em `<repo>/_negocio/contextos/briefs/<data>_<topico>.md`. Se NÃO existe ou está desatualizado (>30 dias), invocar skill `/design-brief-locker` ANTES de qualquer outro passo. Sem brief, todo output de UI fica genérico — postmortem v6 Dojô 2026-05-26 (Davi: *"Vc mexeu pioruoo 30% e melhorou 2%"*) confirma que pular esta fase produz output rejeitado.
1. **VER** — antes de teorizar sobre o CSS/HTML, abrir Playwright MCP e capturar screenshot do **estado atual** (`/ver <rota>`)
2. **ANALISAR** — reportar exatamente o que aparece (não o que "deveria" aparecer); apontar `arquivo.tsx:linha` responsável; comparar contra brief lockado (Fase 0) — toda observação deve ancorar em decisão do brief ("não bate com lógica espacial decidida")
3. **PROPOR** — diff mínimo (1-3 linhas idealmente); declarar impacto colateral; justificar decisão visual ancorando em decisão lockada do brief (ex: "lógica espacial diz 'centro sagrado', então hero precisa centralizar")
4. **TESTAR** — implementar; reproduzir no Playwright; tirar screenshot "depois"; comparar antes/depois em 3 viewports (1920x1080 / 768x1024 / 390x844)
5. **REPORTAR** — antes + diff + depois + linhas referenciadas + decisão do brief que foi obedecida → só então OK pra commit

## O que NÃO fazer

- **Pular Fase 0 BRIEF** — pulo direto pra `/spec` ou `/break` sem brief lockado gera output genérico (postmortem v6 Dojô 2026-05-26 confirma)
- "Pelo JSX, deve estar funcionando" sem ver na tela
- Mudar padding "porque é rápido" sem ciclo
- Testar só em desktop (mobile vira surpresa em produção)
- Confiar em unit test como prova de funcionamento visual
- Usar palavras banidas em copy/notas/commits (moderno, limpo, minimalista, premium, profissional, elegante, sleek, bonito) — gera genérico

## Antipadrões relacionados

- **#4 Redundância com o código** — descrever UI de cabeça lendo JSX é exatamente isso; sempre VER em vez de inferir
- **#1 Sem comando acionável** — esta regra tem 5 passos verificáveis com comandos exatos

## Métricas

- 100% das mudanças UI têm screenshot **antes** e **depois**
- Zero "achei que ia funcionar" sem evidência
- Multi-breakpoint coverage (3 viewports antes do `/complete`)

## Política irmã + skill

- `metodologias/ver-analisar-propor-testar-reportar.md` — ciclo canônico
- `skills/ver/` — implementa passo 1 do ciclo
- `skills/dev-browser/` — Playwright MCP wrapper
- `politicas/imagens.md` — onde os screenshots vão

## Enforcement mecânico (2026-05-25 — pós-postmortem violação Sprint 1a dojo)

Esta regra **NÃO É MAIS apenas texto**. Hook ativo bloqueia mecanicamente Edit/Write em UI sem invocação prévia de design skills:

- **Hook:** `.claude/hooks/pre-tool-use/enforce-ui-cycle.js` (pasta-mãe consumidora)
- **Registrado em:** `.claude/settings.json` PreToolUse com matcher `Edit|Write|MultiEdit`
- **Comportamento:** intercepta toda chamada `Edit`/`Write`/`MultiEdit` cujo `file_path` bate em pattern UI (`.tsx`/`.jsx`/`.vue`/`.svelte`/`components/`/`app/`/`pages/`). Se IA não criou marker `.claude/.ui-cycle-acknowledged` (modificado nos últimos 10 min), retorna `exit 2` (bloqueia) com mensagem detalhada listando skills/agents obrigatórios.

### Como bypassar legitimamente (após cumprir o ciclo)

1. **FASE 0 (NOVO 2026-05-26):** verificar/criar brief lockado em `<repo>/_negocio/contextos/briefs/`. Se ausente, invocar `/design-brief-locker`
2. Invocar **agent `frontend-designer`** (gera componente seguindo design tokens) OU skill `tailwind-shadcn-scaffold` — passar brief lockado como contexto
3. Se arquivo existir: invocar skill `ver` OU `dev-browser` (screenshot antes via Playwright MCP)
4. `Write` em `.claude/.ui-cycle-acknowledged` com 1 linha descritiva (vira marker timestamp)
5. Implementar/editar o arquivo UI (hook libera por 10 min)
6. Antes de declarar done: invocar agent `design-reviewer` (audit Awwwards/Mobbin + axe-core) — comparar contra brief lockado

### Por que enforcement mecânico

Sprint 1a dojo (2026-05-25) violou esta regra **15× em 1 dia** — texto sem hook não freia o IA quando pipeline SDD (`/spec→/execute`) está rodando. A memória crítica ⭐ `feedback_invocar_skills_design_obrigatorio.md` é PREVENTIVA (lembra IA em sessões futuras); este hook é CORRETIVO (atua na própria sessão).

Postmortem completo: `_negocio/POSTMORTEM-2026-05-25-ui-cycle-violation.md`.

### Dívida upstream KODAI

Propagar hook + atualizações nas skills `/break` e `/execute` upstream em sessão futura via `/upstream-update` (registrada em `_negocio/PENDENCIAS.md`).
