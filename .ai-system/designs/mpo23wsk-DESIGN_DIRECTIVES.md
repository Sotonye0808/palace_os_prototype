# Design Directives — FoliXx Palace Platform
## Page Architecture & Component Specifications for Open Design

---

**Version:** 1.0.0
**Prerequisite:** Read `DESIGN_SYSTEM.md` fully before opening this document.
**Consuming Tools:** Open Design (design), OpenCode (implementation)
**Status:** Binding — all designs must implement every spec in this document

---

> **DIRECTIVE COMPLIANCE RULE**
> Open Design must produce designs that are pixel-accurate to these specs. Every page, section, and component described here must exist in the design file. No pages may be omitted. No layout decisions may contradict the design system tokens. OpenCode must implement designs 1:1 — deviating from the visual output of Open Design is not permitted without a logged change request.

---

## PART A: PLATFORM ARCHITECTURE

### A.1 URL & Brand Routing Structure

```
/                          → Brand selector or redirect based on user history
/bukka/                    → FoliXx Bukka home
/bukka/menu                → Menu browsing + ordering
/bukka/cart                → Cart + checkout
/bukka/orders              → Order history
/bukka/track/:orderId      → Live order tracking
/palace/                   → Secrets Palace home
/palace/reserve            → Table reservation flow
/palace/events             → Events calendar
/palace/events/:eventId    → Single event + RSVP
/palace/experience         → About / culture page
/account/                  → Shared account hub (brand-context-aware)
/account/loyalty           → Loyalty points + rewards
/account/profile           → Profile settings
/account/notifications     → Notification preferences
/admin/                    → Admin panel (separate auth)
/admin/bukka/              → Bukka management
/admin/palace/             → Secrets Palace management
/admin/analytics           → Cross-brand analytics
/admin/loyalty             → Loyalty config
```

### A.2 Shared Layout Shell

Every brand page uses a `LayoutShell` that includes:
- `<NavBar />` (brand-context-aware)
- `<main />` (page content)
- `<Footer />` (brand-context-aware)
- `<ToastContainer />` (globally mounted)
- `<CartDrawer />` (Bukka context only, slide-in from right)
- `<AuthModal />` (globally mounted, triggers on protected actions)

---

## PART B: SHARED / GLOBAL PAGES

### B.1 Brand Selector (Route: `/`)

**Purpose:** Entry point when no brand context is established.

**Layout:**
- Full screen (100vw × 100vh)
- Split 50/50 horizontally (desktop) | Stacked vertically (mobile)
- Left half: FoliXx Bukka brand panel
- Right half: Secrets Palace brand panel

**Bukka Panel:**
- Background: warm textured image of Nigerian food (full cover)
- Colour overlay: `rgba(232, 93, 26, 0.7)` gradient from bottom
- Logo: FoliXx Bukka wordmark in white, centered
- Tagline: "Taste the Tradition, Feel the Flavor" — white, `--text-2xl`, `Playfair Display`
- CTA Button: "Order Food" — white outlined pill button
- Hover state: panel expands to 60% width, CTA becomes filled

**Secrets Panel:**
- Background: dark moody venue photo (full cover)
- Colour overlay: `rgba(8, 8, 16, 0.75)` gradient
- Logo: Secrets Palace wordmark in gold, centered
- Tagline: "Where Every Guest is Royalty" — `--palace-text-primary`, `--text-2xl`, `Cormorant Garamond Italic`
- CTA Button: "Book Your Night" — gold outlined button
- Hover: panel expands to 60% width

**Divider:** On desktop, a thin gold `1px` vertical line between panels with the FoliXx Hospitality parent logo centered on it.

**Mobile:** Stacked full-width cards, each 50vh minimum. Tap card → enter that brand.

---

## PART C: FOLIXX BUKKA PAGES

### C.1 Bukka Home (Route: `/bukka/`)

