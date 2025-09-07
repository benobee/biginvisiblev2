// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://biginvisible.com',
  integrations: [
    react(),
    sitemap({
      // Exclude specific pages if needed
      filter: (page) => {
        // Exclude the editor page and API routes from sitemap
        return !page.includes('/editor') && !page.includes('/api/');
      }
    })
  ],
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  devToolbar: {
    enabled: false
  },
  vite: {
    ssr: {
      noExternal: ['@astrojs/react']
    }
  }
});
