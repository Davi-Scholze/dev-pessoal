---
name: instalar
description: >
  Instala KOD.AI na pasta atual com perfil escolhido pelo usuário. Entrevista
  sobre o negócio, escolhe perfil entre 10 disponíveis, filtra packs
  aplicáveis, copia esqueleto + memoria-template + identidade, preenche
  placeholders, cria KODAI-INSTALADO.md, renomeia pasta pro nome do
  negócio. Use sempre que o usuário disser "instalar KODAI", "/instalar",
  "configurar KOD.AI", "primeiro setup", "começar do zero", "rodar
  /instalar", ou após acabar de clonar o repo Davi-Scholze/kod-ai. Use
  também quando detectar pasta nova sem CLAUDE.md.
allowed-tools: [Read, Write, Bash, Glob]
---

# /instalar — Instalação KOD.AI

Esse é o comando crítico que o usuário roda depois de clonar (ou via plugin marketplace). NÃO pode falhar. NÃO pode soar burocrático. Trata como conversa de descoberta — pergunta uma coisa por vez, escuta de verdade, NÃO enfileira tudo.

Objetivo: sistema sai daqui sabendo (a) quem é o negócio, (b) como ele fala, (c) onde tá o atrito do dia a dia, (d) qual perfil aplicar, (e) quais contextos-domínio carregar.

## Pré-checagem

### 1. Nome da pasta

Rodar `basename "$(pwd)"`. Se for `kodai`, `KODAI`, `KOD.AI`, `kod-ai`, `kod-ai-main` ou variação genérica:

> "Notei que a pasta atual ainda tem nome genérico ('<nome-atual>'). O ideal é a pasta ter o nome do seu negócio, não 'KODAI'. Quando terminarmos o setup, te lembro de renomear (é rápido — fechar VS Code, renomear a pasta no Finder/Explorer, abrir de novo). Bora seguir?"

Registrar nome atual pra usar na Fase 6.

### 2. Detectar tipo de pasta

Classificar:
- **[A] Pasta vazia** — projeto novo, sem código nem CLAUDE.md
- **[B] Projeto solo existente** — tem `src/` ou `package.json` ou similar, sem `repos/`
- **[C] Pasta-mãe existente** — tem múltiplos sub-repos ou pasta `repos/`
- **[D] Já tem KOD.AI instalado** — tem `KODAI-INSTALADO.md`. Sugerir `/atualizar-kodai` em vez de `/instalar`.

Reportar classificação ao usuário ANTES de seguir.

### 2.5. Validar localização do clone do KOD.AI

**Regra de localização (não-negociável — origem: 1º teste real 2026-05-15):**

| Tipo de pasta detectado | Onde o clone do KOD.AI DEVE estar |
|---|---|
| **[C] Pasta-mãe** (multi-repo) | Na **raiz da pasta-mãe**, irmão dos repos. **NUNCA dentro de uma subpasta de repositórios** (ex: `Repositorios/KODAI` está ERRADO). |
| **[B] Projeto solo** | Dentro do próprio projeto (subpasta `KODAI/` na raiz do projeto). |
| **[A] Pasta vazia / do zero** | Dentro do projeto novo. |

Rodar `pwd` e analisar o caminho do clone. Se o clone estiver no lugar errado para o tipo detectado (ex: classificação [C] mas o KOD.AI está em `<pasta-mãe>/Repositorios/KODAI` ou `<pasta-mãe>/repos/KODAI`):

> "⚠️ Detectei que o KOD.AI está em `<caminho-atual>`, mas para uma pasta-mãe multi-repo o lugar correto é a **raiz** (`<pasta-mãe>/KODAI`). Quer que eu mova agora? (recomendado — evita paths quebrados). Em Windows uso `Move-Item`; em Unix `mv`."

Se o usuário aprovar, mover ANTES de continuar a instalação, validar integridade git pós-move (`git status -sb`, `git log -1`), e atualizar qualquer path já criado.

