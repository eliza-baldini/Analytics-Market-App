import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { durableLoop } from '../content/vision'
import { Reveal, Stagger, StaggerItem, easeOutExpo } from '../components/motion/Reveal'
import { RichText } from '../components/ui/RichText'
import { useScrollTo } from '../components/motion/SmoothScroll'
import { useIsDesktop } from '../hooks/useMediaQuery'

const R = 150
const C = 2 * Math.PI * R
// Steps sit at 12, 3, 6 and 9 o'clock, as on the slide.
const positions = [0, 90, 180, 270].map((deg) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: 200 + R * Math.cos(rad), y: 200 + R * Math.sin(rad) }
})

/** Slide 5 · The Durable Loop. Pinned: scrolling walks the loop one step at a time. */
export function DurableLoop() {
  return useIsDesktop() ? <PinnedLoop /> : <StackedLoop />
}

function PinnedLoop() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollTo = useScrollTo()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const ring = useTransform(p, [0.05, 0.9], [0, 1])
  const dash = useTransform(ring, (v) => `${v * C} ${C}`)
  const [active, setActive] = useState(0)
  const steps = durableLoop.steps

  useMotionValueEvent(p, 'change', (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(((v - 0.05) / 0.85) * steps.length)))
    setActive(next)
  })

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const span = el.offsetHeight - window.innerHeight
    const target = el.offsetTop + span * (0.05 + ((i + 0.5) / steps.length) * 0.85)
    scrollTo(target)
  }

  return (
    <section id="durable-loop" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center-safe overflow-hidden pt-16">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[0.9fr_1.1fr] items-center gap-16 px-10">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 text-royal">The Durable Loop</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(2.3rem,4vw,3.6rem)] text-ink">{durableLoop.title}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[36ch] text-[clamp(1.1rem,1.5vw,1.35rem)] leading-snug font-medium text-ink-soft">
                <RichText text={durableLoop.statement} accentClass="text-royal" />
              </p>
            </Reveal>

            <div className="relative mt-10 min-h-[150px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                  transition={{ duration: 0.28, ease: easeOutExpo }}
                  className="border-l-2 border-royal pl-6"
                >
                  <p className="eyebrow text-royal tabular">
                    Step {active + 1} / {steps.length} · {steps[active].role}
                  </p>
                  <h3 className="display mt-3 text-[1.85rem] text-ink">{steps[active].title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{steps[active].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="mt-6 flex gap-2">
              {steps.map((s, i) => (
                <li key={s.title} className="flex-1">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className="group w-full text-left"
                    aria-label={`Step ${i + 1}: ${s.title}`}
                  >
                    <span className="block h-[3px] overflow-hidden rounded-full bg-line">
                      <motion.span
                        className="block h-full origin-left bg-royal"
                        animate={{ scaleX: i <= active ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: easeOutExpo }}
                      />
                    </span>
                    <span
                      className={`mt-2.5 block text-[12px] leading-snug font-medium transition-colors ${
                        i === active ? 'text-ink' : 'text-ink-faint group-hover:text-ink-soft'
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[min(560px,66vh)]">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#022ac0" />
                  <stop offset="1" stopColor="#00b3ff" />
                </linearGradient>
                <radialGradient id="disc" cx="50%" cy="45%" r="60%">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#d9ecff" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="118" fill="url(#disc)" />
              <circle cx="200" cy="200" r={R} fill="none" stroke="#dbe6f6" strokeWidth="2" strokeDasharray="3 6" />
              <motion.circle
                cx="200"
                cy="200"
                r={R}
                fill="none"
                stroke="url(#ring-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                transform="rotate(-90 200 200)"
                style={{ strokeDasharray: dash }}
              />
              <circle cx="200" cy="200" r="174" fill="none" stroke="#022ac0" strokeOpacity="0.06" strokeWidth="1" />
            </svg>

            <div className="absolute inset-0 grid place-items-center">
              <p className="display max-w-[7ch] text-center text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight text-royal">
                {durableLoop.center}
              </p>
            </div>

            {steps.map((s, i) => (
              <StepNode key={s.title} index={i} active={active} title={s.title} onSelect={() => goTo(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepNode({
  index,
  active,
  title,
  onSelect,
}: {
  index: number
  active: number
  title: string
  onSelect: () => void
}) {
  const pos = positions[index]
  const isActive = index === active
  const done = index < active
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${(pos.x / 400) * 100}%`, top: `${(pos.y / 400) * 100}%` }}
      aria-label={`Step ${index + 1}: ${title}`}
      aria-current={isActive ? 'step' : undefined}
    >
      <motion.span
        className="relative grid size-14 place-items-center rounded-full text-[17px] font-semibold tabular"
        animate={{
          scale: isActive ? 1.12 : 1,
          backgroundColor: isActive || done ? '#022ac0' : '#ffffff',
          color: isActive || done ? '#ffffff' : '#022ac0',
          boxShadow: isActive
            ? '0 0 0 8px rgba(2,42,192,0.12), 0 18px 40px -10px rgba(2,42,192,0.6)'
            : '0 0 0 1px rgba(2,42,192,0.15), 0 8px 20px -10px rgba(0,30,91,0.3)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {index + 1}
      </motion.span>
    </button>
  )
}

function StackedLoop() {
  return (
    <section id="durable-loop" className="px-6 py-24">
      <p className="eyebrow mb-6 text-royal">The Durable Loop</p>
      <h2 className="display text-[2.3rem] text-ink">{durableLoop.title}</h2>
      <p className="mt-6 text-[1.1rem] leading-snug font-medium text-ink-soft">
        <RichText text={durableLoop.statement} accentClass="text-royal" />
      </p>
      <Stagger className="mt-10 grid gap-4">
        {durableLoop.steps.map((s, i) => (
          <StaggerItem key={s.title} className="card flex gap-5 p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-royal font-semibold text-white">{i + 1}</span>
            <div>
              <p className="display text-lg text-ink">{s.title}</p>
              <p className="mt-1 text-[14px] text-ink-soft">
                <span className="italic">({s.role})</span>: {s.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
