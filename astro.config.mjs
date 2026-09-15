import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [react(), mdx()],
  adapter: vercel(),
  env: {
    schema: {
      DATABASE_URL: envField.string({ context: "server", access: "secret" }),
    },
  },
});
