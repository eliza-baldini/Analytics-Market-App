import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { landscape, type Camp } from '../content/landscape'
import { SectionHeading } from '../components/layout/SectionHeading'
import { NotesButton } from '../components/notes/NotesButton'
import { Reveal, easeOutExpo } from '../components/motion/Reveal'
import { RichText } from '../components/ui/RichText'
import { useIsDesktop } from '../hooks/useMediaQuery'

/** Slide 7 · Market landscape. On desktop the five camps glide past horizontally while pinned. */
export function Landscape() {
  return useIsDesktop() ? <HorizontalLandscape /> : <StackedLandscape />
}

function HorizontalLandscape() {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.04, 0.96], [0, -distance])
  const bar = useTransform(scrollYProgress, [0.04, 0.96], ['0%', '100%'])

  return (
    <section id="landscape" ref={outer} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center-safe overflow-hidden pt-20">
        <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-6 py-2 pr-[8vw] pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]">
          <div className="flex w-[min(520px,40vw)] shrink-0 flex-col justify-center pr-10">
            <SectionHeading
              eyebrow="Market Landscape"
              title={landscape.title}
              subtitle={landscape.subtitle}
              aside={<NotesButton title={landscape.title} source="Slide 7" blocks={[landscape.generalNotes]} />}
            />
            <p className="mt-10 flex items-center gap-3 text-[13px] font-medium text-ink-faint">
              <span className="h-px w-10 bg-ink-faint/50" /> Five camps · keep scrolling
            </p>
          </div>
          {landscape.camps.map((c, i) => (
            <CampPanel key={c.id} camp={c} index={i} />
          ))}
        </motion.div>

        <div className="mx-auto mt-6 h-px w-[min(420px,50vw)] bg-line">
          <motion.div style={{ width: bar }} className="h-full bg-royal" />
        </div>
      </div>
    </section>
  )
}

function StackedLandscape() {
  return (
    <section id="landscape" className="px-6 py-24">
      <SectionHeading
        eyebrow="Market Landscape"
        title={landscape.title}
        subtitle={landscape.subtitle}
        aside={<NotesButton title={landscape.title} source="Slide 7" blocks={[landscape.generalNotes]} />}
        className="mb-12"
      />
      <div className="grid gap-5">
        {landscape.camps.map((c, i) => (
          <Reveal key={c.id}>
            <CampPanel camp={c} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function CampPanel({ camp, index }: { camp: Camp; index: number }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={panelVariants}
      className={`relative flex w-full shrink-0 flex-col overflow-hidden rounded-[28px] bg-white lg:w-[360px] xl:w-[380px] ${
        camp.home
          ? 'shadow-[0_40px_90px_-30px_rgba(1,118,211,0.55)] ring-2 ring-[#0176D3]'
          : 'shadow-[0_1px_2px_rgba(0,30,91,0.04),0_20px_50px_-24px_rgba(0,30,91,0.25)]'
      }`}
    >
      <header className="relative shrink-0 overflow-hidden px-6 pt-5 pb-4 text-white" style={{ background: camp.color }}>
        <div aria-hidden className="absolute -top-10 -right-10 size-32 rounded-full bg-white/10 blur-xl" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium text-white/60 tabular">0{index + 1}</p>
            <h3 className="display mt-1 text-[1.5rem]">{camp.name}</h3>
            <p className="mt-0.5 text-[13.5px] text-white/80">{camp.tagline}</p>
          </div>
          {camp.notes && <NotesButton inverted title={camp.name} source={camp.notes.source} blocks={camp.notes.blocks} />}
        </div>
      </header>

      <div className="shrink-0 px-6 pt-4 pb-4">
        {camp.thesis.map((t) => (
          <p key={t} className="mb-2 text-[14px] leading-relaxed text-ink-soft last:mb-0">
            <RichText text={t} />
          </p>
        ))}
      </div>

      <div className="mt-auto shrink-0 space-y-4 border-t hairline bg-paper/60 px-6 pt-4 pb-5">
        {camp.vendors.map((v) => (
          <VendorStack key={v.name} vendor={v} color={camp.color} />
        ))}
      </div>
    </motion.article>
  )
}

// Each panel triggers once; its layers inherit the trigger so none can be left unrevealed.
const panelVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
}

const layerVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (order: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo, delay: 0.2 + order * 0.1 },
  }),
}

/** Vendor layers build from the bottom up, mirroring how each stack is read. */
function VendorStack({ vendor, color }: { vendor: Camp['vendors'][number]; color: string }) {
  const count = vendor.layers.length
  return (
    <div>
      <p className="mb-2 text-[13px] font-semibold" style={{ color }}>
        {vendor.name}
      </p>
      <div className="space-y-1.5">
        {vendor.layers.map((l, i) => (
          <motion.div
            key={l.title}
            custom={count - 1 - i}
            variants={layerVariants}
            className={`rounded-xl text-center ${
              l.primary ? 'bg-white px-3 py-2' : 'bg-white/70 px-3 py-1 ring-1 ring-line'
            }`}
            style={l.primary ? { boxShadow: `inset 0 0 0 1px ${color}33` } : undefined}
          >
            <p className={`${l.primary ? 'text-[13px] font-semibold text-ink' : 'text-[12px] text-ink-soft'}`}>{l.title}</p>
            {l.detail && <p className="mt-0.5 text-[12px] text-ink-soft">{l.detail}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
