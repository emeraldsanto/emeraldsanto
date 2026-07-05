import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

export const collections = { categories, images };
