import Section from '../components/Section'
import Reveal from '../components/Reveal'

const ACTS = [
  { t: 'Empresas', ac: 'blue', d: 'Elige UN proceso con dolor medible y haz un piloto de 30 días. Mide tiempo, costo y calidad. Escala por evidencia, no por entusiasmo.' },
  { t: 'Gobierno y autoridades', ac: 'orange', d: 'Mandato de datos (BIM) + formación subsidiada para pymes + compra pública como driver. Cierra la brecha antes de que se ensanche.' },
  { t: 'Academia', ac: 'purple', d: 'Mete IA aplicada en la malla de arquitectura e ingeniería. Aliarse con quien ya enseña en formato verificable.' },
  { t: 'Profesionales y estudiantes', ac: 'teal', d: 'Domina prompting + un caso real de tu rol. El título no basta: construye skills verificables y sube un nivel de madurez.' },
]

export default function Conclusions() {
  return (
    <Section
      id="conclusiones" num="05" eyebrow="Conclusiones"
      title="El futuro del AEC es humano + trabajador digital"
      lead="La IA no reemplaza al profesional: lo reemplaza quien sepa usarla. Cada actor del ecosistema tiene una jugada concreta para empezar ya."
    >
      <Reveal className="grid g2" style={{ marginTop: 22 }}>
        {ACTS.map((a) => (
          <div key={a.t} className="panel act" data-accent={a.ac}>
            <h3>{a.t}</h3>
            <p>{a.d}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="panel bigquote">
        <p>
          «El 92 % de los proyectos falla en lo predecible. La IA ya sabe predecirlo.{' '}
          <span className="hl">¿Vas a esperar a que alguien más lo haga por ti?»</span>
        </p>
      </Reveal>
    </Section>
  )
}
