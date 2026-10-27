import { motion } from 'motion/react'
import { legacyBI } from '../content/shift'
import { Build, useBuildTransition, useBuilt } from '../deck/Build'
import { Words } from '../deck/Words'
import { RichText } from '../components/ui/RichText'

/**
 * Slide 2 · Legacy BI: Analytics as a Linear Process.
 * Builds: 0 statement panel · 1–3 each stage · 4 the dead end.
 */
export function LegacyBI() {
  return (
    <div className="grid h-full grid-cols-[500px_1fr] gap-12 px-20 py-16">
      <Build x={-40} y={0} className="h-full">
        <div className="grain relative flex h-full flex-col justify-between overflow-hidden rounded-[36px] bg-royal p-12 text-white shadow-[0_50px_100px_-40px_rgba(2,42,192,0.7)]">
          <div aria-hidden className="absolute -right-24 -bottom-24 size-96 rounded-full bg-[radial-gradient(closest-side,rgba(0,179,255,0.45),transparent)] blur-2xl" />
          <div className="relative">
            <p className="eyebrow mb-6 text-[13px] text-cyan">Legacy BI</p>
            <h2 className="display text-[52px]">
              {legacyBI.title}
              <br />
              <span className="font-semibold italic">{legacyBI.titleEmphasis}</span>
            </h2>
          </div>
          <Words
            text={legacyBI.statement}
            dim={0.28}
            delay={0.4}
            className="display relative text-[34px] leading-[1.18] font-semibold"
          />
        </div>
      </Build>

      <div className="flex flex-col justify-center">
        <div className="relative grid grid-cols-3 gap-5">
          {legacyBI.stages.map((s, i) => (
            <Stage key={s.stage} index={i} stage={s.stage} role={s.role} points={s.points} />
          ))}
        </div>
        <DeadEnd />
      </div>
    </div>
  )
}

function Stage({ index, stage, role, points }: { index: number; stage: string; role: string; points: string[] }) {
  const at = index + 1
  return (
    <Build at={at} y={30} className="relative">
      <article className="card flex h-full flex-col p-8">
        <div className="mb-5 flex items-center justify-between">
          <span className="grid size-10 place-items-center rounded-full bg-sky text-[14px] font-semibold text-royal tabular">
            {String(index + 1).padStart(2, '0')}
          </span>
          {index < 2 && <Chevron at={at} />}
        </div>
        <h3 className="display text-[32px] leading-tight">{stage}</h3>
        <p className="eyebrow mt-2 text-[13px] text-royal">{role}</p>
        <ul className="mt-6 space-y-3">
          {points.map((pt, k) => (
            <Build key={pt} at={at} delay={0.15 + k * 0.08} y={10}>
              <li className="flex gap-3 text-[19px] leading-snug text-ink-soft">
                <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-cyan" />
                {pt}
              </li>
            </Build>
          ))}
        </ul>
      </article>
    </Build>
  )
}

function Chevron({ at }: { at: number }) {
  const next = useBuilt(at + 1)
  return (
    <motion.span
      aria-hidden
      animate={{ x: next ? 0 : -6, opacity: next ? 1 : 0.35 }}
      transition={{ duration: 0.5 }}
      className="text-[22px] font-semibold text-royal"
    >
      ›
    </motion.span>
  )
}

/** The return path from consumption back to the data team never completes. */
function DeadEnd() {
  const shown = useBuilt(4)
  const draw = useBuildTransition(4, 0, 1.4)
  const pop = useBuildTransition(4, 1.1, 0.5)
  return (
    <div className="relative mt-6">
      <svg viewBox="0 0 900 90" className="mb-2 h-[86px] w-full" fill="none" aria-hidden>
        <defs>
          <mask id="dead-end-reveal-slide">
            <motion.path
              d="M760 6 C 760 70, 420 80, 200 50"
              stroke="#fff"
              strokeWidth="8"
              fill="none"
              initial={false}
              animate={{ pathLength: shown ? 1 : 0 }}
              transition={draw}
            />
          </mask>
        </defs>
        <path d="M760 6 C 760 70, 420 80, 200 50" stroke="#022ac0" strokeWidth="2.4" strokeDasharray="7 9" strokeLinecap="round" mask="url(#dead-end-reveal-slide)" />
        <motion.g initial={false} animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.4 }} transition={pop} style={{ originX: '186px', originY: '50px' }}>
          <circle cx="186" cy="50" r="15" fill="#fff" stroke="#e5372b" strokeWidth="2.4" />
          <path d="M180 44l12 12M192 44l-12 12" stroke="#e5372b" strokeWidth="2.4" strokeLinecap="round" />
        </motion.g>
      </svg>
      <Build at={4} delay={0.5}>
        <div className="rounded-[24px] border border-royal/15 bg-gradient-to-br from-white to-sky px-9 py-7">
          <p className="text-[26px] leading-relaxed text-ink">
            <RichText text={legacyBI.deadEnd} />
          </p>
        </div>
      </Build>
    </div>
  )
}
