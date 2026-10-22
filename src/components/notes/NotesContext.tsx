import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { NoteBlock } from '../../content/types'

export interface NotesPayload {
  title: string
  source?: string
  blocks: NoteBlock[]
}

interface NotesState {
  detailsOn: boolean
  setDetailsOn: (on: boolean) => void
  open: NotesPayload | null
  openNotes: (payload: NotesPayload) => void
  closeNotes: () => void
}

const NotesContext = createContext<NotesState | null>(null)
const STORAGE_KEY = 'ama:details'

export function NotesProvider({ children }: { children: ReactNode }) {
  const [detailsOn, setDetailsOnState] = useState(() => localStorage.getItem(STORAGE_KEY) === '1')
  const [open, setOpen] = useState<NotesPayload | null>(null)

  const setDetailsOn = useCallback((on: boolean) => {
    setDetailsOnState(on)
    localStorage.setItem(STORAGE_KEY, on ? '1' : '0')
    if (!on) setOpen(null)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <NotesContext.Provider
      value={{ detailsOn, setDetailsOn, open, openNotes: setOpen, closeNotes: () => setOpen(null) }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const ctx = useContext(NotesContext)
  if (!ctx) throw new Error('useNotes must be used inside NotesProvider')
  return ctx
}
