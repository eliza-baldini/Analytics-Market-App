import { landscape, type Camp } from '../content/landscape'
import { Build } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { NotesButton } from '../components/notes/NotesButton'
import { RichText } from '../components/ui/RichText'

/**
 * Slide 10 · The Fragmentation of the BI&A Market Landscape.
 * Builds: 0 title · 1–5 one camp at a time, ending on Tableau.
 */
export function Landscape() {
  return (
    <SlideFrame
      eyebrow="Market Landscape"
      title={landscape.title}
      subtitle={landscape.subtitle}
      notes={{ source: 'Slide 10', blocks: [landscape.generalNotes], title: landscape.title }}
      headerClassName="[&_h2]:text-[48px]"
    >
      <div className="grid grid-cols-5 items-stretch gap-5">
        {landscape.camps.map((c, i) => (
          <Build key={c.id} at={i + 1} y={36} className="h-full">
            <CampPanel camp={c} index={i} />
          </Build>
        ))}
      </div>
    </SlideFrame>
  )
}

function CampPanel({ camp, index }: { camp: Camp; index: number }) {
  const at = index + 1
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white ${
        camp.home ? 'shadow-[0_30px_70px_-30px_rgba(1,118,211,0.6)] ring-2 ring-[#0176D3]' : 'shadow-[0_1px_2px_rgba(0,30,91,0.04),0_18px_44px_-24px_rgba(0,30,91,0.25)]'
      }`}
    >
      <header className="relative shrink-0 overflow-hidden px-5 pt-4 pb-3.5 text-white" style={{ background: camp.color }}>
        <div aria-hidden className="absolute -top-10 -right-10 size-28 rounded-full bg-white/10 blur-xl" />
        <div className="relative flex items-start justify-between gap-2">
          <div>
            <h3 className="display text-[23px] leading-tight">{camp.name}</h3>
            <p className="mt-0.5 text-[14px] text-white/80">{camp.tagline}</p>
          </div>
          {camp.notes && <NotesButton inverted title={camp.name} source={camp.notes.source} blocks={camp.notes.blocks} />}
        </div>
      </header>

      <div className="shrink-0 px-5 pt-3.5 pb-3.5">
        {camp.thesis.map((t) => (
          <p key={t} className="mb-1.5 text-[14.5px] leading-snug text-ink-soft last:mb-0">
            <RichText text={t} />
          </p>
        ))}
      </div>

      <div className="mt-auto shrink-0 space-y-3 border-t hairline bg-paper/60 px-4 pt-3.5 pb-4">
        {camp.vendors.map((v) => {
          const count = v.layers.length
          return (
            <div key={v.name}>
              <p className="mb-1.5 text-[14px] font-semibold" style={{ color: camp.color }}>
                {v.name}
              </p>
              <div className="space-y-1">
                {v.layers.map((l, li) => (
                  // layers build from the bottom up, mirroring how each stack is read
                  <Build key={l.title} at={at} delay={0.25 + (count - 1 - li) * 0.1} y={10}>
                    <div
                      className={`rounded-lg text-center ${l.primary ? 'bg-white px-2.5 py-1.5' : 'bg-white/70 px-2.5 py-1 ring-1 ring-line'}`}
                      style={l.primary ? { boxShadow: `inset 0 0 0 1px ${camp.color}33` } : undefined}
                    >
                      <p className={l.primary ? 'text-[14px] font-semibold text-ink' : 'text-[13px] text-ink-soft'}>{l.title}</p>
                      {l.detail && <p className="text-[12.5px] leading-snug text-ink-soft">{l.detail}</p>}
                    </div>
                  </Build>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}
