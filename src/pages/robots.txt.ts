import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL): string => `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = () => {
  const siteUrl = process.env.SITE_URL?.trim() || 'https://ekegukeku64-blip.github.io';
  const basePath = process.env.BASE_PATH?.trim() || '/blog';
  const normalizedBase = basePath === '/' ? '' : `/${basePath.replace(/^\/+|\/+$/g, '')}`;
  const sitemapURL = new URL(`${normalizedBase}/sitemap-index.xml`, siteUrl);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
