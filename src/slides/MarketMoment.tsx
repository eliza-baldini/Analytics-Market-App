import { motion } from 'motion/react'
import { marketMoment } from '../content/shift'
import { Build, useBuildTransition, useBuilt } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { Words } from '../deck/Words'

/**
 * Slide 4 · The Next Market Moment is Here.
 * Builds: 0 the GenAI unlock · 1 the demand for trust at scale · 2 the five pillars.
 */
export function MarketMoment() {
  const demand = useBuilt(1)
  const dim = useBuildTransition(1, 0, 0.6)
  return (
    <SlideFrame inverted eyebrow="The Next Market Moment" title={marketMoment.title} subtitle={marketMoment.subtitle}>
      <div className="grid h-[500px] grid-cols-2 gap-8">
        <Build delay={0.2}>
          <motion.div
            initial={false}
            animate={{ opacity: demand ? 0.78 : 1, scale: demand ? 0.98 : 1 }}
            transition={dim}
            className="flex h-full items-center justify-center rounded-[44px] bg-white p-14 text-center"
          >
            <Words text={marketMoment.unlock} delay={0.4} dim={0.12} accentClass="text-royal" className="display text-[52px] leading-[1.1] text-navy-900" />
          </motion.div>
        </Build>
        <Build at={1} x={60} y={0}>
          <div className="flex h-full flex-col items-center justify-center rounded-[44px] bg-white p-14 text-center shadow-[0_40px_100px_-40px_rgba(0,179,255,0.6)]">
            <p className="display text-[52px] leading-[1.1] text-navy-900">{marketMoment.demand}</p>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {marketMoment.pillars.map((pillar, i) => (
                <Pillar key={pillar} label={pillar} index={i} />
              ))}
            </ul>
          </div>
        </Build>
      </div>
    </SlideFrame>
  )
}

function Pillar({ label, index }: { label: string; index: number }) {
  const lit = useBuilt(2)
  const t = useBuildTransition(2, index * 0.12, 0.6)
  return (
    <motion.li
      initial={false}
      animate={{ opacity: lit ? 1 : 0, y: lit ? 0 : 14 }}
      transition={t}
      className="relative rounded-full bg-royal/[0.07] px-5 py-2.5 text-[20px] font-semibold text-royal"
    >
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: lit ? [0, 1, 0.35] : 0 }}
        transition={{ ...t, duration: 1.2 }}
        className="absolute inset-0 rounded-full ring-2 ring-cyan"
      />
      {label}
    </motion.li>
  )
}
