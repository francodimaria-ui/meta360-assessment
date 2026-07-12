// Contenido elaborado por dimensión para el Executive Roadmap de 90 días.
// Cada dimensión tiene un objetivo, 2-3 acciones concretas y una métrica
// de seguimiento — se usa según cuáles 3 dimensiones resulten prioritarias
// para cada persona.

export const roadmapContentByDimension = {
  diagnostico_estrategico: {
    objetivo: "Instalar visibilidad real de dónde se pierde negocio, antes de tocar cualquier otra cosa.",
    acciones: [
      "Mapear el embudo por etapa y cuantificar dónde se cae más volumen.",
      "Clasificar las últimas 20 oportunidades perdidas por causa raíz (precio, timing, competencia, ejecución).",
      "Instalar una revisión mensual fija de causas de pérdida, con datos, no con percepciones.",
    ],
    metrica: "% de oportunidades perdidas con causa identificada (meta: 100%).",
  },
  sistema_comercial: {
    objetivo: "Que el resultado deje de depender de quién vende y empiece a depender de cómo se vende.",
    acciones: [
      "Documentar la metodología comercial que ya usan los mejores vendedores del equipo.",
      "Formalizarla como proceso único, obligatorio para todo el equipo.",
      "Auditar en terreno que se esté aplicando, no solo que esté escrita.",
    ],
    metrica: "% del equipo que sigue el mismo proceso documentado (meta: 100%).",
  },
  prospeccion: {
    objetivo: "Convertir la generación de oportunidades en un motor predecible, no en un esfuerzo espontáneo.",
    acciones: [
      "Fijar una meta semanal de prospectos nuevos por vendedor.",
      "Definir 1-2 canales propios de prospección, no dependientes de referidos.",
      "Medir el cumplimiento de esa meta cada semana, sin excepción.",
    ],
    metrica: "Prospectos nuevos generados por semana (tendencia, no solo el total).",
  },
  gestion_pipeline: {
    objetivo: "Que el pipeline refleje la realidad del negocio y se pueda gestionar con anticipación.",
    acciones: [
      "Definir criterios objetivos y verificables para avanzar de etapa en el CRM.",
      "Instalar una revisión semanal de oportunidades estancadas por más de X días.",
      "Auditar la calidad de carga del CRM contra la realidad comercial real.",
    ],
    metrica: "% de oportunidades con más de 30 días sin movimiento (meta: bajarlo mes a mes).",
  },
  forecast: {
    objetivo: "Que el forecast sea una herramienta de gestión, no un ejercicio de optimismo individual.",
    acciones: [
      "Homogeneizar el criterio de proyección entre todos los vendedores.",
      "Revisar el pipeline con esos criterios antes de cada corte de forecast.",
      "Comparar forecast vs. resultado real cada mes para calibrar el margen de error.",
    ],
    metrica: "Desvío entre forecast proyectado y resultado real (meta: reducirlo cada trimestre).",
  },
  coaching_comercial: {
    objetivo: "Instalar el desarrollo del equipo como práctica sistemática, no como una excepción.",
    acciones: [
      "Fijar una cadencia fija de reuniones 1 a 1 con foco en desarrollo, no solo en números.",
      "Observar ventas reales (en vivo o grabadas) al menos una vez por semana y por vendedor.",
      "Dar feedback específico y accionable después de cada observación, por escrito.",
    ],
    metrica: "% de vendedores con al menos 1 sesión de coaching observado por mes.",
  },
  indicadores_gestion: {
    objetivo: "Que el equipo gestione con pocos indicadores, bien elegidos, en vez de muchos reportes.",
    acciones: [
      "Reducir el tablero actual a los indicadores que realmente impulsan una decisión.",
      "Explicarle al equipo qué significa cada uno y qué acción dispara.",
      "Cerrar cada reunión comercial con al menos una acción concreta basada en esos indicadores.",
    ],
    metrica: "% de reuniones comerciales que terminan con una acción concreta registrada.",
  },
  liderazgo: {
    objetivo: "Pasar de apagar incendios a liderar con intención, con el equipo sabiendo qué se espera.",
    acciones: [
      "Poner por escrito qué se espera de cada rol del equipo comercial.",
      "Delegar explícitamente al menos una responsabilidad operativa que hoy resuelve el líder.",
      "Sostener esa expectativa en cada instancia de gestión (reuniones, 1 a 1, revisiones).",
    ],
    metrica: "Horas semanales del líder en tareas operativas vs. de liderazgo (meta: invertir la proporción).",
  },
  inteligencia_artificial: {
    objetivo: "Capturar productividad real con IA, empezando acotado en vez de expandir sin foco.",
    acciones: [
      "Elegir 2 o 3 tareas administrativas o de preparación (propuestas, reuniones) para automatizar primero.",
      "Entrenar al equipo en el uso concreto de esas herramientas, no en IA en general.",
      "Medir el tiempo ahorrado antes de expandir a más casos de uso.",
    ],
    metrica: "Horas administrativas ahorradas por vendedor por semana.",
  },
  escalabilidad: {
    objetivo: "Que el negocio pueda crecer sin sumar estructura en la misma proporción.",
    acciones: [
      "Identificar los procesos que hoy dependen de una sola persona clave.",
      "Documentar el de mayor riesgo de rotación primero.",
      "Instalar una instancia de aprendizaje sistemático de las mejores prácticas del equipo.",
    ],
    metrica: "% de procesos críticos documentados y transferibles a otra persona.",
  },
};

export function buildRoadmap(gaps) {
  const steps = ["day30", "day60", "day90"];
  const titles = ["30 días", "60 días", "90 días"];
  const roadmap = {};

  gaps.slice(0, 3).forEach((dim, i) => {
    const content = roadmapContentByDimension[dim?.id] || {
      objetivo: "Definir un plan de acción puntual para esta dimensión.",
      acciones: ["Diagnosticar en detalle antes de definir un plan."],
      metrica: "A definir junto con el equipo.",
    };
    roadmap[steps[i]] = {
      title: titles[i],
      focus: dim?.title || `Prioridad ${i + 1}`,
      ...content,
    };
  });

  roadmap.impact = [
    "Mayor previsibilidad",
    "Mayor productividad",
    "Mayor escalabilidad",
    "Mayor captura del valor de la IA",
  ];

  return roadmap;
}

// Se mantiene para compatibilidad con Board Priorities (una decisión corta por dimensión).
export const decisionByDimension = Object.fromEntries(
  Object.entries(roadmapContentByDimension).map(([id, c]) => [id, c.acciones[0]])
);
