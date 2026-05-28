# Análise completa MazyOS — 2026-05-28

> Análise produzida por IA após leitura de 100% do repo `mazzeoia/MazyOS` (4 commits, 333K).
> Objetivo: extrair princípios/decisões absorvíveis pro KOD.AI sem copiar verbatim.
> Origem: pedido Davi sessão 2026-05-28 ("analise 100% do mazyos e veja se o kodai e melhor o se tem algo que podemos melhoras").

---

## 1. O que é o MazyOS (em 3 linhas)

**Tese:** "IA não é uma ferramenta que sua empresa usa. É o sistema operacional em que ela roda."

**Forma:** repositório Claude Code minimalista (333K, 4 commits) que se instala em qualquer pasta e vira "memória + identidade + 15 skills operacionais" pro negócio do usuário.

**Modelo de receita:** repo é open-source/grátis no GitHub. Monetização é prestação de serviço (`mazzeoia.com.br`) — implantar MazyOS em clientes, configurar identidade, treinar uso. Não vende SaaS, vende o framework + know-how.

---

## 2. Estrutura completa do MazyOS

```
MazyOS/                                     333K, 4 commits, 1 autor
├── CLAUDE.md                               101 linhas — regras de operação do MazyOS
├── README.md                               110 linhas — pitch + caminho de instalação
├── .gitignore                              27 linhas — gitignore enxuto
│
├── .claude/skills/                         15 skills
│   ├── abrir/SKILL.md                      42 linhas — abertura de sessão
│   ├── instalar/SKILL.md                   168 linhas — instalação inicial guiada
│   ├── atualizar/SKILL.md                  57 linhas — varredura e reconciliação
│   ├── salvar/SKILL.md                     50 linhas — commit+push GitHub
│   ├── novo-projeto/SKILL.md               94 linhas — pasta de projeto isolada
│   ├── mapear-rotinas/SKILL.md             76 linhas — cria skills personalizadas
│   ├── carrossel/SKILL.md                  254 linhas — carrossel/post Instagram
│   ├── publicar-tema/SKILL.md              159 linhas — pipeline blog+carrossel+legendas
│   ├── seo/SKILL.md                        310 linhas — fluxo SEO+GEO+Google Ads 8 passos
│   ├── anuncio-google/SKILL.md             175 linhas — CSV pra Google Ads Editor
│   ├── relatorio-ads/SKILL.md              163 linhas — relatório semanal Google+Meta
│   ├── responder-avaliacoes/SKILL.md       101 linhas — respostas curtas GMB
│   ├── aprovar-post/SKILL.md               152 linhas — publica blog+IG+FB+commit
│   ├── analisar-dados/SKILL.md             96 linhas — análise CSV/XLSX/PDF
│   └── email-profissional/SKILL.md         70 linhas — rascunho email
│
├── _memoria/                               3 arquivos (templates vazios pra /instalar preencher)
│   ├── empresa.md
│   ├── preferencias.md
│   └── estrategia.md
│
├── identidade/
│   └── design-guide.md                     template vazio
│
├── templates/
│   ├── perfis/                             4 templates CLAUDE.md
│   │   ├── claude-md-solopreneur.md
│   │   ├── claude-md-freelancer.md
│   │   ├── claude-md-agencia.md
│   │   └── claude-md-empresa.md
│   ├── identidade/exemplos/                2 design-guides preenchidos
│   │   ├── design-guide-solopreneur.md     terracota + Instrument Serif
│   │   └── design-guide-agencia.md         dark + Syne + laranja
│   ├── skills/catalogo.md                  catálogo de 11 skills externas (Schwartz, Ogilvy, Frontend Design, Canvas Design, PDF/DOCX/PPTX/XLSX, Doc Co-Authoring, YT Transcript, Webapp Testing, Skill Creator)
│   └── ferramentas/catalogo.md             catálogo de APIs/MCPs (Playwright, Cloudflare Pages, Post for Me, Jina Reader, yt-dlp, Gemini, DALL-E, Notion MCP, Gmail MCP, Google Calendar MCP, Canva MCP, Meta Ads, Google Ads, N8N, Supabase, Telegram)
│
├── marketing/, dados/, saidas/, scripts/   drop zones com README explicando uso
└── logs/.last-rotation-check               único arquivo de log
```

**Total:** 30 arquivos, 333K. Repo enxuto e fácil de digerir em 1 sessão.

