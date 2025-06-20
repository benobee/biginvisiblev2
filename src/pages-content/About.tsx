import { useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import { initRevealAnimations } from '../utils/animations';

const HeroSection = styled.section`
  min-height: 70vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 120px;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  
  h1 {
    font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.typography.fontSize['5xl']});
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: clamp(1rem, 2vw, ${({ theme }) => theme.typography.fontSize.xl});
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    opacity: 0.8;
    line-height: 1.6;
    max-width: 600px;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TeamMember = styled.div`
  text-align: center;
  
  .member-image {
    width: 100%;
    aspect-ratio: 1/1;
    background-color: rgba(255, 255, 255, 0.05);
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    overflow: hidden;
    border-radius: 12px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform ${({ theme }) => theme.transitions.default};
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  .position {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  .bio {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ValueItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  text-align: left;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 58, 70, 0.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 58, 70, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.default};
    pointer-events: none;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  .value-icon {
    font-size: 4rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    display: block;
    position: relative;
    z-index: 2;
    color: red;
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.accent};
    position: relative;
    z-index: 2;
  }
  
  p {
    opacity: 0.9;
    line-height: 1.6;
    position: relative;
    z-index: 2;
  }
`;

const QuirkySection = styled(Section)`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.background} 0%, 
    rgba(255, 58, 70, 0.05) 50%, 
    ${({ theme }) => theme.colors.background} 100%
  );
`;

const FunFactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const FunFact = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  
  .fact-emoji {
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  .fact-text {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    opacity: 0.8;
    font-style: italic;
  }
`;

