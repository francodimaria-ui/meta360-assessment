import { useState } from "react";
import Landing from "./components/Landing";
import ParticipantForm from "./components/ParticipantForm";
import AssessmentForm from "./components/AssessmentForm";
import Results from "./components/Results";
import { computeResults } from "./utils/scoring";
import { submitToSheet } from "./utils/submitToSheet";

// Pasos: intro -> participant -> form -> results
export default function App() {
  const [step, setStep] = useState("intro");
  const [participant, setParticipant] = useState(null);
  const [results, setResults] = useState(null);

  const handleParticipantSubmit = (data) => {
    setParticipant(data);
    setStep("form");
  };

  const handleFormComplete = (answers) => {
    const computed = computeResults(answers);
    setResults(computed);
    setStep("results");
    submitToSheet({
      ...participant,
      answers,
      overallScore: computed.overallScore,
      overallBand: computed.overallBand.label,
      diagnosticoGlobal: computed.overallText,
      fortalezas: computed.strengths
        .map((d) => `${d.title} (${d.score}/5, ${d.band.label}): ${d.text}`)
        .join(" | "),
      focosPrioritarios: computed.priorities
        .map((d) => `${d.title} (${d.score}/5, ${d.band.label}) — Decisión: ${d.decision}`)
        .join(" | "),
      detallePorDimension: computed.dimensionResults
        .map((d) => `${d.title}: ${d.score}/5 (${d.pct}%, ${d.band.label})`)
        .join(" | "),
      executiveInsights: computed.insights
        .map((i) => `${i.title}: ${i.interpretation}`)
        .join(" | "),
      cuelloDeBotella: `${computed.systemMap.bottleneckTitle} (${computed.systemMap.bottleneckPct}%): ${computed.systemMap.risk}`,
      roadmap90dias: `30d - ${computed.roadmap.day30.focus}: ${computed.roadmap.day30.objetivo} Acciones: ${computed.roadmap.day30.acciones.join("; ")} | 60d - ${computed.roadmap.day60.focus}: ${computed.roadmap.day60.objetivo} Acciones: ${computed.roadmap.day60.acciones.join("; ")} | 90d - ${computed.roadmap.day90.focus}: ${computed.roadmap.day90.objetivo} Acciones: ${computed.roadmap.day90.acciones.join("; ")}`,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRestart = () => {
    setParticipant(null);
    setResults(null);
    setStep("intro");
    window.scrollTo({ top: 0 });
  };

  if (step === "intro") return <Landing onStart={() => setStep("participant")} />;
  if (step === "participant")
    return <ParticipantForm initial={participant} onSubmit={handleParticipantSubmit} />;
  if (step === "form") return <AssessmentForm onComplete={handleFormComplete} />;
  if (step === "results")
    return <Results participant={participant} results={results} onRestart={handleRestart} />;

  return null;
}
