import type { CSSProperties, ReactNode } from 'react'
import Figure from './components/Figure'
import StatCard from './components/StatCard'
import AnimatedValue from './components/CountUp'
import { Timeline, GenAIProcess, ConceptLadder, ToolBoard, PricingTiers } from './components/Visuals'
import type { SlideDef } from './components/Deck'
import type { Figure as Fig } from './lib/chartOptions'
import global from '../data/global.json'
import sources from '../data/sources.json'
import survey from '../data/survey.json'
import worldRaw from '../data/world.json'

const W: any = worldRaw
const PDF = `${import.meta.env.BASE_URL}Informe-IA-AEC-2026.pdf`
const SRC: Record<string, any> = Object.fromEntries((sources as any[]).map((s) => [s.id, s]))
const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

/* ----------------------------- helpers de slide ----------------------- */
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
function Insights({ items }: { items: string[] }) {
  return <ul className="insights compact">{items.map((t, i) => <li key={i} dangerouslySetInnerHTML={{ __html: t }} />)}</ul>
}
function SourceNote({ fig }: { fig: any }) {
  return <p className="src-note up" style={st(3)}><b>Fuente:</b> {fig.source}{fig.note ? <> · {fig.note}</> : null}</p>
}

/* ================================ PORTADA ============================== */
function Cover() {
  const { meta } = global
  return (
    <div className="cover">
      <p className="cover-eyebrow up" style={st(0)}>{meta.edition} · Observatorio del estado de la IA</p>
      <h1 className="cover-title up" style={st(1)}>
        El estado de la <span className="grad">Inteligencia&nbsp;Artificial</span><br />y su brecha en el sector AEC
      </h1>
      <p className="cover-lead up" style={st(2)}>
        Del mundo a la obra: qué tan lejos llegó la IA, qué tan rápido avanza y por qué la construcción —el sector más grande de la economía— es el que menos la usa.
      </p>
    </div>
  )
}

/* ============================== LA PARADOJA =========================== */
const PARADOX = [
  { v: '88%', l: 'del mundo ya usa IA en alguna función', s: 'McKinsey · State of AI 2025', a: 'green' },
  { v: '<12%', l: 'de la construcción la usa de forma regular', s: 'RICS · AI in Construction 2025', a: 'red' },
  { v: '84,8%', l: 'de exposición a la IA en arquitectura e ingeniería', s: 'Anthropic Economic Index', a: 'blue' },
]
function ParadoxSlide() {
  return (
    <>
      <Head num="00" eyebrow="El punto de partida"
        title="La paradoja del gigante dormido"
        lead="El sector más grande de la economía mundial es también el menos digitalizado. La IA ya es mainstream corporativo; en la obra, sigue atrapada entre la curiosidad y el piloto." />
      <div className="grid g3 keep anchors up" style={st(1)}>
        {PARADOX.map((a, i) => (
          <div key={i} className={`anchor ${a.a}`}>
            <div className="v tnum"><AnimatedValue text={a.v} /></div>
            <div className="l">{a.l}</div>
            <div className="s">{a.s}</div>
          </div>
        ))}
      </div>
    </>
  )
}

/* =============================== TESIS =============================== */
function ThesisSlide() {
  const t = W.thesis
  return (
    <div className="thesis">
      <p className="thesis-kicker up" style={st(0)}>{t.kicker}</p>
      <p className="thesis-lead up" style={st(1)}>{t.lead}</p>
      <p className="thesis-hl up" style={st(2)}>{t.highlight}</p>
      <p className="thesis-foot up" style={st(3)}>{t.foot}</p>
    </div>
  )
}

/* ============================== HISTORIA ============================= */
function HistorySlide() {
  return (
    <>
      <Head num="01" eyebrow="Contexto" title={W.history.title}
        lead="Para entender hacia dónde va la IA conviene ver de dónde viene: 70 años de avances que se aceleraron con el Transformer (2017) y explotaron con ChatGPT (2022)." />
      <Timeline events={W.history.events} />
      <SourceNote fig={W.history} />
    </>
  )
}

