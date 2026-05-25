# /execute — Pipeline SDD canônico KOD.AI (4/6)

Invoque a Skill universal KOD.AI `execute` via Skill tool. NÃO use o command global legado.

Skill 4/6 do pipeline: executa tasks do plano com commits granulares (1 task = 1 commit). Aborta no primeiro fail respeitando stop-criteria.

Input do usuário: $ARGUMENTS

Ação: invoque `Skill(skill="execute", args="$ARGUMENTS")`.
