# SKILL: vitest-unit

## Quando invocar
Ao criar testes unitários para funções, hooks ou componentes React.

## Entrada
Arquivo ou função a testar.

## Saída esperada
Arquivo de teste com casos happy path, edge cases e erros.

## Setup
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: { provider: 'v8', threshold: { branches: 70 } }
  }
})
```

## Template de teste de função pura
```typescript
// src/lib/__tests__/format-currency.test.ts
import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../format-currency'

describe('formatCurrency', () => {
  it('formata valor positivo em BRL', () => {
    expect(formatCurrency(1500.50)).toBe('R$ 1.500,50')
  })
  it('formata zero', () => {
    expect(formatCurrency(0)).toBe('R$ 0,00')
  })
  it('retorna fallback para undefined', () => {
    expect(formatCurrency(undefined)).toBe('—')
  })
})
```

## Template de teste de componente
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('submete formulário com dados válidos', async () => {
  const onSubmit = vi.fn()
  render(<LoginForm onSubmit={onSubmit} />)
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
  await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
  expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' })
})
```

## Cobertura alvo: 70% branches nas funções de negócio
