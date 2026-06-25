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
blog/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro          # Lists posts tagged "blog"
│   │   │   └── [slug].astro         # Individual blog/release posts
│   │   ├── projects/
│   │   │   ├── index.astro          # Lists posts tagged "projectLanding"
│   │   │   └── [slug].astro         # Project landing page + its releases
│   │   └── releases/
│   │       └── index.astro          # Lists all posts tagged "release"
│   │
│   ├── content/
│   │   ├── blog/                    # All content as Markdown/MDX files
│   │   │   ├── unemployment-retro.md
│   │   │   ├── linkedin-extension-v1-release.md
│   │   │   └── ...
│   │   └── config.ts                # Content collection schema
│   │
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   └── PostCard.astro           # Card for blog, project, and release listings
│   │
│   ├── layouts/
│   │   ├── Base.astro               # HTML shell: head, nav, footer
│   │   ├── BlogPost.astro           # Wraps individual posts
│   │   └── ProjectPage.astro        # Wraps project landing pages
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── types/
│       └── post.ts                  # Discriminated union types for PostCard props
│
├── public/                          # Static assets: favicon, OG images
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Key Concepts

### Content Collections (`src/content/blog/`)

All content lives in one collection as `.md` or `.mdx` files. The `tags` field determines where each post appears in the site. Schema is defined in `config.ts` so frontmatter is type-safe.

### Tag Taxonomy

Tags drive routing and listing. Every post should have at least one of the following primary tags:

| Tag | Where it appears | Route |
|---|---|---|
| `blog` | Blog listing | `/blog` |
| `projectLanding` | Projects listing | `/projects` |
| `release` | Releases listing + project landing page | `/releases` |

Each project also gets its own **project tag** (e.g. `linkedinExtension`, `sniffies`). Apply it to both the project's landing page and all its release posts — this is how the project page knows which releases to list.

Example frontmatter for each type:

**Blog post**
```md
---
title: "Nine Months: A Job Search Retrospective"
date: 2026-06-17
tags: [blog]
description: "From layoff to Apple offer — what the gap year actually looked like."
draft: false
---
```

**Project landing page**
```md
---
title: "LinkedIn Extension"
date: 2026-06-01
tags: [projectLanding, linkedinExtension]
description: "A browser extension that restores LinkedIn profile hover cards."
draft: false
---
```

**Release post**
```md
---
title: "LinkedIn Extension v1"
date: 2026-06-24
tags: [release, linkedinExtension]
description: "What shipped in v1 and what's next."
draft: false
repo: https://github.com/you/linkedin-extension
---
```

The `repo` field is optional and only meaningful on release posts. When present, PostCard renders a "View repo" link.

### Project Landing Pages

Project landing pages are Markdown posts tagged `projectLanding` (not static `.astro` files). They're served at `/projects/[slug]` and automatically list all release posts that share the project's tag. No manual wiring needed — just tag them consistently.

### Release Announcements

Release posts are tagged `release` plus the project tag. They appear on `/releases` (all releases) and on the relevant project landing page.

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