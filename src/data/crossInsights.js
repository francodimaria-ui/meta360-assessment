// Los 7 cruces obligatorios que pidió el prompt de AIC. Para cada par,
// clasificamos el patrón real según los porcentajes de esa persona
// (ambos bajos / brecha en una dirección / brecha en la otra / ambos altos)
// y elegimos, entre los 7, los 3 patrones más reveladores para mostrar
// como "Executive Insights" — así se arma dinámico sin depender de una IA.

import { toPercent } from "./diagnosticText";

const GAP_THRESHOLD = 18; // puntos porcentuales para considerar "brecha"
const WEAK_THRESHOLD = 64; // % debajo de esto = "flojo" (requiere desarrollo o peor)
const STRONG_THRESHOLD = 65; // % arriba de esto = "sólido" (buen nivel o mejor)

function byId(dimensionResults, id) {
  return dimensionResults.find((d) => d.id === id);
}

const PAIRS = [
  {
    a: "prospeccion",
    b: "gestion_pipeline",
    build: (A, B, pattern) => {
      if (pattern === "ambosBajos")
        return {
          title: "El embudo comercial no arranca ni se controla",
          interpretation: `Prospección (${A.pct}%) y Gestión del Pipeline (${B.pct}%) están débiles al mismo tiempo. No hay entrada consistente de oportunidades ni disciplina para gestionarlas: el problema no es un vendedor puntual, es que falta un motor de generación y un sistema de seguimiento.`,
          why: "Sin resolver ambas juntas, cualquier mejora de una sola dimensión se diluye: más prospectos sin gestión disciplinada se pierden igual, y más disciplina sin prospectos no tiene con qué trabajar.",
        };
      if (pattern === "aFuerteBDebil")
        return {
          title: "Genera oportunidades que el sistema no logra convertir",
          interpretation: `Prospección funciona (${A.pct}%), pero la Gestión del Pipeline (${B.pct}%) no está a la altura. El negocio produce entradas que después se pierden por falta de disciplina en el seguimiento: se está gastando esfuerzo comercial que no se capitaliza.`,
          why: "El cuello de botella no está en generar demanda, está en no perderla después de generada — es la pérdida de retorno más cara de corregir tarde.",
        };
      if (pattern === "bFuerteADebil")
        return {
          title: "Gestiona bien un pipeline que no se abastece solo",
          interpretation: `La Gestión del Pipeline es sólida (${B.pct}%), pero Prospección (${A.pct}%) no alimenta al sistema. Hay disciplina de seguimiento, pero sobre una base de oportunidades insuficiente o irregular.`,
          why: "El techo de crecimiento hoy no lo pone la ejecución, lo pone el volumen de entrada — mejorar el pipeline sin resolver la prospección tiene retorno limitado.",
        };
      return null;
    },
  },
  {
    a: "gestion_pipeline",
    b: "forecast",
    build: (A, B, pattern) => {
      if (pattern === "ambosBajos")
        return {
          title: "El negocio no ve venir sus propios resultados",
          interpretation: `Gestión del Pipeline (${A.pct}%) y Forecast (${B.pct}%) están débiles a la vez. Sin un pipeline confiable no puede haber un forecast confiable: la proyección hereda el ruido de una base de datos que no refleja la realidad.`,
          why: "Esto no es un problema de precisión de forecast, es un problema de origen: corregir el forecast sin arreglar el pipeline es maquillar el síntoma.",
        };
      if (pattern === "aFuerteBDebil")
        return {
          title: "El pipeline está sano, pero la lectura no lo aprovecha",
          interpretation: `El Pipeline está bien gestionado (${A.pct}%), pero el Forecast (${B.pct}%) sigue siendo poco confiable. Hay buena información de base que no se está traduciendo en proyecciones útiles para decidir.`,
          why: "La data ya existe — el problema es de criterio de lectura, no de disciplina operativa. Es una mejora de bajo costo y alto impacto.",
        };
      if (pattern === "bFuerteADebil")
        return {
          title: "El forecast anticipa mejor de lo que el pipeline sostiene",
          interpretation: `El Forecast parece confiable (${B.pct}%) pese a un Pipeline débil (${A.pct}%), lo cual es una señal de alerta: probablemente se esté proyectando sobre intuición más que sobre datos reales de pipeline.`,
          why: "Un forecast que no se apoya en un pipeline sólido es frágil — puede verse bien varios trimestres hasta que falla sin previo aviso.",
        };
      return null;
    },
  },
  {
    a: "sistema_comercial",
    b: "inteligencia_artificial",
    build: (A, B, pattern) => {
      if (pattern === "bFuerteADebil")
        return {
          title: "La IA evolucionó más rápido que el sistema comercial",
          interpretation: `El equipo ya usa Inteligencia Artificial (${B.pct}%) pero el Sistema Comercial de base (${A.pct}%) sigue sin metodología común. Se está automatizando un proceso que todavía no está estandarizado.`,
          why: "La IA multiplica lo que ya existe, para bien o para mal: sin un sistema comercial sólido debajo, multiplica la inconsistencia en vez de la productividad.",
        };
      if (pattern === "aFuerteBDebil")
        return {
          title: "Hay sistema, falta la capa de productividad de IA",
          interpretation: `El Sistema Comercial está instalado (${A.pct}%), pero la Inteligencia Artificial (${B.pct}%) todavía no se usa para potenciarlo. Es la base ideal para capturar productividad rápido: hay proceso claro sobre el cual aplicar IA.`,
          why: "Es la incorporación de IA de menor riesgo posible: automatizar un proceso ya ordenado, no uno caótico.",
        };
      if (pattern === "ambosBajos")
        return {
          title: "Ni el sistema ni la tecnología están sosteniendo la venta",
          interpretation: `Sistema Comercial (${A.pct}%) e Inteligencia Artificial (${B.pct}%) están débiles a la vez. El resultado comercial de hoy depende casi enteramente del esfuerzo individual, sin metodología ni tecnología que lo sostengan.`,
          why: "Cualquier crecimiento futuro va a exigir escalar personas 1 a 1, en vez de escalar sistema — eso pone un techo bajo al crecimiento sostenible.",
        };
      return null;
    },
  },
  {
    a: "liderazgo",
    b: "coaching_comercial",
    build: (A, B, pattern) => {
      if (pattern === "ambosBajos")
        return {
          title: "La organización ejecuta mejor de lo que dirige",
          interpretation: `Liderazgo (${A.pct}%) y Coaching Comercial (${B.pct}%) están débiles al mismo tiempo. El equipo probablemente vende por su cuenta, sin una capa de dirección que desarrolle capacidades ni sostenga estándares.`,
          why: "Sin liderazgo ni coaching, el resultado comercial depende del talento que ya está instalado — no hay mecanismo para desarrollarlo ni para escalarlo a los que vienen.",
        };
      if (pattern === "aFuerteBDebil")
        return {
          title: "Hay dirección, falta desarrollo día a día",
          interpretation: `El Liderazgo es claro (${A.pct}%), pero el Coaching Comercial (${B.pct}%) no lo acompaña. Se define bien qué se espera, pero no hay un mecanismo sistemático para ayudar al equipo a lograrlo.`,
          why: "La dirección sin desarrollo genera presión sin herramientas — es una combinación que erosiona al equipo en el tiempo.",
        };
      if (pattern === "bFuerteADebil")
        return {
          title: "Se desarrolla al equipo sin una dirección clara detrás",
          interpretation: `Hay práctica de Coaching Comercial (${B.pct}%) pese a un Liderazgo débil (${A.pct}%). El desarrollo individual no está anclado en expectativas ni objetivos claros desde la dirección.`,
          why: "El coaching sin liderazgo que lo enmarque tiende a ser inconsistente: cada conversación de desarrollo puede apuntar a un objetivo distinto.",
        };
      return null;
    },
  },
  {
    a: "indicadores_gestion",
    b: "forecast",
    build: (A, B, pattern) => {
      if (pattern === "ambosBajos")
        return {
          title: "El negocio se gestiona a ciegas",
          interpretation: `Indicadores de Gestión (${A.pct}%) y Forecast (${B.pct}%) están débiles a la vez. No hay una lectura confiable del presente ni una proyección confiable del futuro.`,
          why: "Sin indicadores que impulsen decisiones, cualquier forecast que exista es más una expresión de deseo que una herramienta de gestión.",
        };
      if (pattern === "aFuerteBDebil")
        return {
          title: "El principal cuello de botella no está en vender. Está en anticipar",
          interpretation: `Los Indicadores de Gestión están sólidos (${A.pct}%), pero el Forecast (${B.pct}%) no logra traducir esa información en anticipación real. La data existe, pero no se convierte en previsibilidad.`,
          why: "Es un problema de síntesis, no de ejecución comercial — y suele ser de los más rápidos de resolver una vez identificado.",
        };
      if (pattern === "bFuerteADebil")
        return {
          title: "Se anticipa resultado sin indicadores sólidos que lo sostengan",
          interpretation: `El Forecast parece funcionar (${B.pct}%) aunque los Indicadores de Gestión (${A.pct}%) son débiles, lo que sugiere que la proyección se apoya más en experiencia individual que en datos consistentes del equipo.`,
          why: "Ese tipo de forecast no escala: depende de quién lo arma, no del sistema, y se vuelve frágil ante cualquier cambio de equipo.",
        };
      return null;
    },
  },
  {
    a: "diagnostico_estrategico",
    b: "sistema_comercial",
    build: (A, B, pattern) => {
      if (pattern === "ambosBajos")
        return {
          title: "No se sabe dónde se pierde, y tampoco hay cómo evitarlo",
          interpretation: `Diagnóstico Estratégico (${A.pct}%) y Sistema Comercial (${B.pct}%) están débiles a la vez. No hay visibilidad de dónde se pierde negocio, ni una metodología instalada para corregirlo aunque se supiera.`,
          why: "Instalar un sistema sin diagnóstico corre el riesgo de sistematizar el problema equivocado — conviene resolver primero la visibilidad.",
        };
      if (pattern === "aFuerteBDebil")
        return {
          title: "Se sabe qué falla, pero no hay sistema para corregirlo",
          interpretation: `El Diagnóstico Estratégico es sólido (${A.pct}%): se sabe dónde se pierde negocio. Pero el Sistema Comercial (${B.pct}%) no está instalado para actuar sobre eso de forma consistente.`,
          why: "El diagnóstico sin sistema se queda en el análisis — es la base ideal para priorizar qué sistematizar primero.",
        };
      if (pattern === "bFuerteADebil")
        return {
          title: "Hay metodología, pero no está apuntada al problema real",
          interpretation: `Existe un Sistema Comercial instalado (${B.pct}%), pero sin un Diagnóstico Estratégico sólido (${A.pct}%) que confirme que está resolviendo la causa correcta de pérdida de negocio.`,
          why: "Un sistema bien ejecutado sobre el diagnóstico equivocado optimiza lo que no hay que optimizar.",
        };
      return null;
    },
  },
  {
    a: "escalabilidad",
    b: "inteligencia_artificial",
    build: (A, B, pattern) => {
      if (pattern === "ambosBajos")
        return {
          title: "El crecimiento futuro depende del esfuerzo, no del sistema",
          interpretation: `Escalabilidad (${A.pct}%) e Inteligencia Artificial (${B.pct}%) están débiles a la vez. El negocio no está preparado para crecer sin sumar estructura proporcional, ni tiene tecnología que multiplique la productividad actual.`,
          why: "Es el combo que más limita el crecimiento futuro: cada punto de crecimiento va a costar recursos proporcionales, sin apalancamiento tecnológico que lo compense.",
        };
      if (pattern === "aFuerteBDebil")
        return {
          title: "El negocio ya escala, pero sin capturar el valor de la IA",
          interpretation: `La Escalabilidad está bien encaminada (${A.pct}%), pero la Inteligencia Artificial (${B.pct}%) todavía no se usa como palanca. Hay oportunidad de crecer más rápido con el mismo esfuerzo.`,
          why: "Es la ventana de mayor apalancamiento disponible hoy: un negocio que ya sabe escalar, potenciado con IA, escala más rápido y más barato.",
        };
      if (pattern === "bFuerteADebil")
        return {
          title: "Se adoptó IA sin una base que pueda escalar con ella",
          interpretation: `Hay adopción de Inteligencia Artificial (${B.pct}%) pero la Escalabilidad de base (${A.pct}%) sigue atada al esfuerzo individual. La tecnología está corriendo sobre una estructura que todavía no está lista para crecer.`,
          why: "Sin escalabilidad de base, la IA optimiza tareas puntuales pero no cambia el techo de crecimiento del negocio.",
        };
      return null;
    },
  },
];

