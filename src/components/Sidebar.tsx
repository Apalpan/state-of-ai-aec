import { NAV } from '../lib/nav'

export default function Sidebar({ active, progress }: { active: string; progress: number }) {
  return (
    <aside className="sidebar" aria-label="Índice del documento">
      <div className="sidebar-inner">
        <a href="#inicio" className="brand">
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-name">GEN<span className="plus">+</span> <span className="brand-sub">/ AECODE</span></span>
        </a>
        <p className="sidebar-kicker">State of AI in AEC · 2026</p>

        <nav className="toc">
          <span className="toc-track" aria-hidden="true"><span className="toc-fill" style={{ height: `${progress * 100}%` }} /></span>
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? 'toc-link active' : 'toc-link'} aria-current={active === n.id ? 'true' : undefined}>
                  <span className="toc-num">{n.num}</span>
                  <span className="toc-label">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="read-meter" aria-hidden="true">
          <span>Lectura</span>
          <span className="tnum">{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </aside>
  )
}
