# SKILL: design-tokens

## Quando invocar
Antes de criar qualquer componente UI. Sempre que precisar de um valor de cor, espaçamento, tipografia ou animação.

## Entrada
Nenhuma — esta skill é referência, não tem input.

## Saída esperada
Valores corretos de tokens para usar no código.

## Arquivo de tokens
Ver `tokens.json` nesta pasta para todos os valores.

## Como usar no Tailwind
```css
/* tailwind.config.ts — extenda com os tokens */
theme: {
  extend: {
    colors: {
      canvas: 'var(--color-bg-canvas)',
      surface: 'var(--color-bg-surface)',
      accent: 'var(--color-accent-default)',
    }
  }
}
```

## Regra dura
NUNCA use valores literais no código:
- ❌ `color: #C0392B` → ✅ `color: var(--color-accent-default)`
- ❌ `fontSize: 16` → ✅ `className="text-base"` (Tailwind)
- ❌ `margin: 13px` → ✅ `className="mt-3"` (escala de 4px)

O Hook 3 (check-design-tokens.py) bloqueia commits que violam esta regra.
