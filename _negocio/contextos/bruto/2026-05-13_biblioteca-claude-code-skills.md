# Contexto Bruto — Biblioteca Claude Code Skills
> Recebido em: 2026-05-13
> Status: BRUTO — não processar sem aprovação explícita
> Origem: onboarding de conhecimento enviado pelo Davi na sessão de 2026-05-13
> Aplicável a: todos os projetos (ferramentas globais)

---

# O QUE SÃO SKILLS

Skills = pastas especializadas com instruções, scripts e recursos que o Claude carrega dinamicamente.
Lançadas oficialmente: 16/outubro/2025.
Arquitetura Progressive Disclosure: metadata ~100 tokens, full instructions <5k tokens.

Diferença: Skill (workflow reutilizável) vs MCP (dados/APIs) vs Prompt (pontual) vs Project (workspace) vs Subagent (agente independente)

Regra de ouro: se você se pega digitando o mesmo prompt repetidamente, vira Skill.

---

# FONTES OFICIAIS E COMUNITÁRIAS

- github.com/anthropics/skills — oficial Anthropic
- github.com/travisvn/awesome-claude-skills — lista curada principal
- github.com/ComposioHQ/awesome-claude-skills — 1000+ skills
- github.com/obra/superpowers — biblioteca core (20+ skills)
- github.com/obra/superpowers-lab — skills experimentais

---

# CATÁLOGO POR CATEGORIA

## Essenciais Universais
- Superpowers (obra) — TDD, debug, /brainstorm, /write-plan, /execute-plan
- frontend-design (oficial) — design ousado, React+Tailwind
- skill-creator (oficial) — Q&A para criar skills próprias
- simplify / Code Simplifier — refatora para legibilidade
- get-shit-done (TÂCHES) — meta-prompting, spec-driven dev

## Mobile
- ios-simulator-skill / iOS App Builder — xcodebuild + simctl
- SwiftUI Agent Skill (Paul Hudson) — corrige erros típicos de IA em SwiftUI
- Android Development Skill — Clean Architecture
- React Native Skill (Vercel) — performance, animações
- Expo Skills (oficial Expo) — EAS Build, Expo Router
- App Icon Generator / web-asset-generator

## Desktop & Sistemas Complexos
- webapp-testing (oficial) — Playwright para testes locais
- playwright-skill — automação de browser geral
- Browser Use / agent-browser — Claude controla navegador real
- shadcn/ui — contexto completo de componentes
- web-artifacts-builder (oficial) — React + Tailwind + shadcn

## Integrações & Backend
- mcp-builder (oficial) — cria servidores MCP para qualquer API
- Terraform Skill — IaC
- Trail of Bits Security Skills — CodeQL + Semgrep
- Shannon (Security) — pentest automatizado em staging
- ffuf-web-fuzzing — fuzzing autenticado de APIs

## Documentos Oficiais Anthropic
- docx — Word com tracked changes
- pdf — extração, merge, split, forms
- pptx — PowerPoint layouts e charts
- xlsx — Excel fórmulas e análise

## Design & Creative
- algorithmic-art — p5.js generative art
- canvas-design — PNG/PDF design
- frontend-slides — apresentações HTML animadas
- Remotion — vídeo programático com React
- slack-gif-creator

## Orquestração Avançada
- loki-mode — 37 agentes em 6 swarms, startup completa PRD→receita

## Ferramentas de Apoio
- yusufkaraaslan/Skill_Seekers — converte sites de docs em Claude Skills

---

# STACKS RECOMENDADAS POR TIPO

App Mobile: Superpowers + frontend-design + (iOS/Android/Expo/RN) + App Icon Generator + mcp-builder + skill-creator
Desktop complexo: Superpowers + frontend-design + shadcn/ui + webapp-testing + playwright-skill + Browser Use + mcp-builder
Sistemas com muitas integrações: Superpowers + mcp-builder + Terraform + Trail of Bits + Shannon + webapp-testing

---

# COMO INSTALAR

```bash
# Claude Code CLI
/plugin marketplace add anthropics/skills
/plugin marketplace add obra/superpowers-marketplace
/plugin add /caminho/absoluto/para/skill-folder
/plugin list
```

Web: Settings → Capabilities → Toggle Skills ON

---

# PRIORIDADE DE CONFIANÇA

Skills oficiais Anthropic > Superpowers (obra) > comunidade verificada > skills isoladas
