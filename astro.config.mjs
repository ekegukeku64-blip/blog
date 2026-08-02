// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkInternalProjectLinks from './scripts/remark-internal-project-links.mjs';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

console.log('[CF-DEBUG] SITE_URL=' + JSON.stringify(process.env.SITE_URL) + ' BASE_PATH=' + JSON.stringify(process.env.BASE_PATH));
const site = process.env.SITE_URL?.trim() || 'https://ekegukeku64-blip.github.io';
const requestedBase = process.env.BASE_PATH?.trim() || '/blog';
const base = requestedBase === '/'
  ? '/'
  : `/${requestedBase.replace(/^\/+|\/+$/g, '')}`;
const projectSnapshotDirectory = resolve(process.cwd(), 'src', 'content', 'projects');
const mirroredProjects = existsSync(projectSnapshotDirectory)
  ? readdirSync(projectSnapshotDirectory)
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => readFileSync(resolve(projectSnapshotDirectory, filename), 'utf8')
        .match(/^fullName:\s+"([^"]+)"$/m)?.[1])
      .filter(Boolean)
  : [];
const publicProjectPaths = new Set(
  mirroredProjects.map((fullName) => {
    const [owner, repo] = String(fullName).split('/');
    return `${base === '/' ? '' : base}/projects/${owner}/${repo}/`;
  }),
);

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        const isProjectDetail = /\/projects\/[^/]+\/[^/]+\/$/.test(pathname);
        return !pathname.endsWith('/admin/') &&
          !pathname.endsWith('/bookmarks/') &&
          !pathname.endsWith('/risk-watch/') &&
          !pathname.includes('/blog/risk-daily-') &&
          (!isProjectDetail || publicProjectPaths.has(pathname));
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      remarkPlugins: [[remarkInternalProjectLinks, { base }]],
    }),
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
