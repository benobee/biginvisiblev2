import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
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
  
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo} />
          
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
              <Link 
                to="/about" 
                className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/process" 
                className={`${styles.navLink} ${location.pathname === '/process' ? styles.active : ''}`}
              >
                Process
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className={`${styles.navLink} ${location.pathname === '/services' ? styles.active : ''}`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/work" 
                className={`${styles.navLink} ${location.pathname === '/work' ? styles.active : ''}`}
              >
                Work
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`${styles.ctaButton} ${location.pathname === '/contact' ? styles.active : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
