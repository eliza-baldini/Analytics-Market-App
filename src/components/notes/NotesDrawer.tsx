import { AnimatePresence, motion } from 'motion/react'
import { useNotes } from './NotesContext'

/** Side panel that presents speaker notes verbatim. */
export function NotesDrawer() {
  const { open, closeNotes } = useNotes()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[60] bg-navy-950/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNotes}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`Speaker notes: ${open.title}`}
            className="fixed top-3 right-3 bottom-3 z-[70] flex w-[min(520px,calc(100vw-24px))] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_120px_-30px_rgba(0,30,91,0.45)]"
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            data-lenis-prevent
          >
            <header className="flex items-start justify-between gap-6 border-b hairline px-8 pt-8 pb-6">
              <div>
                <p className="eyebrow text-royal">Speaker notes{open.source ? ` · ${open.source}` : ''}</p>
                <h2 className="display mt-3 text-2xl text-ink">{open.title}</h2>
              </div>
              <button
                type="button"
                onClick={closeNotes}
                className="-mr-2 grid size-9 shrink-0 place-items-center rounded-full text-ink-soft transition hover:bg-sky hover:text-ink"
                aria-label="Close notes"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-8 py-7">
              {open.blocks.map((b, i) => (
                <motion.section
                  key={i}
                  className="mb-8 last:mb-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                >
                  {b.heading && <h3 className="mb-3 text-[13px] font-semibold text-ink">{b.heading}</h3>}
                  {b.paragraphs.map((p, j) => (
                    <p key={j} className="mb-3 text-[14px] leading-[1.7] text-ink-soft last:mb-0">
                      {p}
                    </p>
                  ))}
                  {b.link && (
                    <a
                      href={b.link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-link hover:underline"
                    >
                      {b.link.label}
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </motion.section>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
