---
name: lgpd-dsr-endpoint
description: >
  Gera endpoint `/api/lgpd/dsr` (Data Subject Request) que atende os 9 direitos
  do titular LGPD Art. 18: confirmação, acesso, correção, anonimização, portabilidade,
  eliminação, informação compartilhamento, revogação consentimento. Detecta stack
  (Next.js Route Handler, Express, FastAPI, NestJS) + ORM (Supabase, Prisma, Drizzle,
  SQLAlchemy) e gera código pronto + tests + schema da tabela `consentimentos_lgpd`
  (se ausente). Inclui rate limiting + auth obrigatória + audit log + delivery
  signed link 7 dias. Use sempre que disser "/lgpd-dsr-endpoint", "criar endpoint
  DSR", "Art. 18 LGPD", "direito acesso/deleção/portabilidade", "implementar
  exercício de direitos LGPD".

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
    project_path: "Path raiz do projeto consumidor"
    stack: "Next.js | Express | FastAPI | NestJS (auto-detecta se omitido)"
    orm: "Supabase | Prisma | Drizzle | SQLAlchemy (auto-detecta)"
  optional:
    auth_strategy: "Magic Link | OAuth | password | JWT (default: detecta do código)"
    storage_strategy: "filesystem | s3 | supabase-storage | gcs (pra entrega export ZIP)"
    rate_limit: "Limite default 3 requests/dia/usuário (configurável)"
    notify_dpo: "Email DPO recebe notificação a cada DSR (default: SIM)"

handoff_out:
  produces:
    endpoint: "src/app/api/lgpd/dsr/route.ts (Next.js) OR equivalente no stack"
    tests: "src/app/api/lgpd/dsr/__tests__/route.test.ts"
    migration: "supabase/migrations/<NNNN>_dsr_consentimentos_lgpd.sql (se tabela ausente)"
    docs: "docs/lgpd/dsr-endpoint.md (como usar, exemplos curl)"
    runbook: "docs/lgpd/dsr-runbook.md (procedimento operacional pra DPO)"
  paths:
    - "src/app/api/lgpd/dsr/"
    - "docs/lgpd/"
    - "supabase/migrations/"

quality_gates:
  - "Endpoint requer autenticação obrigatória (não-anônimo)"
  - "Rate limiting aplicado (3 req/dia/user default)"
  - "Audit log persistente (tabela `dsr_log` ou append-only file)"
  - "Tabela `consentimentos_lgpd` existe (ou migration criada)"
  - "DPO notificado por email a cada request"
  - "Prazo de resposta declarado: ≤15 dias úteis (Art. 19 §1º)"
  - "Output (export) entregue via signed URL 7 dias de validade"
  - "Testes cobrem 4 ações principais (acesso, correção, deleção, portabilidade)"

requires:
  blocking:
    - "Projeto tem sistema de auth funcional (Supabase Auth, NextAuth, etc)"
    - "Tabela `consentimentos_lgpd` existe OU migration permitida (DDL needs Davi OK)"
    - "Pack seguranca/lgpd-by-design instalado (templates)"
  recommended:
    - "RIPD prévio gerado via /lgpd-ripd (mapeia o schema)"
    - "Email transacional configurado (notificação DPO + entrega de signed URL)"
---

# Skill: `/lgpd-dsr-endpoint`

> Gerador automático de endpoint Art. 18 LGPD (Data Subject Request). **Implementa 9 direitos do titular em ~2h em vez de 2-3 dias manuais**.

## Princípio

LGPD Art. 18 garante 9 direitos ao titular dos dados. Sem endpoint funcional:
- Cliente exerce direito via email manual → 15 dias é prazo apertado pra processar à mão
- Risco operacional alto (perde requisição, erra deleção)
- ANPD pode autuar por descumprimento de prazo (Art. 19 §1º)
- Empresa parece amador pra cliente B2B exigente

Esta skill gera **endpoint pronto** + **rotinas async** + **audit log** + **runbook operacional**. DPO só precisa aprovar requisições, não processar manualmente.

## Quando disparar

**Triggers explícitos:**
- "/lgpd-dsr-endpoint"
- "criar endpoint DSR"
- "Art. 18 LGPD"
- "direito acesso/deleção/portabilidade"
- "implementar exercício de direitos LGPD"

**Triggers contextuais:**
- RIPD gerado em projeto (item 6 "Direitos do titular" sinaliza pendência)
- Cliente ou stakeholder exerceu direito manualmente (sinaliza necessidade)
- Auditoria interna ANPD/LGPD próxima

