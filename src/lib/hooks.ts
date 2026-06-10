import { useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useReduceMotion(): boolean {
  const [reduce, setReduce] = useState(prefersReduced)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fn = () => setReduce(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduce
}

/** Revela un elemento al entrar en viewport (una vez). */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) { el.classList.add('in'); return }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el) }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/** Devuelve el id de la sección activa y el progreso global de lectura [0..1]. */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
      const mid = window.scrollY + window.innerHeight * 0.32
      let cur = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [ids.join('|')])

  return { active, progress }
}
