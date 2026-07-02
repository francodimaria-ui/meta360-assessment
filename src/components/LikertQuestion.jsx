const SCALE = [1, 2, 3, 4, 5];

export default function LikertQuestion({ number, text, value, onChange }) {
  return (
    <div className="bg-surface border border-line rounded-2xl shadow-card p-6 sm:p-7">
      <p className="font-body text-ink text-base sm:text-lg leading-snug mb-6">
        <span className="text-blue-light font-mono text-sm mr-2">{number}.</span>
        {text}
      </p>
      <div className="flex items-center justify-between gap-1 sm:gap-3">
        <span className="font-body text-xs text-dim w-14 shrink-0">Nunca</span>
        <div className="flex-1 flex items-center justify-between">
          {SCALE.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`Puntaje ${n}`}
              className={`likert-dot h-10 w-10 sm:h-11 sm:w-11 rounded-full border-2 font-body text-sm font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue/50 ${
                value === n
                  ? "bg-blue border-blue text-white scale-110"
                  : "bg-surface2 border-line text-dim hover:border-blue/60"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="font-body text-xs text-dim w-14 shrink-0 text-right">Siempre</span>
      </div>
    </div>
  );
}
