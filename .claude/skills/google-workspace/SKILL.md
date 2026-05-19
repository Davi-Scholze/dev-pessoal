---
name: google-workspace
description: >
  Integra com Google Workspace (Drive, Sheets, Docs) via APIs oficiais — leitura,
  escrita, monitoramento de pastas, sincronização banco. Use sempre que disser
  "Google Drive", "Google Sheets", "/google-workspace", "ler planilha do Drive",
  "monitorar pasta Drive", "automatizar fluxo Drive→banco", ou ao receber
  referência a URL `drive.google.com/...` ou `docs.google.com/spreadsheets/...`.
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep]
---

# /google-workspace — Integração com Google Workspace

> Status: **FUNCIONAL** (bundled em 2026-05-18, re-implementação universalizada). Skill original era acoplada a um projeto específico; reescrita aqui pra ser reutilizável por qualquer comprador KOD.AI.

## Princípio

Automatiza acesso programático a Google Drive, Sheets e Docs via APIs oficiais. Cobre os 3 fluxos comuns:

- **Leitura** — listar arquivos em pasta, baixar `.ods`/`.xlsx`/`.csv`, ler ranges de Sheets
- **Escrita** — atualizar Sheets, criar arquivos no Drive
- **Monitoramento** — detectar mudanças em pastas via Changes API

## Quando usar

- Cliente armazena dados em Google Drive e você precisa importar pro banco do app
- Precisa ler planilha que stakeholder atualiza manualmente
- Quer escrever relatório de volta numa Sheet
- Configurar OAuth 2.0 ou Service Account pra autenticação Google

## Quando NÃO usar

- Acesso pessoal (browser) — não é skill de automação web; é API server-side
- Gmail (use `googleapis` separadamente ou skill dedicada futura)
- Google Forms (API distinta — fora do escopo desta skill)

## Capacidades

### 1. Google Drive API

| Operação | Comando típico |
|---|---|
| Listar arquivos em pasta (por folder ID) | `drive.files.list({ q: "'FOLDER_ID' in parents" })` |
| Baixar arquivo `.ods`/`.xlsx`/`.csv` | `drive.files.get({ fileId, alt: 'media' })` |
| Detectar mudanças em pasta | `drive.changes.list({ pageToken })` |
| Listar permissões | `drive.permissions.list({ fileId })` |

### 2. Google Sheets API

| Operação | Comando típico |
|---|---|
| Ler range | `sheets.spreadsheets.values.get({ spreadsheetId, range: 'Sheet1!A1:Z' })` |
| Escrever range | `sheets.spreadsheets.values.update({ spreadsheetId, range, valueInputOption, resource })` |
| Append | `sheets.spreadsheets.values.append(...)` |
| Batch ops | `sheets.spreadsheets.values.batchUpdate(...)` |

### 3. Google Docs API (futuro)

Cobertura mínima — adicionar quando demanda real aparecer.

## Autenticação — escolher o caminho certo

| Cenário | Método |
|---|---|
| **Acesso server-to-server** (cron, scripts automatizados, sem usuário interativo) | **Service Account** + JSON key + delegação |
| **Acesso em nome do usuário final** (app web onde cliente loga via Google) | **OAuth 2.0** + Authorization Code flow + refresh token |
| **Acesso pessoal do dev pra testes locais** | **OAuth 2.0** + flow simples local |

**Recomendação default:** Service Account quando o app é o único consumidor do recurso (mais simples + seguro). OAuth quando precisa identidade do usuário final.

### Setup de Service Account (passo a passo genérico)

