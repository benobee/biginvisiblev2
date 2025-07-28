import { Color3, Vector3 } from '@babylonjs/core';

export interface TouchPoint {
  id: string;
  name: string;
  description: string;
  position?: Vector3;
  color: Color3;
  size: number;
  glow: number;
  type: 'service' | 'feature';
  parentId?: string;
  connections?: string[];
}

export interface ServiceConstellation {
  id: string;
  name: string;
  description: string;
  color: Color3;
  icon?: string;
  touchPoints: TouchPoint[];
}

// Service colors matching the brand
const colors = {
  brandStrategy: new Color3(0.25, 0.5, 1),      // #4080ff
  visualIdentity: new Color3(1, 0.25, 0.5),     // #ff4080
  digitalExperience: new Color3(0.25, 1, 0.5),  // #40ff80
  contentStrategy: new Color3(1, 0.5, 0.25),    // #ff8040
  brandArchitecture: new Color3(0.5, 0.25, 1),  // #8040ff
  communityBuilding: new Color3(1, 1, 0.25),    // #ffff40
};

export const serviceConstellations: ServiceConstellation[] = [
  {
    id: 'brand-strategy',
    name: 'Brand Strategy',
    description: 'Develop a clear, compelling brand strategy that differentiates your business',
    color: colors.brandStrategy,
    touchPoints: [
      {
        id: 'brand-strategy-main',
        name: 'Brand Strategy',
        description: 'Core brand strategy development',
        color: colors.brandStrategy,
        size: 1.0,
        glow: 0.8,
        type: 'service',
        connections: ['brand-positioning', 'audience-research', 'competitive-analysis', 'brand-messaging']
      },
      {
        id: 'brand-positioning',
        name: 'Brand Positioning',
        description: 'Define your unique market position and value proposition',
        color: colors.brandStrategy,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'brand-strategy-main'
      },
      {
        id: 'audience-research',
        name: 'Audience Research',
        description: 'Deep dive into understanding your customers\' needs and behaviors',
        color: colors.brandStrategy,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'brand-strategy-main'
      },
      {
        id: 'competitive-analysis',
        name: 'Competitive Analysis',
        description: 'Comprehensive analysis of your competitive landscape',
        color: colors.brandStrategy,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'brand-strategy-main'
      },
      {
        id: 'brand-messaging',
        name: 'Brand Messaging',
        description: 'Craft compelling, consistent messaging across all touchpoints',
        color: colors.brandStrategy,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'brand-strategy-main'
      }
    ]
  },
  {
    id: 'visual-identity',
    name: 'Visual Identity',
    description: 'Create a cohesive visual system that communicates your brand\'s personality',
    color: colors.visualIdentity,
    touchPoints: [
      {
        id: 'visual-identity-main',
        name: 'Visual Identity',
        description: 'Comprehensive visual brand system',
        color: colors.visualIdentity,
        size: 1.0,
        glow: 0.8,
        type: 'service',
        connections: ['logo-design', 'color-palette', 'typography-system', 'brand-guidelines']
      },
      {
        id: 'logo-design',
        name: 'Logo Design',
        description: 'Create distinctive, memorable logos that capture your brand essence',
        color: colors.visualIdentity,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'visual-identity-main'
      },
      {
        id: 'color-palette',
        name: 'Color Palette',
        description: 'Develop strategic color systems that evoke the right emotions',
        color: colors.visualIdentity,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'visual-identity-main'
      },
      {
        id: 'typography-system',
        name: 'Typography System',
        description: 'Select and customize typography that reinforces your brand',
        color: colors.visualIdentity,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'visual-identity-main'
      },
      {
        id: 'brand-guidelines',
        name: 'Brand Guidelines',
        description: 'Comprehensive style guides for consistent implementation',
        color: colors.visualIdentity,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'visual-identity-main'
      }
    ]
  },
  {
    id: 'digital-experience',
    name: 'Digital Experience',
    description: 'Design intuitive, engaging digital experiences that strengthen your brand',
    color: colors.digitalExperience,
    touchPoints: [
      {
        id: 'digital-experience-main',
        name: 'Digital Experience',
        description: 'End-to-end digital experience design',
        color: colors.digitalExperience,
        size: 1.0,
        glow: 0.8,
        type: 'service',
        connections: ['website-design', 'user-experience', 'user-interface', 'digital-strategy']
      },
      {
        id: 'website-design',
        name: 'Website Design',
        description: 'Create stunning, responsive websites that convert',
        color: colors.digitalExperience,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'digital-experience-main'
      },
      {
        id: 'user-experience',
        name: 'User Experience (UX)',
        description: 'Design intuitive user journeys that delight',
        color: colors.digitalExperience,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'digital-experience-main'
      },
      {
        id: 'user-interface',
        name: 'User Interface (UI)',
        description: 'Craft beautiful, functional interfaces',
        color: colors.digitalExperience,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'digital-experience-main'
      },
      {
        id: 'digital-strategy',
        name: 'Digital Strategy',
        description: 'Develop comprehensive digital strategies aligned with goals',
        color: colors.digitalExperience,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'digital-experience-main'
      }
    ]
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy',
    description: 'Develop content that tells your brand story and engages your audience',
    color: colors.contentStrategy,
    touchPoints: [
      {
        id: 'content-strategy-main',
        name: 'Content Strategy',
        description: 'Strategic content planning and execution',
        color: colors.contentStrategy,
        size: 1.0,
        glow: 0.8,
        type: 'service',
        connections: ['content-planning', 'storytelling', 'content-creation', 'content-distribution']
      },
      {
        id: 'content-planning',
        name: 'Content Planning',
        description: 'Develop strategic content plans aligned with business goals',
        color: colors.contentStrategy,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'content-strategy-main'
      },
      {
        id: 'storytelling',
        name: 'Storytelling',
        description: 'Craft compelling brand narratives that resonate',
        color: colors.contentStrategy,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'content-strategy-main'
      },
      {
        id: 'content-creation',
        name: 'Content Creation',
        description: 'Produce high-quality content across formats',
        color: colors.contentStrategy,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'content-strategy-main'
      },
      {
        id: 'content-distribution',
        name: 'Content Distribution',
        description: 'Optimize content distribution strategies',
        color: colors.contentStrategy,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'content-strategy-main'
      }
    ]
  },
  {
    id: 'brand-architecture',
    name: 'Brand Architecture',
    description: 'Structure your brand portfolio to maximize clarity and impact',
    color: colors.brandArchitecture,
    touchPoints: [
      {
        id: 'brand-architecture-main',
        name: 'Brand Architecture',
        description: 'Strategic brand portfolio management',
        color: colors.brandArchitecture,
        size: 1.0,
        glow: 0.8,
        type: 'service',
        connections: ['brand-hierarchy', 'sub-brand-strategy', 'brand-extensions', 'portfolio-management']
      },
      {
        id: 'brand-hierarchy',
        name: 'Brand Hierarchy',
        description: 'Design clear brand hierarchies and relationships',
        color: colors.brandArchitecture,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'brand-architecture-main'
      },
      {
        id: 'sub-brand-strategy',
        name: 'Sub-brand Strategy',
        description: 'Develop strategies for sub-brands that maintain connection',
        color: colors.brandArchitecture,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'brand-architecture-main'
      },
      {
        id: 'brand-extensions',
        name: 'Brand Extensions',
        description: 'Plan strategic brand extensions leveraging equity',
        color: colors.brandArchitecture,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'brand-architecture-main'
      },
      {
        id: 'portfolio-management',
        name: 'Portfolio Management',
        description: 'Create systems for managing your entire brand portfolio',
        color: colors.brandArchitecture,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'brand-architecture-main'
      }
    ]
  },
  {
    id: 'community-building',
    name: 'Community Building',
    description: 'Build and nurture communities around your brand',
    color: colors.communityBuilding,
    touchPoints: [
      {
        id: 'community-building-main',
        name: 'Community Building',
        description: 'Strategic community development and engagement',
        color: colors.communityBuilding,
        size: 1.0,
        glow: 0.8,
        type: 'service',
        connections: ['community-strategy', 'engagement-programs', 'ambassador-programs', 'community-events']
      },
      {
        id: 'community-strategy',
        name: 'Community Strategy',
        description: 'Develop strategies for building authentic communities',
        color: colors.communityBuilding,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'community-building-main'
      },
      {
        id: 'engagement-programs',
        name: 'Engagement Programs',
        description: 'Create programs that encourage active participation',
        color: colors.communityBuilding,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'community-building-main'
      },
      {
        id: 'ambassador-programs',
        name: 'Ambassador Programs',
        description: 'Identify and nurture brand ambassadors',
        color: colors.communityBuilding,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'community-building-main'
      },
      {
        id: 'community-events',
        name: 'Community Events',
        description: 'Plan events that bring your community together',
        color: colors.communityBuilding,
        size: 0.4,
        glow: 0.5,
        type: 'feature',
        parentId: 'community-building-main'
      }
    ]
  }
];

