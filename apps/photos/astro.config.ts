import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel({ imageService: true }),
  env: {
    schema: {
      BLOB_READ_WRITE_TOKEN: envField.string({
        access: 'secret',
        context: 'server',
      }),
    },
  },
  image: {
    domains: ['jh6xyt4qgcm2yqdg.public.blob.vercel-storage.com'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
