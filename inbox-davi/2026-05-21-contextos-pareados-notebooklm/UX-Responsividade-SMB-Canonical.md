# UX Universal + Responsividade SMB — Base Canônica Multiplataforma
> Criado em: 21/05/2026 | NotebookLM: https://notebooklm.google.com/notebook/216c85a8-2e63-4ddc-96dc-6a566ebcc81d

---

## 🎯 OBJETIVO

Base CANÔNICA para construir sistemas extremamente responsivos em:
- iPhone (375px → 430px), Android (360px → 412px), Desktop (1280px+), Tablet (768px → 1024px)

Foco: **operação real → velocidade → legibilidade → eficiência → UX profissional → dashboards utilizáveis**

---

## 📚 ESTRUTURA DO NOTEBOOK (24 Fontes)

### Categoria 1: Fundamentos Responsivos (Documentação Oficial)
| Fonte | URL | Relevância |
|-------|-----|------------|
| Responsive Web Design Basics | https://web.dev/articles/responsive-web-design-basics | ⭐⭐⭐ Canônico |
| MDN: Responsive Design | https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design | ⭐⭐⭐ Referência |
| MDN: Container Queries | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries | ⭐⭐⭐ Moderno |
| web.dev: New Responsive | https://web.dev/articles/new-responsive | ⭐⭐⭐ Design orientado a componentes |
| web.dev: min/max/clamp() | https://web.dev/articles/min-max-clamp | ⭐⭐⭐ Tipografia fluida |
| web.dev: Learn Design | https://web.dev/learn/design/ | ⭐⭐ Curso completo |

### Categoria 2: Touch UX + Acessibilidade
| Fonte | URL | Relevância |
|-------|-----|------------|
| Touch e Mouse | https://web.dev/articles/mobile-touchandmouse | ⭐⭐⭐ Touch real |
| Accessible Responsive Design | https://web.dev/articles/accessible-responsive-design | ⭐⭐⭐ A11y + Responsivo |

### Categoria 3: Performance + Core Web Vitals
| Fonte | URL | Relevância |
|-------|-----|------------|
| Optimize INP | https://web.dev/articles/optimize-inp | ⭐⭐⭐ Interatividade |
| CLS (Layout Shift) | https://web.dev/articles/cls | ⭐⭐ Estabilidade visual |
| content-visibility | https://web.dev/articles/content-visibility | ⭐⭐ Render lazy |
| aspect-ratio CSS | https://web.dev/articles/aspect-ratio | ⭐⭐ Proporções responsivas |

### Categoria 4: Layouts CSS (Referências Reutilizáveis)
| Fonte | URL | Relevância |
|-------|-----|------------|
| CSS Grid Guide | https://css-tricks.com/a-complete-guide-to-css-grid/ | ⭐⭐⭐ Referência definitiva |
| CSS Flexbox Guide | https://css-tricks.com/snippets/css/a-guide-to-flexbox/ | ⭐⭐⭐ Referência definitiva |
| MDN CSS Grid Layout | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout | ⭐⭐ Spec oficial |
| Responsive Data Tables | https://css-tricks.com/responsive-data-tables/ | ⭐⭐⭐ Tabelas em mobile |

### Categoria 5: Templates & Repositórios Battle-Tested
| Repositório | URL | Stars | Stack | Relevância |
|-------------|-----|-------|-------|------------|
| AdminLTE v4 | https://github.com/ColorlibHQ/AdminLTE | ~44k | Bootstrap 5.3 + Vanilla TS | ⭐⭐⭐ |
| TailAdmin Next.js | https://github.com/TailAdmin/free-nextjs-admin-dashboard | Alta | Next.js 16 + Tailwind v4 | ⭐⭐⭐ |
| Mosaic (Cruip) | https://github.com/cruip/tailwind-dashboard-template | Alta | React + Tailwind + Chart.js | ⭐⭐⭐ |
| shadcn/ui | https://github.com/shadcn-ui/ui | ~80k+ | React + Radix + Tailwind | ⭐⭐⭐ |
| Ant Design | https://github.com/ant-design/ant-design | ~90k+ | React + TypeScript | ⭐⭐⭐ Enterprise |
| Tremor | https://github.com/tremorlabs/tremor | Alta | React + Tailwind (dashboards) | ⭐⭐⭐ |
| CoreUI React | https://github.com/coreui/coreui-free-react-admin-template | Alta | React 19 + CoreUI | ⭐⭐ |
| Next.js SaaS Starter | https://github.com/nextjs/saas-starter | Alta | Next.js + shadcn + Stripe | ⭐⭐⭐ |

