import { useState, useEffect } from "react";

const FIELDS = [
  { key: "name", label: "Nombre y apellido", type: "text" },
  { key: "company", label: "Empresa", type: "text" },
  { key: "role", label: "Cargo", type: "text" },
  { key: "email", label: "Correo electrónico", type: "email" },
];

export default function ParticipantForm({ initial, onSubmit }) {
  const [data, setData] = useState(initial || { name: "", company: "", role: "", email: "" });
  const isValid = Object.values(data).every((v) => v.trim().length > 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">
        <img src="/logo-aic.png" alt="AIC" className="h-12 w-auto mb-10" />
        <p className="font-mono text-xs tracking-[0.2em] text-blue uppercase mb-3">
          Antes de empezar
        </p>
        <h2 className="font-display text-3xl text-ink mb-8">Información del participante</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isValid) onSubmit(data);
          }}
          className="space-y-6"
        >
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block font-body text-sm font-semibold text-ink mb-2">
                {f.label}
              </label>
              <input
                type={f.type}
                required
                value={data[f.key]}
                onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
                className="w-full bg-surface border border-line rounded-xl px-4 py-3 font-body text-ink placeholder:text-dim/50 focus:outline-none focus:ring-2 focus:ring-blue/40 focus:border-blue transition"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={!isValid}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue disabled:bg-blue/25 text-white font-body font-semibold px-7 py-4 rounded-full hover:bg-red transition-colors mt-4"
          >
            Comenzar el assessment →
          </button>
        </form>
      </div>
    </div>
  );
}
