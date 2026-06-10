import type { CSSProperties, ReactNode } from 'react'
import Figure from './components/Figure'
import StatCard from './components/StatCard'
import type { SlideDef } from './components/Deck'
import { type Figure as Fig } from './lib/chartOptions'
import global from '../data/global.json'
import dimensions from '../data/dimensions.json'
import sources from '../data/sources.json'
import survey from '../data/survey.json'

const PDF = `${import.meta.env.BASE_URL}Informe-IA-AEC-2026.pdf`
const SRC: Record<string, any> = Object.fromEntries((sources as any[]).map((s) => [s.id, s]))

/** Delay escalonado de entrada para cada bloque `.up`. */
const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

/* ----------------------------- encabezado de slide -------------------- */
function Head({ num, eyebrow, title, lead }: { num: string; eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <header className="s-head up" style={st(0)}>
      <p className="eyebrow"><span className="idx">{num}</span> {eyebrow}</p>
      <h2 className="s-title">{title}</h2>
      <div className="kicker-line" />
      {lead && <p className="lead">{lead}</p>}
    </header>
  )
}

/* ================================ PORTADA ============================== */
function Cover() {
  const { meta } = global
  return (
    <div className="cover">
      <p className="cover-eyebrow up" style={st(0)}>{meta.edition} · Observatorio científico</p>
      <h1 className="cover-title up" style={st(1)}>
        Estado y madurez de la <span className="grad">Inteligencia&nbsp;Artificial</span> en el sector AEC
      </h1>
      <p className="cover-lead up" style={st(2)}>{meta.thesis}</p>
      <div className="cover-meta up" style={st(3)}>
        <span className="chip">8 dimensiones</span>
        <span className="chip">15+ visualizaciones</span>
        <span className="chip">Metodología tarea-céntrica</span>
        <span className="chip">+1.000 encuestados · LATAM</span>
      </div>
      <div className="cover-foot up" style={st(4)}>
        <span className="cover-brand">GEN<span className="plus">+</span> · AECODE</span>
        <span className="cover-event">{meta.event}</span>
      </div>
    </div>
  )
}

/* ============================== LA PARADOJA =========================== */
function ParadoxSlide() {
  const { anchors } = global
  return (
    <>
      <Head num="00" eyebrow="Panorama"
        title="La paradoja del gigante dormido"
        lead="El sector más grande de la economía mundial es también el menos digitalizado: potencial probado del 84,8 % de exposición, pero un uso real que apenas roza el 25 % en oficina técnica y el 1 % en obra." />
      <div className="grid g4 keep anchors up" style={st(1)}>
        {anchors.map((a, i) => (
          <div key={i} className={`anchor ${a.accent}`}>
            <div className="v tnum">{a.value}</div>
            <div className="l">{a.label}</div>
            <div className="s">{a.source}</div>
          </div>
        ))}
      </div>
    </>
  )
}

