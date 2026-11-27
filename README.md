# 优选机场（YOUXUAN / YX.）— SPECTRUM 动态光谱交互式评测站点

- **正式域名**：https://youxuanjichang.cc/
- **核心竞争页面**：https://youxuanjichang.cc/select/
- **GitHub 仓库**：https://github.com/rayluna147-cmd/youxuanjichang.cc.git
- **技术栈**：Astro 5 + TypeScript + Three.js (WebGL) + GSAP / ScrollTrigger + Pagefind + Cloudflare Pages

## 快速开始

```bash
npm ci
npm run dev      # 本地开发 (http://localhost:4321)
npm run build    # 构建静态站点 + 生成 Pagefind 中文全文索引
npm run preview  # 预览生产构建产物
```

Windows 用户可直接双击根目录 `打开网站预览.bat` 一键启动本地预览并自动打开浏览器。

## 质量检查与 SEO 审计

```bash
npm run check         # Astro & TypeScript 静态类型检查
npm run validate      # 内容字数、白名单规范与旧站域名残留检查
npm run seo:audit     # Canonical、JSON-LD、Sitemap、Robots、RSS、Pagefind 产物校验
npm run indexnow:dry  # IndexNow 模拟提交（上线后可使用 npm run indexnow:submit）
```

## 品牌白名单原则

本项目严格遵循**零虚构原则**（详见 `BRAND_WHITELIST.md`）：仅收录项目所有者明确提供并授权的品牌资料，不继承任何旧站数据，不虚构套餐、测速、评分与资历。
