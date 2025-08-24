import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import ServiceCard from '../components/ServiceCard';
import FullScreenHero from '../components/ui/FullScreenHero';
import styles from '../components/ui/FullScreenHero.module.css';
import { services } from '../data/services'

const Services = () => {
  
  return (
    <>
      <FullScreenHero
        title={<>We make<br />brands <span className={`text-accent ${styles.fadeInCycle}`}>work better</span></>}
        description="Every service we offer is designed to build authentic connections between your business and your community."
        imageUrl="https://cdn.builder.io/api/v1/image/assets%2F588c931751e44954ba83f0b968e6223f%2Fa1cd3ece91724b54a242c58508a074cb"
        imageAlt="Brand architecture services"
        overlayOpacity={0.4}
        textAlign="left"
        overlayBackgroundImage="https://cdn.builder.io/api/v1/image/assets%2F588c931751e44954ba83f0b968e6223f%2Fcfc4bd3f7669486fbc175d06a52681f8"
      />
      
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
                src="/images/ingrid_design.jpg" 
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
