# KODAI-INSTALADO — Projetos Dev Pessoais

> Inventário do que foi instalado via KOD.AI /instalar.
> Atualizar sempre que um pack ou contexto-domínio for adicionado/removido.
> Última atualização: 2026-05-15

---

## Versão instalada

| Campo | Valor |
|---|---|
| Versão KOD.AI | `v0.1.0-camada1` |
| Perfil | `completo` |
| Data instalação | 2026-05-15 |
| Upstream | github.com/Davi-Scholze/kod-ai |
| Modo | Pasta-mãe existente (Categoria C) |

---

## O que foi adicionado

### Arquivos KOD.AI novos
- [x] `_memoria/empresa.md` — contexto do negócio
- [x] `_memoria/estrategia.md` — foco e prioridades
- [x] `_memoria/preferencias.md` — tom, estilo, evitar
- [x] `identidade/design-guide.md` — paleta dark minimalist
- [x] `MAPA.md` — entrada rápida (alias para MAPA_PESSOAL.md)
- [x] `PENDENCIAS.md` — fila priorizada
- [x] `PROMPT_MASTER_HANDOFF.md` — estado vivo completo
- [x] `KODAI-INSTALADO.md` — este arquivo

### O que já existia (mantido intocado)
- [x] `CLAUDE.md` — regras de IA (compatível com KOD.AI)
- [x] `AGENTS.md` — 18 agentes SCHOLZE-STACK (compatível)
- [x] `REGRAS_SESSAO.md` — regras operacionais (extensão local)
- [x] `MAPA_PESSOAL.md` — mapa detalhado (complementa MAPA.md)
- [x] `contextos/` — biblioteca de conhecimento
- [x] `docs/` — documentação
- [x] `ferramentas/` — templates e catálogos
- [x] `.claude/` — SCHOLZE-STACK (agents, skills, hooks, commands)
- [x] `Repositorios/` — code repos

---

## Contextos-domínio ativos

| Domínio | Status | Path no KOD.AI |
|---|---|---|
| contabilidade-br | STUB | `Repositorios/KODAI/3-CONTEXTOS-DOMINIO/contabilidade-br/` |
| dojos-artes-marciais | STUB | `Repositorios/KODAI/3-CONTEXTOS-DOMINIO/dojos-artes-marciais/` |

---

## Packs ativos

Nenhum pack populado ainda — todos STUB. Ver roadmap em `Repositorios/KODAI/docs/PLANNING.md`.

---

## Fonte do KOD.AI nesta máquina

```
C:\Users\usuario\Documents\Projetos Dev Pessoais\Repositorios\KODAI\
```

---

## Conflitos detectados na instalação

| Item | Classificação | Resolução |
|---|---|---|
| MAPA.md vs MAPA_PESSOAL.md | (b) Diverge — mesmo conteúdo, nome diferente | Criado MAPA.md como entrada rápida; MAPA_PESSOAL.md mantido |
| REGRAS_SESSAO.md | (a) Extra local — não está no template | Mantido intocado |
| `.claude/` (SCHOLZE-STACK) | (a) Extra local — extensão local | Mantido intocado |
| `ferramentas/` | (a) Extra local | Mantido intocado |

---

## Para atualizar o KOD.AI

```
cd Repositorios/KODAI
git pull origin main
```

Depois, na sessão Claude Code desta pasta:
```
/atualizar-kodai
```
