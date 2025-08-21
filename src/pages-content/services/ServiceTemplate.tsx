import { useContext } from 'react';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Button from '../../components/ui/Button';
import CTASection from '../../components/ui/CTASection';
import ServiceCarousel from '../../components/ServiceCarousel';
import TimelineStep from '../../components/TimelineStep';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { type Service } from '../../data/services';
import ImpactStatisticsGrid from '../../components/ImpactStatisticsGrid';
import TestimonialsCarousel from '../../components/TestimonialsCarousel';
import ServiceBlueprintGrid from '../../components/ServiceBlueprintGrid';
import { ThemeModeContext } from '../../components/ThemeModeContext';
import styles from '../../components/HomePageHero.module.css';
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

// Sample testimonials data
export const getTestimonials = () => [
  {
    id: '1',
    quote: 'Working with this team transformed our brand identity completely. The strategic approach and attention to detail exceeded our expectations.',
    author: 'Sarah Johnson',
    position: 'Marketing Director',
    company: 'TechFlow Solutions',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&auto=format'
  },
  {
    id: '2',
    quote: 'Their expertise in digital strategy helped us reach new audiences and significantly increase our online engagement. Highly recommended!',
    author: 'Michael Chen',
    position: 'CEO',
    company: 'InnovateLab',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format'
  },
  {
    id: '3',
    quote: 'The team delivered exceptional results on time and within budget. Their collaborative approach made the entire process smooth and enjoyable.',
    author: 'Emily Rodriguez',
    position: 'Brand Manager',
    company: 'Creative Dynamics',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&auto=format'
  },
  {
    id: '4',
    quote: 'Outstanding work! They understood our vision perfectly and brought it to life with creativity and professionalism.',
    author: 'David Thompson',
    position: 'Founder',
    company: 'StartupVenture',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format'
  },
  {
    id: '5',
    quote: 'The strategic insights and execution quality were phenomenal. Our brand now stands out in a competitive market.',
    author: 'Lisa Park',
    position: 'VP of Marketing',
    company: 'GlobalTech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format'
  }
];


interface ServiceTemplateProps {
  service: Service;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ service }) => {
  const carouselImages = getCarouselImages(service.id);
  const testimonials = getTestimonials();
  const { isLightMode } = useContext(ThemeModeContext);
  
  // Create carousel items from expanded features
  const carouselItems = service.expandedFeatures.map((feature, index) => ({
    title: feature.title,
    description: feature.description,
    image: carouselImages[index % carouselImages.length],
    ctaText: generateCTAText(feature.title)
  }));
  
  
  return (
    <main className="min-h-screen">
        <Breadcrumb 
          items={[
            { label: 'Services', href: '/services' },
            { label: service.title }
          ]}
        />
        <Section background="primary" className="h-[calc(100vh-112px)] !bg-[#0F1923] text-white flex items-center relative overflow-hidden">
          {/* Light mode background */}
          <div 
            className={`absolute inset-0 z-20 ${styles.heroBackground}`}
            style={{ opacity: isLightMode ? 1 : 0 }}
          >
            <img 
              src={service.heroImage}
              alt="Hero background"
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          {/* Service Blueprint Grid - Full screen */}
          <div 
            className="absolute inset-0 z-30"
            style={{ opacity: 0.8, pointerEvents: 'auto' }}
          >
            <ServiceBlueprintGrid service={service} />
          </div>
          
          <div className="section-container relative z-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left column - Content */}
              <div className="max-w-2xl">
                {service.title && <h1 className="reveal-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-6 sm:mb-8 font-bold leading-none tracking-tight text-white">
                  {service.title}
                </h1>}
                <p className="reveal-text text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-80 leading-relaxed">
                  {service.detailedDescription}
                </p>
                <div className="reveal-text flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button to="/contact" variant="primary" size="large" className="inline-block bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 border border-accent hover:bg-transparent hover:text-accent no-underline text-center min-h-[44px] flex items-center justify-center">
                    Get started today
                  </Button>
                  <a 
                    href="#services" 
                    className="inline-block bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 border border-white/20 hover:border-white no-underline text-center min-h-[44px] flex items-center justify-center"
                  >
                    Explore services
                  </a>
                </div>
              </div>
              
              {/* Right column - Empty space for touch points to show through */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </Section>
        
        <Section background="light" id="services">
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
            description={`When you work with us, you'll get ${service.outcomes[0].toLowerCase()}, ${service.outcomes[1].toLowerCase()}, ${service.outcomes[2].toLowerCase()}, and ${service.outcomes[3].toLowerCase()}.`}
            align="center"
          />
          
          <div className="mt-16 reveal-text">
            <ImpactStatisticsGrid
              serviceCategory={service.id}
              columns={4}
              gap="large"
              variant="default"
              showSource={false}
              limit={4}
            />
          </div>
        </Section>
        
        <Section background="primary">
          <SectionHeader
            subtitle="Client testimonials"
            title="What our clients say"
            description="Don't just take our word for it. Here's what our clients have to say about working with us."
            align="center"
          />
          
          <div className="mt-16 reveal-text">
            <TestimonialsCarousel 
              testimonials={testimonials}
              autoPlayDelay={6000}
            />
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
  );
};

export default ServiceTemplate;
