import { useContext, useEffect, useRef, useState } from 'react'
import { SlideActiveContext } from './Deck'
import { useReduceMotion } from '../lib/hooks'

/** Anima el PRIMER número que aparezca en `text`, conservando prefijo y sufijo.
 *  Soporta coma decimal (es-PE), %, $, ×, +, espacios. Si no hay número claro,
 *  o si el usuario prefiere menos movimiento, muestra el texto tal cual. */
export default function AnimatedValue({ text, duration = 1100 }: { text: string; duration?: number }) {
  const active = useContext(SlideActiveContext)
  const reduce = useReduceMotion()

  const m = /^(\D*?)(\d[\d.,]*)(.*)$/s.exec(text)
  if (!m) return <>{text}</>
  const [, pre, rawNum, post] = m

  // Detecta separador decimal: si hay coma seguida de 1–2 dígitos al final → decimal es-PE.
  const decimalComma = /,\d{1,2}$/.test(rawNum)
  const normalized = decimalComma ? rawNum.replace(/\./g, '').replace(',', '.') : rawNum.replace(/,/g, '')
  const target = parseFloat(normalized)
  const decimals = decimalComma ? (rawNum.split(',')[1]?.length ?? 0) : (normalized.split('.')[1]?.length ?? 0)

  const [val, setVal] = useState(reduce ? target : 0)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (reduce || !Number.isFinite(target)) { setVal(target); return }
    if (!active) { setVal(0); return }
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setVal(target * eased)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target, duration, reduce])

  const shown = val.toLocaleString('es-PE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return <>{pre}{shown}{post}</>
}
