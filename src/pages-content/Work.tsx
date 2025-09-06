import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import CTASection from '../components/ui/CTASection';
import FullScreenHero from '../components/ui/FullScreenHero';
import styles from '../components/ui/FullScreenHero.module.css';

const Work = () => {
  // All brand images - comprehensive collection from brand-images folder
  const brandImages = [
    // Scout Restaurant Collection
    { src: '/brand-images/scout-values-wall.jpeg', title: 'Scout Restaurant Values' },
    { src: '/brand-images/scout_entrance.jpeg', title: 'Scout Entrance' },
    { src: '/brand-images/SCOUT_Jen-door_web.png', title: 'Scout Door Design' },
    { src: '/brand-images/scout-art.jpeg', title: 'Scout Art' },
    { src: '/brand-images/scout-beanies.jpeg', title: 'Scout Beanies' },
    { src: '/brand-images/scout-bizcard.jpeg', title: 'Scout Business Card' },
    { src: '/brand-images/scout-boat.jpeg', title: 'Scout Boat' },
    { src: '/brand-images/scout-hat.jpeg', title: 'Scout Hat' },
    { src: '/brand-images/scout-key-ring.jpeg', title: 'Scout Key Ring' },
    { src: '/brand-images/scout-logo-hx4.png', title: 'Scout Logo' },
    { src: '/brand-images/scout-mug.png', title: 'Scout Mug' },
    { src: '/brand-images/scout-open-house.jpeg', title: 'Scout Open House' },
    { src: '/brand-images/scout-pad.jpeg', title: 'Scout Notepad' },
    { src: '/brand-images/scout-review-building.jpeg', title: 'Scout Building' },
    { src: '/brand-images/Scout-School-logo-R1-01.png', title: 'Scout School Logo' },
    { src: '/brand-images/scout-wine.jpeg', title: 'Scout Wine' },
    { src: '/brand-images/scout-yardarm.jpeg', title: 'Scout Yardarm' },
    
    // WIAP Collection
    { src: '/brand-images/WIAP Square.svg', title: 'WIAP Square Logo' },
    { src: '/brand-images/WIAP-20240727_094005.jpg', title: 'WIAP Event' },
    { src: '/brand-images/wiap-booth-old-bills-fun-run-2023.jpg', title: 'WIAP Fun Run Booth' },
    { src: '/brand-images/WIAP-google-cover-1080-608.webp', title: 'WIAP Google Cover' },
    { src: '/brand-images/WIAP-no room for squares.svg', title: 'WIAP No Room for Squares' },
    { src: '/brand-images/WIAP-Primary stacked.svg', title: 'WIAP Primary Stacked' },
    
    // Next Level Teams
    { src: '/brand-images/NLT-LOGO-ONE-COLOR-04.png', title: 'NLT One Color Logo' },
    { src: '/brand-images/NLT-Logos-Final_NLT-Logo-SidebySide.png', title: 'Next Level Teams' },
    { src: '/brand-images/NORDIC-LogoCOLORTEST.svg', title: 'Next Level color test' },
    
    // MCRE Real Estate
    { src: '/brand-images/MCRE-emblem-nobckg-02.svg', title: 'MCRE Emblem' },
    { src: '/brand-images/MCRE-LJ-stacked-02.svg', title: 'MCRE Stacked' },
    { src: '/brand-images/MCRE-wide-04.svg', title: 'MCRE Wide' },
    
    // Build Community
    { src: '/brand-images/BC-LOGO-FINAL_Logo-build-1a.png', title: 'Build Community Logo' },
    
    // SSI Solutions
    { src: '/brand-images/SSI_logo_final_1_SSI-full-color.png', title: 'SSI Logo' },
    { src: '/brand-images/SSI-391747695_1043037956982402_207558339743513799_n.jpg', title: 'SSI Project' },
    { src: '/brand-images/SSI-compare-image.jpg', title: 'SSI Brand Comparison' },
    { src: '/brand-images/SSI-fabric-pop-up-straight-display-01_1 copy.jpg', title: 'SSI Display' },
    
    // Metro
    { src: '/brand-images/metro1.webp', title: 'Metro Design 1' },
    { src: '/brand-images/metro2.webp', title: 'Metro Design 2' },
    { src: '/brand-images/metro3.webp', title: 'Metro Design 3' },
    { src: '/brand-images/metro4.webp', title: 'Metro Design 4' },
    { src: '/brand-images/metro5.webp', title: 'Metro Design 5' },
    
    // Other Brands
    { src: '/brand-images/edgewater-beach-poulsbo-logo-abbrv.png', title: 'Edgewater Beach' },
    { src: '/brand-images/FO-LOGO-CAMPAIGN-01.png', title: 'FO Campaign' },
    { src: '/brand-images/jonesmandel-businesscard-mock.webp', title: 'Jones Mandel Business Card' },
  ];
  
  return (
    <>
      <FullScreenHero
        title={<>Our work <span className={`text-accent ${styles.fadeInCycle}`}>tells stories</span></>}
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
          description="Brands we've transformed into community leaders."
          align="center"
        />
        
        {/* Instagram-style single column feed */}
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-4 mt-12">
            {brandImages.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="aspect-square p-6 md:p-8 flex items-center justify-center">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="max-w-full max-h-full object-contain"
                  />
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
