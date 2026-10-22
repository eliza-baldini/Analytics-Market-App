import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { buildOrBuy, type GapRow } from '../content/buildBuy'
import { SectionHeading } from '../components/layout/SectionHeading'
import { NotesButton } from '../components/notes/NotesButton'
import { Reveal } from '../components/motion/Reveal'

const MAX = buildOrBuy.axis[buildOrBuy.axis.length - 1]
const pct = (m: number) => `${(m / MAX) * 100}%`
const fmt = ([a, b]: [number, number]) => `${a}–${b} mo`

/** Slide 15 · Catching Up: Build or Buy. Bars extend with scroll along a shared 0–24 month axis. */
export function BuildOrBuy() {
  return (
    <section id="build-or-buy" data-surface="dark" className="relative overflow-hidden rounded-t-[48px] bg-navy-950 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] left-[20%] size-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(2,42,192,0.5),transparent)] blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-[1240px] px-6 py-28 sm:px-10 lg:py-40">
        <SectionHeading
          inverted
          eyebrow="Build or Buy"
          title={buildOrBuy.title}
          aside={<NotesButton inverted title={buildOrBuy.title} source={buildOrBuy.notes.source} blocks={buildOrBuy.notes.blocks} />}
          className="mb-16"
        />

        <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[minmax(260px,1fr)_1.6fr_minmax(170px,0.5fr)] gap-8 border-b border-white/10 pb-4 text-[12px] font-semibold tracking-wide text-white/50 uppercase">
              <span>{buildOrBuy.columns.gap}</span>
              <span>{buildOrBuy.columns.range}</span>
              <span>{buildOrBuy.columns.lean}</span>
            </div>

            <div className="relative">
              {buildOrBuy.rows.map((r) => (
                <GapRowView key={r.gap} row={r} />
              ))}
            </div>

            {/* axis */}
            <div className="grid grid-cols-[minmax(260px,1fr)_1.6fr_minmax(170px,0.5fr)] gap-8 pt-3">
              <span />
              <div className="relative h-5">
                {buildOrBuy.axis.map((t) => (
                  <span key={t} className="absolute -translate-x-1/2 text-[12px] text-white/45 tabular" style={{ left: pct(t) }}>
                    {t}
                  </span>
                ))}
              </div>
              <span />
            </div>
          </div>
        </div>

        <Reveal className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-6 text-[13px] text-white/75">
            <span className="flex items-center gap-2.5">
              <span className="h-2.5 w-7 rounded-full bg-white" /> {buildOrBuy.legend.build}
            </span>
            <span className="flex items-center gap-2.5">
              <span className="h-2.5 w-7 rounded-full bg-cyan" /> {buildOrBuy.legend.buy}
            </span>
          </div>
          <p className="max-w-[60ch] text-[13px] text-white/50 italic">{buildOrBuy.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  )
}

function GapRowView({ row: r }: { row: GapRow }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.65'] })
  const grow = scrollYProgress
  const buildScale = useTransform(grow, [0.15, 0.9], [0, 1])
  const buyScale = useTransform(grow, [0, 0.7], [0, 1])
  const labelOpacity = useTransform(grow, [0.7, 1], [0, 1])
  const textOpacity = useTransform(grow, [0, 0.5], [0.2, 1])

  return (
    <div
      ref={ref}
      className="group grid grid-cols-[minmax(260px,1fr)_1.6fr_minmax(170px,0.5fr)] items-center gap-8 border-b border-white/[0.07] py-7 transition-colors hover:bg-white/[0.03]"
    >
      <motion.div style={{ opacity: textOpacity }}>
        <p className="text-[15.5px] font-semibold">{r.gap}</p>
        <p className="mt-1 text-[13px] text-white/55">{r.leaders}</p>
      </motion.div>

      <div className="relative h-[58px]">
        {buildOrBuy.axis.map((t) => (
          <span key={t} aria-hidden className="absolute inset-y-[-28px] w-px border-l border-dashed border-white/10" style={{ left: pct(t) }} />
        ))}
        <Bar range={r.build} scale={buildScale} labelOpacity={labelOpacity} position="top-1" color="bg-white" />
        <Bar range={r.buy} scale={buyScale} labelOpacity={labelOpacity} position="bottom-1" color="bg-cyan" />
      </div>

      <motion.p style={{ opacity: textOpacity }}>
        <span className="inline-block rounded-2xl bg-white/[0.07] px-4 py-2 text-[14px] leading-snug font-semibold ring-1 ring-white/10 transition group-hover:bg-white/[0.12]">
          {r.lean}
        </span>
      </motion.p>
    </div>
  )
}

function Bar({
  range,
  scale,
  labelOpacity,
  position,
  color,
}: {
  range: [number, number]
  scale: MotionValue<number>
  labelOpacity: MotionValue<number>
  position: string
  color: string
}) {
  const [from, to] = range
  return (
    <div className={`absolute flex h-[20px] items-center ${position}`} style={{ left: pct(from), width: pct(to - from) }}>
      <motion.span style={{ scaleX: scale }} className={`h-full w-full origin-left rounded-full ${color} shadow-[0_6px_20px_-6px_rgba(0,179,255,0.5)]`} />
      <motion.span style={{ opacity: labelOpacity }} className="absolute left-[calc(100%+10px)] text-[12.5px] font-medium whitespace-nowrap text-white/80 tabular">
        {fmt(range)}
      </motion.span>
    </div>
  )
}
