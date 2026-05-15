# SKILL: accessibility-axe

## Quando invocar
Ao criar ou revisar componentes UI. Acessibilidade ≥95 é requisito de PR (não nice-to-have).

## Entrada
Componente ou página a auditar.

## Saída esperada
Lista de violações de acessibilidade + fixes aplicados.

## Setup de teste automatizado
```bash
npm install @axe-core/playwright --save-dev
```

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('todas as páginas são acessíveis', async ({ page }) => {
  for (const url of ['/', '/login', '/dashboard']) {
    await page.goto(url)
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations, `Violações em ${url}`).toHaveLength(0)
  }
})
```

## Checklist manual (componentes)
- [ ] Elementos interativos têm `aria-label` ou texto visível
- [ ] `<img>` tem `alt` descritivo (ou `alt=""` se decorativa)
- [ ] Contraste: ≥4.5:1 texto normal, ≥3:1 texto grande (>18px ou >14px bold)
- [ ] Foco visível com `ring-focus` token
- [ ] `<input>` tem `<label>` associado via `htmlFor`
- [ ] Modal tem `role="dialog"` + `aria-modal="true"` + foco trapped
- [ ] Formulário tem `aria-describedby` nos campos com erro

## Recursos de referência
- WCAG 2.1 AA: https://www.w3.org/WAI/WCAG21/quickref/
- axe-core regras: https://dequeuniversity.com/rules/axe/
