import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { democratized } from '../content/marketShift'
import { Build, useBuildTransition, useBuilt, useSlideStep } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { CountUp } from '../components/motion/CountUp'
import { DashboardMockup, ReportMockup } from '../components/ui/Mockups'
import { RichText } from '../components/ui/RichText'

/**
 * Slide 3 · Tableau Democratized Self-Service & Visual Analytics.
 * Builds: 0 title · 1 traditional reporting · 2 self-service (connector draws) · 3 the movement in numbers.
 */
export function Democratized() {
  const { past, present } = democratized
  return (
    <SlideFrame inverted title={democratized.title} subtitle={democratized.subtitle} headerClassName="[&_h2]:text-[48px]">
      <EraPair
        left={<EraCard period={past.period} title={past.title} lead={past.lead} tone="past" mockup={<ReportMockup />} />}
        right={
          <EraCard period={present.period} title={present.title} lead={present.lead} tone="present" mockup={<DashboardMockup />} tagline={present.tagline} />
        }
      />
      <Movement />
    </SlideFrame>
  )
}

/** Two era cards joined by a connector: left at build 1, connector and right at build 2. */
export function EraPair({ left, right, height = 340 }: { left: ReactNode; right: ReactNode; height?: number }) {
  const connected = useBuilt(2)
  const line = useBuildTransition(2, 0, 0.8)
  return (
    <div className="grid grid-cols-[1fr_110px_1.12fr] items-stretch" style={{ gridTemplateRows: `${height}px` }}>
      <Build at={1} x={-40} y={0} className="h-full">
        {left}
      </Build>
      <div className="relative flex items-center" aria-hidden>
        <span className="h-px w-full bg-white/15" />
        <motion.span initial={false} animate={{ scaleX: connected ? 1 : 0 }} transition={line} className="absolute inset-x-0 h-px origin-left bg-gradient-to-r from-white/40 to-cyan" />
        <motion.span
          initial={false}
          animate={{ opacity: connected ? 1 : 0, scale: connected ? 1 : 0.6 }}
          transition={line}
          className="absolute left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-navy-900 text-white ring-1 ring-white/15"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </div>
      <Build at={2} x={40} y={0} delay={0.25} className="h-full">
        {right}
      </Build>
    </div>
  )
}

const eraHeader = {
  past: 'bg-[#5f6b7d]',
  present: 'bg-gradient-to-br from-[#7c3aed] to-[#5b21b6]',
  agentic: 'bg-gradient-to-br from-[#16a6e0] to-[#0b7fc4]',
}
const eraLead = { past: 'bg-[#e4e6ea] text-ink-soft', present: 'bg-[#ede9fe] text-ink', agentic: 'bg-[#dff3fc] text-ink font-semibold' }

export function EraCard({
  period,
  title,
  lead,
  tone,
  mockup,
  tagline,
}: {
  period: string
  title: string
  lead: string
  tone: 'past' | 'present' | 'agentic'
  mockup: ReactNode
  tagline?: string
}) {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[26px] bg-white text-ink ${
        tone === 'past' ? '' : 'shadow-[0_40px_90px_-30px_rgba(40,20,140,0.7)]'
      }`}
    >
      <header className={`px-8 pt-3.5 pb-3 text-center text-white ${eraHeader[tone]}`}>
        <p className="text-[14px] font-semibold text-white/80 tabular">{period}</p>
        <h3 className="display text-[28px] leading-tight">{title}</h3>
      </header>
      <p className={`px-8 py-2.5 text-center text-[17px] ${eraLead[tone]}`}>
        <RichText text={lead} />
      </p>
      <div className="min-h-0 flex-1 overflow-hidden p-4">{mockup}</div>
      {tagline && (
        <Build at={2} delay={0.7} y={12}>
          <p className="mx-4 mb-3 rounded-2xl bg-[#ede9fe] px-5 py-2 text-center text-[20px] font-semibold text-navy-900">
            <RichText text={tagline} />
          </p>
        </Build>
      )}
    </article>
  )
}

function Movement() {
  const { movement } = democratized
  const [a, b, c, d] = movement.stats
  const play = useBuilt(3)
  const { settled } = useSlideStep()
  const instant = settled >= 3
  return (
    <div className="mt-8">
      <Build at={3}>
        <p className="display text-center text-[32px] font-semibold text-white/90 italic">{movement.title}</p>
      </Build>
      <div className="mt-5 grid grid-cols-5 items-start">
        <Stat {...a} delay={0.1} play={play} instant={instant} />
        <Stat {...b} delay={0.2} play={play} instant={instant} />
        <Build at={3} delay={0.3} className="flex justify-center self-center">
          <span className="display -rotate-6 bg-gradient-to-br from-white via-cyan-soft to-cyan bg-clip-text px-3 pb-1 text-[44px] font-bold text-transparent italic">
            {movement.community}
          </span>
        </Build>
        <Stat {...c} delay={0.4} play={play} instant={instant} />
        <Stat {...d} delay={0.5} play={play} instant={instant} />
      </div>
    </div>
  )
}

function Stat({ value, label, delay, play, instant }: { value: string; label: string; delay: number; play: boolean; instant: boolean }) {
  return (
    <Build at={3} delay={delay} className="text-center">
      <p className="display text-[56px] text-white">
        <CountUp value={value} play={play} instant={instant} />
      </p>
      <p className="mx-auto mt-1 max-w-[18ch] text-[17px] font-medium text-white/70">{label}</p>
    </Build>
  )
}
