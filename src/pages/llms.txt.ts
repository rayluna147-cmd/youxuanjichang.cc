import { getCollection } from 'astro:content';
import { SITE } from '../data/site';
import { TOPIC_HUBS } from '../data/topics';

export async function GET() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  const lines = [
    `# ${SITE.name} (${SITE.brandEn} / ${SITE.brandShort})`,
    '',
    `> ${SITE.description}`,
    '',
    `正式域名：${SITE.url}/`,
    `核心竞争页面：${SITE.url}/select/`,
    `内容原则：严格执行独立品牌白名单制度，绝不虚构套餐、测速、评分或品牌资历。`,
    '',
    '## 核心页面',
    `- [首页](${SITE.url}/)`,
    `- [机场推荐核心专题](${SITE.url}/select/)`,
    `- [品牌白名单档案](${SITE.url}/brands/)`,
    `- [独立深度评测](${SITE.url}/reviews/)`,
    `- [套餐价格交互工作台](${SITE.url}/plans/)`,
    `- [线路与品牌横向对比](${SITE.url}/compare/)`,
    `- [专题与原创指南](${SITE.url}/guides/)`,
    `- [全文搜索](${SITE.url}/search/)`,
    '',
    '## 二级细分专题',
    ...TOPIC_HUBS.map((t) => `- [${t.title}](${SITE.url}/topics/${t.slug}/): ${t.description}`),
    '',
    '## 三级原创深度文章',
    ...articles.map((a) => `- [${a.data.title}](${SITE.url}/articles/${a.slug}/): ${a.data.description}`),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
