export const lightTheme = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#F5F7FA',
    accent: '#ff2356', // Keep the same accent color for brand consistency
    text: '#0F1923', // Dark text on light background
    textDark: '#FFFFFF', // Light text for dark backgrounds
    lightText: '#4A5568',
    background: '#FFFFFF',
    backgroundLight: '#F5F7FA',
    backgroundAlt: '#EDF2F7',
    overlay: 'rgba(245, 247, 250, 0.8)',
  },
  typography: {
    fontFamily: {
      primary: "'Neue Haas Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      heading: "'Neue Haas Grotesk Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'SF Mono', 'Roboto Mono', Consolas, monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.5rem',
      '5xl': '3.5rem',
      '6xl': '4.5rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    section: '5rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  container: {
    maxWidth: '1400px',
    padding: '2rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out',
  },
};

// Rename the current theme to darkTheme
export const darkTheme = {
  colors: {
    primary: '#0F1923',
    secondary: '#1A2C3B',
    accent: '#ff2356',
    text: '#FFFFFF',
    textDark: '#0F1923',
    lightText: '#F5F5F5',
    background: '#0F1923',
    backgroundLight: '#FFFFFF',
    backgroundAlt: '#141E26',
    overlay: 'rgba(15, 25, 35, 0.8)',
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  breakpoints: lightTheme.breakpoints,
  container: lightTheme.container,
  borderRadius: lightTheme.borderRadius,
  shadows: lightTheme.shadows,
  transitions: lightTheme.transitions,
};

export type Theme = typeof darkTheme;
