import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { competitors, type Competitor, type Deal, type DealStatus } from '../content/competitors'
import { NotesButton } from '../components/notes/NotesButton'
import { CountUp } from '../components/motion/CountUp'
import { Reveal, Stagger, StaggerItem, easeOutExpo } from '../components/motion/Reveal'
import { useScrollTo } from '../components/motion/SmoothScroll'
import { RichText } from '../components/ui/RichText'

/** Slides 8–13 · One identical template per competitor so they read side by side. */
export function Competitors({ active }: { active: string }) {
  const inSection = competitors.some((c) => c.id === active)
  return (
    <div className="relative">
      <CompetitorSwitcher active={active} visible={inSection} />
      {competitors.map((c, i) => (
        <CompetitorProfile key={c.id} competitor={c} index={i} />
      ))}
    </div>
  )
}

function CompetitorSwitcher({ active, visible }: { active: string; visible: boolean }) {
  const scrollTo = useScrollTo()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center md:flex">
      <motion.nav
        aria-label="Competitors"
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className={`glass flex gap-1 rounded-full p-1.5 shadow-[0_18px_40px_-14px_rgba(0,30,91,0.35),inset_0_0_0_1px_rgba(0,30,91,0.08)] ${
          visible ? 'pointer-events-auto' : ''
        }`}
      >
        {competitors.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => scrollTo(c.id, { offset: -40 })}
            className={`relative rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
              active === c.id ? 'text-white' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {active === c.id && (
              <motion.span layoutId="competitor-pill" className="absolute inset-0 rounded-full bg-royal" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
            )}
            <span className="relative">{c.name}</span>
          </button>
        ))}
      </motion.nav>
    </div>
  )
}

function CompetitorProfile({ competitor: c, index }: { competitor: Competitor; index: number }) {
  return (
    <section id={c.id} className="relative mx-auto max-w-[1240px] px-6 pt-28 pb-20 sm:px-10 lg:pt-40 lg:pb-28">
      {/* identity */}
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-5 text-royal tabular">
            Competitor 0{index + 1} / 0{competitors.length}
          </p>
          <div className="flex items-center gap-4">
            <h2 className="display text-[clamp(3.4rem,7vw,6.4rem)] text-ink">{c.name}</h2>
            {c.notes && <NotesButton title={c.name} source={c.notes.source} blocks={c.notes.blocks} className="mt-4" />}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[clamp(1.15rem,1.6vw,1.45rem)] leading-[1.5] text-ink-soft">{c.thesis}</p>
        </Reveal>
      </div>

      {/* headline figures */}
      <Stagger className="mt-14 grid overflow-hidden rounded-[28px] bg-white shadow-[0_1px_2px_rgba(0,30,91,0.04),0_20px_50px_-28px_rgba(0,30,91,0.25)] sm:grid-cols-3" stagger={0.1}>
        {c.stats.map((s, i) => (
          <StaggerItem key={s.label} className={`p-8 lg:p-10 ${i > 0 ? 'border-t hairline sm:border-t-0 sm:border-l' : ''}`}>
            <p className="eyebrow text-royal">{s.label}</p>
            <p className="display mt-4 text-[clamp(2.6rem,4.4vw,4rem)] text-ink">
              <CountUp value={s.value} />
            </p>
            <p className="mt-3 text-[13.5px] leading-snug text-ink-soft">
              <RichText text={s.caption} />
            </p>
          </StaggerItem>
        ))}
      </Stagger>

      {/* analysis */}
      <Stagger className="mt-6 grid gap-6 lg:grid-cols-3" stagger={0.1}>
        <StaggerItem>
          <Column title="Go-To-Market">
            <Bullets items={c.goToMarket} />
          </Column>
        </StaggerItem>
        <StaggerItem>
          <Column title="Strengths & Weaknesses">
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold tracking-wide text-won uppercase">
              <span className="size-1.5 rounded-full bg-won" /> Strengths
            </p>
            <Bullets items={c.strengths} />
            <p className="mt-6 mb-3 flex items-center gap-2 text-[12px] font-semibold tracking-wide text-lost uppercase">
              <span className="size-1.5 rounded-full bg-lost" /> Weaknesses
            </p>
            <Bullets items={c.weaknesses} />
          </Column>
        </StaggerItem>
        <StaggerItem>
          <Column title="Innovation Bets">
            <ul className="space-y-4">
              {c.bets.map((b) => (
                <li key={b.text} className="text-[14.5px] leading-relaxed text-ink-soft">
                  {b.label && <span className="font-semibold text-ink">{b.label}: </span>}
                  {b.text}
                </li>
              ))}
            </ul>
          </Column>
        </StaggerItem>
      </Stagger>

      <Deals title={c.dealsTitle} deals={c.deals} />
    </section>
  )
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card h-full p-8">
      <h3 className="mb-6 flex items-center gap-3 text-[15px] font-semibold text-ink">
        <span className="h-4 w-1 rounded-full bg-gradient-to-b from-cyan to-royal" />
        {title}
      </h3>
      {children}
    </div>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft">
          <span className="mt-[0.62em] size-1 shrink-0 rounded-full bg-ink-faint" />
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

function Deals({ title, deals }: { title: string; deals: Deal[] }) {
  return (
    <div className="mt-20">
      <Reveal className="mb-6 flex items-end justify-between gap-6">
        <h3 className="display text-[1.9rem] text-ink">{title}</h3>
      </Reveal>
      <Stagger className="grid gap-5 lg:grid-cols-3" stagger={0.1}>
        {deals.map((d) => (
          <StaggerItem key={d.status}>
            <DealCard deal={d} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}

function DealCard({ deal: d }: { deal: Deal }) {
  const s = statusStyle[d.status]
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={`card relative flex h-full flex-col overflow-hidden bg-gradient-to-b ${s.wash} to-white to-40% p-7`}
    >
      <div className="flex items-center justify-between">
        <p className={`flex items-center gap-2 text-[15px] font-semibold ${s.text}`}>
          <span className={`size-2 rounded-full ${s.dot}`} />
          {d.statusLabel}
        </p>
        <p className="text-[12.5px] text-ink-soft">{d.context}</p>
      </div>

      <div className={`mt-6 ${d.placeholder ? 'opacity-45' : ''}`}>
        <p className="display text-[1.5rem] text-ink">{d.account}</p>
        {d.accountType && <p className="text-[13.5px] text-ink-soft">{d.accountType}</p>}
        <div className="mt-4 flex items-center gap-4 text-[12.5px] text-ink-soft">
          <span className="font-semibold text-ink tabular">{d.amount}</span>
          <span className="h-3 w-px bg-line" />
          {d.oppUrl ? (
            <a href={d.oppUrl} target="_blank" rel="noreferrer" className="text-link underline-offset-2 hover:underline">
              {d.oppLabel}
            </a>
          ) : (
            <span>{d.oppLabel}</span>
          )}
        </div>
      </div>

      <div className={`mt-6 border-t hairline pt-5 ${d.placeholder ? 'opacity-45' : ''}`}>
        <p className={`text-[12.5px] font-semibold ${s.text}`}>{d.detailLabel}</p>
        <div className="mt-2 space-y-2">
          {d.details.map((t) => (
            <p key={t} className="text-[14px] leading-relaxed text-ink-soft">
              {t}
            </p>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
