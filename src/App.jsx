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
