# System Architecture

> **Overview:** This document describes the actual architecture of the FoliXx Palace (PALACE_OS) platform based on code analysis. The system follows a metadata-driven, admin-configurable architecture designed to serve two distinct hospitality brands (FoliXx Bukka and Secrets Palace) from a single codebase.

## Core Architectural Pattern: Metadata-First

The application follows a **Metadata-First** pattern where:
1. **Config objects** (stored in DB, fetched at boot) drive all rendering logic
2. **UI components** are generic and receive config props — no component knows about specific menu items, table layouts, or event structures by name
3. **Admin Panel** is the single interface for mutating all config objects
4. **Hardcoded fallbacks** in `config/defaults.ts` ensure the app never fails to render
5. **OOP class models** define entity shapes: `MenuItem`, `Table`, `Event`, `LoyaltyTier`, etc. These are shared between frontend types, API validation schemas (Zod), and DB models

```
AppConfig (fetched at boot)
   ├── BrandConfig[]            (FolixxBukka, SecretsPalace)
   ├── MenuConfig               (Bukka)
   ├── VenueConfig              (Secrets)
   ├── LoyaltyConfig            (shared)
   ├── NotificationConfig       (shared)
   └── AnalyticsConfig          (per role)
```

## Layered Architecture

### Presentation Layer (Frontend)
- **Framework:** Next.js 16 with App Router (webpack)
- **Styling:** Tailwind CSS with CSS variable-based design token system
- **State Management:** 
  - Zustand for lightweight global state (user session, brand context)
  - React Query for server state synchronization (data fetching, caching)
- **Architecture:** 
  - Feature-based organization (`src/features/`)
  - Shared components library (`src/components/shared/`)
  - Brand-aware layouts that swap design tokens via CSS variables
  - Metadata-driven rendering (components receive config props)

### Application Layer (Backend)
- **Framework:** Node.js + Express (via Next.js API routes)
- **Architecture:**
  - RESTful API design with resource-based endpoints
  - Service layer for business logic separation
  - Middleware for authentication, validation, and error handling
  - WebSocket-ready infrastructure for real-time features (order tracking)

### Data Layer
- **Primary Database:** PostgreSQL via Supabase
- **Data Modeling:**
  - Relational schema for core entities (users, orders, bookings, events)
  - JSONB columns for flexible metadata storage (menu configs, venue layouts)
  - Supabase Auth for authentication (JWT + OAuth)
  - Supabase Storage for media assets (menu images, event posters)
- **Caching:** Redis-inspired approach via React Query and SWR for client-side caching

### Integration Layer
- **Payments:** Paystack API (Nigeria-focused, PCI compliant)
- **Notifications:** 
  - Resend for email
  - Termii for SMS (Nigerian gateway)
  - FCM for push notifications (PWA)
- **File Storage:** Supabase Storage / Cloudinary for image optimization
- **Analytics:** Custom event tracking + PostHog for funnels and heatmaps

## Brand Context Implementation

The platform implements dual-brand contexts through:
1. **CSS Variable Swapping:** Brand-specific design tokens defined as CSS variables
2. **Context Provider:** React context that provides brand ID and toggles token resolution
3. **Layout Components:** Brand-aware layouts that adjust based on context
4. **Feature Flags:** Brand-specific feature toggles in configuration
5. **Routing Structure:** URL-based brand routing (`/bukka/*` vs `/palace/*`)

## Key Architectural Decisions

1. **Metadata-Driven Everything:** All content is configurable via admin panel
2. **Hardcoded Fallbacks:** Graceful degradation when CMS is unavailable
3. **Shared Kernel:** Common functionality (auth, loyalty, notifications) shared between brands
4. **Brand Isolation:** Brand-specific features encapsulated in feature modules
5. **Admin-First:** Admin panel built before customer features to enable content-driven development
6. **PWA Capability:** Offline support for menu browsing and basic functionality
7. **Scalability Foundation:** Architecture designed to handle 10x traffic spikes during event nights

## Directory Structure

```
apps/web/
├── app/
│   ├── bukka/             # Folixx Bukka brand routes
│   ├── palace/            # Secrets Palace brand routes
│   ├── (account)/         # Shared account routes
│   └── admin/             # Admin panel routes
├── components/
│   ├── shared/            # Truly shared components
│   ├── shared/seo/        # SEO components (JsonLd)
│   ├── bukka/             # Bukka-specific components
│   └── palace/            # Palace-specific components
├── lib/
│   ├── auth/              # Auth hooks and services
│   ├── contexts/          # React contexts (Brand, Auth)
│   ├── hooks/             # Custom hooks (useOrderRealtime)
│   ├── services/          # Service layer (CMS, guestList, waitlist, supabase)
│   ├── loyalty/           # Loyalty store (Zustand)
│   └── seo/               # SEO utilities
├── styles/                # Global styles and design tokens
└── next.config.js         # Next.js configuration (webpack)

packages/
└── config/                # Shared config defaults and TS types
    └── src/
        ├── defaults.ts    # Hardcoded fallback config objects
        └── types.ts       # Shared type definitions
```

## Data Flow Patterns

1. **Bootstrapping:** On app load, fetch `AppConfig` from `/api/config` endpoint
2. **Rendering:** Components receive relevant config slices as props
3. **Mutations:** Admin panel updates Supabase; changes propagate via real-time subscriptions or manual refresh
4. **Fallbacks:** If config fetch fails, use hardcoded defaults from `config/defaults.ts`
5. **API Calls:** React Query manages data fetching, caching, and mutations for operational data

## Scalability & Performance Considerations

1. **Edge Ready:** Next.js 14 App Router enables edge deployment possibilities
2. **Code Splitting:** Automatic route-based and dynamic imports
3. **Image Optimization:** Next.js Image component with Supabase Storage integration
4. **Caching Strategy:** 
   - Config data: Stale-while-revalidate with long TTL
   - Operational data: Short TTL with background refresh
   - User session: Secure HTTP-only cookies
5. **Database Optimization:**
   - Proper indexing on query-heavy columns
   - JSONB indexing for metadata queries
   - Connection pooling via Supabase
6. **Asset Optimization:**
   - Image compression and responsive sizes
   - Font subsetting and preloading
   - Critical CSS extraction