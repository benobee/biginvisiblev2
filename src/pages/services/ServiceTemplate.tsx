import { useEffect } from 'react';
import styled from 'styled-components';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Grid from '../../components/ui/Grid';
import GridItem from '../../components/ui/GridItem';
import Button from '../../components/ui/Button';
import { initRevealAnimations } from '../../utils/animations';
import ServiceSidebar from './ServiceSidebar';
import { type Service } from '../../data/services';

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

const HeroImage = styled.div`
  height: 400px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(15, 25, 35, 0.3) 0%, rgba(15, 25, 35, 0.8) 100%);
  }
`;

const ContentSection = styled(Section)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundAlt} 100%);
`;

const FeatureCard = styled.div`
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-5px);
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.accent};
  }
  
  p {
    opacity: 0.8;
    line-height: 1.6;
  }
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

const OutcomesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    position: relative;
    padding-left: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    opacity: 0.8;
    line-height: 1.6;
    
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
`;

const MainContent = styled.div`
  width: 100%;
`;

interface ServiceTemplateProps {
  service: Service;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ service }) => {
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
                <h1 className="reveal-text">
                  <span className="text-gradient">{service.title}</span>
                </h1>
                <p className="subtitle reveal-text">
                  {service.detailedDescription}
                </p>
                <Button to="/contact" variant="primary" className="reveal-text">
                  Get started
                </Button>
              </HeroContent>
            </GridItem>
            <GridItem span={6}>
              <HeroImage className="reveal-text">
                <img src={service.heroImage} alt={service.title} />
                <div className="overlay"></div>
              </HeroImage>
            </GridItem>
          </Grid>
        </div>
      </HeroSection>
      
      <ContentSection>
        <div className="container">
          <Grid>
            <GridItem span={8}>
              <MainContent>
                <SectionHeader
                  subtitle="What we do"
                  title={`${service.title} Services`}
                  description={service.shortDescription}
                  align="left"
                />
                
                <div style={{ marginBottom: '4rem' }}>
                  <Grid columns={2}>
                  {service.expandedFeatures.map((feature, index) => (
                    <GridItem key={index} span={1} className="reveal-text">
                      <FeatureCard>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </FeatureCard>
                    </GridItem>
                  ))}
                  </Grid>
                </div>
                
                <div style={{ marginBottom: '4rem' }}>
                  <SectionHeader
                    subtitle="Our process"
                    title="How we deliver results"
                    description="Our proven process ensures we deliver exceptional results while keeping you involved every step of the way."
                    align="left"
                  />
                  
                  {service.process.map((step, index) => (
                    <ProcessStep key={index} className="reveal-text">
                      <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                      <div className="step-content">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </ProcessStep>
                  ))}
                </div>
                
                <div>
                  <SectionHeader
                    subtitle="Outcomes"
                    title="What you can expect"
                    description="Here's what you'll achieve when working with us on your brand strategy."
                    align="left"
                  />
                  
                  <OutcomesList className="reveal-text">
                    {service.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </OutcomesList>
                </div>
              </MainContent>
            </GridItem>
            
            <GridItem span={4}>
              <ServiceSidebar currentServiceId={service.id} />
            </GridItem>
          </Grid>
        </div>
      </ContentSection>
      
      <Section background="accent">
        <div style={{ textAlign: 'center' }}>
          <h2 className="reveal-text">Ready to get started with {service.title.toLowerCase()}?</h2>
          <p className="reveal-text" style={{ marginBottom: '2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto 2rem' }}>
            Let's discuss how we can help you achieve your goals with our {service.title.toLowerCase()} services.
          </p>
          <Button to="/contact" variant="secondary" className="reveal-text">
            Schedule a consultation
          </Button>
        </div>
      </Section>
    </>
  );
};

export default ServiceTemplate;
