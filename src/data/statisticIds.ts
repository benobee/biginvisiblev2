/**
 * Statistic ID Constants
 * This file contains all the statistic IDs used across the application
 * for consistent referencing and to prevent typos when referencing statistics.
 * 
 * Generated from: brandingStatistics.ts
 * Total IDs: 72
 */

export const STATISTIC_IDS = {
  // AI and Technology
  AI_PLATFORM_USAGE: 'ai-platform-usage',
  AI_SHOPPING_USAGE: 'ai-shopping-usage',

  // Audio Branding
  AUDIO_BRANDING_RECALL_INCREASE: 'audio-branding-recall-increase',
  SONIC_BRANDING_PURCHASE_INTENT: 'sonic-branding-purchase-intent',
  SOUND_JINGLE_VALUE: 'sound-jingle-value',
  SOUND_LOGO_RECOGNITION_SPEED: 'sound-logo-recognition-speed',

  // Authenticity and Values
  AUTHENTICITY_IMPORTANCE: 'authenticity-importance',
  CONSUMERS_EXPECT_BRAND_SOCIAL_STANCE: 'consumers-expect-brand-social-stance',
  CULTURAL_AUTHENTICITY: 'cultural-authenticity',
  SUSTAINABLE_PRODUCT_PREMIUM_WILLINGNESS: 'sustainable-product-premium-willingness',

  // B2B Marketing
  B2B_BRAND_AWARENESS: 'b2b-brand-awareness',
  B2B_BRAND_GROWTH: 'b2b-brand-growth',
  B2B_BRANDED_CONTENT: 'b2b-branded-content',
  B2B_PERSONAL_VALUES: 'b2b-personal-values',
  B2C_PURPOSE_DRIVEN: 'b2c-purpose-driven',

  // Brand Consistency
  BRAND_CONSISTENCY_REVENUE_BOOST: 'brand-consistency-revenue-boost',
  BRAND_CONSISTENCY_REVENUE_IMPACT: 'brand-consistency-revenue-impact',
  BRAND_CONSISTENCY_VISIBILITY_INCREASE: 'brand-consistency-visibility-increase',
  CONSISTENT_BRANDING_REVENUE: 'consistent-branding-revenue',
  CONSISTENT_MESSAGING: 'consistent-messaging',
  CONSISTENT_PRESENTATION_GROWTH: 'consistent-presentation-growth',

  // Brand Recognition and Names
  BRAND_NAME_PURCHASE_FACTOR: 'brand-name-purchase-factor',
  BRAND_RECOGNITION_IMPORTANCE: 'brand-recognition-importance',
  BRAND_RECOGNITION_PURCHASE: 'brand-recognition-purchase',
  FAMILIAR_BRAND_PREFERENCE: 'familiar-brand-preference',
  FAMILIAR_BRANDS: 'familiar-brands',

  // Brand Strategy and Guidelines
  BRAND_GUIDELINES: 'brand-guidelines',
  BRANDING_BUDGET: 'branding-budget',
  PURPOSE_DRIVEN_BRAND_GROWTH_ADVANTAGE: 'purpose-driven-brand-growth-advantage',

  // Color Psychology
  COLOR_BRAND_RECOGNITION_INCREASE: 'color-brand-recognition-increase',
  COLOR_READING_COMPREHENSION_IMPROVEMENT: 'color-reading-comprehension-improvement',
  COLORS_BRAND_VISIBILITY: 'colors-brand-visibility',
  SIGNATURE_COLOR_RECALL_ASSOCIATION: 'signature-color-recall-association',

  // Content Marketing
  BLOG_LEADS: 'blog-leads',
  EMAIL_MARKETING: 'email-marketing',
  PERSONALIZED_MARKETING: 'personalized-marketing',
  USER_GENERATED_CONTENT: 'user-generated-content',

  // Employee and Corporate Reputation
  BAD_REPUTATION_REJECTION: 'bad-reputation-rejection',
  CEO_REPUTATION: 'ceo-reputation',
  EMPLOYEE_BRAND_INFLUENCE: 'employee-brand-influence',
  EMPLOYER_BRANDING_ADVANTAGE: 'employer-branding-advantage',
  PERSONAL_BRAND_RESUME: 'personal-brand-resume',
  REPUTATION_BEFORE_APPLYING: 'reputation-before-applying',

  // Experiential Marketing
  EXPERIENTIAL_MARKETING_INVESTMENT_GROWTH: 'experiential-marketing-investment-growth',
  VIRTUAL_EVENTS: 'virtual-events',

  // Logo and Visual Identity
  FORTUNE_500_LOGOS: 'fortune-500-logos',
  LOGO_RECOGNITION: 'logo-recognition',
  NON_DESCRIPTIVE_LOGOS: 'non-descriptive-logos',
  SMELL_BRAND_MEMORY: 'smell-brand-memory',

  // Loyalty and Customer Retention
  LOYALTY_PROGRAMS: 'loyalty-programs',
  TRUST_LOYALTY: 'trust-loyalty',

  // Marketing Channels and Engagement
  INFLUENCER_CAMPAIGNS: 'influencer-campaigns',
  INFLUENCER_SPENDING: 'influencer-spending',
  MARKETING_ENGAGEMENT: 'marketing-engagement',

  // Regional and Cultural Trust
  DOMESTIC_BRAND_TRUST: 'domestic-brand-trust',
  DOMESTIC_PREFERENCE_CULTURAL_VARIATION: 'domestic-preference-cultural-variation',
  ECONOMIC_UNCERTAINTY_TRUST_GAPS: 'economic-uncertainty-trust-gaps',
  LOCAL_BRAND_TRUST_ADVANTAGES: 'local-brand-trust-advantages',

  // Social Media Marketing
  FACEBOOK_PRIMARY_PLATFORM_USAGE: 'facebook-primary-platform-usage',
  FACEBOOK_ROI_DRIVER: 'facebook-roi-driver',
  GENZ_DISCOVERY: 'genz-discovery',
  SOCIAL_MEDIA_FOLLOWING: 'social-media-following',
  SOCIAL_MEDIA_PURCHASE: 'social-media-purchase',
  SOCIAL_MEDIA_RECOGNITION: 'social-media-recognition',

  // Trust and Credibility
  BRAND_CREDIBILITY_ADVANTAGE: 'brand-credibility-advantage',
  BRAND_TRUST_VS_INSTITUTIONAL_TRUST: 'brand-trust-vs-institutional-trust',
  CONSUMER_BRAND_TRUST_GAP: 'consumer-brand-trust-gap',
  CONSUMER_TRUST_SHIFT_TRENDS: 'consumer-trust-shift-trends',
  TRUST_AS_DECIDING_FACTOR: 'trust-as-deciding-factor',
  TRUST_BRANDS_OVER_INSTITUTIONS: 'trust-brands-over-institutions',
  TRUST_PREMIUM: 'trust-premium',
  TRUST_RANKING_AMONG_FACTORS: 'trust-ranking-among-factors',
  TRUST_REQUIREMENT: 'trust-requirement',

  // Video Marketing
  VIDEO_ONLINE_CONFIDENCE_BOOST: 'video-online-confidence-boost',
  VIDEO_PURCHASE_CONVICTION: 'video-purchase-conviction',
  VIDEO_PURCHASE_LIKELIHOOD_INCREASE: 'video-purchase-likelihood-increase',

  // Website Design and User Experience
  WEBSITE_DESIGN_IMPORTANCE: 'website-design-importance',
  WEBSITE_DESIGN_RECOMMENDATION: 'website-design-recommendation'
} as const;

// Type for statistic IDs
export type StatisticId = typeof STATISTIC_IDS[keyof typeof STATISTIC_IDS];

// Array of all IDs for iteration
export const ALL_STATISTIC_IDS = Object.values(STATISTIC_IDS);

// Helper function to validate if an ID exists
export const isValidStatisticId = (id: string): id is StatisticId => {
  return ALL_STATISTIC_IDS.includes(id as StatisticId);
};

// Helper function to get statistic ID by constant name
export const getStatisticId = (constantName: keyof typeof STATISTIC_IDS): StatisticId => {
  return STATISTIC_IDS[constantName];
};