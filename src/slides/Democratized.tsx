import { motion } from 'motion/react'
import { democratized, type Era } from '../content/shift'
import { Build, useBuildTransition, useBuilt, useSlideStep } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { CountUp } from '../components/motion/CountUp'
import { RichText } from '../components/ui/RichText'

/**
 * Slide 3 · Tableau Democratized Data.
 * Builds: 0 title · 1 traditional reporting · 2 self-service (connector draws) · 3 the movement in numbers.
 */
export function Democratized() {
  const [past, present] = democratized.eras
  const connected = useBuilt(2)
  const line = useBuildTransition(2, 0, 0.8)

  return (
    <SlideFrame inverted eyebrow="Tableau Democratized Data" title={democratized.title} subtitle={democratized.subtitle}>
      <div className="grid grid-cols-[1fr_120px_1.15fr] items-stretch">
        <Build at={1} x={-40} y={0}>
          <EraCard era={past} tone="past" at={1} />
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
        <Build at={2} x={40} y={0} delay={0.25}>
          <EraCard era={present} tone="present" at={2} />
        </Build>
      </div>
      <Movement />
    </SlideFrame>
  )
}

function EraCard({ era, tone, at }: { era: Era; tone: 'past' | 'present'; at: number }) {
  const present = tone === 'present'
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[28px] ${
        present ? 'bg-white text-ink shadow-[0_40px_90px_-30px_rgba(91,33,182,0.7)]' : 'bg-white/[0.06] text-white ring-1 ring-white/12'
      }`}
    >
      <header className={`px-8 pt-5 pb-4 text-center ${present ? 'bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white' : 'bg-white/[0.06]'}`}>
        <p className={`text-[14px] font-semibold tabular ${present ? 'text-white/75' : 'text-white/55'}`}>{era.period}</p>
        <h3 className="display mt-1 text-[30px]">{era.title}</h3>
      </header>
      <p className={`px-8 py-3 text-center text-[16px] ${present ? 'bg-[#ede9fe] text-ink' : 'bg-white/[0.04] text-white/65'}`}>
        <RichText text={era.lead} />
      </p>
      <div className="flex flex-1 flex-col justify-center gap-3 px-8 py-5 text-center">
        {era.points.map((pt, k) => (
          <Build key={pt} at={at} delay={0.35 + k * 0.1} y={10}>
            <p className={`text-[20px] ${present ? 'font-medium text-ink' : 'text-white/70'}`}>{pt}</p>
          </Build>
        ))}
      </div>
      {era.tagline && (
        <Build at={at} delay={0.75} y={12}>
          <p className="mx-4 mb-4 rounded-2xl bg-[#ede9fe] px-5 py-3 text-center text-[21px] font-semibold text-navy-900">
            <RichText text={era.tagline} />
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
    <div className="mt-10">
      <Build at={3}>
        <p className="display text-center text-[32px] font-semibold text-white/90 italic">{movement.title}</p>
      </Build>
      <div className="mt-6 grid grid-cols-5 items-start">
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
      <p className="display text-[60px] text-white">
        <CountUp value={value} play={play} instant={instant} />
      </p>
      <p className="mx-auto mt-1 max-w-[18ch] text-[17px] font-medium text-white/70">{label}</p>
    </Build>
  )
}
