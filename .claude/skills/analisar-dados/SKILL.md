---
name: analisar-dados
description: >
  Analisa arquivo CSV / Excel (.xlsx) / JSON e gera insights via pandas
  (Python) — estatística descritiva, top N, distribuições, correlações,
  detecção de anomalias, gráficos (matplotlib). Output: relatório Markdown +
  PNGs + CSV processado. Templates pra casos comuns (vendas mensais, leads,
  reviews, métricas Ads, financeiro). Não substitui BI premium, gera análise
  exploratória rápida. Use quando disser "analisa esse CSV", "/analisar-dados",
  "o que esses dados dizem", "insights desta planilha".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - AskUserQuestion
---

# Skill: `/analisar-dados`

Análise exploratória de **CSV / Excel / JSON** — relatório Markdown + gráficos PNG — em uma rodada.

## Princípio

> **Dado bruto → insight legível em <5 min.** Davi joga o CSV, KOD.AI roda pandas, gera relatório + gráficos. Não substitui Looker Studio / Power BI / Metabase — gera primeira análise sólida pra decidir próximo passo.

## Quando disparar

- "/analisar-dados <path-do-arquivo>"
- "analisa esse CSV"
- "o que esses dados dizem"
- "insights desta planilha"
- "métricas do <relatório>"

## Templates suportados

| Template | Detecção (heurística) | Análises padrão |
|---|---|---|
| **vendas-mensais** | colunas "data", "valor"/"preço", "cliente"/"produto" | Soma por mês + top 10 clientes + sazonalidade + ticket médio + LTV simples |
| **leads** | colunas "email", "fonte"/"origem", "status" | Conversão por fonte + funil + tempo médio status |
| **reviews** | colunas "nota"/"rating", "data", "comentário" | Distribuição estrelas + NPS estimado + sentimento por mês + temas frequentes (top N-grams) |
| **metricas-ads** | colunas "campanha", "impressões", "cliques", "custo" | CTR + CPC + CPA por campanha + Δ tempo + outliers |
| **financeiro** | colunas "data", "categoria", "débito"/"crédito" | DRE simples + categorias top + tendência + projeção 3 meses |
| **genérico** | qualquer outro | Estatística descritiva + missing values + correlações + outliers |

## Dependências

```bash
# Setup 1× por máquina
pip install pandas openpyxl matplotlib seaborn
```

| Recurso | Onde |
|---|---|
| Arquivo de entrada | path passado pelo Davi |
| Cliente (opcional) | `_negocio/clientes/<slug>/` |
| Output | `_negocio/clientes/<slug>/analises/<arquivo-slug>-<YYYY-MM-DD>/` ou `_memoria/analises/<...>` se não for cliente-específico |

## Workflow 5 passos

### Passo 1 — Inspeção inicial

```python
import pandas as pd

# Auto-detecta formato
if path.endswith('.csv'):
    df = pd.read_csv(path, encoding_errors='replace')
elif path.endswith('.xlsx'):
    df = pd.read_excel(path)
elif path.endswith('.json'):
    df = pd.read_json(path)

print(df.shape)
print(df.dtypes)
print(df.head())
print(df.describe(include='all'))
print(df.isnull().sum())
```

Reporta:
- Total linhas + colunas
- Tipos de dado por coluna
- Missing values
- Primeiras 5 linhas
- Estatística descritiva

### Passo 2 — Detecção de template

Heurística simples sobre nomes de colunas (case-insensitive, normalização). Se ambiguidade, pergunta:

```
Detectei colunas que sugerem [vendas-mensais].
Confirma esse template ou é outro tipo?
1. vendas-mensais
2. leads
3. reviews
4. metricas-ads
5. financeiro
6. genérico
```

### Passo 3 — Análise por template

**vendas-mensais:**
```python
df['data'] = pd.to_datetime(df['data'])
df['mes'] = df['data'].dt.to_period('M')
soma_mes = df.groupby('mes')['valor'].sum()
top_clientes = df.groupby('cliente')['valor'].sum().nlargest(10)
ticket_medio = df['valor'].mean()
# Gera 3 gráficos: linha tempo, barra top clientes, histograma ticket
```

**reviews:**
```python
dist_estrelas = df['nota'].value_counts().sort_index()
nps = (df['nota'] >= 4).mean() * 100 - (df['nota'] <= 2).mean() * 100
# Sentimento simples por mês via heurística (positivo/negativo word lists)
# Top n-grams nos comentários (CountVectorizer simples)
```

**Genérico:**
```python
df.describe()
df.corr()  # se numérico
df.isnull().sum()
# Detecta outliers via IQR
# Gera correlation matrix heatmap se >1 coluna numérica
```

### Passo 4 — Gráficos

Matplotlib + seaborn (estilo limpo, paleta KOD.AI):

