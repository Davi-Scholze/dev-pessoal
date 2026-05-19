---
name: criar-pack
description: >
  Cria novo pack em `<KODAI>/2-PACKS/packs/<categoria>/<nome>/` clonando
  `_template-pack/` e preenchendo manifest com pushy description. Use
  sempre que o usuário disser "criar pack", "/criar-pack", "nova
  capacidade técnica", "preciso pack pra X", "novo módulo", ou quando
  durante intake detectar que material recebido NÃO encaixa em pack
  existente e precisa categoria/sub-pack novo.
allowed-tools: [Read, Write, Bash, Glob]
---

# /criar-pack — Criação de pack novo

## Workflow

### Passo 1 — Capture intent

Identificar:
- Tema do pack (ex: "google-analytics-4", "supabase-migrations")
- Categoria (consultar `<KODAI>/0-INSTALACAO/TAXONOMIA.md` pra ver categorias top-level)
- Se categoria adequada NÃO existe, pular pra Passo 2A

### Passo 2 — Validar categoria

Categorias top-level atuais: `dev/`, `ia/`, `integracoes/`, `dados/`, `documentos/`, `negocio-br/`, `operacao/`, `seguranca/`, `comercial/`, `marketing/`, `midia/`, `design/`, `atendimento/`.

Se o pack cabe em uma delas: usar essa categoria.

#### Passo 2A — Criar categoria nova (se necessário)

Se nenhuma categoria existente serve:
1. Perguntar ao usuário: "Esta capacidade não cabe nas categorias atuais (`<lista>`). Vamos criar categoria nova `<X>/`? Justifique em 1 frase por que."
2. Conferir regras de criação em `TAXONOMIA.md` (≥3 sub-packs esperados, nome estável, fronteira clara)
3. Se confirmado, criar `<KODAI>/2-PACKS/packs/<nova-categoria>/categoria.yml`
4. Atualizar `TAXONOMIA.md` adicionando linha na tabela top-level
5. Criar ADR em `docs/decisoes/<YYYY-MM-DD>-nova-categoria-<nome>.md`

### Passo 3 — Interview

1. **Nome (kebab-case):** "Como chamar? (ex: `google-analytics-4`)"
2. **Descrição pushy:** "Quando essa skill deveria triggerar? Liste gatilhos explícitos."
3. **Entrega:** "Que artefato concreto este pack entrega? (workflow n8n? código? doc? template?)"
4. **3 níveis aplicáveis:** "Esse pack entrega produto vendável? Se sim, qual seria nível DEMO grátis vs FUNCIONAL ~€10-30/mês vs TOP?"
5. **Dependências:** "Depende de outros packs ou shared? (auth/X, deploy/Y, ...)"
6. **cost-to-run:** "Custo mensal pra cliente SMB usar isso de verdade? (free | freemium-low | freemium-mid | paid-high)"
7. **Contextos-domínio relacionados:** "Em que verticais isso costuma aparecer?"
8. **Perfis aplicáveis:** "Em quais dos 10 perfis esse pack faz sentido?"

### Passo 4 — Clonar template

```bash
cp -r "<KODAI>/2-PACKS/_template-pack" "<KODAI>/2-PACKS/packs/<categoria>/<nome>"
```

### Passo 5 — Preencher SKILL.md

Editar `<categoria>/<nome>/SKILL.md` com manifest completo + status STUB + pushy description.

### Passo 6 — Preencher RESEARCH-PROMPT.md e INTAKE.md

Adaptar templates ao tema do pack.

### Passo 7 — Salvar e commitar

```bash
cd "<KODAI>"
git add "2-PACKS/packs/<categoria>/<nome>"
git commit -m "feat(packs/<categoria>): adicionar <nome> em STUB"
```

### Passo 8 — Sugerir próximo passo

> "Pack `<nome>` criado em STUB. Próximo passo recomendado:
> - Rodar `RESEARCH-PROMPT.md` em sessão dedicada
> - Ou começar a popular references manualmente
>
> Quer que eu execute o RESEARCH-PROMPT agora?"

## Regras

- **Nome kebab-case, descritivo, estável** (nunca "v2", "novo")
- **Sempre status STUB ao criar**
- **Pushy description obrigatória** com lista de gatilhos
- **`cost-to-run` honesto** — não esconder custo paid-high
- Não criar pack pra capacidade que outro pack já cobre — detectar overlap antes
