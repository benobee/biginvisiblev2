export interface ServiceImpactStatistic {
  id: string;
  percentage: number;
  statement: string;
  source: string;
  serviceCategory: string;
  impactType: 'increase' | 'improvement' | 'boost' | 'growth';
}

export const serviceImpactStatistics: ServiceImpactStatistic[] = [
  // Brand Strategy Impact Stats
  {
    id: 'brand-strategy-revenue-increase',
    percentage: 23,
    statement: 'increase in revenue when businesses have a strong brand strategy',
    source: 'McKinsey Brand Study 2024',
    serviceCategory: 'brand-strategy',
    impactType: 'increase'
  },
  {
    id: 'brand-strategy-customer-loyalty',
    percentage: 37,
    statement: 'improvement in customer loyalty with strategic brand positioning',
    source: 'Harvard Business Review 2024',
    serviceCategory: 'brand-strategy',
    impactType: 'improvement'
  },
  {
    id: 'brand-strategy-market-share',
    percentage: 15,
    statement: 'growth in market share with consistent brand messaging',
    source: 'Brand Strategy Institute 2024',
    serviceCategory: 'brand-strategy',
    impactType: 'growth'
  },
  {
    id: 'brand-strategy-recognition',
    percentage: 42,
    statement: 'boost in brand recognition through strategic positioning',
    source: 'Nielsen Brand Impact Report 2024',
    serviceCategory: 'brand-strategy',
    impactType: 'boost'
  },

  // Visual Identity Impact Stats
  {
    id: 'visual-identity-brand-recall',
    percentage: 80,
    statement: 'increase in brand recall with consistent visual identity',
    source: 'Design Council Research 2024',
    serviceCategory: 'visual-identity',
    impactType: 'increase'
  },
  {
    id: 'visual-identity-customer-trust',
    percentage: 46,
    statement: 'improvement in customer trust with professional visual design',
    source: 'Trust & Design Study 2024',
    serviceCategory: 'visual-identity',
    impactType: 'improvement'
  },
  {
    id: 'visual-identity-purchase-intent',
    percentage: 33,
    statement: 'boost in purchase intent with strong visual branding',
    source: 'Visual Impact Research 2024',
    serviceCategory: 'visual-identity',
    impactType: 'boost'
  },
  {
    id: 'visual-identity-premium-pricing',
    percentage: 25,
    statement: 'increase in ability to charge premium prices with quality design',
    source: 'Premium Brand Study 2024',
    serviceCategory: 'visual-identity',
    impactType: 'increase'
  },

  // Digital Experience Impact Stats
  {
    id: 'digital-experience-conversion-rate',
    percentage: 57,
    statement: 'increase in conversion rates with optimized digital experiences',
    source: 'UX Conversion Study 2024',
    serviceCategory: 'digital-experience',
    impactType: 'increase'
  },
  {
    id: 'digital-experience-user-satisfaction',
    percentage: 68,
    statement: 'improvement in user satisfaction with professional UX design',
    source: 'Digital Experience Report 2024',
    serviceCategory: 'digital-experience',
    impactType: 'improvement'
  },
  {
    id: 'digital-experience-engagement',
    percentage: 45,
    statement: 'boost in user engagement with strategic digital design',
    source: 'Engagement Analytics 2024',
    serviceCategory: 'digital-experience',
    impactType: 'boost'
  },
  {
    id: 'digital-experience-retention',
    percentage: 39,
    statement: 'increase in customer retention through better digital experiences',
    source: 'Customer Retention Study 2024',
    serviceCategory: 'digital-experience',
    impactType: 'increase'
  },

  // Content Strategy Impact Stats
  {
    id: 'content-strategy-lead-generation',
    percentage: 67,
    statement: 'increase in lead generation with strategic content planning',
    source: 'Content Marketing Institute 2024',
    serviceCategory: 'content-strategy',
    impactType: 'increase'
  },
  {
    id: 'content-strategy-brand-awareness',
    percentage: 54,
    statement: 'boost in brand awareness through consistent content strategy',
    source: 'Brand Awareness Study 2024',
    serviceCategory: 'content-strategy',
    impactType: 'boost'
  },
  {
    id: 'content-strategy-engagement',
    percentage: 73,
    statement: 'improvement in audience engagement with quality content',
    source: 'Social Media Today 2024',
    serviceCategory: 'content-strategy',
    impactType: 'improvement'
  },
  {
    id: 'content-strategy-seo-performance',
    percentage: 89,
    statement: 'increase in organic search performance with content strategy',
    source: 'SEO Performance Report 2024',
    serviceCategory: 'content-strategy',
    impactType: 'increase'
  },

  // Brand Architecture Impact Stats
  {
    id: 'brand-architecture-portfolio-value',
    percentage: 31,
    statement: 'increase in portfolio value with strategic brand architecture',
    source: 'Brand Valuation Study 2024',
    serviceCategory: 'brand-architecture',
    impactType: 'increase'
  },
  {
    id: 'brand-architecture-market-clarity',
    percentage: 48,
    statement: 'improvement in market clarity with organized brand structure',
    source: 'Market Research Institute 2024',
    serviceCategory: 'brand-architecture',
    impactType: 'improvement'
  },
  {
    id: 'brand-architecture-cross-selling',
    percentage: 36,
    statement: 'boost in cross-selling opportunities through brand hierarchy',
    source: 'Cross-Selling Analytics 2024',
    serviceCategory: 'brand-architecture',
    impactType: 'boost'
  },
  {
    id: 'brand-architecture-operational-efficiency',
    percentage: 28,
    statement: 'increase in operational efficiency with structured brand systems',
    source: 'Operational Excellence Report 2024',
    serviceCategory: 'brand-architecture',
    impactType: 'increase'
  },

  // Community Building Impact Stats
  {
    id: 'community-building-customer-lifetime-value',
    percentage: 92,
    statement: 'increase in customer lifetime value through community engagement',
    source: 'Community Impact Study 2024',
    serviceCategory: 'community-building',
    impactType: 'increase'
  },
  {
    id: 'community-building-word-of-mouth',
    percentage: 74,
    statement: 'boost in word-of-mouth marketing through active communities',
    source: 'Referral Marketing Report 2024',
    serviceCategory: 'community-building',
    impactType: 'boost'
  },
  {
    id: 'community-building-brand-advocacy',
    percentage: 85,
    statement: 'improvement in brand advocacy with engaged community members',
    source: 'Brand Advocacy Research 2024',
    serviceCategory: 'community-building',
    impactType: 'improvement'
  },
  {
    id: 'community-building-retention-rate',
    percentage: 56,
    statement: 'increase in customer retention through community programs',
    source: 'Customer Retention Analytics 2024',
    serviceCategory: 'community-building',
    impactType: 'increase'
  }
];

// Helper functions to filter statistics by service category
export const getImpactStatisticsByService = (serviceCategory: string): ServiceImpactStatistic[] => {
  return serviceImpactStatistics.filter(stat => stat.serviceCategory === serviceCategory);
};

export const getRandomImpactStatistics = (count: number): ServiceImpactStatistic[] => {
  const shuffled = [...serviceImpactStatistics].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getImpactStatisticById = (id: string): ServiceImpactStatistic | undefined => {
  return serviceImpactStatistics.find(stat => stat.id === id);
};