**NavBar (Bukka):**
- Background: white, shadow on scroll
- Left: FoliXx Bukka logo (horizontal lockup, terracotta wordmark)
- Center: nav links — "Menu" | "About" | "Track Order"
- Right: User avatar (if logged in) | Cart icon with badge count | "Sign In" button
- Mobile: Hamburger → slide-over with full link list + cart + profile CTA

**Hero Section:**
- Full-width, min-height: 85vh (desktop) / 60vh (mobile)
- Background: high-quality food photography, warm colour-graded
- Gradient overlay: `linear-gradient(to right, rgba(26,22,20,0.85) 40%, transparent 100%)`
- Content (left-aligned, 40% width on desktop):
  - Eyebrow text: "FOLIXX BUKKA" — uppercase, `--tracking-widest`, terracotta, `--text-sm`
  - Heading: "Taste the Tradition,\nFeel the Flavor" — `Playfair Display`, `--text-6xl`, white, `--leading-tight`
  - Subheading: "From classic Nigerian dishes to contemporary cravings, every meal is a masterpiece." — `--text-lg`, `--bukka-neutral-200`
  - Order Type Selector: pill group — "Delivery" | "Takeaway" | "Dine-in" (active: terracotta fill)
  - CTA Button: "Explore Menu" — primary large, terracotta, `--radius-full`
- Floating stats bar at bottom of hero: "300+ Menu Items" | "12–35 Min Delivery" | "Rated 4.8 ⭐" — white on dark translucent pill

**Order Type Banner:**
- Below hero, full-width warm neutral strip
- 3-column grid: Delivery | Takeaway | Dine-in
- Each column: icon + heading + description + time/info
- Active type highlighted with terracotta border

**Featured / Today's Specials Section:**
- Section heading: "Today's Specials" — `Playfair Display`, `--text-3xl`, dark
- Horizontal scroll on mobile, 3-column grid on desktop
- `MenuItemCard` components (see component spec below)

**Menu Categories Quick-Nav:**
- Horizontal scrolling pill tabs: "All" | "Starters" | "Main Dishes" | "Proteins" | "Sides" | "Drinks" | "Desserts"
- Active pill: terracotta background, white text
- Sticky on scroll below navbar

**Popular Items Grid:**
- Section heading: "Customer Favourites"
- 4-column grid (desktop), 2-column (mobile)
- Each: `MenuItemCard`

**How It Works Section (Delivery):**
- 4 steps: Choose → Customise → Pay → Delivered
- Numbered step icons in terracotta circles
- Icon + heading + description per step

**Loyalty Teaser:**
- Full-width warm-toned banner
- Heading: "Every Meal Earns Rewards"
- Subtext: brief loyalty description
- CTA: "Join the Programme"
- Background: subtle Nigerian pattern motif texture, terracotta tones

**Footer (Bukka):**
- Background: `--bukka-neutral-800`
- Columns: Brand info + socials | Quick Links | Contact + address | Download App (future)
- Bottom: Copyright + links to Privacy/Terms

---

### C.2 Menu Page (Route: `/bukka/menu`)

**Layout:**
- Left sidebar (desktop 260px): category filter + dietary filter + sort
- Right: menu items grid
- Sticky top: search bar + active filter pills

**Sidebar Filters:**
- Category list (from `MenuConfig.categories`) — checkboxes
- Dietary tags: Vegetarian | Vegan | Spicy | Contains Nuts | Halal
- Sort: Recommended | Price Low-High | Price High-Low | Most Popular

**Menu Grid:**
- 3-column desktop, 2-column tablet, 1-column mobile
- Each: `MenuItemCard`
- Section dividers (sticky as you scroll): category name with count

