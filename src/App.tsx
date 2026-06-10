import { useScrollSpy } from './lib/hooks'
import { NAV_IDS } from './lib/nav'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Hero from './sections/Hero'
import Executive from './sections/Executive'
import Methodology from './sections/Methodology'
import WorldState from './sections/WorldState'
import DimensionSection from './sections/DimensionSection'
import Survey from './sections/Survey'
import Conclusions from './sections/Conclusions'
import References from './sections/References'
import dimensions from '../data/dimensions.json'

export default function App() {
  const { active, progress } = useScrollSpy(NAV_IDS)

  return (
    <div className="app">
      <a href="#resumen" className="skip-link">Saltar al contenido</a>
      <TopBar progress={progress} />
      <div className="shell">
        <Sidebar active={active} progress={progress} />
        <main className="main" id="main">
          <div className="wrap-wide">
            <Hero />
            <Executive />
            <Methodology />
            <WorldState />
            {(dimensions as any[]).map((d) => <DimensionSection key={d.id} dim={d} />)}
            <Survey />
            <Conclusions />
            <References />
          </div>
        </main>
      </div>
    </div>
  )
}
