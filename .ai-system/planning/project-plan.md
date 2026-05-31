# Project Plan

> **Overview:** High-level feature checklist for the project. Agents update checkboxes as work is completed. Sections represent major development phases. See task-queue.md for granular, sprint-level tasks.

## Phase 1 — Foundation

> **Section summary:** Core infrastructure that everything else depends on.

- [x] Repository structure and folder conventions established
- [x] Configuration system implemented (env vars, config files)
- [x] Logging framework in place
- [x] Error handling middleware / global error boundaries
- [x] CI/CD pipeline (if applicable)

## Phase 2 — Core Features

> **Section summary:** The primary features that define the product's value.

- [x] Multi-brand routing system (URL-based brand selection)
- [x] Shared authentication layer (email, phone, Google OAuth)
- [x] Metadata-driven brand config system (CSS variables, brand contexts)
- [x] Responsive design framework (breakpoints, container system)
- [x] PWA capability (offline menu browsing, installable)
- [x] FoliXx Bukka ordering system (menu, cart, checkout, payment)
- [x] Secrets Palace reservation system (table selection, floor map)
- [x] Events system (calendar, ticketing, RSVP)
- [x] Loyalty & rewards framework (points, tiers, rewards catalogue)
- [x] User accounts & profiles (registration, preferences, history)
- [x] Notification system (email, SMS, push)

## Phase 3 — Secondary Features

> **Section summary:** Supporting features that enhance the core experience.

- [x] Real-time order status tracking (Placed → Preparing → Ready → Delivered)
- [x] Order history with re-order functionality
- [x] Meal scheduling (pre-order for future time)
- [x] Group ordering (share cart link)
- [x] Waitlist for fully booked nights (Secrets Palace)
- [x] Guest list management (event-specific)
- [x] Live event feed ("Tonight at Secrets")
- [x] Referral programme with tracked referral codes
- [x] Dietary filters and modifier groups (menu customization)
- [x] Address book with Google Places autocomplete
- [x] Scheduled delivery/pickup timing
- [x] Package/deal bundling system
- [x] Admin content management system (CMS)
- [x] Hardcoded fallback configuration system
- [x] Role-based admin dashboard (Super Admin, Bukka Manager, Secrets Manager, Marketer)

## Phase 4 — Quality & Polish

> **Section summary:** Reliability, performance, and user experience improvements.

- [x] Unit test coverage for core modules
- [x] Integration tests for critical paths
- [x] Performance audit and optimisation (target: <2.5s on 3G)
- [x] Accessibility audit (WCAG 2.1 AA compliance)
- [x] Error states and loading states complete
- [x] SEO optimization (SSR/SSG, JSON-LD structured data)
- [x] Data privacy compliance (NDPR, explicit consent flows)
- [ ] Internationalization (English primary, NGN currency, Nigerian phone formats) — removed unused next-i18next; needs proper setup if required
- [x] Analytics dashboard (revenue, customer segmentation, operational metrics)
- [x] Peak hour heatmaps and booking funnel analytics

## Phase 5 — Launch Preparation

> **Section summary:** Final steps before production deployment.

- [x] Production environment configured
- [x] Security audit (auth, input validation, secrets)
- [x] Documentation complete
- [x] Deployment pipeline tested
- [x] Payment processing in sandbox mode (Paystack test)
- [x] Performance benchmarks met
- [x] Cross-browser and device testing completed

## Completed

> **Section summary:** Features fully shipped. Archived here for reference.

- [x] Project initialization and repository setup
- [x] .ai-system documentation structure established
- [x] AI context and agent instructions populated
- [x] Design system and design directives implemented
- [x] Engineering roadmap reviewed and integrated
- [x] PRD requirements mapped to development phases
- [x] Metadata-driven architecture foundation completed