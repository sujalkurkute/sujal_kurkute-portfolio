# Aarav Sharma — Portfolio (100% Free Stack)

A premium, animated, glassmorphic portfolio built with **plain HTML, CSS, and JavaScript** — no build tools, no paid services, no npm install required. Open `index.html` and it works.

## Why no React/Vite/Three.js build?
Everything in the brief (glassmorphism, gradient borders, scroll/hover animations, particle background, typing effect, 3D tilt cards, custom cursor, dark/light mode, animated counters) is implemented with **vanilla JS + CSS** so it:
- Costs $0 — no paid APIs, fonts, or icon packs
- Needs no build step — works the instant you open it
- Deploys free in one click to Vercel, Netlify, GitHub Pages, or Cloudflare Pages

If you want this rebuilt as a React/Vite/TypeScript codebase later, the structure below maps 1:1 to components (Navbar, Hero, About, Skills, Projects, Certifications, Achievements, Resume, Contact, Footer) so porting is straightforward.

## Free resources used
| Need | Free resource |
|---|---|
| Fonts | Google Fonts (Inter, JetBrains Mono) |
| Icons | Font Awesome 6 (free CDN tier) |
| Avatar/placeholder images | DiceBear avatars (free, no key) + Unsplash (free, no key) |
| Particle background | Hand-written Canvas JS (no library) |
| Contact form backend | [Formspree](https://formspree.io) free tier (50 submissions/mo) — just swap in your form ID in `script.js` |
| Hosting | Vercel / Netlify / GitHub Pages — all free for static sites |

## File structure
```
portfolio/
├── index.html        # all sections/markup
├── style.css          # design system + animations
├── script.js          # interactivity, data, particle bg, form handling
├── 404.html           # custom not-found page
└── assets/
    └── resume.pdf      # ← add your real resume here
```

## Setup (2 minutes)
1. **Add your resume:** drop a file named `resume.pdf` into `assets/`.
2. **Connect the contact form (optional, free):**
   - Go to formspree.io → create a free form → copy your form ID
   - In `script.js`, replace `YOUR_FORM_ID` in the `FORMSPREE_ENDPOINT` constant
   - Without this step the form still works in "demo mode" (shows success, doesn't send email)
3. **Swap content:** edit the data arrays in `script.js` (`skillsData`, `projectsData`, `certsData`, `achievementsData`) and the text in `index.html` (name, bio, contact links, social URLs).
4. **Replace images:** swap the DiceBear/Unsplash URLs for your real photo and project screenshots.

## Deploy for free
**Vercel**
```bash
npm i -g vercel
cd portfolio
vercel
```
**Netlify** — drag the `portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop)

**GitHub Pages**
```bash
git init && git add . && git commit -m "portfolio"
git remote add origin <your-repo-url>
git push -u origin main
# then enable Pages in repo Settings → Pages → branch: main
```

## Features included
- Glassmorphic sticky navbar with animated underline + mobile menu
- Hero with typing animation, glowing profile ring, particle canvas background
- About with timeline, animated counters, education card
- Tabbed, animated skill cards with progress bars and gradient-border hover
- Project cards with 3D tilt-on-hover, tags, and feature lists
- Filterable certification cards
- Achievements timeline
- Resume preview/download section
- Contact form with floating labels and success animation
- Dark/light mode toggle (persisted via localStorage)
- Custom cursor, scroll progress bar, back-to-top button, loading screen
- Fully responsive (mobile → ultra-wide), reduced-motion friendly, keyboard-focus visible
- Custom 404 page

## Performance notes
- No frameworks/bundlers → minimal JS payload, fast first paint
- Images use `loading="lazy"` (except hero, which is eager)
- Fonts/icons loaded from CDN with `preconnect`
- For best Lighthouse scores: compress/replace the placeholder images with optimized real photos (WebP recommended) before going live.
