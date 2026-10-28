import { frontiers, frontiersSlide, type Frontier } from '../content/competitive'
import { Build } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'

/**
 * Slide 20 · The Four Competitive Frontiers of Data & Analytics.
 * Builds: 0 title · 1–5 one frontier at a time, ending on Tableau.
 */
export function Frontiers() {
  return (
    <SlideFrame title={frontiersSlide.title} headerClassName="[&_h2]:text-[50px]">
      <div className="grid grid-cols-5 items-stretch gap-5">
        {frontiers.map((f, i) => (
          <Build key={f.id} at={i + 1} y={36} className="h-full">
            <FrontierPanel frontier={f} at={i + 1} />
          </Build>
        ))}
      </div>
    </SlideFrame>
  )
}

/** One frontier's column: header, thesis and its vendor stacks. Reused on the per-frontier slides. */
export function FrontierPanel({ frontier: f, at, compact }: { frontier: Frontier; at: number; compact?: boolean }) {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white ${
        f.home ? 'shadow-[0_30px_70px_-30px_rgba(1,118,211,0.6)] ring-2 ring-[#0176D3]' : 'shadow-[0_1px_2px_rgba(0,30,91,0.04),0_18px_44px_-24px_rgba(0,30,91,0.25)]'
      }`}
    >
      <header className="relative shrink-0 overflow-hidden px-5 pt-4 pb-3.5 text-center text-white" style={{ background: f.color }}>
        <div aria-hidden className="absolute -top-10 -right-10 size-28 rounded-full bg-white/10 blur-xl" />
        <h3 className="display relative text-[23px] leading-tight">{f.name}</h3>
        <p className="relative mt-0.5 text-[14px] text-white/80">{f.tagline}</p>
      </header>

      <div className="shrink-0 px-5 pt-3.5 pb-3.5">
        {f.thesis.map((t) => (
          <p key={t} className={`mb-1.5 leading-snug text-ink-soft italic last:mb-0 ${compact ? 'text-[13.5px]' : 'text-[14.5px]'}`}>
            {t}
          </p>
        ))}
      </div>

      <div className="mt-auto shrink-0 space-y-3 border-t hairline bg-paper/60 px-4 pt-3.5 pb-4">
        {f.vendors.map((v) => (
          <div key={v.name}>
            <p className="mb-1.5 text-[14px] font-semibold" style={{ color: f.color === '#0A1E5C' ? '#001e5b' : f.color }}>
              {v.name}
            </p>
            {v.layers && (
              <div className="space-y-1">
                {v.layers.map((l, li) => (
                  // layers build from the bottom up, mirroring how each stack is read
                  <Build key={l.title} at={at} delay={0.25 + (v.layers!.length - 1 - li) * 0.1} y={10}>
                    <div
                      className={`rounded-lg text-center ${l.primary ? 'bg-white px-2.5 py-1.5' : 'bg-white/70 px-2.5 py-1 ring-1 ring-line'}`}
                      style={l.primary ? { boxShadow: `inset 0 0 0 1px ${f.color}33` } : undefined}
                    >
                      <p className={l.primary ? 'text-[14px] font-semibold text-ink' : 'text-[13px] text-ink-soft'}>{l.title}</p>
                      {l.detail && <p className="text-[12.5px] leading-snug text-ink-soft">{l.detail}</p>}
                    </div>
                  </Build>
                ))}
              </div>
            )}
            {v.chips && (
              <div className="flex flex-wrap justify-center gap-1.5">
                {v.chips.map((chip, ci) => (
                  <Build key={chip} at={at} delay={0.25 + ci * 0.08} y={8}>
                    <span className="block rounded-md bg-white px-2.5 py-1 text-[13px] font-semibold text-ink ring-1 ring-navy-900/25">{chip}</span>
                  </Build>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}
