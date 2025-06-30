import { useEffect } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import TimelineStep from '../components/TimelineStep';
import FrameworkCard from '../components/FrameworkCard';
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
        
        <div>
          <TimelineStep
            phase={1}
            title="Discovery"
            description="We begin by deeply understanding your brand, business goals, audience, and market position. This foundational phase ensures all subsequent work is strategically aligned with your objectives."
            deliverables={[
              "Stakeholder interviews",
              "Market research and analysis",
              "Audience insights gathering",
              "Competitive landscape review"
            ]}
          />

          <TimelineStep
            phase={2}
            title="Strategy Development"
            description="Based on our discoveries, we craft a comprehensive brand strategy that defines your unique market position and systematic approach to building trust with your audience."
            deliverables={[
              "Brand positioning",
              "Messaging framework",
              "Brand architecture",
              "Communication strategy"
            ]}
          />

          <TimelineStep
            phase={3}
            title="Design Implementation"
            description="We bring your brand to life through cohesive visual identity and consistent experiences across all touchpoints, ensuring every interaction reinforces your brand promise."
            deliverables={[
              "Visual identity development",
              "Brand guidelines creation",
              "Digital experience design",
              "Marketing collateral design"
            ]}
          />

          <TimelineStep
            phase={4}
            title="Brand Evolution"
            description="We provide ongoing support to help your brand grow and adapt while maintaining authenticity and scaling impact in your community and market."
            deliverables={[
              "Performance measurement",
              "Brand refinement",
              "Growth strategy",
              "Community engagement"
            ]}
          />
        </div>
      </Section>
      
      <Section background="primary">
        <SectionHeader
          subtitle="Our framework"
          title="The pillars of our approach"
          description="The Invisible Bond Framework™ is built on these key principles that guide our work and ensure meaningful results for our clients."
          align="center"
        />
        
        <Grid columns={3} gap="xl">
          <GridItem span={1}>
            <FrameworkCard
              icon={<AuthenticConnectionIcon />}
              title="Authentic Connection"
              description="Building genuine relationships between brands and their audiences based on shared values and transparent communication."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<StrategicAlignmentIcon />}
              title="Strategic Alignment"
              description="Ensuring all brand elements and experiences are purposefully aligned with business objectives and audience needs."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<CommunityIntegrationIcon />}
              title="Community Integration"
              description="Positioning brands as valuable contributors to their communities, fostering trust and loyalty beyond transactions."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<ConsistentExperienceIcon />}
              title="Consistent Experience"
              description="Creating cohesive brand experiences across all touchpoints that reinforce your brand promise and build recognition."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<MeasurableImpactIcon />}
              title="Measurable Impact"
              description="Defining clear metrics to track brand performance and business growth resulting from our strategic interventions."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<AdaptiveEvolutionIcon />}
              title="Adaptive Evolution"
              description="Building brands with flexibility to grow and evolve while maintaining their core essence and authentic connections."
            />
          </GridItem>
        </Grid>
      </Section>
      
      <Section background="light">
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text">
              <h2 className="text-4xl font-bold mb-6 text-dark">Our collaborative approach</h2>
              <p>We believe the best results come from true collaboration. Throughout our process, we work closely with you, treating you as a partner rather than just a client.</p>
              <p>This collaborative approach ensures that the final outcome not only meets your business objectives but also authentically represents your brand's unique voice and values.</p>
              <p>We maintain open communication, regular check-ins, and collaborative workshops to keep you involved and informed at every stage of the process.</p>
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
