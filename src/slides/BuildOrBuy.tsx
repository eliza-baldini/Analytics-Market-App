import { motion } from 'motion/react'
import { buildOrBuy, type GapRow } from '../content/buildBuy'
import { Build, useBuildTransition, useBuilt } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'

const MAX = buildOrBuy.axis[buildOrBuy.axis.length - 1]
const pct = (m: number) => `${(m / MAX) * 100}%`
const fmt = ([a, b]: [number, number]) => `${a}–${b} mo`
const cols = 'grid grid-cols-[400px_1fr_250px] gap-10'

/**
 * Slide 18 · Catching Up: Build or Buy.
 * Builds: 0 the gaps and axis · 1 build-to-parity ranges · 2 buy-or-partner ranges · 3 initial lean.
 */
export function BuildOrBuy() {
  return (
    <SlideFrame inverted eyebrow="Build or Buy" title={buildOrBuy.title} notes={{ ...buildOrBuy.notes, title: buildOrBuy.title }}>
      <div aria-hidden className="pointer-events-none absolute -top-[30%] left-[20%] size-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(2,42,192,0.5),transparent)] blur-3xl" />
      <div className="relative">
        <Build delay={0.15}>
          <div className={`${cols} border-b border-white/10 pb-3 text-[14px] font-semibold tracking-wide text-white/50 uppercase`}>
            <span>{buildOrBuy.columns.gap}</span>
            <span>{buildOrBuy.columns.range}</span>
            <span>{buildOrBuy.columns.lean}</span>
          </div>
        </Build>

        {buildOrBuy.rows.map((r, i) => (
          <GapRowView key={r.gap} row={r} index={i} />
        ))}

        <Build delay={0.4}>
          <div className={`${cols} pt-3`}>
            <span />
            <div className="relative h-6">
              {buildOrBuy.axis.map((t) => (
                <span key={t} className="absolute -translate-x-1/2 text-[15px] text-white/45 tabular" style={{ left: pct(t) }}>
                  {t}
                </span>
              ))}
            </div>
            <span />
          </div>
        </Build>

        <Build delay={0.5} className="mt-6 flex items-center justify-between gap-10 border-t border-white/10 pt-5">
          <div className="flex gap-8 text-[16px] text-white/75">
            <span className="flex items-center gap-3">
              <span className="h-3 w-8 rounded-full bg-white" /> {buildOrBuy.legend.build}
            </span>
            <span className="flex items-center gap-3">
              <span className="h-3 w-8 rounded-full bg-cyan" /> {buildOrBuy.legend.buy}
            </span>
          </div>
          <p className="max-w-[640px] text-right text-[15px] text-white/50 italic">{buildOrBuy.disclaimer}</p>
        </Build>
      </div>
    </SlideFrame>
  )
}

function GapRowView({ row: r, index }: { row: GapRow; index: number }) {
  const lean = useBuilt(3)
  const leanT = useBuildTransition(3, index * 0.1, 0.6)
  return (
    <div className={`${cols} group items-center border-b border-white/[0.07] py-5 transition-colors hover:bg-white/[0.03]`}>
      <Build delay={0.2 + index * 0.06} x={-16} y={0}>
        <p className="text-[19px] font-semibold">{r.gap}</p>
        <p className="mt-1 text-[15px] text-white/55">{r.leaders}</p>
      </Build>

      <div className="relative h-[60px]">
        {buildOrBuy.axis.map((t) => (
          <span key={t} aria-hidden className="absolute inset-y-[-20px] w-px border-l border-dashed border-white/10" style={{ left: pct(t) }} />
        ))}
        <Bar range={r.build} at={1} index={index} position="top-1" color="bg-white" />
        <Bar range={r.buy} at={2} index={index} position="bottom-1" color="bg-cyan" />
      </div>

      <motion.p initial={false} animate={{ opacity: lean ? 1 : 0, x: lean ? 0 : 16 }} transition={leanT}>
        <span className="inline-block rounded-2xl bg-white/[0.07] px-4 py-2 text-[17px] leading-snug font-semibold ring-1 ring-white/10 transition group-hover:bg-white/[0.12]">
          {r.lean}
        </span>
      </motion.p>
    </div>
  )
}

function Bar({ range, at, index, position, color }: { range: [number, number]; at: number; index: number; position: string; color: string }) {
  const on = useBuilt(at)
  const t = useBuildTransition(at, index * 0.08, 0.9)
  const label = useBuildTransition(at, index * 0.08 + 0.5, 0.5)
  const [from, to] = range
  return (
    <div className={`absolute flex h-[22px] items-center ${position}`} style={{ left: pct(from), width: pct(to - from) }}>
      <motion.span initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={t} className={`h-full w-full origin-left rounded-full ${color} shadow-[0_6px_20px_-6px_rgba(0,179,255,0.5)]`} />
      <motion.span initial={false} animate={{ opacity: on ? 1 : 0 }} transition={label} className="absolute left-[calc(100%+12px)] text-[15px] font-medium whitespace-nowrap text-white/80 tabular">
        {fmt(range)}
      </motion.span>
    </div>
  )
}
