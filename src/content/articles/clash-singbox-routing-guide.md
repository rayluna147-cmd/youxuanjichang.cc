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


## 五、Windows / macOS / iOS / Android 全平台客户端选型建议

2026 年千万不要再去搜几年前早已停更的老旧客户端了。不同系统选对顺手的现代客户端，能帮你省掉 90% 的莫名报错：

- **Windows 桌面端**：首选 **Clash Verge Rev**（基于活跃维护的 Mihomo 内核，界面清爽、原生支持 TUN 服务模式、支持可视化编辑覆写规则）；喜欢极简多协议的用户也可以选基于 Sing-box 的 **GUI.for.SingBox** 或 **Hiddify**。
- **macOS 桌面端**：同样首选 **Clash Verge Rev**；如果习惯原生苹果生态质感且愿意付费，**Stash** 或 **Surge** 是非常省心的长期选择。
- **iOS / iPadOS**：**Shadowrocket（小火箭）** 是最经典、性价比最高的必装工具；进阶用户或需要和 macOS 同步配置的可选 **Stash** 或 **Quantumult X**。
- **Android 手机/平板**：首选 **FlClash**（跨平台 Mihomo 内核，界面现代流畅）或 **NekoBox / Sing-box for Android**。

## 六、手把手拆解：Clash Verge Rev 覆写规则（Merge / Script）怎么玩？

很多机场自带的托管订阅规则比较粗糙——要么把 ChatGPT 和普通网页混在一起自动切换，要么没把最新出现的 AI 域名（如 `cursor.sh`、`claude.ai`、`generativelanguage.googleapis.com`）单独分出来。

在 Clash Verge Rev 里，你完全不需要每次更新订阅后手动改 YAML，直接利用内置的 **全局扩展覆写规则（Override）** 就能一劳永逸：

1. **给 AI 域名加上强制前置规则**：把 `DOMAIN-SUFFIX,openai.com,AI-Tools`、`DOMAIN-SUFFIX,chatgpt.com,AI-Tools`、`DOMAIN-SUFFIX,anthropic.com,AI-Tools`、`DOMAIN-SUFFIX,claude.ai,AI-Tools`、`DOMAIN-SUFFIX,googleapis.com,AI-Tools` 放在规则最顶部，确保它们永远走你手动锁定的单一美国/日本/新加坡节点。
2. **给国内大流量应用加上强制直连**：把常见国内网盘、国内视频站、局域网地址（`192.168.0.0/16`、`10.0.0.0/8`、`127.0.0.1/8`）确保命中 `DIRECT`，防止误走代理把月流量一晚上烧光。
3. **开启「仅代理 IPv4」或合理处理 IPv6**：部分家庭宽带开启了 IPv6，但机场落地节点不支持 IPv6，会导致浏览器访问部分双栈网站时先卡顿 3 秒等 IPv6 超时再回退到 IPv4。如果遇到网页「前两秒空白、后面突然秒开」，在客户端设置里关闭 IPv6 往往能立刻解决。

## 七、客户端最常见的 5 个「疑难杂症」快速排障

### 1. 开了代理，浏览器打不开任何网页（连百度也打不开）
大概率是上次异常关机导致系统代理端口残留，或者本地端口被其他软件占用。先关闭系统代理，重启客户端，检查混合端口（默认 `7897`）有没有冲突，再重新开启规则模式。

### 2. 更新订阅报错 `TLS handshake timeout` 或 `connection refused`
订阅地址本身可能被本地网络干扰了。在 Clash Verge Rev 的订阅编辑里，勾选「**通过代理更新**」（前提是当前还有可用节点），或者去机场官网后台重新复制最新的备用订阅链接。

### 3. 开着 TUN 模式，公司内网 OA 或 NAS 访问不了
因为 TUN 接管了整机流量，把公司私有网段或本地 NAS 域名也发去了代理。在 TUN 设置的 `route-exclude-address` 里把公司内网段排除掉，或者在规则顶部加一条 `DOMAIN-SUFFIX,公司内网域名,DIRECT` 即可。

### 4. 手机锁屏一会儿就断连，重新亮屏要等好几秒
iOS 和 Android 为了省电会在后台冻结代理进程。iOS 端在 Shadowrocket 设置里开启「按需连接（On Demand）」，Android 端把代理 App 加入电池优化白名单并锁定后台，断连问题基本消失。

