import { motion } from 'motion/react'
import { Fragment, useState } from 'react'
import { comparisons, legend, type ComparisonRow } from '../content/competitive'
import { Build, useBuildTransition, useSlideStep } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'

const grid = 'grid grid-cols-[minmax(0,1.25fr)_repeat(2,150px)_minmax(0,2.4fr)] items-center'

/** Quarter-step harvey ball; the fill sweeps in when its vendor's build is reached. */
function Ball({ score, shown, delay, at }: { score: number; shown: boolean; delay: number; at: number }) {
  const R = 10
  const INNER = R / 2
  const C = 2 * Math.PI * INNER
  const t = useBuildTransition(at, delay, 0.8)
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className="text-navy-900" role="img" aria-label={`${score} of 4`}>
      <circle cx="12" cy="12" r={R} fill="white" stroke="currentColor" strokeWidth="1.6" />
      {score > 0 && (
        <motion.circle
          cx="12"
          cy="12"
          r={INNER}
          fill="none"
          stroke="currentColor"
          strokeWidth={R}
          transform="rotate(-90 12 12)"
          initial={false}
          animate={{ strokeDasharray: `${shown ? (score / 4) * C : 0} ${C}` }}
          transition={t}
        />
      )}
    </svg>
  )
}

/**
 * Slides 25–26 · Tableau vs. one competitor.
 * Builds: 0 the table and Tableau's scores · 1 the competitor's scores.
 */
export function Comparison({ id }: { id: string }) {
  const c = comparisons.find((x) => x.id === id)!
  const vendors = ['Tableau', c.competitor]
  const [vendor, setVendor] = useState<number | null>(null)
  const [row, setRow] = useState<string | null>(null)
  const { step } = useSlideStep()

  return (
    <SlideFrame
      title={c.title}
      subtitle={c.subtitle}
      className="!pt-12 !pb-10"
      headerClassName="[&_h2]:text-[44px] [&_p]:mt-2 [&_p]:text-[20px]"
    >
      <Build delay={0.2} className="mt-5">
        <div className="card overflow-hidden" role="table" aria-label={c.title} onMouseLeave={() => setRow(null)}>
          <div role="row" className={`${grid} border-b hairline px-6 py-3 text-[15px] font-semibold text-ink`}>
            <span role="columnheader">Capability</span>
            {vendors.map((v, vi) => (
              <motion.span
                key={v}
                role="columnheader"
                onMouseEnter={() => setVendor(vi)}
                onMouseLeave={() => setVendor(null)}
                initial={false}
                animate={{ opacity: step >= vi ? 1 : 0.3 }}
                className={`cursor-default text-center transition-colors ${vendor === vi ? 'text-royal' : ''}`}
              >
                {v}
              </motion.span>
            ))}
            <span role="columnheader" className="pl-6">
              Evidence
            </span>
          </div>

          <div className="relative">
            <div aria-hidden className={`pointer-events-none absolute inset-0 px-6 ${grid}`}>
              <span />
              {vendors.map((v, vi) => (
                <motion.span
                  key={v}
                  className="h-full rounded-xl bg-sky"
                  initial={false}
                  animate={{ opacity: vendor === vi ? 1 : vi === step && vendor === null ? 0.7 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
              <span />
            </div>

            {c.groups.map((g) => (
              <Fragment key={g.name}>
                <div role="row" className="relative bg-navy-900 px-6 py-1.5">
                  <span role="rowheader" className="text-[12.5px] font-semibold tracking-[0.12em] text-white uppercase">
                    {g.name}
                  </span>
                </div>
                {g.rows.map((r, ri) => (
                  <Row key={r.name} row={r} index={ri} vendor={vendor} active={row === r.name} onHover={() => setRow(r.name)} />
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </Build>

      <Build delay={0.3} className="mt-4 flex items-center gap-7 text-[15px] text-ink-soft">
        <span className="font-semibold text-ink">Legend:</span>
        {legend.map((l) => (
          <span key={l.score} className="flex items-center gap-2">
            <Ball score={l.score} shown delay={0} at={0} />
            {l.label}
          </span>
        ))}
      </Build>
    </SlideFrame>
  )
}

function Row({ row: r, index, vendor, active, onHover }: { row: ComparisonRow; index: number; vendor: number | null; active: boolean; onHover: () => void }) {
  const { step } = useSlideStep()
  return (
    <div
      role="row"
      onMouseEnter={onHover}
      className={`relative ${grid} border-b hairline px-6 py-[5px] transition-colors duration-200 last:border-b-0 ${active ? 'bg-paper/80' : ''}`}
    >
      <span role="cell" className="flex items-center gap-2 text-[16px] text-ink">
        {r.name}
      </span>
      {r.scores.map((s, vi) => (
        <span role="cell" key={vi} className={`relative flex justify-center transition-opacity duration-300 ${vendor !== null && vendor !== vi ? 'opacity-30' : ''}`}>
          <Ball score={s} shown={step >= vi} at={vi} delay={0.25 + index * 0.05} />
        </span>
      ))}
      <span role="cell" className={`pl-6 text-[14.5px] leading-snug transition-colors ${active ? 'text-ink' : 'text-ink-soft'}`}>
        {r.evidence}
      </span>
    </div>
  )
}
