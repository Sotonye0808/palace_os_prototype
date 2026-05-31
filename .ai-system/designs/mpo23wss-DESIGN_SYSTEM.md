# Design System — FoliXx Palace Platform
## `PALACE_OS` — Open Design Directives

---

**Version:** 1.0.0
**For:** Open Design (design tool)
**Consuming System:** OpenCode (development)
**Brands Covered:** FoliXx Bukka · Secrets Palace
**Status:** Active — AI tools must comply fully

---

> **AI TOOL COMPLIANCE NOTICE**
> This design system is the single source of truth for all visual design decisions in the PALACE_OS project. Any design tool (Open Design or equivalent) and any code generation tool (OpenCode or equivalent) **must** strictly follow these specifications. No deviation from defined tokens, component structures, spacing rules, or brand guidelines is permitted without an explicit update to this document. When in doubt, refer here first.

---

## 1. Design Philosophy

The platform serves two emotionally distinct brands that share DNA under one parent:

- **FoliXx Bukka**: Warm, vibrant, approachable. Nigerian cultural pride meets modern digital convenience. Colours of clay, spice, and sunlight.
- **Secrets Palace**: Dark, luxurious, exclusive. Royal drama, nightlife energy, mystery. Deep blacks, rich golds, electric accents.

Both brands must feel **premium but accessible**, reflecting a hospitality group that serves both the everyday lunch crowd and the Lagos high-life crowd. Design must never feel cheap, cluttered, or generic.

**Core Principles:**
1. **Clarity first** — Users should never wonder what to do next.
2. **Brand immersion** — Each brand context should feel entirely native to that brand.
3. **Performance-conscious** — No design decision should compromise render performance.
4. **Metadata-responsive** — All design tokens are variables; components adapt to config, not the other way around.

---

## 2. Brand Contexts

The platform has two brand contexts that share component architecture but use distinct design tokens. Switching brand context is a CSS variable swap — no component changes.

### 2.1 Brand Identifiers

| Property | FoliXx Bukka | Secrets Palace |
|----------|-------------|----------------|
| `brand.id` | `folixx-bukka` | `secrets-palace` |
| `brand.defaultMode` | `light` | `dark` |
| `brand.locale` | `en-NG` | `en-NG` |
| `brand.currency` | `NGN` | `NGN` |

---

## 3. Colour System

### 3.1 FoliXx Bukka — Colour Palette

**Philosophy**: Warm terracotta and spiced amber reflecting Nigerian cuisine. Clean whites for readability. Bold greens for freshness and health.

```css
/* === FOLIXX BUKKA TOKENS === */

/* Primary */
--bukka-primary-50:  #FFF5ED;
--bukka-primary-100: #FFE8D1;
--bukka-primary-200: #FFC99A;
--bukka-primary-300: #FFA563;
--bukka-primary-400: #FF7A2B;
--bukka-primary-500: #E85D1A;   /* Main CTA — Spiced Terracotta */
--bukka-primary-600: #C44510;
--bukka-primary-700: #9E2E08;
--bukka-primary-800: #7A1E04;
--bukka-primary-900: #5C1202;

/* Secondary */
--bukka-secondary-500: #F5A623;  /* Warm Amber — accents, highlights */
--bukka-secondary-600: #D4881A;

/* Neutral */
--bukka-neutral-0:   #FFFFFF;
--bukka-neutral-50:  #FAFAF8;
--bukka-neutral-100: #F4F2EE;
--bukka-neutral-200: #E8E4DD;
--bukka-neutral-300: #D4CECC;
--bukka-neutral-400: #A89F9A;
--bukka-neutral-500: #7A706A;
--bukka-neutral-600: #5A524D;
--bukka-neutral-700: #3D3733;
--bukka-neutral-800: #2A2420;
--bukka-neutral-900: #1A1614;

/* Semantic */
--bukka-success:     #2E7D52;
--bukka-warning:     #F5A623;
--bukka-error:       #C0392B;
--bukka-info:        #2E5FA3;

/* Surface */
--bukka-surface-bg:       #FAFAF8;
--bukka-surface-card:     #FFFFFF;
--bukka-surface-elevated: #FFFFFF;
--bukka-surface-overlay:  rgba(26, 22, 20, 0.6);

/* Text */
--bukka-text-primary:   #1A1614;
--bukka-text-secondary: #5A524D;
--bukka-text-muted:     #A89F9A;
--bukka-text-inverse:   #FFFFFF;
--bukka-text-brand:     #E85D1A;

/* Border */
--bukka-border-default: #E8E4DD;
--bukka-border-strong:  #D4CECC;
--bukka-border-brand:   #E85D1A;
```

