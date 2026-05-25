---
name: live-preview
description: >
  Abre automaticamente browser quando skill produz output visual (HTML, imagem,
  carrossel, slide, página) pra Davi validar em tempo real. Wrapper sobre Playwright
  MCP. 4 modos: auto (chamado por outra skill), manual (usuário dispara), watch
  (refresh em edição), batch (múltiplos arquivos em janela única). 3 viewports
  (desktop/tablet/mobile). Auto-chamada por skills geradoras (/gerar-carrossel,
  /publicar-tema, etc) quando declaram live_preview: true. Use quando disser
  "abre preview", "vê como tá ficando", "mostra na tela", "/live-preview".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
---

# Skill: `/live-preview`

Auto-mostrar em tela. Sem precisar pedir.

## Princípio

> **Davi não pede "abre preview pra eu ver" — KODAI mostra automaticamente.**

Quando skill produz output visual, abre browser sozinha + apresenta resultado + pede feedback (OK/problema). Validação em tempo real, não depois.

Origem: pedido Davi 2026-05-22 — "Como fazer com que automaticamente o que esteja sendo feito, seja imagens, site... apareça pra mim em alguma tela pra eu ir validando e vendo?"

## Quando disparar

**Triggers explícitos:**
- "/live-preview <path>"
- "abre preview de [arquivo/pasta]"
- "vê como tá ficando"
- "mostra na tela"
- "preview essa pasta"

**Triggers auto (chamado por outra skill):**
- Skill declarou `live_preview: true` no manifest E produziu output visual (HTML/PNG/JPG/SVG)
- Skills com auto-trigger configurado: `/gerar-carrossel`, `/publicar-tema`, `/proposta-cliente`, `/excalidraw-diagram`

**NÃO disparar:**
- Output não-visual (texto puro, JSON, markdown sem render)
- Modo agent / 24/7 (sem humano pra validar — retorna skipped)
- Output > 100MB (provavelmente vídeo — usa outro fluxo)

## 4 modos de operação

### Modo `auto` (default quando chamado por outra skill)

Skill geradora invoca `/live-preview` no fim. Comportamento:

1. Abre browser Playwright MCP
2. Navega pro path do output (file://...)
3. Tira screenshot inicial
4. Pergunta: "OK pra prosseguir, problema visual, ou trocar viewport?"
5. Se OK → fecha browser, segue pipeline
6. Se problema → mantém browser aberto, sugere `/ver` pro ciclo Ver→Analisar→Propor
7. Se trocar viewport → reabre em tablet ou mobile

### Modo `manual` (usuário dispara)

`/live-preview <path>` — abre browser sem cronograma. Usuário fecha quando quiser.

### Modo `watch` (refresh em edição)

`/live-preview <path> --modo watch` — abre browser + monitora arquivo. Quando arquivo é editado (file watcher chokidar), recarrega browser automaticamente (debounce 500ms).

**Uso típico:** desenvolver HTML/CSS iterativamente vendo mudanças em tempo real.

### Modo `batch` (múltiplos arquivos)

`/live-preview <pasta>/ --modo batch` — abre browser com índice HTML temp listando todos arquivos da pasta. Click navega entre eles. Usuário aprova lote.

**Uso típico:** revisar 10 slides de um carrossel gerado.

## 3 viewports canônicos

| Viewport | Dimensão | Quando |
|---|---|---|
| `desktop` (default) | 1920×1080 | Sites, landing pages, apresentação |
| `tablet` | 768×1024 | Validação intermediária |
| `mobile` | 390×844 (iPhone 14) | Mobile-first **obrigatório** (regra-base 8) |

**Workflow recomendado:** sempre testar `mobile` antes de aprovar (regra-base 8 — mobile-first).

## Workflow detalhado

### Modo auto (chamado por skill geradora)

```python
# Pseudocode — skill geradora termina chamando live-preview
output_path = "outputs/carrossel-2026-05-22/slide-01.html"
result = invoke('/live-preview', {
    'target': output_path,
    'modo': 'auto',
    'viewport': 'mobile',  # mobile-first por default
    'auto_close': False
})

if result.feedback == 'OK':
    continuar_pipeline()
elif result.feedback == 'PROBLEMA':
    # skill geradora entra em modo Ver→Analisar→Propor
    invoke('/ver', {'target': output_path})
elif result.feedback == 'OUTRO_VIEWPORT':
    invoke('/live-preview', {..., 'viewport': result.viewport_solicitado})
```

### Modo manual

```bash
/live-preview outputs/carrossel-2026-05-22/
```

Abre janela única com todos slides do carrossel. Usuário navega + aprova.

### Modo watch

```bash
/live-preview site-cliente-x/index.html --modo watch
```

Browser fica aberto. Usuário edita CSS/HTML em IDE. Browser refresh automático. Cap em 100 refreshes por sessão (proteção loop).

## Integração com skills geradoras

Skills que produzem output visual declaram no manifest:

```yaml
live_preview:
  auto: true
  viewport_default: "mobile"  # ou desktop/tablet
  auto_close_after_ok: true
```

Skills geradoras canônicas que auto-trigger live-preview:

- `/gerar-carrossel` → preview cada slide PNG + carrossel.html
- `/publicar-tema` → preview artigo blog + carrossel + legendas
- `/proposta-cliente` → preview HTML da proposta
- `/excalidraw-diagram` → preview diagrama renderizado
- `/lp-builder` (futuro) → preview landing page completa

## Bloco "Próximo passo" no output

Após `/live-preview` rodar, output termina com:

```markdown
## Próximo passo

✅ Preview aberto em <viewport>.

Como ficou?
1. **OK** — fecho preview e sigo pipeline
2. **PROBLEMA** — quero ajustar (vou abrir ciclo Ver→Analisar→Propor)
3. **Trocar viewport** — quero ver em mobile/tablet/desktop
4. **Watch** — quero editar e ver em tempo real

Diz o número.
```

## Implementação técnica (script Python opcional)

`scripts/run.py`:

```python
import sys
import subprocess
from pathlib import Path

def main():
    target = sys.argv[1]
    modo = "auto" if "--modo" not in sys.argv else sys.argv[sys.argv.index("--modo") + 1]
    viewport = "desktop"
    if "--viewport" in sys.argv:
        viewport = sys.argv[sys.argv.index("--viewport") + 1]

    sizes = {
        "desktop": (1920, 1080),
        "tablet": (768, 1024),
        "mobile": (390, 844),
    }
    w, h = sizes[viewport]

    target_path = Path(target).resolve()
    if not target_path.exists():
        print(f"❌ Path não existe: {target_path}")
        sys.exit(1)

    # Abre Playwright MCP via subprocess (configurado em .mcp.json)
    # Implementação real usa o MCP server diretamente — esta é placeholder
    print(f"🔍 Live-preview {target_path} em {viewport} ({w}×{h})")
    print(f"   Modo: {modo}")
    print(f"   (Playwright MCP é invocado pelo Claude em runtime)")

if __name__ == "__main__":
    main()
```

**Nota:** invocação real do Playwright MCP é feita pelo Claude (via tool `mcp__playwright__browser_navigate` + `browser_resize` + `browser_take_screenshot`), não pelo script Python. Script existe pra padronizar args e validação inicial.

## Snapshot opcional (`--snapshot`)

`/live-preview <path> --snapshot` salva PNG do estado atual em `mapeamento/evidencias/<YYYY-MM-DD>/<nome>.png` (regra `politicas/imagens.md` — Tipo 2 evidência permanente).

## Anti-padrões

| Padrão | Por quê problemático | Correção |
|---|---|---|
| Auto-preview sem desktop+mobile | Mobile-first quebra em prod | Default mobile-first; desktop opt-in |
| Watch mode com debounce muito curto | Browser refresca toda tecla | Debounce mínimo 500ms |
| Preview de arquivo > 100MB | Browser trava | Bloqueia se > 100MB; sugere ferramenta dedicada (vídeo player, etc) |
| Skill em modo agent invoca live-preview | Trava esperando humano | Retorna `skipped` em modo agent (não erra) |
| Skill geradora cria output sem chamar live-preview | Davi precisa lembrar de abrir | Declara `live_preview: true` no manifest |
| Snapshot em pasta errada (raiz, .claude/) | Polui workspace | Sempre `mapeamento/evidencias/<data>/` |

## Limitações honestas

- **Não substitui validação em dispositivo real** — emulador mobile do browser não é iPhone físico. Pra produção, testar em iPhone real (regra `ui-cycle-trigger.md` insiste em 3 viewports + dispositivo físico).
- **Watch mode tem polling no Windows** (~500ms) — chokidar não usa inotify nativo.
- **Não funciona em modo agent 24/7** (`runtime.mode: agent`) — exige humano síncrono.
- **Playwright MCP precisa estar configurado** em `.mcp.json` (path canônico Windows: `--output-dir C:/Users/<user>/AppData/Local/playwright-mcp/`).
- **Vídeos não são suportados** — usar `/capturar-video` + visualizar separadamente.

## Casos especiais

### Output é PDF

PDF abre direto via Playwright se for arquivo `.pdf` local. Snapshot funciona.

### Output é imagem PNG/JPG isolado

Abre página HTML temp com `<img>` apontando pro arquivo. Permite zoom + viewport switch.

### Output é pasta com index.html

Trata index.html como entrada padrão. Outros .html da pasta acessíveis via links se houver.

### Output é Markdown

Renderiza markdown via biblioteca leve (marked.js em CDN) na página HTML temp. Suporta tabelas + code blocks.

## Quando promover DRAFT → FUNCIONAL

1. Implementado e testado em 4 modos (auto/manual/watch/batch)
2. Testado com skill geradora real (ex: piloto `/gerar-carrossel`)
3. 3 viewports validados (desktop/tablet/mobile)
4. Modo watch sem leaks de memória (browser não acumula tabs)
5. Snapshot salvando em path correto

## Política irmã + skills relacionadas

- `politicas/auto-instrucao-pipeline.md` — `/live-preview` é exemplo concreto de auto-instrução
- `politicas/imagens.md` — snapshot Tipo 2 (evidência permanente)
- `politicas/ver-analisar-propor-testar-reportar.md` — ciclo UI canônico (live-preview é Passo 1 visual)
- `skills-universais/ver/` — irmã (ver é passivo, live-preview é ativo+watch)
- `skills-universais/dev-browser/` — infra Playwright MCP wrapper
- `skills-universais/gerar-carrossel/` — consumidor (frente A1)
- `skills-universais/publicar-tema/` — consumidor (frente A3)

## Origem (proveniência)

Davi 2026-05-22:
> "Como fazer com que automaticamente o que esteja sendo feito, seja imagens, site... apareça pra mim em alguma tela pra eu ir validando e vendo?"

Padrão "live-reload + browser preview" é universal em dev web (Vite, webpack dev server, browser-sync, etc). Esta skill aplica o padrão pro contexto KOD.AI (skills geradoras + multi-viewport + bridge com `/ver` e `/dev-browser`).

Frente aberta: B3 em `docs/decisoes/2026-05-22_frentes-abertas-consolidado.md`.