---

## 3. As 15 skills mapeadas em 4 clusters

### A. Núcleo do dia-a-dia (5 skills)

| Skill | Função | Tamanho |
|---|---|---|
| `/instalar` | Entrevista de setup inicial (perfil + negócio + voz + foco + identidade) → preenche `_memoria/*` + `CLAUDE.md` adaptado ao perfil | 168 linhas |
| `/abrir` | Carrega `_memoria/*` + devolve síntese 5 linhas pra começar sessão | 42 linhas |
| `/atualizar` | Varre workspace, detecta drift entre `_memoria/*` e realidade, propõe mudanças cirúrgicas | 57 linhas |
| `/salvar` | Commit+push GitHub. Na 1ª vez configura remote via `gh` CLI | 50 linhas |
| `/mapear-rotinas` | Entrevista de descoberta → propõe skills novas → cria as aprovadas em `.claude/skills/` | 76 linhas |

**Padrão:** 50-170 linhas por skill, sem inflar. Cada uma faz UMA coisa bem.

### B. Conteúdo + SEO (5 skills) — onde mora a maior densidade

| Skill | Função | Tamanho |
|---|---|---|
| `/carrossel` | Carrossel 1080×1350 Instagram com identidade da marca. HTML+Playwright. 3 tipos (texto/foto IA/post único). 6 layouts nomeados (CAPA/SOLO/DUO/NÚMERO/CITAÇÃO/CTA) | **254 linhas** |
| `/publicar-tema` | Pipeline tema → blog post Astro/WP + carrossel resumo + 3 legendas (IG/FB/LinkedIn) amarradas | 159 linhas |
| `/seo` | SEO+GEO+Google Ads 8 passos sequenciais (demanda→concorrência→GMB→on-page→conteúdo→ads→monitoramento→GEO) | **310 linhas** |
| `/responder-avaliacoes` | Respostas curtas e humanas pras reviews GMB. Regras fixas + tabela de calibração por tipo de review | 101 linhas |
| `/aprovar-post` | Publica conteúdo aprovado: flipa blog draft→false + copia PNGs pro public + push + aguarda deploy + posta IG+FB via Meta Graph API | 152 linhas |

**Padrão:** skills se encadeiam — `/seo` produz insumo pra `/publicar-tema` produz insumo pra `/carrossel` produz insumo pra `/aprovar-post`. Pipeline fluido.

### C. Ads (2 skills)

| Skill | Função | Tamanho |
|---|---|---|
| `/anuncio-google` | Briefing → 7 CSVs prontos pra importar no Google Ads Editor (campanhas/grupos/keywords/negativas/anúncios/4 tipos de extensões) | 175 linhas |
| `/relatorio-ads` | Relatório semanal Google+Meta. Lê CSVs exportados → resumo executivo + alertas vermelho/amarelo + 3-5 recomendações concretas | 163 linhas |

### D. Produção pontual (3 skills)

| Skill | Função | Tamanho |
|---|---|---|
| `/novo-projeto` | 4 perguntas → cria `clientes/<Nome>/` com CLAUDE.md herdado + briefing + subpastas | 94 linhas |
| `/analisar-dados` | Lê CSV/XLSX/PDF → resumo executivo em prosa (não bullets secos) + 3 recomendações + tabela de números-chave | 96 linhas |
| `/email-profissional` | Rascunha email a partir de contexto livre. Quando assunto é delicado (cobrança/recusa/feedback negativo), oferece 2 versões (direta/suave) | 70 linhas |

---

## 4. Princípios canônicos extraídos (os "diamantes")

### 4.1 Adaptação por perfil de negócio (1 sistema → 4 expressões)

`/instalar` pergunta **na Fase 1** qual perfil do cliente:
1. **Solopreneur / criador solo** — `_memoria/` foca em marca pessoal + audiência como ativo. CLAUDE.md tem `produtos/` e `audiencia/`
2. **Freelancer** — foco em captar/entregar/cobrar. CLAUDE.md tem `clientes/` + `propostas/`
3. **Agência/consultoria** — múltiplos clientes em paralelo. CLAUDE.md tem `clientes/` + `briefings/` + `propostas/`
4. **Empresa estruturada** — múltiplos setores. CLAUDE.md tem `marketing/` + `comercial/` + `financeiro/` + `rh/` + `operacoes/` + `projetos/`

