// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ekegukeku64-blip.github.io',
  base: '/blog',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'fix-font-display',
        transform(code, id) {
          if (id.includes('@fontsource/noto-serif-sc')) {
            return code.replace(/font-display:\s*swap/g, 'font-display: optional');
          }
        },
      },
    ],
  },
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});