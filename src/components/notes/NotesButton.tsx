import { AnimatePresence, motion } from 'motion/react'
import { useNotes, type NotesPayload } from './NotesContext'

interface Props extends NotesPayload {
  className?: string
  /** Use on dark surfaces. */
  inverted?: boolean
  label?: string
}

/** A quiet "Notes" affordance that only appears when the Details toggle is on. */
export function NotesButton({ className = '', inverted, label = 'Details', ...payload }: Props) {
  const { detailsOn, openNotes } = useNotes()
  return (
    <AnimatePresence>
      {detailsOn && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.stopPropagation()
            openNotes(payload)
          }}
          className={`group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors ${
            inverted
              ? 'bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/20 hover:text-white'
              : 'bg-royal/[0.06] text-royal ring-1 ring-royal/10 hover:bg-royal/10'
          } ${className}`}
          aria-label={`Open speaker notes: ${payload.title}`}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 3.5h10M3 8h10M3 12.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          {label}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
