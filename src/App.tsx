import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { darkTheme } from './styles/theme';
import { lightTheme } from './styles/lightTheme';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Process from './pages/Process';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';
import { ThemeModeContext } from './components/ThemeModeContext';

function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  
  // Listen for scroll to determine theme mode
  useEffect(() => {
    const handleScroll = () => {
      // Switch to light mode when scrolled down more than 300px
      if (window.scrollY > 300) {
        setIsLightMode(true);
      } else {
        setIsLightMode(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeModeContext.Provider value={{ isLightMode, setIsLightMode }}>
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