**Não prosseguir com a instalação se o clone estiver no lugar errado e o usuário recusar mover** — registrar como débito em `KODAI-INSTALADO.md`.

### 3. Conferir conflitos

Verificar arquivos que KOD.AI quer criar e JÁ existem:
- `CLAUDE.md`, `AGENTS.md`, `_negocio/MAPA.md`, `.claude/rules/regras-sessao.md`
- `_negocio/PROMPT_MASTER_HANDOFF.md`, `_negocio/PENDENCIAS.md`
- `_memoria/`, `_negocio/identidade/`, `_negocio/contextos/`, `docs/`, `_dev/ferramentas/`
- `.gitignore`, `README.md`

Pra cada conflito:
- **(a) Compatível** (segue padrão KOD.AI) → manter intocado
- **(b) Diverge mas melhor** → adaptar KOD.AI ao existente, propor ADR
- **(c) Redundante/inferior** → propor substituição (com OK explícito)
- **(d) Conflito grave** → parar, mostrar ao usuário, esperar decisão

Mostrar lista de conflitos e **pedir aprovação item por item antes de mexer**.

## Fase 1 — Escolha de perfil

Listar os 10 perfis com 1 linha cada (lendo `<KODAI>/0-INSTALACAO/perfis/CATALOGO.md`):

```
1. profissional-liberal — Solopreneur (contador, advogado, médico solo, designer, consultor)
2. negocio-local — Loja, salão, restaurante, padaria, oficina, academia
3. saude — Clínicas, profissionais saúde (LGPD sensível)
4. educacao — Escolas, professores, dojos, plataformas curso
5. servico-b2b — Agência, consultoria, dev shop, eng, arquitetura
6. comercio-digital — E-commerce, marketplace, infoprodutos
7. empresa-corporativa — Empresa estabelecida multi-setor
8. tech-saas — Dev solo, startup, agência software
9. completo — Tudo à mão (Davi pessoal / agência multi-vertical)
10. minimal — Setup leve / experimentação

(Não cobre seu caso? Posso criar perfil novo via /criar-perfil)
```

Auto-sugere baseado em sinais (ex: tem `src/`, `package.json`, `next.config.js` → tech-saas).

Usuário escolhe. Confirma.

## Fase 2 — Contexto de domínio (captura, não escolha)

KOD.AI **não entrega domínio pré-pronto** (decisão arquitetural 2026-05-15,
ver `META-DOMINIOS.md` + ADR). Não há lista de domínios para escolher.

Em vez disso, oferecer a captura:

> "O KOD.AI não vem com conhecimento de negócio pronto — ele te ajuda a
> capturar o do SEU cliente, fresco. Quer capturar agora ou depois?
> - **Agora:** rodo `/capturar-contexto-cliente` ao fim do setup (gera um
>   prompt-guia que você roda numa sessão dedicada → pesquisa → Google Doc +
>   NotebookLM).
> - **Depois:** sigo o setup; você roda `/capturar-contexto-cliente` quando quiser."

Registrar a escolha (agora/depois) para a Fase 7 (handoff). Não bloquear o
setup se "depois".

## Fase 3 — Entrevista (calibração)

Perguntar uma por vez:

1. **Nome:** "Como você chama o que você faz? (nome da empresa, ou seu nome se for marca pessoal)"

2. **O que faz:** "O que sua empresa entrega, em uma frase do jeito que você falaria pro vizinho?"

3. **Cliente típico:** "Quem te paga? (perfil de cliente real — descreve em uma ou duas frases, sem persona genérica)"

4. **Equipe:** "Você toca sozinho ou tem equipe? Se tem, quantos e cada um fazendo o quê?"

5. **Exemplo de escrita:** "Me cola um exemplo da tua escrita — uma legenda do Insta, um email pra cliente, qualquer coisa real e recente. Calibrar o tom sem adivinhar."

6. **O que evitar:** "O que te dá ranço quando alguém escreve assim? (ex: 'vamos juntos!', emoji em email formal, 'caro cliente', jargão de guru, 'alavancar', 'sinergia')"

