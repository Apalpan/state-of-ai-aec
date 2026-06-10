import { useContext, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { SlideActiveContext } from './Deck'

interface Props {
  option: EChartsOption
  height?: number
  className?: string
  ariaLabel?: string
}

export default function Chart({ option, height = 300, className, ariaLabel }: Props) {
  const el = useRef<HTMLDivElement>(null)
  const inst = useRef<echarts.ECharts | null>(null)
  const active = useContext(SlideActiveContext)
  const wasActive = useRef(false)

  useEffect(() => {
    if (!el.current) return
    inst.current = echarts.init(el.current, undefined, { renderer: 'canvas' })
    const ro = new ResizeObserver(() => inst.current?.resize())
    ro.observe(el.current)
    return () => { ro.disconnect(); inst.current?.dispose(); inst.current = null }
  }, [])

  useEffect(() => {
    inst.current?.setOption(option, true)
  }, [option])

  // Re-anima la gráfica cada vez que su diapositiva se vuelve la actual (entrada premium).
  useEffect(() => {
    if (active && !wasActive.current) {
      inst.current?.resize()
      inst.current?.setOption(option, true)
    }
    wasActive.current = active
  }, [active, option])

  return (
    <div
      ref={el}
      className={className}
      style={{ width: '100%', height }}
      role="img"
      aria-label={ariaLabel}
    />
  )
}
