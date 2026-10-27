import { motion } from 'motion/react'
import { personas, type Persona } from '../content/shift'
import { Build, useBuildTransition, useBuilt } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { Words } from '../deck/Words'

/**
 * Slide 6 · Core Persona Evolution.
 * Builds: 0 Then (legacy roles) · 1 Now (agentic roles) · 2 closing statement.
 */
export function Personas() {
  const now = useBuilt(1)
  const recede = useBuildTransition(1, 0, 0.7)
  const arrow = useBuildTransition(1, 0.1, 0.7)

  return (
    <SlideFrame eyebrow="Persona Evolution" title={personas.title} subtitle={personas.subtitle}>
      <div className="grid grid-cols-[1.5fr_auto_1fr] items-stretch gap-6">
        <motion.div initial={false} animate={{ opacity: now ? 0.62 : 1, scale: now ? 0.98 : 1 }} transition={recede} className="origin-left">
          <Build delay={0.2} className="h-full">
            <Panel tone="then" eyebrow={personas.then.eyebrow} title={personas.then.title} items={personas.then.personas} at={0} />
          </Build>
        </motion.div>

        <div className="flex items-center">
          <motion.span
            initial={false}
            animate={{ opacity: now ? 1 : 0, rotate: now ? 0 : -90 }}
            transition={arrow}
            className="grid size-16 place-items-center rounded-full bg-royal text-white shadow-[0_12px_30px_-8px_rgba(2,42,192,0.6)]"
          >
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>

        <Build at={1} x={80} y={0} className="h-full">
          <Panel tone="now" eyebrow={personas.now.eyebrow} title={personas.now.title} items={personas.now.personas} at={1} />
        </Build>
      </div>

      <Build at={2} className="mt-6 border-t hairline pt-6" y={10}>
        <Words text={personas.statement} at={2} dim={0.15} className="display max-w-[1100px] text-[31px] leading-[1.2] font-semibold text-ink" />
      </Build>
    </SlideFrame>
  )
}

function Panel({ tone, eyebrow, title, items, at }: { tone: 'then' | 'now'; eyebrow: string; title: string; items: Persona[]; at: number }) {
  const now = tone === 'now'
  return (
    <div className={`relative h-full overflow-hidden rounded-[32px] p-7 ${now ? 'bg-navy-900 text-white shadow-[0_40px_80px_-30px_rgba(0,30,91,0.6)]' : 'card'}`}>
      {now && <div aria-hidden className="pointer-events-none absolute -top-1/3 -right-1/4 size-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(0,179,255,0.35),transparent)] blur-2xl" />}
      <p className={`eyebrow text-[13px] ${now ? 'text-cyan' : 'text-ink-faint'}`}>{eyebrow}</p>
      <h3 className="display mt-2 text-[34px]">{title}</h3>
      <div className={`mt-5 grid gap-4 ${now ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {items.map((it, i) => (
          <Build key={it.name} at={at} delay={0.3 + i * 0.12} y={16}>
            <PersonaCard persona={it} now={now} index={i} />
          </Build>
        ))}
      </div>
    </div>
  )
}

function PersonaCard({ persona, now, index }: { persona: Persona; now: boolean; index: number }) {
  const lit = useBuilt(1)
  const glow = useBuildTransition(1, 0.6 + index * 0.25, 0.8)
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`relative flex h-full flex-col rounded-2xl p-6 ${now ? 'bg-white text-ink' : 'min-h-[190px] bg-paper ring-1 ring-line'}`}
    >
      {now && (
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: lit ? 1 : 0 }}
          transition={glow}
          className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_40px_-6px_rgba(0,179,255,0.7)] ring-2 ring-cyan"
        />
      )}
      <p className="display text-[24px] leading-tight font-semibold">{persona.name}</p>
      <p className={`text-[18px] leading-snug text-ink-soft ${now ? 'pt-2' : 'mt-auto pt-6'}`}>{persona.description}</p>
    </motion.div>
  )
}
