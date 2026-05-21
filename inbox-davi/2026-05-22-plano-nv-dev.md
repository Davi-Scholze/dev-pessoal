---
tipo: checklist-execucao
data: 2026-05-22 (amanha)
operador: davi-scholze (na maquina Navortech)
duracao_estimada: 85-100min
status: aprovado-pra-execucao
related:
  - "../KODAI/docs/decisoes/2026-05-21_navortech-auditoria-bidirecional-pre-instalacao.md"
---

# Checklist Executável — Auditoria NV-Dev (2026-05-22)

> Plano operacional amanhã na máquina Navortech. Copia este checklist + segue passo-a-passo.

## Antes de começar (3min)

- [ ] Café/água
- [ ] Bloco de 90-100min livre na agenda
- [ ] Máquina Navortech ligada
- [ ] Pasta-mãe Navortech identificada (path absoluto)
- [ ] Saber a versão Python instalada lá (precisa ≥3.10)

## Fase 0 — Pré-flight (5min)

```bash
cd "<pasta-mãe-navortech>"
ls KODAI                    # KOD.AI clonado?
ls .claude/skills/          # skills propagadas?
git -C KODAI status         # working tree limpo no KOD.AI?
git -C KODAI log --oneline -5
git config user.email       # identidade Navortech
```

**Se KOD.AI não tem clone na pasta-mãe Navortech ainda:** essa máquina nunca foi setup. Parar e perguntar Davi se quer começar com clone novo (pular pra Fase 1 com clone) OU mudar de máquina.

## Fase 1 — Atualizar KOD.AI upstream (5min)

```bash
cd "<pasta-mãe-navortech>/KODAI"
git pull --ff-only origin main
```

**Espera-se baixar:** ~10-15 commits da sessão 2026-05-21 (lineage, STRATEGIC-NORTH v1.2, packs novos, patches absorver-midia, specs aprovadas).

**Checagem:**
```bash
cat docs/STRATEGIC-NORTH.md | head -10
# Confirma "Versão: 1.2" no header
```

## Fase 2 — Sessão Claude Code apontada pra Navortech (5min setup)

Abrir Claude Code na pasta-mãe Navortech (NÃO no KODAI/).

```
Sessão Zero auto-disparada (/abrir via hook)
```

Reportar canônico. Se memória parcial/vazia ou skills <10:
```
/atualizar-kodai
```

**Modo total recomendado** — propaga skills + rules + hooks novos do upstream.

## Fase 3 — Auditoria propriamente dita (60-75min)

```
/auditar-projeto
```

**Modo default = `--dry-run`** (não instala, não absorve, só ANALISA + gera relatório).

Skill vai executar 8 fases. Durante cada uma:

- **Fase 1 (Pré-flight):** skill confirma identidade git Navortech, working tree limpo, permissão de leitura
- **Fase 2 (Inventário):** lista tudo de `.claude/`, `_memoria/`, scripts custom da Navortech
- **Fase 3 (Classificação 3 eixos):** Grounding / Orchestration / Meta
- **Fase 4 (Cross-ref):** cada item vai em 1 de 4 buckets (equivalente / complementar / novo universal / ideia melhor)
- **Fase 5 (Plano humano-aprovado):** **AQUI VOCÊ DECIDE.** Skill mostra plano completo, você aprova ou rejeita item-a-item
- **Fase 6 (Execução):** **PULAR.** Não rode `--execute` neste piloto.
- **Fase 7 (Quarentena):** não se aplica em dry-run
- **Fase 8 (Upstream-pitch):** pula (depende de Fase 6)

**Resultado:** arquivo `KODAI/mapeamento/2026-05-22-navortech-aprendizados-pra-kodai.md`

## Fase 4 — Revisar o doc gerado (10-15min)

Abrir o doc. Confirmar:

- [ ] Inventário NV-Dev completo
- [ ] Cada item classificado em 1 dos 4 buckets
- [ ] Sessão "Novo universal" tem ≥3 candidatos reais
- [ ] Sessão "Ideia melhor" tem ≥2 candidatos reais
- [ ] Zero marca "Navortech" / credencial / PII no doc
- [ ] Lista de bloqueadores pra instalação futura (Fase 4 do plano)

**Se algo errado:** anota no próprio doc + commit. Eu revejo depois.

## Fase 5 — Commit + push (5min)

```bash
cd "<pasta-mãe-navortech>/KODAI"
git add mapeamento/2026-05-22-navortech-aprendizados-pra-kodai.md
git commit -m "feat(mapeamento): auditoria NV-Dev 2026-05-22 — aprendizados pra KOD.AI"
git push origin main
```

**Identidade git checada antes:** `git config user.email` deve ser `davi.scholze28@gmail.com` (NÃO `*@navortech.com.br`). Se for navortech, AJUSTAR antes de push:

```bash
git config user.email "davi.scholze28@gmail.com"
git config user.name "Davi Scholze"
# Confirmar:
git config user.email
```

(memória `feedback_git_identity_pasta_mae.md` cobre isso — incidente 2026-05-21)

## Fase 6 — Reportar de volta (texto curto)

Mandar mensagem ao Davi (você mesmo, em outra máquina) tipo:

> "Auditoria NV-Dev rodou em Xmin. Doc gerado: KODAI/mapeamento/2026-05-22-...
> Pushed em <SHA>. Resumo:
> - N items em Novo universal
> - M items em Ideia melhor
> - K bloqueadores pra instalação (se houver)
> - Aprendizado destaque: <1 frase>
> "

## Se algo der errado (troubleshooting)

| Erro | Solução |
|---|---|
| `/atualizar-kodai` falha com conflict | Backup `.claude/` + re-clone KODAI/ + repropagar |
| `/auditar-projeto` trava na Fase 3 | Pausar; Ctrl+C; retomar com escopo restrito (`--path <subdir>`) |
| Identidade git pushou em conta errada | `git reset --soft HEAD~1` + ajustar config + recommit |
| ffmpeg não instalado na máquina NV (se /auditar-projeto chamar /absorver-midia) | `winget install Gyan.FFmpeg` (deps no `KODAI/.claude/skills/transcribe-audio/scripts/install.md`) |
| Skill `/auditar-projeto` retorna erro de implementação | É piloto — pode ter bug. Capturar log + reportar; tentar fase-a-fase manual com prompts diretos |

## NÃO fazer amanhã

- ❌ `/auditar-projeto --execute` (modo opt-in que ABSORVE — pula no piloto)
- ❌ `/instalar` KOD.AI na pasta-mãe Navortech (decisão E4: só depois de validar tudo)
- ❌ Commit em conta errada (verificar identidade!)
- ❌ Push de arquivo com credencial NV (anti-pollution checks devem pegar, mas sempre revisar)
- ❌ Modificar `.claude/` ou `_memoria/` da Navortech sem necessidade

## Tempo total estimado: 85-100min

Se passar de 120min, parar e remarcar pra outra sessão.

## O que destrava se rodar OK

1. **K4** (piloto NV-Dev) — pendência P0 fechada
2. **K17/K18** (Specs 2 e 3) ganham dados reais pra refinar
3. **STRATEGIC-NORTH critérios E4** — 1 dos 3 critérios atendido (auditoria bidirecional executada)
4. **Aprendizado** — material concreto pra evoluir KOD.AI antes de instalar Navortech
