import dims from '../../data/dimensions.json'

export interface NavItem { id: string; label: string; num: string; group?: boolean }

export const NAV: NavItem[] = [
  { id: 'inicio', label: 'Inicio', num: '00' },
  { id: 'resumen', label: 'Resumen ejecutivo', num: '01' },
  { id: 'metodologia', label: 'Metodología', num: '02' },
  { id: 'mundo', label: 'La IA en el mundo', num: '03' },
  ...dims.map((d) => ({ id: `dim-${d.id}`, label: d.title, num: d.num })),
  { id: 'encuesta', label: 'La voz del sector', num: '04' },
  { id: 'conclusiones', label: 'Conclusiones', num: '05' },
  { id: 'referencias', label: 'Referencias', num: '06' },
]

export const NAV_IDS = NAV.map((n) => n.id)
