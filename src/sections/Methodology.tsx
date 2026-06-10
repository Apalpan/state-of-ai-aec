import Section from '../components/Section'
import Reveal from '../components/Reveal'
import survey from '../../data/survey.json'

const STEPS = [
  { n: '1', t: 'Capa 1 — Benchmark global', d: 'Revisión sistemática de 8 dimensiones con fuentes 2024–2026: McKinsey, Anthropic, Stanford HAI, Mordor, Microsoft, Gartner.' },
  { n: '2', t: 'Capa 2 — Encuesta +1.000', d: 'Muestra LATAM por cuotas (CEOs, ingenieros, arquitectos, tech, inmobiliaria, estudiantes, gobierno). Margen ±3 % (95 % de confianza).' },
  { n: '3', t: 'Contraste y síntesis', d: '«El mundo dice X · el sector AEC de LATAM dice Y · la brecha es Z». Índices: Madurez IA-AEC (0–100) y Brecha Potencial–Uso.' },
]

export default function Methodology() {
  const m = survey.method
  return (
    <Section
      id="metodologia" num="02" eyebrow="Cómo se midió"
      title={<>No preguntamos «¿usas IA?» — medimos <span style={{ color: 'var(--blue)' }}>tareas</span></>}
      lead="Replicando el Anthropic Economic Index, primero identificamos las tareas del flujo AEC y luego qué herramientas las cubren. Así separamos el potencial de automatización (qué tan informacional es la tarea) del uso real (si hoy se hace con IA), evitando el sesgo de deseabilidad social."
    >
      <Reveal className="meth-flow grid g3 keep">
        {STEPS.map((s) => (
          <div key={s.n} className="panel meth-step">
            <div className="t"><span className="n">{s.n}</span> {s.t}</div>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--step--1)', marginTop: 10, lineHeight: 1.5 }}>{s.d}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="grid g2" style={{ marginTop: 16 }}>
        <div className="panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 'var(--step-1)' }}>Ficha técnica</h3>
          <table className="meth-table">
            <tbody>
              <tr><td>Población</td><td>{m.population}</td></tr>
              <tr><td>Muestreo</td><td>{m.sampling}</td></tr>
              <tr><td>Tamaño meta</td><td>{m.target}</td></tr>
              <tr><td>Instrumento</td><td>{m.instrument}</td></tr>
              <tr><td>Método</td><td>{m.approach}</td></tr>
              <tr><td>Campo</td><td>{m.field}</td></tr>
              <tr><td>Privacidad</td><td>{m.privacy}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="panel note-box" style={{ alignSelf: 'start' }}>
          <span className="mk" aria-hidden="true" />
          <div>
            <h3 style={{ fontSize: 'var(--step-1)' }}>Una limitación que declaramos</h3>
            <p style={{ color: 'var(--ink-soft)', marginTop: 8, fontSize: 'var(--step--1)' }}>
              La muestra es auto-seleccionada (sesga hacia quien ya se interesa por IA). Se reporta como
              <b> termómetro del sector activo</b>, no como censo. Declararlo aumenta la credibilidad, no la reduce.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
