# AGENTS.md — AI 协作开发规范

1. **独立项目边界**：本仓库仅服务于 `https://youxuanjichang.cc/`，严禁混入任何旧站域名、推广链接或未经授权的品牌数据。
2. **品牌白名单零虚构**：所有商业推广品牌必须通过 `src/data/whitelist.ts` 录入，并在 `src/content/reviews/` 配套不少于 2000 字的独立深度评测。
3. **视觉设计优先级**：始终保持 **SPECTRUM 动态光谱**视觉系统（深空底色 `#06070a`、五维光谱主色、Three.js 3D 装置、GSAP/ScrollTrigger 动效、磁吸交互与 `prefers-reduced-motion` 兼容）。
4. **静态 HTML 优先**：所有正文、标题、FAQ 与核心对比数据必须以静态 HTML 输出，确保 Bing/Google/AI 检索完整抓取。
5. **发布前强制检查**：每次提交前必须通过 `npm run check`、`npm run validate`、`npm run build`、`npm run seo:audit`。
