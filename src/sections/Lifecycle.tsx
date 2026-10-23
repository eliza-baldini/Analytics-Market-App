import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { lifecycle } from '../content/vision'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal'
import { RichText } from '../components/ui/RichText'
import { useIsDesktop } from '../hooks/useMediaQuery'

/**
 * Slide 4 · Building the Agentic Analytics Lifecycle.
 * Pinned on desktop: the infinity loop draws itself, then the platform engines assemble beneath it.
 */
export function Lifecycle() {
  const desktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section
      id="lifecycle"
      ref={ref}
      data-surface="dark"
      className={`relative rounded-[48px] bg-navy-950 text-white ${desktop ? 'h-[240vh]' : 'py-24'}`}
    >
      <div className={desktop ? 'sticky top-0 flex h-screen items-center-safe overflow-hidden pt-16' : ''}>
        <Glow />
        <div className="relative mx-auto grid w-full max-w-[1240px] gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <Intro progress={desktop ? p : undefined} />
          <div>
            <InfinityLoop progress={desktop ? p : undefined} />
            <Engines progress={desktop ? p : undefined} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Glow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-[10%] left-[55%] size-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(2,42,192,0.55),transparent)] blur-3xl" />
      <div className="absolute right-[-10%] bottom-[-20%] size-[40vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,179,255,0.18),transparent)] blur-3xl" />
    </div>
  )
}

function Intro({ progress }: { progress?: MotionValue<number> }) {
  return (
    <div>
      <Reveal>
        <p className="eyebrow mb-6 text-cyan">Agentic Lifecycle</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display text-[clamp(2.4rem,4.4vw,4rem)]">{lifecycle.title}</h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-8 max-w-[34ch] text-[clamp(1.15rem,1.6vw,1.45rem)] leading-snug font-medium text-white/75">
          <RichText text={lifecycle.statement} />
        </p>
      </Reveal>
      {progress && <ScrollHint progress={progress} />}
    </div>
  )
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0, 0.85], ['0%', '100%'])
  return (
    <div className="mt-12 h-px w-48 bg-white/15">
      <motion.div style={{ width }} className="h-full bg-cyan" />
    </div>
  )
}

/* -------------------------------------------------------------- loop */

// Two loops meeting at the center (300, 160) of a 600×320 canvas.
const LEFT = 'M300 160 C 240 60, 60 40, 60 160 C 60 280, 240 260, 300 160'
const RIGHT = 'M300 160 C 360 60, 540 40, 540 160 C 540 280, 360 260, 300 160'

