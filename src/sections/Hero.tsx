import Reveal from '../components/Reveal'
import global from '../../data/global.json'

const PDF = `${import.meta.env.BASE_URL}Informe-IA-AEC-2026.pdf`

export default function Hero() {
  const { meta, anchors } = global
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-h">
      <Reveal>
        <p className="hero-eyebrow">{meta.edition} · Observatorio científico</p>
        <h1 id="hero-h">
          Estado y madurez de la <span className="grad">Inteligencia Artificial</span> en el sector AEC
        </h1>
        <p className="hero-lead">{meta.thesis}</p>
        <div className="hero-meta">
          <span className="chip">8 dimensiones</span>
          <span className="chip">15+ visualizaciones interactivas</span>
          <span className="chip">Metodología tarea-céntrica (Anthropic)</span>
          <span className="chip">+1.000 encuestados · LATAM</span>
        </div>
        <div className="hero-cta">
          <a className="btn btn-cta" href={PDF} target="_blank" rel="noopener" download><span aria-hidden="true">↓</span> Descargar informe (PDF)</a>
          <a className="btn" href="#resumen">Explorar el estudio</a>
        </div>
        <div className="hero-scroll"><span className="dot" aria-hidden="true" /> Desplázate para comenzar</div>
      </Reveal>

      <Reveal className="grid g4 keep anchors" delay={120}>
        {anchors.map((a, i) => (
          <div key={i} className={`anchor ${a.accent}`}>
            <div className="v tnum">{a.value}</div>
            <div className="l">{a.label}</div>
            <div className="s">{a.source}</div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
