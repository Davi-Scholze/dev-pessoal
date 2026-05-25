---
name: kodai-status
description: >
  Reporta estado completo do KOD.AI nesta pasta: versão, onda atual (1/2/3),
  contagem de skills/rules/hooks ativos, pendências de instalação, drift do
  clone KODAI/. Skill DETERMINÍSTICA (sem dedução) — usa comandos reais
  (Test-Path, Get-ChildItem, git log) e cita números. Use quando o usuário
  disser "kodai status", "kodai doctor", "o que tá instalado do kodai",
  "/kodai-status", "ver estado kodai", "está tudo OK kodai", ou no troubleshoot.
allowed-tools: [Read, Bash, Glob]
---

# Skill: `/kodai-status` — Reporte de estado factual KOD.AI

> Operacionaliza o princípio **2Co 12:9-10** (fraqueza "sem visibilidade" → força "reporte factual em 1 comando") + **regra-base 11** (honestidade em claims).

## Princípio

KOD.AI instalado deve ser **visível**. Em qualquer momento, 1 skill reporta:
- Versão instalada vs upstream
- Onda atual (1/2/3 — qual completa, qual pendente)
- Contagem real de skills propagadas, rules path-scoped, hooks JS ativos
- Memórias preenchidas vs templates pendentes
- Drift do clone `KODAI/` (idade do último pull, commits novos no upstream)
- Próxima ação sugerida

**ZERO dedução.** Tudo medido via comando real (`Test-Path`, `Get-ChildItem`, `git log`).

## Quando disparar

- "/kodai-status"
- "kodai status" / "kodai doctor"
- "o que tá instalado do kodai?"
- "está tudo OK kodai?"
- "qual versão do kodai?"
- Após qualquer modificação em `.claude/skills/`, `.claude/rules/`, `.claude/hooks/`
- Antes de rodar `/atualizar-kodai` ou `/kodai-rollback` (estado pré-operação)
- Em troubleshoot de hook que não dispara

## Workflow 5 passos (deterministic checks)

### 1. Localizar workspace + KODAI clone

```powershell
# PowerShell
$workspace = (Get-Location).Path
$kodaiClone = Join-Path $workspace "KODAI"
$kodaiInstalado = Join-Path $workspace "KODAI-INSTALADO.md"

Write-Output "Workspace: $workspace"
Write-Output "KODAI clone presente: $(Test-Path $kodaiClone)"
Write-Output "KODAI-INSTALADO.md presente: $(Test-Path $kodaiInstalado)"
```

```bash
# Bash
WORKSPACE="$(pwd)"
[ -d "$WORKSPACE/KODAI" ] && echo "KODAI/: SIM" || echo "KODAI/: NAO"
[ -f "$WORKSPACE/KODAI-INSTALADO.md" ] && echo "KODAI-INSTALADO.md: SIM" || echo "KODAI-INSTALADO.md: NAO"
```

**3 estados possíveis:**
- KODAI/ ausente → pasta sem KOD.AI. Sugerir `iniciar kodai` se humano quiser instalar
- KODAI/ presente + KODAI-INSTALADO.md ausente → clone existe mas `/instalar` não rodou. Sugerir `iniciar kodai`
- Ambos presentes → seguir Passo 2

### 2. Versão do clone vs upstream

```powershell
$versionFile = Join-Path $kodaiClone "VERSION"
$localVersion = if (Test-Path $versionFile) { (Get-Content $versionFile).Trim() } else { "?" }

$localCommit = (git -C $kodaiClone log -1 --format="%h").Trim()
$lastPull = (git -C $kodaiClone log -1 --format="%cr").Trim()

git -C $kodaiClone fetch origin --quiet 2>$null
$behind = (git -C $kodaiClone rev-list --count HEAD..origin/main 2>$null)

Write-Output "Versao local: $localVersion ($localCommit)"
Write-Output "Ultimo pull: $lastPull"
Write-Output "Commits novos no upstream: $behind"
```

Bash equivalente: trocar `Test-Path` por `[ -f ... ]`, `Get-Content` por `cat`, manter `git -C` igual.

### 3. Onda de instalação

Ler `KODAI-INSTALADO.md` raiz pra detectar status das 3 ondas. Procurar pelas seções `## Onda 1`, `## Onda 2`, `## Onda 3` com "executado" vs "pendente":

```powershell
$conteudo = Get-Content $kodaiInstalado -Raw
$onda1 = if ($conteudo -match 'Onda 1.*executad') { "OK" } else { "pendente" }
$onda2 = if ($conteudo -match 'Onda 2.*executad') { "OK" } else { "pendente" }
$onda3 = if ($conteudo -match 'Onda 3.*executad') { "OK" } else { "pendente" }

Write-Output "Onda 1 (aditivo): $onda1"
Write-Output "Onda 2 (comportamental): $onda2"
Write-Output "Onda 3 (entrevista): $onda3"
```

### 4. Contagem de artefatos KOD.AI ativos

