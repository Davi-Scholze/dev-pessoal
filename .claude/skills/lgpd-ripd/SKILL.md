---
name: lgpd-ripd
description: >
  Gera RIPD (Registro de Operações de Tratamento de Dados Pessoais — LGPD Art. 37)
  adaptado ao stack do projeto consumidor. Lê schemas (Supabase, Postgres, Prisma,
  Drizzle), detecta campos PII (email, nome, CPF, telefone, endereço, biometria,
  saúde), classifica por categoria (comum/sensível/menor), sugere base legal LGPD
  apropriada por finalidade, identifica sub-processadores via .env (Supabase,
  Vercel, Asaas, Stripe, Anthropic, OpenAI, etc), gera RIPD esqueleto em
  `docs/lgpd/ripd.md` pronto pra publicação `/legal/privacidade`. Use sempre que
  disser "criar RIPD", "/lgpd-ripd", "preciso documentar LGPD", "compliance Art. 37",
  "tratamento de dados", ou ao iniciar projeto novo com PII.

allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion

tier: employee
reports_to: null

version: 0.1.0
status: DRAFT

handoff_in:
  required:
    project_path: "Path raiz do projeto consumidor (ex: Repositorios/dojo-familia-scholze)"
  optional:
    controlador: "Nome + CPF do controlador (auto-pergunta se ausente)"
    operador: "Quem opera no dia-a-dia (default: mesmo que controlador)"
    canal_lgpd_email: "Email pra exercício de direitos (Art. 18)"
    versao_existente: "Se já existe RIPD anterior, path pra cruzar e propor incremento"

handoff_out:
  produces:
    ripd: "docs/lgpd/ripd.md (esqueleto ou atualização)"
    politica_privacidade_template: "docs/lgpd/politica-privacidade-PUBLICA.md (template pra publicar em /legal/privacidade)"
    sub_processadores: "docs/lgpd/sub-processadores.md (lista enumerada com TOS)"
    audit_log: "docs/lgpd/AUDIT-<YYYY-MM-DD>.md (o que foi detectado + decisões)"
  paths:
    - "docs/lgpd/"

quality_gates:
  - "PII detectada em ≥1 tabela do schema (se 0, alerta — confirmar não-existência)"
  - "Base legal LGPD declarada explicitamente por finalidade"
  - "Sub-processadores enumerados a partir de .env / dependencies / hosting"
  - "Regime especial Art. 14 (menores) detectado se aplicável (palavra 'menor', 'aluno', 'crianca', 'paciente' em schema)"
  - "Regime sensível Art. 11 (saúde, biometria, raça, religião, orientação) detectado se aplicável"
  - "Canal de exercício de direitos declarado (email mínimo)"

requires:
  blocking:
    - "Projeto tem schema acessível (SQL migrations, Prisma schema, Drizzle schema, OR types TypeScript com PII)"
    - "Davi (ou controlador) disponível pra preencher campos faltantes via AskUserQuestion"
  recommended:
    - "Pack seguranca/lgpd-by-design instalado (recipes + templates)"
    - "Política upstream lgpd.md acessível"
---

# Skill: `/lgpd-ripd`

> Gerador automático de RIPD (Registro de Operações de Tratamento de Dados Pessoais) adaptado ao stack do projeto consumidor. **Reduz LGPD compliance de 8h manuais → 30min interativos**.

## Princípio

LGPD Art. 37 obriga toda empresa controladora a manter RIPD. Sem RIPD:
- Risco jurídico imediato (ANPD pode autuar)
- Sem trilha auditável em caso de incidente (Art. 48)
- Cliente não confia (auditoria empresarial pede RIPD)
- Compliance vira retrabalho (gerar from scratch toda vez)

Esta skill **detecta PII automaticamente do schema** + **sugere base legal apropriada** + **gera template pronto pra ajustar**. Não substitui revisão jurídica, mas elimina 90% do trabalho mecânico.

## Quando disparar

