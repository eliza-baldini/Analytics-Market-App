import type { NoteBlock, Notes, Rich } from './types'

/* ------------------------------------------------------------------ */
/* Slide 6 · Core Persona Evolution                                    */
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
/* Slide 2 · Legacy BI: Analytics as a Linear Process                  */
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

/* ------------------------------------------------------------------ */
/* Slides 3–4 · Shared speaker notes (identical on both slides)        */
/* ------------------------------------------------------------------ */

const marketMomentNotes: NoteBlock = {
  paragraphs: [
    'There’s only one platform in the market that is uniquely positioned to deliver on this promise - Tableau.',
    'With over 20 years of data and analytics leadership, Tableau is your agentic analytics platform with Tableau Cloud, Server, Desktop, Next and CRM Analytics built to be integrated and open across data, semantics, insights and action.',
    'Our product foundation and domain leadership is why we are introducing two industry first innovations that extends all the assets that exists across Tableau:',
    '1) is a new knowledge engine that brings together semantic sprawl into a dynamic, auditable and governed view to power AI agents.',
    '2) is a new decision engine that meets users where they are with conversational analytics and visualizations to make decisions and take action.',
    'Both of these engines are expressed through headless analytics, which is aligned to what Tableau has been about since it was founded - democratizing data.',
    "You can take your trusted knowledge and drive insight to action anywhere you're working - whether that's Salesforce, Tableau, Slack, Microsoft Teams, ChatGPT, Claude and third party applications. We are live with MCPs across many agentic tools and will continue releasing more.",
    'Lastly, these innovations aren’t valuable without a trusted platform. Your role-based permissions, your security, your governance all travels with these experiences.',
    'Now let’s take a look at how the knowledge engine drives AI readiness in your organization.',
  ],
}

/* ------------------------------------------------------------------ */
/* Slide 3 · Tableau Democratized Data                                 */
/* ------------------------------------------------------------------ */

export interface Era {
  period: string
  title: string
  /** Lead line under the era header. */
  lead: Rich
  points: string[]
  /** Optional closing line, highlighted on the slide. */
  tagline?: Rich
}

export const democratized = {
  title: 'Tableau Democratized Data',
  subtitle:
    'Capturing a pivotal market moment by turning data into a skillset, a community and a lasting movement',
  eras: [
    {
      period: 'Pre-2003',
      title: 'Traditional Reporting',
      lead: '**IT-led** data retrospectives',
      points: ['Static reports', 'Fixed dashboards'],
    },
    {
      period: '2003+',
      title: 'Self-Service Analytics',
      lead: '**User-driven** data exploration and insight discovery',
      points: ['Data democratization', 'Drag-and-drop analytics', 'VizQL Engine'],
      tagline: '5 minutes to magic for *everyone*',
    },
  ] as Era[],
  movement: {
    title: 'Creating a global movement of data professionals',
    /** Shown on the slide as the DataFam wordmark. */
    community: 'DataFam',
    stats: [
      { value: '34M+', label: 'Users worldwide' },
      { value: '6M+', label: 'Tableau Public users' },
      { value: '5M+', label: 'Learners' },
      { value: '1M+', label: 'Top skillset listed on LinkedIn' },
    ],
  },
  notes: { source: 'Slide 3', blocks: [marketMomentNotes] } as Notes,
}

/* ------------------------------------------------------------------ */
/* Slide 4 · The Next Market Moment is Here                            */
/* ------------------------------------------------------------------ */

export const marketMoment = {
  title: 'The Next Market Moment is Here',
  subtitle: 'And Tableau is poised to capture this moment and create another market-driving movement',
  unlock: 'GenAI has unlocked a new era of analytics and [[democratized building]]',
  demand: 'But the future of analytics demands trust at scale',
  pillars: ['Governance', 'Security', 'Accuracy', 'Persistence', 'Cost'],
  notes: { source: 'Slide 4', blocks: [marketMomentNotes] } as Notes,
}
