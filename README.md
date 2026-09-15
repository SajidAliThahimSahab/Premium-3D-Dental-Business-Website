# AURA DENTAL — Premium 3D Dental Business Website

An individual Week 2 portfolio project: a fully interactive, 5-page dental
practice website built with React, Vite, Tailwind CSS, and a React Three
Fiber 3D canvas.

## Tech stack

- **Build tool:** Vite 5 + React 18
- **Styling:** Tailwind CSS 3 (custom navy/cyan design tokens)
- **3D:** three.js via `@react-three/fiber` + `@react-three/drei`
- **Animation:** Framer Motion
- **Routing:** React Router DOM v6
- **Forms:** React Hook Form + Zod schema validation
- **Icons:** lucide-react

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/
│   ├── common/     Navbar, Footer, Button, Modal, SectionHeading
│   ├── 3d/         Hero canvas, anatomy explorer, lighting rig, WebGL fallback
│   ├── ui/         Cards, carousel, accordion, sliders, timeline
│   └── booking/    Multi-step appointment booking form
├── pages/          Home, About, Services, Gallery, Contact, NotFound
├── data/           Mock services, doctors, testimonials, gallery content
├── hooks/          useViewport, useScrollReveal
└── utils/          Zod booking schema + reference ID generator
```

## Pages

1. **Home (`/`)** — 3D hero canvas, animated stats, feature showcase,
   service preview grid, before/after teaser, testimonial carousel,
   newsletter signup.
2. **About (`/about`)** — clinic story, technology breakdown, doctor
   profile cards, achievements timeline.
3. **Services (`/services`)** — filterable treatment grid, detail modal
   with step-by-step breakdown and pricing, FAQ accordion.
4. **Gallery (`/gallery`)** — filterable before/after sliders, lightbox
   preview, clickable 3D dental anatomy explorer, video testimonial cards.
5. **Contact (`/contact`)** — multi-step booking form (React Hook Form +
   Zod), live open/closed status, emergency helpline CTA, map preview.

## Notes on the 3D assets

This build uses procedurally generated Three.js geometry (distorted
sphere + torus) for the hero and anatomy explorer instead of shipping
external `.glb` model files, so the project runs with zero binary
assets. Swap in your own DRACO-compressed `.glb` models under
`public/models/` and load them with `@react-three/drei`'s `useGLTF` if
you want photoreal geometry.

## Deployment

A `vercel.json` SPA rewrite is included so client-side routes resolve
correctly on refresh. Push to a GitHub repo and import it into Vercel;
no environment variables are required since the app has no backend.

## Design tokens

| Token | Value |
| --- | --- |
| Background | `#020617` |
| Surface | `#0F172A` / `#1E293B` |
| Accent (cyan) | `#06B6D4` / `#22D3EE` |
| Accent (mint) | `#10B981` |
| Light surface | `#F8FAFC` |
| Display font | Plus Jakarta Sans |
| Body font | Inter |
