# Regras de Sessão — Projetos Dev Pessoais
> Leia este arquivo no início de TODA sessão, em QUALQUER projeto.
> Complemento operacional do CLAUDE.md.
> Última atualização: 2026-05-25

---

## Check-in obrigatório (primeira mensagem de toda sessão)

```
Projeto: [nome]
Spec ativa: [nome] | nenhuma spec ativa
Status: [X]% concluído
Bloqueios: [lista | nenhum]
```

---

## Regras de Comportamento

### 1. Contexto antes de código
- Leia `_negocio/MAPA.md` antes de qualquer arquivo de projeto
- Nunca escale para documentos completos se o mapa já responde

### 2. Contexto bruto = guardar, não processar
- Qualquer contexto que chegar em sessão → salvar em `_negocio/contextos/bruto/YYYY-MM-DD_descricao.md` imediatamente
- Nunca usar como base para código sem promover a `fluxos/` com OK do Davi
- Formato de promoção: bruto → fluxos → spec → código

### 3. SDD é obrigatório para qualquer mudança
- Nunca iniciar código sem: `/spec` → aprovação → `/break` → `/plan` → `/execute` → `/review`
- Spec é contrato — o que não está na spec não implementa

### 4. Passo a passo com aprovação
- Nunca avançar para próxima etapa sem OK explícito do Davi
- Em mudanças visuais: ver → analisar → propor → testar → reportar

### 5. Agentes especializados primeiro
Antes de resolver manualmente, verificar se há um agente em `.claude/agents/`:

**Fluxo padrão:** `master-orchestrator` → classifica → despacha para o agente certo

| Tarefa | Agente |
|--------|--------|
| Feature nova (qualquer) | `master-orchestrator` → `planner` → agente especializado |
| Decisão de schema/API | `backend-architect` (Opus) |
| Componente React/UI | `frontend-designer` |
| Migration/RLS | `db-engineer` |
| Integração externa | `integration-engineer` |
| Feature mobile | `mobile-engineer` |
| Review de PR | `code-reviewer` + `security-guardian` |
| Arquivo > 400 linhas | `refactor-surgeon` (Opus) |
| PR com dados de usuário | `lgpd-auditor` |
| Testes ausentes | `test-architect` |
| Deploy/CI/CD | `devops-engineer` |

### 6. Skills estruturadas (`.claude/skills/`)
Verificar antes de resolver manualmente:

| Domínio | Skills disponíveis |
|---------|-------------------|
| Dev base | `spec-driven-dev`, `git-flow-strict`, `conventional-commits`, `code-review-checklist`, `debug-systematic`, `refactor-safely` |
| Frontend | `design-tokens`, `tailwind-shadcn-scaffold`, `responsive-mobile-first`, `accessibility-axe` |
| Backend | `api-design-rest`, `db-schema-postgres-rls`, `edge-function-supabase` |
| Mobile | `expo-scaffold`, `react-native-nativewind` |
| Segurança/LGPD | `secrets-scan`, `lgpd-ripd`, `lgpd-dsr-endpoint` |
| Testes | `vitest-unit`, `e2e-runner` |

### 7. Hooks ativos (enforcement automático)
Os hooks em `.claude/hooks/` rodam automaticamente:

| Hook | Quando roda | O que faz |
|------|------------|-----------|
| `block-dangerous.py` | Antes de todo Bash | Bloqueia `rm -rf`, `DROP TABLE`, force push para main |
| `route-model.py` | Antes de todo Bash | Sugere modelo correto (informativo, não bloqueia) |
| `check-design-tokens.py` | Pre-commit | Detecta cores hardcoded (`#xxx`, `rgb()`) |
| `check-secrets.py` | Pre-commit | Detecta credenciais no diff (Stripe, Google, AWS) |
| `run-tests.sh` | Pre-push | Avisa para rodar lint + testes antes do push |
| `check-lgpd.py` | Pre-push | Alerta sobre campos PII sem docs LGPD |
| `log-metrics.py` | Após todo tool-use | Grava uso em `~/.claude/metrics.jsonl` |
| `observability.py` | Após todo tool-use | Placeholder WebSocket (futura integração) |

