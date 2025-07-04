import { useEffect } from 'react';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Grid from '../../components/ui/Grid';
import GridItem from '../../components/ui/GridItem';
import Button from '../../components/ui/Button';
import CTASection from '../../components/ui/CTASection';
import ServiceCarousel from '../../components/ServiceCarousel';
import { initRevealAnimations } from '../../utils/animations';
import ServiceSidebar from './ServiceSidebar';
import { type Service } from '../../data/services';
import './ServiceTemplate.css';

// Design/Graphics focused images for carousel from Unsplash
const getCarouselImages = (serviceId: string) => {
  const imageMap: { [key: string]: string[] } = {
    'brand-strategy': [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=500&fit=crop&auto=format', // Abstract geometric design
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1200&h=500&fit=crop&auto=format', // Colorful design patterns
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=500&fit=crop&auto=format', // Strategy diagrams/charts
      'https://images.unsplash.com/photo-1634387477071-95b5d3fc15fa?w=1200&h=500&fit=crop&auto=format'  // Brand elements
    ],
    'visual-identity': [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=500&fit=crop&auto=format', // Color palette design
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=500&fit=crop&auto=format', // Typography/design elements
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=500&fit=crop&auto=format', // Logo design process
      'https://images.unsplash.com/photo-1609877546074-5a03c93b5a5f?w=1200&h=500&fit=crop&auto=format'  // Design mockups
    ],
    'digital-experience': [
      '/images/photo-1544237526-cae15a57ed1e.jpeg', // Silver iMac website design
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=500&fit=crop&auto=format', // Digital wireframes
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=500&fit=crop&auto=format', // Interactive design
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&h=500&fit=crop&auto=format'  // Person holding smartphone
    ],
    'content-strategy': [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=500&fit=crop&auto=format', // Content planning graphics
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=500&fit=crop&auto=format', // Editorial design
      'https://images.unsplash.com/photo-1634387477071-95b5d3fc15fa?w=1200&h=500&fit=crop&auto=format', // Content frameworks
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=500&fit=crop&auto=format'  // Strategy visualization
    ],
    'brand-architecture': [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=500&fit=crop&auto=format', // Architectural design elements
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=500&fit=crop&auto=format', // Structure diagrams
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1200&h=500&fit=crop&auto=format', // Framework graphics
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=500&fit=crop&auto=format'  // System design
    ],
    'community-building': [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=500&fit=crop&auto=format', // Network graphics
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=500&fit=crop&auto=format', // Connection patterns
      'https://images.unsplash.com/photo-1634387477071-95b5d3fc15fa?w=1200&h=500&fit=crop&auto=format', // Community visualization
      'https://images.unsplash.com/photo-1609877546074-5a03c93b5a5f?w=1200&h=500&fit=crop&auto=format'  // Engagement design
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
        
        <Section background="light" className="py-20 relative">
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
        
        <Section background="primary" className="!bg-[#0F1923] text-white py-20 relative">
          <SectionHeader
            subtitle="Our process"
            title="How we deliver results"
            description="Our proven process ensures we deliver exceptional results while keeping you involved every step of the way."
            align="center"
          />
          
          <div className="mt-16 max-w-[800px] mx-auto relative">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white/10 border border-white/20 rounded p-10 mb-8 flex items-start transition-all duration-300 reveal-text">
                <div className="flex items-center justify-center w-[60px] h-[60px] bg-[#ff2356] text-white rounded-full text-xl font-bold mr-8 flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-4 text-white font-bold">{step.title}</h3>
                  <p className="text-white/90 leading-[1.7] text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
        
        <Section background="primary" className="py-20 relative">
          <SectionHeader
            subtitle="Outcomes"
            title="What you can expect"
            description="Here's what you'll achieve when working with us on your project."
            align="center"
          />
          
          <div className="mt-16">
            <Grid columns={3}>
              {service.outcomes.slice(0, 3).map((outcome, index) => (
                <GridItem key={index} span={1} className="reveal-text">
                  <div className="bg-white rounded overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 h-full">
                    <div className="h-[200px] overflow-hidden">
                      <img src={carouselImages[index]} alt={`Outcome ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300" />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl mb-4 text-[#0F1923] font-bold">Expected Result {index + 1}</h3>
                      <p className="text-[#4A5568] leading-[1.6] text-base m-0">{outcome}</p>
                    </div>
                  </div>
                </GridItem>
              ))}
            </Grid>
            
            {service.outcomes.length > 3 && (
              <div className="mt-8">
                <Grid columns={2}>
                  {service.outcomes.slice(3).map((outcome, index) => (
                    <GridItem key={index + 3} span={1} className="reveal-text">
                      <div className="bg-white rounded overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 h-full">
                        <div className="p-8">
                          <h3 className="text-xl mb-4 text-[#0F1923] font-bold">Additional Benefit {index + 1}</h3>
                          <p className="text-[#4A5568] leading-[1.6] text-base m-0">{outcome}</p>
                        </div>
                      </div>
                    </GridItem>
                  ))}
                </Grid>
              </div>
            )}
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
