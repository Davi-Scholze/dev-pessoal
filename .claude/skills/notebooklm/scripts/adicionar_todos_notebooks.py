#!/usr/bin/env python3
"""Adiciona os 33 notebooks da nova biblioteca TrackOps na library local."""

import json
import shutil
from pathlib import Path
from datetime import datetime


NOTEBOOKS = [
    (1, "7de26581-6214-4157-8d36-1193afe6b15a",
     "[Stack] Supabase Auth & RLS",
     "Auth flows, JWT, RLS policies, RBAC, SECURITY DEFINER, multi-tenant patterns.",
     ["supabase", "auth", "rls", "rbac", "security", "stack"]),

    (2, "fd0df7f6-f6f4-4525-904c-6e31a5d321c0",
     "[Stack] Supabase Edge Functions & Realtime",
     "Deno runtime, pg_cron, Realtime subscriptions, Storage, webhooks, background tasks.",
     ["supabase", "edge-functions", "deno", "realtime", "pg-cron", "stack"]),

    (3, "17700937-725c-4aca-8dc7-0ad2caeddee3",
     "[Stack] React 19 — Hooks & Performance",
     "Hooks, custom hooks, concurrent features, Suspense, memoization, profiling.",
     ["react", "hooks", "performance", "react-19", "stack"]),

    (4, "addb32ba-689a-41f7-945a-e6ece85e906d",
     "[Stack] React State Management — Context, Zustand, Patterns",
     "Context, Zustand, Jotai, Redux Toolkit, server vs client state, compound components.",
     ["react", "state-management", "zustand", "context", "stack"]),

    (5, "5f4af17c-2e63-4d97-97e8-71c6ecf753b1",
     "[Stack] PostgreSQL Avançado — Schema, Indexes, Performance",
     "Schema design, indexing (B-tree, GIN, BRIN), EXPLAIN ANALYZE, VACUUM, partitioning, JSONB, triggers.",
     ["postgresql", "database", "indexes", "performance", "stack"]),

    (6, "7e25223f-6ab9-420c-9fb6-107b0feda68a",
     "[Metodologia] Spec-Driven Development com Claude Code",
     "SDD cycle (/spec /break /plan /execute /review), anti-vibe coding, context engineering.",
     ["sdd", "spec-driven", "methodology", "claude-code"]),

    (7, "6e41649d-3ef4-4434-a57a-4b08cffa6b63",
     "[Meta] Claude Code — Skills, Agents, MCPs e Superpowers",
     "SKILL.md structure, subagents, slash commands, MCP servers, hooks, Superpowers workflow.",
     ["claude-code", "skills", "agents", "mcp", "superpowers", "meta"]),

    (8, "5d7486f4-9d25-4b43-986c-68fea33dbd5b",
     "[Metodologia] Git Flow — Conventional Commits, PRs, Code Review",
     "Conventional Commits, branch strategies, PRs, code review, semver, GitHub Actions.",
     ["git", "github", "conventional-commits", "methodology"]),

    (9, "0188ed30-2344-47ad-97df-75a129438c50",
     "[Integração] Field Control API — Webhooks, REST, Parsing de OS",
     "Field Control REST API, webhooks, events, idempotency, regex parsing de OS.",
     ["field-control", "api", "webhooks", "integration"]),

    (10, "11879679-71c5-4343-b31a-41a5b58d7c8f",
     "[Integração] Google Drive & Sheets API",
     "OAuth 2.0, files API, Sheets read/write, push notifications (changes.watch).",
     ["google-drive", "google-sheets", "oauth", "api", "integration"]),

    (11, "2f9c96a5-6c4b-437c-a4b7-4716fba0a5b4",
     "[Integração] Google Admin Console — Workspace, Directory, Groups",
     "Admin SDK, Directory API, users, groups, SSO, domain-wide delegation.",
     ["google-workspace", "admin-sdk", "directory", "integration"]),

    (12, "63feddd2-6bd4-45b6-a601-e842ad56d121",
     "[Stack] Vite — Build, Dev Server, Plugins",
     "vite.config, env vars, HMR, bundle optimization, plugins, path aliases.",
     ["vite", "build-tool", "bundler", "stack"]),

    (13, "a240759d-3bfc-4e59-bbda-2281514227e8",
     "[Stack] Vercel — Deploy, CI/CD, Edge, Env Vars",
     "Project setup, env vars, preview deployments, custom domains, Edge Functions, ISR.",
     ["vercel", "deploy", "ci-cd", "edge", "stack"]),

    (14, "a02951f8-29b0-4531-b445-7123347f977c",
     "[Metodologia] Clean Code e Refactoring em JavaScript/React",
     "Naming, functions, comments, error handling, code smells, SOLID, YAGNI, DRY.",
     ["clean-code", "refactoring", "javascript", "react", "methodology"]),

    (15, "713e5a95-e8a5-44d3-9720-19394e36ca16",
     "[Meta] Prompt & Context Engineering for Coding Agents",
     "System prompts, CLAUDE.md, few-shot examples, context windows, RAG, thinking mode.",
     ["prompt-engineering", "context-engineering", "ai", "coding-agents", "meta"]),

    (16, "c4a94d71-0d8d-4e3b-83d3-5f01f128b283",
     "[UI/UX] Data Tables Avançadas — Filtering, Sorting, Virtualization",
     "Filtering AND/OR, sorting, pagination, virtualization 10k+ rows, inline edit, bulk actions.",
     ["ui-ux", "data-tables", "filtering", "virtualization"]),

    (17, "5c5df5c3-fb28-40c9-a852-a1cee39bc250",
     "[UI/UX] Operational Dashboards — Interativos, KPIs, Drill-down",
     "KPI hierarchy, drill-down, cross-filtering, real-time, animations, customization.",
     ["ui-ux", "dashboards", "kpi", "interactive", "real-time"]),

    (18, "dd79e183-115b-4e33-948e-86fa0c42c0b2",
     "[UI/UX] Login, Auth, Google OAuth e Onboarding",
     "Login forms, Google OAuth branding, Passkeys, MFA, onboarding, accessibility.",
     ["ui-ux", "auth", "login", "google-oauth", "accessibility"]),

    (19, "804f6b00-24e0-4c65-aa12-a5f081814ef6",
     "[UI/UX] Forms & Data Entry — Validation, Auto-save, Multi-step",
     "Validation timing, auto-save, multi-step wizards, bulk edit, field masks, a11y.",
     ["ui-ux", "forms", "validation", "data-entry"]),

    (20, "93d17dd2-3414-428e-9b51-08c13cfb5c95",
     "[Qualidade] Testing React — Vitest, Testing Library, E2E",
     "Vitest, React Testing Library, MSW, Playwright E2E, coverage, TDD.",
     ["testing", "vitest", "testing-library", "playwright", "tdd", "qualidade"]),

    (21, "7432c36a-9ac6-4a86-a005-86698ddbde96",
     "[Qualidade] Systematic Debugging",
     "Reproducing bugs, scientific method, DevTools, React DevTools, network, memory.",
     ["debugging", "devtools", "qualidade"]),

    (22, "cb1cc8f7-f89b-410e-868f-74cee81569a5",
     "[Qualidade] Observability & Error Tracking",
     "Sentry, structured logging, tracing, Web Vitals, SLOs, incident response.",
     ["observability", "sentry", "monitoring", "sre", "qualidade"]),

    (23, "9fc83b15-071b-42bc-98c4-0ade9e5e2dc7",
     "[Integração] Ziontalk + WhatsApp Business API",
     "Ziontalk API, WhatsApp Business, templates, webhooks, inbound, 24h window.",
     ["ziontalk", "whatsapp", "messaging", "meta", "integration"]),

    (24, "f84532b7-9b81-4b12-86d6-619b1ec45e1d",
     "[Integração] RedGPS / OnPartner — Telemetry, GPS, Sensors",
     "Authentication (gettoken), vehicles, telemetry, history, alerts, geofences.",
     ["redgps", "onpartner", "telemetry", "gps", "integration"]),

    (25, "872662e9-6599-4a0c-98db-3ec2f54f1308",
     "[Operação] Webhooks & Idempotency Patterns",
     "Signature verification, idempotency keys, retries, DLQ, testing, observability.",
     ["webhooks", "idempotency", "operations"]),

    (26, "ff3282b1-ecc5-4cce-9c17-7648b5f485b0",
     "[Operação] Workflow Automation — Queues, State Machines",
     "Event-driven, BullMQ, Trigger.dev, Inngest, XState, saga pattern.",
     ["workflow", "queues", "state-machines", "xstate", "operations"]),

    (27, "34259a27-cba2-4995-8f89-f894a33ce0ec",
     "[Compliance] LGPD + SaaS Multi-Tenancy",
     "LGPD Brasil, ANPD, data retention, consent, multi-tenant patterns, audit logs.",
     ["lgpd", "compliance", "multi-tenant", "saas", "audit"]),

    (28, "8b5710f7-730e-4870-bfeb-0d6d9c0eb6b2",
     "[UI/UX] Advanced Filters & Bulk Selection",
     "Multi-filters, saved views, select-all-matching, shift-click, bulk action bar.",
     ["ui-ux", "filters", "bulk-selection", "keyboard-shortcuts"]),

    (29, "129bd4a6-6df8-4689-9389-1786c4fa19f2",
     "[UI/UX] Search Experience — Autocomplete, Facets, Results",
     "Autocomplete, faceted search, query syntax, relevance, no-results recovery.",
     ["ui-ux", "search", "autocomplete", "facets"]),

    (30, "c04f41a5-ac8f-4c8b-93d4-083040f9811e",
     "[Qualidade] Frontend Resilience — Error Boundaries, Large Datasets, Stability",
     "Error Boundaries, defensive coding, large datasets, memory leaks, graceful degradation.",
     ["resilience", "error-boundaries", "stability", "large-data", "qualidade"]),

    (31, "c346b667-7d3f-4c3c-95e6-9e44308e02e9",
     "[Operação] URLs, Domínios e DNS — Hostinger, Vercel, Subdomínios, SSL",
     "DNS records (A, CNAME, MX, SPF, DKIM), Hostinger, subdomínios, SSL, redirects.",
     ["dns", "urls", "hostinger", "vercel", "ssl", "operations"]),

    (32, "5d9d2518-d17e-4c95-812e-723212cfed7c",
     "[Negócio] Benchmark Rastreamento Veicular — Concorrentes do Mercado Brasileiro",
     "Sascar, Autotrack, Onixsat, Omnilink, Golsat, Ituran, Cobli + internacionais.",
     ["benchmark", "competitive-intelligence", "tracking", "telematics", "negocio"]),

    (33, "6675b1e0-3337-4bcb-9403-06ec92a6eb40",
     "[Qualidade] SEO Técnico & Performance Web",
     "Core Web Vitals (LCP, INP, CLS), Lighthouse, Schema.org, sitemap, imagens, HTTP/2/3, CDN.",
     ["seo", "web-performance", "core-web-vitals", "lighthouse", "qualidade"]),
]


