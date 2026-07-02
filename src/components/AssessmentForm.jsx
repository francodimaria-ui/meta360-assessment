import { useState, useEffect } from "react";
import { dimensions } from "../data/questions";
import LikertQuestion from "./LikertQuestion";
import ProgressBar from "./ProgressBar";

export default function AssessmentForm({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const dim = dimensions[stepIndex];
  const isLastStep = stepIndex === dimensions.length - 1;
  const allAnswered = dim.items.every((item) => answers[item.id]);

  // Sube al tope de la página cada vez que cambia de dimensión,
  // una vez que la pantalla nueva ya está dibujada (no antes).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [stepIndex]);

  const handleAnswer = (itemId, val) => {
    setAnswers((prev) => ({ ...prev, [itemId]: val }));
  };

  const handleNext = () => {
    if (!allAnswered) return;
    if (isLastStep) {
      onComplete(answers);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <img src="/logo-aic.png" alt="AIC" className="h-11 w-auto mb-8" />
          <ProgressBar
            current={stepIndex + 1}
            total={dimensions.length}
            label={`${String(dim.number).padStart(2, "0")} · ${dim.title}`}
          />
          <p className="font-body text-ink/60 italic mt-2">{dim.guidingQuestion}</p>
        </div>

        <div className="space-y-4">
          {dim.items.map((item, idx) => (
            <LikertQuestion
              key={item.id}
              number={idx + 1}
              text={item.text}
              value={answers[item.id]}
              onChange={(val) => handleAnswer(item.id, val)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={handleBack}
            disabled={stepIndex === 0}
            className="font-body text-sm font-semibold text-ink/50 disabled:opacity-0 hover:text-ink transition"
          >
            ← Atrás
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!allAnswered}
            className="inline-flex items-center gap-2 bg-blue disabled:bg-blue/25 text-white font-body font-semibold px-7 py-3.5 rounded-full hover:bg-red transition-colors"
          >
            {isLastStep ? "Ver mi diagnóstico" : "Siguiente"} →
          </button>
        </div>
      </div>
    </div>
  );
}
