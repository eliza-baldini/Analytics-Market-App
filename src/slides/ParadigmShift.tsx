import { motion } from 'motion/react'
import { paradigmShift as c } from '../content/agentic'
import { Build, useBuildTransition, useBuilt } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'

/**
 * Slide 8 · AI/BI Architectural Paradigm Shift.
 * Builds: 0 title · 1–4 each pillar · 5 the capability tags.
 */
export function ParadigmShift() {
  return (
    <SlideFrame title={c.title} subtitle={c.subtitle} headerClassName="[&_h2]:text-[46px] [&_p]:text-[20px]">
      <div className="grid grid-cols-4 gap-6">
        {c.pillars.map((p, i) => (
          <Build key={p.title} at={i + 1} y={36} className="h-full">
            <article className="relative flex h-full flex-col">
              <div className="relative z-10 mx-auto -mb-7 grid min-h-[78px] w-[80%] place-items-center rounded-2xl bg-white px-4 py-3 text-center shadow-[0_10px_24px_-12px_rgba(0,30,91,0.4)] ring-1 ring-royal/15">
                <h3 className="display text-[23px] leading-tight text-navy-900">{p.title}</h3>
              </div>
              <div className="flex min-h-[400px] flex-1 flex-col rounded-[24px] rounded-b-[60px] bg-gradient-to-b from-royal to-navy-800 px-7 pt-14 pb-10 text-center text-white shadow-[0_30px_60px_-30px_rgba(2,42,192,0.8)]">
                <ul className="space-y-4">
                  {p.points.map((pt, k) => (
                    <Build key={pt} at={i + 1} delay={0.2 + k * 0.08} y={10}>
                      <li className="text-[23px] font-semibold">{pt}</li>
                    </Build>
                  ))}
                </ul>
                <span className="mx-auto my-6 h-px w-full bg-white/25" />
                <Build at={i + 1} delay={0.5} y={8}>
                  <p className="text-[20px] leading-snug text-white/85 italic">{p.summary}</p>
                </Build>
              </div>
            </article>
          </Build>
        ))}
      </div>
      <ul className="mx-auto mt-8 flex max-w-[1300px] flex-wrap justify-center gap-x-1 gap-y-2">
        {c.tags.map((t, i) => (
          <Tag key={t} label={t} index={i} last={i === c.tags.length - 1} />
        ))}
      </ul>
    </SlideFrame>
  )
}

function Tag({ label, index, last }: { label: string; index: number; last: boolean }) {
  const on = useBuilt(5)
  const t = useBuildTransition(5, index * 0.07, 0.5)
  return (
    <motion.li initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10 }} transition={t} className="display text-[24px] text-royal">
      {label}
      {!last && <span className="mx-2 text-royal/40">|</span>}
    </motion.li>
  )
}
