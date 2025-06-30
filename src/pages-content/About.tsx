import { useEffect } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import TeamMember from '../components/TeamMember';
import ValueCard from '../components/ValueCard';
import FunFactCard from '../components/FunFactCard';
import DataPoint from '../components/DataPoint';
import CTASection from '../components/ui/CTASection';
import { initRevealAnimations } from '../utils/animations';

const About = () => {
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
                <h1 className="reveal-text text-4xl lg:text-5xl xl:text-6xl mb-6 font-bold leading-tight tracking-tight text-dark">We are <span className="text-accent">Big Invisible</span></h1>
                <p className="reveal-text text-lg lg:text-xl mb-8 opacity-80 leading-relaxed max-w-2xl text-dark">
                  A brand architecture studio that helps businesses build authentic connections with their communities through strategic design and meaningful experiences.
                </p>
              </div>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text relative h-96 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Big Invisible Team" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </GridItem>
          </Grid>
        </div>
      </section>
      
      <Section background="light">
        <SectionHeader
          title="Our story"
          description="Big Invisible was founded with a simple mission: to help businesses build authentic connections with their communities. We believe that the most powerful brands are those that create meaningful relationships with their customers, employees, and stakeholders."
          align="center"
        />
        
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text h-96 bg-gray-200 mb-8 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="About Big Invisible" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text">
              <h3 className="text-3xl font-bold mb-6 text-dark">Our philosophy</h3>
              <p>We believe that the most powerful elements of a brand are often invisible — the emotional connections, trust, and community relationships that drive long-term success.</p>
              <p >Our approach focuses on making these invisible bonds visible through strategic design and meaningful experiences that resonate with your audience.</p>
              <p >By architecting these connections with intention, we help businesses transform into trusted community leaders that drive sustainable growth.</p>
            </div>
          </GridItem>
        </Grid>
      </Section>
      
      <Section background="primary">
        <SectionHeader
          subtitle="Our team"
          title="Meet the people behind Big Invisible"
          description="We're a diverse team of strategists, designers, and creative thinkers passionate about building authentic brand connections."
          align="center"
        />
        
        <Grid columns={6} gap="small">
          <GridItem span={3}>
            <TeamMember
              name="Ingrid Obee"
              role="Founder & Creative Director"
              bio="With over 20 years of experience in brand strategy and design, Ingrid leads our creative vision and strategic direction."
              image="/images/ingrid.jpg"
            />
          </GridItem>
          
          <GridItem span={3}>
            <TeamMember
              name="Michael Chen"
              role="Brand Strategist"
              bio="Michael specializes in developing brand strategies that create meaningful connections between businesses and their communities."
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            />
          </GridItem>
          
          <GridItem span={2}>
            <TeamMember
              name="Emma Rodriguez"
              role="Design Lead"
              bio="Emma brings brands to life through cohesive visual identities and engaging digital experiences that resonate with audiences."
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            />
          </GridItem>
          
          <GridItem span={2}>
            <TeamMember
              name="David Kim"
              role="Digital Experience Designer"
              bio="David creates intuitive, engaging digital experiences that strengthen brands and drive meaningful connections."
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            />
          </GridItem>
          
          <GridItem span={2}>
            <TeamMember
              name="Pixel"
              role="Chief Happiness Officer"
              bio="Pixel keeps morale high and ensures no meeting goes too long. Expert in stress relief, treat negotiations, and unconditional support."
              image="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            />
          </GridItem>
        </Grid>
      </Section>
      
      <Section background="light">
        <SectionHeader
          subtitle="Our values"
          title="What drives us (and makes us unique)"
          description="These core principles guide our work, relationships, and daily coffee consumption."
          align="center"
        />
        
        <Grid columns={3} gap="xl">
          <GridItem span={1}>
            <ValueCard
              title="Authenticity"
              description="We believe in creating brands that are true to their core values and resonate authentically with their audiences. No fake smiles or corporate jargon here."
            />
          </GridItem>
          
          <GridItem span={1}>
            <ValueCard
              title="Community"
              description="We focus on building brands that strengthen communities and create meaningful connections between businesses and people. Think less networking, more friendworking."
            />
          </GridItem>
          
          <GridItem span={1}>
            <ValueCard
              title="Innovation"
              description="We constantly explore new approaches and technologies to help our clients stay ahead. We're basically professional curiosity cats (minus the danger)."
            />
          </GridItem>
          
          <GridItem span={1}>
            <ValueCard
              title="Impact"
              description="We measure our success by the positive impact our work has on our clients' businesses and their communities. Good vibes only, but make it measurable."
            />
          </GridItem>
          
          <GridItem span={1}>
            <ValueCard
              title="Collaboration"
              description="We work closely with our clients, treating them as partners in the creative process. It's like a creative sandwich, but everyone gets fed."
            />
          </GridItem>
          
          <GridItem span={1}>
            <ValueCard
              title="Excellence"
              description="We hold ourselves to the highest standards in everything we do. Perfectionism with a smile and probably too much attention to detail."
            />
          </GridItem>
        </Grid>
        
        <Grid columns={4} gap="medium" className="mt-8">
          <GridItem span={1}>
            <FunFactCard fact="We've consumed approximately 847 cups of coffee this quarter. Pixel prefers water." />
          </GridItem>
          
          <GridItem span={1}>
            <FunFactCard fact="Our Spotify wrapped shows 127 different genres. Creative minds need diverse soundtracks." />
          </GridItem>
          
          <GridItem span={1}>
            <FunFactCard fact="Tuesday is taco day. This is non-negotiable and has improved our brainstorming by 73%." />
          </GridItem>
          
          <GridItem span={1}>
            <FunFactCard fact="We've said 'pivot' ironically so many times it's lost all meaning. We're working on rehabilitation." />
          </GridItem>
        </Grid>
      </Section>
      
      <Section background="primary">
        <Grid columns={4} gap="large">
          <GridItem span={1}>
            <DataPoint value="50+" label="Happy Clients" />
          </GridItem>
          
          <GridItem span={1}>
            <DataPoint value="95%" label="Client Retention" />
          </GridItem>
          
          <GridItem span={1}>
            <DataPoint value="120+" label="Projects Completed" />
          </GridItem>
          
          <GridItem span={1}>
            <DataPoint value="∞" label="Dog Treats Given" />
          </GridItem>
        </Grid>
      </Section>
      
      <CTASection
        title="Ready to work with us?"
        description="Let's create authentic connections that transform your business and strengthen your community. Coffee and dog pics included."
        buttonText="Get in touch"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default About;
