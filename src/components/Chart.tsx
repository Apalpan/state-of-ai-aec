import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface Props {
  option: EChartsOption
  height?: number
  className?: string
  ariaLabel?: string
}

export default function Chart({ option, height = 300, className, ariaLabel }: Props) {
  const el = useRef<HTMLDivElement>(null)
  const inst = useRef<echarts.ECharts | null>(null)

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
