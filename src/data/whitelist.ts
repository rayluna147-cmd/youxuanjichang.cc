export interface BrandPlan {
  id: string;
  brandSlug: string;
  name: string;
  billingCycle: 'monthly' | 'quarterly' | 'semiannual' | 'annual' | 'onetime';
  priceCny: number;
  trafficGb: number;
  speedLimitMbps: number | null;
  deviceLimit: number | null;
  lineType: 'IEPL' | 'IPLC' | '中转' | '直连' | '混合';
  multiplierNote: string;
  affiliateUrl: string;
  couponCode?: string;
}

export interface AuthorizedBrand {
  rank: number;
  slug: string;
  name: string;
  enName: string;
  tagline: string;
  rankReason: string;
  status: 'verified' | 'monitoring';
  protocols: string[];
  lineTypes: Array<'IEPL' | 'IPLC' | '中转' | '直连' | '混合'>;
  regions: string[];
  unlocks: string[];
  affiliateUrl: string;
  inviteCode?: string;
  couponCode?: string;
  pros: string[];
  cons: string[];
  source: string;
  updatedAt: string;
  reviewSlug: string;
  accentColor: string;
  plans: BrandPlan[];
}

/**
 * 优选机场独立品牌白名单（BRAND WHITELIST）
 * 严格按项目所有者授权资料与指定排名顺序录入（第 1 至第 6 名）
 */
