import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

/** Paleta de datos categórica (concreta para canvas, alineada con los tokens OKLCH). */
export const PALETTE: Record<string, string> = {
  blue: '#4F8DF7',
  indigo: '#6471F2',
  purple: '#8B5CF6',
  teal: '#2BC8D6',
  green: '#2DD4A7',
  orange: '#FF7A2F',
  amber: '#FBBF24',
  pink: '#F472B6',
  red: '#FB5B6B',
}

export interface ThemeColors {
  ink: string; muted: string; grid: string; axis: string; bg: string; tooltipBg: string; border: string
}
export function themeColors(isDark: boolean): ThemeColors {
  return isDark
    ? { ink: '#EAF0FF', muted: '#8C99B8', grid: 'rgba(255,255,255,0.08)', axis: 'rgba(255,255,255,0.13)', bg: '#0c1220', tooltipBg: 'rgba(18,24,40,0.94)', border: 'rgba(255,255,255,0.12)' }
    : { ink: '#1f2b40', muted: '#5b6680', grid: 'rgba(20,30,60,0.08)', axis: 'rgba(20,30,60,0.16)', bg: '#ffffff', tooltipBg: 'rgba(255,255,255,0.96)', border: 'rgba(20,30,60,0.12)' }
}

const col = (k: string) => PALETTE[k] || k
function grad(from: string, to: string, dir: 'h' | 'v' = 'h') {
  const [x2, y2] = dir === 'h' ? [1, 0] : [0, 1]
  return new echarts.graphic.LinearGradient(0, 0, x2, y2, [
    { offset: 0, color: col(from) },
    { offset: 1, color: col(to) },
  ])
}

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
      extraCssText: 'border-radius:12px;box-shadow:0 14px 34px -18px rgba(0,0,0,.55);backdrop-filter:blur(8px);padding:8px 12px;',
    },
  }
  const d = fig.data || {}
  const unit = d.unit ?? ''

  switch (fig.type) {
    /* ---------------- BARS (horizontal) ---------------- */
    case 'bars': {
      const items = d.items as any[]
      return {
        ...base,
        grid: { left: 4, right: 56, top: 8, bottom: 4, containLabel: true },
        tooltip: { ...base.tooltip, trigger: 'item', formatter: (p: any) => `${p.name}<br/><b style="font-size:14px">${p.value}${unit}</b>` },
        xAxis: { type: 'value', max: d.vmax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 10, formatter: `{value}${unit === '%' ? '%' : ''}` }, axisLine: { show: false }, axisTick: { show: false } },
        yAxis: { type: 'category', inverse: true, data: items.map((i) => i.label), axisLabel: { color: C.ink, fontSize: 11.5, width: 180, overflow: 'truncate' }, axisLine: { show: false }, axisTick: { show: false } },
        series: [{
          type: 'bar', barWidth: '58%',
          label: { show: true, position: 'right', color: C.ink, fontWeight: 700, fontSize: 12, formatter: (p: any) => `${p.value}${unit === '%' ? '%' : ''}` },
          data: items.map((i) => ({ value: i.value, itemStyle: { color: grad(i.from, i.to, 'h'), borderRadius: [0, 6, 6, 0] } })),
        }],
      }
    }
    /* ---------------- BARS (vertical) ---------------- */
    case 'barsV': {
      const items = d.items as any[]
      return {
        ...base,
        grid: { left: 6, right: 12, top: 28, bottom: 4, containLabel: true },
        tooltip: { ...base.tooltip, trigger: 'item', formatter: (p: any) => `${p.name}<br/><b style="font-size:14px">${p.value}${unit}</b>` },
        xAxis: { type: 'category', data: items.map((i) => i.label), axisLabel: { color: C.ink, fontSize: 10.5, interval: 0, lineHeight: 13 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false } },
        yAxis: { type: 'value', max: d.vmax, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 10 } },
        series: [{
          type: 'bar', barWidth: '46%',
          label: { show: true, position: 'top', color: C.ink, fontWeight: 700, fontSize: 12, formatter: (p: any) => `${p.value}` },
          data: items.map((i) => ({ value: i.value, itemStyle: { color: grad(i.from, i.to, 'v'), borderRadius: [6, 6, 0, 0] } })),
        }],
      }
    }
    /* ---------------- FUNNEL ---------------- */
    case 'funnel': {
      const items = d.items as any[]
      return {
        ...base,
        tooltip: { ...base.tooltip, trigger: 'item', formatter: (p: any) => `${p.name}<br/><b>${p.value}%</b>` },
        series: [{
          type: 'funnel', top: 6, bottom: 6, left: '6%', width: '88%', min: 0, max: 100, gap: 3, sort: 'descending',
          label: { color: '#fff', fontSize: 12, fontWeight: 600, formatter: '{b}  ·  {c}%' }, labelLine: { show: false },
          itemStyle: { borderWidth: 0 },
          emphasis: { label: { fontSize: 13 } },
          data: items.map((i) => ({ value: i.value, name: i.name, itemStyle: { color: grad(i.from, i.to, 'h') } })),
        }],
      }
    }
    /* ---------------- AREA + BAND ---------------- */
    case 'areaBand': {
      const x = d.x as string[]
      const low = d.low as number[]
      const high = d.high as number[]
      const diff = high.map((h, i) => h - low[i])
      const c = col(d.color || 'orange')
      return {
        ...base,
        grid: { left: 8, right: 18, top: 30, bottom: 4, containLabel: true },
        tooltip: { ...base.tooltip, trigger: 'axis', formatter: (ps: any) => { const p = ps.find((q: any) => q.seriesName === 'Mercado') || ps[0]; return `${p.axisValue}<br/><b style="font-size:14px">$${p.data}B</b>` } },
        xAxis: { type: 'category', boundaryGap: false, data: x, axisLabel: { color: C.ink, fontSize: 11 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false } },
        yAxis: { type: 'value', splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 10, formatter: '${value}B' } },
        series: [
          { name: 'low', type: 'line', data: low, stack: 'band', lineStyle: { opacity: 0 }, symbol: 'none', areaStyle: { color: 'transparent' }, silent: true },
          { name: 'band', type: 'line', data: diff, stack: 'band', lineStyle: { opacity: 0 }, symbol: 'none', areaStyle: { color: c, opacity: 0.14 }, silent: true },
          { name: 'Mercado', type: 'line', data: d.y, smooth: true, symbol: 'circle', symbolSize: 9,
            lineStyle: { width: 3, color: grad('orange', 'blue', 'h'), shadowBlur: 12, shadowColor: 'rgba(255,122,47,0.45)' },
            itemStyle: { color: c, borderColor: '#fff', borderWidth: 1.5 },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,122,47,0.34)' }, { offset: 1, color: 'rgba(255,122,47,0.0)' }]) },
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
          label: { color: C.muted, fontSize: 10.5, formatter: '{b}\n{c}%' }, labelLine: { lineStyle: { color: C.axis } },
          data: items.map((i) => ({ value: i.value, name: i.name, itemStyle: { color: col(i.color), shadowBlur: i.name === d.highlight ? 18 : 0, shadowColor: i.name === d.highlight ? 'rgba(255,122,47,0.6)' : 'transparent' } })),
        }],
      }
    }
    /* ---------------- TREEMAP ---------------- */
    case 'treemap': {
      const items = d.items as any[]
      return {
        ...base,
        tooltip: { ...base.tooltip, formatter: (p: any) => `${p.name}<br/><b>ROI/impacto: ${p.value}</b>` },
        series: [{
          type: 'treemap', roam: false, nodeClick: false, breadcrumb: { show: false }, top: 4, bottom: 4, left: 4, right: 4,
          itemStyle: { borderColor: C.bg, borderWidth: 2, gapWidth: 2, borderRadius: 7 },
          label: { color: '#fff', fontSize: 12, fontFamily: 'Space Grotesk Variable, sans-serif', fontWeight: 600 },
          breadcrumbStyle: {},
          data: items.map((i) => ({ name: i.name, value: i.value, itemStyle: { color: col(i.color) } })),
        }],
      }
    }
    /* ---------------- HEATMAP ---------------- */
    case 'heatmap': {
      return {
        ...base,
        tooltip: { ...base.tooltip, position: 'top', formatter: (p: any) => `${d.x[p.data[0]]} · ${d.y[p.data[1]]}<br/><b>uso: ${p.data[2]}/${d.max}</b>` },
        grid: { left: 6, right: 10, top: 8, bottom: 40, containLabel: true },
        xAxis: { type: 'category', data: d.x, axisLabel: { color: C.muted, fontSize: 9.5, rotate: 26 }, axisLine: { show: false }, axisTick: { show: false }, splitArea: { show: false } },
        yAxis: { type: 'category', data: d.y, axisLabel: { color: C.ink, fontSize: 10 }, axisLine: { show: false }, axisTick: { show: false }, splitArea: { show: false } },
        visualMap: { min: 0, max: d.max, calculable: false, orient: 'horizontal', left: 'center', bottom: 0, itemWidth: 11, itemHeight: 80, textStyle: { color: C.muted, fontSize: 9 }, inRange: { color: ['rgba(120,140,200,0.10)', PALETTE.blue, PALETTE.purple, PALETTE.orange] } },
        series: [{ type: 'heatmap', data: d.cells, itemStyle: { borderColor: C.bg, borderWidth: 3, borderRadius: 4 }, label: { show: false } }],
      }
    }
    /* ---------------- GAUGE ---------------- */
    case 'gauge': {
      return {
        ...base,
        series: [{
          type: 'gauge', startAngle: 220, endAngle: -40, min: 0, max: d.max || 100, radius: '94%', center: ['50%', '58%'],
          progress: { show: true, width: 16, roundCap: true, itemStyle: { color: grad('red', 'orange', 'h') } },
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
            { value: d.value, name: d.label, itemStyle: { color: grad('red', 'orange', 'v') } },
            { value: 100 - d.value, name: d.rest || 'Resto', itemStyle: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,30,60,0.08)' } },
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
          ? { width: 3.2, color: grad('orange', 'blue', 'h'), shadowBlur: 10, shadowColor: 'rgba(255,122,47,0.4)' }
          : { width: 1.8, color: s.name === 'Internet' ? PALETTE.purple : s.name === 'Teléfono' ? PALETTE.teal : C.muted },
        areaStyle: s.accent ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,122,47,0.16)' }, { offset: 1, color: 'rgba(255,122,47,0)' }]) } : undefined,
        emphasis: { focus: 'series' },
        data: s.values,
        z: s.accent ? 5 : 2,
      }))
      return {
        ...base,
        grid: { left: 6, right: 14, top: 30, bottom: 4, containLabel: true },
        legend: { top: 0, right: 0, textStyle: { color: C.muted, fontSize: 10.5 }, itemWidth: 14, itemHeight: 8, icon: 'roundRect' },
        tooltip: { ...base.tooltip, trigger: 'axis', valueFormatter: (v: any) => `${v}%` },
        xAxis: { type: 'category', data: x, name: d.xlabel, nameTextStyle: { color: C.muted, fontSize: 9 }, nameLocation: 'middle', nameGap: 24, axisLabel: { color: C.muted, fontSize: 10 }, axisLine: { lineStyle: { color: C.axis } }, axisTick: { show: false }, boundaryGap: false },
        yAxis: { type: 'value', max: 100, splitLine: { lineStyle: { color: C.grid } }, axisLabel: { color: C.muted, fontSize: 10, formatter: '{value}%' } },
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
          splitArea: { areaStyle: { color: [isDark ? 'rgba(79,141,247,0.03)' : 'rgba(79,141,247,0.04)', 'transparent'] } },
          axisLine: { lineStyle: { color: C.axis } },
        },
        series: [{
          type: 'radar', symbolSize: 5,
          lineStyle: { width: 2.4, color: PALETTE.purple },
          itemStyle: { color: PALETTE.orange },
          areaStyle: { color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [{ offset: 0, color: 'rgba(79,141,247,0.42)' }, { offset: 1, color: 'rgba(139,92,246,0.14)' }]) },
          data: [{ value: d.values, name: 'Índice del estudio' }],
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
    default: return 300
  }
}
