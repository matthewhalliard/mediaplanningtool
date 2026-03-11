# pSEO 2.0 Coding Context for mediaplanningtool.com

## Repo: matthewhalliard/mediaplanningtool
- Astro 5.5 + Vue 3 + Tailwind CSS 4 + Zod (already in deps)
- Output mode: `server` with Vercel adapter
- Existing content collections: `directory` (markdown), `pages` (mdx), `blog` (markdown)
- Directory data source: "default" = glob loader reading `src/data/directory/*.md`
- Existing routing: `[...slug].astro` handles all directory + pages, `blog/[slug].astro` handles blog
- Theming: TOML-based config in `src/config/settings.toml`, theme "spearmint"
- Path aliases: `@*` → `./src/*`
- Has sitemap integration already
- Uses `prerender = true` on the catch-all page

## What Needs to Be Built

### 1. Zod Schemas (save to `src/lib/pseo/schemas.ts`)

Three content type schemas matching the architecture doc:

**ResourcePage** schema:
```typescript
interface ResourcePage {
  meta: {
    content_type: "checklist" | "template" | "guide" | "tips" | "framework" | "calendar" | "glossary" | "budget_allocator" | "best_practices";
    vertical: string;
    channel?: string;
    role?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };
  content: {
    intro: string;
    sections: {
      heading: string;
      items: {
        title: string;
        description: string;
        difficulty?: "beginner" | "intermediate" | "advanced";
        priority?: "critical" | "important" | "nice-to-have";
        channel_relevance?: string[];
      }[];
    }[];
    pro_tips: string[];
    related_tools: {
      slug: string;
      relevance: string;
    }[];
    cta: {
      text: string;
      link: string;
    };
  };
}
```

**FreeTool** schema (for calculators, estimators, etc.)
**GlossaryPage** schema (for term definitions)

See the full architecture doc schema definitions at /home/user/workspace/pseo-architecture.docx (it's been parsed - key schemas are described above).

### 2. Content Collections (update `src/content.config.ts`)

Add three new Astro content collections:
- `pseoResources` — loads JSON files from `src/data/pseo/resources/`
- `pseoTools` — loads JSON files from `src/data/pseo/tools/`
- `pseoGlossary` — loads JSON files from `src/data/pseo/glossary/`

Use Astro's `file()` or `glob()` loader for JSON. The schemas should use the Zod definitions.

### 3. Astro Page Routes

Create dynamic route pages:
- `src/pages/resources/[...slug].astro` — renders resource pages
- `src/pages/tools/[...slug].astro` — renders free tool pages
- `src/pages/glossary/[...slug].astro` — renders glossary pages

Each must:
- Export `prerender = true`
- Use `getStaticPaths()` to read from the appropriate collection
- Pass data to the renderer component
- Include JSON-LD structured data (HowTo for checklists/templates, FAQPage for all, WebApplication for tools, DefinedTerm for glossary)

### 4. Renderer Components

Build purpose-built components in `src/components/pseo/`:

**ResourcePage.astro** — Main wrapper for all resource types. Renders:
- SEO title + breadcrumbs
- Intro paragraph
- Content sections with items
- Pro tips sidebar/callout
- Related tools section (links to existing directory pages)
- Halliard CTA block

**ChecklistRenderer.vue** — Interactive checklist with:
- Checkboxes that persist state (localStorage)
- Progress bar showing completion %
- Print-friendly view toggle

**CalculatorTool.vue** — Interactive calculator with:
- Dynamic inputs based on tool_config
- Vertical preset selector (loads defaults)
- Live calculation output
- Result sharing (copy to clipboard)

**GlossaryPage.astro** — Term definition page with:
- Definition + extended explanation
- Concrete example
- Why it matters section
- Related terms (cross-links)
- FAQ section
- Vertical-specific context

**SharedCTA.astro** — Contextual Halliard CTA that adapts text based on content type:
- Planning content → "Plan faster with Halliard"
- Measurement content → "Measure what matters with Halliard"
- General → "Try Halliard free — the OS for modern media teams"

### 5. Design Requirements

- MUST be consistent with existing site design (Tailwind, spearmint theme)
- Use the existing color variables and typography from global.css
- Cards/sections should use the same rounded-xl, border-gray-200 pattern as the Listing layout
- Mobile-first responsive
- Dark mode support (site already has dark mode)
- Breadcrumbs: Home > Resources > {Content Type} > Page Title (or similar)

### 6. Internal Linking Infrastructure

- Every resource page should link to relevant directory tool pages (via related_tools slugs)
- Every page should have a "Related Resources" section at the bottom
- Cross-link to glossary terms when they appear in content
- All pages link back to the homepage

### 7. Sample Data

Create 3-5 sample JSON data files so the pages can be tested:
- `src/data/pseo/resources/checklist-ctv-automotive.json` — a CTV checklist for automotive
- `src/data/pseo/resources/template-media-brief-healthcare.json` — a media brief template
- `src/data/pseo/resources/guide-programmatic-display-retail.json` — a guide page
- `src/data/pseo/tools/cpm-calculator.json` — a CPM calculator tool
- `src/data/pseo/glossary/cost-per-mille.json` — a glossary term

Use realistic content that demonstrates the schemas working. The taxonomy JSON files are at /home/user/workspace/pseo/taxonomy/ — read the relevant vertical/channel context and use it to make the sample content genuinely specific and useful.

## Key Files to Reference

- `src/content.config.ts` — existing collection definitions
- `src/lib/loaders/index.ts` — how directory collection is created
- `src/validation/directory.ts` — existing Zod schema pattern
- `src/layouts/Listing.astro` — existing page layout pattern
- `src/layouts/BaseLayout.astro` — base HTML wrapper
- `src/components/app/AppShell.astro` — existing app wrapper
- `src/components/app/Prose.astro` — existing prose wrapper
- `src/styles/global.css` — theme variables
- `src/config/settings.toml` — site configuration

## IMPORTANT CONSTRAINTS

1. Do NOT modify existing pages or components. Only ADD new files.
2. The astro.config.mjs should NOT need changes (Astro auto-discovers pages).
3. content.config.ts WILL need changes to add the new collections.
4. All new components go in `src/components/pseo/` (new directory).
5. All new page routes go in `src/pages/resources/`, `src/pages/tools/`, `src/pages/glossary/`.
6. All pSEO data goes in `src/data/pseo/` (new directory).
7. The site uses SSR mode with `prerender = true` on static pages. New pSEO pages should also prerender.
8. Make sure the build won't break the existing directory/blog pages.
