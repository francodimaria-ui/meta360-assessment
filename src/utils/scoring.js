import { dimensions } from "../data/questions";
import { getBand, toPercent, dimensionTexts, overallBandCopy } from "../data/diagnosticText";
import { pickTopInsights, findBottleneck, buildSystemMapText } from "../data/crossInsights";
import { decisionByDimension, buildRoadmap } from "./roadmap";

export function computeResults(answers) {
  const dimensionResults = dimensions.map((dim) => {
    const values = dim.items.map((item) => answers[item.id] || 0);
    const score = values.reduce((a, b) => a + b, 0) / values.length;
    const roundedScore = Math.round(score * 10) / 10;
    const band = getBand(roundedScore);
    return {
      id: dim.id,
      number: dim.number,
      title: dim.title,
      guidingQuestion: dim.guidingQuestion,
      score: roundedScore,
      pct: toPercent(roundedScore),
      band,
      text: dimensionTexts[dim.id][band.key],
    };
  });

  const overallScore =
    Math.round(
      (dimensionResults.reduce((a, d) => a + d.score, 0) / dimensionResults.length) * 10
    ) / 10;
  const overallBand = getBand(overallScore);
  const overallPct = toPercent(overallScore);

  const ranked = [...dimensionResults].sort((a, b) => b.score - a.score);
  const strengths = ranked.slice(0, 3);
  const gaps = [...ranked].reverse().slice(0, 3);

  // --- Contenido ejecutivo (basado en el prompt de AIC, sin IA en vivo) ---
  const insights = pickTopInsights(dimensionResults, 3);
  const { bottleneck, related } = findBottleneck(dimensionResults);
  const systemMap = buildSystemMapText(dimensionResults);
  const priorities = gaps.map((d) => ({
    ...d,
    decision: decisionByDimension[d.id] || "Definir un plan de acción puntual para esta dimensión.",
  }));
  const roadmap = buildRoadmap(gaps);

  return {
    dimensionResults,
    overallScore,
    overallPct,
    overallBand,
    overallText: overallBandCopy[overallBand.key],
    strengths,
    gaps,
    insights,
    bottleneck,
    bottleneckRelated: related,
    systemMap,
    priorities,
    roadmap,
  };
}
