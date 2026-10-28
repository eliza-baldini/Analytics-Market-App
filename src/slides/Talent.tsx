import { operatingModel, priorities, reinvestment, specDriven, standards } from '../content/talent'
import { Build, useBuilt, useSlideStep } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { CountUp } from '../components/motion/CountUp'

/* ------------------------------------------------------------------ */
/* Slide 29 · Evolving our Operating Model                             */
/* Builds: 0 title · 1–5 each facet                                    */
/* ------------------------------------------------------------------ */

export function OperatingModel() {
  return (
    <SlideFrame inverted title={operatingModel.title} subtitle={operatingModel.subtitle} headerClassName="[&_h2]:text-[50px] [&_p]:text-[24px]">
      <div className="grid h-[520px] grid-cols-5 gap-5">
        {operatingModel.facets.map((f, i) => (
          <Build key={f.title} at={i + 1} y={36} className="h-full">
            <article className="flex h-full flex-col rounded-[22px] bg-white px-6 pt-7 pb-6 text-center text-navy-900 shadow-[0_30px_60px_-30px_rgba(0,10,60,0.6)]">
              <h3 className="display flex min-h-[64px] items-center justify-center text-[25px] leading-tight">{f.title}</h3>
              <span className="mx-auto my-5 h-[2px] w-4/5 bg-navy-900/80" />
              <p className="text-[19px] leading-relaxed">{f.detail}</p>
            </article>
          </Build>
        ))}
      </div>
    </SlideFrame>
  )
}

/* ------------------------------------------------------------------ */
/* Slide 30 · Product & Engineering Standards & Expectations           */
/* Builds: 0 title · 1 the six standards · 2 the closing statement     */
/* ------------------------------------------------------------------ */

export function Standards() {
  return (
    <SlideFrame
      title={
        <>
          {standards.title}
          <br />
          <span className="text-royal">{standards.titleSecond}</span>
        </>
      }
      headerClassName="[&_h2]:text-[50px]"
    >
      <div className="rounded-[28px] bg-white p-8 shadow-[0_24px_60px_-34px_rgba(0,30,91,0.35)]">
        <div className="grid grid-cols-3 gap-5">
          {standards.values.map((v, i) => (
            <Build key={v} at={1} delay={0.1 + i * 0.1} scale={0.94} y={10}>
              <div className="grid h-[118px] place-items-center rounded-2xl bg-royal px-6 text-center text-[32px] leading-tight font-medium text-white shadow-[0_14px_30px_-16px_rgba(2,42,192,0.8)]">
                {v}
              </div>
            </Build>
          ))}
        </div>
        <Build at={2} className="mt-5">
          <p className="rounded-2xl bg-royal px-10 py-6 text-center text-[27px] leading-snug font-medium text-white">{standards.statement}</p>
        </Build>
      </div>
    </SlideFrame>
  )
}

/* ------------------------------------------------------------------ */
/* Slide 31 · Analytics T&P P0 Priorities                              */
/* Builds: 0 title and the priorities, row by row                      */
/* ------------------------------------------------------------------ */

export function Priorities() {
  return (
    <SlideFrame title={priorities.title} headerClassName="[&_h2]:text-[50px]" className="!pt-14 !pb-10">
      <div className="mb-2 grid grid-cols-[1fr_340px] px-8 text-[14px] font-semibold tracking-wide text-royal uppercase">
        <span className="pl-[11%]">{priorities.columns[0]}</span>
        <span className="text-center">{priorities.columns[1]}</span>
      </div>
      <ol className="space-y-2">
        {priorities.rows.map((r, i) => (
          <Build key={r.initiative} delay={0.3 + i * 0.07} x={-24} y={0}>
            <li className="grid grid-cols-[1fr_340px] items-center rounded-xl bg-white/80 px-8 py-2.5 ring-1 ring-line">
              <span className="pl-[11%] text-[24px] font-medium text-navy-900">{r.initiative}</span>
              <span className="rounded-full bg-cyan-soft/70 px-4 py-1 text-center text-[15px] font-medium text-navy-900">{r.metrics}</span>
            </li>
          </Build>
        ))}
      </ol>
    </SlideFrame>
  )
}

