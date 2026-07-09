import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return rss({
    title: '枫迹博客',
    description: '一个关于技术、设计与生活的博客',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `${import.meta.env.BASE_URL}${post.id}/`,
      })),
    stylesheet: `${import.meta.env.BASE_URL}rss-style.xsl`,
    customData: '<language>zh-CN</language>',
  });
}
