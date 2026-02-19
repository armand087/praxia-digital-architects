
## PRAXIA | Inteligencia Aplicada — Corporate Website Plan

### Overview
A high-trust, minimal corporate website in Spanish targeting B2B decision-makers. The goal is to generate qualified leads and convert them into booked strategy calls. All content will be in Spanish as specified.

---

### Pages & Structure

**1. Homepage (`/`)**
A single, vertically-scrolling page with 7 sections:
- **Hero** — Full-viewport section with headline, subheadline, and two CTAs ("Agendar Diagnóstico Estratégico" and "Ver Cómo Trabajamos"). Subtle animated gradient background with data-grid aesthetic.
- **Problema** — Dark-background section listing pain points in bold, punchy format with visual emphasis on each problem statement.
- **Solución** — Clean icon + text grid showcasing the 6 core capabilities with subtle hover effects.
- **Metodología** — Numbered step process (1→5) with smooth animated reveal on scroll, showing the 5-phase methodology.
- **Servicios** — Card grid with 5 service cards. Each card expands or links to a dedicated service section showing: description, expected result, and ideal company type.
- **Diferenciador** — High-contrast section with a bold positioning statement and supporting text.
- **Casos & Resultados** — Placeholder section with 3 "before/after" metric cards (clearly marked as demo/placeholder) and a sectors grid.
- **CTA Final** — Full-width dark section with headline and calendar booking button.

**2. Metodología Page (`/metodologia`)**
Deep-dive into the 5 phases with detailed descriptions, visual timeline, and embedded CTA.

**3. Servicios Page (`/servicios`)**
Expanded service pages (or a single page with anchors) for each of the 5 services, with full descriptions, expected outcomes, and ideal client profiles.

**4. Contacto Page (`/contacto`)**
Lead capture form with all 6 fields: Nombre, Empresa, Teléfono, Correo, Facturación mensual (dropdown range), Principal problema actual (textarea). On submit → redirect to Thank You page.

**5. Thank You Page (`/gracias`)**
Confirmation message + embedded Calendly or calendar booking placeholder for a strategy call.

**6. Blog/Recursos Page (`/recursos`)** *(placeholder, ready for content)*
Grid of article cards. Empty state with "Próximamente" messaging.

---

### Design System

- **Color palette**: Near-black (`#0A0A0A`), pure white, deep blue (`#1E3A8A` range), with subtle blue→black gradients
- **Typography**: Inter or Geist — strong weight hierarchy (bold headlines, regular body)
- **UI elements**: Thin borders, subtle grid overlays, data-table inspired visual accents
- **Animations**: Fade-in on scroll (section reveals), smooth hover states on cards and buttons, gradient shimmer on hero
- **Layout**: Maximum width container, generous whitespace, institutional feel

---

### Key Interactive Features

1. **ROI Diagnostic Calculator** *(Gold Standard Feature #1)*
   An interactive widget on the homepage (or its own section) where visitors input team size, current tools, and monthly revenue to receive a personalized "operational cost of disorder" estimate. Fully frontend, no backend required.

2. **Dashboard Demo Preview** *(Gold Standard Feature #2)*
   A visual mockup section using charts (Recharts, already installed) simulating what a real client dashboard looks like post-implementation. Includes fake KPI cards and a sample chart — clearly labeled as a demo.

---

### Lead Capture & Forms
- Contact form with client-side validation (Zod + React Hook Form, already available)
- Dropdown for revenue ranges (e.g., $50K–$150K MXN, $150K–$500K MXN, $500K+)
- Textarea for free-form problem description
- Toast notification on successful submission
- Redirect to `/gracias` after submit

---

### SEO
- All pages will include proper meta titles and descriptions in Spanish
- Primary keywords embedded naturally in headings and body copy
- Semantic HTML structure (h1, h2, h3 hierarchy)
- Open Graph tags for social sharing

---

### Navigation
- Top navbar: Logo + links (Inicio, Metodología, Servicios, Recursos, Contacto) + "Agendar Diagnóstico" CTA button
- Mobile: hamburger menu with slide-out drawer
- Footer: Logo, tagline, nav links, social placeholders, legal text

---

### No Backend Required
This is a fully frontend implementation. The contact form will store submissions locally (or display a success message) — if lead management is needed later, Supabase can be connected as a follow-up.

---

### Roles (Clarification)
Since this is a static frontend site, roles (Admin, Content Manager) would be part of a future CMS integration. For now, content is hardcoded and easily editable via Lovable's Visual Edit feature.
