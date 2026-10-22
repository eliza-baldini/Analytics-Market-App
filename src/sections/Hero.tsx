import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { hero, meta } from '../content/navigation'
import { easeOutExpo } from '../components/motion/Reveal'
import { useScrollTo } from '../components/motion/SmoothScroll'
import { TableauMark } from '../components/ui/TableauMark'

/** Slide 1 · Title. The hero recedes into a floating card as the story begins. */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const radius = useTransform(scrollYProgress, [0, 0.5], [0, 44])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div id={hero.id} ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.section
          data-surface="dark"
          style={{ scale, borderRadius: radius }}
          className="grain relative h-full w-full overflow-hidden bg-[#0418a8] text-white will-change-transform"
        >
          <Backdrop progress={scrollYProgress} />

          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="relative mx-auto grid h-full max-w-[1240px] grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="pt-24 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeOutExpo, delay: 0.1 }}
                className="mb-10 flex items-center gap-3"
              >
                <TableauMark size={26} className="text-white" />
                <span className="text-[15px] font-semibold tracking-[0.32em] lowercase">tableau</span>
                <span className="text-[12px] text-white/50">from Salesforce</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.25 }}
                className="eyebrow mb-5 text-cyan"
              >
                {meta.eyebrow}
              </motion.p>
              <h1 className="display text-[clamp(3.4rem,8.4vw,7.6rem)] leading-[0.95]">
                {meta.title.split(' ').map((word, i) => (
                  <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.35 + i * 0.1 }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.9 }}
                className="mt-10 text-[17px] text-white/70"
              >
                {meta.date}
              </motion.p>
            </div>

            <HeroArt progress={scrollYProgress} />
          </motion.div>

          <motion.button
            type="button"
            onClick={() => scrollTo('shift')}
            style={{ opacity: contentOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase"
          >
            Scroll to explore
            <span className="relative h-10 w-[22px] rounded-full ring-1 ring-white/30">
              <motion.span
                className="absolute top-2 left-1/2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-white"
                animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </motion.button>
        </motion.section>
      </div>
    </div>
  )
}

function Backdrop({ progress }: { progress: MotionValue<number> }) {
  const glowY = useTransform(progress, [0, 1], ['0%', '25%'])
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,#0b4bf0_0%,transparent_55%),radial-gradient(90%_70%_at_0%_100%,#0016a0_0%,transparent_60%)]" />
      <motion.div
        style={{ y: glowY }}
        className="absolute -bottom-[30%] left-1/2 h-[70%] w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#00b3ff_0%,rgba(0,179,255,0.35)_40%,transparent_75%)] blur-2xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)] bg-[size:72px_72px]" />
    </div>
  )
}

const bars = [
  { h: 0.62, color: 'bg-cyan-soft', delay: 0.5 },
  { h: 0.86, color: 'bg-cyan', delay: 0.62 },
  { h: 0.5, color: 'bg-cyan-soft', delay: 0.74 },
]

const sparkles = [
  { x: '88%', y: '12%', s: 30, d: 0 },
  { x: '6%', y: '48%', s: 14, d: 0.8 },
  { x: '96%', y: '34%', s: 12, d: 1.6 },
  { x: '14%', y: '78%', s: 18, d: 2.2 },
]

function HeroArt({ progress }: { progress: MotionValue<number> }) {
  const lift = useTransform(progress, [0, 1], [0, -80])
  const grow = useTransform(progress, [0, 1], [1, 1.12])
  return (
    <motion.div style={{ y: lift }} className="relative mx-auto hidden aspect-square w-full max-w-[460px] lg:block" aria-hidden>
      <motion.div style={{ scaleY: grow }} className="absolute inset-x-[12%] bottom-[14%] top-[10%] flex origin-bottom items-end gap-[5%]">
        {bars.map((b, i) => (
          <motion.div
            key={i}
            className={`${b.color} flex-1 rounded-[18px] shadow-[0_30px_60px_-20px_rgba(0,20,120,0.6)]`}
            style={{ height: `${b.h * 100}%`, transformOrigin: 'bottom' }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: easeOutExpo, delay: b.delay }}
          />
        ))}
      </motion.div>
      <motion.div
        className="absolute right-[6%] bottom-[6%] grid size-[24%] place-items-center rounded-full bg-white shadow-[0_20px_50px_-12px_rgba(0,20,120,0.6)]"
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 1.2 }}
      >
        <TableauMark size={56} className="text-royal" />
      </motion.div>
      {sparkles.map((s, i) => (
        <motion.svg
          key={i}
          width={s.s}
          height={s.s}
          viewBox="0 0 24 24"
          className="absolute text-cyan"
          style={{ left: s.x, top: s.y }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85], rotate: [0, 45, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
        >
          <path d="M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0Z" fill="currentColor" />
        </motion.svg>
      ))}
    </motion.div>
  )
}
