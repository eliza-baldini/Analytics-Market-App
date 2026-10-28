import { traditionalPersonas as c, type TraditionalPersona } from '../content/marketShift'
import { Build } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { Glyph } from '../components/ui/Glyph'

const toneStyle = {
  blue: { wash: 'from-[#e3efff]', badge: 'bg-royal', avatar: 'from-[#3b6fd8] to-[#1f3fa6]', chip: 'bg-[#e3efff] text-royal' },
  violet: { wash: 'from-[#efe8ff]', badge: 'bg-[#6d3fd6]', avatar: 'from-[#8b5cf6] to-[#5b21b6]', chip: 'bg-[#efe8ff] text-[#5b21b6]' },
  green: { wash: 'from-[#e3f5ea]', badge: 'bg-[#1f8a54]', avatar: 'from-[#34a853] to-[#1d6f42]', chip: 'bg-[#e3f5ea] text-[#1d6f42]' },
}

const initials = (role: string) =>
  role
    .split(' ')
    .map((w) => w[0])
    .join('')

/**
 * Slide 5 · Traditional BI & Analytics Personas.
 * Builds: 0 title · 1–3 each persona · 4 closing statement.
 */
export function TraditionalPersonas() {
  return (
    <SlideFrame title={c.title} subtitle={c.subtitle} headerClassName="[&_h2]:text-[46px]">
      <div className="grid grid-cols-3 gap-6">
        {c.personas.map((p, i) => (
          <Build key={p.role} at={i + 1} y={30} className="h-full">
            <PersonaCard persona={p} index={i} />
          </Build>
        ))}
      </div>
      <Build at={4} className="mt-6">
        <p className="rounded-full bg-sky px-8 py-3.5 text-center text-[22px] text-ink italic ring-1 ring-royal/10">{c.statement}</p>
      </Build>
    </SlideFrame>
  )
}

function PersonaCard({ persona: p, index }: { persona: TraditionalPersona; index: number }) {
  const t = toneStyle[p.tone]
  return (
    <article className={`card flex h-full min-h-[560px] flex-col overflow-hidden bg-gradient-to-b ${t.wash} to-white to-45% p-7`}>
      <div className="flex gap-4">
        <span className={`grid size-[76px] shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${t.avatar} display text-[26px] text-white`}>
          {initials(p.role)}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2.5">
            <span className={`grid size-8 place-items-center rounded-full ${t.badge} text-[15px] font-semibold text-white tabular`}>{index + 1}</span>
            <span className="display text-[30px] leading-tight">{p.role}</span>
          </p>
          <p className="eyebrow mt-2 text-[13px] leading-snug text-ink">{p.remit}</p>
        </div>
      </div>
      <p className="mt-5 rounded-2xl bg-white/80 px-5 py-4 text-[19px] leading-snug text-ink-soft italic ring-1 ring-line">{p.quote}</p>

      <p className="eyebrow mt-6 mb-3 text-[12.5px] text-ink">Key responsibilities</p>
      <ul className="space-y-3.5">
        {p.responsibilities.map((r) => (
          <li key={r.text} className="flex items-start gap-3 text-[18.5px] leading-snug text-ink">
            <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${t.chip}`}>
              <Glyph name={r.icon} size={19} />
            </span>
            {r.text}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-3 border-t hairline pt-5">
        <span className="eyebrow shrink-0 text-[11px] text-ink">{p.toolsLabel}</span>
        {p.tools.length > 0 ? (
          <span className="flex flex-wrap gap-1.5">
            {p.tools.map((tool) => (
              <span key={tool} className="rounded-md bg-paper px-2.5 py-1 text-[15px] font-medium text-ink-soft ring-1 ring-line">
                {tool}
              </span>
            ))}
          </span>
        ) : (
          // The slide shows a small static report for the business user's experience.
          <span aria-hidden className="flex flex-1 items-end gap-1 rounded-lg bg-paper px-3 py-2 ring-1 ring-line">
            {[40, 65, 50, 80, 58].map((h, i) => (
              <span key={i} className="w-2.5 rounded-sm bg-[#8aa0c4]" style={{ height: h * 0.32 }} />
            ))}
            <span className="ml-2 size-5 rounded-full border-[3px] border-royal/60" />
            <span className="ml-2 flex-1 space-y-1">
              <span className="block h-1 rounded bg-line" />
              <span className="block h-1 w-2/3 rounded bg-line" />
            </span>
          </span>
        )}
      </div>
    </article>
  )
}
