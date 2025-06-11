import { 
  BrandStrategyIcon, 
  VisualIdentityIcon, 
  DigitalExperienceIcon, 
  ContentStrategyIcon, 
  BrandArchitectureIcon, 
  CommunityBuildingIcon 
} from '../components/ui/ProcessIcons';

export interface Service {
  id: string;
  title: string;
  icon: React.ComponentType;
  shortDescription: string;
  detailedDescription: string;
  features: string[];
  expandedFeatures: {
    title: string;
    description: string;
  }[];
  process: {
    title: string;
    description: string;
  }[];
  outcomes: string[];
  heroImage: string;
}

export const services: Service[] = [
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    icon: BrandStrategyIcon,
    shortDescription: 'Develop a clear, compelling brand strategy that differentiates your business and resonates with your target audience.',
    detailedDescription: 'Your brand strategy is the foundation of everything you do. We work with you to define your brand\'s unique position in the market, understand your audience deeply, and create a strategic roadmap that guides all your brand decisions. Our comprehensive approach ensures your brand not only stands out but also builds meaningful connections with your community.',
    features: [
      'Brand positioning',
      'Audience research',
      'Competitive analysis',
      'Brand messaging'
    ],
    expandedFeatures: [
      {
        title: 'Brand Positioning',
        description: 'Define your unique market position and value proposition that sets you apart from competitors while resonating with your target audience.'
      },
      {
        title: 'Audience Research',
        description: 'Deep dive into understanding your customers\' needs, behaviors, and motivations to create more targeted and effective brand communications.'
      },
      {
        title: 'Competitive Analysis',
        description: 'Comprehensive analysis of your competitive landscape to identify opportunities and develop strategies that give you a sustainable advantage.'
      },
      {
        title: 'Brand Messaging',
        description: 'Craft compelling, consistent messaging that communicates your brand\'s value and personality across all touchpoints and channels.'
      }
    ],
    process: [
      {
        title: 'Research & Discovery',
        description: 'We start by understanding your business, industry, and audience through comprehensive research and stakeholder interviews.'
      },
      {
        title: 'Strategic Framework',
        description: 'Develop a clear strategic framework that defines your brand positioning, personality, and messaging architecture.'
      },
      {
        title: 'Validation & Refinement',
        description: 'Test and refine the strategy with key stakeholders and target audience feedback to ensure market fit.'
      },
      {
        title: 'Implementation Guide',
        description: 'Create detailed guidelines and tools to help your team implement the strategy consistently across all channels.'
      }
    ],
    outcomes: [
      'Clear brand positioning that differentiates you in the market',
      'Deep understanding of your target audience and their needs',
      'Compelling brand messaging that resonates and converts',
      'Strategic framework to guide all future brand decisions'
    ],
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'visual-identity',
    title: 'Visual Identity',
    icon: VisualIdentityIcon,
    shortDescription: 'Create a cohesive visual system that communicates your brand\'s personality and values across all touchpoints.',
    detailedDescription: 'Your visual identity is how your audience first experiences your brand. We create comprehensive visual systems that not only look beautiful but also strategically communicate your brand\'s essence. From logos to color palettes, typography to imagery, every element works together to create a memorable and impactful brand presence.',
    features: [
      'Logo design',
      'Color palette',
      'Typography system',
      'Brand guidelines'
    ],
    expandedFeatures: [
      {
        title: 'Logo Design',
        description: 'Create distinctive, memorable logos that capture your brand essence and work effectively across all applications and sizes.'
      },
      {
        title: 'Color Palette',
        description: 'Develop strategic color systems that evoke the right emotions and ensure consistency across all brand touchpoints.'
      },
      {
        title: 'Typography System',
        description: 'Select and customize typography that enhances readability while reinforcing your brand personality and hierarchy.'
      },
      {
        title: 'Brand Guidelines',
        description: 'Comprehensive style guides that ensure consistent application of your visual identity across all media and platforms.'
      }
    ],
    process: [
      {
        title: 'Creative Brief',
        description: 'Define the visual direction based on your brand strategy, target audience, and competitive landscape.'
      },
      {
        title: 'Concept Development',
        description: 'Explore multiple creative directions and concepts that bring your brand personality to life visually.'
      },
      {
        title: 'Design Refinement',
        description: 'Refine and perfect the chosen direction, ensuring it works across all required applications.'
      },
      {
        title: 'System Creation',
        description: 'Build a comprehensive visual system with guidelines for consistent implementation.'
      }
    ],
    outcomes: [
      'Distinctive visual identity that stands out in your market',
      'Consistent brand presence across all touchpoints',
      'Professional brand guidelines for team implementation',
      'Increased brand recognition and memorability'
    ],
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'digital-experience',
    title: 'Digital Experience',
    icon: DigitalExperienceIcon,
    shortDescription: 'Design intuitive, engaging digital experiences that strengthen your brand and drive meaningful connections.',
    detailedDescription: 'In today\'s digital world, your online presence is often the first and most important touchpoint with your audience. We design digital experiences that not only look great but also function seamlessly, convert effectively, and strengthen your brand relationships at every interaction.',
    features: [
      'Website design',
      'User experience (UX)',
      'User interface (UI)',
      'Digital strategy'
    ],
    expandedFeatures: [
      {
        title: 'Website Design',
        description: 'Create stunning, responsive websites that effectively communicate your brand and convert visitors into customers.'
      },
      {
        title: 'User Experience (UX)',
        description: 'Design intuitive user journeys that make it easy for your audience to find what they need and take desired actions.'
      },
      {
        title: 'User Interface (UI)',
        description: 'Craft beautiful, functional interfaces that reflect your brand while providing excellent usability and accessibility.'
      },
      {
        title: 'Digital Strategy',
        description: 'Develop comprehensive digital strategies that align with your business goals and user needs across all platforms.'
      }
    ],
    process: [
      {
        title: 'Discovery & Planning',
        description: 'Understand your users, goals, and technical requirements to create a strategic foundation for design.'
      },
      {
        title: 'UX Design',
        description: 'Map user journeys, create wireframes, and design the optimal experience for your audience.'
      },
      {
        title: 'Visual Design',
        description: 'Apply your brand identity to create beautiful, engaging interfaces that delight users.'
      },
      {
        title: 'Testing & Optimization',
        description: 'Test with real users and optimize the experience based on feedback and performance data.'
      }
    ],
    outcomes: [
      'Engaging digital experiences that convert visitors',
      'Improved user satisfaction and engagement metrics',
      'Consistent brand experience across all digital touchpoints',
      'Scalable digital foundation for future growth'
    ],
    heroImage: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy',
    icon: ContentStrategyIcon,
    shortDescription: 'Develop a content strategy that tells your brand story and engages your audience across all channels.',
    detailedDescription: 'Great content doesn\'t just inform—it inspires, engages, and builds relationships. We help you develop content strategies that tell your unique story, provide value to your audience, and support your business goals across every channel and touchpoint.',
    features: [
      'Content planning',
      'Storytelling',
      'Content creation',
      'Content distribution'
    ],
    expandedFeatures: [
      {
        title: 'Content Planning',
        description: 'Develop strategic content plans that align with your business goals and audience needs across all channels.'
      },
      {
        title: 'Storytelling',
        description: 'Craft compelling brand narratives that resonate with your audience and differentiate you from competitors.'
      },
      {
        title: 'Content Creation',
        description: 'Produce high-quality content that engages your audience and supports your brand objectives across formats.'
      },
      {
        title: 'Content Distribution',
        description: 'Optimize content distribution strategies to reach your audience where they are most engaged and receptive.'
      }
    ],
    process: [
      {
        title: 'Content Audit',
        description: 'Analyze existing content to identify gaps, opportunities, and areas for improvement.'
      },
      {
        title: 'Strategy Development',
        description: 'Create a comprehensive content strategy aligned with your brand and business objectives.'
      },
      {
        title: 'Content Creation',
        description: 'Develop engaging content that tells your story and provides value to your audience.'
      },
      {
        title: 'Performance Optimization',
        description: 'Monitor content performance and optimize based on engagement and conversion metrics.'
      }
    ],
    outcomes: [
      'Consistent, engaging content across all channels',
      'Stronger brand storytelling and audience connection',
      'Improved content performance and engagement',
      'Clear content guidelines for ongoing success'
    ],
    heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'brand-architecture',
    title: 'Brand Architecture',
    icon: BrandArchitectureIcon,
    shortDescription: 'Structure your brand portfolio to maximize clarity, relevance, and impact across all your offerings.',
    detailedDescription: 'As businesses grow and evolve, managing multiple brands, products, or services becomes complex. We help you create clear, strategic brand architecture that maximizes the value of your entire portfolio while ensuring each element supports your overall business objectives.',
    features: [
      'Brand hierarchy',
      'Sub-brand strategy',
      'Brand extensions',
      'Portfolio management'
    ],
    expandedFeatures: [
      {
        title: 'Brand Hierarchy',
        description: 'Design clear brand hierarchies that show the relationship between your master brand and sub-brands or products.'
      },
      {
        title: 'Sub-brand Strategy',
        description: 'Develop strategies for sub-brands that maintain connection to the master brand while serving specific audiences.'
      },
      {
        title: 'Brand Extensions',
        description: 'Plan strategic brand extensions that leverage your existing brand equity while entering new markets or categories.'
      },
      {
        title: 'Portfolio Management',
        description: 'Create systems for managing your entire brand portfolio effectively while maximizing synergies and market impact.'
      }
    ],
    process: [
      {
        title: 'Portfolio Analysis',
        description: 'Assess your current brand portfolio, identifying strengths, gaps, and optimization opportunities.'
      },
      {
        title: 'Architecture Design',
        description: 'Design the optimal brand architecture structure based on your business strategy and market needs.'
      },
      {
        title: 'Implementation Planning',
        description: 'Create detailed plans for implementing the new architecture across all touchpoints and communications.'
      },
      {
        title: 'Governance Framework',
        description: 'Establish governance frameworks to maintain architectural integrity as your business evolves.'
      }
    ],
    outcomes: [
      'Clear, strategic brand architecture that supports growth',
      'Maximized brand equity across your entire portfolio',
      'Improved market clarity and customer understanding',
      'Scalable framework for future brand decisions'
    ],
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'community-building',
    title: 'Community Building',
    icon: CommunityBuildingIcon,
    shortDescription: 'Develop strategies to build and nurture communities around your brand, fostering loyalty and advocacy.',
    detailedDescription: 'The strongest brands don\'t just have customers—they have communities. We help you build authentic communities around your brand that foster deep connections, drive loyalty, and turn customers into advocates who amplify your message and support your growth.',
    features: [
      'Community strategy',
      'Engagement programs',
      'Ambassador programs',
      'Community events'
    ],
    expandedFeatures: [
      {
        title: 'Community Strategy',
        description: 'Develop comprehensive strategies for building and nurturing communities that align with your brand values and business goals.'
      },
      {
        title: 'Engagement Programs',
        description: 'Create programs and initiatives that encourage active participation and strengthen community bonds.'
      },
      {
        title: 'Ambassador Programs',
        description: 'Identify and nurture brand ambassadors who can authentically advocate for your brand within the community.'
      },
      {
        title: 'Community Events',
        description: 'Plan and execute events that bring your community together and strengthen relationships with your brand.'
      }
    ],
    process: [
      {
        title: 'Community Research',
        description: 'Research your existing community and identify opportunities for growth and deeper engagement.'
      },
      {
        title: 'Strategy Development',
        description: 'Create a comprehensive community building strategy that aligns with your brand and business objectives.'
      },
      {
        title: 'Program Launch',
        description: 'Launch community programs and initiatives designed to foster engagement and build relationships.'
      },
      {
        title: 'Growth & Optimization',
        description: 'Monitor community health and optimize programs based on engagement and feedback metrics.'
      }
    ],
    outcomes: [
      'Engaged, loyal community around your brand',
      'Increased customer advocacy and word-of-mouth marketing',
      'Valuable customer insights and feedback loops',
      'Sustainable framework for community growth'
    ],
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getOtherServices = (currentId: string): Service[] => {
  return services.filter(service => service.id !== currentId);
};