1. Acessa [Google Cloud Console](https://console.cloud.google.com)
2. Cria projeto (ou usa existente)
3. Habilita API: "Google Drive API" + "Google Sheets API"
4. Cria Service Account em `IAM & Admin → Service Accounts`
5. Gera key JSON, baixa
6. **Compartilha** a pasta/planilha alvo COM o email da Service Account (Editor ou Viewer)
7. Salva JSON path em `.env` (nunca comita — regra-base #5)
8. Carrega no app via `google-auth-library`

### Setup OAuth 2.0 (app multi-usuário)

1. Cloud Console → APIs & Services → Credentials → Create OAuth Client ID
2. Define redirect URI (ex: `https://meuapp.com/auth/google/callback`)
3. Configura escopos mínimos necessários (princípio least-privilege)
4. Armazena `client_id` + `client_secret` em `.env`
5. Implementa fluxo Authorization Code (redirect → callback → trade code for tokens → refresh)

## Padrão de uso na skill

```javascript
// Node.js / TypeScript
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

const drive = google.drive({ version: 'v3', auth });
const sheets = google.sheets({ version: 'v4', auth });

// Lista arquivos numa pasta
const { data } = await drive.files.list({
  q: `'${process.env.DRIVE_FOLDER_ID}' in parents and trashed=false`,
  fields: 'files(id, name, mimeType, modifiedTime)',
});
```

## Variáveis de ambiente recomendadas

```env
# Service Account (server-to-server)
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./credentials/service-account.json
# OU JSON inline (preferido em ambientes serverless tipo Vercel):
GOOGLE_SERVICE_ACCOUNT_KEY={"type": "service_account", "project_id": "...", ...}

# OAuth 2.0 (multi-usuário)
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
GOOGLE_OAUTH_REDIRECT_URI=https://meuapp.com/auth/google/callback

# Targets do app (definidos por projeto)
DRIVE_FOLDER_ID=...
SHEETS_SPREADSHEET_ID=...
```

## Skills relacionadas

- **`/transcribe-audio`** — pra áudio do Drive
- **`/absorver-contexto`** — quando contexto Workspace precisa virar contexto KODAI
- **Politicas**: `/politicas/verificar-infra-real.md` (verifica que conta + pasta existem antes de planejar); `/politicas/alertas-risco.md` (Workspace tem free tier limits)

## Custos & limites

- **Drive API:** quota generosa (cota free). Sheets API tem rate limit (~300 leituras/min/projeto). Monitorar via `quotas` no Cloud Console.
- **Service Account:** sem cobrança direta. Custo está em armazenamento Drive consumido (se app cria arquivos).
- **OAuth 2.0:** sem cobrança. Refresh tokens duram 6 meses sem uso; renova em qualquer acesso.

## Segurança (regra-base #5: zero credenciais no código)

- Service Account JSON **nunca** comita
- `.env` no `.gitignore`
- Em produção, usa secrets manager (Vercel Env Vars, AWS Secrets Manager, etc) — não arquivo no servidor
- Princípio least-privilege: dá apenas escopo necessário (`drive.readonly` se só lê, não `drive` completo)
- **Audit log:** logar quais arquivos/ranges foram acessados, especialmente em apps multi-tenant

## Anti-padrões

| ❌ Errado | ✅ Certo |
|---|---|
| Hardcode JSON key no código | Usa `.env` + secret manager em prod |
| Pedir `drive` scope quando precisa só ler | Usa `drive.readonly` |
| Compartilhar pasta Drive com pessoa, não Service Account | Compartilha com o **email** da Service Account |
| OAuth refresh token sem rotation policy | Implementa rotação + revogação em logout |
| Acesso sem retry/backoff em rate limit | Implementa exponential backoff em 429 |

## Atribuição

Esta skill foi **bundled em 2026-05-18** por re-implementação universalizada a partir de skill local da máquina dev (que era específica a um projeto Navortech/TrackOps). O conteúdo aqui é versão **genérica reutilizável** — toda referência ao projeto original foi removida pra servir qualquer comprador KOD.AI. Capacidade central (Drive API + Sheets API + autenticação) é universal e usa `googleapis` oficial. Ver `manifest.yaml` desta pasta + `LICENSES.md` na raiz do KODAI.

## Diferenças vs source original

- Removidas TODAS as referências a TrackOps, Transposeg, Sandra, "Fase 1.5"
- Removida variável específica `VITE_GOOGLE_DRIVE_FOLDER_ID` (substituída por `DRIVE_FOLDER_ID` genérica)
- Adicionados 3 cenários de autenticação (Service Account, OAuth 2.0, dev local) — original só cobria Service Account
- Adicionada seção "Anti-padrões" + "Segurança" + "Custos & limites"
- Adicionado código Node.js exemplo
- Linguagem PT-BR mantida (consistente com bundle bilíngue do KOD.AI)
