---
name: email-profissional
description: >
  Compõe email profissional em PT-BR (proposta comercial, follow-up cliente,
  resposta a SAC, briefing alinhamento, newsletter) respeitando tom de
  _memoria/preferencias.md + briefing cliente. Suporta envio via SMTP
  configurado no .env (Gmail/Workspace/Resend/SendGrid) ou apenas geração
  do draft. Inclui anexos quando solicitado. Templates por tipo: cold/warm/
  resposta/newsletter/cobrança. Use quando disser "escreve um email",
  "/email-profissional", "responder cliente por email", "newsletter mensal".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - AskUserQuestion
---

# Skill: `/email-profissional`

Composição + envio de email **PT-BR profissional** — com voz do cliente preservada.

## Princípio

> **Email gerado com IA sem cheirar a IA.** Tom natural, vocabulário do cliente, assinatura real. Pode enviar direto (SMTP) ou só gerar draft.

## Quando disparar

- "/email-profissional <tipo> <destinatário> <objetivo>"
- "escreve um email pra <cliente> sobre <tema>"
- "responder <pessoa> por email"
- "newsletter mensal"

## Tipos suportados

| Tipo | Quando usar | Estrutura |
|---|---|---|
| **cold** | Primeiro contato (prospect) | Gancho + relevância (por que ele) + valor proposto + CTA leve (call de 15min) |
| **warm** | Follow-up após contato | Recap rápido + próximo passo claro + prazo |
| **proposta** | Envio de proposta comercial | Recap conversa + escopo resumido + investimento + próximos passos + anexo |
| **resposta-sac** | Cliente reclamando/dúvida | Acolhimento + esclarecimento factual + ação concreta + canal direto |
| **briefing-alinhamento** | Pós-reunião | Recap decisões + responsabilidades + prazos + próxima reunião |
| **newsletter** | Recorrente (mensal/semanal) | Hook + 2-3 conteúdos (link blog) + 1 CTA + link unsubscribe |
| **cobranca** | Inadimplência | Cordial + factual (valor + vencimento) + canal direto + sem agressividade |

## Dependências

| Recurso | Onde |
|---|---|
| Tom de voz | `_memoria/preferencias.md` |
| Identidade cliente | `_memoria/empresa.md` ou `_negocio/clientes/<slug>/briefing.md` |
| SMTP (envio) | `.env` (Davi ou cliente) |
| Assinatura padrão | `_memoria/preferencias.md` (campo `assinatura_email`) ou perguntar |

## Setup SMTP (opcional)

Pra envio direto (não obrigatório):

```env
# _memoria/.env (Davi-self) OU _negocio/clientes/<slug>/.env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=davi@empresa.com
SMTP_PASSWORD=...                    # App Password Gmail/Workspace
SMTP_FROM_NAME=Davi Scholze
SMTP_FROM_EMAIL=davi@empresa.com
```

**Gmail/Workspace:** usar App Password (16 char) — não senha de login.
**Resend/SendGrid:** API token + endpoint diferente (próxima iteração).

## Workflow 4 passos

### Passo 1 — Briefing

```
1. Tipo? (cold/warm/proposta/resposta-sac/briefing-alinhamento/newsletter/cobrança)
2. Destinatário? (nome + email + contexto: prospect/cliente atual/parceiro)
3. Objetivo? (1 frase: o que quero que aconteça depois)
4. Tom? (formal / informal / muito-informal — default herda _memoria/preferencias)
5. Anexos? (caminhos)
6. Modo? (apenas-draft / enviar-via-smtp)
```

### Passo 2 — Composição

Estrutura padrão (varia por tipo):

```
Assunto: <específico, max 50 char, sem "URGENTE!!"/CAPS>

<saudação personalizada>

<contexto/gancho> (1-2 linhas — por que este email existe)

<corpo> (3-5 linhas — proposta/info/pergunta/resposta)

<CTA claro> (1 linha — o que o destinatário faz a seguir)

<assinatura>
```

**Regras:**
- Sem jargão corporativo ("alinhamento", "sinergia", "value-add")
- Sem "espero que esteja bem!" genérico — usar gancho específico
- Frase final = pergunta ou ação concreta
- Assinatura com nome real + papel + 1 forma de contato direto
- Mobile-first: ≤150 palavras total quando possível (lê-se no celular)

### Passo 3 — Revisão automática

KOD.AI passa checklist antes de mostrar pra Davi:

```yaml
- [ ] Sem "Espero que esteja bem"
- [ ] Sem "Conforme falado anteriormente" (recapitule específico em vez)
- [ ] Assunto ≤50 char + sem CAPS
- [ ] Sem mais de 1 CTA (foco)
- [ ] Mobile-friendly: parágrafos curtos (≤3 linhas)
- [ ] Anti-pollution: zero marca proibida
- [ ] Tom alinhado com _memoria/preferencias.md
- [ ] Sem emoji em email formal (cold/proposta/cobrança)
- [ ] Link de unsubscribe se newsletter
- [ ] Greeting personalizado (nome do destinatário)
```

### Passo 4 — Output / envio

**Modo draft:**
```
_negocio/clientes/<slug>/comunicacoes/emails/<YYYY-MM-DD>-<tipo>-<destinatario-slug>.md
```

**Modo envio SMTP:**
```bash
python3 -c "
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# ... (gerado pelo KOD.AI)
"
```

Log em `_negocio/clientes/<slug>/comunicacoes/emails-enviados.ndjson` (append-only):
```json
{"ts":"2026-05-22T15:00:00Z","tipo":"warm","para":"...","assunto":"...","status":"enviado","message_id":"..."}
```

## Quality Gates

```yaml
quality_gates:
  - "Assunto ≤50 char sem CAPS"
  - "Greeting personalizado (nome destinatário)"
  - "1 CTA claro (não múltiplos)"
  - "≤150 palavras (exceto newsletter + proposta)"
  - "Assinatura com nome real + canal de contato"
  - "Tom alinhado _memoria/preferencias.md"
  - "Sem jargão corporativo vazio"
  - "Mobile-friendly (parágrafos ≤3 linhas)"
  - "Anti-pollution: zero marca proibida"
  - "Newsletter: link unsubscribe obrigatório"
  - "Cobrança: tom cordial sem agressividade"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| "Espero que esteja bem!" | Genérico, sinaliza email em massa | Gancho específico (referência a algo do destinatário) |
| 5 CTAs ("agenda reunião, baixa o PDF, segue no LinkedIn...") | Decisão paralisia | 1 CTA claro |
| Assunto "Re: Re: Re: Fwd: Importante!" | Tom desesperado | Assunto novo descritivo |
| Parágrafos de 8 linhas | Não lê no celular | ≤3 linhas por parágrafo |
| Assinatura genérica "Equipe X" | Impessoal | Nome real + papel |
| Emoji em cobrança/proposta | Tom errado | Sem emoji em formal |
| "Conforme alinhado anteriormente" sem recap | Destinatário esquece | Recap específico em 1 linha |
| Cold pitch agressivo | Spam | Valor proposto + CTA leve |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "newsletter precisa de conteúdo recorrente"
    skill: publicar-tema
    razao: "Cada tema do calendário vira matéria-prima da newsletter"
  - condicao: "proposta enviada + cliente aceitou"
    skill: novo-projeto
    razao: "Criar pasta cliente + briefing pós-aceite"
  - condicao: "follow-up de relatório semanal"
    skill: relatorio-ads
    razao: "Anexar relatório ao email warm/recorrente"

requires_skills_anteriores:
  - condicao: "newsletter sem conteúdo de base"
    skill: publicar-tema
    razao: "Conteúdo recorrente alimenta newsletter"
  - condicao: "proposta sem briefing cliente"
    skill: proposta-cliente
    razao: "Briefing primeiro, depois email envia"
```

## Limitações honestas

- **Gmail/Workspace App Password** depende de 2FA configurado no cliente
- **Rate limits SMTP Gmail:** 500 emails/dia (free) ou 2000/dia (Workspace) — Resend/SendGrid pra volume maior
- **Bounces + unsubscribe** não tratados em v1 (skill futura `email-marketing-completo`)
- **A/B test de subject** não implementado
- **HTML rich newsletter** suportado mas básico — sem template builder visual
- **Não substitui Mailchimp / Brevo / RD Station** em campanha de email marketing escala — gera MVP

## Origem

Frente A7 do plano 16 frentes Davi 2026-05-22. Padrão observado em best practices de cold email (HubSpot, Lemlist blog) + email transacional (Resend docs, SendGrid docs) — re-implementação universalizada:
- **Conceitos públicos:** subject line optimization, mobile-first email, CAN-SPAM compliance, App Password
- **Marca NÃO usada:** zero referência a "Mazzeo IA" / "MazyOS"

Skill base pra **pacote-padrão Davi** Pilar 4 — Contexto Fiel + Comunicação Recorrente.
