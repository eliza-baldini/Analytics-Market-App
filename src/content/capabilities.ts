import type { NoteBlock } from './types'

/* ------------------------------------------------------------------ */
/* Slide 14 · Market Capability Comparison                             */
/* ------------------------------------------------------------------ */

/** 0 None · 1 Basic · 2 Partial · 3 Strong · 4 Leading */
export type Score = 0 | 1 | 2 | 3 | 4

export const vendors = ['Tableau', 'Hex', 'Sigma', 'Power BI'] as const

export interface CapabilityRow {
  id: string
  name: string
  /** Scores in vendor order: Tableau, Hex, Sigma, Power BI. */
  scores: [Score, Score, Score, Score]
  evidence: string
  /** Row rationale from the speaker notes (verbatim). */
  notes?: string[]
}

export interface CapabilityGroup {
  name: string
  rows: CapabilityRow[]
}

export const legend: { score: Score; label: string }[] = [
  { score: 0, label: 'None' },
  { score: 1, label: 'Basic' },
  { score: 2, label: 'Partial' },
  { score: 3, label: 'Strong' },
  { score: 4, label: 'Leading' },
]

export const capabilities = {
  title: 'Market Capability Comparison',
  subtitle: 'Sigma, Hex lead on agents; Sigma on write-back; Power BI on pricing; Tableau on breadth.',
  generalNotes: [
    {
      heading: 'Methodology',
      paragraphs: [
        'Directional assessment: public docs, vendor announcements and internal compete materials. Validate with Product before external use.',
        'Scoring is a directional, qualitative assessment. Tableau baseline reflects the internal "Spreadsheet Analytics Native to the Lakehouse" scoring (spreadsheet UI, write-back and agentic experiences are gaps; viz and governance are strengths). Hex and Sigma scores reflect public product docs and 2026 release notes; Power BI reflects Microsoft Learn and Build 2026 announcements. Sigma MCP build step and Hex extracts claims should be re-verified before external use.',
        'See the rationale file for the full workings.',
      ],
      link: {
        label: 'See Wills’ stream-of-thought reasoning for harvey balls in this MD file',
        url: 'https://docs.google.com/document/d/1Qz5zkhBAlXGEEx7ZCcq4XazQhkRJd39-lStdFdbIhlA/edit?usp=sharing',
      },
    },
  ] as NoteBlock[],
  groups: [
    {
      name: 'Go-to-market',
      rows: [
        {
          id: 'installed-base',
          name: 'Installed base and reach',
          scores: [3, 1, 2, 4],
          evidence: 'Power BI bundled with Microsoft 365',
        },
        {
          id: 'pricing',
          name: 'Pricing and packaging',
          scores: [2, 3, 3, 4],
          evidence: 'Tableau charges viewers; Sigma near-free; Hex + compute',
          notes: [
            'Pricing and packaging row: scored on total cost for a broad rollout (builders plus viewers), 2/3/3/4; sales motion (product-led, department-led, bundled) is folded into this row rather than scored separately. Tableau charges for every viewer; Sigma viewers are free or near-free (AWS listing $0; battlecard $0-800 per year) but Sigma adds a platform fee and higher builder seats; Hex Team is $75 per editor per month with unlimited users and no seat charge for viewers (Hex pricing page as of Feb 17, 2026; Enterprise adds an Explorer seat add-on). Caveat: viewers can only open apps and shared threads; asking questions in Threads, Slack or MCP needs a paid Explorer seat or higher, and Explorer pricing on Team is unconfirmed. Larger compute is pay-as-you-go and some agent features sit in higher tiers, so spend is less predictable. Tableau and Sigma figures are third-party or internal-battlecard, not official list prices; Hex figures should be re-checked against the live pricing page.',
          ],
        },
        {
          id: 'partnerships',
          name: 'Data and AI platform partnerships',
          scores: [2, 3, 4, 1],
          evidence: 'Sigma: both awards; Hex: Snowflake Elite',
          notes: [
            'Data and AI platform partnerships row (2/3/4/1; owner judgment): Sigma won 2026 Snowflake BI Product Partner of the Year and 2026 Databricks ISV BI Partner of the Year and is the most tightly coupled to the lakehouse vendors; Hex is a Snowflake Elite partner (2026 Snowflake Product Partner of the Year for Agentic Analytics) with deep integrations but no BI partner award; Tableau was historically strong but has faded and is late to frontier-lab launches such as Claude Dashboards (no recent BI partner award found; confirm with alliances); Power BI is tied to the Microsoft cloud.',
          ],
        },
      ],
    },
    {
      name: 'Agentic analytics',
      rows: [
        {
          id: 'visual',
          name: 'Visual analytics / dashboards',
          scores: [4, 2, 2, 3],
          evidence: 'Tableau: VizQL depth; Hex, Sigma chart-centric',
          notes: [
            'Visual analytics / dashboards row (4/2/2/3, proposed): native visual and dashboard authoring. Tableau Studio allows last-mile analytics: unlimited flexibility, visual extensions and the VizQL grammar for authoring that people and agents can both edit. Power BI has a finite set of templates, and matching the flexibility of Tableau takes coding (for example Deneb and Vega-Lite), with limited visual exploration. Hex does not focus on visual breadth: visuals sit alongside an insight rather than telling a visual story (no-code chart cells and Explore, Python for custom needs). Sigma is predominantly spreadsheet and action focused, with less emphasis on visual dashboards or storytelling (standard chart set, pixel-perfect reporting in beta).',
          ],
        },
        {
          id: 'mcp',
          name: 'MCP and workplace surfaces',
          scores: [3, 3, 3, 2],
          evidence: 'Tableau widest reach; Sigma, Hex author; PBI: Teams only',
          notes: [
            'MCP and workplace surfaces row (3/3/3/2; Sigma set to 3 and Power BI to 2 by the deck owner, earlier draft 3/3/4/3): the Sigma MCP server can author (build workbooks, take screenshots) as well as search, describe and query, and can call Sigma agents that run action tools; Tableau authoring MCP is still in beta. Tableau has a hosted MCP service on Tableau Cloud with 14 tool groups (content, admin, Pulse, Knowledge) plus a self-deployed open-source server covering Cloud and Server, a Slack MCP-powered Slackbot and Pulse, and the Tableau app for Microsoft 365 (Teams tabs, DMs, meetings). Hex MCP (beta; search projects, run Threads, create and edit projects and cells for Editor+) and a Slack agent, Explorer role or higher. Sigma and Hex are vendor-hosted only. Power BI Fabric IQ MCP (GA, read-only, Entra sign-in), local authoring MCP GA, remote authoring preview, native Teams embedding, no official Slack or Google app found. Google Workspace not found for any vendor.',
            'Why Tableau has the widest reach: it is the only vendor with official surfaces in both Slack (Pulse in Slack, MCP-powered Slackbot) and Teams (Tableau app for Microsoft 365: tabs, DMs, meetings, Word and PowerPoint), has the most MCP tool groups (14), and offers hosted plus self-deployed MCP so Tableau Server customers are covered; Hex has a Slack agent only, Sigma has Slack plus Teams messages from agents but no Teams app found, and Power BI has Teams but no official Slack app.',
          ],
        },
        {
          id: 'conversational',
          name: 'Conversational analytics',
          scores: [2, 4, 3, 3],
          evidence: 'Hex shares, explores, reuses; Tableau lacks exploration',
          notes: [
            'Conversational analytics row (2/4/3/3): Hex Threads is grounded in semantic models and can be limited to endorsed data, opens as a notebook, surfaces existing apps, opens results in Explore, can be shared with the data team and runs in Slack or via MCP; Sigma Assistant (launched May 2026) answers from data models and certified metrics with inspectable steps and SQL; Power BI standalone Copilot is in preview and needs F2+/P1+ capacity and prepared models; Tableau has Tableau Agent and agents on dashboards, and MCP as a bolt-on, with no built-in exploration or shareable conversations.',
          ],
        },
        {
          id: 'ai-apps',
          name: 'AI apps and actions',
          scores: [2, 3, 4, 2],
          evidence: 'Sigma: apps, actions, approvals; Tableau apps not GA',
          notes: [
            'AI apps and actions row (2/3/4/2; merges the former agents-that-take-action and app-building rows): Sigma leads with prompt-to-app, governed write-back via input tables, Actions (Salesforce, Slack, custom API, Python) and scheduled agents with human approval and audit trail (vendor claims, Sigma AI Applications page); Hex has generative data apps, a notebook agent and Writeback cells; Tableau Data Apps work (built in Claude, hosted on Tableau) but are not yet GA (deck owner); Power BI Fabric Apps with write-back are coming in preview.',
          ],
        },
        {
          id: 'spreadsheet',
          name: 'Spreadsheet-native UI',
          scores: [1, 1, 4, 3],
          evidence: 'Sigma: spreadsheet on live data; Power BI via Excel',
          notes: [
            'Spreadsheet native UI row (1/1/4/3, proposed): native spreadsheet-style analytics on live warehouse data. Sigma is a spreadsheet interface that compiles to warehouse SQL, with Excel-style formulas and drag-and-drop pivots (mostly vendor sources); Power BI has no native spreadsheet but strong Excel integration (Analyze in Excel, PivotTables and connected tables over semantic models, with a 500,000-row cap on export with live connection); Hex has no-code Pivot cells and tables inside a notebook; Tableau has no native spreadsheet interface (table calculations and LOD expressions stand in for formulas; internal baseline lists it as a gap).',
          ],
        },
      ],
    },
    {
      name: 'Semantics and metrics',
      rows: [
        {
          id: 'semantic-layer',
          name: 'Native semantic / metrics layer',
          scores: [2, 3, 3, 2],
          evidence: 'Hex: sync, YAML, workbench; Tableau: Next only',
          notes: [
            'Native semantic / metrics layer row (2/3/3/2): Hex has a Modeling Workbench with a YAML specification for authoring semantic models, plus Semantic Model Sync from dbt MetricFlow, Cube and Snowflake Semantic Views (sync is beta); Sigma has its own data models and integrates with Snowflake Semantic Views and dbt, with Databricks sync per the deck owner (Semantic Views blog dated June 2025, then in development; verify current status); Power BI semantic models are mature (DAX measures, RLS, XMLA endpoint with DAX and MDX queries, feeding Fabric IQ) but limited to Fabric and Microsoft, with little import or sync from other semantic layers, so scored 2 by the deck owner: capability is mature but the layer is predominantly closed off to the Microsoft ecosystem (the XMLA endpoint allows third-party read access); Tableau has Tableau Semantics and a published data source API, but Semantics is part of Tableau Next and Tableau+ with Data 360, so it is available to a minority of customers today.',
          ],
        },
        {
          id: 'knowledge',
          name: 'Knowledge, context, and observability',
          scores: [2, 4, 2, 1],
          evidence: 'Hex Context Studio incl. evals; Tableau Knowledge new',
          notes: [
            'Knowledge, context and observability row (2/4/2/1): Hex Context Studio is one product that unifies context (table metadata, endorsed tables, guides, semantic models, repos, connected apps, published work), makes every answer observable across Hex, Slack, MCP and CLI, improves with use through a Review Agent and Suggestions, and tests and gates changes with Evals (Aug 2026), so Hex scores 4. Sigma has agent profiles with feedback, errors and execution logs plus an AI usage dashboard, but no eval suite found. Sigma has AI context for data models (beta, hand-authored text instructions) and agent profiles with feedback, errors, execution logs and an AI usage dashboard; Tableau Knowledge was just released (GA in Tableau Cloud Oct 1, 2026) and calibration batch-tests golden questions, so Tableau is a 2; the Power BI Fabric IQ ontology is in preview and sits above Fabric semantic models, not within Power BI, and no eval or answer-quality observability was found, so Power BI is a 1.',
            'Evals detail (part of the combined knowledge, context and observability row): Hex shipped Evals in Aug 2026 (scheduled suites with a judge and numeric checks against SQL); Tableau calibration batch-tests curated golden questions but does not score multi-step threads; Sigma and Power BI scores are low-confidence placeholders because no public eval suite was found, and need Product validation.',
          ],
        },
      ],
    },
    {
      name: 'Data platform',
      rows: [
        {
          id: 'connectivity',
          name: 'Data source connectivity',
          scores: [4, 1, 1, 3],
          evidence: 'Tableau 100+ connectors; Hex, Sigma: cloud warehouses',
          notes: [
            'Data source connectivity row (4/1/1/3; Hex and Sigma set at 1 by the deck owner because both are limited to a handful of cloud warehouses and lakehouses): Tableau has 100+ native connectors (late-2025 secondary source; confirm against the official list) plus JDBC and ODBC; Hex lists Snowflake, BigQuery, dbt, Databricks and 30+ more integrations on its site, though the core of it is cloud warehouses; Sigma supports about seven warehouses (Snowflake, BigQuery, Redshift, Databricks, Postgres, AlloyDB, MySQL); Power BI has many connectors but most are import, with a shorter DirectQuery list (connector count not yet verified).',
          ],
        },
        {
          id: 'in-memory',
          name: 'In-memory engine',
          scores: [4, 0, 0, 4],
          evidence: 'Tableau, Power BI own engines; Hex, Sigma cache only',
        },
        {
          id: 'governance',
          name: 'Governance and security',
          scores: [4, 3, 3, 4],
          evidence: 'Hex, Sigma: warehouse permissions, less fine control',
          notes: [
            'Governance and security row (4/3/3/4, deck owner): Tableau and Power BI have mature enterprise governance with fine-grained controls beyond the data layer (content permissions, certification, row-level security, audit and admin reporting). Hex and Sigma inherit warehouse permissions, which is a sound model and why they score 3, but they offer less fine-tuning of controls than Tableau and Power BI.',
          ],
        },
        {
          id: 'lakehouse',
          name: 'Lakehouse integration',
          scores: [2, 3, 4, 3],
          evidence: 'Sigma, Hex run Cortex, AI functions in-warehouse',
          notes: [
            'Lakehouse integration row (2/3/4/3; replaces the former live query row): scored only on integration with the warehouse or lakehouse platform: warehouse-native AI, semantic layer sync and catalog and lineage. Sigma calls Snowflake Cortex functions and Databricks AI functions such as ai_classify from spreadsheet formulas (BigQuery and Redshift need a remote model or UDF); Hex has Snowflake Semantic Views sync (beta) and Cortex AISQL in notebooks, but no Databricks equivalent found, so 3; Tableau has no Cortex or Databricks AI function integration found (confirm with Product); Power BI scores 3 (deck owner): strong with Fabric and OneLake (OneLake-Snowflake Iceberg interop GA, Direct Lake), held back from 4 because the integration is exclusive to Fabric. Lineage is not a differentiator: Snowflake Horizon Catalog connectors (public preview, Oct 2026) list Tableau, Power BI, Sigma and Hex. Write-back, input tables and permissions are scored in their own rows.',
          ],
        },
        {
          id: 'write-back',
          name: 'Write-back and input tables',
          scores: [0, 2, 4, 2],
          evidence: 'Sigma input tables; Hex Writeback cells',
        },
      ],
    },
  ] as CapabilityGroup[],
}
