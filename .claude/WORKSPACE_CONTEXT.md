# Big Invisible Workspace Context

## Project Overview
Big Invisible is a strategic brand architecture studio focused on making complex brand systems visible and actionable. The company specializes in creating clarity from complexity, helping organizations build authentic, lasting brand experiences.

## Technical Implementation

### Tech Stack
- **Framework**: Astro v5.10.1 with SSR (Server-Side Rendering)
- **UI Library**: React v19.1.0 with TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Build Tool**: Vite
- **Deployment**: Vercel (with @astrojs/vercel serverless adapter)
- **Type Safety**: TypeScript with strict mode

### Architecture Patterns
- **Component-Based**: React components with TypeScript interfaces
- **File-Based Routing**: Astro pages in `/src/pages`
- **Content Separation**: Page content in `/src/pages-content`, components in `/src/components`
- **Data Layer**: Structured data files in `/src/data` for services, projects, statistics
- **Theming**: Dynamic theme switching (light/dark) with CSS custom properties

### Development Commands
```bash
npm run dev      # Start development server on localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Key Dependencies
- astro, react, react-dom
- tailwindcss, postcss, autoprefixer
- framer-motion (animations)
- react-intersection-observer (scroll triggers)
- Various UI utilities (@radix-ui/react-slot, clsx, tailwind-merge)

## Design System

### Color Palette
- **Primary**: Black (#000000) and White (#FFFFFF)
- **Accent**: Blue (#4080ff), Pink/Red (#ff4080)
- **Grays**: Various shades for text hierarchy
- **Theme-Aware**: Colors adapt based on light/dark mode

### Typography
- **Font Stack**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Heading Hierarchy**: Bold, clean, minimal
- **Body Text**: Readable, professional
- **Letter Spacing**: Used strategically for emphasis

### Visual Language
- **Minimalism**: Clean lines, ample white space
- **Geometric Elements**: Abstract shapes representing complexity/simplicity
- **Transparency**: Glass-morphism effects, layering
- **Motion**: Subtle animations, scroll-triggered reveals
- **Grid System**: Structured layouts with responsive breakpoints

### Design Inspiration
- Pentagram: Clean navigation, professional minimalism
- MetaLab: Dark backgrounds, confident typography
- BASIC/DEPT: Bold accent colors, strategic layouts
- Ramotion: White space usage, elegant transitions

## Brand Messaging & Persona

### Core Message
"Making the invisible visible" - Big Invisible transforms complex brand architectures into clear, actionable systems that drive business growth and cultural connection.

### Brand Voice
- **Professional**: Authoritative without being intimidating
- **Insightful**: Deep understanding of brand complexity
- **Clear**: Simplifying without oversimplifying
- **Strategic**: Every decision has purpose
- **Human**: Technical expertise with emotional intelligence

### Value Propositions
1. **Clarity from Complexity**: Untangling multi-brand systems
2. **Strategic Foundation**: Research-driven, outcome-focused
3. **Cultural Resonance**: Brands that connect authentically
4. **Sustainable Systems**: Built to evolve and endure
5. **Measurable Impact**: Data-informed creative decisions

### Target Audience
- Enterprise organizations with complex brand portfolios
- Companies undergoing mergers, acquisitions, or restructuring
- Organizations seeking to align brand with business strategy
- Leaders who understand brand as a business driver

## Service Offerings

### 1. Brand Strategy
Deep research and strategic planning to align brand with business objectives.

### 2. Visual Identity
Creating distinctive visual systems that work across all touchpoints.

### 3. Digital Experience
Designing and developing digital platforms that embody brand values.

### 4. Content Strategy
Crafting messaging frameworks and content systems that resonate.

### 5. Brand Architecture
Organizing complex brand portfolios for clarity and impact.

### 6. Community Building
Creating connections between brands and their audiences.

## Project Structure

```
/biginvisible
├── /src
│   ├── /pages          # Astro page routes
│   ├── /pages-content  # React page components
│   ├── /components     # Reusable components
│   │   ├── /layout     # Header, Footer, Layout
│   │   └── /ui         # Buttons, Cards, Charts, etc.
│   ├── /data          # JSON data files
│   ├── /styles        # Global styles, themes
│   └── /utils         # Helper functions
├── /public            # Static assets
│   └── /images        # Organized by type
└── Configuration files (astro.config.mjs, etc.)
```

## Implementation Notes

### Performance Considerations
- Lazy loading for images and heavy components
- CSS-in-JS minimized for performance
- Server-side rendering for SEO and initial load
- Optimized bundle splitting with Vite

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Fluid typography and spacing
- Adaptive navigation patterns
- Touch-friendly interactions

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

### Future Considerations
- 3D graphics integration (Three.js experiments)
- Advanced data visualization
- Interactive brand tools
- AI-powered brand analysis

## Working with This Codebase

### Best Practices
1. Maintain the minimal aesthetic - less is more
2. Ensure all new features support both themes
3. Keep animations subtle and purposeful
4. Follow existing component patterns
5. Test on multiple devices and browsers

### Common Tasks
- Adding new service pages: Create in `/src/pages/services/`
- Updating components: Check `/src/components/ui/`
- Adding case studies: Update `/src/data/caseStudies.json`
- Theme modifications: Edit `/src/styles/themes.css`

### Git Workflow
- Main branch: `main`
- Feature branches: `feature/description`
- Commit style: Descriptive, present tense
- Pre-commit: Ensure lint passes