**MenuItemCard Component:**
```
┌─────────────────────────────┐
│  [Food Image 16:9]          │
│  [POPULAR] badge (optional) │
├─────────────────────────────┤
│  Item Name        ₦ Price   │
│  Short description (1 line) │
│  [🌶 Spicy] [🥩 Protein]   │
│  ────────────────────────── │
│  [  −  ]  [ 1 ]  [  +  ]  │ ← quantity controller
│  [  Add to Cart ▶  ]        │
└─────────────────────────────┘
```
- Hover: slight scale up (`1.02`), shadow elevation
- Image aspect ratio: locked 16:9, `object-fit: cover`
- Unavailable state: image greyscale + "Currently Unavailable" overlay

**Item Detail Drawer (slide-up on mobile, modal on desktop):**
- Large image (full-width top)
- Name, full description
- Modifier groups (e.g. "Choose Protein", "Spice Level") — radio / checkbox groups
- Dietary icons row
- Quantity selector + Add to Cart CTA
- "Customers Also Ordered" row (horizontal scroll of `MenuItemCard` mini)

---

### C.3 Cart & Checkout (Route: `/bukka/cart`)

**Cart Page Layout:**
- Left (2/3): Order items list + notes field per item
- Right (1/3): Order summary card (sticky)

**Order Items:**
- Each: thumbnail, name, modifier selections, quantity controller, remove button, item total
- "Add More Items" CTA at bottom

**Order Summary Card:**
- Subtotal, delivery fee, discount code field, total
- Order type confirmation
- Delivery address input (with Google Places autocomplete)
- Scheduled delivery toggle + datetime picker
- CTA: "Proceed to Payment" — large primary button

**Payment Step (modal or route):**
- Paystack inline widget (styled to match brand)
- Order review summary above payment form
- "Place Order" confirmation

---

### C.4 Order Tracking (Route: `/bukka/track/:orderId`)

**Layout:** Centered card, max-width 600px

**Status Stepper:**
```
● Order Placed → ● Preparing → ○ Ready → ○ Out for Delivery → ○ Delivered
```
- Completed: filled terracotta circle + checkmark
- Active: pulsing terracotta circle
- Pending: grey circle

**Live ETA:**
- Large bold time remaining
- "Your order will arrive by 2:45 PM"
- Map section (placeholder in prototype — real integration Phase 2)

**Order Summary Accordion:**
- Collapsed by default — shows "3 items · ₦4,500"
- Expand: shows all items

**Help CTA:** "Having an issue?" → opens chat/WhatsApp

---

## PART D: SECRETS PALACE PAGES

### D.1 Secrets Palace Home (Route: `/palace/`)

**NavBar (Secrets):**
- Background: transparent initially → glassmorphism on scroll (`backdrop-filter: blur(12px)`, dark translucent)
- Left: Secrets Palace logo / crest mark in gold
- Center: "SECRETS PALACE" wordmark in gold, `Cormorant Garamond`, `--text-xl`, `--tracking-widest`
- Right: "Events" | "Reserve" | "Menu" links in `--palace-text-secondary` | "Book Now" CTA in gold outlined button | User icon
- Mobile: Hamburger → full-screen overlay with cinematic entrance, dark bg, gold links

**Hero Section:**
- Full viewport height (100vh)
- Background: looping video (muted) of venue — moody, dark, atmosphere shots
- Fallback: dark luxury venue photography
- Overlay: deep dark gradient `radial-gradient(circle at center, transparent 30%, rgba(8,8,16,0.9) 100%)`
- Content: centered
  - Crown/crest icon in gold, `--icon-2xl`
  - Eyebrow: "LEKKI · LAGOS · EST. 2022" — uppercase, `--tracking-widest`, `--palace-text-secondary`, `--text-xs`
  - Heading: "Where Every Guest\nIs Royalty" — `Cormorant Garamond`, `--text-7xl`, `--palace-text-primary`, `--leading-tight`
  - Subtext: "Lagos's most luxurious nightlife destination. Open Wednesday to Sunday, 10PM–6AM." — `--text-lg`, `--palace-text-secondary`
  - Two CTAs side by side:
    - Primary: "Reserve Your Table" — gold fill, dark text, `--radius-md`
    - Secondary: "See Events" — gold outlined, `--radius-md`
