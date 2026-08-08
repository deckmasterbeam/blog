import { defineCollection, z } from "astro:content";
import { contentWarnings, type ContentWarningKey } from "./contentWarnings";

const contentWarningKeys = Object.keys(contentWarnings) as [
  ContentWarningKey,
  ...ContentWarningKey[],
];

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
    contentWarning: z.enum(contentWarningKeys).optional(), // key into contentWarnings.ts
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
    site: z.string().url().optional(),
    projectTag: z.string(), // matches the tag on related release posts
    contentWarning: z.enum(contentWarningKeys).optional(), // key into contentWarnings.ts
  }),
});

const releases = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
    projectTag: z.string(),
    contentWarning: z.enum(contentWarningKeys).optional(), // key into contentWarnings.ts
  }),
});

export const collections = { blog, projects, releases };
