# /review — Pipeline SDD canônico KOD.AI (5/6)

Invoque a Skill universal KOD.AI `review` via Skill tool. NÃO use o command global legado.

Skill 5/6 do pipeline: revisão pré-merge contra spec + quality gates declarados no manifest.

Input do usuário: $ARGUMENTS

Ação: invoque `Skill(skill="review", args="$ARGUMENTS")`.