/* ------------------------------------------------------------------ */
/* Slide 32 · Spec-Driven Development – Agentic Transformation         */
/* Builds: 0 title and 30-day cycle · 1 team models · 2 engineering org */
/* ------------------------------------------------------------------ */

const phaseTone = ['bg-royal', 'bg-[#1b46d6]', 'bg-[#2a55e0]', 'bg-[#f08c00]']
const levelTone: Record<string, string> = {
  navy: 'bg-navy-900 text-white',
  sky: 'bg-sky text-navy-900',
  violet: 'bg-[#e4dafc] text-navy-900',
  orange: 'bg-[#fde3c4] text-[#b45309]',
  plain: 'bg-white text-navy-900 ring-1 ring-line',
}

export function SpecDriven() {
  const s = specDriven
  return (
    <div className="grid h-full grid-cols-[1fr_400px] text-ink">
      <div className="flex flex-col px-14 pt-12 pb-10">
        <Build y={14}>
          <h2 className="display text-[40px]">{s.title}</h2>
          <p className="mt-2 text-[20px] text-ink-soft">{s.subtitle}</p>
        </Build>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {s.phases.map((p, i) => (
            <Build key={p.title} delay={0.25 + i * 0.12} x={-20} y={0}>
              <div className={`${phaseTone[i]} py-3 pr-8 pl-5 text-white [clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%,6%_50%)] first:[clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%)]`}>
                <p className="text-[19px] font-semibold">{p.title}</p>
                <p className="text-[14px] text-white/85">{p.days}</p>
              </div>
              <p className={`mt-2 min-h-[56px] rounded-lg px-3 py-2 text-center text-[14px] leading-snug whitespace-pre-line ring-1 ring-line ${i === 3 ? 'bg-[#fdebd3]' : 'bg-white'}`}>
                {p.detail}
              </p>
            </Build>
          ))}
        </div>

        <Build at={1} className="mt-6">
          <h3 className="display text-[28px]">{s.models.title}</h3>
          <p className="text-[15px] text-ink-soft">{s.models.subtitle}</p>
        </Build>
        <div className="mt-3 grid flex-1 grid-cols-2 gap-5">
          {s.models.items.map((m, i) => (
            <Build key={m.title} at={1} delay={0.15 + i * 0.15} y={24} className="h-full">
              <TeamModel model={m} />
            </Build>
          ))}
        </div>
      </div>

      <Build at={2} x={40} y={0} className="h-full">
        <aside className="flex h-full flex-col bg-sky/80 px-8 pt-12 pb-10">
          <h3 className="display text-[30px] leading-tight">{s.org.title}</h3>
          <p className="mt-3 text-[16px] leading-snug text-ink-soft">{s.org.detail}</p>
          <div className="mt-6 grid flex-1 grid-cols-[1fr_auto] gap-4">
            <ol className="flex flex-col items-stretch justify-between gap-2">
              {s.org.levels.map((l, i) => (
                <Build key={l.title} at={2} delay={0.2 + i * 0.12} y={10} className="w-full">
                  <li className={`block w-full rounded-xl px-4 py-2.5 text-center ${levelTone[l.tone]}`}>
                    <p className="text-[17px] leading-tight font-semibold">{l.title}</p>
                    {l.detail && <p className="text-[14px]">{l.detail}</p>}
                    {l.note && <p className="text-[12px] opacity-80">{l.note}</p>}
                  </li>
                </Build>
              ))}
            </ol>
            <Build at={2} delay={0.8} className="flex flex-col items-center justify-center">
              <span className="display text-[64px] leading-none text-navy-900">{s.org.managers.value}</span>
              <span className="mt-1 max-w-[80px] text-center text-[13px] leading-snug text-ink-soft">{s.org.managers.label}</span>
            </Build>
          </div>
        </aside>
      </Build>
    </div>
  )
}

