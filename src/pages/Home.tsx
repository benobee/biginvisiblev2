import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Hero Section
const Hero = styled.section`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  
  h1 {
    font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.typography.fontSize['6xl']});
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .tagline {
    font-size: clamp(1.25rem, 3vw, ${({ theme }) => theme.typography.fontSize['2xl']});
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.accent};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .subtitle {
    font-size: clamp(1rem, 2vw, ${({ theme }) => theme.typography.fontSize.xl});
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    opacity: 0.8;
    line-height: 1.6;
    max-width: 600px;
  }
`;

const HeroShape = styled.div`
  position: absolute;
  top: 15%;
  right: -5%;
  width: 50%;
  height: 70%;
  background: linear-gradient(135deg, rgba(255, 58, 70, 0.1) 0%, rgba(255, 58, 70, 0.05) 100%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  filter: blur(40px);
  z-index: 1;
  animation: morphing 15s ease-in-out infinite;
  
  @keyframes morphing {
    0% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    25% {
      border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    }
    50% {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    }
    75% {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    }
    100% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(15, 25, 35, 0.9) 0%, rgba(15, 25, 35, 0.7) 100%);
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all ${({ theme }) => theme.transitions.default};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  margin-right: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all ${({ theme }) => theme.transitions.default};
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    opacity: 1;
  }
  
  .text {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  .line {
    width: 1px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.text};
    position: relative;
    overflow: hidden;
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.accent};
      animation: scrollDown 1.5s ease infinite;
    }
    
    @keyframes scrollDown {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }
  }
`;

// Services Section
const Services = styled.section`
  padding: ${({ theme }) => `${theme.spacing.section} 0`};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.section};
  max-width: 800px;
  
  .section-title {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h2 {
    font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.fontSize['4xl']});
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.1;
  }
  
  .description {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ServiceCard = styled.div`
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-5px);
  }
  
  .service-icon {
    color: ${({ theme }) => theme.colors.accent};
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    opacity: 0.8;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.6;
  }
  
  .learn-more {
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.accent};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    
    svg {
      margin-left: ${({ theme }) => theme.spacing.xs};
      transition: transform ${({ theme }) => theme.transitions.fast};
    }
    
    &:hover svg {
      transform: translateX(3px);
    }
  }
`;

// Process Section
const Process = styled.section`
  padding: ${({ theme }) => `${theme.spacing.section} 0`};
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.section};
`;

const ProcessStep = styled.div`
  position: relative;
  
  .step-number {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.2;
    position: absolute;
    top: -40px;
    left: -10px;
    z-index: 0;
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    position: relative;
    z-index: 1;
  }
  
  p {
    opacity: 0.8;
    line-height: 1.6;
    position: relative;
    z-index: 1;
  }
`;

// Featured Work Section
const FeaturedWork = styled.section`
  padding: ${({ theme }) => `${theme.spacing.section} 0`};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.section};
`;

const WorkItem = styled.div<{ span: number, start: number }>`
  grid-column: ${props => `${props.start} / span ${props.span}`};
  aspect-ratio: 16/9;
  overflow: hidden;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 25, 35, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: ${({ theme }) => theme.spacing.lg};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.default};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  .category {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.accent};
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
    
    .overlay {
      opacity: 1;
    }
  }
`;

// Testimonial Section
const Testimonial = styled.section`
  padding: ${({ theme }) => `${theme.spacing.section} 0`};
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

const TestimonialContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  blockquote {
    font-size: clamp(1.25rem, 3vw, ${({ theme }) => theme.typography.fontSize['3xl']});
    line-height: 1.4;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    position: relative;
    
    &:before, &:after {
      content: '"';
      color: ${({ theme }) => theme.colors.accent};
      font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
      position: absolute;
      opacity: 0.3;
    }
    
    &:before {
      top: -20px;
      left: -10px;
    }
    
    &:after {
      bottom: -40px;
      right: -10px;
    }
  }
  
  .client {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
  
  .position {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    opacity: 0.6;
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;

// Contact CTA Section
const ContactCTA = styled.section`
  padding: ${({ theme }) => `${theme.spacing.section} 0`};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.fontSize['4xl']});
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    opacity: 0.9;
  }
`;

const WhiteButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all ${({ theme }) => theme.transitions.default};
  border: 1px solid ${({ theme }) => theme.colors.text};
  
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Home = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal-text');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      <Hero>
        <HeroBackground>
          <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" alt="Hero background" />
        </HeroBackground>
        <HeroShape />
        <div className="container">
          <HeroContent>
            <div className="tagline reveal-text">Brand Architecture Studio</div>
            <h1 className="reveal-text">We make the <span className="text-gradient">invisible</span> bonds between brands and people visible</h1>
            <p className="subtitle reveal-text">Transform your business into a trusted authority through our systematic approach — where strategic brand architecture meets meaningful community impact.</p>
            <div className="reveal-text">
              <CTAButton to="/contact">Start a project</CTAButton>
              <SecondaryButton to="/work">View our work</SecondaryButton>
            </div>
          </HeroContent>
        </div>
        <ScrollIndicator onClick={scrollToServices}>
          <div className="text">Scroll</div>
          <div className="line"></div>
        </ScrollIndicator>
      </Hero>

      <Services ref={servicesRef}>
        <div className="container">
          <SectionHeader>
            <div className="section-title reveal-text">Services</div>
            <h2 className="reveal-text">Building authentic brand connections through strategic design</h2>
            <p className="description reveal-text">We don't just create pretty designs. We architect the invisible bonds that transform businesses into trusted community leaders.</p>
          </SectionHeader>
          
          <ServicesGrid>
            <ServiceCard className="reveal-text">
              <div className="service-icon">&#9679;</div>
              <h3>Brand Strategy</h3>
              <p>Develop a clear, compelling brand strategy that differentiates your business and resonates with your target audience.</p>
              <Link to="/services" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
            
            <ServiceCard className="reveal-text">
              <div className="service-icon">&#9679;</div>
              <h3>Visual Identity</h3>
              <p>Create a cohesive visual system that communicates your brand's personality and values across all touchpoints.</p>
              <Link to="/services" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
            
            <ServiceCard className="reveal-text">
              <div className="service-icon">&#9679;</div>
              <h3>Digital Experience</h3>
              <p>Design intuitive, engaging digital experiences that strengthen your brand and drive meaningful connections.</p>
              <Link to="/services" className="learn-more">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </ServiceCard>
          </ServicesGrid>
        </div>
      </Services>

      <Process>
        <div className="container">
          <SectionHeader>
            <div className="section-title reveal-text">Our Process</div>
            <h2 className="reveal-text">The Invisible Bond Framework™</h2>
            <p className="description reveal-text">Our systematic approach to building lasting brand relationships that strengthen entire business ecosystems.</p>
          </SectionHeader>
          
          <ProcessSteps>
            <ProcessStep className="reveal-text">
              <div className="step-number">01</div>
              <h3>Discovery</h3>
              <p>Deep-dive into your brand's core essence, market position, and authentic value proposition.</p>
            </ProcessStep>
            
            <ProcessStep className="reveal-text">
              <div className="step-number">02</div>
              <h3>Strategy</h3>
              <p>Craft your unique market position and systematic approach to building trust.</p>
            </ProcessStep>
            
            <ProcessStep className="reveal-text">
              <div className="step-number">03</div>
              <h3>Design</h3>
              <p>Bring your brand to life through cohesive visual identity and consistent experiences.</p>
            </ProcessStep>
            
            <ProcessStep className="reveal-text">
              <div className="step-number">04</div>
              <h3>Evolution</h3>
              <p>Continuous growth and adaptation that maintains authenticity while scaling impact.</p>
            </ProcessStep>
          </ProcessSteps>
        </div>
      </Process>

      <FeaturedWork>
        <div className="container">
          <SectionHeader>
            <div className="section-title reveal-text">Featured Work</div>
            <h2 className="reveal-text">Selected projects</h2>
            <p className="description reveal-text">Explore our portfolio of work that has helped transform businesses into trusted community leaders.</p>
          </SectionHeader>
          
          <WorkGrid>
            <WorkItem span={8} start={1} className="reveal-text">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Coastal Heritage Foundation" />
              <div className="overlay">
                <h3>Coastal Heritage Foundation</h3>
                <div className="category">Brand Identity, Digital Experience</div>
              </div>
            </WorkItem>
            
            <WorkItem span={4} start={9} className="reveal-text">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Evergreen Ventures" />
              <div className="overlay">
                <h3>Evergreen Ventures</h3>
                <div className="category">Brand Strategy</div>
              </div>
            </WorkItem>
            
            <WorkItem span={4} start={1} className="reveal-text">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Meridian Health" />
              <div className="overlay">
                <h3>Meridian Health</h3>
                <div className="category">Visual Identity</div>
              </div>
            </WorkItem>
            
            <WorkItem span={8} start={5} className="reveal-text">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Northwest Artisan Market" />
              <div className="overlay">
                <h3>Northwest Artisan Market</h3>
                <div className="category">Brand Architecture, Digital Experience</div>
              </div>
            </WorkItem>
          </WorkGrid>
        </div>
      </FeaturedWork>

      <Testimonial>
        <div className="container">
          <TestimonialContent>
            <blockquote className="reveal-text">
              Big Invisible didn't just redesign our brand — they transformed how our entire community sees us. We've gone from another local business to the trusted leader our neighbors turn to first.
            </blockquote>
            <div className="client reveal-text">Sarah Mitchell</div>
            <div className="position reveal-text">CEO • Kitsap County Local Business</div>
          </TestimonialContent>
        </div>
      </Testimonial>

      <ContactCTA>
        <div className="container">
          <CTAContent>
            <h2 className="reveal-text">Ready to build your brand's legacy?</h2>
            <p className="reveal-text">Let's create authentic connections that transform your business and strengthen your community.</p>
            <WhiteButton to="/contact" className="reveal-text">Start a conversation</WhiteButton>
          </CTAContent>
        </div>
      </ContactCTA>
    </>
  );
};

export default Home;
