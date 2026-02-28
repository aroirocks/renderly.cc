# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

There are no tests in this project.

## Code Style

- **Prettier** with single quotes, no semicolons, and `prettier-plugin-tailwindcss` for class sorting
- **Path alias**: `@/*` maps to `src/*`
- **Tailwind v4**: configured via `@theme` in [src/styles/tailwind.css](src/styles/tailwind.css) — no `tailwind.config.js`

## Architecture

This is a **Next.js App Router** marketing site template (Tailwind Plus "Salient").

### Directory structure

- [src/app/](src/app/) — App Router pages using layout/page conventions
  - `layout.jsx` — Root layout; loads Inter (sans) and Lexend (display) via `next/font/google`
  - `page.jsx` — Home page; composes all marketing sections in order
  - `(auth)/login/` and `(auth)/register/` — Auth pages using `SlimLayout`
- [src/components/](src/components/) — All UI components (no subdirectories)
- [src/images/](src/images/) — Static images imported directly into components
- [src/styles/tailwind.css](src/styles/tailwind.css) — Single CSS entry point; defines custom theme tokens

### Key patterns

- **Button** ([src/components/Button.jsx](src/components/Button.jsx)): Polymorphic component accepting `variant` (`solid`/`outline`) and `color` (`slate`/`blue`/`white`) props; renders as `<a>` or `<button>` based on `href`
- **Container** ([src/components/Container.jsx](src/components/Container.jsx)): Standard max-width wrapper used across all sections
- **Header** ([src/components/Header.jsx](src/components/Header.jsx)): Client component using Headless UI `Popover` for mobile nav
- **Fields** ([src/components/Fields.jsx](src/components/Fields.jsx)): Form input components (`TextField`) used in auth pages
- **SlimLayout** ([src/components/SlimLayout.jsx](src/components/SlimLayout.jsx)): Centered layout for login/register pages

### Tailwind v4 theme

Custom tokens are defined in [src/styles/tailwind.css](src/styles/tailwind.css) using `@theme`:
- Font families: `--font-sans` (Inter) and `--font-display` (Lexend)
- Custom type scale with explicit line heights (replaces Tailwind defaults via `--text-*: initial`)
- `--radius-4xl: 2rem`
- `--container-2xl: 40rem`

### Dependencies

- `@headlessui/react` v2 — accessible interactive components (mobile nav, tabs)
- `@tailwindcss/forms` — loaded as a `@plugin` in the CSS file
- `clsx` — className composition
