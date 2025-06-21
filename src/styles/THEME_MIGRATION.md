# Theme Migration Guide

This document explains how to migrate from the TypeScript theme objects to the new CSS modules approach.

## Overview

The theme has been converted from TypeScript objects (`theme.ts`) to CSS modules (`theme.module.css` and `theme.module.ts`) using CSS custom properties (CSS variables).

## Benefits

- **Better Performance**: CSS variables are parsed by the browser instead of JavaScript
- **Dynamic Theme Switching**: Themes can be switched without re-rendering components
- **Better CSS Integration**: Direct access to theme values in CSS files
- **Type Safety**: TypeScript utilities maintain type safety

## File Structure

```
src/styles/
├── theme.ts (old - can be removed after migration)
├── theme.module.css (new - CSS variables)
├── theme.module.ts (new - TypeScript utilities)
└── THEME_MIGRATION.md (this file)
```

## Usage Examples

### 1. In CSS/SCSS Files

```css
/* Before (using styled-components or CSS-in-JS) */
.button {
  background-color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.typography.fontFamily.primary};
}

/* After (using CSS variables) */
.button {
  background-color: var(--color-primary);
  font-family: var(--font-family-primary);
}
```

### 2. In React Components

```tsx
// Import the theme utilities
import { themeVars, setTheme, getCurrentTheme } from '../styles/theme.module';

// Use theme variables in inline styles
const MyComponent = () => {
  return (
    <div style={{
      backgroundColor: themeVars.colors.background,
      color: themeVars.colors.text,
      fontFamily: themeVars.typography.fontFamily.primary,
      padding: themeVars.spacing.md,
    }}>
      Content
    </div>
  );
};

// Theme switching
const ThemeToggle = () => {
  const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return <button onClick={toggleTheme}>Toggle Theme</button>;
};
```

### 3. In CSS Modules

```css
/* styles.module.css */
.container {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-family-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  transition: var(--transition-default);
}

@media (min-width: var(--breakpoint-md)) {
  .container {
    padding: var(--spacing-xl);
  }
}
```

### 4. Setting Up Theme in Your App

```tsx
// In your main App component or index.tsx
import { setTheme } from './styles/theme.module';

// Set initial theme
useEffect(() => {
  // Get theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialTheme = savedTheme || systemTheme;
  
  setTheme(initialTheme);
}, []);
```

## Available CSS Variables

### Colors
- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-text`
- `--color-text-dark`
- `--color-light-text`
- `--color-background`
- `--color-background-light`
- `--color-background-alt`
- `--color-overlay`

### Typography
- `--font-family-primary`
- `--font-family-heading`
- `--font-family-mono`
- `--font-size-xs` through `--font-size-6xl`
- `--font-weight-light` through `--font-weight-bold`

### Spacing
- `--spacing-xs` through `--spacing-3xl`
- `--spacing-section`

### Other
- `--border-radius-sm` through `--border-radius-full`
- `--shadow-sm` through `--shadow-lg`
- `--transition-default`, `--transition-fast`, `--transition-slow`
- `--container-max-width`, `--container-padding`

## Theme Switching

The theme is controlled by CSS classes on the document root:
- `.theme-light` - Applies light theme
- `.theme-dark` - Applies dark theme

Use the provided utilities to switch themes:

```tsx
import { setTheme, getCurrentTheme } from './styles/theme.module';

// Switch to dark theme
setTheme('dark');

// Switch to light theme
setTheme('light');

// Get current theme
const currentTheme = getCurrentTheme(); // 'light' or 'dark'
```

## Migration Steps

1. **Replace theme imports**:
   ```tsx
   // Before
   import { lightTheme, darkTheme } from './styles/theme';
   
   // After
   import { themeVars, setTheme } from './styles/theme.module';
   ```

2. **Update CSS-in-JS to CSS variables**:
   ```tsx
   // Before
   const styles = {
     backgroundColor: theme.colors.primary,
     color: theme.colors.text,
   };
   
   // After
   const styles = {
     backgroundColor: themeVars.colors.primary,
     color: themeVars.colors.text,
   };
   ```

3. **Update CSS files to use variables**:
   ```css
   /* Replace hardcoded values with CSS variables */
   .button {
     background-color: var(--color-primary);
     color: var(--color-text);
   }
   ```

4. **Update theme switching logic**:
   ```tsx
   // Before (using context)
   const { setTheme } = useTheme();
   
   // After (using utilities)
   import { setTheme } from './styles/theme.module';
   ```

5. **Test theme switching** to ensure all components update correctly.

This new approach provides better performance, easier maintenance, and more flexible theme management while maintaining type safety through TypeScript utilities.
