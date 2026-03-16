import { z } from "zod";

export const resourcePageSchema = z.object({
  meta: z.object({
    content_type: z.enum([
      "checklist",
      "template",
      "guide",
      "tips",
      "framework",
      "calendar",
      "glossary",
      "budget_allocator",
      "best_practices",
    ]),
    vertical: z.string(),
    channel: z.string().optional(),
    role: z.string().optional(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    slug: z.string(),
  }),
  content: z.object({
    intro: z.string(),
    sections: z.array(
      z.object({
        heading: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            difficulty: z
              .enum(["beginner", "intermediate", "advanced"])
              .optional(),
            priority: z
              .enum(["critical", "important", "nice-to-have"])
              .optional(),
            channel_relevance: z.array(z.string()).optional(),
          })
        ),
      })
    ),
    pro_tips: z.array(z.string()),
    related_tools: z.array(
      z.object({
        slug: z.string(),
        relevance: z.string(),
      })
    ),
    related_resources: z.array(
      z.object({
        slug: z.string(),
        title: z.string(),
        type: z.string(),
      })
    ).optional(),
    cta: z.object({
      text: z.string(),
      link: z.string(),
    }),
  }),
});

export const freeToolSchema = z.object({
  meta: z.object({
    tool_type: z.enum([
      "calculator",
      "estimator",
      "generator",
      "analyzer",
      "converter",
    ]),
    vertical: z.string().optional(),
    channel: z.string().optional(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    slug: z.string(),
  }),
  tool_config: z.object({
    inputs: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        type: z.enum(["number", "currency", "percentage", "select"]),
        default_value: z.union([z.number(), z.string()]),
        min: z.number().optional(),
        max: z.number().optional(),
        step: z.number().optional(),
        options: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
            })
          )
          .optional(),
        help_text: z.string().optional(),
      })
    ),
    formula: z.string(),
    output: z.object({
      label: z.string(),
      format: z.enum(["currency", "number", "percentage"]),
      description: z.string(),
    }),
    presets: z
      .array(
        z.object({
          name: z.string(),
          values: z.record(z.union([z.number(), z.string()])),
        })
      )
      .optional(),
  }),
  content: z.object({
    intro: z.string(),
    how_it_works: z.string(),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    related_tools: z.array(
      z.object({
        slug: z.string(),
        relevance: z.string(),
      })
    ),
    cta: z.object({
      text: z.string(),
      link: z.string(),
    }),
  }),
});

export const glossaryPageSchema = z.object({
  meta: z.object({
    category: z.string(),
    vertical: z.string().optional(),
    channel: z.string().optional(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    slug: z.string(),
  }),
  term: z.object({
    name: z.string(),
    abbreviation: z.string().optional(),
    definition: z.string(),
    extended_explanation: z.string(),
    example: z.string(),
    why_it_matters: z.string(),
    related_terms: z.array(
      z.object({
        slug: z.string(),
        name: z.string(),
      })
    ),
    vertical_context: z
      .array(
        z.object({
          vertical: z.string(),
          note: z.string(),
        })
      )
      .optional(),
  }),
  content: z.object({
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    cta: z.object({
      text: z.string(),
      link: z.string(),
    }),
  }),
});

export type ResourcePage = z.infer<typeof resourcePageSchema>;
export type FreeTool = z.infer<typeof freeToolSchema>;
export type GlossaryPage = z.infer<typeof glossaryPageSchema>;
