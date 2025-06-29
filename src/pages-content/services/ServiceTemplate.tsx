import { useEffect } from 'react';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Grid from '../../components/ui/Grid';
import GridItem from '../../components/ui/GridItem';
import Button from '../../components/ui/Button';
import CTASection from '../../components/ui/CTASection';
import { initRevealAnimations } from '../../utils/animations';
import ServiceSidebar from './ServiceSidebar';
import { type Service } from '../../data/services';
import './ServiceTemplate.css';

// Service-specific images from Unsplash
const getServiceImages = (serviceId: string) => {
  const imageMap: { [key: string]: string[] } = {
    'brand-strategy': [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=500&h=300&fit=crop'
    ],
    'visual-identity': [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&h=300&fit=crop'
    ],
    'digital-experience': [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
    ],
    'content-strategy': [
      'https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&h=300&fit=crop'
    ]
  };
  
  return imageMap[serviceId] || imageMap['brand-strategy'];
};

interface ServiceTemplateProps {
  service: Service;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ service }) => {
  const serviceImages = getServiceImages(service.id);
  
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
          
          <div className="mt-16 relative">
            <Grid columns={2}>
              {service.expandedFeatures.map((feature, index) => (
                <GridItem key={index} span={1} className="reveal-text">
                  <div className="bg-white border border-[#E2E8F0] rounded p-10 h-full relative transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] hover:border-[#ff2356] group">
                    <h3 className="text-2xl mb-4 text-[#0F1923] font-bold">{feature.title}</h3>
                    <p className="text-[#4A5568] leading-[1.7] text-lg">{feature.description}</p>
                  </div>
                </GridItem>
              ))}
            </Grid>
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
                      <img src={serviceImages[index]} alt={`Outcome ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300" />
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
