# Repair System — Error Knowledge Base

> **Overview:** A living knowledge base of errors encountered during development, their root causes, and how they were fixed. Agents should consult this before diagnosing new errors. Every fixed bug should be logged here to prevent recurrence.

---

## How to Use This File

- **Before debugging:** Search this file for patterns matching your current error
- **After fixing a bug:** Add an entry using the template at the bottom
- **Agents:** Reference this during the fix-build and self-heal cycles

---

## Error Log

> **Section summary:** Each error entry includes the symptom, cause, fix, and prevention strategy. Entries are added chronologically.

---

### [TEMPLATE — copy this for each new error]

```
## [Error Title / Short Description]

**Symptom:**
[What the developer or user sees — error message, broken behaviour, etc.]

**Root Cause:**
[The actual technical reason this happened]

**Fix Applied:**
[What change was made to resolve it]

**Prevention:**
[How to avoid this in future — pattern, lint rule, architecture change, etc.]

**Files Affected:**
[List of files that were changed]

**Date:** [YYYY-MM-DD]
```

---

## Known Error Patterns

> **Section summary:** Recurring error categories seen in this tech stack. Agents should check this section when they match the pattern before investigating further.

### React / Next.js

**Hydration Mismatch**
- Symptom: `Hydration failed because the initial UI does not match what was rendered on the server`
- Cause: Browser-only logic (window, localStorage, Date.now()) running during server render
- Fix: Wrap in `useEffect` or use `dynamic(() => import(...), { ssr: false })`
- Prevention: Never access browser APIs outside useEffect in components

**Missing Key Prop**
- Symptom: `Each child in a list should have a unique "key" prop`
- Cause: `.map()` rendering without a stable unique key
- Fix: Add `key={item.id}` — use a stable unique ID, not the array index

**Missing 'use client' on Server Component Using Client Hooks**
- Symptom: Runtime error like `useBrand must be used within a BrandProvider`, or `useAuthContext must be used within an AuthProvider`, or hooks failing silently in SSR
- Cause: A server-component file (no 'use client') directly calls a client-side hook (`useAuth`, `useBrand`, `useState`, `useEffect`, etc.). During SSR, the hook runs but cannot find its provider context because the provider's context is not set up in the server render tree.
- Fix: Add `'use client';` as the first line of any file that calls client-side hooks directly at the top level of a React component.
- Prevention: Any page/layout file that imports and calls `useAuth`, `useBrand`, or any hook from a `'use client'` module must itself have `'use client'`. Also ensure that components using hooks (useState, useEffect, event handlers) have `'use client'` or are only used inside client components.

---

### Node.js / Backend

**Unhandled Promise Rejection**
- Symptom: Server crashes silently or logs `UnhandledPromiseRejectionWarning`
- Cause: async function missing try/catch, or `.catch()` not attached to promise
- Fix: Wrap async route handlers in try/catch, use an async error middleware
- Prevention: Always use a global async error wrapper for Express routes

**Database Connection Pool Exhausted**
- Symptom: Requests hang indefinitely under load
- Cause: Connection pool limit too low or connections not being released
- Fix: Increase pool size in config, ensure `client.release()` in finally blocks
- Prevention: Always release DB connections in finally, not just success path

---

### Configuration / Environment

**Missing Environment Variable**
- Symptom: `undefined` values in production, features silently broken
- Cause: Variable defined in `.env.local` but not in production environment
- Fix: Add to deployment environment variables and validate on startup
- Prevention: Add a startup validation check that throws if required env vars are missing

---

```
## "useBrand must be used within a BrandProvider" — Server Component Using Client Hook

**Symptom:**
`Uncaught Error: useBrand must be used within a BrandProvider` at runtime when visiting admin pages.

**Root Cause:**
The admin layout (`apps/web/app/admin/layout.tsx`) and admin dashboard page (`apps/web/app/admin/dashboard/page.tsx`) were server components (no `'use client'` directive) that directly called `useAuth()` — a client-side hook. Inside `useAuth`, `useBrand()` is called via `useContext(BrandContext)`. During SSR, the server component tree renders without the BrandProvider context (which only exists in the client component tree), so `useContext` returns `null` and the guard clause throws.

**Fix Applied:**
1. Added `'use client';` to `apps/web/app/admin/layout.tsx`
2. Added `'use client';` to `apps/web/app/admin/dashboard/page.tsx`
3. Added `'use client';` to `apps/web/components/admin/ConfigEditor.tsx` (uses useState/useEffect)
4. Removed unused import of `Select` from `ConfigEditor.tsx` (the file `components/shared/Select.tsx` did not exist)

**Prevention:**
Any page or layout that directly calls a client-side hook (`useAuth`, `useBrand`, `useState`, etc.) must have `'use client'` as the first line. Check all files using `useAuth` or `useBrand` for this directive.

**Files Affected:**
- apps/web/app/admin/layout.tsx
- apps/web/app/admin/dashboard/page.tsx
- apps/web/components/admin/ConfigEditor.tsx

**Date:** 2026-05-31
```

## Resolved Errors Archive

> **Section summary:** Errors that have been fully resolved and are unlikely to recur. Kept for reference.

[Entries move here when the underlying cause has been permanently fixed]
