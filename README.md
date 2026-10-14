# Avance PR — Premium Rebuild & Strategic Communications Platform

> Pitch-quality digital experience for **Avance PR** (`avancepr.in`), India’s leading strategic communications and public relations firm based in Truworx Vatika Triangle, Sector 28, Gurugram. Founded by Ogilvy alumna and ET 40 Under 40 honoree **Ritika Garg**.

---

## 1. Overview & Creative Direction

This rebuild elevates Avance PR from a standard corporate site into a high-end editorial digital flagship that mirrors the caliber of top-tier global agencies (Ogilvy, Edelman, Pentagram).

### Visual Identity & Palette
- **Brand Champagne Gold (`#D4973B`)**: Radiant accent elevated for modern OLED and Retina displays.
- **Antique Bronze (`#854D0E`)**: Subtle secondary accent for borders, badges, and active indicators.
- **Velvet Obsidian (`#090807`)**: Deep dark surface for hero immersion, closing calls-to-action, and luxury work showcases.
- **Alabaster Off-White (`#FAF9F6`)**: Editorial paper tone for alternating high-contrast reading sections.

### Typography
- **Headings & Display**: `Plus Jakarta Sans` (weights 600, 700, 800) with fluid clamp scales and tight tracking (`-0.035em`).
- **Editorial Pull Quotes**: `Playfair Display` (italic & regular) for journalistic authority.
- **Body & Captions**: `Inter` and `Plus Jakarta Sans` (weights 400, 500, relaxed line-height `1.65 – 1.75`).

### Signature 3D Element
- **Broadcast Wave Field**: Custom WebGL ripple particle field in Three.js and React Three Fiber with damped mouse attraction, vertex oscillation, and scroll recession. (Graceful CSS glow fallback on mobile and reduced-motion environments).

---

## 2. Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode, 100% type-safe)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + Custom Design Tokens + PostCSS
- **3D & Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scroll**: [@studio-freight/lenis](https://github.com/darkroomengineering/lenis) (synchronized to GSAP ticker)
- **Animations**: [GSAP](https://gsap.com/) (ScrollTrigger) + [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO & Metadata**: [React Helmet Async](https://github.com/staylor/react-helmet-async)

---

## 3. Project Structure

```
AvancePR/
├── public/
│   └── assets/             # Real logos, founder portrait, client marks, and case study visuals
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar (sticky hide/reveal, mobile overlay), Footer
│   │   ├── sections/       # Hero, IntroScrub, StatsBand, Services, Work, Clients, Testimonials, etc.
│   │   ├── three/          # SignalWavesCanvas, SignalWavesScene (GLSL shader), SignalWavesFallback
│   │   └── ui/             # CustomCursor, MagneticButton, SectionHeading, Badge
│   ├── data/               # 100% authentic typed datasets: services, work, press, testimonials, faqs
│   ├── hooks/              # useLenis, useReducedMotion, useMediaQuery
│   ├── lib/                # gsap registration, motion presets
│   ├── pages/              # HomePage, AboutPage, ServiceDetailPage, WorkIndexPage, CaseDetailPage, BlogsPage, FaqPage, ContactPage
│   ├── styles/             # globals.css (film grain overlay, typography imports, tokens)
│   ├── App.tsx             # Root router, Lenis init, smooth page transitions, scroll-to-top
│   └── main.tsx            # DOM root entrypoint
├── index.html              # Meta tags, favicons, semantic markup, a11y skip links
├── package.json            # Scripts & dependencies
├── tailwind.config.js      # Palette tokens, animations, custom typography
├── tsconfig.json           # Strict TypeScript configuration
└── vite.config.ts          # Build optimization & vendor chunking
```

---

## 4. Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Development Server
```bash
npm install
npm run dev
```
The site runs locally at **`http://localhost:3001`** (or `http://localhost:3000`).

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in `/dist` with custom code splitting:
- `three-vendor.js`: Three.js and 3D shaders
- `animation-vendor.js`: GSAP, Framer Motion, Lenis
- `react-vendor.js`: React, React DOM, Router, Helmet
- `index.js`: Application logic & page bundles

### Preview Production Build
```bash
npm run preview
```

---

## 5. Site Routes

| Route | Page | Key Highlights |
|---|---|---|
| `/` | **Home** | Three.js ripple wave hero, scrub manifesto, live stats, stacked services with cursor preview, pinned horizontal case scroll, dual client marquee, verified testimonials, founder pedigree, press & awards |
| `/about` | **About** | Agency narrative, Ogilvy roots, core values, leadership bio, award accolades |
| `/services/:slug` | **Service Detail** | Deep-dive deliverables, strategic approach, related case studies for all 6 services |
| `/work` | **Work Index** | Category-filtered showcase of all 13 real client case studies |
| `/work/:slug` | **Case Detail** | Objectives, strategy, execution, and outcomes for individual campaigns (HostBooks, Stovekraft, Zypp, etc.) |
| `/blogs` | **Insights** | Thought leadership perspectives with modal reader and category tags |
| `/faq` | **FAQ** | Interactive animated accordion answering common PR and mandate questions |
| `/contact` | **Contact** | Interactive inquiry consultation form, instant prefilled WhatsApp dispatch, mailto fallback, Gurugram office card & map preview |
| `/privacy-policy` | **Privacy Policy** | DPDP Act 2023 & GDPR compliant data protection charter, journalist relations ethics, grievance officer details |
| `/terms-of-service` | **Terms of Service** | Master service agreement, commercial retainer terms, editorial independence disclaimers, Gurugram jurisdiction |

---

## 6. Content Management & Updating Data

All content is structured as typed TypeScript modules inside `src/data/`:

- **Services**: `src/data/services.ts` — Add or edit service offerings, deliverables, and approaches.
- **Case Studies**: `src/data/work.ts` — Add client campaigns with objectives, strategies, outcomes, and tags.
- **Testimonials**: `src/data/testimonials.ts` — Verified client endorsements and titles.
- **Press & Awards**: `src/data/press.ts` & `src/data/awards.ts` — Media features and honors.
- **FAQs**: `src/data/faq.ts` — Answers to common client inquiries.
- **Contact Info & Address**: `src/data/site.ts` — Phone, email, WhatsApp, address, social links.

---

## 7. Deployment

### Vercel / Netlify
Deploy with build command `npm run build` and output directory `dist`.
For SPA client-side routing on Netlify, add a `_redirects` file in `public/`:
```
/*    /index.html   200
```
Or on Vercel (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

*Engineered with precision for Avance PR.*
