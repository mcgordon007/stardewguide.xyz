import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['basics', 'farming', 'fishing', 'mining', 'foraging', 'combat', 'social', 'seasons', 'skills', 'quests', 'items', 'locations']),
    season: z.enum(['spring', 'summer', 'fall', 'winter', 'all']).default('all'),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { guides };
