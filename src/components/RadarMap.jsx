import { dimensionTexts } from "../data/diagnosticText";

const SIZE = 560;
const CENTER = SIZE / 2;
const MAX_R = 200;
const RINGS = [1, 2, 3, 4, 5];

function pointFor(index, total, value, maxValue = 5) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  const r = (value / maxValue) * MAX_R;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

export default function RadarMap({ dimensionResults }) {
  const total = dimensionResults.length;

  const dataPoints = dimensionResults.map((d, i) => pointFor(i, total, d.score));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const benchmarkPoints = dimensionResults.map((_, i) => pointFor(i, total, 4.2));
  const benchmarkPath = benchmarkPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="w-full flex justify-center bg-surface border border-line rounded-3xl py-8">
      <svg viewBox={`0 0 ${SIZE} ${SIZE + 40}`} className="w-full max-w-xl" role="img" aria-label="Mapa de madurez comercial en 10 dimensiones">
        <defs>
          <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B7FC4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FF4B4B" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Anillos de referencia */}
        {RINGS.map((ring) => {
          const pts = dimensionResults.map((_, i) => pointFor(i, total, ring));
          return (
            <polygon
              key={ring}
              points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#2E2F49"
              strokeWidth={ring === 5 ? 1.5 : 1}
            />
          );
        })}

        {/* Ejes */}
        {dimensionResults.map((_, i) => {
          const p = pointFor(i, total, 5);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="#2E2F49"
              strokeWidth={1}
            />
          );
        })}

        {/* Umbral "avanzado" de referencia */}
        <polygon
          points={benchmarkPath}
          fill="none"
          stroke="#D9A756"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          opacity={0.9}
        />

        {/* Área de resultados */}
        <polygon points={dataPath} fill="url(#fillGradient)" stroke="#6FA8DC" strokeWidth={2.5} strokeLinejoin="round" />

        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4.5} fill="#3B7FC4" stroke="#101020" strokeWidth={1.5} />
        ))}

        {/* Labels */}
        {dimensionResults.map((d, i) => {
          const labelPoint = pointFor(i, total, 5.85);
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total;
          const anchor =
            Math.cos(angle) > 0.3 ? "start" : Math.cos(angle) < -0.3 ? "end" : "middle";
          return (
            <g key={d.id}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor={anchor}
                fontSize="12"
                fontFamily="'Manrope', sans-serif"
                fontWeight={600}
                fill="#F5F4FA"
              >
                {String(d.number).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