**Triggers explícitos:**
- "/lgpd-ripd"
- "criar RIPD"
- "preciso documentar LGPD"
- "compliance Art. 37"
- "tratamento de dados"
- "documentar PII do sistema"

**Triggers contextuais:**
- `/instalar` em projeto novo com schema PII detectada
- `/spec` de feature que adiciona campo PII (lembra do RIPD)
- `/auditar-projeto` detecta ausência de `docs/lgpd/ripd.md`
- Agent `lgpd-auditor` recomenda como ação P0

## Workflow (5 fases)

### Fase 1 — Detecção de schema

Procurar em ordem:
1. `supabase/migrations/*.sql` (Postgres + Supabase)
2. `prisma/schema.prisma` (Prisma)
3. `drizzle/schema.ts` (Drizzle)
4. `db/migrations/*.sql` (Postgres puro)
5. `models/*.py` (Django/SQLAlchemy)
6. `src/types/*.ts` com `interface` ou `type` declarando estruturas

Parsear schemas → lista de tabelas/models + colunas com tipos.

### Fase 2 — Classificação PII

Para cada coluna, aplicar regex + heurística:

```yaml
pii_patterns:
  email: ['email', 'e_mail', 'mail']
  nome_completo: ['full_name', 'nome_completo', 'name', 'nome']
  cpf: ['cpf', 'tax_id', 'national_id']
  cnpj: ['cnpj', 'company_id']
  rg: ['rg', 'identity_number']
  telefone: ['phone', 'telefone', 'celular', 'mobile']
  endereco: ['address', 'endereco', 'street', 'cep', 'zip', 'postal']
  data_nascimento: ['birth', 'nascimento', 'birthdate', 'dob']
  ip: ['ip_address', 'ip', 'remote_addr']
  expo_push: ['expo_push_token', 'push_token', 'device_token']

categoria_sensivel:  # Art. 11
  saude: ['health', 'saude', 'medical', 'medico', 'alergia', 'condicao', 'diagnostico']
  biometria: ['biometric', 'biometria', 'face_embedding', 'fingerprint', 'digital']
  raca_etnia: ['race', 'raca', 'etnia', 'ethnicity']
  religiao: ['religion', 'religiao']
  orientacao_sexual: ['sexual_orientation', 'orientacao']
  filiacao_politica: ['political', 'politica']
  filiacao_sindical: ['union', 'sindicato']
  dado_genetico: ['genetic', 'genetico', 'dna']

categoria_menor:  # Art. 14
  detector: ['aluno', 'crianca', 'minor', 'kid', 'student', 'child', 'patient_juvenile']
```

### Fase 3 — Sugestão de base legal

Por finalidade detectada, mapear pra Art. 7 da LGPD:

| Finalidade | Base legal recomendada |
|---|---|
| Autenticação (login, password reset) | Art. 7, V (execução contrato) |
| Cobrança/pagamento | Art. 7, V (execução contrato) + Art. 7, II (obrigação legal fiscal) |
| Marketing/newsletter opt-in | Art. 7, I (consentimento) |
| Analytics agregado | Art. 7, IX (legítimo interesse) + opt-out obrigatório |
| Dados saúde de menores | Art. 11 (sensível) + Art. 14 (consentimento responsável) — SEMPRE consentimento explícito |
| Compliance regulatório (KYC, AML) | Art. 7, II (obrigação legal) |
| Operação fundamental (multi-tenant ID) | Art. 7, V (execução contrato) |

### Fase 4 — Identificação de sub-processadores

Cruzar `.env.example` + `package.json` + `requirements.txt` + hosting detectado:

