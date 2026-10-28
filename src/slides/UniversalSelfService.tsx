import { motion } from 'motion/react'
import { universalSelfService as c } from '../content/agentic'
import { Build, useBuildTransition, useBuilt } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { AgentMockup, DashboardMockup } from '../components/ui/Mockups'
import { EraCard, EraPair } from './Democratized'

/**
 * Slide 7 · Generative AI Democratized Universal Self Service Analytics.
 * Builds: 0 title · 1 self-service era · 2 agentic era · 3 the demand for trust at scale.
 */
export function UniversalSelfService() {
  return (
    <SlideFrame inverted title={c.title} subtitle={c.subtitle} headerClassName="[&_h2]:text-[46px]">
      <EraPair
        height={410}
        left={<EraCard period={c.past.period} title={c.past.title} lead={c.past.lead} tone="present" mockup={<DashboardMockup />} />}
        right={<EraCard period={c.present.period} title={c.present.title} lead={c.present.lead} tone="agentic" mockup={<AgentMockup />} />}
      />
      <Build at={3} className="mt-8">
        <div className="rounded-[28px] bg-white px-10 py-6 text-center shadow-[0_40px_100px_-40px_rgba(0,179,255,0.6)]">
          <p className="display text-[44px] leading-tight text-navy-900">{c.demand}</p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {c.pillars.map((p, i) => (
              <Pillar key={p} label={p} index={i} />
            ))}
          </ul>
        </div>
      </Build>
    </SlideFrame>
  )
}

function Pillar({ label, index }: { label: string; index: number }) {
  const lit = useBuilt(3)
  const t = useBuildTransition(3, 0.35 + index * 0.1, 0.6)
  return (
    <motion.li
      initial={false}
      animate={{ opacity: lit ? 1 : 0, y: lit ? 0 : 12 }}
      transition={t}
      className="rounded-full bg-royal/[0.07] px-5 py-2 text-[20px] font-semibold text-royal"
    >
      {label}
    </motion.li>
  )
}
