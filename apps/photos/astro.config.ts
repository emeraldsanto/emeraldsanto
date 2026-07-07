import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const isLocal =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'development';

export default defineConfig({
  adapter: vercel({ imageService: false }),
  integrations: isLocal ? [react(), keystatic()] : [],
  vite: {
    plugins: [tailwindcss()],
  },
});