---

## 🧠 PRINCIPAIS APRENDIZADOS

### 1. O Novo Responsivo (web.dev/new-responsive)
O design responsivo moderno vai além de media queries de viewport. A nova era combina:
- **Container Queries**: componentes respondem ao container, não ao viewport
- **User Preference Queries**: `prefers-color-scheme`, `prefers-reduced-motion`, `pointer`, `hover`
- **Scoped Styles**: `@scope` para encapsular estilos por componente
- **Foldable Screens**: suporte a `spanning: single-fold-vertical`

### 2. Mobile-First ≠ só CSS
Mobile-first real inclui:
- Começar o layout do zero para 320-375px
- Projetar para thumb zone (zona inferior da tela)
- Eliminar hover states como única forma de revelar informação
- Testar com velocidade 3G e CPU 4x throttled

### 3. Container Queries > Media Queries para componentes
```css
/* Padrão moderno */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### 4. Fluid Typography com clamp() — zero breakpoints
```css
/* Tipografia que escala automaticamente */
:root {
  --text-sm:   clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --text-lg:   clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
  --text-xl:   clamp(1.25rem, 1.1rem + 1vw, 2rem);
  --text-2xl:  clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
  --text-3xl:  clamp(1.875rem, 1.5rem + 2vw, 3.5rem);
}
```

### 5. Tabelas Responsivas — técnica "flip" (CSS-Tricks)
```css
@media (max-width: 760px) {
  table, thead, tbody, th, td, tr { display: block; }
  thead tr { position: absolute; top: -9999px; left: -9999px; }
  td { 
    border: none; border-bottom: 1px solid #eee;
    position: relative; padding-left: 50%;
  }
  td:before { 
    position: absolute; top: 6px; left: 6px;
    width: 45%; white-space: nowrap;
  }
  td:nth-of-type(1):before { content: "Nome"; }
  td:nth-of-type(2):before { content: "Status"; }
}
```

### 6. Performance: INP < 200ms (Core Web Vitals)
```javascript
// Padrão: separar UI update de trabalho secundário
element.addEventListener('click', (e) => {
  // Atualização visual imediata
  updateUI(e);

  // Trabalho pesado adiado
  requestAnimationFrame(() => {
    setTimeout(() => {
      heavyWork();
      saveToServer();
    }, 0);
  });
});
```

### 7. Touch UX — Ordem de eventos
touchstart → touchmove → touchend → mouseover → mousemove → mousedown → mouseup → click
**Regra:** `preventDefault()` no touchend evita o delay de 300ms e o evento duplicado de mouse.

### 8. Dark Mode correto
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;        /* não usar #000 puro */
    --surface: #2d2d2d;   /* elevação via cor, não sombra */
    --text: #e8e8e8;      /* não usar #fff puro */
    --primary: #7c8cf8;   /* dessaturar primary color */
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔑 PADRÕES REUTILIZÁVEIS

### Layout de Dashboard Responsivo
```css
/* Shell principal */
.app-shell {
  display: grid;
  grid-template-areas: "sidebar main";
  grid-template-columns: 240px 1fr;
  min-height: 100dvh;
}

