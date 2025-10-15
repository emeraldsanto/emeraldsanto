import vercel from '@astrojs/vercel';
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel({
    imagesConfig: {
      sizes: [1080],
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
  env: {
    schema: {
      BLOB_READ_WRITE_TOKEN: envField.string({
        access: 'secret',
        context: 'server',
      }),
    },
  },
});
