import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    topicSlug: z.string(),
    keywords: z.array(z.string()),
    publishedAt: z.string(),
    updatedAt: z.string(),
    readingMinutes: z.number().default(8),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    accent: z.string().default('#38bdf8'),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
  }),
});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    brandSlug: z.string(),
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string(),
    source: z.string(),
    draft: z.boolean().default(false),
    accent: z.string().default('#38bdf8'),
  }),
});

export const collections = {
  articles,
  reviews,
};