### 3.2 Secrets Palace — Colour Palette

**Philosophy**: Royal darkness. Deep obsidian backgrounds, 24-karat gold accents, electric violet for energy. Near-white for legibility. This is Lagos high-life encoded in pixels.

```css
/* === SECRETS PALACE TOKENS === */

/* Primary — Royal Gold */
--palace-primary-50:  #FFFBEB;
--palace-primary-100: #FEF3C7;
--palace-primary-200: #FDE68A;
--palace-primary-300: #FCD34D;
--palace-primary-400: #FBBF24;
--palace-primary-500: #D4A017;   /* Main CTA — 24K Gold */
--palace-primary-600: #B7880F;
--palace-primary-700: #92670A;
--palace-primary-800: #704D07;
--palace-primary-900: #523704;

/* Secondary — Electric Violet */
--palace-secondary-500: #8B5CF6;   /* Accent — Nightclub energy */
--palace-secondary-400: #A78BFA;
--palace-secondary-600: #7C3AED;

/* Dark Backgrounds */
--palace-dark-950:  #080810;   /* Deepest background */
--palace-dark-900:  #0E0E1A;   /* Page background */
--palace-dark-800:  #14142A;   /* Card background */
--palace-dark-700:  #1C1C38;   /* Elevated card */
--palace-dark-600:  #252545;   /* Hover state */
--palace-dark-500:  #2E2E55;   /* Active/Selected */

/* Neutral — Cool Platinum */
--palace-neutral-50:  #F8F8FC;
--palace-neutral-100: #EDEDF5;
--palace-neutral-200: #CDCDE0;
--palace-neutral-300: #ADADC8;
--palace-neutral-400: #8080A8;
--palace-neutral-500: #5F5F88;
--palace-neutral-600: #464669;

/* Semantic */
--palace-success:  #10B981;
--palace-warning:  #D4A017;
--palace-error:    #EF4444;
--palace-info:     #8B5CF6;

/* Surface */
--palace-surface-bg:       #0E0E1A;
--palace-surface-card:     #14142A;
--palace-surface-elevated: #1C1C38;
--palace-surface-overlay:  rgba(8, 8, 16, 0.85);
--palace-surface-glass:    rgba(20, 20, 42, 0.7);   /* backdrop-filter blur */

/* Text */
--palace-text-primary:   #F0F0F8;
--palace-text-secondary: #ADADC8;
--palace-text-muted:     #5F5F88;
--palace-text-inverse:   #0E0E1A;
--palace-text-gold:      #D4A017;

/* Border */
--palace-border-default: rgba(173, 173, 200, 0.15);
--palace-border-gold:    rgba(212, 160, 23, 0.5);
--palace-border-glow:    rgba(212, 160, 23, 0.8);
```

### 3.3 Semantic Aliases (Theme-Agnostic)

Components use semantic aliases. The brand context sets which raw tokens these resolve to.

```css
/* Applied at :root[data-brand="folixx-bukka"] or :root[data-brand="secrets-palace"] */

--color-primary:       /* bukka: --bukka-primary-500  |  palace: --palace-primary-500 */
--color-primary-hover: /* bukka: --bukka-primary-600  |  palace: --palace-primary-600 */
--color-secondary:     /* bukka: --bukka-secondary-500 | palace: --palace-secondary-500 */
--color-bg:            /* bukka: --bukka-surface-bg    | palace: --palace-surface-bg */
--color-card:          /* bukka: --bukka-surface-card  | palace: --palace-surface-card */
--color-elevated:      /* bukka: --bukka-surface-elevated | palace: --palace-surface-elevated */
--color-text:          /* bukka: --bukka-text-primary  | palace: --palace-text-primary */
--color-text-muted:    /* bukka: --bukka-text-muted    | palace: --palace-text-muted */
--color-border:        /* bukka: --bukka-border-default | palace: --palace-border-default */
--color-success:       /* bukka: --bukka-success       | palace: --palace-success */
--color-error:         /* bukka: --bukka-error         | palace: --palace-error */
```

