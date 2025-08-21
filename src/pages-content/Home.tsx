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
import ParallaxWorkSection from '../components/ParallaxWorkSection';
import { services } from '../data/services';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { getTestimonials } from './services/ServiceTemplate';

const Home = () => {
  return (
    <>

      {/* Services Section */}
      <Section background="light" id="services">
        <SectionHeader
          subtitle="What we do"
          title="We make brands people actually remember"
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

      {/* Featured Work Section - Parallax */}
      <div className="w-full">
        <ParallaxWorkSection />
      </div>

      {/* Testimonial Section */}
      <Section background="light">
          <div className="mt-16 reveal-text">
            <TestimonialsCarousel
              testimonials={getTestimonials()}
              autoPlayDelay={6000}
            />
          </div>
      </Section>

      {/* Process Section */}
      <Section background="primary">
        <SectionHeader
          subtitle="How we work"
          title="Our (not-so-secret) formula"
          align="center"
        />
          
          {/* Process Steps */}
          <Grid gap="large" className="mt-16">
            <GridItem span={3}>
              <Card padding='small'>
                <div className="reveal-text relative">
                  <div className="text-6xl font-bold text-brand-accent/10 absolute -top-10 -left-2 z-0">01</div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Getting Curious</h3>
                  <p className='pt-6'>We dig deep to figure out what makes you tick (and what makes you different).</p>
                </div>
              </Card>

            </GridItem>
            
            <GridItem span={3}>
              <Card padding='small'>
                <div className="reveal-text relative">
                  <div className="text-6xl font-bold text-brand-accent/10 absolute -top-10 -left-2 z-0">02</div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Connecting the Dots</h3>
                  <p className='pt-6'>Time to turn those insights into a plan that actually works for your business.</p>
                </div>
              </Card>
            </GridItem>
            
            <GridItem span={3}>
              <Card padding='small'>
                <div className="reveal-text relative">
                  <div className="text-6xl font-bold text-brand-accent/10 absolute -top-10 -left-2 z-0">03</div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Making It Real</h3>
                  <p className='pt-6'>This is where the magic happens—turning strategy into something you can see and feel.</p>
                </div>
              </Card>
            </GridItem>
 
            <GridItem span={3}>
              <Card padding='small'>
                <div className="reveal-text relative">
                  <div className="text-6xl font-bold text-brand-accent/10 absolute -top-10 -left-2 z-0">04</div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Making It Stick</h3>
                  <p className='pt-6'>We stick around to make sure everything works like it should (because we care how this turns out).</p>
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
              See how we work
            </Button>
          </div>
      </Section>

            {/* Branding Statistics Section */}
      <Section background="light">
        <SectionHeader
          subtitle="The numbers don't lie"
          title="Why good branding actually matters"
          description="Real data that shows what happens when you get your brand right (spoiler: good things)."
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
            Show me the data
          </Button>
        </div>
      </Section>

      {/* Contact CTA Section */}
      <CTASection
        title="Ready to get started?"
        description="Let's figure out what makes you different and turn that into something people care about."
        buttonText="Let's talk"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default Home;
