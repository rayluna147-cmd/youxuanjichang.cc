import { AUTHORIZED_BRANDS, type AuthorizedBrand, type BrandPlan } from './whitelist';

export function getAuthorizedBrands(): AuthorizedBrand[] {
  return AUTHORIZED_BRANDS;
}

export function getBrandBySlug(slug: string): AuthorizedBrand | undefined {
  return AUTHORIZED_BRANDS.find((b) => b.slug === slug);
}

export function getAllBrandPlans(): Array<BrandPlan & { brandName: string; brandAccent: string }> {
  return AUTHORIZED_BRANDS.flatMap((brand) =>
    brand.plans.map((plan) => ({
      ...plan,
      brandName: brand.name,
      brandAccent: brand.accentColor,
    }))
  );
}

/**
 * SPECTRUM 五维评估光谱体系（用于首页动态展廊、选型指南与品牌档案评测维度展示）
 */
export interface EvaluationDimension {
  id: string;
  code: string;
  title: string;
  enTitle: string;
  wavelength: string;
  accent: string;
  summary: string;
  metrics: string[];
}

export const SPECTRUM_DIMENSIONS: EvaluationDimension[] = [
  {
    id: 'routing',
    code: '01 / ROUTE',
    title: '跨境链路架构',
    enTitle: 'Cross-Border Routing',
    wavelength: '450nm · 钴蓝光谱',
    accent: '#38bdf8',
    summary: '甄别真实 IEPL/IPLC 内网专线、BGP 多线中转与普通公网直连，核验晚高峰丢包与路由抖动。',
    metrics: ['入口 BGP 运营商覆盖', '跨境过境方式', '晚高峰 20:00–23:00 稳定性', '路由回程追踪'],
  },
  {
    id: 'unlock',
    code: '02 / UNLOCK',
    title: '流媒体与原生 IP',
    enTitle: 'Streaming & Native IP',
    wavelength: '520nm · 翠绿光谱',
    accent: '#34d399',
    summary: '区分 DNS 解锁与真实原生/家宽 IP，覆盖 Netflix、Disney+、YouTube Premium 与地区限定库。',
    metrics: ['IP 欺诈分与 ASN 属性', 'Netflix 自制/非自制剧解锁', 'YouTube 4K 缓冲码率', '多地区节点覆盖'],
  },
  {
    id: 'ai-ready',
    code: '03 / AI-NET',
    title: 'AI 工具风控兼容',
    enTitle: 'AI & Developer Readiness',
    wavelength: '580nm · 琥珀光谱',
    accent: '#fbbf24',
    summary: '针对 ChatGPT、Claude、Gemini、Cursor 等高频开发工具，检测 IP 纯净度与降智/封号风险。',
    metrics: ['ChatGPT Web/App 可用性', 'Claude / Gemini 区域合规', 'Cloudflare 盾触发率', '固定落地 IP 选项'],
  },
  {
    id: 'protocol',
    code: '04 / PROTO',
    title: '协议栈与客户端生态',
    enTitle: 'Protocol & Client Stack',
    wavelength: '630nm · 绯红光谱',
    accent: '#fb7185',
    summary: '评估 Shadowsocks、Trojan、VMess/VLESS Reality、Hysteria2、AnyTLS 等现代协议支持度。',
    metrics: ['Clash Mihomo / Sing-box 托管', 'Shadowrocket 一键导入', 'UDP / Full-Cone 支持', '抗主动探测能力'],
  },
  {
    id: 'value',
    code: '05 / VALUE',
    title: '计费透明与性价比',
    enTitle: 'Pricing & Transparency',
    wavelength: '410nm · 极光紫谱',
    accent: '#a78bfa',
    summary: '统一折算每 100GB 单价、节点倍率规则、设备数限制与按量/月付灵活性，杜绝隐形限速。',
    metrics: ['每 100GB 折算成本', '节点倍率透明度', '审计规则与隐私条款', '工单响应与售后保障'],
  },
];

/**
 * 市场典型套餐模型（仅用于交互式预算测算器参考，明确标注为“行业参考模型”，非虚构品牌）
 */
export interface MarketModelTier {
  id: string;
  label: string;
  lineType: '直连' | '中转' | 'IEPL';
  typicalPriceRange: [number, number];
  typicalTrafficGb: number;
  targetUse: string;
  notes: string;
}

export const MARKET_MODEL_TIERS: MarketModelTier[] = [
  {
    id: 'entry-relay',
    label: '轻量中转参考模型',
    lineType: '中转',
    typicalPriceRange: [15, 25],
    typicalTrafficGb: 100,
    targetUse: '日常检索、轻度查阅文档、移动端备选',
    notes: '适合月流量 50–100GB 的轻度用户，晚高峰可能存在轻微波动。',
  },
  {
    id: 'mainstream-iepl',
    label: '主流 IEPL 专线参考模型',
    lineType: 'IEPL',
    typicalPriceRange: [28, 48],
    typicalTrafficGb: 200,
    targetUse: '全天候办公、AI 编程工具、4K 流媒体观看',
    notes: '兼顾低延迟与晚高峰稳定性，是多数高频用户的平衡区间。',
  },
  {
    id: 'heavy-iepl',
    label: '大流量专线参考模型',
    lineType: 'IEPL',
    typicalPriceRange: [60, 120],
    typicalTrafficGb: 500,
    targetUse: '多设备家庭共享、高频 4K/8K 视频、远程开发',
    notes: '需重点核验倍率规则、同时在线设备数限制与真实峰值带宽。',
  },
  {
    id: 'onetime-backup',
    label: '不限时按量备用模型',
    lineType: '中转',
    typicalPriceRange: [30, 80],
    typicalTrafficGb: 150,
    targetUse: '主力线路故障时的应急备用、低频跨区需求',
    notes: '按量付费不限时长，建议搭配主力月付方案分散单点故障风险。',
  },
];
