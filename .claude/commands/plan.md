# /plan — Pipeline SDD canônico KOD.AI (3/6)

Invoque a Skill universal KOD.AI `plan` via Skill tool. NÃO use o command global legado.

Skill 3/6 do pipeline: recebe tasks de `/break` e produz plano executável com ordem cronológica + paralelismo + checkpoints + critérios de Stop.

Input do usuário: $ARGUMENTS

Ação: invoque `Skill(skill="plan", args="$ARGUMENTS")`.
