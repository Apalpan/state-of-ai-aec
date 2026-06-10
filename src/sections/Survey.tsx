import Section from '../components/Section'
import Figure from '../components/Figure'
import Reveal from '../components/Reveal'
import type { Figure as Fig } from '../lib/chartOptions'
import survey from '../../data/survey.json'

export default function Survey() {
  const barriers: Fig = {
    id: 'survey-barriers', type: 'bars', status: 'projection',
    title: survey.barriers.title,
    source: 'Proyección · se calibra con la encuesta (pregunta C5).',
    note: 'La barrera #1 abre el llamado a la acción.',
    data: { vmax: 30, unit: '%', items: survey.barriers.items },
  }
  return (
    <Section
      id="encuesta" num="04" eyebrow="Data primaria"
      title="La voz del sector: +1.000 profesionales"
      lead="25 preguntas en 6 bloques (~8 min), diseñadas para separar potencial de uso real. Dos preguntas abiertas son el oro del estudio: la tarea de mayor ROI y el mensaje a un decisor."
    >
      <Reveal className="grid g2" style={{ marginTop: 22 }}>
        <Figure fig={barriers} height={300} />
        <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
          <div className="panel" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 'var(--step-0)' }}>Bloques del instrumento</h3>
            <div className="blocks">
              {survey.blocks.map((b) => <span key={b.code} className="chip">{b.code} · {b.name} ({b.count})</span>)}
            </div>
          </div>
          {survey.goldQuestions.map((g) => (
            <div key={g.code} className="panel gold">
              <p className="q">★ {g.code}: «{g.text}»</p>
              <p className="o">→ {g.output}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="panel" style={{ padding: 18, marginTop: 14 }}>
        <h3 style={{ fontSize: 'var(--step-0)' }}>Tareas con mayor ROI percibido <span className="badge projection">○ Proyección</span></h3>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--step--1)', marginTop: 4 }}>Vista previa de la nube de la pregunta C4. Se reemplaza con respuestas reales al cierre de campo.</p>
        <div className="cloud">
          {survey.tasksCloud.map((t) => (
            <span key={t.text} className="word" style={{ fontSize: `${0.8 + t.weight / 42}rem`, color: t.weight > 28 ? 'var(--ink)' : undefined }}>{t.text}</span>
          ))}
        </div>
      </Reveal>

      <Reveal className="hyp" style={{ marginTop: 16 }}>
        <b>Nota</b> {survey.note}
      </Reveal>
    </Section>
  )
}
