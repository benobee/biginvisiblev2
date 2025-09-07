import React, { useEffect, useRef, useState, useMemo } from 'react';

const ParallaxWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    '/brand-images/SSI_logo_final_1_SSI-full-color.png',
    '/brand-images/Scout-School-logo-R1-01.png',
    '/brand-images/WIAP Square.svg',
    '/brand-images/edgewater-beach-poulsbo-logo-abbrv.png',
    '/brand-images/WIAP-no room for squares.svg',
    '/brand-images/scout-logo-hx4.png',
  ]

  // Use a deterministic shuffle based on array index to avoid hydration mismatches
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    // Simple deterministic shuffle based on index
    for (let i = 0; i < shuffled.length; i++) {
      const j = (i * 7 + 3) % shuffled.length;
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Memoize the shuffled images so they don't change on re-renders
  const shuffledImages = useMemo(() => {
    // Only shuffle on client to avoid hydration mismatch
    if (typeof window === 'undefined') {
      return allBrandImages;
    }
    return shuffleArray(allBrandImages);
  }, []);
  
  // Distribute images across 3 rows evenly
  const brandImages = useMemo(() => {
    const imagesPerRow = Math.ceil(shuffledImages.length / 3);
    return {
      row1: shuffledImages.slice(0, imagesPerRow),
      row2: shuffledImages.slice(imagesPerRow, imagesPerRow * 2),
      row3: shuffledImages.slice(imagesPerRow * 2)
    };
  }, [shuffledImages]);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
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
    const speeds = [0.08, 0.14, 0.2]; // Different speeds for 3 rows
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const movementScale = isMobile ? 8 : 15; // Less movement on mobile
    const baseMovement = scrollProgress * speeds[rowIndex] * movementScale;
    
    // Move from upper right to lower left (reversed)
    const translateX = -baseMovement; // Negative for left movement
    const translateY = baseMovement * 0.3; // Reduced vertical movement
    
    // Alternate direction for some rows for visual interest
    const direction = rowIndex % 2 === 1 ? -1 : 1;
    
    return `translate(${translateX * direction}%, ${translateY * direction}%)`;
  };
  
  const indexLocationMap: { [key: string]: string } = {
    '0': '60%',
    '1': '50%',
    '2': '65%'
  };

  // Mobile layout - Instagram feed style
  if (isMobile) {
    return (
      <section 
        ref={sectionRef}
        className="relative w-full bg-gray-50 py-12"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100" />
        
        {/* Content wrapper */}
        <div className="relative z-10 w-full">
          {/* Header text */}
          <div className="text-center px-4 pb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Work
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
              Brands we've transformed into community leaders
            </p>
            <a
              href="/work"
              className="inline-block bg-accent text-white px-6 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 border border-accent hover:bg-transparent hover:text-accent"
            >
              View All Projects
            </a>
          </div>
          
          {/* Instagram-style feed - single column */}
          <div className="px-4 space-y-4 max-w-md mx-auto">
            {shuffledImages.map((image, index) => (
              <div
                key={`mobile-${index}`}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <img
                  src={image}
                  alt={`Brand ${index + 1}`}
                  className="w-full h-48 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout - with all the fancy animations
  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[57vw] max-h-[150vh] bg-gray-50 overflow-hidden flex items-center justify-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100" />
      
      {/* Content wrapper with perspective */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header text - sticky at top */}
        <div className="top-0 z-20 text-center px-3 py-4 sm:px-4 sm:py-6 md:py-8 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            Our Work
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-3 sm:mb-4 md:mb-6">
            Brands we've transformed into community leaders
          </p>
          <a
            href="/work"
            className="inline-block bg-accent text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 border border-accent hover:bg-transparent hover:text-accent"
          >
            View All Projects
          </a>
        </div>
        
        {/* Angled perspective container - 45 degree diagonal view (reversed) */}
        <div 
          className="absolute inset-0 h-[57vw] max-h-[150vh] flex items-center justify-center overflow-visible"
          style={{
            perspective: 'clamp(800px, 150vw, 2000px)',
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
            {/* Three rows of brand images - positioned diagonally (reversed) */}
            {Object.entries(brandImages).map(([key, images], rowIndex) => (
              <div
                key={key}
                className="absolute w-[600%] flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10"
                style={{
                  top: `${15 + rowIndex * 28}%`,
                  left: `${indexLocationMap[String(rowIndex)]}`,
                  transform: `translateX(-50%) ${getTransform(rowIndex)}`,
                  transition: 'transform 0.1s linear',
                  willChange: 'transform'
                }}
              >
                {/* All unique brand images */}
                {images.map((image, index) => (
                  <div
                    key={`${key}-${index}`}
                    className="flex-shrink-0 bg-white rounded-md sm:rounded-lg md:rounded-xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    style={{
                      width: 'clamp(100px, 20vw, 650px)',
                      height: 'clamp(70px, 14vw, 600px)',
                      padding: 'clamp(8px, 2vw, 32px)',
                      margin: '0 clamp(4px, 1vw, 16px)'
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