// Helper function to get all service touch points
export const getAllServiceTouchPoints = (): TouchPoint[] => {
  return serviceConstellations.flatMap(constellation => 
    constellation.touchPoints.filter(tp => tp.type === 'service')
  );
};

// Helper function to get all feature touch points for a service
export const getFeatureTouchPoints = (serviceId: string): TouchPoint[] => {
  const constellation = serviceConstellations.find(c => c.id === serviceId);
  return constellation ? constellation.touchPoints.filter(tp => tp.type === 'feature') : [];
};

// Calculate positions for circular layout
export const calculateConstellationPositions = (
  services: TouchPoint[], 
  radius: number = 5,
  centerY: number = 0
): TouchPoint[] => {
  const angleStep = (Math.PI * 2) / services.length;
  
  return services.map((service, index) => {
    const angle = index * angleStep;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    return {
      ...service,
      position: new Vector3(x, centerY, z)
    };
  });
};

// Calculate feature positions around a service
export const calculateFeaturePositions = (
  features: TouchPoint[], 
  servicePosition: Vector3,
  radius: number = 2
): TouchPoint[] => {
  const angleStep = (Math.PI * 2) / features.length;
  const tilt = Math.PI / 6; // 30 degree tilt
  
  return features.map((feature, index) => {
    const angle = index * angleStep;
    const x = servicePosition.x + Math.cos(angle) * radius;
    const y = servicePosition.y + Math.sin(angle) * radius * Math.sin(tilt);
    const z = servicePosition.z + Math.sin(angle) * radius * Math.cos(tilt);
    
    return {
      ...feature,
      position: new Vector3(x, y, z)
    };
  });
};