### 8. Prioridade de projetos
1. **Decon** — retorno mais rápido, impacto direto na Denize
2. **Dojô** — segundo após Decon estável
3. **Lar Antônia** — manutenção apenas, sem novas features

### 9. Perfil da Denize (usuária final do Decon)
- Resistente a tecnologia, se perde com mudanças
- Abordagem: devagar, simples, segura
- Automações devem ser seguíveis por ela sozinha
- Nunca mudar coisas que ela já aprendeu sem avisar

### 10. Segurança (inegociável)
- Zero credenciais no código — sempre `.env`
- LGPD em todos os formulários: honeypot + timer 3s + disclaimer
- Webhooks de pagamento: validar assinatura antes de processar
- Dados de cartão: nunca logar ou salvar CVV

### 11. Commits (padrão)
```
tipo(escopo): descrição curta em português, imperativo

tipos: feat | fix | docs | style | refactor | test | chore
```
Ver `docs/padroes/commits.md` para guia completo.

### 12. Handoff ao encerrar
- Pausa visual: explicar o que foi feito + pedir OK
- Após OK: commit + push
- Atualizar `_negocio/contextos/CONTEXTO_GERAL.md`
- Identificar próxima task e entregar handoff

---

## MCPs disponíveis

**Tier 1 (ativos):** filesystem, github, git, memory — ver `.mcp.json`
**Tier 2 (marketing):** Google Ads MCP, Meta Ads MCP, Puppeteer — ver `AGENTS.md`

---

## Orientação de Negócio (quando Davi perguntar o que fazer)

1. **Decon primeiro** — maior retorno imediato, impacto direto na Denize
2. **Se Decon estável** → avançar Dojô (fase de planejamento)
3. **Para novos clientes** → `/scholze-novo-cliente`
4. **Para gerar conteúdo** → `/content-creator` (carrosséis sem Canva)
5. **Para auditar anúncios** → `/ads-audit` (10 workflows prontos)
6. **Para vender sistemas** → ver `AGENTS.md` (benchmarks e fórmula de proposta)

---

## Contextos disponíveis

| O que preciso | Onde fica |
|---------------|-----------|
| Visão geral rápida | `_negocio/MAPA.md` |
| Regras de IA | `CLAUDE.md` |
| Estado de todos os projetos | `_negocio/contextos/CONTEXTO_GERAL.md` |
| Skills estruturadas | `.claude/skills/` |
| Skills invocáveis (Claude Code) | `_dev/ferramentas/skills/CATALOGO.md` |
| Contexto bruto não processado | `_negocio/contextos/bruto/` |
| Fluxos aprovados para dev | `_negocio/contextos/fluxos/` |
| NotebookLMs | `_negocio/contextos/notebooklm/README.md` |
| Integrações (Google/Supabase/Stripe) | `_negocio/contextos/integracao-*.md` |
| Playbooks e padrões | `docs/playbooks/`, `docs/padroes/` |
| Decisões de arquitetura | `docs/decisoes/README.md` |

---

## Bibliotecas de conhecimento (_negocio/contextos/bruto)

| Biblioteca | Arquivo |
|-----------|---------|
| Web Design Internacional | `2026-05-13_biblioteca-web-design-internacional.md` |
| Software Gestão de Dojos | `dojo/2026-05-13_biblioteca-software-gestao-dojo.md` |
| Portais Contábeis Internacionais | `decon/2026-05-13_biblioteca-portais-contabeis-internacionais.md` |
| Claude Code Skills | `2026-05-13_biblioteca-claude-code-skills.md` |
| Agentes de IA | `2026-05-13_biblioteca-agentes-ia.md` |
| Pagamentos BR/Internacional | `2026-05-13_biblioteca-pagamentos-br-internacional.md` |
| Tráfego Pago com IA | `2026-05-13_biblioteca-trafego-pago-ia.md` |
| Google Integrations | `2026-05-14_biblioteca-google-integrations.md` |
| **SCHOLZE-STACK** | `2026-05-15_scholze-stack-sistema-mestre.md` |
