import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import type { AstroUserConfig } from 'astro';
import { defineConfig } from 'astro/config';

const config: AstroUserConfig = {
  adapter: vercel({ imageService: false }),
  vite: {
    plugins: [tailwindcss()],
  },
};

if (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'development') {
  config.integrations ??= [];
  config.integrations.push(react(), keystatic());
}

if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  config.site = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
}

export default defineConfig(config);