export const AUTHORIZED_BRANDS: AuthorizedBrand[] = [
  {
    rank: 1,
    slug: 'guangnianti',
    name: '光年梯',
    enName: 'GUANGNIANTI',
    tagline: '综合排名第 1 · ¥18/月 120GB，全场每 100GB 单价最低的主力首选',
    rankReason:
      '在 6 家白名单品牌中，光年梯以打折前 18 元/月提供 120GB 流量（折合每 100GB 仅 15 元），叠加优惠码 GNT80 后门槛更低，是流量充裕度与价格平衡最好的综合第一名。',
    status: 'verified',
    protocols: ['Clash', 'Sing-box', 'Shadowrocket'],
    lineTypes: ['混合'],
    regions: ['香港', '日本', '新加坡', '台湾', '美国'],
    unlocks: ['主流流媒体', 'AI 生产力工具'],
    affiliateUrl: 'https://gnt001.gntvipaff.cc/#/?code=FRrxGbbY',
    inviteCode: 'FRrxGbbY',
    couponCode: 'GNT80',
    pros: [
      '打折前 ¥18/月含 120GB 流量，折算每 100GB 仅 ¥15，全场性价比最高',
      '支持专属优惠码 GNT80，首购与续费成本进一步降低',
      '120GB 月流量足以覆盖日常办公、AI 工具与轻中度视频需求，不必月底省着用',
    ],
    cons: [
      '对于每月只用 20–30GB 的极轻度用户，120GB 会有一定流量富余',
      '首次使用仍建议先月付体验自家宽带晚高峰表现，再决定是否长期续费',
    ],
    source: '项目所有者 2026-11-27 授权白名单资料',
    updatedAt: '2026-11-27',
    reviewSlug: 'guangnianti',
    accentColor: '#38bdf8',
    plans: [
      {
        id: 'gnt-120g',
        brandSlug: 'guangnianti',
        name: '基础月付 120GB 套餐',
        billingCycle: 'monthly',
        priceCny: 18,
        trafficGb: 120,
        speedLimitMbps: null,
        deviceLimit: null,
        lineType: '混合',
        multiplierNote: '打折前 ¥18/月 · 优惠码 GNT80',
        affiliateUrl: 'https://gnt001.gntvipaff.cc/#/?code=FRrxGbbY',
        couponCode: 'GNT80',
      },
    ],
  },
  {
    rank: 2,
    slug: 'jilianyun',
    name: '极连云',
    enName: 'JILIANYUN',
    tagline: '综合排名第 2 · ¥18/月 100GB，18 元主力档的稳健第二选择',
    rankReason:
      '极连云同样定在 18 元/月的甜点价位，提供 100GB 月流量（折合每 100GB 为 18 元），仅比第一名光年梯少 20GB，配合优惠码 JLY888 后非常适合作为主力或双线搭配。',
    status: 'verified',
    protocols: ['Clash', 'Sing-box', 'Shadowrocket'],
    lineTypes: ['混合'],
    regions: ['香港', '日本', '新加坡', '台湾', '美国'],
    unlocks: ['主流流媒体', 'AI 生产力工具'],
    affiliateUrl: 'https://haozevpn02.jlyvipaff.com/#/?code=6aTAi9bW',
    inviteCode: '6aTAi9bW',
    couponCode: 'JLY888',
    pros: [
      '打折前 ¥18/月含 100GB，处于多数用户最易接受的主力月付预算带',
      '可使用专属优惠码 JLY888 降低入手成本',
      '100GB 整额流量适合日常查阅资料、AI 编程与多端同步',
    ],
    cons: [
      '同为 18 元档，标称流量比光年梯少 20GB，每 100GB 单价略高 ¥3',
      '大流量 4K 重度观影用户需注意月底流量余量',
    ],
    source: '项目所有者 2026-11-27 授权白名单资料',
    updatedAt: '2026-11-27',
    reviewSlug: 'jilianyun',
    accentColor: '#34d399',
    plans: [
      {
        id: 'jly-100g',
        brandSlug: 'jilianyun',
        name: '标准月付 100GB 套餐',
        billingCycle: 'monthly',
        priceCny: 18,
        trafficGb: 100,
        speedLimitMbps: null,
        deviceLimit: null,
        lineType: '混合',
        multiplierNote: '打折前 ¥18/月 · 优惠码 JLY888',
        affiliateUrl: 'https://haozevpn02.jlyvipaff.com/#/?code=6aTAi9bW',
        couponCode: 'JLY888',
      },
    ],
  },
  {
    rank: 3,
    slug: 'kuaili',
    name: '快狸',
    enName: 'KUAILI',
    tagline: '综合排名第 3 · ¥15/月 50GB，轻量入门与日常办公的高顺手之选',
    rankReason:
      '快狸卡在 15 元/月 50GB 的轻量入门档，叠加优惠码 kl888 后门槛极低；虽然每 GB 单价不如 18 元档，但对月消耗不到 50GB 的学生党与轻度办公人群非常友好，排在第三位。',
    status: 'verified',
    protocols: ['Clash', 'Sing-box', 'Shadowrocket'],
    lineTypes: ['混合'],
    regions: ['香港', '日本', '新加坡', '美国'],
    unlocks: ['主流流媒体', 'AI 生产力工具'],
    affiliateUrl: 'https://aolaiyun01.kuailiaff.com/#/?code=AFR8PsiY',
    inviteCode: 'AFR8PsiY',
    couponCode: 'kl888',
    pros: [
      '打折前仅 ¥15/月，配合优惠码 kl888 试错成本非常低',
      '50GB 流量刚好覆盖文字检索、AI 对话与日常邮件/文档需求',
      '适合作为第二条备用线路，避免单点故障',
    ],
    cons: [
      '折算每 100GB 为 ¥30，如果月流量经常超过 60GB，不如直接加 3 元上光年梯或极连云',
      '不适合高频观看 4K 长视频或大文件下载',
    ],
    source: '项目所有者 2026-11-27 授权白名单资料',
    updatedAt: '2026-11-27',
    reviewSlug: 'kuaili',
    accentColor: '#fbbf24',
    plans: [
      {
        id: 'kl-50g',
        brandSlug: 'kuaili',
        name: '轻量月付 50GB 套餐',
        billingCycle: 'monthly',
        priceCny: 15,
        trafficGb: 50,
        speedLimitMbps: null,
        deviceLimit: null,
        lineType: '混合',
        multiplierNote: '打折前 ¥15/月 · 优惠码 kl888',
        affiliateUrl: 'https://aolaiyun01.kuailiaff.com/#/?code=AFR8PsiY',
        couponCode: 'kl888',
      },
    ],
  },
  {
    rank: 4,
    slug: 'sujie',
    name: '速界',
    enName: 'SUJIE',
    tagline: '综合排名第 4 · ¥15/月 50GB，15 元入门档的平行备选方案',
    rankReason:
      '速界与快狸同处 15 元/月 50GB 价位带，配合优惠码 sujie888 同样主打低门槛轻度使用；在 15 元档中作为快狸之后的平行备选，位列第四。',
    status: 'verified',
    protocols: ['Clash', 'Sing-box', 'Shadowrocket'],
    lineTypes: ['混合'],
    regions: ['香港', '日本', '新加坡', '美国'],
    unlocks: ['主流流媒体', 'AI 生产力工具'],
    affiliateUrl: 'https://pygllc.speedworldaff.cc/#/?code=7s0EsI7w',
    inviteCode: '7s0EsI7w',
    couponCode: 'sujie888',
    pros: [
      '打折前 ¥15/月 50GB，搭配优惠码 sujie888 入门无压力',
      '适合轻度查资料、移动端日常使用或作为主力之外的备份线',
    ],
    cons: [
      '50GB 流量上限对视频用户偏紧，单 GB 成本高于 18 元 100G/120G 档',
      '与快狸同价同量，建议按自身宽带实际连通表现择优留存',
    ],
    source: '项目所有者 2026-11-27 授权白名单资料',
    updatedAt: '2026-11-27',
    reviewSlug: 'sujie',
    accentColor: '#fb7185',
    plans: [
      {
        id: 'sj-50g',
        brandSlug: 'sujie',
        name: '入门月付 50GB 套餐',
        billingCycle: 'monthly',
        priceCny: 15,
        trafficGb: 50,
        speedLimitMbps: null,
        deviceLimit: null,
        lineType: '混合',
        multiplierNote: '打折前 ¥15/月 · 优惠码 sujie888',
        affiliateUrl: 'https://pygllc.speedworldaff.cc/#/?code=7s0EsI7w',
        couponCode: 'sujie888',
      },
    ],
  },
  {
    rank: 5,
    slug: 'bianyuan',
    name: '边缘节点',
    enName: 'EDGENOVA',
    tagline: '综合排名第 5 · ¥25/月 100GB，偏重预算充足用户的 100GB 档方案',
    rankReason:
      '边缘节点提供 100GB 月流量，但打折前月费 25 元，在 6 家品牌中绝对价格最高（比同为 100GB 的极连云贵 7 元，比 120GB 的光年梯贵 7 元），因此性价比排序位于第五。',
    status: 'verified',
    protocols: ['Clash', 'Sing-box', 'Shadowrocket'],
    lineTypes: ['混合'],
    regions: ['香港', '日本', '新加坡', '美国'],
    unlocks: ['主流流媒体', 'AI 生产力工具'],
    affiliateUrl: 'https://wep.edgenovaaff.com/#/?code=4wmwcLDL',
    inviteCode: '4wmwcLDL',
    couponCode: 'xk808',
    pros: [
      '100GB 月流量足够覆盖常规工作与娱乐需求',
      '提供专属优惠码 xk808，折后可一定程度缩小与 18 元档的价差',
    ],
    cons: [
      '打折前 ¥25/月 100GB，每 100GB 单价 ¥25，明显高于光年梯（¥15）和极连云（¥18）',
      '更适合预算相对宽裕、想多备一条不同上游线路的用户',
    ],
    source: '项目所有者 2026-11-27 授权白名单资料',
    updatedAt: '2026-11-27',
    reviewSlug: 'bianyuan',
    accentColor: '#a78bfa',
    plans: [
      {
        id: 'by-100g',
        brandSlug: 'bianyuan',
        name: '标准月付 100GB 套餐',
        billingCycle: 'monthly',
        priceCny: 25,
        trafficGb: 100,
        speedLimitMbps: null,
        deviceLimit: null,
        lineType: '混合',
        multiplierNote: '打折前 ¥25/月 · 优惠码 xk808',
        affiliateUrl: 'https://wep.edgenovaaff.com/#/?code=4wmwcLDL',
        couponCode: 'xk808',
      },
    ],
  },
  {
    rank: 6,
    slug: 'kexinyun',
    name: '可信云',
    enName: 'KEXINYUN',
    tagline: '综合排名第 6 · ¥15/月 60GB，低门槛 60GB 备选档',
    rankReason:
      '可信云定价 15 元/月 60GB（叠加优惠码 kxy80），在 15 元档中比快狸和速界多出 10GB 流量；按整体主推优先级与综合排序安排在第 6 位，适合作为低成本备用补充。',
    status: 'verified',
    protocols: ['Clash', 'Sing-box', 'Shadowrocket'],
    lineTypes: ['混合'],
    regions: ['香港', '日本', '新加坡', '美国'],
    unlocks: ['主流流媒体', 'AI 生产力工具'],
    affiliateUrl: 'https://everett7623.kosingaff.com//#/?code=4PQnpXx6',
    inviteCode: '4PQnpXx6',
    couponCode: 'kxy80',
    pros: [
      '打折前 ¥15/月提供 60GB 流量，折合每 100GB 为 ¥25，在 15 元档里流量略宽裕',
      '支持优惠码 kxy80，适合轻度用户低成本试水或做应急备用',
    ],
    cons: [
      '60GB 流量上限仍偏轻量，若日常流量接近 100GB，加 3 元选光年梯或极连云更划算',
      '在本次 6 家综合排序中作为第 6 顺位备选',
    ],
    source: '项目所有者 2026-11-27 授权白名单资料',
    updatedAt: '2026-11-27',
    reviewSlug: 'kexinyun',
    accentColor: '#38bdf8',
    plans: [
      {
        id: 'kxy-60g',
        brandSlug: 'kexinyun',
        name: '轻量月付 60GB 套餐',
        billingCycle: 'monthly',
        priceCny: 15,
        trafficGb: 60,
        speedLimitMbps: null,
        deviceLimit: null,
        lineType: '混合',
        multiplierNote: '打折前 ¥15/月 · 优惠码 kxy80',
        affiliateUrl: 'https://everett7623.kosingaff.com//#/?code=4PQnpXx6',
        couponCode: 'kxy80',
      },
    ],
  },
];

export const WHITELIST_META = {
  policyVersion: '2026.1',
  lastAuditedAt: '2026-11-27',
  totalAuthorized: AUTHORIZED_BRANDS.length,
  strictNoFabrication: true,
  intakeDocPath: '/about/#whitelist-standard',
} as const;
