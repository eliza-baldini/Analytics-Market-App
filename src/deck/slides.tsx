import type { ComponentType } from 'react'
import { meta, sections } from '../content/navigation'
import { AgenticPersonas } from '../slides/AgenticPersonas'
import { Architecture, archSteps } from '../slides/Architecture'
import { Comparison } from '../slides/Comparison'
import { Democratized } from '../slides/Democratized'
import { FrontierDetail } from '../slides/FrontierDetail'
import { Frontiers } from '../slides/Frontiers'
import { LegacyBI } from '../slides/LegacyBI'
import { Lifecycle } from '../slides/Lifecycle'
import { Divider, Opening } from '../slides/Opening'
import { ParadigmShift } from '../slides/ParadigmShift'
import { ProductStrategy } from '../slides/ProductStrategy'
import { OperatingModel, Priorities, Reinvestment, SpecDriven, Standards } from '../slides/Talent'
import { TraditionalPersonas } from '../slides/TraditionalPersonas'
import { UniversalSelfService } from '../slides/UniversalSelfService'

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
  /** Position in the app (deck slides 16–18 are intentionally not included). */
  number: number
  title: string
  /** Section tab this slide belongs to. */
  chapter: string
  /** Number of build states (1 = no builds). */
  steps: number
  /**
   * Milliseconds to wait before each automatic build: pace[0] is the wait after the slide
   * arrives before build 1, pace[1] before build 2, and so on. Falls back to DEFAULT_PACE.
   */
  pace?: number[]
  surface: Surface
  /**
   * Consecutive slides with the same group share one canvas: moving between them keeps the
   * component mounted (no slide transition) and only its props change, so it can build on itself.
   */
  group?: string
  props?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each slide pairs Component with its own props
  Component: ComponentType<any>
}

const divider = (id: string): ComponentType => () => <Divider title={sections.find((s) => s.id === id)!.title} />
const with_ = <P extends object>(C: ComponentType<P>, props: P): ComponentType => () => <C {...props} />

type Entry = Omit<SlideDef, 'number' | 'chapter'>

const sectionDivider = (id: string): Entry => ({
  id: `${id}-divider`,
  title: sections.find((s) => s.id === id)!.title,
  steps: 1,
  surface: 'blue',
  Component: divider(id),
})

