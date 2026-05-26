---
tipo: rule
eixo: orchestration
escopo: "**/*.tsx,**/*.jsx,**/*.vue,**/*.svelte,**/components/**/*.{ts,js,html,css}"
versão: 1.0
atualizado: 2026-05-20
fontes:
  - 1-ESQUELETO/metodologias/ver-analisar-propor-testar-reportar.md
  - 1-ESQUELETO/regras-base.md (regra 11)
related:
  - ../../1-ESQUELETO/metodologias/ver-analisar-propor-testar-reportar.md
  - ../../1-ESQUELETO/skills-universais/ver/SKILL.md
  - ../../1-ESQUELETO/skills-universais/dev-browser/SKILL.md
---

# Regra: ciclo UI obrigatório ao editar componente

## Quando se aplica

Edição de arquivos visuais — componentes React/Vue/Svelte, CSS, HTML, templates. Glob captura `.tsx`/`.jsx`/`.vue`/`.svelte` + qualquer arquivo em `components/`.

## O que fazer

1. **VER** — antes de teorizar sobre o CSS/HTML, abrir Playwright MCP e capturar screenshot do **estado atual** (`/ver <rota>`)
2. **ANALISAR** — reportar exatamente o que aparece (não o que "deveria" aparecer); apontar `arquivo.tsx:linha` responsável
3. **PROPOR** — diff mínimo (1-3 linhas idealmente); declarar impacto colateral
4. **TESTAR** — implementar; reproduzir no Playwright; tirar screenshot "depois"; comparar antes/depois em 3 viewports (1920x1080 / 768x1024 / 390x844)
5. **REPORTAR** — antes + diff + depois + linhas referenciadas → só então OK pra commit

## O que NÃO fazer

- "Pelo JSX, deve estar funcionando" sem ver na tela
- Mudar padding "porque é rápido" sem ciclo
- Testar só em desktop (mobile vira surpresa em produção)
- Confiar em unit test como prova de funcionamento visual

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

1. Invocar **agent `frontend-designer`** (gera componente seguindo design tokens) OU skill `tailwind-shadcn-scaffold`
2. Se arquivo existir: invocar skill `ver` OU `dev-browser` (screenshot antes via Playwright MCP)
3. `Write` em `.claude/.ui-cycle-acknowledged` com 1 linha descritiva (vira marker timestamp)
4. Implementar/editar o arquivo UI (hook libera por 10 min)
5. Antes de declarar done: invocar agent `design-reviewer` (audit Awwwards/Mobbin + axe-core)

### Por que enforcement mecânico

Sprint 1a dojo (2026-05-25) violou esta regra **15× em 1 dia** — texto sem hook não freia o IA quando pipeline SDD (`/spec→/execute`) está rodando. A memória crítica ⭐ `feedback_invocar_skills_design_obrigatorio.md` é PREVENTIVA (lembra IA em sessões futuras); este hook é CORRETIVO (atua na própria sessão).

Postmortem completo: `_negocio/POSTMORTEM-2026-05-25-ui-cycle-violation.md`.

### Dívida upstream KODAI

Propagar hook + atualizações nas skills `/break` e `/execute` upstream em sessão futura via `/upstream-update` (registrada em `_negocio/PENDENCIAS.md`).
