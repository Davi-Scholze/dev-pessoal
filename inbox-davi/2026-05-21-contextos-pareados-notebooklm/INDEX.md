---
tipo: inbox-bruto
data: 2026-05-21
origem: docs sintetizados por Davi a partir de NotebookLMs próprios
status: bruto-sagrado-com-notebook-pareado
---

# Bruto: 2 docs canônicos com NotebookLM pareado (2026-05-21)

> Cada doc é sumário sintetizado a partir do NotebookLM correspondente.
> **Tanto o doc quanto o notebook entram na infraestrutura KOD.AI.**

## Doc 1: UX-Responsividade-SMB-Canonical.md

- **Notebook pareado:** https://notebooklm.google.com/notebook/216c85a8-2e63-4ddc-96dc-6a566ebcc81d
- **Tema:** Base canônica multiplataforma — sistemas responsivos iPhone/Android/Desktop/Tablet
- **Conteúdo:** 24 fontes (web.dev, MDN, CSS-Tricks, GitHub admin templates), 8 stacks battle-tested (shadcn/ui, TailAdmin, AdminLTE, Ant Design, etc.), padrões CSS modernos (container queries, clamp, dark mode), checklist de qualidade SMB (mobile/desktop/a11y/performance).
- **Candidato a:** Pack universal `2-PACKS/packs/dev/ui-responsivo-smb/` (categoria `dev/frontend-web/`)
- **Status proposto:** DRAFT (DOMINIO.md + manifest + atribuição do NotebookLM)
- **Por que pack:** conteúdo técnico estável reutilizável em qualquer projeto SMB

## Doc 2: CNTX SMB — Sistemas Empresariais

- **Notebook pareado:** https://notebooklm.google.com/notebook/26782f74-7405-4b68-a960-114e154c087a
- **Tema:** ERP, Contabilidade, NF-e, SaaS Multi-tenant, padrões empresariais Brasil
- **Conteúdo:** 26 fontes (ERPs open-source: ERPNext, Odoo, Akaunting; APIs fiscais: NFE.io, Tecnospeed; SDKs: WebmaniaBR, EFÍ Pay; padrões: event-driven, bounded contexts, conciliação, DRE automática)
- **Candidato a:** Contexto-domínio `3-CONTEXTOS-DOMINIO/sistemas-empresariais-br/` (conhecimento de vertical, não capacidade técnica pura)
- **Status proposto:** DRAFT (DOMINIO.md + manifest + atribuição do NotebookLM + lista de conceitos)
- **Por que contexto-domínio:** conhecimento de vertical SMB brasileiro — fiscal/multi-tenant/integrações específicas (NF-e, Pix, Open Finance BR)

## Estratégia de absorção

1. **`/ativar-notebooklm`** os 2 URLs nas categorias certas (UNI dev/ui-ux + UNI negocio/smb-br)
2. **`/absorver-contexto`** cada doc — classifica e propõe destino
3. **Davi aprova item-a-item** o que vira pack/contexto vs fica como bruto
4. Pack/contexto criado com:
   - `manifest.yaml` declarando `notebooklm_source: <url>`
   - `DOMINIO.md` (contexto) ou `SKILL.md` + `README.md` (pack) baseado no doc
   - `notebooklm.md` resumindo o que o notebook tem
   - **NÃO copiar verbatim** — re-implementar universalizado (anti-pollution checks aplicam)