---

## 4. Typography

### 4.1 Font Families

| Role | FoliXx Bukka | Secrets Palace | Fallback |
|------|-------------|----------------|---------|
| Display / Headings | `Playfair Display` | `Cormorant Garamond` | `Georgia, serif` |
| Body | `Inter` | `Inter` | `system-ui, sans-serif` |
| Monospace / Data | `JetBrains Mono` | `JetBrains Mono` | `Courier New, monospace` |
| Accent (prices/labels) | `Inter` SemiBold | `Cinzel` | `Georgia, serif` |

**Source:** Google Fonts (self-host for performance)

### 4.2 Type Scale

```css
/* Shared type scale — semantic sizing */
--text-xs:    0.75rem;   /* 12px — labels, captions */
--text-sm:    0.875rem;  /* 14px — secondary body, tags */
--text-base:  1rem;      /* 16px — primary body */
--text-lg:    1.125rem;  /* 18px — lead text */
--text-xl:    1.25rem;   /* 20px — card titles */
--text-2xl:   1.5rem;    /* 24px — section headings */
--text-3xl:   1.875rem;  /* 30px — page titles (mobile) */
--text-4xl:   2.25rem;   /* 36px — page titles (desktop) */
--text-5xl:   3rem;      /* 48px — hero headings (desktop) */
--text-6xl:   3.75rem;   /* 60px — mega hero (Secrets) */
--text-7xl:   4.5rem;    /* 72px — cinematic hero (Secrets) */
```

### 4.3 Font Weights

```css
--font-regular:   400;
--font-medium:    500;
--font-semibold:  600;
--font-bold:      700;
--font-extrabold: 800;
```

### 4.4 Line Heights

```css
--leading-tight:   1.2;   /* Display/hero headings */
--leading-snug:    1.35;  /* Section headings */
--leading-normal:  1.5;   /* Body text */
--leading-relaxed: 1.65;  /* Long-form prose */
```

### 4.5 Letter Spacing

```css
--tracking-tighter: -0.04em;  /* Large display text */
--tracking-tight:   -0.02em;  /* Headings */
--tracking-normal:   0;
--tracking-wide:     0.05em;  /* Labels, tags, badges */
--tracking-wider:    0.1em;   /* Uppercase labels (Secrets) */
--tracking-widest:   0.2em;   /* Decorative headings (Secrets) */
```

---

## 5. Spacing System

Based on a 4px base unit. All spacing values are multiples of 4.

```css
--space-0:   0;
--space-1:   0.25rem;  /* 4px */
--space-2:   0.5rem;   /* 8px */
--space-3:   0.75rem;  /* 12px */
--space-4:   1rem;     /* 16px */
--space-5:   1.25rem;  /* 20px */
--space-6:   1.5rem;   /* 24px */
--space-8:   2rem;     /* 32px */
--space-10:  2.5rem;   /* 40px */
--space-12:  3rem;     /* 48px */
--space-16:  4rem;     /* 64px */
--space-20:  5rem;     /* 80px */
--space-24:  6rem;     /* 96px */
--space-32:  8rem;     /* 128px */
```

**Section padding (desktop):** `--space-24` vertical, `--space-16` horizontal
**Section padding (mobile):** `--space-16` vertical, `--space-6` horizontal
**Card internal padding:** `--space-6`
**Inline element gap:** `--space-2` to `--space-4`

---

## 6. Border Radius

```css
--radius-none: 0;
--radius-sm:   0.25rem;   /* 4px — tags, badges */
--radius-md:   0.5rem;    /* 8px — inputs, small cards */
--radius-lg:   0.75rem;   /* 12px — standard cards */
--radius-xl:   1rem;      /* 16px — prominent cards */
--radius-2xl:  1.5rem;    /* 24px — feature cards */
--radius-3xl:  2rem;      /* 32px — hero cards, modals */
--radius-full: 9999px;    /* Pills, avatars, circular buttons */
```

**Bukka default card radius:** `--radius-xl`
**Secrets default card radius:** `--radius-lg` (sharper, more architectural)

---

## 7. Shadow & Elevation System

