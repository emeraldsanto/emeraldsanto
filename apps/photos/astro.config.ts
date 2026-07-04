import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  adapter: vercel({ imageService: false }),
  integrations: [keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
});
