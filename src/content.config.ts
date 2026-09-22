import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import {
  contentWarnings,
  type ContentWarningKey,
} from "./content/contentWarnings";

const contentWarningKeys = Object.keys(contentWarnings) as [
  ContentWarningKey,
  ...ContentWarningKey[],
];

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
    contentWarning: z.enum(contentWarningKeys).optional(), // key into contentWarnings.ts
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
    site: z.string().url().optional(),
    projectTag: z.string(), // matches the tag on related release posts
    contentWarning: z.enum(contentWarningKeys).optional(), // key into contentWarnings.ts
  }),
});

const releases = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/releases" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
    projectTag: z.string(),
    contentWarning: z.enum(contentWarningKeys).optional(), // key into contentWarnings.ts
  }),
});

export const collections = { blog, projects, releases };
