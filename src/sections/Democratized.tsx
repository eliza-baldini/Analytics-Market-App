import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { democratized, type Era } from '../content/shift'
import { SectionHeading } from '../components/layout/SectionHeading'
import { NotesButton } from '../components/notes/NotesButton'
import { CountUp } from '../components/motion/CountUp'
import { Reveal, Stagger, StaggerItem, easeOutExpo } from '../components/motion/Reveal'
import { RichText } from '../components/ui/RichText'

/** Slide 3 · Tableau Democratized Data. Two eras joined by a scroll-drawn connector, then the movement in numbers. */
export function Democratized() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'center 0.5'] })
  const connector = useTransform(scrollYProgress, [0.2, 0.75], [0, 1])
  const modernLift = useTransform(scrollYProgress, [0.45, 1], [24, 0])
  const [past, present] = democratized.eras

  return (
    <section id="democratized" className="relative mx-auto max-w-[1240px] px-6 pt-28 pb-24 sm:px-10 lg:pt-40 lg:pb-32">
      <SectionHeading
        inverted
        eyebrow="Tableau Democratized Data"
        title={democratized.title}
        subtitle={democratized.subtitle}
        aside={<NotesButton inverted title={democratized.title} source={democratized.notes.source} blocks={democratized.notes.blocks} />}
        className="mb-16 lg:mb-20"
      />

      <div ref={ref} className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1.15fr] lg:gap-8">
        <Reveal x={-30} y={0} amount={0.4}>
          <EraCard era={past} tone="past" />
        </Reveal>

        <div className="relative hidden w-24 items-center lg:flex" aria-hidden>
          <span className="h-px w-full bg-white/15" />
          <motion.span style={{ scaleX: connector }} className="absolute inset-x-0 h-px origin-left bg-gradient-to-r from-white/40 to-cyan" />
          <motion.span
            style={{ opacity: connector }}
            className="absolute left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-navy-900 text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] ring-1 ring-white/15"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>

        <motion.div style={{ y: modernLift }}>
          <Reveal x={30} y={0} amount={0.4} className="h-full">
            <EraCard era={present} tone="present" />
          </Reveal>
        </motion.div>
      </div>

      <Movement />
    </section>
  )
}

function EraCard({ era, tone }: { era: Era; tone: 'past' | 'present' }) {
  const present = tone === 'present'
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[28px] ${
        present
          ? 'bg-white text-ink shadow-[0_40px_90px_-30px_rgba(91,33,182,0.7)]'
          : 'bg-white/[0.06] text-white ring-1 ring-white/12'
      }`}
    >
      <header className={`px-7 pt-6 pb-5 text-center ${present ? 'bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white' : 'bg-white/[0.06]'}`}>
        <p className={`text-[12px] font-semibold tracking-wide tabular ${present ? 'text-white/75' : 'text-white/55'}`}>{era.period}</p>
        <h3 className="display mt-1 text-[1.65rem]">{era.title}</h3>
      </header>
      <p className={`px-7 py-3.5 text-center text-[14px] ${present ? 'bg-[#ede9fe] text-ink' : 'bg-white/[0.04] text-white/65'}`}>
        <RichText text={era.lead} />
      </p>
      <Stagger className="flex flex-1 flex-col justify-center gap-4 px-7 py-8 text-center" stagger={0.1} delay={0.2}>
        {era.points.map((pt) => (
          <StaggerItem key={pt} className={`text-[17px] ${present ? 'font-medium text-ink' : 'text-white/70'}`}>
            {pt}
          </StaggerItem>
        ))}
      </Stagger>
      {era.tagline && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
          className="mx-4 mb-4 rounded-2xl bg-[#ede9fe] px-5 py-3.5 text-center text-[1.15rem] font-semibold text-navy-900"
        >
          <RichText text={era.tagline} />
        </motion.p>
      )}
    </article>
  )
}

function Movement() {
  const { movement } = democratized
  const [a, b, c, d] = movement.stats
  return (
    <div className="mt-24 lg:mt-32">
      <Reveal>
        <p className="display text-center text-[clamp(1.5rem,2.6vw,2.3rem)] font-semibold text-white/90 italic">{movement.title}</p>
      </Reveal>
      <Stagger className="mt-14 grid grid-cols-2 items-start gap-y-12 lg:grid-cols-5" stagger={0.1}>
        <Stat {...a} />
        <Stat {...b} />
        <StaggerItem className="col-span-2 flex justify-center self-center lg:col-span-1">
          <span className="display bg-gradient-to-br from-white via-cyan-soft to-cyan bg-clip-text text-[clamp(2rem,3.4vw,2.9rem)] font-bold text-transparent italic -rotate-6 px-3 pb-1">
            {movement.community}
          </span>
        </StaggerItem>
        <Stat {...c} />
        <Stat {...d} />
      </Stagger>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <StaggerItem className="text-center">
      <p className="display text-[clamp(2.6rem,4.6vw,4rem)] text-white">
        <CountUp value={value} />
      </p>
      <p className="mx-auto mt-2 max-w-[18ch] text-[14.5px] font-medium text-white/70">{label}</p>
    </StaggerItem>
  )
}