/* ======================= IA GENERATIVA + TOKENS ===================== */
function GenAISlide() {
  const g = W.genai
  return (
    <>
      <Head num="02" eyebrow="Fundamentos" title={g.title}
        lead="Un modelo de lenguaje no «sabe»: predice el siguiente token. Entender esto es lo que separa usar la IA con criterio de usarla a ciegas." />
      <GenAIProcess steps={g.steps} tokens={g.tokenExample} note={g.tokenNote} />
      <SourceNote fig={g} />
    </>
  )
}

/* ============================== CONCEPTOS ============================ */
function ConceptsSlide() {
  return (
    <>
      <Head num="03" eyebrow="Lenguaje mínimo" title={W.concepts.title}
        lead="No es lo mismo un chatbot que un agente o un workflow. Distinguirlos evita expectativas falsas y riesgos de soltar autonomía donde no toca." />
      <ConceptLadder items={W.concepts.items} />
      <SourceNote fig={W.concepts} />
    </>
  )
}

/* ======================= CRECIMIENTO EXPONENCIAL ==================== */
function ComputeSlide() {
  return (
    <>
      <Head num="04" eyebrow="Por qué se aceleró todo" title="Crecimiento exponencial: el motor es el cómputo"
        lead="El cómputo usado para entrenar los modelos frontera se duplica cada ~6 meses. No es una mejora lineal: es una curva que rompe la intuición." />
      <div className="up" style={st(1)}><Figure fig={W.compute as Fig} height={360} /></div>
    </>
  )
}

