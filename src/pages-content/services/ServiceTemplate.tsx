import { useEffect } from 'react';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Grid from '../../components/ui/Grid';
import GridItem from '../../components/ui/GridItem';
import Button from '../../components/ui/Button';
import CTASection from '../../components/ui/CTASection';
import ServiceCarousel from '../../components/ServiceCarousel';
import TimelineStep from '../../components/TimelineStep';
import { Target, TrendingUp, Users, Award, Lightbulb, Rocket, Heart, Star, Zap, CheckCircle, Check } from 'lucide-react';
import { initRevealAnimations } from '../../utils/animations';
import ServiceSidebar from './ServiceSidebar';
import { type Service } from '../../data/services';
import './ServiceTemplate.css';

// Design/Graphics focused images for carousel from Unsplash - all unique images
const getCarouselImages = (serviceId: string) => {
  const imageMap: { [key: string]: string[] } = {
    'brand-strategy': [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=500&fit=crop&auto=format', // Brand positioning - strategic planning workspace
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=500&fit=crop&auto=format', // Audience research - person analyzing data
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=500&fit=crop&auto=format', // Competitive analysis - business charts creative angle
      'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&h=500&fit=crop&auto=format'  // Brand messaging - creative writing setup
    ],
    'visual-identity': [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=500&fit=crop&auto=format', // Logo design - creative logo design process
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=500&fit=crop&auto=format', // Color palette - color swatches and design
      'https://images.unsplash.com/photo-1609877546074-5a03c93b5a5f?w=1200&h=500&fit=crop&auto=format', // Typography system - design mockups
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=500&fit=crop&auto=format'  // Brand guidelines - design documentation spread
    ],
    'digital-experience': [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=500&fit=crop&auto=format', // Website design - silver iMac
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=500&fit=crop&auto=format', // User experience - UX wireframes
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=500&fit=crop&auto=format', // User interface - UI design patterns
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&h=500&fit=crop&auto=format'  // Digital strategy - person with smartphone
    ],
    'content-strategy': [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=500&fit=crop&auto=format', // Content planning - creative planning workspace overhead
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&h=500&fit=crop&auto=format', // Editorial strategy - person writing creatively
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=500&fit=crop&auto=format', // Content creation - laptop and coffee creative setup
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=500&fit=crop&auto=format'  // Content distribution - unique content sharing visual
    ],
    'brand-architecture': [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=500&fit=crop&auto=format', // Brand hierarchy - architectural blueprints creative angle
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&h=500&fit=crop&auto=format', // Portfolio strategy - organized design portfolio spread
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=500&fit=crop&auto=format', // Brand extensions - creative design variations
      'https://images.unsplash.com/photo-1545670723-196ed0d7334c?w=1200&h=500&fit=crop&auto=format'  // Sub-brand development - organized brand system
    ],
    'community-building': [
      'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=1200&h=500&fit=crop&auto=format', // Community strategy - team collaboration different angle
      'https://images.unsplash.com/photo-1573164713712-03790a178651?w=1200&h=500&fit=crop&auto=format', // Engagement planning - people planning together creative angle
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=500&fit=crop&auto=format', // Stakeholder alignment - network connection design
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=500&fit=crop&auto=format'  // Community activation - people networking creative shot
    ]
  };
  
  return imageMap[serviceId] || imageMap['brand-strategy'];
};

// Generate CTA text based on feature title
const generateCTAText = (featureTitle: string) => {
  const ctaMap: { [key: string]: string } = {
    'Brand Positioning': 'Define Your Position',
    'Audience Research': 'Understand Your Audience',
    'Competitive Analysis': 'Analyze Competition',
    'Brand Messaging': 'Craft Your Message',
    'Logo Design': 'Design Your Logo',
    'Visual Systems': 'Build Visual Systems',
    'Brand Guidelines': 'Create Guidelines',
    'Digital Assets': 'Develop Assets',
    'Website Design': 'Design Your Site',
    'User Experience': 'Enhance UX',
    'Digital Strategy': 'Distribute Web Content',
    'Platform Integration': 'Integrate Platforms',
    'Content Planning': 'Plan Your Content',
    'Editorial Strategy': 'Develop Strategy',
    'Content Creation': 'Create Content',
    'Content Distribution': 'Distribute Content',
    'Brand Hierarchy': 'Structure Your Brand',
    'Portfolio Strategy': 'Optimize Portfolio',
    'Brand Extensions': 'Extend Your Brand',
    'Sub-brand Development': 'Develop Sub-brands',
    'Community Strategy': 'Build Community',
    'Engagement Planning': 'Plan Engagement',
    'Stakeholder Alignment': 'Align Stakeholders',
    'Community Activation': 'Activate Community'
  };
  
  return ctaMap[featureTitle] || 'Get Started';
};

