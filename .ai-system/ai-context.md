# Project AI Context

> **Overview:** FoliXx Palace (PALACE_OS) is a unified, metadata-driven digital platform serving two hospitality brands under FoliXx Hospitality: FoliXx Bukka (Nigerian cuisine restaurant) and Secrets Palace (luxury nightclub). The platform consolidates brand presence, customer-facing experiences (ordering, reservations, event discovery), and operational back-office (analytics, CMS, inventory) into a single extensible system. It replaces fragmented third-party dependencies with an owned platform featuring native online ordering, structured reservations, loyalty programs, and real-time analytics. Built with Next.js 16 (webpack), Tailwind CSS, Zustand, PostgreSQL (Supabase), and deployed on Vercel.

| Frontend | Next.js 16 (App Router, webpack) |
| Backend | Node.js + Express (Next.js API routes) |
| Database | PostgreSQL (via Supabase) |
| Styling | Tailwind CSS + CSS Variables (Design Token System) |
| Deployment | Vercel (frontend) + Railway/Render (API) |

---

## Key Modules

> **Section summary:** The most important parts of the codebase where most features live.

| Module | Location | Purpose |
|--------|----------|---------|
| App Config Defaults | packages/config/src/ | Shared configuration defaults and type definitions |
| Brand Context | apps/web/lib/contexts/BrandContext.tsx | Brand-aware React context provider |
| Auth Context | apps/web/lib/contexts/AuthContext.tsx | Authentication state and Supabase integration |
| Bukka Pages | apps/web/app/bukka/ | Menu browsing, cart, checkout, order tracking |
| Palace Pages | apps/web/app/palace/ | Table reservations, events calendar, ticket purchasing |
| Admin Panel | apps/web/app/admin/ | Admin dashboard and brand/menu/venue config |
| CMS Service | apps/web/lib/services/cms.ts | Supabase-backed content management with hardcoded fallbacks |
| Loyalty Store | apps/web/lib/loyalty/store.ts | Zustand-based loyalty points and tier management |

---

## Agent Instructions Location

All AI agent documentation lives in `.ai-system/`.

Start with: `.ai-system/agents/general-instructions.md`

---

## Active Development Focus

Build error remediation completed. Production build now succeeds with zero compilation errors. Focus shifting to proper i18n setup, addressing next.config.js deprecation warnings, and adding component tests to prevent regressions.