@media (max-width: 768px) {
  .app-shell {
    grid-template-areas: "main";
    grid-template-columns: 1fr;
  }
  .sidebar { 
    position: fixed;
    transform: translateX(-100%);
    transition: transform 200ms ease;
  }
  .sidebar.open { transform: translateX(0); }
}
```

### Grid de KPI Cards
```css
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```

### Container de Tabela Responsiva
```css
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
}

.table-container table {
  min-width: 600px;
  width: 100%;
}
```

### Touch Target Seguro
```css
.btn, .link, .icon-btn {
  min-height: 44px;  /* Apple HIG */
  min-width: 44px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  /* touch-action para performance */
  touch-action: manipulation;
}
```

### Viewport seguro para iPhone notch/home bar
```css
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}

.top-bar {
  padding-top: env(safe-area-inset-top);
}
```

### Tipografia ideal para leitura
```css
.content-body {
  /* 65-75 chars por linha = ideal para leitura */
  max-width: 70ch;
  line-height: 1.6;
  font-size: clamp(1rem, 2vw + 0.5rem, 1.125rem);
}
```

---

## 📦 STACKS RECOMENDADAS (battle-tested)

### Para SaaS / Dashboard Empresarial
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4

shadcn/ui (componentes) + Tremor (gráficos e dashboards)
Drizzle ORM + PostgreSQL + Stripe

**Template de referência:** TailAdmin ou Next.js SaaS Starter

### Para Admin Panel Corporativo
React 19 + CoreUI ou AdminLTE v4

Bootstrap 5.3 (sem jQuery) + ApexCharts

**Template de referência:** AdminLTE v4 ou CoreUI React

### Para Enterprise (alta escala)
React + Ant Design (antd)

TypeScript + Webpack/Vite

**Template de referência:** Ant Design Pro

---

## 🎬 VÍDEOS RECOMENDADOS (YouTube)

> ⚠️ Pesquisar diretamente no YouTube com estas queries:

| Query | Tipo de conteúdo |
|-------|-----------------|
| `"container queries" 2024 2025 tutorial` | Técnica moderna CSS |
| `"mobile first" responsive design 2024` | Fundamentos reais |
| `shadcn ui dashboard tutorial 2024` | Template SaaS |
| `tailwind css responsive dashboard` | Dashboard profissional |
| `css grid layout modern 2024` | Layout engine |
| `"web vitals" INP optimization 2024` | Performance |
| `next.js saas starter tutorial` | Stack completa |
| `ant design dashboard enterprise` | Enterprise UX |
| `"thumb zone" mobile UX design` | Touch design |

---

## 🔗 LINKS MAIS IMPORTANTES

### Documentação Obrigatória
1. https://web.dev/articles/new-responsive — **O Novo Responsivo (leitura obrigatória)**
2. https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries — **Container Queries**
3. https://web.dev/articles/min-max-clamp — **Tipografia fluida com clamp()**
4. https://css-tricks.com/a-complete-guide-to-css-grid/ — **Grid definitivo**
5. https://web.dev/articles/optimize-inp — **Performance interativa**

### Templates de Dashboard
6. https://github.com/TailAdmin/free-nextjs-admin-dashboard — **Next.js + Tailwind**
7. https://github.com/shadcn-ui/ui — **Component library canônica**
8. https://github.com/ColorlibHQ/AdminLTE — **Bootstrap admin clássico**
9. https://github.com/tremorlabs/tremor — **Dashboard components React**
10. https://github.com/nextjs/saas-starter — **SaaS completo**

### Touch e Acessibilidade
11. https://web.dev/articles/mobile-touchandmouse — **Touch + Mouse juntos**
12. https://web.dev/articles/accessible-responsive-design — **A11y responsivo**
13. https://css-tricks.com/responsive-data-tables/ — **Tabelas mobile**

---

## 📐 PADRÕES DE UX REALMENTE EFICIENTES

### Bottom Navigation (Mobile)
- Máximo 5 itens
- Ícone + Label sempre
- Active state visível
- Altura mínima: 56dp (Android) / 49pt (iOS)
- Posicionado sobre safe area bottom

### Sidebar (Desktop/Tablet)
- Colapsável com ícones em modo compacto
- Largura expandida: 240-280px
- Largura compacta: 60-72px
- Transição: 200-250ms ease

### KPI Cards
- Número grande em cima, label abaixo
- Delta/variação com cor (verde/vermelho)
- Mínimo 4 por linha em desktop, 2 em tablet, 1-2 em mobile
- Skeleton loading para evitar CLS

### Data Tables Enterprise
- Sticky header sempre
- Busca e filtros no topo
- Paginação ou infinite scroll
- Selectable rows com checkbox
- Ações em linha (editar, deletar)
- Em mobile: cards ou scroll horizontal com shadow indicator

### Formulários Responsivos
- Input width: 100% em mobile
- Label sempre acima do input (nunca placeholder como único label)
- Touch target mínimo de 48px de altura
- Teclado correto: type="email", type="tel", type="number"
- inputmode para controle fino do teclado

---

## 🔄 COMO REUTILIZAR ESTE CONTEXTO

### Para novos projetos:
1. Abrir o notebook: https://notebooklm.google.com/notebook/216c85a8-2e63-4ddc-96dc-6a566ebcc81d
2. Perguntar: "Qual é o melhor padrão para [componente específico] em mobile?"
3. Perguntar: "Como implementar [feature] seguindo os padrões de UX enterprise?"

### Para expandir o notebook:
- Adicionar novos repositórios conforme descobertos
- Adicionar artigos técnicos relevantes via "Adicionar fontes > Sites"
- Criar notas por categoria (ex: "Padrões de Formulários", "Gráficos Responsivos")

### Para novos sistemas SMB:
1. Usar Next.js SaaS Starter como base
2. Aplicar shadcn/ui para componentes
3. Seguir os 10 padrões canônicos desta nota
4. Testar sempre em 375px (iPhone 14) e 360px (Android médio) primeiro
5. Validar INP < 200ms em dispositivos reais

### Breakpoints canônicos recomendados:
```css
/* Mobile first */
/* 0px - 639px: mobile */
@media (min-width: 640px)  { /* sm: tablet pequeno */ }
@media (min-width: 768px)  { /* md: tablet */ }
@media (min-width: 1024px) { /* lg: desktop */ }
@media (min-width: 1280px) { /* xl: desktop largo */ }
@media (min-width: 1536px) { /* 2xl: ultrawide */ }
```

---

## ⚡ CHECKLIST DE QUALIDADE — Sistemas Responsivos SMB

### Mobile (obrigatório)
- [ ] Testado em 375px de largura
- [ ] Touch targets ≥ 48px
- [ ] Sem scroll horizontal indesejado
- [ ] Fonte legível sem zoom (mínimo 16px base)
- [ ] Formulários com type e inputmode corretos
- [ ] Bottom nav ou menu hamburger acessível
- [ ] Safe area insets aplicados (iOS notch/home bar)
- [ ] INP < 200ms medido em dispositivo real

### Desktop (obrigatório)
- [ ] Layout sidebar + content area funcional
- [ ] Tabelas com cabeçalho sticky
- [ ] Gráficos 100% width responsivos
- [ ] Hover states presentes
- [ ] Keyboard navigation funcional

### Acessibilidade (obrigatório)
- [ ] user-scalable não bloqueado
- [ ] Unidades relativas (rem/em) para texto
- [ ] prefers-reduced-motion respeitado
- [ ] prefers-color-scheme suportado
- [ ] Contrast ratio ≥ 4.5:1
- [ ] Foco visível em todos os elementos interativos

### Performance (obrigatório)
- [ ] CLS < 0.1 (sem layout shifts)
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] Images com width + height para reservar espaço
- [ ] content-visibility: auto em seções longas

---

*Gerado em: 21/05/2026 | Base canônica para sistemas SMB multiplataforma*