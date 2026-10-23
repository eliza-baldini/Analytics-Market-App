# Analytics Market Analysis · Marc Review

A scroll-driven web version of the *Marc Review – Analytics Market Analysis* deck (Oct 27, 2026).
Internal – Confidential.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Editing content

All text, figures, placeholders and speaker notes live in `src/content/`. Components never hard-code copy, so updating the deck means editing these files only.

| File | Slides |
|---|---|
| `navigation.ts` | Title, date, chapter and section labels and order (1) |
| `shift.ts` | Legacy BI, Tableau Democratized Data, Next Market Moment (2–4), Persona evolution (6) |
| `vision.ts` | Agentic Data Foundation (5), Agentic lifecycle, Durable Loop, Hex & Tableau blueprint (7–9) |
| `landscape.ts` | Market landscape and its notes, split per camp (10) |
| `competitors.ts` | Sigma, Hex, Power BI profiles, deals and notes (11–16) |
| `capabilities.ts` | Capability scores (0–4), evidence and per-row rationale (17) |
| `buildBuy.ts` | Build-or-buy ranges, lean and notes (18) |

Inline markup in text fields: `[[text]]` highlight, `[[text|positive]]` / `gold` / `violet` tones, `*italic*`, `**bold**`.

Deals: every deal is currently a `placeholderDeal(...)` and renders dimmed. To add a real deal, replace an entry with a full `Deal` object (status, statusLabel, context, account, accountType, amount, oppLabel, detailLabel, details); it renders at full strength.

## Structure

- `src/sections/` one component per section of the page
- `src/components/motion/` reveal, stagger, scroll-linked words, count-up, smooth scroll
- `src/components/notes/` Details toggle state and the speaker-notes drawer
- `src/components/layout/` top bar, dot rail, chapter intros, headings, footer

Fonts are Plus Jakarta Sans (display) and Inter (body) as stand-ins for Avant Garde Demi SFDC and Salesforce Sans; swap them in `src/index.css`.

`vite.config.ts` uses a relative `base`, so the build can be hosted from a sub-path such as GitHub Pages. No deployment is configured.
