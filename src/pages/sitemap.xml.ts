import { getCollection } from 'astro:content';
import { SITE } from '../data/site';
import { TOPIC_HUBS } from '../data/topics';
import { getAuthorizedBrands } from '../data/brands';

export async function GET() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const brands = getAuthorizedBrands();
  const today = new Date().toISOString().split('T')[0];

  const staticPaths = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/select/', priority: '1.0', changefreq: 'daily' },
    { path: '/brands/', priority: '0.9', changefreq: 'weekly' },
    { path: '/reviews/', priority: '0.9', changefreq: 'weekly' },
    { path: '/plans/', priority: '0.9', changefreq: 'weekly' },
    { path: '/compare/', priority: '0.8', changefreq: 'weekly' },
    { path: '/guides/', priority: '0.9', changefreq: 'weekly' },
    { path: '/search/', priority: '0.6', changefreq: 'monthly' },
    { path: '/about/', priority: '0.6', changefreq: 'monthly' },
  ];

  const urls: Array<{ loc: string; lastmod: string; priority: string; changefreq: string }> = [
    ...staticPaths.map((p) => ({
      loc: `${SITE.url}${p.path}`,
      lastmod: today,
      priority: p.priority,
      changefreq: p.changefreq,
    })),
    ...TOPIC_HUBS.map((t) => ({
      loc: `${SITE.url}/topics/${t.slug}/`,
      lastmod: today,
      priority: '0.85',
      changefreq: 'weekly',
    })),
    ...articles.map((a) => ({
      loc: `${SITE.url}/articles/${a.slug}/`,
      lastmod: a.data.updatedAt,
      priority: '0.8',
      changefreq: 'monthly',
    })),
    ...brands.map((b) => ({
      loc: `${SITE.url}/brands/${b.slug}/`,
      lastmod: b.updatedAt,
      priority: '0.85',
      changefreq: 'weekly',
    })),
    ...reviews.map((r) => ({
      loc: `${SITE.url}/reviews/${r.slug}/`,
      lastmod: r.data.updatedAt,
      priority: '0.85',
      changefreq: 'monthly',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