7. **Gargalo:** "Qual o gargalo do teu negócio hoje? O que tá segurando ele de crescer?"

8. **Pra tirar das costas:** "Se eu pudesse tirar UMA coisa que você repete toda semana, qual seria?"

9. **Identidade visual:** "Tem identidade visual definida ou tá no zero? Se tem, me passa as cores principais e a fonte."

10. **Logo:** "Tem logo? Se sim, joga o arquivo em `_negocio/identidade/logo.png` (ou `.svg`) e me confirma."

11. **Stakeholders:** "É solo (só você) ou multi-stakeholder (precisa inbox por pessoa)? Se multi, lista os nomes."

## Fase 4 — Instalação

Com base nas respostas:

### 4.1 Copiar template adequado

**Importante:** usar `<src>/.` (com `/.` final) em Unix para incluir arquivos/pastas ocultos como `.claude/settings.json`. Em PowerShell, usar `-Force` + glob explícito.

```bash
# Unix — Se modo = pasta-mãe:
cp -r "<KODAI>/1-ESQUELETO/templates/pasta-mae/." "<pasta-atual>/"

# Unix — Se modo = projeto-solo:
cp -r "<KODAI>/1-ESQUELETO/templates/projeto-solo/." "<pasta-atual>/"
```

```powershell
# PowerShell — Se modo = pasta-mãe:
Copy-Item -Path "<KODAI>\1-ESQUELETO\templates\pasta-mae\*" -Destination "<pasta-atual>" -Recurse -Force
# Garantir que .claude/ veio:
if (-not (Test-Path "<pasta-atual>\.claude\settings.json")) {
  Copy-Item -Path "<KODAI>\1-ESQUELETO\templates\pasta-mae\.claude" -Destination "<pasta-atual>\.claude" -Recurse -Force
}

# PowerShell — Se modo = projeto-solo:
Copy-Item -Path "<KODAI>\1-ESQUELETO\templates\projeto-solo\*" -Destination "<pasta-atual>" -Recurse -Force
if (-not (Test-Path "<pasta-atual>\.claude\settings.json")) {
  Copy-Item -Path "<KODAI>\1-ESQUELETO\templates\projeto-solo\.claude" -Destination "<pasta-atual>\.claude" -Recurse -Force
}
```

**Crítico:** se `<pasta-atual>/.claude/settings.json` não existir após esta fase, o hook `SessionStart` (Sessão Zero) não vai disparar — abortar instalação e diagnosticar.

### 4.2 Substituir placeholders

Em cada arquivo copiado, substituir:
- `{{NOME_PROJETO}}` ou `{{NOME_NEGOCIO}}` → nome dado
- `{{DATA}}` ou `{{DATA_INSTALACAO}}` → data atual (YYYY-MM-DD)
- `{{KODAI_VERSION}}` → conteúdo de `<KODAI>/VERSION`
- `{{PERFIL_KODAI}}` → perfil escolhido
- `{{LINK_KODAI}}` → caminho ou URL GitHub do KOD.AI
- `{{DESCRICAO_PASTA_MAE}}` → frase do usuário
- `{{STACK}}` → stack informada (ou "a definir")
- `{{TOM_DE_VOZ}}` → destilado do exemplo de escrita (Fase 3 Q5)
- `{{LISTA_EVITAR}}` → resposta Q6
- `{{GARGALO_ATUAL}}` → resposta Q7
- `{{LISTA_TIRAR_DAS_COSTAS}}` → resposta Q8 (marcar como candidato a /mapear-rotinas)
- Cores/fontes → preencher em `_negocio/identidade/design-guide.md`
- `{{CONTEXTOS_ATIVOS}}` → lista escolhida na Fase 2
- Outros `{{...}}` → preencher com info ou "(a definir)" se faltar

### 4.3 Filtrar packs por perfil