/* ============================ SINGULARIDAD ========================== */
function SingularitySlide() {
  const s = W.singularity
  return (
    <>
      <Head num="05" eyebrow="El debate" title={s.title}
        lead={s.note} />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={s as Fig} height={320} />
        <div className="stack">
          {s.milestones.map((m: any, i: number) => (
            <div className="ms-row" key={i} style={st(i + 1)}>
              <span className="ms-i">{i + 1}</span>
              <div><b>{m.t}</b><span className="ms-d">{m.d}</span></div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* =========================== ESTADO IA 2025 ======================== */
function StateSlide() {
  const s = W.stateStats
  return (
    <>
      <Head num="06" eyebrow="El mundo hoy" title={s.title}
        lead="La IA dejó de ser experimento: es infraestructura de trabajo. Pero entre usarla y escalarla con impacto real todavía hay un abismo." />
      <div className="grid g3 keep stat-grid up" style={st(1)}>
        {s.items.map((it: any, i: number) => <StatCard key={i} {...it} />)}
      </div>
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {s.source}</p>
    </>
  )
}

/* ============================ BENCHMARKS =========================== */
function BenchmarksSlide() {
  return (
    <>
      <Head num="07" eyebrow="Capacidad" title={W.benchmarks.title}
        lead="En benchmarks que en 2023 eran casi imposibles, los modelos pasaron a resolver la mayoría en un solo año. SWE-bench (código real) saltó de 4,4 % a 71,7 %." />
      <div className="up" style={st(1)}><Figure fig={W.benchmarks as Fig} height={360} /></div>
    </>
  )
}

/* ============================== MODELOS ============================ */
function ModelsSlide() {
  return (
    <>
      <Head num="08" eyebrow="La frontera" title={W.models.title}
        lead="No hay un único «mejor modelo»: GPT, Claude y Gemini lideran ejes distintos. La elección correcta depende de la tarea, no de la marca." />
      <div className="up" style={st(1)}><Figure fig={W.models as Fig} height={400} /></div>
    </>
  )
}

/* ====================== IA GENERATIVA POBLACIÓN ==================== */
function PopulationSlide() {
  return (
    <>
      <Head num="09" eyebrow="Uso masivo" title={W.popUsage.title}
        lead="ChatGPT abrió el mercado y aún lidera con ~800–900 M de usuarios semanales, pero Gemini y Claude crecen rápido. La adopción poblacional batió todos los récords históricos." />
      <div className="up" style={st(1)}><Figure fig={W.popUsage as Fig} height={300} /></div>
    </>
  )
}

/* ============================ TIPOS DE PAGO ======================== */
function PricingSlide() {
  return (
    <>
      <Head num="10" eyebrow="Monetización" title={W.pricing.title}
        lead={W.pricing.note} />
      <PricingTiers tiers={W.pricing.tiers} />
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {W.pricing.source}</p>
    </>
  )
}

/* ============================== TABLERO =========================== */
function ToolboardSlide() {
  return (
    <>
      <Head num="11" eyebrow="Herramientas" title={W.toolboard.title}
        lead={W.toolboard.note} />
      <ToolBoard cats={W.toolboard.cats} />
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {W.toolboard.source}</p>
    </>
  )
}

/* ============================ MERCADO IA ========================== */
function MarketSlide() {
  return (
    <>
      <Head num="12" eyebrow="Economía" title={W.market.title}
        lead="Las estimaciones varían según la definición de mercado, pero todas apuntan en la misma dirección: la IA se multiplica ~10× en una década." />
      <div className="up" style={st(1)}><Figure fig={W.market as Fig} height={340} /></div>
    </>
  )
}

/* ============================ DIFUSIÓN ============================ */
function DiffusionSlide() {
  const diffusion: Fig = {
    id: 'world-diffusion', type: 'diffusion', status: 'verified',
    title: 'Velocidad de adopción tecnológica (difusión acumulada)',
    source: global.diffusion.source, data: global.diffusion,
  }
  return (
    <>
      <Head num="13" eyebrow="Velocidad" title="La IA se adopta ~10× más rápido que internet"
        lead="La IA generativa entró más rápido que la electricidad, el teléfono o internet. Esa velocidad es justo lo que el sector AEC todavía no asimila." />
      <div className="up" style={st(1)}><Figure fig={diffusion} height={360} /></div>
    </>
  )
}

/* ============================ BIG TECH CAPEX ====================== */
function CapexSlide() {
  return (
    <>
      <Head num="14" eyebrow="La carrera" title={W.capex.title}
        lead="Los hiperescaladores libran la mayor batalla de capital de la historia tecnológica: más de US$300 B en 2025, casi todo en data centers y GPU para IA." />
      <div className="up" style={st(1)}><Figure fig={W.capex as Fig} height={300} /></div>
    </>
  )
}

/* ========================= LEVANTAMIENTO CAPITAL ================== */
function FundingSlide() {
  return (
    <>
      <Head num="15" eyebrow="Capital privado" title={W.funding.title}
        lead="Tres laboratorios frontera concentran cerca de un billón de dólares de valor privado. La IA se volvió un juego de escala donde solo unos pocos pueden competir." />
      <div className="up" style={st(1)}><Figure fig={W.funding as Fig} height={300} /></div>
    </>
  )
}

/* ============================== NVIDIA ============================ */
function NvidiaSlide() {
  const n = W.nvidia
  return (
    <>
      <Head num="16" eyebrow="El cuello de botella" title={n.title}
        lead={n.note} />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={n.donut as Fig} height={300} />
        <div className="grid stat-col">{n.stats.map((s: any, i: number) => <StatCard key={i} {...s} />)}</div>
      </div>
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {n.source}</p>
    </>
  )
}

/* ============================== REGIONES ========================== */
function RegionsSlide() {
  return (
    <>
      <Head num="17" eyebrow="Geografía del capital" title={W.regions.title}
        lead="EE. UU. y China concentran la inversión. Latinoamérica capta una fracción mínima del flujo global: el riesgo no es solo llegar tarde, es llegar como consumidor y no como creador." />
      <div className="up" style={st(1)}><Figure fig={W.regions as Fig} height={340} /></div>
    </>
  )
}

/* ============================ ANTHROPIC =========================== */
function AnthropicSlide() {
  const a = W.anthropic
  return (
    <>
      <Head num="18" eyebrow="Adopción real (Anthropic)" title={a.title}
        lead={a.key} />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={a.chart as Fig} height={300} />
        <div className="grid stat-col">{a.stats.map((s: any, i: number) => <StatCard key={i} {...s} />)}</div>
      </div>
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {a.source}</p>
    </>
  )
}

/* ===================== METODOLOGÍA / TAREAS ======================= */
const STEPS = [
  { n: '1', t: 'Capa 1 — Benchmark global', d: 'Revisión de fuentes 2024–2026: McKinsey, Anthropic, Stanford HAI, WEF, Autodesk, RICS.' },
  { n: '2', t: 'Capa 2 — Encuesta +1.000', d: 'Muestra LATAM por cuotas. Se pregunta por TAREAS antes que por herramientas (método Anthropic).' },
  { n: '3', t: 'Contraste y síntesis', d: '«El mundo dice X · el AEC de LATAM dice Y · la brecha es Z». Índices de madurez y brecha potencial–uso.' },
]
function MethodSlide() {
  const m = survey.method
  return (
    <>
      <Head num="19" eyebrow="Cómo lo medimos" title={<>La IA no automatiza empleos: automatiza <span className="green-ink">tareas</span></>}
        lead="Replicando el Anthropic Economic Index, medimos tareas antes que herramientas. Así separamos el potencial de automatización del uso real y evitamos el sesgo de deseabilidad social." />
      <div className="slide-two up" style={st(1)}>
        <div className="meth-flow">
          {STEPS.map((s) => (
            <div key={s.n} className="panel meth-step">
              <div className="t"><span className="n">{s.n}</span> {s.t}</div>
              <p className="muted-s">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="panel pad">
          <h3 className="h3">Ficha técnica de la encuesta</h3>
          <table className="meth-table">
            <tbody>
              <tr><td>Población</td><td>{m.population}</td></tr>
              <tr><td>Muestreo</td><td>{m.sampling}</td></tr>
              <tr><td>Tamaño meta</td><td>{m.target}</td></tr>
              <tr><td>Método</td><td>{m.approach}</td></tr>
              <tr><td>Campo</td><td>{m.field}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

/* ============================== EMBUDO ============================ */
function FunnelSlide() {
  return (
    <>
      <Head num="20" eyebrow="El valle de la muerte" title={W.funnel.title}
        lead="Casi todos usan IA, pocos la escalan. El cuello de botella no es el acceso a la tecnología: es la implementación, los datos y el workflow." />
      <div className="up" style={st(1)}><Figure fig={W.funnel as Fig} height={340} /></div>
    </>
  )
}

/* ============================ BRECHA AEC ========================== */
function AecGapSlide() {
  return (
    <>
      <Head num="21" eyebrow="El sector AEC" title={W.aecGap.title}
        lead="Arquitectura e ingeniería son de las ocupaciones más expuestas del mundo a la IA. Pero la oficina técnica solo cubre el 25 % con IA y la obra física, menos del 1 %." />
      <div className="up" style={st(1)}><Figure fig={W.aecGap as Fig} height={320} /></div>
    </>
  )
}

/* ========================== PRODUCTIVIDAD ======================== */
function ProductivitySlide() {
  return (
    <>
      <Head num="22" eyebrow="El premio económico" title="La IA puede casi cuadruplicar la productividad del sector"
        lead="La construcción crece apenas 0,7 % al año en productividad. La IA podría sumarle +1,8 pp: no se automatiza un empleo, se automatizan tareas informacionales." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={W.productivity as Fig} height={300} />
        <Insights items={[
          'Arq./Ing. son el 4º sector más expuesto del mundo a la IA: <b>84,8 %</b>.',
          'La distancia entre el potencial y el uso real es la oportunidad del sector.',
          'El impacto medible de IA en construcción saltó de <b>17 % a 38 %</b> en un año.',
        ]} />
      </div>
    </>
  )
}

/* =========================== ESTADO AEC ========================== */
function AecStateSlide() {
  const s = W.aecState
  return (
    <>
      <Head num="23" eyebrow="Madurez del sector" title={s.title}
        lead="Donde el diseño se digitaliza (Design & Make), la IA ya es casi universal. En la obra, la mayoría aún no la implementa. El rezago es, a la vez, la mayor oportunidad." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={s.chart as Fig} height={300} />
        <div className="grid stat-col">{s.stats.map((it: any, i: number) => <StatCard key={i} {...it} />)}</div>
      </div>
    </>
  )
}

/* ====================== TECNOLOGÍAS EMERGENTES =================== */
function EmergingSlide() {
  return (
    <>
      <Head num="24" eyebrow="Stack del sector" title={W.emerging.title}
        lead="El BIM y la nube ya son mayoritarios, pero la IA, la visión por computadora y los gemelos digitales recién despegan. Hay base instalada para construir encima." />
      <div className="up" style={st(1)}><Figure fig={W.emerging as Fig} height={340} /></div>
    </>
  )
}

/* ============================== DATOS ============================ */
function DataSlide() {
  return (
    <>
      <Head num="25" eyebrow="El prerrequisito olvidado" title="Sin datos no hay IA: el cuello de botella del AEC"
        lead="La construcción produce planos, actas, RFIs, fotos, presupuestos y modelos cada día. Casi nada se reutiliza. La materia prima de la IA se tira a la basura." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={W.dataBottleneck as Fig} height={300} />
        <Insights items={[
          'El <b>96 %</b> de la data de ingeniería y construcción nunca se usa (FMI / Autodesk).',
          'La mala gestión de datos costó al sector <b>US$1,84 billones</b> en 2020.',
          'La digitalización y el BIM Nivel 2+ son el piso mínimo para escalar IA.',
          '«En obra, el dato más caro es el que ya se produjo y nadie convirtió en decisión».',
        ]} />
      </div>
    </>
  )
}

/* ============================== SKILLS =========================== */
function SkillsSlide() {
  return (
    <>
      <Head num="26" eyebrow="Talento" title={W.skills.title}
        lead="El World Economic Forum proyecta a «IA y big data» como la habilidad de mayor crecimiento. El salto no es saber prompts: es pensar con datos, criterio y herramientas de IA." />
      <div className="up" style={st(1)}><Figure fig={W.skills as Fig} height={340} /></div>
    </>
  )
}

/* ============================== BARRERAS ========================= */
function BarriersSlide() {
  const barriers: Fig = {
    id: 'survey-barriers', type: 'bars', status: 'projection',
    title: survey.barriers.title, source: 'Proyección · se calibra con la encuesta a +1.000 (pregunta C5).',
    data: { vmax: 30, unit: '%', items: survey.barriers.items },
  }
  return (
    <>
      <Head num="27" eyebrow="El freno" title="La barrera principal no es la tecnología: es el criterio"
        lead="Acceder a modelos potentes ya no es difícil. Lo difícil es definir el problema, dar contexto, validar, proteger los datos y convertir el resultado en proceso." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={barriers} height={300} />
        <div className="stack">
          {survey.goldQuestions.map((g) => (
            <div key={g.code} className="panel gold">
              <p className="q">★ {g.code}: «{g.text}»</p>
              <p className="o">→ {g.output}</p>
            </div>
          ))}
          <p className="muted-s">La encuesta a +1.000 profesionales AEC de LATAM calibrará estas barreras con data primaria.</p>
        </div>
      </div>
    </>
  )
}

/* ============================ CONCLUSIONES ======================= */
function ConclusionsSlide() {
  return (
    <>
      <Head num="28" eyebrow="Qué hacer" title="El futuro del AEC es humano + trabajador digital"
        lead="La IA no reemplaza al profesional: lo reemplaza quien sepa usarla. Cada actor del ecosistema tiene una jugada concreta para empezar ya." />
      <div className="grid g2 acts up" style={st(1)}>
        {W.actions.map((a: any) => (
          <div key={a.t} className="panel act" data-accent={a.ac}>
            <h3>{a.t}</h3>
            <p>{a.d}</p>
          </div>
        ))}
      </div>
    </>
  )
}

/* =============================== CIERRE ========================== */
function ClosingSlide() {
  return (
    <div className="closing">
      <p className="closing-eyebrow up" style={st(0)}>{global.meta.event}</p>
      <p className="bigquote-text up" style={st(1)}>
        «No gana quien abre ChatGPT.{' '}
        <span className="hl">Gana quien convierte la IA en un sistema de trabajo».</span>
      </p>
      <div className="closing-cta up" style={st(2)}>
        <a className="btn btn-cta" href={PDF} target="_blank" rel="noopener" download><span aria-hidden="true">↓</span> Descargar informe (PDF)</a>
        <a className="btn" href="mailto:apalpan@genplusdesign.com">apalpan@genplusdesign.com</a>
      </div>
      <div className="closing-brand up" style={st(3)}>GEN<span className="plus">+</span> · AECODE</div>
    </div>
  )
}

/* ============================ REFERENCIAS ======================= */
function ReferencesSlide() {
  return (
    <>
      <Head num="29" eyebrow="Anexo" title="Referencias"
        lead="Todas las fuentes del benchmark global y sectorial. Los datos numéricos viven en archivos JSON auditables dentro del repositorio." />
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

/* ============================ ORDEN DEL DECK ===================== */
export const slides: SlideDef[] = [
  { id: 'cover', num: '', title: 'Portada', node: <Cover /> },
  { id: 'paradoja', num: '00', title: 'La paradoja del gigante dormido', node: <ParadoxSlide /> },
  { id: 'tesis', num: '·', title: 'La tesis', node: <ThesisSlide /> },
  { id: 'historia', num: '01', title: 'Historia de la IA', node: <HistorySlide /> },
  { id: 'genai', num: '02', title: 'Cómo funciona la IA generativa', node: <GenAISlide /> },
  { id: 'conceptos', num: '03', title: 'Chatbot · Asistente · Agente · Workflow', node: <ConceptsSlide /> },
  { id: 'computo', num: '04', title: 'Crecimiento exponencial del cómputo', node: <ComputeSlide /> },
  { id: 'singularidad', num: '05', title: 'El debate de la singularidad', node: <SingularitySlide /> },
  { id: 'estado', num: '06', title: 'Estado de la IA en 2025', node: <StateSlide /> },
  { id: 'benchmarks', num: '07', title: 'Benchmarks: la IA alcanza al humano', node: <BenchmarksSlide /> },
  { id: 'modelos', num: '08', title: 'La batalla de los modelos frontera', node: <ModelsSlide /> },
  { id: 'poblacion', num: '09', title: 'La IA generativa más usada', node: <PopulationSlide /> },
  { id: 'pago', num: '10', title: 'Cómo se paga por la IA', node: <PricingSlide /> },
  { id: 'tablero', num: '11', title: 'Tablero de herramientas de IA', node: <ToolboardSlide /> },
  { id: 'mercado', num: '12', title: 'Tamaño del mercado de la IA', node: <MarketSlide /> },
  { id: 'difusion', num: '13', title: 'Velocidad de adopción ~10×', node: <DiffusionSlide /> },
  { id: 'capex', num: '14', title: 'Capex de las big tech', node: <CapexSlide /> },
  { id: 'capital', num: '15', title: 'Levantamiento de capital', node: <FundingSlide /> },
  { id: 'nvidia', num: '16', title: 'El punto clave: NVIDIA', node: <NvidiaSlide /> },
  { id: 'regiones', num: '17', title: 'Inversión por región', node: <RegionsSlide /> },
  { id: 'anthropic', num: '18', title: 'Adopción real (Anthropic)', node: <AnthropicSlide /> },
  { id: 'metodologia', num: '19', title: 'La IA automatiza tareas, no empleos', node: <MethodSlide /> },
  { id: 'embudo', num: '20', title: 'El embudo de adopción (McKinsey)', node: <FunnelSlide /> },
  { id: 'brecha-aec', num: '21', title: 'La paradoja AEC: potencial vs. uso', node: <AecGapSlide /> },
  { id: 'productividad', num: '22', title: 'Productividad en construcción', node: <ProductivitySlide /> },
  { id: 'estado-aec', num: '23', title: 'Estado y madurez del AEC', node: <AecStateSlide /> },
  { id: 'emergentes', num: '24', title: 'Tecnologías emergentes en construcción', node: <EmergingSlide /> },
  { id: 'datos', num: '25', title: 'Datos: el cuello de botella', node: <DataSlide /> },
  { id: 'skills', num: '26', title: 'Skills clave: hacia el AI-first', node: <SkillsSlide /> },
  { id: 'barreras', num: '27', title: 'La barrera principal', node: <BarriersSlide /> },
  { id: 'conclusiones', num: '28', title: 'Conclusiones y ruta de acción', node: <ConclusionsSlide /> },
  { id: 'cierre', num: '', title: 'Cierre', node: <ClosingSlide /> },
  { id: 'referencias', num: '29', title: 'Referencias', node: <ReferencesSlide /> },
]
