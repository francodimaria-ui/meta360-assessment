import { useEffect } from "react";
import RadarMap from "./RadarMap";

function ScorePill({ score, band }) {
  return (
    <div className="inline-flex items-center gap-2 bg-surface2 border border-line rounded-full px-4 py-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: band.color }} />
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

export default function Results({ participant, results, onRestart }) {
  const { dimensionResults, overallScore, overallBand, overallText, strengths, gaps } = results;

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
              Meta 360° · Informe de Madurez Comercial
            </span>
          </div>
          <button
            onClick={() => window.print()}
            className="font-body text-sm font-semibold text-dim hover:text-blue-light transition"
          >
            Descargar PDF ↓
          </button>
        </div>

        {/* Hero */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.2em] text-blue-light uppercase mb-3">
            Informe personalizado
          </p>
          <h1 className="font-display font-medium text-3xl sm:text-4xl text-ink mb-2">
            {participant.name}
          </h1>
          <p className="font-body text-dim mb-8">
            {participant.role} · {participant.company}
          </p>

          <div className="grid sm:grid-cols-[1fr_auto] gap-8 items-center bg-surface border border-line rounded-3xl p-8 sm:p-10">
            <div>
              <p className="font-body text-sm text-dim mb-2">Madurez comercial global</p>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display font-medium text-6xl text-ink">{overallScore.toFixed(1)}</span>
                <span className="font-body text-dim text-lg">/ 5</span>
                <span
                  className="font-body text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${overallBand.color}25`, color: overallBand.color }}
                >
                  {overallBand.label}
                </span>
              </div>
              <p className="font-body text-dim leading-relaxed">{overallText}</p>
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className="mb-14">
          <h2 className="font-display font-medium text-2xl text-ink mb-1">Mapa de Madurez Comercial</h2>
          <p className="font-body text-sm text-dim mb-6">
            Las 10 dimensiones evaluadas. La línea punteada dorada marca el umbral de madurez avanzada (4.5).
          </p>
          <RadarMap dimensionResults={dimensionResults} />
        </div>

        {/* Fortalezas y focos */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div>
            <h3 className="font-display font-medium text-xl text-ink mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue" /> Fortalezas
            </h3>
            <div className="space-y-4">
              {strengths.map((d) => (
                <DimensionCard key={d.id} d={d} variant="strength" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display font-medium text-xl text-ink mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red" /> Focos prioritarios
            </h3>
            <div className="space-y-4">
              {gaps.map((d) => (
                <DimensionCard key={d.id} d={d} variant="gap" />
              ))}
            </div>
          </div>
        </div>

        {/* Detalle completo */}
        <div className="mb-14">
          <h3 className="font-display font-medium text-xl text-ink mb-4">Detalle por dimensión</h3>
          <div className="space-y-4">
            {dimensionResults.map((d) => (
              <DimensionCard key={d.id} d={d} variant="neutral" />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="print:hidden bg-surface2 border border-line rounded-3xl p-8 sm:p-10 text-center mb-10">
          <h3 className="font-display font-medium text-2xl text-ink mb-3">
            ¿Querés trabajar estos focos prioritarios con AIC?
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
