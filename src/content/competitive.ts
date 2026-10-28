/* ------------------------------------------------------------------ */
/* Slide 20 · The Four Competitive Frontiers of Data & Analytics       */
/* ------------------------------------------------------------------ */

export interface StackLayer {
  title: string
  detail?: string
  primary?: boolean
}

export interface Vendor {
  name: string
  /** Stacked layers (lakehouses, labs, startups, Tableau). */
  layers?: StackLayer[]
  /** Product chips (hyperscalers). */
  chips?: string[]
}

export interface Frontier {
  id: string
  name: string
  tagline: string
  color: string
  thesis: string[]
  vendors: Vendor[]
  home?: boolean
}

export const frontiers: Frontier[] = [
  {
    id: 'lakehouses',
    name: 'Lakehouses',
    tagline: 'Building up into analytics',
    color: '#1C3FD1',
    thesis: ['BI/apps as a way to reach business users. Expand TAM through the IT and engineering buyer persona.'],
    vendors: [
      {
        name: 'Databricks',
        layers: [
          { title: 'Analytics', detail: 'Genie One, AI/BI, Apps', primary: true },
          { title: 'Unity Catalog · governance' },
          { title: 'Lakehouse · Delta Lake' },
        ],
      },
      {
        name: 'Snowflake',
        layers: [
          { title: 'Analytics', detail: 'Intelligence, agents, apps', primary: true },
          { title: 'Horizon · Semantic Views' },
          { title: 'Data platform · Data Cloud' },
        ],
      },
    ],
  },
  {
    id: 'frontier-labs',
    name: 'Frontier Labs',
    tagline: 'Surface layer building down',
    color: '#5B21B6',
    thesis: ['Be the front end for visual analysis.', 'Claude Dashboards serve as the experience layer and use BI tools as the host.'],
    vendors: [
      {
        name: 'Anthropic (Claude, Claude Code)',
        layers: [
          { title: 'Publish to BI tools', detail: 'Sigma, Hex; Tableau host', primary: true },
          { title: 'Claude Dashboards', detail: 'Prototype, ad-hoc dashboards', primary: true },
          { title: 'Connect data', detail: 'Warehouse, CRM via MCP', primary: true },
        ],
      },
    ],
  },
  {
    id: 'ai-native',
    name: 'AI-Native Startups',
    tagline: 'Lakehouse-native apps',
    color: '#0B7A6C',
    thesis: ['Lakehouse-native AI agents and apps. Serving as the business logic layer above the warehouse.'],
    vendors: [
      {
        name: 'Sigma',
        layers: [
          { title: 'Agentic apps', detail: 'Spreadsheet UI, vertical apps', primary: true },
          { title: 'Warehouse-native data models' },
          { title: 'Warehouse · live + write-back' },
        ],
      },
      {
        name: 'Hex',
        layers: [
          { title: 'Notebooks + agents', detail: 'Conversational Q&A, data apps', primary: true },
          { title: 'Agent context + evals' },
          { title: 'Live query' },
        ],
      },
    ],
  },
  {
    id: 'hyperscalers',
    name: 'Hyper-Scaler Full-Stack',
    tagline: 'Analytics as a loss leader',
    color: '#0A1E5C',
    thesis: [
      'Hyperscalers use analytics as a loss leader to drive cloud consumption, bundling AI apps and semantic layers directly into their enterprise ecosystems.',
    ],
    vendors: [
      { name: 'Microsoft Power BI + Fabric', chips: ['Analytics', 'FabricIQ', 'Data Platform'] },
      { name: 'Google', chips: ['Gemini', 'Looker', 'BigQuery'] },
      { name: 'AWS', chips: ['Amazon Q', 'QuickSight', 'AWS Services'] },
    ],
  },
  {
    id: 'tableau',
    name: 'Tableau',
    tagline: 'Open, Agentic Platform',
    color: '#0176D3',
    home: true,
    thesis: [
      'Best of breed analytics, platform flexibility and query federation to analyze data anywhere and deliver it to any agentic surface.',
    ],
    vendors: [
      {
        name: 'Tableau',
        layers: [
          { title: 'Agentic analytics', detail: 'Studio, Data Apps, VizQL, Headless', primary: true },
          { title: 'Semantics + Tableau Knowledge', detail: 'Metric contract, agent-ready context', primary: true },
          { title: 'Flexible platform', detail: 'Live + Hyper query, Cloud or Server, 100s of sources', primary: true },
        ],
      },
    ],
  },
]

