#!/usr/bin/env python3
"""
Hook H6 — check-lgpd
Detecta campos PII em arquivos modificados sem finalidade declarada.
Avisa mas NÃO bloqueia (para não parar commits legítimos).
A decisão de bloquear fica com o agente lgpd-auditor em revisões formais.
"""
import sys
import subprocess
import re
import os

PII_PATTERNS = [
    (r'\b(?:cpf|cnpj)\b', "CPF/CNPJ"),
    (r'\b(?:rg|identidade)\b', "RG/Identidade"),
    (r'\b(?:telefone|celular|whatsapp|phone)\b', "Telefone"),
    (r'\b(?:endereco|address|logradouro|cep)\b', "Endereço"),
    (r'\b(?:data_nascimento|birth_date|birthday|nascimento)\b', "Data de nascimento"),
    (r'\b(?:nome_completo|full_name|nome_mae|filiation)\b', "Nome completo/filiação"),
    (r'\b(?:cartao|card_number|numero_cartao)\b', "Número de cartão"),
    (r'\b(?:dados_saude|health_data|diagnostico|prontuario)\b', "Dados de saúde"),
    (r'\b(?:salario|income|renda|rendimentos)\b', "Dados financeiros"),
    (r'\b(?:biometria|fingerprint|reconhecimento_facial)\b', "Biometria"),
]

GOOD_SIGNS = [
    r'ripd',
    r'finalidade',
    r'base_legal',
    r'lgpd',
    r'consent',
    r'privacy',
]

def get_changed_files() -> list[str]:
    result = subprocess.run(
        ['git', 'diff', '--name-only', 'HEAD~1', 'HEAD'],
        capture_output=True, text=True
    )
    return result.stdout.strip().split('\n') if result.stdout.strip() else []

def main():
    changed_files = get_changed_files()
    pii_files = []

    for filepath in changed_files:
        if not os.path.isfile(filepath):
            continue
        ext = os.path.splitext(filepath)[1].lower()
        if ext not in {'.ts', '.tsx', '.js', '.jsx', '.py', '.sql', '.prisma'}:
            continue

        try:
            content = open(filepath, encoding='utf-8', errors='ignore').read().lower()
        except Exception:
            continue

        found_pii = [desc for pattern, desc in PII_PATTERNS if re.search(pattern, content)]
        has_lgpd_docs = any(re.search(p, content) for p in GOOD_SIGNS)

        if found_pii and not has_lgpd_docs:
            pii_files.append((filepath, found_pii))

    if pii_files:
        print(f"\n⚠️  [SCHOLZE-STACK] Campos PII detectados sem documentação LGPD:", file=sys.stderr)
        for filepath, pii_types in pii_files:
            print(f"   {filepath}: {', '.join(pii_types)}", file=sys.stderr)
        print(f"\n   Recomendação: documente no RIPD (docs/lgpd/ripd.md) e use o agente lgpd-auditor.", file=sys.stderr)
        print(f"   Este hook NÃO bloqueia — mas o lgpd-auditor pode bloquear o PR.", file=sys.stderr)

    sys.exit(0)  # avisa mas não bloqueia

if __name__ == "__main__":
    main()