function classifyPattern(pctA, pctB) {
  const gap = pctA - pctB;
  if (pctA < WEAK_THRESHOLD && pctB < WEAK_THRESHOLD) return { pattern: "ambosBajos", strength: 3 };
  if (gap >= GAP_THRESHOLD) return { pattern: "aFuerteBDebil", strength: 2 + gap / 100 };
  if (-gap >= GAP_THRESHOLD) return { pattern: "bFuerteADebil", strength: 2 + -gap / 100 };
  if (pctA >= STRONG_THRESHOLD && pctB >= STRONG_THRESHOLD) return { pattern: "ambosAltos", strength: 1 };
  return { pattern: "equilibrado", strength: 0 };
}

export function pickTopInsights(dimensionResults, count = 3) {
  const candidates = [];

  for (const pair of PAIRS) {
    const A = byId(dimensionResults, pair.a);
    const B = byId(dimensionResults, pair.b);
    if (!A || !B) continue;
    const pctA = toPercent(A.score);
    const pctB = toPercent(B.score);
    const { pattern, strength } = classifyPattern(pctA, pctB);
    if (pattern === "ambosAltos" || pattern === "equilibrado") continue; // poco interesante para destacar
    const content = pair.build({ ...A, pct: pctA }, { ...B, pct: pctB }, pattern);
    if (!content) continue;
    candidates.push({ ...content, strength, dimA: A.title, dimB: B.title });
  }

  candidates.sort((a, b) => b.strength - a.strength);

  // Respaldo: si el sistema está parejo (pocas brechas detectadas entre los 7
  // cruces obligatorios), completamos con una lectura general en vez de dejar
  // la sección vacía o incompleta.
  if (candidates.length < count) {
    const sorted = [...dimensionResults].sort((a, b) => b.score - a.score);
    const top = sorted[0];
    const second = sorted[1];
    const bottom = sorted[sorted.length - 1];
    const secondBottom = sorted[sorted.length - 2];
    const overallPct = Math.round(
      (dimensionResults.reduce((a, d) => a + toPercent(d.score), 0) / dimensionResults.length)
    );

    const fillers =
      overallPct >= 65
        ? [
            {
              title: "El sistema comercial está parejo, sin cuellos de botella agudos",
              interpretation: `Las dimensiones evaluadas muestran un nivel relativamente homogéneo (promedio ${overallPct}%), sin brechas críticas entre ellas. ${top.title} es la más sólida (${toPercent(top.score)}%).`,
              why: "Un sistema parejo es una base poco común y valiosa: el foco pasa de 'apagar incendios' a elevar el estándar general de forma deliberada.",
            },
            {
              title: `${top.title} y ${second.title} sostienen el nivel general`,
              interpretation: `Estas dos dimensiones (${toPercent(top.score)}% y ${toPercent(second.score)}%) son las de mejor desempeño y probablemente están sosteniendo el resultado del resto del sistema.`,
              why: "Vale la pena documentar qué hace bien el equipo ahí, para replicarlo en las dimensiones más rezagadas.",
            },
            {
              title: "La prioridad ya no es instalar, es sostener en el tiempo",
              interpretation: `Con un promedio de ${overallPct}%, el riesgo principal no es la falta de sistema sino la pérdida de disciplina — que ${bottom.title} (${toPercent(bottom.score)}%), la más floja, empiece a arrastrar al resto.`,
              why: "Los sistemas maduros se degradan por descuido, no por falta de diseño — sostener exige revisión activa, no solo mantenimiento.",
            },
          ]
        : [
            {
              title: "El sistema está débil de forma pareja, no en un solo punto",
              interpretation: `Las dimensiones evaluadas muestran niveles similares entre sí (promedio ${overallPct}%), sin una sola dimensión que explique el resultado. ${bottom.title} es la más urgente (${toPercent(bottom.score)}%).`,
              why: "Cuando la debilidad es pareja, atacar una sola dimensión no alcanza — se necesita una intervención de sistema, no un parche puntual.",
            },
            {
              title: `${bottom.title} y ${secondBottom.title} concentran el mayor riesgo`,
              interpretation: `Estas dos dimensiones (${toPercent(bottom.score)}% y ${toPercent(secondBottom.score)}%) son las más débiles del sistema y probablemente se refuerzan negativamente entre sí.`,
              why: "Resolver una sin la otra probablemente no alcance para destrabar el resultado comercial completo.",
            },
            {
              title: "Hoy el negocio depende más del esfuerzo que del sistema",
              interpretation: `Con un promedio de ${overallPct}%, la mayoría de las dimensiones todavía no están sistematizadas. ${top.title} (${toPercent(top.score)}%) es el único punto relativamente sólido para apoyar la primera etapa de mejora.`,
              why: "Empezar por sistematizar la dimensión más sólida suele ser más rápido que empezar por la más débil, y genera impulso para las siguientes.",
            },
          ];

    for (const filler of fillers) {
      if (candidates.length >= count) break;
      candidates.push({ ...filler, strength: 0.5 });
    }
  }

  return candidates.slice(0, count);
}

