import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { personas, type Persona } from '../content/shift'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal'
import { ScrollWords } from '../components/motion/ScrollWords'
import { useIsDesktop } from '../hooks/useMediaQuery'

/** Slide 2 · Core Persona Evolution. Pinned: Then gives way to Now as you scroll. */
export function Personas() {
  const desktop = useIsDesktop()
  return desktop ? <PinnedPersonas /> : <StackedPersonas />
}

function PinnedPersonas() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const thenOpacity = useTransform(p, [0.28, 0.5], [1, 0.62])
  const thenScale = useTransform(p, [0.28, 0.5], [1, 0.97])
  const nowX = useTransform(p, [0.18, 0.48], [140, 0])
  const nowOpacity = useTransform(p, [0.18, 0.4], [0, 1])
  const arrowRotate = useTransform(p, [0.18, 0.48], [-90, 0])
  const arrowOpacity = useTransform(p, [0.14, 0.3], [0, 1])
  const statementProgress = useTransform(p, [0.56, 0.9], [0, 1])
  const statementOpacity = useTransform(p, [0.5, 0.58], [0, 1])

  // On shorter screens, glide the whole composition up so the closing statement has room.
  const content = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState(0)
  useLayoutEffect(() => {
    const measure = () => {
      if (!content.current) return
      setOverflow(Math.max(0, content.current.offsetHeight - window.innerHeight))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const shift = useTransform(p, [0.48, 0.6], [0, -overflow])

  return (
    <section id="personas" ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center-safe overflow-hidden">
        <motion.div ref={content} style={{ y: shift }} className="mx-auto w-full max-w-[1240px] px-10 pt-24 pb-10">
          <SectionHeading size="md" eyebrow="Persona Evolution" title={personas.title} subtitle={personas.subtitle} className="mb-10" />

          <div className="grid grid-cols-[1.5fr_auto_1fr] items-stretch gap-5 xl:gap-6">
            <motion.div style={{ opacity: thenOpacity, scale: thenScale }} className="origin-left">
              <Panel tone="then" eyebrow={personas.then.eyebrow} title={personas.then.title} items={personas.then.personas} />
            </motion.div>

            <motion.div style={{ opacity: arrowOpacity }} className="flex items-center">
              <motion.span
                style={{ rotate: arrowRotate }}
                className="grid size-12 place-items-center rounded-full bg-royal text-white shadow-[0_12px_30px_-8px_rgba(2,42,192,0.6)]"
              >
                <Arrow />
              </motion.span>
            </motion.div>

            <motion.div style={{ x: nowX, opacity: nowOpacity }}>
              <Panel tone="now" eyebrow={personas.now.eyebrow} title={personas.now.title} items={personas.now.personas} progress={p} />
            </motion.div>
          </div>

          <motion.div style={{ opacity: statementOpacity }} className="mt-10 border-t hairline pt-7">
            <ScrollWords
              text={personas.statement}
              progress={statementProgress}
              dim={0.18}
              className="display max-w-[40ch] text-[clamp(1.4rem,2.3vw,2.1rem)] leading-[1.2] font-semibold text-ink"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StackedPersonas() {
  return (
    <section id="personas" className="px-6 py-24">
      <SectionHeading eyebrow="Persona Evolution" title={personas.title} subtitle={personas.subtitle} className="mb-12" />
      <div className="grid gap-5">
        <Reveal>
          <Panel tone="then" eyebrow={personas.then.eyebrow} title={personas.then.title} items={personas.then.personas} />
        </Reveal>
        <Reveal>
          <Panel tone="now" eyebrow={personas.now.eyebrow} title={personas.now.title} items={personas.now.personas} />
        </Reveal>
      </div>
      <Reveal className="mt-10">
        <p className="display text-2xl leading-snug text-ink">{personas.statement}</p>
      </Reveal>
    </section>
  )
}

function Panel({
  tone,
  eyebrow,
  title,
  items,
  progress,
}: {
  tone: 'then' | 'now'
  eyebrow: string
  title: string
  items: Persona[]
  progress?: MotionValue<number>
}) {
  const now = tone === 'now'
  const settled = useMotionValue(1)
  return (
    <div
      className={`relative h-full overflow-hidden rounded-[28px] p-6 lg:p-7 ${
        now ? 'bg-navy-900 text-white shadow-[0_40px_80px_-30px_rgba(0,30,91,0.6)]' : 'card'
      }`}
    >
      {now && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 -right-1/4 size-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(0,179,255,0.35),transparent)] blur-2xl"
        />
      )}
      <p className={`eyebrow ${now ? 'text-cyan' : 'text-ink-faint'}`}>{eyebrow}</p>
      <h3 className="display mt-2 text-[1.75rem]">{title}</h3>
      <Stagger className={`mt-6 grid gap-3 ${now ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`} stagger={0.1}>
        {items.map((it, i) => (
          <StaggerItem key={it.name}>
            <PersonaCard persona={it} now={now} progress={progress ?? settled} highlight={!!progress} index={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}

function PersonaCard({
  persona,
  now,
  progress,
  highlight,
  index,
}: {
  persona: Persona
  now: boolean
  progress: MotionValue<number>
  highlight: boolean
  index: number
}) {
  // In the pinned layout the Now cards light up one after another.
  const glow = useTransform(progress, [0.36 + index * 0.08, 0.5 + index * 0.08], [0, 1])
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`relative flex h-full flex-col rounded-2xl p-5 ${
        now ? 'bg-white text-ink' : 'bg-paper ring-1 ring-line'
      }`}
    >
      {now && highlight && (
        <motion.span
          aria-hidden
          style={{ opacity: glow }}
          className="pointer-events-none absolute -inset-px rounded-2xl ring-2 ring-cyan shadow-[0_0_40px_-6px_rgba(0,179,255,0.7)]"
        />
      )}
      <p className="display text-[1.08rem] leading-tight font-semibold">{persona.name}</p>
      <p className={`text-[14px] leading-relaxed text-ink-soft ${now ? 'pt-2' : 'mt-auto pt-6'}`}>{persona.description}</p>
    </motion.div>
  )
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