/** Slides per deck section, in deck order. */
const bySection: Record<string, Entry[]> = {
  opening: [{ id: 'opening', title: `${meta.title} ${meta.subtitle}`, steps: 1, surface: 'blue', Component: Opening }],
  'market-shift': [
    sectionDivider('market-shift'),
    { id: 'democratized', title: 'Tableau Democratized Self-Service & Visual Analytics', steps: 4, pace: [700, 700, 900], surface: 'blue', Component: Democratized },
    { id: 'legacy-bi', title: 'Legacy BI: A Linear, Human-Led Process', steps: 6, pace: [1000, 500, 500, 500, 600], surface: 'paper', Component: LegacyBI },
    { id: 'traditional-personas', title: 'Traditional BI & Analytics Personas', steps: 5, pace: [600, 500, 500, 600], surface: 'paper', Component: TraditionalPersonas },
  ],
  agentic: [
    sectionDivider('agentic'),
    { id: 'universal-self-service', title: 'Generative AI Democratized Universal Self Service Analytics', steps: 4, pace: [700, 700, 800], surface: 'blue', Component: UniversalSelfService },
    { id: 'paradigm-shift', title: 'AI/BI Architectural Paradigm Shift', steps: 6, pace: [600, 450, 450, 450, 600], surface: 'paper', Component: ParadigmShift },
    { id: 'lifecycle', title: 'Building the Agentic Analytics Lifecycle', steps: 5, pace: [650, 700, 700, 550], surface: 'navy', Component: Lifecycle },
    { id: 'agentic-personas', title: 'Meet Our Agentic Era Personas', steps: 4, pace: [600, 500, 500], surface: 'paper', Component: AgenticPersonas },
  ],
  architecture: [
    sectionDivider('architecture'),
    { id: 'architecture-required', title: 'Market Demands a New Agentic Architecture', steps: archSteps.required, surface: 'paper', Component: with_(Architecture, { stage: 'required' }) },
    { id: 'architecture-gaps', title: 'Tableau’s Agentic Architecture: Capabilities vs. Desired Architecture', steps: archSteps.gaps, pace: [700, 1100], surface: 'paper', group: 'architecture-overlays', Component: Architecture, props: { stage: 'gaps' } },
    { id: 'architecture-roadmap', title: 'Tableau’s Agentic Architecture: Product Roadmap by Laulima', steps: archSteps.roadmap, pace: [800], surface: 'paper', group: 'architecture-overlays', Component: Architecture, props: { stage: 'roadmap' } },
    { id: 'architecture-pivot', title: 'Tableau’s Agentic Architecture: Revised Product Roadmap with Accelerated Pivot', steps: archSteps.pivot, pace: [800], surface: 'paper', group: 'architecture-overlays', Component: Architecture, props: { stage: 'pivot' } },
  ],
  competitive: [
    sectionDivider('competitive'),
    { id: 'frontiers', title: 'The Four Competitive Frontiers of Data & Analytics', steps: 6, pace: [600, 350, 350, 350, 350], surface: 'paper', Component: Frontiers },
    { id: 'lakehouses', title: 'Lakehouses', steps: 5, pace: [700, 500, 600, 600], surface: 'paper', Component: with_(FrontierDetail, { id: 'lakehouses-detail' }) },
    { id: 'frontier-labs', title: 'Frontier Labs', steps: 5, pace: [700, 500, 600, 600], surface: 'paper', Component: with_(FrontierDetail, { id: 'frontier-labs-detail' }) },
    { id: 'ai-native', title: 'AI-Native Startups', steps: 5, pace: [700, 500, 600, 600], surface: 'paper', Component: with_(FrontierDetail, { id: 'ai-native-detail' }) },
    { id: 'hyperscalers', title: 'Hyper-Scaler Full-Stacks', steps: 5, pace: [700, 500, 600, 600], surface: 'paper', Component: with_(FrontierDetail, { id: 'hyperscalers-detail' }) },
    { id: 'hex-comparison', title: 'Hex: Market Capability Comparison', steps: 2, pace: [900], surface: 'paper', Component: with_(Comparison, { id: 'hex-comparison' }) },
    { id: 'power-bi-comparison', title: 'Power BI: Market Capability Comparison', steps: 2, pace: [900], surface: 'paper', Component: with_(Comparison, { id: 'power-bi-comparison' }) },
    { id: 'product-strategy', title: 'FY28 Product Strategy', steps: 4, pace: [500, 700, 700], surface: 'paper', Component: ProductStrategy },
  ],
  talent: [
    sectionDivider('talent'),
    { id: 'operating-model', title: 'Evolving our Operating Model', steps: 6, pace: [600, 350, 350, 350, 350], surface: 'blue', Component: OperatingModel },
    { id: 'standards', title: 'Tableau’s Product & Engineering Standards & Expectations', steps: 3, pace: [500, 900], surface: 'paper', Component: Standards },
    { id: 'priorities', title: 'Analytics T&P P0 Priorities', steps: 1, surface: 'paper', Component: Priorities },
    { id: 'spec-driven', title: 'Spec-Driven Development – Agentic Transformation', steps: 3, pace: [900, 900], surface: 'paper', Component: SpecDriven },
    { id: 'reinvestment', title: 'Target Reinvestment: Rapid Innovation', steps: 3, pace: [500, 800], surface: 'paper', Component: Reinvestment },
  ],
}

export const slides: SlideDef[] = sections
  .flatMap((sec) => (bySection[sec.id] ?? []).map((s) => ({ ...s, chapter: sec.id })))
  .map((s, i) => ({ ...s, number: i + 1 }))

/** Tabs for the top bar: one per deck section, pointing at its first slide. */
export const sectionTabs = sections.map((s) => ({ id: s.id, label: s.tab, first: slides.findIndex((sl) => sl.chapter === s.id) }))

const DEFAULT_PACE = 600

/** Multiplier on every slide's pacing: below 1 is faster, above 1 slower. */
export const PACE_SCALE = 1

/** Delay before advancing from `step` to `step + 1` on slide `index`. */
export function buildDelay(index: number, step: number) {
  return (slides[index].pace?.[step] ?? DEFAULT_PACE) * PACE_SCALE
}
