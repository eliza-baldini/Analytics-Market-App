import type { ReactNode } from 'react'
import { frontierDetails, frontiers, type Story } from '../content/competitive'
import { Build } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { FrontierPanel } from './Frontiers'

/** Wordmark colors for the customers named on these slides (rendered as type, not logos). */
const wordmark: Record<string, string> = {
  indeed: 'text-[#2557a7] lowercase',
  'CVS Health': 'text-[#cc0000]',
  experian: 'text-[#1d4f91] lowercase',
  'FOX ONE': 'text-black tracking-tight uppercase',
  Burberry: 'text-[#2b2b6b] uppercase tracking-[0.2em] font-serif',
  'Bristol Myers Squibb': 'text-[#7b3f9e]',
}

/**
 * Slides 21–24 · One frontier: why we win, why we lose, a win story and a loss story.
 * Builds: 0 title and frontier · 1 why we win · 2 why we lose · 3 win story · 4 loss story.
 */
export function FrontierDetail({ id }: { id: string }) {
  const d = frontierDetails.find((x) => x.id === id)!
  const f = frontiers.find((x) => x.id === d.frontier)!
  return (
    <SlideFrame title={d.title} subtitle={d.subtitle} headerClassName="[&_h2]:text-[48px]" className="!pt-14 !pb-12">
      <div className="grid h-[650px] grid-cols-[300px_1fr_1fr_1.25fr] gap-6">
        <Build delay={0.2} x={-24} y={0} className="h-full">
          <FrontierPanel frontier={f} at={0} compact />
        </Build>
        <Build at={1} y={30} className="h-full">
          <ListColumn title="Why We Win" tone="navy" items={d.win} at={1} />
        </Build>
        <Build at={2} y={30} className="h-full">
          <ListColumn title="Why We Lose" tone="slate" items={d.lose} at={2} />
        </Build>
        <div className="grid h-full grid-rows-2 gap-5">
          <Build at={3} y={24} className="h-full">
            <StoryCard title="Win Story" tone="teal" story={d.winStory} />
          </Build>
          <Build at={4} y={24} className="h-full">
            <StoryCard title="Loss Story" tone="coral" story={d.lossStory} />
          </Build>
        </div>
      </div>
    </SlideFrame>
  )
}

function Pill({ tone, children }: { tone: 'navy' | 'slate' | 'teal' | 'coral'; children: ReactNode }) {
  const bg = { navy: 'bg-navy-900', slate: 'bg-[#5f6b7d]', teal: 'bg-[#0b7a6c]', coral: 'bg-[#e07a5f]' }[tone]
  return <span className={`relative z-10 mx-auto -mb-5 block w-[80%] rounded-2xl ${bg} py-2.5 text-center text-[24px] font-semibold text-white shadow-md`}>{children}</span>
}

function ListColumn({ title, tone, items, at }: { title: string; tone: 'navy' | 'slate'; items: string[]; at: number }) {
  return (
    <div className="flex h-full flex-col">
      <Pill tone={tone}>{title}</Pill>
      <div className={`flex flex-1 flex-col rounded-[24px] bg-white p-4 pt-9 ring-2 ${tone === 'navy' ? 'ring-navy-900/70' : 'ring-[#5f6b7d]/60'}`}>
        <ul className="flex flex-1 flex-col justify-center gap-7 rounded-2xl bg-sky/70 px-5 py-6 text-center">
          {items.map((item, i) => (
            <Build key={item} at={at} delay={0.2 + i * 0.1} y={10}>
              <li className="text-[21px] leading-snug text-ink">{item}</li>
            </Build>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StoryCard({ title, tone, story }: { title: string; tone: 'teal' | 'coral'; story: Story }) {
  const placeholder = !story.customer
  return (
    <div className="flex h-full flex-col">
      <Pill tone={tone}>{title}</Pill>
      <div className={`flex flex-1 flex-col rounded-[24px] bg-white p-4 pt-8 ring-2 ${tone === 'teal' ? 'ring-[#0b7a6c]/60' : 'ring-[#e07a5f]/60'}`}>
        <div className={`flex flex-1 flex-col rounded-2xl bg-sky/70 px-5 py-4 ${placeholder ? 'justify-end opacity-50' : ''}`}>
          {story.customer && (
            <p className={`display mb-3 text-center text-[34px] leading-none font-bold ${wordmark[story.customer] ?? 'text-navy-900'}`}>{story.customer}</p>
          )}
          <ul className="list-disc space-y-1.5 pl-5">
            {story.points.map((pt) => (
              <li key={pt} className="text-[16px] leading-snug text-ink italic">
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
