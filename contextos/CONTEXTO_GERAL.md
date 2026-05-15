# Contexto Geral — Projetos Dev Pessoais
> Fonte de verdade completa. Atualizar ao fim de cada sessão significativa.
> Para entrada rápida, use MAPA_PESSOAL.md
> Última atualização: 2026-05-12

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
| 2 | **dojo-familia-scholze** | Potencial SaaS, empresa do pai |
| 3 | **lar-antonia** | Contrato ativo mas baixo potencial de escala |

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

## Decisões de arquitetura

| Data | Projeto | Decisão | Motivo |
|------|---------|---------|--------|
| 2026-05-12 | Geral | Criada estrutura Projetos Dev Pessoais | Centralizar repos e ferramentas de IA |
| 2026-05-12 | Geral | Prioridade definida: Decon > Dojô > Lar Antônia | Retorno e impacto |

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
