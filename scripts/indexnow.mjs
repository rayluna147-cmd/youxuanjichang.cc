import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const isSubmit = args.includes('--submit');
const key = process.env.INDEXNOW_KEY || '7e9c4a2b8f1d6e3a5c0b9d4f2a8e1c6b';
const host = process.env.INDEXNOW_HOST || 'youxuanjichang.cc';
const keyLocation = `https://${host}/${key}.txt`;

const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('[ERROR] 未找到 dist/sitemap.xml，请先执行 npm run build');
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const payload = {
  host,
  key,
  keyLocation,
  urlList: urls,
};

if (!isSubmit) {
  console.log('=== IndexNow DRY-RUN 模拟测试（未向搜索引擎发送真实请求）===');
  console.log(`验证密钥文件: ${keyLocation}`);
  console.log(`待提交规范 URL 数量: ${urls.length}`);
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log(`正在向 Bing IndexNow 提交 ${urls.length} 条规范 URL...`);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});
console.log(`IndexNow 响应状态: ${res.status} ${res.statusText}`);
if (!res.ok) process.exit(1);
