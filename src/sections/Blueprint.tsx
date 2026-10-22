import { motion } from 'motion/react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { blueprint, type BlueprintColumn } from '../content/vision'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal, easeOutExpo } from '../components/motion/Reveal'
import { ScrollWords } from '../components/motion/ScrollWords'
import { Icon } from '../components/ui/Icon'
import { useIsDesktop } from '../hooks/useMediaQuery'

type Path = { key: string; d: string; from: string; to: string }

/** Layout box of el relative to container, ignoring CSS transforms (so reveal animations don't skew it). */
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

/** Slide 6 · Architectural Blueprint. Three lanes joined by animated connectors. */
export function Blueprint() {
  const desktop = useIsDesktop()
  const wrap = useRef<HTMLDivElement>(null)
  const anchors = useRef(new Map<string, HTMLElement>())
  const [paths, setPaths] = useState<Path[]>([])
  const [hover, setHover] = useState<string | null>(null)

  const register = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) anchors.current.set(id, el)
    else anchors.current.delete(id)
  }, [])

  useLayoutEffect(() => {
    if (!desktop || !wrap.current) return
    const measure = () => {
      const container = wrap.current!
      const next: Path[] = []
      for (const f of blueprint.flows) {
        const ea = anchors.current.get(f.from)
        const eb = anchors.current.get(f.to)
        if (!ea || !eb) continue
        const a = boxWithin(ea, container)
        const b = boxWithin(eb, container)
        // Connectors run lane edge to lane edge, at the height of the linked item.
        const laneA = boxWithin(ea.closest<HTMLElement>('[data-lane]') ?? ea, container)
        const laneB = boxWithin(eb.closest<HTMLElement>('[data-lane]') ?? eb, container)
        const x1 = laneA.right
        const y1 = a.top + a.height / 2
        const x2 = laneB.left - 4
        const y2 = b.top + b.height / 2
        const mid = (x1 + x2) / 2
        next.push({ key: `${f.from}-${f.to}`, from: f.from, to: f.to, d: `M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}` })
      }
      setPaths(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [desktop])

  // Highlight the hovered item, its connectors and whatever they connect to.
  const linked = new Set<string>()
  if (hover) {
    linked.add(hover)
    for (const f of blueprint.flows) {
      if (f.from === hover) linked.add(f.to)
      if (f.to === hover) linked.add(f.from)
    }
    const column = blueprint.columns.find((c) => c.items.some((i) => i.id === hover))
    if (column && blueprint.flows.some((f) => f.from === column.id)) {
      for (const f of blueprint.flows) if (f.from === column.id) linked.add(f.to)
    }
  }
  const isDim = (id: string) => hover !== null && !linked.has(id)

  return (
    <section id="blueprint" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <SectionHeading eyebrow="Architectural Blueprint" title={blueprint.title} subtitle={blueprint.subtitle} className="mb-16 lg:mb-20" />

        <div ref={wrap} className="relative grid gap-5 lg:grid-cols-3 lg:gap-16">
          {blueprint.columns.map((col, ci) => (
            <Reveal key={col.id} delay={ci * 0.12} amount={0.3}>
              <Lane
                column={col}
                laneRef={register(col.id)}
                itemRef={register}
                hover={hover}
                setHover={setHover}
                isDim={isDim}
                accent={ci === 2}
              />
            </Reveal>
          ))}

          {desktop && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <marker id="bp-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M0 0L10 5L0 10z" fill="#022ac0" />
                </marker>
              </defs>
              {paths.map((p, i) => {
                const active = hover !== null && linked.has(p.from) && linked.has(p.to)
                const faded = hover !== null && !active
                return (
                  <g key={p.key} style={{ opacity: faded ? 0.15 : 1, transition: 'opacity 300ms' }}>
                    <motion.path
                      d={p.d}
                      fill="none"
                      stroke="#022ac0"
                      strokeWidth={active ? 2.2 : 1.6}
                      markerEnd="url(#bp-arrow)"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1.4, delay: 0.5 + i * 0.15, ease: easeOutExpo }}
                    />
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#00b3ff"
                      strokeWidth="2.4"
                      strokeDasharray="4 22"
                      strokeLinecap="round"
                      className="animate-[bp-flow_1.6s_linear_infinite]"
                    />
                  </g>
                )
              })}
            </svg>
          )}
        </div>

        <Summary />
      </div>
      <style>{`@keyframes bp-flow { to { stroke-dashoffset: -26; } }`}</style>
    </section>
  )
}

function Lane({
  column,
  laneRef,
  itemRef,
  hover,
  setHover,
  isDim,
  accent,
}: {
  column: BlueprintColumn
  laneRef: (el: HTMLElement | null) => void
  itemRef: (id: string) => (el: HTMLElement | null) => void
  hover: string | null
  setHover: (id: string | null) => void
  isDim: (id: string) => boolean
  accent: boolean
}) {
  const laneDim = hover !== null && column.items.every((i) => isDim(i.id))
  return (
    <div
      ref={laneRef}
      data-lane
      className={`card relative flex h-full flex-col p-7 transition-opacity duration-300 ${laneDim ? 'opacity-50' : ''} ${
        accent ? 'ring-1 ring-royal/15' : ''
      }`}
    >
      <div className="mb-7 text-center">
        <h3 className="display text-[1.45rem] leading-tight text-ink">{column.title}</h3>
        <p className="mt-1 text-[14px] font-medium text-royal italic">({column.subtitle})</p>
      </div>
      <ul className="flex flex-1 flex-col justify-center gap-3">
        {column.items.map((it) => (
          <li
            key={it.id}
            ref={itemRef(it.id)}
            onMouseEnter={() => setHover(it.id)}
            onMouseLeave={() => setHover(null)}
            className={`flex cursor-default gap-4 rounded-2xl p-4 transition-all duration-300 ${
              hover === it.id ? 'bg-sky ring-1 ring-royal/20' : 'hover:bg-paper'
            } ${isDim(it.id) ? 'opacity-40' : ''}`}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-paper text-royal ring-1 ring-line">
              <Icon name={it.icon} />
            </span>
            <span>
              <span className="block text-[14.5px] font-semibold text-ink">{it.title}:</span>
              <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{it.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Summary() {
  return (
    <div data-surface="dark" className="grain relative mt-16 overflow-hidden rounded-[32px] bg-royal px-8 py-14 text-white sm:px-14 lg:mt-24 lg:py-20">
      <div
        aria-hidden
        className="absolute -top-1/2 left-1/2 h-[120%] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,179,255,0.35),transparent)] blur-3xl"
      />
      <div className="relative mx-auto max-w-[30ch] space-y-6 text-center">
        {blueprint.summary.map((line) => (
          <ScrollWords
            key={line}
            text={line}
            dim={0.25}
            className="display text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.18] font-semibold"
          />
        ))}
      </div>
    </div>
  )
}