const StatsSection = styled(Section)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundAlt} 100%);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  .label {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const About = () => {
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
  return (
    <>
      <HeroSection>
        <div className="container">
          <Grid>
            <GridItem span={6}>
              <HeroContent>
                <h1 className="reveal-text">We are <span className="text-gradient">Big Invisible</span></h1>
                <p className="subtitle reveal-text">
                  A brand architecture studio that helps businesses build authentic connections with their communities through strategic design and meaningful experiences.
                </p>
              </HeroContent>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text" style={{ height: '400px', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Big Invisible Team" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    opacity: '0.8'
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(15, 25, 35, 0.3) 0%, rgba(15, 25, 35, 0.8) 100%)'
                }}></div>
              </div>
            </GridItem>
          </Grid>
        </div>
      </HeroSection>
      
      <Section>
        <SectionHeader
          title="Our story"
          description="Big Invisible was founded with a simple mission: to help businesses build authentic connections with their communities. We believe that the most powerful brands are those that create meaningful relationships with their customers, employees, and stakeholders."
          align="center"
        />
        
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text" style={{ height: '400px', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="About Big Invisible" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  opacity: '0.8'
                }} 
              />
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text">
              <h3>Our philosophy</h3>
              <p>We believe that the most powerful elements of a brand are often invisible — the emotional connections, trust, and community relationships that drive long-term success.</p>
              <p>Our approach focuses on making these invisible bonds visible through strategic design and meaningful experiences that resonate with your audience.</p>
              <p>By architecting these connections with intention, we help businesses transform into trusted community leaders that drive sustainable growth.</p>
            </div>
          </GridItem>
        </Grid>
      </Section>
      
      <Section background="secondary">
        <SectionHeader
          subtitle="Our team"
          title="Meet the people behind Big Invisible"
          description="We're a diverse team of strategists, designers, and creative thinkers passionate about building authentic brand connections."
          align="center"
        />
        
        <TeamGrid>
          <TeamMember className="reveal-text">
            <div className="member-image">
              <img src="/images/ingrid.jpg" alt="Ingrid Obee" />
            </div>
            <h3>Ingrid Obee</h3>
            <div className="position">Founder & Creative Director</div>
            <p className="bio">With over 20 years of experience in brand strategy and design, Ingrid leads our creative vision and strategic direction.</p>
          </TeamMember>
          
          <TeamMember className="reveal-text">
            <div className="member-image">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Michael Chen" />
            </div>
            <h3>Michael Chen</h3>
            <div className="position">Brand Strategist</div>
            <p className="bio">Michael specializes in developing brand strategies that create meaningful connections between businesses and their communities.</p>
          </TeamMember>
          
          <TeamMember className="reveal-text">
            <div className="member-image">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Emma Rodriguez" />
            </div>
            <h3>Emma Rodriguez</h3>
            <div className="position">Design Lead</div>
            <p className="bio">Emma brings brands to life through cohesive visual identities and engaging digital experiences that resonate with audiences.</p>
          </TeamMember>
          
          <TeamMember className="reveal-text">
            <div className="member-image">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="David Kim" />
            </div>
            <h3>David Kim</h3>
            <div className="position">Digital Experience Designer</div>
            <p className="bio">David creates intuitive, engaging digital experiences that strengthen brands and drive meaningful connections.</p>
          </TeamMember>
          
          <TeamMember className="reveal-text">
            <div className="member-image">
              <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Pixel the Office Dog" />
            </div>
            <h3>Pixel</h3>
            <div className="position">Chief Happiness Officer</div>
            <p className="bio">Pixel keeps morale high and ensures no meeting goes too long. Expert in stress relief, treat negotiations, and unconditional support.</p>
          </TeamMember>
        </TeamGrid>
      </Section>
      
      <QuirkySection>
        <SectionHeader
          subtitle="Our values"
          title="What drives us (and makes us unique)"
          description="These core principles guide our work, relationships, and daily coffee consumption."
          align="center"
        />
        
        <ValueGrid>
          <ValueItem className="reveal-text">
            <h3>Authenticity</h3>
            <p>We believe in creating brands that are true to their core values and resonate authentically with their audiences. No fake smiles or corporate jargon here.</p>
          </ValueItem>
          
          <ValueItem className="reveal-text">
            <h3>Community</h3>
            <p>We focus on building brands that strengthen communities and create meaningful connections between businesses and people. Think less networking, more friendworking.</p>
          </ValueItem>
          
          <ValueItem className="reveal-text">
            <h3>Innovation</h3>
            <p>We constantly explore new approaches and technologies to help our clients stay ahead. We're basically professional curiosity cats (minus the danger).</p>
          </ValueItem>
          
          <ValueItem className="reveal-text">
            <h3>Impact</h3>
            <p>We measure our success by the positive impact our work has on our clients' businesses and their communities. Good vibes only, but make it measurable.</p>
          </ValueItem>
          
          <ValueItem className="reveal-text">
            <h3>Collaboration</h3>
            <p>We work closely with our clients, treating them as partners in the creative process. It's like a creative sandwich, but everyone gets fed.</p>
          </ValueItem>
          
          <ValueItem className="reveal-text">
            <h3>Excellence</h3>
            <p>We hold ourselves to the highest standards in everything we do. Perfectionism with a smile and probably too much attention to detail.</p>
          </ValueItem>
        </ValueGrid>
        
        <FunFactsGrid>
          <FunFact className="reveal-text">
            <div className="fact-text">We've consumed approximately 847 cups of coffee this quarter. Pixel prefers water.</div>
          </FunFact>
          
          <FunFact className="reveal-text">
            <div className="fact-text">Our Spotify wrapped shows 127 different genres. Creative minds need diverse soundtracks.</div>
          </FunFact>
          
          <FunFact className="reveal-text">
            <div className="fact-text">Tuesday is taco day. This is non-negotiable and has improved our brainstorming by 73%.</div>
          </FunFact>
          
          <FunFact className="reveal-text">
            <div className="fact-text">We've said "pivot" ironically so many times it's lost all meaning. We're working on rehabilitation.</div>
          </FunFact>
        </FunFactsGrid>
      </QuirkySection>
      
      <StatsSection>
        <StatsGrid>
          <StatItem className="reveal-text">
            <div className="number">50+</div>
            <div className="label">Happy Clients</div>
          </StatItem>
          
          <StatItem className="reveal-text">
            <div className="number">95%</div>
            <div className="label">Client Retention</div>
          </StatItem>
          
          <StatItem className="reveal-text">
            <div className="number">120+</div>
            <div className="label">Projects Completed</div>
          </StatItem>
          
          <StatItem className="reveal-text">
            <div className="number">∞</div>
            <div className="label">Dog Treats Given</div>
          </StatItem>
        </StatsGrid>
      </StatsSection>
      
      <Section background="accent">
        <div style={{ textAlign: 'center' }}>
          <h2 className="reveal-text">Ready to work with us?</h2>
          <p className="reveal-text" style={{ marginBottom: '2rem', opacity: 0.9 }}>Let's create authentic connections that transform your business and strengthen your community. Coffee and dog pics included.</p>
          <Button to="/contact" variant="secondary" className="reveal-text">Get in touch</Button>
        </div>
      </Section>
    </>
  );
};

export default About;
