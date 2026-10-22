import type { Notes, Rich } from './types'

/* ------------------------------------------------------------------ */
/* Slide 7 · The Fragmentation of the BI&A Market Landscape            */
/* ------------------------------------------------------------------ */

export interface StackLayer {
  title: string
  detail?: string
  /** The headline (top) layer of a vendor stack is rendered as a primary block. */
  primary?: boolean
}

export interface Vendor {
  name: string
  layers: StackLayer[]
}

export interface Camp {
  id: string
  name: string
  tagline: string
  /** Header color, taken from the slide. */
  color: string
  thesis: Rich[]
  vendors: Vendor[]
  /** The home camp is visually emphasized. */
  home?: boolean
  notes?: Notes
}

const generalNotes = {
  heading: 'About this landscape',
  paragraphs: [
    'Source: Marc Benioff landscape slide (internal); Databricks, Anthropic, Sigma, Hex, Microsoft public announcements (2025–2026).',
    'Landscape rebuilt from the Marc deck format, re-bucketed into five camps, each framed as the play that vendor is running to capture BI.',
    'Loss-leading BI as a feature, for both lakehouses and Power BI, is our read, not vendor statements.',
    'Key movements: Databricks acquired Row Zero (announced Sep 24, 2026); Anthropic launched Claude Dashboards and Motion in beta Oct 8, 2026 (Dashboards can send work to Hex, Sigma and others; Tableau listed as coming soon); Sigma Series E $80M at $3B (May 2026), $200M ARR (Apr 2026); Fabric IQ MCP server GA.',
  ],
}

export const landscape = {
  title: 'The Fragmentation of the BI&A Market Landscape',
  subtitle:
    'As semantics, agents, and apps proliferate, the edge goes to the platform that owns trusted context and meets users in their existing workflow.',
  generalNotes,
  camps: [
    {
      id: 'lakehouses',
      name: 'Lakehouses',
      tagline: 'Analytics as a feature',
      color: '#1C3FD1',
      thesis: [
        'BI/apps as a way to reach business users. Expand TAM through the IT and engineering buyer persona.',
      ],
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
      notes: {
        source: 'Slide 7',
        blocks: [
          {
            heading: 'Lakehouses',
            paragraphs: [
              'Each lakehouse vendor is shown as three layers: governance and data are the core product and the seed with engineering buyers; apps and analytics are bundled on top as a feature.',
            ],
          },
          generalNotes,
        ],
      },
    },
    {
      id: 'frontier-labs',
      name: 'Frontier Labs',
      tagline: 'The experience layer',
      color: '#5B21B6',
      thesis: [
        'Be the front end for visual analysis.',
        'Claude Dashboards serve as the experience layer and use BI tools as the host.',
      ],
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
      notes: {
        source: 'Slide 7',
        blocks: [
          {
            heading: 'Frontier labs',
            paragraphs: [
              'Frontier labs: read the stack bottom-up as the workflow: connect data, prototype in Claude Dashboards, then send to a BI tool. Sigma launch blog (Oct 8, 2026, vendor-authored) describes this as prototype in Claude, send to Sigma, where the draft becomes a governed workbook or app; Send to Sigma needs a Sigma Build license. Claude Help Center says Dashboards are made for quick, exploratory questions and that when a question needs deeper analysis the dashboard can be sent to another tool to continue there; Hex and Sigma are supported and Tableau is listed as coming soon. Framing BI tools as the plumbing behind the ad-hoc layer is our read.',
            ],
          },
          generalNotes,
        ],
      },
    },
    {
      id: 'ai-native',
      name: 'AI-Native Startups',
      tagline: 'Lakehouse-native apps',
      color: '#0B7A6C',
      thesis: [
        'Lakehouse-native AI agents and apps. Serving as the business logic layer above the warehouse.',
      ],
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
            { title: 'Live query · write-back cells' },
          ],
        },
      ],
      notes: {
        source: 'Slide 7',
        blocks: [
          {
            heading: 'AI-native start-ups',
            paragraphs: [
              'AI-native start-ups: the Sigma framing (business-logic layer above the warehouse, apps and agents on top, AI building more of the front end) is paraphrased from a second-hand conversation with a Sigma leader. It is not a published statement and should not be quoted or attributed.',
            ],
          },
          generalNotes,
        ],
      },
    },
    {
      id: 'full-stack',
      name: 'Full-Stack',
      tagline: 'Analytics as a loss leader',
      color: '#0A1E5C',
      thesis: [
        'Power BI is a loss leader to drive Fabric consumption and win data platform share. Moving to Fabric IQ apps and an ontology, bundled with Microsoft 365.',
      ],
      vendors: [
        {
          name: 'Microsoft Power BI + Fabric',
          layers: [
            { title: 'Analytics', detail: 'Power BI, Copilot, Microsoft 365', primary: true },
            { title: 'Fabric IQ', detail: 'Ontology, semantic models, data agents', primary: true },
            { title: 'Data platform', detail: 'OneLake, Direct Lake, Azure', primary: true },
          ],
        },
      ],
      notes: {
        source: 'Slide 7',
        blocks: [
          {
            heading: 'Full stack',
            paragraphs: [
              'Full stack: Power BI has been folded into Microsoft Fabric as its analytics and reporting layer. Premium P-SKU capacities were retired in favor of Fabric F-SKUs billed through Azure; data lands in OneLake (open Delta/Parquet) and Direct Lake lets Power BI read Delta tables without dataset refreshes; ETL, dataflows and Spark can run upstream in Fabric. Existing reports, semantic models and Desktop workflows keep working, and tenants can turn off Fabric item creation. Sources are Microsoft Learn and third-party migration guides. The loss-leader framing is our read, not a Microsoft statement.',
              'For Power BI the support is the $14 Pro price and bundling with Microsoft 365 and Fabric.',
            ],
          },
          generalNotes,
        ],
      },
    },
    {
      id: 'tableau',
      name: 'Tableau',
      tagline: 'Headless, Agentic Platform',
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
            {
              title: 'Semantics + Tableau Knowledge',
              detail: 'Metric contract, agent-ready context',
              primary: true,
            },
            {
              title: 'Flexible platform',
              detail: 'Live + Hyper query, Cloud or Server, 100s of sources',
              primary: true,
            },
          ],
        },
      ],
      notes: {
        source: 'Slide 7',
        blocks: [
          {
            heading: 'Tableau',
            paragraphs: [
              'Tableau emphasis: depth of analytics, platform flexibility, and query federation (live and Hyper).',
            ],
          },
          generalNotes,
        ],
      },
    },
  ] as Camp[],
}
