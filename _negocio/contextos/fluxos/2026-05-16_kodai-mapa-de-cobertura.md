# KOD.AI — O que tem hoje + o que falta

> Fluxo promovido de [bruto/2026-05-16_kodai-estrutura-e-contextos.md](../bruto/2026-05-16_kodai-estrutura-e-contextos.md). Auditado em `KODAI/` v0.2.0-camada1.
> Legenda: ✅ pronto e usável · ⚠️ só estrutura (vazio, STUB)

---

## PARTE A — O que o KOD.AI JÁ oferece

### Instalação e gestão (Camada 0) — ✅

- Instalar em projeto **novo** (do zero, entrevista guiada)
- Instalar em projeto **existente** (adapta ao que já existe, não sobrescreve)
- BOOTSTRAP único que auto-detecta o tipo de pasta
- 4 perfis prontos: `profissional-liberal`, `tech-saas`, `educacao`, `completo` (+6 planejados)
- Skills de gestão: `/instalar`, `/atualizar-kodai`, `/adicionar-pack`, `/remover-pack`, `/listar-disponiveis`, `/trocar-perfil`
- Plugin marketplace (10 plugins)
- Taxonomia (regra de onde cada coisa vai)

### Regras e métodos (Camada 1) — ✅

- 12 regras-base inegociáveis (captura de stakeholder, bruto sagrado, sem código sem spec, LGPD em formulário, zero credencial, acessibilidade WCAG, commit a cada passo, mobile-first, política de commits, honestidade em claims, ciclo UI, `/complete` antes de "done")
- Metodologia SDD: `/spec` → `/break` → `/plan` → `/execute` → `/review` → `/complete` → `/context`
- Metodologia slice / fluxo / visão
- Ciclo UI: ver → analisar → propor → testar → reportar
- Workflow `/complete` com Evidence Bloc (prova antes de declarar pronto)
- Políticas: commits, imagens, LGPD, captura de stakeholder

### Skills universais (Camada 1) — ✅

- Rotina: `/abrir`, `/salvar`, `/atualizar`, `/check-in`, `/capturar`, `/mapear-rotinas`, `/ver`
- Criação: `/criar-pack`, `/criar-contexto`, `/criar-perfil`
- `/capturar-contexto-cliente` — pesquisa fresca por cliente (Chrome → Google Doc → NotebookLM)

### Templates (Camada 1) — ✅

- Template de pasta-mãe e de projeto-solo
- Template de memória: empresa, estratégia, preferências, identidade/design

### Captura de contexto de domínio (Camada 3) — ✅

- Mecanismo de captura por cliente (não entrega domínio pronto — pesquisa fresco)
- Template de contexto

### Capacidades técnicas — packs (Camada 2) — ⚠️ TODAS VAZIAS (STUB)

13 categorias desenhadas, **0 preenchidas**:

- `dev/` — frontend-web, frontend-mobile, backend, banco-dados, multi-tenant, testes, deploy
- `ia/` — agentes-humanizados, rag, mcp-builder, prompting, skills-claude-code
- `integracoes/` — google-ads, ga4, meta-ads, instagram-graph, whatsapp-business, email, crm
- `dados/` — etl-pipelines, bigquery, supabase-migrations, power-bi, planilhas
- `documentos/` — docx, pdf, pptx, xlsx, doc-coauthoring
- `negocio-br/` — lgpd, billing-pix, nfse, contabilidade-integracao, juridico-contratos
- `operacao/` — deploy-vps, observabilidade, backup, monitoramento
- `seguranca/` — secrets-management, auth-flows, rls-supabase, lgpd-compliance, pentest-basico
- `comercial/` — propostas, precificacao, contratos, vendas-consultivas, captacao-clientes
- `marketing/` — conteudo-ig, carroseis-design, carroseis-codigo, reels-stories, copywriting, seo, trafego-pago, ads-audit
- `midia/` — producao-video, producao-imagem, mockups, thumbnails
- `design/` — design-system, identidade-visual, web-design-ref
- `atendimento/` — chatbot, helpdesk, nps-feedback

---

## PARTE B — O que FALTA (o que Davi disse que precisa ter)

> Status 2026-05-16: 🧱 = slot de estrutura criado (STUB, conteúdo pendente) · 📦 = já tem slot em pack existente (não duplicado) · ✍️ = conteúdo, fase posterior

- 🧱 Metodologia "Harness Engineer" — slot criado, **definição pendente** (Davi adiou) → `1-ESQUELETO/metodologias/harness-engineer.md`
- 🧱 Metodologia de testes (backend e frontend, 8 dimensões cada) → `1-ESQUELETO/metodologias/testes.md`
- 📦 Diretrizes fiscais — já coberto por pack `negocio-br/` (nfse, contabilidade-integracao) — não duplicado
- 🧱 Alertas de desvio/risco → `1-ESQUELETO/politicas/alertas-risco.md`
- 🧱 Taxonomia de análise de contexto bruto (7 lentes) → `1-ESQUELETO/metodologias/analise-de-contexto.md`
- 🧱 Regras de comportamento (humano/sistemas/arquivos) — consolidação → `1-ESQUELETO/comportamento.md`
- 🧱 Metodologia de economia de tokens → `1-ESQUELETO/metodologias/economia-de-tokens.md`
- 📦 Criação de agentes de IA (chatbot/controle/agendamento) — já coberto por packs `ia/` + `atendimento/` — não duplicado
- 🧱 Metodologia de limpeza/criação de estrutura → `1-ESQUELETO/metodologias/limpeza-de-estrutura.md`
- 📦 Conteúdo universal de marketing/ads/analytics/social — slots em `marketing/` + `integracoes/` (Parte A)
- ✍️ Preencher os 13 packs vazios + os 7 STUBs novos com conteúdo utilizável — **fase posterior** (depois da estrutura boa, decisão de Davi)

**Resumo da rodada 2026-05-16:** 7 slots de estrutura criados (🧱), 3 itens não duplicados por já terem slot (📦), preenchimento de conteúdo adiado por decisão de Davi (✍️).
