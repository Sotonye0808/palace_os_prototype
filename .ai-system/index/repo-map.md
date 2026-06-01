# Repository Map

> **Overview:** Visual map of the project folder structure with a brief description of each directory's purpose. Agents read this first when navigating the codebase. Updated whenever the folder structure changes.

---
## Folder Structure

```
project-root/
│
├── .ai-system/             → AI development system
│   ├── agents/             → Agent instructions and bootstrap files
│   ├── commands/           → Executable command markdown files
│   ├── designs/            → Design specs, brand guides, HTML mockups
│   ├── docs/               → PRD, engineering roadmap, design system docs
│   ├── index/              → Repo map, dependency graph, file summaries
│   ├── memory/             → Architecture history, lessons learned, project decisions
│   ├── planning/           → Project plan, task queue
│   ├── summaries/          → Development history
│   └── testing/            → Test plans and results
│
├── apps/                   → Application packages
│   └── web/                → Next.js 16 App Router frontend
│       ├── app/            → App router pages and layouts
│       │   ├── (account)/  → Shared account routes
│       │   ├── admin/      → Admin panel routes
│       │   ├── bukka/      → Folixx Bukka brand routes
│       │   └── palace/     → Secrets Palace brand routes
│       │
│       ├── components/     → Reusable UI components
│       │   ├── shared/     → Components used by both brands (Button, Input, Card, Modal)
│       │   ├── bukka/      → Bukka-specific components
│       │   └── palace/     → Palace-specific components
│       │
│       ├── lib/            → Library code, services, hooks, contexts
│       │   ├── auth/       → Auth hooks and services
│       │   ├── contexts/   → React contexts (BrandContext, AuthContext)
│       │   ├── hooks/      → Custom hooks (useOrderRealtime)
│       │   ├── services/   → Service layer (CMS, guestList, waitlist, supabase)
│       │   ├── loyalty/    → Loyalty store (Zustand)
│       │   └── seo/        → SEO utilities (JSON-LD)
│       │
│       ├── styles/         → Global styles, CSS variables
│       │
│       └── next.config.js  → Next.js configuration (webpack)
│
├── packages/               → Shared workspace packages
│   └── config/             → Configuration defaults and TypeScript types
│       ├── src/
│       │   ├── defaults.ts → Hardcoded fallback config objects
│       │   └── types.ts    → Shared type definitions
│       └── package.json
│
├── supabase/               → Database migrations
│   └── migrations/         → SQL migration files
│
└── backup/                 → Backup files
```

---
## Directory Descriptions

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| apps/web/app/ | Next.js 16 App Router pages and layouts | layout.tsx |
| apps/web/app/bukka/ | Folixx Bukka brand routes | page.tsx, menu/page.tsx, cart/page.tsx, checkout/page.tsx, order-tracking/page.tsx |
| apps/web/app/palace/ | Secrets Palace brand routes | page.tsx, reserve/page.tsx, events/page.tsx, events/[eventId]/page.tsx |
| apps/web/app/(account)/ | Shared account routes | address-book/page.tsx |
| apps/web/app/admin/ | Admin panel routes | dashboard/page.tsx, brand-config/[brandId]/page.tsx, menu-config/[brandId]/page.tsx, venue-config/[brandId]/page.tsx |
| apps/web/components/ | Shared UI components | Button.tsx, Input.tsx, Card.tsx, Modal.tsx |
| apps/web/components/shared/seo/ | SEO components | JsonLd.tsx |
| apps/web/lib/services/ | Service layer (CMS, integrations) | cms.ts, guestList.ts, waitlist.ts, supabase.ts |
| apps/web/lib/contexts/ | React context providers | BrandContext.tsx, AuthContext.tsx |
| apps/web/lib/auth/ | Auth hooks and utilities | hooks/useAuth.ts |
| apps/web/lib/hooks/ | Custom React hooks | useOrderRealtime.ts |
| apps/web/lib/loyalty/ | Loyalty program (Zustand store) | store.ts |
| apps/web/styles/ | Global styles and CSS variables | globals.css, accessibility.css |
| packages/config/src/ | Shared config defaults and type definitions | defaults.ts, types.ts |
| supabase/migrations/ | SQL database migrations | *.sql |

---
## Entry Points

| Purpose | File |
|---------|------|
| Frontend dev server | apps/web/app/layout.tsx (Root layout) |
| App config defaults | packages/config/src/defaults.ts |
| Shared type definitions | packages/config/src/types.ts |
| CMS service layer | apps/web/lib/services/cms.ts |
| CSS entry point | apps/web/styles/globals.css |