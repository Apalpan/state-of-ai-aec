import Section from '../components/Section'
import Figure from '../components/Figure'
import Reveal from '../components/Reveal'
import type { Figure as Fig } from '../lib/chartOptions'
import global from '../../data/global.json'

export default function Executive() {
  const radarFig: Fig = {
    id: 'radar', type: 'radar', status: 'projection',
    title: 'Radar del estudio — las 8 dimensiones',
    source: 'Síntesis: madurez observada × tamaño de oportunidad × urgencia por dimensión.',
    note: global.radar.note,
    data: { indicators: global.radar.indicators, values: global.radar.values },
  }
  return (
    <Section
      id="resumen" num="01" eyebrow="Panorama"
      title="La paradoja del gigante dormido"
      lead="El sector más grande de la economía mundial es también el menos digitalizado. La IA tiene un potencial probado del 84,8 % de exposición en arquitectura e ingeniería, pero su uso real apenas roza el 25 % en oficina técnica y el 1 % en obra."
    >
      <Reveal style={{ marginTop: 22 }}>
        <Figure fig={radarFig} height={360} />
      </Reveal>

      <Reveal className="grid g2" style={{ marginTop: 16 }}>
        <div className="panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 'var(--step-1)' }}>Qué encontrará en este informe</h3>
          <ul className="insights" style={{ marginTop: 12 }}>
            <li><b>Dimensiones 1–8</b>: madurez, productividad, mercado, talento, datos, brecha, oportunidades y regulación.</li>
            <li><b>Brecha potencial vs. uso real</b>, medida con la metodología tarea-céntrica de Anthropic.</li>
            <li><b>Encuesta a +1.000</b> profesionales AEC de LATAM: la voz del sector que nadie más tiene.</li>
            <li><b>Ruta de acción</b> diferenciada para empresas, gobierno, academia y profesionales.</li>
          </ul>
        </div>
        <div className="panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 'var(--step-1)' }}>Lectura de los datos</h3>
          <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
            <p style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span className="badge verified">● Verificado</span> Dato con fuente externa citada.</p>
            <p style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span className="badge projection">○ Proyección</span> Hipótesis del estudio · se calibra con la encuesta.</p>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--step--1)', marginTop: 4 }}>
              La transparencia metodológica es lo que vuelve el informe defendible ante autoridades.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
