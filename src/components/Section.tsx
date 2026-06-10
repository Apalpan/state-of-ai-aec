import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function Section({ id, num, eyebrow, title, lead, children }: {
  id: string; num: string; eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-h`}>
      <Reveal>
        <p className="eyebrow"><span className="idx">{num}</span> {eyebrow}</p>
        <h2 id={`${id}-h`}>{title}</h2>
        <div className="kicker-line" />
        {lead && <p className="lead">{lead}</p>}
      </Reveal>
      {children}
    </section>
  )
}
