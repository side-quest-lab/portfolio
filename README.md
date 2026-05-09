# Portfolio

A modern, immersive portfolio website built with **Nuxt 4**, **Vue 3**, and **Tailwind CSS v4**. Featuring a cosmic, space-inspired dark theme with smooth GSAP-powered animations.

![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

## Overview

A portfolio template with smooth GSAP-powered animations, interactive drag-and-snap elements, a space-themed visual design, and responsive layouts. All personal content is centralized in a single data file for easy customization.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) with Vue 3
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (no `tailwind.config.js`, theme config via CSS `@theme`)
- **UI Components**: [@nuxt/ui v4](https://ui.nuxt.com/)
- **Animation**: [GSAP](https://gsap.com/) + Draggable + SplitText
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
│   │   ├── features/            # Domain sections (hero, about, skills, projects, experience)
│   │   ├── layout/              # AppHeader, AppFooter
│   │   └── ui/                  # Reusable primitives (SectionHeading, MetricBadge, TechPill, DragSnapText)
│   ├── composables/             # Vue composables (auto-imported)
│   ├── layouts/
│   │   └── default.vue          # Root layout
│   ├── pages/
│   │   ├── index.vue            # Home page
│   │   ├── projects.vue         # Project listing
│   │   └── projects/[id].vue    # Project detail
│   ├── utils/                   # Helper utilities (cn, clsx + tailwind-merge)
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

- **Interactive Hero**: Video background with space/cosmic aesthetics, draggable canvas elements, and entrance animations
- **DragSnapText**: GSAP-powered draggable text with snap-back animation, typing effect with synthesized key sounds, and sequential reactive messages
- **About Section**: Personal bio, avatar, and resume download
- **Skills Grid**: Categorized skills with proficiency levels and experience indicators
- **Project Showcase**: Featured and categorized projects with cards, links, and detail pages
- **Experience Timeline**: Professional work history with company logos and tech stacks
- **Contact & Footer**: Social links and contact information
- **GSAP Animations**: Drag-and-drop, SplitText typing effects, scroll-triggered animations
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Always dark mode with custom cosmic color palette

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [pnpm](https://pnpm.io/) (required)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server on http://localhost:3000
pnpm dev
```

### Build

```bash
# Production build
pnpm build

# Static site generation
pnpm generate

# Preview production build locally
pnpm preview
```

### Code Quality

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm fmt

# Check formatting
pnpm fmt:check
```

## Customization

All portfolio content is centralized in `shared/data/portfolio.ts`. Update this file to modify:

- Personal information (name, title, bio, contact)
- Skills and proficiency levels
- Projects (descriptions, tech stack, links, images)
- Work experience
- Social media links

Types are defined in `shared/types/index.ts`.

## Theme

The site uses a **dark-only** cosmic theme with the following key colors:

- **Primary**: Purple (`#7c3aed`)
- **Accent**: Cyan (`#06b6d4`)
- **Secondary**: Indigo
- **Background**: Dark space tones

Theme configuration is located in `app/assets/css/main.css` using Tailwind CSS v4's `@theme` directive.

## Fonts

- **Sans**: Inter / Geist
- **Heading**: Space Grotesk
- **Mono**: JetBrains Mono / Geist Mono / DM Mono

Loaded via `@nuxt/fonts` (configured in CSS `@theme static`).

## License

[MIT License](LICENSE)
