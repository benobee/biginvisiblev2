import { useState, useEffect } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  currentPath?: string;
}

const Header = ({ currentPath = '/' }: HeaderProps) => {
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
  
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <a href="/" className={styles.logo} />
          
          <button 
            className={`${styles.menuButton}`} 
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul className={`${styles.navLinks}`}>
            <li>
              <a 
                href="/about" 
                className={`${styles.navLink} ${currentPath === '/about' ? styles.active : ''}`}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/process" 
                className={`${styles.navLink} ${currentPath === '/process' ? styles.active : ''}`}
              >
                Process
              </a>
            </li>
            <li>
              <a 
                href="/services" 
                className={`${styles.navLink} ${currentPath === '/services' ? styles.active : ''}`}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="/work" 
                className={`${styles.navLink} ${currentPath === '/work' ? styles.active : ''}`}
              >
                Work
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className={`${styles.ctaButton} ${currentPath === '/contact' ? styles.active : ''}`}
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