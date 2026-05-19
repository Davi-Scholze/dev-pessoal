---
name: abrir
description: >
  Sessão Zero — comando único de abertura de sessão. Faz health check
  silencioso, carrega memória do negócio (empresa, preferências,
  estratégia, identidade visual), lê handoff da última sessão e devolve
  reporte canônico em 5-7 linhas. Disparado automaticamente em toda
  sessão nova via hook `SessionStart` configurado em
  `.claude/settings.json`. Use sempre que o usuário disser "abrir",
  "começar o dia", "começar a trabalhar", "vamos lá", "/abrir", ou no
  primeiro turno de uma sessão (auto via hook). Use também quando
  detectar que estamos numa pasta com `_memoria/` e contexto está
  desfocado — mesmo se o usuário não pedir explicitamente "abrir".
allowed-tools: [Read, Glob, Bash]
---

# /abrir — Sessão Zero

Comando único de abertura. Cobre tudo que era partido entre `/abrir` (memória) e `/check-in` (estado).
Disparado automaticamente em toda sessão nova via hook `SessionStart`.

## Workflow

### Passo 1: Health check (silencioso quando passa)

Verificar em paralelo, sem reportar se tudo OK:

1. **KOD.AI instalado?** — existe `KODAI-INSTALADO.md` na raiz, OU `_memoria/empresa.md`. Se ambos faltarem → pular para "Pasta sem KOD.AI" no fim deste documento.
2. **Skills propagadas?** — `.claude/skills/` tem ≥ 10 entradas (sinal de Fase 4.8 do `/instalar` ter rodado).
3. **MCPs presentes?** — heurística passiva: listar tools `mcp__*` disponíveis no contexto da sessão. Sem chamada real; só presença de tool indica MCP configurado.
4. **Memória legível?** — `_memoria/empresa.md`, `preferencias.md`, `estrategia.md` abrem sem erro.

**Reporte:**
- Se tudo OK: 1 linha "Sistema OK · N skills · M MCPs" (N = total real em `.claude/skills/`, M = total real de `mcp__*` presentes).
- Se algo falhar: 1 linha "Sistema ⚠ <N>" + 1 linha por falha com sugestão (`Skills < 10 → rode /atualizar-kodai`, `Memória ilegível → rode /atualizar`).

### Passo 2: Classificar memória (completa | parcial | vazia)

Ler `_memoria/empresa.md`, `_memoria/preferencias.md`, `_memoria/estrategia.md` e classificar:

- **vazia:** algum campo crítico (nome, o-que-faz, tom de voz, foco) ainda tem `{{...}}` (placeholder Mustache não substituído). Sinal de instalação incompleta.
- **parcial:** sem `{{...}}`, mas há `_(a definir)_` em campos críticos (placeholder honesto — usuário pode estar em modo dogfooding ou entrevista pulada).
- **completa:** nenhum `{{...}}` nem `_(a definir)_` em campos críticos.

**Ação:**
- **vazia** → bloquear com mensagem:
  > "`_memoria/<arquivo>.md` ainda tem placeholders `{{...}}` — instalação incompleta. Quer rodar `/instalar` agora pra terminar?"
  E parar.
- **parcial** → seguir para Passo 3, mas reportar a parcialidade no Passo 5 (não fingir calibração).
- **completa** → seguir para Passo 3.

### Passo 3: Ler handoff e pendências

Ler em ordem, pegar só os campos relevantes (não ler arquivos inteiros se grandes):

- `_negocio/PROMPT_MASTER_HANDOFF.md` → seção "Próxima ação" (1ª linha) + seção "Bloqueios" (1ª linha).
- `_negocio/PENDENCIAS.md` → cabeça da fila (1-2 itens P0/P1).
- `docs/SESSAO_BACKUP.md` (só em projeto-solo) → última task.

Se nenhum desses existir, registrar handoff como "primeira sessão / nenhum estado anterior".

### Passo 4: Identidade visual (passivo)

Confirmar se `_negocio/identidade/design-guide.md` está preenchido (sem `_(a definir)_` em cores/fontes principais). **Não mencionar no reporte** se está vazio — só vira problema quando uma skill visual for chamada. Guardar mentalmente para essa hora.

### Passo 5: Síntese canônica (5-7 linhas)

Formato:

```
✓ Sistema OK · <N> skills · <M> MCPs
[Nome do negócio] — [o que faz em 5-8 palavras]
Foco atual: [prioridade da estratégia, em uma frase]
Tom: [resumo 3-4 palavras OU "a definir" se parcial]

Última sessão: [próxima ação do handoff, 1 linha]  ← omite se primeira sessão
Próximo: [pendência cabeça-da-fila OU "definir primeiro trabalho concreto"]

O que vamos fazer?
```

**Variações por estado:**
- **Health check falhou:** linha 1 vira `Sistema ⚠ <N issues>` e segue 1-2 linhas com a falha; reporte canônico continua depois.
- **Memória parcial:** mostrar `Tom: a definir` (transparente). Adicionar linha extra antes do "O que vamos fazer?":
  > "Tom não capturado. Quer me colar 1-2 exemplos da sua escrita real pra eu calibrar?"
- **Memória completa, sem handoff:** omitir linha "Última sessão"; "Próximo" vira "definir primeiro trabalho concreto".

### Passo 6: Não fazer

- Não listar quais arquivos foram lidos
- Não confirmar leitura
- Não fazer outras perguntas além das do Passo 5
- Se `_negocio/identidade/design-guide.md` estiver em branco, não mencionar (vira problema só em skill visual)
- Não repetir o reporte se a sessão já fez Sessão Zero (heurística: se a primeira mensagem desta sessão já foi um reporte canônico, não duplicar)

## Regras

- Resposta cabe em 5-7 linhas no terminal
- Sem emoji nas linhas de conteúdo (a não ser que tom de voz indique uso); ícones ✓/⚠ permitidos no health check
- Tom calibrado pelas preferências carregadas
- Honestidade: nunca fingir calibração que não existe; "a definir" é resposta válida

## Pasta sem KOD.AI

Se Passo 1 detectar pasta sem `KODAI-INSTALADO.md` E sem `_memoria/`:

> "📍 Não detectei KOD.AI nesta pasta. Roda `/instalar` se for primeira vez."

E parar. Não tentar adivinhar contexto.

## Falhas conhecidas

- **YAML frontmatter quebrado** em `_memoria/*.md`: reportar arquivo + linha + oferecer `/atualizar` pra reconciliar.
- **`_negocio/PROMPT_MASTER_HANDOFF.md` ausente** em projeto que não é template-pasta-mãe: tratar como "sem handoff anterior" — não erro.
- **`.claude/skills/` com < 10 entradas:** sinal de propagação incompleta. Sugerir `/atualizar-kodai`.

## Relação com `/check-in`

- `/abrir` (este skill) = Sessão Zero completa, disparada automaticamente uma vez por sessão.
- `/check-in` = comando manual de "status agora" — reporta spec/bloqueios/comandos sem releitura completa de memória.
