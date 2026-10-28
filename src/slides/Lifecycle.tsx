import { motion } from 'motion/react'
import { useState } from 'react'
import { lifecycle } from '../content/agentic'
import { Build, useBuildTransition, useBuilt } from '../deck/Build'
import { RichText } from '../components/ui/RichText'

// Two loops meeting at the center (300, 160) of a 600×320 canvas.
const LEFT = 'M300 160 C 240 60, 60 40, 60 160 C 60 280, 240 260, 300 160'
const RIGHT = 'M300 160 C 360 60, 540 40, 540 160 C 540 280, 360 260, 300 160'

/**
 * Slide 9 · Building the Agentic Analytics Lifecycle.
 * Builds: 0 title · 1 self-service loop · 2 operational loop · 3 RELAY · 4 platform engines.
 */
export function Lifecycle() {
  return (
    <div className="relative h-full text-white">
      <div aria-hidden className="pointer-events-none absolute top-[10%] left-[58%] size-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(2,42,192,0.55),transparent)] blur-3xl" />
      <div className="relative grid h-full grid-cols-[0.72fr_1.28fr] items-center gap-14 px-24">
        <div>
          <Build y={12}>
            <p className="eyebrow mb-6 text-[13px] text-cyan">Agentic Lifecycle</p>
          </Build>
          <Build delay={0.05}>
            <h2 className="display text-[60px] leading-[1.02]">{lifecycle.title}</h2>
          </Build>
          <Build delay={0.15}>
            <p className="mt-8 text-[26px] leading-snug font-medium text-white/75">
              <RichText text={lifecycle.statement} />
            </p>
          </Build>
        </div>
        <div>
          <InfinityLoop />
          <Engines />
        </div>
      </div>
    </div>
  )
}

function InfinityLoop() {
  const [hover, setHover] = useState<'left' | 'right' | null>(null)
  const leftOn = useBuilt(1)
  const rightOn = useBuilt(2)
  const coreOn = useBuilt(3)
  const leftT = useBuildTransition(1, 0, 1.3)
  const rightT = useBuildTransition(2, 0, 1.3)
  const coreT = useBuildTransition(3, 0, 0.8)
  const loops = lifecycle.loops
  const dim = (side: 'left' | 'right') => (hover && hover !== side ? 0.35 : 1)

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-6 text-center">
        <LoopLabel at={1} title={loops.selfService.title} subtitle={loops.selfService.subtitle} persona={loops.selfService.persona} />
        <LoopLabel at={2} title={loops.operational.title} subtitle={loops.operational.subtitle} persona={loops.operational.persona} />
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

          <path d={LEFT} stroke="rgba(255,255,255,0.06)" strokeWidth="34" fill="none" />
          <path d={RIGHT} stroke="rgba(255,255,255,0.06)" strokeWidth="34" fill="none" />

          {(['left', 'right'] as const).map((side) => {
            const on = side === 'left' ? leftOn : rightOn
            const t = side === 'left' ? leftT : rightT
            const d = side === 'left' ? LEFT : RIGHT
            return (
              <g
                key={side}
                onMouseEnter={() => on && setHover(side)}
                onMouseLeave={() => setHover(null)}
                style={{ opacity: dim(side), transition: 'opacity 400ms' }}
              >
                <motion.path d={d} stroke={`url(#loop-${side})`} strokeWidth="30" strokeLinecap="round" fill="none" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={t} />
                <motion.path
                  d={d}
                  stroke={side === 'left' ? '#5b3df0' : '#00b3ff'}
                  strokeWidth="30"
                  fill="none"
                  filter="url(#loop-glow)"
                  initial={false}
                  animate={{ pathLength: on ? 1 : 0, opacity: on ? (hover === side ? 0.6 : 0.18) : 0 }}
                  transition={t}
                />
                <path d={d} stroke="transparent" strokeWidth="60" fill="none" />
              </g>
            )
          })}

          {/* the four stages around each loop, as labelled on the slide */}
          <SegmentLabels side="left" on={leftOn} t={leftT} />
          <SegmentLabels side="right" on={rightOn} t={rightT} />

          {leftOn && <Pulse path={LEFT} delay={0} />}
          {rightOn && <Pulse path={RIGHT} delay={1.8} />}

          <motion.g initial={false} animate={{ opacity: leftOn ? 1 : 0 }} transition={leftT}>
            <text x="150" y="156" textAnchor="middle" className="fill-white text-[16px] font-medium">
              <tspan x="150">{loops.selfService.motion.split(' & ')[0]} &amp;</tspan>
              <tspan x="150" dy="21">{loops.selfService.motion.split(' & ')[1]}</tspan>
            </text>
          </motion.g>
          <motion.g initial={false} animate={{ opacity: rightOn ? 1 : 0 }} transition={rightT}>
            <text x="450" y="156" textAnchor="middle" className="fill-white text-[16px] font-medium">
              <tspan x="450">{loops.operational.motion.split(' & ')[0]} &amp;</tspan>
              <tspan x="450" dy="21">{loops.operational.motion.split(' & ')[1]}</tspan>
            </text>
          </motion.g>
        </svg>

        <motion.div
          initial={false}
          animate={{ opacity: coreOn ? 1 : 0, scale: coreOn ? 1 : 0.6 }}
          transition={coreT}
          className="absolute top-1/2 left-1/2 grid aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        >
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#cfeaff_45%,#7cc4ff)] shadow-[0_0_60px_rgba(0,179,255,0.6)]" />
          <motion.span
            className="absolute -inset-3 rounded-full ring-1 ring-cyan/50"
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="relative text-center text-navy-900">
            <span className="display block text-[26px]">{lifecycle.core.title}</span>
            <span className="block text-[14px] font-medium">({lifecycle.core.subtitle})</span>
          </span>
        </motion.div>
      </div>
    </div>
  )
}