- Scroll indicator: animated chevron down in gold

**Operating Hours Banner:**
- Thin full-width strip below hero fold
- Dark background, gold text: "OPEN: Wednesday – Sunday · 10PM – 6AM · 148 Lekki-Epe Expressway, Lekki"
- Marquee animation (slow, elegant)

**Tonight / Upcoming Events Section:**
- Section heading: "This Week at Secrets" — `Cormorant Garamond`, `--text-4xl`, gold
- Horizontal scrolling `EventCard` components (see below)
- "View All Events →" link

**EventCard Component:**
```
┌─────────────────────────────┐
│  [Event Image / Poster]     │
│  [TONIGHT] badge (gold)     │
├─────────────────────────────┤
│  Fri, 30 May · 11PM         │  ← date + time, muted text
│  AFROBEATS FRIDAY           │  ← event name, white, bold
│  ft. DJ Spinall             │  ← performer, gold
│  ─────────────────────────  │
│  General: ₦15,000           │
│  VIP: ₦35,000               │
│  [ Get Tickets / RSVP ]     │  ← gold outlined button
└─────────────────────────────┘
```
- Card background: `--palace-surface-card`
- Border: subtle `--palace-border-default`
- Hover: `--palace-shadow-gold` glow effect

**Table Reservation Teaser:**
- Split layout: left text content, right floor map preview (blurred/teased)
- Heading: "Secure Your Throne" — Cormorant, `--text-4xl`, white
- Subtext: VIP / VVIP experience description
- CTA: "Reserve a Table" — gold

**Experience / Culture Section:**
- Dark section with atmospheric imagery
- Quote callout: "At Secrets Palace, we don't just host nightlife — we define it." — large italic gold quote
- Grid of 3 pillars: Royal Treatment | World-Class Entertainment | Premium Bottle Service
- Each pillar: icon (gold) + heading + description

**Testimonials Section:**
- 3-column grid of review cards
- Each: 5 stars (gold) + quote (truncated) + reviewer first name
- Background: slightly lighter dark card

**Footer (Secrets):**
- Background: `--palace-dark-950`
- Gold top border rule `1px`
- Columns: Brand tagline + social icons (gold) | Navigation | Contact | Dress Code notice
- Bottom: "© 2025 Secrets Palace · FoliXx Hospitality Group"
- Social: Instagram, WhatsApp, TripAdvisor — gold icon buttons

---

### D.2 Table Reservation Flow (Route: `/palace/reserve`)

**Step Indicator at top:**
```
① Date & Party Size  →  ② Select Table  →  ③ Drinks Pre-Order  →  ④ Confirm & Pay
```
Gold numbered circles, connecting line, completed steps in solid gold

**Step 1: Date & Party Size**
- Calendar date picker (custom styled: dark background, gold highlights for available dates, greyed unavailable)
- Party size stepper (−/+ buttons)
- VIP package toggle: "Standard Table" | "VIP Package" | "VVIP Experience"
- Package description appears below toggle
- "Check Availability" CTA

**Step 2: Select Table (Floor Map)**
- SVG floor map of venue zones
- Tables rendered as dynamic elements: available (gold outline) / reserved (dark muted) / selected (gold filled)
- Zone labels: "Main Floor" | "VIP Lounge" | "Stage-Side" | "VVIP Suite"
- Hover on table: tooltip with capacity, minimum spend, package details
- Sidebar: selected table summary

**Step 3: Drinks Pre-Order**
- Drinks catalogue: categories (Champagne / Spirits / Cocktails / Non-Alcoholic)
- `DrinkCard`: bottle image, name, price per bottle
- Add to order with quantity control
- Note field: "Any specific requests or occasion details?"
- Running total in sticky sidebar

**Step 4: Confirm & Pay**
- Full booking summary: date, table, package, party size, drinks selected
- Guest details form: name, phone, email
- Total charge breakdown
- Paystack payment integration
- On success: Booking confirmation page with QR code

