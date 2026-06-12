/* =========================================================================
   FLASH — interludios de aprendizaje cada 3–5 slides.
   Tres formatos: pregunta (V/F · A/B/C/D · postura), dato clave y frase
   síntesis. La pregunta se responde tocando una alternativa; la explicación
   técnica aparece después. Se reinicia al salir de la slide.
   ========================================================================= */
import { useContext, useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { SlideActiveContext } from './Deck'
import AnimatedValue from './CountUp'

const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

export type FlashItem =
  | { kind: 'quiz'; tag: string; q: string; options: { id: string; t: string }[]; answer: string; explain: string; src?: string }
  | { kind: 'dato'; tag: string; v: string; t: string; d: string; src?: string }
  | { kind: 'frase'; tag: string; t: ReactNode; d?: string }
  | { kind: 'debate'; tag: string; q: string; d: string; anchor: { v: string; t: string; src?: string } }

/* ------------------------------- QUIZ --------------------------------- */
function Quiz({ f }: { f: Extract<FlashItem, { kind: 'quiz' }> }) {
  const active = useContext(SlideActiveContext)
  const [sel, setSel] = useState<string | null>(null)
  useEffect(() => { if (!active) setSel(null) }, [active])
  const revealed = sel !== null
  const correct = sel === f.answer
  return (
    <div className="flash">
      <span className="flash-tag up" style={st(0)}>{f.tag}</span>
      <h2 className="flash-q up" style={st(1)}>{f.q}</h2>
      <div className="flash-opts up" style={st(2)} data-n={f.options.length} role="group" aria-label="Alternativas">
        {f.options.map((o, i) => {
          const state = !revealed ? undefined : o.id === f.answer ? 'correct' : o.id === sel ? 'wrong' : 'dim'
          return (
            <button key={o.id} className="fopt" data-state={state} style={st(i + 1)}
              onClick={() => { if (!revealed) setSel(o.id) }} aria-pressed={sel === o.id}>
              <span className="fopt-k" aria-hidden="true">{o.id.toUpperCase()}</span>
              <span className="fopt-t">{o.t}</span>
              {state === 'correct' && <span className="fopt-mark" aria-hidden="true">✓</span>}
              {state === 'wrong' && <span className="fopt-mark" aria-hidden="true">✕</span>}
            </button>
          )
        })}
      </div>
      {revealed ? (
        <div className="flash-explain" role="status">
          <span className="fe-label">{correct ? '✓ Correcto' : `La respuesta es ${f.answer.toUpperCase()}`}</span>
          <p>{f.explain}</p>
          {f.src && <span className="fe-src">{f.src}</span>}
        </div>
      ) : (
        <p className="flash-hint up" style={st(3)}>Elige una alternativa — después viene el porqué.</p>
      )}
    </div>
  )
}

/* ------------------------------- DATO --------------------------------- */
function Dato({ f }: { f: Extract<FlashItem, { kind: 'dato' }> }) {
  return (
    <div className="flash">
      <span className="flash-tag up" style={st(0)}>{f.tag}</span>
      <div className="flash-v tnum up" style={st(1)}><AnimatedValue text={f.v} /></div>
      <p className="flash-vt up" style={st(2)}>{f.t}</p>
      <div className="flash-rule up" style={st(2)} aria-hidden="true" />
      <p className="flash-d up" style={st(3)}>{f.d}</p>
      {f.src && <span className="fe-src up" style={st(4)}>{f.src}</span>}
    </div>
  )
}

/* ------------------------------- FRASE -------------------------------- */
function Frase({ f }: { f: Extract<FlashItem, { kind: 'frase' }> }) {
  return (
    <div className="flash frase">
      <span className="flash-tag up" style={st(0)}>{f.tag}</span>
      <div className="flash-rule up" style={st(1)} aria-hidden="true" />
      <p className="flash-phrase up" style={st(2)}>{f.t}</p>
      <div className="flash-rule up" style={st(3)} aria-hidden="true" />
      {f.d && <p className="flash-d up" style={st(4)}>{f.d}</p>}
    </div>
  )
}

/* ------------------------------- DEBATE ------------------------------- */
function Debate({ f }: { f: Extract<FlashItem, { kind: 'debate' }> }) {
  return (
    <div className="flash">
      <span className="flash-tag up" style={st(0)}>{f.tag}</span>
      <h2 className="flash-q up" style={st(1)}>{f.q}</h2>
      <div className="flash-anchor up" style={st(2)}>
        <span className="fa-v tnum"><AnimatedValue text={f.anchor.v} /></span>
        <span className="fa-t">{f.anchor.t}{f.anchor.src && <em> · {f.anchor.src}</em>}</span>
      </div>
      <p className="flash-d up" style={st(3)}>{f.d}</p>
    </div>
  )
}

export default function FlashSlide({ item }: { item: FlashItem }) {
  switch (item.kind) {
    case 'quiz': return <Quiz f={item} />
    case 'dato': return <Dato f={item} />
    case 'frase': return <Frase f={item} />
    case 'debate': return <Debate f={item} />
  }
}

/* ========================== CONTENIDO ================================== */
export const FLASH: Record<string, FlashItem> = {
  escala: {
    kind: 'quiz', tag: 'Flash · verdadero o falso',
    q: 'La mayoría de las organizaciones que ya usan IA la tienen escalada en producción.',
    options: [{ id: 'v', t: 'Verdadero' }, { id: 'f', t: 'Falso' }], answer: 'f',
    explain: 'El 88 % usa IA en alguna función, pero solo ~1 de cada 3 logra escalarla; el 62 % experimenta con agentes y apenas el 23 % los lleva a producción. El cuello de botella no es el acceso a modelos: es rediseñar procesos, datos y validación. Ahí se gana o se pierde el valor.',
    src: 'McKinsey · The State of AI 2025',
  },
  hle: {
    kind: 'dato', tag: 'Dato clave',
    v: '44,7%', t: 'en el examen más difícil jamás escrito',
    d: 'Hace un año la IA sacaba ~3 % en Humanity’s Last Exam; el experto humano ronda el 90 %. El punto importa menos que la pendiente: ninguna tecnología había recorrido esa distancia en 18 meses.',
    src: 'Nature, ene 2026 · Scale AI / Epoch, jun 2026',
  },
  computo: {
    kind: 'quiz', tag: 'Flash · cálculo exponencial',
    q: 'El cómputo de entrenamiento se duplica cada ~6 meses. ¿Cuánto más cómputo tendrá un modelo frontera dentro de 3 años?',
    options: [{ id: 'a', t: '~8 veces más' }, { id: 'b', t: '~64 veces más' }, { id: 'c', t: '~1.000 veces más' }], answer: 'b',
    explain: '3 años = 6 duplicaciones → 2⁶ = 64×. Así funciona una exponencial: parece lenta de cerca y aplasta de lejos. Por eso «la IA no sirve para esto» caduca en meses — y por eso conviene diseñar procesos que asuman que el modelo del próximo año será mejor.',
    src: 'Epoch AI',
  },
  alucinacion: {
    kind: 'quiz', tag: 'Flash · criterio profesional',
    q: 'Le pides al modelo la norma que aplica a tu caso y te cita el «artículo 47» con total seguridad. ¿Qué es lo más probable?',
    options: [
      { id: 'a', t: 'Lo leyó y lo está citando textualmente' },
      { id: 'b', t: 'Reconstruyó una cita plausible — puede no existir' },
      { id: 'c', t: 'Si suena tan seguro, es porque lo verificó' },
    ], answer: 'b',
    explain: 'Un LLM genera el texto más probable, no el más verdadero: la seguridad del tono no es evidencia. Eso es una alucinación. Regla profesional: toda cifra, fecha o cita legal que alimente una decisión se verifica contra la fuente — o se obliga al modelo a citarla (RAG).',
  },
  ventana: {
    kind: 'quiz', tag: 'Flash · análisis técnico',
    q: 'Pegas un expediente de 800 páginas y pides un resumen. El modelo responde fluido y convincente. ¿Cuál es el riesgo técnico principal?',
    options: [
      { id: 'a', t: 'Que tarde demasiado en responder' },
      { id: 'b', t: 'Que la respuesta consuma muchos tokens' },
      { id: 'c', t: 'Que parte del documento nunca entró a la ventana de contexto' },
      { id: 'd', t: 'Que el modelo se quede con tus datos' },
    ], answer: 'c',
    explain: 'Si el documento excede la ventana, el modelo resume solo lo que cupo — sin avisarte. La respuesta suena completa pero puede omitir el capítulo decisivo. Con documentos largos: trocear, resumir por partes o usar RAG. (La privacidad —d— se gestiona aparte, según plan y contrato.)',
  },
  ragft: {
    kind: 'quiz', tag: 'Flash · postura A o B',
    q: 'Tu estudio quiere que la IA responda según sus especificaciones técnicas internas, que cambian cada mes. ¿Qué camino eliges?',
    options: [
      { id: 'a', t: 'Postura A — Fine-tuning: re-entrenar el modelo con nuestros documentos' },
      { id: 'b', t: 'Postura B — RAG: que consulte el archivo en el momento de responder' },
    ], answer: 'b',
    explain: 'Conocimiento volátil → RAG: actualizas el documento y la respuesta cambia hoy mismo, con cita trazable. El fine-tuning «hornea» el conocimiento dentro del modelo: caro de rehacer y sin fuente verificable. Re-entrenar vale cuando buscas comportamiento o estilo estable, no datos frescos.',
  },
  precio: {
    kind: 'dato', tag: 'Dato clave',
    v: '−50%', t: 'bajó el precio de la frontera en un año',
    d: 'Claude Fable 5 cuesta la mitad que su antecesor (US$10 por millón de tokens) siendo más capaz. Capacidad sube y precio baja a la vez: la barrera de entrada ya no es económica — es saber qué pedir y cómo validar lo que devuelve.',
    src: 'Anthropic · jun 2026',
  },
  empleos: {
    kind: 'quiz', tag: 'Flash · verdadero o falso',
    q: 'El Foro Económico Mundial proyecta que al 2030 la IA destruirá más empleos de los que crea.',
    options: [{ id: 'v', t: 'Verdadero' }, { id: 'f', t: 'Falso' }], answer: 'f',
    explain: 'La proyección es +170 M de empleos creados contra 92 M desplazados: saldo neto +78 M. El riesgo real no es la cantidad de empleos sino el desfase de habilidades: los puestos nuevos exigen capacidades que la mayoría aún no tiene. La pregunta correcta no es «¿me reemplaza?», es «¿qué tareas mías cambian primero?».',
    src: 'WEF · Future of Jobs 2025',
  },
  latam: {
    kind: 'debate', tag: 'Para la sala',
    q: '¿Latinoamérica entrará a esta ola como creadora o como consumidora de IA?',
    anchor: { v: '~2%', t: 'de la inversión global de IA llega a LATAM', src: 'Stanford HAI 2026' },
    d: 'No hay una respuesta única: hay decisiones. El talento y los casos de uso locales existen; el capital y el cómputo están en otra parte. Lo que cada estudio, empresa y universidad haga en los próximos 24 meses define de qué lado de la ola queda.',
  },
  productividad: {
    kind: 'quiz', tag: 'Flash · alternativas',
    q: '¿Cuánto crece al año la productividad de la construcción, si la economía global crece 2,8 %?',
    options: [{ id: 'a', t: '0,7 %' }, { id: 'b', t: '1,9 %' }, { id: 'c', t: '2,5 %' }], answer: 'a',
    explain: 'La construcción crece 0,7 % anual: un cuarto del ritmo de la economía y un quinto de la manufactura (3,6 %). La IA podría sumar +1,8 pp — no automatizando el oficio, sino las tareas informacionales que lo rodean: documentos, costos, planificación, reportes. Por eso el premio es tan grande justo aquí.',
    src: 'McKinsey 2025',
  },
  data: {
    kind: 'dato', tag: 'Dato clave',
    v: '96%', t: 'de la data de ingeniería y construcción nunca se usa',
    d: 'Cada proyecto produce planos, RFIs, actas, fotos y presupuestos que mueren en carpetas. Sin ese historial estructurado no hay IA que aprenda de tu obra: el dato más caro es el que ya pagaste por producir y nadie convirtió en decisión.',
    src: 'FMI / Autodesk',
  },
  control: {
    kind: 'quiz', tag: 'Flash · postura A o B',
    q: 'Un agente puede cotizar, comparar proveedores y emitir la orden de compra solo. ¿Dónde colocas el punto de control humano?',
    options: [
      { id: 'a', t: 'Postura A — Antes de cada acción irreversible o externa' },
      { id: 'b', t: 'Postura B — Solo al final, revisando el resultado' },
    ], answer: 'a',
    explain: 'El criterio es la asimetría del error: si la acción es difícil de revertir —un pago, un correo al cliente, un pedido—, el control va antes. Revisar al final sirve cuando deshacer es barato. Human-in-the-loop no es desconfianza: es diseño de riesgo. Velocidad de máquina, responsabilidad de persona.',
  },
  barrera: {
    kind: 'frase', tag: 'Síntesis',
    t: <>«El acceso a la IA ya no es la barrera. <b>El criterio para usarla, sí.</b>»</>,
    d: 'Un modelo frontera cuesta menos que una licencia de CAD. Lo escaso es saber definir el problema, dar contexto, validar la salida y convertirla en proceso.',
  },
  workflow: {
    kind: 'frase', tag: 'Síntesis',
    t: <>«Automatización sin validación no es eficiencia: <b>es riesgo a escala.</b>»</>,
    d: 'Un workflow de IA serio se mide por sus puntos de control, no por sus pasos automáticos. La evidencia —qué se revisó, quién aprobó— es lo que lo vuelve profesional.',
  },
}
