import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';
import { createDirectoryCollection } from "@lib/loaders";
import { resourcePageSchema, freeToolSchema, glossaryPageSchema } from "@lib/pseo/schemas";

const directory = createDirectoryCollection();

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/pages" }),
  schema: ({ image }) => z.object({
    image: image().optional(),
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/blog" }),
  schema: ({image}) => z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: image().optional(),
    pubDate: z.coerce.date().optional(),
    author: z.string().optional(),
    readTime: z.string().optional(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    seo: z
      .object({
        canonical: z.string().optional(),
        keywords: z.string().optional(),
        noindex: z.boolean().optional(),
      })
      .optional(),
  }),
});

const pseoResources = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/pseo/resources" }),
  schema: resourcePageSchema,
});

const pseoTools = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/pseo/tools" }),
  schema: freeToolSchema,
});

const pseoGlossary = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/pseo/glossary" }),
  schema: glossaryPageSchema,
});

export const collections = {
  directory,
  pages,
  blog,
  pseoResources,
  pseoTools,
  pseoGlossary,
};
