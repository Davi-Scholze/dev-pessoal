---
data_entrada: 2026-05-26
origem: Davi (Downloads) — 2 arquivos baixados, recomendados pra absorção KOD.AI
fontes:
  - C:\Users\usuario\Downloads\decision-maker.skill.md (skill prompt-based de briefing visual)
  - C:\Users\usuario\Downloads\claude_code_website_pipeline.pdf (Textura Agency — pipeline 11 passos)
status: bruto-promovido-em-2026-05-26 (OK explícito Davi "absorva e aplique tudo, vai melhorar o KODAI?")
relacionado:
  - upstream skill: KODAI/1-ESQUELETO/skills-universais/design-brief-locker/
  - upstream pack: KODAI/2-PACKS/packs/design/website-premium-animated/
  - regra atualizada: .claude/rules/ui-cycle-trigger.md (Fase 0 BRIEF adicionada)
  - aplicação retroativa: Repositorios/dojo-familia-scholze/_negocio/contextos/briefs/2026-05-26_landing-publico-v8.md
---

# Bruto — Decision Maker + Textura Pipeline (2026-05-26)

## Contexto da entrada

Davi rejeitou a v6 do Dojô landing (30% pior). Raiz: pulamos a fase de briefing visual sharp e fomos direto pra código. Sob essa frustração, Davi baixou e mandou avaliar 2 docs:

1. **`decision-maker.skill.md`** — skill prompt-only que força founder a tomar 6 decisões + 3 buckets de referência + 3 lógicas visuais ANTES de codar. Output: 4 prompts ready-to-use (Copywriter, 3D, Design, Developer) + launch guide GitHub+Vercel.
2. **`claude_code_website_pipeline.pdf`** (Textura Agency) — pipeline 11 passos pra website premium animado. Inclui técnica "Strip the Background" que eu não estava usando.

Veredito dado a Davi:
- Decision Maker: faz MUITO sentido. Resolve a raiz da v6 ruim.
- Textura Pipeline: 4 técnicas valem ouro (strip-bg, ref dupla clean+original, Pinterest anim refs, Kling video loops). Stack desalinhado (React Spring/Three.js — preferimos Framer Motion).

Davi: "absorva e aplique tudo, vai melhorar o KODAI?"

## Decision Maker — íntegra (inglês original)

Ver arquivo original em `C:\Users\usuario\Downloads\decision-maker.skill.md`. Conteúdo absorvido + traduzido + adaptado pra BR + integrado ao workflow KOD.AI em `KODAI/1-ESQUELETO/skills-universais/design-brief-locker/SKILL.md`.

**Pontos-chave preservados:**

- **Premissa:** "Most founders open AI tools with vague intent and get generic output. Your job is to force them to make six decisions, build a three-bucket reference library, extract three visual logics, and compile everything into four production-ready prompts. **The brief is the moat. Everyone has Claude. Almost no one has a sharp brief.**"
- **Banned words:** modern, clean, minimal, professional, sleek, premium, beautiful, elegant. Eles descrevem qualquer site, então produzem qualquer site.
- **6 decisões obrigatórias:** Feeling / Audience+Anti-audience / Hero object / Job (one verb) / Cut (60-80% das seções dos competitors) / Three-second test.
- **3 buckets de ref:** Feeling (filme/foto/editorial — quase nunca sites) / Structural (sites pra layout logic) / Detail (micro-interactions, hover, scroll).
- **3 lógicas extraídas:** Color logic (a relação, não os hex) / Type logic (o contraste, não as fontes) / Spatial logic (o POV, não os elementos).
- **Auto-flow rule:** depois de cada resposta confirmada, "Lock it. Preview next. Ask next question with example." — nunca esperar usuário pedir próximo passo.
- **Tone:** direct, opinionated, peer-to-peer. Senior designer mentoring a founder over coffee. Short sentences. No filler. No "great question!". Reject soft answers politely but firmly.

**O que adaptar pra BR:**

