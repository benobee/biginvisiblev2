import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setTheme } from './utils/theme';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import './styles/globals.css';

import Home from './pages/Home';
import About from './pages/About';
import Process from './pages/Process';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';
import BrandStrategy from './pages/services/BrandStrategy';
import VisualIdentity from './pages/services/VisualIdentity';
import DigitalExperience from './pages/services/DigitalExperience';
import ContentStrategy from './pages/services/ContentStrategy';
import BrandArchitecture from './pages/services/BrandArchitecture';
import CommunityBuilding from './pages/services/CommunityBuilding';
import { ThemeModeContext } from './components/ThemeModeContext';

function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const isHomePage = currentPath === '/';
  
  // Update current path when location changes
  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
      
      // Set light mode for all pages except home
      if (window.location.pathname !== '/') {
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
    };
    
    // Set initial path and theme
    updatePath();
    
    // Listen for route changes
    window.addEventListener('popstate', updatePath);
    
    // Also listen for clicks on links that might change the route
    const handleClick = () => {
      setTimeout(() => {
        if (window.location.pathname !== currentPath) {
          updatePath();
        }
      }, 0);
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', updatePath);
      document.removeEventListener('click', handleClick);
    };
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
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/process" element={<Process />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/brand-strategy" element={<BrandStrategy />} />
            <Route path="/services/visual-identity" element={<VisualIdentity />} />
            <Route path="/services/digital-experience" element={<DigitalExperience />} />
            <Route path="/services/content-strategy" element={<ContentStrategy />} />
            <Route path="/services/brand-architecture" element={<BrandArchitecture />} />
            <Route path="/services/community-building" element={<CommunityBuilding />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeModeContext.Provider>
  );
}

export default App;
