import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import CTASection from '../components/ui/CTASection';
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
          title="We make brands work better"
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