def main():
    lib_path = Path(__file__).parent.parent / "data" / "library.json"

    # Backup
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = lib_path.parent / f"library.backup_{stamp}.json"
    shutil.copy(lib_path, backup)
    print(f"Backup: {backup}\n")

    # Carregar library atual
    with open(lib_path, encoding="utf-8") as f:
        lib = json.load(f)

    notebooks = lib.get("notebooks", {})
    agora = datetime.now().isoformat()

    # Zerar e adicionar os novos
    novos = {}
    for num, notebook_id, nome, desc, topics in NOTEBOOKS:
        slug = f"{num:02d}-{nome.lower().replace('[', '').replace(']', '').replace('/', '-').replace(' ', '-').replace('—', '').replace('--', '-').strip('-')[:80]}"
        novos[slug] = {
            "id": slug,
            "url": f"https://notebooklm.google.com/notebook/{notebook_id}",
            "name": nome,
            "description": desc,
            "topics": topics,
            "content_types": [],
            "use_cases": [],
            "tags": [],
            "created_at": agora,
            "updated_at": agora,
            "use_count": 0,
            "last_used": None,
        }

    lib["notebooks"] = novos

    with open(lib_path, "w", encoding="utf-8") as f:
        json.dump(lib, f, ensure_ascii=False, indent=2)

    print(f"Library atualizada — {len(novos)} notebooks ativos:")
    for num, _, nome, _, _ in NOTEBOOKS:
        print(f"  {num:2}. {nome}")

    print(f"\n✓ Todos os 33 notebooks ativos e prontos para uso.")


if __name__ == "__main__":
    main()
