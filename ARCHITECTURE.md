# ARCHITECTURE.md — 技术架构说明

- **框架**：Astro 5（Static Site Generation, `output: static`, `trailingSlash: always`）
- **内容层**：Astro Content Collections (`src/content/articles/`, `src/content/reviews/`) + TypeScript 强类型数据层 (`src/data/`)
- **动效与 3D**：Three.js (`SpectrumCanvas.astro`) + GSAP & ScrollTrigger (`src/scripts/spectrum-motion.ts`) + Astro `ClientRouter` 空间转场
- **全文检索**：Pagefind（构建后静态分片索引，支持中文分词）
- **托管部署**：Cloudflare Pages（自动构建 `npm run build` -> `dist`）
