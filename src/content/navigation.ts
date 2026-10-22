import type { SectionMeta } from './types'

/**
 * Page structure. Chapter titles are navigation labels for the web experience;
 * section content lives in the per-chapter content files.
 */
export interface Chapter {
  id: string
  index: string
  title: string
  sections: SectionMeta[]
}

export const meta = {
  eyebrow: 'Marc Review',
  title: 'Analytics Market Analysis',
  /** Title exactly as it appears on slide 1. */
  deckTitle: 'Marc Review - Analytics Market Analysis',
  date: 'October 27, 2026',
  confidentiality: 'Internal – Confidential',
}

export const hero: SectionMeta = { id: 'top', navLabel: 'Opening', slides: '1' }

export const chapters: Chapter[] = [
  {
    id: 'shift',
    index: '01',
    title: 'The Shift',
    sections: [
      { id: 'personas', navLabel: 'Persona Evolution', slides: '2' },
      { id: 'legacy-bi', navLabel: 'Legacy BI', slides: '3' },
    ],
  },
  {
    id: 'vision',
    index: '02',
    title: 'The Vision',
    sections: [
      { id: 'lifecycle', navLabel: 'Agentic Lifecycle', slides: '4' },
      { id: 'durable-loop', navLabel: 'The Durable Loop', slides: '5' },
      { id: 'blueprint', navLabel: 'Architectural Blueprint', slides: '6' },
    ],
  },
  {
    id: 'market',
    index: '03',
    title: 'The Market',
    sections: [
      { id: 'landscape', navLabel: 'Market Landscape', slides: '7' },
      { id: 'sigma', navLabel: 'Sigma', slides: '8–9' },
      { id: 'hex', navLabel: 'Hex', slides: '10–11' },
      { id: 'power-bi', navLabel: 'Power BI', slides: '12–13' },
    ],
  },
  {
    id: 'gap',
    index: '04',
    title: 'Closing the Gap',
    sections: [
      { id: 'capabilities', navLabel: 'Capability Comparison', slides: '14' },
      { id: 'build-or-buy', navLabel: 'Build or Buy', slides: '15' },
    ],
  },
]

export const allSections: SectionMeta[] = [hero, ...chapters.flatMap((c) => c.sections)]
