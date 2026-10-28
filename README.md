# Analytics Market Analysis · Marc Review

A scroll-driven web version of the *Marc Review – Analytics Market Analysis* deck (Oct 27, 2026).
Internal – Confidential.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Editing content

All slide text, figures and placeholders live in `src/content/`. Components never hard-code copy, so updating the deck means editing these files only.

| File | Deck slides |
|---|---|
| `navigation.ts` | Deck title, date and the six sections (tabs and divider titles) |
| `marketShift.ts` | Democratized self-service (3), Legacy BI (4), traditional personas (5) |
| `agentic.ts` | Universal self-service (7), paradigm shift (8), agentic lifecycle (9), agentic personas (10) |
| `architecture.ts` | Agentic architecture diagram and its four overlay stages (12–15) |
| `competitive.ts` | Four frontiers (20), per-frontier win/loss (21–24), Hex and Power BI comparisons (25–26), FY28 strategy (27) |
| `talent.ts` | Operating model (29), standards (30), P0 priorities (31), spec-driven development (32), reinvestment (33) |

Deck slides 16–18 (engineering allocation, headcount and tradeoffs) are intentionally not included. Speaker notes are not carried into the app.

Inline markup in text fields: `[[text]]` highlight, `[[text|positive]]` / `gold` / `violet` tones, `*italic*`, `**bold**`.

## Presenting

The app is a click-through deck of 30 slides (the source deck's 33, minus slides 16–18), each designed on a 1600×900 canvas that scales to fit the screen. Each slide plays its animated builds automatically in sequence when it opens; one click moves to the next slide. Per-slide timing lives in `pace` in `src/deck/slides.tsx`.

| Control | Action |
|---|---|
| → · Space · PageDown · swipe left | Next slide |
| ← · PageUp · swipe right | Previous slide (shown fully built) |
| Home / End | First / last slide |
| O | Overview of all slides |
| Esc | Close Overview |

Each slide's URL hash (`#slide-id`) links straight to that slide.

## Structure

- `src/deck/` deck engine: state and keys (`DeckContext`), scaling stage, top bar, Overview, `Build`/`Words` primitives, slide registry with build counts (`slides.tsx`)
- `src/slides/` one component per slide; builds are declared with `<Build at={n}>`
- `src/components/ui/` rich text, icons, Tableau mark; `src/components/motion/CountUp`

Fonts are Plus Jakarta Sans (display) and Inter (body) as stand-ins for Avant Garde Demi SFDC and Salesforce Sans; swap them in `src/index.css`.

`vite.config.ts` uses a relative `base`, so the build can be hosted from a sub-path such as GitHub Pages. No deployment is configured.
