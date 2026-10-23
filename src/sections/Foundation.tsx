import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { foundation } from '../content/vision'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal'
import { RichText } from '../components/ui/RichText'
import { useIsDesktop } from '../hooks/useMediaQuery'

// Isometric slab geometry on a 400-wide canvas.
const CX = 200
const W = 300
const H = 150
const T = 26
const GAP = 68
const TOP = 24
const VIEW_H = TOP + GAP * (foundation.layers.length - 1) + H + T + 16

/**
 * Slide 5 · The Tableau Agentic Data Foundation.
 * Pinned on desktop: the stack assembles from the infrastructure up, each layer lighting its description.
 */
export function Foundation() {
  return useIsDesktop() ? <PinnedFoundation /> : <StackedFoundation />
}

function PinnedFoundation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const count = foundation.layers.length
  const [active, setActive] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)

  // Layers arrive bottom-up: the last-listed layer (Hyperforce) first.
  const arrival = (i: number) => {
    const order = count - 1 - i
    const start = 0.06 + order * 0.13
    return [start, start + 0.11] as const
  }

  useMotionValueEvent(p, 'change', (v) => {
    let current: number | null = null
    for (let i = count - 1; i >= 0; i--) if (v >= arrival(i)[0] + 0.05) current = i
    setActive(current)
  })

  const lit = hover ?? active

  return (
    <section id="foundation" ref={ref} data-surface="dark" className="relative h-[260vh] rounded-b-[48px] bg-navy-950 text-white">
      <div className="sticky top-0 flex h-screen items-center-safe overflow-hidden pt-16">
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(2,42,192,0.6),transparent)] blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-[0.8fr_1fr_1fr] items-center gap-10 px-10">
          <Reveal>
            <p className="eyebrow mb-6 text-cyan">Agentic Data Foundation</p>
            <h2 className="display text-[clamp(2.4rem,4vw,3.8rem)]">
              <RichText text={foundation.title} />
            </h2>
          </Reveal>

          <svg viewBox={`0 0 400 ${VIEW_H}`} className="mx-auto max-h-[72vh] w-full overflow-visible" aria-hidden>
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
            {/* draw bottom layer first so upper slabs overlap it */}
            {[...foundation.layers.keys()].reverse().map((i) => (
              <Slab key={i} index={i} progress={p} range={arrival(i)} lit={lit === i} />
            ))}
          </svg>

          <ol className="space-y-5">
            {foundation.layers.map((l, i) => (
              <LayerLabel
                key={l.name}
                name={l.name}
                description={l.description}
                progress={p}
                range={arrival(i)}
                lit={lit === i}
                onHover={(on) => setHover(on ? i : null)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Slab({
  index,
  progress,
  range,
  lit,
}: {
  index: number
  progress: MotionValue<number>
  range: readonly [number, number]
  lit: boolean
}) {
  const y0 = TOP + index * GAP
  const opacity = useTransform(progress, [range[0], range[1]], [0, 1])
  const drop = useTransform(progress, [range[0], range[1]], [-70, 0])
  const top = `M${CX} ${y0} L${CX + W / 2} ${y0 + H / 2} L${CX} ${y0 + H} L${CX - W / 2} ${y0 + H / 2} Z`
  const left = `M${CX - W / 2} ${y0 + H / 2} L${CX} ${y0 + H} L${CX} ${y0 + H + T} L${CX - W / 2} ${y0 + H / 2 + T} Z`
  const right = `M${CX + W / 2} ${y0 + H / 2} L${CX} ${y0 + H} L${CX} ${y0 + H + T} L${CX + W / 2} ${y0 + H / 2 + T} Z`
  return (
    <motion.g style={{ opacity, y: drop }}>
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
  name,
  description,
  progress,
  range,
  lit,
  onHover,
}: {
  name: string
  description: string
  progress: MotionValue<number>
  range: readonly [number, number]
  lit: boolean
  onHover: (on: boolean) => void
}) {
  const opacity = useTransform(progress, [range[0] + 0.03, range[1] + 0.02], [0.18, 1])
  return (
    <motion.li
      style={{ opacity }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`cursor-default border-l-2 pl-5 transition-colors duration-300 ${lit ? 'border-cyan' : 'border-white/10'}`}
    >
      <p className={`display text-[1.2rem] transition-colors ${lit ? 'text-white' : 'text-white/85'}`}>{name}</p>
      <p className="mt-1 text-[15px] leading-snug text-white/65">{description}</p>
    </motion.li>
  )
}

function StackedFoundation() {
  return (
    <section id="foundation" data-surface="dark" className="rounded-b-[48px] bg-navy-950 px-6 py-24 text-white">
      <p className="eyebrow mb-6 text-cyan">Agentic Data Foundation</p>
      <h2 className="display text-[2.4rem]">
        <RichText text={foundation.title} />
      </h2>
      <Stagger className="mt-10 space-y-3">
        {foundation.layers.map((l) => (
          <StaggerItem key={l.name} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
            <p className="display text-lg">{l.name}</p>
            <p className="mt-1 text-[14px] text-white/65">{l.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
