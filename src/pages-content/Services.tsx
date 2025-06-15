import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import { initRevealAnimations } from '../utils/animations';
import { BrandStrategyIcon, VisualIdentityIcon, DigitalExperienceIcon, ContentStrategyIcon, BrandArchitectureIcon, CommunityBuildingIcon } from '../components/ui/ProcessIcons';

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

const ServiceCard = styled.div`
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-5px);
  }
  

  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
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
  
  .learn-more {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.accent};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-decoration: none;
    
    svg {
      margin-left: ${({ theme }) => theme.spacing.xs};
      transition: transform ${({ theme }) => theme.transitions.fast};
    }
    
    &:hover svg {
      transform: translateX(3px);
    }
  }
`;

const ProcessSection = styled(Section)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundAlt} 100%);
`;

const ProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .step-number {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.accent};
    margin-right: ${({ theme }) => theme.spacing.lg};
    min-width: 30px;
  }
  
  .step-content {
    h3 {
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
    
    p {
      opacity: 0.8;
      line-height: 1.6;
    }
  }
`;

const Services = () => {
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
                <h1 className="reveal-text">Our <span className="text-gradient">Services</span></h1>
                <p className="subtitle reveal-text">
                  We offer a comprehensive suite of brand architecture services designed to build authentic connections between your business and your community.
                </p>
                <Button to="/contact" variant="primary" className="reveal-text">Get started</Button>
              </HeroContent>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text" style={{ height: '400px', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Brand architecture services" 
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
          subtitle="Core services"
          title="How we can help you"
          description="Our services are designed to create meaningful connections between your brand and your audience, driving sustainable growth and community impact."
          align="center"
        />
        
        <Grid columns={3}>
          <GridItem span={1} className="reveal-text">
            <ServiceCard>
              <BrandStrategyIcon />
              <h3>Brand Strategy</h3>
              <p>Develop a clear, compelling brand strategy that differentiates your business and resonates with your target audience.</p>
              <ul>
                <li>Brand positioning</li>
                <li>Audience research</li>
                <li>Competitive analysis</li>
                <li>Brand messaging</li>
              </ul>
              <Link to="/services/brand-strategy" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <ServiceCard>
              <VisualIdentityIcon />
              <h3>Visual Identity</h3>
              <p>Create a cohesive visual system that communicates your brand's personality and values across all touchpoints.</p>
              <ul>
                <li>Logo design</li>
                <li>Color palette</li>
                <li>Typography system</li>
                <li>Brand guidelines</li>
              </ul>
              <Link to="/services/visual-identity" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <ServiceCard>
              <DigitalExperienceIcon />
              <h3>Digital Experience</h3>
              <p>Design intuitive, engaging digital experiences that strengthen your brand and drive meaningful connections.</p>
              <ul>
                <li>Website design</li>
                <li>User experience (UX)</li>
                <li>User interface (UI)</li>
                <li>Digital strategy</li>
              </ul>
              <Link to="/services/digital-experience" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <ServiceCard>
              <ContentStrategyIcon />
              <h3>Content Strategy</h3>
              <p>Develop a content strategy that tells your brand story and engages your audience across all channels.</p>
              <ul>
                <li>Content planning</li>
                <li>Storytelling</li>
                <li>Content creation</li>
                <li>Content distribution</li>
              </ul>
              <Link to="/services/content-strategy" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <ServiceCard>
              <BrandArchitectureIcon />
              <h3>Brand Architecture</h3>
              <p>Structure your brand portfolio to maximize clarity, relevance, and impact across all your offerings.</p>
              <ul>
                <li>Brand hierarchy</li>
                <li>Sub-brand strategy</li>
                <li>Brand extensions</li>
                <li>Portfolio management</li>
              </ul>
              <Link to="/services/brand-architecture" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <ServiceCard>
              <CommunityBuildingIcon />
              <h3>Community Building</h3>
              <p>Develop strategies to build and nurture communities around your brand, fostering loyalty and advocacy.</p>
              <ul>
                <li>Community strategy</li>
                <li>Engagement programs</li>
                <li>Ambassador programs</li>
                <li>Community events</li>
              </ul>
              <Link to="/services/community-building" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
          </GridItem>
        </Grid>
      </Section>
      
      <ProcessSection>
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text">
              <SectionHeader
                subtitle="Our approach"
                title="How we work with you"
                description="Our collaborative process ensures we deliver results that exceed expectations while adapting to your unique needs."
                align="left"
              />
              
              <ProcessStep className="reveal-text">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h3>Discovery</h3>
                  <p>We begin by deeply understanding your brand, business goals, audience, and market position.</p>
                </div>
              </ProcessStep>
              
              <ProcessStep className="reveal-text">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h3>Strategy Development</h3>
                  <p>We craft a comprehensive brand strategy that defines your unique market position.</p>
                </div>
              </ProcessStep>
              
              <ProcessStep className="reveal-text">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h3>Design Implementation</h3>
                  <p>We bring your brand to life through cohesive visual identity and consistent experiences, execute the strategy across all touchpoints, ensuring consistency and impact.</p>
                </div>
              </ProcessStep>
              
              <ProcessStep className="reveal-text">
                <div className="step-number">04</div>
                <div className="step-content">
                  <h3>Brand Evolution</h3>
                  <p>We provide ongoing support to help your brand grow and adapt while maintaining authenticity.</p>
                </div>
              </ProcessStep>
              
              <Button to="/process" variant="outline" className="reveal-text">Learn more about our process</Button>
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text" style={{ height: '100%', position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Our collaborative process" 
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
      </ProcessSection>
      
      <Section background="accent">
        <div style={{ textAlign: 'center' }}>
          <h2 className="reveal-text">Ready to transform your brand?</h2>
          <p className="reveal-text" style={{ marginBottom: '2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto 2rem' }}>
            Let's create authentic connections that transform your business and strengthen your community.
          </p>
          <Button to="/contact" variant="secondary" className="reveal-text">Schedule a consultation</Button>
        </div>
      </Section>
    </>
  );
};

export default Services;