### Bukka (warm, soft shadows)
```css
--bukka-shadow-sm:  0 1px 3px rgba(232, 93, 26, 0.08), 0 1px 2px rgba(0,0,0,0.06);
--bukka-shadow-md:  0 4px 12px rgba(232, 93, 26, 0.1), 0 2px 4px rgba(0,0,0,0.06);
--bukka-shadow-lg:  0 10px 30px rgba(232, 93, 26, 0.12), 0 4px 8px rgba(0,0,0,0.08);
--bukka-shadow-xl:  0 20px 60px rgba(232, 93, 26, 0.15);
```

### Secrets Palace (gold glows)
```css
--palace-shadow-sm:  0 1px 3px rgba(0,0,0,0.4);
--palace-shadow-md:  0 4px 20px rgba(0,0,0,0.5);
--palace-shadow-lg:  0 10px 40px rgba(0,0,0,0.6);
--palace-shadow-gold: 0 0 20px rgba(212, 160, 23, 0.3), 0 0 60px rgba(212, 160, 23, 0.15);
--palace-shadow-glow: 0 0 40px rgba(139, 92, 246, 0.4);
```

---

## 8. Iconography

- **Library:** Lucide Icons (open source, consistent stroke style)
- **Size tokens:**
  - `--icon-xs: 12px` — inline text icons
  - `--icon-sm: 16px` — compact UI
  - `--icon-md: 20px` — standard (default)
  - `--icon-lg: 24px` — prominent actions
  - `--icon-xl: 32px` — feature icons
  - `--icon-2xl: 48px` — empty state / onboarding
- **Stroke width:** 1.5px (Bukka), 1px (Secrets — more delicate)
- Icons in Secrets Palace CTAs may use gold colour fills on dark backgrounds.

---

## 9. Motion & Animation

```css
/* Duration */
--duration-instant:  50ms;
--duration-fast:    150ms;
--duration-normal:  250ms;
--duration-slow:    400ms;
--duration-slower:  600ms;

/* Easing */
--ease-out:      cubic-bezier(0.0, 0.0, 0.2, 1.0);
--ease-in:       cubic-bezier(0.4, 0.0, 1.0, 1.0);
--ease-in-out:   cubic-bezier(0.4, 0.0, 0.2, 1.0);
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1.0);  /* Bouncy, use for delightful micro-interactions */
--ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);        /* Secrets Palace hero transitions */
```

**Rules:**
- Interactive elements: `--duration-fast` + `--ease-out`
- Page transitions: `--duration-slow` + `--ease-cinematic`
- Secrets Palace hero animations: `--duration-slower` + `--ease-cinematic`
- Respect `prefers-reduced-motion`: all animations wrapped in media query check.

---

## 10. Grid & Layout System

### 10.1 Breakpoints
```css
--bp-sm:  640px;    /* Mobile landscape */
--bp-md:  768px;    /* Tablet */
--bp-lg:  1024px;   /* Small desktop */
--bp-xl:  1280px;   /* Desktop */
--bp-2xl: 1536px;   /* Wide */
```

### 10.2 Container Widths
```css
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1440px;   /* Max for wide layouts */
--container-padding-x: clamp(1rem, 5vw, 4rem);
```

### 10.3 Column Grid
- **Mobile:** 4-column grid, 16px gutters
- **Tablet:** 8-column grid, 24px gutters
- **Desktop:** 12-column grid, 32px gutters

### 10.4 Content Width Constraints
- **Prose / forms:** max 680px
- **Card grids:** max 1280px
- **Hero sections:** full bleed (100vw)
- **Analytics dashboard:** max 1440px

---

## 11. Component Library

### 11.1 Button

**Variants:** `primary` | `secondary` | `ghost` | `danger` | `gold` (Secrets only)

```
Button States: default | hover | active | focus | disabled | loading
Button Sizes: sm (32px h) | md (40px h) | lg (48px h) | xl (56px h)
```

**Design Rules:**
- Minimum tap target: 44px × 44px
- Loading state: spinner replaces label, width locked to prevent layout shift
- Icons: leading or trailing, `--icon-md` size
- Bukka primary: terracotta fill, white text, `--radius-full`
- Secrets primary: gold fill, dark text, `--radius-md` (sharper)
- Secrets `gold` variant: gold border + gold text on transparent, glow on hover

### 11.2 Input / Form Controls

- Text input, textarea, select, phone input, date picker
- All inputs: `--radius-md`, `--space-4` padding, `--text-base` font size
- Focus ring: `2px solid var(--color-primary)`, `2px offset`
- Error state: `--color-error` border + inline error message below
- Bukka: warm neutral background inputs
- Secrets: dark card background inputs, gold focus ring

