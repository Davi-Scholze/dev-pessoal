# Multi-Conta Claude Code — Como Configurar
> Última atualização: 2026-05-13
> Fonte: pesquisa em docs.anthropic.com, GitHub issues, comunidade

---

## Conceito

Claude Code não tem suporte nativo a múltiplos perfis. O workaround oficial é a variável `CLAUDE_CONFIG_DIR` — ela aponta para uma pasta diferente com login, histórico e MCPs completamente isolados.

---

## Setup (Windows PowerShell)

### Passo 1 — Criar funções no PowerShell Profile

Abra o profile:
```powershell
notepad $PROFILE
```

Adicione as funções (substitua os nomes conforme suas contas):
```powershell
function claude-davi     { $env:CLAUDE_CONFIG_DIR = "$HOME\.claude-davi";     & claude @args }
function claude-denize   { $env:CLAUDE_CONFIG_DIR = "$HOME\.claude-denize";   & claude @args }
function claude-cristiano { $env:CLAUDE_CONFIG_DIR = "$HOME\.claude-cristiano"; & claude @args }
```

Recarregue o profile:
```powershell
. $PROFILE
```

### Passo 2 — Primeiro login de cada conta

Cada conta precisa ser autenticada uma vez:

```powershell
# Terminal 1
claude-denize
# → abre browser → login com conta da Denize → autenticado

# Terminal 2
claude-cristiano
# → abre browser → login com conta do Cristiano → autenticado
```

A partir daí, cada função já tem o login salvo na pasta correspondente.

### Passo 3 — Uso diário (duas sessões simultâneas)

Abra duas abas no terminal (ou dois terminais integrados no VS Code):

```powershell
# Aba 1 — Decon (conta Denize)
claude-denize

# Aba 2 — Dojô (conta Cristiano)
claude-cristiano
```

---

## Abrir VS Code já com a conta certa

Para que o VS Code herde a variável, abra-o **pelo terminal**:

```powershell
# Janela VS Code para Decon (conta Denize)
$env:CLAUDE_CONFIG_DIR = "$HOME\.claude-denize"
code "C:\Users\usuario\Documents\Projetos Dev Pessoais\Repositorios\decon-sistema"

# Janela VS Code para Dojô (conta Cristiano)
$env:CLAUDE_CONFIG_DIR = "$HOME\.claude-cristiano"
code "C:\Users\usuario\Documents\Projetos Dev Pessoais\Repositorios\dojo-familia-scholze"
```

---

## Plano operacional (Davi, Denize, Cristiano)

| Janela VS Code | Conta Claude | Pasta | Projeto |
|----------------|-------------|-------|---------|
| Janela 1 | Denize (`claude-denize`) | `decon-sistema/` | Site + sistema contábil |
| Janela 2 | Cristiano (`claude-cristiano`) | `dojo-familia-scholze/` | App mobile artes marciais |

> A pasta raiz `Projetos Dev Pessoais/` com o CLAUDE.md global é lida pelas duas janelas — os projetos compartilham as mesmas regras e contextos.

---

## Requisitos importantes

- Cada conta precisa de um **email diferente** na Anthropic
- Plano mínimo: **Pro, Max, Team ou Enterprise** — conta free não funciona com Claude Code
- MCPs são configurados **por conta** — se precisar dos mesmos MCPs nas duas, configurar nas duas pastas

---

## Limitações

| Limitação | Impacto |
|-----------|---------|
| Extension VS Code não suporta MCPs | MCPs só funcionam pelo terminal CLI |
| Sem profile switcher nativo | Precisa das funções PowerShell acima |
| MCP config é por conta | Configurar em cada pasta separadamente |
| CLAUDE.md de projeto é compartilhado | Por design — ambas as contas veem as mesmas regras do projeto |

---

## Ferramentas da comunidade (opcional)

- github.com/quinnjr/claude-code-profiles — wrapper para gerenciar perfis
- github.com/KMJ-007/0979814968722051620461ab2aa01bf2 — gist com setup completo

---

## Fontes

- docs.anthropic.com (setup avançado)
- joshcgrossman.com/2026/02/04/claude-two-accounts-windows/
- medium.com/@buwanekasumanasekara/setting-up-multiple-claude-code-accounts
- github.com/anthropics/claude-code/issues/44687 (feature request oficial)
