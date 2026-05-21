# Contexto Geral — Projetos Dev Pessoais
> Fonte de verdade completa. Atualizar ao fim de cada sessão significativa.
> Para entrada rápida, use _negocio/MAPA.md
> Última atualização: 2026-05-22 (sync KOD.AI 0.6.0-dev + ativação hooks JS)

## Sobre o desenvolvedor

- **Nome:** Davi Pereira Scholze
- **Expertise:** Desenvolvedor especialista em IA, ETL, dados, automação e sistemas web
- **CLT:** Navortech (trackops — rastreamento veicular), seg–sex 08–16
- **Tempo:** extremamente limitado — múltiplos empregos e compromissos simultâneos
- **Ferramenta principal:** Claude Code

---

## Prioridade dos projetos

| Prioridade | Projeto | Motivo |
|-----------|---------|--------|
| 1 | **decon-sistema** | Retorno mais rápido, impacto direto na mãe |
| 2 | **KOD.AI** | Meta-ferramenta estratégica — produto que Davi mais usa e pretende vender |
| 3 | **dojo-familia-scholze** | Potencial SaaS, empresa do pai |
| 4 | **lar-antonia** | Contrato ativo mas baixo potencial de escala |

> KOD.AI é a ferramenta com que todos os outros são construídos. Decon segue
> sendo o de maior ROI imediato; KOD.AI é o de maior valor de longo prazo.

---

## Projeto 1 — Decon Assessoria Empresarial (PRIORIDADE MÁXIMA)

**Repositório:** github.com/Davi-Scholze/decon-sistema
**Local:** `Repositorios/decon-sistema/`
**Stack atual:** React 19 + Vite + Tailwind CSS v3

### O que é
Escritório de contabilidade pequeno da mãe de Davi (Denize). Ela ainda tem outro emprego e quer independência financeira via Decon. Base atual: principalmente psicólogas como clientes. Usa o sistema **Domínio** como software principal de contabilidade.

### Perfil da Denize (cliente/usuária)
- Mais velha, teimosa, resistente a mudanças tecnológicas
- Se perde facilmente quando coisas saem do lugar
- Abordagem obrigatória: muito devagar, simples e segura
- Tentativa anterior de organizar Google Drive: funcionou tecnicamente, mas ela ficou perdida
- Qualquer automação deve ser seguível por ela sozinha

### Visão em fases

**Fase 1 — Automatizar o Domínio (FOCO ATUAL)**
- Mapear todo o sistema Domínio com Claude
- Entender como Denize usa hoje e onde perde tempo
- Automatizar passo a passo de forma que ela consiga seguir sozinha
- Ensinar ela a usar Claude para encontrar documentos e tirar dúvidas
- *Próximo input:* Davi vai transcrever áudio de atendimento real de Denize

**Fase 2 — Sistema web completo**
- Portal para clientes verem informações e tirarem dúvidas
- Atendimento integrado
- Página de captação — nicho: psicólogas
- MVP da landing page: concluído, pendente de assets + deploy

**Fase 3 — Aplicativo mobile**
- Versão mobile do sistema web

### Pendências críticas (site)
- [ ] Assets de marca: `logo.png`, `denize-profile.jpg`, `og-image.jpg`
- [ ] Deploy na Vercel
- [ ] LinkedIn URL real
- [ ] Revogar token GitHub antigo (`ghp_Zht254O3...`)

---

## Projeto 2 — Dojô Família Scholze

**Repositório:** github.com/Davi-Scholze/dojo-familia-scholze
**Local:** `Repositorios/dojo-familia-scholze/`
**Stack:** a definir
**Status:** Novo, sem código

### O que é
Empresa do pai de Davi — fabricação e venda de faixas e kimonos para judô/artes marciais.

### Visão do app
- Controle de alunos e turmas para professores
- Pedidos automáticos para produção dentro do app
- Professores que usam o app ganham desconto nos pedidos
- Futuramente: cobrar mensalidade de outros professores (modelo SaaS)
- Canais de venda: Mercado Livre, Shopee, site oficial

### Primeiro mercado
- Davi dá aula de judô na Neomissão todo sábado 11–12
- Neomissão é o primeiro mercado para testar kimonos/faixas e o app

---

## Projeto 3 — Lar Antônia (menor prioridade)

**Repositório:** clonado localmente
**Status:** Contrato ativo até dez/2026
**Visitas:** toda terça-feira, 30 minutos

