import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useTheme } from '../lib/theme'
import AecodeLogo from './AecodeLogo'

export interface SlideDef { id: string; num: string; title: string; node: ReactNode }

/** True sólo cuando la diapositiva es la actual: dispara count-up y re-anima gráficas. */
export const SlideActiveContext = createContext(false)
/** Número de sección calculado automáticamente (secuencial), provisto a cada slide. */
export const SlideNumContext = createContext('')

/** Numeración automática: las slides cuyo `num` empieza por dígito se cuentan
 *  01,02,03…; las demás (portada '', tesis '·', cápsula '✦'/'F1'…) se conservan.
 *  Así, borrar o insertar slides nunca deja huecos en la numeración visible. */
function computeNums(slides: SlideDef[]): string[] {
  let c = 0
  return slides.map((s) => {
    if (/^[0-9]/.test(s.num)) { c++; return String(c).padStart(2, '0') }
    return s.num
  })
}

const PDF = `${import.meta.env.BASE_URL}Informe-IA-AEC-2026.pdf`

function readHash(total: number): number {
  const m = /^#(\d+)/.exec(location.hash)
  if (m) { const n = parseInt(m[1], 10) - 1; if (n >= 0 && n < total) return n }
  return 0
}

/** Una diapositiva. Solo la actual y sus vecinas montan contenido pesado:
 *  mantiene transiciones fluidas sin inicializar todos los charts a la vez. */
function SlideFrame({ state, mounted, id, index, total, label, displayNum, children }: {
  state: 'prev' | 'current' | 'next'; mounted: boolean; id: string; index: number; total: number; label: string; displayNum: string; children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => { const el = ref.current as any; if (el) el.inert = state !== 'current' }, [state])
  return (
    <section
      ref={ref}
      id={`slide-${id}`}
      className="slide"
      data-state={state}
      role="group"
      aria-roledescription="diapositiva"
      aria-label={`${index + 1} de ${total}: ${label}`}
      aria-hidden={state !== 'current'}
    >
      <div className="slide-inner"><div className="slide-content">
        {mounted ? (
          <SlideActiveContext.Provider value={state === 'current'}>
            <SlideNumContext.Provider value={displayNum}>{children}</SlideNumContext.Provider>
          </SlideActiveContext.Provider>
        ) : null}
      </div></div>
    </section>
  )
}

export default function Deck({ slides }: { slides: SlideDef[] }) {
  const total = slides.length
  const nums = computeNums(slides)
  const [cur, setCur] = useState(() => readHash(total))
  const [overview, setOverview] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const curRef = useRef(cur); curRef.current = cur
  const touch = useRef<{ x: number; y: number } | null>(null)

  const go = useCallback((i: number) => setCur(Math.max(0, Math.min(total - 1, i))), [total])
  const next = useCallback(() => go(curRef.current + 1), [go])
  const prev = useCallback(() => go(curRef.current - 1), [go])

  const toggleFs = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {})
    else document.exitFullscreen?.().catch(() => {})
  }, [])

  // Teclado: flechas / espacio / inicio-fin / índice (g·o) / pantalla completa (f)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) return
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); next(); break
        case 'ArrowLeft': case 'PageUp': e.preventDefault(); prev(); break
        case 'Home': e.preventDefault(); go(0); break
        case 'End': e.preventDefault(); go(total - 1); break
        case 'g': case 'G': case 'o': case 'O': setOverview((v) => !v); break
        case 'f': case 'F': toggleFs(); break
        case 'Escape': setOverview(false); break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, total, toggleFs])

  // Deep-linking por hash (#3) — compartible y restaurable al recargar.
  useEffect(() => { const h = `#${cur + 1}`; if (location.hash !== h) history.replaceState(null, '', h) }, [cur])
  useEffect(() => {
    const onHash = () => go(readHash(total))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [go, total])

  const onTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY } }
  const onTouchEnd = (e: React.TouchEvent) => {
    const t = touch.current; if (!t) return; touch.current = null
    const dx = e.changedTouches[0].clientX - t.x, dy = e.changedTouches[0].clientY - t.y
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.4) { if (dx < 0) next(); else prev() }
  }

  const cs = slides[cur]
  return (
    <div className="deck" data-overview={overview ? 'on' : undefined}>
      <div className="deck-progress" aria-hidden="true"><span style={{ width: `${((cur + 1) / total) * 100}%` }} /></div>

      {/* Marco HUD decorativo: brackets de esquina */}
      <span className="hud-c tl" aria-hidden="true" /><span className="hud-c tr" aria-hidden="true" />
      <span className="hud-c bl" aria-hidden="true" /><span className="hud-c br" aria-hidden="true" />

      <header className="deck-bar">
        <button className="deck-brand" onClick={() => go(0)} aria-label="AECODE · ir a la portada">
          <AecodeLogo className="deck-logo" />
          <span className="deck-brand-sub">State of AI in AEC</span>
        </button>
        <div className="deck-actions">
          <button className="icon-btn" onClick={() => setOverview((v) => !v)} aria-label="Índice de diapositivas" title="Índice (G)">▦</button>
          <button className="icon-btn" onClick={toggleTheme} aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`} title="Tema">{theme === 'dark' ? '☀' : '☾'}</button>
          <button className="icon-btn show-md" onClick={toggleFs} aria-label="Pantalla completa" title="Pantalla completa (F)">⤢</button>
          <a className="btn btn-cta deck-dl" href={PDF} target="_blank" rel="noopener" download><span aria-hidden="true">↓</span> PDF</a>
        </div>
      </header>

      <main className="slides" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {slides.map((s, i) => {
          const mounted = Math.abs(i - cur) <= 1
          return (
            <SlideFrame key={s.id} id={s.id} index={i} total={total} label={s.title} displayNum={nums[i]}
              mounted={mounted} state={i === cur ? 'current' : i < cur ? 'prev' : 'next'}>
              {s.node}
            </SlideFrame>
          )
        })}
      </main>

      <nav className="deck-nav" aria-label="Navegación de diapositivas">
        <button className="nav-arrow" onClick={prev} disabled={cur === 0} aria-label="Diapositiva anterior">‹</button>
        <button className="nav-count" onClick={() => setOverview(true)} aria-label={`Diapositiva ${cur + 1} de ${total}. Abrir índice`}>
          <span className="nc-cur tnum">{String(cur + 1).padStart(2, '0')}</span>
          <span className="nc-sep">/</span>
          <span className="nc-tot tnum">{String(total).padStart(2, '0')}</span>
          <span className="nc-title">{cs.title}</span>
        </button>
        <button className="nav-arrow" onClick={next} disabled={cur === total - 1} aria-label="Diapositiva siguiente">›</button>
      </nav>

      {overview && (
        <div className="overview" role="dialog" aria-modal="true" aria-label="Índice de diapositivas" onClick={() => setOverview(false)}>
          <div className="overview-inner" onClick={(e) => e.stopPropagation()}>
            <div className="overview-head">
              <h2>Índice · {total} diapositivas</h2>
              <button className="icon-btn" onClick={() => setOverview(false)} aria-label="Cerrar índice">✕</button>
            </div>
            <ol className="overview-grid">
              {slides.map((s, i) => (
                <li key={s.id}>
                  <button className={`ov-card ${i === cur ? 'active' : ''}`} onClick={() => { go(i); setOverview(false) }}>
                    <span className="ov-num tnum">{nums[i] || String(i + 1).padStart(2, '0')}</span>
                    <span className="ov-title">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