function InfinityLoop({ progress }: { progress?: MotionValue<number> }) {
  const [hover, setHover] = useState<'left' | 'right' | null>(null)
  const fallback = useStatic(1)
  const p = progress ?? fallback
  const leftDraw = useTransform(p, [0.04, 0.3], [0, 1])
  const rightDraw = useTransform(p, [0.18, 0.44], [0, 1])
  const coreScale = useTransform(p, [0.36, 0.5], [0.6, 1])
  const coreOpacity = useTransform(p, [0.36, 0.48], [0, 1])
  const leftLabel = useTransform(p, [0.14, 0.26], [0, 1])
  const rightLabel = useTransform(p, [0.3, 0.42], [0, 1])

  const loops = lifecycle.loops
  const dim = (side: 'left' | 'right') => (hover && hover !== side ? 0.35 : 1)

  return (
    // Width is capped by viewport height so the whole composition fits on shorter screens.
    <div className="relative mx-auto w-full max-w-[min(100%,calc(40vh*1.875))]">
      <div className="grid grid-cols-2 gap-6 text-center">
        <motion.div style={{ opacity: leftLabel }}>
          <p className="display text-[clamp(1.1rem,1.6vw,1.4rem)]">{loops.selfService.title}</p>
          <p className="mt-1 text-[13px] text-white/55 italic">({loops.selfService.subtitle})</p>
          <p className="mt-2 inline-block rounded-full bg-white/[0.07] px-3 py-1 text-[12px] font-medium text-cyan ring-1 ring-white/10">
            {loops.selfService.persona}
          </p>
        </motion.div>
        <motion.div style={{ opacity: rightLabel }}>
          <p className="display text-[clamp(1.1rem,1.6vw,1.4rem)]">{loops.operational.title}</p>
          <p className="mt-1 text-[13px] text-white/55 italic">({loops.operational.subtitle})</p>
          <p className="mt-2 inline-block rounded-full bg-white/[0.07] px-3 py-1 text-[12px] font-medium text-cyan ring-1 ring-white/10">
            {loops.operational.persona}
          </p>
        </motion.div>
      </div>

      <div className="relative mt-4">
        <svg viewBox="0 0 600 320" className="w-full overflow-visible" role="img" aria-label="Self-service loop and operational loop joined by Relay">
          <defs>
            <linearGradient id="loop-left" x1="0" x2="1">
              <stop offset="0" stopColor="#3b1fa8" />
              <stop offset="1" stopColor="#022ac0" />
            </linearGradient>
            <linearGradient id="loop-right" x1="0" x2="1">
              <stop offset="0" stopColor="#0a3be0" />
              <stop offset="1" stopColor="#00b3ff" />
            </linearGradient>
            <filter id="loop-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* faint tracks */}
          <path d={LEFT} stroke="rgba(255,255,255,0.06)" strokeWidth="34" fill="none" />
          <path d={RIGHT} stroke="rgba(255,255,255,0.06)" strokeWidth="34" fill="none" />

          {(['left', 'right'] as const).map((side) => (
            <g
              key={side}
              onMouseEnter={() => setHover(side)}
              onMouseLeave={() => setHover(null)}
              className="cursor-default"
              style={{ opacity: dim(side), transition: 'opacity 400ms' }}
            >
              <motion.path
                d={side === 'left' ? LEFT : RIGHT}
                stroke={`url(#loop-${side})`}
                strokeWidth="30"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: side === 'left' ? leftDraw : rightDraw }}
              />
              <motion.path
                d={side === 'left' ? LEFT : RIGHT}
                stroke={side === 'left' ? '#5b3df0' : '#00b3ff'}
                strokeWidth="30"
                fill="none"
                filter="url(#loop-glow)"
                opacity={hover === side ? 0.6 : 0.18}
                style={{ pathLength: side === 'left' ? leftDraw : rightDraw, transition: 'opacity 400ms' }}
              />
              {/* invisible wide hit area */}
              <path d={side === 'left' ? LEFT : RIGHT} stroke="transparent" strokeWidth="60" fill="none" />
            </g>
          ))}

          {/* travelling pulses: around the left loop counter-clockwise, the right loop clockwise */}
          <Pulse path={LEFT} delay={0} />
          <Pulse path={RIGHT} delay={1.8} />

          <text x="150" y="156" textAnchor="middle" className="fill-white text-[15px] font-medium">
            <tspan x="150">{loops.selfService.motion.split(' & ')[0]} &amp;</tspan>
            <tspan x="150" dy="20">{loops.selfService.motion.split(' & ')[1]}</tspan>
          </text>
          <text x="450" y="156" textAnchor="middle" className="fill-white text-[15px] font-medium">
            <tspan x="450">{loops.operational.motion.split(' & ')[0]} &amp;</tspan>
            <tspan x="450" dy="20">{loops.operational.motion.split(' & ')[1]}</tspan>
          </text>
        </svg>

        <motion.div
          style={{ scale: coreScale, opacity: coreOpacity }}
          className="absolute top-1/2 left-1/2 grid aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        >
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#cfeaff_45%,#7cc4ff)] shadow-[0_0_60px_rgba(0,179,255,0.6)]" />
          <motion.span
            className="absolute -inset-3 rounded-full ring-1 ring-cyan/50"
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="relative text-center text-navy-900">
            <span className="display block text-[clamp(0.95rem,1.4vw,1.25rem)]">{lifecycle.core.title}</span>
            <span className="block text-[clamp(0.65rem,0.9vw,0.78rem)] font-medium">({lifecycle.core.subtitle})</span>
          </span>
        </motion.div>
      </div>
    </div>
  )
}

function Pulse({ path, delay }: { path: string; delay: number }) {
  return (
    <circle r="5" fill="#fff" opacity="0.9">
      <animateMotion dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" path={path} rotate="auto" />
    </circle>
  )
}

/* ----------------------------------------------------------- engines */

function Engines({ progress }: { progress?: MotionValue<number> }) {
  const fallback = useStatic(1)
  const p = progress ?? fallback
  const opacity = useTransform(p, [0.52, 0.62], [0, 1])
  const y = useTransform(p, [0.52, 0.66], [40, 0])

  return (
    <motion.div style={{ opacity, y }} className="mt-8">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/25" />
        <p className="eyebrow text-cyan">{lifecycle.foundation.title}</p>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/25" />
      </div>
      <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4" stagger={0.08} amount={0.6}>
        {lifecycle.foundation.engines.map((e, i) => (
          <StaggerItem key={e} className="h-full">
            <EngineTile name={e} index={i} progress={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </motion.div>
  )
}

function EngineTile({ name, index, progress }: { name: string; index: number; progress: MotionValue<number> }) {
  const start = 0.62 + index * 0.06
  const lit = useTransform(progress, [start, start + 0.06], [0, 1])
  return (
    <div className="group relative flex h-full min-h-[118px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/[0.05] px-4 py-6 text-center ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.09]">
      <motion.span
        aria-hidden
        style={{ opacity: lit }}
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent"
      />
      <p className="text-[11px] font-medium text-white/40 tabular">0{index + 1}</p>
      <p className="mt-2 text-[13px] font-semibold tracking-[0.08em] uppercase">{name}</p>
    </div>
  )
}

/** A constant MotionValue for non-pinned layouts. */
function useStatic(v: number) {
  return useMotionValue(v)
}
