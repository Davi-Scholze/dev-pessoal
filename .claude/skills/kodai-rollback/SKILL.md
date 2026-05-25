---
name: kodai-rollback
description: >
  Desfaz instalação KOD.AI (parcial ou completa) lendo `KODAI-INSTALADO.md`
  como inventário. Modo `--dry-run` (default) lista o que SERÁ apagado.
  Modo `--apply` exige confirmação literal "confirmo rollback". Preserva
  100% do que NÃO foi criado pelo KOD.AI. Snapshot automático em
  `.kodai-rollback-<data>.json` antes do apply pra meta-rollback. Use quando
  o usuário disser "rollback kodai", "desinstalar kodai", "me arrependi",
  "kodai está atrapalhando", "/kodai-rollback", ou após `/instalar` que deu
  errado.
allowed-tools: [Read, Bash, Glob, Write]
---

# Skill: `/kodai-rollback` — Reversão cirúrgica do KOD.AI

> Operacionaliza o princípio **2Co 12:9-10** (fraqueza "sem reversão se der ruim" → força "reversão multi-camada com Evidence Bloc completo") + política `escuta-antes-de-agir`.

## Princípio

KOD.AI instalado deve ser **reversível**. Em qualquer momento, 1 skill desfaz exatamente o que `/instalar` colocou. **ZERO suposição** — usa `KODAI-INSTALADO.md` como inventário fonte de verdade.

**Default = `--dry-run`**: mostra o que SERÁ apagado, NÃO apaga nada. Apply requer confirmação literal.

**Snapshot pré-apply obrigatório:** antes de deletar qualquer arquivo, grava `.kodai-rollback-<timestamp>.json` com lista completa + conteúdo de cada arquivo a deletar. Permite meta-rollback caso o próprio rollback dê ruim.

## Quando disparar

- "/kodai-rollback"
- "rollback kodai" / "desinstalar kodai" / "remover kodai"
- "me arrependi" / "kodai está atrapalhando"
- Após `/instalar` que deu errado
- Antes de re-tentar `/instalar` em pasta com instalação parcial defeituosa
- Em troubleshoot quando algo do KOD.AI conflita com fluxo existente

## Workflow 5 passos

### 1. Pré-flight — confirmar KOD.AI instalado

```powershell
$inv = "KODAI-INSTALADO.md"
if (-not (Test-Path $inv)) {
  Write-Output "❌ KODAI-INSTALADO.md ausente. KOD.AI não está instalado nesta pasta. Nada a reverter."
  exit 0
}
Write-Output "✓ KODAI-INSTALADO.md presente. Lendo inventário..."
```

### 2. Parsear inventário

Ler `KODAI-INSTALADO.md` raiz. Extrair seção `## Onda N — Aditivo cirúrgico` → tabela `## O que foi criado (NOVO)`. Pra cada linha, capturar:
- Tipo (Skills universais / Rules path-scoped / Hook / arquivo individual)
- Caminho relativo
- Quantidade

Validação cruzada: pra cada caminho declarado, confirmar via `Test-Path` que ainda existe. Se humano já apagou algo manualmente, marcar como "já ausente".

### 3. Detectar arquivos NÃO-KOD.AI (preservar)

**Crítico:** rollback NUNCA deve tocar arquivos que existiam antes do `/instalar`. Identificar via:

- `.claude/agents/`, `.claude/commands/` — específicos do projeto (não KOD.AI)
- Outros hooks `.js` em `.claude/hooks/` que não estão no inventário KOD.AI
- Skills em `.claude/skills/` que não estão no inventário KOD.AI (raríssimo mas possível)
- Qualquer modificação feita pelo humano em arquivos KOD.AI (`.claude/rules/*.md` editados localmente)

Pra arquivos com hash divergente do template KODAI, perguntar: "Detectei modificação local em `<arquivo>`. Preservar (mantém suas mudanças) ou deletar (volta ao zero)?"

### 4. Reporte dry-run + decisão

Formato canônico:

