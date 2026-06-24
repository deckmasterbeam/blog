# Personal Blog & Project Site

A personal site built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com). Covers blog posts, project landing pages, and release announcements.

---

## Goals

- Publish long-form blog posts (e.g. the unemployment retrospective)
- Host dedicated landing pages for projects (e.g. Sniffies)
- Announce project releases and updates
- Keep things fast, clean, and easy to maintain

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro |
| Interactivity | React (islands, opt-in per component) |
| Content | Markdown / MDX |
| Deployment | Vercel |
| Language | TypeScript |

**Note on React:** Astro pages and layouts are written in `.astro` files (JSX-like with frontmatter). React is used selectively for interactive components — demo widgets, toggles, etc. Most content pages won't need it.

---

## Project Structure

```
my-site/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Homepage / about
│   │   ├── blog/
│   │   │   ├── index.astro          # Blog listing page
│   │   │   └── [slug].astro         # Dynamic route → individual posts
│   │   └── projects/
│   │       ├── sniffies/
│   │       │   └── index.astro      # Sniffies landing page
│   │       └── [future-project]/    # Add a folder per new project
│   │
│   ├── content/
│   │   ├── blog/                    # Blog posts as Markdown/MDX files
│   │   │   ├── unemployment-retro.md
│   │   │   └── sniffies-v1-release.md
│   │   └── config.ts                # Content collection schema
│   │
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro           # Card used on the blog listing page
│   │   └── ui/                      # React island components
│   │       └── DemoWidget.tsx       # e.g. interactive project demos
│   │
│   └── layouts/
│       ├── Base.astro               # HTML shell: head, nav, footer
│       ├── BlogPost.astro           # Wraps individual posts (date, reading time, etc.)
│       └── ProjectPage.astro        # Wraps project landing pages (hero, CTA, etc.)
│
├── public/                          # Static assets: images, favicon, OG images
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Key Concepts

### Content Collections (`src/content/blog/`)

Astro's built-in system for managing Markdown content. Each post is a `.md` or `.mdx` file with frontmatter:

```md
---
title: "Nine Months: A Job Search Retrospective"
date: 2026-06-17
tags: [personal, career]
description: "From layoff to Apple offer — what the gap year actually looked like."
draft: false
---

Post content goes here...
```

`config.ts` defines the schema so frontmatter fields are type-safe. The `[slug].astro` dynamic route reads from the collection and renders each post using the `BlogPost` layout.

### Project Landing Pages (`src/pages/projects/`)

These live in `pages/` rather than `content/` because they're fully custom-designed pages, not Markdown documents. Each project gets its own folder with an `index.astro`. Use the `ProjectPage` layout for consistent chrome (hero section, nav, footer) while keeping full layout control per project.

### Release Announcements

Just blog posts — no special structure needed. Use a `tags: [release]` frontmatter field. The blog listing page can filter by tag to surface a releases-only view if useful later.

### React Islands

Add React components only where interactivity is actually needed. Astro loads them with a `client:*` directive:

```astro
---
import DemoWidget from '../components/ui/DemoWidget.tsx';
---

<DemoWidget client:visible />
```

`client:visible` means the component hydrates when it scrolls into view — good for demos lower on a page.

---

## Content To Publish

- [ ] Unemployment retrospective (nine-section narrative, ~Oct 2025 – Jun 2026)
- [ ] Sniffies project landing page
- [ ] Sniffies v1 release announcement

---

## Getting Started (when ready to build)

```bash
npm create astro@latest
# Choose: Empty project, TypeScript, yes to install deps

# Add React integration
npx astro add react

# Dev server
npm run dev

# Build
npm run build
```

Vercel deployment: connect the GitHub repo in the Vercel dashboard. Push to `main` → auto-deploy. No config needed for a static Astro site.

---

## References

- [Astro Docs](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro + React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Vercel + Astro](https://vercel.com/docs/frameworks/astro)