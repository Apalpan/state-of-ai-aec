import Section from '../components/Section'
import Reveal from '../components/Reveal'
import sources from '../../data/sources.json'

const PDF = `${import.meta.env.BASE_URL}Informe-IA-AEC-2026.pdf`

export default function References() {
  return (
    <Section
      id="referencias" num="06" eyebrow="Anexo"
      title="Referencias"
      lead="Todas las fuentes del benchmark global. Los datos numéricos viven en archivos JSON auditables dentro del repositorio."
    >
      <Reveal>
        <ol className="refs">
          {(sources as any[]).map((s) => (
            <li key={s.id}>
              <span><span className="ref-org">{s.org}</span>. <span className="ref-title">{s.title}</span></span>
              <span className="ref-meta">
                {s.type} · {s.year}{' '}
                {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer">↗</a>}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="foot">
        <div>
          <div className="org">GEN<span className="plus">+</span> · AECODE</div>
          <small>Observatorio State of AI in AEC · Edición 2026 · AI Construction Summit 2026, Lima.</small>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a className="btn btn-cta" href={PDF} target="_blank" rel="noopener" download>↓ Informe PDF</a>
          <a className="btn" href="mailto:apalpan@genplusdesign.com">apalpan@genplusdesign.com</a>
        </div>
      </Reveal>
    </Section>
  )
}