Ler `<KODAI>/0-INSTALACAO/perfis/<perfil>.yaml`:
- `packs-explicitos`: incluir
- `packs-por-dominio.incluir-se-related-a`: cruzar com `related-domains` dos manifests
- `excluir`: remover

Resultado: lista de packs aplicáveis a este projeto.

### 4.4 Inboxes por stakeholder (se multi)

```bash
mkdir -p "<pasta-atual>/contextos/empresa/<nome-empresa>/inbox-<stakeholder>"
```

Pra cada stakeholder listado.

### 4.5 Registrar intenção de captura de contexto

KOD.AI não linka domínio pré-pronto. Criar `<pasta-atual>/contextos/dominios-ativos.md`
registrando apenas: o vertical do negócio (da entrevista) + se a captura foi
escolhida "agora" ou "depois" (Fase 2). Quando capturado, o contexto vai para
`<pasta-atual>/contextos/dominio/<vertical>/` via `/capturar-contexto-cliente`.

### 4.6 Ativar packs no META-INDEX local

Criar `<pasta-atual>/ferramentas/packs-ativos.md`.

### 4.7 Criar KODAI-INSTALADO.md

Arquivo de procedência na raiz do projeto consumidor com inventário completo.

### 4.8 Propagar skills do KOD.AI pra `.claude/skills/` do projeto

**Por quê:** sem este passo, comandos como `/abrir`, `/salvar`, `/spec`,
`/instalar` ficam apenas DESENHADOS nos SKILL.md do kit, mas **não são
descobertos pelo Claude Code** — porque o host só lê skills em
`~/.claude/skills/` ou `.claude/skills/` da pasta atual. O usuário tenta
`/abrir` e nada acontece. (Esse foi o bug-mãe do fluxo de instalação até
2026-05-18.)

**O que fazer:**

```
# Windows (PowerShell)
$dest = Join-Path "<pasta-atual>" ".claude\skills"
New-Item -ItemType Directory -Path $dest -Force | Out-Null
Copy-Item -Path "<KODAI>\1-ESQUELETO\skills-universais\*" -Destination $dest -Recurse -Force
Copy-Item -Path "<KODAI>\0-INSTALACAO\skills\*" -Destination $dest -Recurse -Force

# Unix
mkdir -p "<pasta-atual>/.claude/skills"
cp -rf "<KODAI>/1-ESQUELETO/skills-universais/"* "<pasta-atual>/.claude/skills/"
cp -rf "<KODAI>/0-INSTALACAO/skills/"* "<pasta-atual>/.claude/skills/"
```

Cada skill no KOD.AI já é uma pasta com `SKILL.md` no padrão que o Claude
Code reconhece — cópia direta basta.

**Idempotência:** se `.claude/skills/<nome>/SKILL.md` já existe e é idêntico
à origem, pular silenciosamente. Se diverge (usuário customizou local),
perguntar antes de sobrescrever.

**Atualização contínua:** quando sair versão nova do KOD.AI, `/atualizar-kodai`
re-propaga essas skills (preservando customizações locais).

**Após este passo:** todas as skills universais (`/abrir`, `/salvar`,
`/atualizar`, `/check-in`, `/capturar`, `/mapear-rotinas`, `/criar-perfil`,
`/criar-pack`, `/criar-contexto`, `/ver`, `/absorver-referencia`,
`/capturar-contexto-cliente`) + skills de gerenciamento (`/instalar`,
`/atualizar-kodai`, `/adicionar-pack`, `/remover-pack`, `/listar-disponiveis`,
`/trocar-perfil`) ficam disponíveis como slash commands reais no projeto.

## Fase 5 — Validação

