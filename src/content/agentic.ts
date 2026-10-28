import type { Rich } from './types'

/* ------------------------------------------------------------------ */
/* Slide 7 · Generative AI Democratized Universal Self Service Analytics */
/* ------------------------------------------------------------------ */

export const universalSelfService = {
  title: 'Generative AI Democratized Universal Self Service Analytics',
  subtitle: 'But the future of analytics demands trust at scale and Tableau can solve this issues',
  past: { period: '2003-2025', title: 'Self-Service Analytics', lead: '**User-driven** data exploration and insight discovery' },
  present: { period: '2025+', title: 'Agentic Analytics', lead: 'Magic in Five Seconds' },
  demand: 'But the future of analytics demands trust at scale',
  pillars: ['Governance', 'Security', 'Accuracy', 'Persistence', 'Cost'],
}

/* ------------------------------------------------------------------ */
/* Slide 8 · AI/BI Architectural Paradigm Shift                        */
/* ------------------------------------------------------------------ */

export const paradigmShift = {
  title: 'AI/BI Architectural Paradigm Shift',
  subtitle:
    'Moving analytics from proprietary binary files to an open, code-first graph substrate, enabling Git-style branching, Hyper WASM edge speed, and seamless Relay check-in governance.',
  pillars: [
    {
      title: 'Code-First Substrate',
      points: ['Everything is code', 'Agent inspectability', 'Composable cell graph'],
      summary: 'Everything is inspectable, portable code. Vibe-coding meets enterprise rigor',
    },
    {
      title: 'Git-Style Work Loop',
      points: ['Branching & isolation', 'Check-in / PR review', 'GitHub integration'],
      summary: 'Agility at the edge, uncompromised governance at the center',
    },
    {
      title: 'Cell-based Architecture',
      points: ['Jupyter-like thinking', 'Non-linear', 'Cyclical graphs'],
      summary: 'Supports the chaos of thought and experimentation.',
    },
    {
      title: 'Hyper & Federated Engine',
      points: ['Hyper WASM at edge', 'Federated live execution', 'Cost control'],
      summary: 'In-browser local speed, paired with zero-copy live execution',
    },
  ],
  tags: [
    'Code Substrate',
    'Git Branching',
    'Cell Graph',
    'Unified Agent',
    'Hyper Engine',
    'Multi-Surface',
    'Operational Deployment',
    'Relay Governance',
  ],
}

/* ------------------------------------------------------------------ */
/* Slide 9 · Building the Agentic Analytics Lifecycle                  */
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
  /** Labels around each loop, as on the slide. */
  segments: ['Data', 'Knowledge', 'Decisions', 'Actions'],
  core: { title: 'RELAY', subtitle: 'Lifecycle Engine' },
  foundation: {
    title: 'Foundational Platform Engines',
    engines: ['Data Platform', 'Semantics & Knowledge', 'Decisions Engine', 'Actions Engine'],
  },
}

/* ------------------------------------------------------------------ */
/* Slide 10 · Meet Our Agentic Era Personas                            */
/* ------------------------------------------------------------------ */

export interface AgenticPersona {
  badge: string
  name: string
  title: string
  tagline: Rich
  quote: string
  points: Rich[]
  tone: 'blue' | 'teal' | 'violet'
}

export const agenticPersonas = {
  title: 'Meet Our [[Agentic Era]] Personas',
  subtitle: 'From insight to action: for every role, across every workflow',
  personas: [
    {
      badge: 'Context Engineer',
      name: 'Maya',
      title: 'Analytics & Data Leader',
      tagline: 'She curates the [[context]] [[that powers agents.]]',
      quote: '“How do I make our data trusted, governed, and ready for agent execution?”',
      points: ['Curates **Tableau Semantics** and knowledge', 'Establishes **governance and trust**', 'Enables agents via **eval suites and Relay check-ins**'],
      tone: 'blue',
    },
    {
      badge: 'Agentic Developer & Builder',
      name: 'Diego',
      title: 'Analytics Developer',
      tagline: 'He builds [[data apps that people actually use.]]',
      quote: '“How can I quickly build agentic data apps and deliver real value?”',
      points: ['Builds **ad-hoc data apps** via vibe-coding', 'Creates **dashboards, agents and skills** in minutes', 'Deploys across **any surface** (Slack, voice, web, mobile)'],
      tone: 'teal',
    },
    {
      badge: 'Business Consumer & Builder',
      name: 'Sarah',
      title: 'Business User',
      tagline: 'She gets [[proactive insights]] [[and takes action.]]',
      quote: '“How can I get the right insights in the flow of my work and take action faster?”',
      points: ['Asks questions and gets **proactive insights**', 'Explores data **conversationally** (in Slack, Teams, voice)', 'Takes **action** and collaborates with agents and teammates'],
      tone: 'violet',
    },
  ] as AgenticPersona[],
}