// Positions on the 600×320 canvas: [Data, Knowledge, Decisions, Actions] for each loop.
const segmentPos = {
  left: [
    [232, 92],
    [112, 88],
    [112, 238],
    [232, 232],
  ],
  right: [
    [368, 92],
    [488, 88],
    [488, 238],
    [368, 232],
  ],
} as const

function SegmentLabels({ side, on, t }: { side: 'left' | 'right'; on: boolean; t: ReturnType<typeof useBuildTransition> }) {
  return (
    <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ ...t, delay: (t.delay ?? 0) + 0.6 }}>
      {lifecycle.segments.map((label, i) => {
        const [x, y] = segmentPos[side][i]
        return (
          <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-white text-[13px] font-semibold">
            {label}
          </text>
        )
      })}
    </motion.g>
  )
}

function LoopLabel({ at, title, subtitle, persona }: { at: number; title: string; subtitle: string; persona: string }) {
  return (
    <Build at={at} y={12} delay={0.2}>
      <p className="display text-[28px]">{title}</p>
      <p className="mt-1 text-[16px] text-white/55 italic">({subtitle})</p>
      <p className="mt-2 inline-block rounded-full bg-white/[0.07] px-4 py-1 text-[15px] font-medium text-cyan ring-1 ring-white/10">{persona}</p>
    </Build>
  )
}

function Pulse({ path, delay }: { path: string; delay: number }) {
  return (
    <circle r="5" fill="#fff" opacity="0.9">
      <animateMotion dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" path={path} rotate="auto" />
    </circle>
  )
}

function Engines() {
  const on = useBuilt(4)
  return (
    <Build at={4} className="mt-8">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/25" />
        <p className="eyebrow text-[13px] text-cyan">{lifecycle.foundation.title}</p>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/25" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {lifecycle.foundation.engines.map((e, i) => (
          <EngineTile key={e} name={e} index={i} on={on} />
        ))}
      </div>
    </Build>
  )
}

function EngineTile({ name, index, on }: { name: string; index: number; on: boolean }) {
  const t = useBuildTransition(4, 0.2 + index * 0.12, 0.6)
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 16 }}
      transition={t}
      className="relative flex h-full min-h-[118px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/[0.05] px-4 py-6 text-center ring-1 ring-white/10 transition-colors hover:bg-white/[0.09]"
    >
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ ...t, delay: (t.delay ?? 0) + 0.3 }}
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent"
      />
      <p className="text-[13px] font-medium text-white/40 tabular">0{index + 1}</p>
      <p className="mt-2 text-[16px] font-semibold tracking-[0.08em] uppercase">{name}</p>
    </motion.div>
  )
}