**O sistema é o MESMO** (15 skills + memória + identidade), mas a **moldura** se adapta ao tamanho do negócio.

> Implicação pro KOD.AI: já temos 10 perfis em `0-INSTALACAO/perfis/` mas a separação entre "tipo de negócio" (solopreneur/freelancer/agência/empresa) e "vertical" (contábil/dojo/academia/saúde) pode estar misturada.

### 4.2 Skills DENSAS, não numerosas

15 skills bem-feitas > 72 skills com cobertura desigual. Cada skill MazyOS é:
- **80-310 linhas** (média 130)
- Workflow numerado por **Passos** explícitos
- **Dependências declaradas no topo** (quais arquivos lê, quais ferramentas precisa)
- **Regras na sessão final** (DOs and DONTs taxativos)
- **Frontmatter `description`** com triggers verbais ("Use quando o usuário disser X, Y, Z")

> Implicação pro KOD.AI: muitas skills nossas são DRAFT/STUB ou redundantes. Densificar > multiplicar.

### 4.3 CHECKPOINT humano no meio da execução

Padrão observado em 8 das 15 skills:
- `/carrossel`: mostra texto antes do visual ("**CHECKPOINT:** Esperar aprovação antes do visual")
- `/aprovar-post`: "**Confirma publicação? (sim/não)**" antes de qualquer coisa irreversível
- `/anuncio-google`: gera CSV "tudo pausado inicialmente — ativar manualmente"
- `/responder-avaliacoes`: reviews 3★ ou menos → "parar e alinhar antes de responder"
- `/instalar`: entrevista uma pergunta por vez, "não enfileirar tudo"

> Implicação pro KOD.AI: nosso CONTRATO §3-5 já tem isso. MazyOS confirma que é o caminho certo.

### 4.4 Pipeline de conteúdo amarrado (encadeamento fluido)

```
/seo  →  /publicar-tema  →  /carrossel  →  /aprovar-post
 |             |               |              |
 estratégia    blog +          PNGs +         publica
 5 temas       legenda 3       legendas       Insta+FB+commit
              versões         finais          push site
```

Cada skill **consome output da anterior** e **produz input pra próxima**. Sem chamadas duplicadas, sem retrabalho. `/publicar-tema` chama `/carrossel` internamente passando o tema do blog — usuário escreve "publicar tema X" e recebe blog+carrossel+legendas+publicação em 1 comando se quiser.

> Implicação pro KOD.AI: nosso pipeline é `/spec→/break→/plan→/execute→/review→/complete` (SDD dev). MazyOS tem o equivalente pra **marketing** — algo que falta na nossa cobertura de packs ou está espalhado.

### 4.5 Estilo visual canônico forte (com fallback inteligente)

`/carrossel` declara estilo base na própria skill:
- **Tipografia:** Inter, weights 400-900, kerning apertado (-0.04em) pra títulos + kerning aberto (0.22em+) pra eyebrows
- **Paleta:** dark + off-white + **UMA** cor de destaque (nunca 4 cores brigando)
- **Layouts nomeados:** CAPA / SOLO / DUO / NÚMERO / CITAÇÃO / CTA FINAL (vocabulário compartilhado)
- **Sequência de capas no feed:** alternância claro→foto/escuro→destaque (planejamento de grade)
- **Fallback:** se `identidade/design-guide.md` está vago, usa esses defaults **sem parar pra pedir `/instalar`**

> Implicação pro KOD.AI: nossa `ui-cycle-trigger.md` + `design-brief-locker` cobre isso, mas falta o "estilo visual base" funcional pra cair quando brief está vazio. MazyOS evita parar a operação quando design-guide está em branco — defaults bons salvam.

### 4.6 Drop zone simples (`dados/`)

`dados/` é literal "arraste CSV/PDF/print aqui". Skills `/analisar-dados` e `/relatorio-ads` leem direto dali. Não é arquivo final — é entrada. O que importa vira artefato em `_memoria/`, `marketing/`, `saidas/`.

`.gitignore` ignora tudo dentro de `dados/` **exceto o README** (`dados/*` + `!dados/README.md`).

> Implicação pro KOD.AI: temos `_brutos-novos/` mas serve só pra brutos que viram `inbox-davi/`. Falta drop zone declarada pra dados CSV/XLSX/PDF.

### 4.7 Catalogo de skills externas + ferramentas (referência, não dependência)

