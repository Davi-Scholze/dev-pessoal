# Contexto Bruto — Referência: Sistema de Produção de Conteúdo Marketing
> Recebido em: 2026-05-13
> Status: BRUTO — não processar sem aprovação explícita
> Origem: print de estrutura de pastas de um profissional de marketing/conteúdo
> Objetivo: adaptar para ferramentas globais dos projetos

---

# O QUE É

Sistema usado por um profissional que vende:
- Google Ads
- Carrosséis para Instagram
- Sites

Diferencial: conteúdo tratado como **código** — roteiro em `.md` entra, `render.js` processa, slides saem automaticamente em `instagram/`.

---

# ESTRUTURA OBSERVADA

```
raiz/
├── _memoria/              ← contexto persistente do cliente (igual nosso contextos/)
├── .claude/               ← Claude Code configurado
├── dados/
│   ├── catalogo-empresa   ← dados do negócio do cliente
│   ├── entrevista-cliente ← entrevista para gerar conteúdo personalizado
│   ├── README.md
│   └── referencias-visuais← identidade visual, cores, fontes
├── identidade/            ← assets de marca
├── marketing/
│   └── conteudo/
│       ├── carrossel-X/   ← 1 pasta por carrossel produzido
│       │   ├── instagram/
│       │   │   ├── slide-01.png
│       │   │   ├── slide-02.png ... slide-06.png
│       │   ├── node_modules/
│       │   ├── legenda.md ← caption para o post
│       │   ├── package.json
│       │   ├── render.js  ← gera os slides programaticamente
│       │   └── roteiro.md ← script do conteúdo (entrada)
│       └── carrossel-Y/   ← mesmo padrão
│   ├── linktree/
│   │   ├── index.html
│   │   ├── icon.png
│   │   └── logo.png
│   ├── provas/            ← prints de resultados de campanhas
│   └── ProvasSociais/     ← depoimentos de clientes
├── saidas/                ← outputs finais para entrega
├── scripts/               ← automações gerais
├── templates/             ← moldes reutilizáveis
├── CLAUDE.md
└── README.md
```

---

# PIPELINE IDENTIFICADO

```
entrevista-cliente.md + referencias-visuais
        ↓ (Claude gera)
roteiro.md (script do carrossel)
        ↓ (render.js processa)
instagram/slide-01...slide-06 (imagens prontas)
        ↓
legenda.md (caption pronto para postar)
        ↓
saidas/ (entrega para o cliente)
```

---

# O QUE VALE ADAPTAR

1. **Pipeline roteiro → render → slides** — gerar carrosséis automaticamente sem Canva
2. **dados/entrevista** — entrevistar cliente antes de produzir qualquer conteúdo
3. **dados/referencias-visuais** — guardar identidade visual do cliente como fonte de verdade
4. **templates/** + **saidas/** — separar molde do resultado
5. **ProvasSociais/** — seção dedicada a depoimentos e resultados (converter em conteúdo)
6. **_memoria/** — contexto persistente por cliente (já fazemos isso com contextos/)

---

# ONDE ENCAIXAR NOS PROJETOS

| Projeto | Aplicação |
|---------|-----------|
| **Decon** | Gerar carrosséis para Instagram da Denize automaticamente — nicho psicólogas |
| **Dojô** | Marketing do app — carrosséis para professores de artes marciais |
| **Global** | Skill `content-creator` reutilizável para qualquer cliente |

---

# PRÓXIMA DECISÃO (aguarda aprovação)

- [ ] Criar skill `content-creator` baseada nessa estrutura?
- [ ] Implementar diretamente em decon-sistema/marketing/?
- [ ] Criar repositório separado de ferramentas de marketing?
