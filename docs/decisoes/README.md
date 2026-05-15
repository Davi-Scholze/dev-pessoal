# Decisões de Arquitetura (ADR)

> Architecture Decision Records — registro das decisões técnicas relevantes.
> Uma decisão por arquivo. Nunca apagar — deprecar quando superada.

## Índice

| ID | Título | Data | Status |
|----|--------|------|--------|
| ADR-001 | Adoção do SCHOLZE-STACK como sistema operacional de IA | 2026-05-15 | Ativo |

---

## Template de ADR

Criar novo arquivo: `docs/decisoes/ADR-XXX-titulo-kebab.md`

```markdown
# ADR-XXX — Título da Decisão

**Data:** YYYY-MM-DD
**Status:** Proposto | Aceito | Depreciado | Substituído por ADR-XXX
**Contexto:**
[O problema ou situação que motivou esta decisão]

**Decisão:**
[O que foi decidido e por quê]

**Consequências:**
- Positivas: [o que melhora]
- Negativas: [trade-offs aceitos]
- Neutras: [o que muda sem ser melhor ou pior]

**Alternativas consideradas:**
- [Alternativa A] — descartada porque [razão]
- [Alternativa B] — descartada porque [razão]
```

---

## ADR-001 — Adoção do SCHOLZE-STACK

**Data:** 2026-05-15
**Status:** Ativo

**Contexto:** A pasta-mãe `Projetos Dev Pessoais` cresceu organicamente sem um sistema padronizado de agentes, skills, hooks e documentação. Cada projeto reinventava configurações similares.

**Decisão:** Adotar o SCHOLZE-STACK (20 seções) como sistema operacional de IA para toda a pasta-mãe. Estrutura de 3 camadas: Global (`~/.claude/`) → Pasta-mãe (`.claude/`) → Projeto (`.claude/` local).

**Consequências:**
- Positivas: 18 agentes especializados reutilizáveis, hooks de enforcement automáticos, skills padronizadas, documentação gerada
- Negativas: overhead inicial de configuração, curva de aprendizado do sistema
- Neutras: compatibilidade com estrutura de projetos existente (decon, dojo, lar-antonia)

**Alternativas consideradas:**
- Manter configuração ad-hoc — descartada por falta de padronização e reusabilidade
- Usar apenas global `~/.claude/` — descartada por falta de isolamento por projeto
