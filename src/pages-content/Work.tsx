import { useEffect, useState } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import MasonryGrid from '../components/ui/MasonryGrid';
import MasonryItem from '../components/ui/MasonryItem';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import Quote from '../components/Quote';
import FullScreenHero from '../components/ui/FullScreenHero';
import styles from '../components/ui/FullScreenHero.module.css';
import { projects } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import { cn } from '../lib/utils';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { getTestimonials } from './services/ServiceTemplate';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.tags.includes(activeFilter)));
    }
  }, [activeFilter]);
  
  return (
    <>
      <FullScreenHero
        title={<>Our work <span className={`text-accent ${styles.fadeInCycle}`}>tells stories</span></>}
        description="Explore our portfolio of projects that have helped transform businesses into trusted community leaders."
        imageUrl="https://cdn.builder.io/api/v1/image/assets%2F588c931751e44954ba83f0b968e6223f%2F7c77c90db1e541e8aaef19abd70cd562"
        imageAlt="Our portfolio"
        overlayOpacity={0.6}
        textAlign="left"
        overlayBackgroundImage="https://cdn.builder.io/api/v1/image/assets%2F588c931751e44954ba83f0b968e6223f%2F57dbe18ee298439dbeaeede42fa878fb"
      />
      
      <Section background="secondary">
        <SectionHeader
          subtitle="Portfolio"
          title="Selected projects"
          description="Explore our work that has helped transform businesses into trusted community leaders."
          align="center"
        />
        
        <div className="flex flex-wrap gap-4 mb-8 reveal-text">
          <button 
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 cursor-pointer border rounded ${
              activeFilter === 'all' 
                ? 'bg-accent text-white border-accent' 
                : 'bg-transparent text-dark border-gray-300 hover:border-accent'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 cursor-pointer border rounded ${
              activeFilter === 'branding' 
                ? 'bg-accent text-white border-accent' 
                : 'bg-transparent text-dark border-gray-300 hover:border-accent'
            }`}
            onClick={() => setActiveFilter('branding')}
          >
            Brand Identity
          </button>
          <button 
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 cursor-pointer border rounded ${
              activeFilter === 'strategy' 
                ? 'bg-accent text-white border-accent' 
                : 'bg-transparent text-dark border-gray-300 hover:border-accent'
            }`}
            onClick={() => setActiveFilter('strategy')}
          >
            Strategy
          </button>
          <button 
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 cursor-pointer border rounded ${
              activeFilter === 'digital' 
                ? 'bg-accent text-white border-accent' 
                : 'bg-transparent text-dark border-gray-300 hover:border-accent'
            }`}
            onClick={() => setActiveFilter('digital')}
          >
            Digital Experience
          </button>
          <button 
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 cursor-pointer border rounded ${
              activeFilter === 'architecture' 
                ? 'bg-accent text-white border-accent' 
                : 'bg-transparent text-dark border-gray-300 hover:border-accent'
            }`}
            onClick={() => setActiveFilter('architecture')}
          >
            Brand Architecture
          </button>
          <button 
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 cursor-pointer border rounded ${
              activeFilter === 'content' 
                ? 'bg-accent text-white border-accent' 
                : 'bg-transparent text-dark border-gray-300 hover:border-accent'
            }`}
            onClick={() => setActiveFilter('content')}
          >
            Content
          </button>
          <button 
            className={`px-6 py-2 text-sm font-medium transition-all duration-300 cursor-pointer border rounded ${
              activeFilter === 'packaging' 
                ? 'bg-accent text-white border-accent' 
                : 'bg-transparent text-dark border-gray-300 hover:border-accent'
            }`}
            onClick={() => setActiveFilter('packaging')}
          >
            Packaging
          </button>
        </div>
        
        <MasonryGrid columns={{ default: 1, md: 2, lg: 3 }} gap="medium">
          {filteredProjects.map((project, index) => {
            // Create varying sizes for more interesting masonry layout
            const sizes: ('small' | 'medium' | 'large')[] = ['medium', 'large', 'small', 'medium', 'large', 'small', 'medium', 'small'];
            const size = sizes[index % sizes.length];
            
            // Determine if image should have natural aspect ratio or be constrained
            const isLogo = project.image.includes('.png') || project.image.includes('.svg');
            
            return (
              <MasonryItem key={project.id} size={size} className="reveal-text">
                <div className="overflow-hidden relative rounded-xl group bg-gray-100 dark:bg-gray-800">
                  <div className={isLogo ? "p-8 flex items-center justify-center min-h-48" : "aspect-[4/3]"}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={cn(
                        "transition-transform duration-500 group-hover:scale-105",
                        isLogo 
                          ? "max-w-full max-h-full object-contain" 
                          : "w-full h-full object-cover"
                      )}
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-xl mb-2 text-white font-bold">{project.title}</h3>
                    <div className="text-sm text-accent">{project.category}</div>
                  </div>
                </div>
              </MasonryItem>
            );
          })}
        </MasonryGrid>
      </Section>
      
      <Section>
        <SectionHeader
          subtitle="Case studies"
          title="Our success stories"
          description="Dive deeper into how our work has helped businesses build authentic connections with their communities."
          align="center"
        />
        
        <Grid columns={3}>
          {caseStudies.map(study => (
            <GridItem key={study.id} span={1} className="reveal-text">
              <div className="bg-lightGray border border-gray-200 h-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-full h-64 overflow-hidden">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="text-sm text-accent mb-4">{study.category}</div>
                  <h3 className="text-xl mb-4 text-dark">{study.title}</h3>
                  <p className="opacity-80 leading-relaxed mb-6 text-dark">{study.description}</p>
                  <Button variant="outline">Read case study</Button>
                </div>
              </div>
            </GridItem>
          ))}
        </Grid>
      </Section>
      
      {/* Testimonial Section */}
      <Section background="light">
          <div className="reveal-text">
            <TestimonialsCarousel
              testimonials={getTestimonials()}
              autoPlayDelay={6000}
            />
          </div>
      </Section>
      
      <CTASection
        title="Ready to build your brand's legacy?"
        description="Let's create authentic connections that transform your business and strengthen your community."
        buttonText="Start a conversation"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default Work;
