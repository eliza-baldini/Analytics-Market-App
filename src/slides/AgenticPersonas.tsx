import { agenticPersonas as c, type AgenticPersona } from '../content/agentic'
import { Build } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { Glyph, type GlyphName } from '../components/ui/Glyph'
import { RichText } from '../components/ui/RichText'

const toneStyle = {
  blue: { badge: 'bg-royal', accent: 'text-royal', bold: '[&_.font-semibold]:text-royal', quote: 'bg-[#cfe3ff]', chip: 'bg-[#e3efff] text-royal', avatar: 'from-[#3b6fd8] to-[#1f3fa6]' },
  teal: { badge: 'bg-[#0b7a6c]', accent: 'text-[#0b8f7a]', bold: '[&_.font-semibold]:text-[#0b8f7a]', quote: 'bg-[#c9f0e6]', chip: 'bg-[#dcf5ee] text-[#0b7a6c]', avatar: 'from-[#14b8a6] to-[#0b7a6c]' },
  violet: { badge: 'bg-[#6d3fd6]', accent: 'text-[#6d3fd6]', bold: '[&_.font-semibold]:text-[#6d3fd6]', quote: 'bg-[#e4dafc]', chip: 'bg-[#efe8ff] text-[#5b21b6]', avatar: 'from-[#8b5cf6] to-[#5b21b6]' },
}

const icons: Record<AgenticPersona['tone'], GlyphName[]> = {
  blue: ['database', 'shield', 'gear'],
  teal: ['bolt', 'sparkle', 'layers'],
  violet: ['chat', 'compass', 'arrow-up'],
}

/**
 * Slide 10 · Meet Our Agentic Era Personas.
 * Builds: 0 title · 1–3 each persona.
 */
export function AgenticPersonas() {
  return (
    <SlideFrame title={<RichText text={c.title} accentClass="text-royal" />} subtitle={c.subtitle} headerClassName="text-center [&_h2]:mx-auto [&_p]:mx-auto">
      <div className="grid grid-cols-3 gap-6">
        {c.personas.map((p, i) => (
          <Build key={p.name} at={i + 1} y={30} className="h-full">
            <PersonaCard persona={p} />
          </Build>
        ))}
      </div>
    </SlideFrame>
  )
}

function PersonaCard({ persona: p }: { persona: AgenticPersona }) {
  const t = toneStyle[p.tone]
  return (
    <article className="card relative flex h-full min-h-[560px] flex-col p-7">
      <div className="mb-3 flex justify-end">
        <span className={`rounded-lg ${t.badge} px-3.5 py-1.5 text-center text-[16px] leading-tight font-semibold text-white`}>{p.badge}</span>
      </div>
      <div className="-mt-6 flex items-end gap-4">
        <span className={`grid size-[84px] shrink-0 place-items-center rounded-full bg-gradient-to-br ${t.avatar} display text-[34px] text-white ring-4 ring-white shadow-md`}>
          {p.name[0]}
        </span>
        <div>
          <p className="display text-[40px] leading-none">{p.name}</p>
          <p className="mt-1 text-[16px] text-ink-soft">{p.title}</p>
        </div>
      </div>
      <p className="display mt-6 text-[28px] leading-snug">
        <RichText text={p.tagline} accentClass={t.accent} />
      </p>
      <p className={`relative mt-5 rounded-2xl ${t.quote} px-5 py-4 text-[20px] leading-snug text-ink`}>
        <span aria-hidden className="absolute -top-3 -left-2 text-[30px] leading-none text-[#e5532b]">✳</span>
        {p.quote}
      </p>
      <ul className="mt-6 space-y-3.5">
        {p.points.map((pt, i) => (
          <li key={pt} className={`flex items-start gap-3 text-[18.5px] leading-snug text-ink ${t.bold}`}>
            <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${t.chip}`}>
              <Glyph name={icons[p.tone][i]} size={17} />
            </span>
            <span>
              <RichText text={pt} />
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}
