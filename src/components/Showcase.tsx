/* =========================================================================
   Showcase — slides rediseñados con máxima interactividad (estilo AECODE).
   SurpriseStat · FableShowcase · ParadoxGap · PhaseLadder
   ========================================================================= */
import { useContext, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { SlideActiveContext } from './Deck'
import { useReduceMotion } from '../lib/hooks'
import AnimatedValue from './CountUp'
import worldRaw from '../../data/world.json'

const W: any = worldRaw
const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

/* ===================================================================== *
 *  Cap1Divider — portada de la Cápsula 1                                 *
 * ===================================================================== */
const CAP1_ITEMS = ['Mercado e inversión', 'Capacidades 2026', 'Adopción y costos', 'Herramientas', 'Productividad', 'IA en el sector AEC']
export function Cap1Divider() {
  return (
    <div className="part-div">
      <p className="cap-kicker up" style={st(0)}><span className="cap-badge solid">Cápsula 1</span> de 2</p>
      <h2 className="cap-bigtitle up" style={st(1)}>Estado, mercado e <span className="grad">impacto</span> de la IA</h2>
      <p className="cap-biglead up" style={st(2)}>Qué tan grande es, qué tan rápido crece y qué puede hacer hoy — del mundo a la obra.</p>
      <div className="part-chips up" style={st(3)}>
        {CAP1_ITEMS.map((t, i) => <span className="part-chip" key={t} style={st(i + 1)}>{t}</span>)}
      </div>
    </div>
  )
}

/* ===================================================================== *
 *  SurpriseStat — «Un dato que nadie espera»                             *
 * ===================================================================== */
const SURPRISE_SUPPORT = [
  { v: '88%', l: 'de las empresas del mundo ya usan IA', s: 'McKinsey 2025', accent: 'green' },
  { v: '4 de 5', l: 'estudiantes universitarios usan IA en sus trabajos', s: 'Stanford HAI 2026', accent: 'blue' },
  { v: '53%', l: 'de la población mundial adoptó IA generativa en solo 3 años', s: 'Stanford HAI 2026', accent: 'teal' },
]
export function SurpriseStat() {
  const active = useContext(SlideActiveContext)
  const reduce = useReduceMotion()
  const [after, setAfter] = useState(reduce)
  useEffect(() => {
    if (reduce) { setAfter(true); return }
    if (!active) { setAfter(false); return }
    const t = window.setTimeout(() => setAfter(true), 520)
    return () => window.clearTimeout(t)
  }, [active, reduce])
  const women = after ? 52 : 20
  return (
    <div className="surprise">
      <div className="surprise-hero up" style={st(0)}>
        <span className="surprise-emoji" aria-hidden="true">🤯</span>
        <p className="eyebrow">Un dato que nadie espera</p>
        <h2 className="surprise-big">
          <span className="surprise-num tnum"><AnimatedValue text="52%" /></span>
          <span className="surprise-word">mujeres</span>
        </h2>
        <p className="surprise-lead">
          Cuando ChatGPT lanzó, el <b>80% de usuarios eran hombres</b>. Hoy, en 2026, el <b>52% son mujeres</b>.
          Dejó de ser una herramienta «de tecnólogos»: hoy es de uso general.
        </p>

        <div className="split" role="group" aria-label="Reparto de usuarios por género">
          <button className="split-toggle" onClick={() => setAfter((v) => !v)} aria-pressed={after}>
            <span data-on={!after || undefined}>2022</span>
            <span data-on={after || undefined}>2026</span>
          </button>
          <div className="split-bar">
            <span className="split-women" style={{ width: `${women}%` }}>
              <span className="split-tag">Mujeres {women}%</span>
            </span>
            <span className="split-men" style={{ width: `${100 - women}%` }}>
              <span className="split-tag">Hombres {100 - women}%</span>
            </span>
          </div>
        </div>
        <p className="src-note"><b>Fuente:</b> Stanford HAI AI Index 2026 · TechnologyChecker / FatJoe ChatGPT Stats.</p>
      </div>

      <div className="surprise-cards up" style={st(1)}>
        {SURPRISE_SUPPORT.map((c, i) => (
          <div className="surprise-card" data-accent={c.accent} key={i} style={st(i + 1)}>
            <span className="sc-bar" aria-hidden="true" />
            <span className="sc-v tnum"><AnimatedValue text={c.v} /></span>
            <span className="sc-l">{c.l}</span>
            <span className="sc-s">{c.s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ===================================================================== *
 *  FableShowcase — la frontera en vivo (Claude Fable 5)                  *
 * ===================================================================== */
export function FableShowcase() {
  const active = useContext(SlideActiveContext)
  const [sel, setSel] = useState(0)
  const f = W.frontier
  const stats = f.stats as { value: string; label: string; source: string; accent: string }[]
  const s = stats[sel]
  return (
    <div className="fable">
      <div className="fable-main up" style={st(0)}>
        <div className="fable-flag"><span className="pulse" aria-hidden="true" /> En vivo · anunciado el 9 jun 2026</div>
        <h2 className="fable-title">Claude <span className="grad">Fable&nbsp;5</span></h2>
        <p className="fable-lead">{f.lead}</p>
        <div className="fable-price">
          <span className="fp-up">Capacidad <b>↑</b></span>
          <span className="fp-down">Precio <b>↓</b> a la mitad</span>
          <span className="fp-note">US$10 / US$50 por millón de tokens</span>
        </div>
        <div className="fable-results" role="tablist" aria-label="Resultados reales">
          {stats.map((x, i) => (
            <button key={i} role="tab" aria-selected={i === sel} className="fable-chip" data-on={i === sel || undefined}
              onClick={() => setSel(i)}>{x.value}</button>
          ))}
        </div>
        <div className="fable-detail" key={sel}>
          <span className="fd-v tnum">{s.value}</span>
          <span className="fd-l">{s.label}</span>
          <span className="fd-s">{s.source}</span>
        </div>
      </div>

      <div className="fable-viz up" style={st(1)} aria-hidden="true">
        <FrontierViz active={active} />
        <span className="fable-viz-cap">La capacidad de frontera, año a año</span>
      </div>
    </div>
  )
}

function FrontierViz({ active }: { active: boolean }) {
  // Curva de frontera animada (SVG) — sube con un glow teal.
  const pts = [12, 20, 30, 46, 64, 82, 96]
  const W2 = 320, H = 220, pad = 16
  const stepX = (W2 - pad * 2) / (pts.length - 1)
  const x = (i: number) => pad + i * stepX
  const y = (v: number) => H - pad - (v / 100) * (H - pad * 2)
  const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(pts.length - 1).toFixed(1)},${H - pad} L${x(0).toFixed(1)},${H - pad} Z`
  return (
    <svg className="frontier-svg" viewBox={`0 0 ${W2} ${H}`} data-on={active || undefined} role="img" aria-label="Curva de capacidad de frontera ascendente">
      <defs>
        <linearGradient id="fillTeal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--accent-bright)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="fv-area" d={area} fill="url(#fillTeal)" />
      <path className="fv-line" d={line} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((v, i) => <circle key={i} className="fv-dot" cx={x(i)} cy={y(v)} r={i === pts.length - 1 ? 6 : 3.4} style={st(i)} />)}
    </svg>
  )
}

/* ===================================================================== *
 *  ParadoxGap — la paradoja del gigante dormido (interactivo)           *
 * ===================================================================== */
const PARADOX = [
  { id: 'world', v: '88%', pct: 88, l: 'del mundo ya usa IA en alguna función', s: 'McKinsey · State of AI 2025', accent: 'green' },
  { id: 'aec', v: '<12%', pct: 12, l: 'de la construcción la usa de forma regular', s: 'RICS · AI in Construction 2025', accent: 'red' },
  { id: 'exp', v: '84,8%', pct: 85, l: 'de exposición a la IA en arquitectura e ingeniería', s: 'Anthropic Economic Index', accent: 'teal' },
]
export function ParadoxGap() {
  const active = useContext(SlideActiveContext)
  const reduce = useReduceMotion()
  const [grow, setGrow] = useState(reduce)
  const [sel, setSel] = useState<string | null>(null)
  useEffect(() => {
    if (reduce) { setGrow(true); return }
    if (!active) { setGrow(false); return }
    const t = window.setTimeout(() => setGrow(true), 350)
    return () => window.clearTimeout(t)
  }, [active, reduce])
  return (
    <div className="pgap up" style={st(1)}>
      <div className="pgap-bars">
        {PARADOX.map((p) => (
          <button key={p.id} className="pgap-row" data-accent={p.accent} data-sel={sel === p.id || undefined}
            aria-pressed={sel === p.id} onClick={() => setSel((s) => (s === p.id ? null : p.id))}>
            <span className="pgap-v tnum"><AnimatedValue text={p.v} /></span>
            <span className="pgap-track"><span className="pgap-fill" style={{ width: grow ? `${p.pct}%` : '0%' }} /></span>
            <span className="pgap-l">{p.l}</span>
            <span className="pgap-s">{p.s}</span>
          </button>
        ))}
      </div>
      <p className="pgap-foot">
        El sector más grande de la economía mundial es también el menos digitalizado.
        La IA ya es de uso común en las empresas; en la obra, sigue entre la curiosidad y el piloto.
        <b> Esa distancia es la oportunidad.</b>
      </p>
    </div>
  )
}
