import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const articlesDir = path.join(root, 'src', 'content', 'articles');
const reviewsDir = path.join(root, 'src', 'content', 'reviews');

let errors = 0;

function checkForbiddenDomains(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', '.git', '.astro'].includes(entry.name)) continue;
      checkForbiddenDomains(full);
    } else if (/\.(astro|ts|tsx|js|mjs|md|mdx|json|css|html)$/.test(entry.name)) {
      const text = fs.readFileSync(full, 'utf8');
      if (/airportcha\.com/i.test(text) && !full.includes('validate-content.mjs') && !full.includes('CHANGELOG.md')) {
        console.error(`[ERROR] 检测到旧站域名残留: ${path.relative(root, full)}`);
        errors++;
      }
    }
  }
}

console.log('=== 优选机场内容质量校验 ===');
const articleFiles = fs.existsSync(articlesDir) ? fs.readdirSync(articlesDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx')) : [];
console.log(`原创长尾文章数量: ${articleFiles.length}`);

for (const file of articleFiles) {
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  const charCount = body.replace(/\s+/g, '').length;
  console.log(`  - ${file}: ${charCount} 字`);
  if (charCount < 600) {
    console.error(`[ERROR] 文章字数过短 (<600字): ${file}`);
    errors++;
  }
}

const reviewFiles = fs.existsSync(reviewsDir) ? fs.readdirSync(reviewsDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx')) : [];
console.log(`正式品牌独立评测数量: ${reviewFiles.length}`);
for (const file of reviewFiles) {
  const content = fs.readFileSync(path.join(reviewsDir, file), 'utf8');
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  const charCount = body.replace(/\s+/g, '').length;
  console.log(`  - ${file}: ${charCount} 字`);
  if (charCount < 2000) {
    console.error(`[ERROR] 正式品牌评测不足 2000 字: ${file}`);
    errors++;
  }
}

checkForbiddenDomains(path.join(root, 'src'));
checkForbiddenDomains(path.join(root, 'public'));

if (errors > 0) {
  console.error(`校验失败：共发现 ${errors} 个问题。`);
  process.exit(1);
}
console.log('内容质量校验通过（0 错误）。');
