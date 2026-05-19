---
name: listar-disponiveis
description: >
  Lista packs e contextos disponíveis no upstream KOD.AI que NÃO estão
  instalados neste projeto. Use sempre que o usuário disser "o que tem
  disponível?", "/listar-disponiveis", "o que mais posso instalar?",
  "mostra packs novos", "que outros packs existem?".
allowed-tools: [Read, Glob]
---

# /listar-disponiveis

Lê `<KODAI>/2-PACKS/META-INDEX.md` e `<KODAI>/3-CONTEXTOS-DOMINIO/META-DOMINIOS.md`, cruza com `KODAI-INSTALADO.md` deste projeto, e mostra o que ainda não foi puxado.

## Output

```
Disponíveis no KOD.AI v<X> (não instalados aqui):

PACKS POR CATEGORIA:

dev/ (5 packs disponíveis):
- frontend-mobile (FUNCIONAL, freemium-low)
- multi-tenant (DRAFT, free)
- ...

ia/ (4 packs):
- rag (DRAFT, freemium-mid)
- ...

marketing/ (8 packs):
[lista]

CONTEXTOS-DOMÍNIO (5 não instalados):
- advocacia
- fotografos
- ...

Pra puxar: /adicionar-pack <nome> ou /atualizar-kodai (puxa todos aplicáveis ao seu perfil)
```

## Regras

- Mostrar status (STUB | DRAFT | FUNCIONAL | BATTLE-TESTED | PARKED) de cada
- Indicar custo (`cost-to-run`) pra packs que entregam produto
- Marcar com ⭐ os packs FUNCIONAL/BATTLE-TESTED (recomendados)
- Não listar packs PARKED (a não ser que usuário peça "incluir parked")