```yaml
sub_processadores_comuns:
  supabase: { tipo: DBaaS, local: variável, tos: 'https://supabase.com/legal/privacy' }
  vercel: { tipo: hosting, local: edge global, tos: 'https://vercel.com/legal/privacy-policy' }
  anthropic: { tipo: LLM, local: US, tos: 'https://www.anthropic.com/legal/privacy' }
  openai: { tipo: LLM, local: US, tos: 'https://openai.com/policies/privacy-policy' }
  asaas: { tipo: pagamentos BR, local: BR, tos: 'https://www.asaas.com/politica-de-privacidade' }
  stripe: { tipo: pagamentos, local: US/global, tos: 'https://stripe.com/privacy' }
  sendgrid: { tipo: email, local: US, tos: 'https://sendgrid.com/policies/privacy' }
  resend: { tipo: email, local: US, tos: 'https://resend.com/legal/privacy-policy' }
  cloudflare: { tipo: CDN, local: edge global, tos: 'https://www.cloudflare.com/privacypolicy' }
  postgres_self_hosted: { tipo: DB, local: declarar pelo cliente, tos: N/A }
```

### Fase 5 — Geração + handoff

Gerar `docs/lgpd/ripd.md` baseado no template `KODAI/2-PACKS/packs/seguranca/lgpd-by-design/templates/ripd-template.md` (pack irmão).

Output canônico tem 10 seções:
1. Identificação do controlador + operador + DPO
2. Finalidades do tratamento (tabela)
3. Dados pessoais tratados — estado ATUAL (por tabela)
4. Compartilhamento com terceiros (sub-processadores enumerados)
5. Medidas de segurança aplicadas (implementadas vs pendentes)
6. Direitos do titular (Art. 18 — 9 direitos)
7. Regime especial menores (Art. 14) se aplicável
8. Sub-processadores documentados (com TOS)
9. Protocolo incidentes (Art. 48)
10. Histórico de versões

## Triggers automáticos pra atualizar RIPD

A skill registra **memória** que dispara warning na próxima execução de:
- `/spec` de feature que adiciona campo PII → "RIPD precisa de update (campo X novo)"
- Migration SQL que adiciona coluna com nome em `pii_patterns` → idem
- `/instalar` pack que processa PII → idem

## Skills/agents relacionados

- Pack irmão: `2-PACKS/packs/seguranca/lgpd-by-design/` (templates + recipes)
- Skill irmã: `/lgpd-dsr-endpoint` (gera endpoint Art. 18)
- Agent: `lgpd-auditor` (.claude/agents/lgpd-auditor.md em pasta-mãe consumidora)
- Política: `1-ESQUELETO/politicas/lgpd.md`
- Conceito-domínio: `3-CONTEXTOS-DOMINIO/lgpd-seguranca-universal/` (a ser preenchido)
- Conceito-domínio: `3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/conceitos/lgpd-menor-saas-educacao.md` (caso aplicado dojo)

## Quando promover DRAFT → FUNCIONAL

1. Smoke test em ≥2 projetos consumidores (dojo + decon)
2. RIPD gerado validado por leitura humana — completude + clareza
3. Detecção PII ≥95% accuracy em schema real
4. Sub-processadores enumerados corretamente em ≥3 stacks diferentes
5. Evidence Bloc em sessão `/complete`

## Limitações honestas

- Detecção PII por regex pode falsear positivo (`name_color` ≠ PII) — exige revisão humana
- Não substitui revisão jurídica por advogado LGPD
- Sub-processadores raros (não na lista comum) precisam preenchimento manual
- Não gera política de privacidade pública completa (template separado em pack `seguranca/lgpd-by-design/templates/`)
- Schemas em linguagens não-cobertas (Java, Go, Rust) exigem flag `--schema-format=manual`

## Origem

Davi backlog 2026-05-25 noite item B.5 — *"LGPD usado no desenvolvimento e o Mapa? Todo o poder do KODAI entrou no mapa dos projetos específicos?"*

Audit `KODAI/docs/LGPD-AUDIT-PROJETOS-CONSUMIDORES.md` (commit `b6400f3`) confirmou: 3/3 projetos não-conformes; skill referenciada em conceito-domínio dojo mas NÃO EXISTIA. Esta skill operacionaliza a lacuna.
