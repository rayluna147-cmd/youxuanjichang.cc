# PROJECT_HANDOVER.md — 项目交接清单

## 已交付内容
- 完整 Astro 5 + TypeScript 源代码与 `package-lock.json`
- SPECTRUM 动态光谱 UI 系统、Three.js 3D 光谱装置、GSAP ScrollTrigger 滚动叙事、全屏动态导航、磁吸按钮、Astro ClientRouter 页面转场
- 核心竞争页 `/select/`、交互式套餐价格工作台 `/plans/`、横向对比矩阵 `/compare/`、品牌档案 `/brands/`、独立评测 `/reviews/`、5 大细分专题 `/topics/*/`、8 篇原创深度指南 `/articles/*/`、Pagefind 中文搜索 `/search/`
- SEO/GEO 基础设施：`sitemap.xml`、`sitemap-index.xml`、`robots.txt`、`rss.xml`、`llms.txt`、JSON-LD、IndexNow 验证文件与脚本
- Windows 一键预览工具：`打开网站预览.bat`

## 后续运营第一步
1. 在 Cloudflare Pages 绑定 GitHub 仓库 `rayluna147-cmd/youxuanjichang.cc` 并绑定正式域名 `youxuanjichang.cc`（详见 `DEPLOYMENT.md`）。
2. 将正式授权品牌资料按 `BRAND_WHITELIST.md` 录入 `src/data/whitelist.ts`，并在 `src/content/reviews/` 写入对应 >=2000 字独立评测。
3. 正式域名上线后，在 Bing Webmaster Tools 提交 `https://youxuanjichang.cc/sitemap.xml` 并运行 `npm run indexnow:submit`。
