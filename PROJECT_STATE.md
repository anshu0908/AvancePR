# Avance PR Rebuild — Project State & Resume Blueprint

> **Reference File**: Created on October 14, 2026  
> **Status**: 100% Implemented & Active on Local Dev Server (`http://localhost:3001/`)  
> **Location**: Workspace root `c:\Work\AvancePR\PROJECT_STATE.md`

---

## 1. The Vision & Role

You are a **senior creative developer and art director at a top-tier digital studio**. You are building a pitch-quality redesign of **avancepr.in** (Avance PR, a boutique strategic communications agency based in Truworx Vatika Triangle, Sector 28, Gurugram, India, founded by Ogilvy alumna Ritika Garg).

### Visual & Artistic Standard
- **Mood**: High-end editorial magazine meets modern boutique agency. Confident, restrained, warm, and cinematic.
- **Palette Anchor**:
  - `Brand Champagne Gold`: `#D4973B` (elevated from the live `#A16207` for radiant clarity on modern displays)
  - `Antique Bronze Accent`: `#854D0E`
  - `Velvet Obsidian`: `#090807` (deep dark surface for hero, closing CTA, and selected work)
  - `Alabaster Off-White`: `#FAF9F6` (editorial paper tone for alternating light sections)
- **Typography Pairing**:
  - Headings / Display: **Plus Jakarta Sans** (weights 600, 700, 800) with fluid clamp scales and tight tracking (`-0.035em`)
  - Editorial Prestige Quotes: **Playfair Display** (italic & regular)
  - Body & Captions: **Inter** & **Plus Jakarta Sans** (weights 400, 500, relaxed line-height `1.65 - 1.75`)
- **Signature 3D Element**: Concentric broadcast signal ripple wave field in Three.js (R3F) with custom vertex/fragment shader, damped mouse bend, and scroll recession. (Graceful CSS gradient fallback on mobile < 768px, reduced motion, and low-power hardware).
- **Hard Rule**: 100% authentic, real data only. Zero invented metrics or quotes.

---

## 2. What Has Been Completed So Far

### A. Phase 0: Research & Audit (100% Complete)
- **Full-page screenshots taken & saved** in `/research/`:
  - `desktop-home.png` & `mobile-home.png`
  - `desktop-about.png` & `mobile-about.png`
  - `desktop-contact.png` & `mobile-contact.png`
  - `desktop-faq.png` & `mobile-faq.png`
  - `desktop-blogs.png` & `mobile-blogs.png`
  - `desktop-service-startup-pr.png` & `mobile-service-startup-pr.png`
  - `desktop-work-hostbooks.png` & `mobile-work-hostbooks.png`
  - `desktop-work-stovekraft.png` & `mobile-work-stovekraft.png`
- **Audit Reports Generated**:
  - `/research/brand-audit.md`: Full audit covering live styles, colors, typography, imagery habits, and what to keep vs. elevate.
  - `MISSING_ASSETS.md`: Inventory of local vs missing assets.
- **Downloaded All Core Brand Assets** into `/public/assets/`:
  - `public/assets/logo.png` (Live logo)
  - `public/assets/ritika.jpeg` (Official founder portrait)
  - `public/assets/services/*.webp` (All 6 service images)
  - `public/assets/work/*.png / *.jpeg` (All 13 case study covers downloaded directly from Supabase)
  - `public/assets/clients/*.png` (Client logos 1 through 7)

### B. Engineering Foundation & Architecture
- **Tech Stack Setup**: Vite, React 18, TypeScript (Strict), Tailwind CSS, GSAP (ScrollTrigger), Lenis, Framer Motion, Three.js, @react-three/fiber, @react-three/drei, Lucide React, React Helmet Async, Fontsource packages.
- **Config Files**:
  - `vite.config.ts` (with `@` alias pointing to `/src`)
  - `tsconfig.json` & `tsconfig.node.json` (strict mode, path aliases)
  - `tailwind.config.js` & `postcss.config.js` (custom luxury tokens, animations)
  - `index.html` (SEO tags, accessibility skip link, favicon)
  - `src/styles/globals.css` (tokens, font imports, Lenis styles, film grain overlay)
- **Typed Data Layer** (`src/data/`):
  - `services.ts` (all 6 verified services with deliverables & approach)
  - `work.ts` (all 13 case studies with real overview, objective, strategy, and outcome)
  - `testimonials.ts` (all 8 verbatim client quotes without duplicates)
  - `press.ts` (all 8 real press coverage links: afaqs, Adgully, Reputation Today, etc.)
  - `awards.ts` (all 5 national awards: ET 40 Under 40, ET Women Leaders, etc.)
  - `site.ts` (site configuration, Gurugram address, phone, WhatsApp, socials)
  - `faq.ts` (8 authentic agency FAQs with comprehensive answers)
  - `blogs.ts` (thought leadership articles)
