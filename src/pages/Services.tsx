import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { initRevealAnimations } from '../utils/animations';
import { BrandStrategyIcon, VisualIdentityIcon, DigitalExperienceIcon, ContentStrategyIcon, BrandArchitectureIcon, CommunityBuildingIcon } from '../components/ui/ProcessIcons';

const Services = () => {
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
                <h1 className="reveal-text text-4xl lg:text-5xl xl:text-6xl mb-6 font-bold leading-tight tracking-tight text-dark">Our <span className="text-accent">Services</span></h1>
                <p className="reveal-text text-lg lg:text-xl mb-8 opacity-80 leading-relaxed max-w-2xl text-dark">
                  We offer a comprehensive suite of brand architecture services designed to build authentic connections between your business and your community.
                </p>
                <Button to="/contact" variant="primary" className="reveal-text">Get started</Button>
              </div>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text relative h-96 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Brand architecture services" 
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
          subtitle="Core services"
          title="How we can help you"
          description="Our services are designed to create meaningful connections between your brand and your audience, driving sustainable growth and community impact."
          align="center"
        />
        
        <Grid columns={3}>
          <GridItem span={1} className="reveal-text">
            <div className="bg-white border border-gray-200 p-8 transition-all duration-300 h-full flex flex-col rounded-xl shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-md">
              <BrandStrategyIcon />
              <h3 className="text-xl mb-4 text-dark">Brand Strategy</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">Develop a clear, compelling brand strategy that differentiates your business and resonates with your target audience.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand positioning</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Audience research</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Competitive analysis</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand messaging</li>
              </ul>
              <Link to="/services/brand-strategy" className="mt-auto inline-flex items-center text-accent text-sm font-medium no-underline group">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 transition-transform duration-150 group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <div className="bg-white border border-gray-200 p-8 transition-all duration-300 h-full flex flex-col rounded-xl shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-md">
              <VisualIdentityIcon />
              <h3 className="text-xl mb-4 text-dark">Visual Identity</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">Create a cohesive visual system that communicates your brand's personality and values across all touchpoints.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Logo design</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Color palette</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Typography system</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand guidelines</li>
              </ul>
              <Link to="/services/visual-identity" className="mt-auto inline-flex items-center text-accent text-sm font-medium no-underline group">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 transition-transform duration-150 group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <div className="bg-white border border-gray-200 p-8 transition-all duration-300 h-full flex flex-col rounded-xl shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-md">
              <DigitalExperienceIcon />
              <h3 className="text-xl mb-4 text-dark">Digital Experience</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">Design intuitive, engaging digital experiences that strengthen your brand and drive meaningful connections.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Website design</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">User experience (UX)</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">User interface (UI)</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Digital strategy</li>
              </ul>
              <Link to="/services/digital-experience" className="mt-auto inline-flex items-center text-accent text-sm font-medium no-underline group">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 transition-transform duration-150 group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <div className="bg-white border border-gray-200 p-8 transition-all duration-300 h-full flex flex-col rounded-xl shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-md">
              <ContentStrategyIcon />
              <h3 className="text-xl mb-4 text-dark">Content Strategy</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">Develop a content strategy that tells your brand story and engages your audience across all channels.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Content planning</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Storytelling</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Content creation</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Content distribution</li>
              </ul>
              <Link to="/services/content-strategy" className="mt-auto inline-flex items-center text-accent text-sm font-medium no-underline group">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 transition-transform duration-150 group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <div className="bg-white border border-gray-200 p-8 transition-all duration-300 h-full flex flex-col rounded-xl shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-md">
              <BrandArchitectureIcon />
              <h3 className="text-xl mb-4 text-dark">Brand Architecture</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">Structure your brand portfolio to maximize clarity, relevance, and impact across all your offerings.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand hierarchy</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Sub-brand strategy</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Brand extensions</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Portfolio management</li>
              </ul>
              <Link to="/services/brand-architecture" className="mt-auto inline-flex items-center text-accent text-sm font-medium no-underline group">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 transition-transform duration-150 group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </GridItem>
          
          <GridItem span={1} className="reveal-text">
            <div className="bg-white border border-gray-200 p-8 transition-all duration-300 h-full flex flex-col rounded-xl shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-md">
              <CommunityBuildingIcon />
              <h3 className="text-xl mb-4 text-dark">Community Building</h3>
              <p className="opacity-80 leading-relaxed mb-6 text-dark">Develop strategies to build and nurture communities around your brand, fostering loyalty and advocacy.</p>
              <ul className="list-none p-0 mb-6">
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Community strategy</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Engagement programs</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Ambassador programs</li>
                <li className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">Community events</li>
              </ul>
              <Link to="/services/community-building" className="mt-auto inline-flex items-center text-accent text-sm font-medium no-underline group">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 transition-transform duration-150 group-hover:translate-x-1">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </GridItem>
        </Grid>
      </Section>
      
      <Section>
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text">
              <SectionHeader
                subtitle="Our approach"
                title="How we work with you"
                description="Our collaborative process ensures we deliver results that exceed expectations while adapting to your unique needs."
                align="left"
              />
              
              <div className="flex items-start mb-8 reveal-text">
                <div className="text-xl font-bold text-accent mr-6 min-w-[30px]">01</div>
                <div>
                  <h3 className="text-xl mb-3 text-dark">Discovery</h3>
                  <p className="opacity-80 leading-relaxed text-dark">We begin by deeply understanding your brand, business goals, audience, and market position.</p>
                </div>
              </div>
              
              <div className="flex items-start mb-8 reveal-text">
                <div className="text-xl font-bold text-accent mr-6 min-w-[30px]">02</div>
                <div>
                  <h3 className="text-xl mb-3 text-dark">Strategy Development</h3>
                  <p className="opacity-80 leading-relaxed text-dark">We craft a comprehensive brand strategy that defines your unique market position.</p>
                </div>
              </div>
              
              <div className="flex items-start mb-8 reveal-text">
                <div className="text-xl font-bold text-accent mr-6 min-w-[30px]">03</div>
                <div>
                  <h3 className="text-xl mb-3 text-dark">Design Implementation</h3>
                  <p className="opacity-80 leading-relaxed text-dark">We bring your brand to life through cohesive visual identity and consistent experiences, execute the strategy across all touchpoints, ensuring consistency and impact.</p>
                </div>
              </div>
              
              <div className="flex items-start mb-8 reveal-text">
                <div className="text-xl font-bold text-accent mr-6 min-w-[30px]">04</div>
                <div>
                  <h3 className="text-xl mb-3 text-dark">Brand Evolution</h3>
                  <p className="opacity-80 leading-relaxed text-dark">We provide ongoing support to help your brand grow and adapt while maintaining authenticity.</p>
                </div>
              </div>
              
              <Button to="/process" variant="outline" className="reveal-text">Learn more about our process</Button>
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text relative h-full min-h-[500px] rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Our collaborative process" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </GridItem>
        </Grid>
      </Section>
      
      <CTASection
        title="Ready to transform your brand?"
        description="Let's create authentic connections that transform your business and strengthen your community."
        buttonText="Schedule a consultation"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default Services;
