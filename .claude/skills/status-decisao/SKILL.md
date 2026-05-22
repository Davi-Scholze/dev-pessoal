---
name: status-decisao
description: >
  Marca decisões/features/specs/conceitos com tag semântica de status do ciclo de vida —
  descartado / em-progresso / funcionando / refatorado / parqueado / wontfix — e mantém grafo
  de transição (quando mudou status + porquê). Aplica em ADRs (docs/decisoes/), PENDENCIAS.md,
  manifests de skills/contextos/packs, e conceitos. Use quando: operador disser "marca X como
  funcionando", "esse aqui descartamos", "/status-decisao", "esse plano foi refatorado",
  "esse pack parqueamos"; ao final de spec aprovada ou rejeitada; após validação de evidence
  bloc; ao desativar feature do MVP. Sai do modo "status implícito em prosa" — entra no modo
  "tag semântica auditável que outras skills consomem".
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

# Skill: `/status-decisao`

Marca status semântico do ciclo de vida em decisões/features/conceitos do projeto.

## Quando disparar

**Triggers explícitos:**
- `/status-decisao <item> <status>`
- "Marca <X> como funcionando"
- "Esse <Y> descartamos"
- "Esse plano foi refatorado"
- "Esse pack parqueamos"
- "Esse status mudou pra <X>"

**Triggers contextuais (auto-disparo proposto):**
- Operador disse "agora funciona" / "tá rodando" sobre feature específica
- Operador disse "não vamos fazer X" sobre item antes em PENDENCIAS
- Spec criada/rejeitada via `/spec` (status inicial automático)
- Evidence Bloc validado em manifest de skill/contexto/pack (auto-promove FUNCIONAL)
- Pendência marcada com ✅ em PENDENCIAS.md (auto-marca status: funcionando)

**NÃO disparar quando:**
- Status já está consistente entre arquivos (idempotência)
- Mudança implícita não-confirmada (operador disse "acho que tá ok" — não é confirmação)
- Skill ativa está no meio de execução de outra coisa (espera fechar)

## Status canônicos (controlled vocabulary)

| Status | Definição | Cor visual (futuro) | Usado por |
|---|---|---|---|
| **rascunho** | Ideia inicial, não validada | cinza | Spec recém-criada, conceito inicial |
| **em-progresso** | Em implementação ativa | amarelo | Feature sendo construída |
| **bloqueado** | Dep faltando ou aguardando decisão | laranja | Spec aguardando aprovação humana |
| **funcionando** | Implementado, testado, em uso | verde | Feature ativa, skill FUNCIONAL |
| **refatorado** | Implementação substituída por versão melhor | azul | Skill v2 que substitui v1 |
| **parqueado** | Pausado deliberadamente (não descartado, voltar depois) | roxo | Frente que perdeu prioridade temporariamente |
| **wontfix** | Decidido NÃO fazer (motivo registrado) | preto | Feature avaliada e rejeitada |
| **descartado** | Tentado, não funcionou, removido | vermelho | Experimento que falhou |

Status sempre vem acompanhado de **timestamp** + **motivo** + **decidido_por** (operador, IA, hook automático).

## Pré-requisitos

- Item a marcar status precisa existir (arquivo, entrada em PENDENCIAS, seção em manifest)
- Operador autenticado pra mudanças destrutivas (descartado, wontfix) — extras quando wontfix exige justificativa

## Argumentos

```
/status-decisao <item> <status>                    → marca item com status
/status-decisao <item> <status> --motivo "<texto>" → adiciona motivo (recomendado)
/status-decisao <item> <status> --decidido-por <quem> → registra origem da decisão
/status-decisao --listar <status>                  → lista todos items com aquele status
/status-decisao --diff                              → mostra mudanças desde última execução
/status-decisao --grafo                             → renderiza grafo de transições (Mermaid)
```

## Workflow (4 fases)

### Fase 1 — Identificar item e validar status

1. **Parsear `<item>`:**
   - Path absoluto OU relativo do arquivo (ex: `docs/decisoes/2026-05-15-spec-X.md`)
   - Slug de pendência (ex: `K15` da PENDENCIAS.md)
   - Slug de skill/contexto/pack (ex: `mapear-concorrente`, `gestao-academia-esportiva-br`)
   - Texto livre que precisa ser desambiguado via `AskUserQuestion`

2. **Validar `<status>`:**
   - Deve ser um dos 8 canônicos (rascunho, em-progresso, bloqueado, funcionando, refatorado, parqueado, wontfix, descartado)
   - Se outro valor → recusa + lista canônicos
   - Verificar transição válida (ex: rascunho → em-progresso OK; descartado → funcionando NOK — exige justificativa explícita)

