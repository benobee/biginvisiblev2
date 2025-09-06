import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import CTASection from '../components/ui/CTASection';
import FullScreenHero from '../components/ui/FullScreenHero';
import styles from '../components/ui/FullScreenHero.module.css';

const Work = () => {
  // Simple portfolio items - just the essentials
  const portfolioItems = [
    { src: '/brand-images/scout-logo-hx4.png', title: 'Scout Restaurant' },
    { src: '/brand-images/WIAP Square.svg', title: 'WIAP' },
    { src: '/brand-images/NLT-Logos-Final_NLT-Logo-SidebySide.png', title: 'Next Level Teams' },
    { src: '/brand-images/MCRE-wide-04.svg', title: 'MCRE Real Estate', category: 'Real Estate' },
    { src: '/brand-images/BC-LOGO-FINAL_Logo-build-1a.png', title: 'Build Community', category: 'Community Development' },
    { src: '/brand-images/SSI_logo_final_1_SSI-full-color.png', title: 'SSI Solutions', category: 'Technology' },
    { src: '/brand-images/metro-logo.png', title: 'Metropolist', category: 'Urban Development' },
    { src: '/brand-images/edgewater-beach-poulsbo-logo-abbrv.png', title: 'Edgewater Beach', category: 'Brand Identity' },
    { src: '/brand-images/FO-LOGO-CAMPAIGN-01.png', title: 'Fred Obee Campaign', category: 'Marketing' },
    { src: '/brand-images/Scout-School-logo-R1-01.png', title: 'Scout School', category: 'Community Building' },
    { src: '/brand-images/MCRE-emblem-nobckg-02.svg', title: 'MCRE Emblem', category: 'Corporate Identity' },
    { src: '/brand-images/NORDIC-LogoCOLORTEST.svg', title: 'Nordic', category: 'Brand Identity' },
  ];
  
  return (
    <>
      <FullScreenHero
        title={<>Our work <span className={`text-accent ${styles.fadeInCycle}`}>speaks volumes</span></>}
        description="A collection of brands we've helped build and transform."
        imageUrl="https://cdn.builder.io/api/v1/image/assets%2F588c931751e44954ba83f0b968e6223f%2F7c77c90db1e541e8aaef19abd70cd562"
        imageAlt="Our portfolio"
        overlayOpacity={0.6}
        textAlign="left"
        overlayBackgroundImage="https://cdn.builder.io/api/v1/image/assets%2F588c931751e44954ba83f0b968e6223f%2F57dbe18ee298439dbeaeede42fa878fb"
      />
      
      <Section background="light">
        <SectionHeader
          subtitle="Portfolio"
          title="Selected work"
          description="Brands that stand out in their industries."
          align="center"
        />
        
        {/* Clean Grid Portfolio */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                {/* Logo Container */}
                <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 aspect-[4/3] p-8 flex items-center justify-center mb-4">
                  <img 
                    src={item.src} 
                    alt={item.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Project Info */}
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1 text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      
      <CTASection
        title="Ready to build your brand?"
        description="Let's create something people will remember."
        buttonText="Start a conversation"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default Work;