export function findBottleneck(dimensionResults) {
  const sorted = [...dimensionResults].sort((a, b) => a.score - b.score);
  const bottleneck = sorted[0];
  // Dimensiones relacionadas: las que aparecen en algún par junto al cuello de botella
  const related = PAIRS.filter((p) => p.a === bottleneck.id || p.b === bottleneck.id).map((p) =>
    byId(dimensionResults, p.a === bottleneck.id ? p.b : p.a)
  ).filter(Boolean);

  return { bottleneck, related };
}

export function buildSystemMapText(dimensionResults) {
  const { bottleneck, related } = findBottleneck(dimensionResults);
  const relatedNames = related.map((r) => r.title).join(" y ");
  const worstRelated = related.length
    ? [...related].sort((a, b) => a.score - b.score)[0]
    : null;

  const gapDim = worstRelated
    ? Math.abs(toPercent(bottleneck.score) - toPercent(worstRelated.score))
    : 0;

  const interaction = related.length
    ? `${bottleneck.title} (${toPercent(bottleneck.score)}%) no funciona de forma aislada: está directamente conectada con ${relatedNames}. Cuando esta dimensión falla, arrastra el desempeño de las que dependen de ella, aunque esas dimensiones se gestionen bien por separado.`
    : `${bottleneck.title} (${toPercent(bottleneck.score)}%) es la dimensión más débil del sistema, y condiciona el desempeño del resto del modelo comercial.`;

  const desbalance = worstRelated
    ? `El principal desbalance está entre ${bottleneck.title} y ${worstRelated.title}: una brecha de ${gapDim} puntos porcentuales entre ambas. El sistema está invirtiendo esfuerzo en un lado sin que el otro lo sostenga.`
    : `No hay una segunda dimensión que compense a ${bottleneck.title} — es un punto único de fragilidad en el sistema.`;

  const risk = `Si esta dimensión no se corrige, el riesgo no es puntual: se vuelve un techo estructural para el crecimiento, porque el resto del sistema comercial no puede rendir por encima de su eslabón más débil.`;

  return {
    bottleneckTitle: bottleneck.title,
    bottleneckPct: toPercent(bottleneck.score),
    interaction,
    desbalance,
    risk,
  };
}
