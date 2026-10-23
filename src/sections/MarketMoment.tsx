import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { marketMoment } from '../content/shift'
import { SectionHeading } from '../components/layout/SectionHeading'
import { NotesButton } from '../components/notes/NotesButton'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal'
import { ScrollWords } from '../components/motion/ScrollWords'
import { RichText } from '../components/ui/RichText'
import { useIsDesktop } from '../hooks/useMediaQuery'

/** Slide 4 · The Next Market Moment. Pinned: the opportunity lands, then the demand for trust and its five pillars. */
export function MarketMoment() {
  return useIsDesktop() ? <PinnedMoment /> : <StackedMoment />
}

function Heading() {
  return (
    <SectionHeading
      inverted
      size="md"
      eyebrow="The Next Market Moment"
      title={marketMoment.title}
      subtitle={marketMoment.subtitle}
      aside={<NotesButton inverted title={marketMoment.title} source={marketMoment.notes.source} blocks={marketMoment.notes.blocks} />}
      className="mb-10"
    />
  )
}

function PinnedMoment() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const unlockWords = useTransform(p, [0.02, 0.36], [0, 1])
  const demandOpacity = useTransform(p, [0.36, 0.48], [0, 1])
  const demandX = useTransform(p, [0.36, 0.52], [80, 0])
  const unlockDim = useTransform(p, [0.4, 0.55], [1, 0.72])

  return (
    <section id="market-moment" ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center-safe overflow-hidden pt-20 pb-10">
        <div className="mx-auto w-full max-w-[1240px] px-10">
          <Heading />
          <div className="grid grid-cols-2 gap-6">
            <motion.div style={{ opacity: unlockDim }} className="flex min-h-[46vh] items-center justify-center rounded-[40px] bg-white p-12 text-center">
              <ScrollWords
                text={marketMoment.unlock}
                progress={unlockWords}
                dim={0.14}
                accentClass="text-royal"
                className="display text-[clamp(1.9rem,3.2vw,3.1rem)] leading-[1.1] text-navy-900"
              />
            </motion.div>
            <motion.div
              style={{ opacity: demandOpacity, x: demandX }}
              className="flex min-h-[46vh] flex-col items-center justify-center rounded-[40px] bg-white p-12 text-center shadow-[0_40px_100px_-40px_rgba(0,179,255,0.6)]"
            >
              <p className="display text-[clamp(1.9rem,3.2vw,3.1rem)] leading-[1.1] text-navy-900">{marketMoment.demand}</p>
              <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
                {marketMoment.pillars.map((pillar, i) => (
                  <Pillar key={pillar} label={pillar} index={i} progress={p} />
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pillar({ label, index, progress }: { label: string; index: number; progress: MotionValue<number> }) {
  const start = 0.52 + index * 0.07
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1])
  const y = useTransform(progress, [start, start + 0.06], [14, 0])
  const glow = useTransform(progress, [start, start + 0.06, start + 0.16], [0, 1, 0.35])
  return (
    <motion.li style={{ opacity, y }} className="relative rounded-full bg-royal/[0.07] px-4 py-2 text-[15px] font-semibold text-royal">
      <motion.span aria-hidden style={{ opacity: glow }} className="absolute inset-0 rounded-full ring-2 ring-cyan" />
      {label}
    </motion.li>
  )
}

function StackedMoment() {
  return (
    <section id="market-moment" className="px-6 py-24">
      <Heading />
      <div className="grid gap-5">
        <Reveal>
          <div className="rounded-[32px] bg-white p-9 text-center">
            <p className="display text-[1.9rem] leading-tight text-navy-900">
              <RichText text={marketMoment.unlock} accentClass="text-royal" />
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-[32px] bg-white p-9 text-center">
            <p className="display text-[1.9rem] leading-tight text-navy-900">{marketMoment.demand}</p>
            <Stagger className="mt-7 flex flex-wrap justify-center gap-2">
              {marketMoment.pillars.map((pillar) => (
                <StaggerItem key={pillar} className="rounded-full bg-royal/[0.07] px-4 py-2 text-[14px] font-semibold text-royal">
                  {pillar}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
