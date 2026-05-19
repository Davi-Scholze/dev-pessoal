---
name: trocar-perfil
description: >
  Muda o perfil de instalação deste projeto (com diff prévio dos packs).
  Use sempre que o usuário disser "trocar perfil", "/trocar-perfil",
  "esse projeto virou outra coisa", "agora é tech-saas não é mais
  servico-b2b", "muda pra perfil X".
allowed-tools: [Read, Write, Bash]
---

# /trocar-perfil <novo-perfil>

## Workflow

1. **Ler perfil atual** de `KODAI-INSTALADO.md`
2. **Validar novo perfil** existe em `<KODAI>/0-INSTALACAO/perfis/`
3. **Calcular diff:**
   - Packs que SAEM (no perfil atual, não no novo)
   - Packs que ENTRAM (no novo perfil, não no atual)
   - Customizações locais mantidas (independente do perfil)
4. **Mostrar diff ao usuário:**
   ```
   Trocar perfil servico-b2b → tech-saas

   SAEM: (5 packs)
   - comercial/propostas
   - comercial/contratos
   - ...

   ENTRAM: (8 packs)
   + dev/multi-tenant
   + dev/backend
   + ...

   MANTIDOS (customizações locais):
   - ia/agente-ia-humanizado (você adicionou manualmente)

   Aplicar? (sim | cancelar | só os que ENTRAM | só remover os que SAEM)
   ```
5. **Aplicar** mudanças aprovadas
6. **Atualizar `KODAI-INSTALADO.md`** com novo perfil
7. **Commit:**
   ```bash
   git commit -m "chore(kodai): trocar perfil <antigo> → <novo>"
   ```

## Regras

- **Sempre mostrar diff antes** — troca de perfil é mudança grande
- **Preservar customizações locais** por padrão
- Permitir aplicar parcialmente (só entrar, só sair, ambos)
