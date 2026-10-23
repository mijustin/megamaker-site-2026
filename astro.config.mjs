import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://megamaker.co',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    server: { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    preview: { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  },
});
