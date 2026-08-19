# Technical Code Documentation
**Project**: Online French Edu Landing Page Redesign & Interactive System  
**Domain**: `onlinefrenchedu.ca` / `onlinefrenchedu.com`  
**Date**: August 2026  
**Copyright**: © 2026 OnlineFrenchEdu. All Rights Reserved.

---

## 1. Architecture & File Organization
- **Landing Page Template**: `landingpage.html` (Primary responsive static landing page template containing 10 full-width architectural sections).
- **Design System CSS**: `css/landingpage.css` (Custom CSS variables, emerald brand palette, 3D metallic shimmer typography, fluid gradient aura animation keyframes, glassmorphic card styles, and mobile breakpoints).
- **Interactive Micro-Interactions Script**: `js/landingpage.js` (HTML5 particle movement canvas animation, native Web Audio API chime sound generator, mobile hamburger navigation drawer controller, 3D cursor card tilt physics, scroll reveal observer, countdown clock, social proof review toasts, and FAQ accordion logic).
- **Hero Visa Image Asset**: `home/images/african_lady_visa_canada.png` (Classy African lady holding Canadian visa with Canadian logo background).
- **Target Audience Teaching Image**: `home/images/french_tutor_teaching_students.png` (Interactive live French class showing tutor teaching adult learners).
- **Booking Integration**: Calendly Inline Embed Widget & Popup Trigger Buttons (`https://calendly.com/onlinefrenchedu`).
- **Database Plan Migration**: `add_payment_plans.sql` (Inserts/updates editable 7-month and 13-month plans into `investment_plans`).

---

## 2. CSS Design Tokens & Palette (`css/landingpage.css`)
```css
:root {
  --primary-emerald: #28C76F;       /* Primary Emerald Green Brand Color */
  --emerald-dark: #1F9E56;          /* Dark Emerald Hover State */
  --emerald-light: #E8F8F0;         /* Soft Mint Highlight Tint */
  --highlight-lime: #79D709;        /* Sunburst Lime Highlight */
  --bg-white: #FFFFFF;              /* Pure White Background */
  --bg-mint: #F4F8F5;               /* Soft Mint Off-White Section Background */
  --dark-bg: #0D1117;               /* Obsidian Dark Background */
  --text-dark: #111111;             /* Primary Body Text */
  --text-muted: #444444;            /* Secondary Body Text */
  --star-gold: #FFC107;             /* Gold Star Ratings */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  --card-shadow-hover: 0 18px 40px rgba(40, 199, 111, 0.18);
}
```

---

## 3. Creative Background Movement & Canvas System
1. **Floating Fluid Gradient Aura Blobs (`.bg-aura-orb-1, .bg-aura-orb-2, .bg-aura-orb-3`)**:
   - 3 large blurred floating gradient aura elements rendering emerald green (`#28C76F`) and sunburst lime (`#79D709`) lighting effects.
   - Smooth 20s–24s organic keyframe drifting & morphing animations (`filter: blur(90px); opacity: 0.45`).
2. **HTML5 Light Particle Movement Canvas (`#bg-movement-canvas`)**:
   - Renders 48 floating glowing light particles connected by dynamic translucent green web strands.
   - Includes subtle interactive mouse spotlight glow following user cursor movements across the screen.
3. **Architectural Dot Grid Overlay (`.bg-grid-overlay`)**:
   - Radial dot matrix grid layer (`background-size: 34px 34px; opacity: 0.50`).
4. **Glassmorphism Backdrop Cards**:
   - Cards (`.hero-desc-card`, `.feature-card`, `.testimonial-card`, `.snapshot-card-white`, `.faq-card`) utilize `background: rgba(255, 255, 255, 0.88)` and `backdrop-filter: blur(12px)` for crystal-clear readability while allowing background motion to pass through.
5. **Captivating Section Entrance Transition & Scroll Progress System**:
   - **Top Scroll Progress Indicator Bar (`.scroll-progress-bar`)**: Real-time gradient progress bar pinned to the top viewport (`0%` to `100%`).
   - **Directional Reveal Animations**: `.reveal-fade-up` (upward slide), `.reveal-fade-down` (downward slide), `.reveal-slide-left` (left slide), `.reveal-slide-right` (right slide), `.reveal-zoom` (pop scale).
   - **Staggered Grid Child Cascades (`.stagger-children`)**: Cascades entry delays (`0.08s` to `0.58s`) for grid cards.
   - **Banner Shimmer Glow (`.section-banner`)**: Animated emerald & lime glow pulse when entering viewport.
6. **Page Load Speed & Core Web Vitals Optimization System**:
   - **Resource Hints**: DNS prefetching & preconnect hints (`fonts.googleapis.com`, `cdnjs.cloudflare.com`, `images.unsplash.com`).
   - **Hero Image Preloading**: `<link rel="preload" as="image">` with `fetchpriority="high"` for instant Largest Contentful Paint (LCP).
   - **Lazy Loading & Layout Shift Prevention**: Native `loading="lazy"`, `decoding="async"`, and explicit `width`/`height` dimensions on all below-the-fold images to prevent CLS.
   - **Non-Blocking CSS & JS**: Asynchronous FontAwesome CSS loading and deferred JS execution (`defer` on `landingpage.js`).
   - **Below-the-fold Rendering Optimization**: `content-visibility: auto; contain-intrinsic-size: 1px 600px;` in CSS to skip rendering offscreen DOM subtrees until scrolled into view.