---

### D.3 Events Page (Route: `/palace/events`)

**Header:**
- Dark hero section with "Events & Nights" heading in Cormorant, gold
- Subtext: "Every night at Secrets is a curated masterpiece."
- Filter bar: All | Tonight | This Week | SPOB | VIP Events | Special Occasions

**Events Grid:**
- 3-column desktop, 2-column tablet, 1-column mobile
- `EventCard` components (full variant with longer description)
- Past events section below current/upcoming (greyscale treatment)

**Single Event Page (Route: `/palace/events/:id`):**
- Hero: full-width event poster image
- Event details: date, time, performers, description
- Ticket tiers: General | VIP | VVIP — card selection UI
- Quantity selector per tier
- CTA: "Get Tickets" → payment flow
- Related events section at bottom

---

## PART E: SHARED / ACCOUNT PAGES

### E.1 Auth Pages (Modal or Route)

**Sign In Modal:**
- Tabs: "Email" | "Phone"
- Fields: email/phone + password
- "Forgot Password?" link
- Google OAuth button (styled to brand)
- "Don't have an account? Sign Up"

**Sign Up Modal:**
- Fields: Full name, email, phone, password
- Optional: "How did you hear about us?" dropdown
- T&C checkbox
- Google OAuth option

*Bukka: warm modal aesthetic. Secrets: dark glass modal with gold accents.*

---

### E.2 Account Hub (Route: `/account/`)

**Layout:** Sidebar navigation (desktop) | Bottom tabs (mobile)

**Sidebar links:**
- My Orders (Bukka icon)
- My Bookings (Secrets icon)
- Loyalty & Rewards
- Profile Settings
- Notification Preferences
- Sign Out

**Overview Dashboard:**
- Greeting: "Welcome back, [Name]"
- Loyalty tier badge: Bronze/Silver/Gold/Royal crown badge in brand colour
- Points balance + progress bar to next tier
- Recent activity: last 3 orders + last 3 bookings in tabs
- Quick actions: "Order Again" from last Bukka order | "Reserve" for Secrets

---

### E.3 Loyalty Page (Route: `/account/loyalty`)

**Points Overview Card:**
- Large points balance (prominent number, gold/terracotta)
- Tier name + icon
- Progress bar to next tier with points needed
- Points expiry notice (if applicable)

**How to Earn Section:**
- Grid of earn rule cards: icon + description + points value
- Bukka: "₦100 spent = 1 point" | Secrets: "Table booking = 50 points" | Referral: "= 100 points"

**Tier Benefits Section:**
- 4-column tier display: Bronze | Silver | Gold | Royal
- Each column: tier name, icon, threshold, list of perks
- Current tier highlighted

**Rewards Catalogue:**
- Grid of redeemable rewards: item image + name + point cost + "Redeem" button
- Balance check: button disabled if insufficient points

**Points History:**
- Table: Date | Activity | Brand | Points (earned/spent)
- Filterable by brand and type

---

## PART F: ADMIN PANEL PAGES

### F.1 Admin Layout

- Left sidebar: always visible on desktop
- Sidebar sections: Dashboard | Bukka (orders, menu, analytics) | Secrets Palace (reservations, events, analytics) | Loyalty | Users | Settings
- Brand tabs at top of content area to switch between Bukka and Secrets views

### F.2 Analytics Dashboard (Route: `/admin/analytics`)

**Layout:** KPI cards row → charts grid

**KPI Cards Row (4 cards):**
```
[ Total Revenue Today ]  [ Orders / Bookings ]  [ New Customers ]  [ Loyalty Points Issued ]
    ₦1,247,500                 143 / 28              34               2,840 pts
    ↑ 12% vs yesterday       ↑ 8% | ↑ 5%           ↑ 3%              ↑ 18%
```
- Card: white (Bukka admin) / dark (Secrets admin)
- Sparkline chart in each card
- Trend indicator: green/red arrow

