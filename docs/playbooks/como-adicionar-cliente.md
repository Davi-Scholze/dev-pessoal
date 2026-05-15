# Playbook — Como Adicionar um Novo Cliente

> Fluxo completo do onboarding técnico de um novo cliente.
> Usar `/scholze-novo-cliente` para automatizar os passos 1–4.

---

## Etapa 1 — Coletar Dados do Cliente

Antes de criar qualquer arquivo, coletar:

```
Nome da empresa:
CNPJ:
Contato responsável + WhatsApp:
Instagram:
Nicho (contabilidade, saúde, educação, imóveis, varejo…):
Serviços contratados:
  [ ] Site/landing page
  [ ] Sistema web (SaaS/painel)
  [ ] App mobile
  [ ] Automação/ETL
  [ ] Carrosséis de conteúdo
  [ ] Gestão de tráfego pago
Nível de integração Google: [ ] 1  [ ] 2  [ ] 3  [ ] 4
Stack desejada:
Prazo de entrega:
```

---

## Etapa 2 — Criar Repositório

```bash
# 1. Copiar template
cp -r ferramentas/templates/cliente-novo/ Repositorios/[nome-cliente]/

# 2. Preencher colchetes no CLAUDE.md do cliente
# [NOME_CLIENTE], [NICHO], [STACK], [SERVICOS], etc.

# 3. Criar brand-config.json
# dados/brand-config.json com: cores, fontes, logo, slogan

# 4. Criar entrevista.md
# dados/entrevista.md com perguntas de onboarding

# 5. Git init + repo privado no GitHub
cd Repositorios/[nome-cliente]
git init
git remote add origin git@github.com:Davi-Scholze/[nome-cliente].git
```

---

## Etapa 3 — Configurar Ambiente

```bash
# 1. Criar .env a partir do .env.example
cp .env.example .env
# Preencher variáveis (nunca commitar o .env)

# 2. Inicializar CLAUDE.md local
/scholze-init

# 3. Adicionar ao NotebookLM (se projeto complexo)
python ~/.claude/skills/notebooklm/scripts/run.py notebook_manager.py add \
  --url "[URL]" \
  --name "[Nome Cliente] — Documentação" \
  --description "[descrição]" \
  --topics "[nicho],[stack],[servicos]"
```

---

## Etapa 4 — Integrações Google (Nível 1 mínimo)

Todo cliente recebe ao menos Nível 1:

```
1. Criar projeto no Google Cloud Console
2. GTM: criar conta + container
3. GA4: criar propriedade + conectar ao GTM
4. Search Console: verificar domínio
5. Salvar credenciais em Repositorios/[cliente]/credentials/
   → Nunca commitar
```

Ver `contextos/integracao-google-apis.md` para instruções detalhadas.

---

## Etapa 5 — Primeira Sessão de Trabalho

Checklist antes de começar a desenvolver:

```
[ ] CLAUDE.md local criado e legível
[ ] .env preenchido e funcionando
[ ] Git configurado com remote
[ ] Nível de integração Google decidido
[ ] Spec da primeira feature criada (/spec)
[ ] Stack confirmada com o cliente
[ ] Acesso ao domínio/hosting confirmado
```

---

## Estimativas de Ticket (referência)

| Serviço | Ticket médio |
|---------|-------------|
| Auditoria de Ads | R$2.850–R$11.400 |
| Site + Nível 1 Google | R$4.500–R$12.000 |
| Carrosséis automáticos | R$17.000–R$45.000 setup + R$4.500–R$11.000/mês |
| Workflow de automação | R$8.500–R$28.500 |
| Retainer marketing | R$5.700–R$28.500/mês |

**Fórmula de precificação:** Custo real de API = R$10–50/entrega. Cobrar 30% do ROI anual recuperado.

---

## Após o Onboarding

- Atualizar `contextos/CONTEXTO_GERAL.md` com o novo cliente
- Adicionar linha em `MAPA_PESSOAL.md` → seção de projetos ativos
- Agendar check-in mensal no calendário
