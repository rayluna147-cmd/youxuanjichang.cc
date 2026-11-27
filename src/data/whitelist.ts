export interface BrandPlan {
  id: string;
  brandSlug: string;
  name: string;
  billingCycle: 'monthly' | 'quarterly' | 'semiannual' | 'annual' | 'onetime';
  priceCny: number;
  trafficGb: number; // 0 表示不限流量（需注明倍率或限速）
  speedLimitMbps: number | null; // null 表示不限速
  deviceLimit: number | null; // null 表示不限设备
  lineType: 'IEPL' | 'IPLC' | '中转' | '直连' | '混合';
  multiplierNote: string;
  affiliateUrl: string;
  couponCode?: string;
}

export interface AuthorizedBrand {
  slug: string;
  name: string;
  enName: string;
  tagline: string;
  status: 'verified' | 'monitoring';
  foundedYear?: number;
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
 *
 * 严格原则：
 * 1. 仅允许项目所有者提供并明确授权的品牌进入商业推广系统。
 * 2. 严禁虚构套餐、测速数据、评分、成立年份或未经授权的推广链接。
 * 3. 当前项目初始化阶段尚未导入正式授权品牌资料，因此白名单保持为空数组。
 * 4. 后续只需在此数组录入真实授权品牌，并在 src/content/reviews/ 添加对应 >=2000 字评测 MDX，
 *    全站品牌展廊、品牌档案、套餐比较工作台与横向对比工具将自动激活对应数据。
 */
export const AUTHORIZED_BRANDS: AuthorizedBrand[] = [];

export const WHITELIST_META = {
  policyVersion: '2026.1',
  lastAuditedAt: '2026-11-27',
  totalAuthorized: AUTHORIZED_BRANDS.length,
  strictNoFabrication: true,
  intakeDocPath: '/about/#whitelist-standard',
} as const;
