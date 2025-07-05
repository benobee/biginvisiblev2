import { useEffect } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import ServiceCard from '../components/ServiceCard';
import { initRevealAnimations } from '../utils/animations';
import { services } from '../data/services';

const Services = () => {
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
  return (
    <>
      <section className="min-h-[70vh] bg-white text-dark flex items-center relative overflow-hidden pt-[120px]">
        <div className="section-container">
          <Grid>
            <GridItem span={6}>
              <div className="relative z-10">
                <h1 className="reveal-text text-4xl lg:text-5xl xl:text-6xl mb-6 font-bold leading-tight tracking-tight text-dark">Our <span className="text-accent">Services</span></h1>
                <p className="reveal-text text-lg lg:text-xl mb-8 opacity-80 leading-relaxed max-w-2xl text-dark">
                  We offer a comprehensive suite of brand architecture services designed to build authentic connections between your business and your community.
                </p>
                <Button to="/contact" variant="primary" className="reveal-text">Get started</Button>
              </div>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text relative h-96 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Brand architecture services" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </GridItem>
          </Grid>
        </div>
      </section>
      
      <Section background="secondary">
        <SectionHeader
          subtitle="Core services"
          title="How we can help you"
          description="Our services are designed to create meaningful connections between your brand and your audience, driving sustainable growth and community impact."
          align="center"
        />
        
        <Grid columns={3}>
          {services.map((service) => (
            <GridItem key={service.id} span={1} className="reveal-text">
              <ServiceCard service={service} />
            </GridItem>
          ))}
        </Grid>
      </Section>
      
      <Section>
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text">
              <SectionHeader
                subtitle="Our approach"
                title="How we work with you"
                description="Our collaborative process ensures we deliver results that exceed expectations while adapting to your unique needs."
                align="left"
              />
              
              <div className="flex items-start mb-8 reveal-text">
                <div className="text-xl font-bold text-accent mr-6 min-w-[30px]">01</div>
                <div>
                  <h3 className="text-xl mb-3 text-dark">Discovery</h3>
                  <p className="opacity-80 leading-relaxed text-dark">We begin by deeply understanding your brand, business goals, audience, and market position.</p>
                </div>
              </div>
              
              <div className="flex items-start mb-8 reveal-text">
                <div className="text-xl font-bold text-accent mr-6 min-w-[30px]">02</div>
                <div>
                  <h3 className="text-xl mb-3 text-dark">Strategy Development</h3>
                  <p className="opacity-80 leading-relaxed text-dark">We craft a comprehensive brand strategy that defines your unique market position.</p>
                </div>
              </div>
              
              <div className="flex items-start mb-8 reveal-text">
                <div className="text-xl font-bold text-accent mr-6 min-w-[30px]">03</div>
                <div>
                  <h3 className="text-xl mb-3 text-dark">Design Implementation</h3>
                  <p className="opacity-80 leading-relaxed text-dark">We bring your brand to life through cohesive visual identity and consistent experiences, execute the strategy across all touchpoints, ensuring consistency and impact.</p>
                </div>
              </div>
              
              <div className="flex items-start mb-8 reveal-text">
                <div className="text-xl font-bold text-accent mr-6 min-w-[30px]">04</div>
                <div>
                  <h3 className="text-xl mb-3 text-dark">Brand Evolution</h3>
                  <p className="opacity-80 leading-relaxed text-dark">We provide ongoing support to help your brand grow and adapt while maintaining authenticity.</p>
                </div>
              </div>
              
              <Button to="/process" variant="outline" className="reveal-text">Learn more about our process</Button>
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text relative h-full min-h-[500px] rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Our collaborative process" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </GridItem>
        </Grid>
      </Section>
      
      <CTASection
        title="Ready to transform your brand?"
        description="Let's create authentic connections that transform your business and strengthen your community."
        buttonText="Schedule a consultation"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default Services;