---

## 4. Direct Registration Routing & External Links Matrix
- **A1.1 Level Registration**: [`https://onlinefrenchedu.ca/classes/a1-level/levels`](https://onlinefrenchedu.ca/classes/a1-level/levels)
- **A2.1 Level Registration**: [`https://onlinefrenchedu.ca/classes/a2-level/levels`](https://onlinefrenchedu.ca/classes/a2-level/levels)
- **B1.1 Level Registration**: [`https://onlinefrenchedu.ca/classes/b1-level/levels`](https://onlinefrenchedu.ca/classes/b1-level/levels)
- **B2.1 Level Registration**: [`https://onlinefrenchedu.ca/classes/b2-level/levels`](https://onlinefrenchedu.ca/classes/b2-level/levels)
- **About Us Navbar Link**: [`https://onlinefrenchedu.ca/about-us`](https://onlinefrenchedu.ca/about-us)

---

## 5. Web Audio API Chime Sound Generator
Integrated in `js/landingpage.js` to play pleasant audio feedback whenever a social proof review notification toast appears:
```javascript
// Dual-tone chime: E6 (1318.51 Hz) -> B6 (1975.53 Hz) with exponential decay
playNotificationChime();
```
*Built with passive user interaction listeners (`click`, `touchstart`, `scroll`, `keydown`) for full browser autoplay policy compliance.*

---

## 6. Key Landing Page Sections Breakdown
1. **Top Announcement Bar & Capsule Navbar**: `.navbar` - Sticky floating capsule header with mobile hamburger drawer toggle (`#mobile-menu-toggle`), direct link to `about-us`, and Calendly booking popup trigger.
2. **Split 2-Column Hero Section**: `.hero-section` - Headline line-wrapping, white elevated subtext card, 2x2 grid CTAs (**A1.1, A2.1, B1.1, B2.1** linked to direct registration URLs), and studio tutor showcase card with floating CRS badges.
3. **Why Learn French**: `.why-learn-section` - 3 milestone cards highlighting +50 CRS points, Express Entry category draws, and PNP nomination boosts.
4. **Why Choose OnlineFrenchEdu**: `.why-choose-grid` - 6-card bento grid with 3D cursor tilt physics and image hover zoom.
5. **5% OFF Promotional Offer Banner**: `.promo-section` - High-energy conversion zone featuring 3D liquid chrome typography (`5% OFF`), glowing amber fast-selling badge, dynamic striated neon urgency meter (`⚡ 17 of 20 Early Seats Taken — Only 3 Left`), African student celebratory photo, electric glowing CTA button, and floating Canadian microchip badges.
6. **Registration & Level Selector Grid**: `#levels` - 4 level cards (**A1.1 Beginner, A2.1 Elementary, B1.1 Intermediate, B2.1 Upper-Intermediate**) with **$119.99 / month** price badges and direct links to their respective live registration endpoints.
7. **Program Snapshot**: `.snapshot-content-block` - 2 snapshot format cards (**Beginner's Class Format** & **A1.1 > A2.1 > B1.1 > B2.1 Format**) with circular pill metadata (Date, Time, Duration, Location).
8. **Calendly Consultation Booking Widget**: `#booking` - Integrated inline Calendly widget (`data-url="https://calendly.com/onlinefrenchedu"`).
9. **Testimonials**: `.testimonials-section` - 3 student review cards with 5-star gold ratings.
10. **Target Audience Section**: `.perfect-section` - Dark section detailing key audience criteria alongside tutor headshot.
11. **FAQs Accordion**: `.faq-section` - Expandable 2x2 interactive accordion grid with smooth collapse/expand transitions and rotating chevron arrow indicators.
12. **Reach & Get In Touch**: `.contact-section` - Live support card, WhatsApp direct link, phone, email, social links, back-to-top button, and `Copyright 2026 OnlineFrenchEdu All Rights Reserved` footer bar.

---

## 7. Responsive Breakpoints
- **Desktop (>= 992px)**: Multi-column grid layouts and 3D cursor tilt physics.
- **Tablet (< 992px)**: 2-column containers collapse into clean single-column layouts.
- **Mobile (< 768px)**: Animated mobile menu drawer toggle, fluid hero title flow without line breaks, and centered 5% OFF banner card.
- **Small Mobile (< 480px)**: Fluid `clamp()` typography and 2x2 snapshot circle grid.

---

## 8. Backend Database Migration (`add_payment_plans.sql`)
Run the following SQL query on cPanel MySQL database to insert/update payment plans:
```sql
INSERT INTO `investment_plans` (`id`, `name`, `maturity`, `minimum_investment`, `maximum_investment`, `profit`, `interest`, `visibility`, `principal_return`, `created_at`, `updated_at`)
VALUES 
(1, '7-Month Intensive French Plan', '7 Months', 150.00, 1500.00, 0.00, '0%', 'visible', 1, NOW(), NOW()),
(2, '13-Month Comprehensive French Plan', '13 Months', 250.00, 2500.00, 0.00, '0%', 'visible', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
`name` = VALUES(`name`),
`maturity` = VALUES(`maturity`),
`minimum_investment` = VALUES(`minimum_investment`),
`maximum_investment` = VALUES(`maximum_investment`),
`visibility` = 'visible',
`updated_at` = NOW();
```
