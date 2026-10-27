import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { slides } from './slides'

export type Direction = 1 | -1

interface DeckState {
  index: number
  step: number
  /** +1 when moving forward, -1 when moving back; drives the slide transition. */
  direction: Direction
  /** True when a slide was entered from a later slide, so its builds show without replaying. */
  arrivedFromAfter: boolean
  overview: boolean
  next: () => void
  prev: () => void
  goTo: (index: number, step?: number) => void
  setStep: (step: number) => void
  setOverview: (open: boolean) => void
}

const DeckContext = createContext<DeckState | null>(null)

const lastStep = (i: number) => slides[i].steps - 1

/** Reads "#slide-id" or "#slide-id/2" from the URL. */
function readHash(): { index: number; step: number } {
  const [id, s] = decodeURIComponent(window.location.hash.slice(1)).split('/')
  const index = Math.max(0, slides.findIndex((sl) => sl.id === id))
  const step = Math.min(Math.max(0, Number(s) || 0), lastStep(index))
  return { index, step }
}

export function DeckProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(readHash, [])
  const [index, setIndex] = useState(initial.index)
  const [step, setStepState] = useState(initial.step)
  const [direction, setDirection] = useState<Direction>(1)
  const [arrivedFromAfter, setArrivedFromAfter] = useState(initial.step > 0)
  const [overview, setOverview] = useState(false)

  const goTo = useCallback(
    (target: number, targetStep = 0) => {
      const i = Math.min(Math.max(0, target), slides.length - 1)
      setDirection(i >= index ? 1 : -1)
      setArrivedFromAfter(i < index || targetStep > 0)
      setIndex(i)
      setStepState(Math.min(Math.max(0, targetStep), lastStep(i)))
      setOverview(false)
    },
    [index],
  )

  const next = useCallback(() => {
    if (step < lastStep(index)) {
      setDirection(1)
      setStepState(step + 1)
    } else if (index < slides.length - 1) {
      goTo(index + 1, 0)
    }
  }, [index, step, goTo])

  const prev = useCallback(() => {
    if (step > 0) {
      setDirection(-1)
      setStepState(step - 1)
    } else if (index > 0) {
      goTo(index - 1, lastStep(index - 1))
    }
  }, [index, step, goTo])

  const setStep = useCallback(
    (s: number) => {
      setDirection(s >= step ? 1 : -1)
      setStepState(Math.min(Math.max(0, s), lastStep(index)))
    },
    [index, step],
  )

  // Keep the URL in sync so any slide and build can be linked to directly.
  useEffect(() => {
    const hash = `#${slides[index].id}${step ? `/${step}` : ''}`
    if (window.location.hash !== hash) history.replaceState(null, '', hash)
  }, [index, step])

  useEffect(() => {
    const onHash = () => {
      const h = readHash()
      setIndex(h.index)
      setStepState(h.step)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <DeckContext.Provider
      value={{ index, step, direction, arrivedFromAfter, overview, next, prev, goTo, setStep, setOverview }}
    >
      {children}
    </DeckContext.Provider>
  )
}

export function useDeck() {
  const ctx = useContext(DeckContext)
  if (!ctx) throw new Error('useDeck must be used inside DeckProvider')
  return ctx
}
