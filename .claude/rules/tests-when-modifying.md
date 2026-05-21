---
tipo: rule
eixo: orchestration
escopo: "**/*.test.{ts,js,py,rb,go,rs},**/*.spec.{ts,js},**/tests/**/*"
versão: 1.0
atualizado: 2026-05-20
fontes:
  - 1-ESQUELETO/skills-universais/test-driven-development/SKILL.md
  - 1-ESQUELETO/metodologias/testes.md
related:
  - ../../1-ESQUELETO/skills-universais/test-driven-development/SKILL.md
  - ../../1-ESQUELETO/metodologias/testes.md
  - ../../1-ESQUELETO/skills-universais/verification-before-completion/SKILL.md
---

# Regra: TDD ao editar/criar teste

## Quando se aplica

Qualquer arquivo de teste — `.test.{ts,js,py,rb,go,rs}`, `.spec.{ts,js}`, ou qualquer arquivo dentro de `tests/`.

## O que fazer

1. **RED** — escrever teste mínimo que descreve o comportamento desejado
2. **Verificar RED** — rodar comando de teste e CONFIRMAR que falha pelo motivo certo (não erro de import/sintaxe)
3. **GREEN** — escrever código mínimo que faz o teste passar (sem over-engineering, sem features extras)
4. **Verificar GREEN** — rodar de novo; confirmar teste passa **e** outros não quebraram
5. **REFACTOR** — limpar duplicação / nomes / extrair helpers — sem mudar comportamento; testes permanecem verdes
6. Próximo ciclo: próximo teste/comportamento

## O que NÃO fazer

- Escrever código **antes** do teste (Iron Law da skill TDD: apaga código, começa de novo)
- Adicionar teste "depois pra cobrir" — testes-after passam imediatamente e não provam que testam a coisa certa
- Pular o passo "verificar RED" — se não viu o teste falhar, não sabe se ele testa algo
- Manter código antigo "como referência" enquanto escreve teste primeiro — adaptação contamina

## Antipadrões relacionados

- **#5 Prioridades contraditórias** — "ser pragmático" não vence Iron Law; TDD **é** pragmático (mais rápido que debugar em produção)
- **#1 Sem comando acionável** — esta regra tem comandos explícitos por linguagem (`npm test`, `pytest`, `cargo test`, `go test ./...`)

## Exceções (com permissão do decisor humano)

- Protótipos descartáveis
- Código gerado (codegen)
- Arquivos de configuração

Pra qualquer outra coisa, **sem exceção**.

## Skill irmã + metodologia

- `skills/test-driven-development/` — ciclo Red-Green-Refactor completo + 11 racionalizações refutadas
- `metodologias/testes.md` — 4 níveis (smoke/sprint/regression/full) + 5 invioláveis + status honesto
- `skills/verification-before-completion/` — Iron Law antes de declarar "testes passam"
