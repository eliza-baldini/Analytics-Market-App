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
import { Competitors } from './sections/Competitors'
import { DurableLoop } from './sections/DurableLoop'
import { Hero } from './sections/Hero'
import { Landscape } from './sections/Landscape'
import { LegacyBI } from './sections/LegacyBI'
import { Lifecycle } from './sections/Lifecycle'
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
          <Personas />
          <LegacyBI />

          <ChapterIntro chapter={vision} inverted />
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
