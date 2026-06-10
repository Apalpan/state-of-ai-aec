import { useTheme } from '../lib/theme'

const PDF = `${import.meta.env.BASE_URL}Informe-IA-AEC-2026.pdf`

export default function TopBar({ progress }: { progress: number }) {
  const [theme, toggle] = useTheme()
  return (
    <header className="topbar">
      <span className="topbar-progress" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
      <a href="#inicio" className="topbar-brand">
        <span className="brand-dot" aria-hidden="true" />
        GEN<span className="plus">+</span>
      </a>
      <div className="topbar-actions">
        <button className="icon-btn" onClick={toggle} aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`} title="Cambiar tema">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <a className="btn btn-cta" href={PDF} target="_blank" rel="noopener" download>
          <span aria-hidden="true">↓</span> Descargar informe
        </a>
      </div>
    </header>
  )
}
