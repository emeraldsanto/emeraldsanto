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

switch (process.env.VERCEL_ENV) {
  case 'production':
    config.site = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    break;
  case 'preview':
    config.site = `https://${process.env.VERCEL_URL}`;
    break;
  default:
    config.integrations ??= [];
    config.integrations.push(react(), keystatic());
    break;
}

export default defineConfig(config);
