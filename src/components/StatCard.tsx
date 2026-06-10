import AnimatedValue from './CountUp'

export interface Stat { value: string; label: string; source?: string; accent?: string }

export default function StatCard({ value, label, source, accent = 'blue' }: Stat) {
  return (
    <div className="stat" data-accent={accent}>
      <span className="stat-bar" aria-hidden="true" />
      <div className="stat-val tnum"><AnimatedValue text={value} /></div>
      <div className="stat-label">{label}</div>
      {source && <div className="stat-src">{source}</div>}
    </div>
  )
}
