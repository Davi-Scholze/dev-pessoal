---
name: capturar
description: >
  Cria arquivo em inbox-<stakeholder>/<data>-<tema>.md a partir de input
  do usuário. Use sempre que o usuário disser "captura isso", "anota
  isso", "salva o que o cliente falou", "registra essa conversa", "/capturar",
  ou colar transcript/áudio/print de stakeholder. Auto-disparo opcional
  quando detectar que usuário tá colando algo que parece input externo.
allowed-tools: [Read, Write, Bash]
---

# /capturar <stakeholder> <tema> — Captura de stakeholder

Cria arquivo de inbox imediatamente, mesmo que seja dump bruto. Refina depois.

## Workflow

### Passo 1: Parsear argumentos

- Se `<stakeholder>` e `<tema>` foram passados: usar
- Se faltar `<stakeholder>`: perguntar "De quem veio? (davi, pablo, cliente, contadora, ...)"
- Se faltar `<tema>`: perguntar "Sobre o quê em uma palavra-chave?" (ex: "feedback-cadastro")

### Passo 2: Detectar destino

Procurar `_negocio/contextos/empresa/<empresa>/inbox-<stakeholder>/`.

Se não existir:
- Detectar empresa pelo `_memoria/empresa.md` (nome do negócio)
- Criar pasta: `_negocio/contextos/empresa/<empresa>/inbox-<stakeholder>/`

Se for projeto-solo sem `_negocio/contextos/empresa/`:
- Criar simplesmente `inbox-<stakeholder>/` na raiz

### Passo 3: Gerar nome de arquivo

Formato: `<YYYY-MM-DD>-<tema-kebab-case>.md`

Se já existir arquivo com mesmo nome (mesmo dia/tema), adicionar sufixo: `-2`, `-3`, etc.

### Passo 4: Conteúdo inicial

Frontmatter:
```yaml
---
data: <YYYY-MM-DD>
stakeholder: <nome>
origem: <conversa|audio|print|texto|outro>
status: bruto
---

# <Tema>

## Transcrição/conteúdo bruto

<conteúdo colado pelo usuário, mesmo que mal organizado>

## Itens acionáveis (extraídos)

- [ ] (a destilar)

## Decisões implícitas

(a destilar)

## Pendências

(a destilar)
```

### Passo 5: Confirmar

Responder:
> "Capturado em `_negocio/contextos/empresa/<empresa>/inbox-<stakeholder>/<data>-<tema>.md`. Quer que eu destile os itens acionáveis agora ou deixa pra depois?"

## Regras

- **Captura imediata** — não filtra, não pergunta detalhe antes
- **Bruto é sagrado** — não corrige typos do input
- **Atomicidade** — 1 arquivo por captura, não tenta consolidar
- Se input tem múltiplos temas distintos, perguntar se quer separar em arquivos distintos
