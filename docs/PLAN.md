# Portfolio Website Plan

Personal portfolio for Eli Daniel Israel Monteroso, showcasing the resume.
Deployed free on Vercel.

## Decisions made
- **Stack:** Next.js (React) + TypeScript + Tailwind CSS + Motion (animations) + Lenis (smooth scroll)
- **Style:** Apple-inspired (reference: apple.com/macbook-pro/proled-xdr-display): subtle scroll-triggered animations,
  pinned sections, parallax, big bold text, lots of whitespace. Dark theme.
  Sections fade in as they arrive; the previous section does not fade out.
  Respect "reduce motion" accessibility settings.
- **Fonts:** Unbounded for headings (name, section titles), Geist for body text.
- **Background:** tsParticles "constellation" (drifting dots + links, mouse grab) fixed behind the whole site.
- **Contact info:** email (monteroso.eli@gmail.com), LinkedIn, GitHub only. NO phone number on the page itself.
  The downloadable resume PDF (`public/Eli-Monteroso-Resume.pdf`) does include the phone number; Eli is OK with that.
- **Images:** use stylish graphics/shapes as placeholders; real photos/screenshots can be swapped in later.
- **Content:** all resume data lives in one data file so it's easy to update.

## Progress
- [x] Step 1: Tools checked. Git 2.47 installed. Node.js v26.13.0 LTS + npm 11.20.0 installed via winget.
- [x] Step 2: Created Next.js 16.4.3 project (TypeScript, Tailwind, App Router, src dir), installed motion + lenis,
      test build passed. Preview with `npm run dev` (http://localhost:3000)
- [x] Step 3: Put resume content into a single data file (`src/data/resume.ts`)
- [ ] Step 4: Build sections (each has a small label + gradient headline via `SectionHeading`, wrapped in `FadeSection`):
  1. [x] Hero: big name (Unbounded, white) shrinks/moves up on scroll, "Software Engineer" fades in
  2. [x] About ("Hi, I'm Eli."): photo pinned left (placeholder until `photo` is set in resume.ts), summary fades in on right
  3. [x] Stats strip: 3+ years, 3 companies, 9 programming languages, 1 live MMORPG (count up on view)
  4. [x] Experience ("Where I've built."): timeline that draws itself on scroll
     (Gamigo PH, Visayas State University, Bootyard Technologies part-time + intern)
  5. [x] Skills ("The toolkit."): tags float in by category
  6. [x] Projects ("Things I've made."): pinned on laptops, cards swap while scrolling (25vh per project); stacked on phones
  7. [x] Education ("Always learning."): degree, certifications, languages as glass cards
  8. [x] Contact ("Let's build something."): Download Resume, Email, LinkedIn, GitHub + footer
  9. [x] Nav bar: floating glass pill with section shortcuts, hidden over the Hero, current section highlighted;
         "Menu" dropdown on phones
- [ ] Step 5: Local preview and adjustments with Eli
- [ ] Step 6: Mobile check + test build (`npm run build`)
- [ ] Step 7: Git commit, push to GitHub (EliiDaniel), import into Vercel

## Working preferences (Eli)
- Explain every command in plain, non-technical language BEFORE running it.
- Lay out a plan first and wait for go-ahead before executing.