- **Libraries & Hooks** (`src/lib/` & `src/hooks/`):
  - `src/lib/gsap.ts` (ScrollTrigger registered once)
  - `src/lib/motion.ts` (shared Framer Motion transition variants)
  - `src/hooks/useLenis.ts` (Lenis smooth scroll wired to GSAP ticker with `lagSmoothing(0)`)
  - `src/hooks/useReducedMotion.ts` & `src/hooks/useMediaQuery.ts`
- **3D WebGL Components** (`src/components/three/`):
  - `SignalWavesCanvas.tsx` (container with device capability & WebGL checks)
  - `SignalWavesScene.tsx` (R3F scene with custom GLSL shader and damped mouse tracking)
  - `SignalWavesFallback.tsx` (CSS/SVG concentric glow for mobile & low-power)
- **UI Components** (`src/components/ui/`):
  - `CustomCursor.tsx` (desktop spring dot with contextual "View" state)
  - `MagneticButton.tsx` (cursor gravitation physics with arrow transitions)
  - `SectionHeading.tsx` (fluid typography with theme support)
  - `Badge.tsx` (editorial pill badge)
- **Layout Components** (`src/components/layout/`):
  - `Navbar.tsx` (sticky hide-on-scroll with full-screen mobile menu overlay and WhatsApp quick-contact)
  - `Footer.tsx` (normalized contacts, Vatika Triangle address, fixed mailto, back-to-top)
- **Home Sections Built** (`src/components/sections/`):
  1. `HeroSection.tsx` (3D canvas, split-text reveal headline, dual CTAs, ticker marquee)
  2. `IntroScrubSection.tsx` (word-by-word scroll-triggered opacity scrub)
  3. `StatsBandSection.tsx` (animated count-up: 100+ Brands, 13 Cases, 5 Awards + press strip)
  4. `ServicesListSection.tsx` (stacked list with cursor image preview on desktop, accordion on mobile)
  5. `SelectedWorkSection.tsx` (pinned GSAP horizontal scroll on desktop, stack on mobile)
  6. `ClientsMarqueeSection.tsx` (dual-row infinite marquee, grayscale to color on hover)
  7. `TestimonialsSection.tsx` (large-type quote slider, verified quotes, progress bar)
  8. `FounderSection.tsx` (Ritika Garg portrait, credentials, Ogilvy pedigree)
  9. `PressAndAwardsSection.tsx` (table-style press links + awards timeline)
  10. `ClosingCtaSection.tsx` (velvet dark CTA with direct phone, email, WhatsApp links)
- **Pages Built** (`src/pages/`):
  - `HomePage.tsx`
  - `AboutPage.tsx`
  - `ServiceDetailPage.tsx`
  - `WorkIndexPage.tsx`
  - `CaseDetailPage.tsx`
  - `BlogsPage.tsx`
  - `FaqPage.tsx`

---

## 3. Where We Stopped (Exact Checkpoint)

We stopped immediately after building **`src/pages/FaqPage.tsx`**.  
The project is structurally 85% complete.

---

## 4. Exactly Where and How to Resume (Step-by-Step)

When resuming, follow these exact steps in order:

### Step 1: Create `src/pages/ContactPage.tsx`
- Build the consultation inquiry form:
  - Inputs: Full Name, Email, Phone, Company, Service Select dropdown, Campaign Goals / Message.
  - Action: Form submission generates a prefilled WhatsApp link (`https://wa.me/919899707349?text=...`) and mailto fallback (`info@avancepr.in`).
  - Office Card: 5th Floor, Truworx Vatika Triangle, MG Road, Sector 28, Gurugram, Haryana 122009.
  - Phone (+91 98997 07349) and direct WhatsApp button.
  - Styled map placeholder showing the Vatika Triangle Gurugram location.

