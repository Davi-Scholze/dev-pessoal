# KODAI-INSTALADO — Projetos Dev Pessoais

> Inventário do que foi instalado via KOD.AI /instalar.
> Atualizar sempre que um pack ou contexto-domínio for adicionado/removido.
> Última atualização: 2026-05-21 (sync upstream v0.5.0 + propagação skills v0.5/v0.6-dev)

---

## Versão instalada

| Campo | Valor |
|---|---|
| Versão KOD.AI | `v0.5.0` (tag) → `0.6.0-dev` (em desenvolvimento) |
| Perfil | `completo` |
| Data instalação inicial | 2026-05-15 |
| Última atualização | 2026-05-21 (v0.2.6 → v0.5.0 via `git pull` + 0.6.0-dev local) |
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

### Skills KOD.AI propagadas em `.claude/skills/` (atualizado 2026-05-21)

**Universais nativas v0.4 (16):** abrir, absorver-contexto, absorver-referencia, atualizar, capturar, capturar-contexto-cliente, check-in, criar-contexto, criar-pack, criar-perfil, mapear-rotinas, salvar, ver, writing-plans (e mais 2 via bundled overlap)

**Universais v0.5 (5):** ativar-notebooklm, evoluir-contexto, sugerir-pesquisa, auditar-projeto, capturar-imagem

**Universais v0.6-dev (2):** capturar-video, faxina

**Bundled (17):** brainstorming, writing-plans, transcribe-audio, executing-plans, subagent-driven-development, notebooklm, google-workspace, dev-browser, excalidraw-diagram, code-review, verification-before-completion, finishing-a-development-branch, using-git-worktrees, systematic-debugging, test-driven-development, writing-skills, skill-creator

**Instalação/gestão (6):** adicionar-pack, atualizar-kodai, instalar, listar-disponiveis, remover-pack, trocar-perfil

Convivem lado-a-lado com as ~20 skills técnicas do SCHOLZE-STACK (accessibility-axe, conventional-commits, etc.). Total atual em `.claude/skills/` da pasta-mãe: 53.

### Hook SessionStart adicionado em `.claude/settings.json` (2026-05-18)

Dispara `/abrir` automaticamente no início de cada sessão (Sessão Zero v0.2.1). Hooks PreToolUse (block-dangerous.py) e PostToolUse (log-metrics.py) do SCHOLZE-STACK preservados.

---

## Contextos-domínio ativos

> **OBSOLETO desde v0.2.0** — KOD.AI não entrega mais domínio pré-pronto.
> Contexto específico de cliente/vertical é capturado sob demanda via
> `/capturar-contexto-cliente` → Google Doc + NotebookLM. Os STUBs antigos
> abaixo permanecem documentados só por histórico — não estão "ativos" no
> sentido operacional.

| Domínio | Status | Path no KOD.AI |
|---|---|---|
| contabilidade-br | STUB legado | `KODAI/3-CONTEXTOS-DOMINIO/contabilidade-br/` |
| dojos-artes-marciais | STUB legado | `KODAI/3-CONTEXTOS-DOMINIO/dojos-artes-marciais/` |

---

## Packs ativos

Nenhum pack populado ainda — todos STUB. Ver roadmap em `KODAI/docs/PLANNING.md`.

---

## Fonte do KOD.AI nesta máquina

```
C:\Users\usuario\Documents\Projetos Dev Pessoais\KODAI\
```
(raiz da pasta-mãe — regra: clone do KOD.AI fica na raiz quando a pasta tem múltiplos repos)

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
cd KODAI
git pull origin main
```

Depois, na sessão Claude Code desta pasta:
```
/atualizar-kodai
```
