// @ts-check
import { defineConfig, envField } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { ViteToml } from 'vite-plugin-toml';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Build a Set of noindex paths by reading pSEO JSON files at build time.
 * Any page with seo.noindex === true will be excluded from the sitemap.
 */
function getNoindexPaths() {
  const noindex = new Set();
  const pseoDirs = [
    { dir: 'src/data/pseo/resources', prefix: '/resources/' },
    { dir: 'src/data/pseo/tools', prefix: '/tools/' },
    { dir: 'src/data/pseo/glossary', prefix: '/glossary/' },
  ];
  for (const { dir, prefix } of pseoDirs) {
    const absDir = path.join(__dirname, dir);
    if (!fs.existsSync(absDir)) continue;
    for (const file of fs.readdirSync(absDir)) {
      if (!file.endsWith('.json')) continue;
      try {
        const data = JSON.parse(fs.readFileSync(path.join(absDir, file), 'utf8'));
        if (data?.seo?.noindex === true && data?.seo?.slug) {
          // Match both trailing-slash and non-trailing-slash variants
          const slug = data.seo.slug;
          noindex.add(`https://www.mediaplanningtool.com${prefix}${slug}`);
          noindex.add(`https://www.mediaplanningtool.com${prefix}${slug}/`);
        }
      } catch {
        // Ignore malformed JSON — won't be rendered anyway
      }
    }
  }
  return noindex;
}

const noindexPaths = getNoindexPaths();

// https://astro.build/config
export default defineConfig({
  site: "https://www.mediaplanningtool.com",
  // Canonical convention across the site is no-trailing-slash (see BaseLayout.astro
  // canonicalUrl). Force routing + sitemap output to match, otherwise Google sees
  // /page and /page/ as duplicates and refuses to index (e.g. /guide was stuck on
  // "URL is unknown to Google" in GSC for weeks).
  trailingSlash: 'never',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    vue(),
    mdx(),
    icon(),
    sitemap({
      filter: (page) => {
        // Exclude any URL whose underlying JSON data has seo.noindex === true
        return !noindexPaths.has(page) && !noindexPaths.has(page.replace(/\/$/, ''));
      }
    })
  ],
  vite: {
    plugins: [tailwindcss(), ViteToml()]
  },
  env: {
    schema: {
      POSTHOG_API_KEY: envField.string({ context: "client", access: "public", optional: true }),
      POSTHOG_API_HOST: envField.string({ context: "client", access: "public", optional: true }),
      NOTION_TOKEN: envField.string({ context: "server", access: "secret", optional: true })
    }
  }
});
