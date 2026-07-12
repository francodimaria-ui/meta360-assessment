import { useEffect } from "react";
import RadarMap from "./RadarMap";

function ScorePill({ score, band }) {
  return (
    <div className="inline-flex items-center gap-2 bg-surface2 border border-line rounded-full px-4 py-1.5">
      <span>{band.emoji}</span>
      <span className="font-mono text-sm text-ink">{score.toFixed(1)}</span>
      <span className="font-body text-xs text-dim">{band.label}</span>
    </div>
  );
}

function DimensionCard({ d, variant }) {
  const border =
    variant === "strength" ? "border-blue/40" : variant === "gap" ? "border-red/40" : "border-line";
  return (
    <div className={`bg-surface rounded-2xl border ${border} p-6`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="font-mono text-xs text-dim">{String(d.number).padStart(2, "0")}</p>
          <h4 className="font-display text-lg text-ink">{d.title}</h4>
        </div>
        <ScorePill score={d.score} band={d.band} />
      </div>
      <p className="font-body text-sm text-dim leading-relaxed">{d.text}</p>
    </div>
  );
}

function ScoreTable({ dimensionResults }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-line bg-surface2">
            <th className="font-body text-xs text-dim uppercase tracking-wide px-4 py-3">Dimensión</th>
            <th className="font-body text-xs text-dim uppercase tracking-wide px-4 py-3">Puntaje</th>
            <th className="font-body text-xs text-dim uppercase tracking-wide px-4 py-3">%</th>
            <th className="font-body text-xs text-dim uppercase tracking-wide px-4 py-3">Semáforo</th>
          </tr>
        </thead>
        <tbody>
          {dimensionResults.map((d) => (
            <tr key={d.id} className="border-b border-line last:border-0">
              <td className="font-body text-sm text-ink px-4 py-3">
                {String(d.number).padStart(2, "0")} · {d.title}
              </td>
              <td className="font-mono text-sm text-ink px-4 py-3">{d.score.toFixed(1)}/5</td>
              <td className="font-mono text-sm text-dim px-4 py-3">{d.pct}%</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1.5 font-body text-xs" style={{ color: d.band.color }}>
                  {d.band.emoji} {d.band.label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InsightCard({ insight, index }) {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 sm:p-7">
      <p className="font-mono text-xs text-blue-light mb-3">INSIGHT {index + 1}</p>
      <h4 className="font-display font-medium text-xl text-ink mb-4 leading-snug">{insight.title}</h4>
      <p className="font-body text-sm text-dim leading-relaxed mb-4">{insight.interpretation}</p>
      <div className="pt-4 border-t border-line">
        <p className="font-body text-xs text-blue-light uppercase tracking-wide mb-1">¿Por qué importa?</p>
        <p className="font-body text-sm text-ink/80 leading-relaxed">{insight.why}</p>
      </div>
    </div>
  );
}

function PriorityCard({ p, index }) {
  return (
    <div className="bg-surface border border-red/30 rounded-2xl p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3 mb-4">
        <p className="font-mono text-xs text-red">PRIORIDAD {index + 1}</p>
        <ScorePill score={p.score} band={p.band} />
      </div>
      <h4 className="font-display font-medium text-lg text-ink mb-4">{p.title}</h4>
      <div className="space-y-3">
        <div>
          <p className="font-body text-xs text-dim uppercase tracking-wide mb-1">Evidencia</p>
          <p className="font-body text-sm text-ink/80 leading-relaxed">{p.text}</p>
        </div>
        <div>
          <p className="font-body text-xs text-dim uppercase tracking-wide mb-1">Decisión</p>
          <p className="font-body text-sm text-ink/80 leading-relaxed">{p.decision}</p>
        </div>
      </div>
    </div>
  );
}

function RoadmapStep({ step, isLast }) {
  return (
    <div className="flex-1 relative">
      <div className="bg-surface border border-line rounded-2xl p-6 h-full flex flex-col">
        <p className="font-mono text-xs text-blue-light uppercase tracking-wide mb-2">{step.title}</p>
        <h5 className="font-display font-medium text-base text-ink mb-2">{step.focus}</h5>
        <p className="font-body text-sm text-dim leading-relaxed mb-4 italic">{step.objetivo}</p>

        <p className="font-body text-xs text-ink/50 uppercase tracking-wide mb-2">Acciones</p>
        <ul className="space-y-2 mb-4 flex-1">
          {step.acciones.map((accion, i) => (
            <li key={i} className="font-body text-sm text-ink/80 leading-snug flex gap-2">
              <span className="text-blue-light shrink-0">→</span>
              <span>{accion}</span>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-line">
          <p className="font-body text-xs text-ink/50 uppercase tracking-wide mb-1">Métrica de seguimiento</p>
          <p className="font-body text-sm text-ink/80 leading-snug">{step.metrica}</p>
        </div>
      </div>
      {!isLast && (
        <div className="hidden sm:flex absolute top-1/2 -right-4 -translate-y-1/2 text-dim/40">→</div>
      )}
    </div>
  );
}

export default function Results({ participant, results, onRestart }) {
  const {
    dimensionResults,
    overallScore,
    overallBand,
    overallText,
    strengths,
    gaps,
    insights,
    systemMap,
    priorities,
    roadmap,
  } = results;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen px-6 py-14 print:py-0 print:bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 print:hidden">
          <div className="flex items-center gap-3">
            <img src="/logo-aic.png" alt="AIC" className="h-9 w-auto" />
            <span className="font-body text-xs tracking-wide text-dim uppercase">
              Meta 360° · Executive Commercial Diagnostic
            </span>
          </div>
          <button
            onClick={() => window.print()}
            className="font-body text-sm font-semibold text-dim hover:text-blue-light transition"
          >
            Descargar PDF ↓
          </button>
        </div>

        {/* PÁGINA 1 — Executive Scorecard */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.2em] text-blue-light uppercase mb-3">
            Executive Scorecard
          </p>
          <h1 className="font-display font-medium text-3xl sm:text-4xl text-ink mb-2">
            {participant.name}
          </h1>
          <p className="font-body text-dim mb-8">
            {participant.role} · {participant.company}
          </p>

          <div className="grid sm:grid-cols-[1fr_auto] gap-8 items-center bg-surface border border-line rounded-3xl p-8 sm:p-10">
            <div>
              <p className="font-body text-sm text-dim mb-2">Índice general de madurez</p>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display font-medium text-6xl text-ink">{overallScore.toFixed(1)}</span>
                <span className="font-body text-dim text-lg">/ 5</span>
                <span
                  className="font-body text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${overallBand.color}25`, color: overallBand.color }}
                >
                  {overallBand.emoji} {overallBand.label}
                </span>
              </div>
              <p className="font-body text-dim leading-relaxed">{overallText}</p>
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className="mb-10">
          <h2 className="font-display font-medium text-2xl text-ink mb-1">Mapa de Madurez Comercial</h2>
          <p className="font-body text-sm text-dim mb-6">
            Las 10 dimensiones evaluadas. La línea punteada dorada marca el umbral de fortaleza (85%).
          </p>
          <RadarMap dimensionResults={dimensionResults} />
        </div>

        {/* Tabla de puntajes */}
        <div className="mb-14">
          <ScoreTable dimensionResults={dimensionResults} />
        </div>

        {/* Fortalezas (top 3, simple) */}
        <div className="mb-14">
          <h3 className="font-display font-medium text-xl text-ink mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue" /> Top 3 Fortalezas
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {strengths.map((d) => (
              <DimensionCard key={d.id} d={d} variant="strength" />
            ))}
          </div>
        </div>

        {/* PÁGINA 2 — Executive Insights */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.2em] text-blue-light uppercase mb-3">Página 2</p>
          <h2 className="font-display font-medium text-2xl text-ink mb-1">Executive Insights</h2>
          <p className="font-body text-sm text-dim mb-6">
            Los 3 patrones más relevantes detectados al cruzar dimensiones entre sí.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} index={i} />
            ))}
          </div>
        </div>

        {/* PÁGINA 3 — Commercial System Map */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.2em] text-blue-light uppercase mb-3">Página 3</p>
          <h2 className="font-display font-medium text-2xl text-ink mb-6">Commercial System Map</h2>
          <div className="bg-surface border border-line rounded-3xl p-8 space-y-4 mb-4">
            <p className="font-body text-sm text-ink/80 leading-relaxed">{systemMap.interaction}</p>
            <p className="font-body text-sm text-ink/80 leading-relaxed">{systemMap.desbalance}</p>
            <p className="font-body text-sm text-ink/80 leading-relaxed">{systemMap.risk}</p>
          </div>
          <div className="bg-red/10 border border-red/30 rounded-2xl p-6">
            <p className="font-mono text-xs text-red uppercase tracking-wide mb-2">
              Cuello de botella principal
            </p>
            <p className="font-display font-medium text-lg text-ink">
              {systemMap.bottleneckTitle} · {systemMap.bottleneckPct}%
            </p>
          </div>
        </div>

        {/* PÁGINA 4 — Board Priorities */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.2em] text-blue-light uppercase mb-3">Página 4</p>
          <h2 className="font-display font-medium text-2xl text-ink mb-6">Board Priorities</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {priorities.map((p, i) => (
              <PriorityCard key={p.id} p={p} index={i} />
            ))}
          </div>
        </div>

        {/* PÁGINA 5 — Executive Roadmap */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.2em] text-blue-light uppercase mb-3">Página 5</p>
          <h2 className="font-display font-medium text-2xl text-ink mb-6">Executive Roadmap · 90 días</h2>
          <div className="flex flex-col sm:flex-row items-stretch gap-6 sm:gap-4 mb-6">
            <RoadmapStep step={roadmap.day30} />
            <RoadmapStep step={roadmap.day60} />
            <RoadmapStep step={roadmap.day90} isLast />
          </div>
          <div className="bg-surface2 border border-line rounded-2xl p-6">
            <p className="font-body text-xs text-dim uppercase tracking-wide mb-3">Impacto esperado</p>
            <div className="flex flex-wrap gap-3">
              {roadmap.impact.map((item) => (
                <span
                  key={item}
                  className="font-body text-sm text-ink bg-surface border border-line rounded-full px-4 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detalle completo (apéndice) */}
        <div className="mb-14">
          <h3 className="font-display font-medium text-xl text-ink mb-4">Anexo · Detalle por dimensión</h3>
          <div className="space-y-4">
            {dimensionResults.map((d) => (
              <DimensionCard key={d.id} d={d} variant="neutral" />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="print:hidden bg-surface2 border border-line rounded-3xl p-8 sm:p-10 text-center mb-10">
          <h3 className="font-display font-medium text-2xl text-ink mb-3">
            ¿Querés trabajar estas prioridades con AIC?
          </h3>
          <p className="font-body text-dim mb-6 max-w-lg mx-auto">
            Este autodiagnóstico es el punto de partida del modelo Meta 360°. Un
            consultor de AIC puede ayudarte a convertirlo en un plan de acción.
          </p>
          <a
            href="https://aic-consultora.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-blue text-white font-body font-semibold px-7 py-3.5 rounded-full hover:bg-red transition-colors"
          >
            Conocer AIC →
          </a>
        </div>

        <div className="print:hidden text-center">
          <button
            onClick={onRestart}
            className="font-body text-sm text-dim hover:text-ink transition"
          >
            Volver a empezar
          </button>
        </div>
      </div>
    </div>
  );
}
