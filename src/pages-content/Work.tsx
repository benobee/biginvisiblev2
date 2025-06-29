import { useEffect, useState } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { initRevealAnimations } from '../utils/animations';
import { projects } from '../data/projects';
import { caseStudies } from '../data/caseStudies';

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
      <section className="min-h-[70vh] bg-white text-dark flex items-center relative overflow-hidden pt-[120px]">
        <div className="section-container">
          <Grid>
            <GridItem span={6}>
              <div className="relative z-10">
                <h1 className="reveal-text text-4xl lg:text-5xl xl:text-6xl mb-6 font-bold leading-tight tracking-tight text-dark">Our <span className="text-accent">Work</span></h1>
                <p className="reveal-text text-lg lg:text-xl mb-8 opacity-80 leading-relaxed max-w-2xl text-dark">
                  Explore our portfolio of projects that have helped transform businesses into trusted community leaders.
                </p>
              </div>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text relative h-96 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Our portfolio" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </GridItem>
          </Grid>
        </div>
      </section>
      
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="reveal-text aspect-video overflow-hidden relative rounded-xl group"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-xl mb-2 text-white">{project.title}</h3>
                <div className="text-sm text-accent">{project.category}</div>
              </div>
            </div>
          ))}
        </div>
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
      
      <Section background="secondary" className="text-center">
        <div className="max-w-4xl mx-auto">
          <blockquote className="reveal-text text-2xl lg:text-3xl leading-relaxed mb-8 relative text-dark">
            <span className="text-accent text-1xl opacity-30">"</span>
            <i className='text-1xl'>Big Invisible didn't just redesign our brand — they transformed how our entire community sees us. We've gone from another local business to the trusted leader our neighbors turn to first.</i>
            <span className="text-accent text-1xl opacity-30">"</span>
          </blockquote>
          <div className="client reveal-text text-lg font-medium text-dark">Sarah Mitchell</div>
          <div className="position reveal-text text-sm opacity-60 mt-2 text-dark">CEO • Coastal Heritage Foundation</div>
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
