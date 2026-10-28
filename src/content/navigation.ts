/** Deck identity and its sections, in order. Section titles match the deck's divider slides. */
export const meta = {
  title: 'FY27 Q3 CEO Product Review',
  subtitle: 'Analytics',
  date: 'October 2026',
  confidentiality: 'Internal – Confidential',
}

export interface DeckSection {
  id: string
  /** Title on the divider slide. */
  title: string
  /** Short label for the top bar. */
  tab: string
}

export const sections: DeckSection[] = [
  { id: 'opening', title: meta.title, tab: 'Opening' },
  { id: 'market-shift', title: 'Market Shift: Traditional BI & Analytics', tab: 'Market Shift' },
  { id: 'agentic', title: 'Agentic Analytics', tab: 'Agentic Analytics' },
  { id: 'architecture', title: 'Agentic Analytics Architecture & Roadmap', tab: 'Architecture & Roadmap' },
  { id: 'competitive', title: 'Competitive & Market Landscape', tab: 'Competitive Landscape' },
  { id: 'talent', title: 'Product & Engineering: Talent & Culture Transformation', tab: 'Talent & Culture' },
]
