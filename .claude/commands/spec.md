# /spec — Pipeline SDD canônico KOD.AI (1/6)

Invoque imediatamente a Skill universal KOD.AI `spec` via Skill tool. NÃO use o command SDD legado global em `~/.claude/commands/spec.md` (foi substituído).

Esta é a skill 1/6 do pipeline canônico KOD.AI:

```
spec → break → plan → execute → review → complete
```

Diferenças vs SDD legado: skill universal tem `handoff_in/out`, `quality_gates`, lineage no manifest, e `complete` exige Evidence Bloc (regra-base 12).

Input do usuário: $ARGUMENTS

Ação: invoque `Skill(skill="spec", args="$ARGUMENTS")`.
