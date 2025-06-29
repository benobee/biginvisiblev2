/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS custom properties
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text) / <alpha-value>)',
        'text-dark': 'rgb(var(--color-text-dark) / <alpha-value>)',
        'text-light': 'rgb(var(--color-text-light) / <alpha-value>)',
        'bg-primary': 'rgb(var(--color-background) / <alpha-value>)',
        'bg-light': 'rgb(var(--color-background-light) / <alpha-value>)',
        'bg-alt': 'rgb(var(--color-background-alt) / <alpha-value>)',
        overlay: 'rgb(var(--color-overlay) / <alpha-value>)',
        
        // Static colors for consistency
        'brand-accent': '#ff2356',
        'brand-dark': '#0F1923',
        'brand-light': '#FFFFFF',
        'gray-light': '#F5F7FA',
        'gray-medium': '#4A5568',
        'gray-border': '#E2E8F0',
      },
      fontFamily: {
        primary: [
          'Neue Haas Grotesk',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
        heading: [
          'Neue Haas Grotesk Display',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
        mono: [
          'SF Mono',
          'Roboto Mono',
          'Consolas',
          'monospace'
        ],
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
        light: '400',
        normal: '500',
        medium: '600',
        semibold: '700',
        bold: '800',
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
      maxWidth: {
        container: 'var(--container-max-width)',
      },
      padding: {
        container: 'var(--container-padding)',
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionDuration: {
        default: '300ms',
        fast: '150ms',
        slow: '500ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 1s ease-out both',
        'progress-fill': 'progressFill 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-50px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        progressFill: {
          from: { width: '0%' },
          to: { width: 'var(--progress-width)' },
        },
      },
    },
  },
  plugins: [],
}
