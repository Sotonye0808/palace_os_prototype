# Lessons Learned

> **Overview:** Practical knowledge accumulated during development — things that worked well, things that didn't, and patterns worth repeating. Different from repair-system.md (which tracks errors); this file tracks development process insights and architectural wisdom.

---

## Entry Format

```
## [Lesson Title]

**Context:**
[What situation this came from]

**What We Learned:**
[The insight or pattern discovered]

**Apply When:**
[When future agents/developers should use this knowledge]
```

---

## Lessons

## Next.js 16 requires 'use client' on all files using hooks

**Context:**
Build errors: "You're importing a module that depends on `useState` into a React Server Component."

**What We Learned:**
Next.js 16 (App Router) treats all components as Server Components by default. Any file using React hooks (`useState`, `useEffect`, `useRouter`, `useParams`, `usePathname`, `useContext`) must have `'use client'` as the first line. This applies to custom hooks files, context providers, and page components.

**Apply When:**
Creating or editing any React file that uses hooks, context, browser APIs, or event handlers.

---

## Webpack does not resolve tsconfig path aliases for workspace packages

**Context:**
Imports like `@packages/config/defaults` worked in IDE (tsc) but failed at build time with webpack.

**What We Learned:**
Next.js webpack configuration does not automatically resolve TypeScript path aliases that point outside the app's own directory. Workspace packages (`packages/`) must use relative imports like `../../../../packages/config/src/defaults`.

**Apply When:**
Importing from workspace packages in apps/web/ — always use relative paths relative to the importing file's location.

---

## Source file corruption from literal \n sequences

**Context:**
Multiple files had literal backslash-n (`\n`) characters embedded in JSX text, causing parser failures.

**What We Learned:**
When AI tools or scripts rewrite large files, they can introduce literal `\n` strings where real newlines are intended. After any automated batch edit, verify the file parses by running `next build` or `npx tsc --noEmit`. A quick `rg '\\\\n'` search across source files can detect this corruption.

**Apply When:**
After automated file edits or rewrites, check for literal `\n` corruption before committing.

---

## Multiple edit passes on the same file can cause structural corruption

**Context:**
The palace/reserve/page.tsx file accumulated stray closing tags, wrong return statement nesting, and leftover fragments after 3-4 edit cycles.

**What We Learned:**
Each edit pass on a file with structural issues can introduce new problems. For files with pervasive corruption, it's faster to re-read the file fully and fix all issues in one pass, or rewrite from scratch, rather than applying incremental patches.

**Apply When:**
A file has multiple structural issues across different lines — consider a rewrite rather than sequential edits.