export const frontiersSlide = { title: 'The Four Competitive Frontiers of Data & Analytics' }

/* ------------------------------------------------------------------ */
/* Slides 21–24 · One slide per frontier: why we win / lose, stories   */
/* ------------------------------------------------------------------ */

export interface Story {
  /** Customer shown on the slide (rendered as a wordmark), or omitted for a placeholder. */
  customer?: string
  points: string[]
}

export interface FrontierDetail {
  id: string
  frontier: string
  title: string
  subtitle: string
  win: string[]
  lose: string[]
  winStory: Story
  lossStory: Story
}

export const frontierDetails: FrontierDetail[] = [
  {
    id: 'lakehouses-detail',
    frontier: 'lakehouses',
    title: 'Lakehouses',
    subtitle: 'Building up into analytics from the cloud data lakehouse layer',
    win: ['Hyper extracts', 'Zero-copy access', 'Predictable TCO', 'Centralized governance', 'Best-in-class visual exploration'],
    lose: ['Extract dependency', 'Developer pipelines', 'Analytics price sensitivity'],
    winStory: {
      customer: 'indeed',
      points: [
        'Tableau Next win over Snowflake Analytics',
        '“Black Box” problem required visual lineage and proactive, push-based insights in the flow of work',
      ],
    },
    lossStory: { points: ['xx'] },
  },
  {
    id: 'frontier-labs-detail',
    frontier: 'frontier-labs',
    title: 'Frontier Labs',
    subtitle: 'Expanding from raw natural language surfaces into business decision workflows',
    win: ['Trusted metrics & lineage', 'Enterprise security', 'Knowledge Graph', 'Tableau MCP'],
    lose: ['Prompt extensibility', 'Conversational speed / latency', 'Limited customizable AI/BI agents', '“AI-first” mandates'],
    winStory: {
      customer: 'CVS Health',
      points: [
        'Selected Cloud+ over Broadcaster (internal build on Claude)',
        'Decision driven by AI economics (49K users at un-metered, predictable costs) and accuracy (Broadcaster at 80% but Tableau raised it to 95%)',
      ],
    },
    lossStory: { points: ['xx'] },
  },
  {
    id: 'ai-native-detail',
    frontier: 'ai-native',
    title: 'AI-Native Startups',
    subtitle: 'Capturing edge agility with modern code-first notebooks, spreadsheets, and agentic apps',
    win: ['Completeness of platform', 'Knowledge Graph', 'Enterprise scale and predictable pricing', 'Governed metric definitions'],
    lose: ['Loss of deal momentum in specialized verticals, particularly in SMB', 'Spreadsheet UX & Write-back', 'Code-first agent loop'],
    winStory: {
      customer: 'experian',
      points: [
        'Server renewal to Cloud Plus upgrade  against Sigma and Thoughtspot',
        'Competitive POC across two high-impact use cases proved value of a versatile, connected platform',
      ],
    },
    lossStory: {
      customer: 'FOX ONE',
      points: [
        'Signed 2 year Hex contract (analytics layer) with Atlan (context layer) and Databricks replacing Snowflake',
        'Migration accelerated by SI partner commitments and key C-suite relationships',
      ],
    },
  },
  {
    id: 'hyperscalers-detail',
    frontier: 'hyperscalers',
    title: 'Hyper-Scaler Full-Stacks',
    subtitle: 'Leveraging cloud contract scale and zero-cost bundling to commoditize BI',
    win: ['Open, multi-cloud, agentic platform', 'Visual depth & simplicity', 'CRM & Workflow native', 'Frustration with compute “lock-in”'],
    lose: ['Price', 'Frictionless integration with M365', 'Spend commits'],
    winStory: {
      customer: 'Burberry',
      points: ['Reversed PBI decision by making a case on architecture, TCO and data democratization', 'Partnered with Core to win over CIO.'],
    },
    lossStory: {
      customer: 'Bristol Myers Squibb',
      points: [
        'Consolidation to Power BI for cost savings',
        'Server account with reluctance to migrate to Cloud',
        'Accenture and Analytics team advocated for Power BI',
      ],
    },
  },
]

/* ------------------------------------------------------------------ */
/* Slides 25–26 · Head-to-head capability comparisons                  */
/* ------------------------------------------------------------------ */

