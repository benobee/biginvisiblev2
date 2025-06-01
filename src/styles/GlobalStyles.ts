import { createGlobalStyle } from 'styled-components';
import type { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  @keyframes fadeInFromNone {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 1.1;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    letter-spacing: -0.02em;
    transition: color 0.3s ease;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.light};
    transition: color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: all ${({ theme }) => theme.transitions.fast};
    position: relative;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    
    &:disabled {
      cursor: not-allowed;
    }
  }

  .container {
    width: 100%;
    max-width: ${({ theme }) => theme.container.maxWidth};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.container.padding};
  }

  section {
    padding: ${({ theme }) => theme.spacing.section} 0;
  }
  
  .accent {
    color: ${({ theme }) => theme.colors.accent};
  }
  
  .text-gradient {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent} 0%, #FF8A80 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }
  
  .reveal-text {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .reveal-text.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }

    h1 {
      font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    }

    h2 {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    }

    h3 {
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    }
    
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