**Charts Grid (2×2 desktop, stacked mobile):**
1. Revenue Over Time — area chart, last 30 days, dual-brand toggle
2. Top Menu Items / Packages — horizontal bar chart
3. Booking Funnel (Secrets) — funnel/step chart
4. Customer Segments (RFM) — donut chart

**Below Grid:**
- Peak Hours Heatmap (7 days × 24 hours, green-gold colour scale)
- Recent Orders table (Bukka) / Recent Bookings table (Secrets) — filterable, exportable

### F.3 Menu Manager (Route: `/admin/bukka/menu`)

- Left: category tree
- Right: item grid for selected category
- "Add Item" / "Edit Item" modal: all fields including image upload, modifier group builder, availability rules
- Toggle available/unavailable per item (real-time update)

### F.4 Events Manager (Route: `/admin/palace/events`)

- Calendar view (month) with event dots
- "Create Event" form: title, date, time, performer names, ticket types with pricing, capacity per tier
- Guest list management per event: CSV export, check-in tracking

---

## PART G: RESPONSIVE BEHAVIOUR RULES

1. **Navigation:** Desktop = horizontal navbar | Mobile = hamburger + slide-over
2. **Grids:** Follow column counts in DESIGN_SYSTEM section 10.3
3. **Cards:** Full width on mobile (<640px), 2-col on tablet, 3–4 col on desktop
4. **Modals → Drawers:** Any modal becomes a bottom-sheet drawer on mobile
5. **Sidebars → Bottom tabs:** Admin sidebar becomes bottom navigation on tablet/mobile
6. **Hero typography:** Scale down 2 type sizes on mobile from desktop spec
7. **Floor map (Secrets):** Pinch-to-zoom enabled on mobile
8. **Analytics dashboard:** Charts stack to full width on mobile; KPI cards wrap to 2×2 then 1-column
9. **Always maintain minimum 44px touch targets on mobile**
10. **Never show hover states on touch devices**

---

## PART H: STATE DESIGN REQUIREMENTS

Every interactive component must have all states designed:

| Component | Required States |
|-----------|----------------|
| Buttons | default, hover, active/pressed, focus, disabled, loading |
| Inputs | default, focused, filled, error, disabled |
| Menu item card | default, hover, out-of-stock |
| Table (floor map) | available, selected, reserved, VVIP |
| Event card | upcoming, tonight, sold-out, past |
| Loyalty tier badge | each of 4 tiers |
| Order status | each of 5 statuses |
| Toast | success, error, warning, info |

---

## PART I: DESIGN FILE ORGANISATION (Open Design)

```
PALACE_OS Design File
├── 🎨 Design Tokens (Auto-synced)
│   ├── Bukka Tokens
│   └── Palace Tokens
├── 📐 Foundations
│   ├── Colour Swatches
│   ├── Typography Styles
│   ├── Spacing & Grid
│   └── Icon Library
├── 🧩 Components
│   ├── Buttons
│   ├── Form Controls
│   ├── Cards
│   ├── Navigation
│   ├── Modals & Drawers
│   ├── Badges & Tags
│   └── Data Viz
├── 📱 Pages — FoliXx Bukka
│   ├── Home (Desktop + Mobile)
│   ├── Menu (Desktop + Mobile)
│   ├── Cart + Checkout
│   └── Order Tracking
├── 🌙 Pages — Secrets Palace
│   ├── Home (Desktop + Mobile)
│   ├── Reservation Flow (4 steps)
│   ├── Events Listing
│   └── Single Event
├── 👤 Pages — Account
│   ├── Brand Selector
│   ├── Auth (Sign In / Sign Up)
│   ├── Account Hub
│   └── Loyalty Page
└── ⚙️ Pages — Admin
    ├── Analytics Dashboard
    ├── Menu Manager
    └── Events Manager
```

---

*Design Directives v1.0.0 — PALACE_OS | These directives are binding. Open Design must implement all pages and states. OpenCode must faithfully implement Open Design output.*
