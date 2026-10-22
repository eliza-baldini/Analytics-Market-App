import type { Notes, Rich } from './types'

/* ------------------------------------------------------------------ */
/* Slides 8–13 · Competitor profiles and deals                         */
/* ------------------------------------------------------------------ */

export interface Stat {
  label: string
  value: string
  caption: Rich
}

export interface Bet {
  /** Optional lead-in, underlined on the slide. */
  label?: string
  text: string
}

export type DealStatus = 'won' | 'lost' | 'atRisk'

export interface Deal {
  status: DealStatus
  statusLabel: string
  context: string
  account: string
  accountType?: string
  amount: string
  oppLabel: string
  oppUrl?: string
  detailLabel: string
  details: string[]
  /** True while the slide still shows template text. Rendered dimmed. */
  placeholder?: boolean
}

export interface Competitor {
  id: string
  name: string
  thesis: string
  stats: Stat[]
  goToMarket: string[]
  strengths: string[]
  weaknesses: string[]
  bets: Bet[]
  dealsTitle: string
  deals: Deal[]
  notes?: Notes
}

/** Template rows used on the deals slides until real deals are added. */
const placeholderDeal = (
  status: DealStatus,
  statusLabel: string,
  context: string,
  detailLabel: string,
  accountType?: string,
): Deal => ({
  status,
  statusLabel,
  context,
  account: 'Account Name',
  accountType,
  amount: 'oppty amount',
  oppLabel: 'org 62 oppty',
  detailLabel,
  details: ['deal details'],
  placeholder: true,
})

