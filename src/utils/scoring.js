import { dimensions } from "../data/questions";
import { getBand, dimensionTexts, overallBandCopy } from "../data/diagnosticText";

export function computeResults(answers) {
  const dimensionResults = dimensions.map((dim) => {
    const values = dim.items.map((item) => answers[item.id] || 0);
    const score = values.reduce((a, b) => a + b, 0) / values.length;
    const band = getBand(score);
    return {
      id: dim.id,
      number: dim.number,
      title: dim.title,
      guidingQuestion: dim.guidingQuestion,
      score: Math.round(score * 10) / 10,
      band,
      text: dimensionTexts[dim.id][band.key],
    };
  });

  const overallScore =
    Math.round(
      (dimensionResults.reduce((a, d) => a + d.score, 0) / dimensionResults.length) * 10
    ) / 10;
  const overallBand = getBand(overallScore);

  const ranked = [...dimensionResults].sort((a, b) => b.score - a.score);
  const strengths = ranked.slice(0, 3);
  const gaps = [...ranked].reverse().slice(0, 3);

  return {
    dimensionResults,
    overallScore,
    overallBand,
    overallText: overallBandCopy[overallBand.key],
    strengths,
    gaps,
  };
}
