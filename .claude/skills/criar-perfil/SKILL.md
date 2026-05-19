---
name: criar-perfil
description: >
  Cria novo perfil de instalação YAML quando os 10 perfis existentes não
  cobrem o caso de uso do cliente. Faz interview curto (tipo de negócio,
  packs essenciais, contextos-domínio relacionados), gera draft, valida,
  salva em `<KODAI>/0-INSTALACAO/perfis/<nome>.yaml`. Use sempre que o
  usuário disser "criar perfil novo", "/criar-perfil", "nenhum perfil
  serve", "esse cliente é diferente", "perfil customizado", ou quando
  durante `/instalar` nenhum perfil bater com o cliente.
allowed-tools: [Read, Write, Glob]
---

# /criar-perfil — Criação de perfil de instalação novo

Segue workflow oficial skill-creator Anthropic (capture intent → interview → draft → test → optimize).

## Workflow

### Passo 1 — Capture intent

Por que o usuário precisa de perfil novo? Extrair do contexto:
- Tipo de negócio que não cai nos 10 perfis existentes
- Aspectos específicos que perfil existente próximo NÃO cobriria
- Cliente concreto que motivou a criação (anonimizado se sensível)

Se contexto não cobre, ir pra Passo 2.

### Passo 2 — Interview

Perguntar uma de cada vez:

1. **Tipo de negócio:** "Em uma frase, que tipo de negócio é? (ex: 'startup de fintech com 5 pessoas vendendo produto SaaS B2B com integrações bancárias')"

2. **Perfis próximos:** "Olha os 10 perfis em `<KODAI>/0-INSTALACAO/perfis/`. Qual mais se parece? E o que falta neles pra cobrir este caso?"

3. **Packs essenciais:** "Quais 5-10 packs/capacidades técnicas são MUST-HAVE pra esse perfil?"

4. **Packs que NÃO se aplicam:** "E quais packs do perfil-completo seriam supérfluos?"

5. **Contextos-domínio:** "Quais contextos-domínio típicos esse perfil usa?"

6. **Ideal pra / não-recomendado pra:** "Em uma frase: pra quem ESTE perfil é? E pra quem NÃO é?"

### Passo 3 — Draft do YAML

Gerar arquivo `<KODAI>/0-INSTALACAO/perfis/<nome>.yaml`:

```yaml
---
nome: <nome-kebab-case>
descricao: >
  <Pushy: tipo de negócio + lista de gatilhos>
  Use sempre que o usuário <gatilho 1>, <gatilho 2>, <gatilho 3>, mesmo
  que não use esses termos exatos.

ideal-para:
  - <tipo de negócio 1>
  - <tipo de negócio 2>

nao-recomendado-para:
  - <quando NÃO usar este perfil 1>
  - <quando NÃO usar 2>

packs-explicitos:
  - <categoria>/<pack-1>
  - <categoria>/<pack-2>
  ...

packs-por-dominio:
  incluir-se-related-a: [<contexto-1>, <contexto-2>]

excluir:
  - <packs do perfil-completo a remover>
  ...

contextos-dominio-sugeridos:
  - <contexto-1>
  - <contexto-2>

skills-universais-extras:
  - <skill específica do perfil, se houver>

versao: 1.0.0
last-updated: <YYYY-MM-DD>
author: davi-scholze
---
```

### Passo 4 — Validação

Mostrar draft ao usuário. Perguntar:
> "Esse YAML cobre o caso? Algo a adicionar/remover/ajustar?"

### Passo 5 — Salvar

Após OK:
1. Salvar em `<KODAI>/0-INSTALACAO/perfis/<nome>.yaml`
2. Adicionar entry em `<KODAI>/0-INSTALACAO/perfis/CATALOGO.md`
3. **Opcional:** adicionar plugin entry em `.claude-plugin/marketplace.json` (oferecer)

### Passo 6 — Teste opcional

Perguntar:
> "Quer que eu teste o perfil? Posso simular um `/instalar` com este perfil numa pasta dummy pra ver se filtra packs corretamente."

## Regras

- **Nome do perfil:** kebab-case, descritivo, sem "v2"/"novo"/"melhorado"
- **Descrição pushy:** lista de gatilhos explícitos + instrução pra triggerar
- **Pelo menos 5 packs-explicitos** (perfis muito enxutos não justificam categoria nova)
- **`ideal-para` e `nao-recomendado-para` obrigatórios** — evita confusão de uso
- **Se perfil é variação leve de existente:** considerar add-on/override em vez de perfil novo

## Falhas conhecidas

- Perfil duplicando perfil existente: detectar overlap > 70% e sugerir reusar.
- Nome conflitando: validar contra `perfis/` antes de salvar.
