// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Import statistics to generate URLs
import { statisticsDatabase } from './src/data/statisticsDatabase.ts';

// Generate all statistic detail page URLs
const statisticUrls = statisticsDatabase.map(stat => 
  `https://biginvisible.com/stat-detail/${stat.id}`
);

// https://astro.build/config
export default defineConfig({
  site: 'https://biginvisible.com',
  integrations: [
    react(),
    sitemap({
      // Add custom pages for all statistics
      customPages: statisticUrls,
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
