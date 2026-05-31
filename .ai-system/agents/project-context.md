# Project Context

> **Overview:** FoliXx Palace (PALACE_OS) is a unified, metadata-driven digital platform serving two hospitality brands under FoliXx Hospitality: FoliXx Bukka (Nigerian cuisine restaurant) and Secrets Palace (luxury nightclub). The platform solves the problem of fragmented, third-party-dependent digital infrastructure by providing owned, extensible systems for online ordering, reservations, loyalty programs, and analytics.

## Project Purpose

> **Section summary:** What this project does and why it exists.

FoliXx Palace creates a single platform that consolidates brand presence, customer-facing experiences (menu browsing, ordering, table reservations, event discovery), and operational back-office (analytics, CMS, inventory management) for two distinct hospitality brands. It replaces fragmented third-party dependencies (OlaClick POS, WhatsApp ordering, static booking flows) with an owned system that serves both businesses distinctly while sharing infrastructure. The platform is architected following a metadata-driven, admin-configurable OOP-based development pattern with hardcoded fallback configs, ensuring minimal hardcoding and maximum flexibility.

## Target Users

> **Section summary:** Who uses this system and what they need from it.

| User Type | Needs | Key Interactions |
|-----------|-------|-----------------|
| The Bukka Regular (Chisom, 28) | Native online ordering with payment processing, loyalty points, real-time order tracking | Browse menu, customize orders, make payments, track delivery, check loyalty points |
| The Secrets Loyalist (Emeka, 32) | Structured reservations with table selection, bottle pre-order, event calendar, VIP recognition | Browse events, reserve tables, pre-order drinks, manage bookings, check loyalty status |
| The Special Occasion Guest (Adaeze, 25) | Seamless booking across both brands for special occasions, transparent pricing | Browse both brands, coordinate Bukka dinner + Secrets afterparty, clear pricing upfront |
| The Venue Admin (Operations Manager) | Single dashboard to manage menus, pricing, inventory, bookings, promotions across both brands | Update menu items, adjust pricing, view sales reports, manage inventory, configure promotions |
| The Brand Marketer (Marketing Lead) | Tools to publish event pages, manage guest lists, send push/email blasts, track campaign performance | Create events, manage guest lists, send notifications, analyze campaign conversion, track loyalty program |

## Business Constraints

> **Section summary:** Non-negotiable requirements that affect how we build.

- Project is a prototype — full payment processing will be sandboxed (Paystack test mode)
- Real-time order tracking will use mock state machine (WebSocket-ready but no live kitchen integration in prototype)
- Both brands are under one corporate entity that consents to a unified data layer
- Nigerian mobile numbers (0XX format) are primary identifiers
- NGN (₦) is the sole currency
- AI-system directives must be embedded in the project repository as a `/.ai-system/` directory for tool compliance across sessions
- Must comply with NDPR (Nigeria Data Protection Regulation)
- Must support offline-capable PWA for menu browsing
- Must maintain WCAG 2.1 AA accessibility compliance

## Current Project Phase

> **Section summary:** Where the project stands right now in its development lifecycle.

Phase: Prototype → Build Stabilization (Build error remediation complete)
Active sprint focus: Production build passing, next steps: i18n, deprecation cleanup, test coverage

## Tech Decisions Already Made

> **Section summary:** Decisions that are locked in and should not be revisited unless explicitly flagged.

| Decision | Reason |
|----------|--------|
| Next.js 16 (App Router, webpack) | Upgraded from Next.js 14; TurboPack disabled via `--webpack` flag |
| Tailwind CSS + CSS Variables | Design token system enabling brand theming through CSS variable swaps |
| Zustand | Lightweight global state management (loyalty store, cart state) |
| Node.js + Express (Next.js API routes) | Familiar JavaScript/TypeScript unified stack, scalable backend |
| PostgreSQL (via Supabase) | Relational database with JSONB support for flexible metadata storage |
| Supabase Auth | Email, phone, Google OAuth authentication with JWT |
| Paystack | Nigeria-first payment processor, PCI compliant, robust API |
| Supabase Storage / Cloudinary | Reliable file storage with image optimization capabilities |
| Resend (email), Termii (SMS), FCM (push) | Nigerian-market appropriate notification services |
| Custom + PostHog analytics | Event tracking, funnels, heatmaps for behavioral analytics |
| Vercel (frontend) | Zero-config CI/CD, seamless deployment experience |
| Sentry | Error tracking and monitoring for production stability |
| Lucide Icons | Consistent, open-source icon library with appropriate stroke weights |

## Out of Scope

> **Section summary:** Things we are explicitly not building in this project.

- The Glass House integration (Phase 2)
- Native iOS/Android apps (PWA covers mobile in v1)
- Third-party delivery platform integration (Glovo, Chowdeck)
- Kitchen Display System (KDS) for restaurant staff
- Multi-currency or international expansion
- AI-powered menu recommendations (Phase 2)
- Live streaming of events within the platform
- Hardcoded content (all content must be metadata-driven/admin-configurable)
- Direct database edits for content changes (all via admin panel)

## External Integrations

> **Section summary:** Third-party services and APIs this project connects to.

| Service | Purpose | Auth Method |
|---------|---------|------------|
| Paystack | Payment processing (cards, bank transfer, USSD) | API Key (Secret) |
| Supabase | Database (PostgreSQL), Authentication, Storage | API Key (anon/service_role) |
| Resend | Email transactional & marketing | API Key |
| Termii | SMS notifications (Nigerian gateway) | API Key |
| FCM (Firebase Cloud Messaging) | Push notifications (PWA) | Firebase Project Credentials |
| Cloudinary | Image optimization, transformation, delivery | API Key/Secret |
| PostHog | Product analytics, funnels, heatmaps | API Key |
| Sentry | Error tracking and performance monitoring | DSN (Data Source Name) |
| Google OAuth | Authentication provider | OAuth 2.0 |