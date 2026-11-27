# DEPLOYMENT.md — Cloudflare Pages 部署配置

在 Cloudflare Pages 后台新建独立项目（**切勿修改其他旧站项目**）：

- **项目名称**：`youxuanjichang-cc`
- **GitHub 仓库**：`rayluna147-cmd/youxuanjichang.cc`
- **生产分支**：`main`
- **框架预设**：`Astro`
- **构建命令**：`npm run build`
- **构建输出目录**：`dist`
- **根目录**：`/`（仓库根目录）
- **环境变量**：`NODE_VERSION=22.14.0`、`ASTRO_TELEMETRY_DISABLED=1`
- **自定义域名**：`youxuanjichang.cc`
