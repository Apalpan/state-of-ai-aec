import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../lib/hooks'

export default function Reveal({ children, className = '', style, delay }: {
  children: ReactNode; className?: string; style?: CSSProperties; delay?: number
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}>
      {children}
    </div>
  )
}