### O que é
Sistema criado anteriormente por Davi para o Lar Antônia. Contrato de manutenção.

### Visão futura
- Melhorar o sistema e vender para outros lares de adoção

---

## Projeto 4 — grants-etl-pipeline (trabalho técnico)

**Repositório:** github.com/Davi-Scholze/grants-etl-pipeline (público)
**Local:** `Repositorios/grants-etl-pipeline/`
**Stack:** Python, SQL Server, Power BI
**Status:** Ativo

---

## Projeto 5 — KOD.AI (meta-ferramenta / produto estratégico)

**Repositório:** github.com/Davi-Scholze/kod-ai
**Local:** `KODAI/` — **raiz da pasta-mãe**, NÃO em `Repositorios/`
**Stack:** Markdown + YAML (sistema de regras/skills, não código de app)
**Versão:** v0.5.0 tagged + 0.6.0-dev (sync `e9ea7e6` em 2026-05-22)

### O que é
"Sistema operacional de IA" — base de regras + skills + mecanismo de captura
de contexto que prepara qualquer IA (Claude Code, ChatGPT, Gemini) pra
construir sistemas ponta-a-ponta. É o produto que Davi mais usa e pretende
vender futuramente.

### Arquitetura (4 camadas)
- `0-INSTALACAO/` — BOOTSTRAP + perfis + skills de instalação
- `1-ESQUELETO/` — 12 regras, metodologias, skills universais, templates
- `2-PACKS/` — capacidades técnicas (HOW) — todos STUB ainda
- `3-CONTEXTOS-DOMINIO/` — mecanismo de CAPTURA (não entrega domínio pronto)

### Regra de localização do clone (importante)
- Pasta com vários repos (pasta-mãe) → KOD.AI na **raiz** (irmão dos repos)
- Projeto solo ou do zero → KOD.AI **dentro** do projeto

### Filosofia central (decisão 2026-05-15)
KOD.AI entrega só o **geral**. Conhecimento de negócio específico do cliente
**não vem pronto** — é capturado fresco via skill `/capturar-contexto-cliente`
(pesquisa → Google Doc → NotebookLM). Ver ADR em
`KODAI/docs/decisoes/2026-05-15-reestruturacao-instalacao-e-contextos.md`.

### Próximo passo
- Piloto NV-Dev `/auditar-projeto` + `/upstream-update` end-to-end (outra máquina, ~60-90min)
- `/brainstorming` arquitetura contexto-profundo (CAG + Prompt Caching + política `memoria-3-tier`)
- Popular `2-PACKS/packs/ia/agente-ia-humanizado` como primeiro pack FUNCIONAL (P1 estratégico)

---

## Infraestrutura de IA da pasta-mãe (ler antes de tudo)

A pasta `Projetos Dev Pessoais` é uma pasta-mãe com KOD.AI instalado + SCHOLZE-STACK:

| Item | O que é |
|---|---|
| `KODAI/` | Repo fonte do KOD.AI (raiz da pasta-mãe; gitignored no dev-pessoal) |
| `.claude/` | SCHOLZE-STACK — 18 agentes, 20 skills, 8 hooks, commands |
| `_memoria/` | Memória do negócio (empresa, estrategia, preferencias) — auto-carrega |
| `_negocio/identidade/` | design-guide.md (dark minimalist) |
| `_negocio/MAPA.md` / `_negocio/MAPA.md` | Entrada rápida (_negocio/MAPA.md = formato KOD.AI) |
| `_negocio/PENDENCIAS.md` | Fila priorizada P0-P2 |
| `_negocio/PROMPT_MASTER_HANDOFF.md` | Estado vivo detalhado |
| `KODAI-INSTALADO.md` | Inventário do que o /instalar adicionou |

**Tom de trabalho preferido (de `_memoria/preferencias.md`):** consultivo,
sem resumos no fim, sem over-engineering, sem emojis, uma pergunta por vez.

---

## Decisões de arquitetura

| Data | Projeto | Decisão | Motivo |
|------|---------|---------|--------|
| 2026-05-12 | Geral | Criada estrutura Projetos Dev Pessoais | Centralizar repos e ferramentas de IA |
| 2026-05-12 | Geral | Prioridade definida: Decon > Dojô > Lar Antônia | Retorno e impacto |
| 2026-05-15 | Geral | SCHOLZE-STACK implantado (E1-E14) | Sistema operacional de IA completo na pasta-mãe |
| 2026-05-15 | KOD.AI | Instalado na pasta-mãe via /instalar (perfil completo) | Dogfooding do próprio produto |
| 2026-05-15 | KOD.AI | Camada 3 = captura, não entrega domínio pré-pronto | STUB desatualizado é pior que ausência; escalável |
| 2026-05-16 | KOD.AI | Clone movido para raiz da pasta-mãe (fora de Repositorios/) | Regra de localização: multi-repo → raiz |

