import { motion } from 'motion/react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { blueprint, type BlueprintColumn } from '../content/vision'
import { Build, useBuildTransition, useSlideStep } from '../deck/Build'
import { SlideFrame } from '../deck/SlideFrame'
import { Words } from '../deck/Words'
import { Icon } from '../components/ui/Icon'

type Path = { key: string; d: string; from: string; to: string; at: number }

/** Layout box of el relative to container, ignoring CSS transforms (so build animations don't skew it). */
function boxWithin(el: HTMLElement, container: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== container) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { left: x, top: y, right: x + el.offsetWidth, height: el.offsetHeight }
}

const laneAt: Record<string, number> = { analytical: 1, bridge: 2, governance: 3 }

/**
 * Slide 9 · Architectural Blueprint: Hex & Tableau.
 * Builds: 0 title · 1 analytical path · 2 warehouse bridge · 3 governance path · 4 summary.
 */
export function Blueprint() {
  const wrap = useRef<HTMLDivElement>(null)
  const anchors = useRef(new Map<string, HTMLElement>())
  const [paths, setPaths] = useState<Path[]>([])
  const [hover, setHover] = useState<string | null>(null)

  const register = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) anchors.current.set(id, el)
      else anchors.current.delete(id)
    },
    [],
  )

  // Item → lane lookup, so each connector appears with the later of its two lanes.
  const laneOf = (id: string) => blueprint.columns.find((c) => c.id === id || c.items.some((i) => i.id === id))?.id ?? id

  useLayoutEffect(() => {
    const container = wrap.current
    if (!container) return
    const next: Path[] = []
    for (const f of blueprint.flows) {
      const ea = anchors.current.get(f.from)
      const eb = anchors.current.get(f.to)
      if (!ea || !eb) continue
      const a = boxWithin(ea, container)
      const b = boxWithin(eb, container)
      const laneA = boxWithin(ea.closest<HTMLElement>('[data-lane]') ?? ea, container)
      const laneB = boxWithin(eb.closest<HTMLElement>('[data-lane]') ?? eb, container)
      const x1 = laneA.right
      const y1 = a.top + a.height / 2
      const x2 = laneB.left - 4
      const y2 = b.top + b.height / 2
      const mid = (x1 + x2) / 2
      next.push({
        key: `${f.from}-${f.to}`,
        from: f.from,
        to: f.to,
        at: Math.max(laneAt[laneOf(f.from)], laneAt[laneOf(f.to)]),
        d: `M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`,
      })
    }
    setPaths(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Highlight the hovered item, its connectors and whatever they connect to.
  const linked = new Set<string>()
  if (hover) {
    linked.add(hover)
    for (const f of blueprint.flows) {
      if (f.from === hover) linked.add(f.to)
      if (f.to === hover) linked.add(f.from)
    }
    const column = blueprint.columns.find((c) => c.items.some((i) => i.id === hover))
    if (column) for (const f of blueprint.flows) if (f.from === column.id) linked.add(f.to)
  }
  const isDim = (id: string) => hover !== null && !linked.has(id)

  return (
    <SlideFrame eyebrow="Architectural Blueprint" title={blueprint.title} subtitle={blueprint.subtitle}>
      <div ref={wrap} className="relative grid grid-cols-3 gap-20">
        {blueprint.columns.map((col) => (
          <Build key={col.id} at={laneAt[col.id]} y={30} className="h-full">
            <Lane column={col} laneRef={register(col.id)} itemRef={register} hover={hover} setHover={setHover} isDim={isDim} />
          </Build>
        ))}
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <marker id="bp-arrow-slide" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L10 5L0 10z" fill="#022ac0" />
            </marker>
          </defs>
          {paths.map((p, i) => (
            <Connector key={p.key} path={p} index={i} faded={hover !== null && !(linked.has(p.from) && linked.has(p.to))} />
          ))}
        </svg>
      </div>

      <Build at={4} className="mt-8">
        <div className="grain relative overflow-hidden rounded-[28px] bg-royal px-14 py-8 text-center text-white">
          <div aria-hidden className="absolute -top-1/2 left-1/2 h-[200%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,179,255,0.35),transparent)] blur-3xl" />
          <div className="relative space-y-2">
            {blueprint.summary.map((line, i) => (
              <Words key={line} text={line} at={4} delay={0.2 + i * 0.5} dim={0.25} className="display text-[30px] leading-[1.2] font-semibold" />
            ))}
          </div>
        </div>
      </Build>
      <style>{`@keyframes bp-flow { to { stroke-dashoffset: -26; } }`}</style>
    </SlideFrame>
  )
}

function Connector({ path, index, faded }: { path: Path; index: number; faded: boolean }) {
  const { step } = useSlideStep()
  const on = step >= path.at
  const t = useBuildTransition(path.at, 0.35 + (index % 3) * 0.15, 1.1)
  return (
    <g style={{ opacity: faded ? 0.15 : 1, transition: 'opacity 300ms' }}>
      <motion.path d={path.d} fill="none" stroke="#022ac0" strokeWidth={2} markerEnd="url(#bp-arrow-slide)" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={t} />
      {on && (
        <path d={path.d} fill="none" stroke="#00b3ff" strokeWidth="2.6" strokeDasharray="4 22" strokeLinecap="round" className="animate-[bp-flow_1.6s_linear_infinite]" />
      )}
    </g>
  )
}

function Lane({
  column,
  laneRef,
  itemRef,
  hover,
  setHover,
  isDim,
}: {
  column: BlueprintColumn
  laneRef: (el: HTMLElement | null) => void
  itemRef: (id: string) => (el: HTMLElement | null) => void
  hover: string | null
  setHover: (id: string | null) => void
  isDim: (id: string) => boolean
}) {
  const laneDim = hover !== null && column.items.every((i) => isDim(i.id))
  return (
    <div ref={laneRef} data-lane className={`card relative flex h-full flex-col p-7 transition-opacity duration-300 ${laneDim ? 'opacity-50' : ''}`}>
      <div className="mb-5 text-center">
        <h3 className="display text-[27px] leading-tight text-ink">{column.title}</h3>
        <p className="mt-1 text-[17px] font-medium text-royal italic">({column.subtitle})</p>
      </div>
      <ul className="flex flex-1 flex-col justify-center gap-2">
        {column.items.map((it) => (
          <li
            key={it.id}
            ref={itemRef(it.id)}
            onMouseEnter={() => setHover(it.id)}
            onMouseLeave={() => setHover(null)}
            className={`flex cursor-default gap-4 rounded-2xl p-3.5 transition-all duration-300 ${hover === it.id ? 'bg-sky ring-1 ring-royal/20' : 'hover:bg-paper'} ${
              isDim(it.id) ? 'opacity-40' : ''
            }`}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-paper text-royal ring-1 ring-line">
              <Icon name={it.icon} />
            </span>
            <span>
              <span className="block text-[17px] font-semibold text-ink">{it.title}:</span>
              <span className="mt-0.5 block text-[16px] leading-snug text-ink-soft">{it.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
