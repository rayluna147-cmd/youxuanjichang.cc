export interface TopicHub {
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  accent: string;
  relatedArticleSlugs: string[];
  faq: Array<{ q: string; a: string }>;
}

export const TOPIC_HUBS: TopicHub[] = [
  {
    slug: 'iepl-iplc',
    code: 'TOPIC 01',
    title: 'IEPL / IPLC 专线机场深度解析',
    shortTitle: 'IEPL / IPLC 专线',
    description:
      '系统拆解 IEPL 与 IPLC 国际内网专线的物理架构、不过墙特性、晚高峰低丢包原理，以及普通用户如何通过路由追踪与延迟波动鉴别真假专线。',
    targetKeyword: 'IEPL专线机场',
    secondaryKeywords: ['IPLC专线', '专线机场推荐', '真假IEPL鉴别', '晚高峰不卡机场'],
    accent: '#38bdf8',
    relatedArticleSlugs: ['iepl-iplc-line-guide', 'relay-vs-direct-lines', 'airport-selection-framework'],
    faq: [
      {
        q: 'IEPL 和 IPLC 在实际使用体验上有什么区别？',
        a: 'IPLC 是国际私有租用电路，传统上基于 SDH/OTN 物理透传；IEPL 是国际以太网专线，部署更灵活、带宽弹性更高。对终端用户而言，二者均通过运营商内网跨境，不经过公网国际出口，晚高峰表现都显著优于普通公网直连。',
      },
      {
        q: '如何判断一家机场宣传的“全专线”是否属实？',
        a: '可通过三点交叉验证：一是入口 IP 与落地 IP 的真实路由延迟是否接近两地物理光缆下限（如深港通常在 5–15ms）；二是晚高峰 20:00–23:00 持续 Ping 与单线程吞吐是否稳定无剧烈丢包；三是查看是否对高成本专线设置合理倍率或独立分组。',
      },
    ],
  },
  {
    slug: 'streaming-unlock',
    code: 'TOPIC 02',
    title: '流媒体解锁与原生 IP 选型专题',
    shortTitle: '流媒体解锁',
    description:
      '全面覆盖 Netflix、Disney+、YouTube Premium、HBO Max、TikTok 等主流流媒体平台的地区解锁机制，解析 DNS 解锁与原生住宅 IP 的本质差异。',
    targetKeyword: '流媒体解锁机场',
    secondaryKeywords: ['Netflix解锁', '原生IP节点', 'Disney+解锁', '4K流媒体机场'],
    accent: '#34d399',
    relatedArticleSlugs: ['streaming-unlock-native-ip', 'clash-singbox-routing-guide', 'airport-selection-framework'],
    faq: [
      {
        q: 'DNS 解锁和原生 IP 解锁哪个更稳定？',
        a: '原生 IP（IP 注册地与广播地一致且未被流媒体拉黑）通常更稳定，不易出现突然失效；DNS 解锁通过中间服务器转发特定域名流量，成本更低、覆盖广，但偶尔会因上游解锁机波动而短暂失效。',
      },
      {
        q: '看 4K 流媒体需要多少带宽？',
        a: 'Netflix 与 YouTube 4K 60fps 视频码率通常在 15–35 Mbps 之间，建议节点晚高峰单线程实测速度稳定在 50 Mbps 以上，才能保证拖动进度条秒开无缓冲。',
      },
    ],
  },
  {
    slug: 'ai-tools-network',
    code: 'TOPIC 03',
    title: 'AI 工具（ChatGPT / Claude / Gemini）网络优化专题',
    shortTitle: 'AI 工具网络',
    description:
      '针对 ChatGPT、Claude、Gemini、Cursor 等 AI 生产力工具的地区限制、风控降智与 Cloudflare 人机验证问题，提供节点选择、分流策略与 IP 纯净度检测方案。',
    targetKeyword: 'ChatGPT机场推荐',
    secondaryKeywords: ['Claude节点选择', 'Gemini可用节点', 'AI工具防风控', '纯净IP机场'],
    accent: '#fbbf24',
    relatedArticleSlugs: ['ai-tools-network-optimization', 'clash-singbox-routing-guide', 'streaming-unlock-native-ip'],
    faq: [
      {
        q: '为什么用部分机场访问 ChatGPT 或 Claude 会频繁弹验证码甚至降智？',
        a: '核心原因是共享落地 IP 并发请求过高、IP 欺诈分（Fraud Score）偏高或被识别为数据中心机房段。选择提供纯净落地、家宽/双 ISP 出口或支持固定独立节点的线路可大幅缓解。',
      },
      {
        q: '使用 AI 编程工具（如 Cursor）时应该怎么配置分流？',
        a: '建议在 Clash Mihomo 或 Sing-box 中为 OpenAI、Anthropic、Google AI 域名建立独立策略组，固定指向单一低风控地区（如美国、新加坡或日本纯净节点），避免自动测速频繁切换 IP 触发账号风控。',
      },
    ],
  },
  {
    slug: 'protocols',
    code: 'TOPIC 04',
    title: '代理协议演进与客户端实战专题',
    shortTitle: '协议与客户端',
    description:
      '深度对比 Shadowsocks、Trojan、VMess、VLESS Reality、Hysteria2 等主流加密传输协议的性能与抗干扰特性，并提供 Clash Verge Rev、Sing-box、Shadowrocket 配置思路。',
    targetKeyword: '代理协议对比',
    secondaryKeywords: ['Hysteria2协议', 'VLESS Reality', 'Clash配置教程', 'Sing-box分流'],
    accent: '#fb7185',
    relatedArticleSlugs: ['clash-singbox-routing-guide', 'relay-vs-direct-lines', 'airport-selection-framework'],
    faq: [
      {
        q: '2026 年普通用户应该优先选择哪种客户端？',
        a: 'Windows/macOS 桌面端推荐使用 Clash Verge Rev（基于 Mihomo 内核）或 Sing-box 衍生客户端；iOS 端推荐 Shadowrocket 或 Stash；Android 端推荐 Clash Meta for Android（FlClash）或 NekoBox。',
      },
      {
        q: 'Hysteria2 速度快，为什么不是所有专线机场都默认采用？',
        a: 'Hysteria2 基于 UDP/QUIC，在丢包严重的公网直连环境下加速效果极佳；但在部分运营商对 UDP 限速（QoS）的网络环境中可能表现不稳定，而 IEPL 专线本身丢包极低，传统 Shadowsocks/Trojan 往往更稳。',
      },
    ],
  },
  {
    slug: 'routing-lines',
    code: 'TOPIC 05',
    title: '中转、直连、CN2 GIA 与 BGP 线路解析',
    shortTitle: '线路架构解析',
    description:
      '从国内入口机房到海外落地节点，彻底理清公网直连、CN2 GIA、国内 BGP 中转与跨境专线的成本结构与适用场景，避免为虚假营销概念买单。',
    targetKeyword: '中转机场与直连区别',
    secondaryKeywords: ['CN2 GIA线路', 'BGP中转', '机场线路类型', '按量付费机场'],
    accent: '#a78bfa',
    relatedArticleSlugs: ['relay-vs-direct-lines', 'iepl-iplc-line-guide', 'pricing-value-calculator-guide'],
    faq: [
      {
        q: '直连机场一定不好用吗？',
        a: '并非绝对。如果是优质优化线路（如电信 CN2 GIA、联通 9929、移动 CMIN2），直连在对应运营商宽带下也能获得极低延迟；但普通 163 骨干网直连在晚高峰极易拥堵丢包。',
      },
      {
        q: '为什么同一家机场，电信、联通、移动用户的体感差距很大？',
        a: '因为国内三大运营商的国际出口与省际互联策略不同。拥有三线 BGP 入口的中转或专线机场能为不同宽带用户自动分配最优入口，从而显著缩小体验差异。',
      },
    ],
  },
];

export function getTopicBySlug(slug: string): TopicHub | undefined {
  return TOPIC_HUBS.find((t) => t.slug === slug);
}
