/* =========================================================================
   Cápsula · Fundamentos de IA en simple
   Módulo didáctico interactivo dentro del deck. Movimiento earned, sólo
   transform/opacity, <300ms, con ruta de reduced-motion y teclado.
   ========================================================================= */
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { SlideActiveContext } from './Deck'
import { useReduceMotion } from '../lib/hooks'
import {
  FOUNDATIONS, LANGUAGE, TODAY, EXPERT_WAYS, EMBEDDING, COLLAB, READ_METHOD,
} from '../lib/concepts'
import type { Concept } from '../lib/concepts'

const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

/* ----------------------------- cabecera de cápsula ---------------------- */
function CapHead({ step, title, lead }: { step?: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <header className="cap-head up" style={st(0)}>
      <p className="cap-eyebrow">
        <span className="cap-badge">Cápsula</span>
        <span className="cap-name">Fundamentos de IA en simple</span>
        {step && <span className="cap-step tnum">{step}</span>}
      </p>
      <h2 className="s-title cap-title">{title}</h2>
      <div className="kicker-line" />
      {lead && <p className="lead">{lead}</p>}
    </header>
  )
}

/* ------------------- panel compartido de 4 partes (Qué/Imagina/Ej/Importa) */
const PARTS: { label: string; icon: string; key: keyof Pick<Concept, 'que' | 'img' | 'ej' | 'imp'>; hot?: boolean }[] = [
  { label: 'Qué es', icon: '?', key: 'que' },
  { label: 'Imagínalo así', icon: '◎', key: 'img' },
  { label: 'Ejemplo', icon: '▸', key: 'ej' },
  { label: 'Por qué te importa', icon: '★', key: 'imp', hot: true },
]
function ConceptPanel({ c }: { c: Concept }) {
  return (
    <div className="cpanel" key={c.k}>
      <div className="cpanel-head">
        <h3 className="cpanel-k">{c.k}</h3>
        {c.tag && <span className="cpanel-tag">{c.tag}</span>}
      </div>
      <dl className="cpanel-parts">
        {PARTS.map((p, i) => (
          <div className="cpart" key={p.key} data-hot={p.hot || undefined} style={st(i)}>
            <dt><span className="cpart-i" aria-hidden="true">{p.icon}</span>{p.label}</dt>
            <dd>{c[p.key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ---- chips conmutables + panel compartido (usado en lenguaje y colaborador) */
function ConceptChips({ items, start = 0 }: { items: Concept[]; start?: number }) {
  const [sel, setSel] = useState(start)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const n = (i + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length
    setSel(n); refs.current[n]?.focus()
  }
  return (
    <div className="chips-wrap">
      <div className="chips" role="tablist" aria-label="Conceptos">
        {items.map((c, i) => (
          <button
            key={c.k} ref={(el) => { refs.current[i] = el }} role="tab"
            aria-selected={i === sel} tabIndex={i === sel ? 0 : -1}
            className="chip-btn" data-on={i === sel || undefined}
            onClick={() => setSel(i)} onKeyDown={(e) => onKey(e, i)}
          >{c.k}</button>
        ))}
      </div>
      <ConceptPanel c={items[sel]} />
    </div>
  )
}

/* ===================================================================== *
 *  SLIDE — Intro / portada de la cápsula                                 *
 * ===================================================================== */
export function CapIntro() {
  return (
    <div className="cap-intro">
      <p className="cap-kicker up" style={st(0)}><span className="cap-badge solid">Cápsula 2</span> de 2 · Conceptos clave</p>
      <h2 className="cap-bigtitle up" style={st(1)}>
        Domina la IA <span className="grad">como habilidad</span>,<br />no como un montón de apps
      </h2>
      <p className="cap-biglead up" style={st(2)}>
        Dominar IA no es memorizar herramientas: es entender modelos, datos, contexto, instrucciones,
        límites, validación y criterio. Seis paradas con ejemplos del día a día.
      </p>
      <div className="method up" style={st(3)}>
        <span className="method-label">Cada concepto, en 4 partes</span>
        <div className="method-row">
          {READ_METHOD.map((m, i) => (
            <div className="method-card" key={m.k} style={st(i + 1)}>
              <span className="method-i" aria-hidden="true">{m.icon}</span>
              <span className="method-k">{m.k}</span>
              <span className="method-d">{m.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ===================================================================== *
 *  SLIDE 01 — Los cimientos (muñecas rusas)                              *
 * ===================================================================== */
export function CapCimientos() {
  const active = useContext(SlideActiveContext)
  const reduce = useReduceMotion()
  const [sel, setSel] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!active || !auto || reduce) return
    const id = window.setInterval(() => setSel((s) => (s + 1) % FOUNDATIONS.length), 2800)
    return () => window.clearInterval(id)
  }, [active, auto, reduce])
  useEffect(() => { if (active) { setAuto(true); setSel(0) } }, [active])

  const pick = (i: number) => { setAuto(false); setSel(i) }
  const c = FOUNDATIONS[sel]

  return (
    <>
      <CapHead step="01 / 06" title="Los cimientos: están uno dentro del otro"
        lead="Inteligencia artificial, machine learning y deep learning encajan como muñecas rusas. Todo ese aprendizaje produce, al final, un modelo." />
      <div className="dolls-slide up" style={st(1)}>
        <div className="dolls" role="group" aria-label="Capas de la IA, de la más amplia a la más específica">
          {FOUNDATIONS.map((f, i) => (
            <button
              key={f.lvl} className="doll" data-lvl={f.lvl} data-on={i === sel || undefined}
              aria-pressed={i === sel} onClick={() => pick(i)}
              style={{ inset: `${(i) * 11}%` } as CSSProperties}
            >
              <span className="doll-tag">{f.k}</span>
              {f.lvl === 4 && <span className="doll-core" aria-hidden="true">◆</span>}
            </button>
          ))}
          <span className="dolls-hint" aria-hidden="true">Toca una capa</span>
        </div>
        <ConceptPanel c={c} />
      </div>
    </>
  )
}

/* ===================================================================== *
 *  SLIDE 02 — Cómo hablan los modelos (LLM · Prompt · Contexto)          *
 * ===================================================================== */
export function CapLenguaje() {
  return (
    <>
      <CapHead step="02 / 06" title="Cómo hablan los modelos de lenguaje"
        lead="Un LLM no «sabe»: predice, palabra por palabra, la continuación más probable. Lo que le das (tu prompt y tu contexto) decide la calidad de lo que recibes." />
      <div className="up" style={st(1)}>
        <ConceptChips items={LANGUAGE.slice(0, 3)} />
      </div>
    </>
  )
}

/* ===================================================================== *
 *  SLIDE 03 — Tokens · Tokenización · Ventana  (tokenizer + escritorio)  *
 * ===================================================================== */
function tokenize(text: string): string[] {
  const parts = text.match(/\s+|[^\s]+/g) ?? []
  const out: string[] = []
  for (const p of parts) {
    if (/^\s+$/.test(p)) { out.push(' '); continue }
    const segs = p.match(/[\p{L}\p{N}]+|[^\p{L}\p{N}]/gu) ?? [p]
    for (const s of segs) {
      if (/^[\p{L}\p{N}]+$/u.test(s) && s.length > 5) {
        for (let i = 0; i < s.length; i += 4) out.push(s.slice(i, i + 4))
      } else out.push(s)
    }
  }
  return out
}
const TOK_PRESETS = [
  'incomprensible',
  'Resume este contrato en 5 puntos.',
  'Hola, ¿cómo estás?',
]
function Tokenizer() {
  const [text, setText] = useState('La inteligencia artificial es incomprensible sin práctica.')
  const tokens = useMemo(() => tokenize(text), [text])
  const count = tokens.filter((t) => t !== ' ').length
  return (
    <div className="tok">
      <label className="tok-label" htmlFor="tok-in">Escribe y mira cómo se parte en tokens</label>
      <input id="tok-in" className="tok-in" value={text} maxLength={120}
        onChange={(e) => setText(e.target.value)} placeholder="Escribe una frase…" autoComplete="off" spellCheck={false} />
      <div className="tok-presets">
        {TOK_PRESETS.map((p) => (
          <button key={p} className="tok-preset" onClick={() => setText(p)}>{p.length > 22 ? p.slice(0, 22) + '…' : p}</button>
        ))}
      </div>
      <div className="tok-out" aria-live="polite">
        {tokens.map((t, i) => (
          t === ' '
            ? <span className="tok-gap" key={i} aria-hidden="true" />
            : <span className="tok-chip" key={i} style={st(i)}>{t}</span>
        ))}
      </div>
      <p className="tok-count"><b className="tnum">{count}</b> tokens · ≈ {text.length} caracteres
        <span className="tok-note">1 token ≈ 4 caracteres o ¾ de una palabra</span></p>
    </div>
  )
}

const WIN_CAP = 6
function ContextWindow() {
  const [pages, setPages] = useState(4)
  const fit = Math.min(pages, WIN_CAP)
  const over = Math.max(0, pages - WIN_CAP)
  return (
    <div className="win">
      <div className="win-headrow">
        <span className="win-title">La ventana de contexto es un escritorio</span>
        <span className="win-badge tnum">{fit}/{WIN_CAP} caben</span>
      </div>
      <div className="win-desk" aria-hidden="true">
        {Array.from({ length: Math.max(pages, WIN_CAP) }).map((_, i) => (
          <span key={i} className="win-page"
            data-state={i >= pages ? 'empty' : i < WIN_CAP ? 'in' : 'fallen'}
            style={st(i)} />
        ))}
        <span className="win-edge" />
      </div>
      <label className="win-label" htmlFor="win-range">Tamaño del documento: <b className="tnum">{pages}</b> páginas</label>
      <input id="win-range" className="win-range" type="range" min={1} max={12} value={pages}
        onChange={(e) => setPages(+e.target.value)} />
      <p className="win-msg" data-over={over > 0 || undefined} aria-live="polite">
        {over > 0
          ? <>Te pasaste por <b>{over}</b>: el modelo deja fuera lo más antiguo. Conviene resumir o ir por partes.</>
          : <>Todo entra en la ventana: el modelo lo tiene a la vista para responder.</>}
      </p>
    </div>
  )
}

export function CapTokens() {
  return (
    <>
      <CapHead step="03 / 06" title="Tokens, tokenización y la ventana de contexto"
        lead="El modelo no lee letras ni frases: trabaja con pedacitos llamados tokens. Y solo «ve» los que caben en su ventana de contexto." />
      <div className="tok-slide up" style={st(1)}>
        <Tokenizer />
        <ContextWindow />
      </div>
    </>
  )
}

/* ===================================================================== *
 *  SLIDE 04 — Lo que pueden hacer hoy (flip cards)                       *
 * ===================================================================== */
function FlipCard({ c }: { c: typeof TODAY[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <button className="flip" data-open={open || undefined} data-warn={c.warn || undefined}
      aria-pressed={open} onClick={() => setOpen((o) => !o)}>
      <span className="flip-inner">
        <span className="flip-face flip-front">
          <span className="flip-icon" aria-hidden="true">{c.icon}</span>
          <span className="flip-k">{c.k}</span>
          <span className="flip-tag">{c.tag}</span>
          <span className="flip-que">{c.que}</span>
          <span className="flip-cue">Ver ejemplo →</span>
        </span>
        <span className="flip-face flip-back">
          <span className="fb-row"><span className="fb-i" aria-hidden="true">◎</span><span>{c.img}</span></span>
          <span className="fb-row"><span className="fb-i" aria-hidden="true">▸</span><span>{c.ej}</span></span>
          <span className="fb-row hot"><span className="fb-i" aria-hidden="true">★</span><span>{c.imp}</span></span>
        </span>
      </span>
    </button>
  )
}
export function CapHoy() {
  return (
    <>
      <CapHead step="04 / 06" title="Lo que pueden hacer hoy"
        lead="Ven y oyen más allá del texto, resuelven por pasos… y a veces inventan con total seguridad. Toca cada tarjeta para ver el ejemplo." />
      <div className="flips up" style={st(1)}>
        {TODAY.map((c) => <FlipCard key={c.k} c={c} />)}
      </div>
    </>
  )
}

/* ===================================================================== *
 *  SLIDE 05 — Cómo se vuelven expertos (fine-tuning ↔ RAG + embedding)   *
 * ===================================================================== */
export function CapExpertos() {
  const [idx, setIdx] = useState(1) // arranca en RAG
  const w = EXPERT_WAYS[idx]
  return (
    <>
      <CapHead step="05 / 06" title="Cómo se vuelven expertos en lo tuyo"
        lead="Dos caminos para que la IA sepa de lo tuyo: mandarla a un curso (fine-tuning) o darle un archivador para consultar (RAG). El embedding es la pieza que hace posible esa búsqueda." />
      <div className="exp up" style={st(1)}>
        <div className="seg" role="tablist" aria-label="Caminos">
          <span className="seg-thumb" style={{ transform: `translateX(${idx * 100}%)` }} aria-hidden="true" />
          {EXPERT_WAYS.map((e, i) => (
            <button key={e.id} role="tab" aria-selected={i === idx} className="seg-btn" data-on={i === idx || undefined}
              onClick={() => setIdx(i)}>{e.k}</button>
          ))}
        </div>

        <div className="exp-body" key={w.id}>
          <div className="exp-scene">
            <div className="scene-step"><span className="scene-n">1</span><b>{w.scene.actor}</b></div>
            <span className="scene-arrow" aria-hidden="true">→</span>
            <div className="scene-step"><span className="scene-n">2</span><b>{w.scene.action}</b></div>
            <span className="scene-arrow" aria-hidden="true">→</span>
            <div className="scene-step result"><span className="scene-n">3</span><b>{w.scene.result}</b></div>
          </div>
          <div className="exp-grid">
            <div className="exp-cell"><span className="exp-cap">Qué es</span><p>{w.que}</p></div>
            <div className="exp-cell"><span className="exp-cap">Imagínalo así</span><p>{w.img}</p></div>
            <div className="exp-cell"><span className="exp-cap">Ejemplo</span><p>{w.ej}</p></div>
            <div className="exp-cell two">
              <span className="exp-pro">✓ {w.pros}</span>
              <span className="exp-con">△ {w.cons}</span>
            </div>
          </div>
        </div>

        <div className="exp-embed">
          <span className="exp-embed-k">{EMBEDDING.k}<em>{EMBEDDING.tag}</em></span>
          <p>{EMBEDDING.que} <b>{EMBEDDING.imp}</b></p>
        </div>
      </div>
    </>
  )
}

/* ===================================================================== *
 *  SLIDE 06 — De herramienta a colaborador (agente + HITL + chips)       *
 * ===================================================================== */
function AgentFlow() {
  const [hitl, setHitl] = useState(true)
  const steps = [
    { t: 'Objetivo', d: '«Agenda la reunión»' },
    { t: 'Planifica', d: 'decide los pasos' },
    { t: 'Herramientas', d: 'calendario, correo' },
    ...(hitl ? [{ t: 'Tú apruebas', d: 'visto bueno', gate: true }] : []),
    { t: 'Resultado', d: 'tarea resuelta' },
  ] as { t: string; d: string; gate?: boolean }[]
  return (
    <div className="agent">
      <div className="agent-headrow">
        <span className="agent-title">Un agente recibe un objetivo y lo completa solo</span>
        <button className="switch" role="switch" aria-checked={hitl} data-on={hitl || undefined} onClick={() => setHitl((v) => !v)}>
          <span className="switch-track"><span className="switch-knob" /></span>
          <span className="switch-label">Human-in-the-loop</span>
        </button>
      </div>
      <div className="agent-flow">
        {steps.map((s, i) => (
          <div className="agent-step" data-gate={s.gate || undefined} key={s.t} style={st(i)}>
            <span className="as-t">{s.t}</span>
            <span className="as-d">{s.d}</span>
            {i < steps.length - 1 && <span className="as-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="agent-msg" data-on={hitl || undefined}>
        {hitl
          ? <>Con un punto de control, la máquina propone y <b>tú decides</b> antes de cada paso con consecuencias.</>
          : <>Sin control, el agente ejecuta todo solo: rápido, pero arriesgado en decisiones que importan.</>}
      </p>
    </div>
  )
}
export function CapColaborador() {
  return (
    <>
      <CapHead step="06 / 06" title="De herramienta a colaborador"
        lead="El salto del momento: de una IA que entrega texto a una que actúa por ti —con criterio humano en los puntos clave— y de un hábito reactivo a uno AI-first." />
      <div className="collab-slide up" style={st(1)}>
        <AgentFlow />
        <ConceptChips items={COLLAB} start={2} />
      </div>
    </>
  )
}

/* ===================================================================== *
 *  SLIDE — Cierre de la cápsula                                          *
 * ===================================================================== */
export function CapImporta() {
  const pills = [
    { k: 'Predice texto probable', d: 'por eso a veces alucina' },
    { k: 'Solo ve su ventana', d: 'dale el contexto que importa' },
    { k: 'RAG > re-entrenar', d: 'experto en lo tuyo, sin tocarlo' },
    { k: 'Agente + humano', d: 'velocidad con control' },
  ]
  return (
    <div className="cap-end">
      <p className="cap-kicker up" style={st(0)}><span className="cap-badge solid">Cápsula</span> Lo que de verdad importa</p>
      <h2 className="cap-bigtitle end up" style={st(1)}>
        Deja de probar herramientas a ciegas.<br /><span className="grad">Diseña tu trabajo con criterio.</span>
      </h2>
      <div className="end-pills up" style={st(2)}>
        {pills.map((p, i) => (
          <div className="end-pill" key={p.k} style={st(i + 1)}>
            <span className="ep-k">{p.k}</span>
            <span className="ep-d">{p.d}</span>
          </div>
        ))}
      </div>
      <p className="cap-biglead end up" style={st(3)}>
        Esa es la diferencia entre seguir la moda y ser <b>autónomo con la IA</b>.
      </p>
    </div>
  )
}
