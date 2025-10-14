import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel({
    imagesConfig: {
      sizes: [],
      remotePatterns: [
        {
          hostname: 'jh6xyt4qgcm2yqdg.public.blob.vercel-storage.com',
          pathname: '/**',
          port: '',
          protocol: 'https',
        },
      ],
    },
    imageService: true,
  }),
});
