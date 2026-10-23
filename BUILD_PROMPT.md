# Build Prompt · Analytics Market Analysis web app

How to recreate the scroll-driven web version of the **"Marc Review – Analytics Market Analysis"** Google Slides deck (dated October 27, 2026), exactly as built in `eliza-baldini/Analytics-Market-App`.

> **Content policy for this document.** The source deck is marked *Internal – Confidential*. This file describes structure, design, motion and architecture only. It deliberately does **not** reproduce slide figures, capability scores, timeline ranges, speaker-note text, customer deal details or internal links. Every one of those must be transcribed **verbatim from the original, authorized deck** by whoever builds the app. All deal cards ship as placeholders (see [§2.4](#24-deal-slides-placeholder-policy)).

**Contents**

1. [Original objective](#1-original-objective)
2. [Content mapping (slide → section)](#2-content-mapping-slide--section)
3. [Design specifications](#3-design-specifications)
4. [Animations and interactions](#4-animations-and-interactions)
5. [Application architecture](#5-application-architecture)
6. [Implementation instructions](#6-implementation-instructions)
7. [Master build prompt](#7-master-build-prompt)

---

## 1. Original objective

Turn one specific 18-slide Google Slides deck into a **polished, executive-ready interactive website** for Marc and the BLT. It should feel like a premium product website, not a slideshow or a dashboard.

Guiding requirements, as agreed with the deck owner:

- **One continuous vertical scroll.** Each slide's content appears as you scroll, with items fading and sliding into view. The style reference was a scroll-told brief (`jrstiefeling.github.io/tableau-mcp-laulima`): frosted top bar, dot navigation on the right, fade-and-rise reveals.
- **Reimagine, don't replicate.** The deck is the source of content and narrative, not a layout template. Vary section layouts so it never feels like stacked slides.
- **Preserve messaging exactly.** Keep every title, label and figure as written, in the original slide order and narrative.
- **Show slide content only.** No extra callouts or commentary. The speaker notes go behind an unobtrusive **Details** toggle so readers can go deeper on demand.
- **Scroll-connected motion.** Pin key diagrams. Reveal progressively, with subtle stagger. Motion should be smooth and purposeful, never showy. Prioritize visual fidelity and polish over adding features.
- **Placeholders stay placeholders.** Unfinished slide content is rendered as-is, dimmed, and never filled with invented data.
- **Easy to update.** All text, data, notes and placeholders live in editable content files, so deck updates never require redesigning components.
- **Desktop first, mobile compatible.** Optimize for laptop and desktop, and still work on a phone.
- **Stack:** React, Vite, Tailwind CSS and Motion, deployable to GitHub Pages.

---

## 2. Content mapping (slide → section)

Get the deck with the Google Slides connector: `read_presentation` for text and speaker notes, and `read_slide_page_thumbnail` for renders. Text that sits inside grouped shapes (`elementGroup.children`, up to three levels deep) must be walked as well. Some slides contain **off-canvas draft text boxes**, such as rough working notes on slides 3 and 4, that are not visible on the rendered slide. **Do not** put those in the app; use the thumbnails to tell visible text from drafts.

### 2.1 Page order

The page has an opening hero plus four chapters. Chapter names are navigation labels created for the web version; they are not deck text.

| # | Page section (`id`) | Slide | Chapter |
|---|---|---|---|
| — | Opening hero (`top`) | 1 | — |
| — | Chapter intro **01 The Shift** (`shift`) | — | 01 |
| 1 | Legacy BI (`legacy-bi`) | 2 | 01 |
| 2 | Tableau Democratized Data (`democratized`) | 3 | 01 |
| 3 | The Next Market Moment (`market-moment`) | 4 | 01 |
| — | Chapter intro **02 The Vision** (`vision`), dark | — | 02 |
| 4 | Agentic Data Foundation (`foundation`) | 5 | 02 |
| 5 | Persona Evolution (`personas`) | 6 | 02 |
| 6 | Agentic Lifecycle (`lifecycle`) | 7 | 02 |
| 7 | The Durable Loop (`durable-loop`) | 8 | 02 |
| 8 | Architectural Blueprint (`blueprint`) | 9 | 02 |
| — | Chapter intro **03 The Market** (`market`) | — | 03 |
| 9 | Market Landscape (`landscape`) | 10 | 03 |
| 10 | Sigma: profile and deals (`sigma`) | 11–12 | 03 |
| 11 | Hex: profile and deals (`hex`) | 13–14 | 03 |
| 12 | Power BI: profile and deals (`power-bi`) | 15–16 | 03 |
| — | Chapter intro **04 Closing the Gap** (`gap`) | — | 04 |
| 13 | Capability Comparison (`capabilities`) | 17 | 04 |
| 14 | Build or Buy (`build-or-buy`) | 18 | 04 |
| — | Footer | — | — |

**Narrative arc**

1. **The Shift:** legacy BI is a linear dead end, Tableau democratized data once, and the GenAI moment is here but demands trust.
2. **The Vision:** the agentic data foundation, the new personas, the agentic lifecycle, the durable loop, and a Hex + Tableau architecture.
3. **The Market:** the fragmented landscape, then a deep dive into each of the three competitors with its deals.
4. **Closing the Gap:** the capability comparison, then the build-or-buy plan.

### 2.2 Per-slide mapping

For every section, copy the titles, labels, lists and figures **verbatim** from the slide named. Speaker notes go only into the Details drawer.

**Slide 1, Opening hero**
- Deck title, split for the web into eyebrow "Marc Review" and display title "Analytics Market Analysis", plus the date.
- The deck's title art, recreated in code: three rounded bars (light blue, cyan, light blue), a white circular badge with the Tableau mark, and four-point sparkles.
- Tableau wordmark lockup, then "from Salesforce".
- "Scroll to explore" cue with an animated mouse indicator.

**Slide 2, Legacy BI: *Analytics as a Linear Process***
- **Left panel** (royal blue, sticky on desktop): title, with the italic part as on the slide, plus the statement. The statement's highlighted phrases are rendered in cyan.
- **Right column:** three numbered stage cards: **Data Prep & Ingestion** (Data Engineer), **Dashboard Authoring** (Data Analyst), **Report Consumption** (Business User), each with its bullet list.
- A dashed return arrow that ends in a red ✕.
- The "one-way dead end" callout, with **one-way dead end** in bold.
- Speaker notes: none.

**Slide 3, Tableau Democratized Data**
- Title and subtitle.
- Two era cards joined by an arrow:
  - **Pre-2003 Traditional Reporting:** muted glass card, with the "IT-led…" lead line (bold lead word) and two items.
  - **2003+ Self-Service Analytics:** white card with a violet gradient header, the "User-driven…" lead line (bold lead word), three items, and a highlighted tagline ending in an italic *everyone*.
- Italic line "Creating a global movement of data professionals".
- Four count-up stats, with the **DataFam** wordmark in the centre (recreated as italic gradient text, rotated −6°). Copy the figures from the slide.
- Speaker notes: yes. The deck has the **same** notes on slides 3 and 4; attach them to both sections.

**Slide 4, The Next Market Moment is Here**
- Title and subtitle.
- **Card A:** the "GenAI has unlocked…" statement, with its final phrase highlighted in royal blue.
- **Card B:** "But the future of analytics demands trust at scale", plus five pillar chips: Governance, Security, Accuracy, Persistence, Cost.
- Speaker notes: the same as slide 3.

**Slide 5, The Tableau *Agentic* Data Foundation**
- Title, with "Agentic" in cyan.
- A five-layer isometric stack, top to bottom: **Experiences, Tableau Knowledge, Data Modelling, Data, Hyperforce**, each with its one-line description from the slide.
- Speaker notes: none.

**Slide 6, Core Persona Evolution: Dashboard Creators to Agentic Builders**
- Title and subtitle.
- **Then panel** (Legacy BI, white): three persona cards: Data Engineer, Data Analyst, Business User.
- **Now panel** (Agentic Era, navy): two persona cards: Context Engineer, Builder & Active Consumer.
- Each card's description comes from the slide.
- Closing statement: "Transforming static dashboard creators into context engineers…".
- Speaker notes: none.

**Slide 7, Building the Agentic Analytics Lifecycle**
- Title, and a statement whose highlighted phrases are in cyan.
- An infinity diagram:
  - **Left loop:** Self-Service Loop (*Agility at the Edge*), labelled **Check-Out & Return**, with persona tag "Persona: Builder/Active Consumer".
  - **Right loop:** Operational Loop (*Enterprise Governance*), labelled **Merge & Certify**, with persona tag "Persona: Context Engineer".
  - **Centre orb:** RELAY (*Lifecycle Engine*).
- Under the diagram, "Foundational Platform Engines": Data, Knowledge, Decision and Action Engine.
- Speaker notes: none.

**Slide 8, Building the Durable Loop for Agentic Data Apps**
- Title, and a statement whose highlighted words are in royal blue.
- A four-step ring, each step with its role and description:
  1. Input (Business User)
  2. Pro-Code Authoring & Evals (Developer)
  3. Data Apps & Warehouse Writeback (App Builder)
  4. Distribution & Context (Business User)
- Speaker notes: none.

**Slide 9, Architectural Blueprint: Hex & Tableau**
- Title and subtitle.
- Three lanes:
  - **Analytical Path** (*Hex Engine*): three items.
  - **Zero-Copy Warehouse Bridge** (*Data Lakes*): two items.
  - **Governance & Enterprise Path** (*Tableau / Salesforce*): three items.
- Each item has an icon, a bold title with a colon, and a description.
- Connectors, as drawn on the slide:
  - Analytical lane → Zero-Copy Write-back
  - Shared storage → Single Metric Contract
  - Write-back → Identity & Activation
  - Write-back → Enterprise Distribution
- Two-line summary banner. Its coloured keywords are **Hex** and **lake** in gold, and **Data 360** and **Tableau Semantics** in violet.
- Speaker notes: none.

**Slide 10, The Fragmentation of the BI&A Market Landscape**
- Title and subtitle.
- Five camp panels, each with header colour, name, tagline, thesis and vendor stacks:
  1. **Lakehouses**, header `#1C3FD1`: Databricks and Snowflake.
  2. **Frontier Labs**, header `#5B21B6`: Anthropic.
  3. **AI-Native Startups**, header `#0B7A6C`: Sigma and Hex.
  4. **Full-Stack**, header `#0A1E5C`: Microsoft Power BI + Fabric.
  5. **Tableau**, header `#0176D3`: the "home" panel, with a highlighted ring.
- Each vendor stack is three layers. The top layer is "primary": white, with a title and detail line. Lower layers are smaller chips.
- Speaker notes: yes. **Split them**: a general block (source and framing) plus one block per camp. Assign each camp the note sentences about it, verbatim.
- ⚠ The landscape notes include a claim the notes themselves say must not be quoted or attributed. Keep notes behind Details, and decide with the deck owner whether to include that sentence at all.

**Slides 11 / 13 / 15, Sigma / Hex / Power BI profiles (identical template)**
- Big competitor name, "Competitor 0X / 03", and the one-line thesis.
- Three headline figures in one white strip, each with label, value (count-up) and caption. Phrases shown in green on the slide are rendered in the `won` green.
- Three cards:
  - **Go-To-Market:** bullets.
  - **Strengths & Weaknesses:** a green "Strengths" sub-label and a red "Weaknesses" sub-label, each with bullets.
  - **Innovation Bets:** a bold lead-in label (underlined on the slide) followed by text.
- Power BI's figure tiles are Fabric and customer numbers, not revenue and valuation, exactly as on the slide.
- Speaker notes: the Hex profile (slide 13) and the Power BI profile (slide 15) have notes; Sigma has none. Split long notes into readable blocks. You may add short block headings for readability, but keep the text verbatim. ⚠ These notes include unpublished internal figures and internal-source references, so treat them as sensitive.

**Slides 12 / 14 / 16, Sigma / Hex / PBI Deals:** see [§2.4](#24-deal-slides-placeholder-policy).

**Slide 17, Market Capability Comparison**
- Title and subtitle.
- A table with columns **Capability | Tableau | Hex | Sigma | Power BI | Evidence**, in four groups:
  - **Go-to-market:** Installed base and reach · Pricing and packaging · Data and AI platform partnerships.
  - **Agentic analytics:** Visual analytics / dashboards · MCP and workplace surfaces · Conversational analytics · AI apps and actions · Spreadsheet-native UI.
  - **Semantics and metrics:** Native semantic / metrics layer · Knowledge, context, and observability.
  - **Data platform:** Data source connectivity · In-memory engine · Governance and security · Lakehouse integration · Write-back and input tables.
- Scores are harvey balls on a 0–4 scale: None, Basic, Partial, Strong, Leading.
- **Read every score from a high-resolution render of the slide** (`WIDTH2000_PX` thumbnail). Some rows' scores exist only as graphics.
- Copy the evidence text per row.
- Speaker notes: yes. **Split them per row**: each "…row (a/b/c/d): …" paragraph belongs to that row, and the "Evals detail" paragraph also belongs to the Knowledge row. Methodology sentences and the rationale-doc link go into a general "Methodology" block.
- ⚠ Notes reference internal battlecards and an internal Google Doc. Include the link only if the audience has access.

**Slide 18, Catching Up: Build or Buy**
- Title.
- Columns: **Capability gap | Months to parity (estimate range) | Initial lean**.
- Five gap rows, each with a leader line, a **build** range bar (white) and a **buy or partner** range bar (cyan) on a 0–6–12–18–24 month axis, and an initial-lean pill.
- Legend: "Build to parity" / "Buy or partner, to integrated parity".
- Keep the slide's disclaimer word for word.
- Speaker notes: yes, in one block. Copy ranges and leans from the slide.

**Footer:** Tableau mark, title, "Marc Review · date", a "Back to top ↑" button, and the "Internal – Confidential" label.

### 2.3 Speaker-notes fidelity rules

- Copy notes **verbatim**. Do not summarise, reword or "fix" grammar.
- Notes appear **only** in the Details drawer. Never show them inline.
- When notes are long and clearly cover several elements (landscape camps, capability rows, profile topics), split them into blocks and attach each to its element, still verbatim.
- Slides with no notes get **no** Details tag.
- Ask the deck owner whether sensitive notes belong in a shared build (see [§6, step 10](#6-implementation-instructions)).

### 2.4 Deal slides: placeholder policy

Slides 12, 14 and 16 (Sigma, Hex and PBI Deals) each show three cards: **Won**, **Lost** and **At Risk**. Some versions of the deck contain real customer names, opportunity amounts, renewal details and account strategy. **The published app renders all nine cards as placeholders.** Do not transcribe real deal data.

Each placeholder card contains:

| Field | Value |
|---|---|
| Status label | Won / Lost / At Risk |
| Context label | Short label from the slide's template (e.g. "Full displacement", "xyz deployment", "Upcoming renewal") |
| Account | `Account Name` |
| Account type | `account type` (only where the slide's template shows that line) |
| Amount | `oppty amount` |
| Opportunity | `org 62 oppty` |
| Detail label | Winning Factor / Primary Loss Reason / Current Exposure and Threat |
| Details | `deal details` |

The cards are dimmed to 45% opacity. Use a `placeholderDeal(status, statusLabel, context, detailLabel, accountType?)` helper so a real deal can be swapped in later, if it's ever authorized, without touching components.

---

## 3. Design specifications

### 3.1 Colour tokens

These are Tailwind v4 `@theme` tokens in `src/index.css`. The palette is derived from the deck's theme.

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#000F33` | Dark sections, footer, chapter 02 intro |
| `navy-900` | `#001E5B` | Primary ink, Now panel, table group bands, active chapter pill |
| `navy-800` | `#002775` | — |
| `navy-700` | `#0B2F86` | — |
| `royal` | `#022AC0` | Legacy BI panel, blueprint banner, accents on light surfaces |
| `royal-600` | `#0A3BE0` | — |
| `cyan` | `#00B3FF` | Highlights on dark, progress, toggle-on, lit states |
| `cyan-soft` | `#90D0FE` | Hero bars, gradients |
| `sky` | `#EAF5FE` | Hover fills, column wash |
| `paper` | `#F5F9FF` | Page background |
| `link` | `#066AFE` | Links |
| `teal` | `#04E1CB` | Theme accent (reserved) |
| `gold` | `#FCC003` | Blueprint banner keywords |
| `pink` | `#FF538A` | Theme accent (reserved) |
| `violet` | `#D17DFE` | Blueprint banner keywords |
| `won` | `#2E9E4F` | Won, strengths, green captions |
| `lost` | `#E5372B` | Lost, weaknesses, dead-end ✕ |
| `risk` | `#F08C00` | At Risk |
| `ink` | `#001E5B` | Body ink |
| `ink-soft` | `#4A5B82` | Secondary text |
| `ink-faint` | `#8A97B5` | Tertiary text |
| `line` | `#DBE6F6` | Hairlines and rings |

**Section-specific colours**

- **Hero:** base `#0418A8`, with radial glows `#0B4BF0` (top right) and `#0016A0` (bottom left), a blurred cyan ellipse rising from the bottom, and a faint 72px grid masked to the centre.
- **Democratized and Market Moment:** one canvas with a vertical gradient `#0418A8 → #0A2FD0 → #0418A8`.
- **Self-Service era header:** gradient `#7C3AED → #5B21B6`, with lead and tagline strips in `#EDE9FE`.
- **Landscape camp headers:** see slide 10 above.
- **Foundation slabs:**
  - top-face gradient `#4C86FF → #2457E6`;
  - lit top face `#7CC4FF → #2F7BFF`, with a stroke of `#BFE6FF`;
  - left face `#1D48C9`, right face `#163AA6`;
  - unlit top stroke `rgba(255,255,255,.28)`;
  - a cyan glow behind the lit slab.

### 3.2 Typography

- **Display:** *Plus Jakarta Sans Variable*, weight 700, letter-spacing −0.035em, line-height 1.02 (`.display` class).
- **Body:** *Inter Variable*, with font features `cv11`, `ss01` and `ss03`, antialiased.
- Both fonts are self-hosted through `@fontsource-variable/*`. They stand in for the deck's **Avant Garde Demi SFDC** (headings) and **Salesforce Sans** (body), which are licensed Salesforce fonts and must not be hosted publicly. Swap them in `@theme` if licensed web fonts become available.
- **Eyebrow** (`.eyebrow`): 0.72rem, weight 600, tracking 0.18em, uppercase. Royal on light surfaces, cyan on dark.

**Type scale (fluid `clamp`)**

| Element | Size |
|---|---|
| Hero title | `clamp(3.4rem, 8.4vw, 7.6rem)`, line-height 0.95 |
| Chapter title | `clamp(3.2rem, 9vw, 8.5rem)` |
| Chapter background numeral | `clamp(10rem, 30vw, 28rem)` at 4–5% opacity |
| Section title, large | `clamp(2.1rem, 4.2vw, 3.6rem)`, max 22ch |
| Section title, medium (pinned sections) | `clamp(1.9rem, 3.1vw, 2.9rem)`, max 30ch |
| Section title, extra large | `clamp(2.6rem, 5.6vw, 5rem)` |
| Subtitle | `clamp(1.05rem, 1.4vw, 1.3rem)`, relaxed line-height, max 60ch, `text-pretty` |
| Competitor name | `clamp(3.4rem, 7vw, 6.4rem)` |
| KPI value | `clamp(2.6rem, 4.4vw, 4rem)` |

Titles use `text-balance`. Numbers use tabular figures (`.tabular`).

### 3.3 Spacing, surfaces and components

- **Content width:** max 1240px, with horizontal padding `px-6` (mobile) and `sm:px-10`.
- **Section padding:** typically `py-28` (mobile) and `lg:py-40`, which gives generous whitespace.
- **Cards** (`.card`): white, radius 1.5rem (24px), shadow `0 1px 2px rgb(0 30 91/.04), 0 12px 32px -12px rgb(0 30 91/.12)`. Larger panels use radius 28–40px.
- **Glass** (`.glass`): 72% white, `backdrop-filter: blur(18px) saturate(1.4)`.
- **Grain** (`.grain`): an SVG fractal-noise overlay at 6% opacity with `mix-blend-mode: overlay`, used on royal and blue panels.
- **Dark section edges:** 48px rounded corners where dark blocks meet the paper background:
  - chapter 02 intro: `rounded-t`;
  - Foundation: `rounded-b`;
  - Democratized + Market Moment wrapper: all corners;
  - Lifecycle: all corners;
  - Build or Buy: `rounded-t`.
- **Hairlines:** 1px in `line`. Highlight bars on card titles are 4px gradient pills, cyan to royal.
- **Selection:** cyan at 30% opacity. **Focus ring:** 2px cyan with a 3px offset.

### 3.4 Navigation chrome

**Top bar**
- A fixed, floating pill, 56px tall and max 1240px wide, 12–16px from the top.
- **Left:** Tableau mark, the title, and "Marc Review · date" (date shown at `xl` and up).
- **Centre:** the four chapter links, prefixed `01`–`04`. The active link gets a sliding pill (Motion `layoutId`): navy on light surfaces, white on dark.
- **Right:** the Details switch.
- A 1px scroll-progress line along the bottom edge (spring-smoothed).
- **Adapts to its background:** it checks for an element marked `data-surface="dark"` under the point (viewport centre, y = 32). Over dark surfaces it becomes translucent white on dark; over light, it uses the glass style.

**Dot rail**
- Fixed at the right edge, vertically centred, desktop only (`lg`).
- One dot per section (15 in total).
- The active dot stretches from 6px into a 22px pill: royal on light, cyan on dark. It samples the surface under its own x/y.
- Hovering a dot shows its label.

**Competitor dock**
- In the Market chapter, a glass pill fixed at bottom-centre shows **Sigma · Hex · Power BI**, with the active one in royal (`layoutId` pill).
- Clicking an item scrolls to that competitor. The dock is hidden outside the competitor sections.

**Anchors:** chapter and section links smooth-scroll, and the URL hash updates.

**Footer:** dark navy, with a "Back to top" button.

---

## 4. Animations and interactions

### 4.1 Motion primitives

- **Easing:** `easeOutExpo = cubic-bezier(0.16, 1, 0.3, 1)` everywhere.
- **`Reveal`:** fades and lifts content (opacity 0→1, y 28→0, optional x offset and blur) the first time it enters view. Default duration 1s, `amount` 0.35, runs once.
- **`Stagger` / `StaggerItem`:** a parent with `staggerChildren` set (default 0.08s). Each child goes y 24→0 over 0.9s.
- **`SectionHeading`:** reveals line by line: eyebrow, then title (+0.06s), then subtitle (+0.14s), each over 1.1s.
- **`ScrollWords`:** a scroll-scrubbed word reveal. Each word's opacity goes from a `dim` value (0.14–0.28) to 1 across its share of the progress. It either tracks its own position (`start 0.85` → `end 0.45`) or follows a progress value passed in by a pinned parent. Highlighted words keep their tone.
- **`CountUp`:** when 60% visible, animates the numeric part of a formatted figure (formats like "$NNM+", "~$NNNM" or "NNN,NNN") over 1.6s, keeping prefixes, suffixes, separators and decimals.
- **Smooth scroll:** Lenis with `lerp: 0.18` and `wheelMultiplier: 1`, so it stays responsive. Programmatic `scrollTo` takes 1.6s. Lenis is disabled under `prefers-reduced-motion`.
- **Reduced motion:** a global CSS rule drops animation and transition durations to near zero.
- **Pinned sections** wrap a tall `<section>` around a `sticky top-0 h-screen` stage. `useScroll({ target, offset: ['start start', 'end end'] })` produces 0–1 progress, which `useTransform` maps to visual properties. Use `justify-center-safe` / `items-center-safe` so tall content never clips at the top.
- **Responsive rule:** under 1024px (`useIsDesktop`), each pinned section renders a simpler stacked layout with `Reveal` and `Stagger` instead of scrubbing.

### 4.2 Section by section (desktop)

**Hero (150vh wrapper, sticky stage)**
- **On load:**
  - wordmark fades in (0.1s);
  - eyebrow rises (0.25s);
  - each title word slides up from a clipping mask (1.2s, staggered 0.1s, starting at 0.35s);
  - date fades in (0.9s);
  - the bars grow from their bases (staggered 0.5, 0.62 and 0.74s);
  - the badge springs in with a rotation (1.2s);
  - sparkles twinkle in a loop.
- **On scroll:**
  - the whole hero scales 1→0.9 and its corners round 0→44px, so it recedes into a floating card;
  - the content moves up 18% and fades out by 60% progress;
  - the art lifts 80px and the bars stretch 12%;
  - the cyan glow drifts.

**Chapter intro (78vh)**
- Scroll-linked: the giant background numeral parallaxes from 30% to −30%.
- The title slides in from x 6% and fades in and out.
- A hairline draws under the title, and the chapter's section names are listed beneath it.

**Legacy BI (slide 2)**
- The royal statement panel stays sticky on the left.
- Its statement lights up word by word over the first 30% of the section's scroll.
- On the right, a vertical rail fills (royal to cyan, scaleY) as you scroll past the three numbered stage cards. Each card reveals, and its bullets stagger in.
- Then the dashed return path draws itself, via a mask on `pathLength`, and the red ✕ springs in.
- The dead-end callout reveals last.

**Democratized Data (slide 3)**
- The two era cards slide in from opposite sides.
- A connector line draws between them, scroll-scrubbed, and the arrow fades in.
- The Self-Service card lifts 24px into place, its items stagger in, and its tagline rises in last.
- The movement line reveals, then the stats stagger in and count up, with DataFam in the centre.

**Next Market Moment (slide 4, pinned, 240vh)**
- **0.02–0.36:** card A's statement lights up word by word.
- **0.36–0.52:** card B slides in from x 80 and fades in, while card A dims to 72%.
- **From 0.52:** each of the five pillar chips appears 0.07 apart, rising 14px, with a brief cyan ring that settles to 35%.

**Agentic Data Foundation (slide 5, pinned, 260vh)**
- **Layout:** title on the left, the SVG isometric stack in the centre (capped at 72vh), and the layer list on the right.
- **Build-up:** layers drop in 70px from above, bottom-up (Hyperforce first). Each arrival takes 0.11 of progress, with arrivals 0.13 apart.
- **Active layer:** the newest arrival is the "active" layer. Its slab lights up (brighter top face, light stroke, cyan glow), and its list item gets a cyan left border and full opacity. Not-yet-arrived items sit at 18% opacity.
- **Hover:** hovering a list item lights its slab.

**Persona Evolution (slide 6, pinned, 230vh)**
- **0.14–0.30:** the arrow fades in.
- **0.18–0.48:** the arrow rotates from −90° to 0°, and the Now panel slides in from x 140.
- **0.28–0.50:** the Then panel dims to 62% and scales to 0.97.
- **From 0.36:** the Now persona cards light up in turn with a cyan ring.
- **0.56–0.90:** the closing statement fills in word by word.
- **Short viewports:** if the pinned composition is taller than the viewport, it glides up during 0.48–0.60 so the statement fits.

**Agentic Lifecycle (slide 7, pinned, 240vh; dark)**
- **Loop drawing:** the left loop draws via `pathLength` (0.04–0.30), then the right loop (0.18–0.44). Each loop has a gradient stroke over a faint track plus a blurred glow layer.
- **Labels:**
  - the loop titles fade in on their own schedule (left at 0.14–0.26, right at 0.30–0.42);
  - each has a cyan "Persona:" tag;
  - the in-loop labels read Check-Out & Return and Merge & Certify.
- **RELAY orb:** scales 0.6→1 (0.36–0.50), with a pulsing ring on a loop.
- **Pulses:** white dots travel continuously around both loops (SVG `animateMotion`, 3.6s, offset by 1.8s).
- **Hover:** hovering a loop highlights it and dims the other to 35%.
- **Engines:** the four tiles rise in (0.52–0.66), all at equal height. Each one's bottom cyan line lights up in turn.
- **Sizing:** the diagram's width is capped by viewport height, at `min(100%, 40vh × 1.875)`, so everything fits on shorter laptops.

**Durable Loop (slide 8, pinned, 300vh)**
- **Ring:** a gradient progress ring draws 0→100% between 0.05 and 0.90, mapped directly with no spring.
- **Step nodes:** nodes 1–4 sit at 12, 3, 6 and 9 o'clock. The active node scales to 1.12 and fills royal; completed nodes stay filled.
- **Detail text:** the left column cross-fades the active step's role, title and description (0.28s, with a blur-in).
- **Step list:** a four-segment progress list underneath. Clicking a segment or a node scrolls to that step.
- **Sizing:** the ring is capped at `min(560px, 66vh)`.

**Architectural Blueprint (slide 9)**
- The three lanes reveal one after another, 0.12s apart.
- **Connectors:**
  - SVG cubic curves run from lane edge to lane edge, at the height of the linked item, and end in arrowheads;
  - they draw in via `pathLength` (1.4s, staggered);
  - a cyan dash flows along each continuously.
- **Measuring:** connector positions use `offsetLeft` and `offsetTop` chains, not `getBoundingClientRect`, so reveal transforms don't skew them. A `ResizeObserver` re-measures on resize.
- **Hover:** hovering an item highlights it, its connectors and the items they connect to. Everything else dims to 40%, and connectors to 15%.
- **Summary banner:** a royal panel whose two lines light up word by word.

**Market Landscape (slide 10, pinned horizontal scroll)**
- **Height:** the section is `100vh + track overflow` tall, measured with a `ResizeObserver`.
- **Track:** vertical scroll (0.04–0.96) translates the track horizontally. The track holds the heading column, then the five 360–380px camp panels.
- **Progress bar:** a thin bar sits under the track.
- **Panels:** each panel reveals once at 20% visibility. Its vendor layers inherit that trigger through variants and build bottom-up (0.1s apart). Child triggers are avoided because they can stay hidden inside a horizontal track.
- **Sizing:** panels size to their content; headers and bodies have `shrink-0`.
- **Home panel:** the Tableau panel gets a 2px `#0176D3` ring and a blue glow.

**Competitor profiles (slides 11, 13, 15)**
- The identity row reveals.
- The figures strip staggers in and counts up.
- The three analysis cards stagger in.
- The deals row staggers in. Deal cards lift 4px on hover (spring).

**Capability Comparison (slide 17)**
- **Fill-in:** harvey balls sweep in when fully visible, as a quarter-step pie drawn by a thick stroke on a half-radius circle. Each column is delayed 0.14s and each row 0.04s, so columns fill left to right.
- **Row hover:** tints the row and darkens its evidence text.
- **Column hover:** hovering a vendor header washes that column in `sky` and dims the other vendors' balls to 30%. The Tableau column carries a constant 50% wash.
- **Group bands:** navy, with white uppercase labels.
- **Narrow screens:** the table scrolls horizontally (min width 860px).

**Build or Buy (slide 18; dark)**
- **Rows:** each row has its own scroll trigger (`start 0.95` → `start 0.65`), mapped directly with no spring.
- **Bars:** the buy bar (cyan) grows from its left edge first, then the build bar (white). Range labels fade in near the end.
- **Text:** row text fades from 20% to full.
- **Grid:** dashed gridlines at every axis tick.
- **Lean pills:** `inline-block` with a 16px radius, so multi-line labels wrap cleanly.

### 4.3 Details toggle (speaker notes)

- **The switch:** "Details" plus a 38×22px switch in the top bar. It's off by default, and its state is saved in `localStorage` (`ama:details`).
- **When on:** small **"Details"** tags appear (scale and fade in) wherever notes exist:
  - beside the section headings for Democratized, Market Moment, Landscape, Capabilities and Build or Buy;
  - beside the Hex and Power BI names;
  - in each landscape camp header.
- **Capability rows:** rows with a rationale become clickable and show an inline "Details" chip.
- **Opening notes:** clicking a tag or row opens a **right-hand drawer**.
  - It springs in from the right as a 28px-radius white panel, max 520px wide, over a 25% navy scrim.
  - The drawer shows "Speaker notes · Slide N", the element title, then the blocks, each with an optional heading, verbatim paragraphs and an optional link.
  - Blocks stagger in.
- **Closing:** the drawer closes with Esc, a click on the scrim, or the ✕. Turning Details off also closes it.
- **Capability row drawers** show "Scoring rationale" followed by the general Methodology block.

**Details hint popup**
- **Trigger:** once per browser session (`sessionStorage`), after the reader scrolls past 60% of the first viewport.
- **Look:** a navy callout drops in under the Details switch, with a pointer notch. The switch pulses with a cyan ring.
- **Copy:** eyebrow "Go deeper", then exactly: *"Turn on to see the research and sources behind each section. Expand from the Details tags."*
- **Buttons:**
  - **Turn on Details** (cyan) switches Details on and closes the popup;
  - **Got it** just closes it.
- When Details is already on, only "Got it" shows.

---

## 5. Application architecture

### 5.1 Stack (as built)

| Package | Version | Purpose |
|---|---|---|
| React / React DOM | 19 | UI |
| TypeScript | ~7.0 | Strict typing (`verbatimModuleSyntax`, `erasableSyntaxOnly`, no unused locals or params) |
| Vite | 8 | Dev server and build. `base: './'` so the build works from a sub-path. |
| Tailwind CSS | 4, via `@tailwindcss/vite` | Styling. Tokens live in `@theme` in `index.css`; no config file. |
| `motion` | 14 (`motion/react`) | Reveals, scroll-linked transforms, layout pills, springs |
| `lenis` | 1.3 | Smooth inertial scrolling |
| `@fontsource-variable/inter`, `@fontsource-variable/plus-jakarta-sans` | 5 | Self-hosted fonts |
| `oxlint` | — | Lint |

### 5.2 Folder structure

```
analytics-market-app/
├─ .github/workflows/deploy.yml     # GitHub Pages: build on push to main, deploy dist/
├─ index.html                       # title, robots noindex, favicon
├─ public/favicon.svg               # royal rounded square with a white plus
├─ vite.config.ts                   # react() + tailwindcss(), base './'
├─ README.md                        # content-editing guide
└─ src/
   ├─ main.tsx · App.tsx            # App = providers + page order
   ├─ index.css                     # @theme tokens, base, .display/.eyebrow/.glass/.card/.grain, reduced motion
   ├─ content/                      # ALL copy, data, notes, placeholders
   │  ├─ types.ts                   # Rich, NoteBlock, Notes, SectionMeta
   │  ├─ navigation.ts              # meta (eyebrow/title/date/confidentiality), hero, chapters → sections (id, navLabel, slides)
   │  ├─ shift.ts                   # legacyBI (2), democratized (3), marketMoment (4), personas (6), shared notes for 3–4
   │  ├─ vision.ts                  # foundation (5), lifecycle (7), durableLoop (8), blueprint (9: columns, flows, summary)
   │  ├─ landscape.ts               # camps (10) with per-camp notes + generalNotes
   │  ├─ competitors.ts             # Sigma/Hex/Power BI profiles (11/13/15) + deals (12/14/16) via placeholderDeal()
   │  ├─ capabilities.ts            # vendors, legend, groups → rows {scores, evidence, notes[]} (17)
   │  └─ buildBuy.ts                # rows {gap, leaders, build[], buy[], lean}, axis, legend, disclaimer, notes (18)
   ├─ sections/                     # one component per page section
   │  ├─ Hero · LegacyBI · Democratized · MarketMoment · Foundation · Personas
   │  ├─ Lifecycle · DurableLoop · Blueprint · Landscape · Competitors
   │  └─ CapabilityMatrix · BuildOrBuy
   ├─ components/
   │  ├─ layout/   TopBar · SectionRail · ChapterIntro · SectionHeading · Footer
   │  ├─ motion/   Reveal (+ Stagger, StaggerItem, easeOutExpo) · ScrollWords · CountUp · SmoothScroll (+ useScrollTo)
   │  ├─ notes/    NotesContext (+ useNotes) · NotesButton · NotesDrawer · DetailsHint (+ useDetailsHint)
   │  └─ ui/       RichText (+ parseRich) · HarveyBall · Icon (blueprint line icons) · TableauMark (simplified plus mark)
   └─ hooks/       useActiveSection · useMediaQuery (+ useIsDesktop ≥1024px) · useSurfaceAt (useDarkSurfaceAt)
```

### 5.3 Content model rules

- **Components never hard-code copy.** Every string comes from `src/content/*`.
- **Rich text markup** (parsed by `RichText` and `ScrollWords`):
  - `[[text]]` is a highlight. Cyan by default, and each surface can override it with an `accentClass`, such as royal on light.
  - `[[text|positive|gold|violet]]` sets a named tone.
  - `*italic*` and `**bold**`.
- **Notes types:** `Notes = { source: 'Slide N', blocks: NoteBlock[] }` and `NoteBlock = { heading?, paragraphs[], link? }`.
- **Shared notes:** when two slides share identical notes, define one constant and reference it from both.
- **Deals:** `Deal` has `placeholder?: true`, which dims the card. `accountType` is optional.
- **App composition:**
  - `SmoothScroll`, then `NotesProvider`, then `TopBar`, `SectionRail`, `<main>` with the sections in order, `Footer` and `NotesDrawer`;
  - the active section comes from `useActiveSection(allSectionIds)`, a scroll listener with a 0.4 viewport line;
  - the active chapter comes from the chapter-intro ids;
  - Democratized and Market Moment share one wrapper `<div data-surface="dark" class="grain rounded-[48px] …gradient">`.

---

## 6. Implementation instructions

Each step is something a Claude Code session can do. Verify in the browser after every few steps.

1. **Read the deck.**
   - Use `read_presentation` with a targeted field mask: slide object IDs, text runs in shapes and nested `elementGroup.children`, tables, and notes-page text.
   - If the output is large it gets saved to a file; dump it per slide with a small Node script.
   - Get `LARGE` thumbnails of every slide, plus `WIDTH2000_PX` for slide 17.
   - Read the theme colour scheme from `masters.pageProperties.colorScheme.colors`.
   - Note which text boxes are visible on the renders.
2. **Scaffold.**
   - Run `npm create vite@latest . -- --template react-ts --no-interactive`.
   - Then `npm i motion lenis @fontsource-variable/inter @fontsource-variable/plus-jakarta-sans` and `npm i -D tailwindcss @tailwindcss/vite`.
   - Delete the template assets.
   - Set `base: './'` in `vite.config.ts`, and add `<meta name="robots" content="noindex, nofollow">` to `index.html`.
3. **Design tokens.** Write `src/index.css` with the `@theme` block from [§3.1](#31-colour-tokens)–[§3.2](#32-typography), the base styles, the component classes and the reduced-motion rule.
4. **Content files.** Create `src/content/*` per [§5.3](#53-content-model-rules). Transcribe every slide's text and figures **verbatim** from the deck, and the speaker notes **verbatim**, split as described in [§2.2](#22-per-slide-mapping). Render the deal slides with `placeholderDeal(...)` ([§2.4](#24-deal-slides-placeholder-policy)).
5. **Primitives.** Build `Reveal`/`Stagger`, `ScrollWords`, `CountUp`, `SmoothScroll`, `RichText`, `HarveyBall`, `Icon`, `TableauMark`, and the hooks.
6. **Chrome.** Build `TopBar` (with chapter pill, progress line, `DetailsToggle` and its pulse), `SectionRail`, `ChapterIntro`, `SectionHeading`, `Footer`, `NotesContext`, `NotesButton`, `NotesDrawer` and `DetailsHint`.
7. **Sections, in page order.** Build them as specified in [§4.2](#42-section-by-section-desktop). Each pinned section also needs a non-pinned mobile fallback.
8. **Verify** at three sizes: 1280×720 (short laptop), 1440×900, and 375×812 (mobile). For each:
   - **Pinned sections:** nothing should clip under the top bar.
   - **Landscape:** every camp header and every layer should render.
   - **Overflow:** there should be no horizontal overflow.
   - **Console:** no errors.
   - **Details:** the tags open the correct notes.
   - **Hint:** the popup appears after the opening.

   Note that a hidden preview tab may throttle animation frames. Force a frame by taking a screenshot before you judge a reveal.
9. **Build and lint:** run `npm run build` and `npm run lint` (only fast-refresh hints are expected).
10. **Confidentiality check (required before any publishing).**
    - Search the repo for customer names, opportunity amounts, internal sources, internal links, and phrases like "not to be quoted".
    - Confirm that all deals are placeholders.
    - Get explicit approval from the deck owner for anything that will be public.
    - A personal GitHub Pages site is **public even when the repo is private**. Only GitHub Enterprise Cloud can restrict access.
11. **Deploy (optional).**
    - Add `.github/workflows/deploy.yml`: on push to `main`, check out, set up Node 24 with an npm cache, run `npm ci` and `npm run build`, then `actions/upload-pages-artifact@v3` (`dist`) and `actions/deploy-pages@v4`.
    - Set Pages → Source to **GitHub Actions** *before* the first push.
    - Project URLs are case-sensitive and match the repo name.
    - Viewers who had the site open within about 10 minutes of a deploy may need a hard refresh (Cmd+Shift+R). Otherwise their cached `index.html` asks for the previous, now-deleted script and the page renders blank.

**Optional improvements (not implemented)**
- Swap in licensed brand fonts.
- Route-level code splitting (the JS bundle is about 160 KB gzipped).
- Restricted hosting for confidential content.
- A print or PDF view.

---

## 7. Master build prompt

Paste the following into a new Claude Code session in an empty folder. Give the session access to the same Google Slides deck through the Google Slides connector.

````text
Build a premium, scroll-driven web app from my Google Slides deck
"Marc Review – Analytics Market Analysis" (October 27, 2026):
<PASTE THE DECK URL HERE>

Follow BUILD_PROMPT.md exactly. It specifies the slide-to-section mapping, design tokens,
typography, components, animations, architecture and build steps for this specific deck.
If you don't have the file, the essentials are below.

GOAL
An executive-ready website for Marc and the BLT that reimagines the 18-slide deck as one
continuous vertical scroll. It should feel like a premium product site, not slides: generous
whitespace, sophisticated typography, subtle scroll-connected motion, pinned key diagrams,
staggered reveals, and smooth transitions between sections. Prioritize visual polish over features.

CONTENT RULES
- Read every slide (including text inside grouped shapes), every speaker note, and LARGE
  thumbnails of every slide. Read slide 17 at WIDTH2000_PX: some capability scores exist only
  as graphics.
- Keep the original slide order and narrative. Copy all titles, labels and figures verbatim.
  Never invent data. Exclude off-canvas draft text boxes that are not visible on the rendered slide.
- Show slide content only, with no extra callouts. Speaker notes appear ONLY in a "Details"
  drawer, verbatim. Split long notes per element: landscape notes per camp plus a general block;
  capability notes per row plus a Methodology block; profile notes into topic blocks.
  Slides 3 and 4 share identical notes, so attach them to both. Slides without notes get no
  Details tag.
- Deal slides (12, 14, 16): render ALL nine cards (Won / Lost / At Risk) as dimmed placeholders
  ("Account Name", "oppty amount", "org 62 oppty", "deal details", plus each slide's status,
  context and detail labels). Do NOT transcribe any customer names, amounts or deal strategy.
- All text, data, notes and placeholders live in src/content/*.ts. Components never hard-code
  copy. Inline markup: [[highlight]], [[text|positive|gold|violet]], *italic*, **bold**.

PAGE ORDER
Hero (slide 1)
→ Chapter "01 The Shift": Legacy BI (2), Tableau Democratized Data (3), The Next Market Moment (4)
→ Chapter "02 The Vision" (dark): Agentic Data Foundation (5), Persona Evolution (6),
  Agentic Lifecycle (7), Durable Loop (8), Architectural Blueprint (9)
→ Chapter "03 The Market": Landscape (10), Sigma profile + deals (11–12),
  Hex profile + deals (13–14), Power BI profile + deals (15–16)
→ Chapter "04 Closing the Gap": Capability Comparison (17), Build or Buy (18)
→ Footer

STACK
React 19 + TypeScript, Vite (base './'), Tailwind CSS v4 (@tailwindcss/vite, tokens in
@theme), motion (motion/react), lenis (lerp 0.18), and self-hosted Plus Jakarta Sans (display)
and Inter (body). Folders: src/content, src/sections (one per section),
src/components/{layout,motion,notes,ui}, src/hooks.

DESIGN
Palette from the deck theme:
- navy #001E5B, deep navy #000F33, royal #022AC0, cyan #00B3FF, cyan-soft #90D0FE
- sky #EAF5FE, paper #F5F9FF
- gold #FCC003, violet #D17DFE
- won #2E9E4F, lost #E5372B, risk #F08C00
- ink-soft #4A5B82, ink-faint #8A97B5, line #DBE6F6
Type and surfaces:
- Display type: 700 weight, -0.035em tracking. Eyebrows: 0.72rem, 0.18em tracking, uppercase.
- White cards with a 24px radius and soft navy shadows. Glass top bar.
- Grain overlay on royal panels. 48px rounded edges where dark blocks meet the paper background.
- Max width 1240px.

NAVIGATION
- Floating glass top bar: mark, title, date, chapter links 01–04 with a sliding active pill,
  and a Details switch. A scroll-progress hairline runs along its bottom.
- The bar adapts to dark or light backgrounds via data-surface="dark".
- Right-edge dot rail with one dot per section (the active dot becomes a pill) and hover labels.
- Bottom-centre competitor dock (Sigma / Hex / Power BI) during the Market chapter.

MOTION (desktop; under 1024px, use stacked reveals instead of pinning)
- Hero (150vh): on load, the title rises word by word, the bars grow, the badge springs in and
  sparkles twinkle. On scroll, it scales to 0.9 and rounds its corners into a floating card.
- Chapter intros: parallax giant numeral; the title slides in; a hairline draws.
- Legacy BI: sticky royal panel whose statement lights up word by word; a progress rail fills
  past three numbered stage cards; a dashed return path draws and ends in a red ✕; the dead-end
  callout reveals last.
- Democratized: the era cards slide in from opposite sides with a scroll-drawn connector; the
  stats count up around a DataFam wordmark.
- Market Moment (pinned 240vh): card A's words fill in; card B slides in; five pillar chips
  appear in turn.
- Foundation (pinned 260vh): an SVG isometric 5-slab stack builds bottom-up (Hyperforce first);
  the active slab glows and its description lights up; hovering a description lights its slab.
- Personas (pinned 230vh): the Now panel slides in as Then dims; the arrow rotates in; the Now
  cards light up in turn; the closing statement fills in.
- Lifecycle (pinned 240vh, dark): both loops draw via pathLength; the RELAY orb scales in;
  pulses travel around the loops; hovering a loop highlights it; the persona tags show; the four
  equal-height engine tiles light up in turn.
- Durable Loop (pinned 300vh): a progress ring maps directly to scroll; nodes 1–4 activate;
  the detail text cross-fades; a clickable 4-step progress list.
- Blueprint: three lanes; lane-edge-to-lane-edge connectors that draw in, with flowing cyan
  dashes; hovering an item highlights its path; the summary banner lights up word by word.
- Landscape: pinned horizontal scroll through five camp panels sized to their content; vendor
  layers build bottom-up, triggered by their panel.
- Profiles: identical template (name + thesis, count-up figure strip, Go-To-Market /
  Strengths & Weaknesses / Innovation Bets cards, deals row).
- Capability matrix: harvey balls sweep in column by column; row and column hover highlights;
  clickable rows open their rationale when Details is on.
- Build or Buy (dark): per-row scroll-linked range bars on a 0–24 month axis; lean pills;
  the disclaimer verbatim.
- Easing everywhere: cubic-bezier(0.16, 1, 0.3, 1). Respect prefers-reduced-motion.
  Don't put springs on scroll-scrubbed values (they lag the scrollbar).

DETAILS TOGGLE
- Off by default; persisted in localStorage. When on, small "Details" tags appear where notes
  exist. They open a right-hand drawer ("Speaker notes · Slide N", verbatim blocks).
  The drawer closes with Esc, a scrim click or ✕.
- Once per session, after scrolling past the opening, show a callout under the switch:
  "Go deeper / Turn on to see the research and sources behind each section. Expand from the
  Details tags.", with buttons [Turn on Details] [Got it]. The switch pulses while it shows.

PROCESS
1. Read the deck and propose the structure.
2. Build the content files first, then the primitives, then the chrome, then the sections in order.
3. Run it locally and verify at 1280×720, 1440×900 and 375×812: no clipping under the top bar,
   no horizontal overflow, no console errors, and Details opens the correct notes.
4. Run `npm run build` and `npm run lint`.
5. Do NOT deploy until I confirm the content is approved for the audience. A GitHub Pages
   site on a personal account is public. Before publishing, search the repo for customer names,
   amounts, internal links and restricted notes.
````