```
KOD.AI Rollback — DRY RUN (nenhum arquivo modificado)

Vou deletar (76 arquivos do inventário Onda 1+2+3):
  .claude/skills/         (68 pastas — ~120 arquivos)
  .claude/rules/          (7 arquivos)
  .claude/hooks/poluicao-detector.js + .manifest.yaml
  .claude/hooks/auto-suggest-skills.js + .manifest.yaml
  PRECEDENCE.md
  _memoria/empresa.md
  _memoria/preferencias.md
  _memoria/estrategia.md
  identidade/design-guide.md
  README.md (sera revertido pra versao pre-KODAI via git restore)
  .gitignore (sera revertido pra remover bloco "Adicionado por KOD.AI 2026-05-23")
  .claude/settings.json (sera revertido pra remover SessionStart + PostToolUse hooks)
  KODAI-INSTALADO.md

Vou preservar (existiam antes do /instalar):
  CLAUDE.md, AGENTS.md, MAPA.md, PENDENCIAS.md, PROMPT_MASTER_HANDOFF.md, REGRAS_SESSAO.md
  .claude/agents/ (N sub-agentes específicos do projeto-consumidor)
  .claude/commands/ (M slash commands específicos do projeto-consumidor)
  .claude/hooks/check-completion-claims.js
  .claude/hooks/inject-warning.js
  .claude/hooks/pre-commit-guard.js
  contextos/, repos/, ferramentas/, docs/, scripts/
  KODAI/ (clone — não deletado, gitignored mesmo)

Vou criar snapshot pre-apply em:
  .kodai-rollback-<timestamp>.json (~250KB — todos os arquivos a deletar + conteudo)

Pra executar: digite "confirmo rollback"
Pra cancelar: digite qualquer outra coisa
```

### 5. Apply (com confirmação literal)

Esperar string literal "confirmo rollback" do usuário. Qualquer outra coisa = cancelar.

Se confirmado:

```powershell
# 5.1 Snapshot pré-apply
$snapshot = @{
  timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss")
  inventario_lido_de = "KODAI-INSTALADO.md"
  arquivos = @()
}
foreach ($arquivo in $listaArquivos) {
  if (Test-Path $arquivo) {
    $snapshot.arquivos += @{
      path = $arquivo
      conteudo = (Get-Content $arquivo -Raw -Encoding UTF8)
      hash = (Get-FileHash $arquivo -Algorithm SHA256).Hash
    }
  }
}
$snapshot | ConvertTo-Json -Depth 10 | Out-File ".kodai-rollback-$(Get-Date -Format 'yyyy-MM-dd-HHmm').json" -Encoding utf8

# 5.2 Deletar arquivos
Remove-Item ".claude/skills" -Recurse -Force
Remove-Item ".claude/rules" -Recurse -Force
Remove-Item ".claude/hooks/poluicao-detector.js" -Force
Remove-Item ".claude/hooks/poluicao-detector.manifest.yaml" -Force
Remove-Item ".claude/hooks/auto-suggest-skills.js" -Force
Remove-Item ".claude/hooks/auto-suggest-skills.manifest.yaml" -Force
Remove-Item "PRECEDENCE.md" -Force
Remove-Item "_memoria" -Recurse -Force
Remove-Item "identidade" -Recurse -Force
Remove-Item "KODAI-INSTALADO.md" -Force

# 5.3 Reverter arquivos modificados (git)
git restore README.md
git restore .gitignore
git restore .claude/settings.json

# 5.4 Validar
Write-Output "Rollback executado. Snapshot pre-apply em .kodai-rollback-<timestamp>.json"
Write-Output "Pra meta-rollback (reverter o rollback): /kodai-meta-rollback .kodai-rollback-<timestamp>.json"
```

### 6. Evidence Bloc final

