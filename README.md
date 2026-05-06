# Chhunhak Chhoeung — Portfolio

A modern, immersive portfolio website built with **Nuxt 4**, **Vue 3**, and **Tailwind CSS v4**. Showcasing mobile application development expertise with a cosmic, space-inspired dark theme.

![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

## Overview

This is the personal portfolio of **Chhunhak Chhoeung**, a Mobile Application Developer specializing in React Native, Flutter, and modern web technologies. The site features smooth GSAP-powered animations, a space-themed visual design, and responsive layouts.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) with Vue 3
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (no `tailwind.config.js`, theme config via CSS `@theme`)
- **UI Components**: [@nuxt/ui v4](https://ui.nuxt.com/)
- **Animation**: [GSAP](https://gsap.com/) + ScrollTrigger + ScrollSmoother
- **Utilities**: [VueUse](https://vueuse.org/), clsx, tailwind-merge
- **Linting**: [oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- **Formatting**: [oxfmt](https://github.com/oxc-project/oxc)
- **Package Manager**: pnpm

## Project Structure

```
portfolio/
├── app/
│   ├── assets/css/main.css      # Global styles & Tailwind v4 theme config
│   ├── components/              # Vue components (auto-imported)
│   ├── composables/             # Vue composables (auto-imported)
│   ├── layouts/
│   │   └── default.vue          # Root layout
│   ├── pages/
│   │   ├── index.vue            # Home page
│   │   ├── projects.vue         # Project listing
│   │   └── projects/[id].vue    # Project detail
│   ├── utils/                   # Helper utilities
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

- **Immersive Hero**: Video background with space/cosmic aesthetics
- **Tech Marquee**: Animated scrolling technology stack
- **About Section**: Personal bio and introduction
- **Orbital Skills**: Interactive skill visualization
- **Project Showcase**: Featured and categorized projects with links
- **Experience Timeline**: Professional work history
- **Contact Section**: Social links and contact information
- **GSAP Scroll Animations**: Smooth scrolling and scroll-triggered animations
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Always dark mode with custom color palette

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
- **Mono**: JetBrains Mono / Geist Mono

Loaded via `@nuxt/fonts` (configured in CSS `@theme static`).

## License

Private — All rights reserved.

---

Built with passion by **Chhunhak Chhoeung**
