# Contexto Bruto — Fluxos de Desenvolvimento e Testes
> Recebido em: 2026-05-13
> Status: BRUTO — não processar sem aprovação explícita
> Origem: onboarding de conhecimento enviado pelo Davi na sessão de 2026-05-13
> Aplicável a: todos os projetos
> ⚠️ INCOMPLETO — seção 7 (Índice Navegável) foi truncada antes do conteúdo
> Status: aceito como está — não será complementado. Blocos 1-6 estão completos e suficientes.

---

# BLOCO 1 — FLUXOS COM IA (Claude Code, Cursor, Copilot)

Ciclo padrão emergente:
1. **Fundação** — CLAUDE.md na raiz com arquitetura, stack, convenções, comandos, regras. /init para auto-documentar. /clear ou /compact entre tarefas.
2. **Explorar** — Plan Mode (somente leitura). Agente lê, não altera.
3. **Planejar** — Agente entrega plano detalhado. Humano revisa ANTES da execução.
4. **Implementar → Revisar → Verificar** — loop: gera → testa → humano revisa diff → bugs devolvidos ao agente.

Sub-padrões:
- TDD com IA: testes primeiro, produção só quando testes falham
- BMAD (Breakdown, Map, Act, Deliver): épicos multi-arquivo
- Plan Mode: tarefas focadas
- Sessões paralelas: múltiplos Claudes para experimentos isolados
- Sub-agentes especializados (segurança, refatoração, docs)
- MCP servers: Linear, Sentry, GitHub, banco, memória persistente
- Skills: pacotes reutilizáveis de instruções

Princípio: desenvolvedor vira ORQUESTRADOR.

---

# BLOCO 2 — SDLC CLÁSSICO

7 fases: Planejamento → Viabilidade → Design → Implementação → Testes → Deploy → Manutenção

Modelos:
- Waterfall: linear, escopo fixo
- Iterativo: versões funcionais incrementais
- V-Model: cada fase de dev tem fase de verificação (regulados: médico, aeroespacial)
- Agile (Scrum/Kanban/Scrumban): dominante em apps web/mobile
- DevOps: CI/CD + automação + IaC sobre os demais

Scrum: sprints + backlog + planning + daily + review + retrospectiva
Kanban: fluxo contínuo, limites de WIP

Pipeline CI/CD moderno:
commit → build → unit tests → integração → análise estática (SonarQube/CodeQL) → E2E em staging → deploy canário/blue-green → monitoramento (Datadog/Sentry)

DevSecOps: SAST + DAST + SCA + secret scanning + assinatura de código

Mobile: feature flags, A/B testing, TestFlight/Play Console internal track, device farms (BrowserStack, Firebase Test Lab)
Desktop: Electron/Tauri/Qt, auto-update (Squirrel/Sparkle), telemetria opt-in, testes de instalação

---

# BLOCO 3 — MAPEAMENTO DE TESTES

Pirâmide (Mike Cohn → Fowler): muitos unitários na base, poucos E2E no topo.
Anti-padrão: "ice-cream cone" (muitos manuais/E2E, poucos unitários).

Camadas:
- **Unitários**: rápidos, isolados, Arrange-Act-Assert, mocks para colaboradores lentos
- **Integração estreita**: H2 in-memory, Testcontainers, WireMock para HTTP
- **Contrato (CDC)**: Pact — consumidor publica expectativas, provedor executa no pipeline
- **UI**: React Testing Library, Vue Test Utils, Playwright Component, Appium, WinAppDriver
- **E2E**: Selenium, Cypress, Playwright, WebDriverIO — manter número MÍNIMO, só jornadas críticas
- **Aceitação/BDD**: Cucumber, SpecFlow, Behave (opcional)
- **Performance**: JMeter, k6, Gatling
- **Smoke**: sanidade pós-deploy
- **Exploratório**: sessões manuais de até 2h com escopo definido
- **Segurança**: OWASP ZAP, Burp Suite, fuzzing

Shift-Left: unit + SAST em cada push; integração em cada PR; E2E e load em stages posteriores.

Ordem prática:
static (lint, format, type-check) → unit → integração estreita → contrato → build → smoke em staging → E2E mínimos → performance/security noturnos → deploy canário → monitoramento e SLOs

---

# BLOCO 4 — CONVERGÊNCIA IA + CLÁSSICO

IA NÃO substitui SDLC nem a pirâmide — ela os ACELERA.
- CLAUDE.md = documentação viva de arquitetura
- Plan Mode = fase de design
- Loop "código → revisão → verifica" = ciclo Red-Green-Refactor do TDD
- Suíte de testes confiável é PRÉ-REQUISITO para o agente produzir código mergeable

---

# BLOCO 5 — FONTES DE REFERÊNCIA

- Claude Code Docs: code.claude.com/docs
- Anthropic Engineering blog: anthropic.com/engineering
- Atlassian Agile Coach: atlassian.com/agile
- Martin Fowler: martinfowler.com
- Thoughtworks Tech Radar: thoughtworks.com/radar
- GitLab CI/CD: about.gitlab.com/topics/ci-cd
- SonarSource: sonarsource.com
- Datadog blog: datadoghq.com/blog
- OWASP: owasp.org
