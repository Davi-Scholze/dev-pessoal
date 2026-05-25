# /complete — Pipeline SDD canônico KOD.AI (6/6)

Invoque a Skill universal KOD.AI `complete` via Skill tool.

Skill 6/6 (fechamento) do pipeline. **Iron Law:** produz Evidence Bloc obrigatório (timestamp + comando rodado + output literal + critério de sucesso + resultado). Atualiza status da spec → "implementado". Atualiza handoff pra próxima sessão.

Esta é a única forma legítima de declarar feature "done" no KOD.AI.

Input do usuário: $ARGUMENTS

Ação: invoque `Skill(skill="complete", args="$ARGUMENTS")`.
