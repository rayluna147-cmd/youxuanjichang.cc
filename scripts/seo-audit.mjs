import fs from 'node:fs';
import path from 'node:path';

const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  console.error('[ERROR] dist 目录不存在，请先运行 npm run build');
  process.exit(1);
}

let errors = 0;
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(distDir);

console.log(`=== SEO / GEO 构建产物审计（共 ${htmlFiles.length} 个 HTML 页面）===`);

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  if (rel === '404.html') continue;
  const html = fs.readFileSync(file, 'utf8');

  if (!/<link rel="canonical" href="https:\/\/youxuanjichang\.cc\//.test(html)) {
    console.error(`[ERROR] 缺少或错误的 canonical: ${rel}`);
    errors++;
  }
  if (!/<script type="application\/ld\+json">/.test(html)) {
    console.error(`[ERROR] 缺少 JSON-LD 结构化数据: ${rel}`);
    errors++;
  }
  if (!/<meta name="description" content="[^"]{20,}/.test(html)) {
    console.error(`[ERROR] meta description 过短或缺失: ${rel}`);
    errors++;
  }
}

const requiredFiles = [
  'sitemap.xml',
  'sitemap-index.xml',
  'robots.txt',
  'rss.xml',
  'llms.txt',
  '7e9c4a2b8f1d6e3a5c0b9d4f2a8e1c6b.txt',
  'pagefind/pagefind.js',
];

for (const f of requiredFiles) {
  if (!fs.existsSync(path.join(distDir, f))) {
    console.error(`[ERROR] 缺少关键 SEO/搜索产物: dist/${f}`);
    errors++;
  } else {
    console.log(`  [OK] dist/${f}`);
  }
}

const sitemapXml = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
const urlCount = (sitemapXml.match(/<loc>/g) || []).length;
console.log(`Sitemap URL 总数: ${urlCount}`);

if (errors > 0) {
  console.error(`SEO 审计失败：共 ${errors} 项错误。`);
  process.exit(1);
}
console.log('SEO / GEO 审计全部通过！');
