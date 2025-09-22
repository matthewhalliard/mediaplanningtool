# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Media Planning Tools directory website built with Astro, Vue, and Tailwind CSS. It's a markdown-driven directory template optimized for SEO with customizable themes.

## Key Commands

### Development
```bash
pnpm dev       # Start development server
pnpm start     # Alternative to start dev server
```

### Building and Production
```bash
pnpm build     # Run type checking with astro check, then build for production
pnpm preview   # Preview the production build
```

## Architecture

### Content Management System
The directory supports multiple data sources for listings:
- **Markdown files**: Located in `src/data/directory/` with frontmatter for metadata
- **JSON**: Single file at `src/data/directory/directory.json`
- **CSV**: Single file at `src/data/directory/directory.csv`
- **Google Sheets**: Configured via `settings.toml` with public sheet ID
- **Notion & Airtable**: Via configured loaders

### Core Configuration
- **Main settings**: `src/config/settings.toml` - Controls theme, SEO, tags, UI components, and directory behavior
- **Site configuration**: `astro.config.mjs` - Astro setup with Vercel adapter, Vue integration, and environment variables

### Directory Structure
```
src/
├── components/     # Vue and Astro components
├── config/         # Configuration files (settings.toml)
├── data/
│   ├── directory/  # Directory listings (markdown/json/csv)
│   ├── blog/       # Blog posts
│   └── pages/      # Static pages
├── layouts/        # Page layouts
├── pages/          # Astro pages and routing
├── styles/         # Global CSS and theming
└── validation/     # Data validation schemas
```

### Theming System
Themes are defined in `src/styles/global.css` with CSS variables:
- Color variables: `--color-primary-x00`, `--color-gray-x00`
- Font variable: `--font-sans`
- Available themes: spearmint, peppermint, hemingway, brookmint

### Tag System
Tags are configured in `settings.toml` and used for categorizing listings:
- Functional tags (media-planning, budget-planning, multi-channel)
- User type tags (CMOs, media-planners, agencies)
- Each tag has: key, name, color, emoji, description

### Deployment
- Deployed on Vercel as a server-rendered application
- Uses Vercel adapter with web analytics enabled
- Environment variables for PostHog analytics and Notion integration