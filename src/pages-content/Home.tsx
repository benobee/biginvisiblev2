import HomePageHero from '../components/HomePageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import CTASection from '../components/ui/CTASection';
import Button from '../components/ui/Button';
import Quote from '../components/Quote';
import Card from '../components/ui/Card';
import StatisticsGrid from '../components/StatisticsGrid';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

interface HomeProps {
  currentPath?: string;
}

const Home = ({ currentPath }: HomeProps) => {
  
  return (
    <>
      <HomePageHero />

      {/* Services Section */}
      <Section background="light" id="services">
        <SectionHeader
          subtitle="Services"
          title="Building authentic brand connections through strategic design"
          align="center"
        />
          
          {/* Services Grid */}
          <Grid gap="large" className="mt-16">
            {services.slice(0, 3).map((service) => (
              <GridItem key={service.id} span={4} className="reveal-text">
                <ServiceCard service={service} variant="home" />
              </GridItem>
            ))}
          </Grid>
      </Section>

      {/* Process Section */}
      <Section background="primary">
        <SectionHeader
          subtitle="Our Process"
          title="The Invisible Bond Framework™"
          align="center"
        />
          
          {/* Process Steps */}
          <Grid gap="large" className="mt-16">
            <GridItem span={3}>
              <Card padding='small'>
                <div className="reveal-text relative">
                  <div className="text-6xl font-bold text-brand-accent/10 absolute -top-10 -left-2 z-0">01</div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Discovery</h3>
                  <p className='pt-6'>We begin by deeply understanding your brand.</p>
                </div>
              </Card>

            </GridItem>
            
            <GridItem span={3}>
              <Card padding='small'>
                <div className="reveal-text relative">
                  <div className="text-6xl font-bold text-brand-accent/10 absolute -top-10 -left-2 z-0">02</div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Strategy</h3>
                  <p className='pt-6'>Based on our discoveries, we craft a comprehensive brand strategy.</p>
                </div>
              </Card>
            </GridItem>
            
            <GridItem span={3}>
              <Card padding='small'>
                <div className="reveal-text relative">
                  <div className="text-6xl font-bold text-brand-accent/10 absolute -top-10 -left-2 z-0">03</div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Design</h3>
                  <p className='pt-6'>We bring your brand to life through cohesive visual identity and consistent experiences.</p>
                </div>
              </Card>
            </GridItem>
 
            <GridItem span={3}>
              <Card padding='small'>
                <div className="reveal-text relative">
                  <div className="text-6xl font-bold text-brand-accent/10 absolute -top-10 -left-2 z-0">04</div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Implementation</h3>
                  <p className='pt-6'>We provide ongoing support to help your brand grow and adapt.</p>
                </div>
              </Card>
            </GridItem>
          </Grid>
          
          <div className="mt-8 text-center">
            <Button 
              to="/process" 
              variant="outline" 
              size="medium"
              className="reveal-text"
            >
              Learn about our process
            </Button>
          </div>
      </Section>

      {/* Branding Statistics Section */}
      <Section background="light">
        <SectionHeader
          subtitle="The power of branding"
          title="Why strategic branding matters"
          description="Data-driven insights that demonstrate the real impact of thoughtful brand development on business growth and customer relationships."
          align="center"
        />
        
        <div className="mt-16 reveal-text">
          <StatisticsGrid
            randomCount={3}
            columns={3}
            gap="small"
            variant="default"
            showSource={false}
            clickable
          />
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            to="/statistics" 
            variant="outline" 
            size="medium"
            className="reveal-text"
          >
            See more statistics
          </Button>
        </div>
      </Section>

      {/* Featured Work Section */}
      <Section background="primary">
        <SectionHeader
          subtitle="Featured Work"
          title="Building brands that matter"
          align="center"
        />
          
          {/* Work Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="reveal-text col-span-1 md:col-span-2 bg-white p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-brand-dark">Brand Transformation</h3>
              <p className="text-gray-medium leading-relaxed mb-6">
                Complete rebrand for a technology startup, resulting in 300% increase in customer engagement.
              </p>
              <div className="text-brand-accent font-medium">View Case Study →</div>
            </div>
            
            <div className="reveal-text bg-white p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-brand-dark">Digital Identity</h3>
              <p className="text-gray-medium leading-relaxed mb-6">
                Modern digital presence for established consulting firm.
              </p>
              <div className="text-brand-accent font-medium">View Project →</div>
            </div>
            
            <div className="reveal-text bg-white p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-brand-dark">Brand Strategy</h3>
              <p className="text-gray-medium leading-relaxed mb-6">
                Strategic positioning for emerging fintech company.
              </p>
              <div className="text-brand-accent font-medium">View Project →</div>
            </div>
            
            <div className="reveal-text col-span-1 md:col-span-2 bg-white p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-brand-dark">Community Building</h3>
              <p className="text-gray-medium leading-relaxed mb-6">
                Building a loyal community around a lifestyle brand through authentic storytelling.
              </p>
              <div className="text-brand-accent font-medium">View Case Study →</div>
            </div>
          </div>
      </Section>

      {/* Testimonial Section */}
      <Section background="light">
        <Quote 
          variant="work"
          text="Big Invisible didn't just redesign our brand — they transformed how our entire community sees us. We've gone from another local business to the trusted leader our neighbors turn to first."
          author="Sarah Chen"
          role="CEO"
          company="TechFlow Solutions"
          className="reveal-text"
        />
      </Section>

      {/* Contact CTA Section */}
      <CTASection
        title="Ready to begin?"
        description="Let's create the authentic connections that will transform your business into a trusted authority."
        buttonText="Start Your Project"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default Home;
