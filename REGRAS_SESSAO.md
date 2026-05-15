# Regras de Sessão — Projetos Dev Pessoais
> Leia este arquivo no início de TODA sessão, em QUALQUER projeto.
> É o complemento operacional do CLAUDE.md.
> Última atualização: 2026-05-13

---

## Check-in obrigatório (primeira mensagem de toda sessão)

```
Projeto: [nome]
Spec ativa: [nome] | nenhuma spec ativa
Status: [X]% concluído
Bloqueios: [lista | nenhum]
```

---

## Regras de Comportamento (todas as sessões devem seguir)

### 1. Contexto antes de código
- Leia `MAPA_PESSOAL.md` antes de qualquer arquivo de projeto
- Para projetos: leia o `MAPA_DO_PROJETO.md` antes do `CONTEXTO_IA_GESTOR.md`
- Nunca escale para documentos completos se o mapa já responde

### 2. Contexto bruto = guardar, não processar
- Qualquer contexto que chegar em sessão (mensagem longa, áudio transcrito, ideia) → salvar em `contextos/bruto/YYYY-MM-DD_descricao.md` imediatamente
- Nunca usar como base para código sem promover a `fluxos/` com OK do Davi
- Formato de promoção: bruto → fluxos → spec → código

### 3. SDD é obrigatório para qualquer mudança
- Nunca iniciar código sem: `/spec` → aprovação → `/break` → `/plan` → `/execute` → `/review`
- Spec é contrato — o que não está na spec não implementa

### 4. Passo a passo com aprovação
- Nunca avançar para próxima etapa sem OK explícito do Davi
- Em mudanças visuais: ver → analisar → propor → testar → reportar (sempre com Playwright)

### 5. Skills primeiro
Antes de resolver manualmente, verificar se existe skill:

**Desenvolvimento**
- Mobile → `/mobile-dev`
- Interface web → `/frontend-design`
- Testes/browser → `/playwright-testing`
- Agentes IA → `/agentes-ia`
- Revisão de código → `/code-review`
- Commits → `/git-flow`

**Negócio / Marketing**
- Pagamentos → `/payments-br`
- Tráfego pago → `/trafego-pago`
- Auditoria de Ads → `/ads-audit`
- Carrosséis Instagram → `/content-creator`

**Design e Referência**
- Referências design → `/web-design-ref`
- Diagramas → `/excalidraw-diagram`
- UIs especiais → `/antigravity`

**Produtividade**
- Documentos Google → `/google-workspace`
- NotebookLM → `/notebooklm`
- Backup de sessão → `/backup-sessao`
- Browser de dev → `/dev-browser`

### 6. Prioridade de projetos
1. **Decon** — retorno mais rápido, impacto direto na mãe (Denize)
2. **Dojô** — segundo após Decon estável
3. **Lar Antônia** — manutenção apenas, sem novas features

### 7. Perfil da Denize (usuária final da Decon)
- Resistente a tecnologia, se perde com mudanças
- Abordagem: devagar, simples, segura
- Automações devem ser seguíveis por ela sozinha
- Nunca mudar coisas que ela já aprendeu sem avisar

### 8. Segurança (inegociável)
- Zero credenciais no código — sempre `.env`
- LGPD em todos os formulários: honeypot + timer 3s + disclaimer
- Webhooks de pagamento: validar assinatura antes de processar
- Dados de cartão: nunca logar ou salvar CVV

### 9. Commits (padrão)
```
tipo(escopo): descrição curta em português, imperativo

tipos: feat | fix | docs | style | refactor | chore
```

### 10. Handoff ao encerrar
- Pausa visual: explicar o que foi feito + pedir OK
- Após OK: commit + push
- Atualizar `SESSAO_BACKUP.md` do projeto
- Identificar próxima task e entregar handoff

---

## MCPs disponíveis

| MCP | Quando usar |
|-----|------------|
| GitHub MCP | PRs, CI/CD, code review automatizado |
| Puppeteer MCP | Gerar carrosséis, screenshots de sites |
| Fetch MCP | Buscar conteúdo web para análise |
| Google Ads MCP | Auditoria e otimização de campanhas |
| Meta Ads MCP | Auditoria Facebook/Instagram Ads |

Ver `AGENTS.md` para instalação e tier completo de MCPs.

---

## Orientação de Negócio (quando Davi perguntar o que fazer)

Se não há task de código ativa, orientar Davi para:

1. **Decon primeiro** — maior retorno imediato, impacto direto na Denize
2. **Se Decon estável** → avançar Dojô (fase de planejamento)
3. **Para novos clientes** → usar template em `ferramentas/templates/cliente-novo/`
4. **Para gerar conteúdo** → `/content-creator` (carrosséis sem Canva)
5. **Para auditar anúncios** → `/ads-audit` (10 workflows prontos)
6. **Para vender sistemas** → Ver `AGENTS.md` (benchmarks e fórmula de proposta)

---

## Contextos disponíveis (onde está o quê)

| O que preciso | Onde fica |
|---------------|-----------|
| Visão geral rápida | `MAPA_PESSOAL.md` |
| Regras de IA | `CLAUDE.md` |
| Estado de todos os projetos | `contextos/CONTEXTO_GERAL.md` |
| Skills disponíveis | `ferramentas/skills/CATALOGO.md` |
| Contexto bruto não processado | `contextos/bruto/` e `[repo]/contextos/bruto/` |
| Fluxos aprovados para dev | `contextos/fluxos/` e `[repo]/contextos/fluxos/` |
| NotebookLMs | `contextos/notebooklm/README.md` |
| Prompts reutilizáveis | `contextos/prompts/` |
| Docs gerais | `docs/INDEX.md` |

---

## Bibliotecas de conhecimento disponíveis (contextos/bruto)

> Estas bibliotecas foram absorvidas e estão prontas para uso quando acionadas.
> Para usar: mencionar o tema ou acionar a skill correspondente.

| Biblioteca | Arquivo | Skill |
|-----------|---------|-------|
| Web Design Internacional | `2026-05-13_biblioteca-web-design-internacional.md` | `/web-design-ref` |
| Software Gestão de Dojos | `dojo/2026-05-13_biblioteca-software-gestao-dojo.md` | (consultar direto) |
| Portais Contábeis Internacionais | `decon/2026-05-13_biblioteca-portais-contabeis-internacionais.md` | (consultar direto) |
| Estrutura de Pastas e Projetos | `2026-05-13_biblioteca-estrutura-pastas-projetos.md` | (padrão em todos os repos) |
| Claude Code Skills | `2026-05-13_biblioteca-claude-code-skills.md` | (CATALOGO.md) |
| Agentes de IA | `2026-05-13_biblioteca-agentes-ia.md` | `/agentes-ia` |
| Fluxos de Dev e Testes | `2026-05-13_biblioteca-fluxos-dev-e-testes.md` | (SDD + testes) |
| Pagamentos BR/Internacional | `2026-05-13_biblioteca-pagamentos-br-internacional.md` ⚠️ incompleto | `/payments-br` |
| Tráfego Pago com IA | `2026-05-13_biblioteca-trafego-pago-ia.md` | `/trafego-pago` |
| Agências IA e Sistemas Marketing | `2026-05-13_pesquisa-agencias-ia-sistemas-marketing.md` | `/ads-audit` + `/content-creator` |
| Sistema Produção de Conteúdo | `2026-05-13_referencia-sistema-producao-conteudo.md` | `/content-creator` |
| **Google Integrations** | `2026-05-14_biblioteca-google-integrations.md` | (4 níveis — consultar antes de qualquer integração Google) |