- Exemplos gringos (Antarctica Zero, Diesel, Aesop, Stripe) → exemplos BR (Magalu, Nubank, Asaas, iFood, Casa do Naturalista, Globo). Manter alguns gringos clássicos (Wong Kar-wai, Apple) que são linguagem universal.
- Tom em PT-BR mantendo a postura "estrategista senior, não cliente-fiel".
- Compliance com regra `feedback_nunca_palavroes` (zero palavrão em qualquer output).

## Textura Pipeline — íntegra (extraído do PDF)

### TEXTURA / Claude Code Pipeline — Premium Animated Websites

**11 passos divididos em 8 fases:**

```
01 Brief        → 02-03 Reference   → 04 Build          → 05-07 Style
08 Assets       → 09 Animations     → 10 Optimize       → 11 Deploy
```

### Antigravity vs Claude Code (posicionamento)

| Antigravity | Claude Code |
|---|---|
| Screenshot → AI builds in browser | Screenshot → Claude writes clean code |
| Edit visually | Iterate in plain English, full control |
| Vendor lock-in | Standard Next.js / HTML output |

### Detalhe dos 11 passos

**01 — Brief & Copywriting (Phase 1)**

Definir brand, audience, tom de voz. Gerar copy com IA (Perplexity / Claude.ai) ANTES de tocar em design ou código.

Prompt template:
> "You are a senior copywriter. Write hero headline, subheadline, 3 feature descriptions, CTA and footer copy for [BRAND]. Tone: [cinematic / bold / minimal]. Output JSON."

**02 — Find a Section Reference (Phase 2)**

Dribbble / Behance / Awwwards pra hero sections fortes. Tags: landing page, hero, product, dark UI.

**03 — Strip the Background, Clean UI Only (Phase 2)** ⭐ TÉCNICA-CHAVE

Usar **GPT Image 4o** ou **OpenArt** pra strip todos background graphics da referência. Manter SÓ tipografia, botões, nav em fundo preto sólido. Vira layout reference precisa pro Claude Code.

Prompt: "A high-fidelity mockup based on [screenshot]. Only UI elements on solid black background. All background imagery removed. Text and buttons in strict black and white. Stark, minimal, high-contrast monochrome."

ANTES: original colorful → DEPOIS: B&W puro de UI elements.

**04 — Recreate the Layout from Screenshot (Phase 3 — Build)** ⭐ PRO TIP

Abrir Claude Code. Attach screenshot B&W + descrever task. Claude Code lê imagem e recria layout pixel-close. Customizar daí.

Prompt: "You are a senior web designer and developer. Recreate the referenced layout one-to-one using Next.js 16. Match fonts (use similar creative typefaces), spacing, proportions and element positioning. Use React Spring to animate elements sequentially on load."

**PRO TIP (Davi marcou):** "Attach the cleaned reference **and the original together** — Claude Code uses the clean version for layout and the original for mood, colour feel and typographic intent."

**05 — Typography (Phase 4)**

Google Fonts + Awwwards Free Fonts. Search: Condensed, Black, Extended.

**06 — Color Palettes (Phase 4)**

Coolors / Trending Palettes. Export como CSS variables direto pro Claude Code.

Prompt: "Take this palette [HEX list] and apply it to the project. Update all CSS custom properties. Primary CTA button — [COLOR]."

**07 — 3D Models (Phase 4)**

Sketchfab pra free 3D models. Download GLB / GLTF, embed via Three.js ou Spline.

**08 — Image & Video Generation (Phase 5)**

OpenArt pra hero illustrations + 3D characters. **Kling 3.0 pra looping video backgrounds** ⭐ (resolve nosso pendente "vídeo judô loop B&W").

Prompt: "3D render, [description], dark cinematic background, soft rim lighting, 4K, transparent bg. Style: Clay / Glossy / Neon."

**09 — Animations Referenced from Pinterest (Phase 6)** ⭐ TÉCNICA-CHAVE

Coletar clips curtos no Pinterest — hover states, scroll reveals, marquee, sticky sections. Drop refs no Claude Code e pedir GSAP ou Framer Motion.

