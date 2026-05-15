# SKILL: responsive-mobile-first

## Quando invocar
Ao criar qualquer componente ou layout web. Mobile-first é o padrão — nunca exceção.

## Entrada
Descrição do componente ou layout desejado.

## Saída esperada
Componente responsivo começando pelo menor breakpoint.

## Breakpoints Tailwind (mobile-first)
```
base (0px+)   → mobile portrait — padrão, sem prefixo
sm (640px+)   → mobile landscape / tablet pequeno
md (768px+)   → tablet
lg (1024px+)  → desktop pequeno
xl (1280px+)  → desktop
2xl (1536px+) → wide desktop
```

## Exemplo padrão
```tsx
// ✅ Mobile-first
<div className="flex flex-col gap-4 p-4 md:flex-row md:gap-8 md:p-8">
  <aside className="w-full md:w-64 lg:w-80">...</aside>
  <main className="flex-1 min-w-0">...</main>
</div>

// ❌ Desktop-first (evitar)
<div className="flex flex-row gap-8 md:flex-col">
```

## Padrões obrigatórios (do Mobbin)
- Bottom Tab Navigator (não hamburger menu) no mobile
- Touch targets mínimos: 44px de altura
- Padding lateral: 16px mobile, 24px tablet, 32px desktop
- Max-width de conteúdo: 768px (texto), 1280px (layout)
- Imagens: `object-cover` com aspect-ratio fixo

## Teste visual obrigatório
Visualize em: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1440px (desktop).
