/* ------------------------------------------------------------------ */
/* Slides 12–15 · Agentic architecture diagram and its four overlays   */
/* ------------------------------------------------------------------ */

export type ArchStage = 'required' | 'gaps' | 'roadmap' | 'pivot'

/** Fraction of each box covered: `base` = Tableau capability, `added` = incremental (green) on top. */
export interface Coverage {
  base: number
  added?: number
}

export interface ArchBox {
  id: string
  title: string
  detail?: string
  /** Coverage per stage. Omitted stages show no fill. */
  coverage?: Partial<Record<ArchStage, Coverage>>
}

const cov = (today: number, nineMonth: number, pivot: number): Partial<Record<ArchStage, Coverage>> => ({
  gaps: { base: today },
  roadmap: { base: today, added: nineMonth },
  pivot: { base: nineMonth, added: pivot },
})

export const architecture = {
  headless: {
    id: 'headless',
    title: 'Headless Analytics & Surface Distribution',
    detail: 'Omnichannel delivery to conversational agents, notebooks, and enterprise collaboration apps',
    coverage: cov(0.36, 0.42, 0.55),
  } as ArchBox,
  asset: {
    title: 'Analytics Asset Mgmt',
    items: [
      { id: 'data-apps', title: 'Data Apps', coverage: cov(0.54, 0.65, 0.82) },
      { id: 'skills', title: 'Skills', coverage: cov(0.41, 0.76, 0.88) },
      { id: 'memory', title: 'Memory', coverage: cov(0.17, 0.17, 0.39) },
      { id: 'knowledge', title: 'Knowledge', coverage: cov(0.29, 0.65, 0.93) },
    ] as ArchBox[],
  },
  engines: [
    { id: 'action', title: 'Action Engine', detail: 'Automated workflows, reverse ETL, CRM tasks & approvals', coverage: cov(0.62, 0.62, 1) },
    { id: 'decision', title: 'Decision Engine', detail: 'Conversational analytics, root-cause & automated visual synthesis', coverage: cov(0.51, 0.51, 0.82) },
    { id: 'knowledge-engine', title: 'Knowledge Engine', detail: 'Dynamic semantic model, unified metrics graph & eval benchmarks', coverage: cov(0.27, 0.43, 0.77) },
    { id: 'federated', title: 'Federated Data Engine', detail: 'Zero-copy live queries, Hyper WASM at edge & high-speed caching', coverage: cov(0.32, 0.51, 0.82) },
  ] as ArchBox[],
  open: {
    title: 'Open & Extensible',
    items: [
      { id: 'mcps', title: 'MCPs', detail: 'Model Context Protocol', coverage: cov(0.5, 0.69, 1) },
      { id: 'apis', title: 'Open APIs', detail: 'Bi-directional REST & SDKs', coverage: cov(0.77, 0.77, 1) },
      { id: 'byollm', title: 'BYOLLM', detail: 'Frontier & Private Models', coverage: cov(0, 0.77, 1) },
    ] as ArchBox[],
  },
  /** The three architectural primitives Tableau lacks today (outlined red from slide 13). */
  primitives: [
    { id: 'code-first', title: 'Code-first Substrate', detail: 'Git primitive principles for work management', coverage: { pivot: { base: 0, added: 0.34 } } },
    { id: 'cell-graph', title: 'Cell-based Graph', detail: 'Fully composable analytical components for all needs.' },
    { id: 'relay', title: 'Git Style Relay Loop', detail: 'Check-out at edge, branch, verify & merge to core', coverage: { pivot: { base: 0, added: 0.29 } } },
  ] as ArchBox[],
  ecosystem: [
    { id: 'data-360', title: 'Data 360', count: 3, coverage: { gaps: { base: 1 }, roadmap: { base: 1 }, pivot: { base: 1 } } },
    { id: 'data-partners', title: 'Data Partners', count: 11, coverage: { gaps: { base: 0.75 }, roadmap: { base: 0.75 }, pivot: { base: 0.75, added: 1 } } },
    { id: 'business-apps', title: 'Business Apps', count: 4, coverage: { pivot: { base: 0, added: 1 } } },
  ] as (ArchBox & { count: number })[],
  /** Collaboration surfaces shown beside Headless Analytics (decorative chips). */
  surfaces: 8,
  zones: ['Agentic Core', 'Open Ecosystem'],
  stages: {
    required: {
      title: 'Market Demands a New Agentic Architecture',
      subtitle: 'Next-generation AI & BI architecture',
      legend: [{ kind: 'required', label: 'Required capabilities for agentic architecture' }],
    },
    gaps: {
      title: 'Tableau’s Agentic Architecture',
      subtitle: 'Capabilities vs. Desired Architecture',
      legend: [
        { kind: 'base', label: 'Tableau capabilities' },
        { kind: 'required', label: 'Required capabilities for agentic architecture' },
        { kind: 'gap', label: 'Critical Tableau capability gaps for agentic architecture' },
      ],
    },
    roadmap: {
      title: 'Tableau’s Agentic Architecture',
      subtitle: 'Product Roadmap by Laulima',
      legend: [
        { kind: 'base', label: 'Tableau capabilities **today**' },
        { kind: 'added', label: '**Incremental** capabilities with 9 Month Roadmap' },
        { kind: 'required', label: 'Required capabilities for agentic architecture' },
        { kind: 'gap', label: 'Critical Tableau capability gaps for agentic architecture' },
      ],
    },
    pivot: {
      title: 'Tableau’s Agentic Architecture',
      subtitle: 'Revised Product Roadmap with Accelerated Pivot',
      legend: [
        { kind: 'base', label: 'Tableau capabilities in **9 months** roadmap' },
        { kind: 'added', label: '**Incremental** capabilities with pivoted roadmap' },
        { kind: 'required', label: 'Required capabilities for agentic architecture' },
        { kind: 'gap', label: 'Critical Tableau capability gaps for agentic architecture' },
      ],
    },
  } as Record<ArchStage, { title: string; subtitle: string; legend: { kind: 'base' | 'added' | 'required' | 'gap'; label: string }[] }>,
}
