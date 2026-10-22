import { motion } from 'motion/react'
import { Fragment, useState } from 'react'
import { capabilities, legend, vendors, type CapabilityRow } from '../content/capabilities'
import { SectionHeading } from '../components/layout/SectionHeading'
import { NotesButton } from '../components/notes/NotesButton'
import { useNotes } from '../components/notes/NotesContext'
import { Reveal } from '../components/motion/Reveal'
import { HarveyBall } from '../components/ui/HarveyBall'

const grid = 'grid grid-cols-[minmax(190px,1.4fr)_repeat(4,minmax(58px,0.45fr))_minmax(210px,1.6fr)] items-center'

/** Slide 14 · Market Capability Comparison. Scores sweep in column by column; rows and vendors highlight on hover. */
export function CapabilityMatrix() {
  const [vendor, setVendor] = useState<number | null>(null)
  const [row, setRow] = useState<string | null>(null)

  return (
    <section id="capabilities" className="relative mx-auto max-w-[1240px] px-6 py-28 sm:px-10 lg:py-40">
      <SectionHeading
        eyebrow="Capability Comparison"
        title={capabilities.title}
        subtitle={capabilities.subtitle}
        aside={<NotesButton title={capabilities.title} source="Slide 14" blocks={capabilities.generalNotes} />}
        className="mb-14"
      />

      <Reveal amount={0.05} className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <div className="card min-w-[860px] overflow-hidden" role="table" aria-label={capabilities.title} onMouseLeave={() => setRow(null)}>
          {/* header */}
          <div role="row" className={`${grid} border-b hairline px-6 py-5 text-[13px] font-semibold text-ink`}>
            <span role="columnheader">Capability</span>
            {vendors.map((v, vi) => (
              <span
                key={v}
                role="columnheader"
                onMouseEnter={() => setVendor(vi)}
                onMouseLeave={() => setVendor(null)}
                className={`cursor-default text-center transition-colors ${vendor === vi ? 'text-royal' : ''}`}
              >
                {v}
              </span>
            ))}
            <span role="columnheader" className="pl-6">
              Evidence
            </span>
          </div>

          <div className="relative">
            {/* column highlight */}
            <ColumnWash vendor={vendor} />

            {capabilities.groups.map((g) => (
              <Fragment key={g.name}>
                <div role="row" className="relative bg-navy-900 px-6 py-2.5">
                  <span role="rowheader" className="text-[12px] font-semibold tracking-[0.12em] text-white uppercase">
                    {g.name}
                  </span>
                </div>
                {g.rows.map((r, ri) => (
                  <Row key={r.id} row={r} index={ri} vendor={vendor} active={row === r.id} onHover={() => setRow(r.id)} />
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-ink-soft">
        <span className="font-semibold text-ink">Legend:</span>
        {legend.map((l) => (
          <span key={l.score} className="flex items-center gap-2">
            <HarveyBall score={l.score} size={18} animate={false} className="text-navy-900" />
            {l.label}
          </span>
        ))}
      </Reveal>
    </section>
  )
}

function ColumnWash({ vendor }: { vendor: number | null }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 px-6 ${grid}`}>
      <span />
      {vendors.map((v, vi) => (
        <motion.span
          key={v}
          className="h-full rounded-xl bg-sky"
          animate={{ opacity: vendor === vi ? 1 : vi === 0 && vendor === null ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />
      ))}
      <span />
    </div>
  )
}

function Row({
  row: r,
  index,
  vendor,
  active,
  onHover,
}: {
  row: CapabilityRow
  index: number
  vendor: number | null
  active: boolean
  onHover: () => void
}) {
  const { detailsOn, openNotes } = useNotes()
  const clickable = detailsOn && !!r.notes
  const open = () =>
    clickable && openNotes({ title: r.name, source: 'Slide 14', blocks: [{ paragraphs: r.notes!, heading: 'Scoring rationale' }, ...capabilities.generalNotes] })

  return (
    <div
      role="row"
      onMouseEnter={onHover}
      onClick={open}
      className={`relative ${grid} border-b hairline px-6 py-3.5 transition-colors duration-200 last:border-b-0 ${
        active ? 'bg-paper/80' : ''
      } ${clickable ? 'cursor-pointer' : ''}`}
    >
      <span role="cell" className="flex items-center gap-2 text-[14.5px] text-ink">
        {r.name}
        {clickable && (
          <span className="rounded-full bg-royal/[0.07] px-2 py-0.5 text-[10.5px] font-medium text-royal">Details</span>
        )}
      </span>
      {r.scores.map((s, vi) => (
        <span role="cell" key={vi} className="relative flex justify-center">
          <HarveyBall
            score={s}
            delay={vi * 0.14 + index * 0.04}
            className={`transition-opacity duration-300 ${vendor !== null && vendor !== vi ? 'opacity-30' : ''} text-navy-900`}
          />
        </span>
      ))}
      <span role="cell" className={`pl-6 text-[13px] leading-snug transition-colors ${active ? 'text-ink' : 'text-ink-soft'}`}>
        {r.evidence}
      </span>
    </div>
  )
}
