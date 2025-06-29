import { useEffect } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
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
              <p className="text-base leading-relaxed mb-4 opacity-80 text-dark">We believe that the most powerful elements of a brand are often invisible — the emotional connections, trust, and community relationships that drive long-term success.</p>
              <p className="text-base leading-relaxed mb-4 opacity-80 text-dark">Our approach focuses on making these invisible bonds visible through strategic design and meaningful experiences that resonate with your audience.</p>
              <p className="text-base leading-relaxed opacity-80 text-dark">By architecting these connections with intention, we help businesses transform into trusted community leaders that drive sustainable growth.</p>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <div className="reveal-text text-center">
            <div className="w-full aspect-square bg-gray-100 mb-6 overflow-hidden rounded-xl group">
              <img src="/images/ingrid.jpg" alt="Ingrid Obee" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl mb-2 text-dark">Ingrid Obee</h3>
            <div className="text-sm text-accent mb-4">Founder & Creative Director</div>
            <p className="text-sm opacity-80 leading-relaxed text-dark">With over 20 years of experience in brand strategy and design, Ingrid leads our creative vision and strategic direction.</p>
          </div>
          
          <div className="reveal-text text-center">
            <div className="w-full aspect-square bg-gray-100 mb-6 overflow-hidden rounded-xl group">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Michael Chen" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl mb-2 text-dark">Michael Chen</h3>
            <div className="text-sm text-accent mb-4">Brand Strategist</div>
            <p className="text-sm opacity-80 leading-relaxed text-dark">Michael specializes in developing brand strategies that create meaningful connections between businesses and their communities.</p>
          </div>
          
          <div className="reveal-text text-center">
            <div className="w-full aspect-square bg-gray-100 mb-6 overflow-hidden rounded-xl group">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Emma Rodriguez" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl mb-2 text-dark">Emma Rodriguez</h3>
            <div className="text-sm text-accent mb-4">Design Lead</div>
            <p className="text-sm opacity-80 leading-relaxed text-dark">Emma brings brands to life through cohesive visual identities and engaging digital experiences that resonate with audiences.</p>
          </div>
          
          <div className="reveal-text text-center">
            <div className="w-full aspect-square bg-gray-100 mb-6 overflow-hidden rounded-xl group">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="David Kim" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl mb-2 text-dark">David Kim</h3>
            <div className="text-sm text-accent mb-4">Digital Experience Designer</div>
            <p className="text-sm opacity-80 leading-relaxed text-dark">David creates intuitive, engaging digital experiences that strengthen brands and drive meaningful connections.</p>
          </div>
          
          <div className="reveal-text text-center">
            <div className="w-full aspect-square bg-gray-100 mb-6 overflow-hidden rounded-xl group">
              <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Pixel the Office Dog" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl mb-2 text-dark">Pixel</h3>
            <div className="text-sm text-accent mb-4">Chief Happiness Officer</div>
            <p className="text-sm opacity-80 leading-relaxed text-dark">Pixel keeps morale high and ensures no meeting goes too long. Expert in stress relief, treat negotiations, and unconditional support.</p>
          </div>
        </div>
      </Section>
      
      <Section background="light">
        <SectionHeader
          subtitle="Our values"
          title="What drives us (and makes us unique)"
          description="These core principles guide our work, relationships, and daily coffee consumption."
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="reveal-text bg-white border border-gray-200 p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-md">
            <h3 className="text-xl mb-4 text-accent">Authenticity</h3>
            <p className="opacity-80 leading-relaxed text-dark">We believe in creating brands that are true to their core values and resonate authentically with their audiences. No fake smiles or corporate jargon here.</p>
          </div>
          
          <div className="reveal-text bg-white border border-gray-200 p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-md">
            <h3 className="text-xl mb-4 text-accent">Community</h3>
            <p className="opacity-80 leading-relaxed text-dark">We focus on building brands that strengthen communities and create meaningful connections between businesses and people. Think less networking, more friendworking.</p>
          </div>
          
          <div className="reveal-text bg-white border border-gray-200 p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-md">
            <h3 className="text-xl mb-4 text-accent">Innovation</h3>
            <p className="opacity-80 leading-relaxed text-dark">We constantly explore new approaches and technologies to help our clients stay ahead. We're basically professional curiosity cats (minus the danger).</p>
          </div>
          
          <div className="reveal-text bg-white border border-gray-200 p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-md">
            <h3 className="text-xl mb-4 text-accent">Impact</h3>
            <p className="opacity-80 leading-relaxed text-dark">We measure our success by the positive impact our work has on our clients' businesses and their communities. Good vibes only, but make it measurable.</p>
          </div>
          
          <div className="reveal-text bg-white border border-gray-200 p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-md">
            <h3 className="text-xl mb-4 text-accent">Collaboration</h3>
            <p className="opacity-80 leading-relaxed text-dark">We work closely with our clients, treating them as partners in the creative process. It's like a creative sandwich, but everyone gets fed.</p>
          </div>
          
          <div className="reveal-text bg-white border border-gray-200 p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-md">
            <h3 className="text-xl mb-4 text-accent">Excellence</h3>
            <p className="opacity-80 leading-relaxed text-dark">We hold ourselves to the highest standards in everything we do. Perfectionism with a smile and probably too much attention to detail.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="reveal-text bg-white p-6 rounded-xl border-l-4 border-accent">
            <div className="text-sm opacity-80 italic text-dark">We've consumed approximately 847 cups of coffee this quarter. Pixel prefers water.</div>
          </div>
          
          <div className="reveal-text bg-white p-6 rounded-xl border-l-4 border-accent">
            <div className="text-sm opacity-80 italic text-dark">Our Spotify wrapped shows 127 different genres. Creative minds need diverse soundtracks.</div>
          </div>
          
          <div className="reveal-text bg-white p-6 rounded-xl border-l-4 border-accent">
            <div className="text-sm opacity-80 italic text-dark">Tuesday is taco day. This is non-negotiable and has improved our brainstorming by 73%.</div>
          </div>
          
          <div className="reveal-text bg-white p-6 rounded-xl border-l-4 border-accent">
            <div className="text-sm opacity-80 italic text-dark">We've said "pivot" ironically so many times it's lost all meaning. We're working on rehabilitation.</div>
          </div>
        </div>
      </Section>
      
      <Section background="primary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="reveal-text text-center">
            <div className="text-5xl font-bold text-accent mb-3">50+</div>
            <div className="text-sm uppercase tracking-wider text-dark">Happy Clients</div>
          </div>
          
          <div className="reveal-text text-center">
            <div className="text-5xl font-bold text-accent mb-3">95%</div>
            <div className="text-sm uppercase tracking-wider text-dark">Client Retention</div>
          </div>
          
          <div className="reveal-text text-center">
            <div className="text-5xl font-bold text-accent mb-3">120+</div>
            <div className="text-sm uppercase tracking-wider text-dark">Projects Completed</div>
          </div>
          
          <div className="reveal-text text-center">
            <div className="text-5xl font-bold text-accent mb-3">∞</div>
            <div className="text-sm uppercase tracking-wider text-dark">Dog Treats Given</div>
          </div>
        </div>
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
