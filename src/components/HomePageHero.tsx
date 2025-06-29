import { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeModeContext } from './ThemeModeContext';
import { initRevealAnimations } from '../utils/animations';
import styles from './HomePageHero.module.css';

const HomePageHero = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const { isLightMode } = useContext(ThemeModeContext);
  
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
  return (
    <>
      <section className="min-h-screen bg-background text-white flex items-center relative overflow-hidden transition-all duration-500">
        <div 
          className={`absolute inset-0 z-10 ${styles.heroBackground}`}
          style={{ opacity: isLightMode ? 1 : 0 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
            alt="Hero background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className={styles.heroShape} />
        
        <div className="section-container relative z-20">
          <div className="max-w-4xl">
            <div className="reveal-text text-xl md:text-2xl font-medium mb-8 text-accent uppercase tracking-wider">
              Branding Studio
            </div>
            <h1 className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 font-bold leading-none tracking-tight">
              We make the <span className="text-accent">invisible</span> bonds between brands and people.
            </h1>
            <p className="reveal-text text-lg md:text-xl lg:text-2xl mb-12 opacity-80 leading-relaxed max-w-3xl">
              Transform your business into a trusted authority through our systematic approach — where strategic brand architecture meets meaningful community impact.
            </p>
            <div className="reveal-text flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="inline-block bg-accent text-white px-8 py-4 font-medium text-sm uppercase tracking-wider transition-all duration-300 border border-accent hover:bg-transparent hover:text-accent no-underline"
              >
                Start a project
              </Link>
              <Link 
                to="/work" 
                className="inline-block bg-transparent text-white px-8 py-4 font-medium text-sm uppercase tracking-wider transition-all duration-300 border border-white/20 hover:border-white no-underline"
              >
                View our work
              </Link>
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
    </>
  );
};

export default HomePageHero;
