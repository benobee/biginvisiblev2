import { useState, useEffect } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  currentPath?: string;
}

const Header = ({ currentPath = '/' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Hide navigation on individual service pages
  const isServicePage = currentPath.startsWith('/services/') && currentPath !== '/services';
  
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled when scrolled down more than 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (isServicePage) {
    return null;
  }
  
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <a href="/" className={styles.logo} />
          
          <button 
            className={`${styles.menuButton} ${isMobileMenuOpen ? styles.active : ''}`} 
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
            <li>
              <a 
                href="/about" 
                className={`${styles.navLink} ${currentPath === '/about' ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/process" 
                className={`${styles.navLink} ${currentPath === '/process' ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                Process
              </a>
            </li>
            <li>
              <a 
                href="/services" 
                className={`${styles.navLink} ${currentPath === '/services' ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="/work" 
                className={`${styles.navLink} ${currentPath === '/work' ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                Work
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className={`${styles.ctaButton} ${currentPath === '/contact' ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;