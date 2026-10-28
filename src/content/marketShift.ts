/* ------------------------------------------------------------------ */
/* Slide 3 · Tableau Democratized Self-Service & Visual Analytics      */
/* ------------------------------------------------------------------ */

export const democratized = {
  title: 'Tableau Democratized Self-Service & Visual Analytics',
  subtitle: 'Capturing a pivotal market moment by turning data into a skillset, a community and a lasting movement',
  past: { period: 'Pre-2003', title: 'Traditional Reporting', lead: '**IT-led** data retrospectives' },
  present: {
    period: '2003+',
    title: 'Self-Service Analytics',
    lead: '**User-driven** data exploration and insight discovery',
    tagline: '5 minutes to magic for *everyone*',
  },
  movement: {
    title: 'Creating a global movement of data professionals',
    community: 'DataFam',
    stats: [
      { value: '34M+', label: 'Users worldwide' },
      { value: '6M+', label: 'Tableau Public users' },
      { value: '5M+', label: 'Learners' },
      { value: '1M+', label: 'Top skillset listed on LinkedIn' },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Slide 4 · Legacy BI: A Linear, Human-Led Process                    */
/* ------------------------------------------------------------------ */

export interface LegacyStage {
  stage: string
  role: string
  points: string[]
}

export const legacyBI = {
  title: 'Legacy BI:',
  titleRest: 'A [[Linear]], [[Human-Led]] Process',
  statement:
    'A [[linear]], [[human-led]] progression between isolated teams [[fractures governance]] and creates [[data silos]], restricting insights to a select few [[data professionals.]]',
  stages: [
    {
      stage: 'Data Prep & Ingestion',
      role: 'Data Engineer',
      points: ['Builds data pipelines', 'Manages schemas and extracts', 'Ingests raw enterprise data'],
    },
    {
      stage: 'Semantic Modeling',
      role: 'Data Engineer',
      points: ['Standardizes business logic', 'Defines enterprise metrics', 'Maps data relationships', 'Creates unified data models'],
    },
    {
      stage: 'Dashboard Authoring',
      role: 'Data Analyst',
      points: ['Builds enterprise dashboards', 'Authors standardized views', 'Translates data into visual insights'],
    },
    {
      stage: 'Analytics Consumption',
      role: 'Business User',
      points: ['Consumes published reports', 'Monitors operational KPIs', 'Drives business decisions'],
    },
  ] as LegacyStage[],
  deadEnd:
    'The **one-way dead end**: insights die in local spreadsheets and raw LLM chats, while Central IT gets zero visibility or reuse',
}

/* ------------------------------------------------------------------ */
/* Slide 5 · Traditional BI & Analytics Personas                       */
/* ------------------------------------------------------------------ */

export type ResponsibilityIcon = 'database' | 'shield' | 'gear' | 'chart' | 'bulb' | 'people' | 'target'

export interface TraditionalPersona {
  role: string
  remit: string
  quote: string
  responsibilities: { icon: ResponsibilityIcon; text: string }[]
  /** "Typical tools" or "Typical experience", as labelled on the slide. */
  toolsLabel: string
  tools: string[]
  tone: 'blue' | 'violet' | 'green'
}

export const traditionalPersonas = {
  title: 'Traditional BI & Analytics Personas',
  subtitle: 'Understanding the distinct roles and responsibilities in the traditional analytics lifecycle',
  personas: [
    {
      role: 'Data Engineer',
      remit: 'Builds & manages the data foundation',
      quote: '“How do I get our data clean, reliable, and ready for reporting?”',
      responsibilities: [
        { icon: 'database', text: 'Manages data pipelines, warehouse schemas, and extracts' },
        { icon: 'shield', text: 'Ensures data quality, security and governance' },
        { icon: 'gear', text: 'Builds and maintains data infrastructure for central reporting' },
      ],
      toolsLabel: 'Typical tools',
      tools: ['Snowflake', 'Databricks', 'SQL', 'AWS'],
      tone: 'blue',
    },
    {
      role: 'Data Analyst',
      remit: 'Creates & shares insights',
      quote: '“How do I turn data into clear insights and dashboards for my business teams?”',
      responsibilities: [
        { icon: 'chart', text: 'Cleans, explores and models data' },
        { icon: 'bulb', text: 'Authors dashboards and standardized reports' },
        { icon: 'people', text: 'Answers ad-hoc questions and shares insights' },
      ],
      toolsLabel: 'Typical tools',
      tools: ['Tableau', 'Excel', 'SQL'],
      tone: 'violet',
    },
    {
      role: 'Business User',
      remit: 'Consumes reports & monitors performance',
      quote: '“How can I quickly find the information I need to make better decisions?”',
      responsibilities: [
        { icon: 'chart', text: 'Consumes static dashboards and reports' },
        { icon: 'target', text: 'Monitors key business metrics and operational KPIs' },
        { icon: 'people', text: 'Asks questions of analysts for additional insights' },
      ],
      toolsLabel: 'Typical experience',
      tools: [],
      tone: 'green',
    },
  ] as TraditionalPersona[],
  statement: 'A linear, specialized workflow from data pipeline management to static dashboard consumption.',
}

