# Skill: `/status-decisao`

> Skill universal pra marcar status semântico do ciclo de vida em decisões/features/conceitos.
> Status: **DRAFT** (criada 2026-05-21 sessão 4).

## Quick start

```
/status-decisao <item> <status>                          # marca item com status
/status-decisao <item> <status> --motivo "<texto>"       # adiciona motivo (recomendado)
/status-decisao --listar <status>                        # lista todos items com aquele status
/status-decisao --diff                                   # mudanças desde última execução
/status-decisao --grafo                                  # renderiza grafo Mermaid de transições
```

## 8 status canônicos

| Status | Definição |
|---|---|
| **rascunho** | Ideia inicial, não validada |
| **em-progresso** | Em implementação ativa |
| **bloqueado** | Dependência faltando ou aguardando decisão |
| **funcionando** | Implementado, testado, em uso |
| **refatorado** | Substituído por versão melhor |
| **parqueado** | Pausado deliberadamente (voltar depois) |
| **wontfix** | Decidido NÃO fazer (motivo registrado) |
| **descartado** | Tentado, não funcionou, removido |

## O que faz (4 fases)

1. **Identifica** item (path, slug, texto livre desambiguado) + valida status
2. **Localiza destinos canônicos** (manifest, ADR, PENDENCIAS, CHANGELOG, memory)
3. **Aplica status estruturado** (header YAML + status_historico preservado — nunca apaga histórico)
4. **Cross-ref + commit** (`chore(status): <item> X → Y (<motivo>)`)

## Por que existe

Davi descreveu necessidade na sessão 4 (2026-05-21): "em tempo real a IA possa ir espelhando tudo isso em contexto, de forma que a gente não perca contextos, saiba que 'esse descartamos', 'esse melhoramos', 'esse está funcionando'".

Operacionaliza o "saiba que" em tag semântica auditável que outras skills consomem.

## Anti-pollution

- **Histórico NUNCA apagado** — só adicionado (auditabilidade total)
- **Promoção FUNCIONAL exige evidência** registrada (commit, arquivo, métrica)
- **Transições não-triviais pedem confirmação** (ex: wontfix → em-progresso)
- **Status não-confirmado** ("acho que tá ok") NÃO vira FUNCIONAL

## Quando NÃO usar

- Mudança trivial entre estados consecutivos (idempotência)
- Conceito sem estrutura de manifest (texto livre puro)
- Status já consistente entre todos os arquivos

## Companion skills

Completa pacote de 4 skills da análise honesta sessão 4:
- `/pedir-contexto` — pede ativo material faltando
- `/proposta-cliente` — orquestra venda DFY/DWY/DIY
- `/espelhar` — reflete mudanças em arquivos vivos
- **`/status-decisao`** — marca status semântico (esta skill)

## Detalhes

Ver `SKILL.md` (workflow 4 fases + 8 status canônicos + matriz destinos + 3 casos de uso + modos `--listar`/`--diff`/`--grafo` + limitações honestas).
