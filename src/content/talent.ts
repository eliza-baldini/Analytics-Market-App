/* ------------------------------------------------------------------ */
/* Slide 29 · Evolving our Operating Model                             */
/* ------------------------------------------------------------------ */

export const operatingModel = {
  title: 'Evolving our Operating Model',
  subtitle: 'As we transform into an agentic-driven delivery organization, our operating model evolves across multiple facets',
  facets: [
    { title: 'Team Structure', detail: 'We continue fostering our agile delivery model while embracing agentic-driven rapid innovation teams.' },
    { title: 'Delivery Cadence', detail: 'We increase the frequency of our feature releases to meet the expectations of our customers for new capabilities.' },
    { title: 'Development Methodology', detail: 'We harness the lessons learned from our rapid innovation bets to make every team an agentic enterprise team.' },
    { title: 'Performance Metrics', detail: 'We obsess over performance, and make the decisions necessary to meet and exceed our organizational goals.' },
    { title: 'Product Inspections', detail: 'We take the time to inspect the product to ensure it meets the needs and standards of our customers.' },
  ],
}

/* ------------------------------------------------------------------ */
/* Slide 30 · Product & Engineering Standards & Expectations           */
/* ------------------------------------------------------------------ */

export const standards = {
  title: 'Tableau’s Product & Engineering',
  titleSecond: 'Standards & Expectations',
  values: ['Focused Execution', 'Rapid Pace & Urgency', 'Invested & Care', 'Everyone’s Building', 'Customer Obsessed', 'Community Obsessed'],
  statement: 'We do not tolerate people that do not meet these baseline standards and expectations.',
}

/* ------------------------------------------------------------------ */
/* Slide 31 · Analytics T&P P0 Priorities                              */
/* ------------------------------------------------------------------ */

export const priorities = {
  title: 'Analytics T&P P0 Priorities',
  columns: ['Initiative', 'Metrics'],
  rows: [
    { initiative: 'Performance & Customer Experience', metrics: 'Availability, Dashboard EPT' },
    { initiative: 'Customer Zero Success', metrics: 'Field Adoption' },
    { initiative: 'Tableau Knowledge', metrics: 'GA, Customer Stories' },
    { initiative: 'Conversational Analytics', metrics: 'GA, MAU, Customer Stories' },
    { initiative: 'Generative Data Apps', metrics: 'GA, Customer Stories' },
    { initiative: 'Org Health & Innovative Development Process', metrics: 'Performance-Driven Delivery' },
    { initiative: 'Strategic Technology Partnerships', metrics: 'Tier 1 Launch, Pipeline' },
    { initiative: 'TabNext + CRMA Adoption', metrics: 'MAU' },
    { initiative: 'Tableau Agentic Data Engine', metrics: '3 Pillar Plan, Escalations/Sev1' },
    { initiative: 'Tableau Studio & Skills', metrics: 'GA, Customer Stories' },
    { initiative: 'Proactive Intelligence: Beacon / Inspector', metrics: 'GA, Customer Stories' },
  ],
}

/* ------------------------------------------------------------------ */
/* Slide 32 · Spec-Driven Development – Agentic Transformation         */
/* ------------------------------------------------------------------ */

export const specDriven = {
  title: 'Spec-Driven Development – Agentic Transformation',
  subtitle: 'From idea to customer in 30 days, powered by AI-native teams',
  phases: [
    { title: '1. Spec & Plan', days: 'Days 1–5', detail: 'Define spec, validate with design partners' },
    { title: '2. Build', days: 'Days 6–10', detail: 'AI skills, architecture, security & performance' },
    { title: '3. Harden', days: 'Days 11–20', detail: 'Dogfood, perf baselines, security review' },
    { title: '4. Ship', days: 'Days 21–30', detail: 'Staged rollout\n20% → 60% → 100%' },
  ],
  models: {
    title: 'Two AI-Native Team Models',
    subtitle: 'Match the team structure to the type of work and speed required.',
    items: [
      {
        title: 'Agentic Incubation POD',
        subtitle: 'Explore, validate, and innovate',
        team: 'One-pizza team',
        roles: ['PM', 'UX', 'Eng', 'Eng', 'Eng'],
        points: [
          'New / unvalidated use cases',
          'Self-contained work (minimal dependencies)',
          'Named customer to drive real-time feedback',
          'Dedicated resources for rapid delivery & pivots',
        ],
        summary: 'One-pizza PM + UX + Eng, free to pivot based on customer learning',
        tone: 'blue',
      },
      {
        title: 'Agentic Scrum Team',
        subtitle: 'Deliver scoped product work at scale',
        team: 'Scrum team',
        roles: ['', '', '', '', ''],
        points: [
          'Scoped work from product roadmap',
          'May depend on multiple teams / organizations',
          'Established team for a known product area',
          'Well-defined spec and requirements',
          'Used for larger / more complex initiatives',
        ],
        summary: 'Cross-functional team with clear spec, delivering on the 30-day cycle',
        tone: 'green',
      },
    ],
  },
  org: {
    title: 'Engineering Organization',
    detail: 'Flatter structure with only 3 managers between individual contributors and EVP, enabling faster decisions and execution.',
    levels: [
      { title: 'Sireesh', detail: 'EVP Engineering', tone: 'navy' },
      { title: 'SVP / VP', detail: 'Functional Leaders', note: '(e.g., Product, Platform, Infra, etc.)', tone: 'sky' },
      { title: 'Sub Functional Leaders', tone: 'violet' },
      { title: 'First Line Managers', tone: 'orange' },
      { title: 'Engineers (ICs)', tone: 'plain' },
    ],
    managers: { value: '3', label: 'managers between IC and EVP' },
  },
}

/* ------------------------------------------------------------------ */
/* Slide 33 · Target Reinvestment: Rapid Innovation                    */
/* ------------------------------------------------------------------ */

export const reinvestment = {
  title: 'Target Reinvestment: Rapid Innovation',
  banner: 'Rapid Innovation',
  moves: [
    {
      title: 'Infuse External Talent',
      detail: 'Reinvest in Seattle with AI T&P Talent (replicate Builder motion from distribution); Continued investment in Israel',
    },
    {
      title: 'Surge Hyper Data Platform',
      detail: 'And unlock economic benefits for customers (30% of customer issues; 116 HC →71 HC since FY24)',
    },
    { title: 'Surge Tableau Semantics & Knowledge', detail: 'Accelerating Tableau Knowledge, Core Semantic Layer' },
    { title: 'Surge Tableau Studio', detail: '(in tandem with Anthropic partnership) unlocking new logo motion, developer persona' },
  ],
  figures: [
    { value: '-45', label: 'Remove positions' },
    { value: '+50', label: 'Headcount in Hyper Data Platform' },
    { value: '+25', label: 'Headcount in Tableau Context Layer' },
    { value: '+20', label: 'Headcount in Tableau Studio & Public Transformation' },
  ],
  footnote: 'Moratorium from hiring freeze to enable talent & accelerate GM 2.0 model',
}
