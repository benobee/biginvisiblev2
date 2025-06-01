import { darkTheme } from './theme';

export const lightTheme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    primary: '#FFFFFF', // White background
    secondary: '#F5F5F5', // Light gray
    accent: '#FF3A46', // Keep the same accent color
    text: '#0F1923', // Dark text on light backgrounds
    textDark: '#0F1923', // Dark text
    lightText: '#4A4A4A', // Medium gray text
    background: '#FFFFFF', // White background
    backgroundLight: '#F5F5F5', // Light gray background
    backgroundAlt: '#F0F0F0', // Slightly darker than background
    overlay: 'rgba(0, 0, 0, 0.05)', // Light overlay
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};
