import { ChapterIntro } from './components/layout/ChapterIntro'
import { Footer } from './components/layout/Footer'
import { SectionRail } from './components/layout/SectionRail'
import { TopBar } from './components/layout/TopBar'
import { SmoothScroll } from './components/motion/SmoothScroll'
import { NotesDrawer } from './components/notes/NotesDrawer'
import { NotesProvider } from './components/notes/NotesContext'
import { allSections, chapters } from './content/navigation'
import { useActiveSection } from './hooks/useActiveSection'
import { Blueprint } from './sections/Blueprint'
import { BuildOrBuy } from './sections/BuildOrBuy'
import { CapabilityMatrix } from './sections/CapabilityMatrix'
import { Democratized } from './sections/Democratized'
import { Competitors } from './sections/Competitors'
import { DurableLoop } from './sections/DurableLoop'
import { Foundation } from './sections/Foundation'
import { Hero } from './sections/Hero'
import { Landscape } from './sections/Landscape'
import { LegacyBI } from './sections/LegacyBI'
import { Lifecycle } from './sections/Lifecycle'
import { MarketMoment } from './sections/MarketMoment'
import { Personas } from './sections/Personas'

const sectionIds = allSections.map((s) => s.id)
const chapterIds = chapters.map((c) => c.id)
const [shift, vision, market, gap] = chapters

export default function App() {
  const active = useActiveSection(sectionIds)
  const chapterAtLine = useActiveSection(chapterIds)
  const beforeFirstChapter = active === 'top' && chapterAtLine === chapterIds[0]
  const activeChapter = beforeFirstChapter ? null : chapterAtLine

  return (
    <SmoothScroll>
      <NotesProvider>
        <TopBar activeChapter={activeChapter} />
        <SectionRail active={active} />
        <main>
          <Hero />
          <ChapterIntro chapter={shift} />
          <LegacyBI />
          {/* Slides 3–4 share one deep-blue canvas, as in the deck */}
          <div data-surface="dark" className="grain rounded-[48px] bg-[linear-gradient(180deg,#0418a8_0%,#0a2fd0_45%,#0418a8_100%)] text-white">
            <Democratized />
            <MarketMoment />
          </div>

          <ChapterIntro chapter={vision} inverted />
          <Foundation />
          <Personas />
          <Lifecycle />
          <DurableLoop />
          <Blueprint />

          <ChapterIntro chapter={market} />
          <Landscape />
          <Competitors active={active} />

          <ChapterIntro chapter={gap} />
          <CapabilityMatrix />
          <BuildOrBuy />
        </main>
        <Footer />
        <NotesDrawer />
      </NotesProvider>
    </SmoothScroll>
  )
}
