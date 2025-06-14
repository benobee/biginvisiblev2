import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Grid from '../../components/ui/Grid';
import GridItem from '../../components/ui/GridItem';
import Button from '../../components/ui/Button';
import { initRevealAnimations } from '../../utils/animations';
import ServiceSidebar from './ServiceSidebar';
import { type Service } from '../../data/services';

// Animations for charts
const slideInLeft = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const progressFill = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 58, 70, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 58, 70, 0.6);
  }
`;

const rotateChart = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Layout containers
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const HeroSection = styled.section`
  min-height: 85vh;
  background: #0F1923;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 120px 0 60px 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  
  h1 {
    font-size: clamp(3rem, 6vw, ${({ theme }) => theme.typography.fontSize['6xl']});
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }

  .subtitle {
    font-size: clamp(1.125rem, 2.5vw, ${({ theme }) => theme.typography.fontSize['2xl']});
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    max-width: 650px;
  }
`;

const HeroIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, rgba(255, 58, 70, 0.15) 0%, rgba(255, 58, 70, 0.05) 100%);
  border: 3px solid rgba(255, 58, 70, 0.4);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 20px 40px rgba(255, 58, 70, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all ${({ theme }) => theme.transitions.default};
  
  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(135deg, rgba(255, 58, 70, 0.6), transparent, rgba(255, 58, 70, 0.3));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: pulse 3s ease-in-out infinite;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 25px 50px rgba(255, 58, 70, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  
  svg {
    width: 80px;
    height: 80px;
    color: ${({ theme }) => theme.colors.accent};
    filter: drop-shadow(0 4px 8px rgba(255, 58, 70, 0.3));
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }
`;

const HeroImage = styled.div`
  height: 500px;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Section containers with alternating themes
const LightSection = styled.section`
  background: #FFFFFF;
  color: #0F1923;
  padding: 80px 0;
  position: relative;
`;

const DarkSection = styled.section`
  background: #0F1923;
  color: #FFFFFF;
  padding: 80px 0;
  position: relative;
`;

const FeatureCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing['2xl']};
  height: 100%;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.default};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.accent};
    
    .feature-icon {
      transform: scale(1.1);
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  
  .feature-icon {
    width: 48px;
    height: 48px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.accent};
    transition: all ${({ theme }) => theme.transitions.default};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: #0F1923;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  p {
    color: #4A5568;
    line-height: 1.7;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const ProcessCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: flex-start;
  transition: all ${({ theme }) => theme.transitions.default};
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    border-radius: 50%;
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-right: ${({ theme }) => theme.spacing.xl};
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
    
    h3 {
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
      margin-bottom: ${({ theme }) => theme.spacing.md};
      color: #FFFFFF;
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    }
    
    p {
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.7;
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
    }
  }
`;

// Enhanced outcome cards with images
const OutcomeCard = styled.div`
  background: #FFFFFF;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  transition: all ${({ theme }) => theme.transitions.default};
  height: 100%;

  .outcome-image {
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform ${({ theme }) => theme.transitions.default};
    }
  }
  
  .outcome-content {
    padding: ${({ theme }) => theme.spacing.xl};
    
    .outcome-icon {
      width: 40px;
      height: 40px;
      color: ${({ theme }) => theme.colors.accent};
      margin-bottom: ${({ theme }) => theme.spacing.md};
    }
    
    h3 {
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
      margin-bottom: ${({ theme }) => theme.spacing.md};
      color: #0F1923;
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    }
    
    p {
      color: #4A5568;
      line-height: 1.6;
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      margin: 0;
    }
  }
`;

const BarChart = styled.div`
  width: 180px;
  height: 120px;
  display: flex;
  align-items: end;
  gap: 8px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  
  .bar {
    flex: 1;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 4px 4px 0 0;
    animation: ${progressFill} 2s ease-out;
    position: relative;
    
    &:nth-child(1) { --progress-width: 60%; height: 60%; }
    &:nth-child(2) { --progress-width: 80%; height: 80%; }
    &:nth-child(3) { --progress-width: 45%; height: 45%; }
    &:nth-child(4) { --progress-width: 90%; height: 90%; }
    &:nth-child(5) { --progress-width: 75%; height: 75%; }
  }
`;

const FloatingChart = styled.div`
  position: absolute;
  animation: ${slideInLeft} 1s ease-out both;
  
  &.chart-1 {
    right: 50px;
    top: 20%;
    animation-delay: 0.3s;
  }
  
  &.chart-2 {
    right: 80px;
    top: 60%;
    animation-delay: 0.6s;
  }
  
  &.chart-3 {
    right: 20px;
    top: 80%;
    animation-delay: 0.9s;
  }
`;

// Feature icons mapping (same as before)
const getFeatureIcon = (title: string) => {
  const iconMap: { [key: string]: string } = {
    'Brand Positioning': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'Audience Research': 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    'Competitive Analysis': 'M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5 9H2v-2h19.5v2zm0-4H2V4h19.5v12z',
    'Brand Messaging': 'M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H5v-2h13v2zm0-3H5V9h13v2zm0-3H5V6h13v2z',
    'Logo Design': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    'Color Palette': 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z',
    'Typography System': 'M5 4v3h5.5v12h3V7H19V4H5z',
    'Brand Guidelines': 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
    'Website Design': 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v2H4V6zm0 4h4v8H4v-8zm6 0h10v8H10v-8z',
    'User Experience (UX)': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    'User Interface (UI)': 'M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z',
    'Digital Strategy': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'Content Planning': 'M16 4h-2V2h-4v2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 10H9v-2h6v2zm0-3H9V9h6v2zm0-3H9V6h6v2z',
    'Storytelling': 'M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l4 4 4-4h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 12H7v-2h10v2zm0-3H7V9h10v2zm0-3H7V6h10v2z',
    'Content Creation': 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    'Content Distribution': 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z'
  };
  
  return iconMap[title] || 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
};

