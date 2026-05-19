---
name: remover-pack
description: >
  Remove pack do projeto cliente (mantém disponível no upstream). Use sempre
  que o usuário disser "remove pack X", "/remover-pack", "não preciso mais
  de X", "tira esse pack", "esse não se aplica aqui".
allowed-tools: [Read, Write, Bash]
---

# /remover-pack <nome-do-pack>

## Workflow

1. **Validar pack está instalado** (lendo `packs-ativos.md`)
2. **Conferir dependentes** — outros packs no projeto que declaram dependência do pack a remover
   - Se houver, listar e perguntar: "Pack X depende de <pack a remover>. Remover mesmo assim?"
3. **Remover entry de `packs-ativos.md`**
4. **Atualizar `KODAI-INSTALADO.md`**:
   - Mover pack pra "Não instalados (disponíveis em upstream)"
   - Marcar em "Customizações locais > Removidos do perfil"
5. **Commit:**
   ```bash
   git commit -m "chore(kodai): remover pack <categoria>/<nome>"
   ```

## Regras

- **Nunca deleta arquivos do upstream**, só desativa neste projeto
- Pode ser revertido via `/adicionar-pack`
