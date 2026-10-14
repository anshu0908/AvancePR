# Missing & Available Assets Audit

## Assets Downloaded & Available Locally (`/public/assets/`)
- [x] **Primary Brand Logo**: `public/assets/logo.png` (Extracted from live Next.js app `Logo-modified.png`)
- [x] **Founder Photo**: `public/assets/ritika.jpeg` (Official portrait of Ritika Garg)
- [x] **Service Imagery (All 6 WebP images)**:
  - `public/assets/services/startup-pr.webp` (PR For Startups)
  - `public/assets/services/influencer-marketing.webp` (Influencer Marketing)
  - `public/assets/services/corporate-communication.webp` (Corporate Communication)
  - `public/assets/services/social-media-marketing.webp` (Social Media Management)
  - `public/assets/services/crisis-management.webp` (Crisis Management)
  - `public/assets/services/personal-branding.webp` (Personal Branding)
- [x] **Case Study Covers (All 13 case studies)**:
  - `public/assets/work/minimalist-hotel.png` (Minimalist Hotel)
  - `public/assets/work/om-logistics.png` (Om Logistics)
  - `public/assets/work/stovekraft.png` (Stovekraft)
  - `public/assets/work/hostbooks.png` (HostBooks)
  - `public/assets/work/arc-electric.png` (Arc Electric)
  - `public/assets/work/amara-ai.jpeg` (Amara.ai)
  - `public/assets/work/ayatiworks.jpeg` (Ayatiworks)
  - `public/assets/work/skills-caravan.jpeg` (Skills Caravan)
  - `public/assets/work/ramp-global.jpeg` (Ramp Global)
  - `public/assets/work/uplifters.jpeg` (Uplifters)
  - `public/assets/work/aarika.jpeg` (Aarika Innovation)
  - `public/assets/work/togopool.png` (Togopool)
  - `public/assets/work/prabhubhakti.jpeg` (Prabhubhakti)
- [x] **Client Logos (Supabase storage)**:
  - `public/assets/clients/logo1.png` through `public/assets/clients/logo7.png`

## Identified Missing / Incomplete Assets on Live Site
1. **Client Logos 8+**: The live website only uploaded 7 client logos to Supabase and looped them multiple times across their client grid.
   - *Solution*: Display the 7 real client logos alongside sleek, editorial SVG wordmarks for prominent clients (Stovekraft, HostBooks, ARC Electric, Minimalist, Om Logistics, Quantel, etc.).
2. **Press Outlet Logos**: On the live site, "We got Featured" links were plain text links with generic alt texts and no high-res publication vector logos.
   - *Solution*: Render clean, editorial SVG wordmarks for afaqs, Adgully, Reputation Today, Sugermint, Womenshine, and ET.
3. **Hero Video**: `/video/creative.mp4` is an uncompressed generic video loop.
   - *Solution*: Replaced with a signature real-time Three.js WebGL ripple field representing broadcast signal and PR amplification, with a sleek CSS gradient fallback.
