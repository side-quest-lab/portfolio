# Portfolio

A modern, immersive portfolio website built with **Nuxt 4**, **Vue 3**, and **Tailwind CSS v4**. Featuring a cosmic, space-inspired dark theme with smooth GSAP-powered animations.

![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

## Overview

A single-page portfolio template with smooth GSAP-powered animations, interactive drag-and-snap elements, a space-themed visual design, and responsive layouts. All personal content is centralized in a single data file for easy customization.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) with Vue 3
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (no `tailwind.config.js`, theme config via CSS `@theme`)
- **UI Components**: [@nuxt/ui v4](https://ui.nuxt.com/)
- **Animation**: [GSAP](https://gsap.com/) + Draggable + SplitText + ScrollTrigger
- **Utilities**: [VueUse](https://vueuse.org/), clsx, tailwind-merge
- **Linting**: [oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- **Formatting**: [oxfmt](https://github.com/oxc-project/oxc)
- **Package Manager**: pnpm

## Project Structure

```
portfolio/
├── app/
│   ├── assets/css/main.css      # Global styles & Tailwind v4 theme config
│   ├── components/
│   │   ├── Panel.vue            # Reusable section panel wrapper
│   │   ├── AboutSection.vue     # About section
│   │   ├── HeroSection.vue      # Hero with draggable elements
│   │   ├── ExperienceSection.vue # Work experience timeline
│   │   ├── AppHeader.vue        # Navigation header
│   │   ├── AppFooter.vue        # Footer
│   │   ├── LoadingScreen.vue    # Loading screen
│   │   ├── ScrollSmootherWrapper.vue
│   │   ├── projects/            # Project section & card components
│   │   ├── skills/              # Skills section & card components
│   │   └── ui/                  # Reusable primitives (SectionHeading, SectionDivider, MetricBadge, TechPill)
│   ├── composables/             # Vue composables (auto-imported)
│   ├── layouts/
│   │   └── default.vue          # Root layout
│   ├── pages/
│   │   └── index.vue            # Single-page home (all sections)
│   ├── utils/                   # Helper utilities (cn, string helpers)
│   └── app.vue                  # Root app wrapper
├── shared/
│   ├── data/portfolio.ts        # Single source of truth for portfolio content
│   └── types/index.ts           # TypeScript type definitions
├── public/                      # Static assets (images, videos, favicon)
├── nuxt.config.ts               # Nuxt configuration
├── oxlint.config.ts             # Linter configuration
├── oxfmt.config.ts              # Formatter configuration
└── package.json
```

## Features

- **Interactive Hero**: GSAP-powered draggable text with snap-back animation, typing effect with synthesized key sounds, and sequential reactive messages
- **About Section**: Personal bio, avatar, and contact CTA
- **Experience Timeline**: Professional work history with company names and employment types
- **Project Showcase**: Grid-based project cards with collapsible "show more" via `UCollapsible`, numbered cards
- **Skills Grid**: Categorized tech stack (Frontend, Backend, Database, Tools, Mobile) with icon cards using `Panel` layout
- **GSAP Animations**: Drag-and-drop, SplitText typing effects, scroll-triggered animations
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Always dark mode with custom cosmic color palette

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [pnpm](https://pnpm.io/) (required)

### Installation

```bash
git clone <repository-url>
cd portfolio
pnpm install
```

### Development

```bash
pnpm dev          # http://localhost:3000
```

### Build

```bash
pnpm build        # production build
pnpm generate     # static site generation
pnpm preview      # preview production build
```

### Code Quality

```bash
pnpm lint         # oxlint
pnpm lint:fix     # oxlint --fix
pnpm fmt          # oxfmt
pnpm fmt:check    # oxfmt --check
```

## Customization

All portfolio content is centralized in `shared/data/portfolio.ts`. Update this file to modify:

- Personal information (name, title, bio, contact)
- Tech stack skills
- Projects (descriptions, tech stack, links, images)
- Work experience
- Social media links

Types are defined in `shared/types/index.ts`.

## Theme

The site uses a **dark-only** cosmic theme. All theme configuration is in `app/assets/css/main.css` using Tailwind CSS v4's `@theme` directive.

- **Primary**: Purple (`#7c3aed`)
- **Accent**: Cyan (`#06b6d4`)
- **Secondary**: Indigo
- **Background**: Dark space tones

## Fonts

- **Sans**: Inter / Geist
- **Heading**: Space Grotesk
- **Mono**: JetBrains Mono / Geist Mono / DM Mono

Loaded via `@nuxt/fonts` (configured in CSS `@theme static`).

## License

[MIT License](LICENSE)
