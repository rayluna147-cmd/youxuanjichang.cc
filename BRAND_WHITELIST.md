# BRAND_WHITELIST.md — 独立品牌白名单规范

- **当前已授权品牌数**：0（初始化阶段未提供真实品牌资料，严格执行零虚构）
- **录入文件**：`src/data/whitelist.ts`
- **必填字段**：`slug`, `name`, `enName`, `tagline`, `protocols`, `lineTypes`, `regions`, `unlocks`, `affiliateUrl`（完整保留邀请参数）, `pros`, `cons`, `source`, `updatedAt`, `reviewSlug`, `plans`
- **配套要求**：每个正式品牌必须在 `src/content/reviews/<slug>.md` 配套一篇不少于 2000 字的独立深度评测，并通过 `npm run validate` 校验。
