# Dependency Graph

> **Overview:** Maps how modules depend on each other. Agents use this to understand the impact of changes before modifying a module. Updated whenever new dependencies are introduced or modules are refactored.

---
## Module Dependency Map

```
AppLayout
  → BrandProvider (provides brand context)
  → ToastContainer (global notifications)
  → NavBar (brand-aware navigation)
  → Footer (brand-aware footer)

BrandProvider
  → CSS Variables (sets brand-specific tokens via data-brand attribute)
  → useRouter (Next.js for URL-based brand detection)
  → usePathname (Next.js for current route)

NavBar (Bukka context)
  → BrandProvider (consumes brand context)
  → Link (Next.js navigation)
  → useState (for mobile menu toggle)
  → CartIcon (with badge count)
  → UserAvatar / SignInButton

NavBar (Palace context)
  → BrandProvider (consumes brand context)
  → Link (Next.js navigation)
  → useState (for mobile menu toggle)
  → Gold CTA Button ("Book Your Table")

MenuItemCard (shared component)
  → BrandProvider (consumes brand context for styling)
  → Image (Next.js optimized image)
  → useState (for hover effects)
  → Link (to item detail)
  → Button (Add to Cart)

CartDrawer
  → BrandProvider (consumes brand context)
  → useState (cart visibility)
  → Map over cart items
  → MenuItemCard (for each item)
  → OrderSummaryCard
  → Button (Checkout)

OrderSummaryCard
  → BrandProvider (consumes brand context)
  → Calculates subtotal, delivery fee, tax, total
  → Display field for promo code
  → Button (Proceed to Payment)

AuthModal
  → BrandProvider (consumes brand context)
  → useState (form fields, active tab)
  → Supabase Auth functions (signIn, signUp)
  → Google OAuth provider
  → Form validation

LoyaltyProvider
  → BrandProvider (consumes brand context for colors)
  → useState (points, tier, rewards)
  → useEffect (fetch loyalty data on init)
  → Context value (points balance, tier, redemption functions)

AdminLayout
  → BrandTabs (switch between Bukka/Palace views)
  → SidebarNavigation
  → ContentArea (based on selected tab)

BrandTabs
  → useState (active tab)
  → Link (Next.js navigation)

SupabaseClient (lib)
  → createClient (@supabase/supabase-js)
  → Environment variables (URL, KEY)
  → Exported singleton instance

ConfigService
  → SupabaseClient (fetches config from database)
  → DefaultConfigs (fallback when DB unavailable)
  → useState/useEffect for caching
  → Memoized getters for each config type

API Routes (src/app/api/*/route.ts)
  → SupabaseClient (database operations)
  → Zod validation (input validation)
  → Auth middleware (route protection)
  → Controller functions (business logic)
  → Error handling (try/catch, error formatting)

Zustand Stores
  → Subscribe to relevant API routes
  → Provide state to components via hooks
  → Middleware for persistence/logging (optional)

Components
  → UI primitives (Button, Input, Card, Modal)
  → Feature-specific components (MenuItemCard, EventCard, etc.)
  → Layout components (headers, footers, sidebars)
  → Page components (route-level components)
```

---
## External Dependencies

> **Section summary:** Third-party packages and what they're used for. Review before adding new packages.

| Package | Purpose | Used In |
|---------|---------|---------|
| next@16 | React framework with App Router | apps/web/app/ (pages, routing) |
| react | UI library | Throughout frontend |
| react-dom | DOM bindings for React | Throughout frontend |
| zustand | State management | apps/web/lib/loyalty/store.ts (loyalty state) |
| tailwindcss | Utility-first CSS framework | apps/web/styles/ (design system) |
| @supabase/supabase-js | Supabase client | apps/web/lib/services/ (database operations) |
| zod | Schema validation | packages/config/src/ (type validation) |
| lucide-react | Icon library | apps/web/components/ (icons) |

---
## Circular Dependency Warnings

> **Section summary:** Any detected circular dependencies that need to be resolved.

[None detected / list any here]

---
## Dependency Rules

> **Section summary:** Rules about which modules may depend on which others. Prevents architectural decay.

- Controllers may depend on Services — not the other way around
- Services may depend on Models — not the other way around
- Utils must have no dependencies on application modules
- Config module must not depend on any application code
- UI components should depend on design tokens, not specific brand implementations
- Brand-specific components should depend on shared UI primitives
- Feature modules should depend on shared services and models
- Pages should depend on feature components and UI primitives
- API routes should depend on services and validation schemas
- Services should depend on models and external APIs
- Models should be independent (pure TypeScript classes/interfaces)