import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

export async function GET(context: { site?: URL }) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => new Date(b.data.updatedAt).getTime() - new Date(a.data.updatedAt).getTime()
  );

  return rss({
    title: `${SITE.name} (${SITE.brandEn}) — 原创评测与机场推荐指南`,
    description: SITE.description,
    site: context.site || SITE.url,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: new Date(article.data.publishedAt),
      description: article.data.description,
      link: `/articles/${article.slug}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
