import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

/** Paleta de datos — AECODE: TEAL + GRAFITO (concreta para canvas, alineada
 *  con los tokens --d-* OKLCH). El teal es el acento; el resto, grafito/gris frío. */
export const PALETTE: Record<string, string> = {
  green: '#0aa06b',
  teal: '#19c985',
  blue: '#2f3a3a',
  indigo: '#4e5b59',
  purple: '#78847f',
  orange: '#97a19c',
  amber: '#bec6c1',
  pink: '#65716c',
  red: '#121715',
}

/** Acento verde Jarvis de marca + helpers de transparencia. */
const GREEN = '#0aa06b'
const ga = (a: number) => `rgba(10,160,107,${a})`
/** Rampa verde (oscuro→claro) para treemap/funnel/heatmap monocromos. */
const GREEN_RAMP = ['#054b32', '#076b47', '#0aa06b', '#13ba7e', '#2bd194', '#5cdcab', '#90e9c6', '#c2f4e0']

export interface ThemeColors {
  ink: string; muted: string; grid: string; axis: string; bg: string; tooltipBg: string; border: string
}
export function themeColors(isDark: boolean): ThemeColors {
  return isDark
    ? { ink: '#eaf0ee', muted: '#9aa2aa', grid: 'rgba(255,255,255,0.08)', axis: 'rgba(255,255,255,0.14)', bg: '#191f24', tooltipBg: 'rgba(22,28,33,0.95)', border: 'rgba(255,255,255,0.12)' }
    : { ink: '#1f262c', muted: '#5b646d', grid: 'rgba(20,36,44,0.07)', axis: 'rgba(20,36,44,0.16)', bg: '#ffffff', tooltipBg: 'rgba(255,255,255,0.97)', border: 'rgba(20,36,44,0.12)' }
}

const col = (k: string) => PALETTE[k] || k
function grad(from: string, to: string, dir: 'h' | 'v' = 'h') {
  const [x2, y2] = dir === 'h' ? [1, 0] : [0, 1]
  return new echarts.graphic.LinearGradient(0, 0, x2, y2, [
    { offset: 0, color: col(from) },
    { offset: 1, color: col(to) },
  ])
}
/** Etiqueta blanca con halo, legible sobre teselas claras u oscuras. */
const haloLabel = (size: number) => ({
  color: '#fff', fontSize: size, fontWeight: 600,
  fontFamily: 'Space Grotesk Variable, sans-serif',
  textBorderColor: 'rgba(12,24,18,0.45)', textBorderWidth: 2.5,
})

export interface Figure {
  id: string; type: string; title: string; source?: string; n?: string | null
  note?: string; status?: string; data: any
}

