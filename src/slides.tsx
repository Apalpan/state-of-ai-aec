import { useContext } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { SlideNumContext } from './components/Deck'
import Figure from './components/Figure'
import StatCard from './components/StatCard'
import AnimatedValue from './components/CountUp'
import { Timeline, GenAIProcess, ConceptLadder, ToolBoard, PricingTiers, Breakthroughs } from './components/Visuals'
import {
  CapIntro, CapCimientos, CapLenguaje, CapTokens, CapHoy, CapExpertos, CapColaborador, CapImporta,
} from './components/Capsule'
import { SurpriseStat, FableShowcase, ParadoxGap } from './components/Showcase'
import type { SlideDef } from './components/Deck'
import type { Figure as Fig } from './lib/chartOptions'
import global from '../data/global.json'
import sources from '../data/sources.json'
import survey from '../data/survey.json'
import worldRaw from '../data/world.json'

const W: any = worldRaw
const PDF = `${import.meta.env.BASE_URL}Informe-IA-AEC-2026.pdf`
const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

/* ----------------------------- helpers de slide ----------------------- */
function Head({ eyebrow, title, lead }: { num?: string; eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  const num = useContext(SlideNumContext)
  return (
    <header className="s-head up" style={st(0)}>
      <p className="eyebrow">{num && <span className="idx">{num}</span>} {eyebrow}</p>
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
function Plain({ text, i = 2 }: { text: string; i?: number }) {
  return <div className="plain up" style={st(i)}><p dangerouslySetInnerHTML={{ __html: text }} /></div>
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
        lead="El sector más grande de la economía mundial es, a la vez, el menos digitalizado. Toca cada barra para compararlas." />
      <ParadoxGap />
    </>
  )
}

/* =============================== TESIS =============================== */
function ThesisSlide() {
  const t = W.thesis
  return (
    <div className="thesis">
      <p className="thesis-lead up" style={st(1)}>{t.lead}</p>
      <p className="thesis-hl up" style={st(2)}>{t.highlight}</p>
      <p className="thesis-foot up" style={st(3)}>{t.foot}</p>
    </div>
  )
}

/* ===================== UN DATO QUE NADIE ESPERA ===================== */
function SurpriseSlide() {
  return <SurpriseStat />
}

/* =================== ADOPCIÓN MÁS RÁPIDA DE LA HISTORIA ============== */
function AdoptionSpeedSlide() {
  const r = W.reach
  return (
    <>
      <Head num="01" eyebrow="La velocidad" title={W.adoptionSpeed.title}
        lead="Ni la computadora, ni el internet, ni el celular se expandieron tan rápido: lo que a otras tecnologías les tomó una década, a la IA le tomó meses." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={W.adoptionSpeed as Fig} height={260} />
        <div className="grid stat-col">{r.stats.slice(0, 3).map((s: any, i: number) => <StatCard key={i} {...s} />)}</div>
      </div>
    </>
  )
}

/* ===================== LA FRONTERA EN VIVO (Fable 5) ================ */
function FrontierSlide() {
  return (
    <>
      <FableShowcase />
      <p className="src-note up" style={st(4)}><b>Fuente:</b> {W.frontier.source} · {W.frontier.note}</p>
    </>
  )
}

/* ============================== HISTORIA ============================= */
function HistorySlide() {
  return (
    <>
      <Head num="03" eyebrow="Contexto" title={W.history.title}
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
      <Head num="04" eyebrow="Fundamentos" title={g.title}
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
      <Head num="05" eyebrow="Lenguaje mínimo" title={W.concepts.title}
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
      <Head num="06" eyebrow="Por qué se aceleró todo" title="Crecimiento exponencial: el motor es el cómputo"
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
      <Head num="07" eyebrow="El debate" title={s.title} lead={s.note} />
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
      <Head num="08" eyebrow="El mundo hoy" title={s.title}
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
      <Head num="09" eyebrow="Capacidad" title={W.benchmarks.title}
        lead="Un «benchmark» es un examen estándar para medir a la IA. En pruebas que en 2023 eran casi imposibles, en un solo año pasó a resolver la mayoría: en código real (SWE-bench) saltó de 4 % a 72 %. La línea punteada marca el nivel de un experto humano." />
      <div className="up" style={st(1)}><Figure fig={W.benchmarks as Fig} height={360} /></div>
    </>
  )
}

/* ===================== HUMANITY'S LAST EXAM ======================== */
function HleSlide() {
  return (
    <>
      <Head num="10" eyebrow="Qué puede hacer" title={W.hle.title}
        lead="3.000 expertos crearon «Humanity's Last Exam»: 2.500 preguntas tan difíciles que solo un PhD las responde. Lo publicó Nature en enero de 2026." />
      <div className="up" style={st(1)}><Figure fig={W.hle as Fig} height={300} /></div>
      <Plain text={W.hle.plain} />
    </>
  )
}

/* ============================ BREAKTHROUGHS ======================== */
function BreakthroughsSlide() {
  return (
    <>
      <Head num="11" eyebrow="Qué puede hacer" title={W.breakthroughs.title}
        lead="No son demos de laboratorio: son resultados de 2025–2026 con fuente. La IA ya opera en la frontera de la ciencia." />
      <Breakthroughs items={W.breakthroughs.items} />
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {W.breakthroughs.source}</p>
    </>
  )
}

/* ============================== MODELOS ============================ */
const MODELS_BENCH: Fig = {
  id: 'models-bench', type: 'groupBars', status: 'mixed',
  title: 'Modelos frontera en los benchmarks clave (2026)',
  source: 'Síntesis de leaderboards públicos 2026 (Artificial Analysis · tarjetas de los proveedores). Posiciones cualitativas, no un único benchmark oficial.',
  note: 'Barras = % obtenido en cada examen estándar. Ninguno gana en todo: la «mejor IA» depende de la tarea.',
  data: {
    unit: '%', vmax: 100,
    groups: ['GPT-5.x', 'Claude', 'Gemini'],
    colors: ['indigo', 'green', 'purple'],
    categories: [
      { label: 'Razonamiento\n(GPQA)', values: [88, 87, 86] },
      { label: 'Código\n(SWE-bench)', values: [74, 78, 70] },
      { label: 'Matemática\n(AIME)', values: [94, 90, 92] },
      { label: 'Multimodal\n(MMMU)', values: [84, 80, 88] },
    ],
  },
}
function ModelsSlide() {
  return (
    <>
      <Head num="12" eyebrow="La frontera" title="La batalla de los modelos frontera"
        lead="No hay un único «mejor modelo»: GPT, Claude y Gemini se turnan la punta según el examen. La elección correcta depende de la tarea, no de la marca." />
      <div className="up" style={st(1)}><Figure fig={MODELS_BENCH} height={360} /></div>
    </>
  )
}

/* ====================== IA GENERATIVA POBLACIÓN ==================== */
function PopulationSlide() {
  return (
    <>
      <Head num="13" eyebrow="Uso masivo" title={W.popUsage.title}
        lead="ChatGPT abrió el mercado y aún lidera con ~900 M de usuarios semanales, pero Gemini y Claude crecen rápido. La adopción poblacional batió todos los récords históricos." />
      <div className="up" style={st(1)}><Figure fig={W.popUsage as Fig} height={300} /></div>
    </>
  )
}

/* ============================ TIPOS DE PAGO ======================== */
function PricingSlide() {
  return (
    <>
      <Head num="14" eyebrow="Monetización" title={W.pricing.title} lead={W.pricing.note} />
      <PricingTiers tiers={W.pricing.tiers} />
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {W.pricing.source}</p>
    </>
  )
}

/* ============================== TABLERO =========================== */
function ToolboardSlide() {
  return (
    <>
      <Head num="15" eyebrow="Herramientas" title={W.toolboard.title} lead={W.toolboard.note} />
      <ToolBoard cats={W.toolboard.cats} />
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {W.toolboard.source}</p>
    </>
  )
}

/* ===================== PRODUCTIVIDAD PERSONAL ===================== */
function ProductivityPersonalSlide() {
  return (
    <>
      <Head num="16" eyebrow="Tu trabajo" title={W.productivityByArea.title}
        lead="La IA no te quita el trabajo: cambia cómo trabajas. Quienes la usan hacen lo mismo en menos tiempo — y los principiantes son los que más ganan." />
      <div className="up" style={st(1)}><Figure fig={W.productivityByArea as Fig} height={290} /></div>
      <Plain text={W.productivityByArea.plain} />
    </>
  )
}

/* ============================== EMPLEOS =========================== */
function JobsSlide() {
  return (
    <>
      <Head num="17" eyebrow="Tu trabajo" title={W.jobsBalance.title}
        lead="La pregunta que todos se hacen. El Foro Económico Mundial proyecta, al 2030, más empleos creados que destruidos. La gráfica lo lee de izquierda a derecha: se suman los nuevos, se restan los que se transforman y queda el saldo." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={W.jobsBalance as Fig} height={300} />
        <Insights items={[
          '<b>+170 M</b> de empleos nuevos al 2030 (WEF).',
          '<b>−92 M</b> desplazados: el 22 % del empleo mundial se transforma.',
          'Saldo neto: <b>+78 M</b>. El problema no es que falten empleos: es que los nuevos piden otras habilidades.',
          'En una frase: <b>la IA no te reemplaza; te reemplaza quien sepa usarla</b>.',
        ]} />
      </div>
    </>
  )
}

/* ============================ ANTHROPIC =========================== */
function AnthropicSlide() {
  const a = W.anthropic
  return (
    <>
      <Head num="18" eyebrow="Adopción real (Anthropic)" title={a.title} lead={a.key} />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={a.chart as Fig} height={300} />
        <div className="grid stat-col">{a.stats.map((s: any, i: number) => <StatCard key={i} {...s} />)}</div>
      </div>
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {a.source}</p>
    </>
  )
}

/* ============================ MERCADO IA ========================== */
function MarketSlide() {
  return (
    <>
      <Head num="19" eyebrow="Economía" title={W.market.title}
        lead="El dinero que mueve la IA se multiplica ~10× en una década: de unos US$300 mil millones hoy a más de US$2,4 billones en 2034. La banda gris muestra que, aunque las fuentes no coinciden en el número exacto, todas apuntan en la misma dirección: hacia arriba." />
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
      <Head num="20" eyebrow="Velocidad" title="La IA se adopta ~10× más rápido que internet"
        lead="La IA generativa entró más rápido que la electricidad, el teléfono o internet. Esa velocidad es justo lo que el sector AEC todavía no asimila." />
      <div className="up" style={st(1)}><Figure fig={diffusion} height={360} /></div>
    </>
  )
}

/* ============================ BIG TECH CAPEX ====================== */
function CapexSlide() {
  return (
    <>
      <Head num="21" eyebrow="La carrera" title={W.capex.title}
        lead="Los hiperescaladores libran la mayor batalla de capital de la historia tecnológica: ~US$665 B en 2026, casi todo en data centers y GPU para IA." />
      <div className="up" style={st(1)}><Figure fig={W.capex as Fig} height={300} /></div>
      <Plain text={W.capex.plain} />
    </>
  )
}

/* ========================= LEVANTAMIENTO CAPITAL ================== */
function FundingSlide() {
  return (
    <>
      <Head num="22" eyebrow="Capital privado" title={W.funding.title}
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
      <Head num="23" eyebrow="El cuello de botella" title={n.title} lead={n.note} />
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
      <Head num="24" eyebrow="Geografía del capital" title={W.regions.title}
        lead="EE. UU. y China concentran la inversión. Latinoamérica capta una fracción mínima del flujo global: el riesgo no es solo llegar tarde, es llegar como consumidor y no como creador." />
      <div className="up" style={st(1)}><Figure fig={W.regions as Fig} height={340} /></div>
    </>
  )
}

/* =========================== AGENTES (lo que viene) ============== */
function AgentsSlide() {
  const a = W.agentsRise
  return (
    <>
      <Head num="25" eyebrow="Lo que viene" title={a.title} lead={a.lead} />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={a.chart as Fig} height={300} />
        <div className="grid stat-col">{a.stats.map((s: any, i: number) => <StatCard key={i} {...s} />)}</div>
      </div>
      <p className="src-note up" style={st(2)}><b>Fuente:</b> {a.source} · {a.note}</p>
    </>
  )
}

/* ============================ BRECHA AEC ========================== */
function AecGapSlide() {
  return (
    <>
      <Head num="26" eyebrow="El sector AEC" title={W.aecGap.title}
        lead="Arquitectura e ingeniería son de las ocupaciones más expuestas del mundo a la IA. Pero la oficina técnica solo cubre el 25 % con IA y la obra física, menos del 1 %." />
      <div className="up" style={st(1)}><Figure fig={W.aecGap as Fig} height={320} /></div>
    </>
  )
}

/* ========================== PRODUCTIVIDAD ======================== */
function ProductivitySlide() {
  return (
    <>
      <Head num="27" eyebrow="El premio económico" title="La IA puede casi cuadruplicar la productividad del sector"
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
      <Head num="28" eyebrow="Madurez del sector" title={s.title}
        lead="Donde el diseño se digitaliza (Design & Make), la IA ya es casi universal. En la obra, la mayoría aún no la implementa. El rezago es, a la vez, la mayor oportunidad." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={s.chart as Fig} height={300} />
        <div className="grid stat-col">{s.stats.map((it: any, i: number) => <StatCard key={i} {...it} />)}</div>
      </div>
    </>
  )
}

/* ===================== CRISIS LABORAL AEC (urgencia) ============= */
function AecLaborSlide() {
  const a = W.aecLabor
  return (
    <>
      <Head num="29" eyebrow="El sector AEC" title={a.title} lead={a.lead} />
      <div className="grid g2 keep stat-grid up" style={st(1)}>
        {a.stats.map((s: any, i: number) => <StatCard key={i} {...s} />)}
      </div>
      <Plain text={a.note} />
      <p className="src-note up" style={st(3)}><b>Fuente:</b> {a.source}</p>
    </>
  )
}

/* ====================== TECNOLOGÍAS EMERGENTES =================== */
function EmergingSlide() {
  return (
    <>
      <Head num="30" eyebrow="Stack del sector" title={W.emerging.title}
        lead="El BIM y la nube ya son mayoritarios, pero la IA, la visión por computadora y los gemelos digitales recién despegan. Hay base instalada para construir encima." />
      <div className="up" style={st(1)}><Figure fig={W.emerging as Fig} height={340} /></div>
    </>
  )
}

/* ============================== DATOS ============================ */
function DataSlide() {
  return (
    <>
      <Head num="31" eyebrow="El prerrequisito olvidado" title="Sin datos no hay IA: el cuello de botella del AEC"
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
      <Head num="32" eyebrow="Talento" title={W.skills.title}
        lead="El World Economic Forum proyecta a «IA y big data» como la habilidad de mayor crecimiento. El salto no es saber prompts: es pensar con datos, criterio y herramientas de IA." />
      <div className="up" style={st(1)}><Figure fig={W.skills as Fig} height={340} /></div>
    </>
  )
}

/* ============================== BARRERAS ========================= */
const BARRIERS: Fig = {
  id: 'ai-barriers', type: 'bars', status: 'mixed',
  title: 'Lo que frena la adopción de IA (más allá de la obra)',
  source: 'Síntesis de barreras reportadas — McKinsey State of AI 2025 · RICS 2025.',
  note: 'Importancia relativa. El acceso al modelo ya no es el problema: lo es el criterio, los datos y el riesgo.',
  data: {
    vmax: 60, unit: '%',
    items: [
      { label: 'Falta de casos de uso / estrategia clara', value: 52, from: 'red', to: 'orange' },
      { label: 'Brecha de talento y skills', value: 46, from: 'orange', to: 'amber' },
      { label: 'Calidad y disponibilidad de datos', value: 43, from: 'indigo', to: 'purple' },
      { label: 'Riesgo, gobernanza y seguridad', value: 38, from: 'purple', to: 'indigo' },
      { label: 'Costo / ROI incierto', value: 33, from: 'blue', to: 'indigo' },
    ],
  },
}
function BarriersSlide() {
  return (
    <>
      <Head num="33" eyebrow="El freno" title="La barrera principal no es la tecnología: es el criterio"
        lead="Acceder a modelos potentes ya no es difícil. Lo difícil es definir el problema, dar contexto, validar, proteger los datos y convertir el resultado en proceso." />
      <div className="up" style={st(1)}><Figure fig={BARRIERS} height={300} /></div>
    </>
  )
}

/* ============================ CONCLUSIONES ======================= */
function ConclusionsSlide() {
  return (
    <>
      <Head num="34" eyebrow="Qué hacer" title="El futuro del AEC es humano + trabajador digital"
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

/* ================= PRÓXIMA FASE — investigación propia (separada) === */
const STEPS = [
  { n: '1', t: 'Capa 1 — Benchmark global', d: 'Lo que acabas de ver: revisión de fuentes 2024–2026 (McKinsey, Anthropic, Stanford HAI, WEF, Autodesk, RICS).' },
  { n: '2', t: 'Capa 2 — Encuesta +1.000', d: 'Muestra LATAM por cuotas. Se pregunta por TAREAS antes que por herramientas (método Anthropic Economic Index).' },
  { n: '3', t: 'Contraste y síntesis', d: '«El mundo dice X · el AEC de LATAM dice Y · la brecha es Z». Índices de madurez y brecha potencial–uso.' },
]
function NextPhaseSlide() {
  const m = survey.method
  return (
    <>
      <Head num="35" eyebrow="Lo que viene · nuestra investigación"
        title={<>Hasta aquí, el estado <span className="green-ink">real y verificado</span>. Ahora lo medimos en LATAM</>}
        lead="Todo lo anterior son datos globales con fuente pública. La siguiente fase es investigación primaria propia: una encuesta y focus group con +1.000 profesionales AEC de Latinoamérica." />
      <div className="next-phase up" style={st(1)}>
        <span className="next-tag">Próxima fase — focus group + encuesta +1.000 (dato primario, aún no recolectado)</span>
        <div className="next-grid">
          {STEPS.map((s) => (
            <div className="next-step" key={s.n}>
              <span className="ns-n">{s.n}</span>
              <span className="ns-t">{s.t}</span>
              <span className="ns-d">{s.d}</span>
            </div>
          ))}
        </div>
        <p className="next-foot"><b>Ficha técnica:</b> {m.population} · {m.sampling} · meta {m.target} · {m.approach} · {m.field}.</p>
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
      <Head num="36" eyebrow="Anexo" title="Referencias"
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
  /* Acto I — La velocidad */
  { id: 'paradoja', num: '00', title: 'La paradoja del gigante dormido', node: <ParadoxSlide /> },
  { id: 'surprise', num: '✦', title: 'Un dato que nadie espera: 52% mujeres', node: <SurpriseSlide /> },
  { id: 'tesis', num: '·', title: 'La brecha que define la década', node: <ThesisSlide /> },
  { id: 'adopcion', num: '01', title: 'La adopción más rápida de la historia', node: <AdoptionSpeedSlide /> },
  { id: 'frontera', num: '✦', title: 'La frontera en vivo: Claude Fable 5', node: <FrontierSlide /> },
  { id: 'historia', num: '03', title: 'Historia de la IA', node: <HistorySlide /> },
  /* ░░ Cápsula · Fundamentos de IA en simple — módulo didáctico interactivo ░░ */
  { id: 'cap-intro', num: '✦', title: 'Cápsula · Fundamentos de IA', node: <CapIntro /> },
  { id: 'cap-cimientos', num: 'F1', title: 'Los cimientos: IA · ML · DL · Modelo', node: <CapCimientos /> },
  { id: 'cap-lenguaje', num: 'F2', title: 'Cómo hablan los modelos: LLM · Prompt · Contexto', node: <CapLenguaje /> },
  { id: 'cap-tokens', num: 'F3', title: 'Tokens y ventana de contexto', node: <CapTokens /> },
  { id: 'cap-hoy', num: 'F4', title: 'Lo que pueden hacer hoy', node: <CapHoy /> },
  { id: 'cap-expertos', num: 'F5', title: 'Expertos en lo tuyo: fine-tuning vs. RAG', node: <CapExpertos /> },
  { id: 'cap-colaborador', num: 'F6', title: 'De herramienta a colaborador: agentes', node: <CapColaborador /> },
  { id: 'cap-importa', num: '✦', title: 'Cápsula · Lo que de verdad importa', node: <CapImporta /> },
  /* Acto II — Cómo funciona */
  { id: 'genai', num: '04', title: 'Cómo funciona la IA generativa', node: <GenAISlide /> },
  { id: 'conceptos', num: '05', title: 'Chatbot · Asistente · Agente · Workflow', node: <ConceptsSlide /> },
  { id: 'computo', num: '06', title: 'Crecimiento exponencial del cómputo', node: <ComputeSlide /> },
  { id: 'singularidad', num: '07', title: 'El debate de la singularidad', node: <SingularitySlide /> },
  /* Acto III — Qué puede hacer */
  { id: 'estado', num: '08', title: 'Estado de la IA en 2025', node: <StateSlide /> },
  { id: 'benchmarks', num: '09', title: 'Benchmarks: la IA alcanza al humano', node: <BenchmarksSlide /> },
  { id: 'hle', num: '10', title: 'El examen más difícil del mundo', node: <HleSlide /> },
  { id: 'modelos', num: '12', title: 'La batalla de los modelos frontera', node: <ModelsSlide /> },
  /* Acto IV — Cómo se usa / trabajo */
  { id: 'poblacion', num: '13', title: 'La IA generativa más usada', node: <PopulationSlide /> },
  { id: 'pago', num: '14', title: 'Cómo se paga por la IA', node: <PricingSlide /> },
  { id: 'tablero', num: '15', title: 'Tablero de herramientas de IA', node: <ToolboardSlide /> },
  { id: 'productividad-personal', num: '16', title: 'Cuánto tiempo te ahorra la IA', node: <ProductivityPersonalSlide /> },
  { id: 'empleos', num: '17', title: '¿La IA destruye empleos?', node: <JobsSlide /> },
  /* Acto V — La economía */
  { id: 'mercado', num: '19', title: 'Tamaño del mercado de la IA', node: <MarketSlide /> },
  { id: 'regiones', num: '24', title: 'Inversión por región', node: <RegionsSlide /> },
  { id: 'agentes', num: '25', title: 'Lo que viene: los agentes', node: <AgentsSlide /> },
  /* Acto VI — La brecha AEC */
  { id: 'brecha-aec', num: '26', title: 'La paradoja AEC: potencial vs. uso', node: <AecGapSlide /> },
  { id: 'productividad', num: '27', title: 'Productividad en construcción', node: <ProductivitySlide /> },
  { id: 'datos', num: '31', title: 'Datos: el cuello de botella', node: <DataSlide /> },
  { id: 'skills', num: '32', title: 'Skills clave: hacia el AI-first', node: <SkillsSlide /> },
  /* Acto VII — El freno y el cierre */
  { id: 'barreras', num: '33', title: 'La barrera principal', node: <BarriersSlide /> },
  { id: 'cierre', num: '', title: 'Cierre', node: <ClosingSlide /> },
  { id: 'referencias', num: '36', title: 'Referencias', node: <ReferencesSlide /> },
]
