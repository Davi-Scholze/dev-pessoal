# SKILL: tailwind-shadcn-scaffold

## Quando invocar
Ao iniciar um projeto web novo ou ao adicionar Shadcn/UI a um projeto existente.

## Entrada
Nome do projeto + framework (Next.js 15 ou Vite).

## Saída esperada
Scaffold completo com Tailwind 4 + Shadcn/UI + tokens de design configurados.

## Setup obrigatório
```bash
# 1. Next.js 15 com App Router
npx create-next-app@latest --typescript --tailwind --app

# 2. Shadcn/UI
npx shadcn@latest init

# 3. Componentes base
npx shadcn@latest add button input label form card dialog toast
```

## Configuração de tokens no Tailwind
Adicionar ao `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --color-bg-canvas: oklch(98% 0.002 247);
  --color-fg-default: oklch(18% 0.008 247);
  --color-accent-default: oklch(45% 0.155 25);
  /* ... todos os tokens semânticos */
}
```

## Estrutura de pastas padrão
```
src/
  app/           # App Router pages
  components/
    ui/          # Shadcn primitivos (nunca editar diretamente)
    [feature]/   # Componentes de feature
  lib/
    utils.ts     # cn() e helpers
  styles/
    globals.css  # Tokens + resets
```