## Workflow (6 fases)

### Fase 1 — Detecção de stack + ORM

Auto-detectar em ordem:
1. `package.json` deps → `next` + `@supabase/supabase-js` → Next.js + Supabase
2. `package.json` deps → `express` + `prisma` → Express + Prisma
3. `requirements.txt` → `fastapi` + `sqlalchemy` → FastAPI + SQLAlchemy
4. Pasta `src/app/api/` → Next.js App Router
5. Pasta `pages/api/` → Next.js Pages Router

Se ambíguo, perguntar via AskUserQuestion.

### Fase 2 — Detecção/criação de `consentimentos_lgpd`

Procurar tabela `consentimentos_lgpd` em migrations. Schema esperado:

```sql
CREATE TABLE public.consentimentos_lgpd (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    titular_id      uuid REFERENCES public.profiles(id),  -- pode ser diferente de user_id (responsável legal Art. 14)
    finalidade      text NOT NULL,  -- ex: 'cobranca', 'marketing', 'saude_aluno_menor'
    base_legal      text NOT NULL,  -- ex: 'art_7_v_execucao_contrato', 'art_11_consentimento_sensivel'
    termo_versao    text NOT NULL,  -- ex: 'v1.0-2026-05-26'
    termo_hash      text NOT NULL,  -- SHA256 do termo aceito
    aceito_em       timestamptz NOT NULL DEFAULT now(),
    ip_aceito       inet,
    user_agent      text,
    revogado_em     timestamptz,  -- se titular revogou
    subject_deleted_at timestamptz  -- soft delete pra DSR Art. 18 IV
);

-- RLS: user só vê próprios consentimentos
ALTER TABLE public.consentimentos_lgpd ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_owns_consent" ON public.consentimentos_lgpd
    FOR SELECT USING (user_id = auth.uid() OR titular_id = auth.uid());
```

Se ausente, criar migration (com aprovação Davi — regra `sql-migrations.md`).

Plus tabela `dsr_log` pra auditoria:

```sql
CREATE TABLE public.dsr_log (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         uuid NOT NULL REFERENCES auth.users(id),
    action          text NOT NULL CHECK (action IN ('access', 'correction', 'anonymization', 'portability', 'deletion', 'consent_revocation', 'information_sharing')),
    requested_at    timestamptz NOT NULL DEFAULT now(),
    completed_at    timestamptz,
    status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected', 'expired')),
    rejection_reason text,
    export_url      text,  -- signed URL se action = portability/access
    export_expires_at timestamptz,
    ip_requested    inet,
    user_agent      text
);
```

### Fase 3 — Geração do endpoint

Template Next.js Route Handler (`src/app/api/lgpd/dsr/route.ts`):

```typescript
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimitDSR } from '@/lib/lgpd/rate-limit';
import { notifyDPO } from '@/lib/lgpd/notify-dpo';
import { exportUserData, anonymizeUser, deleteUser } from '@/lib/lgpd/actions';

const ALLOWED_ACTIONS = [
  'access',           // Art. 18, I + II
  'correction',       // Art. 18, III
  'anonymization',    // Art. 18, IV
  'portability',      // Art. 18, V
  'deletion',         // Art. 18, VI + IV
  'consent_revocation', // Art. 18, IX
  'information_sharing', // Art. 18, VII
] as const;

type DSRAction = typeof ALLOWED_ACTIONS[number];

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  // Rate limit (3 req/dia/user default)
  const rateLimited = await rateLimitDSR(user.id, req.ip);
  if (rateLimited) return NextResponse.json({ error: 'rate_limit_exceeded', retry_after: rateLimited.retry_after }, { status: 429 });

  const body = await req.json();
  const action = body.action as DSRAction;
  if (!ALLOWED_ACTIONS.includes(action)) {
    return NextResponse.json({ error: 'invalid_action', allowed: ALLOWED_ACTIONS }, { status: 400 });
  }

  // Log request
  const { data: log } = await supabase.from('dsr_log').insert({
    user_id: user.id,
    action,
    ip_requested: req.ip,
    user_agent: req.headers.get('user-agent'),
  }).select().single();

  // Notify DPO
  await notifyDPO({ user_email: user.email, action, log_id: log!.id });

  // Async processing (dispatch to background)
  let result;
  try {
    switch (action) {
      case 'access':
      case 'portability':
        result = await exportUserData(user.id, action);
        break;
      case 'correction':
        result = { redirect_to: '/dashboard/profile/edit' };
        break;
      case 'anonymization':
        result = await anonymizeUser(user.id);
        break;
      case 'deletion':
        // 30-day grace period (Art. 18 §3º + boas práticas)
        result = await deleteUser(user.id, { graceDays: 30 });
        break;
      case 'consent_revocation':
        result = await supabase.from('consentimentos_lgpd')
          .update({ revogado_em: new Date().toISOString() })
          .eq('user_id', user.id)
          .eq('finalidade', body.finalidade);
        break;
      case 'information_sharing':
        result = await getSharingInfo(user.id);  // lista sub-processadores que tocaram dados
        break;
    }

    await supabase.from('dsr_log').update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      export_url: result?.signed_url,
      export_expires_at: result?.signed_url_expires_at,
    }).eq('id', log!.id);

    return NextResponse.json({
      success: true,
      action,
      log_id: log!.id,
      result,
      prazo_legal: '15 dias úteis (Art. 19 §1º LGPD)',
    });
  } catch (err) {
    await supabase.from('dsr_log').update({
      status: 'rejected',
      rejection_reason: (err as Error).message,
    }).eq('id', log!.id);

    return NextResponse.json({ error: 'processing_failed', detail: (err as Error).message }, { status: 500 });
  }
}
```