/** 0 None · 1 Basic · 2 Partial · 3 Strong · 4 Leading */
export type Score = 0 | 1 | 2 | 3 | 4

export interface ComparisonRow {
  name: string
  /** [Tableau, competitor] */
  scores: [Score, Score]
  evidence: string
}

export interface Comparison {
  id: string
  competitor: string
  title: string
  subtitle: string
  groups: { name: string; rows: ComparisonRow[] }[]
}

export const legend: { score: Score; label: string }[] = [
  { score: 0, label: 'None' },
  { score: 1, label: 'Basic' },
  { score: 2, label: 'Partial' },
  { score: 3, label: 'Strong' },
  { score: 4, label: 'Leading' },
]

export const comparisons: Comparison[] = [
  {
    id: 'hex-comparison',
    competitor: 'Hex',
    title: 'Hex: Market Capability Comparison',
    subtitle: 'Hex wins with the developer persona; Tableau on platform breadth.',
    groups: [
      {
        name: 'Go-to-market',
        rows: [
          { name: 'Installed base and reach', scores: [3, 1], evidence: 'Hex largely restricted to SMB / developer persona.. Minimal competitive overlap today.' },
          { name: 'Pricing and packaging', scores: [2, 3], evidence: 'Tableau charges viewers; Hex =  compute + tokens' },
          { name: 'Data and AI platform partnerships', scores: [2, 3], evidence: 'Hex: Snowflake Elite + deeply integrated with Databricks.' },
        ],
      },
      {
        name: 'Agentic analytics',
        rows: [
          { name: 'Visual analytics / dashboards', scores: [4, 2], evidence: 'Tableau: VizQL depth; Hex: chart-centric, steep learning curve  for non-developer' },
          { name: 'MCP and workplace surfaces', scores: [3, 3], evidence: 'Tableau has  broader reach + app integrations.' },
          { name: 'Conversational analytics', scores: [2, 4], evidence: 'Hex shares, explores, reuses; Tableau lacks exploration' },
          { name: 'AI apps and actions', scores: [2, 4], evidence: 'Tableau apps not GA; Hex is market leader, built on unified SQL/Python notebook' },
          { name: 'Spreadsheet-native UI', scores: [1, 1], evidence: 'Both offer rudimentary tabular analysis capabilities' },
        ],
      },
      {
        name: 'Semantics and Knowledge',
        rows: [
          { name: 'Native semantic / metrics layer', scores: [2, 3], evidence: 'Hex: sync, YAML, workbench; Tableau NEXT restricted to Data Cloud D360)' },
          { name: 'Knowledge, context, and observability', scores: [2, 4], evidence: 'Hex Context Studio incl. evals; Tableau Knowledge new to maret' },
        ],
      },
      {
        name: 'Data platform',
        rows: [
          { name: 'Data source connectivity', scores: [4, 1], evidence: 'Tableau 100+ connectors; Hex: cloud warehouses' },
          { name: 'In-memory engine', scores: [4, 0], evidence: 'Tableau HYPER; Hex is in-database only' },
          { name: 'Governance and security', scores: [4, 3], evidence: 'Tableau has broader connectivity /auth methods. Richer permissioning / access control.' },
          { name: 'Lakehouse integration', scores: [2, 3], evidence: 'Hex run Cortex, AI functions in-warehouse' },
          { name: 'Write-back and input tables', scores: [0, 2], evidence: 'Hex Writeback cells' },
        ],
      },
    ],
  },
  {
    id: 'power-bi-comparison',
    competitor: 'Power BI',
    title: 'Power BI: Market Capability Comparison',
    subtitle: 'Power BI leads on pricing; Tableau on breadth.',
    groups: [
      {
        name: 'Go-to-market',
        rows: [
          { name: 'Installed base and reach', scores: [3, 4], evidence: 'Power BI bundled with Microsoft 365' },
          { name: 'Pricing and packaging', scores: [2, 4], evidence: 'Tableau charges viewers; Power BI perceived as ‘free’' },
          { name: 'Data and AI platform partnerships', scores: [2, 1], evidence: 'Power BI is Azure only. Tableau has lost partnership momentum, but considered agnostic' },
        ],
      },
      {
        name: 'Agentic analytics',
        rows: [
          { name: 'Visual analytics / dashboards', scores: [4, 3], evidence: 'Tableau: VizQL depth' },
          { name: 'MCP and workplace surfaces', scores: [3, 2], evidence: 'Tableau widest reach; PBI: Teams only' },
          { name: 'Conversational analytics', scores: [2, 3], evidence: 'Tableau lacks exploration' },
          { name: 'AI apps and actions', scores: [2, 2], evidence: 'Tableau apps not GA + Fabric apps are exclusive to MSFT Fabric' },
          { name: 'Spreadsheet-native UI', scores: [1, 3], evidence: 'Power BI full interoperability with Excel. Tableau with extensions and 3rd party apps' },
        ],
      },
      {
        name: 'Semantics and Knowledge',
        rows: [
          { name: 'Native semantic / metrics layer', scores: [2, 2], evidence: 'Tableau NEXT limited to Data 360 workloads (CDP). Power BI limited to MSFT Fabric' },
          { name: 'Knowledge, context, and observability', scores: [2, 1], evidence: 'Tableau Knowledge is newly GA. Fabric IQ is ‘Preview’' },
        ],
      },
      {
        name: 'Data platform',
        rows: [
          { name: 'Data source connectivity', scores: [4, 3], evidence: 'Tableau 100+ connectors. Power BI ‘live query’ optimized for Fabric workloads' },
          { name: 'In-memory engine', scores: [4, 4], evidence: 'Tableau, Power BI own engines' },
          { name: 'Governance and security', scores: [4, 4], evidence: 'Both platforms offer rich governance controls' },
          { name: 'Lakehouse integration', scores: [2, 3], evidence: 'PBI deeply integrated with MSFT Fabric. Tableau offers broad connectivity, loosely integrated' },
          { name: 'Write-back and input tables', scores: [0, 1], evidence: 'Power BI offers baseline writeback capabilities' },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Slide 27 · FY28 Product Strategy                                    */
/* ------------------------------------------------------------------ */

export const productStrategy = {
  title: 'FY28 Product Strategy',
  trends: {
    title: 'Key Market Trends',
    items: [
      {
        title: 'Customers want predictable usage',
        detail: 'As LLMs and Al shifts the market to consumption-based models, buyers fear runaway costs. An unmetered offer is a clear differentiator.',
      },
      {
        title: 'AI is becoming a primary consumer of analytics',
        detail: 'Human and Al use-cases fit per-seat pricing; autonomous Al needs capacity-based pricing, not per-seat or consumption.',
      },
      {
        title: 'Product bundling makes adoption the battleground',
        detail: 'Competitors (MSFT, Snowflake) now bundle analytics as table stakes features  - raising the bar on adoption as the driver of platform stickiness.',
      },
    ],
  },
  investment: {
    title: 'Product Investment',
    subtitle: 'Where we invest to win the analytics layer',
    items: [
      { label: 'Knowledge', headline: 'Activate Tableau estate to raise conversational analytics accuracy and preserve governance', detail: 'Tab Knowledge, Analyst Command Center,' },
      { label: 'Decision', headline: 'Turning analytics into meaningful and confident business actions.', detail: 'Conversational Analytics in Core/Next, Proactive Insights, Solve, Studio' },
      { label: 'Headless', headline: 'Agents in the flow of work are smarter with Tableau', detail: 'Tab MCP, Integration Users, Next in Teams, Skills in Slack' },
      { label: 'Platform', headline: 'Deliver unrivaled trust, availability, and connectivity.', detail: 'Performance, ACRC, Azure and GCP Private Connect, Guest Access in Cloud, Interoperability CRMA/Next' },
    ],
  },
  levers: {
    title: 'P&P Levers',
    subtitle: 'How we capture value',
    items: [
      { label: 'Capacity Offerings', headline: 'Move beyond PUPM, which creates friction as Tab expands W2W to broader audiences', detail: 'Newly available for Tableau Cloud; FY28 for Tableau Next.' },
      { label: 'Autonomous Agentic P+P', headline: 'Evolve pricing from the SaaS era to the agentic era to capture revenue from autonomous enterprise-Al workloads', detail: 'Headless BI for Tableau Cloud and Tableau Next' },
      { label: 'Bundling & Premium Edition Value', headline: 'Bundles and premium editions open a clear upsell path, delivering differentiated value', detail: 'Bundling w/SF Products, Optimize Cloud+ and Server+' },
      { label: 'Portfolio Simplification', headline: 'Increase seller focus by simplifying legacy offerings and role types, reducing complexity and shortening deal cycles.', detail: 'Ex: Embedded, Explorer, UBL, Display, etc.' },
    ],
  },
}