function TeamModel({ model: m }: { model: (typeof specDriven.models.items)[number] }) {
  const blue = m.tone === 'blue'
  const ring = ['#f08c00', '#3b6fd8', '#1f8a54', '#3b6fd8', '#f08c00']
  return (
    <article className={`flex h-full flex-col rounded-[26px] p-5 ${blue ? 'bg-[#e8f1ff]' : 'bg-[#e6f5ec]'}`}>
      <p className={`text-[20px] font-semibold ${blue ? 'text-royal' : 'text-[#1d6f42]'}`}>{m.title}</p>
      <p className="text-[14px] text-ink-soft">{m.subtitle}</p>
      <div className="mt-2 grid flex-1 grid-cols-[150px_1fr] items-center gap-4">
        <div className="relative mx-auto size-[140px]">
          <span className="absolute inset-[30px] grid place-items-center rounded-full bg-white text-center text-[12px] leading-tight font-semibold text-ink ring-1 ring-line">{m.team}</span>
          {m.roles.map((r, i) => {
            const angle = (i / m.roles.length) * Math.PI * 2 - Math.PI / 2
            return (
              <span
                key={i}
                className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11px] font-semibold text-white"
                style={{ left: `${50 + 42 * Math.cos(angle)}%`, top: `${50 + 42 * Math.sin(angle)}%`, background: ring[i] }}
              >
                {r || '●'}
              </span>
            )
          })}
        </div>
        <ul className="list-disc space-y-1 pl-4 text-[13.5px] leading-snug text-ink">
          {m.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <p className={`mt-2 rounded-xl bg-white px-4 py-2 text-center text-[15px] font-semibold ${blue ? 'text-royal' : 'text-[#1d6f42]'}`}>{m.summary}</p>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Slide 33 · Target Reinvestment: Rapid Innovation                    */
/* Builds: 0 title and banner · 1 the four moves · 2 headcount figures */
/* ------------------------------------------------------------------ */

export function Reinvestment() {
  const r = reinvestment
  const play = useBuilt(2)
  const { settled } = useSlideStep()
  return (
    <SlideFrame title={r.title} headerClassName="[&_h2]:text-[50px]">
      <Build delay={0.25} scale={0.96} y={0}>
        <p className="rounded-full bg-gradient-to-r from-royal to-[#1b6ff0] py-3.5 text-center text-[30px] font-semibold text-white shadow-[0_18px_40px_-20px_rgba(2,42,192,0.8)]">
          {r.banner}
        </p>
      </Build>
      <div className="mt-6 grid grid-cols-4 gap-5">
        {r.moves.map((m, i) => (
          <Build key={m.title} at={1} delay={0.1 + i * 0.12} y={24} className="h-full">
            <article className="h-full rounded-[20px] bg-white px-6 py-5 text-center shadow-[0_18px_40px_-28px_rgba(0,30,91,0.35)]">
              <h3 className="text-[23px] leading-tight font-semibold text-navy-900">{m.title}</h3>
              <span className="mx-auto my-3 block h-px w-3/4 bg-navy-900/40" />
              <p className="text-[18px] leading-snug text-ink">{m.detail}</p>
            </article>
          </Build>
        ))}
      </div>
      <Build at={2} className="mt-6">
        <div className="grid grid-cols-4 rounded-[40px] bg-white px-8 py-5 shadow-[0_18px_40px_-28px_rgba(0,30,91,0.35)]">
          {r.figures.map((f) => (
            <div key={f.label} className="text-center">
              <p className={`display text-[44px] leading-none ${f.value.startsWith('-') ? 'text-navy-900' : 'text-royal'}`}>
                <CountUp value={f.value} play={play} instant={settled >= 2} />
              </p>
              <p className="mx-auto mt-1 max-w-[24ch] text-[15px] leading-snug font-semibold text-navy-900">{f.label}</p>
            </div>
          ))}
        </div>
      </Build>
      <Build at={2} delay={0.5} className="mt-4">
        <p className="rounded-xl bg-sky/80 py-2.5 text-center text-[16px] text-ink italic">{r.footnote}</p>
      </Build>
    </SlideFrame>
  )
}
