# Avance PR — Brand & Technical Audit (Phase 0)

**Date**: October 2026  
**Subject**: Live Site Audit of [avancepr.in](https://www.avancepr.in)  
**Role**: Creative Developer & Art Director  

---

## 1. Executive Summary

Avance PR is an agile, high-performing strategic communications and PR agency located in Gurugram, India, serving prominent clients across technology, logistics, EV, e-commerce, and venture-backed startups (including Stovekraft, HostBooks, Arc Electric, Om Logistics, Amara.ai, and Ramp Global). Founded by Ritika Garg (Ogilvy alumna, ET 40 Under 40, ET Women Leaders Awards 2025), the agency commands exceptional client testimonials and authentic case study outcomes.

However, the existing web presence suffers from:
- A generic Next.js template layout with system font stacks (`ui-sans-serif, system-ui`).
- Cluttered, run-on hero copy that buries the agency's real punchline (*"Advance your relations"*).
- Competing, repetitive CTA buttons (*"Get Free PR Strategy Consultation"* and *"Send Request"*).
- Duplicated testimonials inside an unstyled carousel loop.
- Generic image tiles for case studies that fail to convey the prestige of their campaigns.
- An uncompressed 1080p background hero video that slows mobile LCP.

The pitch-quality rebuild retains 100% of the authentic client quotes, case studies, press mentions, and brand DNA while transforming the site into an ultra-premium, editorial-grade digital experience.

---

## 2. Live Brand System & Extracted Palette

Sampled directly from the live DOM, computed CSS styles, and brand assets:

| Token | Computed Hex | Usage on Live Site | Redesign Elevation Role |
| :--- | :--- | :--- | :--- |
| **Brand Primary Gold** | `#A16207` | Headings (h2), CTA Buttons, Service titles | **Luminous Champagne Gold** (`#D4973B` / `#C88A2D`): Refined Tuscan gold that glows cleanly without muddiness on modern displays |
| **Deep Bronze Accent** | `#713F12` | Darker headings, sub-headings | **Rich Antique Bronze** (`#854D0E` / `#5C330A`): Used for gradient depths and borders |
| **Light Gold Tint** | `#FEF9C3` / `#FEFCE8` | Highlight badges, card backgrounds | **Subtle Gold Glow** (`rgba(212, 151, 59, 0.08)`): Sophisticated glassmorphism badges and highlights |
| **Bright Gold Accent** | `#FDE047` / `#FF9F00` | Footer copyright highlights | **Signal Highlight** (`#EAB308`): Subtle interactive hover accent |
| **Rich Obsidian Dark** | `#0C0A09` | Body text, dark cards, footer | **Velvet Obsidian** (`#090807` / `#0C0A09`): Deep editorial dark surface for hero and closing CTA |
| **Alabaster Off-White** | `#FAFAF9` | Primary light section backgrounds | **Warm Alabaster** (`#FAF9F6`): Editorial paper-feel light surface |
| **Warm Border Neutral** | `#E7E5E4` / `#D1D5DB` | Card outlines, dividers | **Bespoke Hairline Rule** (`rgba(28, 25, 23, 0.08)` and `rgba(255, 255, 255, 0.12)`) |
| **Muted Stone Text** | `#78716C` / `#6B7280` | Subtitles, meta tags, timestamps | **Editorial Tertiary** (`#78716C` on light, `#A8A29E` on dark) |

---

## 3. Typography & Styling Audit

### Current Live Typography
- **Headlines & Body**: Computed style is `font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...` (Default browser fallback).
- **Hierarchy Issue**: The home page `h1` was set to a 20px header label ("Avance PR"), while the main hero visual used an unstyled 48px heading, creating an inverted visual hierarchy.

### Elevated Editorial Font Pairing
- **Headings & Display**: **Plus Jakarta Sans** (Weights 600, 700, 800) paired with an optional editorial serif accent **Playfair Display** / **Cormorant Garamond** for editorial quotes and prestige moments.
- **Body & Captions**: **Inter** / **Plus Jakarta Sans** (Weights 400, 500) with generous line heights (`1.65 - 1.7`) and letter-spacing tracking (`-0.02em` on headlines, `+0.05em` on uppercase eyebrows).

### Corner Radius & Structural Habits
- **Buttons**: Currently `12px` and `6px`. We unify this to a luxury magnetic pill (`9999px`) for primary actions and refined `8px-12px` rounded corners for media cards.
- **Card Containers**: Unified `16px` border-radius with crisp 1px borders and subtle tonal backgrounds.

---

## 4. Imagery & Media Treatment

- **Logo**: Stylized geometric dimensional prism in warm gold and deep amber.
- **Founder Portrait**: Professional studio headshot of Ritika Garg (`public/assets/ritika.jpeg`). Rebuilt with subtle parallax depth, grain overlay, and an architectural split-screen layout.
- **Service Imagery**: 6 WebP editorial photos representing startup meetings, corporate communications, and digital influence.
- **Client & Case Study Covers**: 13 real high-res assets stored on Supabase and downloaded locally to `/public/assets/work/`.

---

## 5. Content Audit & Verifications

### Testimonials (100% Real Quotes, Verified)
1. **Biswajit Mishra** (Co-Founder, Hostbooks)
2. **Amit Kumar** (Co-Founder & CEO, Ramp Global)
3. **Swayam Agarwal** (Founder, Aarika Innovation)
4. **Lucky Rohilla** (Founder & CEO, Quantel)
5. **Samast Ahlawat** (Founder & CEO, Prabhubhakti)
6. **Pawan Matade** (Founder, DeMatade Trading Solutions)
7. **Abhinav Kalia** (Founder, ARC Electric)
8. **Major Prashant Veer Singh** (Mentor, ARC Electric)
*(All duplicates removed; presented as an immersive editorial slider with drag, touch, and progress bars)*.

### Case Studies (13 Real Client Campaigns, Verified)
- Minimalist Hotel, Om Logistics, Stovekraft, HostBooks, Arc Electric, Amara.ai, Ayatiworks, Skills Caravan, Ramp Global, Uplifters, Aarika, Togopool, Prabhubhakti.
*(All campaign overviews, strategies, approaches, and measurable outcomes parsed from live pages)*.

### Press & Honors (100% Real Links & Outlets)
- Press coverage in **afaqs!**, **Adgully**, **Reputation Today**, **Womenshine**, **Sugermint**, and **LinkedIn**.
- Accolades: Economic Times 40 Under 40, ET Women Leaders Award 2025, Clarissa Awards Leading PR Agency, Wonder Women 2025, Young Entrepreneur Award (Her Zindagi).

---

## 6. What to Keep vs. What to Elevate

| Element | Live Status | Elevated Redesign Strategy |
| :--- | :--- | :--- |
| **Brand Tagline** | Buried in meta directories | Elevate to primary Hero statement: **"Advance your relations."** |
| **Hero Media** | 1080p uncompressed video | Interactive Three.js WebGL concentric signal ripple field (with zero-JS CSS gradient fallback) |
| **Headline Structure** | One long run-on sentence | Crisp split-text line reveal: 1 confident headline + 1 crisp subline |
| **CTA Strategy** | Two competing buttons | One magnetic primary CTA ("Book a free strategy call") + 1 secondary ("See our work") |
| **Stats** | Single stat hidden in bio | Prominent animated stats band: 100+ Brands, 13 Featured Cases, 5 National Honors |
| **Services** | 6 static image cards | Interactive full-width editorial list with cursor-following image reveal on hover |
| **Work Showcase** | Plain static thumbnail grid | Pinned horizontal kinetic scroll on desktop with shared-element transition to case details |
| **Testimonials** | Broken carousel with duplicates | Large-type editorial quote suite with founder photos and smooth transitions |
| **Founder Bio** | Standard two-column card | Editorial profile with Ogilvy pedigree, timeline credentials, and signature quote |
| **Contact** | Basic form without feedback | Interactive booking inquiry form + instant prefilled WhatsApp & mailto dispatch |
| **Accessibility / SEO** | Mailto mismatch, generic alt tags | Normalized contact info, JSON-LD Schema (`Organization`, `ProfessionalService`), WCAG AAA contrast |
