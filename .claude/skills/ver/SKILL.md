---
name: ver
description: >
  Abre Playwright MCP, navega pra URL ou rota, tira screenshot e analisa.
  Implementa o passo 1 do ciclo UI obrigatório (Ver → Analisar → Propor
  → Testar → Reportar). Use sempre que o usuário disser "ver", "/ver",
  "abre a página", "como tá X visualmente", "vai lá ver", "navega
  pra", "mostra como tá", ou quando QUALQUER mudança visual for
  proposta — antes de teorizar sobre CSS/HTML, SEMPRE ver primeiro.
allowed-tools: [mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_resize, Read]
---

# /ver — Abertura visual via Playwright MCP

Cumpre o passo 1 do ciclo obrigatório de mudança visual (regra #11 da regras-base).

## Workflow

### Passo 1: Detectar destino

Argumentos possíveis:
- URL completa: `/ver https://example.com/path`
- Rota local: `/ver /admin/usuarios` (assume dev server local)
- Descrição: `/ver tela de cadastro` (precisa contexto pra mapear pra URL)

Se ambíguo, perguntar:
> "Qual URL ou rota? Posso assumir `http://localhost:5173` se for dev local."

### Passo 2: Navegar

```
mcp__playwright__browser_navigate(url=<URL>)
```

### Passo 3: Screenshot estado "antes"

```
mcp__playwright__browser_take_screenshot(filename="antes-<YYYY-MM-DD-HHMM>.png")
```

Salvar em `.playwright-mcp/` (gitignored, efêmero).

### Passo 4: Snapshot estrutural

```
mcp__playwright__browser_snapshot()
```

Pra ter o DOM acessível pra análise.

### Passo 5: Análise

Reportar ao usuário:
- **O que aparece** (descrição literal — botões, textos, layout)
- **Linha exata do código responsável** (procurar componente correspondente em `repos/<x>/src/`)
- **Distinção crítica:**
  - Bug visual (CSS/layout)
  - Bug de lógica (renderização condicional errada)
  - Bug de dados (string vazia, undefined, mock errado)

### Passo 6: Aguardar próximo passo

NÃO propor solução ainda. Esperar o usuário pedir "propõe correção" (que aciona ciclo: → Analisar → Propor → Testar → Reportar).

## Regras

- **Mobile-first:** se URL não tem viewport especificado, testar mobile primeiro (resize 375x667 antes de screenshot)
- **Screenshots ANTES de qualquer mudança** — comparação visual é necessária
- **Não inventar UI** — descrever apenas o que aparece no screenshot
- **Se Playwright MCP não disponível:** reportar e parar (não tentar substituir)
- **Salvar antes/depois** em `.playwright-mcp/` com timestamp pra rastreabilidade

## Falhas conhecidas

- Playwright MCP não conecta: verificar `.mcp.json` configurado
- URL não carrega: timeout — testar dev server rodando
- Conteúdo dinâmico (carregando) ainda não renderizou: usar `mcp__playwright__browser_wait_for` antes do screenshot
