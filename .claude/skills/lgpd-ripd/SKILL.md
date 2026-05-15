# SKILL: lgpd-ripd

## Quando invocar
Ao iniciar qualquer projeto que colete dados de usuários brasileiros. O RIPD é obrigatório pela LGPD.

## Entrada
Nome do projeto + lista de dados coletados + finalidades.

## Saída esperada
`docs/lgpd/ripd.md` preenchido para o projeto.

## Template RIPD
```markdown
# RIPD — Relatório de Impacto à Proteção de Dados
## [Nome do Sistema] — versão 1.0 — [Data]

### 1. Identificação do Controlador
- Empresa: [Nome]
- CNPJ: [XX.XXX.XXX/XXXX-XX]
- DPO: [Nome e contato]

### 2. Operações de Tratamento

| Dado | Finalidade | Base Legal | Retenção | Compartilhado com |
|------|-----------|-----------|---------|-----------------|
| Email | Autenticação | Contrato (art. 7, V) | Enquanto conta ativa | Supabase Auth |
| CPF | Emissão NF | Obrigação legal (art. 7, II) | 5 anos | Receita Federal |
| Telefone | WhatsApp (opt-in) | Consentimento (art. 7, I) | Até revogação | — |

### 3. Medidas de Segurança
- Criptografia em trânsito: TLS 1.3
- Criptografia em repouso: AES-256 (Supabase)
- Controle de acesso: RLS + autenticação obrigatória
- Logs: sem dados PII nos logs de aplicação

### 4. Direitos dos Titulares
Endpoint: POST /api/lgpd/dsr
Prazo de resposta: 15 dias úteis
Tipos suportados: exportação, exclusão, retificação, portabilidade

### 5. Avaliação de Risco
- Impacto em caso de vazamento: [Alto/Médio/Baixo]
- Probabilidade: [Alta/Média/Baixa]
- Mitigações aplicadas: [lista]
```

## Base legal da LGPD (art. 7)
- **I** — Consentimento explícito
- **II** — Obrigação legal
- **V** — Execução de contrato
- **IX** — Legítimo interesse (com balancing test)