// Outcome check icon
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="outcome-icon">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// Service-specific images from Unsplash
const getServiceImages = (serviceId: string) => {
  const imageMap: { [key: string]: string[] } = {
    'brand-strategy': [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=500&h=300&fit=crop'
    ],
    'visual-identity': [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&h=300&fit=crop'
    ],
    'digital-experience': [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
    ],
    'content-strategy': [
      'https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&h=300&fit=crop'
    ]
  };
  
  return imageMap[serviceId] || imageMap['brand-strategy'];
};

interface ServiceTemplateProps {
  service: Service;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ service }) => {
  const IconComponent = service.icon;
  const serviceImages = getServiceImages(service.id);
  
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
  return (
    <PageContainer>
      <ServiceSidebar currentServiceId={service.id} />
      
      <MainContent>
        <HeroSection>
          <div className="container">
            <Grid>
              <GridItem span={6}>
                <HeroContent>
                  <HeroIcon className="reveal-text">
                    <IconComponent />
                  </HeroIcon>
                  <h1 className="reveal-text">
                    {service.title}
                  </h1>
                  <p className="subtitle reveal-text">
                    {service.detailedDescription}
                  </p>
                  <Button to="/contact" variant="primary" size="large" className="reveal-text">
                    Get started today
                  </Button>
                </HeroContent>
              </GridItem>
              <GridItem span={6}>
                <HeroImage className="reveal-text">
                  <img src={service.heroImage} alt={service.title} />
                </HeroImage>
              </GridItem>
            </Grid>
          </div>
        </HeroSection>
        
        <LightSection>
          <div className="container">
            <SectionHeader
              subtitle="What we do"
              title={`${service.title} Services`}
              description={service.shortDescription}
              align="center"
            />
            
            <div style={{ marginTop: '4rem', position: 'relative' }}>
              <Grid columns={2}>
                {service.expandedFeatures.map((feature, index) => (
                  <GridItem key={index} span={1} className="reveal-text">
                    <FeatureCard>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="feature-icon">
                        <path d={getFeatureIcon(feature.title)} />
                      </svg>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </FeatureCard>
                  </GridItem>
                ))}
              </Grid>
              
              <FloatingChart className="chart-2">
                <BarChart>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </BarChart>
              </FloatingChart>
            </div>
          </div>
        </LightSection>
        
        <DarkSection>
          <div className="container">
            <SectionHeader
              subtitle="Our process"
              title="How we deliver results"
              description="Our proven process ensures we deliver exceptional results while keeping you involved every step of the way."
              align="center"
            />
            
            <div style={{ marginTop: '4rem', maxWidth: '800px', margin: '4rem auto 0', position: 'relative' }}>
              {service.process.map((step, index) => (
                <ProcessCard key={index} className="reveal-text">
                  <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </ProcessCard>
              ))}
            </div>
          </div>
        </DarkSection>
        
        <LightSection>
          <div className="container">
            <SectionHeader
              subtitle="Outcomes"
              title="What you can expect"
              description="Here's what you'll achieve when working with us on your project."
              align="center"
            />
            
            <div style={{ marginTop: '4rem' }}>
              <Grid columns={3}>
                {service.outcomes.slice(0, 3).map((outcome, index) => (
                  <GridItem key={index} span={1} className="reveal-text">
                    <OutcomeCard>
                      <div className="outcome-image">
                        <img src={serviceImages[index]} alt={`Outcome ${index + 1}`} />
                      </div>
                      <div className="outcome-content">
                        <CheckIcon />
                        <h3>Expected Result {index + 1}</h3>
                        <p>{outcome}</p>
                      </div>
                    </OutcomeCard>
                  </GridItem>
                ))}
              </Grid>
              
              {service.outcomes.length > 3 && (
                <div style={{ marginTop: '2rem' }}>
                  <Grid columns={2}>
                    {service.outcomes.slice(3).map((outcome, index) => (
                      <GridItem key={index + 3} span={1} className="reveal-text">
                        <OutcomeCard>
                          <div className="outcome-content">
                            <CheckIcon />
                            <h3>Additional Benefit {index + 1}</h3>
                            <p>{outcome}</p>
                          </div>
                        </OutcomeCard>
                      </GridItem>
                    ))}
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </LightSection>
        
        <Section background="accent">
          <div style={{ textAlign: 'center' }}>
            <h2 className="reveal-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', color: '#FFFFFF' }}>
              Ready to get started with {service.title.toLowerCase()}?
            </h2>
            <p className="reveal-text" style={{ 
              marginBottom: '2.5rem', 
              color: 'rgba(255, 255, 255, 0.95)', 
              maxWidth: '700px', 
              margin: '0 auto 2.5rem',
              fontSize: '1.25rem',
              lineHeight: '1.6'
            }}>
              Let's discuss how we can help you achieve your goals with our {service.title.toLowerCase()} services.
            </p>
            <Button to="/contact" variant="secondary" size="large" className="reveal-text">
              Schedule a consultation
            </Button>
          </div>
        </Section>
      </MainContent>
    </PageContainer>
  );
};

export default ServiceTemplate;
