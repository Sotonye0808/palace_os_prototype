# Product Requirements Document (PRD)
## FoliXx Palace — Unified Hospitality & Lifestyle Platform

---

**Document Version:** 1.0.0
**Date:** 2025-05-27
**Author:** AI-Assisted (Claude Sonnet 4.6 + Developer .ai-system)
**Status:** Approved for Prototype Development
**Project Codename:** `PALACE_OS`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Context & Research Findings](#2-business-context--research-findings)
3. [Problem Statement](#3-problem-statement)
4. [Product Vision & Goals](#4-product-vision--goals)
5. [User Personas](#5-user-personas)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Feature Specifications](#8-feature-specifications)
9. [Analytics & Data Intelligence](#9-analytics--data-intelligence)
10. [Admin & Configuration System](#10-admin--configuration-system)
11. [Technology Stack](#11-technology-stack)
12. [Metadata-Driven Architecture Overview](#12-metadata-driven-architecture-overview)
13. [Constraints & Assumptions](#13-constraints--assumptions)
14. [Success Metrics](#14-success-metrics)
15. [Out of Scope (v1)](#15-out-of-scope-v1)
16. [Glossary](#16-glossary)

---

## 1. Executive Summary

**FoliXx Palace** is a unified, metadata-driven digital platform serving two distinct but sibling hospitality brands under the **FoliXx Hospitality** umbrella:

- **FoliXx Bukka** — A Nigerian cuisine restaurant on the Lekki–Epe Expressway offering dine-in, takeaway, and delivery.
- **Secrets Palace** — Lagos's premier luxury nightclub and adult entertainment venue operating Wednesday–Sunday, 10 PM–6 AM.

The platform consolidates brand presence, customer-facing experiences (ordering, reservations, table booking, event discovery), and operational back-office (analytics, CMS, inventory signals) into a single, beautifully designed application. It replaces fragmented third-party dependencies (OlaClick POS, WhatsApp ordering, static booking flows) with an owned, extensible system that serves both businesses distinctly while sharing infrastructure.

The platform is architected following a **metadata-driven, admin-configurable, OOP-based** development pattern — with hardcoded fallback configs — ensuring minimal hardcoding and maximum flexibility across sessions and environments.

---

## 2. Business Context & Research Findings

### 2.1 FoliXx Bukka

**Current state:**
- Primary customer-facing presence is via `folixxbukka.ola.click` — a third-party OlaClick digital menu with limited customisation.
- A companion app at `app.folixxbukka.com` exists with a minimal interface: hero section, theme toggle, "Explore Menu" CTA, but no functional ordering flow.
- Ordering is WhatsApp-forwarded, creating friction and untracked conversions.
- Social proof exists (TripAdvisor, Instagram `@folixxbukka`, Facebook `foliXx`).
- Services: Dine-in, Takeaway, Delivery (12–35 min).
- Location: 142 Lekki–Epe Expressway, Lekki, Lagos.

**Gaps identified:**
- No native online ordering with payment processing.
- No loyalty or rewards system.
- No customer data capture (no emails, no preference history).
- No real-time order tracking.
- No admin dashboard for menu management, order management, or analytics.
- No delivery partner integration.

### 2.2 Secrets Palace

**Current state:**
- `secretspalace.com` blocked to scrapers — minimal technical presence.
- Operates Wed–Sun, 10 PM–6 AM; peak: 3–5 AM.
- 116K+ Instagram followers (`@secretspalace`); strong social/cultural credibility.
- Self-described as "most luxurious nightclub in Lagos" and "best club in Africa."
- Revenue model: Bottle service, table reservations, entry, SPOB (open bar Wednesday events).
- Customer profile: Millennials, Gen Z, celebrities, influencers, high-net-worth individuals.
- Key experience differentiators: Royal treatment framing, no hidden charges, skilled DJs, international entertainers.
- Reservations reportedly handled via WhatsApp chatbot (`secretspalace.com` links to one).
- Has run "Secrets 4.0" relaunches — event marketing is a core activity.

**Gaps identified:**
- No structured online booking with table selection and bottle pre-order.
- No event calendar or RSVP system.
- No VIP tier / loyalty program.
- No analytics on customer spend, frequency, or preferences.
- No digital menu / drinks catalogue with pricing transparency.
- No staff-facing operational view.

### 2.3 Parent Brand: FoliXx Hospitality

FoliXx Hospitality also operates **The Glass House** (a refined lounge/bar), but this is scoped for Phase 2. The parent site (`folixxhospitality.com`) positions the group as a complete lifestyle ecosystem. The platform should respect and reinforce this parent brand narrative.

---

## 3. Problem Statement

FoliXx Hospitality runs two flagship venues with strong brand equity and loyal customer bases but operates with fragmented, third-party-dependent digital infrastructure that:

1. **Leaks revenue** — untracked WhatsApp conversions, no native payment rails.
2. **Loses customer data** — no CRM, no email capture, no behavioural intelligence.
3. **Limits brand control** — OlaClick/WhatsApp UX doesn't reflect luxury brand identity.
4. **Creates operational blind spots** — no real-time dashboard for orders, reservations, or revenue.
5. **Prevents loyalty building** — no mechanism to reward repeat customers.
6. **Misses marketing leverage** — no event-driven push notifications, no targeted campaigns.

---

## 4. Product Vision & Goals

### Vision
> *"One platform. Two worlds. A seamless digital experience as premium as the venues themselves."*

### Strategic Goals

| # | Goal | Business Outcome |
|---|------|-----------------|
| G1 | Centralise customer journeys for both brands | Unified customer identity, cross-sell opportunities |
| G2 | Enable native online ordering (Bukka) | Reduce WhatsApp friction, capture payment data |
| G3 | Enable structured reservations & table booking (Secrets) | Increase advance booking rate, reduce no-shows |
| G4 | Build owned customer data layer | Drive CRM, segmentation, personalisation |
| G5 | Provide real-time analytics dashboard | Operational visibility, revenue intelligence |
| G6 | Empower admins to configure content without code | Reduce TTM for menu/event updates |
| G7 | Establish a loyalty & rewards framework | Increase retention and repeat visits |

---

## 5. User Personas

### 5.1 "The Bukka Regular" — Chisom, 28
- Lagos professional, orders lunch 3x/week.
- Currently uses WhatsApp to order; wants a native app experience.
- Values speed, accuracy, and knowing when food arrives.
- Motivated by loyalty points and meal deals.

### 5.2 "The Secrets Loyalist" — Emeka, 32
- High-income entrepreneur, visits Secrets Palace 2–3x/month.
- Books tables in advance for group outings and celebrations.
- Expects VIP recognition, pre-orders his preferred bottles.
- Wants to see upcoming events and performer lineups.

### 5.3 "The Special Occasion Guest" — Adaeze, 25
- Plans a birthday dinner at Bukka and afterparty at Secrets.
- Discovers both venues on Instagram; needs seamless booking for both.
- Values transparency: knows pricing upfront, no surprises.

### 5.4 "The Venue Admin" — Operations Manager
- Manages menus, pricing, inventory, bookings, and promotions.
- Wants a single dashboard to update content across both brands.
- Needs real-time sales data, booking reports, and customer insights.

### 5.5 "The Brand Marketer" — Marketing Lead
- Manages event campaigns for Secrets Palace SPOB and special nights.
- Needs to publish event pages, manage guest lists, send push/email blasts.
- Tracks campaign conversion from RSVP to attendance.

---

## 6. Functional Requirements

### 6.1 Core Platform Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F-01 | Multi-brand routing: users land on brand-specific experience based on URL or selection | Must Have |
| F-02 | Shared authentication layer (single account, multiple brand contexts) | Must Have |
| F-03 | Metadata-driven brand config: colours, fonts, copy, images from CMS, not code | Must Have |
| F-04 | Responsive design: desktop, tablet, mobile-first | Must Have |
| F-05 | Dark mode default for Secrets Palace; light mode default for Bukka; toggleable | Must Have |
| F-06 | PWA capability: installable, offline-capable for menu browsing | Should Have |

### 6.2 FoliXx Bukka — Ordering System

| ID | Requirement | Priority |
|----|-------------|----------|
| B-01 | Dynamic menu with categories, items, images, descriptions, pricing from CMS | Must Have |
| B-02 | Cart with quantity control, item notes, and upsells | Must Have |
| B-03 | Order type selection: Delivery, Takeaway, Dine-in | Must Have |
| B-04 | Address input and delivery fee calculation | Must Have |
| B-05 | Payment: card, bank transfer, USSD (Paystack/Flutterwave integration) | Must Have |
| B-06 | Order confirmation with estimated delivery time | Must Have |
| B-07 | Real-time order status tracking (Placed → Preparing → Ready → Delivered) | Should Have |
| B-08 | Order history with re-order functionality | Should Have |
| B-09 | Meal scheduling: pre-order for a future time | Could Have |
| B-10 | Group ordering: share a cart link with others | Could Have |

### 6.3 Secrets Palace — Reservation & Events System

| ID | Requirement | Priority |
|----|-------------|----------|
| S-01 | Table/area selection with visual floor map | Must Have |
| S-02 | Reservation date, time, and group size selection | Must Have |
| S-03 | Bottle/drinks pre-order at booking time | Must Have |
| S-04 | Event calendar with RSVP/ticket purchase | Must Have |
| S-05 | VIP package tiers with configurable perks | Must Have |
| S-06 | Reservation confirmation via email + SMS | Must Have |
| S-07 | Waitlist for fully booked nights | Should Have |
| S-08 | Dress code and entry policy display | Must Have |
| S-09 | Guest list management (event-specific) | Should Have |
| S-10 | Live event feed / "Tonight at Secrets" section | Should Have |

### 6.4 Loyalty & Rewards

| ID | Requirement | Priority |
|----|-------------|----------|
| L-01 | Points accrual on Bukka orders and Secrets spend | Must Have |
| L-02 | Tier system: Bronze, Silver, Gold, Royal | Must Have |
| L-03 | Rewards catalogue: free items, discounts, VIP upgrades | Must Have |
| L-04 | Points balance and history on user profile | Must Have |
| L-05 | Referral programme with tracked referral codes | Should Have |

### 6.5 User Accounts & Profiles

| ID | Requirement | Priority |
|----|-------------|----------|
| U-01 | Registration: email, phone, Google OAuth | Must Have |
| U-02 | Profile: name, avatar, preferences, dietary notes | Must Have |
| U-03 | Saved addresses | Must Have |
| U-04 | Notification preferences: push, email, SMS | Must Have |
| U-05 | Order and booking history across both brands | Must Have |

### 6.6 Notifications & Communications

| ID | Requirement | Priority |
|----|-------------|----------|
| N-01 | Transactional: order confirmation, booking confirmation, status updates | Must Have |
| N-02 | Marketing: event announcements, promotions, new menu items | Should Have |
| N-03 | Push notifications via FCM (PWA) | Should Have |
| N-04 | Email via provider (SendGrid/Resend) | Must Have |
| N-05 | SMS via Nigerian gateway (Termii/Infobip) | Must Have |

---

## 7. Non-Functional Requirements

| Category | Requirement |
|----------|------------|
| Performance | Page load < 2.5s on 3G; Time to Interactive < 4s |
| Availability | 99.5% uptime SLA; maintenance windows 6–9 AM WAT |
| Security | HTTPS enforced; JWT auth; PCI-DSS compliant payment handling via gateway |
| Scalability | Architecture supports horizontal scaling; event nights may spike 10x normal traffic |
| Accessibility | WCAG 2.1 AA compliance |
| SEO | SSR/SSG for public pages; structured data (JSON-LD) for menus and events |
| Data Privacy | NDPR (Nigeria Data Protection Regulation) compliant; explicit consent flows |
| Internationalisation | English primary; NGN currency; Nigerian phone number formats |

---

## 8. Feature Specifications

### 8.1 Menu Architecture (Bukka)

The menu is entirely metadata-driven. A `menu_config` object in the CMS defines:

```
MenuConfig {
  categories: Category[]         // e.g. "Starters", "Main Dishes", "Drinks"
  items: MenuItem[]              // Each item: id, name, description, price, image, tags, dietary, available
  modifiers: ModifierGroup[]     // e.g. "Spice level", "Protein choice"
  availability: AvailabilityRule[] // Time-based: lunch items only 11–3 PM
  featured: string[]             // Item IDs pinned as "Today's Specials"
  upsells: UpsellRule[]          // "Customers who ordered X also ordered Y"
}
```

No menu item is hardcoded in UI components. All rendering is driven by this config.

### 8.2 Floor Map (Secrets Palace)

Tables and areas are defined in a `venue_config` JSON:

```
VenueConfig {
  zones: Zone[]                  // e.g. "VIP Lounge", "Main Floor", "Stage Area"
  tables: Table[]                // id, zone, capacity, type (standard/VIP/VVIP), position (x,y on SVG map)
  blackout_dates: string[]       // Admin-configurable dates with no availability
  pricing: TablePricing[]        // Minimum spend per table per night, overrideable per event
}
```

The floor map SVG is rendered dynamically from this config, with available/reserved/selected states.

### 8.3 Events System (Secrets Palace)

```
Event {
  id, title, date, time, description
  performers: Performer[]
  cover_image, gallery: string[]
  ticket_types: TicketType[]     // General, VIP, VVIP
  guest_list_config: GuestListConfig
  is_sold_out: boolean           // Auto-computed from capacity
  tags: string[]                 // e.g. "SPOB", "Birthday Bash", "Afrobeats Night"
}
```

### 8.4 Loyalty Engine

Points rules, tier thresholds, and rewards are all admin-configurable:

```
LoyaltyConfig {
  earn_rules: EarnRule[]         // e.g. "₦100 spend = 1 point (Bukka)", "Table booking = 50 points (Secrets)"
  tiers: Tier[]                  // Bronze (0–499), Silver (500–1999), Gold (2000–4999), Royal (5000+)
  tier_perks: Perk[]             // Per tier: free delivery, priority booking, complimentary welcome drink
  rewards: Reward[]              // Redeemable items with point costs
  expiry: ExpiryConfig           // Points expire after N months of inactivity
}
```

---

## 9. Analytics & Data Intelligence

### 9.1 Customer Analytics
- Customer lifetime value (CLV) per brand
- Frequency and recency segmentation (RFM model)
- Cohort analysis: new vs returning customers by month
- Cross-brand customer identification (visits both Bukka and Secrets)

### 9.2 Revenue Analytics
- Daily/weekly/monthly GMV by brand, category, time-of-day
- Average order value trends
- Top-selling menu items and table packages
- Discount/promo usage and ROI

### 9.3 Operational Analytics
- Order fulfilment times (Bukka): average prep time, delivery time
- Booking conversion funnel (Secrets): views → initiated → confirmed → no-show
- Peak hour heatmaps
- Table occupancy rates per zone

### 9.4 Marketing Analytics
- Event page views → RSVP → attendance conversion
- Notification open rates and click-through rates
- Referral programme performance
- Loyalty tier distribution and rewards redemption rate

### 9.5 Dashboard Design
The analytics dashboard is role-based:
- **Super Admin**: All metrics across both brands
- **Bukka Manager**: Bukka-specific order and revenue data
- **Secrets Manager**: Reservation, event, and bottle service data
- **Marketer**: Campaign performance and customer segments only

All charts are powered by a `AnalyticsConfig` metadata object defining visible widgets, date ranges, and chart types per role.

---

## 10. Admin & Configuration System

All platform content is managed through a **Super Admin Panel** — no direct database edits or code changes required for content.

### 10.1 CMS Modules
- **Brand Config**: Name, logos, colours, typography, hero content per brand
- **Menu Manager** (Bukka): CRUD for categories, items, modifiers, availability
- **Venue Manager** (Secrets): Table config, zone config, pricing rules
- **Events Manager** (Secrets): Create/edit events, performer profiles, ticket types
- **Loyalty Manager**: Configure earn rules, tiers, rewards, expiry
- **Promotions Manager**: Create discount codes, flash sales, bundle offers
- **User Manager**: View/search customers, adjust loyalty points, flag accounts
- **Notification Templates**: Configurable email/SMS/push templates with variable placeholders

### 10.2 Hardcoded Fallback Config

Per the `.ai-system` pattern, every configurable item has a typed hardcoded default exported from a central `config/defaults.ts` file. If the CMS returns null or a network error occurs, the UI falls back to these defaults gracefully — no blank screens or broken layouts.

---

## 11. Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 14 (App Router) | SSR/SSG, PWA, excellent DX, ecosystem |
| Styling | Tailwind CSS + CSS Variables | Design token system, rapid iteration |
| State Management | Zustand + React Query | Lightweight global state + server state sync |
| Backend | Node.js + Express (or Next.js API routes) | Familiar, scalable, JS-unified stack |
| Database | PostgreSQL (via Supabase) | Relational, JSONB for metadata configs |
| Auth | Supabase Auth (JWT + OAuth) | Email, phone, Google sign-in |
| Payments | Paystack | Nigeria-first, robust, PCI compliant |
| File Storage | Supabase Storage / Cloudinary | Image uploads for menu, events |
| Notifications | Resend (email), Termii (SMS), FCM (push) | Nigerian SMS gateway support |
| Analytics Backend | Custom + PostHog | Event tracking, funnels, heatmaps |
| Charts | Recharts / Nivo | Flexible, accessible data visualisation |
| Deployment | Vercel (frontend) + Railway/Render (API) | Zero-config CI/CD |
| Monitoring | Sentry | Error tracking |

---

## 12. Metadata-Driven Architecture Overview

The application follows a **Metadata-First** pattern where:

1. **Config objects** (stored in DB, fetched at boot) drive all rendering logic.
2. **UI components** are generic and receive config props — no component knows about specific menu items, table layouts, or event structures by name.
3. **Admin Panel** is the single interface for mutating all config objects.
4. **Hardcoded fallbacks** in `config/defaults.ts` ensure the app never fails to render.
5. **OOP class models** define entity shapes: `MenuItem`, `Table`, `Event`, `LoyaltyTier`, etc. These are shared between frontend types, API validation schemas (Zod), and DB models.

```
AppConfig (fetched at boot)
  ├── BrandConfig[]            (FolixxBukka, SecretsPalace)
  ├── MenuConfig               (Bukka)
  ├── VenueConfig              (Secrets)
  ├── LoyaltyConfig            (shared)
  ├── NotificationConfig       (shared)
  └── AnalyticsConfig          (per role)
```

This architecture enables a single codebase to serve radically different brand experiences purely through configuration.

---

## 13. Constraints & Assumptions

- **Constraint**: Project is a prototype — full payment processing will be sandboxed (Paystack test mode).
- **Constraint**: Real-time order tracking will use mock state machine (WebSocket-ready but no live kitchen integration in prototype).
- **Assumption**: Both brands are under one corporate entity that consents to a unified data layer.
- **Assumption**: Nigerian mobile numbers (0XX format) are primary identifiers.
- **Assumption**: NGN (₦) is the sole currency.
- **Constraint**: AI-system directives must be embedded in the project repository as a `/.ai-system/` directory for tool compliance across sessions.

---

## 14. Success Metrics

| Metric | Target (3 months post-launch) |
|--------|-------------------------------|
| Bukka: Online orders as % of total | > 40% |
| Secrets: Reservations via platform | > 60% of total bookings |
| User registration rate | > 70% of ordering customers |
| Loyalty programme enrolment | > 50% of registered users |
| Admin config changes via dashboard (not code) | 100% of content changes |
| Analytics dashboard daily active use | > 80% of ops staff |
| App load time (mobile 3G) | < 2.5 seconds |

---

## 15. Out of Scope (v1)

- The Glass House integration (Phase 2)
- Native iOS/Android apps (PWA covers mobile in v1)
- Third-party delivery platform integration (Glovo, Chowdeck)
- Kitchen Display System (KDS) for restaurant staff
- Multi-currency or international expansion
- AI-powered menu recommendations (Phase 2)
- Live streaming of events within the platform

---

## 16. Glossary

| Term | Definition |
|------|-----------|
| FoliXx Hospitality | Parent company owning all three venues |
| PALACE_OS | Internal project codename |
| Metadata-Driven | UI rendering controlled by config objects, not hardcoded values |
| Admin-Configurable | Any content change doable via admin panel without code deployment |
| SPOB | Secrets Palace Open Bar — Wednesday open bar event |
| VIP/VVIP | Tiered table categories at Secrets Palace |
| .ai-system | Developer's AI compliance and project continuity directive system |
| OOP | Object-Oriented Programming pattern applied to entity models |
| Hardcoded Fallback | Static defaults in code ensuring graceful degradation when CMS is unavailable |
| RFM | Recency, Frequency, Monetary — customer segmentation model |
| WAT | West Africa Time (UTC+1) |

---

*This PRD was collaboratively authored using Claude AI (Anthropic) as project manager, iterating on live research of FoliXx Bukka and Secrets Palace digital presence, and guided by the developer's .ai-system metadata-driven architecture directives.*

---
**End of Document — PRD v1.0.0**
