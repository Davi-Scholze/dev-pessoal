---
name: atualizar
description: >
  Varre o projeto e atualiza arquivos de contexto (`_memoria/empresa.md`,
  `preferencias.md`, `estrategia.md`, `CLAUDE.md`, `_negocio/identidade/design-guide.md`)
  que ficaram desatualizados em relação ao estado real do workspace.
  Use sempre que o usuário disser "atualiza", "/atualizar", "varre o
  projeto", "reconcilia", "estamos com tudo certo?", "minha memória tá
  ok?", ou pedir reconciliação geral. Use também ao final de sessões
  longas pra capturar mudanças.
allowed-tools: [Read, Bash, Glob, AskUserQuestion, Write]
---

# /atualizar — Varredura e atualização de contexto

Compara o que está nos arquivos de contexto com o estado real do workspace e propõe atualizações.

## Workflow

### Passo 1 — Levantamento

Listar (em paralelo):
- Pastas na raiz (cada uma representa uma área de trabalho)
- Subpastas em `clientes/` (se existir) — cada uma é um cliente
- Skills em `.claude/skills/` — quais existem hoje
- Arquivos recentes (últimos 30 dias) em pastas como `propostas/`, `conteudo/`, `clientes/<x>/`
- Conteúdo de `KODAI-INSTALADO.md` (se existir) — saber qual perfil tá ativo

### Passo 2 — Comparação

Ler arquivos de contexto e identificar:

- **`_memoria/empresa.md`:** lista de clientes / serviços / ferramentas — bate com a realidade?
- **`_memoria/estrategia.md`:** o foco atual ainda faz sentido (datas, prioridades)?
- **`CLAUDE.md`:** as regras de organização e estrutura de pastas listada batem com o que existe?
- **`_negocio/identidade/design-guide.md`:** continua coerente com o que foi gerado nas últimas peças?
- **`KODAI-INSTALADO.md`:** packs ativos correspondem ao que tá sendo usado?

### Passo 3 — Proposta de mudanças

Apresentar lista curta:

```
Encontrei [N] coisas pra atualizar:

1. _memoria/empresa.md — falta o cliente "Acme" (vi pasta clientes/Acme/ criada em [data])
2. CLAUDE.md — tem regra "propostas vão em propostas/" mas vejo propostas em clientes/<x>/propostas/
3. _memoria/estrategia.md — fala em "fechar 1º cliente em fevereiro", já é abril e tem 3 clientes ativos
4. _negocio/identidade/design-guide.md — em branco; mas vi carrosséis com cor #C0392B usada — quer registrar?

Quer que eu aplique essas mudanças? Posso aplicar todas, escolher algumas, ou nenhuma.
```

### Passo 4 — Aplicação

Se usuário aprovar, editar arquivos com cirurgia — só a linha relevante, sem reformatar documento todo. Mostrar diff de cada mudança aplicada.

### Passo 5 — Detecção de contextos externos (sugestão proativa de `/absorver-contexto`)

> Adicionado em 2026-05-18 (Task 07 da spec `2026-05-18-absorcao-contexto-bidirecional`). Implementa D1=D (combinação standalone + sugestão proativa) + D2=B (auto-descoberta restrita).

#### 5.1 — Auto-descoberta restrita

Busca por pastas com nomes convencionais em **pasta-irmã direta** OU **subpasta direta** (D-extra-2=C: D-extra-1=A nomes específicos):

Path patterns reconhecidos:
- `_negocio/contextos/`
- `context/`
- `docs/`
- `knowledge/`

Onde buscar:
- Pasta-mãe (se este projeto está dentro de uma com múltiplos repos): `<pasta-mae>/<padrão>/`
- Subpastas diretas: `./<padrão>/`, `./repos/<repo>/<padrão>/`

NÃO buscar recursivamente em profundidade > 2 — reduz blast radius e evita pegar caches/builds.

#### 5.2 — Filtro de "vale sugerir"

Pra cada pasta encontrada:

1. Tem pelo menos 1 arquivo `.md`?
2. Os arquivos `.md` parecem contexto (não README de instalação, não código documentado)?
   - Heurística rápida: nome contém palavras como "princípio", "regra", "padrão", "decisão", "contexto", ou número-prefixo (`01-`, `02-`)
3. Cruza com manifests existentes em `3-CONTEXTOS-DOMINIO/`:
   - Se TODOS os arquivos da pasta já foram absorvidos (hash match em manifests) → não sugere
   - Se NENHUM foi absorvido → sugere completo
   - Se PARCIAL → sugere apenas itens não absorvidos

#### 5.3 — Anti-spam (frequência da sugestão)

Pra não virar ruído em runs frequentes (D-extra-3=B):

1. Lê `_memoria/.absorcao-history.yaml` (cria se não existir):
   ```yaml
   detections:
     - path: c:\Users\Usuario\Documents\Navortech-Desenvolvimento\contextos\kodai-contribuicoes
       last_detected: 2026-05-18T14:30:00-03:00
       user_response: deferred  # absorbed | deferred | declined
   ```
2. Se path tem `last_detected` com `user_response: deferred` há **≥ 7 dias**: re-sugere
3. Se path tem `user_response: declined` há **≥ 30 dias**: re-sugere (talvez Davi mudou de ideia)
4. Caso contrário: skip sem mostrar nada

#### 5.4 — Apresentação da sugestão

Quando há candidatos a sugerir, invoca `AskUserQuestion` (D-extra-4=B):

```
Pergunta: "Detectei material de contexto não absorvido em <path>. Quer absorver agora?"

Opções:
1. "Absorver agora (recomendado)" — dispara /absorver-contexto <path>
2. "Mais tarde (lembrar em 7 dias)"
3. "Ignorar essa pasta (não sugerir mais)"
4. "Ver detalhes antes de decidir" — mostra inventário antes de perguntar de novo
```

Registra resposta em `.absorcao-history.yaml`.

#### 5.5 — Aceite dispara `/absorver-contexto`

Se opção 1: invoca a skill irmã com o path detectado. Resto do fluxo é o da `/absorver-contexto` (PULL).

#### 5.6 — Recuso temporário registra timestamp

Se opção 2 ou 3: registra em `.absorcao-history.yaml` com `last_detected` e `user_response`. Skip nos próximos 7/30 dias conforme regra 5.3.

#### 5.7 — Skip se não há candidatos

Se 5.1-5.3 não detectam nada que vale sugerir: silêncio total. Não menciona no output do `/atualizar`.

## Regras

- **Não inventar fatos** — só registrar o que tem evidência no workspace
- Se evidência for ambígua (ex: pasta vazia chamada "Cliente Novo"), perguntar antes de adicionar
- **Não apagar conteúdo** dos arquivos de contexto — só atualizar e adicionar
- Se nenhuma mudança for necessária, responder: "Tá tudo coerente, nada pra atualizar."

## Diferença vs `/atualizar-kodai`

- `/atualizar` = atualiza MEMÓRIA do projeto consumidor (`_memoria/`, `CLAUDE.md`, `_negocio/identidade/`)
- `/atualizar-kodai` = atualiza o KOD.AI INSTALADO no projeto (compara com upstream, traz packs novos)

Não confundir.

## Falhas conhecidas

- **`_memoria/` não existe:** responder "Esta pasta tem KOD.AI instalado? Não vi `_memoria/`. Roda `/instalar` antes."
- **Workspace gigante (>1000 arquivos):** dividir varredura por pasta, perguntar quais escopos focar.
