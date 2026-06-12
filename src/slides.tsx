import { useContext } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { SlideNumContext } from './components/Deck'
import Figure from './components/Figure'
import StatCard from './components/StatCard'
import { Timeline, GenAIProcess, ConceptLadder, ToolBoard, PricingTiers, Breakthroughs } from './components/Visuals'
import {
  CapCimientos, CapLenguaje, CapTokens, CapHoy, CapExpertos, CapColaborador, CapImporta,
} from './components/Capsule'
import { SurpriseStat, FableShowcase, ParadoxGap } from './components/Showcase'
import FlashSlide, { FLASH } from './components/Flash'
import AecodeLogo from './components/AecodeLogo'
import type { SlideDef } from './components/Deck'
import type { Figure as Fig } from './lib/chartOptions'
import global from '../data/global.json'
import sources from '../data/sources.json'
import survey from '../data/survey.json'
import worldRaw from '../data/world.json'

const W: any = worldRaw
const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

function Head({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
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

function Insights({ items }: { items: ReactNode[] }) {
  return <ul className="insights compact">{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
}

function SourceNote({ children }: { children: ReactNode }) {
  return <p className="src-note up" style={st(4)}><b>Fuente:</b> {children}</p>
}

function Plain({ children, i = 2 }: { children: ReactNode; i?: number }) {
  return <div className="plain up" style={st(i)}><p>{children}</p></div>
}

function PresenterNote({ children, i = 3 }: { children: ReactNode; i?: number }) {
  return <div className="presenter-note up" style={st(i)}>{children}</div>
}

function SectionSlide({ eyebrow, title, lead, chips }: { eyebrow: string; title: ReactNode; lead: ReactNode; chips: string[] }) {
  return (
    <div className="section-slide">
      <AecodeLogo className="section-logo up" style={st(0)} />
      <p className="cover-eyebrow up" style={st(1)}>{eyebrow}</p>
      <h1 className="section-title up" style={st(2)}>{title}</h1>
      <p className="cover-lead up" style={st(3)}>{lead}</p>
      <div className="cover-meta up" style={st(4)}>
        {chips.map((c) => <span className="chip" key={c}>{c}</span>)}
      </div>
    </div>
  )
}

function SignalGrid({ items }: { items: Array<{ k: string; t: string; d: string; tag?: string }> }) {
  return (
    <div className="signal-grid up" style={st(1)}>
      {items.map((it, i) => (
        <article className="signal-card" key={it.t} style={st(i + 1)}>
          <span className="signal-k">{it.k}</span>
          <h3>{it.t}</h3>
          <p>{it.d}</p>
          {it.tag && <b>{it.tag}</b>}
        </article>
      ))}
    </div>
  )
}

function ProcessFlow({ items }: { items: Array<{ t: string; d: string }> }) {
  return (
    <div className="process-flow up" style={st(1)}>
      {items.map((it, i) => (
        <div className="process-node" key={it.t} style={st(i + 1)}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <h3>{it.t}</h3>
          <p>{it.d}</p>
        </div>
      ))}
    </div>
  )
}

function QuoteRail({ quotes }: { quotes: Array<{ who: string; role: string; text: string }> }) {
  return (
    <div className="quote-rail up" style={st(1)}>
      {quotes.map((q, i) => (
        <figure className="ceo-quote" key={q.who} style={st(i + 1)}>
          <blockquote>{q.text}</blockquote>
          <figcaption>{q.who}<span>{q.role}</span></figcaption>
        </figure>
      ))}
    </div>
  )
}

function Cover() {
  const { meta } = global as any
  return (
    <div className="cover">
      <AecodeLogo className="cover-mark up" style={st(0)} />
      <p className="cover-eyebrow up" style={st(1)}>{meta.edition} · Masterclass AECODE Light</p>
      <h1 className="cover-title up" style={st(2)}>
        Estado actual de la <span className="grad">Inteligencia Artificial</span><br />y oportunidad en AEC
      </h1>
      <p className="cover-lead up" style={st(3)}>
        100 slides para entender qué cambió en la IA, qué significan los modelos actuales y cómo convertirla en habilidad, workflow y evidencia para arquitectura, ingeniería y construcción.
      </p>
      <div className="cover-meta up" style={st(4)}>
        <span className="chip">AI Construction Summit</span>
        <span className="chip">Radar AECODE 2026</span>
        <span className="chip">ENIA 2026-2030</span>
        <span className="chip">IA como skill verificable</span>
      </div>
      <div className="cover-hud up" style={st(5)} aria-hidden="true">
        <span className="ch-item"><b className="tnum">2×</b> cómputo cada 6 meses</span>
        <span className="ch-sep" />
        <span className="ch-item"><b className="tnum">1000 M</b> usuarios de ChatGPT</span>
        <span className="ch-sep" />
        <span className="ch-item"><b className="tnum">84,8%</b> exposición en Arq./Ing.</span>
        <span className="ch-sep" />
        <span className="ch-item live"><span className="ch-dot" /> datos verificados 2026</span>
      </div>
    </div>
  )
}

function NarrativeMapSlide() {
  const items = [
    { k: '01', t: 'Que cambio', d: 'La IA paso de responder texto a razonar, ver, crear, programar y usar herramientas.', tag: 'Capacidad' },
    { k: '02', t: 'Por que importa', d: 'La adopcion masiva ya empezo, pero la captura de valor sigue en pilotos.', tag: 'Productividad' },
    { k: '03', t: 'Donde esta AEC', d: 'El sector tiene gran mercado, baja productividad y datos desaprovechados.', tag: 'Brecha' },
    { k: '04', t: 'Que hacer', d: 'Pasar de prompts sueltos a workflows con validacion, trazabilidad y evidencia.', tag: 'Sistema' },
  ]
  return (
    <>
      <Head eyebrow="Hilo conductor" title="Una historia clara: de asombro a criterio operativo"
        lead="La masterclass no es un desfile de herramientas. Es una forma de entender la IA como infraestructura de trabajo y como nueva habilidad profesional." />
      <SignalGrid items={items} />
      <PresenterNote>
        Pregunta de apertura: <b>si la IA ya puede leer documentos, comparar opciones, generar codigo y operar software, que parte de tu trabajo AEC sigue dependiendo de copiar, pegar y perseguir informacion?</b>
      </PresenterNote>
    </>
  )
}

function WhatYouWillUnderstandSlide() {
  return (
    <>
      <Head eyebrow="Promesa de aprendizaje" title="Al final, cualquier profesional debe poder explicar cinco cosas"
        lead="El objetivo no es memorizar siglas. Es salir con un mapa mental para decidir donde usar IA, donde no usarla y como validar resultados." />
      <ProcessFlow items={[
        { t: 'Que es IA', d: 'Diferenciar IA, machine learning, deep learning, LLM, IA generativa, predictiva y agentica.' },
        { t: 'Que puede hacer', d: 'Entender capacidades reales: texto, imagen, documentos, codigo, razonamiento, busqueda y acciones.' },
        { t: 'Que no debe hacer sola', d: 'Reconocer limites: alucinacion, datos sensibles, responsabilidad tecnica, sesgo y trazabilidad.' },
        { t: 'Como aplicarla en AEC', d: 'Llevarla a procesos: actas, RFIs, costos, BIM, obra, seguridad, reportes y soporte comercial.' },
        { t: 'Como convertirla en skill', d: 'Practicar, entregar evidencia, recibir validacion y construir un Skill Passport profesional.' },
      ]} />
    </>
  )
}

function ParadoxSlide() {
  return (
    <>
      <Head eyebrow="Punto de partida" title="La paradoja del AEC"
        lead="El sector que mas construye el mundo sigue atrapado en baja productividad, informacion fragmentada y adopcion desigual de tecnologia." />
      <ParadoxGap />
    </>
  )
}

function CurrentMomentSlide() {
  return (
    <>
      <Head eyebrow="2026 en una frase" title="La IA dejo de ser una app: se esta convirtiendo en una capa de operacion"
        lead="Los anuncios recientes de OpenAI, Google y Microsoft apuntan a la misma direccion: modelos que razonan mas, usan herramientas, se integran al sistema operativo y ejecutan flujos completos." />
      <QuoteRail quotes={[
        { who: 'OpenAI', role: 'GPT-5.5', text: 'La nueva frontera no es responder mejor, sino terminar tareas complejas en software, datos, investigacion y documentos.' },
        { who: 'Google', role: 'I/O 2026', text: 'Modelos, agentes y herramientas se integran para construir, buscar, crear, descubrir y trabajar con menos friccion.' },
        { who: 'Microsoft', role: 'Build 2026', text: 'El sistema operativo empieza a tratar a los agentes como procesos contenidos, gobernados y auditables.' },
      ]} />
      <SourceNote>OpenAI GPT-5.5 (2026) · Google I/O 2026 · Microsoft Build 2026.</SourceNote>
    </>
  )
}

function AdoptionSpeedSlide() {
  const r = W.reach
  return (
    <>
      <Head eyebrow="Velocidad de adopcion" title={W.adoptionSpeed.title}
        lead="La IA generativa se adopto a una velocidad inedita. Esto obliga a los profesionales a aprender criterio antes de que el mercado lo exija por defecto." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={W.adoptionSpeed as Fig} height={290} />
        <div className="grid stat-col">{r.stats.slice(0, 4).map((s: any, i: number) => <StatCard key={i} {...s} />)}</div>
      </div>
    </>
  )
}

function PopulationSlide() {
  return (
    <>
      <Head eyebrow="Uso masivo" title={W.popUsage.title}
        lead="ChatGPT, Gemini, Claude, Perplexity y Copilot ya son parte del escritorio profesional. Pero usarlas no equivale a saber trabajar con IA." />
      <div className="up" style={st(1)}><Figure fig={W.popUsage as Fig} height={320} /></div>
    </>
  )
}

function StateSlide() {
  const s = W.stateStats
  return (
    <>
      <Head eyebrow="Adopcion empresarial" title={s.title}
        lead="El dato clave no es que 88% use IA. El dato clave es que la mayoria todavia no la escala: la brecha esta entre probar y redisenar procesos." />
      <div className="grid g3 keep stat-grid up" style={st(1)}>
        {s.items.map((it: any, i: number) => <StatCard key={i} {...it} />)}
      </div>
      <SourceNote>{s.source}</SourceNote>
    </>
  )
}

function ModelLandscapeSlide() {
  return (
    <>
      <Head eyebrow="Modelos actuales" title="La pregunta ya no es cual IA es mejor, sino para que la necesitas"
        lead="Los modelos frontera se parecen cada vez mas en capacidad general, pero se diferencian por contexto, velocidad, costo, integracion, seguridad y experiencia de uso." />
      <div className="model-grid up" style={st(1)}>
        {[
          { t: 'GPT / Codex', d: 'Muy fuerte en trabajo real con herramientas, codigo, analisis, documentos y flujos largos.', k: 'operar' },
          { t: 'Claude', d: 'Muy competitivo en razonamiento, escritura tecnica, codigo, contexto largo y analisis cuidadoso.', k: 'pensar' },
          { t: 'Gemini', d: 'Potente en ecosistema Google, multimodalidad, velocidad, video, busqueda e integracion.', k: 'ver' },
          { t: 'Modelos abiertos', d: 'Clave para privacidad, costos, experimentacion local y soluciones empresariales controladas.', k: 'control' },
        ].map((m, i) => (
          <article className="model-card" key={m.t} style={st(i + 1)}>
            <span>{m.k}</span><h3>{m.t}</h3><p>{m.d}</p>
          </article>
        ))}
      </div>
      <PresenterNote>Regla para presentar: no vendas una marca. Ensena una matriz de decision: tarea, datos, riesgo, formato, costo y nivel de validacion.</PresenterNote>
    </>
  )
}

function ReasoningFastSlide() {
  return (
    <>
      <Head eyebrow="Criterio de uso" title="IA rapida vs. IA que piensa mas"
        lead="No todas las tareas necesitan razonamiento largo. Pedirle a la IA que piense mas puede mejorar analisis complejos, pero no garantiza verdad." />
      <div className="comparison up" style={st(1)}>
        <article>
          <span className="pill-mini">respuesta rapida</span>
          <h3>Cuando basta velocidad</h3>
          <p>Correos, lluvia de ideas, reformulacion, resumen simple, borradores y tareas de bajo riesgo.</p>
          <b>Validacion ligera</b>
        </article>
        <article>
          <span className="pill-mini">razonamiento profundo</span>
          <h3>Cuando necesitas analisis</h3>
          <p>Comparar alternativas, revisar riesgos, evaluar supuestos, explicar una decision o trabajar con datos.</p>
          <b>Validacion humana + fuentes</b>
        </article>
      </div>
      <Plain>Mas razonamiento no significa mas verdad. Significa mas capacidad para sostener pasos, pero el profesional sigue validando datos, criterio tecnico y consecuencias.</Plain>
    </>
  )
}

function BenchmarksSlide() {
  return (
    <>
      <Head eyebrow="Capacidad medida" title={W.benchmarks.title}
        lead="Un benchmark es un examen estandar. Sirve para ver progreso, no para escoger herramienta a ciegas. El mensaje: la frontera sube rapido." />
      <div className="up" style={st(1)}><Figure fig={W.benchmarks as Fig} height={360} /></div>
    </>
  )
}

function HleSlide() {
  return (
    <>
      <Head eyebrow="Examen extremo" title={W.hle.title}
        lead="Humanity's Last Exam muestra una idea incomoda: tareas que parecian reservadas para expertos empiezan a ser parcialmente resolubles por modelos." />
      <div className="up" style={st(1)}><Figure fig={W.hle as Fig} height={300} /></div>
      <Plain>{W.hle.plain}</Plain>
    </>
  )
}

function FrontierSlide() {
  return (
    <>
      <FableShowcase />
      <SourceNote>{W.frontier.source} · {W.frontier.note}</SourceNote>
    </>
  )
}

function BreakthroughsSlide() {
  return (
    <>
      <Head eyebrow="Anecdotas que importan" title={W.breakthroughs.title}
        lead="Las mejores historias no son ciencia ficcion: son senales de que la IA ya ayuda en matematicas, ciencia, clima, investigacion y software." />
      <Breakthroughs items={W.breakthroughs.items} />
      <SourceNote>{W.breakthroughs.source}</SourceNote>
    </>
  )
}

function HistorySlide() {
  return (
    <>
      <Head eyebrow="Contexto historico" title={W.history.title}
        lead="La IA no aparecio de la nada. Lo nuevo es que ahora converge computo, datos, modelos, interfaces y distribucion masiva." />
      <Timeline events={W.history.events} />
      <SourceNote>{W.history.source}</SourceNote>
    </>
  )
}

function ComputeSlide() {
  return (
    <>
      <Head eyebrow="Motor tecnico" title="El motor de la curva: computo, datos y arquitectura"
        lead="Los modelos no mejoran por magia. Mejoran porque escala el computo, mejora la arquitectura, aumentan los datos y se optimiza la inferencia." />
      <div className="up" style={st(1)}><Figure fig={W.compute as Fig} height={360} /></div>
    </>
  )
}

function GenAISlide() {
  const g = W.genai
  return (
    <>
      <Head eyebrow="Fundamentos" title={g.title}
        lead="Un LLM no consulta una enciclopedia interna perfecta: transforma texto en tokens y predice continuaciones probables usando patrones aprendidos." />
      <GenAIProcess steps={g.steps} tokens={g.tokenExample} note={g.tokenNote} />
      <SourceNote>{g.source}</SourceNote>
    </>
  )
}

function ConceptsSlide() {
  return (
    <>
      <Head eyebrow="Lenguaje minimo" title={W.concepts.title}
        lead="Distinguir niveles evita errores: no se gobierna igual un chatbot, un asistente, un agente o un workflow de negocio." />
      <ConceptLadder items={W.concepts.items} />
      <SourceNote>{W.concepts.source}</SourceNote>
    </>
  )
}

function PromptProfessionalSlide() {
  return (
    <>
      <Head eyebrow="Prompt profesional" title="Un buen prompt no es magia: es especificacion de trabajo"
        lead="La IA responde mejor cuando recibe rol, contexto, tarea, formato, criterio y ejemplos. Eso se parece mas a una orden tecnica que a una pregunta casual." />
      <ProcessFlow items={[
        { t: 'Rol', d: 'Desde que perspectiva debe responder: planner, BIM manager, residente, analista de costos.' },
        { t: 'Contexto', d: 'Proyecto, etapa, restricciones, datos disponibles, publico objetivo y nivel de detalle.' },
        { t: 'Tarea', d: 'Accion concreta: resumir, comparar, detectar riesgos, crear matriz, redactar o estimar.' },
        { t: 'Formato', d: 'Tabla, checklist, minuta, reporte ejecutivo, slide, correo, JSON o matriz de decision.' },
        { t: 'Criterio', d: 'Como se evalua la respuesta: precision, supuestos, fuentes, seguridad, trazabilidad.' },
      ]} />
    </>
  )
}

function RagAecSlide() {
  return (
    <>
      <Head eyebrow="RAG explicado" title="RAG: cuando la IA debe consultar antes de responder"
        lead="RAG significa recuperar informacion relevante de documentos antes de generar la respuesta. En AEC es vital para normas, contratos, especificaciones y expedientes." />
      <div className="rag-canvas up" style={st(1)}>
        {['Pregunta', 'Documentos', 'Fragmentos relevantes', 'Respuesta con fuente', 'Revision humana'].map((t, i) => (
          <div className="rag-step" key={t} style={st(i + 1)}><span>{i + 1}</span><b>{t}</b></div>
        ))}
      </div>
      <Plain>Si la respuesta afecta costo, plazo, seguridad, contrato o diseno, la IA debe trabajar con fuentes y dejar trazabilidad.</Plain>
    </>
  )
}

function ConceptVideoLabSlide() {
  const demos = [
    { k: 'LLM', t: 'Predice el siguiente token', d: 'Necesita contexto y validacion, porque coherencia no es verdad.', steps: ['prompt', 'tokens', 'patrones', 'respuesta'] },
    { k: 'RAG', t: 'Consulta documentos', d: 'Usa fuentes para responder sobre normas, contratos o expedientes.', steps: ['pregunta', 'busqueda', 'fuente', 'respuesta'] },
    { k: 'Agente', t: 'Planifica y actua', d: 'Ejecuta pasos con herramientas, permisos y control humano.', steps: ['objetivo', 'plan', 'accion', 'control'] },
  ]
  return (
    <>
      <Head eyebrow="Animaciones conceptuales" title="Tres loops para entender la IA en segundos"
        lead="Esta slide funciona como puente visual: explica la diferencia entre responder, consultar y ejecutar." />
      <div className="video-lab up" style={st(1)}>
        {demos.map((v, i) => (
          <div className="motion-card" key={v.k} style={st(i + 1)}>
            <div className="motion-screen" data-kind={v.k.toLowerCase()}>
              <span className="rec-dot" />
              <span className="play-triangle" />
              <div className="motion-track">{v.steps.map((s) => <b key={s}>{s}</b>)}</div>
            </div>
            <span className="motion-k">{v.k}</span>
            <h3>{v.t}</h3>
            <p>{v.d}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function ToolboardSlide() {
  return (
    <>
      <Head eyebrow="Herramientas" title={W.toolboard.title} lead={W.toolboard.note} />
      <ToolBoard cats={W.toolboard.cats} />
      <SourceNote>{W.toolboard.source}</SourceNote>
    </>
  )
}

function ModelSelectionSlide() {
  return (
    <>
      <Head eyebrow="Criterio de seleccion" title="Como elegir herramienta sin caer en fanatismo de marca"
        lead="La herramienta correcta depende de la tarea. Este criterio ayuda a decidir rapido en una oficina tecnica, empresa o equipo de proyecto." />
      <SignalGrid items={[
        { k: 'texto', t: 'Redaccion y sintesis', d: 'Prioriza claridad, estilo, contexto largo y capacidad de editar iterativamente.' },
        { k: 'datos', t: 'Analisis y tablas', d: 'Prioriza herramientas con archivos, codigo, hojas de calculo y verificacion.' },
        { k: 'fuentes', t: 'Busqueda y documentos', d: 'Prioriza RAG, citas, trazabilidad y control de versiones.' },
        { k: 'accion', t: 'Automatizacion', d: 'Prioriza integraciones, permisos, logs, pruebas y humano en el loop.' },
      ]} />
    </>
  )
}

function PricingSlide() {
  return (
    <>
      <Head eyebrow="Economia del usuario" title={W.pricing.title} lead={W.pricing.note} />
      <PricingTiers tiers={W.pricing.tiers} />
      <SourceNote>{W.pricing.source}</SourceNote>
    </>
  )
}

function ProductivityPersonalSlide() {
  return (
    <>
      <Head eyebrow="Trabajo individual" title={W.productivityByArea.title}
        lead="La IA crea ventaja cuando reduce tiempo, eleva calidad o permite tareas que antes no se hacian por falta de capacidad." />
      <div className="up" style={st(1)}><Figure fig={W.productivityByArea as Fig} height={300} /></div>
      <Plain>{W.productivityByArea.plain}</Plain>
    </>
  )
}

function JobsSlide() {
  return (
    <>
      <Head eyebrow="Empleo y habilidades" title={W.jobsBalance.title}
        lead="El debate no debe simplificarse a reemplazo. El WEF proyecta destruccion y creacion simultanea; el diferencial esta en recualificacion." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={W.jobsBalance as Fig} height={300} />
        <Insights items={[
          <><b>+170 M</b> empleos nuevos al 2030.</>,
          <><b>-92 M</b> roles desplazados por transformaciones tecnologicas y economicas.</>,
          <><b>+78 M</b> saldo neto, pero con nuevas habilidades requeridas.</>,
          <>La habilidad critica: <b>aprender a trabajar con IA, datos y criterio humano.</b></>,
        ]} />
      </div>
      <SourceNote>World Economic Forum, Future of Jobs Report 2025.</SourceNote>
    </>
  )
}

function MarketSlide() {
  return (
    <>
      <Head eyebrow="Mercado" title={W.market.title}
        lead="El mercado de IA se multiplica porque la tecnologia deja de ser producto aislado y se integra en software, hardware, servicios, educacion y procesos empresariales." />
      <div className="up" style={st(1)}><Figure fig={W.market as Fig} height={340} /></div>
    </>
  )
}

function CapitalSignalSlide() {
  const layers = [
    { t: 'Infraestructura', d: 'chips, data centers, nube, energia y computo local.' },
    { t: 'Modelos', d: 'GPT, Claude, Gemini y modelos abiertos con capacidades crecientes.' },
    { t: 'Herramientas', d: 'copilotos, agentes, busqueda, productividad y automatizacion.' },
    { t: 'Workflows AEC', d: 'la ultima milla: procesos especificos, auditables y medibles.' },
  ]
  return (
    <>
      <Head eyebrow="Resultado clave" title="La oportunidad AEC esta en la ultima milla"
        lead="El capital global construye la capacidad general. La ventaja competitiva aparece cuando esa capacidad se traduce en procesos de arquitectura, ingenieria y construccion." />
      <div className="capital-stack up" style={st(1)}>
        {layers.map((l, i) => (
          <div className="capital-layer" key={l.t} style={st(i + 1)}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{l.t}</h3>
            <p>{l.d}</p>
          </div>
        ))}
      </div>
      <PresenterNote>Remate: el mundo esta pagando la autopista. El profesional AEC debe aprender a manejar, medir y dejar evidencia.</PresenterNote>
    </>
  )
}

function EniaSlide() {
  return (
    <>
      <Head eyebrow="Politica publica" title="ENIA 2026-2030: la IA ya es agenda de pais"
        lead="La propuesta de Estrategia Nacional de Inteligencia Artificial de Peru plantea fortalecer el ecosistema nacional para impulsar innovacion, talento, colaboracion, productividad y competitividad con derechos, privacidad y seguridad." />
      <div className="policy-board up" style={st(1)}>
        {[
          ['Talento', 'Formar capacidades humanas para usar y desarrollar IA.'],
          ['Innovacion', 'Acelerar soluciones en sectores productivos y servicios publicos.'],
          ['Colaboracion', 'Conectar Estado, empresa, academia y sociedad civil.'],
          ['Seguridad', 'Resguardar derechos humanos, privacidad, datos y confianza.'],
          ['Productividad', 'Usar IA como palanca de competitividad nacional.'],
        ].map(([t, d], i) => <article key={t} style={st(i + 1)}><span>{String(i + 1)}</span><h3>{t}</h3><p>{d}</p></article>)}
      </div>
      <SourceNote>PCM Peru, Propuesta de la Estrategia Nacional de Inteligencia Artificial 2026-2030.</SourceNote>
    </>
  )
}

function LatamOpportunitySlide() {
  return (
    <>
      <Head eyebrow="Lectura LATAM" title="La decision regional: consumidores de IA o constructores de ventaja"
        lead="Latinoamerica no compite solo por modelos frontera. Puede competir por adopcion inteligente, datos sectoriales, skills verificables y automatizacion aplicada a problemas reales." />
      <ProcessFlow items={[
        { t: 'Consumir', d: 'Usar herramientas globales sin adaptar procesos ni capturar datos propios.' },
        { t: 'Aplicar', d: 'Mejorar tareas individuales: escribir, resumir, buscar, crear, analizar.' },
        { t: 'Sistematizar', d: 'Convertir casos repetibles en workflows con controles, responsables y metricas.' },
        { t: 'Especializar', d: 'Construir datasets, asistentes y agentes para nichos: AEC, BIM, obra, costos, legal.' },
      ]} />
    </>
  )
}

function AecSectionSlide() {
  return <SectionSlide eyebrow="AEC · punto de inflexion" title="Ahora si: que significa todo esto para arquitectura, ingenieria y construccion" lead="La IA no llega a AEC como moda. Llega a un sector con sobrecostos, retrasos, datos fragmentados, baja productividad y fuerte presion por talento." chips={['productividad', 'datos', 'BIM', 'obra', 'evidencia']} />
}

function AecGapSlide() {
  return (
    <>
      <Head eyebrow="Brecha AEC" title={W.aecGap.title}
        lead="AEC tiene una exposicion alta a IA en tareas tecnicas, pero uso real desigual. Esa distancia es la oportunidad de formacion, consultoria y producto." />
      <div className="up" style={st(1)}><Figure fig={W.aecGap as Fig} height={320} /></div>
    </>
  )
}

function ProductivitySlide() {
  return (
    <>
      <Head eyebrow="Premio economico" title="La IA puede acelerar la productividad del sector"
        lead="La construccion crece lento en productividad. La IA no arregla todo, pero puede acelerar tareas informacionales que hoy consumen horas invisibles." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={W.productivity as Fig} height={300} />
        <Insights items={[
          <>El valor no esta en automatizar una obra completa, sino en <b>reducir friccion informacional</b>.</>,
          <>Cada minuto perdido buscando versiones, actas o supuestos es una oportunidad para asistentes IA.</>,
          <>El impacto se mide por tiempo, calidad, retrabajo, decision y evidencia.</>,
        ]} />
      </div>
    </>
  )
}

function AecStateSlide() {
  const s = W.aecState
  return (
    <>
      <Head eyebrow="Madurez del sector" title={s.title}
        lead="La adopcion no es uniforme: oficinas digitales avanzan mas rapido; obra, pymes y procesos fragmentados quedan atras." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={s.chart as Fig} height={300} />
        <div className="grid stat-col">{s.stats.map((it: any, i: number) => <StatCard key={i} {...it} />)}</div>
      </div>
    </>
  )
}

function AecLaborSlide() {
  const a = W.aecLabor
  return (
    <>
      <Head eyebrow="Urgencia laboral" title={a.title} lead={a.lead} />
      <div className="grid g2 keep stat-grid up" style={st(1)}>
        {a.stats.map((s: any, i: number) => <StatCard key={i} {...s} />)}
      </div>
      <Plain>{a.note}</Plain>
      <SourceNote>{a.source}</SourceNote>
    </>
  )
}

function EmergingSlide() {
  return (
    <>
      <Head eyebrow="Stack AEC" title={W.emerging.title}
        lead="BIM y nube crean la base. IA, vision por computadora, gemelos digitales y agentes se construyen encima de esa madurez previa." />
      <div className="up" style={st(1)}><Figure fig={W.emerging as Fig} height={340} /></div>
    </>
  )
}

function DataJourneySlide() {
  return (
    <>
      <Head eyebrow="Datos AEC" title="La materia prima ya existe: esta escondida en documentos, fotos y modelos"
        lead="Antes de pensar en agentes, el sector debe ordenar su dato operativo: que se produjo, quien lo valido, donde vive y como se consulta." />
      <div className="data-river up" style={st(1)}>
        {['Planos', 'Modelos BIM', 'Actas', 'RFIs', 'Fotos', 'Presupuestos', 'Cronogramas', 'Reportes'].map((x, i) => <span key={x} style={st(i)}>{x}</span>)}
      </div>
      <div className="slide-two up" style={st(2)}>
        <Figure fig={W.dataBottleneck as Fig} height={260} />
        <Insights items={[
          <>La IA escala si hay <b>versiones, estructura, permisos y trazabilidad</b>.</>,
          <>Un PDF sin metadata sirve poco; un expediente conectado sirve como memoria del proyecto.</>,
          <>Primero se organiza la evidencia. Luego se automatiza.</>,
        ]} />
      </div>
    </>
  )
}

function AecUseCaseMapSlide() {
  const areas = [
    ['Diseno', 'conceptos, referencias, criterios, narrativa, opciones'],
    ['Ingenieria', 'revision tecnica, calculos auxiliares, normas, reportes'],
    ['Costos', 'metrados, comparativos, supuestos, sensibilidad'],
    ['Planificacion', 'riesgos, secuencias, restricciones, lookahead'],
    ['Obra', 'fotos, avance, seguridad, calidad, incidencias'],
    ['Comercial', 'propuestas, presentaciones, memoria de oportunidades'],
  ]
  return (
    <>
      <Head eyebrow="Mapa de aplicacion" title="Donde entra la IA en el ciclo AEC"
        lead="La IA no es una sola herramienta. Es una capa que puede asistir tareas repetitivas, comparativas, documentales, creativas y analiticas en cada fase del proyecto." />
      <div className="usecase-grid up" style={st(1)}>
        {areas.map(([t, d], i) => <article key={t} style={st(i + 1)}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></article>)}
      </div>
    </>
  )
}

function WorkflowDocsSlide() {
  return (
    <>
      <Head eyebrow="Workflow 01" title="Asistentes con documentos: actas, RFIs, contratos y especificaciones"
        lead="El primer salto de valor suele estar en documentos. El asistente no reemplaza al especialista; le devuelve tiempo y memoria operativa." />
      <ProcessFlow items={[
        { t: 'Cargar', d: 'Subir actas, contrato, especificaciones o expediente controlado.' },
        { t: 'Preguntar', d: 'Consultar obligaciones, pendientes, riesgos, contradicciones o resumen ejecutivo.' },
        { t: 'Citar', d: 'Exigir fuente, pagina, parrafo, version y nivel de confianza.' },
        { t: 'Convertir', d: 'Transformar hallazgos en matriz, minuta, correo, checklist o tablero.' },
        { t: 'Validar', d: 'El responsable tecnico aprueba, corrige o descarta antes de ejecutar.' },
      ]} />
    </>
  )
}

function WorkflowCostsSlide() {
  return (
    <>
      <Head eyebrow="Workflow 02" title="Costos y presupuestos: de tabla muerta a analisis de supuestos"
        lead="La IA ayuda a explicar variaciones, detectar partidas raras, crear comparativos y preparar argumentos. No reemplaza la responsabilidad del presupuesto." />
      <SignalGrid items={[
        { k: '01', t: 'Comparar', d: 'Comparar proveedores, partidas, ratios y supuestos de alcance.' },
        { k: '02', t: 'Explicar', d: 'Convertir diferencias en narrativa ejecutiva: que subio, por que y que riesgo implica.' },
        { k: '03', t: 'Simular', d: 'Probar escenarios de costo, plazo, productividad y sensibilidad.' },
        { k: '04', t: 'Auditar', d: 'Buscar inconsistencias, duplicidades, unidades y partidas sin respaldo.' },
      ]} />
    </>
  )
}

function WorkflowBimSlide() {
  return (
    <>
      <Head eyebrow="Workflow 03" title="BIM + IA: del modelo como archivo al modelo como interfaz de decision"
        lead="El modelo BIM gana valor cuando se conecta a preguntas, documentos, costos, cronograma y reglas de revision." />
      <div className="bim-orbit up" style={st(1)}>
        {['Modelo', 'Parametros', 'Normas', 'Costos', 'Cronograma', 'RFIs', 'IA'].map((x, i) => <span key={x} style={st(i)}>{x}</span>)}
      </div>
      <Plain>Ejemplo: pedirle al asistente que identifique elementos sin parametro critico, compare cambios de version y genere una lista de revision para el coordinador BIM.</Plain>
    </>
  )
}

function WorkflowSiteSlide() {
  return (
    <>
      <Head eyebrow="Workflow 04" title="Obra visual: fotos, avance, calidad y seguridad"
        lead="La obra ya produce evidencia visual cada dia. La IA ayuda a ordenar, comparar y detectar patrones, siempre con validacion de campo." />
      <SignalGrid items={[
        { k: 'foto', t: 'Registro inteligente', d: 'Clasificar fotos por zona, fecha, frente, especialidad e incidencia.' },
        { k: 'avance', t: 'Comparacion temporal', d: 'Contrastar avance semanal contra plan, lookahead o modelo.' },
        { k: 'calidad', t: 'Checklist visual', d: 'Identificar hallazgos preliminares para inspeccion humana.' },
        { k: 'seguridad', t: 'Alertas tempranas', d: 'Detectar condiciones de riesgo y priorizar supervision.' },
      ]} />
    </>
  )
}

function HumanInLoopSlide() {
  return (
    <>
      <Head eyebrow="Responsabilidad" title="Human-in-the-loop: la IA propone, el profesional responde"
        lead="En AEC hay impacto tecnico, legal, contractual y de seguridad. Por eso la IA debe operar con aprobaciones, criterios y registro." />
      <div className="hil-loop up" style={st(1)}>
        {['IA propone', 'Profesional revisa', 'Fuente se verifica', 'Decision se registra', 'Proceso mejora'].map((x, i) => <span key={x} style={st(i)}>{x}</span>)}
      </div>
      <PresenterNote>Mensaje clave: usar IA no elimina responsabilidad; la vuelve mas visible porque ahora podemos exigir evidencia y trazabilidad.</PresenterNote>
    </>
  )
}

function RiskRubricSlide() {
  return (
    <>
      <Head eyebrow="Gobernanza simple" title="Cinco preguntas antes de usar IA en una tarea profesional"
        lead="No se necesita burocracia para empezar con criterio. Se necesita una rubrica minima que diga que datos entran, que sale y quien valida." />
      <SignalGrid items={[
        { k: 'datos', t: 'Puedo subir esta informacion?', d: 'Revisa privacidad, contrato, cliente, permisos y sensibilidad.' },
        { k: 'fuente', t: 'La respuesta tiene respaldo?', d: 'Exige citas, documentos, version y fecha.' },
        { k: 'riesgo', t: 'Que pasa si falla?', d: 'Clasifica impacto en costo, plazo, seguridad, reputacion o legal.' },
        { k: 'humano', t: 'Quien aprueba?', d: 'Define responsable tecnico, comercial o gerencial.' },
        { k: 'log', t: 'Queda evidencia?', d: 'Guarda input, output, decision, cambios y aprendizaje.' },
      ]} />
    </>
  )
}

const BARRIERS: Fig = {
  id: 'ai-barriers', type: 'bars', status: 'mixed',
  title: 'Lo que frena la adopcion de IA',
  source: 'Sintesis McKinsey State of AI 2025 · RICS 2025 · observacion AECODE.',
  note: 'Importancia relativa. El acceso al modelo ya no es el problema principal.',
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
      <Head eyebrow="El freno real" title="La barrera principal no es la tecnologia: es el criterio"
        lead="Acceder a modelos potentes ya no es dificil. Lo dificil es definir problema, contexto, validacion, datos y responsabilidad." />
      <div className="up" style={st(1)}><Figure fig={BARRIERS} height={310} /></div>
    </>
  )
}

function SkillsSlide() {
  return (
    <>
      <Head eyebrow="IA como habilidad" title={W.skills.title}
        lead="El profesional AI-first no es quien sabe mas nombres de apps. Es quien combina criterio tecnico, datos, comunicacion, automatizacion y validacion." />
      <div className="up" style={st(1)}><Figure fig={W.skills as Fig} height={340} /></div>
    </>
  )
}

function MaturityModelSlide() {
  return (
    <>
      <Head eyebrow="Madurez AECODE" title="Cinco niveles para medir adopcion de IA en un profesional AEC"
        lead="Un mapa sencillo permite diagnosticar donde esta una persona o equipo y que evidencia debe producir para avanzar." />
      <div className="maturity up" style={st(1)}>
        {[
          ['0', 'No usa', 'Curiosidad, miedo o desconocimiento.'],
          ['1', 'Prueba', 'Usa chatbots para tareas sueltas.'],
          ['2', 'Produce', 'Crea documentos, matrices, imagenes o analisis.'],
          ['3', 'Integra', 'Trabaja con documentos, datos, BIM y flujos repetibles.'],
          ['4', 'Automatiza', 'Disena agentes, logs, dashboards y aprobaciones.'],
        ].map(([n, t, d], i) => <article key={n} style={st(i + 1)}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
      </div>
    </>
  )
}

function SkillPassportSlide() {
  return (
    <>
      <Head eyebrow="AECODE Light" title="La IA como skill verificable: aprender, practicar, evidenciar"
        lead="El valor educativo de AECODE no es consumir contenido. Es demostrar habilidad aplicada con evidencia, rubrica y feedback." />
      <ProcessFlow items={[
        { t: 'Diagnostico', d: 'Punto de partida: uso, barreras, herramientas, rol y madurez.' },
        { t: 'Capsula', d: 'Concepto corto, demo clara y criterio profesional.' },
        { t: 'Practica', d: 'Tarea aplicada a un caso AEC realista.' },
        { t: 'Evidencia', d: 'Entregable: one page, matriz, asistente, dashboard o workflow.' },
        { t: 'Validacion', d: 'Rubrica + feedback + certificado + Skill Passport.' },
      ]} />
    </>
  )
}

function SurveyRadarSlide() {
  const m = (survey as any).method ?? { population: 'profesionales AEC LATAM', sampling: 'muestra autoseleccionada', target: '+1.000 respuestas', approach: 'exploratorio descriptivo', field: '2026' }
  return (
    <>
      <Head eyebrow="Radar AECODE 2026" title="La masterclass tambien puede alimentar investigacion exploratoria"
        lead="La muestra no representa a todo el mercado AEC LATAM. Si se delimita bien, puede publicarse como radar de adopcion en la comunidad AECODE interesada en IA." />
      <div className="next-phase up" style={st(1)}>
        <span className="next-tag">Investigacion primaria · no diagnostico de mercado completo</span>
        <div className="next-grid">
          <div className="next-step"><span className="ns-n">1</span><span className="ns-t">Antes</span><span className="ns-d">Perfil, uso actual, barreras, herramientas y expectativas.</span></div>
          <div className="next-step"><span className="ns-n">2</span><span className="ns-t">Durante</span><span className="ns-d">Participacion, respuestas, dudas, dinamicas y evidencia creada.</span></div>
          <div className="next-step"><span className="ns-n">3</span><span className="ns-t">Despues</span><span className="ns-d">Autopercepcion, continuidad, conversion y senales B2B.</span></div>
        </div>
        <p className="next-foot"><b>Ficha:</b> {m.population} · {m.sampling} · meta {m.target} · {m.approach} · {m.field}.</p>
      </div>
    </>
  )
}

function ResearchQuestionsSlide() {
  return (
    <>
      <Head eyebrow="Preguntas de investigacion" title="Que queremos medir durante el reto"
        lead="Las preguntas deben servir para aprender y para decidir: contenido, producto, ventas, comunidad, empresas y proxima oferta." />
      <div className="question-grid up" style={st(1)}>
        {[
          ['Uso', 'Que herramientas usa y para que tareas?'],
          ['Madurez', 'Puede crear una evidencia util sin asistencia excesiva?'],
          ['Barreras', 'Que lo frena: datos, privacidad, tiempo, confianza o apoyo de empresa?'],
          ['Valor', 'Que tarea AEC percibe como mas automatizable?'],
          ['Continuidad', 'Prefiere comunidad, programa, mentorias o recursos asincronicos?'],
          ['B2B', 'Aparecen decisores, equipos, sponsors o empresas interesadas?'],
        ].map(([t, d], i) => <article key={t} style={st(i + 1)}><h3>{t}</h3><p>{d}</p></article>)}
      </div>
    </>
  )
}

function ActionSlide() {
  return (
    <>
      <Head eyebrow="Que hacer ahora" title="Cuatro jugadas para no quedarse en espectadores"
        lead="El cierre debe convertir el entendimiento en accion: pilotos pequenos, datos ordenados, habilidades verificables y procesos con evidencia." />
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

function SummitBridgeSlide() {
  return (
    <>
      <Head eyebrow="AI Construction Summit" title="El siguiente paso: pasar de aprender IA a construir criterio sectorial"
        lead="El Summit conecta vision, casos, tecnologia, empresas, comunidad y oportunidades. El reto prepara el lenguaje; el Summit profundiza la transformacion." />
      <div className="summit-bridge up" style={st(1)}>
        <div><span>01</span><h3>Reto IA 3 Dias</h3><p>Fundamentos, asistentes, agentes, evidencias y comunidad.</p></div>
        <div><span>02</span><h3>Radar AECODE</h3><p>Data exploratoria sobre adopcion, barreras y oportunidades en AEC.</p></div>
        <div><span>03</span><h3>AI Construction Summit</h3><p>Vision regional, sponsors, casos empresariales y continuidad profesional.</p></div>
      </div>
    </>
  )
}

function TakeawaysSlide() {
  return (
    <>
      <Head eyebrow="Diez ideas para recordar" title="La IA no se domina por entusiasmo: se domina por criterio"
        lead="Si el publico recuerda estas ideas, la masterclass cumplio su funcion." />
      <div className="takeaways up" style={st(1)}>
        {[
          'No hay mejor modelo universal; hay mejor modelo para una tarea.',
          'La IA generativa crea; la predictiva estima; la agentica ejecuta pasos.',
          'El prompt profesional es una especificacion de trabajo.',
          'Razonar mas no garantiza verdad: siempre valida.',
          'Sin datos organizados, no hay IA escalable.',
          'AEC tiene alta exposicion y baja adopcion: oportunidad clara.',
          'La obra necesita evidencia, no solo texto bonito.',
          'El humano sigue siendo responsable del criterio tecnico.',
          'La ventaja aparece al convertir IA en workflow.',
          'La habilidad debe practicarse, evidenciarse y certificarse.',
        ].map((t, i) => <span key={t} style={st(i + 1)}>{String(i + 1).padStart(2, '0')} · {t}</span>)}
      </div>
    </>
  )
}

type KnowledgeCard = {
  id: string
  group: string
  title: string
  lead: string
  concept: string
  compare: string
  aec: string
  tip: string
  tags: string[]
  mode?: 'map' | 'compare' | 'lab' | 'risk'
}

const KNOWLEDGE: KnowledgeCard[] = [
  {
    id: 'capas-ia',
    group: 'Fundamentos',
    title: 'Capas de la inteligencia artificial',
    lead: 'IA no es una sola tecnología: es una familia de métodos que aprenden, predicen, generan y ejecutan tareas.',
    concept: 'IA es el paraguas. Machine learning aprende patrones desde datos. Deep learning usa redes neuronales profundas. IA generativa produce texto, imagen, audio, código o video a partir de patrones aprendidos.',
    compare: 'Regla simple: si el sistema sigue reglas fijas, es automatización clásica; si aprende de datos, entra en ML; si crea contenido nuevo, hablamos de IA generativa.',
    aec: 'En AEC, estas capas aparecen en estimación de costos, revisión documental, detección visual en obra, generación de informes, planificación y asistentes técnicos.',
    tip: 'Antes de elegir herramienta, nombra la tarea: clasificar, predecir, generar, buscar, comparar o ejecutar. Esa palabra define el tipo de IA que necesitas.',
    tags: ['IA', 'ML', 'Deep Learning', 'GenAI'],
    mode: 'map',
  },
  {
    id: 'generativa-predictiva-agentica',
    group: 'Fundamentos',
    title: 'IA generativa, predictiva y agéntica',
    lead: 'Tres usos distintos que suelen mezclarse en conversaciones comerciales, pero resuelven problemas diferentes.',
    concept: 'La IA generativa crea contenido; la predictiva estima probabilidades o resultados futuros; la agéntica coordina pasos, herramientas y decisiones para completar un flujo.',
    compare: 'Generativa: redacta un informe. Predictiva: estima riesgo de retraso. Agéntica: revisa documentos, consulta datos, genera hallazgos y prepara una respuesta trazable.',
    aec: 'Un proyecto maduro puede usar las tres: generar actas, predecir desviaciones y automatizar seguimiento de RFIs o restricciones.',
    tip: 'No vendas todo como “agente”. Si solo responde texto, es asistente; si toma pasos con herramientas y control, empieza a ser agente.',
    tags: ['Generativa', 'Predictiva', 'Agentes', 'Workflow'],
    mode: 'compare',
  },
  {
    id: 'modelo',
    group: 'Fundamentos',
    title: 'Qué es un modelo de IA',
    lead: 'Un modelo no es una base de datos ni una persona: es un sistema estadístico entrenado para transformar entradas en salidas útiles.',
    concept: 'Durante el entrenamiento, el modelo ajusta millones o billones de parámetros para reconocer patrones. En uso, recibe una entrada y genera una salida probable según contexto, instrucciones y datos disponibles.',
    compare: 'Un buscador recupera páginas existentes. Un modelo generativo compone una respuesta nueva. Por eso puede sonar convincente incluso cuando se equivoca.',
    aec: 'Cuando pides revisar una especificación técnica, el modelo no “sabe” tu contrato completo salvo que le entregues contexto verificable.',
    tip: 'Trata al modelo como analista junior muy rápido: útil para acelerar, pero siempre necesita contexto, criterios y revisión profesional.',
    tags: ['Modelo', 'Parámetros', 'Inferencia', 'Contexto'],
    mode: 'map',
  },
  {
    id: 'tokens-contexto',
    group: 'Fundamentos',
    title: 'Tokens y ventana de contexto',
    lead: 'La IA no lee como una persona: divide el contenido en fragmentos llamados tokens y trabaja dentro de una ventana limitada.',
    concept: 'Un token puede ser una palabra corta, parte de una palabra o signo. La ventana de contexto define cuánto texto puede considerar el modelo en una conversación o tarea.',
    compare: 'Más ventana permite cargar más información, pero no garantiza mejor razonamiento. Documentos largos mal organizados producen respuestas largas y poco confiables.',
    aec: 'Para contratos, expedientes o memorias BIM, conviene separar por secciones, fechas, disciplina, versión y objetivo de revisión.',
    tip: 'Cuando cargues documentos extensos, pide primero índice, supuestos y zonas de incertidumbre. Luego recién pide conclusiones.',
    tags: ['Tokens', 'Contexto', 'Documentos', 'Precisión'],
    mode: 'lab',
  },
  {
    id: 'embeddings',
    group: 'Fundamentos',
    title: 'Embeddings: convertir significado en coordenadas',
    lead: 'Los embeddings permiten que la IA compare ideas por significado, no solo por palabras exactas.',
    concept: 'Un embedding transforma texto, imágenes o datos en vectores numéricos. Si dos fragmentos tienen significado parecido, quedan cerca en ese espacio.',
    compare: 'Búsqueda tradicional: encuentra “concreto”. Búsqueda semántica: también encuentra “hormigón”, “resistencia f’c” o “mezcla estructural” si el contexto coincide.',
    aec: 'Sirve para encontrar cláusulas similares, detalles técnicos repetidos, riesgos en memorias o consultas históricas de proyectos.',
    tip: 'La búsqueda semántica mejora si el documento está limpio, con títulos claros, unidades, metadatos y secciones bien separadas.',
    tags: ['Embeddings', 'Búsqueda semántica', 'Vector', 'RAG'],
    mode: 'map',
  },
  {
    id: 'rag',
    group: 'Documentos',
    title: 'RAG: responder con documentos propios',
    lead: 'RAG conecta un modelo generativo con fuentes internas para reducir respuestas inventadas y mejorar trazabilidad.',
    concept: 'El sistema busca fragmentos relevantes en una base documental y se los entrega al modelo como contexto para responder.',
    compare: 'Chat libre: responde desde entrenamiento general. RAG: responde con base en tus expedientes, normas, actas, contratos o lecciones aprendidas.',
    aec: 'Permite asistentes para especificaciones, RFIs, submittals, contratos, procedimientos de calidad y manuales internos.',
    tip: 'Un buen RAG depende más de curaduría documental que de magia del modelo: naming, versión, fuente, fecha y permisos importan.',
    tags: ['RAG', 'Fuentes', 'Trazabilidad', 'Contratos'],
    mode: 'lab',
  },
  {
    id: 'fine-tuning',
    group: 'Documentos',
    title: 'Fine-tuning: ajustar comportamiento, no memorizar todo',
    lead: 'El fine-tuning sirve para especializar estilo, formato o patrones de respuesta, pero no reemplaza una base documental viva.',
    concept: 'Consiste en entrenar adicionalmente un modelo con ejemplos para que responda de una forma más consistente.',
    compare: 'RAG es mejor para conocimiento cambiante. Fine-tuning es mejor para tono, clasificación, formato repetible o decisiones con ejemplos estables.',
    aec: 'Puede ayudar a clasificar incidencias, etiquetar riesgos, normalizar reportes o producir formatos internos con consistencia.',
    tip: 'Si la información cambia cada semana, usa RAG. Si el patrón de respuesta es estable y repetitivo, evalúa fine-tuning.',
    tags: ['Fine-tuning', 'RAG', 'Clasificación', 'Formato'],
    mode: 'compare',
  },
  {
    id: 'prompt-spec',
    group: 'Prompting',
    title: 'El prompt profesional es una especificación de trabajo',
    lead: 'Prompting no es escribir bonito: es definir una tarea con contexto, criterio, formato y límites.',
    concept: 'Un buen prompt alinea rol, objetivo, insumos, pasos, restricciones, formato de salida y criterio de calidad.',
    compare: 'Prompt débil: “haz un informe”. Prompt fuerte: “actúa como coordinador BIM, revisa estas observaciones, clasifica por disciplina, riesgo y acción sugerida”.',
    aec: 'Funciona para actas, minutas, matrices de riesgos, comparativos de propuestas, revisión de especificaciones y resúmenes ejecutivos.',
    tip: 'Usa esta fórmula: rol + contexto + tarea + datos + formato + criterio + validación.',
    tags: ['Prompt', 'Especificación', 'Formato', 'Criterio'],
    mode: 'lab',
  },
  {
    id: 'contexto',
    group: 'Prompting',
    title: 'Contexto útil: lo que la IA necesita para no adivinar',
    lead: 'La mayoría de errores no vienen de “mala IA”, sino de instrucciones incompletas y datos ambiguos.',
    concept: 'Contexto útil incluye propósito, audiencia, etapa del proyecto, disciplina, restricciones, fuentes, unidades y qué no debe asumir.',
    compare: 'Sin contexto, la IA optimiza una respuesta genérica. Con contexto, puede adaptar nivel técnico, formato, tono y prioridades.',
    aec: 'No es lo mismo un resumen para gerencia, una respuesta a supervisión, una matriz para obra o una revisión contractual.',
    tip: 'Agrega siempre: “si falta información, lista supuestos y preguntas antes de concluir”.',
    tags: ['Contexto', 'Supuestos', 'Audiencia', 'AEC'],
    mode: 'risk',
  },
  {
    id: 'salida-estructurada',
    group: 'Prompting',
    title: 'Salidas estructuradas: tablas, matrices y JSON',
    lead: 'La IA se vuelve más útil cuando produce resultados que pueden revisarse, copiarse, filtrarse o automatizarse.',
    concept: 'Una salida estructurada obliga al modelo a organizar hallazgos en campos: categoría, prioridad, evidencia, responsable, acción y fecha.',
    compare: 'Texto largo sirve para explicar. Tabla sirve para decidir. JSON sirve para integrar con sistemas o automatizaciones.',
    aec: 'Una revisión de planos puede salir como matriz de interferencias, matriz de riesgos o backlog de acciones por disciplina.',
    tip: 'Pide columnas exactas y ejemplos de una fila ideal. Eso reduce ambigüedad y acelera revisión.',
    tags: ['Tablas', 'JSON', 'Matriz', 'Automatización'],
    mode: 'lab',
  },
  {
    id: 'razonamiento',
    group: 'Razonamiento',
    title: 'IA rápida vs IA que razona más',
    lead: 'Algunas tareas necesitan velocidad; otras requieren análisis, comparación y verificación por pasos.',
    concept: 'Modelos de razonamiento dedican más cómputo a evaluar rutas antes de responder. Son útiles para problemas con restricciones o varias variables.',
    compare: 'Respuesta rápida: redactar un correo. Razonamiento más profundo: comparar alternativas contractuales, planificar un flujo o revisar riesgos.',
    aec: 'Úsalo para decisiones de coordinación, análisis de costos, claims, seguridad, planificación o revisión de supuestos técnicos.',
    tip: 'No pidas “piensa más” para todo. Pídelo cuando haya costo de error, múltiples criterios o decisión técnica.',
    tags: ['Razonamiento', 'Criterio', 'Decisión', 'Validación'],
    mode: 'compare',
  },
  {
    id: 'validacion',
    group: 'Razonamiento',
    title: 'Más razonamiento no significa más verdad',
    lead: 'Una respuesta larga y segura puede seguir siendo incorrecta si las fuentes, supuestos o cálculos están mal.',
    concept: 'La IA optimiza plausibilidad. La verdad técnica exige evidencia, contraste, cálculo, norma, fuente o revisión humana.',
    compare: 'El modelo puede explicar muy bien una premisa falsa. Por eso conviene pedir “qué evidencia usarías para verificar esto”.',
    aec: 'En contratos, estructuras, seguridad o costos, la responsabilidad no se delega al modelo.',
    tip: 'Checklist mínimo: fuente, versión, cálculo, norma, responsable y nivel de confianza.',
    tags: ['Verificación', 'Riesgo', 'Confianza', 'Human-in-the-loop'],
    mode: 'risk',
  },
  {
    id: 'chatgpt-claude-gemini',
    group: 'Herramientas',
    title: 'ChatGPT, Claude y Gemini: cuándo usar cada uno',
    lead: 'No existe una herramienta universal. La elección depende de documento, razonamiento, integración, multimedia y ecosistema.',
    concept: 'ChatGPT destaca por ecosistema, herramientas y amplitud. Claude suele ser fuerte en lectura larga y redacción. Gemini se integra muy bien con Google y capacidades multimodales.',
    compare: 'La pregunta correcta no es “cuál es mejor”, sino “cuál funciona mejor para esta tarea, con estos datos y este formato”.',
    aec: 'Prueba el mismo caso: acta, especificación, imagen, matriz de riesgos o resumen de reunión. Compara exactitud, estructura y utilidad.',
    tip: 'Crea una tabla de benchmark interna con 5 tareas reales y puntúa calidad, velocidad, costo, privacidad y facilidad de uso.',
    tags: ['ChatGPT', 'Claude', 'Gemini', 'Benchmark'],
    mode: 'compare',
  },
  {
    id: 'copilot-asistente-agente',
    group: 'Herramientas',
    title: 'Copiloto, asistente y agente',
    lead: 'Son niveles de autonomía diferentes; confundirlos lleva a expectativas falsas.',
    concept: 'Un copiloto ayuda mientras tú conduces. Un asistente responde o prepara insumos. Un agente ejecuta pasos con herramientas bajo reglas y supervisión.',
    compare: 'Copiloto: “ayúdame a redactar”. Asistente: “consulta estos documentos”. Agente: “monitorea carpetas, detecta cambios, crea resumen y pide aprobación”.',
    aec: 'La evolución natural es pasar de prompts aislados a asistentes documentales y luego a workflows con aprobación humana.',
    tip: 'Diseña primero el proceso. Luego decide qué parte es copiloto, qué parte asistente y qué parte puede automatizarse.',
    tags: ['Copiloto', 'Asistente', 'Agente', 'Autonomía'],
    mode: 'map',
  },
  {
    id: 'gpts-gems-projects',
    group: 'Herramientas',
    title: 'Asistentes personalizados: GPTs, Gems y proyectos',
    lead: 'La personalización convierte instrucciones repetidas en sistemas reutilizables.',
    concept: 'Un asistente personalizado combina instrucciones, archivos, tono, criterios y herramientas para una familia de tareas.',
    compare: 'Prompt suelto: útil una vez. Asistente: útil cada semana. Workflow: útil cuando conecta datos y acciones.',
    aec: 'Puedes crear asistentes para revisión de actas, respuestas RFI, checklists de calidad, control documental o preparación de clases.',
    tip: 'Documenta para cada asistente: propósito, usuarios, fuentes permitidas, límites, formato de salida y criterios de validación.',
    tags: ['GPTs', 'Gems', 'Projects', 'Reusable'],
    mode: 'lab',
  },
  {
    id: 'documentos-largos',
    group: 'Documentos',
    title: 'Cómo trabajar con documentos largos',
    lead: 'Cargar un PDF de 200 páginas no equivale a entenderlo. La estrategia documental importa.',
    concept: 'Divide por objetivo: índice, extracción, comparación, riesgos, resumen ejecutivo y preguntas pendientes.',
    compare: 'Mal uso: pedir “resúmelo todo”. Buen uso: pedir “extrae obligaciones, plazos, penalidades, dependencias y puntos ambiguos”.',
    aec: 'Aplica a contratos, expedientes técnicos, memorias descriptivas, especificaciones, bases de licitación y reportes de avance.',
    tip: 'Trabaja en rondas: mapa del documento, extracción por secciones, matriz, verificación y síntesis ejecutiva.',
    tags: ['PDF', 'Contratos', 'Extracción', 'Matriz'],
    mode: 'lab',
  },
  {
    id: 'actas-reuniones',
    group: 'Productividad',
    title: 'Actas de reunión aumentadas con IA',
    lead: 'La IA puede convertir conversaciones dispersas en decisiones, acuerdos, riesgos y próximos pasos.',
    concept: 'El valor no está en transcribir, sino en transformar la reunión en estructura accionable.',
    compare: 'Transcripción: dice lo que pasó. Acta inteligente: identifica decisiones, responsables, fechas, bloqueos y temas abiertos.',
    aec: 'Sirve para ICE sessions, coordinación BIM, reuniones de obra, comités técnicos y seguimiento de restricciones.',
    tip: 'Pide siempre cuatro salidas: acuerdos, pendientes, riesgos y preguntas para la siguiente reunión.',
    tags: ['Actas', 'Reuniones', 'Decisiones', 'Seguimiento'],
    mode: 'lab',
  },
  {
    id: 'imagenes-video',
    group: 'Multimodal',
    title: 'IA con imágenes, video y voz',
    lead: 'La IA ya no trabaja solo con texto: puede interpretar imágenes, escuchar audio y generar piezas multimedia.',
    concept: 'Los modelos multimodales conectan información visual, textual y sonora para describir, comparar o producir contenido.',
    compare: 'Texto: explica una observación. Imagen: muestra evidencia. Video: captura secuencia. Voz: acelera captura en campo.',
    aec: 'Puede apoyar reportes fotográficos, inspecciones preliminares, clips de avance, materiales de capacitación y documentación de obra.',
    tip: 'No uses una imagen como prueba final sin contexto: agrega fecha, ubicación, disciplina, responsable y criterio de revisión.',
    tags: ['Imagen', 'Video', 'Voz', 'Evidencia'],
    mode: 'map',
  },
  {
    id: 'datos-calidad',
    group: 'Datos',
    title: 'La IA escala cuando los datos tienen calidad',
    lead: 'La barrera no es solo saber usar prompts; es tener datos ordenados, confiables y accionables.',
    concept: 'Calidad de datos significa consistencia, completitud, trazabilidad, permisos, formato y actualización.',
    compare: 'Datos sucios producen automatizaciones frágiles. Datos bien gobernados producen asistentes útiles y reportes confiables.',
    aec: 'Nombres de archivos, versiones, códigos de partida, disciplinas, ubicaciones y responsables son la base de cualquier IA operativa.',
    tip: 'Empieza con una taxonomía mínima: proyecto, disciplina, fase, fecha, versión, tipo de documento y responsable.',
    tags: ['Datos', 'Gobernanza', 'Metadata', 'Escala'],
    mode: 'risk',
  },
  {
    id: 'privacidad',
    group: 'Datos',
    title: 'Privacidad y clasificación de información',
    lead: 'No todo documento debe entrar a cualquier modelo. La seguridad se diseña antes del entusiasmo.',
    concept: 'Clasifica información por sensibilidad: pública, interna, confidencial, contractual, personal o crítica.',
    compare: 'Un caso de marketing puede usar herramientas públicas. Un contrato sensible o datos personales requieren políticas y controles.',
    aec: 'Planos, metrados, propuestas, costos, reclamos, contratos y datos de trabajadores pueden tener restricciones legales o comerciales.',
    tip: 'Antes de usar IA, pregunta: ¿quién es dueño del dato?, ¿se puede compartir?, ¿queda registro?, ¿hay alternativa privada?',
    tags: ['Privacidad', 'Seguridad', 'Permisos', 'Compliance'],
    mode: 'risk',
  },
  {
    id: 'alucinaciones',
    group: 'Riesgo',
    title: 'Alucinaciones: cuando la IA inventa con seguridad',
    lead: 'Una alucinación no siempre suena absurda; muchas veces suena profesional.',
    concept: 'El modelo puede generar datos, citas, normas o conclusiones que parecen válidas pero no están sustentadas.',
    compare: 'El riesgo aumenta cuando falta contexto, se piden referencias exactas, se fuerza una respuesta o se trabaja con temas muy especializados.',
    aec: 'Una norma mal citada, una recomendación técnica inventada o una interpretación contractual falsa puede generar decisiones costosas.',
    tip: 'Pide: “marca cada afirmación como verificada, inferida o pendiente de fuente”.',
    tags: ['Alucinación', 'Fuentes', 'Normas', 'Riesgo'],
    mode: 'risk',
  },
  {
    id: 'rubrica-ia',
    group: 'Riesgo',
    title: 'Rúbrica rápida para evaluar una respuesta IA',
    lead: 'La calidad se puede evaluar con criterios simples antes de usar una respuesta en trabajo real.',
    concept: 'Evalúa precisión, trazabilidad, completitud, utilidad, formato, sesgos, riesgos y próximos pasos.',
    compare: 'Una respuesta bonita pero sin fuentes no es evidencia. Una respuesta breve con fuentes, supuestos y acciones puede ser más valiosa.',
    aec: 'Úsala para informes, actas, revisiones documentales, propuestas, comunicaciones y análisis de riesgos.',
    tip: 'Puntúa cada salida de 1 a 5 y agrega una columna: “qué debe validar un humano antes de enviar”.',
    tags: ['Rúbrica', 'Calidad', 'Validación', 'Evidencia'],
    mode: 'lab',
  },
  {
    id: 'human-loop',
    group: 'Riesgo',
    title: 'Human-in-the-loop: el humano como control de calidad',
    lead: 'La IA acelera, pero el criterio profesional define qué se acepta, corrige o descarta.',
    concept: 'Human-in-the-loop significa que una persona revisa decisiones, valida evidencia y asume responsabilidad antes de actuar.',
    compare: 'Automatizar sin control puede amplificar errores. Automatizar con revisión reduce tiempo sin perder responsabilidad técnica.',
    aec: 'En seguridad, costos, contratos, diseño y obra, la aprobación humana es parte del sistema, no un trámite.',
    tip: 'Define umbrales: qué puede salir automático, qué requiere revisión y qué nunca debe decidir la IA sola.',
    tags: ['Control', 'Responsabilidad', 'Aprobación', 'Criterio'],
    mode: 'risk',
  },
  {
    id: 'coste-latencia',
    group: 'Operación',
    title: 'Costo, latencia y calidad: el triángulo operativo',
    lead: 'El mejor sistema no siempre usa el modelo más caro ni el más avanzado.',
    concept: 'Cada tarea tiene un balance entre costo por uso, velocidad de respuesta, precisión necesaria y riesgo de error.',
    compare: 'Modelo pequeño: barato y rápido. Modelo avanzado: mejor para tareas complejas. Pipeline híbrido: clasifica barato y razona solo cuando importa.',
    aec: 'Un asistente para miles de consultas internas debe optimizar costo; un análisis contractual crítico puede justificar mayor cómputo.',
    tip: 'Diseña niveles: rápido para borradores, avanzado para análisis, humano para aprobación.',
    tags: ['Costo', 'Latencia', 'Calidad', 'Escalabilidad'],
    mode: 'compare',
  },
  {
    id: 'automatizacion',
    group: 'Automatización',
    title: 'Automatización con IA: de tarea a flujo',
    lead: 'El salto real ocurre cuando la IA deja de ser conversación y se integra al proceso.',
    concept: 'Un workflow conecta disparadores, datos, modelo, validación, salida y registro.',
    compare: 'Prompt manual: una persona copia y pega. Automatización: llega un documento, se analiza, se clasifica y se envía a revisión.',
    aec: 'Casos típicos: resumen de actas, clasificación de RFIs, alertas de avance, seguimiento de restricciones o reportes semanales.',
    tip: 'Dibuja el proceso antes de automatizar: entrada, responsable, regla, excepción, salida y evidencia.',
    tags: ['Workflow', 'n8n', 'Make', 'Power Automate'],
    mode: 'map',
  },
  {
    id: 'agentes',
    group: 'Automatización',
    title: 'Agentes IA: autonomía con límites',
    lead: 'Un agente no es una IA “libre”: es un sistema con objetivo, herramientas, memoria y reglas.',
    concept: 'Los agentes pueden planificar pasos, usar APIs, consultar documentos y pedir aprobación cuando corresponde.',
    compare: 'Asistente: responde. Agente: ejecuta. Sistema agéntico serio: ejecuta con permisos, logs, límites y fallback.',
    aec: 'Un agente puede revisar una carpeta de proyecto, detectar documentos nuevos, generar resumen y preparar tareas para el equipo.',
    tip: 'Nunca empieces con agente autónomo total. Empieza con agente asistido y aprobación humana.',
    tags: ['Agentes', 'Herramientas', 'Memoria', 'Aprobación'],
    mode: 'risk',
  },
  {
    id: 'mcp-api',
    group: 'Automatización',
    title: 'APIs, conectores y MCP',
    lead: 'La IA se vuelve poderosa cuando puede conectarse a sistemas, no solo responder en una ventana de chat.',
    concept: 'APIs y conectores permiten leer, escribir o consultar herramientas externas. MCP estandariza la conexión entre modelos y herramientas/contextos.',
    compare: 'Chat aislado: no ve tus sistemas. IA conectada: consulta Drive, calendario, base documental, CRM o dashboard bajo permisos.',
    aec: 'Permite asistentes que lean documentos, actualicen listas, generen reportes, creen tareas o consulten métricas de proyecto.',
    tip: 'La pregunta clave: ¿qué herramienta necesita usar la IA y qué permiso exacto debe tener?',
    tags: ['API', 'MCP', 'Conectores', 'Permisos'],
    mode: 'map',
  },
  {
    id: 'dashboards',
    group: 'Operación',
    title: 'Dashboards con IA: de reporte a decisión',
    lead: 'Un dashboard con IA no solo muestra gráficos: explica qué cambió, qué importa y qué acción tomar.',
    concept: 'La IA puede resumir variaciones, detectar patrones, priorizar alertas y generar narrativas ejecutivas.',
    compare: 'Dashboard clásico: “aquí están los datos”. Dashboard aumentado: “este indicador cayó, estas son posibles causas y estas acciones convienen”.',
    aec: 'Aplica a productividad, avance, costos, seguridad, calidad, aprendizaje, adopción IA y seguimiento comercial.',
    tip: 'Cada dashboard debe responder: qué pasa, qué importa, qué riesgo hay y qué hago ahora.',
    tags: ['Dashboard', 'KPI', 'Decisión', 'Narrativa'],
    mode: 'lab',
  },
  {
    id: 'bim-ia',
    group: 'AEC',
    title: 'BIM + IA: modelos como fuente de conocimiento',
    lead: 'BIM no es solo geometría; contiene información estructurada que puede alimentar análisis y automatización.',
    concept: 'La IA puede apoyar clasificación, revisión, consulta, extracción de datos, generación de reportes y coordinación basada en información del modelo.',
    compare: 'BIM sin datos consistentes limita la IA. BIM con parámetros limpios permite consultas, validaciones y dashboards más útiles.',
    aec: 'Casos: revisión de parámetros, consultas por elemento, estimación preliminar, matrices de interferencias y reportes de coordinación.',
    tip: 'Antes de IA, define estándares mínimos de parámetros, codificación, niveles, fases y responsabilidades.',
    tags: ['BIM', 'Datos', 'Coordinación', 'Modelo'],
    mode: 'map',
  },
  {
    id: 'planificacion-costos',
    group: 'AEC',
    title: 'IA para planificación y costos',
    lead: 'La IA no reemplaza al planner ni al cost engineer, pero puede acelerar análisis comparativos y escenarios.',
    concept: 'Puede resumir restricciones, comparar cronogramas, detectar inconsistencias, explicar variaciones y proponer escenarios.',
    compare: 'La predicción depende de datos históricos. La generación ayuda a explicar, estructurar y comunicar.',
    aec: 'Útil para lookahead, restricciones, reportes de avance, análisis de desviaciones, metrados preliminares y narrativas de costo.',
    tip: 'No pidas un número final sin fuente. Pide supuestos, drivers, sensibilidad y qué dato falta para mejorar el cálculo.',
    tags: ['Planificación', 'Costos', 'Escenarios', 'Riesgo'],
    mode: 'compare',
  },
  {
    id: 'vision-computador',
    group: 'AEC',
    title: 'Visión por computador en obra',
    lead: 'La cámara puede convertirse en sensor operativo si existe criterio de captura, etiquetado y validación.',
    concept: 'Computer vision detecta objetos, personas, avance, condiciones inseguras o cambios visuales en imágenes y video.',
    compare: 'Una foto aislada informa poco. Una secuencia con ubicación, fecha y criterio permite medir tendencias.',
    aec: 'Casos: seguridad, avance físico, control de calidad, evidencia de campo, productividad y comparación contra plan.',
    tip: 'Define clases, ángulos, frecuencia, iluminación y responsable antes de prometer “IA visual”.',
    tags: ['Computer Vision', 'Obra', 'Seguridad', 'Avance'],
    mode: 'lab',
  },
  {
    id: 'productividad-personal',
    group: 'Productividad',
    title: 'Productividad personal: el primer retorno de IA',
    lead: 'El uso individual bien entrenado puede ahorrar horas antes de cualquier implementación empresarial compleja.',
    concept: 'La IA ayuda a redactar, resumir, comparar, aprender, preparar reuniones, crear borradores y organizar ideas.',
    compare: 'El usuario casual pide respuestas. El usuario experto construye plantillas, asistentes, bibliotecas de prompts y criterios de revisión.',
    aec: 'Cada profesional puede crear su kit: actas, correos técnicos, informes, aprendizaje, revisión de documentos y preparación comercial.',
    tip: 'Empieza con 5 tareas repetitivas semanales. Si una se repite, conviértela en prompt plantilla.',
    tags: ['Productividad', 'Plantillas', 'Rutina', 'Skills'],
    mode: 'lab',
  },
  {
    id: 'productividad-empresa',
    group: 'Productividad',
    title: 'Productividad empresarial: del uso individual al sistema',
    lead: 'El valor organizacional aparece cuando el aprendizaje individual se transforma en procesos compartidos.',
    concept: 'Una empresa necesita casos priorizados, datos, responsables, métricas, gobernanza y capacitación.',
    compare: 'Adopción informal: cada uno usa lo que quiere. Adopción operativa: casos, políticas, herramientas y medición de impacto.',
    aec: 'Los mejores casos combinan dolor frecuente, datos disponibles, bajo riesgo inicial y beneficio medible.',
    tip: 'Prioriza con matriz impacto/esfuerzo/riesgo. No empieces por el caso más espectacular; empieza por el más repetible.',
    tags: ['Adopción', 'Proceso', 'Métrica', 'Escala'],
    mode: 'map',
  },
  {
    id: 'gestion-cambio',
    group: 'Adopción',
    title: 'Gestión del cambio: la tecnología no adopta sola',
    lead: 'La adopción de IA depende de hábitos, confianza, formación, incentivos y liderazgo.',
    concept: 'Las personas adoptan cuando entienden para qué sirve, cómo usarla, qué está permitido y cómo se mide el beneficio.',
    compare: 'Capacitación aislada genera entusiasmo temporal. Comunidad, práctica y evidencia generan cambio sostenido.',
    aec: 'El reto es convertir curiosidad en habilidad verificable y habilidad en mejora operativa.',
    tip: 'Mide tres señales: uso semanal, evidencia producida y proceso mejorado.',
    tags: ['Cambio', 'Confianza', 'Formación', 'Evidencia'],
    mode: 'risk',
  },
  {
    id: 'mitos-realidades',
    group: 'Criterio',
    title: 'Mitos y realidades de la IA',
    lead: 'Separar narrativa de realidad evita compras impulsivas y proyectos fallidos.',
    concept: 'Mito: la IA reemplaza todo. Realidad: automatiza partes, aumenta capacidades y exige rediseñar trabajo.',
    compare: 'Mito: basta con pagar una herramienta. Realidad: necesitas casos, datos, entrenamiento, seguridad y medición.',
    aec: 'La ventaja no está en “tener IA”, sino en resolver mejor documentación, coordinación, productividad, seguridad o ventas.',
    tip: 'Cada promesa de IA debe traducirse a una tarea concreta, una métrica y una evidencia de mejora.',
    tags: ['Mito', 'Realidad', 'Criterio', 'ROI'],
    mode: 'compare',
  },
  {
    id: 'prompt-aec',
    group: 'Criterio',
    title: 'Prompt AEC: plantilla base para trabajo técnico',
    lead: 'Una plantilla común mejora calidad y reduce variabilidad entre equipos.',
    concept: 'Estructura: rol técnico, tipo de proyecto, disciplina, documento, objetivo, restricciones, formato, criterios y validación.',
    compare: 'No pidas “analiza este archivo”. Pide “extrae riesgos técnicos, contractuales y operativos con fuente, impacto y acción sugerida”.',
    aec: 'Sirve como base para arquitectura, ingeniería, construcción, BIM, costos, planificación, seguridad y gestión comercial.',
    tip: 'Cierra con: “si una conclusión depende de información ausente, indícalo como pendiente y no la inventes”.',
    tags: ['Prompt AEC', 'Técnico', 'Formato', 'Validación'],
    mode: 'lab',
  },
  {
    id: 'aprendizaje-ia',
    group: 'Criterio',
    title: 'Cómo aprender IA sin perderse en herramientas',
    lead: 'Las herramientas cambian; los principios permanecen más tiempo.',
    concept: 'Aprende por capas: fundamentos, prompting, documentos, datos, automatización, agentes, seguridad y casos AEC.',
    compare: 'Aprender botones envejece rápido. Aprender criterios permite cambiar de herramienta sin empezar de cero.',
    aec: 'La habilidad central es convertir problemas del sector en flujos asistidos por IA con evidencia y control humano.',
    tip: 'Por cada herramienta nueva, pregunta: qué tarea mejora, qué dato necesita, qué riesgo introduce y cómo se valida.',
    tags: ['Aprendizaje', 'Criterio', 'Herramientas', 'Skill'],
    mode: 'map',
  },
  {
    id: 'ai-first',
    group: 'Futuro',
    title: 'AI-first: rediseñar el trabajo desde la IA',
    lead: 'AI-first no significa reemplazar todo por IA; significa rediseñar procesos considerando IA desde el inicio.',
    concept: 'Un proceso AI-first define qué datos entran, qué analiza la IA, dónde decide el humano, qué se registra y cómo mejora con uso.',
    compare: 'Digitalizar un proceso viejo no siempre mejora. Rediseñarlo con IA puede reducir pasos, errores y tiempos muertos.',
    aec: 'Aplica a control documental, reportes, onboarding técnico, seguimiento de obra, preventa, capacitación y gestión de conocimiento.',
    tip: 'Dibuja el flujo ideal sin copiar el proceso actual. Luego agrega controles para hacerlo viable.',
    tags: ['AI-first', 'Rediseño', 'Proceso', 'Escala'],
    mode: 'map',
  },
  {
    id: 'habilidad-verificable',
    group: 'Futuro',
    title: 'IA como habilidad verificable',
    lead: 'No basta decir “sé usar IA”. Hay que demostrar qué problema resuelves y con qué evidencia.',
    concept: 'Una habilidad verificable combina conocimiento, práctica, entregable, criterio de calidad y validación.',
    compare: 'Uso superficial: prompts sueltos. Skill real: producir un entregable aplicable, revisable y mejor que el flujo anterior.',
    aec: 'Ejemplos: matriz de riesgos, asistente documental, dashboard, acta inteligente, automatización o reporte visual de obra.',
    tip: 'Cada aprendizaje debe cerrar con evidencia: archivo, matriz, flujo, prompt, demo, caso o mejora medida.',
    tags: ['Skill', 'Evidencia', 'Certificación', 'AECODE'],
    mode: 'lab',
  },
  {
    id: 'cierre-conocimiento',
    group: 'Síntesis',
    title: 'De usuario de IA a arquitecto de workflows',
    lead: 'El salto profesional es pasar de pedir respuestas a diseñar sistemas de trabajo aumentados por IA.',
    concept: 'Dominar IA implica entender modelos, datos, documentos, herramientas, automatización, riesgos y adopción.',
    compare: 'Usuario: usa una herramienta. Arquitecto de workflows: diseña cómo la herramienta entra al proceso, genera evidencia y se valida.',
    aec: 'Ese perfil puede liderar transformación en diseño, ingeniería, obra, formación, ventas, operaciones y dirección.',
    tip: 'Tu siguiente paso: toma un proceso real, mapea dolor, datos, IA, control humano, salida y métrica de mejora.',
    tags: ['Workflow', 'Liderazgo', 'Transformación', 'AEC'],
    mode: 'map',
  },
]

function KnowledgeSlide({ item, index }: { item: KnowledgeCard; index: number }) {
  const code = String(index + 1).padStart(2, '0')
  return (
    <>
      <Head eyebrow={`${item.group} · Concepto ${code}`} title={item.title} lead={item.lead} />
      <div className={`knowledge-board knowledge-${item.mode ?? 'map'} up`} style={st(1)}>
        <article className="knowledge-hero">
          <span>{code}</span>
          <h3>Idea central</h3>
          <p>{item.concept}</p>
        </article>
        <article className="knowledge-card strong">
          <b>Comparación</b>
          <p>{item.compare}</p>
        </article>
        <article className="knowledge-card">
          <b>Aplicación AEC</b>
          <p>{item.aec}</p>
        </article>
        <article className="knowledge-card tip">
          <b>Tip práctico</b>
          <p>{item.tip}</p>
        </article>
        <div className="knowledge-tags">
          {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </>
  )
}

const knowledgeSlides: SlideDef[] = KNOWLEDGE.map((item, index) => ({
    id: `knowledge-${item.id}`,
    num: '00',
    title: item.title,
    section: '07 Biblioteca de conceptos IA',
    node: <KnowledgeSlide item={item} index={index} />,
}))

function ClosingSlide() {
  return (
    <div className="closing">
      <AecodeLogo className="cover-mark up" style={st(0)} />
      <p className="closing-eyebrow up" style={st(1)}>{(global as any).meta.event}</p>
      <p className="bigquote-text up" style={st(2)}>
        No gana quien abre ChatGPT. <span className="hl">Gana quien convierte la IA en sistema de trabajo verificable.</span>
      </p>
      <div className="closing-cta up" style={st(3)}>
        <a className="btn" href="mailto:apalpan@genplusdesign.com">apalpan@genplusdesign.com</a>
      </div>
    </div>
  )
}

function ReferencesSlide() {
  return (
    <>
      <Head eyebrow="Anexo" title="Referencias"
        lead="Fuentes base del benchmark global, sectorial y de actualidad. Los datos numericos viven en archivos JSON auditables dentro del repositorio." />
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

const baseSlides: SlideDef[] = [
  { id: 'cover', num: '', title: 'Portada', node: <Cover /> },
  { id: 'narrativa', num: '00', title: 'Hilo conductor', node: <NarrativeMapSlide /> },
  { id: 'paradoja', num: '00', title: 'La paradoja del AEC', node: <ParadoxSlide /> },
  { id: 'momento-2026', num: '00', title: '2026: IA como capa operativa', node: <CurrentMomentSlide /> },
  { id: 'adopcion', num: '00', title: 'Adopcion mas rapida de la historia', node: <AdoptionSpeedSlide /> },
  { id: 'estado', num: '00', title: 'Estado de la IA en empresas', node: <StateSlide /> },
  { id: 'fx-escala', num: '⚡', title: 'Flash · ¿Usar es escalar?', node: <FlashSlide item={FLASH.escala} /> },
  { id: 'modelos-actuales', num: '00', title: 'Mapa de modelos actuales', node: <ModelLandscapeSlide /> },
  { id: 'razonamiento', num: '00', title: 'IA rapida vs IA que piensa mas', node: <ReasoningFastSlide /> },
  { id: 'benchmarks', num: '00', title: 'Benchmarks: capacidad medida', node: <BenchmarksSlide /> },
  { id: 'hle', num: '00', title: 'Humanitys Last Exam', node: <HleSlide /> },
  { id: 'breakthroughs', num: '00', title: 'Anecdotas cientificas y tecnicas', node: <BreakthroughsSlide /> },
  { id: 'historia', num: '00', title: 'Historia de la IA', node: <HistorySlide /> },
  { id: 'compute', num: '00', title: 'Computo: motor de la curva', node: <ComputeSlide /> },
  { id: 'genai', num: '00', title: 'Como funciona la IA generativa', node: <GenAISlide /> },
  { id: 'conceptos', num: '00', title: 'Chatbot, asistente, agente y workflow', node: <ConceptsSlide /> },
  { id: 'fx-alucinacion', num: '⚡', title: 'Flash · El artículo 47', node: <FlashSlide item={FLASH.alucinacion} /> },
  { id: 'cap-cimientos', num: '00', title: 'IA, ML, deep learning y modelo', node: <CapCimientos /> },
  { id: 'cap-lenguaje', num: '00', title: 'LLM, prompt y contexto', node: <CapLenguaje /> },
  { id: 'cap-tokens', num: '00', title: 'Tokens y ventana de contexto', node: <CapTokens /> },
  { id: 'prompt-profesional', num: '00', title: 'Prompt profesional', node: <PromptProfessionalSlide /> },
  { id: 'rag-aec', num: '00', title: 'RAG para documentos AEC', node: <RagAecSlide /> },
  { id: 'cap-expertos', num: '00', title: 'Fine-tuning vs RAG', node: <CapExpertos /> },
  { id: 'fx-ragft', num: '⚡', title: 'Flash · Postura A o B', node: <FlashSlide item={FLASH.ragft} /> },
  { id: 'cap-colaborador', num: '00', title: 'De herramienta a agente', node: <CapColaborador /> },
  { id: 'herramientas', num: '00', title: 'Tablero de herramientas IA', node: <ToolboardSlide /> },
  { id: 'seleccion-modelo', num: '00', title: 'Como elegir herramienta', node: <ModelSelectionSlide /> },
  { id: 'pago', num: '00', title: 'Cuanto cuesta usar IA', node: <PricingSlide /> },
  { id: 'empleos', num: '00', title: 'Empleo y nuevas habilidades', node: <JobsSlide /> },
  { id: 'mercado', num: '00', title: 'Tamaño de mercado IA', node: <MarketSlide /> },
  { id: 'enia', num: '00', title: 'ENIA 2026-2030', node: <EniaSlide /> },
  { id: 'latam', num: '00', title: 'Oportunidad LATAM', node: <LatamOpportunitySlide /> },
  { id: 'fx-latam', num: '⚡', title: 'Para la sala · ¿Creadores o consumidores?', node: <FlashSlide item={FLASH.latam} /> },
  { id: 'aec-section', num: '', title: 'AEC: punto de inflexion', node: <AecSectionSlide /> },
  { id: 'brecha-aec', num: '00', title: 'Potencial vs uso real en AEC', node: <AecGapSlide /> },
  { id: 'productividad', num: '00', title: 'Productividad en construccion', node: <ProductivitySlide /> },
  { id: 'aec-state', num: '00', title: 'Madurez AEC', node: <AecStateSlide /> },
  { id: 'aec-labor', num: '00', title: 'Urgencia laboral AEC', node: <AecLaborSlide /> },
  { id: 'data-journey', num: '00', title: 'Datos AEC', node: <DataJourneySlide /> },
  { id: 'fx-data', num: '⚡', title: 'Dato clave · 96%', node: <FlashSlide item={FLASH.data} /> },
  { id: 'usecase-map', num: '00', title: 'Mapa de casos de uso AEC', node: <AecUseCaseMapSlide /> },
  { id: 'workflow-docs', num: '00', title: 'Workflow con documentos', node: <WorkflowDocsSlide /> },
  { id: 'workflow-costos', num: '00', title: 'Workflow de costos', node: <WorkflowCostsSlide /> },
  { id: 'workflow-bim', num: '00', title: 'Workflow BIM + IA', node: <WorkflowBimSlide /> },
  { id: 'workflow-obra', num: '00', title: 'Workflow de obra visual', node: <WorkflowSiteSlide /> },
  { id: 'fx-control', num: '⚡', title: 'Flash · ¿Dónde va el control?', node: <FlashSlide item={FLASH.control} /> },
  { id: 'human-loop', num: '00', title: 'Human-in-the-loop', node: <HumanInLoopSlide /> },
  { id: 'risk-rubric', num: '00', title: 'Rubrica de riesgo IA', node: <RiskRubricSlide /> },
  { id: 'barreras', num: '00', title: 'Barreras de adopcion', node: <BarriersSlide /> },
  { id: 'fx-barrera', num: '⚡', title: 'Síntesis · La barrera real', node: <FlashSlide item={FLASH.barrera} /> },
  { id: 'skills', num: '00', title: 'IA como habilidad', node: <SkillsSlide /> },
  { id: 'skill-passport', num: '00', title: 'Skill Passport IA', node: <SkillPassportSlide /> },
  { id: 'fx-workflow', num: '⚡', title: 'Síntesis · Validación', node: <FlashSlide item={FLASH.workflow} /> },
  { id: 'survey-radar', num: '00', title: 'Radar AECODE 2026', node: <SurveyRadarSlide /> },
  { id: 'research-questions', num: '00', title: 'Preguntas de investigacion', node: <ResearchQuestionsSlide /> },
  { id: 'acciones', num: '00', title: 'Jugada por actor', node: <ActionSlide /> },
  { id: 'summit-bridge', num: '00', title: 'Puente al AI Construction Summit', node: <SummitBridgeSlide /> },
  ...knowledgeSlides,
  { id: 'takeaways', num: '00', title: 'Diez ideas clave', node: <TakeawaysSlide /> },
  { id: 'cierre', num: '', title: 'Cierre', node: <ClosingSlide /> },
  { id: 'referencias', num: '00', title: 'Referencias', node: <ReferencesSlide /> },
]

function sectionForSlide(slide: SlideDef, index: number) {
  if (slide.section) return slide.section
  const n = index + 1
  if (n <= 5) return '01 Apertura'
  if (n <= 18) return '02 Estado IA 2026'
  if (n <= 29) return '03 Fundamentos IA'
  if (n <= 35) return '04 Mercado y ENIA'
  if (n <= 50) return '05 AEC y workflows'
  if (n <= 57) return '06 Radar y Summit'
  return '08 Cierre y fuentes'
}

export const slides: SlideDef[] = baseSlides.map((slide, index) => ({
  ...slide,
  section: sectionForSlide(slide, index),
}))
