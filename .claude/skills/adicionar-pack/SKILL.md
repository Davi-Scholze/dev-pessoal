---
name: adicionar-pack
description: >
  Adiciona pack do upstream KOD.AI que não veio no perfil de instalação
  inicial. Use sempre que o usuário disser "adiciona pack X", "/adicionar-pack",
  "preciso de X mas não veio", "instala pack X aqui", "trazer marketing pra esse projeto", etc.
allowed-tools: [Read, Write, Bash]
---

# /adicionar-pack <nome-do-pack>

## Workflow

1. **Validar pack existe upstream**
   - Procurar em `<KODAI>/2-PACKS/packs/<categoria>/<nome>/`
   - Se não encontrado: listar packs com nome similar e sugerir
2. **Conferir compatibilidade com perfil atual**
   - Ler `KODAI-INSTALADO.md` pra saber perfil
   - Verificar `applicable-profiles` do pack alvo
   - Se pack NÃO está em applicable-profiles do perfil, avisar mas permitir (com confirmação)
3. **Conferir dependências**
   - Ler `dependencies.packs` do SKILL.md do pack alvo
   - Verificar quais já estão instalados, quais precisam ser puxados também
   - Se há deps faltando: oferecer puxar todas juntas
4. **Adicionar entry em `packs-ativos.md`**
5. **Atualizar `KODAI-INSTALADO.md`**:
   - Mover pack de "Não instalados" pra "Packs ativos"
   - Marcar em "Customizações locais > Adicionados manualmente"
6. **Commit:**
   ```bash
   git add _dev/ferramentas/packs-ativos.md KODAI-INSTALADO.md
   git commit -m "chore(kodai): adicionar pack <categoria>/<nome>"
   ```

## Regras

- Pack puxado mantém versão upstream atual
- Customizações locais (modifications to pack files) sempre em commit separado
