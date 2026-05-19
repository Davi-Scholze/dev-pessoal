---
name: criar-contexto
description: >
  Cria novo contexto-domínio em `<KODAI>/3-CONTEXTOS-DOMINIO/<nome>/`
  clonando `_template-contexto/` e preenchendo manifest. Use sempre que
  o usuário disser "criar contexto", "/criar-contexto", "novo vertical",
  "novo domínio de negócio", "preciso contexto pra X", ou quando intake
  detectar material que NÃO encaixa em contexto existente e é
  conhecimento de negócio reutilizável (não capacidade técnica).
allowed-tools: [Read, Write, Bash, Glob]
---

# /criar-contexto — Criação de contexto-domínio novo

## Workflow

### Passo 1 — Capture intent + validar que É contexto-domínio (não pack)

Distinção crítica:
- **Pack** = capacidade técnica (como FAZER algo). Use `/criar-pack`.
- **Contexto-domínio** = conhecimento de NEGÓCIO (o que o vertical É — regras, fluxos, vocabulário, regulações).

Se em dúvida, perguntar:
> "Esse material é mais 'como fazer X' (= pack) ou 'o que é o negócio Y / quais regras Y tem' (= contexto-domínio)?"

### Passo 2 — Validar que não existe já

Conferir `<KODAI>/3-CONTEXTOS-DOMINIO/` e `META-DOMINIOS.md`. Se overlap > 50%, sugerir reusar/estender existente.

### Passo 3 — Interview

1. **Nome (kebab-case):** "Como chamar? (ex: `fintech-br`, `dojos-artes-marciais`)"
2. **Descrição pushy:** "Quando carregar este contexto? Liste gatilhos."
3. **Tipo de negócio coberto:** "Em 2 frases, que tipo de negócio esse contexto serve?"
4. **Origem do material:** "Tem material bruto pra alimentar? Ou destila de algum projeto existente seu?"
5. **Regulações:** "Quais leis/normas se aplicam? (LGPD, Lei do ISS, CFM-saúde, ...)"
6. **Packs típicos relacionados:** "Quais packs do `<KODAI>/2-PACKS/packs/` costumam ser ativados em projetos desse vertical?"
7. **Perfis aplicáveis:** "Quais dos 10 perfis usam tipicamente este contexto?"

### Passo 4 — Clonar template

```bash
cp -r "<KODAI>/3-CONTEXTOS-DOMINIO/_template-contexto" "<KODAI>/3-CONTEXTOS-DOMINIO/<nome>"
```

### Passo 5 — Preencher DOMINIO.md

Manifest completo com:
- `status: STUB` (default)
- `regulations` com `last-verified` + `regulamentacao-data-cutoff`
- Pushy description
- Sub-pastas `conhecimento/`, `exemplos/`, `modelos-dados/`, `fluxos/`, `stakeholders-templates/`, `sources/`, `_bruto/` (vazias mas criadas)

### Passo 6 — Criar arquivos esqueleto em `conhecimento/`

Stubs:
- `01-glossario.md` (vazio com cabeçalho)
- `02-fluxos-tipicos.md`
- `03-stakeholders.md`
- `04-conformidade.md` (lista regulations)
- `05-integracoes-comuns.md`
- `06-anti-patterns.md`

### Passo 7 — Atualizar META-DOMINIOS.md

Adicionar linha na tabela com nome, status STUB, origem.

### Passo 8 — Salvar e commit

```bash
cd "<KODAI>"
git add "3-CONTEXTOS-DOMINIO/<nome>" 3-CONTEXTOS-DOMINIO/META-DOMINIOS.md
git commit -m "feat(contextos): adicionar <nome> em STUB"
```

### Passo 9 — Sugerir próximo passo

> "Contexto `<nome>` criado em STUB. Próximos passos sugeridos:
> - Soltar material bruto em `<nome>/_bruto/`
> - Rodar `/atualizar` ou INTAKE-PROTOCOL pra processar
> - Destilar progressivamente em `conhecimento/01-glossario.md` etc.
>
> Quer me passar material bruto agora?"

## Regras

- **Sempre STUB ao criar**
- **Regulações com `last-verified` obrigatório** (senão vira armadilha jurídica)
- **Não duplicar contexto existente** (overlap > 50% = reusar/estender)
- **Distinção pack vs contexto crítica** — pack é HOW, contexto é WHAT
