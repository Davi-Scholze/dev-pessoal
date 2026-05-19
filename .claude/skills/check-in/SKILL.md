---
name: check-in
description: >
  Reporta estado atual da sessão no formato canônico (spec ativa, status,
  bloqueios, comandos disponíveis). Comando MANUAL — Sessão Zero
  (`/abrir` via hook `SessionStart`) já cobre auto-disparo na primeira
  mensagem de cada sessão. Use sempre que o usuário disser "check-in",
  "/check-in", "estado atual", "onde estamos", "status", ou quando quiser
  ver estado a qualquer momento depois da abertura.
allowed-tools: [Read, Glob, Bash]
---

# /check-in — Reporte de estado de sessão (manual)

Curto, padronizado, sem enrolar. Versão manual do reporte canônico — `/abrir` faz isso automaticamente no início da sessão; `/check-in` permite consultar de novo a qualquer momento.

## Workflow

### Passo 1: Detectar spec ativa

Procurar:
- `docs/specs/` ou `_brainstorm/` — última spec criada/modificada
- `_negocio/PENDENCIAS.md` cabeça da fila (se existir)
- `_negocio/PROMPT_MASTER_HANDOFF.md` seção "Próxima ação" (se existir)
- `docs/SESSAO_BACKUP.md` última task (se existir — projeto-solo)

### Passo 2: Detectar status

Se há spec ativa: ler progresso (ex: "Task 5 de 12 concluída → ~42%").
Se não há: responder "nenhuma spec ativa".

### Passo 3: Detectar bloqueios

Procurar em:
- `_negocio/PROMPT_MASTER_HANDOFF.md` seção "Bloqueios"
- `_negocio/PENDENCIAS.md` linha com "Bloqueia? Sim"

Se nenhum: "nenhum".

### Passo 4: Listar comandos disponíveis (dinâmico)

Listar skills lendo o diretório real, sem hardcode:

```bash
# Unix
ls .claude/skills/ 2>/dev/null | sort

# PowerShell
Get-ChildItem .claude/skills -Directory | Select-Object -ExpandProperty Name | Sort-Object
```

Ou via Glob: `.claude/skills/*/SKILL.md` e extrair o nome da pasta-pai de cada match.

**Importante:** nunca hardcode lista de skills neste reporte. A skill instalada hoje é a verdade — drift entre lista hardcoded e realidade já causou confusão em sessões anteriores.

### Passo 5: Reporte canônico

Formato fixo (2-3 linhas):

```
📍 Spec ativa: <nome|nenhuma> | Status: <X%|—> | Bloqueios: <lista|nenhum>
🛠 Comandos: <lista dinâmica de skills detectadas, separadas por espaço, prefixadas com /, ordem alfabética>
```

Se há ≥ 6 skills de gerenciamento KOD.AI (`/instalar`, `/atualizar-kodai`, `/adicionar-pack`, `/remover-pack`, `/listar-disponiveis`, `/trocar-perfil`), separar em linha 3:
```
🔧 KOD.AI: /instalar /atualizar-kodai /adicionar-pack /remover-pack /listar-disponiveis /trocar-perfil
```

### Passo 6: Detectar se Sessão Zero rodou nesta sessão (opcional)

Se a primeira mensagem desta sessão não foi o reporte canônico do `/abrir`, sinalizar:

```
ℹ Sessão Zero não foi disparada no início desta sessão — o hook `SessionStart` pode ter falhado. Verifique `.claude/settings.json`.
```

(Só sinalizar se há sinal claro de falha; sem heurística confiável, omitir.)

## Regras

- Cabe em 2-3 linhas (4 com a sinalização opcional do passo 6)
- Sem prosa adicional
- Não pergunta nada — apenas reporta
- Lista de skills SEMPRE dinâmica
- Se executando em pasta SEM KOD.AI: reportar isso explicitamente:
  > "📍 Não detectei KOD.AI nesta pasta. Roda `/instalar` se for primeira vez."

## Relação com `/abrir`

- `/abrir` faz **Sessão Zero completa** (health check + memória + handoff + reporte canônico) — disparado por hook `SessionStart` na primeira mensagem de cada sessão.
- `/check-in` faz **só o reporte canônico** — comando manual de consulta rápida, sem releitura de memória.

Quando em dúvida, prefira `/abrir` (faz tudo). Use `/check-in` quando já está na sessão e quer reconfirmar estado.