---

## Histórico de sessões

### 2026-05-12 (sessão 1)
- Instalado gh CLI (v2.92.0)
- Autenticado GitHub com token
- Criada estrutura completa "Projetos Dev Pessoais"
- Clonados: decon-sistema, grants-etl-pipeline
- Criado novo repo: dojo-familia-scholze
- Catalogadas skills disponíveis + comandos SDD

### 2026-05-12 (sessão 2)
- Coletado contexto completo de todos os projetos
- Definida prioridade: Decon > Dojô > Lar Antônia
- Mapeada visão em fases para Decon (Fase 1: automatizar Domínio)
- Próximo passo Fase 1: transcrição de áudio real de atendimento da Denize

### 2026-05-15 (SCHOLZE-STACK)
- Implantado SCHOLZE-STACK completo (E1-E14): 18 agentes, 20 skills, 8 hooks,
  commands, .mcp.json, contextos de integração, docs/playbooks/decisoes/padroes
- CLAUDE.md, AGENTS.md, .claude/rules/regras-sessao.md atualizados
- Incidente resolvido: hook PreToolUse `.*` com path relativo causou deadlock —
  lição: settings.json sempre com paths absolutos

### 2026-05-16 (KOD.AI — instalação + reestruturação v0.2.0)
- KOD.AI clonado, instalado na pasta-mãe via /instalar (perfil completo):
  criados `_memoria/`, `_negocio/identidade/`, _negocio/MAPA.md, _negocio/PENDENCIAS.md,
  _negocio/PROMPT_MASTER_HANDOFF.md, KODAI-INSTALADO.md
- 1º teste real revelou 3 falhas → spec aprovada → reestruturação via SDD do
  próprio KOD.AI (7 commits, RF1-RF5):
  - RF1: regra de localização do clone no /instalar
  - RF2: BOOTSTRAP.md (caminho primário de instalação)
  - RF3: skill /capturar-contexto-cliente (STUB)
  - RF4: Camada 3 inverte filosofia — 8 STUBs removidos, vira captura
  - RF5: KODAI movido de Repositorios/ para raiz; paths corrigidos; v0.2.0

### 2026-05-22 (KOD.AI sync 0.6.0-dev + ativação hooks K9)
- Pull upstream KOD.AI: `534eb1b..e9ea7e6` (47 arquivos, +7151/-143)
  - 8 políticas universais novas (memoria-3-tier, handoff-contracts, event-log-ndjson,
    reflexion-per-skill, squad-3-tier, quality-gates-com-critic-grounding,
    portabilidade-orquestracao-24-7, notebooklm-fonte-ancorada)
  - 4 packs novos (mcp-server-template, qr-scanner-web, pwa-webgpu, face-recognition)
  - 2 contextos-domínio (ai-ecosystem-strategy DRAFT, competitive-intelligence)
  - Metodologia vendas-ia-por-valor-aios (substitui vendas-pe-no-peito)
  - 2 skills universais novas: absorver-midia, validar-handoff
- `/atualizar-kodai` modo total → 10 skills + 6 rules propagadas pra `.claude/`
  - Total pasta-mãe: 67 skills + 8 rules + 5 hooks ativos
- K9 RESOLVIDO — 2 hooks JS KOD.AI ativados em `.claude/settings.json`:
  - Stop → kodai-check-completion-claims.js (bloqueia claim sem Evidence Bloc)
  - UserPromptSubmit → kodai-inject-warning.js (injeta lembrete contextual)
- K12 RESOLVIDO — 6 fixtures sintéticas anti-pollution no upstream commit `cb266bc`;
  runner produziu 6/6 OK validando os 7 SIM bloqueantes de `checks.js`
- K3, K5, K6, K7, K8 reconciliados como RESOLVIDO/OBSOLETO
- K10 reclassificado como PARKED não-aplicável-CLI (cache é harness-managed)
- **Próximo passo:** D1 (áudio Denize) OU K4 (piloto NV-Dev outra máquina) OU
  K2 (`/brainstorming` contexto-profundo com Davi).
