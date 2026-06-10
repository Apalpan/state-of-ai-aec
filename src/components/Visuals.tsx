import type { CSSProperties } from 'react'

const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

/* ----------------------------- TIMELINE ------------------------------- */
export function Timeline({ events }: { events: { year: string; t: string; d: string }[] }) {
  return (
    <div className="timeline up" style={st(1)}>
      <span className="tl-rail" aria-hidden="true" />
      {events.map((e, i) => (
        <div className="tl-item" key={i} style={st(i + 1)}>
          <span className="tl-dot" aria-hidden="true" />
          <span className="tl-year">{e.year}</span>
          <span className="tl-title">{e.t}</span>
          <span className="tl-desc">{e.d}</span>
        </div>
      ))}
    </div>
  )
}

/* --------------------- PROCESO IA GENERATIVA + TOKENS ----------------- */
export function GenAIProcess({ steps, tokens, note }: {
  steps: { n: string; t: string; d: string }[]; tokens: string[]; note: string
}) {
  return (
    <div className="genai">
      <div className="flow up" style={st(1)}>
        {steps.map((s, i) => (
          <div className="flow-step" key={i} style={st(i + 1)}>
            <span className="fs-n">{s.n}</span>
            <span className="fs-t">{s.t}</span>
            <span className="fs-d">{s.d}</span>
            {i < steps.length - 1 && <span className="fs-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <div className="token-demo up" style={st(2)}>
        <span className="td-label">Tokenización</span>
        <div className="td-tokens">
          {tokens.map((t, i) => <span className="token" key={i} style={st(i + 1)}>{t.trim() === '' ? '␣' : t}</span>)}
        </div>
        <p className="td-note">{note}</p>
      </div>
    </div>
  )
}

/* ------------------------- ESCALERA DE CONCEPTOS ---------------------- */
export function ConceptLadder({ items }: { items: { k: string; does: string; risk: string; lvl: number }[] }) {
  return (
    <div className="ladder up" style={st(1)}>
      {items.map((it, i) => (
        <div className="rung" key={i} data-lvl={it.lvl} style={st(i + 1)}>
          <span className="rung-lvl">{it.lvl}</span>
          <div className="rung-body">
            <span className="rung-k">{it.k}</span>
            <span className="rung-does">{it.does}</span>
          </div>
          <span className="rung-risk"><b>Riesgo:</b> {it.risk}</span>
        </div>
      ))}
    </div>
  )
}

/* ----------------------------- TABLERO TOOLS -------------------------- */
export function ToolBoard({ cats }: { cats: { cat: string; tools: string[] }[] }) {
  return (
    <div className="toolboard up" style={st(1)}>
      {cats.map((c, i) => (
        <div className="tb-cat" key={i} style={st(i + 1)}>
          <span className="tb-name">{c.cat}</span>
          <div className="tb-tools">
            {c.tools.map((t) => <span className="tb-tool" key={t}>{t}</span>)}
          </div>
        </div>
      ))}
    </div>
  )
}

/* --------------------------- BREAKTHROUGHS --------------------------- */
export function Breakthroughs({ items }: {
  items: { icon: string; t: string; d: string; src: string }[]
}) {
  return (
    <div className="breaks up" style={st(1)}>
      {items.map((it, i) => (
        <div className="break" key={i} style={st(i + 1)}>
          <span className="break-n" aria-hidden="true">{it.icon}</span>
          <span className="break-t">{it.t}</span>
          <span className="break-d">{it.d}</span>
          <span className="break-src">{it.src}</span>
        </div>
      ))}
    </div>
  )
}

/* ----------------------------- PLANES DE PAGO ------------------------- */
export function PricingTiers({ tiers }: {
  tiers: { name: string; price: string; who: string; share: number; feat: string; accent: string }[]
}) {
  return (
    <div className="tiers up" style={st(1)}>
      {tiers.map((t, i) => (
        <div className="tier" key={i} data-accent={t.accent} style={st(i + 1)}>
          <span className="tier-bar" aria-hidden="true" />
          <span className="tier-name">{t.name}</span>
          <span className="tier-price">{t.price}</span>
          <span className="tier-who">{t.who}</span>
          <span className="tier-feat">{t.feat}</span>
          <div className="tier-share" aria-hidden="true">
            <span className="ts-track"><span className="ts-fill" style={{ width: `${t.share}%` }} /></span>
            <span className="ts-pct">{t.share}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}