`templates/skills/catalogo.md` lista 11 skills externas validadas (Schwartz Copy, Ogilvy Copy, Frontend Design oficial Anthropic, Canvas Design oficial Anthropic, PDF/DOCX/PPTX/XLSX oficiais, Doc Co-Authoring oficial, YT Transcript, Webapp Testing oficial, Skill Creator oficial) com formato fixo:
```markdown
### Nome
**O que faz:** [1 frase]
**Bom pra:** [casos de uso]
**Como instalar:** [comando]
**Fonte:** [skill nativa CC / validada MazyOS / criada por você]
```

`templates/ferramentas/catalogo.md` lista 16 APIs/MCPs (Playwright, Cloudflare Pages, Post for Me, Jina Reader, yt-dlp, Gemini, DALL-E, Notion MCP, Gmail MCP, Google Calendar MCP, Canva MCP, Meta Ads, Google Ads, N8N, Supabase, Telegram) com formato:
```markdown
### Nome
**O que faz:** [1 frase]
**Precisa de conta:** [Sim/Não]
**Configurar:** [.env]
**Como usar:** [comando]
**Quando usar:** [contexto]
```

> Implicação pro KOD.AI: temos `KODAI/docs/PLUGINS-MERCADO-AUDIT.md` mas falta um catálogo **inline no projeto consumidor** ("o que eu posso instalar hoje pra esse cliente"). MazyOS embute o catálogo no template, pronto pra `/mapear-rotinas` consultar.

### 4.8 Tom conversacional + zero corporativês

Exemplos verbatim do MazyOS:
- README: "Bora voar."
- README: "Quando o `/instalar` terminar, renomeia a pasta `MazyOS/` pro nome do teu negócio"
- `/anuncio-google`: "Sai do briefing direto pro CSV — sem montar grupo por grupo na mão na interface do Google."
- `/relatorio-ads`: "transforma exports brutos das plataformas em relatório executivo que o dono entende sem precisar abrir a interface do Google ou da Meta"
- `/responder-avaliacoes`: "Nada de resposta automática de empresa grande."

> Implicação pro KOD.AI: nosso tom já é consultivo (preferencias.md). MazyOS é mais informal/punchy. Diferença é de público-alvo (MazyOS atende SMB direto, KOD.AI atende dev que vende pra SMB).

### 4.9 Frontmatter `description` com triggers verbais explícitos

Toda skill MazyOS começa com:
```yaml
---
name: <nome>
description: >
  [1-2 linhas do que faz]. Use quando o usuário disser "X", "Y", "/Z",
  "fazer A", "criar B".
---
```

Os triggers são **palavras literais do usuário**. Isso é o que faz o Claude Code disparar a skill no momento certo.

> Implicação pro KOD.AI: muitas das nossas skills DRAFT/STUB têm description vaga. Densificar triggers é mudança de baixíssimo custo com alto retorno em descoberta.

### 4.10 `/mapear-rotinas` — meta-skill que CRIA skills

A skill que mais me impressiona estruturalmente. Workflow:
1. Pergunta 3 coisas: "o que você repete + qual o input + qual o output"
2. Verifica `templates/skills/catalogo.md` pra ver se já tem skill que cobre
3. Propõe N skills novas com formato fixo (nome/o que faz/input/output/dependências)
4. Cria as aprovadas em `.claude/skills/<nome>/SKILL.md` calibrando ao tom do cliente
5. Resumo final

**Limites declarados:**
- "Não criar mais de 5 skills por sessão de mapeamento (se o usuário pedir mais, dividir em rodadas)"
- "Cada skill criada precisa ter um trigger claro (`description` precisa indicar quando invocar) — sem isso a skill nunca é encontrada"

> Implicação pro KOD.AI: temos `/criar-skill` e `skill-creator` mas falta uma equivalente que **entrevista** pra descobrir rotinas. É a porta de entrada pra cliente expandir o sistema.

---

## 5. O que MazyOS NÃO TEM (gaps deles)

Honestamente, o que falta no MazyOS comparado ao KOD.AI:

