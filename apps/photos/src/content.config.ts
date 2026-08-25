import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categories = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
  }),
});

const images = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/images' }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      featured: z.boolean().default(false),
      caption: z.string().optional(),
      date: z.string(),
      location: z.string().optional(),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/publications' }),
  schema: z.object({
    outlet: z.string(),
    title: z.string(),
    url: z.url(),
    publishedAt: z.string(),
    language: z.enum(['en', 'fr', 'it']),
    kind: z.enum(['article', 'listing']),
    note: z.string(),
  }),
});

export const collections = { categories, images, publications };
