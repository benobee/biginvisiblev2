import React, { useEffect, useRef, useState, useMemo } from 'react';

const ParallaxWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // All brand images from folder (excluding PDFs and .mov files)
  const allBrandImages = [
    '/brand-images/BC-LOGO-FINAL_Logo-build-1a.png',
    '/brand-images/FO-LOGO-CAMPAIGN-01.png',
    '/brand-images/MCRE-LJ-stacked-02.svg',
    '/brand-images/MCRE-emblem-nobckg-02.svg',
    '/brand-images/MCRE-wide-04.svg',
    '/brand-images/NLT-LOGO-ONE-COLOR-04.png',
    '/brand-images/NLT-Logos-Final_NLT-Logo-SidebySide.png',
    '/brand-images/NORDIC-LogoCOLORTEST.svg',
    '/brand-images/SSI-compare-image.jpg',
    '/brand-images/SSI_logo_final_1_SSI-full-color.png',
    '/brand-images/Scout-School-logo-R1-01.png',
    '/brand-images/Scout-card-mockup-op2 copy.jpg',
    '/brand-images/WIAP Square.svg',
    '/brand-images/edgewater-beach-poulsbo-logo-abbrv.png',
    '/brand-images/fabric-pop-up-straight-display-01_1 copy.jpg',
    '/brand-images/no room for squares.svg',
    '/brand-images/scout-art.jpeg',
    '/brand-images/scout-hat.jpeg',
    '/brand-images/scout-logo-hx4.png',
    '/brand-images/scout-pad.jpeg',
    '/brand-images/scout-values-wall.jpeg',
  ];

  // Shuffle function for randomizing array
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Memoize the shuffled images so they don't change on re-renders
  const shuffledImages = useMemo(() => shuffleArray(allBrandImages), []);
  
  // Distribute images across 4 rows evenly
  const brandImages = useMemo(() => {
    const imagesPerRow = Math.ceil(shuffledImages.length / 4);
    return {
      row1: shuffledImages.slice(0, imagesPerRow),
      row2: shuffledImages.slice(imagesPerRow, imagesPerRow * 2),
      row3: shuffledImages.slice(imagesPerRow * 2, imagesPerRow * 3),
      row4: shuffledImages.slice(imagesPerRow * 3)
    };
  }, [shuffledImages]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let ticking = false;
    
    const updateProgress = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress only when section is in viewport
      let progress = 0;
      
      // Check if section is in viewport
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      
      if (isInViewport) {
        // Section is visible - calculate progress within the section
        const sectionHeight = rect.height;
        const viewportProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (sectionHeight + windowHeight)));
        progress = viewportProgress;
      } else {
        // Section is not in viewport - no movement
        progress = 0;
      }
      
      setScrollProgress(progress);
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };
    
    // Initial calculation
    updateProgress();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMounted]);

  // Different parallax speeds for each row - diagonal movement (reversed)
  const getTransform = (rowIndex: number) => {
    const speeds = [0.08, 0.12, 0.16, 0.2]; // Different speeds for 4 rows
    const baseMovement = scrollProgress * speeds[rowIndex] * 15; // Reduced movement distance
    
    // Move from upper right to lower left (reversed)
    const translateX = -baseMovement; // Negative for left movement
    const translateY = baseMovement * 0.3; // Reduced vertical movement
    
    // Alternate direction for some rows for visual interest
    const direction = rowIndex % 2 === 1 ? -1 : 1;
    
    return `translate(${translateX * direction}%, ${translateY * direction}%)`;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[150vh] bg-gray-50 overflow-hidden flex items-center justify-center"
    >
      {/* Debug indicator - remove after testing */}
      <div className="fixed top-20 right-4 z-50 bg-black text-white p-2 rounded text-xs">
        Scroll: {(scrollProgress * 100).toFixed(0)}%
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100" />
      
      {/* Content wrapper with perspective */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Header text - sticky at top */}
        <div className="sticky top-20 z-20 text-center px-4 py-8 w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our Work
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Brands we've transformed into community leaders
          </p>
          <a
            href="/work"
            className="inline-block bg-accent text-white px-8 py-4 font-medium text-sm uppercase tracking-wider transition-all duration-300 border border-accent hover:bg-transparent hover:text-accent"
          >
            View All Projects
          </a>
        </div>
        
        {/* Angled perspective container - 45 degree diagonal view (reversed) */}
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-visible"
          style={{
            perspective: '2000px',
            perspectiveOrigin: '50% 50%'
          }}
        >
          <div 
            className="relative w-full h-full"
            style={{
              transform: 'rotateX(15deg) rotateY(10deg) rotateZ(3deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Four rows of brand images - positioned diagonally (reversed) */}
            {Object.entries(brandImages).map(([key, images], rowIndex) => (
              <div
                key={key}
                className="absolute w-[600%] flex items-center justify-center gap-12"
                style={{
                  top: `${5 + rowIndex * 25}%`,
                  left: '50%',
                  transform: `translateX(-50%) ${getTransform(rowIndex)}`,
                  transition: 'transform 0.1s linear',
                  willChange: 'transform'
                }}
              >
                {/* All unique brand images */}
                {images.map((image, index) => (
                  <div
                    key={`${key}-${index}`}
                    className="flex-shrink-0 bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 mx-4"
                    style={{
                      width: '480px',  // Reduced size to help with spacing
                      height: '320px'   // Reduced size to help with spacing
                    }}
                  >
                    <img
                      src={image}
                      alt={`Brand ${index + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/80 to-transparent" />
      </div>
    </section>
  );
};

export default ParallaxWorkSection;