export const competitors: Competitor[] = [
  /* --------------------------------------------------------------- Sigma */
  {
    id: 'sigma',
    name: 'Sigma',
    thesis:
      'Differentiated spreadsheet and write-back capabilities, now packaging vertical apps and agents on top of the lakehouse but exposed due to lack of analytical depth, limited connectors, and warehouse costs.',
    stats: [
      { label: 'Revenue', value: '$200M+', caption: 'ARR as of Apr 2026; [[100%+|positive]] YoY growth' },
      { label: 'Valuation', value: '$3B', caption: 'Series E, [[$80M|positive]] (May 2026)' },
      {
        label: 'Customers',
        value: '2,000+',
        caption: 'Company figure; incl. [[AMD, Duolingo, Colgate-Palmolive|positive]]',
      },
    ],
    goToMarket: [
      'Sells to business departments, led by finance',
      'Co-GTM with lakehouse vendors: 2026 BI Partner of the Year for Snowflake and Databricks',
      'Databricks Ventures joined Series E; product runs live on both Snowflake and Databricks.',
    ],
    strengths: [
      'Spreadsheet-native UI: 400+ Excel-style functions on live warehouse data, no training needed.',
      'Warehouse interoperability: inherits warehouse semantics, gives agents model context, calls lakehouse models, enforces lakehouse RBAC',
      'Vertical AI apps: repeatable apps with governed write-back, no eng. backlog',
    ],
    weaknesses: [
      'Operational focus; light on rich analytics',
      'Restricted reach: warehouse data only',
      'Cost escalation: usage drives compute',
    ],
    bets: [
      { label: 'AI-native vertical apps', text: 'Production-ready applications used for LOB use cases.' },
      {
        label: 'Sigma Agents',
        text: 'Build once, run in a workbook via API, or from Claude and ChatGPT through MCP. Claim 1,200+ orgs have built about 6,400 agents',
      },
      {
        label: 'Lakehouse interoperability',
        text: 'Native semantic integrations, lakehouse model calls, inherits lakehouse RBAC.',
      },
      {
        label: 'Frontier model integrations',
        text: 'Send to Sigma from Claude Dashboards; MCP into ChatGPT and Claude',
      },
    ],
    dealsTitle: 'Sigma Deals',
    deals: [
      placeholderDeal('won', 'Won', 'Successfully defended', 'Winning Factor'),
      placeholderDeal('lost', 'Lost', 'xyz deployment', 'Primary Loss Reason'),
      {
        status: 'atRisk',
        statusLabel: 'At Risk',
        context: 'Upcoming renewal',
        account: 'Sotheby’s',
        amount: '$263K',
        oppLabel: 'org 62 oppty',
        detailLabel: 'Current Exposure and Threat',
        details: [
          'Customer is evaluating Sigma. They like the spreadsheet-style approach, direct Snowflake integration and lower cost. Tableau’s AI features have missed key business use cases such as generating excel outputs for events.',
          'Strategy: Position Tableau as the analytics layer on top of the Snowflake migration and counter Sigma on integration and simplicity.',
        ],
      },
    ],
  },

  /* ----------------------------------------------------------------- Hex */
  {
    id: 'hex',
    name: 'Hex',
    thesis:
      'Data-team-first: A unified loop from technical authoring to business consumption. Ahead on agent context and evals; deeply integrated with warehouse semantics + agents.',
    stats: [
      { label: 'Revenue', value: '$100M', caption: '[[~100%|positive]] YoY growth' },
      { label: 'Valuation', value: '~$400M', caption: 'Series C, [[$70M|positive]] (May 2025)' },
      { label: 'Customers', value: '1,500+', caption: 'per May 2025 Series C post' },
    ],
    goToMarket: [
      'Strong product-led growth motion: free tier and self-serve start with data practitioners.',
      'Sold through Snowflake (Elite partner, buy with Snowflake credits); strong Databricks integration',
      'Sell to developers and data teams, expand to business users via Conversational experiences (Threads) and Data Apps.',
    ],
    strengths: [
      'Developer friendly: Notebook-first; code stays portable throughout the pipeline.',
      'Robust platform to deploy, configure and monitor agents.',
      'Strong conversational AI experience: Answers are grounded in endorsed data to support business user applications.',
    ],
    weaknesses: [
      'Notebook UI, means a steep learning curve for non-developers.',
      'Live-only architecture without extracts drives up compute costs.',
      'Expensive at scale with tokens + compute costs.',
    ],
    bets: [
      { label: 'Hex Threads', text: 'conversational Q&A for business users, every answer inspectable (SQL, tool calls)' },
      { label: 'Generative Data Apps', text: 'notebook cells published as apps via an agent.' },
      { label: 'Context Studio and Evals', text: 'observe, test and deploy agent context' },
      { label: 'Code-first agents', text: 'CLI, context and evals as files' },
    ],
    dealsTitle: 'Hex Deals',
    deals: [
      placeholderDeal('won', 'Won', 'Full displacement', 'Winning Factor', 'account type'),
      placeholderDeal('lost', 'Lost', 'xyz deployment', 'Primary Loss Reason', 'account type'),
      {
        status: 'atRisk',
        statusLabel: 'At Risk',
        context: 'Upcoming renewal',
        account: 'Sweetgreen',
        accountType: 'AMER RCG',
        amount: '$124K',
        oppLabel: 'org 62 oppty',
        detailLabel: 'Current Exposure and Threat',
        details: [
          'Customer actively evaluating migration to Hex driven by perceived lagging innovation.',
          'Strategy: Bring token consumption costs and enterprise scaling concerns to the forefront. Model co-exist opportunity.',
        ],
      },
    ],
    notes: {
      source: 'Slide 10',
      blocks: [
        {
          heading: 'Funding, valuation and pricing',
          paragraphs: [
            'Funding and valuation conflict across sources: PitchBook $171M total, Tracxn $172M, GetLatka $150M; valuation estimates $380-400M are third-party. Customer figure is from the May 2025 Series C post. Pricing: a third-party walkthrough of the Hex pricing page (Oct 2026) shows a free tier and an individual plan at $36 per editor with the agent, 5 published apps, 30-day version history and medium compute; Team ~$75 comes from third-party guides (Vendr reports higher, $149-199 per creator seat). Verify at hex.tech/pricing before external use.',
          ],
        },
        {
          heading: 'Threads and Context Studio',
          paragraphs: [
            'Threads (hex.tech blog, Oct 1, 2025): public beta on Team and Enterprise plans for Explorer seats, not the individual plan; built on the Notebook Agent framework; data teams control which data it can use (semantic models or endorsed tables) and it prioritizes governed data; draws on published apps, semantic models, workspace rules, endorsed tables and schema docs; shows step-by-step reasoning; also reachable from Slack, Claude, Cursor and Codex (third-party overview); customer quotes in the blog are vendor testimonials.',
            'Context Studio (Hex launch webinar, Jan 2026): a Context Development Lifecycle of observe (conversation volume, topics, quality warnings), inspect (step-by-step thread timeline with SQL and tool calls), curate (workspace rules, endorsements, semantic models along a soft-to-strict spectrum) and test and deploy (try context edits against real threads in a diff view before publishing). At launch Git sync for context and automated eval suites were still in development; Evals shipped Aug 2026. Hex also acts as an MCP server. Vendor demo, not independent.',
          ],
        },
        {
          heading: 'Reviewer and internal views',
          paragraphs: [
            'Reviewer (Just Tim, Oct 2026) views: notebook-first philosophy vs. WYSIWYG BI; fits small, fast-moving, SQL/Python-fluent teams and names Notion, Anthropic, AWS and Cursor as users (unverified, check hex.tech/customers); workflow is agent, notebook, app builder with classic and generative (beta) apps; lineage view and Collections; code remains portable (no lock-in); CLI is a lighter alternative to MCP for coding agents; positions Hex as a cursor-like harness for AI; rates its product marketing highly; not as easy to pick up as Tableau. Acquired Hashboard (2025); founded 2019.',
            'Internal competitive analysis (Oct 18, 2026) adds: the Thread is the project, shared by notebook, app, chat with app and evals; evals are YAML suites with an LLM judge and numeric checks against SQL, run on a schedule; the app layer is editable JavaScript; context, evals and the agent are files managed from a CLI; semantics are workspace memory (endorsements, guides, rules) rather than a model of the customer; no warehouse cost governor; smaller embed and Slack footprint; charts are not a trusted visual grammar. Named customers there (Anthropic, Notion, Reddit, Figma, Cisco, HubSpot) are unverified.',
          ],
        },
        {
          heading: 'Go-to-market and revenue',
          paragraphs: [
            'Go-to-market: Hex runs a bottom-up, product-led motion (free tier, 14-day trial in 2023 reports, individual plan at $36 per editor, Team and Enterprise above) moving toward enterprise sales; the Snowflake relationship (Technology Partner since 2021, Elite status, Snowflake Ventures investor, purchasable with Snowflake credits via Marketplace) is its main channel; the Databricks integration is newer and no Databricks Marketplace listing was confirmed. The Series C investors include Snowflake. Sales team size and quota structure were not found, and several sources are from 2023 and 2024.',
            'Revenue of about $100M growing about 100% YoY is an internal figure supplied by the deck owner and is not company-confirmed or published; for reference, a GetLatka estimate put 2024 ARR near $20M (unverified). Valuation and customer figures are as above.',
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------ Power BI */
  {
    id: 'power-bi',
    name: 'Power BI',
    thesis:
      'Microsoft 365 product bundling and Azure native fuel a vast customer base. Nascent investments with Fabric Apps and Ontology requires MSFT Fabric investment. Our open, multi-platform story differentiates.',
    stats: [
      { label: 'Fabric Revenue Growth', value: '+60%', caption: 'Microsoft, Nov 2025; no dollar figure given' },
      {
        label: 'Fabric Customers',
        value: '40,000',
        caption: 'Microsoft, Sep 2026; [[up from 28,000|positive]] in Nov 2025',
      },
      {
        label: 'Power BI Customers',
        value: '425,000',
        caption: 'Organizations (Microsoft, Sep 2026); [[35M+ monthly users|positive]]',
      },
    ],
    goToMarket: [
      'Bundled with Microsoft 365 and Azure; entry point to more Microsoft spend',
      'Pro $14 and PPU $24 per user per month; viewers free on F64+ capacity',
      'Pro and PPU licenses to include Fabric Apps and a database at no extra cost',
    ],
    strengths: ['‘Freemium’ pricing model.', 'Bundling into M365.', 'Native front-end for any MSFT Fabric customer.'],
    weaknesses: [
      'DAX and Power Query development complexities.',
      'Copilot needs paid Fabric capacity and a prepared model',
      'Frustration with Fabric ‘lock-in’',
    ],
    bets: [
      { label: 'Fabric IQ', text: 'ontology built on semantic models' },
      { text: 'Two Power BI MCP servers plus Fabric data agents' },
      { text: 'Coding-agent-built apps with write-back (preview soon)' },
    ],
    dealsTitle: 'PBI Deals',
    deals: [
      {
        status: 'won',
        statusLabel: 'Won',
        context: 'Rip and Replace',
        account: 'Burberry',
        amount: '$318K',
        oppLabel: 'org 62 oppty',
        detailLabel: 'Winning Factor',
        details: [
          'Reversed PBI decision by making a case on architecture, TCO and data democratization. Partnered with Core to win over CIO.',
        ],
      },
      placeholderDeal('lost', 'Lost', 'xyz deployment', 'Primary Loss Reason'),
      placeholderDeal('atRisk', 'At Risk', 'Upcoming renewal', 'Current Exposure and Threat'),
    ],
    notes: {
      source: 'Slide 12',
      blocks: [
        {
          heading: 'Sources',
          paragraphs: [
            'Source: Microsoft Learn and Fabric blog; The Register interview with Microsoft (Sep 2026); third-party pricing guides; internal Power BI compete decks.',
          ],
        },
        {
          heading: 'Pricing, customers and figures',
          paragraphs: [
            'Pricing: Pro $14 / PPU $24 per user per month (third-party guides; confirm against Microsoft pricing page). Fabric IQ ontology is labeled preview on Microsoft Learn (updated Oct 16, 2026; the old experience retires Jan 31, 2027), while some third-party sources call Fabric IQ GA; the Fabric IQ MCP server is documented as GA. No public Power BI user counts found in this research.',
            'Customers: Microsoft exec Arun Ulag told The Register (Sep 29, 2026) that Power BI has 425,000 customers (organizations) and over 35 million monthly business users, and Fabric has 40,000 customers. The same article says Pro and Premium Per User customers will get Fabric Apps and Fabric Database capabilities (up to 1 GB per app) at no extra cost, via the Rayfin open source SDK that works with coding agents and supports inputs and write-back, in preview in the coming weeks; it also reports a preview of bidirectional integration with Salesforce Data 360. No Power BI revenue figure was found.',
            'Revenue and valuation tiles are replaced by Fabric figures because Power BI is part of Microsoft and does not report either: the Fabric Updates blog (Nov 18, 2025) says Fabric has over 28,000 customers and 60% revenue growth, described as the fastest-growing data and analytics platform in Microsoft history; the 60% is a growth rate, not dollars, and is about a year old.',
          ],
        },
      ],
    },
  },
]