Prompt: "Implement these animation references with GSAP ScrollTrigger. Hero text: staggered reveal on load. Cards: fade + lift on scroll into view. Marquee: infinite horizontal loop, pause on hover. **Respect prefers-reduced-motion.**"

**10 — Asset Compression (Phase 7)**

Squoosh + Claude Code. Checklist:
- PNG / JPG → WebP (Squoosh, quality 80%)
- Video loop → MP4 + WebM, max 2 MB
- Fonts: preload in <head>
- Images: lazy loading + explicit width / height attributes
- Animations: add @media (prefers-reduced-motion)
- Text contrast: minimum AA (4.5 : 1)

**11 — Deploy (Phase 8)**

Static: drag folder onto Vercel/Netlify. Next.js: one command terminal. Custom domain DNS < 5min.

Prompt vercel.json: "Generate vercel.json: cache /public/* immutable 1 year, redirect www → apex domain, 404 → index.html for SPA routing."

### Tool stack mapeado pelo Textura

| Fase | Tools recomendadas | Substituição KOD.AI |
|---|---|---|
| Brief | Perplexity, Claude.ai | Manter — adicionar `/design-brief-locker` skill upstream |
| Reference | Dribbble, Behance, Awwwards | Manter + adicionar Land-book, Godly.website, Httpster |
| Strip BG | GPT Image 4o, OpenArt | Adicionar como skill futura `strip-ui-reference` |
| Build | Claude Code, **Next.js 16, React Spring** | Nosso stack: Next.js 15 + Framer Motion (React Spring é redundante) |
| Fonts | Google Fonts, Awwwards Fonts | Manter |
| Color | Coolors | Manter |
| 3D | Sketchfab, Three.js, Spline | Opcional — só se vertical exigir 3D |
| Assets | OpenArt, **Kling 3.0** | Kling pra resolver "vídeo loop dojô B&W" pendente |
| Animations | Pinterest refs + GSAP/Framer Motion | Manter — preferir Framer Motion (já no stack) |
| Optimize | Squoosh, Lighthouse 90+ | Manter |
| Deploy | Vercel, Netlify, Hostinger | Manter Vercel (já automatizado via CI) |

---

## Decisões de absorção (Davi OK "absorva e aplique tudo")

| Decisão | Resultado |
|---|---|
| Onde vive a skill nova | `KODAI/1-ESQUELETO/skills-universais/design-brief-locker/` |
| Onde vive o playbook adaptado | `KODAI/2-PACKS/packs/design/website-premium-animated/` |
| Quando dispara a skill | Antes de `/spec` que toca UI; antes de `/break` de UI; manualmente via `/design-brief-locker` |
| Onde fica o brief gerado no cliente | `<repo>/_negocio/contextos/briefs/<data>_<topico>.md` |
| Regra path-scoped atualizada | `.claude/rules/ui-cycle-trigger.md` ganha **Fase 0 BRIEF** antes do VER existente |
| Aplicação retroativa Dojô | Brief v8 em `Repositorios/dojo-familia-scholze/_negocio/contextos/briefs/2026-05-26_landing-publico-v8.md` |
| Stack adaptado | Framer Motion (não React Spring), Next.js 15 (não 16), Kling 3.0 opcional pra vídeo loop |
| Anti-pollution | NotebookLM Estrutura Fonte #38 — não duplicar conteúdo em AGENTS.md raiz, viver em path-scoped rule + skill upstream |

---

## Aprendizado pra próximas absorções de skills externas

1. Skill prompt-only do tipo "decision-maker" cabe direto em `skills-universais/` — não precisa virar pack inteiro.
2. Pipeline tipo "Textura 11 passos" cabe em pack na categoria certa (`packs/design/`) porque tem capacidade técnica anexa (tools, prompts, checklists).
3. Toda absorção que envolve UI deve atualizar a regra path-scoped `ui-cycle-trigger.md` pra refletir nova fase obrigatória.
4. Banned words list (modern/clean/minimal/premium/etc) deve virar regra universal — atualmente DRAFT, considerar promover pra `politicas/copy-banned-words.md` em sessão futura.
