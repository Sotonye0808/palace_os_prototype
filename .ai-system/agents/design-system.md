# Design System

> **Overview:** The FoliXx Palace platform employs a dual-brand design system that serves two emotionally distinct brands (FoliXx Bukka and Secrets Palace) while sharing component architecture. The design system is metadata-responsive, with all design tokens implemented as CSS variables that swap based on brand context. Visual language emphasizes premium accessibility, with Bukka using warm terracotta and spiced amber tones reflecting Nigerian cuisine, and Secrets Palace using deep blacks, rich golds, and electric violet for luxury nightlife aesthetics.

## Visual Language

> **Section summary:** Core visual identity — colours, typography, spacing.

### Colour Palette

The platform uses CSS variable-based design tokens with brand-specific values resolved through semantic aliases.

**FoliXx Bukka Tokens (light mode default):**
- Primary: --bukka-primary-500: #E85D1A (Spiced Terracotta - Main CTA)
- Secondary: --bukka-secondary-500: #F5A623 (Warm Amber)
- Background: --bukka-surface-bg: #FAFAF8
- Surface/Card: --bukka-surface-card: #FFFFFF
- Text Primary: --bukka-text-primary: #1A1614
- Text Muted: --bukka-text-muted: #A89F9A
- Success: --bukka-success: #2E7D52
- Error: --bukka-error: #C0392B

**Secrets Palace Tokens (dark mode default):**
- Primary: --palace-primary-500: #D4A017 (24K Gold - Main CTA)
- Secondary: --palace-secondary-500: #8B5CF6 (Electric Violet)
- Background: --palace-surface-bg: #0E0E1A
- Surface/Card: --palace-surface-card: #14142A
- Text Primary: --palace-text-primary: #F0F0F8
- Text Muted: --palace-text-muted: #5F5F88
- Success: --palace-success: #10B981
- Error: --palace-error: #EF4444

**Semantic Aliases (Theme-Agnostic):**
Components use these semantic aliases that resolve to brand-specific tokens:
- --color-primary (brand-specific primary)
- --color-secondary (brand-specific secondary)
- --color-bg (brand-specific background)
- --color-card (brand-specific card surface)
- --color-text (brand-specific text primary)
- --color-text-muted (brand-specific text muted)
- --color-success (brand-specific success)
- --color-error (brand-specific error)

### Typography

**Font Families:**
- Display/Headings: 
  - Bukka: Playfair Display
  - Palace: Cormorant Garamond
  - Fallback: Georgia, serif
- Body: Inter (both brands)
- Monospace/Data: JetBrains Mono (both brands)
- Accent (prices/labels): 
  - Bukka: Inter SemiBold
  - Palace: Cinzel
  - Fallback: Georgia, serif

**Type Scale (shared semantic sizing):**
--text-xs: 0.75rem (12px)
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)
--text-xl: 1.25rem (20px)
--text-2xl: 1.5rem (24px)
--text-3xl: 1.875rem (30px)
--text-4xl: 2.25rem (36px)
--text-5xl: 3rem (48px)
--text-6xl: 3.75rem (60px)
--text-7xl: 4.5rem (72px)

**Font Weights:**
--font-regular: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800

**Line Heights:**
--leading-tight: 1.2 (Display/hero headings)
--leading-snug: 1.35 (Section headings)
--leading-normal: 1.5 (Body text)
--leading-relaxed: 1.65 (Long-form prose)

**Letter Spacing:**
--tracking-tighter: -0.04em (Large display text)
--tracking-tight: -0.02em (Headings)
--tracking-normal: 0
--tracking-wide: 0.05em (Labels, tags, badges)
--tracking-wider: 0.1em (Uppercase labels - Secrets)
--tracking-widest: 0.2em (Decorative headings - Secrets)

### Spacing Scale

Based on 4px base unit. All spacing values are multiples of 4:
--space-0: 0
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
--space-24: 6rem (96px)
--space-32: 8rem (128px)

**Section padding (desktop):** --space-24 vertical, --space-16 horizontal
**Section padding (mobile):** --space-16 vertical, --space-6 horizontal
**Card internal padding:** --space-6
**Inline element gap:** --space-2 to --space-4

---

## Component Patterns

> **Section summary:** Standard UI components used across the project. New components should follow these patterns before inventing new ones.

