import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { ThemeModeContext } from '../ThemeModeContext';

interface HeaderProps {
  isScrolled: boolean;
}

const StyledHeader = styled.header<HeaderProps>`
  background-color: ${({ theme, isScrolled }) => 
    isScrolled ? theme.colors.background : 'transparent'};
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.default};
  backdrop-filter: ${({ isScrolled }) => isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${({ isScrolled, theme }) => 
    isScrolled ? `1px solid ${theme.colors.text === '#FFFFFF' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}` : 'none'};
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: 0 ${({ theme }) => theme.container.padding};
  margin: 0 auto;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  width: 150px;
  height: 40px;
  background: center / contain no-repeat url("/images/logo/bigInvisible-logo.png");
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1001;
  transition: color ${({ theme }) => theme.transitions.default};
  
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

interface NavLinksProps {
  isOpen: boolean;
}

const NavLinks = styled.ul<NavLinksProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    justify-content: center;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform ${({ theme }) => theme.transitions.default}, background-color ${({ theme }) => theme.transitions.default};
    z-index: 1000;
  }
`;

interface NavLinkProps {
  isActive?: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem 0;
  position: relative;
  transition: color ${({ theme }) => theme.transitions.default};
  
  &:after {
    content: '';
    position: absolute;
    width: ${({ isActive }) => isActive ? '100%' : '0'};
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transitions.default};
  }
  
  &:hover:after {
    width: 100%;
  }
  
  ${({ isActive, theme }) => isActive && `
    color: ${theme.colors.accent};
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
`;

interface CTAButtonProps {
  isActive?: boolean;
}

const CTAButton = styled(Link)<CTAButtonProps>`
  background-color: ${({ isActive, theme }) => isActive ? theme.colors.accent : 'transparent'};
  color: ${({ isActive, theme }) => 
    isActive 
      ? theme.colors.background 
      : theme.colors.accent};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  }
`;

interface MenuButtonProps {
  isOpen: boolean;
}

const MenuButton = styled.button<MenuButtonProps>`
  display: none;
  position: relative;
  z-index: 1001;
  width: 30px;
  height: 20px;
  
  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${({ theme }) => theme.colors.text};
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: all 0.25s ease-in-out, background-color ${({ theme }) => theme.transitions.default};
    
    &:nth-child(1) {
      top: ${({ isOpen }) => isOpen ? '9px' : '0px'};
      transform: ${({ isOpen }) => isOpen ? 'rotate(135deg)' : 'rotate(0deg)'};
    }
    
    &:nth-child(2) {
      top: 9px;
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      top: ${({ isOpen }) => isOpen ? '9px' : '18px'};
      transform: ${({ isOpen }) => isOpen ? 'rotate(-135deg)' : 'rotate(0deg)'};
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { setIsLightMode, isHomePage } = useContext(ThemeModeContext);
  
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled when scrolled down more than 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Switch to light mode when scrolled down more than 300px, but only on home page
      if (isHomePage) {
        if (window.scrollY > 300) {
          setIsLightMode(true);
        } else {
          setIsLightMode(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsLightMode, isHomePage]);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <StyledHeader isScrolled={isScrolled}>
      <HeaderContainer>
        <Nav>
          <Logo to="/" />
          
          <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </MenuButton>
          
          <NavLinks isOpen={isMenuOpen}>
            <li><NavLink to="/about" onClick={closeMenu} isActive={location.pathname === '/about'}>About</NavLink></li>
            <li><NavLink to="/process" onClick={closeMenu} isActive={location.pathname === '/process'}>Process</NavLink></li>
            <li><NavLink to="/services" onClick={closeMenu} isActive={location.pathname === '/services'}>Services</NavLink></li>
            <li><NavLink to="/work" onClick={closeMenu} isActive={location.pathname === '/work'}>Work</NavLink></li>
            <li><CTAButton to="/contact" onClick={closeMenu} isActive={location.pathname === '/contact'}>Contact</CTAButton></li>
          </NavLinks>
        </Nav>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
