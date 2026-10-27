import { motion } from 'motion/react'
import { useState } from 'react'
import { foundation } from '../content/vision'
import { Build, useBuildTransition, useSlideStep } from '../deck/Build'
import { RichText } from '../components/ui/RichText'

// Isometric slab geometry on a 400-wide canvas.
const CX = 200
const W = 300
const H = 150
const T = 26
const GAP = 68
const TOP = 24
const COUNT = foundation.layers.length
const VIEW_H = TOP + GAP * (COUNT - 1) + H + T + 16

/** Build at which layer i (0 = top) arrives: the stack assembles from the bottom up. */
const arrival = (i: number) => COUNT - i

/**
 * Slide 5 · The Tableau Agentic Data Foundation.
 * Builds: 0 title · 1 Hyperforce · 2 Data · 3 Data Modelling · 4 Tableau Knowledge · 5 Experiences.
 */
export function Foundation() {
  const { step } = useSlideStep()
  const [hover, setHover] = useState<number | null>(null)
  // The most recently arrived layer is lit, unless the presenter hovers another.
  const active = step === 0 ? null : COUNT - step
  const lit = hover ?? active

  return (
    <div className="relative h-full text-white">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(2,42,192,0.6),transparent)] blur-3xl" />
      <div className="relative grid h-full grid-cols-[0.85fr_1fr_1fr] items-center gap-12 px-24">
        <Build>
          <p className="eyebrow mb-6 text-[13px] text-cyan">Agentic Data Foundation</p>
          <h2 className="display text-[64px] leading-[1.02]">
            <RichText text={foundation.title} />
          </h2>
        </Build>

        <svg viewBox={`0 0 400 ${VIEW_H}`} className="mx-auto h-[720px] w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="slab-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4c86ff" />
              <stop offset="1" stopColor="#2457e6" />
            </linearGradient>
            <linearGradient id="slab-top-lit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7cc4ff" />
              <stop offset="1" stopColor="#2f7bff" />
            </linearGradient>
            <filter id="slab-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>
          {/* draw the bottom layer first so upper slabs overlap it */}
          {[...foundation.layers.keys()].reverse().map((i) => (
            <Slab key={i} index={i} lit={lit === i} />
          ))}
        </svg>

        <ol className="space-y-6">
          {foundation.layers.map((l, i) => (
            <LayerLabel key={l.name} index={i} name={l.name} description={l.description} lit={lit === i} onHover={(on) => setHover(on ? i : null)} />
          ))}
        </ol>
      </div>
    </div>
  )
}

function Slab({ index, lit }: { index: number; lit: boolean }) {
  const { step } = useSlideStep()
  const shown = step >= arrival(index)
  const t = useBuildTransition(arrival(index), 0, 0.8)
  const y0 = TOP + index * GAP
  const top = `M${CX} ${y0} L${CX + W / 2} ${y0 + H / 2} L${CX} ${y0 + H} L${CX - W / 2} ${y0 + H / 2} Z`
  const left = `M${CX - W / 2} ${y0 + H / 2} L${CX} ${y0 + H} L${CX} ${y0 + H + T} L${CX - W / 2} ${y0 + H / 2 + T} Z`
  const right = `M${CX + W / 2} ${y0 + H / 2} L${CX} ${y0 + H} L${CX} ${y0 + H + T} L${CX + W / 2} ${y0 + H / 2 + T} Z`
  return (
    <motion.g initial={false} animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : -70 }} transition={t}>
      <path d={top} fill="#00b3ff" filter="url(#slab-glow)" opacity={lit ? 0.55 : 0} style={{ transition: 'opacity 400ms' }} />
      <path d={left} fill="#1d48c9" stroke="#1d48c9" strokeWidth="10" strokeLinejoin="round" />
      <path d={right} fill="#163aa6" stroke="#163aa6" strokeWidth="10" strokeLinejoin="round" />
      <path
        d={top}
        fill={lit ? 'url(#slab-top-lit)' : 'url(#slab-top)'}
        stroke={lit ? '#bfe6ff' : 'rgba(255,255,255,0.28)'}
        strokeWidth="10"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </motion.g>
  )
}

function LayerLabel({
  index,
  name,
  description,
  lit,
  onHover,
}: {
  index: number
  name: string
  description: string
  lit: boolean
  onHover: (on: boolean) => void
}) {
  const { step } = useSlideStep()
  const arrived = step >= arrival(index)
  const t = useBuildTransition(arrival(index), 0.15, 0.6)
  return (
    <motion.li
      initial={false}
      animate={{ opacity: arrived ? 1 : 0.16, x: arrived ? 0 : 12 }}
      transition={t}
      onMouseEnter={() => arrived && onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`cursor-default border-l-[3px] pl-6 transition-colors duration-300 ${lit ? 'border-cyan' : 'border-white/10'}`}
    >
      <p className="display text-[28px]">{name}</p>
      <p className="mt-1 text-[19px] leading-snug text-white/65">{description}</p>
    </motion.li>
  )
}
