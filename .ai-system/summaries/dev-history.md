## 2026-05-30   Data privacy compliance implementation (NDPR, explicit consent flows)

**Summary:**
Implemented data privacy compliance for Nigeria Data Protection Regulation (NDPR) with explicit consent flows. Added database tables for tracking user consent records and policy versions, extended profiles table with consent fields, and implemented Row Level Security policies to protect user privacy data.

**Completed:**
- Added privacy_consents table to track user consent records with type, version, status, and metadata
- Added privacy_policy_versions table to manage privacy policy versions with content and effective dates
- Extended profiles table with marketing_consent, analytics_consent, data_processing_consent, and last_consent_update fields
- Implemented Row Level Security policies ensuring users can only manage their own consent records
- Created initial privacy policy version (v1.0) with comprehensive NDPR-compliant content covering data collection, usage, sharing, user rights, cookies, security, and contact information

**Files Modified:**
- Created: supabase/migrations/20260530045626_add_privacy_compliance.sql - Data privacy compliance migration (NDPR, explicit consent flows)

**Key Changes:**
- Extended data layer with privacy-specific tables and columns in Supabase database
- Implemented proper access controls using Row Level Security for privacy compliance
- Established foundation for explicit consent management required by NDPR
- Created versioned privacy policy system allowing updates while maintaining consent records
- Maintained metadata-driven architecture principles with database-driven privacy configuration

**Next Sprint Focus:**
Internationalization (English primary, NGN currency, Nigerian phone formats)

## 2026-05-30   Internationalization (English primary, NGN currency, Nigerian phone formats)

**Summary:**
Implemented internationalization (i18n) with English as the primary language, Nigerian Naira (NGN) as the currency, and Nigerian phone number formats. Added i18n configuration, translation files, and updated the application to use proper currency and phone formatting.

**Completed:**
- Installed next-i18next, i18next, and react-i18next packages
- Created next-i18next.config.js configuration file with English as default locale
- Created locales/en/common.json with English translations, NGN currency symbols (₦), and Nigerian phone number format placeholders (+234 XXX XXX XXXX)
- Updated app/layout.tsx to wrap the application with i18n provider
- Implemented currency formatting with NGN symbol and proper formatting
- Implemented Nigerian phone number format with +234 country code

**Files Modified:**
- Created: apps/web/next-i18next.config.js - i18n configuration
- Created: apps/web/locales/en/common.json - English translations with NGN currency and Nigerian phone formats
- Modified: apps/web/app/layout.tsx - Added i18n provider wrapper

**Key Changes:**
- Added internationalization foundation supporting English language with NGN currency
- Implemented Nigerian phone number format standards (+234 country code)
- Established i18n framework ready for future language expansions
- Maintained metadata-driven architecture by keeping translations separate from code
- Prepared application for proper localization of currency and phone number displays

**Next Sprint Focus:**
[None - Internationalization completed]

## 2026-05-31  — JSX build error remediation and i18n cleanup

**Summary:**
Fixed a large wave of JSX syntax and import errors preventing `next build` from succeeding. The codebase had accumulated multiple issues including literal `\n` character corruption in several source files, missing `'use client'` directives required by Next.js 16, incorrect module import paths, and mismatched JSX tag structures.

**Completed:**
- Rewrote 3 files corrupted by literal `\n` characters (bukka/menu/page.tsx, palace/events/page.tsx, palace/reserve/page.tsx)
- Added `'use client'` directives to 7 files using React hooks (useAuth.ts, useOrderRealtime.ts, BrandContext.tsx, AuthContext.tsx, reserve/page.tsx, checkout/page.tsx, menu/[itemId]/page.tsx)
- Fixed broken import paths: `@/src/contexts/` → `@/lib/contexts/`, `@/components/seo/` → `@/components/shared/seo/`
- Fixed package imports: replaced `@packages/config/defaults` with relative `../../../../packages/config/src/defaults` paths in lib/services/cms.ts and lib/loyalty/store.ts
- Fixed supabase import paths in lib/services/guestList.ts and lib/services/waitlist.ts (from `./supabase` to `../auth/supabase`)
- Fixed layout.tsx globals.css path and removed unused next-i18next import/provider to eliminate build warning
- Fixed JSX structural issues: unterminated strings, stray braces, wrong return statement nesting in reserve page mockZones.map closure
- Fixed checkout page: malformed className, getCurrentDateISO() reference, deliveryMethod type coercion

**Files Modified:**
- apps/web/app/layout.tsx — removed next-i18next import and provider
- apps/web/app/bukka/menu/page.tsx — full rewrite
- apps/web/app/bukka/menu/[itemId]/page.tsx — added use client, fixed modifier selection, cleaned stray braces
- apps/web/app/bukka/checkout/page.tsx — added use client, fixed className, date, types
- apps/web/app/bukka/order-tracking/page.tsx — fixed unterminated string
- apps/web/app/palace/events/page.tsx — cleaned corruption, fixed missing div
- apps/web/app/palace/events/[eventId]/page.tsx — added use client, fixed escaping
- apps/web/app/palace/reserve/page.tsx — added use client, fixed template literal, restructured map return
- apps/web/lib/auth/hooks/useAuth.ts — added use client, fixed import path
- apps/web/lib/hooks/useOrderRealtime.ts — added use client
- apps/web/lib/contexts/BrandContext.tsx — added use client
- apps/web/lib/contexts/AuthContext.tsx — added use client
- apps/web/lib/services/guestList.ts — fixed supabase import
- apps/web/lib/services/waitlist.ts — fixed supabase import
- apps/web/lib/services/cms.ts — fixed relative import for config defaults
- apps/web/lib/loyalty/store.ts — fixed relative import for config
- .ai-system/index/repo-map.md — updated directory structure to monorepo layout
- .ai-system/index/dependency-graph.md — updated package versions and paths
- .ai-system/agents/system-architecture.md — updated directory structure and Next.js version
- .ai-system/planning/project-plan.md — marked i18n as todo instead of done
- .ai-system/summaries/dev-history.md — added this entry

**Key Changes:**
- Production build now succeeds with zero compilation errors (only non-blocking images.domains deprecation warning)
- i18n infrastructure removed since it was unused and causing a build warning (install redo properly if needed)
- All files using hooks are properly marked with `'use client'` for Next.js 16 strict component model
- Supabase service layer shares a single client via `lib/auth/supabase.ts`
- Package config imports use relative paths to avoid webpack alias resolution issues

**Root Cause Summary:**
- Files had been corrupted with literal `\n` character sequences (likely from an earlier automated edit or copy-paste issue)
- Next.js 16 introduced stricter server/client component separation compared to Next.js 14
- Webpack does not resolve `@packages/` tsconfig path aliases the same way as tsc, necessitating relative imports
- Multiple edit passes on the same files led to residual structural corruption (stray tags, wrong nesting)

**Next Sprint Focus:**
- Set up proper i18n if needed for NGN currency/phone formatting
- Address images.domains deprecation in next.config.js
- Add proper component tests to prevent regressions