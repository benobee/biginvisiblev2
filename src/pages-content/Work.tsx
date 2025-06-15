import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import { initRevealAnimations } from '../utils/animations';
import { projects } from '../data/projects';
import { caseStudies } from '../data/caseStudies';

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

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ active, theme }) => active ? theme.colors.accent : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.text : theme.colors.text};
  border: 1px solid ${({ active, theme }) => active ? theme.colors.accent : 'rgba(255, 255, 255, 0.2)'};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProjectItem = styled.div<{ span: number, start?: number }>`
  grid-column: ${({ start, span }) => start ? `${start} / span ${span}` : `span ${span}`};
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
    color: white;
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

const CaseStudySection = styled(Section)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundAlt} 100%);
`;

const CaseStudyCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  
  .image-container {
    width: 100%;
    height: 250px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform ${({ theme }) => theme.transitions.default};
    }
  }
  
  .content {
    padding: ${({ theme }) => theme.spacing.xl};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  .category {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const TestimonialSection = styled(Section)`
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

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.tags.includes(activeFilter)));
    }
  }, [activeFilter]);
  
  return (
    <>
      <HeroSection>
        <div className="container">
          <Grid>
            <GridItem span={6}>
              <HeroContent>
                <h1 className="reveal-text">Our <span className="text-gradient">Work</span></h1>
                <p className="subtitle reveal-text">
                  Explore our portfolio of projects that have helped transform businesses into trusted community leaders.
                </p>
              </HeroContent>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text" style={{ height: '400px', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Our portfolio" 
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
          subtitle="Portfolio"
          title="Selected projects"
          description="Explore our work that has helped transform businesses into trusted community leaders."
          align="center"
        />
        
        <FilterBar className="reveal-text">
          <FilterButton 
            active={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'branding'} 
            onClick={() => setActiveFilter('branding')}
          >
            Brand Identity
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'strategy'} 
            onClick={() => setActiveFilter('strategy')}
          >
            Strategy
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'digital'} 
            onClick={() => setActiveFilter('digital')}
          >
            Digital Experience
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'architecture'} 
            onClick={() => setActiveFilter('architecture')}
          >
            Brand Architecture
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'content'} 
            onClick={() => setActiveFilter('content')}
          >
            Content
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'packaging'} 
            onClick={() => setActiveFilter('packaging')}
          >
            Packaging
          </FilterButton>
        </FilterBar>
        
        <ProjectGrid>
          {filteredProjects.map(project => (
            <ProjectItem 
              key={project.id} 
              span={project.span} 
              start={project.start}
              className="reveal-text"
            >
              <img src={project.image} alt={project.title} />
              <div className="overlay">
                <h3>{project.title}</h3>
                <div className="category">{project.category}</div>
              </div>
            </ProjectItem>
          ))}
        </ProjectGrid>
      </Section>
      
      <CaseStudySection>
        <SectionHeader
          subtitle="Case studies"
          title="Our success stories"
          description="Dive deeper into how our work has helped businesses build authentic connections with their communities."
          align="center"
        />
        
        <Grid columns={3}>
          {caseStudies.map(study => (
            <GridItem key={study.id} span={1} className="reveal-text">
              <CaseStudyCard>
                <div className="image-container">
                  <img src={study.image} alt={study.title} />
                </div>
                <div className="content">
                  <div className="category">{study.category}</div>
                  <h3>{study.title}</h3>
                  <p>{study.description}</p>
                  <Button variant="outline">Read case study</Button>
                </div>
              </CaseStudyCard>
            </GridItem>
          ))}
        </Grid>
      </CaseStudySection>
      
      <TestimonialSection>
        <TestimonialContent>
          <blockquote className="reveal-text">
            Big Invisible didn't just redesign our brand — they transformed how our entire community sees us. We've gone from another local business to the trusted leader our neighbors turn to first.
          </blockquote>
          <div className="client reveal-text">Sarah Mitchell</div>
          <div className="position reveal-text">CEO • Coastal Heritage Foundation</div>
        </TestimonialContent>
      </TestimonialSection>
      
      <Section background="accent">
        <div style={{ textAlign: 'center' }}>
          <h2 className="reveal-text">Ready to build your brand's legacy?</h2>
          <p className="reveal-text" style={{ marginBottom: '2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto 2rem' }}>
            Let's create authentic connections that transform your business and strengthen your community.
          </p>
          <Button to="/contact" variant="secondary" className="reveal-text">Start a conversation</Button>
        </div>
      </Section>
    </>
  );
};

export default Work;