1. **Pipeline de DEV (SDD)** — não tem `/spec→/break→/plan→/execute→/review→/complete`. MazyOS é puramente marketing/operação SMB. Não cobre construção de software.
2. **Contextos-domínio** — não tem 3-CONTEXTOS-DOMINIO/ separado. Toda inteligência vertical fica embutida nas skills + `_memoria/empresa.md`. Não há reuso de conhecimento entre clientes do mesmo nicho.
3. **Packs reusáveis** — não tem 2-PACKS/. Toda skill é monolítica e direta.
4. **Hooks** — sem `.claude/hooks/`. Sem enforcement mecânico (KOD.AI tem `enforce-ui-cycle.js` etc).
5. **Rules path-scoped** — sem `.claude/rules/`. Regra é universal ou nada.
6. **Agents especializados** — sem `.claude/agents/`. Não tem `frontend-designer`, `backend-architect`, `db-engineer`, etc.
7. **Plugins externos** — sem integração com plugins Anthropic (frontend-design, Impeccable, superpowers, etc).
8. **Dogfooding profundo** — não usa próprio sistema pra evoluir (versionamento de skill, lineage, status_historico).
9. **Memory persistente cross-session** — sem `MEMORY.md` separado do `_memoria/`. Tudo é re-lido toda sessão (sem otimização Claude Code memory layer).
10. **Resiliência sem LLM** — não declara fallbacks pra quando LLM cai. KOD.AI tem `resiliencia-sem-llm.md` política upstream.
11. **LGPD / segurança formalizada** — sem política RIPD, sem audit LGPD. Pra SMB BR isso é gap real.
12. **Multi-cliente em 1 install** — MazyOS instala POR CLIENTE (cada empresa = clone próprio). KOD.AI tem instâncias dedicadas + framework upstream.

---

## 6. O que MazyOS faz MELHOR que KOD.AI (os "diamantes" reais)

### 6.1 — Foco comercial direto

MazyOS é **óbvio pra vender**. Demo de 2 minutos: clone, `/instalar`, em 5 min tem um carrossel pronto. Cliente SMB entende em segundos.

KOD.AI tem complexidade (packs, contextos, agents, hooks) que dificulta venda direta. Estamos vendendo "framework" pra cliente que só quer "fazer post". MazyOS resolve isso embutindo as 15 skills mais usadas direto no install.

### 6.2 — Skills enxutas e densas (alto ROI por linha)

Toda skill MazyOS tem 50-300 linhas e cobre 100% do caso. Compare com algumas skills KOD.AI que têm 30 linhas só com TODO ou são STUB. **Densidade > cobertura.**

### 6.3 — Pipeline de marketing amarrado

`/seo → /publicar-tema → /carrossel → /aprovar-post` em sequência é genial. KOD.AI tem `aprovar-post-meta-api` + `publicar-tema` (mencionada nas skills disponíveis) mas falta a amarração explícita + skill `/seo` cobrindo 8 passos.

### 6.4 — Templates de perfil (4 moldes prontos)

4 templates de CLAUDE.md (solopreneur/freelancer/agência/empresa) entregam estrutura PRONTA por tipo de negócio. KOD.AI tem 10 perfis mas misturados (verticais + tamanhos).

### 6.5 — Estilo visual fallback embutido (`/carrossel`)

`/carrossel` declara estilo base completo (Inter + paleta sóbria + 6 layouts nomeados) que funciona quando design-guide está em branco. Cliente em onboarding produz carrossel decente no DIA 1.

### 6.6 — `/mapear-rotinas` como porta de expansão

Skill que entrevista cliente sobre o que ele repete e CRIA skills personalizadas. Equivale a "personal SDK" do cliente. KOD.AI tem `/criar-skill` mas não tem o ritual de descoberta antes.

### 6.7 — Catálogos inline (skills externas + ferramentas)

`templates/skills/catalogo.md` + `templates/ferramentas/catalogo.md` ficam **no clone do cliente**. `/mapear-rotinas` consulta antes de criar skill nova (evita reinventar). KOD.AI tem docs upstream mas não fica embedded no projeto consumidor.

### 6.8 — Frontmatter de skill com triggers verbais ricos

Toda skill abre com `description: Use quando o usuário disser "X", "Y", "/Z"` + 5-8 frases típicas. Aumenta drasticamente discovery (Claude Code dispara skill no momento certo).

---

## 7. O que KOD.AI faz MELHOR que MazyOS

### 7.1 — Cobertura de dev (SDD)

Pipeline `/spec→/break→/plan→/execute→/review→/complete` cobre construção de software. MazyOS não constrói nada — só opera marketing.

### 7.2 — Contextos-domínio reusáveis

