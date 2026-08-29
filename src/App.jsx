import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import AccordionSection from './components/sections/AccordionSection'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import ScrollProgress from './components/ui/ScrollProgress'
import CursorGlow from './components/ui/CursorGlow'
import { experience, education } from './content'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <AccordionSection id="work" title="Work Experience" items={experience} />
        <AccordionSection id="education" title="Education" items={education} />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