export function buildOption(fig: Figure, isDark: boolean, reduce: boolean): EChartsOption {
  const C = themeColors(isDark)
  const base: any = {
    animation: !reduce,
    animationDuration: 780,
    animationEasing: 'cubicOut',
    textStyle: { fontFamily: 'Inter Variable, Inter, system-ui, sans-serif', color: C.ink },
    tooltip: {
      backgroundColor: C.tooltipBg, borderColor: C.border, borderWidth: 1,
      textStyle: { color: C.ink, fontSize: 12, fontFamily: 'Inter Variable, Inter, sans-serif' },
      extraCssText: 'border-radius:12px;box-shadow:0 14px 34px -18px rgba(0,0,0,.35);backdrop-filter:blur(8px);padding:8px 12px;',
    },
  }
  const d = fig.data || {}
  const unit = d.unit ?? ''

  switch (fig.type) {
    /* ---------------- BARS (horizontal) ---------------- */
    case 'bars': {
      const items = d.items as any[]
      const human = d.human as number | undefined
      const hl = d.highlight as string | undefined
      return {
        ...base,
        grid: { left: 4, right: 66, top: human != null ? 20 : 8, bottom: 4, containLabel: true },
        tooltip: { ...base.tooltip, trigger: 'item', axisPointer: { type: 'shadow' }, formatter: (p: any) => `${p.name}<br/><b style="font-size:15px;color:${GREEN}">${p.value}${unit}</b>` },
        xAxis: { type: 'value', max: d.vmax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 11, formatter: `{value}${unit === '%' ? '%' : ''}` }, axisLine: { show: false }, axisTick: { show: false } },
        yAxis: { type: 'category', inverse: true, data: items.map((i) => i.label), axisLabel: { color: C.ink, fontSize: 12.5, width: 260, overflow: 'break', lineHeight: 14 }, axisLine: { show: false }, axisTick: { show: false } },
        series: [{
          type: 'bar', barWidth: '60%', cursor: 'default',
          label: { show: true, position: 'right', color: C.ink, fontWeight: 700, fontSize: 13.5, formatter: (p: any) => `${p.value}${unit === '%' ? '%' : ''}` },
          emphasis: { focus: 'self', itemStyle: { shadowBlur: 16, shadowColor: ga(0.45) } },
          animationDelay: (i: number) => 70 + i * 90, animationDuration: 720, animationEasing: 'cubicOut',
          data: items.map((i) => {
            const isHl = hl && i.label === hl
            return {
              value: i.value,
              label: isHl ? { color: GREEN, fontWeight: 800 } : undefined,
              itemStyle: { color: grad(i.from || 'green', i.to || 'teal', 'h'), borderRadius: [0, 7, 7, 0], ...(isHl ? { shadowBlur: 18, shadowColor: ga(0.5) } : {}) },
            }
          }),
          ...(human != null ? { markLine: { silent: true, symbol: 'none', lineStyle: { color: C.muted, type: 'dashed', width: 1.6 }, label: { formatter: d.humanLabel || `humano ${human}${unit}`, color: C.muted, fontSize: 11.5, position: 'insideEndTop' }, data: [{ xAxis: human }] } } : {}),
        }],
      }
    }
    /* ---------------- COMPARE BARS (uno destacado en verde, resto grafito) ---------------- */
    case 'compareBars': {
      const items = d.items as any[]
      const hl = d.highlight as string | undefined
      const m1 = isDark ? '#3f4a44' : '#cdd5cf'
      const m2 = isDark ? '#525d57' : '#b3bcb6'
      return {
        ...base,
        grid: { left: 4, right: 70, top: 8, bottom: 4, containLabel: true },
        tooltip: { ...base.tooltip, trigger: 'item', formatter: (p: any) => `${p.name}<br/><b style="font-size:15px">${p.value}${unit}</b>` },
        xAxis: { type: 'value', max: d.vmax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 10 }, axisLine: { show: false }, axisTick: { show: false } },
        yAxis: { type: 'category', inverse: true, data: items.map((i) => i.label), axisLabel: { color: C.ink, fontSize: 12.5, width: 260, overflow: 'break', lineHeight: 14 }, axisLine: { show: false }, axisTick: { show: false } },
        series: [{
          type: 'bar', barWidth: '56%', cursor: 'default',
          label: { show: true, position: 'right', fontWeight: 700, fontSize: 13.5, formatter: (p: any) => `${p.value}${unit}` },
          emphasis: { focus: 'self', itemStyle: { shadowBlur: 16, shadowColor: ga(0.4) } },
          animationDelay: (i: number) => 70 + i * 100, animationDuration: 720, animationEasing: 'cubicOut',
          data: items.map((i) => {
            const isHl = hl && i.label === hl
            return {
              value: i.value,
              label: { color: isHl ? GREEN : C.ink, fontWeight: isHl ? 800 : 700 },
              itemStyle: { color: isHl ? grad('green', 'teal', 'h') : grad(m1, m2, 'h'), borderRadius: [0, 7, 7, 0], ...(isHl ? { shadowBlur: 20, shadowColor: ga(0.55) } : {}) },
            }
          }),
        }],
      }
    }
    /* ---------------- WATERFALL (cascada: creados / desplazados / neto) ---------------- */
    case 'waterfall': {
      const items = d.items as any[]
      let run = 0
      const place: number[] = []
      const bar: number[] = []
      const colors: any[] = []
      items.forEach((it) => {
        if (it.kind === 'total') { place.push(0); bar.push(Math.abs(it.value)); colors.push(grad('green', 'teal', 'v')) }
        else if (it.value >= 0) { place.push(run); bar.push(it.value); colors.push(grad('teal', 'green', 'v')); run += it.value }
        else { run += it.value; place.push(run); bar.push(Math.abs(it.value)); colors.push(grad(isDark ? '#525d57' : '#b3bcb6', isDark ? '#3f4a44' : '#9aa39e', 'v')) }
      })
      return {
        ...base,
        grid: { left: 6, right: 12, top: 30, bottom: 4, containLabel: true },
        tooltip: { ...base.tooltip, trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: (ps: any) => { const i = ps[0].dataIndex; const v = items[i].value; return `${items[i].label}<br/><b style="font-size:15px">${v > 0 ? '+' : ''}${v}${unit}</b>` } },
        xAxis: { type: 'category', data: items.map((i) => i.label), axisLabel: { color: C.ink, fontSize: 11.5, interval: 0, lineHeight: 13 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false } },
        yAxis: { type: 'value', max: d.vmax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 11, formatter: `{value}${unit}` } },
        series: [
          { type: 'bar', stack: 'wf', silent: true, itemStyle: { color: 'transparent' }, emphasis: { disabled: true }, tooltip: { show: false }, data: place },
          { type: 'bar', stack: 'wf', barWidth: '48%', cursor: 'default',
            label: { show: true, position: 'top', color: C.ink, fontWeight: 700, fontSize: 13, formatter: (p: any) => { const v = items[p.dataIndex].value; return `${v > 0 ? '+' : ''}${v}` } },
            emphasis: { focus: 'self', itemStyle: { shadowBlur: 16, shadowColor: ga(0.4) } },
            animationDelay: (i: number) => 100 + i * 150, animationDuration: 760, animationEasing: 'cubicOut',
            data: bar.map((v, i) => ({ value: v, itemStyle: { color: colors[i], borderRadius: [6, 6, 0, 0] } })) },
        ],
      }
    }
    /* ---------------- BARS (vertical) ---------------- */
    case 'barsV': {
      const items = d.items as any[]
      return {
        ...base,
        grid: { left: 6, right: 12, top: 28, bottom: 4, containLabel: true },
        tooltip: { ...base.tooltip, trigger: 'item', formatter: (p: any) => `${p.name}<br/><b style="font-size:14px">${p.value}${unit}</b>` },
        xAxis: { type: 'category', data: items.map((i) => i.label), axisLabel: { color: C.ink, fontSize: 11.5, interval: 0, lineHeight: 13 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false } },
        yAxis: { type: 'value', max: d.vmax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 10 } },
        series: [{
          type: 'bar', barWidth: '46%', cursor: 'default',
          label: { show: true, position: 'top', color: C.ink, fontWeight: 700, fontSize: 13.5, formatter: (p: any) => `${p.value}${unit}` },
          emphasis: { focus: 'self', itemStyle: { shadowBlur: 16, shadowColor: ga(0.42) } },
          animationDelay: (i: number) => 70 + i * 100, animationDuration: 740, animationEasing: 'cubicOut',
          data: items.map((i) => ({ value: i.value, itemStyle: { color: grad(i.from, i.to, 'v'), borderRadius: [6, 6, 0, 0] } })),
        }],
      }
    }
    /* ---------------- FUNNEL (rampa verde) ---------------- */
    case 'funnel': {
      const items = d.items as any[]
      const n = items.length
      return {
        ...base,
        tooltip: { ...base.tooltip, trigger: 'item', formatter: (p: any) => `${p.name}<br/><b>${p.value}%</b>` },
        series: [{
          type: 'funnel', top: 6, bottom: 6, left: '6%', width: '88%', min: 0, max: 100, gap: 3, sort: 'descending',
          label: { ...haloLabel(12), formatter: '{b}  ·  {c}%' }, labelLine: { show: false },
          itemStyle: { borderWidth: 0 },
          emphasis: { label: { fontSize: 13 } },
          data: items.map((i, idx) => ({ value: i.value, name: i.name, itemStyle: { color: GREEN_RAMP[Math.round((idx / Math.max(1, n - 1)) * (GREEN_RAMP.length - 1))] } })),
        }],
      }
    }
    /* ---------------- AREA + BAND ---------------- */
    case 'areaBand': {
      const x = d.x as string[]
      const low = d.low as number[]
      const high = d.high as number[]
      const diff = high.map((h, i) => h - low[i])
      return {
        ...base,
        grid: { left: 8, right: 18, top: 30, bottom: 4, containLabel: true },
        tooltip: { ...base.tooltip, trigger: 'axis', formatter: (ps: any) => { const p = ps.find((q: any) => q.seriesName === 'Mercado') || ps[0]; return `${p.axisValue}<br/><b style="font-size:14px">$${p.data}B</b>` } },
        xAxis: { type: 'category', boundaryGap: false, data: x, axisLabel: { color: C.ink, fontSize: 11 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false } },
        yAxis: { type: 'value', splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 11, formatter: '${value}B' } },
        series: [
          { name: 'low', type: 'line', data: low, stack: 'band', lineStyle: { opacity: 0 }, symbol: 'none', areaStyle: { color: 'transparent' }, silent: true },
          { name: 'band', type: 'line', data: diff, stack: 'band', lineStyle: { opacity: 0 }, symbol: 'none', areaStyle: { color: GREEN, opacity: 0.12 }, silent: true },
          { name: 'Mercado', type: 'line', data: d.y, smooth: true, symbol: 'circle', symbolSize: 9,
            lineStyle: { width: 3, color: GREEN, shadowBlur: 12, shadowColor: ga(0.45) },
            itemStyle: { color: GREEN, borderColor: '#fff', borderWidth: 1.5 },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: ga(0.32) }, { offset: 1, color: ga(0.0) }]) },
            label: { show: true, position: 'top', color: C.ink, fontWeight: 700, fontSize: 11, formatter: '${@[1]}B' } },
        ],
      }
    }
    /* ---------------- ROSE / NIGHTINGALE ---------------- */
    case 'rose': {
      const items = d.items as any[]
      return {
        ...base,
        tooltip: { ...base.tooltip, trigger: 'item', formatter: (p: any) => `${p.name}<br/><b>${p.value}%</b>` },
        series: [{
          type: 'pie', radius: ['16%', '80%'], center: ['50%', '52%'], roseType: 'area',
          itemStyle: { borderRadius: 6, borderColor: C.bg, borderWidth: 2 },
          label: { color: C.muted, fontSize: 11.5, formatter: '{b}\n{c}%' }, labelLine: { lineStyle: { color: C.axis } },
          data: items.map((i) => ({ value: i.value, name: i.name, itemStyle: { color: i.name === d.highlight ? GREEN : col(i.color), shadowBlur: i.name === d.highlight ? 18 : 0, shadowColor: i.name === d.highlight ? ga(0.6) : 'transparent' } })),
        }],
      }
    }
    /* ---------------- TREEMAP (rampa verde por orden) ---------------- */
    case 'treemap': {
      const items = d.items as any[]
      const n = items.length
      return {
        ...base,
        tooltip: { ...base.tooltip, formatter: (p: any) => `${p.name}<br/><b>ROI/impacto: ${p.value}</b>` },
        series: [{
          type: 'treemap', roam: false, nodeClick: false, breadcrumb: { show: false }, top: 4, bottom: 4, left: 4, right: 4,
          itemStyle: { borderColor: C.bg, borderWidth: 2, gapWidth: 2, borderRadius: 7 },
          label: haloLabel(12),
          data: items.map((i, idx) => ({ name: i.name, value: i.value, itemStyle: { color: GREEN_RAMP[Math.round((idx / Math.max(1, n - 1)) * (GREEN_RAMP.length - 1))] } })),
        }],
      }
    }
    /* ---------------- HEATMAP (gris → verde) ---------------- */
    case 'heatmap': {
      return {
        ...base,
        tooltip: { ...base.tooltip, position: 'top', formatter: (p: any) => `${d.x[p.data[0]]} · ${d.y[p.data[1]]}<br/><b>uso: ${p.data[2]}/${d.max}</b>` },
        grid: { left: 6, right: 10, top: 8, bottom: 40, containLabel: true },
        xAxis: { type: 'category', data: d.x, axisLabel: { color: C.muted, fontSize: 10.5, rotate: 26 }, axisLine: { show: false }, axisTick: { show: false }, splitArea: { show: false } },
        yAxis: { type: 'category', data: d.y, axisLabel: { color: C.ink, fontSize: 10 }, axisLine: { show: false }, axisTick: { show: false }, splitArea: { show: false } },
        visualMap: { min: 0, max: d.max, calculable: false, orient: 'horizontal', left: 'center', bottom: 0, itemWidth: 11, itemHeight: 80, textStyle: { color: C.muted, fontSize: 10 }, inRange: { color: [isDark ? 'rgba(255,255,255,0.06)' : '#eef3f0', '#bfe9d6', '#4fd0a0', '#0aa06b', '#054b32'] } },
        series: [{ type: 'heatmap', data: d.cells, itemStyle: { borderColor: C.bg, borderWidth: 3, borderRadius: 4 }, label: { show: false } }],
      }
    }
    /* ---------------- GAUGE ---------------- */
    case 'gauge': {
      return {
        ...base,
        series: [{
          type: 'gauge', startAngle: 220, endAngle: -40, min: 0, max: d.max || 100, radius: '94%', center: ['50%', '58%'],
          progress: { show: true, width: 16, roundCap: true, itemStyle: { color: grad('green', 'teal', 'h') } },
          axisLine: { lineStyle: { width: 16, color: [[1, C.grid]] } },
          pointer: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false }, anchor: { show: false },
          title: { show: true, offsetCenter: [0, '26%'], color: C.muted, fontSize: 12, fontFamily: 'Inter Variable, sans-serif' },
          detail: { valueAnimation: !reduce, offsetCenter: [0, '-4%'], fontFamily: 'Space Grotesk Variable, sans-serif', fontSize: 42, fontWeight: 700, color: C.ink, formatter: '{value}%' },
          data: [{ value: d.value, name: d.label }],
        }],
      }
    }
    /* ---------------- DONUT ---------------- */
    case 'donut': {
      return {
        ...base,
        tooltip: { ...base.tooltip, trigger: 'item', formatter: (p: any) => `${p.name}<br/><b>${p.value}%</b>` },
        graphic: [
          { type: 'text', left: 'center', top: '40%', style: { text: `${d.value}%`, fontFamily: 'Space Grotesk Variable, sans-serif', fontSize: 40, fontWeight: 700, fill: C.ink } },
          { type: 'text', left: 'center', top: '58%', style: { text: d.label, fontFamily: 'Inter Variable, sans-serif', fontSize: 11, fill: C.muted, textAlign: 'center' } },
        ],
        series: [{
          type: 'pie', radius: ['60%', '84%'], center: ['50%', '50%'], label: { show: false }, labelLine: { show: false },
          itemStyle: { borderColor: C.bg, borderWidth: 3 },
          data: [
            { value: d.value, name: d.label, itemStyle: { color: grad('green', 'teal', 'v') } },
            { value: 100 - d.value, name: d.rest || 'Resto', itemStyle: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,40,30,0.08)' } },
          ],
        }],
      }
    }
    /* ---------------- DIFFUSION (líneas) ---------------- */
    case 'diffusion': {
      const x = d.x as number[]
      const series = (d.series as any[]).map((s) => ({
        name: s.name, type: 'line', smooth: true, symbol: s.accent ? 'circle' : 'none', symbolSize: 6,
        lineStyle: s.accent
          ? { width: 3.4, color: GREEN, shadowBlur: 10, shadowColor: ga(0.4) }
          : { width: 1.8, color: s.name === 'Internet' ? PALETTE.blue : s.name === 'Teléfono' ? PALETTE.indigo : PALETTE.purple },
        itemStyle: s.accent ? { color: GREEN, borderColor: '#fff', borderWidth: 1.4 } : undefined,
        areaStyle: s.accent ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: ga(0.16) }, { offset: 1, color: ga(0) }]) } : undefined,
        emphasis: { focus: 'series' },
        data: s.values,
        z: s.accent ? 5 : 2,
      }))
      return {
        ...base,
        grid: { left: 6, right: 14, top: 30, bottom: 4, containLabel: true },
        legend: { top: 0, right: 0, textStyle: { color: C.muted, fontSize: 11.5 }, itemWidth: 14, itemHeight: 8, icon: 'roundRect' },
        tooltip: { ...base.tooltip, trigger: 'axis', valueFormatter: (v: any) => `${v}%` },
        xAxis: { type: 'category', data: x, name: d.xlabel, nameTextStyle: { color: C.muted, fontSize: 10 }, nameLocation: 'middle', nameGap: 24, axisLabel: { color: C.muted, fontSize: 10 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false }, boundaryGap: false },
        yAxis: { type: 'value', max: 100, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 11, formatter: '{value}%' } },
        series,
      }
    }
    /* ---------------- RADAR ---------------- */
    case 'radar': {
      return {
        ...base,
        tooltip: { ...base.tooltip, trigger: 'item' },
        radar: {
          center: ['50%', '54%'], radius: '68%',
          indicator: d.indicators,
          axisName: { color: C.ink, fontSize: 11, fontFamily: 'Space Grotesk Variable, sans-serif' },
          splitLine: { lineStyle: { color: C.grid } },
          splitArea: { areaStyle: { color: [isDark ? 'rgba(10,160,107,0.05)' : 'rgba(10,160,107,0.06)', 'transparent'] } },
          axisLine: { lineStyle: { color: C.axis } },
        },
        series: [{
          type: 'radar', symbolSize: 5,
          lineStyle: { width: 2.4, color: GREEN },
          itemStyle: { color: GREEN },
          areaStyle: { color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [{ offset: 0, color: ga(0.38) }, { offset: 1, color: ga(0.08) }]) },
          data: [{ value: d.values, name: 'Índice del estudio' }],
        }],
      }
    }
    /* ---------------- GROWTH (multi-línea, escala log opcional) ---------------- */
    case 'growth': {
      const log = !!d.log
      const sci = (v: number) => {
        const e = Math.round(Math.log10(v))
        const sup = String(e).replace(/[0-9]/g, (n) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+n])
        return `10${sup}`
      }
      const series = (d.series as any[]).map((s) => ({
        name: s.name, type: 'line', smooth: !log, symbol: 'circle', symbolSize: s.accent ? 7 : 0,
        lineStyle: s.accent
          ? { width: 3.4, color: GREEN, shadowBlur: 12, shadowColor: ga(0.4) }
          : { width: 1.8, type: 'dashed', color: C.muted },
        itemStyle: s.accent ? { color: GREEN, borderColor: '#fff', borderWidth: 1.5 } : { color: C.muted },
        areaStyle: s.accent && !log ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: ga(0.20) }, { offset: 1, color: ga(0) }]) } : undefined,
        emphasis: { focus: 'series' }, data: s.values, z: s.accent ? 5 : 2,
      }))
      return {
        ...base,
        grid: { left: 8, right: 16, top: 30, bottom: 4, containLabel: true },
        legend: (d.series as any[]).length > 1 ? { top: 0, right: 0, textStyle: { color: C.muted, fontSize: 11.5 }, itemWidth: 16, itemHeight: 8, icon: 'roundRect' } : undefined,
        tooltip: { ...base.tooltip, trigger: 'axis', valueFormatter: (v: any) => (log ? `${sci(v)} ${unit}` : `${v}${unit}`) },
        xAxis: { type: 'category', boundaryGap: false, data: d.x, axisLabel: { color: C.muted, fontSize: 11.5 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false } },
        yAxis: log
          ? { type: 'log', min: d.ymin, max: d.ymax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 11, formatter: (v: number) => sci(v) } }
          : { type: 'value', min: d.ymin, max: d.ymax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 11, formatter: `{value}${unit}` } },
        series,
      }
    }
    /* ---------------- GROUP BARS (clúster + referencia humana) ---------------- */
    case 'groupBars': {
      const cats = d.categories as any[]
      const groups = d.groups as string[]
      const colors = (d.colors as string[]) || ['indigo', 'green']
      const series = groups.map((g, gi) => ({
        name: g, type: 'bar', barGap: '12%', barWidth: groups.length > 1 ? '30%' : '46%', cursor: 'default',
        label: { show: true, position: 'top', color: C.ink, fontWeight: 700, fontSize: 11, formatter: (p: any) => `${p.value}${unit}` },
        itemStyle: { color: grad(colors[gi], colors[gi], 'v'), borderRadius: [6, 6, 0, 0] },
        emphasis: { focus: 'series', itemStyle: { shadowBlur: 14, shadowColor: ga(0.4) } },
        animationDelay: (i: number) => 80 + i * 70 + gi * 40, animationDuration: 720, animationEasing: 'cubicOut',
        data: cats.map((c) => c.values[gi]),
        ...(gi === groups.length - 1 && d.human
          ? { markLine: { silent: true, symbol: 'none', lineStyle: { color: C.muted, type: 'dashed', width: 1.4 }, label: { formatter: 'referencia humana', color: C.muted, fontSize: 11, position: 'insideEndTop' }, data: [{ yAxis: d.human }] } }
          : {}),
      }))
      // gradiente real por grupo
      series.forEach((s: any, gi: number) => { s.itemStyle = { color: grad(colors[gi], colors[gi] === 'green' ? 'teal' : 'purple', 'v'), borderRadius: [6, 6, 0, 0] } })
      return {
        ...base,
        grid: { left: 6, right: 12, top: 34, bottom: 4, containLabel: true },
        legend: { top: 0, left: 0, textStyle: { color: C.muted, fontSize: 11.5 }, itemWidth: 16, itemHeight: 8, icon: 'roundRect' },
        tooltip: { ...base.tooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: { type: 'category', data: cats.map((c) => c.label), axisLabel: { color: C.ink, fontSize: 11.5, interval: 0, lineHeight: 13 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false } },
        yAxis: { type: 'value', max: d.vmax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 11, formatter: `{value}${unit}` } },
        series,
      }
    }
    /* ---------------- RADAR MULTI (comparar modelos) ---------------- */
    case 'radarMulti': {
      const ss = d.series as any[]
      return {
        ...base,
        legend: { top: 0, right: 0, textStyle: { color: C.muted, fontSize: 11.5 }, itemWidth: 16, itemHeight: 8, icon: 'roundRect' },
        tooltip: { ...base.tooltip, trigger: 'item' },
        radar: {
          center: ['50%', '56%'], radius: '64%', indicator: d.indicators,
          axisName: { color: C.ink, fontSize: 11.5, fontFamily: 'Space Grotesk Variable, sans-serif' },
          splitLine: { lineStyle: { color: C.grid } },
          splitArea: { areaStyle: { color: [isDark ? 'rgba(255,255,255,0.02)' : 'rgba(20,40,30,0.025)', 'transparent'] } },
          axisLine: { lineStyle: { color: C.axis } },
        },
        series: [{
          type: 'radar', symbolSize: 4,
          data: ss.map((s) => ({
            value: s.values, name: s.name,
            lineStyle: { width: 2.2, color: col(s.color) },
            itemStyle: { color: col(s.color) },
            areaStyle: { color: col(s.color), opacity: 0.10 },
          })),
        }],
      }
    }
    default:
      return base
  }
}

/** Altura sugerida por tipo de figura. */
export function figureHeight(fig: Figure): number {
  switch (fig.type) {
    case 'bars': return Math.max(230, (fig.data?.items?.length ?? 4) * 48)
    case 'compareBars': return Math.max(230, (fig.data?.items?.length ?? 4) * 54)
    case 'waterfall': return 300
    case 'barsV': return 270
    case 'funnel': return 290
    case 'areaBand': return 300
    case 'rose': return 320
    case 'treemap': return 300
    case 'heatmap': return 320
    case 'gauge': return 280
    case 'donut': return 280
    case 'diffusion': return 300
    case 'radar': return 340
    case 'growth': return 330
    case 'groupBars': return 320
    case 'radarMulti': return 360
    default: return 300
  }
}
