# Engineering Roadmap — FoliXx Palace Platform
## `PALACE_OS` — Development Plan for OpenCode

---

**Version:** 1.0.0
**Prerequisite Documents:**
- `PRD.md` — Product Requirements (read first)
- `DESIGN_SYSTEM.md` — Visual tokens and component specs
- `DESIGN_DIRECTIVES.md` — Page architecture and component design
- `/.ai-system/` — AI compliance directives (must be in repo root)

**Status:** Active — OpenCode must follow this roadmap sequentially unless parallel tasks are explicitly marked.

---

> **OPENCODE COMPLIANCE DIRECTIVE**
> This roadmap is the engineering single source of truth for PALACE_OS. Every task here must be implemented. Architecture decisions, naming conventions, and structural patterns described here are not suggestions — they are requirements. Read every section before writing any code. The `.ai-system` directives in the repository root are the brain; this roadmap is the spine. Any deviation requires explicit human override.

---

## 1. Engineering Principles

These principles are non-negotiable and must be applied at every task:

### 1.1 Metadata-Driven First
No UI component renders hardcoded content. All content (menu items, events, table configs, loyalty rules, brand copy) is fetched from config objects. Components receive props derived from config, not literal strings.

```typescript
// ❌ NEVER
<MenuItem name="Jollof Rice" price={2500} />

// ✅ ALWAYS
<MenuItem item={menuConfig.items.find(i => i.id === itemId)} />
```

### 1.2 Hardcoded Fallback Configs
Every config object has a corresponding default export in `src/config/defaults/`. These are used when API/CMS is unavailable.

```typescript
// src/config/defaults/menu.defaults.ts
export const DEFAULT_MENU_CONFIG: MenuConfig = {
  categories: [{ id: 'starters', label: 'Starters', order: 1 }],
  items: [/* fallback items */],
  // ...
}
```

### 1.3 OOP Entity Models
All domain entities are TypeScript classes with typed properties, methods, and static factory methods.

```typescript
class MenuItem {
  constructor(private readonly data: MenuItemData) {}
  get formattedPrice(): string { return `₦${this.data.price.toLocaleString('en-NG')}` }
  get isAvailable(): boolean { return this.data.available && this.isWithinAvailabilityWindow() }
  static fromConfig(raw: RawMenuItem): MenuItem { return new MenuItem(raw) }
}
```

### 1.4 Brand Context Pattern
Brand theming is applied at the root layout level via `data-brand` attribute. No component imports brand-specific values directly.

```tsx
// app/layout.tsx
<html data-brand={brandContext.id} data-mode={brandContext.defaultMode}>
```

