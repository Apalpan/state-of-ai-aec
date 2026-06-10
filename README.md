# State of AI in AEC · Observatorio GEN+ 2026

> Observatorio científico **interactivo** del estado y la madurez de la Inteligencia Artificial
> en el mundo y en el sector **Arquitectura, Ingeniería y Construcción (AEC)**.
> Benchmark global + encuesta a **+1.000 profesionales** de Latinoamérica.
> Activo de autoridad del **AI Construction Summit 2026** (17–18 julio · CIP Lima).

**🔗 Sitio en vivo:** https://apalpan.github.io/state-of-ai-aec/
**📕 Informe PDF:** [`/public/Informe-IA-AEC-2026.pdf`](public/Informe-IA-AEC-2026.pdf)

---

## Qué es

Un *paper interactivo* — reporte científico navegable con el rigor de una publicación y la UX
de un producto premium (estilo *Stanford HAI AI Index* + *Our World in Data*). Mide la **brecha
entre el potencial de la IA (84,8 % de exposición) y su uso real** (25 % en oficina técnica,
<1 % en obra) en el sector AEC.

### Principios de rigor
- **Cada dato con fuente trazable** (ver [Referencias](#fuentes) y `data/sources.json`).
- Distinción explícita entre **`● verificado`** (fuente externa) y **`○ proyección`** (hipótesis a calibrar con la encuesta).
- **Datos auditables**: toda cifra vive en `data/*.json`, separada de la presentación.
- Metodología tarea-céntrica (Anthropic Economic Index): se pregunta por *tareas* antes que por *herramientas*.

## Estructura del repositorio

```
state-of-ai-aec/
├── data/                    # 📊 Datos auditables (separados de la UI)
│   ├── global.json          #    cifras ancla, radar, mundo, difusión
│   ├── dimensions.json      #    las 8 dimensiones + figuras
│   ├── sources.json         #    bibliografía
│   └── survey.json          #    esquema de la encuesta +1.000
├── src/
│   ├── styles/              # tokens OKLCH (GEN+), tipografía fluida, componentes
│   ├── lib/                 # chartOptions (ECharts), hooks, tema flash-free, nav
│   ├── components/          # Chart, Figure (con tabla accesible), Sidebar, StatCard…
│   └── sections/            # las 15 secciones del informe
├── public/                  # favicon, informe PDF descargable
└── .github/workflows/       # deploy automático a GitHub Pages
```

## Stack

- **Vite + React 18 + TypeScript**
- **Apache ECharts** para las visualizaciones interactivas (radar, embudo, área con banda de
  incertidumbre, nightingale, treemap, heatmap, gauge, líneas de difusión…)
- **CSS nativo 2026**: tokens **OKLCH**, `clamp()` fluido, `color-mix()`, `light-dark()`,
  tema claro/oscuro sin flash, motion `transform`/`opacity` <300 ms, `prefers-reduced-motion`.
- Sin dependencias de UI pesadas; fuentes self-hosted (Space Grotesk + Inter vía `@fontsource`).

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist
npm run preview    # sirve el build
```

## Accesibilidad y rendimiento

- Cada figura incluye una **tabla equivalente** para lectores de pantalla (`sr-only`) y `aria-label`.
- Navegación por teclado, focus visible, contraste ≥ 4.5:1, `font-size ≥ 16px`.
- `prefers-reduced-motion` desactiva animaciones y reveals.
- Objetivos Core Web Vitals: LCP < 2.5 s · INP < 200 ms · CLS < 0.1.

## Cómo actualizar los datos

Edita los JSON en `data/`. La encuesta (`survey.json`) tiene `status: "pending"`; al cerrar el
campo (n ≥ 1.000) se reemplazan los placeholders por resultados reales y se cambian los badges
`○ proyección` a `● verificado`.

## Fuentes

McKinsey · Anthropic Economic Index · Stanford HAI AI Index · Microsoft Work Trend Index ·
Mordor / Fortune BI / Precedence · Gartner · ServiceTitan · Datagrid · Klutch AI · OpenAsset ·
Hexagon · PMI · RCT MIT/GitHub/Wharton. Detalle completo en `data/sources.json` y en la sección
*Referencias* del sitio.

## Licencia

Código bajo **MIT**. Datos y contenido bajo **CC BY 4.0** — cita: ver `CITATION.cff`.

---

GEN+ / AECODE · `apalpan@genplusdesign.com`