Conferir:
- [ ] `_negocio/MAPA.md` (ou `MAPA_DO_PROJETO.md` em solo) aponta corretamente
- [ ] `CLAUDE.md` está na raiz com 12 regras
- [ ] `AGENTS.md` está na raiz (vendor-neutral)
- [ ] `_memoria/empresa.md` + `preferencias.md` + `estrategia.md` preenchidos
- [ ] `_negocio/identidade/design-guide.md` preenchido (ou explicitamente em branco com nota)
- [ ] Inboxes criados se multi-stakeholder
- [ ] `dominios-ativos.md` registra o vertical + escolha agora/depois; `packs-ativos.md` lista packs
- [ ] `KODAI-INSTALADO.md` criado
- [ ] `.claude/skills/` contém as skills do KOD.AI (`/abrir`, `/salvar`, `/instalar`, etc.) — testar com `/check-in` invocado mentalmente
- [ ] `.claude/settings.json` existe com hook `SessionStart` configurado — sem ele, Sessão Zero não dispara
- [ ] Sem placeholders `{{...}}` deixados acidentalmente (`grep -r "{{" .` deve retornar nada)

Rodar check-in dummy: invocar mentalmente `/check-in`.

## Fase 6 — Renomear pasta (lembrete)

> "Setup pronto! Quando terminarmos, **fecha VS Code, renomeia a pasta de 'KODAI' (ou nome atual) pro nome do teu negócio** ('{{NOME_NEGOCIO}}'), e reabre. A pasta vira o teu negócio agora — não é mais 'KODAI'."

## Fase 7 — Handoff

Mostrar ao usuário:

### O que foi instalado
- Modo, perfil, templates aplicados, vertical registrado, packs ativos, inboxes

### O que está STUB / pendente
- Contexto de domínio: **não vem pronto** — capturar via `/capturar-contexto-cliente`

### ═══ PRÓXIMA SESSÃO ═══

**Você não precisa lembrar de nada. Funciona assim:**

1. Abra esta pasta no Claude Code
2. Diga qualquer coisa ("oi", "bom dia", ou já uma tarefa)
3. O sistema automaticamente (via hook `SessionStart` em `.claude/settings.json`):
   - ✓ Verifica que tudo está OK (skills propagadas, MCPs, memória)
   - ✓ Lembra onde paramos (lê handoff anterior)
   - ✓ Mostra o próximo passo

Você **nunca copia, abre ou cola** arquivos como `_negocio/PROMPT_MASTER_HANDOFF.md`, `_negocio/PENDENCIAS.md` ou `_negocio/MAPA.md`. Eles são **memória interna da IA** — atualizam sozinhos e a IA lê automaticamente no início de cada sessão.

**Fallback:** se a primeira mensagem da próxima sessão **não** começou com reporte canônico (5-7 linhas: status, negócio, próximo), o hook pode ter falhado. Rode `/abrir` manualmente.

**A qualquer momento** você pode rodar `/check-in` pra ver o estado atual.

### Próximo passo recomendado
1. **Capturar contexto do cliente:** rodar `/capturar-contexto-cliente` (se escolheu "agora" na Fase 2, fazer já)
2. Pra começar a construir: rodar `/spec` pra primeiro pedido
3. Pra popular pack STUB: rodar `RESEARCH-PROMPT` do pack alvo
4. Pra mapear rotinas: rodar `/mapear-rotinas`

### Git inicial (se pasta não era repo)

> "Quer que eu inicie git, faça commit inicial e crie remote no GitHub?"

## Regras de comportamento DURANTE este protocolo

1. **Pergunta uma de cada vez.** Nunca despeja 5 perguntas juntas.
2. **Mostra o plano antes de executar mudanças destrutivas.**
3. **Idempotência:** se arquivo já existe com conteúdo correto, não toca.
4. **Honestidade:** se algo não bate (ex: pack que não existe ainda em FUNCIONAL), diz e oferece criar STUB.
5. **Resumo final:** sempre termina com handoff explícito.

## Em caso de erro

- Não continua
- Reporta erro exato
- Sugere ação corretiva
- Pede decisão do usuário

Se sair do meio do protocolo, retoma usando `SESSAO_BACKUP.md` ou `_negocio/PROMPT_MASTER_HANDOFF.md` na próxima sessão.
