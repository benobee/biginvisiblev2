// Theme module types and utilities
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textDark: string;
  lightText: string;
  background: string;
  backgroundLight: string;
  backgroundAlt: string;
  overlay: string;
}

export interface ThemeTypography {
  fontFamily: {
    primary: string;
    heading: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  section: string;
}

export interface ThemeBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ThemeContainer {
  maxWidth: string;
  padding: string;
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface ThemeTransitions {
  default: string;
  fast: string;
  slow: string;
}

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
  container: ThemeContainer;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  transitions: ThemeTransitions;
}

// Theme utility functions
export const getThemeVariable = (variable: string): string => {
  return `var(--${variable})`;
};

export const getCSSVariable = (variable: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`);
  }
  return '';
};

// Theme switching utilities
export const setTheme = (theme: 'light' | 'dark'): void => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
  }
};

export const getCurrentTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    if (root.classList.contains('theme-dark')) {
      return 'dark';
    }
  }
  return 'light';
};

// CSS variable getters for common theme properties
export const themeVars = {
  // Colors
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)',
    text: 'var(--color-text)',
    textDark: 'var(--color-text-dark)',
    lightText: 'var(--color-light-text)',
    background: 'var(--color-background)',
    backgroundLight: 'var(--color-background-light)',
    backgroundAlt: 'var(--color-background-alt)',
    overlay: 'var(--color-overlay)',
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: 'var(--font-family-primary)',
      heading: 'var(--font-family-heading)',
      mono: 'var(--font-family-mono)',
    },
    fontSize: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
      '4xl': 'var(--font-size-4xl)',
      '5xl': 'var(--font-size-5xl)',
      '6xl': 'var(--font-size-6xl)',
    },
    fontWeight: {
      light: 'var(--font-weight-light)',
      normal: 'var(--font-weight-normal)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
    },
  },
  
  // Spacing
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
    '3xl': 'var(--spacing-3xl)',
    section: 'var(--spacing-section)',
  },
  
  // Container
  container: {
    maxWidth: 'var(--container-max-width)',
    padding: 'var(--container-padding)',
  },
  
  // Border Radius
  borderRadius: {
    sm: 'var(--border-radius-sm)',
    md: 'var(--border-radius-md)',
    lg: 'var(--border-radius-lg)',
    xl: 'var(--border-radius-xl)',
    full: 'var(--border-radius-full)',
  },
  
  // Shadows
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },
  
  // Transitions
  transitions: {
    default: 'var(--transition-default)',
    fast: 'var(--transition-fast)',
    slow: 'var(--transition-slow)',
  },
};

// Media query helpers
export const mediaQueries = {
  sm: `(min-width: var(--breakpoint-sm))`,
  md: `(min-width: var(--breakpoint-md))`,
  lg: `(min-width: var(--breakpoint-lg))`,
  xl: `(min-width: var(--breakpoint-xl))`,
  '2xl': `(min-width: var(--breakpoint-2xl))`,
};

// Export the CSS module classes
export const themeClasses = {
  light: 'light',
  dark: 'dark',
} as const;

export type ThemeClass = keyof typeof themeClasses;
