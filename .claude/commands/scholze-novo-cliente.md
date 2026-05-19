# /scholze-novo-cliente

Cria a pasta completa de um novo cliente a partir do template padrão.

## Como usar
```
/scholze-novo-cliente
```

O agente vai perguntar: nome do cliente, nicho, serviços contratados e nível de integração Google.

## O que faz

1. Pergunta os dados do cliente:
   - Nome da empresa
   - CNPJ
   - Contato e WhatsApp
   - Instagram
   - Nicho (contabilidade, saúde, educação, etc.)
   - Serviços contratados (checkboxes)
   - Nível de integração Google (1-4)
   - Stack desejada

2. Copia `_dev/ferramentas/templates/cliente-novo/` para `Repositorios/[nome-cliente]/`

3. Preenche todos os `[colchetes]` no CLAUDE.md do cliente

4. Cria `dados/brand-config.json` com identidade visual inicial

5. Cria `dados/entrevista.md` com perguntas para a reunião de onboarding

6. Sugere próximos passos:
   - `git init` e criar repo privado
   - `/scholze-init` para inicializar o CLAUDE.md local
   - Checklist de onboarding em `docs/playbooks/como-adicionar-cliente.md`

## Critério de sucesso
Pasta `Repositorios/[nome-cliente]/` criada e pronta para primeira sessão de trabalho.
