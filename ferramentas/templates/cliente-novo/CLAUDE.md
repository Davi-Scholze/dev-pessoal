# [Nome do Cliente] — Guia do Projeto
> Copie esta pasta para `Repositorios/[nome-cliente]/` ao iniciar novo cliente.
> Substitua todos os campos marcados com [colchetes].
> Última atualização: 2026-05-13

---

## Ordem de leitura (economizar contexto)

1. **Este arquivo** — regras, stack, dados do cliente, padrões
2. **`dados/entrevista.md`** — perfil do cliente e objetivos
3. **`dados/brand-config.json`** — identidade visual completa

---

## Dados do Cliente

- **Nome:** [Nome da Empresa]
- **CNPJ:** [XX.XXX.XXX/XXXX-XX]
- **Contato:** [Nome do responsável]
- **WhatsApp:** [(XX) XXXXX-XXXX]
- **Email:** [email@empresa.com]
- **Instagram:** @[handle]
- **Nicho:** [descrição curta]

---

## Objetivos do Projeto

1. [Objetivo principal]
2. [Objetivo secundário]

---

## Serviços Contratados

- [ ] Carrosséis para Instagram (mensal)
- [ ] Gestão de Google Ads
- [ ] Gestão de Meta Ads
- [ ] Relatório semanal automático
- [ ] Auditoria de anúncios
- [ ] Site / landing page
- [ ] [Outro]

---

## Stack

| Componente | Tecnologia |
|-----------|-----------|
| Frontend | [React + Vite / WordPress / outro] |
| Deploy | [Vercel / Netlify / outro] |
| CRM | [GoHighLevel / Notion / outro] |
| Pagamentos | [Asaas / Pagar.me / outro] |

---

## Identidade Visual

Ver `dados/brand-config.json` — fonte de verdade para todas as cores, fontes e tom de voz.

| Elemento | Valor |
|----------|-------|
| Cor Primária | `#XXXXXX` |
| Cor Secundária | `#XXXXXX` |
| Fundo | `#FFFFFF` |
| Fonte | [Inter / Poppins / outro] |

---

## Pipeline de Conteúdo (se aplicável)

```
dados/entrevista.md + dados/referencias-visuais/
        ↓ (Claude gera)
marketing/conteudo/carrossel-tema-data/roteiro.md
        ↓ (render.js processa)
marketing/conteudo/carrossel-tema-data/instagram/slide-01.png ... slide-08.png
        ↓ (Claude gera)
marketing/conteudo/carrossel-tema-data/legenda.md
        ↓
saidas/ (entrega final)
```

**Skill:** usar `/content-creator` para produzir carrosséis.

---

## Regras inegociáveis

1. **Identidade visual é inegociável** — cores e tipografia NUNCA alterar sem OK explícito
2. **Tom de voz** — seguir `dados/brand-config.json → voice`
3. **LGPD sempre** — qualquer formulário: honeypot + timer 3s + disclaimer
4. **Zero credenciais no código** — sempre via `.env`
5. **Mobile-first** — desenvolver para mobile primeiro

---

## Estrutura de Pastas

```
[nome-cliente]/
├── CLAUDE.md                ← você está aqui
├── dados/
│   ├── brand-config.json    ← cores, fontes, logo, tom de voz
│   ├── entrevista.md        ← perfil do cliente
│   └── referencias-visuais/ ← prints de inspiração
├── marketing/
│   └── conteudo/
│       ├── carrossel-[tema]-[data]/
│       │   ├── instagram/   ← slides gerados
│       │   ├── roteiro.md   ← script (entrada)
│       │   ├── legenda.md   ← caption (saída)
│       │   └── render.js    ← gerador de slides
│       └── ...
├── contextos/
│   ├── bruto/               ← contexto bruto recebido
│   └── fluxos/              ← contexto aprovado para dev
├── templates/               ← moldes reutilizáveis
├── saidas/                  ← entregas finais compactadas
└── README.md
```

---

## Modelo Financeiro

| Serviço | Valor Cobrado | Custo Real |
|---------|--------------|------------|
| [serviço 1] | R$[X]/mês | R$[Y]/mês |
| [serviço 2] | R$[X]/mês | R$[Y]/mês |

**Total MRR:** R$[X]  
**Custo total:** R$[Y]  
**Margem:** [Z]%
