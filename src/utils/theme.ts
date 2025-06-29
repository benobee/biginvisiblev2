export type ThemeMode = 'light' | 'dark';

export const setTheme = (theme: ThemeMode) => {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
};

export const getTheme = (): ThemeMode => {
  const stored = localStorage.getItem('theme') as ThemeMode;
  if (stored) return stored;
  
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

export const initTheme = () => {
  const theme = getTheme();
  setTheme(theme);
  return theme;
};

// Theme colors object for programmatic access
export const themeColors = {
  light: {
    primary: '#FFFFFF',
    secondary: '#F5F7FA',
    accent: '#ff2356',
    text: '#0F1923',
    textDark: '#FFFFFF',
    textLight: '#4A5568',
    background: '#FFFFFF',
    backgroundLight: '#F5F7FA',
    backgroundAlt: '#EDF2F7',
    overlay: 'rgba(245, 247, 250, 0.8)',
  },
  dark: {
    primary: '#0F1923',
    secondary: '#1A2C3B',
    accent: '#ff2356',
    text: '#FFFFFF',
    textDark: '#0F1923',
    textLight: '#F5F5F5',
    background: '#0F1923',
    backgroundLight: '#FFFFFF',
    backgroundAlt: '#141E26',
    overlay: 'rgba(15, 25, 35, 0.8)',
  },
};

// Utility functions to get current theme colors
export const getCurrentThemeColors = () => {
  const isDark = document.documentElement.hasAttribute('data-theme');
  return isDark ? themeColors.dark : themeColors.light;
};

// Tailwind class utilities for dynamic theming
export const getThemeClasses = (lightClass: string, darkClass: string) => {
  return `${lightClass} dark:${darkClass}`;
};

// Common theme-aware Tailwind classes
export const themeClasses = {
  text: {
    primary: 'text-text-primary',
    light: 'text-text-light',
    dark: 'text-text-dark',
    accent: 'text-accent',
  },
  bg: {
    primary: 'bg-bg-primary',
    light: 'bg-bg-light',
    alt: 'bg-bg-alt',
    accent: 'bg-accent',
  },
  border: {
    primary: 'border-gray-border',
    accent: 'border-accent',
  },
};