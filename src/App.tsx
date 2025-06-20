import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { darkTheme } from './styles/theme';
import { lightTheme } from './styles/lightTheme';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages-content/Home';
import About from './pages-content/About';
import Process from './pages-content/Process';
import Services from './pages-content/Services';
import Work from './pages-content/Work';
import Contact from './pages-content/Contact';
import BrandStrategy from './pages-content/services/BrandStrategy';
import VisualIdentity from './pages-content/services/VisualIdentity';
import DigitalExperience from './pages-content/services/DigitalExperience';
import ContentStrategy from './pages-content/services/ContentStrategy';
import BrandArchitecture from './pages-content/services/BrandArchitecture';
import CommunityBuilding from './pages-content/services/CommunityBuilding';

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
      } else {
        // On home page, reset based on scroll position
        if (window.scrollY > 300) {
          setIsLightMode(true);
        } else {
          setIsLightMode(false);
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
        } else {
          setIsLightMode(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  return (
    <ThemeModeContext.Provider value={{ isLightMode, setIsLightMode, isHomePage }}>
      <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
        <GlobalStyles />
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
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
