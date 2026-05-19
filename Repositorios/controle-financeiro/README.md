# Controle Financeiro — Davi & Sasa

Pasta de trabalho do controle financeiro pessoal/familiar do casal Scholze.

## Arquivos

| Arquivo | O que é |
|---|---|
| `Controle Financeiro - Davi & Sasa.xlsx` | Planilha de trabalho. Cópia do arquivo original do `Downloads`. |
| `HANDOFF-PARA-SASA.md` | Carta-guia de onde paramos na sessão atual — escrita pra leitor humano não-técnico (PT-BR direto). |
| `README.md` | Este arquivo. |

## Sessão atual

- **Última sessão:** 2026-05-18 (Davi)
- **Próxima sessão:** Sasa retoma na aba `Maio - 0526`
- **Estado da planilha:** inalterada — só foi copiada do `Downloads` pra cá; nenhuma célula modificada nesta sessão.

## Estrutura da planilha (aba mensal)

Cada mês (Abril, Maio, ..., Outubro) segue o mesmo template:

1. **L1** — Cabeçalho + Total + Fontes de Renda (à direita)
2. **L2-L15** — Despesas Fixas (Dízimo, Aluguel, Condomínio, Luz, Internet, Faculdade, MEI, Academias, Spotify, Uber, Petshop)
3. **L18-L69** — Cartões de Crédito (Nubank Sabrina, Bradesco Sabrina, C6 Sabrina, Nubank Davi, Inter Davi, Mercado Pago) com sub-totais por cartão e `quant_falt_paraKitar` por parcela
4. **L70-L77** — Débito / Pix
5. **L80-L86** — Despesas Variáveis do Mês (Mercado, finais de semana, locomoções)
6. **L89-L107** — Saldo Disponível + Investimentos por categoria (aposentadoria, casa, gatas, reserva emergência, viagens, carro, vestuário, computador, celulares, eletro, presentes)

## Pendências conhecidas (não-bloqueantes)

- [ ] Uniformizar fórmulas em cascata na coluna G "desconto_do_total" das Despesas Fixas (algumas linhas com `-`, outras com fórmula)
- [ ] Renomear cabeçalho L1 da aba `Junho - 0626` (atualmente diz "CONTROLE FINANCEIRO DE MAIO")
- [ ] Criar abas `Novembro - 1126` e `Dezembro - 1226` (fim de ano)

## Como retomar (pra IA na próxima sessão)

1. Ler este `README.md` + `HANDOFF-PARA-SASA.md`
2. Abrir a planilha via Excel COM (pywin32 já instalado — Python 3.12)
3. Continuar do ponto que estiver registrado no HANDOFF.
