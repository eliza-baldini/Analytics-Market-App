import type { Notes } from './types'

/* ------------------------------------------------------------------ */
/* Slide 15 · Catching Up: Build or Buy                                */
/* ------------------------------------------------------------------ */

export interface GapRow {
  gap: string
  leaders: string
  /** Months to parity, [from, to]. */
  build: [number, number]
  buy: [number, number]
  lean: string
}

export const buildOrBuy = {
  title: 'Catching Up: Build or Buy',
  columns: { gap: 'Capability gap', range: 'Months to parity (estimate range)', lean: 'Initial lean' },
  axis: [0, 6, 12, 18, 24],
  legend: { build: 'Build to parity', buy: 'Buy or partner, to integrated parity' },
  disclaimer:
    'Illustrative planning ranges, not Engineering estimates. Replace before this goes to Marc and the BLT.',
  rows: [
    {
      gap: 'Spreadsheet UX + write-back',
      leaders: 'Leader: Sigma (Databricks adding via Row Zero)',
      build: [12, 18],
      buy: [3, 6],
      lean: 'Buy',
    },
    {
      gap: 'Agent context: observability, testing, evals',
      leaders: 'Leader: Hex; Tableau Knowledge (GA Oct 2026) is our base',
      build: [6, 12],
      buy: [3, 4],
      lean: 'Buy',
    },
    {
      gap: 'Conversational analytics + agents that act',
      leaders: 'Leaders: Sigma Agents, Hex Threads',
      build: [6, 12],
      buy: [3, 6],
      lean: 'Build on MCP + Tab Agent',
    },
    {
      gap: 'Lakehouse integrations: semantics, knowledge, agents',
      leaders: 'Leaders: Sigma, Hex (live-only)',
      build: [9, 12],
      buy: [3, 6],
      lean: 'Invest in partnerships',
    },
    {
      gap: 'Generative data apps',
      leaders: 'Leaders: Sigma AI Apps + vertical templates, Hex data apps',
      build: [6, 9],
      buy: [3, 4],
      lean: 'Build',
    },
  ] as GapRow[],
  notes: {
    source: 'Slide 15',
    blocks: [
      {
        paragraphs: [
          'Straw-man build vs buy framing for discussion. Ranges are illustrative planning placeholders, not sourced engineering estimates; they should be replaced with Product/Engineering inputs. Competitor cadence: Sigma publishes monthly "New in Sigma" releases and Hex publishes frequent changelog entries (2026). Tableau Knowledge (maps existing Tableau semantics into an agent-ready knowledge graph, with health scoring) reached GA in Tableau Cloud on Oct 1, 2026; Server is Q4 2026 and Tableau Next FY28 per internal field posts. We found no Tableau equivalent yet to the observe, inspect and test steps in Context Studio. Build/buy options are generic by design; no specific targets or deal status are named.',
        ],
      },
    ],
  } as Notes,
}
