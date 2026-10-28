import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { architecture as a, type ArchBox, type ArchStage } from '../content/architecture'
import { Build, useBuildTransition, useSlideStep } from '../deck/Build'
import { RichText } from '../components/ui/RichText'
import { Glyph, type GlyphName } from '../components/ui/Glyph'

/** Build at which each overlay appears, per stage. */
const timing: Record<ArchStage, { base: number; added: number; gaps: number }> = {
  required: { base: 99, added: 99, gaps: 99 },
  gaps: { base: 1, added: 99, gaps: 2 },
  roadmap: { base: 0, added: 1, gaps: 0 },
  pivot: { base: 0, added: 1, gaps: 0 },
}

/** Number of builds per stage (registered in slides.tsx). */
export const archSteps: Record<ArchStage, number> = { required: 1, gaps: 3, roadmap: 2, pivot: 2 }

/**
 * Slides 12–15 · One architecture diagram, shown in four stages:
 * required capabilities → Tableau today (gaps) → 9-month roadmap → accelerated pivot.
 */
export function Architecture({ stage }: { stage: ArchStage }) {
  const copy = a.stages[stage]
  return (
    <div className="relative flex h-full flex-col px-14 pt-12 pb-8 text-ink">
      <header className="flex items-start justify-between">
        <Build y={14}>
          <h2 className="display text-[46px]">{copy.title}</h2>
          <p className="mt-1 text-[24px] text-ink">{copy.subtitle}</p>
        </Build>
        <Build delay={0.1} className="mt-3 flex gap-3">
          <span className="rounded-lg bg-[#efe8ff] px-3.5 py-1.5 text-[15px] font-semibold text-[#6d3fd6]">{a.zones[0]}</span>
          <span className="rounded-lg bg-sky px-3.5 py-1.5 text-[15px] font-semibold text-royal">{a.zones[1]}</span>
        </Build>
      </header>

      <Build delay={0.15} className="mt-4">
        <CovBox box={a.headless} stage={stage} className="flex h-[74px] items-center gap-5 rounded-2xl px-6">
          <IconTile name="layers" />
          <div className="min-w-0 flex-1">
            <p className="text-[21px] font-semibold text-navy-900">{a.headless.title}</p>
            <p className="text-[15px] text-ink-soft">{a.headless.detail}</p>
          </div>
          <Dots count={stage === 'required' ? a.surfaces : 4} />
        </CovBox>
      </Build>

      <Build delay={0.25} className="mt-3">
        <div className="rounded-[32px] border-2 border-line bg-white/60 px-8 pt-6 pb-5">
          <div className="grid grid-cols-[300px_1fr_300px] gap-5">
            <div className="rounded-2xl bg-[#f3eefe] p-4 ring-1 ring-[#e4dafc]">
              <p className="mb-3 flex items-center gap-2 text-[21px] font-semibold text-[#5b21b6]">
                <IconTile name="sparkle" tone="violet" small /> {a.asset.title}
              </p>
              <div className="space-y-2.5">
                {a.asset.items.map((it) => (
                  <CovBox key={it.id} box={it} stage={stage} className="flex h-[50px] items-center gap-3 rounded-xl px-4">
                    <p className="text-[19px] font-semibold text-navy-900">{it.title}</p>
                  </CovBox>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {a.engines.map((e) => (
                <CovBox key={e.id} box={e} stage={stage} className="flex h-[78px] items-center gap-4 rounded-xl px-5">
                  <IconTile name="bolt" small />
                  <div>
                    <p className="text-[22px] font-semibold text-navy-900">{e.title}</p>
                    <p className="text-[16px] text-ink-soft">{e.detail}</p>
                  </div>
                </CovBox>
              ))}
            </div>

            <div className="rounded-2xl bg-[#eaf7ee] p-4 ring-1 ring-[#cfead8]">
              <p className="mb-3 flex items-center gap-2 text-[21px] font-semibold text-[#1d6f42]">
                <IconTile name="layers" tone="green" small /> {a.open.title}
              </p>
              <div className="space-y-2.5">
                {a.open.items.map((it) => (
                  <CovBox key={it.id} box={it} stage={stage} className="flex h-[70px] flex-col justify-center rounded-xl px-4">
                    <p className="text-[19px] leading-tight font-semibold text-navy-900">{it.title}</p>
                    <p className="text-[15px] text-ink-soft">{it.detail}</p>
                  </CovBox>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-5">
            {a.primitives.map((p) => (
              <CovBox key={p.id} box={p} stage={stage} gap className="flex h-[58px] items-center gap-3 rounded-xl px-4">
                <p className="shrink-0 text-[20px] font-semibold text-navy-900">{p.title}</p>
                <p className="text-[13px] leading-tight text-ink-soft">{p.detail}</p>
              </CovBox>
            ))}
          </div>
        </div>
      </Build>

      <Build delay={0.35} className="mt-3 flex items-end justify-center gap-6">
        {a.ecosystem.map((g) => (
          <div key={g.id} className="text-center">
            <p className="mb-1 text-[15px] font-semibold text-royal">{g.title}</p>
            <CovBox box={g} stage={stage} className="flex h-[46px] items-center justify-center rounded-xl px-4">
              <Dots count={g.count} />
            </CovBox>
          </div>
        ))}
      </Build>

      <Build delay={0.45} className="mt-auto flex flex-wrap items-center gap-3 pt-3">
        <span className="text-[19px] font-semibold text-navy-900">Legend</span>
        {copy.legend.map((l) => (
          <LegendChip key={l.label} kind={l.kind} label={l.label} stage={stage} />
        ))}
      </Build>
    </div>
  )
}

/** A capability box with Tableau coverage (blue) and incremental roadmap coverage (green). */
function CovBox({ box, stage, gap, className = '', children }: { box: ArchBox; stage: ArchStage; gap?: boolean; className?: string; children: ReactNode }) {
  const { step } = useSlideStep()
  const cov = box.coverage?.[stage]
  const tm = timing[stage]
  const baseOn = !!cov && step >= tm.base
  const addedOn = !!cov?.added && step >= tm.added
  const gapOn = gap && stage !== 'required' && step >= tm.gaps
  const baseT = useBuildTransition(tm.base, 0.1, 1)
  const addedT = useBuildTransition(tm.added, 0.15, 1)
  const gapT = useBuildTransition(tm.gaps, 0.1, 0.6)
  const base = cov?.base ?? 0
  const added = cov?.added ?? base

  return (
    // `isolate` + negative z-index keeps the coverage fills behind the box's text.
    <div className={`relative isolate overflow-hidden bg-white ring-1 ring-royal/30 ${className}`}>
      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 bg-[#e3f0d9] ring-1 ring-[#9cc58a]/60"
        initial={false}
        animate={{ width: addedOn ? `${added * 100}%` : `${baseOn ? base * 100 : 0}%`, opacity: addedOn ? 1 : 0 }}
        transition={addedT}
      />
      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 rounded-r-xl bg-[#e2edff] ring-1 ring-royal/50"
        initial={false}
        animate={{ width: baseOn ? `${base * 100}%` : '0%', opacity: baseOn && base > 0 ? 1 : 0 }}
        transition={baseT}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-[2.5px] ring-[#e5372b] ring-inset"
        initial={false}
        animate={{ opacity: gapOn ? 1 : 0 }}
        transition={gapT}
      />
      {children}
    </div>
  )
}

function IconTile({ name, tone = 'blue', small }: { name: GlyphName; tone?: 'blue' | 'violet' | 'green'; small?: boolean }) {
  const bg = { blue: 'bg-royal', violet: 'bg-[#7c3aed]', green: 'bg-[#1f8a54]' }[tone]
  return (
    <span className={`relative grid shrink-0 place-items-center rounded-lg text-white ${bg} ${small ? 'size-8' : 'size-11'}`}>
      <Glyph name={name} size={small ? 16 : 22} />
    </span>
  )
}

/** Integration chips (decorative): partner and surface logos on the slide. */
function Dots({ count }: { count: number }) {
  return (
    <span aria-hidden className="relative flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="size-[30px] rounded-full bg-gradient-to-br from-white to-[#dfe7f5] ring-1 ring-line shadow-sm" />
      ))}
    </span>
  )
}

function LegendChip({ kind, label, stage }: { kind: 'base' | 'added' | 'required' | 'gap'; label: string; stage: ArchStage }) {
  const { step } = useSlideStep()
  const tm = timing[stage]
  const at = kind === 'base' ? tm.base : kind === 'added' ? tm.added : kind === 'gap' ? tm.gaps : 0
  const t = useBuildTransition(at, 0.2, 0.5)
  const style = {
    base: 'bg-[#e2edff] ring-royal/60',
    added: 'bg-[#e3f0d9] ring-[#3d7a2a]/60',
    required: 'bg-white ring-navy-900/60',
    gap: 'bg-white ring-[#e5372b]',
  }[kind]
  return (
    <motion.span
      initial={false}
      animate={{ opacity: step >= at ? 1 : 0.25 }}
      transition={t}
      className={`rounded-full px-4 py-1.5 text-center text-[14px] leading-tight text-navy-900 ring-2 ${style}`}
    >
      <RichText text={label} />
    </motion.span>
  )
}
