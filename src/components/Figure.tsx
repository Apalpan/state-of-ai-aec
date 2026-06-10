import { useMemo } from 'react'
import Chart from './Chart'
import { buildOption, figureHeight, type Figure as Fig } from '../lib/chartOptions'
import { useTheme } from '../lib/theme'
import { useReduceMotion } from '../lib/hooks'

function StatusBadge({ status }: { status?: string }) {
  if (status === 'verified') return <span className="badge verified" title="Dato con fuente externa">● Verificado</span>
  if (status === 'projection') return <span className="badge projection" title="Hipótesis a calibrar con la encuesta">○ Proyección</span>
  if (status === 'mixed') return <span className="badge" style={{ color: 'var(--blue)', border: '1px solid var(--border)' }}>◐ Mixto</span>
  return null
}

/** Tabla accesible (sr-only) construida desde los datos de la figura. */
function DataTable({ fig }: { fig: Fig }) {
  const d = fig.data || {}
  let rows: [string, string][] = []
  if (d.items) rows = d.items.map((i: any) => [i.label ?? i.name, `${i.value}${d.unit ?? ''}`])
  else if (fig.type === 'areaBand') rows = (d.x as string[]).map((x: string, i: number) => [x, `$${d.y[i]}B (rango $${d.low[i]}–$${d.high[i]}B)`])
  else if (fig.type === 'donut') rows = [[d.label, `${d.value}%`], [d.rest, `${100 - d.value}%`]]
  else if (fig.type === 'gauge') rows = [[d.label, `${d.value}%`]]
  else if (fig.type === 'heatmap') rows = (d.cells as number[][]).map((c) => [`${d.x[c[0]]} · ${d.y[c[1]]}`, `${c[2]}/${d.max}`])
  if (!rows.length) return null
  return (
    <table className="sr-only">
      <caption>{fig.title}. {fig.source}</caption>
      <thead><tr><th>Categoría</th><th>Valor</th></tr></thead>
      <tbody>{rows.map(([k, v], i) => <tr key={i}><td>{k}</td><td>{v}</td></tr>)}</tbody>
    </table>
  )
}

export default function Figure({ fig, height }: { fig: Fig; height?: number }) {
  const [theme] = useTheme()
  const reduce = useReduceMotion()
  const option = useMemo(() => buildOption(fig, theme === 'dark', reduce), [fig, theme, reduce])
  const h = height ?? figureHeight(fig)
  const alt = `${fig.title}. ${fig.source ?? ''}`

  return (
    <figure className="figure panel">
      <div className="figure-head">
        <h4 className="figure-title">{fig.title}</h4>
        <StatusBadge status={fig.status} />
      </div>
      <Chart option={option} height={h} ariaLabel={alt} />
      <DataTable fig={fig} />
      <figcaption className="figure-cap">
        {fig.note && <span className="figure-note">{fig.note} </span>}
        {fig.source && <span className="figure-src"><b>Fuente:</b> {fig.source}</span>}
        {fig.n && <span className="figure-n"> · n = {fig.n}</span>}
      </figcaption>
    </figure>
  )
}
