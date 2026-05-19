---
name: dev-browser
description: >
  Abre e gerencia browser (Playwright MCP ou wrapper local) pra visualizar
  mudanças no frontend, testar fluxos manualmente, capturar screenshots e
  inspecionar páginas durante desenvolvimento. Use sempre que precisar "ver"
  algo no app, "/dev-browser", "tira print", "abre o dashboard", "como está
  a tela X", ou ANTES de teorizar sobre CSS/HTML/comportamento UI.
allowed-tools: [Bash, Read, Write, mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_click, mcp__playwright__browser_fill_form]
---

# /dev-browser — Browser pra desenvolvimento e testes UI

> Status: **FUNCIONAL** (bundled em 2026-05-18, re-implementação universalizada). Skill original era marketing pra ferramenta `dev-browser` npm; versão atual aqui é wrapper sobre Playwright MCP (já presente no ecossistema Claude Code) + diretrizes de uso.

## Princípio

**IA não deve teorizar sobre UI lendo só código.** Bugs visuais (alinhamento, overflow, z-index, responsivo, hover state) são impossíveis de ver no JSX/CSS — só vendo a tela.

Esta skill formaliza o uso de browser automation pra: ver o estado atual, reproduzir cenários, capturar screenshots, comparar antes/depois.

**Referência cruzada:** complementa [`/politicas/ver-analisar-propor-testar-reportar`](../../politicas/ver-analisar-propor-testar-reportar.md) (se existir como política) e o ciclo UI de 5 etapas.

## Quando usar

- Verificar se uma tela está renderizando corretamente
- Testar fluxos de navegação no frontend
- Inspecionar elementos ou dados carregados na página
- Capturar screenshots do estado atual da aplicação
- Reproduzir bug que stakeholder reportou
- Comparar mockup vs implementação
- ANTES de propor fix de CSS (sempre vê antes de teorizar)
- DEPOIS de implementar mudança visual (confirma que mudou + não quebrou outras telas)

## Quando NÃO usar

- Mudança backend que não tem reflexo visual → testa via API call/log
- Mudança em config/build → testa via comando, não browser
- Mudança em doc/markdown → não precisa browser
- Mudança em teste unit/integration → roda o teste, não abre browser

## Pré-requisito

App rodando localmente ou em ambiente acessível:

```bash
npm run dev           # ou pnpm dev, yarn dev — convencional pra Vite/Next
# OU
[ ambiente staging acessível por URL ]
```

Skill **não inicia** o servidor — assume que está rodando. Se não estiver, anuncia: "Server não está respondendo em `<URL>`. Rode `npm run dev` primeiro."

## Workflow (5 etapas — ciclo UI obrigatório)

### 1. VER
- Abre Playwright MCP no estado atual
- Reproduz cenário descrito pelo usuário (navega, autentica, etc)
- Tira screenshot do estado "antes"

```
mcp__playwright__browser_navigate({ url: "http://localhost:5173/tela-x" })
mcp__playwright__browser_take_screenshot({ filename: "antes.png" })
```

**NÃO faz:** descrever UI "de cabeça" lendo JSX.

### 2. ANALISAR
- Reporta exatamente o que apareceu (não o que "deveria" aparecer)
- Identifica linha do código responsável (`arquivo.tsx:42`)
- Distingue: bug visual vs bug de lógica vs bug de dados

### 3. PROPOR
- Diff mínimo (1-3 linhas idealmente)
- Impacto colateral declarado (afeta que outras telas/componentes?)
- **Pede OK explícito antes de implementar**

### 4. TESTAR
- Implementa o diff
- Reproduz cenário no Playwright
- Tira screenshot do estado "depois"
- Compara antes/depois — confirma que mudou + não quebrou nada adjacente

### 5. REPORTAR
- Mostra ao usuário:
  - Screenshot antes
  - Diff aplicado
  - Screenshot depois
  - Linhas referenciadas
- **Só então** pede OK pra commit

## Política de screenshots (alinha com [`/politicas/imagens.md`](../../politicas/imagens.md))

| Tipo | Onde vai | Commit? |
|---|---|---|
| **Bruto** (stakeholder manda) | `<contexto>/raw/<data>-<tema>/` | ✅ Sim — sagrado |
| **Evidência permanente** (documenta bug, decisão única) | `mapeamento/evidencias/<data>/` ou `feedback-<stakeholder>/screenshots/` | ✅ Sim |
| **Validação efêmera** (output Playwright durante ciclo) | `.playwright-mcp/` (gitignored) | ❌ Não — apaga ao fim |

**Regra mental:** *"Alguém vai olhar essa imagem daqui a 7 dias?"* — Não → efêmero. Sim → permanente.

## Multi-formato (web, mobile, app nativo)

### Web (Vite/Next/React)
Playwright MCP funciona perfeito.

### Mobile (PWA com Capacitor)
- Web (PWA) → Playwright MCP redimensionando window pra 390x844 (iPhone)
- App nativo (após Capacitor build) → Appium ou Detox

### Multiple breakpoints
Cada mudança visual significativa deve testar em pelo menos:
- Desktop 1920x1080
- Tablet 768x1024
- Mobile 390x844

## Anti-padrões

| ❌ Errado | ✅ Certo |
|---|---|
| "Lendo o código, devia funcionar" (sem ver) | Abre Playwright, confirma comportamento |
| Descrever UI de cabeça pra usuário | Abre Playwright, mostra screenshot |
| Mudar CSS sem ver depois | Sempre testa depois |
| Confiar em testes unitários como prova de UI funcionar | Unit test ≠ visual test |
| Esquecer de testar responsividade (mobile) | Sempre testa mobile depois |
| PNG solto na raiz do projeto | Sempre em pasta apropriada (evidências/playwright-mcp/raw) |

## Integração com Playwright MCP

Esta skill **assume Playwright MCP disponível** no ambiente Claude Code do comprador. Playwright MCP é fornecido por Anthropic (não bundled aqui; é mcp externo). Se não estiver disponível, instalar via:

```bash
# instalação típica MCP server Playwright
claude mcp add playwright  # comando exemplo — sintaxe pode variar
```

## Skills relacionadas

- **`/ver`** (KOD.AI nativa) — atalho que invoca Playwright pra "ver" estado atual
- **Politicas**: [`/politicas/imagens.md`](../../politicas/imagens.md) (3 tipos com destinos claros)
- **Metodologias**: [`/metodologias/ver-analisar-propor-testar-reportar.md`](../../metodologias/ver-analisar-propor-testar-reportar.md) (ciclo de 5 etapas detalhado)

## Atribuição

Esta skill foi **bundled em 2026-05-18** por re-implementação universalizada a partir de skill local da máquina dev. A skill original era essencialmente um marketing card pra ferramenta npm `dev-browser`; conteúdo aqui é versão substantiva que documenta workflow + integra com Playwright MCP (ferramenta padrão Claude Code) + alinha com políticas KOD.AI existentes.

## Diferenças vs source original

- Source original era ~38 linhas focadas em "instalar `dev-browser` via npm" — substituído por wrapper sobre Playwright MCP
- Removidas referências específicas a `localhost:5173`, "página de placas"
- Adicionado: workflow 5 etapas completo (alinhado com `/metodologias/ver-analisar-propor-testar-reportar`)
- Adicionado: política de screenshots
- Adicionado: multi-formato (web/mobile/breakpoints)
- Adicionado: integração com Playwright MCP
- Cross-references com políticas KODAI
