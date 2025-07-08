import { useState, useEffect } from 'react';
import { setTheme } from './utils/theme';
import Layout from './components/layout/Layout';
import './styles/globals.css';
import { ThemeModeContext } from './components/ThemeModeContext';

interface PageWrapperProps {
  children: React.ReactNode;
  currentPath: string;
}

function PageWrapper({ children, currentPath }: PageWrapperProps) {
  const [isLightMode, setIsLightMode] = useState(false);
  const isHomePage = currentPath === '/';
  
  // Update theme based on current path
  useEffect(() => {
    // Set light mode for all pages except home
    if (currentPath !== '/') {
      setIsLightMode(true);
      setTheme('light');
    } else {
      // On home page, reset based on scroll position
      if (window.scrollY > 300) {
        setIsLightMode(true);
        setTheme('light');
      } else {
        setIsLightMode(false);
        setTheme('dark');
      }
    }
  }, [currentPath]);
  
  // Listen for scroll to determine theme mode, but only on home page
  useEffect(() => {
    const handleScroll = () => {
      // Only switch themes on home page
      if (currentPath === '/') {
        // Switch to light mode when scrolled down more than 300px
        if (window.scrollY > 300) {
          setIsLightMode(true);
          setTheme('light');
        } else {
          setIsLightMode(false);
          setTheme('dark');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  return (
    <ThemeModeContext.Provider value={{ isLightMode, setIsLightMode, isHomePage }}>
      <Layout currentPath={currentPath}>
        {children}
      </Layout>
    </ThemeModeContext.Provider>
  );
}

export default PageWrapper;