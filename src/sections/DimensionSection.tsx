import Section from '../components/Section'
import StatCard from '../components/StatCard'
import Figure from '../components/Figure'
import Reveal from '../components/Reveal'
import { figureHeight, type Figure as Fig } from '../lib/chartOptions'
import sources from '../../data/sources.json'
import global from '../../data/global.json'

const SRC = Object.fromEntries((sources as any[]).map((s) => [s.id, s]))

export default function DimensionSection({ dim }: { dim: any }) {
  // Inyecta los datos de difusión global a la figura tipo 'diffusion'.
  const figs: Fig[] = (dim.figures as Fig[]).map((f) =>
    f.type === 'diffusion' ? { ...f, data: global.diffusion } : f,
  )
  const twoCol = figs.length > 1

  return (
    <Section id={`dim-${dim.id}`} num={dim.num} eyebrow={dim.title} title={dim.title} lead={dim.lead}>
      <Reveal>
        <p className="hyp"><b>Hipótesis</b> {dim.hypothesis}</p>
      </Reveal>

      <Reveal className="grid g3 keep" style={{ marginTop: 20 }}>
        {dim.stats.map((s: any, i: number) => <StatCard key={i} {...s} />)}
      </Reveal>

      <Reveal className={`grid ${twoCol ? 'g2' : ''} dim-figs`} style={{ marginTop: 18 }}>
        {figs.map((f) => <Figure key={f.id} fig={f} height={figureHeight(f)} />)}
      </Reveal>

      <Reveal>
        <ul className="insights">
          {dim.insights.map((t: string, i: number) => <li key={i}>{t}</li>)}
        </ul>
        <div className="sources-inline">
          {(dim.sources as string[]).map((id) => {
            const s = SRC[id]
            return s ? <span key={id} className="src-chip">{s.org} · {s.year}</span> : null
          })}
        </div>
      </Reveal>
    </Section>
  )
}
