# Big Invisible - Brand Architecture Studio

## 🚀 Quick Start
```bash
npm run dev       # Start dev server (localhost:4321)
npm run lint      # Check for linting errors
npm run build     # Ensure build succeeds
```

## 🎯 Critical Context
**What**: Brand architecture studio website - transforms complex brand systems into clarity
**Stack**: Astro + React + TypeScript + Tailwind CSS
**Deploy**: Vercel (SSR)
**Philosophy**: Minimalist, professional, agency-quality

## ⚡ Essential Commands
```bash
# ALWAYS run after changes:
npm run lint && npm run build

# Development:
npm run dev       # Dev server
npm run preview   # Preview production
```

## 📁 Project Structure
```
/src
├── /pages          # Astro routes
├── /pages-content  # React page components  
├── /components     # Reusable components
│   ├── /layout     # Header, Footer
│   └── /ui         # Buttons, Cards, etc.
├── /data          # JSON data files
└── /styles        # Global styles, themes
```

## 🛠️ Tech Stack Details
- **Astro** v5.10.1 (SSR enabled)
- **React** v19.1.0 + TypeScript
- **Tailwind CSS** + CSS Modules
- **Vite** build tool
- **@astrojs/vercel** serverless adapter

## 💡 Development Guidelines

### DO ✅
- Test in both light/dark themes
- Follow existing component patterns
- Mobile-first responsive design
- Keep animations subtle
- Use TypeScript interfaces
- Run lint + build before commits

### DON'T ❌
- Add unnecessary dependencies
- Create one-off styles (use Tailwind)
- Leave console.logs
- Skip theme testing
- Create files without explicit need

## 🎨 Design System

### Colors
- **Primary**: Black (#000), White (#FFF)
- **Accent**: Blue (#4080ff), Pink (#ff4080)
- **Theme-aware**: Adapts to light/dark

### Typography
- **Font**: System font stack
- **Style**: Bold, clean, minimal
- **Spacing**: Strategic emphasis

### Visual Language
- Minimalism with purpose
- Geometric abstractions
- Glassmorphism effects
- Subtle motion design

## 📝 Brand Voice
- Professional yet approachable
- Clear and strategic
- No jargon
- Value-focused

## 🔧 Common Tasks

### Add Service Page
1. Create in `/src/pages/services/[service-name].astro`
2. Add content in `/src/pages-content/services/`
3. Update `/src/data/services.ts`

### Update Component
1. Check `/src/components/ui/` first
2. Follow existing patterns
3. Test both themes

### Add Case Study
1. Update `/src/data/caseStudies.ts`
2. Follow existing data structure

## 🎯 Current Focus
- 3D graphics (Three.js/Babylon.js)
- Data visualization
- Interactive brand tools
- Performance optimization

## 🔗 Key Services
1. **Brand Strategy** - Align brand with business
2. **Visual Identity** - Distinctive visual systems
3. **Digital Experience** - Brand-embodied platforms
4. **Content Strategy** - Resonant messaging
5. **Brand Architecture** - Portfolio clarity
6. **Community Building** - Audience connections

## 📊 Performance Notes
- Lazy load heavy components
- SSR for SEO
- Optimized bundle splitting
- Mobile-first breakpoints

## 🚨 Remember
**Quality over quantity** - This is a high-end design studio. Every detail matters.