3. **Verificar idempotência:**
   - Item já está nesse status? → sem-op (não duplica)
   - Se mudança trivial (apenas refrescar timestamp), confirmar com operador

### Fase 2 — Localizar destinos canônicos

Pra cada item, o status precisa ser propagado pra TODOS os lugares que referenciam:

| Tipo de item | Destinos canônicos |
|---|---|
| **Spec/ADR** (`docs/decisoes/<arquivo>.md`) | Header YAML do arquivo + PENDENCIAS.md se há entry + memory persistente se decisão estratégica |
| **Pendência** (entry em PENDENCIAS.md) | Linha da tabela (marca ✅ + adiciona tag `status: X`) + ADR que originou (se houver) |
| **Skill** (`KODAI/1-ESQUELETO/skills-universais/<nome>/manifest.yaml`) | Campo `status:` do manifest + CHANGELOG.md da skill + (se mudança crítica) memory `project_kodai.md` |
| **Contexto-domínio** (`KODAI/3-CONTEXTOS-DOMINIO/<nome>/manifest.yaml`) | Campo `status:` do manifest + CHANGELOG.md do contexto + KODAI-INSTALADO.md do consumidor |
| **Pack** (`KODAI/2-PACKS/packs/<categoria>/<nome>/manifest.yaml`) | Campo `status:` do manifest + CHANGELOG.md do pack |
| **Conceito de competitive-intelligence** | Header do `.md` + manifest do contexto pai |
| **Feature do produto-âncora** | Conceito que descreve a feature + PENDENCIAS.md do projeto consumidor |

### Fase 3 — Aplicar status estruturado

Em cada destino, adicionar/atualizar **header YAML** ou **bloco status**:

```yaml
status: funcionando
status_historico:
  - status: rascunho
    desde: 2026-05-15
    decidido_por: operador
    motivo: "Ideia inicial pós-brainstorming"
  - status: em-progresso
    desde: 2026-05-18
    decidido_por: operador
    motivo: "Aprovado escopo, implementacao iniciada"
  - status: funcionando
    desde: 2026-05-21
    decidido_por: operador
    motivo: "Evidence Bloc validado, em uso no piloto X"
    evidencia: "commit <sha> + arquivo Y"
```

**Princípio:** histórico NUNCA é apagado — só adicionado. Pra reverter, criar nova entry com status anterior + motivo da reversão.

### Fase 4 — Cross-ref + commit

1. **Atualizar referências externas** que dependem do status:
   - Se skill virou FUNCIONAL → atualizar PROMPT_MASTER_HANDOFF.md do projeto consumidor (cruza com `/espelhar`)
   - Se pendência virou wontfix → mover pra seção "Descartados" na PENDENCIAS.md (preservar histórico)
   - Se contexto virou refatorado → criar entry de redirect (ex: "este contexto foi substituído por X em data Y")

2. **Commit** com mensagem padrão:
   ```
   chore(status): <item> <status-anterior> -> <status-novo> (<motivo curto>)
   ```

3. **Push** (se autorizado + não bloqueado por C1/segurança).

4. **Reporte conciso** (≤6 linhas):
   - Item + transição (anterior → novo)
   - Destinos atualizados (count)
   - Próximos consumidores afetados (skills que dependem do item)

## Modo `--listar <status>`

Glob por todos manifests + frontmatters + PENDENCIAS pra encontrar items com status específico:

```
$ /status-decisao --listar funcionando

✅ 12 itens com status "funcionando":

Skills (8):
- abrir (v0.5)
- absorver-contexto (v0.4)
- mapear-concorrente (v0.2.0 — promovido 2026-05-21)
- ...

Contextos-domínio (1):
- sistemas-empresariais-br (DRAFT)

Conceitos (2):
- kelvin-cleto-vs-kodai
- facedojo-vs-meudojo

Pendências resolvidas (1):
- K12 (anti-pollution fixtures)
```

## Modo `--grafo`

Renderiza grafo de transições em Mermaid (consumível por `/excalidraw-diagram`):

```mermaid
stateDiagram-v2
    [*] --> rascunho
    rascunho --> em-progresso
    em-progresso --> bloqueado
    bloqueado --> em-progresso
    em-progresso --> funcionando
    funcionando --> refatorado
    funcionando --> parqueado
    parqueado --> em-progresso
    rascunho --> wontfix
    em-progresso --> descartado
    refatorado --> [*]
    wontfix --> [*]
    descartado --> [*]
```

## Casos de uso comuns

