export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full">
        <div className="mb-10">
          <img src="/logo-aic.png" alt="AIC Alto Impacto Comercial" className="h-16 w-auto" />
        </div>

        <p className="font-mono text-xs tracking-[0.2em] text-blue-light uppercase mb-4">
          Meta 360° · Autodiagnóstico · Programa GEC
        </p>
        <h1 className="font-display font-medium text-4xl sm:text-5xl leading-[1.1] text-ink mb-6">
          Mapa de Madurez<br /> Comercial
        </h1>
        <p className="font-body text-lg text-dim leading-relaxed mb-10 max-w-xl">
          10 dimensiones. 40 preguntas. Cinco minutos para ver con claridad dónde
          está parada tu gestión comercial hoy — y dónde conviene poner el foco
          primero.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-12 max-w-md">
          <div>
            <p className="font-display text-2xl text-blue-light">10</p>
            <p className="font-body text-xs text-dim mt-1">dimensiones clave</p>
          </div>
          <div>
            <p className="font-display text-2xl text-blue-light">40</p>
            <p className="font-body text-xs text-dim mt-1">afirmaciones</p>
          </div>
          <div>
            <p className="font-display text-2xl text-blue-light">~5&nbsp;min</p>
            <p className="font-body text-xs text-dim mt-1">de tu tiempo</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group inline-flex items-center gap-3 bg-blue text-white font-body font-semibold px-7 py-4 rounded-full hover:bg-red transition-colors"
        >
          Empezar el diagnóstico
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <p className="font-body text-xs text-dim/70 mt-6 max-w-md">
          La información solicitada se usa únicamente para generar tu informe
          personalizado de Madurez Comercial Meta360. Los resultados son
          confidenciales.
        </p>
      </div>
    </div>
  );
}
