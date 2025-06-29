import { useEffect } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { initRevealAnimations } from '../utils/animations';
import {
  AuthenticConnectionIcon,
  StrategicAlignmentIcon,
  CommunityIntegrationIcon,
  ConsistentExperienceIcon,
  MeasurableImpactIcon,
  AdaptiveEvolutionIcon
} from '../components/ui/ProcessIcons';

const Process = () => {
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
  return (
    <>
      <Section background="primary" className="min-h-[70vh] flex items-center relative overflow-hidden pt-[120px]">
        <Grid>
          <GridItem span={6}>
            <div className="relative z-10">
              <h1 className="reveal-text text-4xl lg:text-5xl xl:text-6xl mb-6 font-bold leading-tight tracking-tight text-dark">The <span className="text-accent">Invisible Bond</span> Framework™</h1>
              <p className="reveal-text text-lg lg:text-xl mb-8 opacity-80 leading-relaxed max-w-2xl text-dark">
                Our systematic approach to building lasting brand relationships that strengthen entire business ecosystems.
              </p>
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text relative h-96 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Our process" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </GridItem>
        </Grid>
      </Section>
      
      <Section background="light">
        <SectionHeader
          title="Our process"
          description="We follow a structured yet flexible process that ensures we deliver results that exceed expectations while adapting to your unique needs."
          align="center"
        />
        
        <div className="relative py-20 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-px before:bg-accent before:-translate-x-1/2 before:opacity-30 md:before:left-1/2">
          <div className="flex justify-end mb-20 relative reveal-text md:justify-end md:pl-0 pl-12">
            <div className="w-full md:w-5/12 relative bg-white border border-gray-200 p-8 text-left shadow-sm rounded-xl">
              <div className="text-4xl font-bold text-accent opacity-20 mb-4">01</div>
              <h3 className="text-2xl mb-4 text-dark">Discovery</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">We begin by deeply understanding your brand, business goals, audience, and market position. This foundational phase ensures all subsequent work is strategically aligned with your objectives.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Stakeholder interviews</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Market research and analysis</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Audience insights gathering</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Competitive landscape review</li>
              </ul>
              <Button variant="outline" to="/contact">Start here</Button>
            </div>
          </div>
          
          <div className="flex justify-start mb-20 relative reveal-text md:justify-start md:pl-0 pl-12">
            <div className="w-full md:w-5/12 relative bg-white border border-gray-200 p-8 text-left shadow-sm rounded-xl">
              <div className="text-4xl font-bold text-accent opacity-20 mb-4">02</div>
              <h3 className="text-2xl mb-4 text-dark">Strategy Development</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">Based on our discoveries, we craft a comprehensive brand strategy that defines your unique market position and systematic approach to building trust with your audience.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand positioning</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Messaging framework</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand architecture</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Communication strategy</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end mb-20 relative reveal-text md:justify-end md:pl-0 pl-12">
            <div className="w-full md:w-5/12 relative bg-white border border-gray-200 p-8 text-left shadow-sm rounded-xl">
              <div className="text-4xl font-bold text-accent opacity-20 mb-4">03</div>
              <h3 className="text-2xl mb-4 text-dark">Design Implementation</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">We bring your brand to life through cohesive visual identity and consistent experiences across all touchpoints, ensuring every interaction reinforces your brand promise.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Visual identity development</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand guidelines creation</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Digital experience design</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Marketing collateral design</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-start mb-0 relative reveal-text md:justify-start md:pl-0 pl-12">
            <div className="w-full md:w-5/12 relative bg-white border border-gray-200 p-8 text-left shadow-sm rounded-xl">
              <div className="text-4xl font-bold text-accent opacity-20 mb-4">04</div>
              <h3 className="text-2xl mb-4 text-dark">Brand Evolution</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">We provide ongoing support to help your brand grow and adapt while maintaining authenticity and scaling impact in your community and market.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Performance measurement</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand refinement</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Growth strategy</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Community engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      
      <Section background="primary">
        <SectionHeader
          subtitle="Our framework"
          title="The pillars of our approach"
          description="The Invisible Bond Framework™ is built on these key principles that guide our work and ensure meaningful results for our clients."
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="reveal-text border-2 border-gray-200 p-8 transition-all duration-300 rounded-xl hover:border-accent">
            <AuthenticConnectionIcon />
            <h3 className="text-xl mb-4 text-dark">Authentic Connection</h3>
            <p className="opacity-80 leading-relaxed text-dark">Building genuine relationships between brands and their audiences based on shared values and transparent communication.</p>
          </div>
          
          <div className="reveal-text border-2 border-gray-200 p-8 transition-all duration-300 rounded-xl hover:border-accent">
            <StrategicAlignmentIcon />
            <h3 className="text-xl mb-4 text-dark">Strategic Alignment</h3>
            <p className="opacity-80 leading-relaxed text-dark">Ensuring all brand elements and experiences are purposefully aligned with business objectives and audience needs.</p>
          </div>
          
          <div className="reveal-text border-2 border-gray-200 p-8 transition-all duration-300 rounded-xl hover:border-accent">
            <CommunityIntegrationIcon />
            <h3 className="text-xl mb-4 text-dark">Community Integration</h3>
            <p className="opacity-80 leading-relaxed text-dark">Positioning brands as valuable contributors to their communities, fostering trust and loyalty beyond transactions.</p>
          </div>
          
          <div className="reveal-text border-2 border-gray-200 p-8 transition-all duration-300 rounded-xl hover:border-accent">
            <ConsistentExperienceIcon />
            <h3 className="text-xl mb-4 text-dark">Consistent Experience</h3>
            <p className="opacity-80 leading-relaxed text-dark">Creating cohesive brand experiences across all touchpoints that reinforce your brand promise and build recognition.</p>
          </div>
          
          <div className="reveal-text border-2 border-gray-200 p-8 transition-all duration-300 rounded-xl hover:border-accent">
            <MeasurableImpactIcon />
            <h3 className="text-xl mb-4 text-dark">Measurable Impact</h3>
            <p className="opacity-80 leading-relaxed text-dark">Defining clear metrics to track brand performance and business growth resulting from our strategic interventions.</p>
          </div>
          
          <div className="reveal-text border-2 border-gray-200 p-8 transition-all duration-300 rounded-xl hover:border-accent">
            <AdaptiveEvolutionIcon />
            <h3 className="text-xl mb-4 text-dark">Adaptive Evolution</h3>
            <p className="opacity-80 leading-relaxed text-dark">Building brands with flexibility to grow and evolve while maintaining their core essence and authentic connections.</p>
          </div>
        </div>
      </Section>
      
      <Section background="light">
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text">
              <h2 className="text-4xl font-bold mb-6 text-dark">Our collaborative approach</h2>
              <p className="text-base leading-relaxed mb-4 opacity-80 text-dark">We believe the best results come from true collaboration. Throughout our process, we work closely with you, treating you as a partner rather than just a client.</p>
              <p className="text-base leading-relaxed mb-4 opacity-80 text-dark">This collaborative approach ensures that the final outcome not only meets your business objectives but also authentically represents your brand's unique voice and values.</p>
              <p className="text-base leading-relaxed mb-8 opacity-80 text-dark">We maintain open communication, regular check-ins, and collaborative workshops to keep you involved and informed at every stage of the process.</p>
              <Button to="/contact" variant="primary" className="reveal-text">Start your project</Button>
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text relative h-96 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Collaborative approach" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </GridItem>
        </Grid>
      </Section>
      
      <CTASection
        title="Ready to transform your brand?"
        description="Let's apply our Invisible Bond Framework™ to create authentic connections that drive sustainable growth for your business."
        buttonText="Schedule a consultation"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default Process;
