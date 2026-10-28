import type { ReactNode } from 'react'
import { competitors, type Competitor, type Deal, type DealStatus } from '../content/competitors'
import { Build, useBuilt, useSlideStep } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { CountUp } from '../components/motion/CountUp'
import { RichText } from '../components/ui/RichText'

const byId = (id: string) => competitors.find((c) => c.id === id)!

/**
 * Slides 11 / 13 / 15 · Competitor profile, one identical template.
 * Builds: 0 identity and headline figures · 1 go-to-market, strengths & weaknesses, innovation bets.
 */
export function CompetitorProfile({ id }: { id: string }) {
  const c = byId(id)
  const index = competitors.indexOf(c)
  const play = useBuilt(0)
  const { settled } = useSlideStep()

  return (
    <div className="flex h-full flex-col px-24 pt-16 pb-14">
      <div className="grid shrink-0 grid-cols-[0.7fr_1.3fr] items-end gap-14">
        <Build>
          <p className="eyebrow mb-4 text-[13px] text-royal tabular">
            Competitor 0{index + 1} / 0{competitors.length}
          </p>
          <div className="flex items-center gap-4">
            <h2 className="display text-[96px] leading-none text-ink">{c.name}</h2>
          </div>
        </Build>
        <Build delay={0.1}>
          <p className="text-[24px] leading-[1.45] text-ink-soft">{c.thesis}</p>
        </Build>
      </div>

      <Build delay={0.2} className="mt-8 shrink-0">
        <div className="grid grid-cols-3 overflow-hidden rounded-[26px] bg-white shadow-[0_1px_2px_rgba(0,30,91,0.04),0_20px_50px_-28px_rgba(0,30,91,0.25)]">
          {c.stats.map((s, i) => (
            <div key={s.label} className={`px-9 py-6 ${i > 0 ? 'border-l hairline' : ''}`}>
              <p className="eyebrow text-[13px] text-royal">{s.label}</p>
              <p className="display mt-2 text-[58px] leading-none text-ink">
                <CountUp value={s.value} play={play} instant={settled >= 0} />
              </p>
              <p className="mt-3 text-[16px] leading-snug text-ink-soft">
                <RichText text={s.caption} />
              </p>
            </div>
          ))}
        </div>
      </Build>

      <div className="mt-6 grid min-h-0 flex-1 grid-cols-3 gap-6">
        <Build at={1} y={30} className="h-full">
          <Column title="Go-To-Market">
            <Bullets items={c.goToMarket} />
          </Column>
        </Build>
        <Build at={1} y={30} delay={0.12} className="h-full">
          <Column title="Strengths & Weaknesses">
            <p className="mb-2 flex items-center gap-2 text-[13px] font-semibold tracking-wide text-won uppercase">
              <span className="size-1.5 rounded-full bg-won" /> Strengths
            </p>
            <Bullets items={c.strengths} />
            <p className="mt-4 mb-2 flex items-center gap-2 text-[13px] font-semibold tracking-wide text-lost uppercase">
              <span className="size-1.5 rounded-full bg-lost" /> Weaknesses
            </p>
            <Bullets items={c.weaknesses} />
          </Column>
        </Build>
        <Build at={1} y={30} delay={0.24} className="h-full">
          <Column title="Innovation Bets">
            <ul className="space-y-3.5">
              {c.bets.map((b) => (
                <li key={b.text} className="text-[16px] leading-snug text-ink-soft">
                  {b.label && <span className="font-semibold text-ink">{b.label}: </span>}
                  {b.text}
                </li>
              ))}
            </ul>
          </Column>
        </Build>
      </div>
    </div>
  )
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card h-full p-7">
      <h3 className="mb-4 flex items-center gap-3 text-[18px] font-semibold text-ink">
        <span className="h-5 w-1 rounded-full bg-gradient-to-b from-cyan to-royal" />
        {title}
      </h3>
      {children}
    </div>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[16px] leading-snug text-ink-soft">
          <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink-faint" />
          {t}
        </li>
      ))}
    </ul>
  )
}

/* --------------------------------------------------------------- deals */

const statusStyle: Record<DealStatus, { text: string; dot: string; wash: string }> = {
  won: { text: 'text-won', dot: 'bg-won', wash: 'from-won/[0.07]' },
  lost: { text: 'text-lost', dot: 'bg-lost', wash: 'from-lost/[0.07]' },
  atRisk: { text: 'text-risk', dot: 'bg-risk', wash: 'from-risk/[0.08]' },
}

/** Slides 12 / 14 / 16 · Deals for one competitor. Cards arrive in sequence on entry. */
export function CompetitorDeals({ id }: { id: string }) {
  const c: Competitor = byId(id)
  return (
    <SlideFrame eyebrow={c.name} title={c.dealsTitle}>
      <div className="grid grid-cols-3 gap-7">
        {c.deals.map((d, i) => (
          <Build key={d.status} delay={0.25 + i * 0.12} y={30} className="h-full">
            <DealCard deal={d} />
          </Build>
        ))}
      </div>
    </SlideFrame>
  )
}

function DealCard({ deal: d }: { deal: Deal }) {
  const s = statusStyle[d.status]
  return (
    <article className={`card relative flex h-full min-h-[440px] flex-col overflow-hidden bg-gradient-to-b ${s.wash} to-white to-40% p-9 transition-transform duration-300 hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <p className={`flex items-center gap-2.5 text-[22px] font-semibold ${s.text}`}>
          <span className={`size-2.5 rounded-full ${s.dot}`} />
          {d.statusLabel}
        </p>
        <p className="text-[16px] text-ink-soft">{d.context}</p>
      </div>
      <div className={`mt-8 ${d.placeholder ? 'opacity-45' : ''}`}>
        <p className="display text-[36px] text-ink">{d.account}</p>
        {d.accountType && <p className="text-[17px] text-ink-soft">{d.accountType}</p>}
        <div className="mt-5 flex items-center gap-4 text-[16px] text-ink-soft">
          <span className="font-semibold text-ink tabular">{d.amount}</span>
          <span className="h-4 w-px bg-line" />
          {d.oppUrl ? (
            <a href={d.oppUrl} target="_blank" rel="noreferrer" className="text-link underline-offset-2 hover:underline">
              {d.oppLabel}
            </a>
          ) : (
            <span>{d.oppLabel}</span>
          )}
        </div>
      </div>
      <div className={`mt-8 border-t hairline pt-6 ${d.placeholder ? 'opacity-45' : ''}`}>
        <p className={`text-[16px] font-semibold ${s.text}`}>{d.detailLabel}</p>
        <div className="mt-2 space-y-2">
          {d.details.map((t) => (
            <p key={t} className="text-[18px] leading-relaxed text-ink-soft">
              {t}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
