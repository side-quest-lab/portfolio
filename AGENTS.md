# AGENTS.md

## Commands

```
pnpm dev          # dev server on :3000
pnpm build        # production build
pnpm generate     # static generation
pnpm preview      # preview production build
pnpm lint         # oxlint
pnpm lint:fix     # oxlint --fix
pnpm fmt          # oxfmt
pnpm fmt:check    # oxfmt --check
```

Package manager: **pnpm**. Do not use yarn or npm.

No test framework is configured. There is no test script.

Stack: **Nuxt 4 + Vue 3** with **Tailwind CSS v4**.

## Verification order

`pnpm lint` then `pnpm fmt:check` before considering changes done.

## Architecture

- **Content**: All portfolio data lives in `shared/data/portfolio.ts` (single source of truth). Types in `shared/types/index.ts`.
- **Path alias**: `~/` maps to `./app/*` (Nuxt convention). `~~/` maps to project root.
- **File-based routing** (`app/pages/`):
  - `/` — home page (`app/pages/index.vue`).
  - `/projects` — project listing page (`app/pages/projects.vue`).
  - `/projects/[id]` — dynamic project detail page (`app/pages/projects/[id].vue`).
- **Components**: Auto-imported from `app/components/`. Organized by domain:
  - `app/components/ui/` — reusable primitives (animated, display, feedback, video).
  - `app/components/features/` — domain sections (hero, about, projects, project-detail, experience, contact).
  - `app/components/layout/` — `SpaceHeader`, `SpaceFooter`.
  - `app/components/sections/` — page section components.
- **Composables**: `app/composables/` — Vue composables, auto-imported by Nuxt.
- **Utilities**: `app/utils/` — helper functions. `cn()` from `app/utils/cn.ts` (clsx + tailwind-merge).
- **Layouts**: `app/layouts/default.vue` — root layout. `app/app.vue` — root app wrapper.

## Theme

The site is always dark mode — `nuxt.config.ts` sets `htmlAttrs: { class: "dark" }`. Tailwind CSS **v4** (not v3). No `tailwind.config.js` — all theme config is in `app/assets/css/main.css` via `@theme`.

Key colors: `primary` (purple `#7c3aed`), `accent` (cyan `#06b6d4`), `secondary` (indigo), `star-white`, `surface`, `border-space`, glow variants.

Fonts: Inter (sans), Space Grotesk (heading), JetBrains Mono (mono) — loaded via `@nuxt/fonts` (configured in CSS `@theme static`).

Custom animations: `float`, `pulse-slow`, `shimmer`, `fade-in`, `slide-up`, `nebula-drift`.

## Adding content or sections

1. Update `shared/data/portfolio.ts` for any portfolio content changes.
2. New feature sections: create dir in `app/components/features/<name>/`, add `.vue` components (auto-imported), use in pages.

## Gotchas

- **Vue reactivity**: Use `ref()` / `computed()` instead of React `useState()`. Access values with `.value` in script.
- **Template refs**: `ref="el"` in template, `el.value` in script (not `.current`).
- **Lifecycle**: `onMounted()` / `onUnmounted()` instead of `useEffect()`.
- **Event handling**: `@click` instead of `onClick`.
- **Lists**: `v-for="item in items" :key="item.id"` instead of `.map()`.
- **Conditional rendering**: `v-if` / `v-show` instead of `{condition && <Component />}`.
- **Slots**: Use `<slot />` instead of `children` prop.
- **Props**: Define with `defineProps<Props>()` and `withDefaults()`.
- **GSAP**: Register plugins in `onMounted()` or `app.vue`. Use template refs for DOM access.
- Video assets in `public/videos/` (`blackhole_center.webm`, `blackhole_top.webm`, `text-effect.webm`) are referenced by `VideoBackground` and the hero section.
- The projects listing page (`/projects`) uses a green accent theme that differs from the cosmic/space theme on the home page.
- **Linting**: oxlint with `oxlint.config.ts`. **Formatting**: oxfmt with `oxfmt.config.ts`.
