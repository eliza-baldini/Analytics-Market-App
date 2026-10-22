import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { easeOutExpo } from '../motion/Reveal'
import { useNotes } from './NotesContext'

// Per browser session, so every new visit introduces the toggle once.
const STORAGE_KEY = 'ama:details-hint-dismissed'

/** True once the reader has scrolled past the opening, until the hint is dismissed this session. */
export function useDetailsHint() {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1')
  const [pastOpening, setPastOpening] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastOpening(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  return { visible: pastOpening && !dismissed, dismiss }
}

/** A callout under the Details toggle explaining what it does. */
export function DetailsHint({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  const { detailsOn, setDetailsOn } = useNotes()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="About the Details toggle"
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="pointer-events-auto absolute top-[calc(100%+14px)] right-1 w-[300px] origin-top-right rounded-2xl bg-navy-900 p-5 text-white shadow-[0_24px_60px_-18px_rgba(0,15,51,0.65)]"
        >
          {/* pointer toward the toggle */}
          <span aria-hidden className="absolute -top-1.5 right-9 size-3 rotate-45 rounded-[2px] bg-navy-900" />
          <p className="eyebrow text-cyan">Go deeper</p>
          <p className="mt-2 text-[14px] leading-relaxed text-white/85">
            Turn on to see the research and sources behind each section. Expand from the{' '}
            <span className="font-semibold text-white">Details</span> tags.
          </p>
          <div className="mt-4 flex items-center gap-2">
            {!detailsOn && (
              <button
                type="button"
                onClick={() => {
                  setDetailsOn(true)
                  onDismiss()
                }}
                className="rounded-full bg-cyan px-4 py-1.5 text-[12.5px] font-semibold text-navy-950 transition hover:bg-white"
              >
                Turn on Details
              </button>
            )}
            <button
              type="button"
              onClick={onDismiss}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium transition ${
                detailsOn ? 'bg-cyan font-semibold text-navy-950 hover:bg-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
