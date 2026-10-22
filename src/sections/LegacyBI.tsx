import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { legacyBI } from '../content/shift'
import { Reveal, Stagger, StaggerItem, easeOutExpo } from '../components/motion/Reveal'
import { ScrollWords } from '../components/motion/ScrollWords'
import { RichText } from '../components/ui/RichText'

/** Slide 3 · Legacy BI. A pinned statement beside a linear chain that ends in a dead end. */
export function LegacyBI() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.7'] })
  const statement = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const rail = useTransform(scrollYProgress, [0.05, 0.75], [0, 1])

  return (
    <section id="legacy-bi" ref={ref} className="relative mx-auto max-w-[1240px] px-6 py-24 sm:px-10 lg:py-40">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-10rem)]">
          <div
            data-surface="dark"
            className="grain relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-royal p-8 text-white shadow-[0_50px_100px_-40px_rgba(2,42,192,0.7)] sm:p-12"
          >
            <div
              aria-hidden
              className="absolute -right-24 -bottom-24 size-96 rounded-full bg-[radial-gradient(closest-side,rgba(0,179,255,0.45),transparent)] blur-2xl"
            />
            <div className="relative">
              <p className="eyebrow mb-6 text-cyan">Legacy BI</p>
              <h2 className="display text-[clamp(2.2rem,3.6vw,3.4rem)]">
                {legacyBI.title}
                <br />
                <span className="font-semibold italic">{legacyBI.titleEmphasis}</span>
              </h2>
            </div>
            <ScrollWords
              text={legacyBI.statement}
              progress={statement}
              dim={0.28}
              className="display relative mt-12 text-[clamp(1.5rem,2.3vw,2.15rem)] leading-[1.18] font-semibold"
            />
          </div>
        </div>

        <div className="relative lg:pt-[8vh]">
          {/* progress rail linking the stages */}
          <div aria-hidden className="absolute top-[8vh] bottom-[22rem] left-[27px] hidden w-px bg-line sm:block">
            <motion.div style={{ scaleY: rail }} className="h-full w-full origin-top bg-gradient-to-b from-royal to-cyan" />
          </div>

          <div className="space-y-6 lg:space-y-[14vh]">
            {legacyBI.stages.map((s, i) => (
              <Reveal key={s.stage} amount={0.5} className="relative sm:pl-20">
                <span className="absolute top-7 left-0 hidden size-14 place-items-center rounded-full bg-white text-[13px] font-semibold text-royal ring-1 ring-line tabular sm:grid">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <article className="card group p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-24px_rgba(0,30,91,0.3)]">
                  <p className="eyebrow text-royal">{s.role}</p>
                  <h3 className="display mt-3 text-[1.9rem]">{s.stage}</h3>
                  <Stagger className="mt-6 space-y-3" stagger={0.07} delay={0.2}>
                    {s.points.map((pt) => (
                      <StaggerItem key={pt} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-soft">
                        <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-cyan" />
                        {pt}
                      </StaggerItem>
                    ))}
                  </Stagger>
                </article>
              </Reveal>
            ))}
          </div>

          <DeadEnd />
        </div>
      </div>
    </section>
  )
}

/** The return path from consumption back to the data team never completes. */
function DeadEnd() {
  return (
    <div className="relative mt-16 sm:pl-20 lg:mt-[14vh]">
      <svg viewBox="0 0 400 90" className="mb-4 hidden h-20 w-full sm:block" fill="none" aria-hidden>
        <defs>
          <mask id="dead-end-reveal">
            <motion.path
              d="M380 80 C 380 10, 240 10, 160 40"
              stroke="#fff"
              strokeWidth="6"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.6, ease: easeOutExpo }}
            />
          </mask>
        </defs>
        <path
          d="M380 80 C 380 10, 240 10, 160 40"
          stroke="#022ac0"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
          mask="url(#dead-end-reveal)"
        />
        <motion.g
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 300, damping: 14 }}
          style={{ originX: '150px', originY: '44px' }}
        >
          <circle cx="146" cy="44" r="13" fill="#fff" stroke="#e5372b" strokeWidth="2" />
          <path d="M141 39l10 10M151 39l-10 10" stroke="#e5372b" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </svg>
      <Reveal amount={0.6}>
        <div className="rounded-[24px] border border-royal/15 bg-gradient-to-br from-white to-sky p-8">
          <p className="text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed text-ink">
            <RichText text={legacyBI.deadEnd} />
          </p>
        </div>
      </Reveal>
    </div>
  )
}
