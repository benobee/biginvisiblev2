import { useEffect } from 'react';
import styled from 'styled-components';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import { initRevealAnimations } from '../utils/animations';
import {
  AuthenticConnectionIcon,
  StrategicAlignmentIcon,
  CommunityIntegrationIcon,
  ConsistentExperienceIcon,
  MeasurableImpactIcon,
  AdaptiveEvolutionIcon
} from '../components/ui/ProcessIcons';

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

const ProcessTimeline = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.section} 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: ${({ theme }) => theme.colors.accent};
    transform: translateX(-50%);
    opacity: 0.3;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div<{ align?: 'left' | 'right' }>`
  display: flex;
  justify-content: ${({ align }) => align === 'left' ? 'flex-start' : 'flex-end'};
  margin-bottom: ${({ theme }) => theme.spacing.section};
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    padding-left: 50px;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .timeline-content {
    width: 45%;
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: ${({ theme }) => theme.spacing.xl};
    text-align: left;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 100%;
    }
  }
  
  .timeline-dot {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    left: ${({ align }) => align === 'left' ? 'auto' : '-11.25%'};
    right: ${({ align }) => align === 'left' ? '-11.25%' : 'auto'};
    transform: translateX(${({ align }) => align === 'left' ? '50%' : '-50%'});
    z-index: 2;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: -40px;
      right: auto;
      transform: translateX(0);
    }
    
    &::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors.accent};
      opacity: 0.5;
    }
  }
  
  .timeline-number {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
    
    li {
      position: relative;
      padding-left: ${({ theme }) => theme.spacing.lg};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      opacity: 0.8;
      
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 6px;
        height: 6px;
        background-color: ${({ theme }) => theme.colors.accent};
        border-radius: 50%;
      }
    }
  }
`;

