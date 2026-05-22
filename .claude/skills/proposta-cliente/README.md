# Skill: `/proposta-cliente`

> Skill universal pra gerar proposta consultiva TOP pra cliente novo (modelo DFY/DWY/DIY).
> Status: **DRAFT** (criada 2026-05-21 sessão 4).

## Quick start

```
/proposta-cliente <nome>                       # workflow 6 fases padrão
/proposta-cliente <nome> --quick               # pula pesquisa profunda
/proposta-cliente <nome> --deep                # +3 concorrentes via NotebookLM
/proposta-cliente --update <nome>              # revisa proposta existente
/proposta-cliente <nome> --ticket R$15k        # força faixa, afeta escopo
```

## O que faz

6 fases automáticas:
1. **Identificação** — nome + vertical + tamanho + material recebido + pré-flight
2. **Captura completa** — orquestra `/capturar-imagem`, `/capturar-video`, `/transcribe-audio`, `/absorver-midia`, `/absorver-contexto`
3. **Mapeamento estado atual cliente** — o que cliente JÁ TEM (site, app, processos, dores)
4. **Pesquisa do melhor** — concorrentes (`/mapear-concorrente`) + benchmarks (`/sugerir-pesquisa`) + tendências
5. **Síntese gap analysis** — atual vs ideal + recomendações priorizadas
6. **Proposta TOP** — `propostas/<cliente>-<YYYY-MM-DD>.md` em 8 seções canônicas + executive summary

## Saída

- `propostas/<cliente>-<YYYY-MM-DD>.md` (proposta completa ~5 páginas)
- `propostas/<cliente>-<YYYY-MM-DD>-EXECUTIVE-SUMMARY.md` (1 página)
- Opcional: render PDF via Pandoc
- `inbox-<cliente>/README.md` atualizado
- Commit + push automático

## Pré-requisitos

- `_memoria/empresa.md` populado (modelo de venda do operador + faixas de ticket)
- `_memoria/preferencias.md` define tom da proposta
- Material mínimo do cliente (1 URL + 1-2 prints/descrição)

Se faltar material → auto-dispara `/pedir-contexto`.

## Quando NÃO usar

- Cliente já existente — use `--update` ou skill de atualização
- Discussão técnica não-comercial
- Pesquisa de mercado sem cliente específico — use `/sugerir-pesquisa` direto

## Anti-pollution

- Material do cliente fica em `inbox-<cliente>/` (Regra 2 — bruto sagrado)
- Concorrentes mapeados vão pra `competitive-intelligence/conceitos/` (universal)
- Proposta fica em `propostas/<cliente>-<data>.md` (específico cliente, sensibilidade: confidencial-cliente)
- Nenhum dado do cliente vaza pro upstream KODAI

## Detalhes

Ver `SKILL.md` (workflow 6 fases + 8 seções canônicas + modo `--update` + limitações honestas).
