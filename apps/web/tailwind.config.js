/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-bg)',
          bg: 'var(--color-bg)',
          card: 'var(--color-card)',
          elevated: 'var(--color-elevated)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          text: 'var(--color-text)',
          brand: 'var(--color-text-brand)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
          primary: 'var(--color-primary)',
          sm: 'var(--color-text-muted)',
          lg: 'var(--color-text-muted)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          border: 'var(--color-border)',
          input: 'var(--color-border)',
          primary: 'var(--color-primary)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-text-inverse)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-text-inverse)',
        },
        destructive: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-text-inverse)',
        },
        accent: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-text)',
        },
        muted: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-text-muted)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
        },
        input: {
          DEFAULT: 'var(--color-border)',
        },
        ring: {
          DEFAULT: 'var(--color-primary)',
        },
        background: {
          DEFAULT: 'var(--color-bg)',
        },
        foreground: {
          DEFAULT: 'var(--color-text)',
        },
      },
      borderRadius: {
        flex: '9999px',
      },
    },
  },
  plugins: [],
};
