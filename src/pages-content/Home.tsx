import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomePageHero from '../components/HomePageHero';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import CTASection from '../components/ui/CTASection';
import Button from '../components/ui/Button';
import { initRevealAnimations } from '../utils/animations';
import Card from '../components/ui/Card';

const Home = () => {
  
  
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
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
            <GridItem span={4}>
              <div className="reveal-text border-gray-border hover:border-brand-accent transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4">Brand Strategy</h3>
              <p className="text-gray-medium mb-6 leading-relaxed">
                Develop a clear, compelling brand strategy that differentiates your business and resonates with your target audience.
              </p>
              <Link 
                to="/services/brand-strategy" 
                className="inline-flex items-center text-brand-accent hover:text-brand-dark transition-colors duration-150 font-medium group"
              >
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transition-transform group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
              </div>
            </GridItem>

            <GridItem span={4}>
              <div className="reveal-text border-gray-border hover:border-brand-accent transition-all duration-300 group">
                <h3 className="text-xl font-bold mb-4">Visual Identity</h3>
              <p className="text-gray-medium mb-6 leading-relaxed">
                Create a cohesive visual system that communicates your brand's personality and values across all touchpoints.
              </p>
              <Link 
                to="/services/visual-identity" 
                className="inline-flex items-center text-brand-accent hover:text-brand-dark transition-colors duration-150 font-medium group"
              >
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transition-transform group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
              </div>
            </GridItem>

            <GridItem span={4}>
              <div className="reveal-text border-gray-border hover:border-brand-accent transition-all duration-300 group">
                <h3 className="text-xl font-bold mb-4">Digital Experience</h3>
              <p className="text-gray-medium mb-6 leading-relaxed">
                Design intuitive, engaging digital experiences that strengthen your brand and drive meaningful connections.
              </p>
              <Link 
                to="/services/digital-experience" 
                className="inline-flex items-center text-brand-accent hover:text-brand-dark transition-colors duration-150 font-medium group"
              >
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transition-transform group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
              </div>
            </GridItem>
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
          
          <div className="mt-16">
            <Button 
              to="/process" 
              variant="outline" 
              size="large"
              className="reveal-text"
            >
              Learn about our process
            </Button>
          </div>
      </Section>

      {/* Featured Work Section */}
      <Section background="light">
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
      <Section background="primary">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 reveal-text">
            "BigInvisible didn't just redesign our brand—they fundamentally transformed how our customers see us. 
            The invisible bonds they created between our brand and our community are now our greatest business asset."
          </blockquote>
          <div className="reveal-text">
            <div className="text-accent font-semibold">Sarah Chen</div>
            <div>CEO, TechFlow Solutions</div>
          </div>
        </div>
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