```
🛑 KOD.AI Rollback — APPLY EXECUTADO

Timestamp: 2026-05-23T14:23:01
Snapshot: .kodai-rollback-2026-05-23-1423.json (242KB)

Deletados:
  ✓ .claude/skills/ (68 pastas)
  ✓ .claude/rules/ (7 arquivos)
  ✓ .claude/hooks/poluicao-detector.js + manifest
  ✓ .claude/hooks/auto-suggest-skills.js + manifest
  ✓ PRECEDENCE.md
  ✓ _memoria/ (3 arquivos)
  ✓ identidade/design-guide.md
  ✓ KODAI-INSTALADO.md

Revertidos (git restore):
  ✓ README.md
  ✓ .gitignore
  ✓ .claude/settings.json

Preservados (não-KOD.AI ou modificados localmente):
  ✓ CLAUDE.md, AGENTS.md, MAPA.md, PENDENCIAS.md, REGRAS_SESSAO.md, PROMPT_MASTER_HANDOFF.md
  ✓ .claude/agents/ (N arquivos do projeto-consumidor)
  ✓ .claude/commands/ (M arquivos do projeto-consumidor)
  ✓ .claude/hooks/check-completion-claims.js, inject-warning.js, pre-commit-guard.js
  ✓ KODAI/ (clone — não modificado)

Estado pós-rollback: pasta volta ao estado pré-KOD.AI exato.
Pra reverter este rollback: /kodai-meta-rollback .kodai-rollback-2026-05-23-1423.json
```

## Quality Gates

```yaml
quality_gates:
  - "Default = --dry-run (nenhuma deleção sem confirmação literal)"
  - "Apply requer string exata 'confirmo rollback' do usuário"
  - "Snapshot pre-apply OBRIGATÓRIO (.kodai-rollback-<timestamp>.json) antes de qualquer deleção"
  - "Distingue arquivos KOD.AI (do inventário) vs arquivos pré-existentes (preservar)"
  - "Detecta modificação local em arquivos KOD.AI e pergunta antes de sobrescrever"
  - "Evidence Bloc final lista TUDO que foi deletado + TUDO que foi preservado"
  - "Documenta meta-rollback (como desfazer o rollback)"
  - "Não toca clone KODAI/ (continua disponível como dependency)"
  - "Não toca .claude/agents/ ou .claude/commands/ específicos do projeto-consumidor (não-KOD.AI)"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Apply sem dry-run primeiro | Deleção cega | Sempre dry-run, sempre confirmação literal |
| Snapshot opcional | Meta-rollback impossível se algo der ruim | Snapshot obrigatório (regra inviolável) |
| Deletar `.claude/agents/` "porque está vazio depois" | Apaga sub-agentes do projeto | Preservar sempre — não-KOD.AI |
| Rollback de skills sem rollback de settings.json | Hooks órfãos apontam pra .js inexistente | Reverter settings.json junto |
| Skip `git restore` em arquivos versionados | Estado git inconsistente | Sempre `git restore` em arquivos modificados pelo /instalar |
| Confirmar OK com "sim" ou "yes" | Confirmação fraca, pode ser typo | String literal exata "confirmo rollback" |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "rollback completado com sucesso"
    skill: kodai-status
    razao: "Confirmar estado pós-rollback (esperado: KOD.AI não instalado)"
  - condicao: "humano quer re-instalar após rollback"
    skill: instalar
    razao: "Nova instalação do zero (com lições aprendidas)"
  - condicao: "humano quer desfazer o rollback"
    skill: kodai-meta-rollback (futura)
    razao: "Reverter usando snapshot .kodai-rollback-*.json"

requires_skills_anteriores:
  - condicao: "humano confuso sobre o que tá instalado"
    skill: kodai-status
    razao: "Saber o que tem antes de pensar em remover"
```

## Limitações honestas

- Skill assume `KODAI-INSTALADO.md` em formato canônico. Se template mudou drasticamente, parser precisa atualizar
- Reverter `.gitignore` via `git restore` só funciona se as mudanças foram commitadas antes
- Snapshot pode ficar grande (~200-500KB) — limpeza manual após X dias (ou skill `/faxina` detecta)
- Não desfaz mudanças no clone `KODAI/` (clone é read-mostly; mudanças lá vão pra upstream via `/upstream-update`)
- Meta-rollback (`kodai-meta-rollback`) é skill **futura** — primeira versão só documenta o snapshot

## Origem

Skill criada 2026-05-23 como resposta ao gap D2 do piloto Navortech-Desenvolvimento. Operacionaliza princípio fundacional [[feedback_kodai_principio_2corintios_12_9]] — fraqueza "sem reversão se der ruim" vira força "reversão multi-camada com snapshot + Evidence Bloc completo".

Spec consolidada em `docs/decisoes/2026-05-23_aberto-melhorias-onboarding-davi-piloto.md` gap D2.
