# Theme System Documentation

This project uses a Tailwind CSS-based theme system with CSS custom properties for dynamic theme switching.

## Files Structure

- `globals.css` - Main stylesheet with theme variables and global styles
- `theme.ts` - Utility functions for theme management
- `tailwind.config.js` - Tailwind configuration with theme-aware colors

## Theme Colors

### CSS Custom Properties
Colors are defined as CSS custom properties and can be used in two ways:

```css
/* In CSS */
background-color: rgb(var(--color-primary));
color: rgb(var(--color-text));

/* With opacity */
background-color: rgb(var(--color-primary) / 0.8);
```

### Tailwind Classes
Use the predefined Tailwind classes that automatically switch with theme:

```jsx
// Theme-aware colors
<div className="bg-primary text-text-primary">
<div className="bg-accent text-bg-primary">

// Static brand colors (always the same)
<div className="bg-brand-accent text-brand-light">
```

## Available Theme Colors

### Theme-Aware (Light/Dark)
- `primary` - Main background color
- `secondary` - Secondary background color  
- `accent` - Brand accent color (#ff2356)
- `text-primary` - Main text color
- `text-light` - Light text color
- `text-dark` - Dark text color
- `bg-primary` - Primary background
- `bg-light` - Light background
- `bg-alt` - Alternative background

### Static Brand Colors
- `brand-accent` - #ff2356
- `brand-dark` - #0F1923
- `brand-light` - #FFFFFF
- `gray-light` - #F5F7FA
- `gray-medium` - #4A5568
- `gray-border` - #E2E8F0

## Theme Management

### Setting Theme Programmatically
```typescript
import { setTheme } from './utils/theme';

// Set light theme
setTheme('light');

// Set dark theme  
setTheme('dark');
```

### Getting Current Theme
```typescript
import { getTheme, getCurrentThemeColors } from './utils/theme';

const currentTheme = getTheme(); // 'light' | 'dark'
const colors = getCurrentThemeColors(); // Object with current theme colors
```

### Theme Switching
The app automatically switches themes based on:
- Route (non-home pages use light theme)
- Scroll position (home page switches to light when scrolled down 300px)

## Usage Examples

### Basic Component with Theme Colors
```jsx
function MyComponent() {
  return (
    <div className="bg-primary text-text-primary p-4 border border-gray-border">
      <h2 className="text-accent font-bold">Title</h2>
      <p className="text-text-light">Description text</p>
    </div>
  );
}
```

### Using Static Brand Colors
```jsx
function BrandElement() {
  return (
    <div className="bg-brand-accent text-brand-light p-4">
      Always uses brand colors regardless of theme
    </div>
  );
}
```

### Custom Theme-Aware Styling
```jsx
function CustomComponent() {
  return (
    <div 
      className="p-4"
      style={{
        backgroundColor: 'rgb(var(--color-primary) / 0.8)',
        border: '1px solid rgb(var(--color-accent))'
      }}
    >
      Custom styling with CSS variables
    </div>
  );
}
```

## Extending the Theme

### Adding New Colors
1. Add CSS custom properties in `globals.css`:
```css
:root {
  --color-new-color: 255 0 0; /* RGB values */
}

[data-theme="dark"] {
  --color-new-color: 0 255 0;
}
```

2. Add Tailwind classes in `tailwind.config.js`:
```javascript
colors: {
  'new-color': 'rgb(var(--color-new-color) / <alpha-value>)',
}
```

3. Use in components:
```jsx
<div className="bg-new-color text-new-color">
```

### Custom Animations
Add keyframes to `tailwind.config.js`:
```javascript
keyframes: {
  customAnimation: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
},
animation: {
  'custom': 'customAnimation 1s ease-in-out',
}
```

## Migration from Styled Components

The old styled-components theme system has been replaced with this Tailwind-based system. Key changes:

1. Replace `${({ theme }) => theme.colors.accent}` with `rgb(var(--color-accent))`
2. Use Tailwind classes instead of styled components where possible
3. Use CSS custom properties for complex styling
4. Theme switching is now handled by CSS custom properties instead of React context