### Caso 1: Promover skill DRAFT → FUNCIONAL

```
$ /status-decisao mapear-concorrente funcionando --motivo "2 execucoes end-to-end validadas (FaceDojo + Next Fit) + anti-pollution PASS + commits pushed"

✅ mapear-concorrente: DRAFT → FUNCIONAL
Destinos atualizados (3):
- KODAI/1-ESQUELETO/skills-universais/mapear-concorrente/manifest.yaml (status + status_historico)
- KODAI/.../skills-universais/mapear-concorrente/README.md (badge atualizado)
- ~/.claude/projects/<slug>/memory/project_kodai.md (lista de FUNCIONAIS atualizada)

Próximos consumidores afetados:
- /proposta-cliente (depende de mapear-concorrente — agora pode marcar como dependência FUNCIONAL)
```

### Caso 2: Marcar feature do MeuDojo como wontfix

```
$ /status-decisao meudojo:treinos-com-ia wontfix --motivo "decisão sessão 4: nao combina com filosofia artes marciais tradicional"

✅ meudojo:treinos-com-ia: rascunho → wontfix
Destinos atualizados (2):
- Repositorios/dojo-familia-scholze/contextos/modelo-de-venda-2026-05-21.md (catálogo de módulos: marcado wontfix)
- KODAI/3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/conceitos/features-diferenciadoras-saas-vertical-esportivo.md (matriz: marcado wontfix)

Motivo registrado em status_historico pra auditoria futura.
```

### Caso 3: Reverter wontfix → em-progresso (raro, requer justificativa)

```
$ /status-decisao meudojo:treinos-com-ia em-progresso --motivo "feedback de cliente real: instrutor 30+ anos quer IA pra sugerir progressão técnica adaptada"

⚠ Transição não-trivial: wontfix → em-progresso
Confirma? (sim/nao/edita-motivo)
```

## Política irmã + skills relacionadas

- `1-ESQUELETO/politicas/honestidade-em-claims.md` — base (status não-confirmado não vira "funcionando")
- `1-ESQUELETO/skills-universais/espelhar` — consumidor frequente (auto-detecta mudanças de status e reflete)
- `1-ESQUELETO/skills-universais/check-in` — consome (reporta status atual)
- `1-ESQUELETO/skills-universais/abrir` — consome (Sessão Zero usa status pra priorizar)
- `1-ESQUELETO/skills-universais/atualizar` — consome (atualização geral reconcilia status)
- `1-ESQUELETO/skills-universais/pedir-contexto` — irmã (skill ativa)
- `1-ESQUELETO/skills-universais/proposta-cliente` — consumidor (proposta usa status FUNCIONAL pra credibilidade)

## Limitações honestas

- **Não detecta status automaticamente em código:** se feature foi removida do código mas ninguém rodou `/status-decisao`, manifest fica desatualizado — depende de operador OU hook futuro
- **Histórico cresce linear:** após muitas transições, `status_historico` fica longo; futuro pode comprimir
- **Não impede transições "estranhas":** wontfix → em-progresso é permitido com justificativa, mas operador pode burlar (responsabilidade humana)
- **Cross-ref é manual em alguns casos:** se documentação referencia "skill X está em DRAFT" em texto livre, não detecta — usa Edit manual
- **Validação de evidence:** marca FUNCIONAL exige evidência registrada (commit, arquivo, métrica) — se faltar, recusa promoção

## Critérios de PASS

1. Status válido aplicado (1 dos 8 canônicos)
2. Status histórico preservado (entries antigas não apagadas, novas adicionadas)
3. Destinos canônicos atualizados (manifest + CHANGELOG + cross-refs)
4. Commit + push com mensagem padrão (`chore(status): ...`)
5. Reporte conciso (≤6 linhas)
6. Idempotência: rodar 2x não duplica entries de status_historico

## Por que esta skill existe

Estabelecida em 2026-05-21 sessão 4 após análise honesta KOD.AI vs fluxo desejado identificar gap: **rastreamento semântico de decisão**. Sem skill estruturada, status fica implícito em prosa de PENDENCIAS ou commits — outras skills não conseguem consumir.

Operador (Davi) descreveu: "em tempo real a IA possa ir espelhando tudo isso em contexto, de forma que a gente não perca contextos, saiba que 'esse descartamos', 'esse melhoramos', 'esse está funcionando'".

`/status-decisao` operacionaliza o "saiba que" em tag semântica auditável. Combina com `/espelhar` (que reflete mudanças) e `/pedir-contexto` (que pede o que falta) — completam o pacote de 4 skills da análise honesta.
