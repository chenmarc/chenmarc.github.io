#### Marc Chenard
#### Prof. Caterina Paun
#### CS563, Web Development
#### Personal portfolio site — originally built for the final project in CS563 @ Portland State University

Custom-built personal portfolio for Marc Chenard, showcasing a background in computer science, cybersecurity, AI, and interdisciplinary work in scientific and medical settings. Sections cover About, Previous Work, Education, Selected Projects, and a Contact form wired to email.

## Stack

The site was originally hand-built with vanilla HTML/CSS/JS. It's now a **React + Vite** single-page app, still fully static, still deployed for free on **GitHub Pages**, still pointed at the custom domain via the `CNAME` file — just with a build step in between.

- **[Vite](https://vite.dev)** — build tool and dev server, pinned to the **7.x line** deliberately (see note below)
- **React 19** — component structure
- **[Tailwind CSS v4](https://tailwindcss.com)** — styling, via `@tailwindcss/vite`
- **[Motion](https://motion.dev)** (the library formerly known as Framer Motion) — animation, gestures, and scroll-linked effects
- **[Kokonut UI](https://kokonutui.com)** — the magnetic button and desktop pill nav were adapted from Kokonut UI's open-source, MIT-licensed component collection; the project cards started there too but have since been substantially reworked. See "Credits" below.
- **[EmailJS](https://www.emailjs.com)** — contact form, client-side only, no backend
- **[lucide-react](https://lucide.dev)** — icons

### Why the switch from vanilla JS

The original vanilla build is preserved in git history. The move to React + Vite was a deliberate choice to use Kokonut UI's actual component source (which is React + Tailwind) rather than only taking visual inspiration from it, while keeping the deployed result exactly as static and free as before. Nothing about hosting, cost, or the custom domain changed — only what generates the HTML/CSS/JS that ships.

**Note on the Vite version:** Vite 8 defaults to a new Rust-based bundler called Rolldown, which as of this writing has an unresolved cross-platform native-binding bug ([npm/cli#4828](https://github.com/npm/cli/issues/4828), tracked in several open [rolldown issues](https://github.com/rolldown/rolldown/issues/9068)) that can make `npm install` fail depending on OS/npm version. This project is pinned to Vite 7.x (`@vitejs/plugin-react@5.x`, the Babel-based transform) to avoid it entirely. Worth revisiting once that's stable upstream — check `npm outdated` periodically.

## File Structure

```
(root)
├── .github/workflows/deploy.yml   — CI: build + deploy to GitHub Pages on push to main
├── public/
│   ├── CNAME                      — custom domain (marcchen.net)
│   └── favicon.svg
├── src/
│   ├── content.js                 — all site copy lives here; edit this, not the components
│   ├── App.jsx                    — page composition
│   ├── index.css                  — design tokens (color/type) + Tailwind import
│   ├── assets/                    — optimized headshot (WebP + JPEG fallback)
│   ├── lib/                       — small hooks: reduced-motion, scrollspy, cn() helper
│   └── components/
│       ├── layout/                — Navbar, Footer
│       ├── sections/               — Hero, About, AccordionSection, Projects, Contact
│       └── ui/                     — animation primitives (Reveal, TiltCard, SignatureWave,
│                                      MagneticButton, Accordion, SectionHeading,
│                                      ScrollProgress, CursorGlow)
├── index.html
├── vite.config.js
└── package.json
```

## Before you deploy: fill in your current role

`src/content.js` has a placeholder as the first entry in `experience` (top of the "Work Experience" list) for your current job. Open that file, find the entry with `title: 'YOUR JOB TITLE'`, and replace:

- `title` — your job title
- `company` — company name
- `paragraphs` — one or two sentences per array item describing the role (matches the style of the entries below it)
- `links` — optional; delete the array entirely or add `{ label: '...', href: '...' }` objects

## Local Development

Requires Node 18+.

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint       # oxlint
npm run smoke-test # headless render of the full component tree (jsdom),
                    # catches runtime errors and missing content that a
                    # build alone won't surface
```

The contact form works out of the box against the same EmailJS service the original site used. If you want to point it at your own EmailJS account instead, copy `.env.example` to `.env` and fill in your own service/template/public key — see that file for details.

## Deployment

Because the site now has a build step, GitHub Pages is configured to deploy via **GitHub Actions** rather than serving a branch directly:

1. In the repo's **Settings → Pages**, set "Source" to **GitHub Actions** (one-time setup).
2. Push to `main`. `.github/workflows/deploy.yml` runs `npm ci && npm run build`, then publishes the `dist/` output via `actions/deploy-pages`.
3. The custom domain keeps working automatically — `public/CNAME` is copied into `dist/` on every build, so `marcchen.net` continues to resolve to the deployed site.

No servers, no paid services, still 100% free to run.

## Design & Interaction Notes

- **Palette & type**: a warm parchment surface with cobalt-blue and rust-brown accents — a deliberate move away from a dark "hacker" aesthetic toward something closer to a trusted medical/scientific practice, which also fits Marc's actual background (medical informatics, neuroscience) better than a cybersecurity-dark-mode look ever did. Headings use Fraunces, a serif with real editorial character; body and UI text use Inter. No monospace anywhere — an earlier pass used mono/uppercase labels everywhere that read as terminal UI; labels now use tracked small caps in the same sans instead.
- **The hero centerpiece**: a custom-built `SignatureWave` — two overlapping animated SVG traces (cobalt + rust) over a faint oscilloscope grid, echoing the voice-biomarker/EEG work described in the About section rather than generic particle-dust. It draws itself in on load, then settles into a slow continuous "breathing" motion via Motion's path-morphing, full-bleed and fully bold since the name sits in its own opaque "nameplate" card in front of it rather than directly over the linework.
- **Depth/3D**: project cards pop via scale, an assertive upward lift, an escalating shadow, and a color-matched glow blooming behind the card — deliberately with **no tilt or rotation of any kind**, so the depth reads through elevation and light rather than perspective. The headshot keeps a subtle cursor-reactive 3D tilt and a soft color bloom behind the frame (that's a separate, smaller gesture from the project cards, so it stays intentional rather than looking like a stray effect).
- **Motion**: entrance animations, the hero's signature wave, an ink-style blurred-letter reveal for the name, the accordion's height animation, a top scroll-progress bar, and a cursor-following ambient glow (desktop only, multiply-blended for the light theme) are all built with Motion. Every animated component checks `prefers-reduced-motion` and either skips the animation or renders the end state directly.
- **Performance**: the headshot went from a 13MB unoptimized JPEG to a ~75KB WebP (with JPEG fallback via `<picture>`) — the single biggest performance fix available on this site. Icons are imported individually (not as a wildcard) to keep the JS bundle tree-shakeable.
- **Accessibility**: semantic landmarks, visible focus rings, `aria-expanded` on the accordion (carried over from the original), alt text on the headshot, and a keyboard-operable mobile nav drawer.

## Credits

- **Kokonut UI** (MIT license, © kokonutUI) — `AttractButton` was adapted into `MagneticButton.jsx`; the `SpotlightCards` card component was an early starting point for `TiltCard.jsx` but has since been substantially reworked into a stacked physical-card metaphor. The `MorphicNavbar` concept (a pill-shaped active-segment nav) informed the desktop nav in `Navbar.jsx`, rebuilt to track scroll position via `IntersectionObserver` instead of route matching. Source: https://github.com/kokonut-labs/kokonutui. Full license text and the exact file list: [`THIRD_PARTY_LICENSES.md`](./THIRD_PARTY_LICENSES.md).
- **Motion** (MIT license) — https://motion.dev
- **EmailJS** — contact form submission without a backend server. Docs: https://www.emailjs.com
- No other external libraries beyond what's listed in `package.json`.
- Original vanilla-JS build referenced the course Canvas page, ProgrammingKnowledge's YouTube channel, and threejs.org/freefrontend.com discussions on shape-morphing — see git history for that version.

## Live Site

- [https://marcchen.net](https://marcchen.net)
- [https://chenmarc.github.io](https://chenmarc.github.io)
