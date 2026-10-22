import type { Rich } from './types'

/* ------------------------------------------------------------------ */
/* Slide 4 · Building the Agentic Analytics Lifecycle                  */
/* ------------------------------------------------------------------ */

export const lifecycle = {
  title: 'Building the Agentic Analytics Lifecycle',
  statement: 'Unifying [[self-service]] exploration at the edge, with [[centralized enterprise governance]]',
  loops: {
    selfService: {
      title: 'Self-Service Loop',
      subtitle: 'Agility at the Edge',
      persona: 'Persona: Builder/Active Consumer',
      motion: 'Check-Out & Return',
    },
    operational: {
      title: 'Operational Loop',
      subtitle: 'Enterprise Governance',
      persona: 'Persona: Context Engineer',
      motion: 'Merge & Certify',
    },
  },
  core: { title: 'RELAY', subtitle: 'Lifecycle Engine' },
  foundation: {
    title: 'Foundational Platform Engines',
    engines: ['Data Engine', 'Knowledge Engine', 'Decision Engine', 'Action Engine'],
  },
}

/* ------------------------------------------------------------------ */
/* Slide 5 · Building the Durable Loop for Agentic Data Apps           */
/* ------------------------------------------------------------------ */

export interface LoopStep {
  title: string
  role: string
  description: string
}

export const durableLoop = {
  title: 'Building the Durable Loop for Agentic Data Apps',
  statement:
    'Moving from [[isolated chat]] interfaces to a [[continuous,]] [[inspectable,]] and [[reusable]] workflow',
  center: 'The Durable Loop',
  steps: [
    {
      title: 'Input',
      role: 'Business User',
      description: 'Natural language question and Tableau semantic grounding',
    },
    {
      title: 'Pro-Code Authoring & Evals',
      role: 'Developer',
      description: 'Hex Thread: SQL/Python + YAML',
    },
    {
      title: 'Data Apps & Warehouse Writeback',
      role: 'App Builder',
      description: 'App publishing & zero-copy write-back',
    },
    {
      title: 'Distribution & Context',
      role: 'Business User',
      description: 'Slack, Teams, MCP, Salesforce',
    },
  ] as LoopStep[],
}

/* ------------------------------------------------------------------ */
/* Slide 6 · Architectural Blueprint: Hex & Tableau                    */
/* ------------------------------------------------------------------ */

export type BlueprintIcon =
  | 'code'
  | 'app'
  | 'eval'
  | 'storage'
  | 'writeback'
  | 'tableau'
  | 'salesforce'
  | 'distribution'

export interface BlueprintItem {
  id: string
  icon: BlueprintIcon
  title: string
  description: string
}

export interface BlueprintColumn {
  id: string
  title: string
  subtitle: string
  items: BlueprintItem[]
}

export const blueprint = {
  title: 'Architectural Blueprint: Hex & Tableau',
  subtitle: 'Delineating analytical authoring from enterprise governance and activation.',
  columns: [
    {
      id: 'analytical',
      title: 'Analytical Path',
      subtitle: 'Hex Engine',
      items: [
        { id: 'pro-code', icon: 'code', title: 'Pro-code authoring', description: 'SQL, Python & Hex Threads' },
        {
          id: 'data-app',
          icon: 'app',
          title: 'Data App Authoring',
          description: 'Generative UI, grid & scheduled apps',
        },
        {
          id: 'eval',
          icon: 'eval',
          title: 'Agent eval harness',
          description: 'Git-backed YAML test suites & LLM judge',
        },
      ],
    },
    {
      id: 'bridge',
      title: 'Zero-Copy Warehouse Bridge',
      subtitle: 'Data Lakes',
      items: [
        {
          id: 'storage',
          icon: 'storage',
          title: 'Shared storage',
          description: 'Live query execution on Snowflake, Databricks & BigQuery',
        },
        {
          id: 'writeback',
          icon: 'writeback',
          title: 'Zero-Copy Write-back',
          description: 'Transformed data frames write-back directly to the warehouse',
        },
      ],
    },
    {
      id: 'governance',
      title: 'Governance & Enterprise Path',
      subtitle: 'Tableau / Salesforce',
      items: [
        {
          id: 'metric-contract',
          icon: 'tableau',
          title: 'Single Metric Contract',
          description: 'All agents query Tableau Semantics directly',
        },
        {
          id: 'identity',
          icon: 'salesforce',
          title: 'Identity & Activation',
          description: 'Data 360 resolves identity & triggers Salesforce workflows',
        },
        {
          id: 'distribution',
          icon: 'distribution',
          title: 'Enterprise Distribution',
          description: 'Slack, Teams, Salesforce & MCP endpoints',
        },
      ],
    },
  ] as BlueprintColumn[],
  /** Connectors drawn between columns, matching the arrows on the slide. */
  flows: [
    { from: 'analytical', to: 'writeback' },
    { from: 'storage', to: 'metric-contract' },
    { from: 'writeback', to: 'identity' },
    { from: 'writeback', to: 'distribution' },
  ],
  summary: [
    'The transform lives in [[Hex|gold]]; zero-copy data in the [[lake|gold]]; identity & activation in [[Data 360|violet]].',
    'One trusted metric contract across all agents via [[Tableau Semantics|violet]].',
  ] as Rich[],
}
