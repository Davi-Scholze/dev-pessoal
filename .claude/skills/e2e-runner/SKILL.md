# SKILL: e2e-runner

## Quando invocar
Para executar ou criar testes E2E com Playwright. Use CLI — nunca MCP (consome contexto).

## Entrada
Fluxo a testar em linguagem natural ou suite existente para executar.

## Saída esperada
Spec Playwright criada + resultado de execução.

## Como executar
```bash
# Executar todos os testes E2E
bash .claude/skills/e2e-runner/scripts/run-suite.sh

# Gravar novo teste (codegen)
bash .claude/skills/e2e-runner/scripts/record-flow.sh

# Apenas acessibilidade
npx playwright test e2e/accessibility.spec.ts
```

## Setup inicial
```bash
npm install -D @playwright/test @axe-core/playwright
npx playwright install chromium firefox
```

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:3000', screenshot: 'only-on-failure' },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'mobile', use: { browserName: 'chromium', viewport: { width: 390, height: 844 } } },
  ]
})
```

## Estrutura de arquivos
```
e2e/
  accessibility.spec.ts   # axe-core em todas as páginas
  auth/
    login.spec.ts         # fluxo de login (happy + error)
  [feature]/
    [flow].spec.ts        # um arquivo por fluxo crítico
  pages/                  # Page Objects
    BasePage.ts
    LoginPage.ts
```

## Restrições
- Nunca use `waitForTimeout` — use `waitForSelector` ou `expect().toBeVisible()`
- Cada spec independente — sem dependência de ordem
- Mobile sempre testado (viewport 390px)
