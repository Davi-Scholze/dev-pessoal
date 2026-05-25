# /break — Pipeline SDD canônico KOD.AI (2/6)

Invoque a Skill universal KOD.AI `break` via Skill tool. NÃO use o command global legado.

Skill 2/6 do pipeline: decompõe spec aprovada em tasks atômicas comitáveis (cada task = 1 commit, regra-base 7).

Input do usuário: $ARGUMENTS

Ação: invoque `Skill(skill="break", args="$ARGUMENTS")`.