### 5. 明明没看视频，流量却掉得飞快
第一时间打开客户端的「连接（Connections）」监控面板，按流量降序排列，10 秒内就能抓出偷跑流量的元凶——常见罪魁祸首包括：Windows 自动更新、Steam/Epic 后台更新游戏、OneDrive/iCloud 相册同步、以及误开了全局模式。

## 八、配好客户端后，怎么搭配白名单套餐最省心？

一套优雅的分流配置，能帮你把每一 GB 流量都用在刀刃上。如果你正在挑一套支持 Clash / Sing-box / Shadowrocket 一键托管订阅的实惠方案，可以直接参考本站白名单排序：
- **主力首选（流量最宽裕）**：第 1 名 [光年梯](/brands/guangnianti/)（打折前 ¥18/月 120GB，优惠码 `GNT80`）与第 2 名 [极连云](/brands/jilianyun/)（打折前 ¥18/月 100GB，优惠码 `JLY888`）；
- **轻量入门 / 备用第二订阅**：第 3 名 [快狸](/brands/kuaili/)（¥15/月 50GB，优惠码 `kl888`）、第 4 名 [速界](/brands/sujie/)（¥15/月 50GB，优惠码 `sujie888`）和第 6 名 [可信云](/brands/kexinyun/)（¥15/月 60GB，优惠码 `kxy80`）；
- **25 元 100GB 档备选**：第 5 名 [边缘节点](/brands/bianyuan/)（¥25/月 100GB，优惠码 `xk808`）。

在 Clash Verge Rev 里，你甚至可以把两家订阅同时导入，平时用主力订阅，遇到维护点一下鼠标就能 1 秒切到备用订阅。更多选型逻辑可以前往 [机场推荐核心专题](/select/) 或 [套餐价格工作台](/plans/) 查看。


## 九、进阶实战：如何在不同网络环境下把分流做到「零感知」？

真正好用的代理配置，是你平时完全感觉不到它的存在——打开淘宝、微信、B 站、公司 OA 飞快直连，打开 Google、GitHub、ChatGPT、Netflix 丝滑秒开，手机从家里 Wi-Fi 走出门切到 5G 也不用手动重连。要达到这种「零感知」状态，下面四个细节非常关键：

### 1. 规则集（Rule-Provider）的更新频率
很多用户导入一次订阅后半年都不点更新，结果新出的 AI 域名、新调整的流媒体 CDN 域名都没被规则覆盖，只能落到最后的 `Match` 兜底策略里。在 Clash Verge Rev 里，建议把订阅和外部规则集的自动更新周期设为 **24 小时或 48 小时**，保持规则库常新。

### 2. 区分「GeoSite 域名分流」与「GeoIP 地址分流」
老式配置喜欢把大量 `GEOIP,CN,DIRECT` 规则堆在前面，导致每次访问未知域名都要先做一次 DNS 解析拿到 IP 才能决定走直连还是代理，白白增加延迟还容易触发 DNS 泄漏。现代 Mihomo 和 Sing-box 配置的标准写法是：**先用 `RULE-SET` / `GEOSITE` 按域名直接命中，未命中的再走到末尾兜底，且对 `GEOIP,CN` 加上 `no-resolve` 标记**。

### 3. 开发者专属：Git、Docker、npm、Python pip 走代理不踩坑
- **Git**：如果在 TUN 模式下 `git clone` 依然慢，确认你的 Git 配置里没有残留以前手动写死的失效 `http.proxy`，用 `git config --global --unset http.proxy` 清理即可；
- **Docker**：Docker Desktop 在 Windows/macOS 下有独立的网络命名空间，在 Docker Settings → Resources → Proxies 里填上本地混合端口 `http://127.0.0.1:7897`，拉取海外镜像速度直接起飞；
- **npm / pnpm / pip**：开启 TUN 模式后一般直接生效，无需反复修改源地址。

### 4. 家庭多设备局域网共享（Allow LAN）
如果你在书房电脑上配好了 Clash Verge Rev，又不想给客厅的 Switch 游戏机或平板单独折腾客户端，只需在设置里打开「允许局域网连接（Allow LAN）」，然后在其他设备的 Wi-Fi HTTP 代理里填入书房电脑的内网 IP 和端口 `7897`，全家设备立刻共享同一套精细分流规则。