`3-CONTEXTOS-DOMINIO/` permite que conhecimento sobre "contabilidade BR" ou "gestão academia esportiva BR" seja **reutilizado entre clientes**. MazyOS reinicia do zero a cada cliente.

### 7.3 — Hooks de enforcement mecânico

`enforce-ui-cycle.js`, `pre-commit-guard.js`, etc. — força comportamento mesmo quando IA tenta atalhar. MazyOS confia 100% na disciplina da skill (sem garantia mecânica).

### 7.4 — Agents especializados

`frontend-designer`, `backend-architect`, `db-engineer`, `lgpd-auditor` — sub-agentes que executam com modelo + tools próprios. MazyOS é todo Opus generalista.

### 7.5 — LGPD + segurança formalizada

Políticas `resiliencia-sem-llm.md`, `quando-usar-sdd.md`, `secrets-organization-multi-cliente.md`, `tudo-dentro-do-repo-do-sistema`. MazyOS não toca esse tema — sucateamento pra SMB BR real.

### 7.6 — Loop de evolução upstream

`/upstream-update` + `/atualizar-kodai` + skill creator dogfooding. KOD.AI **se evolui no uso**. MazyOS evolui via commits manuais do `mazzeoia`.

### 7.7 — Multi-cliente como princípio

KOD.AI vende N instâncias dedicadas governadas pelo mesmo framework upstream. MazyOS é "install + você é dono daquele install". Modelo diferente, mais escalável o KOD.AI.

### 7.8 — Modelo de negócio explícito (STRATEGIC-NORTH)

KOD.AI tem 3 níveis L1/L2/L3 + pricing canônico SMB BR + 7 diferenciais defensáveis documentados. MazyOS não documenta isso publicamente.

---

## 8. Decisões propostas (saúda Davi, vai pra F2)

Itens absorvíveis pro KOD.AI (sem copiar verbatim — re-implementar como pack governado):

1. **Densificar skills KOD.AI** — eliminar STUB/DRAFT vazios; cada skill ativa deve ter ≥80 linhas de workflow concreto + dependências + regras
2. **Frontmatter triggers verbais ricos** — propagar padrão "Use quando o usuário disser X, Y, Z" em TODAS as skills
3. **Adicionar pack `marketing/seo-completo-smb`** — skill `/seo` 8 passos do MazyOS, re-implementada com fontes verificadas (WebSearch+WebFetch reais)
4. **Adicionar pack `marketing/conteudo-pipeline-amarrado`** — sequência `seo → tema → carrossel → aprovar-post` como fluxo nomeado, atualizando skills existentes
5. **Adicionar pack `marketing/estilo-visual-base-fallback`** — defaults da `/carrossel` (Inter + paleta sóbria + 6 layouts nomeados) embutidos pra usar quando design-guide está vago
6. **Skill `/mapear-rotinas` upstream KOD.AI** — meta-skill que entrevista cliente e CRIA skills personalizadas (não temos equivalente exato)
7. **Catalogo inline de skills + ferramentas** em todo projeto consumidor — formato fixo, consultado por `/criar-skill`
8. **Separar perfis "tamanho de negócio" de perfis "vertical"** em `0-INSTALACAO/perfis/` (revisar os 10 atuais)
9. **Drop zone `dados/` formalizada** — `.gitignore` aditivo padrão `dados/* + !dados/README.md`
10. **Tom mais punchy em README KOD.AI consumidor** — sem perder consultivo Davi, mas reduzir corporativês

Itens NÃO absorver (já fazemos melhor ou não cabe):
- Estrutura de pastas específica deles (`saidas/`, `marketing/`, etc) — KOD.AI tem `_negocio/` + Repositorios/ que é mais limpo
- Falta de hooks (KOD.AI tem hooks e essa é vantagem)
- Falta de agents (KOD.AI tem agents)
- Modelo "1 install = 1 negócio" (KOD.AI tem framework + N instâncias = mais escalável)

---

## 9. Próximos passos

- **F2:** produzir `KODAI/docs/COMPARATIVO-MAZYOS-2026-05-28.md` com matriz lado-a-lado
- **F3:** audit das 72 skills KOD.AI atuais (funcional/draft/stub/morta) + propostas concretas
- **F4:** retorno geral KOD.AI com 3 forças + 3 fraquezas + 3-5 melhorias priorizadas por ROI
- **F5:** deletar `Repositorios/MazyOS/` após Davi confirmar que F1-F4 cobriram

---

**Fim da análise F1.**
