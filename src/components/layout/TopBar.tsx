import { motion, useScroll, useSpring } from 'motion/react'
import { chapters, meta } from '../../content/navigation'
import { useDarkSurfaceAt } from '../../hooks/useSurfaceAt'
import { DetailsHint, useDetailsHint } from '../notes/DetailsHint'
import { useNotes } from '../notes/NotesContext'
import { useScrollTo } from '../motion/SmoothScroll'
import { TableauMark } from '../ui/TableauMark'

const topBarPoint = () => ({ x: window.innerWidth / 2, y: 32 })

export function TopBar({ activeChapter }: { activeChapter: string | null }) {
  const dark = useDarkSurfaceAt(topBarPoint)
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  const hint = useDetailsHint()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="relative mx-auto max-w-[1240px]">
      <div
        className={`pointer-events-auto relative flex h-14 items-center justify-between gap-4 overflow-hidden rounded-full pr-2 pl-5 transition-[background-color,box-shadow,color] duration-500 ${
          dark
            ? 'bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-xl'
            : 'glass text-ink shadow-[0_1px_0_rgba(0,30,91,0.04),0_12px_40px_-16px_rgba(0,30,91,0.25),inset_0_0_0_1px_rgba(0,30,91,0.06)]'
        }`}
      >
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="flex min-w-0 items-center gap-3 text-left"
          aria-label="Back to top"
        >
          <TableauMark size={20} className={dark ? 'text-white' : 'text-royal'} />
          <span className="truncate text-[13px] font-semibold tracking-tight">{meta.title}</span>
          <span className={`hidden text-[12px] xl:inline ${dark ? 'text-white/50' : 'text-ink-faint'}`}>
            {meta.eyebrow} · {meta.date}
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Chapters">
          {chapters.map((c) => {
            const active = activeChapter === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => scrollTo(c.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                  active ? (dark ? 'text-navy-900' : 'text-white') : dark ? 'text-white/65 hover:text-white' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="chapter-pill"
                    className={`absolute inset-0 rounded-full ${dark ? 'bg-white' : 'bg-navy-900'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">
                  <span className="mr-1.5 opacity-50 tabular">{c.index}</span>
                  {c.title}
                </span>
              </button>
            )
          })}
        </nav>

        <DetailsToggle dark={dark} highlight={hint.visible} />

        <motion.span
          aria-hidden
          style={{ scaleX: progress }}
          className={`absolute inset-x-6 bottom-0 h-px origin-left ${dark ? 'bg-cyan' : 'bg-royal'}`}
        />
      </div>
      <DetailsHint visible={hint.visible} onDismiss={hint.dismiss} />
      </div>
    </header>
  )
}

function DetailsToggle({ dark, highlight }: { dark: boolean; highlight: boolean }) {
  const { detailsOn, setDetailsOn } = useNotes()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={detailsOn}
      onClick={() => setDetailsOn(!detailsOn)}
      className={`group flex shrink-0 items-center gap-2.5 rounded-full py-1.5 pr-1.5 pl-3.5 text-[12px] font-medium transition-colors ${
        dark ? 'text-white/75 hover:text-white' : 'text-ink-soft hover:text-ink'
      }`}
      title="Show speaker notes throughout the page"
    >
      Details
      <span
        className={`relative h-[22px] w-[38px] rounded-full transition-colors duration-300 ${
          detailsOn ? 'bg-cyan' : dark ? 'bg-white/20' : 'bg-navy-900/15'
        }`}
      >
        {highlight && (
          <motion.span
            aria-hidden
            className="absolute -inset-[3px] rounded-full ring-2 ring-cyan"
            animate={{ opacity: [0.9, 0.2, 0.9], scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <motion.span
          className="absolute top-[3px] left-[3px] size-4 rounded-full bg-white shadow-sm"
          animate={{ x: detailsOn ? 16 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </span>
    </button>
  )
}