### Fase 4 — Geração de helpers em `src/lib/lgpd/`

- `rate-limit.ts` — Redis ou Supabase-based rate limiting
- `notify-dpo.ts` — email transacional (Resend/SendGrid)
- `actions.ts` — exportUserData, anonymizeUser, deleteUser, getSharingInfo
- `delivery.ts` — signed URL generation (Supabase Storage / S3)

### Fase 5 — Geração de testes

`src/app/api/lgpd/dsr/__tests__/route.test.ts`:
- ✓ POST sem auth → 401
- ✓ POST com action inválida → 400
- ✓ POST com rate limit excedido → 429
- ✓ POST action='access' → retorna signed URL válida 7 dias
- ✓ POST action='deletion' → marca `subject_deleted_at` + agenda hard delete 30 dias
- ✓ POST action='portability' → JSON exportable
- ✓ POST action='consent_revocation' → atualiza `consentimentos_lgpd.revogado_em`
- ✓ DPO recebe email a cada request
- ✓ `dsr_log` persistido em todas casos (success, rejection)

### Fase 6 — Geração de docs + runbook

`docs/lgpd/dsr-endpoint.md` — como funciona, exemplos curl, integração frontend

`docs/lgpd/dsr-runbook.md` — procedimento operacional pra DPO:
- Como receber notificação
- Como aprovar/rejeitar requisição manualmente (se necessário)
- Como executar deleção definitiva pós-grace period
- Como responder ANPD em caso de auditoria
- Como atualizar quando RIPD muda

## Quando promover DRAFT → FUNCIONAL

1. Smoke test em ≥1 projeto real (dojo Sprint 4)
2. Todos 7 actions funcionais
3. Rate limit testado contra abuse
4. DPO notification confirmada
5. Signed URL com expiração testada
6. Hard delete pós-grace testado
7. Evidence Bloc em sessão `/complete`

## Limitações honestas

- Generated code é boilerplate — cliente precisa ajustar lógica de negócio específica (ex: o que conta como "todos os dados do usuário" depende do schema)
- Anonimização real exige análise de re-identificação (k-anonimidade) — esta skill faz simples (hash + replace), não k-anon
- Hard delete cascade depende de FK declaradas corretamente no schema
- Sub-processadores no `information_sharing` precisam ser declarados manualmente (lista do RIPD)
- Não cobre cliente que está sob investigação criminal (Art. 16) — DPO precisa intervir

## Skills/agents relacionados

- Skill irmã: `/lgpd-ripd` (gera RIPD que mapeia schema e finalidades)
- Agent: `lgpd-auditor` (verifica compliance do endpoint pós-geração)
- Pack irmão: `2-PACKS/packs/seguranca/lgpd-by-design/` (templates + helpers)
- Política: `1-ESQUELETO/politicas/lgpd.md`

## Origem

Davi backlog 2026-05-25 noite item B.5 + audit `LGPD-AUDIT-PROJETOS-CONSUMIDORES.md` (commit `b6400f3`) confirmou skill referenciada em `lgpd-menor-saas-educacao.md` mas NÃO EXISTENTE. Esta skill operacionaliza Art. 18 LGPD.
