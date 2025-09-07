import { useState, useEffect } from 'react';
import { setTheme } from './utils/theme';
import { initRevealAnimations } from './utils/animations';
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
  const isServicePage = currentPath.startsWith('/services/') && currentPath !== '/services';
  const isStatisticsDetailPage = currentPath.startsWith('/stat-detail');
  
  // Update theme based on current path
  useEffect(() => {
    // Set light mode for all pages except home, service pages, and statistics detail pages
    if (!isHomePage && !isServicePage && !isStatisticsDetailPage) {
      setIsLightMode(true);
      setTheme('light');
    } else if (isHomePage || isServicePage || isStatisticsDetailPage) {
      // On home page, service pages, and statistics detail pages, set theme based on scroll position
      const scrollThreshold = isHomePage ? 300 : 150; // Service and statistics pages switch earlier
      if (window.scrollY > scrollThreshold) {
        setIsLightMode(true);
        setTheme('light');
      } else {
        setIsLightMode(false);
        setTheme('dark');
      }
    }
  }, [currentPath, isHomePage, isServicePage, isStatisticsDetailPage]);

  // Listen for scroll to determine theme mode on home page, service pages, and statistics detail pages
  useEffect(() => {
    const handleScroll = () => {
      // Switch themes on home page, service pages, and statistics detail pages
      if (isHomePage || isServicePage || isStatisticsDetailPage) {
        // Different thresholds for different pages
        const scrollThreshold = 150;
          
        if (window.scrollY > scrollThreshold) {
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
  }, [currentPath, isHomePage, isServicePage, isStatisticsDetailPage]);

  // Initialize animations globally
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);

  return (
    <ThemeModeContext.Provider value={{ isLightMode, setIsLightMode, isHomePage }}>
        <Layout currentPath={currentPath}>
          {children}
        </Layout>
    </ThemeModeContext.Provider>
  );
}

export default PageWrapper;