### 1.5 Strict TypeScript
`strict: true` in tsconfig. No `any` types. All API responses typed with Zod schemas (parse, don't cast).

### 1.6 Component Colocation
Each component lives in its own folder with: `Component.tsx`, `Component.types.ts`, `Component.test.tsx`, `index.ts`.

---

## 2. Repository Structure

```
palace-os/
├── .ai-system/                     # AI compliance directives (DO NOT MODIFY without intent)
│   ├── SYSTEM_DIRECTIVE.md
│   ├── CODING_STANDARDS.md
│   └── PIPELINE.md
├── docs/
│   ├── PRD.md
│   ├── DESIGN_SYSTEM.md
│   ├── DESIGN_DIRECTIVES.md
│   └── ENGINEERING_ROADMAP.md      # This file
├── apps/
│   └── web/                        # Next.js 14 App Router application
│       ├── app/
│       │   ├── (bukka)/            # FoliXx Bukka route group
│       │   ├── (palace)/           # Secrets Palace route group
│       │   ├── (account)/          # Shared account route group
│       │   ├── admin/              # Admin panel route group
│       │   └── layout.tsx          # Root layout shell
│       ├── components/
│       │   ├── ui/                 # Generic design system components
│       │   ├── bukka/              # Bukka-specific composite components
│       │   ├── palace/             # Secrets Palace-specific components
│       │   ├── account/            # Shared account components
│       │   └── admin/              # Admin panel components
│       ├── lib/
│       │   ├── api/                # API client functions
│       │   ├── hooks/              # Custom React hooks
│       │   ├── stores/             # Zustand stores
│       │   └── utils/              # Pure utility functions
│       └── styles/
│           ├── globals.css         # CSS variables + resets
│           ├── bukka.tokens.css    # Bukka design tokens
│           └── palace.tokens.css  # Secrets Palace tokens
├── packages/
│   ├── config/                     # Shared config types + defaults
│   │   ├── src/
│   │   │   ├── defaults/           # Hardcoded fallback configs
│   │   │   ├── schemas/            # Zod validation schemas
│   │   │   └── types/              # TypeScript entity types
│   ├── models/                     # OOP entity classes
│   │   └── src/
│   │       ├── MenuItem.ts
│   │       ├── Table.ts
│   │       ├── Event.ts
│   │       ├── Reservation.ts
│   │       ├── Order.ts
│   │       ├── LoyaltyAccount.ts
│   │       └── index.ts
│   └── ui/                         # (Optional) Shared component library
├── supabase/
│   ├── migrations/                 # Database migrations
│   └── seed/                       # Seed data for development
├── package.json                    # Monorepo root (pnpm workspaces)
└── turbo.json                      # Turborepo config
```

---

## 3. Development Phases

### Phase 0: Project Foundation
**Duration estimate:** 1–2 days
**Goal:** Runnable skeleton; all tooling configured; design tokens live.

#### Tasks:

**0.1 — Monorepo Setup**
- Initialise pnpm workspace monorepo with Turborepo
- Configure `apps/web` as Next.js 14 App Router project
- Configure `packages/config` and `packages/models` as internal packages
- TypeScript strict mode, path aliases configured

**0.2 — Design Token Implementation**
- Create `styles/globals.css` with all CSS custom properties from `DESIGN_SYSTEM.md` section 3
- Create `styles/bukka.tokens.css` — apply Bukka token values to semantic aliases at `[data-brand="folixx-bukka"]`
- Create `styles/palace.tokens.css` — apply Palace token values at `[data-brand="secrets-palace"]`
- Install and configure Tailwind CSS with custom theme extending to CSS variables
- Install Google Fonts: Playfair Display, Cormorant Garamond, Inter, JetBrains Mono, Cinzel

**0.3 — Core OOP Models** (`packages/models`)
- Implement all entity classes: `MenuItem`, `MenuCategory`, `ModifierGroup`, `Modifier`
- Implement: `Table`, `Zone`, `VenueConfig`
- Implement: `Event`, `TicketType`, `Performer`
- Implement: `Order`, `OrderItem`, `OrderStatus`
- Implement: `Reservation`, `ReservationStatus`
- Implement: `LoyaltyAccount`, `LoyaltyTier`, `Reward`, `PointTransaction`
- Implement: `User`, `BrandContext`, `AppConfig`
- Write Zod schemas for all models (`packages/config/src/schemas/`)

**0.4 — Hardcoded Defaults** (`packages/config/src/defaults/`)
- `menu.defaults.ts` — sample Bukka menu (5 categories, 15 items)
- `venue.defaults.ts` — sample floor plan (3 zones, 12 tables)
- `events.defaults.ts` — 3 sample upcoming events
- `loyalty.defaults.ts` — 4 tier system with earn rules
- `brand.defaults.ts` — both brand configs
- `analytics.defaults.ts` — mock analytics data structures

**0.5 — Supabase Setup**
- Configure Supabase project
- Write migrations for all tables: `users`, `orders`, `order_items`, `menu_items`, `menu_categories`, `tables`, `reservations`, `events`, `ticket_types`, `loyalty_accounts`, `point_transactions`, `rewards`, `brand_configs`
- Configure Row Level Security policies
- Seed development database with defaults from 0.4

**0.6 — Layout Shell**
- Implement root `app/layout.tsx` with brand context detection
- Implement `BrandProvider` context (React context, not just CSS)
- Implement `ToastContainer` globally
- Stub `NavBar`, `Footer` with brand-awareness

**Deliverable:** `pnpm dev` runs, correct fonts load, Bukka/Palace brand token swap works via URL.

---

### Phase 1: Core UI Component Library
**Duration estimate:** 2–3 days
**Goal:** Complete design system components, 100% matching `DESIGN_SYSTEM.md` specs.

#### Tasks:

**1.1 — Base Components** (`components/ui/`)

For each component below, implement with all variants and states from `DESIGN_DIRECTIVES.md` Part H:

- `Button` — variants: primary, secondary, ghost, danger, gold; sizes: sm, md, lg, xl; states: all
- `Input` — text, textarea, select, phone number
- `Badge` — all semantic colour variants
- `Avatar` — all sizes, fallback initials
- `Card` — variants: default, elevated, interactive, feature, glass
- `Spinner` / `Skeleton` — both brand variants
- `Toast` — all 4 types, auto-dismiss logic
- `Modal` — desktop modal + mobile bottom-sheet behaviour
- `Drawer` — slide-in from right
- `Tabs` — pill variant + underline variant
- `ProgressBar` + `Stepper` — for checkout and reservation flows
- `Tooltip`
- `Accordion`
- `Pagination`

**1.2 — Navigation Components**
- `NavBar` — Bukka variant (white, cart, links) + Palace variant (glass, gold, CTA)
- `MobileMenu` — full-screen slide-over with brand animations
- `Footer` — Bukka variant + Palace variant
- `BreadCrumb`

**1.3 — Form Patterns**
- `FormField` — wraps Input with label, hint, error
- `AddressInput` — with Google Places API autocomplete
- `DatePicker` — dark (Palace) and light (Bukka) themed
- `QuantityStepper` — −/+ with min/max constraints
- `OrderTypeSelector` — pill group (Delivery / Takeaway / Dine-in)

**Deliverable:** Storybook (or equivalent) with all components rendered in both brand contexts.

---

### Phase 2: FoliXx Bukka — Ordering Flow
**Duration estimate:** 3–4 days
**Goal:** Complete, functional food ordering flow end-to-end.

#### Tasks:

**2.1 — Bukka Home Page** (`app/(bukka)/page.tsx`)
- Hero section with order type selector
- Featured items section (reads from `MenuConfig`)
- Category quick-nav (sticky)
- Popular items grid
- How It Works section
- Loyalty teaser section
- All content driven by `BrandConfig` + `MenuConfig` — zero hardcoding

**2.2 — Menu Page** (`app/(bukka)/menu/page.tsx`)
- Category sidebar filter (desktop) / filter drawer (mobile)
- Dietary tag filters
- Search bar with real-time filtering
- Menu item grid with category section dividers
- `MenuItemCard` component — all states
- Item detail modal/drawer with modifier group selection
- Logic: filter + sort driven by `MenuConfig`

**2.3 — Cart System**
- Zustand store: `useCartStore` with actions: addItem, removeItem, updateQuantity, clearCart, applyDiscount
- Cart persisted to localStorage as backup
- `CartDrawer` — slide-in from right, accessible from all Bukka pages
- Cart page: item list, notes, order summary, delivery address, scheduled delivery

**2.4 — Checkout Flow**
- Address input with delivery fee computation (rule-based, from config)
- Order review step
- Paystack payment integration (test mode for prototype)
- Order confirmation page with order ID

**2.5 — Order Tracking Page**
- Order status state machine: `PLACED → PREPARING → READY → DISPATCHED → DELIVERED`
- Animated status stepper
- Live ETA display (mock timer for prototype)
- Order details accordion

**2.6 — Bukka API Routes** (`app/api/bukka/`)
- `POST /api/bukka/orders` — create order, write to Supabase
- `GET /api/bukka/orders/:id` — fetch order status
- `GET /api/bukka/menu` — fetch menu config (with fallback to defaults)
- `POST /api/bukka/orders/:id/status` — update order status (admin)

**Deliverable:** User can browse menu → add items → checkout → see order confirmation.

---

### Phase 3: Secrets Palace — Reservation & Events Flow
**Duration estimate:** 3–4 days
**Goal:** Complete table reservation and event RSVP flows.

**3.1 — Secrets Palace Home Page** (`app/(palace)/page.tsx`)
- Video hero (muted autoplay, fallback image)
- Operating hours marquee banner
- Events section (reads from `EventsConfig`)
- Floor map teaser
- Experience/culture section
- Testimonials section (reads from config)
- All content metadata-driven

**3.2 — Events Listing Page** (`app/(palace)/events/page.tsx`)
- Events grid with filter tabs
- `EventCard` component — all states (upcoming, tonight, sold-out, past)
- Pagination or infinite scroll

**3.3 — Single Event Page** (`app/(palace)/events/[id]/page.tsx`)
- Full event details from `EventConfig`
- Ticket tier selection with quantity
- Add to reservation / purchase flow

**3.4 — Reservation Flow** (`app/(palace)/reserve/page.tsx`)
- Multi-step form with step indicator (4 steps)
- Step 1: Date picker + party size + package selection
- Step 2: SVG floor map with dynamic table states
  - Floor map rendered from `VenueConfig.tables` (position, zone, type)
  - Table selection updates Zustand reservation store
- Step 3: Drinks catalogue browsing + pre-order (reads from drinks MenuConfig)
- Step 4: Review + guest details form + Paystack payment
- Reservation confirmation page with QR code (generated client-side)

**3.5 — Secrets API Routes** (`app/api/palace/`)
- `GET /api/palace/events` — fetch events list
- `GET /api/palace/events/:id` — fetch single event
- `GET /api/palace/venue` — fetch venue + table availability
- `POST /api/palace/reservations` — create reservation
- `GET /api/palace/reservations/:id` — get reservation
- `POST /api/palace/tickets` — purchase event tickets

**Deliverable:** User can browse events → RSVP/purchase tickets; user can select a table → pre-order bottles → confirm reservation.

---

### Phase 4: Authentication & User Accounts
**Duration estimate:** 2 days
**Goal:** Full auth flow + account hub + order/booking history.

**4.1 — Auth System**
- Supabase Auth integration
- `AuthModal` component (triggered globally on protected actions)
- Sign in: email/password + Google OAuth
- Sign up: name, email, phone, password
- Session management via Supabase SSR helpers
- Protected routes middleware in `middleware.ts`

**4.2 — Account Hub** (`app/(account)/account/page.tsx`)
- Greeting with user name
- Loyalty tier badge
- Points balance + progress bar
- Recent Bukka orders tab
- Recent Palace bookings tab
- Quick action buttons

**4.3 — Profile Settings** (`app/(account)/account/profile/page.tsx`)
- Edit name, avatar, dietary preferences
- Saved addresses manager
- Change password

**4.4 — Notification Preferences** (`app/(account)/account/notifications/page.tsx`)
- Toggle push / email / SMS per notification type
- Driven by `NotificationConfig`

**4.5 — Account API Routes**
- `GET /api/account/profile` — fetch user profile
- `PATCH /api/account/profile` — update profile
- `GET /api/account/orders` — Bukka order history
- `GET /api/account/reservations` — Palace booking history
- `GET /api/account/loyalty` — loyalty account data
- `POST /api/account/loyalty/redeem` — redeem reward

**Deliverable:** Complete sign-up/sign-in → account hub → view history → manage profile.

---

### Phase 5: Loyalty & Rewards System
**Duration estimate:** 2 days
**Goal:** Functional loyalty programme with points, tiers, and rewards.

**5.1 — Loyalty Engine** (server-side service)
- `LoyaltyService` class:
  - `awardPoints(userId, transaction)` — called after order/booking confirmed
  - `getBalance(userId)` — returns current points + tier
  - `redeemReward(userId, rewardId)` — validates + deducts points + records redemption
  - `checkTierUpgrade(userId)` — auto-upgrades tier when threshold crossed
- Earn rules read from `LoyaltyConfig` (metadata-driven)
- Tier thresholds from `LoyaltyConfig`

**5.2 — Loyalty Page** (`app/(account)/account/loyalty/page.tsx`)
- All sections from `DESIGN_DIRECTIVES.md` section E.3
- Points history table with filters
- Rewards catalogue with redemption flow
- Real-time balance after actions

**Deliverable:** Points awarded on order/booking; tiers upgrade; rewards redeemable.

---

### Phase 6: Admin Panel
**Duration estimate:** 3–4 days
**Goal:** Fully functional admin dashboard covering both brands.

**6.1 — Admin Auth & Layout**
- Separate admin auth (role-based: super_admin, bukka_manager, palace_manager, marketer)
- Admin layout: sidebar + main content area
- Role-based sidebar visibility (show only permitted sections)

**6.2 — Analytics Dashboard** (`app/admin/analytics/page.tsx`)
- KPI cards with sparklines (real data from Supabase)
- Revenue area chart — Recharts, dual-brand toggle
- Top items bar chart
- Booking funnel step chart (Secrets)
- Customer segments donut chart
- Peak hours heatmap (custom grid component)
- Recent orders/bookings table with export

**6.3 — Menu Manager** (`app/admin/bukka/menu/page.tsx`)
- Category tree sidebar
- Item grid with inline toggle (available/unavailable)
- "Add/Edit Item" modal: all fields, image upload to Supabase Storage, modifier group builder
- Drag-to-reorder items and categories

**6.4 — Events Manager** (`app/admin/palace/events/page.tsx`)
- Calendar month view with event dots
- "Create Event" form — all fields from `Event` model
- Guest list view per event — table with check-in toggle, CSV export

**6.5 — Venue Manager** (`app/admin/palace/venue/page.tsx`)
- Table config editor — edit table capacity, zone, minimum spend
- Blackout dates calendar picker
- Reservation calendar: see all bookings by date

**6.6 — Loyalty Manager** (`app/admin/loyalty/page.tsx`)
- Earn rules CRUD (add/edit/remove rules in table)
- Tier config editor (threshold, perks per tier)
- Rewards catalogue manager (add/edit/remove rewards)

**6.7 — Admin API Routes**
- Full CRUD routes for menu items, categories, events, tables, loyalty config
- Analytics aggregate endpoints (with caching)
- Role guard middleware on all admin routes

**Deliverable:** Admin can manage all content without touching code. Analytics are live.

---

### Phase 7: Notifications System
**Duration estimate:** 1–2 days
**Goal:** Transactional notifications (email + SMS) on key events.

**7.1 — Email Notifications** (via Resend)
- Templates (React Email or HTML) for:
  - Order confirmed (Bukka)
  - Order status update
  - Reservation confirmed (Palace)
  - Welcome to loyalty programme
  - Points earned summary (weekly)
- Template variables driven by `NotificationConfig`

**7.2 — SMS Notifications** (via Termii)
- Order confirmation (Nigerian number format)
- Reservation confirmation
- Reservation reminder (day before)

**7.3 — Push Notifications** (via FCM + service worker)
- PWA service worker setup
- FCM integration
- Push on: order status change, event announcements (if opted in)

**Deliverable:** Users receive email + SMS on order/booking; push notifications for opted-in users.

---

### Phase 8: Brand Selector & PWA
**Duration estimate:** 1 day
**Goal:** Polish entry experience and enable PWA installation.

**8.1 — Brand Selector Page** (`app/page.tsx`)
- Implement full design from `DESIGN_DIRECTIVES.md` section B.1
- Animate panel expansion on hover (desktop) with CSS transitions
- Remember last visited brand (localStorage) and redirect automatically

**8.2 — PWA Setup**
- `manifest.json` with brand icons (both brands, switching manifest per route group)
- Service worker for offline menu browsing cache
- Install prompt handling

**8.3 — SEO & Structured Data**
- `generateMetadata` in all public page layouts
- JSON-LD: `Restaurant` schema for Bukka, `EntertainmentBusiness` for Secrets
- `Event` schema for each Secrets event page
- OG images for social sharing

---

### Phase 9: Performance, Testing & Prototype Polish
**Duration estimate:** 2 days
**Goal:** Production-quality prototype.

**9.1 — Performance**
- Image optimisation: Next.js `<Image>` with Cloudinary/Supabase URLs
- Code splitting: dynamic imports for heavy components (floor map, charts)
- Font subsetting
- Core Web Vitals audit: LCP < 2.5s, CLS < 0.1, FID < 100ms

**9.2 — Testing**
- Unit tests for all OOP model classes (Vitest)
- Unit tests for LoyaltyService
- Integration tests for critical API routes
- E2E tests (Playwright) for: order flow, reservation flow, auth flow

**9.3 — Polish Pass**
- Ensure all loading/error/empty states are implemented
- Ensure all responsive breakpoints render correctly
- Accessibility audit (axe-core)
- Final review against `DESIGN_DIRECTIVES.md` — pixel check

**9.4 — Demo Data**
- Seed rich demo data for prototype presentation:
  - Bukka: 6 categories, 30+ menu items with real Nigerian dish names and descriptions
  - Secrets: 5 upcoming events with realistic details
  - 3 demo user accounts at different loyalty tiers
  - Realistic analytics data (last 30 days) for dashboard

---

## 4. API Design Reference

### 4.1 Response Envelope
All API responses use a standard envelope:
```typescript
// Success
{ success: true, data: T, meta?: PaginationMeta }

// Error
{ success: false, error: { code: string, message: string, details?: unknown } }
```

### 4.2 Authentication
- All protected routes check `Authorization: Bearer <JWT>` header
- JWT issued by Supabase Auth
- Admin routes additionally check user role in JWT claims

### 4.3 Pagination
```typescript
// Query params: ?page=1&limit=20
// Meta response: { page, limit, total, totalPages }
```

---

## 5. Database Schema Reference

### Core Tables
```sql
-- Users (extends Supabase auth.users)
users: id, full_name, phone, avatar_url, dietary_preferences (jsonb), created_at

-- Brand Configs (admin-configurable)
brand_configs: id, brand_id, config (jsonb), updated_at

-- Menu
menu_categories: id, brand_id, name, slug, order, icon, active
menu_items: id, category_id, name, description, price, image_url, available,
            dietary_tags (jsonb), modifiers (jsonb), metadata (jsonb)

-- Orders (Bukka)
orders: id, user_id, status, type (delivery/takeaway/dine_in), items (jsonb),
        delivery_address (jsonb), total, payment_ref, created_at
order_items: id, order_id, menu_item_id, quantity, modifiers (jsonb), item_total

-- Venue & Reservations (Secrets)
venue_zones: id, name, description, config (jsonb)
venue_tables: id, zone_id, label, capacity, type, min_spend, position (jsonb), active
reservations: id, user_id, table_id, event_id, date, time, party_size,
              drinks_preorder (jsonb), total, status, payment_ref, created_at

-- Events
events: id, title, slug, date, start_time, description, cover_image, performers (jsonb),
        ticket_types (jsonb), capacity, tags (jsonb), published, created_at
ticket_purchases: id, event_id, user_id, tier, quantity, total, payment_ref, created_at

-- Loyalty
loyalty_accounts: id, user_id, points_balance, tier, total_earned, total_redeemed
point_transactions: id, user_id, type (earn/spend), points, description, brand_id, ref_id, created_at
rewards: id, name, description, image_url, points_cost, available, metadata (jsonb)
reward_redemptions: id, user_id, reward_id, points_spent, redeemed_at
```

---

## 6. Environment Variables Reference

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Payments
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=

# Notifications
RESEND_API_KEY=
TERMII_API_KEY=
TERMII_SENDER_ID=
NEXT_PUBLIC_FCM_VAPID_KEY=

# Storage / Media
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Google
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=

# App
NEXT_PUBLIC_APP_URL=
NODE_ENV=
```

---

## 7. Git Workflow & Conventions

### Branch Strategy
- `main` — production-ready
- `develop` — integration branch
- `feature/[phase]-[task-id]-[description]` — feature branches
- `fix/[description]` — bug fixes

### Commit Convention (Conventional Commits)
```
feat(bukka): implement menu filtering by dietary tags
fix(palace): correct floor map table position calculation
chore(models): add Zod schema for LoyaltyTier
docs: update ENGINEERING_ROADMAP with Phase 6 completion
```

### Code Review Requirements
- All components peer-reviewed against `DESIGN_DIRECTIVES.md` before merge
- All models reviewed against `PRD.md` entity specs
- Performance budget check on any new page

---

## 8. Prototype Demo Checklist

Before presenting the prototype, verify:

- [ ] Brand selector page loads and transitions to correct brand
- [ ] Bukka menu loads from config (categories + items visible)
- [ ] User can add items to cart, adjust quantity, remove
- [ ] Checkout flow completes with Paystack test payment
- [ ] Order confirmation page shows with order ID
- [ ] Order tracking stepper advances through states
- [ ] Secrets Palace home video/image hero loads with full design
- [ ] Events list shows upcoming events
- [ ] Floor map renders with selectable tables
- [ ] Reservation flow completes all 4 steps
- [ ] Reservation confirmation page shows with QR code
- [ ] User can sign up and sign in
- [ ] Account hub shows loyalty balance and history
- [ ] Loyalty page shows tiers, earn rules, and rewards
- [ ] Admin analytics dashboard shows charts with data
- [ ] Admin can create/edit a menu item
- [ ] Admin can create/edit an event
- [ ] Both brands render correctly on mobile (320px–430px viewport)
- [ ] No console errors in production build
- [ ] Lighthouse score: Performance ≥ 85, Accessibility ≥ 90

---

*Engineering Roadmap v1.0.0 — PALACE_OS | This document is a living spec. Update it as each phase completes. All task completions should be marked with ✅ and dated.*
