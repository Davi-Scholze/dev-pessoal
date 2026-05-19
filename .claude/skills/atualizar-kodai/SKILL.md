---
name: atualizar-kodai
description: >
  Compara KOD.AI instalado neste projeto com upstream e propõe atualizações
  de packs/contextos/perfis. Aplica diffs item por item após aprovação.
  Use sempre que o usuário disser "atualizar KODAI", "/atualizar-kodai",
  "pegar versão nova", "sync com upstream", "tem coisa nova?", ou periodicamente
  pra puxar evoluções.
allowed-tools: [Read, Write, Bash, Glob]
---

# /atualizar-kodai — Sync com upstream

## Workflow

### Passo 1: Ler procedência

Ler `KODAI-INSTALADO.md` deste projeto:
- Versão instalada
- Perfil
- Packs ativos (com versões)
- Contextos ativos (com versões)
- Upstream path/URL

### Passo 2: Ler upstream

Acessar pasta/repo KOD.AI upstream:
- `VERSION` atual
- `2-PACKS/META-INDEX.md` (lista atual de packs)
- `3-CONTEXTOS-DOMINIO/META-DOMINIOS.md` (lista atual)

### Passo 3: Calcular diff

Comparar:
- **Versão KOD.AI:** se upstream > local, mostrar changelog
- **Packs novos no perfil**
- **Packs atualizados**
- **Contextos novos**
- **Perfis novos**
- **Itens PARKED**

### Passo 4: Apresentar diff

```
KOD.AI Update Available
=======================
Local:    v0.1.0-camada1
Upstream: v0.2.0

Mudanças aplicáveis ao seu perfil 'profissional-liberal':

NOVOS PACKS:
+ negocio-br/asaas (DRAFT, freemium-low)
+ atendimento/nps-feedback (STUB)

ATUALIZADOS:
~ ia/agente-ia-humanizado v0.3 → v0.5

PARKED upstream (considerar remover localmente):
! marketing/podcast-producao

Quer aplicar? (todos | escolher | nenhum)
```

### Passo 5: Aplicação seletiva

Se usuário escolhe "todos" ou subset:
- Copiar arquivos novos do upstream
- Atualizar arquivos existentes (preservar customizações locais)
- Atualizar `KODAI-INSTALADO.md`
- Commit no projeto consumidor

### Passo 6: Reportar

```
✓ Aplicadas N mudanças.
✗ N customizações locais preservadas.
✓ Commit criado.

Próximo passo: rodar /atualizar pra reconciliar _memoria.
```

## Regras

- **NUNCA sobrescrever customizações locais sem perguntar**
- Mostrar diff completo antes de aplicar
- Permitir rollback (commit dedicado pra `git revert`)
- Se upstream local não acessível, instruir como puxar manualmente

## Falhas conhecidas

- Conflito entre customização local e update upstream: parar e pedir resolução manual
- Pack deletado do upstream: avisar; manter local se ainda em uso