// Get outcome images based on index
const getOutcomeImage = (index: number) => {
  const images = [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop&auto=format', // Target/goal achievement
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&auto=format', // Growth/trending up
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop&auto=format', // Team/users
    'https://images.unsplash.com/photo-1552508744-1696d4464960?w=200&h=200&fit=crop&auto=format', // Award/achievement
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format', // Innovation/lightbulb
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop&auto=format', // Launch/rocket
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop&auto=format', // Care/heart
    'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=200&h=200&fit=crop&auto=format', // Excellence/star
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=200&h=200&fit=crop&auto=format', // Energy/zap
    'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=200&h=200&fit=crop&auto=format'  // Success/check
  ];
  return images[index % images.length];
};

interface ServiceTemplateProps {
  service: Service;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ service }) => {
  const carouselImages = getCarouselImages(service.id);
  
  // Create carousel items from expanded features
  const carouselItems = service.expandedFeatures.map((feature, index) => ({
    title: feature.title,
    description: feature.description,
    image: carouselImages[index % carouselImages.length],
    ctaText: generateCTAText(feature.title)
  }));
  
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
  return (
    <div className="flex min-h-screen">
      <ServiceSidebar currentServiceId={service.id} />
      
      <main className="flex-1 ml-0 md:ml-[280px]">
        <Section background="primary" className="min-h-[85vh] !bg-[#0F1923] text-white flex items-center relative overflow-hidden pt-[120px] pb-[60px]">
          <Grid>
              <GridItem span={6}>
                <div className="relative z-[3]">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-bold leading-[1.1] tracking-[-0.02em] text-white reveal-text">
                    {service.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 leading-[1.6] max-w-[650px] reveal-text">
                    {service.detailedDescription}
                  </p>
                  <Button to="/contact" variant="primary" size="large" className="reveal-text">
                    Get started today
                  </Button>
                </div>
              </GridItem>
              <GridItem span={6}>
                <div className="h-[500px] relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] reveal-text">
                  <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
                </div>
              </GridItem>
            </Grid>
        </Section>
        
        <Section background="light">
          <SectionHeader
            subtitle="What we do"
            title={`${service.title} Services`}
            description={service.shortDescription}
            align="center"
          />
          
          <div className="mt-16 reveal-text">
            <ServiceCarousel 
              items={carouselItems}
              autoPlayDelay={6000}
              className="shadow-2xl"
            />
          </div>
        </Section>
        
        <Section background="primary">
          <SectionHeader
            subtitle="Our process"
            title="How we deliver results"
            description="Our proven process ensures we deliver exceptional results while keeping you involved every step of the way."
            align="center"
          />
          
          <div className="mt-16">
            {service.process.map((step, index) => (
              <TimelineStep
                key={index}
                phase={index + 1}
                title={step.title}
                description={step.description}
                deliverables={[]} // Service process doesn't have deliverables, so we pass empty array
              />
            ))}
          </div>
        </Section>
        
        <Section background="light" className="py-20 relative">
          <SectionHeader
            subtitle="Outcomes"
            title="What you can expect"
            description="Here's what you'll achieve when working with us on your project."
            align="center"
          />
          
          <div className="mt-16">
            <Grid columns={4} gap="small">
              {service.outcomes.map((outcome, index) => {
                return (
                  <GridItem key={index} span={1} className="reveal-text">
                    <div className="bg-white rounded-2xl h-96 shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl group relative">
                      {/* Checkbox Icon - Top Right */}
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-12 h-full flex flex-col justify-center">
                        {/* Outcome Description */}
                        <p className="text-xl lg:text-2xl leading-relaxed text-gray-700 font-bold">
                          {outcome}
                        </p>
                      </div>
                    </div>
                  </GridItem>
                );
              })}
            </Grid>
          </div>
        </Section>
        
        <CTASection
          title={`Ready to get started with ${service.title.toLowerCase()}?`}
          description={`Let's discuss how we can help you achieve your goals with our ${service.title.toLowerCase()} services.`}
          buttonText="Schedule a consultation"
          buttonTo="/contact"
          buttonVariant="primaryInverse"
        />
      </main>
    </div>
  );
};

export default ServiceTemplate;
