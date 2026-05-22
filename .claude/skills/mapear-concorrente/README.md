# Skill: `/mapear-concorrente`

> Skill universal pra mapeamento sistemático de concorrente direto.
> Status: **DRAFT** (criada 2026-05-21 sessão 4).

## Quick start

```
/mapear-concorrente https://instagram.com/<perfil-concorrente>
/mapear-concorrente "Nome do Concorrente"
/mapear-concorrente <url> --deep    # adiciona Deep Search Gemini + NotebookLM
/mapear-concorrente --update <slug> # re-mapeia concorrente já registrado
```

## O que faz

5 fases automáticas:
1. **Identificação** — detecta produto-âncora do projeto consumidor + parseia input
2. **Investigação profunda** — WebFetch + listings + Insta/YT + LinkedIn
3. **Matriz comparativa** — features, pricing, UX, posicionamento, stack, lacunas
4. **Plano de implementação** — gaps priorizados por ROI + ângulos de superioridade
5. **Registro + commit** — conceito em `competitive-intelligence/conceitos/` + commit imediato

## Saída

- `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/<slug-concorrente>-vs-<slug-produto>.md`
- Atualização em `competitive-intelligence/DOMINIO.md` (linha do novo concorrente)
- Atualização em `competitive-intelligence/manifest.yaml` (merged_inputs)

## Anti-pollution

- n-gram ≥5 PASS (não copia frases do site)
- Marca-zero parcial (nome citado, slogan/copy NÃO)
- PII-zero
- Atribuição via lineage no manifest (não no corpo)

## Quando NÃO usar

- Pesquisa neutra de mercado → `/sugerir-pesquisa`
- Pesquisa de framework/biblioteca → Context7 ou WebFetch direto
- Re-mapeamento <30 dias sem motivo → idempotência bloqueia (use `--update` explícito)

## Detalhes

Ver `SKILL.md` (workflow completo 5 fases + casos especiais + limitações honestas).
