import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'soa-theme-v2'

function current(): Theme {
  const t = document.documentElement.dataset.theme
  return t === 'dark' ? 'dark' : 'light'
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(current)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem(KEY, theme) } catch { /* ignore */ }
  }, [theme])

  const toggle = () => {
    // Desactiva transiciones durante el cambio para evitar flash (truco Paco Coursey).
    const root = document.documentElement
    const css = document.createElement('style')
    css.textContent = '*,*::before,*::after{transition:none !important}'
    root.appendChild(css)
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    requestAnimationFrame(() => requestAnimationFrame(() => root.removeChild(css)))
  }

  return [theme, toggle]
}