### Step 2: Assemble App Entrypoints (`src/App.tsx` and `src/main.tsx`)
- `src/App.tsx`:
  - Wrap in `HelmetProvider` for route-based metadata.
  - Setup `BrowserRouter` with routes:
    - `/` -> `<HomePage />`
    - `/about` -> `<AboutPage />`
    - `/services/:slug` -> `<ServiceDetailPage />`
    - `/work` -> `<WorkIndexPage />`
    - `/work/:slug` -> `<CaseDetailPage />`
    - `/blogs` -> `<BlogsPage />`
    - `/faq` -> `<FaqPage />`
    - `/contact` -> `<ContactPage />`
  - Include `<Navbar />`, `<Footer />`, `<CustomCursor />`, and `<GrainOverlay />`.
  - Wire `useLenis()` at the root for synchronized smooth scrolling.
  - Add page transition animations using Framer Motion `AnimatePresence mode="wait"`.
  - Add scroll-to-top on route change.
- `src/main.tsx`:
  - Mount React root at `#root` with `React.StrictMode` and import `@/styles/globals.css`.

### Step 3: Typecheck & Build Validation
- Run `npx tsc --noEmit` to verify strict TypeScript typechecking passes with zero errors.
- Run `npm run build` to verify Vite bundle compilation succeeds cleanly.

### Step 4: Browser Verification
- Launch local dev server with `npm run dev`.
- Verify in browser across viewports:
  - Desktop 1440px
  - Mobile 390px
  - Tablet 768px
- Test:
  - Three.js WebGL ripple scene rendering in Hero
  - Magnetic button hover physics
  - Lenis smooth scroll
  - Horizontal pinned scroll in Selected Work
  - Testimonial carousel controls
  - Navigation hide/reveal on scroll & mobile full-screen menu
  - Route navigation to `/about`, `/work`, `/services/startup-pr`, `/contact`, etc.

### Step 5: Lighthouse Audit & Walkthrough Capture
- Run Lighthouse on mobile build to verify: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95.
- Save walkthrough screenshots in `/research/walkthrough/`.

### Step 6: Create `README.md`
- Document project structure, technologies, local run instructions (`npm run dev`), build instructions (`npm run build`), content editing guide, and deployment notes (Vercel/Netlify).

---

## 5. Quick Verification Commands to Run Upon Resuming

```powershell
# 1. Check existing files
Get-ChildItem src\pages

# 2. Typecheck (after creating ContactPage and App)
npx tsc --noEmit

# 3. Test build
npm run build

# 4. Start local development server
npm run dev
```

*Everything is recorded, organized, clean, and ready to pick up seamlessly.*

---

## 6. Theme Unification & 3D Interactive Deck Update (October 14, 2026)

- **100% Unified Theme**:
  - Entire site unified under the signature **Velvet Obsidian (`#090807` / `bg-dark-bg`) & Champagne Gold (`#D4973B` / `text-brand-gold`)** luxury dark theme.
  - Eliminated all stark white backgrounds (`bg-light-bg`) and jarring zebra-striping across all pages (`/`, `/work`, `/about`, `/contact`, `/services/:slug`, `/work/:slug`, `/faq`, `/blogs`, `/terms-of-service`, `/privacy-policy`).
  - Standardized cards to frosted glass and deep obsidian surfaces (`bg-dark-surface`, `bg-white/5`, `border-white/10`).
- **3D Fanned Card Deck Showcase**:
  - Implemented interactive 3D fanned card deck in both **Services / Core Capabilities** and **Case Studies / Selected Work** sections with category pills, smooth arc fan geometry, and expandable details panel.
- **Verification**:
  - `npx tsc --noEmit` passing with 0 errors.
  - `npm run build` compiling production bundle in 12.98s with 0 errors.
  - Dev server active and responsive on `http://localhost:3001/`.

---

## 7. Interactive Hover-Reveal & Responsive Pill Layout Fix (October 14, 2026)

- **Hover Image Reveal Implementation**:
  - `HoverImageCaseStudyList.tsx` created and deployed for Case Studies on Homepage (`SelectedWorkSection`) and Work Archive (`WorkIndexPage`).
  - Implements floating cursor-following preview card with spring physics (`stiffness: 240, damping: 25`), dark gradient vignette, and verified client performance metrics.
- **Pill Container Distortion Fix**:
  - Resolved the distorted multiline capsule wrapping bug where `rounded-full` was applied to an outer container wrapping multi-row buttons.
  - Replaced with resilient, independent pill chips (`rounded-full`, `bg-stone-900/80`, `border-white/10`) with active brand gold state (`bg-brand-gold text-dark-bg font-extrabold shadow-[0_4px_20px_rgba(212,151,59,0.35)] scale-[1.03]`).
  - Clean, symmetrical, and fully responsive across all device viewports.
- **Verification**:
  - `npx tsc --noEmit`: 0 errors.
  - `npm run build`: 0 errors (9.78s).
