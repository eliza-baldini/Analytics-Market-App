import type { ReactNode } from 'react'
import { productStrategy as c } from '../content/competitive'
import { Build } from '../deck/Build'

/**
 * Slide 27 · FY28 Product Strategy.
 * Builds: 0 title · 1 key market trends · 2 product investment · 3 P&P levers.
 */
export function ProductStrategy() {
  return (
    <div className="flex h-full flex-col px-16 pt-12 pb-10 text-ink">
      <Build y={14}>
        <h2 className="display text-[50px]">{c.title}</h2>
      </Build>

      <Build at={1} y={20} className="mt-9">
        <Panel title={c.trends.title}>
          <div className="grid grid-cols-3 gap-5">
            {c.trends.items.map((t, i) => (
              <Build key={t.title} at={1} delay={0.2 + i * 0.1} y={10}>
                <div className="h-full rounded-xl bg-sky/70 px-5 py-3.5">
                  <p className="text-[19px] leading-tight font-semibold text-navy-900">{t.title}</p>
                  <p className="mt-1.5 text-[14px] leading-snug text-ink-soft">{t.detail}</p>
                </div>
              </Build>
            ))}
          </div>
        </Panel>
      </Build>

      <div className="mt-8 grid flex-1 grid-cols-2 gap-8">
        <Build at={2} y={24} className="h-full">
          <Panel title={c.investment.title} subtitle={c.investment.subtitle}>
            <Rows items={c.investment.items} at={2} labelTone="bg-[#9cc9f5] text-navy-900" />
          </Panel>
        </Build>
        <Build at={3} y={24} className="h-full">
          <Panel title={c.levers.title} subtitle={c.levers.subtitle}>
            <Rows items={c.levers.items} at={3} labelTone="bg-[#0b9be0] text-white" />
          </Panel>
        </Build>
      </div>
    </div>
  )
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="relative h-full rounded-[22px] bg-white px-6 pt-10 pb-5 shadow-[0_18px_44px_-28px_rgba(0,30,91,0.3)]">
      <p className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-royal px-8 py-1.5 text-[24px] font-semibold whitespace-nowrap text-white shadow-md">
        {title}
      </p>
      {subtitle && <p className="-mt-1 mb-3 text-center text-[14px] text-ink-soft italic">{subtitle}</p>}
      {children}
    </section>
  )
}

function Rows({ items, at, labelTone }: { items: { label: string; headline: string; detail: string }[]; at: number; labelTone: string }) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <Build key={it.label} at={at} delay={0.2 + i * 0.1} y={10}>
          <div className="grid grid-cols-[140px_1fr] items-stretch gap-3 rounded-xl bg-sky/60 p-2">
            <span className={`grid place-items-center rounded-lg px-2 py-2 text-center text-[16px] leading-tight font-semibold ${labelTone}`}>{it.label}</span>
            <span className="py-1">
              <span className="block text-[16.5px] leading-snug font-semibold text-navy-900">{it.headline}</span>
              <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-soft italic">{it.detail}</span>
            </span>
          </div>
        </Build>
      ))}
    </div>
  )
}