### 11.3 Card

**Types:** `default` | `elevated` | `interactive` | `feature` | `glass` (Secrets only)

- `glass` card: `backdrop-filter: blur(12px)`, semi-transparent dark background, gold border subtle
- `interactive` card: hover state with shadow elevation and slight scale (`transform: scale(1.02)`)
- Consistent internal padding: `--space-6`

### 11.4 Badge / Tag

- Size: auto width, `--space-1 --space-3` padding, `--text-xs`, `--radius-sm`
- Colours driven by semantic tokens: success/warning/error/info + brand primary
- Uppercase + `--tracking-wide` for status badges (Secrets Palace table availability)

### 11.5 Avatar

- Sizes: xs(24) | sm(32) | md(40) | lg(56) | xl(80)
- Circular (`--radius-full`)
- Fallback: initials on brand-coloured background
- Group: overlapping avatars with white/dark border

### 11.6 Navigation

**Shared Nav Component — brand-context-aware:**
- **Bukka**: White/cream background, horizontal nav links, prominent cart button in terracotta
- **Secrets**: Dark transparent (glass blur on scroll), gold brand name, CTA "Book a Table" in gold
- Mobile: Hamburger menu → full-screen slide-over with brand animation

### 11.7 Modal / Drawer

- Overlay: `var(--color-overlay)` with `backdrop-filter: blur(4px)`
- Drawer slides from bottom (mobile), side or center modal (desktop)
- Secrets: dark glass modal with gold header accent
- Bukka: white modal with terracotta header/CTA

### 11.8 Toast / Notification

- Position: top-right (desktop), bottom-center (mobile)
- Types: success | error | warning | info
- Auto-dismiss: 4000ms default
- Bukka: warm coloured backgrounds
- Secrets: dark with gold/coloured left border accent

### 11.9 Loading States

- **Skeleton**: grey gradient shimmer (Bukka) / dark purple shimmer (Secrets)
- **Spinner**: circular, brand primary colour
- **Progress bar**: full-width, brand primary, at top of page for route transitions
- **Pulse**: for live/real-time data indicators

---

## 12. Illustration & Imagery Guidelines

### FoliXx Bukka
- Photography: high-quality food photography with warm tones, steam visible, natural lighting
- Colour grading: warm, slightly golden hour feel
- Background: never stark white; use warm off-white `--bukka-neutral-50`
- Illustrations: if used, bold Nigerian-inspired motifs, warm palette

### Secrets Palace
- Photography: moody, dimly lit venue shots, bokeh, luxury aesthetics
- Colour grading: deep blacks, gold highlights, purple/violet hues
- Videos preferred over statics for hero backgrounds (muted, looping)
- Never use bright or pastel colours in imagery

---

## 13. Data Visualisation Style

### Bukka (Analytics — light theme)
- Chart backgrounds: white cards
- Primary chart colour: `--bukka-primary-500`
- Secondary: `--bukka-secondary-500`
- Grid lines: `--bukka-neutral-200`
- Axis labels: `--bukka-text-muted`

### Secrets (Analytics — dark theme)
- Chart backgrounds: `--palace-surface-card`
- Primary chart colour: `--palace-primary-500` (gold)
- Secondary: `--palace-secondary-500` (violet)
- Grid lines: `--palace-border-default`
- Axis labels: `--palace-text-muted`

**Chart types used:**
- Revenue over time: Area chart with gradient fill
- Top items: Horizontal bar chart
- Booking funnel: Funnel / step chart
- Customer segments: Donut chart
- Heatmap (peak hours): Grid heatmap
- KPI Cards: Number + sparkline

---

## 14. Accessibility Requirements

- All interactive elements keyboard-navigable
- ARIA labels on icon-only buttons
- Colour contrast ratios:
  - Normal text: minimum 4.5:1
  - Large text / UI components: minimum 3:1
  - Secrets Palace gold on dark: `#D4A017` on `#0E0E1A` — verified contrast ≥ 4.5:1 ✓
- Focus states always visible (never `outline: none` without replacement)
- Screen reader text for decorative images: `alt=""`
- Form errors announced via `aria-live="polite"`

---

*Design System v1.0.0 — PALACE_OS | Maintained as single source of truth for Open Design compliance*
