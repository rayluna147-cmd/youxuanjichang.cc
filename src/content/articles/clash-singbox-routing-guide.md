---
title: "Clash Verge Rev 与 Sing-box 分流配置实战：策略组、规则集与 DNS 防泄漏"
description: "从零掌握现代代理客户端的分流逻辑：对比 Clash Mihomo 内核与 Sing-box 的核心差异，手把手梳理策略组划分、Rule-Provider 规则集与 DNS 防泄漏最佳配置。"
category: "客户端教程"
topicSlug: "protocols"
keywords: ["Clash Verge Rev", "Sing-box配置", "分流规则", "DNS防泄漏", "Mihomo内核"]
publishedAt: "2026-11-25"
updatedAt: "2026-11-27"
readingMinutes: 10
featured: false
accent: "#fb7185"
faq:
  - q: "系统代理（System Proxy）和 TUN 模式有什么区别？"
    a: "系统代理只接管遵循操作系统代理设置的浏览器和部分应用；TUN 模式会创建虚拟网卡，接管整机几乎所有 TCP/UDP 流量，适合终端命令行、Git、游戏与不遵循系统代理的桌面软件。"
  - q: "为什么开了代理之后，国内网站反而变慢了？"
    a: "通常是因为误开了“全局模式（Global）”或分流规则集过旧，导致国内域名也绕道海外节点。切换到“规则模式（Rule）”并确保国内直连规则生效即可恢复。"
---

再优秀的线路，如果客户端分流配置不当，也会出现国内网站变慢、终端工具走不通、AI 频繁跳区或 DNS 泄漏等问题。目前跨平台生态中，**Clash Verge Rev（Mihomo 内核）** 与 **Sing-box** 是最值得掌握的两套现代方案。

## 一、为什么必须使用「规则模式（Rule）」而非全局模式？

- **全局模式（Global）**：所有流量不分国内外全部发往海外节点，不仅浪费宝贵的高价流量，还会导致淘宝、微信、网银、国内网盘延迟暴涨甚至触发异地风控。
- **规则模式（Rule）**：客户端根据域名、IP 段与 GeoIP 数据库实时判断：国内流量直连（DIRECT），海外普通流量走主力代理，AI 与流媒体流量走各自专属策略组。

## 二、推荐的四层策略组架构

在你的客户端配置中，建议至少维护以下四个清晰分组：

1. **主力代理（Proxy）**：用于日常海外网页、Google 搜索、GitHub 等，可指向低延迟香港/新加坡/日本节点。
2. **AI 专用（AI-Tools）**：覆盖 OpenAI、Anthropic、Google AI、Cursor 等域名，**手动固定**单一美国或日本纯净节点，禁止自动切换。
3. **流媒体专用（Streaming）**：覆盖 Netflix、Disney+、YouTube、Spotify 等，按你想看的字幕片库固定新加坡、台湾或日本节点。
4. **漏网之鱼（Final / Match）**：未命中任何规则的未知域名。常规用户建议指向「主力代理」（白名单思路，访问冷门海外站更省心）。

## 三、TUN 模式与开发者终端加速

许多开发者发现浏览器能正常访问 GitHub，但终端里的 `git push`、`npm install`、`curl` 或 `docker pull` 却依然超时。原因在于命令行工具默认不读取 Windows/macOS 的系统代理设置。

解决方式有两种：

- **开启 TUN 模式**：在 Clash Verge Rev 中安装服务模式（Service Mode）后开启 TUN，所有终端与桌面应用流量都会被虚拟网卡无缝接管。
- **配置环境变量**：在 Shell 中临时设置 `HTTP_PROXY` 与 `HTTPS_PROXY` 指向本地混合端口（如 `http://127.0.0.1:7897`）。

## 四、DNS 防泄漏的核心配置要点

正确的 DNS 配置应遵循「国内域名国内解，海外域名海外解」：

- `enhanced-mode: fake-ip`：大幅加快首次连接速度，避免本地 ISP 污染。
- `nameserver`：配置国内加密 DNS（如阿里 DoH / 腾讯 DoH）用于解析直连域名。
- `fallback`：配置海外加密 DNS（如 Cloudflare DoH / Google DoH）配合 `fallback-filter` 解析非国内域名。

配置完成后，访问任意在线 DNS Leak Test 网站，如果结果中不再出现本地运营商 DNS，即说明防泄漏配置生效。
