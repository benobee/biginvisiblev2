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

## 📝 Brand Voice & Tone

### Core Personality
**Conversational expert** - Smart friend who's great at branding, confident without being arrogant

### Voice Characteristics
- **Friendly but professional** - Like talking to a smart friend who happens to be excellent at branding
- **Confident, not arrogant** - "We've got this" energy vs. "We're the best" claims
- **Subtly quirky** - Unexpected word choices that make people smile without undermining professionalism
- **Human-centered** - Focus on real business challenges, not abstract concepts
- **Conversational** - Use contractions, ask rhetorical questions, be warm

### Writing Guidelines

#### DO ✅
- Use contractions ("We'll" vs "We will")
- Ask rhetorical questions ("Tired of blending in?")
- Include subtle personality ("Coffee-fueled strategy sessions")
- Be specific ("Turn browsers into buyers" vs "increase conversions")
- Use active voice ("We create" vs "Solutions are created")
- Add warmth ("Let's figure this out together")
- Include gentle humor ("No corporate buzzword bingo here")

#### DON'T ❌
- Use buzzwords (leverage, optimize, maximize, sophisticated)
- Industry jargon (stakeholder alignment, strategic framework)
- Superlatives (revolutionary, game-changing, industry-leading)
- Passive voice ("Strategies are developed")
- Generic promises (exceed expectations, deliver results)
- Corporate speak (comprehensive solutions, cutting-edge methodology)

### Word Replacements
- Comprehensive → Complete / Full picture
- Strategic → Smart / Thoughtful  
- Leverage → Use / Build on
- Optimize → Fine-tune / Perfect
- Stakeholders → Your team / People who matter
- Framework → System / Approach
- Solutions → Help / What we do

### Hero Header Style Guide

#### Pattern: Dual-Reading Headers
Hero headers should work as complete sentences both WITH and WITHOUT the accent text:
- Base sentence must be grammatically correct without the accent word
- Accent word adds emphasis and deeper meaning when revealed
- Use fadeInCycle animation for accent text reveals

#### Structure:
```jsx
<FullScreenHero
  title={<>First line<br />second line <span className={`text-accent ${styles.fadeInCycle}`}>reveal</span><br />third line</>}
  textAlign="left"
/>
```

#### Examples:
- **Home:** "We create the **invisible** connections between brands and people"
  - Without: "We create the connections between brands and people"
- **About:** "We build brands **that matter**"
  - Without: "We build brands"
- **Process:** "Our process<br />creates **authentic**<br />connections"
  - Without: "Our process creates connections"

#### Visual Guidelines:
- Use line breaks (`<br />`) for multi-line headers
- Place reveal word strategically for maximum impact
- Accent text uses red color (#ff4080 or #ff2356)
- Animation: 3s fade in with continuous pulse
- Left-align for non-home pages using FullScreenHero

### Copy Examples

#### Before/After Transformations
**Service Description:**
- Before: "Develop a clear, compelling brand strategy that differentiates your business and resonates with your target audience."
- After: "Figure out what makes you different and why people should care. (Spoiler: You're more interesting than you think.)"

**Process Step:**
- Before: "Research & Discovery - We start by understanding your business, industry, and audience through comprehensive research."
- After: "Getting Curious - We dig into your business, chat with your team, and ask the questions that matter. Think detective work, but with better coffee."

**CTA Examples:**
- "Let's talk" (instead of "Schedule a consultation")
- "Start the conversation" (instead of "Get started")
- "Tell us your story" (instead of "Contact us")

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
1. **Brand Strategy** - Figure out what makes you different and why people should care
2. **Visual Identity** - Make your brand look as good as your product works
3. **Digital Experience** - Build digital experiences people actually enjoy using
4. **Content Strategy** - Tell stories that stick (because nobody remembers boring)
5. **Brand Architecture** - Organize your brand family so it actually makes sense
6. **Community Building** - Turn customers into fans, and fans into family

## 📊 Performance Notes
- Lazy load heavy components
- SSR for SEO
- Optimized bundle splitting
- Mobile-first breakpoints

## 🚨 Remember
**Quality over quantity** - This is a high-end design studio. Every detail matters.