# `_brutos-novos/` — drop zone de material novo

> Pasta gitignored. Versionado: só este README + `.gitkeep`.

## Pra que serve

Davi salva aqui **qualquer arquivo bruto** que vai virar contexto KOD.AI:

- `.md` exportado de pesquisa Claude Chrome / ChatGPT
- `.md` exportado de NotebookLM
- `.pdf` de relatório / referência
- `.txt` de transcrição
- `.csv` / `.json` / `.xlsx` de dados a analisar

**Naming livre.** Não precisa pensar em data, slug, organização. Salve com nome que faz sentido pra você no momento.

## Fluxo

```
1. Você salva arquivo aqui (ex: ESTRATEGICO LIAM OTTLEY.md)
2. Cola no chat:
   "absorve _brutos-novos/ESTRATEGICO LIAM OTTLEY.md
    tema: vendas de agentes IA
    notebooklm: https://notebooklm.google.com/notebook/<id>"
3. IA processa:
   - move arquivo pra inbox-davi/<data>-<tema>/SOURCE.md (path canônico)
   - ativa NotebookLM (vincula à pasta destino correta)
   - propõe absorção curada (4 buckets) se aplicável
4. _brutos-novos/ fica vazio de novo (pronto pro próximo)
```

## Por que não pasta-mãe raiz

Raiz tem arquivos canônicos (CLAUDE.md, KODAI-INSTALADO.md, AGENTS.md). Misturar bruto solto polui:
- `git status` cheio de arquivos não-trackeados
- Risco de `git add .` commitar bruto antes de processar
- Visual desorganizado quando você abre o VSCode

Esta pasta resolve: drop em **1 lugar só**, IA cuida do resto.

## Política irmã

- `politicas/imagens.md` — 3 tipos (bruto sagrado / evidência permanente / efêmera)
- `skills/capturar/` — captura input externo em `inbox-<pessoa>/<data>-<tema>/`
- `skills/ativar-notebooklm/` — vincula NotebookLM à pasta destino correta
- `skills/absorver-contexto/` — propõe absorção em 4 buckets (equivalente / complementar / novo / melhor)
- `skills/faxina/` — limpa lixo orgânico quando esquecer de mover

## Anti-padrão

- ❌ Salvar bruto na raiz da pasta-mãe (sai do hábito agora)
- ❌ Commitar `_brutos-novos/<arquivo>` (gitignored, não vai)
- ❌ Acumular 20 arquivos aqui sem processar (vira lixo — me chame periodicamente pra processar a fila)
