export default function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-ink/50">
          Dimensión {current} / {total}
        </span>
        <span className="font-mono text-xs text-blue">{pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
        <div
          className="h-full bg-blue rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      {label && <p className="font-display text-2xl text-ink mt-4">{label}</p>}
    </div>
  );
}
