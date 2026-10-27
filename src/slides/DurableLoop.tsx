import { AnimatePresence, motion } from 'motion/react'
import { durableLoop } from '../content/vision'
import { Build, easeOutExpo, useBuildTransition, useSlideStep } from '../deck/Build'
import { RichText } from '../components/ui/RichText'

const R = 150
const C = 2 * Math.PI * R
// Steps sit at 12, 3, 6 and 9 o'clock, as on the slide.
const positions = [0, 90, 180, 270].map((deg) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: 200 + R * Math.cos(rad), y: 200 + R * Math.sin(rad) }
})

/** The arc runs from step 1 to the active step, and closes the loop on the final step. */
function ringFraction(step: number, total: number) {
  if (step <= 1) return 0
  return step >= total ? 1 : (step - 1) / total
}

/**
 * Slide 8 · Building the Durable Loop for Agentic Data Apps.
 * Builds: 0 title · 1–4 each step of the loop (the ring fills a quarter per step).
 */
export function DurableLoop() {
  const { step, goToStep: setStep } = useSlideStep()
  const steps = durableLoop.steps
  const active = step - 1
  const ringT = useBuildTransition(Math.max(1, step), 0, 0.9)

  return (
    <div className="grid h-full grid-cols-[0.95fr_1.05fr] items-center gap-16 px-24">
      <div>
        <Build y={12}>
          <p className="eyebrow mb-6 text-[13px] text-royal">The Durable Loop</p>
        </Build>
        <Build delay={0.05}>
          <h2 className="display text-[58px] leading-[1.03] text-ink">{durableLoop.title}</h2>
        </Build>
        <Build delay={0.15}>
          <p className="mt-7 max-w-[34ch] text-[25px] leading-snug font-medium text-ink-soft">
            <RichText text={durableLoop.statement} accentClass="text-royal" />
          </p>
        </Build>

        <div className="relative mt-10 min-h-[170px]">
          <AnimatePresence mode="wait">
            {active >= 0 && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className="border-l-[3px] border-royal pl-7"
              >
                <p className="eyebrow text-[13px] text-royal tabular">
                  Step {active + 1} / {steps.length} · {steps[active].role}
                </p>
                <h3 className="display mt-3 text-[36px] text-ink">{steps[active].title}</h3>
                <p className="mt-3 text-[21px] leading-relaxed text-ink-soft">{steps[active].description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Build delay={0.25}>
          <ol className="mt-6 flex gap-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex-1">
                <button type="button" onClick={() => setStep(i + 1)} className="group w-full text-left" aria-label={`Step ${i + 1}: ${s.title}`}>
                  <span className="block h-[4px] overflow-hidden rounded-full bg-line">
                    <motion.span
                      className="block h-full origin-left bg-royal"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: easeOutExpo }}
                    />
                  </span>
                  <span className={`mt-3 block text-[15px] leading-snug font-medium transition-colors ${i === active ? 'text-ink' : 'text-ink-faint group-hover:text-ink-soft'}`}>
                    {s.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </Build>
      </div>

      <Build delay={0.2} scale={0.94} y={0} className="relative mx-auto aspect-square w-full max-w-[680px]">
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
            initial={false}
            animate={{ strokeDasharray: `${ringFraction(step, steps.length) * C} ${C}` }}
            transition={ringT}
          />
          <circle cx="200" cy="200" r="174" fill="none" stroke="#022ac0" strokeOpacity="0.06" strokeWidth="1" />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <p className="display max-w-[7ch] text-center text-[46px] leading-tight text-royal">{durableLoop.center}</p>
        </div>
        {steps.map((s, i) => (
          <StepNode key={s.title} index={i} active={active} title={s.title} onSelect={() => setStep(i + 1)} />
        ))}
      </Build>
    </div>
  )
}

function StepNode({ index, active, title, onSelect }: { index: number; active: number; title: string; onSelect: () => void }) {
  const pos = positions[index]
  const isActive = index === active
  const done = index < active
  return (
    <button
      type="button"
      onClick={onSelect}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${(pos.x / 400) * 100}%`, top: `${(pos.y / 400) * 100}%` }}
      aria-label={`Step ${index + 1}: ${title}`}
      aria-current={isActive ? 'step' : undefined}
    >
      <motion.span
        className="relative grid size-[72px] place-items-center rounded-full text-[22px] font-semibold tabular"
        initial={false}
        animate={{
          scale: isActive ? 1.12 : 1,
          backgroundColor: isActive || done ? '#022ac0' : '#ffffff',
          color: isActive || done ? '#ffffff' : '#022ac0',
          boxShadow: isActive
            ? '0 0 0 10px rgba(2,42,192,0.12), 0 18px 40px -10px rgba(2,42,192,0.6)'
            : '0 0 0 1px rgba(2,42,192,0.15), 0 8px 20px -10px rgba(0,30,91,0.3)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {index + 1}
      </motion.span>
    </button>
  )
}
