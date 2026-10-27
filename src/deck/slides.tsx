import type { ComponentType } from 'react'
import { chapters, meta } from '../content/navigation'
import { Blueprint } from '../slides/Blueprint'
import { BuildOrBuy } from '../slides/BuildOrBuy'
import { CapabilityMatrix } from '../slides/CapabilityMatrix'
import { CompetitorDeals, CompetitorProfile } from '../slides/Competitor'
import { Democratized } from '../slides/Democratized'
import { DurableLoop } from '../slides/DurableLoop'
import { Foundation } from '../slides/Foundation'
import { Landscape } from '../slides/Landscape'
import { LegacyBI } from '../slides/LegacyBI'
import { Lifecycle } from '../slides/Lifecycle'
import { MarketMoment } from '../slides/MarketMoment'
import { Opening } from '../slides/Opening'
import { Personas } from '../slides/Personas'

/** Design size of every slide; the stage scales it to fit the screen. */
export const CANVAS_W = 1600
export const CANVAS_H = 900

export type Surface = 'paper' | 'navy' | 'blue'

/** Slide background, also used to fill the letterbox around the canvas. */
export const surfaceBg: Record<Surface, string> = {
  paper: '#f5f9ff',
  navy: '#000f33',
  blue: 'linear-gradient(160deg,#0418a8 0%,#0a2fd0 55%,#0418a8 100%)',
}

export interface SlideDef {
  id: string
  /** Deck slide number. */
  number: number
  title: string
  /** Section tab this slide belongs to. */
  chapter: string
  /** Number of build states (1 = no builds). */
  steps: number
  surface: Surface
  Component: ComponentType
}

const profile = (id: string): ComponentType => () => <CompetitorProfile id={id} />
const deals = (id: string): ComponentType => () => <CompetitorDeals id={id} />

type Entry = Omit<SlideDef, 'number' | 'chapter'>

const opening: Entry[] = [{ id: 'opening', title: meta.title, steps: 1, surface: 'blue', Component: Opening }]

/** Slides per chapter, in deck order. */
const byChapter: Record<string, Entry[]> = {
  shift: [
    { id: 'legacy-bi', title: 'Legacy BI: Analytics as a Linear Process', steps: 5, surface: 'paper', Component: LegacyBI },
    { id: 'democratized', title: 'Tableau Democratized Data', steps: 4, surface: 'blue', Component: Democratized },
    { id: 'market-moment', title: 'The Next Market Moment is Here', steps: 3, surface: 'blue', Component: MarketMoment },
  ],
  vision: [
    { id: 'foundation', title: 'The Tableau Agentic Data Foundation', steps: 6, surface: 'navy', Component: Foundation },
    { id: 'personas', title: 'Core Persona Evolution', steps: 3, surface: 'paper', Component: Personas },
    { id: 'lifecycle', title: 'Building the Agentic Analytics Lifecycle', steps: 5, surface: 'navy', Component: Lifecycle },
    { id: 'durable-loop', title: 'Building the Durable Loop for Agentic Data Apps', steps: 5, surface: 'paper', Component: DurableLoop },
    { id: 'blueprint', title: 'Architectural Blueprint: Hex & Tableau', steps: 5, surface: 'paper', Component: Blueprint },
  ],
  market: [
    { id: 'landscape', title: 'The Fragmentation of the BI&A Market Landscape', steps: 6, surface: 'paper', Component: Landscape },
    { id: 'sigma', title: 'Sigma', steps: 2, surface: 'paper', Component: profile('sigma') },
    { id: 'sigma-deals', title: 'Sigma Deals', steps: 1, surface: 'paper', Component: deals('sigma') },
    { id: 'hex', title: 'Hex', steps: 2, surface: 'paper', Component: profile('hex') },
    { id: 'hex-deals', title: 'Hex Deals', steps: 1, surface: 'paper', Component: deals('hex') },
    { id: 'power-bi', title: 'Power BI', steps: 2, surface: 'paper', Component: profile('power-bi') },
    { id: 'power-bi-deals', title: 'PBI Deals', steps: 1, surface: 'paper', Component: deals('power-bi') },
  ],
  gap: [
    { id: 'capabilities', title: 'Market Capability Comparison', steps: 4, surface: 'paper', Component: CapabilityMatrix },
    { id: 'build-or-buy', title: 'Catching Up: Build or Buy', steps: 4, surface: 'navy', Component: BuildOrBuy },
  ],
}

export const slides: SlideDef[] = [
  ...opening.map((s) => ({ ...s, chapter: 'opening' })),
  ...chapters.flatMap((c) => (byChapter[c.id] ?? []).map((s) => ({ ...s, chapter: c.id }))),
].map((s, i) => ({ ...s, number: i + 1 }))

/** Tabs for the top bar: the opening plus each chapter, pointing at its first slide. */
export const sectionTabs = [
  { id: 'opening', label: 'Opening' },
  ...chapters.map((c) => ({ id: c.id, label: c.title })),
].map((t) => ({ ...t, first: slides.findIndex((s) => s.chapter === t.id) }))

/** 0–1 progress through the deck, counting builds within the current slide. */
export function deckProgress(index: number, step: number) {
  const slide = slides[index]
  return (index + (step + 1) / slide.steps) / slides.length
}