/* =========================== RESUMEN · RADAR ========================== */
function RadarSlide() {
  const radarFig: Fig = {
    id: 'radar', type: 'radar', status: 'projection',
    title: 'Radar del estudio — las 8 dimensiones',
    source: 'Síntesis: madurez observada × tamaño de oportunidad × urgencia por dimensión.',
    note: global.radar.note,
    data: { indicators: global.radar.indicators, values: global.radar.values },
  }
  return (
    <>
      <Head num="01" eyebrow="Resumen ejecutivo"
        title="La paradoja, en una sola imagen"
        lead="La IA tiene un potencial probado del 84,8 % de exposición en arquitectura e ingeniería, pero su uso real apenas roza el 25 % en la oficina técnica y el 1 % en la obra." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={radarFig} height={380} />
        <div className="stack">
          <div className="panel pad">
            <h3 className="h3">Qué encontrará en el estudio</h3>
            <ul className="insights compact">
              <li><b>Dimensiones 1–8</b>: madurez, productividad, mercado, talento, datos, brecha, oportunidades y regulación.</li>
              <li><b>Brecha potencial vs. uso real</b>, con la metodología tarea-céntrica de Anthropic.</li>
              <li><b>Encuesta a +1.000</b> profesionales AEC de LATAM: la voz que nadie más tiene.</li>
              <li><b>Ruta de acción</b> para empresas, gobierno, academia y profesionales.</li>
            </ul>
          </div>
          <div className="panel pad legend-read">
            <span><span className="badge verified">● Verificado</span> dato con fuente externa citada.</span>
            <span><span className="badge projection">○ Proyección</span> hipótesis del estudio, se calibra con la encuesta.</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ============================ METODOLOGÍA ============================= */
const STEPS = [
  { n: '1', t: 'Capa 1 — Benchmark global', d: 'Revisión sistemática de 8 dimensiones con fuentes 2024–2026: McKinsey, Anthropic, Stanford HAI, Mordor, Microsoft, Gartner.' },
  { n: '2', t: 'Capa 2 — Encuesta +1.000', d: 'Muestra LATAM por cuotas (CEOs, ingenieros, arquitectos, tech, inmobiliaria, estudiantes, gobierno). Margen ±3 % (95 % conf.).' },
  { n: '3', t: 'Contraste y síntesis', d: '«El mundo dice X · el AEC de LATAM dice Y · la brecha es Z». Índices: Madurez IA-AEC (0–100) y Brecha Potencial–Uso.' },
]
function MethodSlide() {
  const m = survey.method
  return (
    <>
      <Head num="02" eyebrow="Cómo se midió"
        title={<>No preguntamos «¿usas IA?» — medimos <span className="green-ink">tareas</span></>}
        lead="Replicando el Anthropic Economic Index, primero identificamos las tareas del flujo AEC y luego qué herramientas las cubren: así separamos el potencial de automatización del uso real, evitando el sesgo de deseabilidad social." />
      <div className="slide-two up" style={st(1)}>
        <div className="meth-flow">
          {STEPS.map((s) => (
            <div key={s.n} className="panel meth-step">
              <div className="t"><span className="n">{s.n}</span> {s.t}</div>
              <p className="muted-s">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="stack">
          <div className="panel pad">
            <h3 className="h3">Ficha técnica</h3>
            <table className="meth-table">
              <tbody>
                <tr><td>Población</td><td>{m.population}</td></tr>
                <tr><td>Muestreo</td><td>{m.sampling}</td></tr>
                <tr><td>Tamaño meta</td><td>{m.target}</td></tr>
                <tr><td>Instrumento</td><td>{m.instrument}</td></tr>
                <tr><td>Método</td><td>{m.approach}</td></tr>
                <tr><td>Privacidad</td><td>{m.privacy}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="panel note-box">
            <span className="mk" aria-hidden="true" />
            <div>
              <h3 className="h3">Una limitación que declaramos</h3>
              <p className="muted-s">Muestra auto-seleccionada (sesga hacia quien ya se interesa por IA): se reporta como <b>termómetro del sector activo</b>, no como censo. Declararlo suma credibilidad.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ========================= LA IA EN EL MUNDO ========================= */
function WorldDiffusionSlide() {
  const diffusion: Fig = {
    id: 'world-diffusion', type: 'diffusion', status: 'verified',
    title: 'Velocidad de adopción tecnológica (difusión acumulada)',
    source: global.diffusion.source, data: global.diffusion,
  }
  return (
    <>
      <Head num="03" eyebrow="La IA en el mundo"
        title="La IA ya no es el futuro: es el presente que el AEC aún no usa"
        lead="La IA generativa entró ~10× más rápido que la electricidad, el teléfono o internet. El benchmark global fija la vara contra la que medimos al sector." />
      <div className="up" style={st(1)}><Figure fig={diffusion} height={380} /></div>
      <ul className="insights row3 up" style={st(2)}>
        <li><b>88 %</b> de organizaciones usa IA; la GenAI pasó de 33 % a 72 % en un año.</li>
        <li><b>62 %</b> experimenta con agentes, pero solo <b>23 %</b> los escala: el «piloto eterno».</li>
        <li>Adopción <b>~10×</b> más rápida que la electricidad, el teléfono o internet.</li>
      </ul>
    </>
  )
}

const ADOPTION_COLORS = [['green', 'teal'], ['teal', 'green'], ['blue', 'indigo'], ['indigo', 'purple']]
function WorldAdoptionSlide() {
  const w = global.world
  const adoption: Fig = {
    id: 'world-adoption', type: 'bars', status: 'verified',
    title: 'Adopción global de IA en las organizaciones', source: w.adoption.source,
    data: { vmax: 100, unit: '%', items: w.adoption.categories.map((label, i) => ({ label, value: w.adoption.values[i], from: ADOPTION_COLORS[i][0], to: ADOPTION_COLORS[i][1] })) },
  }
  const investment: Fig = {
    id: 'world-investment', type: 'barsV', status: 'verified',
    title: 'Inversión privada global en IA', source: w.investment.source,
    data: { vmax: 150, unit: ' mil M', items: w.investment.categories.map((label, i) => ({ label, value: w.investment.values[i], from: 'blue', to: 'indigo' })) },
  }
  return (
    <>
      <Head num="03" eyebrow="La IA en el mundo · el dinero y la base instalada"
        title="El dinero ya se mueve; la pregunta es quién lo captura"
        lead="Mientras el 88 % de las organizaciones del mundo ya usa IA y la inversión privada supera los USD 130.000 M anuales, la construcción avanza a paso lento." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={adoption} height={280} />
        <Figure fig={investment} height={280} />
      </div>
    </>
  )
}

/* ============================ DIMENSIONES ============================ */
function DimensionSlide({ dim }: { dim: any }) {
  const figs: Fig[] = (dim.figures as Fig[]).map((f) => (f.type === 'diffusion' ? { ...f, data: global.diffusion } : f))
  const multi = figs.length > 1
  return (
    <>
      <Head num={dim.num} eyebrow="Dimensión" title={dim.title} lead={dim.lead} />
      <div className="slide-two dim up" style={st(1)}>
        <div className="dim-left stack">
          <p className="hyp"><b>Hipótesis</b> {dim.hypothesis}</p>
          <div className="grid g3 keep">{dim.stats.map((s: any, i: number) => <StatCard key={i} {...s} />)}</div>
          <ul className="insights compact">{dim.insights.map((t: string, i: number) => <li key={i}>{t}</li>)}</ul>
          <div className="sources-inline">
            {(dim.sources as string[]).map((id) => { const s = SRC[id]; return s ? <span key={id} className="src-chip">{s.org} · {s.year}</span> : null })}
          </div>
        </div>
        <div className="dim-right stack">
          {figs.map((f) => <Figure key={f.id} fig={f} height={multi ? 222 : 320} />)}
        </div>
      </div>
    </>
  )
}

/* =========================== LA VOZ DEL SECTOR ======================= */
function SurveySlide() {
  const barriers: Fig = {
    id: 'survey-barriers', type: 'bars', status: 'projection',
    title: survey.barriers.title, source: 'Proyección · se calibra con la encuesta (pregunta C5).',
    note: 'La barrera #1 abre el llamado a la acción.',
    data: { vmax: 30, unit: '%', items: survey.barriers.items },
  }
  return (
    <>
      <Head num="04" eyebrow="La voz del sector · data primaria"
        title="+1.000 profesionales AEC de Latinoamérica"
        lead="25 preguntas en 6 bloques (~8 min), diseñadas para separar potencial de uso real. Dos preguntas abiertas son el oro del estudio: la tarea de mayor ROI y el mensaje a un decisor." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={barriers} height={300} />
        <div className="stack">
          <div className="panel pad">
            <h3 className="h3">Bloques del instrumento</h3>
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
      </div>
      <div className="panel pad cloud-panel up" style={st(2)}>
        <h3 className="h3">Tareas con mayor ROI percibido <span className="badge projection">○ Proyección</span></h3>
        <div className="cloud">
          {survey.tasksCloud.map((t) => (
            <span key={t.text} className="word" style={{ fontSize: `${0.8 + t.weight / 42}rem`, color: t.weight > 28 ? 'var(--ink)' : undefined }}>{t.text}</span>
          ))}
        </div>
      </div>
    </>
  )
}

/* ============================ CONCLUSIONES =========================== */
const ACTS = [
  { t: 'Empresas', ac: 'green', d: 'Elige UN proceso con dolor medible y haz un piloto de 30 días. Mide tiempo, costo y calidad. Escala por evidencia, no por entusiasmo.' },
  { t: 'Gobierno y autoridades', ac: 'blue', d: 'Mandato de datos (BIM) + formación subsidiada para pymes + compra pública como driver. Cierra la brecha antes de que se ensanche.' },
  { t: 'Academia', ac: 'indigo', d: 'Mete IA aplicada en la malla de arquitectura e ingeniería. Aliarse con quien ya enseña en formato verificable.' },
  { t: 'Profesionales y estudiantes', ac: 'teal', d: 'Domina prompting + un caso real de tu rol. El título no basta: construye skills verificables y sube un nivel de madurez.' },
]
function ConclusionsSlide() {
  return (
    <>
      <Head num="05" eyebrow="Conclusiones"
        title="El futuro del AEC es humano + trabajador digital"
        lead="La IA no reemplaza al profesional: lo reemplaza quien sepa usarla. Cada actor del ecosistema tiene una jugada concreta para empezar ya." />
      <div className="grid g2 acts up" style={st(1)}>
        {ACTS.map((a) => (
          <div key={a.t} className="panel act" data-accent={a.ac}>
            <h3>{a.t}</h3>
            <p>{a.d}</p>
          </div>
        ))}
      </div>
    </>
  )
}

/* =============================== CIERRE ============================== */
function ClosingSlide() {
  return (
    <div className="closing">
      <p className="closing-eyebrow up" style={st(0)}>AI Construction Summit 2026 · Lima</p>
      <p className="bigquote-text up" style={st(1)}>
        «El 92 % de los proyectos falla en lo predecible. La IA ya sabe predecirlo.{' '}
        <span className="hl">¿Vas a esperar a que alguien más lo haga por ti?»</span>
      </p>
      <div className="closing-cta up" style={st(2)}>
        <a className="btn btn-cta" href={PDF} target="_blank" rel="noopener" download><span aria-hidden="true">↓</span> Descargar informe (PDF)</a>
        <a className="btn" href="mailto:apalpan@genplusdesign.com">apalpan@genplusdesign.com</a>
      </div>
      <div className="closing-brand up" style={st(3)}>GEN<span className="plus">+</span> · AECODE</div>
    </div>
  )
}

/* ============================ REFERENCIAS =========================== */
function ReferencesSlide() {
  return (
    <>
      <Head num="06" eyebrow="Anexo"
        title="Referencias"
        lead="Todas las fuentes del benchmark global. Los datos numéricos viven en archivos JSON auditables dentro del repositorio." />
      <div className="refs-wrap up" style={st(1)}>
        <ol className="refs">
          {(sources as any[]).map((s) => (
            <li key={s.id}>
              <span><span className="ref-org">{s.org}</span>. <span className="ref-title">{s.title}</span></span>
              <span className="ref-meta">{s.type} · {s.year} {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer">↗</a>}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

/* ============================ ORDEN DEL DECK ========================= */
const dimSlides: SlideDef[] = (dimensions as any[]).map((dim) => ({
  id: `dim-${dim.id}`, num: dim.num, title: `${dim.num} · ${dim.title}`, node: <DimensionSlide dim={dim} />,
}))

export const slides: SlideDef[] = [
  { id: 'cover', num: '', title: 'Portada', node: <Cover /> },
  { id: 'paradoja', num: '00', title: 'La paradoja del gigante dormido', node: <ParadoxSlide /> },
  { id: 'resumen', num: '01', title: 'Resumen ejecutivo', node: <RadarSlide /> },
  { id: 'metodologia', num: '02', title: 'Metodología', node: <MethodSlide /> },
  { id: 'mundo-1', num: '03', title: 'La IA en el mundo · difusión', node: <WorldDiffusionSlide /> },
  { id: 'mundo-2', num: '03', title: 'La IA en el mundo · adopción e inversión', node: <WorldAdoptionSlide /> },
  ...dimSlides,
  { id: 'encuesta', num: '04', title: 'La voz del sector', node: <SurveySlide /> },
  { id: 'conclusiones', num: '05', title: 'Conclusiones', node: <ConclusionsSlide /> },
  { id: 'cierre', num: '', title: 'Cierre', node: <ClosingSlide /> },
  { id: 'referencias', num: '06', title: 'Referencias', node: <ReferencesSlide /> },
]
