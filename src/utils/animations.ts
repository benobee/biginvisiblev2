/**
 * Initialize reveal animations for elements with the 'reveal-text' class
 * This function adds the 'visible' class to elements when they enter the viewport
 */
export const initRevealAnimations = () => {
  // Ensure DOM is ready
  const initialize = () => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal-text:not(.visible)');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Only check after a delay to avoid hydration mismatch
    setTimeout(handleScroll, 250);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };

  // If DOM is already loaded, initialize immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
    return () => {}; // Return empty cleanup for consistency
  } else {
    return initialize();
  }
};

/**
 * Initialize parallax effect for elements with the 'parallax' class
 * This function moves elements at different speeds based on scroll position
 */
export const initParallaxEffects = () => {
  const handleScroll = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax if element is in viewport
      if (elementTop < windowHeight && elementBottom > 0) {
        const speed = element.getAttribute('data-speed') || '0.1';
        const yPos = -(elementTop * parseFloat(speed));
        
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on initial load
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