```python
import matplotlib.pyplot as plt
plt.style.use('seaborn-v0_8-whitegrid')
fig, ax = plt.subplots(figsize=(10, 6), dpi=120)
# Plot...
plt.tight_layout()
plt.savefig(f'{output_dir}/grafico-01-vendas-por-mes.png', bbox_inches='tight')
plt.close()
```

3-7 gráficos por análise (não inundar). PNG 1200×720 (boa pra Markdown + relatório PDF).

### Passo 5 — Relatório Markdown

```markdown
# Análise — <nome-arquivo> — 2026-05-22

## TL;DR
[3-5 bullets dos achados principais]

## Visão geral
- Linhas: X
- Colunas: Y
- Período: <data início> a <data fim>
- Missing: Z% em <coluna>

## Achados principais

### Achado 1: <título>
[descrição + gráfico inline]
![grafico](grafico-01-...)

### Achado 2: <título>
...

## Anomalias detectadas
- ...

## Recomendações
1. [acionável]
2. ...

## Anexos
- `dados-processados.csv` (limpo)
- `graficos/` (todos PNGs)
- `script-analise.py` (Python reproduzível)
```

## Output canônico

```
<output_dir>/
├── relatorio.md
├── relatorio.pdf (opcional via Pandoc)
├── dados-processados.csv      Versão limpa (sem nulls/dups)
├── script-analise.py          Reproduzível
├── graficos/
│   ├── grafico-01-...png
│   ├── grafico-02-...png
│   └── ...
└── manifest.yaml
```

## Quality Gates

```yaml
quality_gates:
  - "TL;DR ≤5 bullets (executivo lê primeiro)"
  - "Mín 3 gráficos, máx 7 (sem inundar)"
  - "Dados processados anexados (auditável)"
  - "Script Python anexo (reproduzível)"
  - "Recomendações: mín 3 + acionáveis (não 'analise mais')"
  - "Anomalias destacadas separadamente"
  - "Encoding tratado (CSV BR usa ; e UTF-8 com BOM frequente)"
  - "Datas parseadas corretamente (DD/MM/AAAA brasileiro vs ISO)"
  - "Valores BR com vírgula decimal tratados (locale pt_BR)"
```

## Anti-padrões

| Padrão | Problema | Correção |
|---|---|---|
| Plotar 30 gráficos | Cliente não lê | Curar 3-7 |
| "Médias" sem distribuição | Esconde outliers | Sempre min/max/p50/p95 |
| Ignorar encoding | CSV BR quebra (ã vira ã) | `encoding='utf-8-sig'` ou detecção |
| Decimal `.` em CSV BR | "10,50" vira NaN | `decimal=','` |
| Análise sem recomendação | Insight orfão | Sempre "logo, ..." acionável |
| Gráfico sem título/eixos | Print viraliza errado | matplotlib title + xlabel + ylabel |
| Conclusão antes de inspecionar nulls | "Dados não batem" | Sempre `isnull().sum()` primeiro |
| Esquecer fuso horário em datas | Vendas "no dia errado" | `tz='America/Sao_Paulo'` quando aplicável |

## Bridging com outras skills

```yaml
sugere_proxima_skill:
  - condicao: "análise revela problema de campanha"
    skill: anuncio-google
    razao: "Reajustar campanha Google Ads"
  - condicao: "análise revela tema de reviews crítico"
    skill: responder-avaliacoes-gmb
    razao: "Resposta proativa às reviews padrão crítico"
  - condicao: "análise vai virar relatório recorrente"
    skill: relatorio-ads
    razao: "Estruturar relatório semanal/mensal"
  - condicao: "análise revela cliente top a manter"
    skill: email-profissional
    razao: "Email warm de retenção/upsell"

requires_skills_anteriores: []  # skill terminal (não depende de outras)
```

## Limitações honestas

- **Não substitui BI premium** (Looker / Power BI / Metabase) em dashboard recorrente
- **Não treina ML** — só análise exploratória (média/mediana/correlação/outlier IQR)
- **Sentimento de texto** v1 usa heurística word-list — sem modelo trained
- **Dados ≥1M linhas** podem ser lentos em pandas single-thread — pra big data usar polars (futuro)
- **Não conecta a banco direto** — espera arquivo (CSV/XLSX/JSON exportado)
- **Visualizações estáticas** — sem interatividade (Plotly em futura iteração)

## Origem

Frente A8 do plano 16 frentes Davi 2026-05-22. Padrão observado em EDA (exploratory data analysis) clássico de data science — re-implementação universalizada:
- **Vocabulário público:** EDA, descriptive statistics, outliers (IQR), correlation matrix, NPS, ticket médio, LTV
- **Bibliotecas OSS:** pandas, matplotlib, seaborn, openpyxl (todas Apache/BSD/MIT)
- **Marca NÃO usada:** zero referência a "Mazzeo IA" / "MazyOS"

Skill base pra **pacote-padrão Davi** Pilar 5 — CRM-light + KPIs Recorrentes (análise sob demanda).
