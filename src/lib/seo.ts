import { SITE } from '../data/site';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildCanonical(pathname: string): string {
  const normalized = pathname.endsWith('/') || pathname.includes('.') ? pathname : `${pathname}/`;
  return new URL(normalized, SITE.url).toString();
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: [SITE.brandEn, SITE.brandShort],
    url: `${SITE.url}/`,
    inLanguage: 'zh-CN',
    description: SITE.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/favicon.svg`,
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : buildCanonical(item.url),
    })),
  };
}

export function buildArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    mainEntityOfPage: params.url,
    datePublished: params.publishedAt,
    dateModified: params.updatedAt,
    inLanguage: 'zh-CN',
    keywords: params.keywords?.join(', '),
    author: {
      '@type': 'Organization',
      name: SITE.author,
      url: `${SITE.url}/about/`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: `${SITE.url}/`,
    },
  };
}

export function buildFaqSchema(faq: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
