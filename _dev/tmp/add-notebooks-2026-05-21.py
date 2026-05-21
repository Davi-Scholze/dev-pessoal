#!/usr/bin/env python3
"""
Adiciona ~75 NotebookLMs do Davi à library oficial da skill /notebooklm.
Preserva entradas existentes; pula duplicatas por URL.

Uso:
    python add-notebooks-2026-05-21.py [--dry-run]
"""

import json
import re
import sys
from pathlib import Path
from datetime import datetime

LIBRARY_PATH = Path.home() / ".claude" / "skills" / "notebooklm" / "data" / "library.json"
DRY_RUN = "--dry-run" in sys.argv

# Lista enviada por Davi em 2026-05-21
# Formato: (prefix, category, name, url)
NOTEBOOKS = [
    # CNTX UNI - [Meta] IA & Engenharia de Contexto / Claude Code
    ("CNTX UNI", "Meta", "Especialista em Claude Code", "https://notebooklm.google.com/notebook/5d27dbd5-a9cf-494b-8b2c-a0721cb8a32f"),
    ("CNTX UNI", "Meta", "Engenharia de Contexto para IAs", "https://notebooklm.google.com/notebook/0a35ebd8-5d7c-46e7-9b3f-4f813b105775"),
    ("CNTX UNI", "Meta", "Estrutura de Contextos para IA", "https://notebooklm.google.com/notebook/d1f1e975-4317-42d2-9787-6e1f819e9e1d"),
    ("CNTX UNI", "Meta", "Claude Essentials: 7 Daily Skills and Installation Guide", "https://notebooklm.google.com/notebook/fa25b951-f72d-40cb-af23-9e6d6bae44ad"),
    ("CNTX UNI", "Meta", "Claude Code — Skills, Agents, MCPs e Superpowers", "https://notebooklm.google.com/notebook/6e41649d-3ef4-4434-a57a-4b08cffa6b63"),
    ("CNTX UNI", "Meta", "Prompt & Context Engineering for Coding Agents", "https://notebooklm.google.com/notebook/713e5a95-e8a5-44d3-9720-19394e36ca16"),
    ("CNTX UNI", "Meta", "Harness Engineering for AI Coding Agents", "https://notebooklm.google.com/notebook/9837921b-f513-4dd0-8efe-30ace746bafb"),
    ("CNTX UNI", "Meta", "External Platform Context Folder for AI Coding Agents", "https://notebooklm.google.com/notebook/a983bf02-fba7-4a11-8fb4-787d82796c45"),
    ("CNTX UNI", "Meta", "Token Economy — Claude Code & Anthropic API", "https://notebooklm.google.com/notebook/445c6a63-c4a7-491b-9585-58b6f8222a3b"),

    # CNTX UNI - [Arquitetura]
    ("CNTX UNI", "Arquitetura", "Software Architecture Patterns", "https://notebooklm.google.com/notebook/4067feb5-99c9-465d-aa1d-34e6cf2006f8"),
    ("CNTX UNI", "Arquitetura", "Domain-Driven Design (DDD) prático", "https://notebooklm.google.com/notebook/fcd117ee-35d1-4842-a929-42ca85cb6504"),
    ("CNTX UNI", "Arquitetura", "Multi-tenant SaaS Architecture", "https://notebooklm.google.com/notebook/d3bc41bf-567d-4345-8bd9-cfea6b9132cb"),
    ("CNTX UNI", "Arquitetura", "Event-Driven Architecture", "https://notebooklm.google.com/notebook/1aaa0a23-cdd9-4ac4-842c-b96d22dad9f6"),
    ("CNTX UNI", "Arquitetura", "API Design & Contracts", "https://notebooklm.google.com/notebook/8458ea29-8ea8-4fc5-bc35-2412cfbedb9e"),
    ("CNTX UNI", "Arquitetura", "System Integration Patterns", "https://notebooklm.google.com/notebook/c97cf8d7-14c8-486c-ae59-89019cb4b93f"),
    ("CNTX UNI", "Arquitetura", "Authorization Patterns", "https://notebooklm.google.com/notebook/c94bfac5-c480-4b86-95ee-c59340b4fe83"),

    # CNTX UNI - [Stack] Tecnologias
    ("CNTX UNI", "Stack", "React 19 — Hooks & Performance", "https://notebooklm.google.com/notebook/17700937-725c-4aca-8dc7-0ad2caeddee3"),
    ("CNTX UNI", "Stack", "React State Management — Context, Zustand, Patterns", "https://notebooklm.google.com/notebook/addb32ba-689a-41f7-945a-e6ece85e906d"),
    ("CNTX UNI", "Stack", "Supabase Auth & RLS", "https://notebooklm.google.com/notebook/7de26581-6214-4157-8d36-1193afe6b15a"),
    ("CNTX UNI", "Stack", "Supabase Edge Functions & Realtime", "https://notebooklm.google.com/notebook/fd0df7f6-f6f4-4525-904c-6e31a5d321c0"),
    ("CNTX UNI", "Stack", "PostgreSQL Avançado — Schema, Indexes, Performance", "https://notebooklm.google.com/notebook/5f4af17c-2e63-4d97-97e8-71c6ecf753b1"),
    ("CNTX UNI", "Stack", "Vite — Build, Dev Server, Plugins", "https://notebooklm.google.com/notebook/63feddd2-6bd4-45b6-a601-e842ad56d121"),
    ("CNTX UNI", "Stack", "Vercel — Deploy, CI/CD, Edge, Env Vars", "https://notebooklm.google.com/notebook/a240759d-3bfc-4e59-bbda-2281514227e8"),
    ("CNTX UNI", "Stack", "Login, Auth & User Management — Web (React + Supabase)", "https://notebooklm.google.com/notebook/d53549c2-2f81-4128-b799-fc34a3138cfe"),
    ("CNTX UNI", "Stack", "JavaScript Barcode and QR Code Scanning Libraries", "https://notebooklm.google.com/notebook/bb3af2f6-2399-487d-bc26-77647c288c05"),
    ("CNTX UNI", "Stack", "PWA Progressive Web Apps (estado da arte 2026)", "https://notebooklm.google.com/notebook/91e8f0fc-591c-4913-8534-5c523f819836"),

    # CNTX UNI - [UI/UX] & Design
    ("CNTX UNI", "UI/UX", "Operational Dashboards — Interativos, KPIs, Drill-down", "https://notebooklm.google.com/notebook/5c5df5c3-fb28-40c9-a852-a1cee39bc250"),
    ("CNTX UNI", "UI/UX", "Data Tables Avançadas — Filtering, Sorting, Virtualization", "https://notebooklm.google.com/notebook/c4a94d71-0d8d-4e3b-83d3-5f01f128b283"),
    ("CNTX UNI", "UI/UX", "Forms & Data Entry — Validation, Auto-save, Multi-step", "https://notebooklm.google.com/notebook/804f6b00-24e0-4c65-aa12-a5f081814ef6"),
    ("CNTX UNI", "UI/UX", "Advanced Filters & Bulk Selection", "https://notebooklm.google.com/notebook/8b5710f7-730e-4870-bfeb-0d6d9c0eb6b2"),
    ("CNTX UNI", "UI/UX", "Search Experience — Autocomplete, Facets, Results", "https://notebooklm.google.com/notebook/129bd4a6-6df8-4689-9389-1786c4fa19f2"),
    ("CNTX UNI", "UI/UX", "Data Visualization — Charts, Dashboards & Design Systems", "https://notebooklm.google.com/notebook/be70a808-b277-4de8-9aa2-f635e42fbbc7"),
    ("CNTX UNI", "UI/UX", "CSS Layout, Positioning & Responsive Dark-Mode Dashboards", "https://notebooklm.google.com/notebook/80755a80-41af-4001-9903-59a5b9c9a552"),
    ("CNTX UNI", "UI/UX", "UX Universal + Responsividade SMB — Base Canônica Multiplataforma", "https://notebooklm.google.com/notebook/216c85a8-2e63-4ddc-96dc-6a566ebcc81d"),

    # CNTX UNI - [Qualidade] Testes, Debugging & Performance
    ("CNTX UNI", "Qualidade", "Testing React — Vitest, Testing Library, E2E", "https://notebooklm.google.com/notebook/93d17dd2-3414-428e-9b51-08c13cfb5c95"),
    ("CNTX UNI", "Qualidade", "Systematic Debugging", "https://notebooklm.google.com/notebook/7432c36a-9ac6-4a86-a005-86698ddbde96"),
    ("CNTX UNI", "Qualidade", "Observability & Error Tracking", "https://notebooklm.google.com/notebook/cb1cc8f7-f89b-410e-868f-74cee81569a5"),
    ("CNTX UNI", "Qualidade", "Frontend Resilience — Error Boundaries, Large Datasets, Stability", "https://notebooklm.google.com/notebook/c04f41a5-ac8f-4c8b-93d4-083040f9811e"),
    ("CNTX UNI", "Qualidade", "SEO Técnico & Performance Web", "https://notebooklm.google.com/notebook/6675b1e0-3337-4bcb-9403-06ec92a6eb40"),
    ("CNTX UNI", "Qualidade", "Validação e Testes — Engenharia de Qualidade", "https://notebooklm.google.com/notebook/c0f73e7b-8c67-4fe9-8c79-623f9a0b5576"),

    # CNTX UNI - [Operação] Workflows & DevOps
    ("CNTX UNI", "Operação", "Workflow Automation — Queues, State Machines", "https://notebooklm.google.com/notebook/ff3282b1-ecc5-4cce-9c17-7648b5f485b0"),
    ("CNTX UNI", "Operação", "Webhooks & Idempotency Patterns", "https://notebooklm.google.com/notebook/872662e9-6599-4a0c-98db-3ec2f54f1308"),
    ("CNTX UNI", "Operação", "URLs, Domínios e DNS — Hostinger, Vercel, Subdomínios, SSL", "https://notebooklm.google.com/notebook/c346b667-7d3f-4c3c-95e6-9e44308e02e9"),

    # CNTX UNI - [Metodologia] Desenvolvimento
    ("CNTX UNI", "Metodologia", "Spec-Driven Development com Claude Code", "https://notebooklm.google.com/notebook/7e25223f-6ab9-420c-9fb6-107b0feda68a"),
    ("CNTX UNI", "Metodologia", "Git Flow — Conventional Commits, PRs, Code Review", "https://notebooklm.google.com/notebook/5d7486f4-9d25-4b43-986c-68fea33dbd5b"),
    ("CNTX UNI", "Metodologia", "Clean Code e Refactoring em JavaScript/React", "https://notebooklm.google.com/notebook/a02951f8-29b0-4531-b445-7123347f977c"),

    # CNTX UNI - [Integração] & APIs Externas
    ("CNTX UNI", "Integração", "Google Drive & Sheets API", "https://notebooklm.google.com/notebook/11879679-71c5-4343-b31a-41a5b58d7c8f"),

    # CNTX UNI - [Negócio] & Compliance
    ("CNTX UNI", "Negócio", "CRM & Sales Pipeline Patterns", "https://notebooklm.google.com/notebook/e7821468-e278-427d-bdcf-72dd4f216b50"),
    ("CNTX UNI", "Negócio", "Field Service / Service Order Systems", "https://notebooklm.google.com/notebook/e882f591-1c13-46db-9817-e31b2573fb93"),
    ("CNTX UNI", "Negócio", "LGPD + SaaS Multi-Tenancy", "https://notebooklm.google.com/notebook/34259a27-cba2-4995-8f89-f894a33ce0ec"),
    ("CNTX UNI", "Negócio", "B2B Revenue Engineering: Monetizing Automation and Micro-SaaS Architectures", "https://notebooklm.google.com/notebook/1b70ca58-0c13-4107-8acd-823e05effac8"),
    ("CNTX UNI", "Negócio", "Competitive Intelligence — Análise de Concorrentes SaaS", "https://notebooklm.google.com/notebook/baa4b34f-8108-42fb-bef9-60ea37371f64"),

    # CNTX UNI - Segurança
    ("CNTX UNI", "Segurança", "Guia de Hardening e Práticas de Segurança", "https://notebooklm.google.com/notebook/648aa320-4e15-41b9-ab29-d509d19a873f"),
    ("CNTX UNI", "Segurança", "Hub de Inteligência: Ameaças em Supply Chain e Incidentes Cloud", "https://notebooklm.google.com/notebook/1f9ab16d-59e7-4e4c-8446-17887c8eb68f"),

    # CNTX EPCF - KOD.AI / Estratégia de IA
    ("CNTX EPCF", "KODAI", "KOD.AI Executive Report: The 2026 Multi-Agent Corporate Ecosystem", "https://notebooklm.google.com/notebook/991b01dd-7561-4e9f-9e0e-ae33e3b7e048"),
    ("CNTX EPCF", "KODAI", "KOD.AI Strategic Blueprint for B2B AI Automation Dominance", "https://notebooklm.google.com/notebook/3b2cf0ec-8e46-43b8-afaf-fdfaeb0eda5a"),
    ("CNTX EPCF", "KODAI", "KODAI — Project Specific Context Architecture", "https://notebooklm.google.com/notebook/dca269d8-e6dd-43b5-ac11-8fcf288cc6a5"),
    ("CNTX EPCF", "KODAI", "CONCORRENTE KODAI - Kelvin Cleto: The Infrastructure of AI Entrepreneurship", "https://notebooklm.google.com/notebook/a30c744e-63b7-4983-99cf-a16d9cdf3370"),
    ("CNTX EPCF", "KODAI", "CONCORRENTE KODAI - a16z: O Sistema Completo — Frameworks, Infra e Estratégia de IA", "https://notebooklm.google.com/notebook/625a77d6-fc0e-47e0-8e68-527e00f08573"),

    # CNTX EPCF - MeuDojo / FaceDojo
    ("CNTX EPCF", "MeuDojo", "MeuDojo: MVP Roadmap and Strategic Phasing", "https://notebooklm.google.com/notebook/6cdda2e2-e02f-405c-887a-335378c2b0d6"),
    ("CNTX EPCF", "MeuDojo", "MeuDojo: Infrastructure and Cost Scaling Strategy", "https://notebooklm.google.com/notebook/6bf88476-0136-49fb-9dff-afac23b66491"),
    ("CNTX EPCF", "MeuDojo", "MeuDojo: Business Strategy and Commercial Roadmap", "https://notebooklm.google.com/notebook/36c5c1df-37da-4349-a45c-c9df16f8186d"),
    ("CNTX EPCF", "MeuDojo", "FaceDojo — Análise Completa, Stack Técnico e Ferramentas", "https://notebooklm.google.com/notebook/44ed14eb-6498-45c9-a8d6-d6b033b2037c"),
    ("CNTX EPCF", "MeuDojo", "Open Source Facial Recognition State of the Art and Architecture", "https://notebooklm.google.com/notebook/0a20dc1a-fe37-4644-9005-dad398e387b6"),
    ("CNTX EPCF", "MeuDojo", "Next Fit — Análise Completa do Sistema Concorrente", "https://notebooklm.google.com/notebook/23a6ad42-15e1-4b8f-a0c1-3d49c8aa0c4d"),

    # CNTX EPCF - TrackOps / Field Control / Rastreamento
    ("CNTX EPCF", "TrackOps", "TrackOps: Operational Intelligence and SaaS Logistics Framework", "https://notebooklm.google.com/notebook/67fffe56-719a-477f-bef5-3422554fa066"),
    ("CNTX EPCF", "TrackOps", "Field Control — Operacional Navortech", "https://notebooklm.google.com/notebook/ec8d0025-3375-4747-b293-e4570006f8ae"),
    ("CNTX EPCF", "TrackOps", "Field Control API — Webhooks, REST, Parsing de OS", "https://notebooklm.google.com/notebook/0188ed30-2344-47ad-97df-75a129438c50"),
    ("CNTX EPCF", "TrackOps", "RedGPS / OnPartner — Telemetry, GPS, Sensors", "https://notebooklm.google.com/notebook/f84532b7-9b81-4b12-86d6-619b1ec45e1d"),
    ("CNTX EPCF", "TrackOps", "Benchmark Rastreamento Veicular — Concorrentes do Mercado Brasileiro", "https://notebooklm.google.com/notebook/5d9d2518-d17e-4c95-812e-723212cfed7c"),

    # CNTX EPCF - Decon Digital / Contabilidade & BPO
    ("CNTX EPCF", "Decon", "Decon Digital: Accounting Ecosystem and Platform Roadmap", "https://notebooklm.google.com/notebook/5ca0ea45-81e1-476e-bcf2-01faed37e9ea"),
    ("CNTX EPCF", "Decon", "Referências do Nicho (Contabilidade & BPO)", "https://notebooklm.google.com/notebook/9fa5c0e4-5814-4ab3-943a-0173fd62100a"),

    # CNTX EPCF - Integrações Google / Ferramentas
    ("CNTX EPCF", "Integração", "Google Integrations — Context & Sources", "https://notebooklm.google.com/notebook/44650f3d-64f6-40b3-b750-fc72f12c9050"),
    ("CNTX EPCF", "Integração", "Google Admin Console — Workspace, Directory, Groups", "https://notebooklm.google.com/notebook/2f9c96a5-6c4b-437c-a4b7-4716fba0a5b4"),
    ("CNTX EPCF", "Integração", "Omnismart — Messaging Platform & Captação de Serviços", "https://notebooklm.google.com/notebook/46aab0f7-00ee-45a4-8584-5e022b428486"),

    # CNTX SMB - Sistemas Empresariais
    ("CNTX SMB", "Sistemas", "Sistemas Empresariais: ERP, Contabilidade, NF-e, SaaS Multi-tenant & Operação", "https://notebooklm.google.com/notebook/26782f74-7405-4b68-a960-114e154c087a"),
]

