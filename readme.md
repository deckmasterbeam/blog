# Personal Blog & Project Site

A personal site built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com). Covers blog posts, project landing pages, and release announcements.

---

## Goals

- Publish long-form blog posts (e.g. the unemployment retrospective)
- Host dedicated landing pages for projects (e.g. Sniffies)
- Announce project releases and updates
- Archive cool work features I worked on
- Keep things fast, clean, and easy to maintain

---

## Tech Stack

| Layer         | Choice                                |
| ------------- | ------------------------------------- |
| Framework     | Astro                                 |
| Interactivity | React (islands, opt-in per component) |
| Content       | Markdown / MDX                        |
| Deployment    | Vercel                                |
| Language      | TypeScript                            |

**Note on React:** Astro pages and layouts are written in `.astro` files (JSX-like with frontmatter). React is used selectively for interactive components — demo widgets, toggles, etc. Most content pages won't need it.

---

## Project Structure

```
blog/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── 404.astro
│   │   ├── blog/
│   │   │   ├── index.astro          # Lists blog posts
│   │   │   └── [slug].astro         # Individual blog post
│   │   ├── projects/
│   │   │   ├── index.astro          # Lists projects
│   │   │   ├── [slug].astro         # Project landing page + its releases
│   │   │   └── sniffies-project/
│   │   │       └── install/         # Per-platform install guides (index, chrome-desktop,
│   │   │                            #   tampermonkey-*, bookmarklet-*, userscript-ios, v/[version]/[platform])
│   │   ├── releases/
│   │   │   ├── index.astro          # Lists all releases
│   │   │   └── [slug].astro         # Individual release post
│   │   ├── career/
│   │   │   ├── index.astro          # Lists career/work-feature entries
│   │   │   └── [slug].astro         # Individual career entry
│   │   ├── report/
│   │   │   └── [type].astro         # Report form pages
│   │   └── api/
│   │       └── reports.ts           # Report submission endpoint
│   │
│   ├── content.config.ts            # Collection schemas (blog, projects, releases, career)
│   ├── content/
│   │   ├── blog/                    # Blog posts (Markdown/MDX)
│   │   ├── projects/                # Project landing pages
│   │   ├── releases/                # Release announcements
│   │   ├── career/                  # Career / work-feature entries
│   │   ├── media/                   # Images referenced from content
│   │   ├── contentWarnings.ts       # Content warning definitions (keys used in frontmatter)
│   │   └── reportTypes.ts
│   │
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro           # Card for blog, project, and release listings
│   │   ├── ContentWarningGate.astro
│   │   ├── Embed.astro
│   │   ├── GithubSnippet.astro
│   │   ├── ReportForm.astro
│   │   ├── ThemeToggle.astro
│   │   └── ui/                      # Smaller UI pieces: Carousel, LinkButton, BuyMeACoffee,
│   │                                #   and the Sniffies install helpers (picker, FAQ, bookmarklet code, etc.)
│   │
│   ├── layouts/
│   │   ├── Base.astro               # HTML shell: head, nav, footer
│   │   ├── BlogPost.astro           # Wraps individual posts
│   │   ├── ProjectPage.astro        # Wraps project landing pages
│   │   ├── CareerPage.astro         # Wraps career entries
│   │   └── InstallPage.astro        # Wraps Sniffies install guides
│   │
│   ├── lib/                         # Helpers: embeds, feature flags, Sniffies release/bookmarklet logic
│   ├── scripts/                     # Client scripts: theme init/toggle, content warning ack check
│   ├── styles/
│   │   ├── global.css
│   │   └── install-button.css
│   │
│   └── types/
│       └── post.ts                  # Discriminated union types for PostCard props
│
├── db/
│   └── schema.sql                   # Database schema (reports)
├── public/                          # Static assets: favicon, install screenshots
├── .env.example
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Key Concepts

### Content Collections (`src/content/`)

Content lives in four collections, each a folder of `.md` / `.mdx` files. Schemas are defined in [`src/content.config.ts`](src/content.config.ts), so frontmatter is type-checked. The collection a file lives in decides where it appears:

| Collection  | Folder                 | Listing     | Detail page          |
| ----------- | ---------------------- | ----------- | -------------------- |
| `blog`      | `src/content/blog/`     | `/blog`     | `/blog/[slug]`       |
| `projects`  | `src/content/projects/` | `/projects` | `/projects/[slug]`   |
| `releases`  | `src/content/releases/` | `/releases` | `/releases/[slug]`   |
| `career`    | `src/content/career/`   | `/career`   | `/career/[slug]`     |

### `tags` vs `project`

- **`project`** (projects and releases): a required string that links a project to its releases. Use the same value on the project's landing page and on every one of its release posts. Existing values: `linkedInExtension`, `SniffiesProject`, `zipClone`. Match case exactly, since a typo silently drops the release from the project page.
- **`tags`** (blog only): an optional array of labels shown on the post. It doesn't affect routing. The collection alone decides that a file is a blog post, so no `blog` tag is needed.

### Frontmatter Reference

Common to all collections: `title`, `date`, `description` (all required), `draft` (default `false`), and `contentWarning` (optional).

| Field            | Collections           | Notes                                                                                          |
| ---------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| `tags`           | blog                  | Optional array of display labels. Doesn't affect routing.                                      |
| `project`        | projects, releases    | Required. Links releases to their project.                                                     |
| `repo`           | blog, projects, releases | Optional URL. PostCard renders a "View repo" link when present.                             |
| `site`           | projects              | Optional URL.                                                                                  |
| `version`        | releases              | Optional.                                                                                      |
| `private`        | releases              | `true` pulls it from the public site: no page, and it's left out of the list and project page. |
| `company`        | career                | Optional.                                                                                      |
| `embedUrl`       | career                | Optional URL to embed (LinkedIn post, YouTube video, tweet).                                   |
| `contentWarning` | all                   | Optional. Must be a key in `src/content/contentWarnings.ts` (currently `sniffies`).            |

Example frontmatter for each type:

**Blog post** (`src/content/blog/`)

```md
---
title: "Nine Months: A Job Search Retrospective"
date: 2026-06-17
description: "From layoff to Apple offer — what the gap year actually looked like."
draft: false
---
```

**Project landing page** (`src/content/projects/`)

```md
---
title: "LinkedIn Extension"
date: 2026-04-18
description: "A browser extension that restores LinkedIn profile hover cards."
draft: false
repo: https://github.com/you/linkedin-extension
project: linkedInExtension
---
```

**Release post** (`src/content/releases/`)

```md
---
title: "LinkedIn Extension v1"
date: 2026-06-24
description: "What shipped in v1 and what's next."
draft: false
repo: https://github.com/you/linkedin-extension
project: linkedInExtension
---
```

### Project Landing Pages

Project landing pages are Markdown files in the `projects` collection (not static `.astro` files). They're served at `/projects/[slug]` and automatically list every release whose `project` matches. No manual wiring needed — just use the same `project` value consistently.

### Release Announcements

Release posts live in the `releases` collection and carry the project's `project` value. They appear on `/releases` (all releases) and on the matching project landing page.

### React Islands

Add React components only where interactivity is actually needed. Astro loads them with a `client:*` directive:

```astro
---
import DemoWidget from "../components/ui/DemoWidget.tsx";
---

<DemoWidget client:visible />
```

