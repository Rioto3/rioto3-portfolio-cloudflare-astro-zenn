import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      site: 'https://rioto3.dev',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://rioto3.dev/about',
        'https://rioto3.dev/projects',
        'https://rioto3.dev/blog'
      ]
    })
  ],
  output: 'server',
  adapter: cloudflare()
});