def slugify(name: str) -> str:
    """Converte nome em id slug-ABLE."""
    s = name.lower()
    s = re.sub(r"[^\w\s-]", "", s, flags=re.UNICODE)
    s = re.sub(r"[\s_]+", "-", s)
    return s.strip("-")

def category_to_topics(prefix: str, category: str, name: str) -> list[str]:
    """Deriva topics da taxonomia."""
    base = [prefix.lower().replace(" ", "-"), category.lower().replace("/", "-")]
    # Extrai keywords do nome (palavras tecnicas comuns)
    name_lower = name.lower()
    for kw in ["react", "supabase", "postgresql", "vite", "vercel", "typescript", "tailwind",
               "shadcn", "next.js", "nextjs", "nestjs", "nodejs", "node.js", "python", "laravel",
               "claude-code", "claude", "anthropic", "rag", "embedding", "agente", "agent",
               "multi-tenant", "saas", "ddd", "event-driven", "rest", "graphql", "api",
               "rls", "auth", "lgpd", "pwa", "qr", "scanner", "boleto", "pix", "nfe", "nf-e",
               "erp", "crm", "bpo", "contabilidade", "dojo", "trackops", "field-control",
               "kodai", "kod.ai", "performance", "testing", "debug", "seo", "css", "ui", "ux"]:
        if kw in name_lower:
            base.append(kw)
    return list(dict.fromkeys(base))  # dedup preservando ordem