### Buttons
- **Primary:** Brand-specific fill (Bukka: terracotta, Palace: gold) with appropriate text color, --radius-full (Bukka) or --radius-md (Palace), hover state with --duration-fast + --ease-out
- **Secondary:** Brand-specific outlined button with transparent fill, brand-colored text and border
- **Ghost:** Transparent background with brand-colored text on hover
- **Destructive:** Uses --color-error background with white text (Bukka) or dark text (Palace)
- **Disabled state:** 50% opacity, cursor: not-allowed
- **Loading state:** Spinner replaces label, width locked to prevent layout shift
- **Icons:** Leading or trailing, --icon-md size (20px)
- **Minimum tap target:** 44px × 44px

### Forms
- **Input fields:** --radius-md, --space-4 padding, --text-base font size, focus ring: 2px solid var(--color-primary) with 2px offset
- **Error messages:** Inline below input, --color-error border, --text-sm font size
- **Submit buttons:** Loading state shows spinner, width locked, brand-primary styling
- **Validation:** Required fields marked with asterisk, real-time validation on blur

### Navigation
- **Desktop:** Horizontal navbar with brand-context awareness
  - Bukka: White/cream background, terracotta accents
  - Palace: Transparent → glassmorphism on scroll (backdrop-filter: blur(12px)), gold accents
- **Mobile:** Hamburger menu → full-screen slide-over with brand animation
- **Shared elements:** Brand logo, nav links, user/cart/actions

### Cards / Containers
- **Types:** default, elevated, interactive, feature, glass (Palace only)
- **Default:** --radius-xl (Bukka), --radius-lg (Palace), brand-appropriate shadow
- **Elevated:** Increased shadow elevation
- **Interactive:** Hover state with shadow elevation and slight scale (transform: scale(1.02))
- **Feature:** Prominent styling for highlighted content
- **Glass (Palace only):** backdrop-filter: blur(12px), semi-transparent dark background, gold border subtle
- **Consistent internal padding:** --space-6
- **Shadow system:** Brand-specific shadows (Bukka: warm, soft; Palace: gold glows)

### Modals / Dialogs
- **Pattern:** Overlay with backdrop-filter: blur(4px), centered or side drawer
- **Bukka:** White modal with terracotta header/CTA
- **Palace:** Dark glass modal with gold header accent
- **Mobile:** Bottom-sheet drawer
- **Transitions:** --duration-normal + --ease-out for entrance
- **Focus trap:** Keyboard focus contained within modal
- **Close mechanisms:** X button, backdrop click, ESC key

---

## UX Principles

> **Section summary:** Guiding rules for how the interface should feel and behave.

1. **Clarity first:** Users should never wonder what to do next - clear visual hierarchy and progressive disclosure
2. **Brand immersion:** Each brand context should feel entirely native to that brand through color, typography, and imagery
3. **Performance-conscious:** No design decision should compromise render performance - optimized assets, efficient rendering
4. **Metadata-responsive:** All design tokens are variables; components adapt to config, not the other way around
5. **Loading states:** Always show loading state for async actions (skeleton, spinner, or progress indicator)
6. **Destructive actions:** Require confirmation (modal with clear consequences)
7. **Error messages:** Must explain what the user can do to fix the problem, inline and persistent until resolved
8. **Mobile-first:** All layouts must work at 320px wide with touch-friendly interactions
9. **Accessibility:** WCAG 2.1 AA compliance as minimum standard
10. **Feedback:** Provide clear feedback for all user actions (visual, haptic where available)

---

## Responsive Breakpoints

| Breakpoint | Value | Target |
|------------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Small desktop |
| xl | 1280px | Desktop |
| 2xl | 1536px | Wide screens |

**Container Widths:**
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1280px
--container-2xl: 1440px
--container-padding-x: clamp(1rem, 5vw, 4rem)

**Column Grid:**
- Mobile: 4-column grid, 16px gutters
- Tablet: 8-column grid, 24px gutters
- Desktop: 12-column grid, 32px gutters

---

## Accessibility Requirements

> **Section summary:** Minimum accessibility standards to follow.

- All interactive elements must have visible keyboard focus states (never `outline: none` without replacement)
- Colour contrast must meet WCAG AA (4.5:1 for normal text, 3:1 for large text/UI components)
  - Verified: Secrets Palace gold (#D4A017) on dark (#0E0E1A) ≥ 4.5:1 ✓
- Images must have alt text (decorative images: alt="")
- Forms must have associated labels (explicit or aria-label)
- Interactive elements minimum 44px × 44px touch target
- Respect `prefers-reduced-motion`: all animations wrapped in media query check
- Semantic HTML structure (headings, landmarks, proper element usage)
- ARIA labels on icon-only buttons and complex widgets
- Text resizable up to 200% without loss of content or functionality
- Keyboard navigable interface with logical tab order