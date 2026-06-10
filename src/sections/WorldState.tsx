import Section from '../components/Section'
import Figure from '../components/Figure'
import Reveal from '../components/Reveal'
import type { Figure as Fig } from '../lib/chartOptions'
import global from '../../data/global.json'

const ADOPTION_COLORS = [['blue', 'indigo'], ['purple', 'indigo'], ['teal', 'green'], ['orange', 'amber']]

export default function WorldState() {
  const w = global.world
  const adoption: Fig = {
    id: 'world-adoption', type: 'bars', status: 'verified',
    title: 'Adopción global de IA en las organizaciones',
    source: w.adoption.source,
    data: {
      vmax: 100, unit: '%',
      items: w.adoption.categories.map((label, i) => ({ label, value: w.adoption.values[i], from: ADOPTION_COLORS[i][0], to: ADOPTION_COLORS[i][1] })),
    },
  }
  const diffusion: Fig = {
    id: 'world-diffusion', type: 'diffusion', status: 'verified',
    title: 'Velocidad de adopción tecnológica (difusión acumulada)',
    source: global.diffusion.source,
    data: global.diffusion,
  }
  const investment: Fig = {
    id: 'world-investment', type: 'barsV', status: 'verified',
    title: 'Inversión privada global en IA',
    source: w.investment.source,
    data: {
      vmax: 150, unit: ' mil M',
      items: w.investment.categories.map((label, i) => ({ label, value: w.investment.values[i], from: 'blue', to: 'purple' })),
    },
  }

  return (
    <Section
      id="mundo" num="03" eyebrow="Contexto global"
      title="La IA ya no es el futuro: es el presente que el AEC aún no usa"
      lead="Mientras el 88 % de las organizaciones del mundo ya usa IA y la generativa entró diez veces más rápido que internet, la construcción avanza a paso lento. El benchmark global fija la vara contra la que medimos al sector."
    >
      <Reveal style={{ marginTop: 22 }}>
        <Figure fig={diffusion} height={320} />
      </Reveal>
      <Reveal className="grid g2" style={{ marginTop: 14 }}>
        <Figure fig={adoption} height={260} />
        <Figure fig={investment} height={260} />
      </Reveal>
      <Reveal>
        <ul className="insights">
          <li><b>88 %</b> de organizaciones usa IA (era 78 % en 2024); la GenAI pasó de 33 % a 72 % en un año.</li>
          <li><b>62 %</b> experimenta con agentes, pero solo <b>23 %</b> los escala a producción: el «piloto eterno».</li>
          <li>La IA se adopta <b>~10×</b> más rápido que la electricidad, el teléfono o internet.</li>
        </ul>
      </Reveal>
    </Section>
  )
}