def make_entry(prefix: str, category: str, name: str, url: str, ts: str) -> dict:
    full_name = f"{prefix} - [{category}] {name}" if category != "Sistemas" else f"{prefix} - {name}"
    return {
        "id": slugify(full_name),
        "url": url,
        "name": full_name,
        "description": f"{prefix} [{category}] — {name}. Catalogado em 2026-05-21 a partir da lista taxonomizada do Davi.",
        "topics": category_to_topics(prefix, category, name),
        "content_types": [],
        "use_cases": [],
        "tags": [prefix, category],
        "created_at": ts,
        "updated_at": ts,
        "use_count": 0,
        "last_used": None
    }

def main():
    if not LIBRARY_PATH.exists():
        print(f"ERRO: library nao encontrada em {LIBRARY_PATH}", file=sys.stderr)
        sys.exit(1)

    library = json.loads(LIBRARY_PATH.read_text(encoding="utf-8"))
    existing_urls = {n["url"] for n in library["notebooks"].values()}
    existing_ids = set(library["notebooks"].keys())

    ts = "2026-05-21T00:00:00"
    added = 0
    skipped = 0

    for prefix, category, name, url in NOTEBOOKS:
        if url in existing_urls:
            skipped += 1
            continue
        entry = make_entry(prefix, category, name, url, ts)
        # Resolve colisao de ID
        base_id = entry["id"]
        suffix = 2
        while entry["id"] in existing_ids:
            entry["id"] = f"{base_id}-{suffix}"
            suffix += 1
        library["notebooks"][entry["id"]] = entry
        existing_ids.add(entry["id"])
        existing_urls.add(url)
        added += 1

    print(f"Adicionados: {added}")
    print(f"Pulados (URL ja existia): {skipped}")
    print(f"Total final: {len(library['notebooks'])}")

    if DRY_RUN:
        print("\n--- DRY RUN — nada salvo ---")
        return

    # Backup antes de salvar
    backup = LIBRARY_PATH.with_suffix(".json.backup-2026-05-21")
    backup.write_text(LIBRARY_PATH.read_text(encoding="utf-8"), encoding="utf-8")
    print(f"Backup salvo: {backup}")

    LIBRARY_PATH.write_text(json.dumps(library, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Library atualizada: {LIBRARY_PATH}")

if __name__ == "__main__":
    main()
