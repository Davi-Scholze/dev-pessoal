# Skill: `/pedir-contexto`

> Skill universal pra KOD.AI pedir ATIVAMENTE ao operador contexto que falta.
> Status: **DRAFT** (criada 2026-05-21 sessão 4).

## Quick start

```
/pedir-contexto <tipo>                       # pede contexto, formato livre
/pedir-contexto <tipo> --para <skill-alvo>   # contextualiza pra skill específica
/pedir-contexto --silencioso                 # registra gap sem perguntar (próxima sessão)
```

## O que faz

Detecta gap (foto/print/link/vídeo/áudio/doc/credencial faltando) durante execução de outra skill OU em conversa livre. Formata pedido específico ao operador com 5 elementos canônicos:
1. Contexto (o que estou fazendo)
2. Tentativas feitas (não vou pedir antes de tentar)
3. Tipo necessário
4. Finalidade
5. 2-3 alternativas de como prover

Após receber material, dispara skill de absorção apropriada automaticamente.

## Por que existe

**Anti-padrão observado em 2026-05-21 sessão 4:** KOD.AI tentou mapear OnMat e Kimono via WebFetch. Todas URLs falharam (ECONNREFUSED, 404, vazio). Ficou tentando alternativas silenciosamente em vez de pedir ao operador. Operador (Davi) identificou: "KODAI precisa pedir mais contexto caso precise — links, prints, fotos, vídeos".

Esta skill operacionaliza o pedido em workflow estruturado, evitando o anti-padrão "tentar mais N URLs em silêncio".

## Triggers principais

- WebFetch falha consecutivamente (≥2 URLs)
- Skill ativa pede input não fornecido
- Conceito sendo criado sem fonte ancorada
- Pré-flight de outra skill identifica input ausente

## Anti-pollution

- Nunca pede mesmo gap 2x na mesma sessão sem novo contexto
- Modo `--silencioso` quando operador está focado em outra coisa
- Registra gap em `.kodai-gaps/` quando não pode interromper

## Detalhes

Ver `SKILL.md` (workflow 4 fases + 3 casos de uso + matriz tipo→skill-absorção).