```powershell
$skillsCount = (Get-ChildItem ".claude/skills" -Directory -ErrorAction SilentlyContinue).Count
$rulesCount = (Get-ChildItem ".claude/rules" -File -Filter "*.md" -ErrorAction SilentlyContinue).Count
$hooksCount = (Get-ChildItem ".claude/hooks" -File -Filter "*.js" -ErrorAction SilentlyContinue).Count

$memoriaEmpresa = if (Test-Path "_memoria/empresa.md") {
  $c = Get-Content "_memoria/empresa.md" -Raw
  if ($c -match '\{\{') { "tem placeholders" } else { "preenchida" }
} else { "ausente" }

$memoriaPref = if (Test-Path "_memoria/preferencias.md") {
  $c = Get-Content "_memoria/preferencias.md" -Raw
  if ($c -match '\{\{') { "tem placeholders" } else { "preenchida" }
} else { "ausente" }

$memoriaEstr = if (Test-Path "_memoria/estrategia.md") {
  $c = Get-Content "_memoria/estrategia.md" -Raw
  if ($c -match '\{\{') { "tem placeholders" } else { "preenchida" }
} else { "ausente" }

$identidade = if (Test-Path "identidade/design-guide.md") {
  $c = Get-Content "identidade/design-guide.md" -Raw
  if ($c -match '\{\{') { "tem placeholders" } else { "preenchida" }
} else { "ausente" }

Write-Output "Skills: $skillsCount"
Write-Output "Rules: $rulesCount"
Write-Output "Hooks: $hooksCount"
Write-Output "Memoria empresa: $memoriaEmpresa"
Write-Output "Memoria preferencias: $memoriaPref"
Write-Output "Memoria estrategia: $memoriaEstr"
Write-Output "Identidade: $identidade"
```

### 5. Reporte canônico (formato fixo)

Saída final em 8-12 linhas, sem prosa adicional:

```
KOD.AI <versao-local> (clone: KODAI/ @ <commit-curto>, ultimo pull: <quando>)
Upstream: <N> commit(s) novo(s) → rodar /atualizar-kodai

Instalacao: Onda <X>/3
  Onda 1 (aditivo zero-risk): <OK | pendente>
  Onda 2 (comportamental):    <OK | pendente>
  Onda 3 (entrevista):        <OK | pendente>

Artefatos ativos:
  Skills propagadas:       <N>
  Rules path-scoped:       <N>
  Hooks JS ativos:         <N>
  Memorias preenchidas:    <N>/3 (empresa, preferencias, estrategia)
  Identidade visual:       <preenchida | placeholders | ausente>

Proxima acao: <texto sugestao baseado em estado>
```

**Sugestões automáticas pra "Próxima ação":**
- `Onda 2 pendente` → "rodar /instalar --ondas=2 pra adicionar SessionStart hook + .gitignore aditivo"
- `Onda 3 pendente` → "rodar /instalar --ondas=3 pra preencher _memoria/ + identidade/ via entrevista (ou destilação automática)"
- `Memoria <X> com placeholders` → "editar manualmente OU rodar /atualizar pra destilar de contexto vivo"
- `Upstream N commits novos` → "rodar /atualizar-kodai pra puxar últimas melhorias"
- `Tudo OK` → "KOD.AI 100% — bom trabalho. Próximo: tarefa do projeto"

## Quality Gates

```yaml
quality_gates:
  - "Output em 8-12 linhas no formato canônico (sem prosa adicional)"
  - "TODOS os números vêm de comando real (Test-Path, Get-ChildItem, git log) — ZERO hardcode"
  - "Sugestão de próxima ação contextual (baseada nos checks reais)"
  - "Distingue 3 estados (KODAI ausente / clonado-não-instalado / instalado)"
  - "Não modifica nada (read-only)"
  - "Detecta drift do upstream via git rev-list (não confia em data manual)"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| "Acho que tá tudo instalado" sem rodar comando | Dedução vs evidência (regra-base 11) | Sempre rodar Get-ChildItem real |
| Reportar números antigos hardcoded | Drift silencioso | Recalcular toda invocação |
| Pular check do upstream "pra ser rápido" | Drift de versão = fraqueza nº 3 do KOD.AI (princípio 2Co 12:9) | `git fetch` + `rev-list` obrigatórios |
| Reportar tudo em prosa narrativa | Difícil de scanear | Formato canônico fixo (8-12 linhas) |
| Esconder placeholders `{{...}}` nas memórias | Falso "instalado" | Detectar `\{\{` e marcar "tem placeholders" |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "Upstream tem N>0 commits novos"
    skill: atualizar-kodai
    razao: "Drift detectado — pull + re-propagar"
  - condicao: "Onda <3"
    skill: instalar
    razao: "Completar instalação (onda restante)"
  - condicao: "Memorias com placeholders"
    skill: atualizar
    razao: "Destilação automática ou edição manual"
  - condicao: "Algo deu ruim após /instalar"
    skill: kodai-rollback
    razao: "Desfaz cirurgicamente lendo KODAI-INSTALADO.md"
```

## Limitações honestas

- Detecção de "Onda X executada" depende do `KODAI-INSTALADO.md` ter formato canônico. Se template mudou, regex precisa atualizar
- `git fetch` requer conectividade — em modo offline, marcar "upstream check OFFLINE — sem dados"
- Não detecta hooks órfãos (configurados em settings.json mas .js não existe) — gap separado, vai pra `kodai-doctor` future

## Origem

Skill criada 2026-05-23 como resposta ao gap D1 do piloto Navortech-Desenvolvimento. Operacionaliza princípio fundacional [[feedback_kodai_principio_2corintios_12_9]] — fraqueza "sem visibilidade do estado" vira força "reporte factual em 1 comando".

Spec consolidada em `docs/decisoes/2026-05-23_aberto-melhorias-onboarding-davi-piloto.md` gap D1.