const FrameworkSection = styled(Section)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundAlt} 100%);
`;

const FrameworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FrameworkItem = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.default};
  border-radius: 10px;
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const Process = () => {
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
                <h1 className="reveal-text">The <span className="text-gradient">Invisible Bond</span> Framework™</h1>
                <p className="subtitle reveal-text">
                  Our systematic approach to building lasting brand relationships that strengthen entire business ecosystems.
                </p>
              </HeroContent>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text" style={{ height: '400px', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Our process" 
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
          title="Our process"
          description="We follow a structured yet flexible process that ensures we deliver results that exceed expectations while adapting to your unique needs."
          align="center"
        />
        
        <ProcessTimeline>
          <TimelineItem align="right" className="reveal-text">
            <div className="timeline-content">
              <div className="timeline-dot"></div>
              <div className="timeline-number">01</div>
              <h3>Discovery</h3>
              <p>We begin by deeply understanding your brand, business goals, audience, and market position. This foundational phase ensures all subsequent work is strategically aligned with your objectives.</p>
              <ul>
                <li>Stakeholder interviews</li>
                <li>Market research and analysis</li>
                <li>Audience insights gathering</li>
                <li>Competitive landscape review</li>
              </ul>
              <Button variant="outline" to="/contact">Start here</Button>
            </div>
          </TimelineItem>
          
          <TimelineItem align="left" className="reveal-text">
            <div className="timeline-content">
              <div className="timeline-dot"></div>
              <div className="timeline-number">02</div>
              <h3>Strategy Development</h3>
              <p>Based on our discoveries, we craft a comprehensive brand strategy that defines your unique market position and systematic approach to building trust with your audience.</p>
              <ul>
                <li>Brand positioning</li>
                <li>Messaging framework</li>
                <li>Brand architecture</li>
                <li>Communication strategy</li>
              </ul>
            </div>
          </TimelineItem>
          
          <TimelineItem align="right" className="reveal-text">
            <div className="timeline-content">
              <div className="timeline-dot"></div>
              <div className="timeline-number">03</div>
              <h3>Design Implementation</h3>
              <p>We bring your brand to life through cohesive visual identity and consistent experiences across all touchpoints, ensuring every interaction reinforces your brand promise.</p>
              <ul>
                <li>Visual identity development</li>
                <li>Brand guidelines creation</li>
                <li>Digital experience design</li>
                <li>Marketing collateral design</li>
              </ul>
            </div>
          </TimelineItem>
          
          <TimelineItem align="left" className="reveal-text">
            <div className="timeline-content">
              <div className="timeline-dot"></div>
              <div className="timeline-number">04</div>
              <h3>Brand Evolution</h3>
              <p>We provide ongoing support to help your brand grow and adapt while maintaining authenticity and scaling impact in your community and market.</p>
              <ul>
                <li>Performance measurement</li>
                <li>Brand refinement</li>
                <li>Growth strategy</li>
                <li>Community engagement</li>
              </ul>
            </div>
          </TimelineItem>
        </ProcessTimeline>
      </Section>
      
      <FrameworkSection>
        <SectionHeader
          subtitle="Our framework"
          title="The pillars of our approach"
          description="The Invisible Bond Framework™ is built on these key principles that guide our work and ensure meaningful results for our clients."
          align="center"
        />
        
        <FrameworkGrid>
          <FrameworkItem className="reveal-text">
            <AuthenticConnectionIcon />
            <h3>Authentic Connection</h3>
            <p>Building genuine relationships between brands and their audiences based on shared values and transparent communication.</p>
          </FrameworkItem>
          
          <FrameworkItem className="reveal-text">
            <StrategicAlignmentIcon />
            <h3>Strategic Alignment</h3>
            <p>Ensuring all brand elements and experiences are purposefully aligned with business objectives and audience needs.</p>
          </FrameworkItem>
          
          <FrameworkItem className="reveal-text">
            <CommunityIntegrationIcon />
            <h3>Community Integration</h3>
            <p>Positioning brands as valuable contributors to their communities, fostering trust and loyalty beyond transactions.</p>
          </FrameworkItem>
          
          <FrameworkItem className="reveal-text">
            <ConsistentExperienceIcon />
            <h3>Consistent Experience</h3>
            <p>Creating cohesive brand experiences across all touchpoints that reinforce your brand promise and build recognition.</p>
          </FrameworkItem>
          
          <FrameworkItem className="reveal-text">
            <MeasurableImpactIcon />
            <h3>Measurable Impact</h3>
            <p>Defining clear metrics to track brand performance and business growth resulting from our strategic interventions.</p>
          </FrameworkItem>
          
          <FrameworkItem className="reveal-text">
            <AdaptiveEvolutionIcon />
            <h3>Adaptive Evolution</h3>
            <p>Building brands with flexibility to grow and evolve while maintaining their core essence and authentic connections.</p>
          </FrameworkItem>
        </FrameworkGrid>
      </FrameworkSection>
      
      <Section>
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text">
              <h2>Our collaborative approach</h2>
              <p>We believe the best results come from true collaboration. Throughout our process, we work closely with you, treating you as a partner rather than just a client.</p>
              <p>This collaborative approach ensures that the final outcome not only meets your business objectives but also authentically represents your brand's unique voice and values.</p>
              <p>We maintain open communication, regular check-ins, and collaborative workshops to keep you involved and informed at every stage of the process.</p>
              <Button to="/contact" variant="primary" className="reveal-text">Start your project</Button>
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text" style={{ height: '400px', position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Collaborative approach" 
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
      </Section>
      
      <Section background="accent">
        <div style={{ textAlign: 'center' }}>
          <h2 className="reveal-text">Ready to transform your brand?</h2>
          <p className="reveal-text" style={{ marginBottom: '2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto 2rem' }}>
            Let's apply our Invisible Bond Framework™ to create authentic connections that drive sustainable growth for your business.
          </p>
          <Button to="/contact" variant="secondary" className="reveal-text">Schedule a consultation</Button>
        </div>
      </Section>
    </>
  );
};

export default Process;
