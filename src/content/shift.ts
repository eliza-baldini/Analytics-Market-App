import type { Rich } from './types'

/* ------------------------------------------------------------------ */
/* Slide 2 · Core Persona Evolution                                    */
/* ------------------------------------------------------------------ */

export interface Persona {
  name: string
  description: Rich
}

export const personas = {
  title: 'Core Persona Evolution: Dashboard Creators to Agentic Builders',
  subtitle: 'Transforming legacy BI roles into a collaborative, code-first analytics lifecycle',
  then: {
    eyebrow: 'Then',
    title: 'Legacy BI',
    personas: [
      {
        name: 'Data Engineer',
        description: 'Manages data pipelines, warehouse schemas, and static extracts for central reporting',
      },
      {
        name: 'Data Analyst',
        description: 'Authors fixed dashboards and standardized report views for business teams',
      },
      {
        name: 'Business User',
        description: 'Consumes static dashboards and reports to monitor operational KPIs',
      },
    ] as Persona[],
  },
  now: {
    eyebrow: 'Now',
    title: 'Agentic Era',
    personas: [
      {
        name: 'Context Engineer',
        description: 'Curates Tableau Semantics and governs agent execution via eval suites and Relay check-ins',
      },
      {
        name: 'Builder & Active Consumer',
        description:
          'Builds ad-hoc Data Apps via vibe-coding while consuming proactive push insights across any surface (Slack, voice, podcasts)',
      },
    ] as Persona[],
  },
  statement:
    'Transforming static dashboard creators into context engineers and agentic builders across one continuous lifecycle',
}

/* ------------------------------------------------------------------ */
/* Slide 3 · Legacy BI: Analytics as a Linear Process                  */
/* ------------------------------------------------------------------ */

export interface LegacyStage {
  stage: string
  role: string
  points: string[]
}

export const legacyBI = {
  title: 'Legacy BI:',
  titleEmphasis: 'Analytics as a Linear Process',
  statement:
    'Relying on a [[linear progression]] between [[isolated]] teams leads to [[fractured governance]] and [[disconnected data silos]]',
  stages: [
    {
      stage: 'Data Prep & Ingestion',
      role: 'Data Engineer',
      points: [
        'Prepares schemas & extracts',
        'Slow, manual release cycles',
        'Bottlenecked by tickets & ad-hoc requests',
      ],
    },
    {
      stage: 'Dashboard Authoring',
      role: 'Data Analyst',
      points: ['Builds rigid dashboards and fixed VizQL views', 'Overwhelmed by minor tickets'],
    },
    {
      stage: 'Report Consumption',
      role: 'Business User',
      points: ['Consumes static dashboard reports', 'Isolated in uncertified Tableau, Excel, LLM silos'],
    },
  ] as LegacyStage[],
  deadEnd:
    'The **one-way dead end**: insights die in local spreadsheets and raw LLM chats, while Central IT gets zero visibility or reuse',
}
