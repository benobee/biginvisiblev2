import React, { useRef, useContext, useEffect, useState } from 'react';
import { ThemeModeContext } from './ThemeModeContext';
import SimpleBlueprintGrid from './SimpleBlueprintGrid';
import styles from './HomePageHero.module.css';
import ConstellationBackground from './ConstellationBackground';

const HomePageHero: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { isLightMode } = useContext(ThemeModeContext);
  const [gridProgress, setGridProgress] = useState(0);
  const [gridVisible, setGridVisible] = useState(false);

  // Tuning values (can be adjusted)
  const scrollMultiplier = 2; // wrapper height in viewports (2 = 200vh)
  const moveDistanceVh = 130; // how many vh the content should move up at 100% progress

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (contentRef.current) contentRef.current.style.transform = 'none';
      if (gridRef.current) {
        gridRef.current.style.opacity = '0';
        gridRef.current.style.display = 'none';
      }
      return;
    }

    let ticking = false;
    let rafId = 0;
    let observer: IntersectionObserver | null = null;

    const update = () => {
      if (!wrapperRef.current || !contentRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollable = rect.height - viewportHeight;
      let progress = 0;

      if (scrollable > 0 && rect.top <= 0 && rect.bottom >= 0) {
        progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      } else if (rect.top > 0) {
        progress = 0;
      } else if (rect.bottom < 0) {
        progress = 1;
      }

      const movePx = (moveDistanceVh / 100) * viewportHeight;
      const translateY = -progress * movePx;
      contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      setGridProgress(progress);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    // Intersection Observer to reliably toggle grid visibility only while hero is intersecting viewport
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && wrapperRef.current && gridRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!gridRef.current) return;
          // Only show grid when hero section is actually visible in viewport
          // Using intersectionRatio to ensure at least some part is visible
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            gridRef.current.style.display = 'block';
            // ensure opacity change happens on next frame for smoother transition
            requestAnimationFrame(() => {
              if (gridRef.current) gridRef.current.style.opacity = '0.8';
            });
            setGridVisible(true);
          } else {
            // hide immediately to avoid overlaying other site sections
            gridRef.current.style.opacity = '0';
            gridRef.current.style.display = 'none';
            setGridVisible(false);
          }
        });
      }, { 
        threshold: [0, 0.01], // Trigger at 0% and 1% visibility
        rootMargin: '0px' // No margin extension
      });
      observer.observe(wrapperRef.current);
    } else if (gridRef.current) {
      // fallback: hide grid
      gridRef.current.style.display = 'none';
      gridRef.current.style.opacity = '0';
    }

    // Initial update and listeners
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
      if (observer && wrapperRef.current) observer.unobserve(wrapperRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer wrapper provides scrollable space while the inner hero stays pinned */}
      <div ref={wrapperRef} data-theme="dark" className={styles.heroScrollWrapper} style={{ height: `${scrollMultiplier * 100}vh`, background: 'rgb(5 25 35) !important;' }}>
        <section
          data-theme="dark"
          style={{ background: 'rgb(5 25 35) !important' }}
          className={`${styles.pinnedHero} min-h-screen bg-background text-white flex items-center relative overflow-hidden transition-all duration-500`}
        >
          {/* Constellation Background - fixed to viewport while hero is present */}
          <div
            ref={gridRef}
            className={`${styles.constellationLayer}`}
            style={{ display: 'none', opacity: 0, pointerEvents: 'none' }}
          >
            {gridProgress > 0.4 && <SimpleBlueprintGrid progress={gridProgress} gridVisible={gridVisible} />}
            {gridProgress > 0.4 && <ConstellationBackground />}
          </div>

          <div className={styles.heroShape} />

          {/* The block that will translate upward as the user scrolls */}
          <div ref={contentRef} className={`${styles.heroContent} section-container relative z-50`}>
            <div className="max-w-4xl m-auto">
              <div className="reveal-text text-sm sm:text-lg md:text-xl lg:text-2xl font-medium mb-6 sm:mb-8 text-accent uppercase tracking-wider">
                Branding Studio
              </div>
              <h1 className="reveal-text text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-6 sm:mb-8 font-bold leading-none tracking-tight">
                We make the <span className={`text-accent ${styles.fadeInCycle}`}>invisible</span> bonds between brands and people.
              </h1>
              <p className="reveal-text text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-80 leading-relaxed max-w-3xl">
                We help businesses find what makes them different and turn that into something people actually care about. No fluff, no buzzwords—just clear thinking about brands that work.
              </p>
              <div className="reveal-text flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="/contact"
                  className="bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 border border-accent hover:bg-transparent hover:text-accent no-underline text-center min-h-[44px] flex items-center justify-center"
                >
                  Start a project
                </a>
                <a
                  href="/work"
                  className="bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 border border-white/20 hover:border-white no-underline text-center min-h-[44px] flex items-center justify-center"
                >
                  View our work
                </a>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-30"
            onClick={scrollToServices}
          >
            <div className="text-xs uppercase tracking-widest mb-2">Scroll</div>
            <div className={`w-px h-10 bg-white relative overflow-hidden ${styles.scrollLine}`}></div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePageHero;
