// Bandas de madurez (semáforo oficial AIC) y textos interpretativos por dimensión.
// Tono AIC: directo, orientado a resultados, sin relleno.
// Semáforo en base al % (score/5*100): 85-100 Fortaleza, 65-84 Buen nivel,
// 45-64 Requiere desarrollo, 0-44 Prioridad crítica.

export const bands = [
  { key: "critica", label: "Prioridad crítica", emoji: "🔴", min: 1, max: 2.2, color: "#FF4B4B" },
  { key: "desarrollo", label: "Requiere desarrollo", emoji: "🟠", min: 2.21, max: 3.2, color: "#E08A3C" },
  { key: "buen_nivel", label: "Buen nivel", emoji: "🟡", min: 3.21, max: 4.2, color: "#D9A756" },
  { key: "fortaleza", label: "Fortaleza", emoji: "🟢", min: 4.21, max: 5, color: "#34B378" },
];

export function getBand(score) {
  return bands.find((b) => score >= b.min && score <= b.max) || bands[0];
}

export function toPercent(score) {
  return Math.round((score / 5) * 100);
}

// texts[dimensionId][bandKey]
export const dimensionTexts = {
  diagnostico_estrategico: {
    critica: "Hoy las decisiones comerciales se apoyan más en percepción que en evidencia. No hay visibilidad clara de en qué etapa del embudo se pierde negocio, lo que hace que cualquier plan de mejora empiece a ciegas.",
    desarrollo: "Hay indicios de dónde están los problemas, pero el diagnóstico es parcial o no se actualiza con disciplina. Falta convertir la intuición en un mapa claro y accionable de causas de pérdida.",
    buen_nivel: "El equipo identifica con razonable precisión dónde se pierde negocio y distingue problemas de mercado de problemas de ejecución. El desafío es sistematizar ese diagnóstico para que no dependa de una revisión puntual.",
    fortaleza: "El diagnóstico comercial es una práctica instalada: se sabe con precisión dónde se pierde dinero y las decisiones se toman con datos, no con intuición. Esta es una base sólida para escalar el resto del modelo.",
  },
  sistema_comercial: {
    critica: "El resultado comercial depende fuertemente del talento individual. No hay una metodología común, lo que genera alta dispersión entre vendedores y vulnerabilidad si alguien clave se va.",
    desarrollo: "Existen prácticas que funcionan, pero viven en la cabeza de algunos vendedores y no están documentadas ni son parte de un proceso compartido por todo el equipo.",
    buen_nivel: "Hay una metodología común y las mejores prácticas empiezan a documentarse. El negocio ya no depende solo de estrellas individuales, aunque todavía hay margen para institucionalizarlo del todo.",
    fortaleza: "El sistema comercial está instalado y documentado: el negocio funcionaría aunque el mejor vendedor se fuera mañana. Esto es exactamente lo que separa una organización comercial madura de un grupo de individualidades.",
  },
  prospeccion: {
    critica: "La generación de oportunidades es errática y depende casi exclusivamente de referidos o del esfuerzo espontáneo de algunos vendedores. No hay proceso ni métrica semanal.",
    desarrollo: "Hay actividad de prospección, pero es inconsistente semana a semana y todavía se apoya mucho en referidos en lugar de un proceso propio y medido.",
    buen_nivel: "Existe un proceso de prospección definido y se generan prospectos con regularidad. Falta afinar la medición semanal para que sea plenamente predecible.",
    fortaleza: "La prospección es un motor predecible: hay proceso, no depende de referidos y se mide semana a semana. El pipeline no queda librado al azar.",
  },
  gestion_pipeline: {
    critica: "El CRM no refleja la realidad del negocio y no hay visibilidad clara de cuántas oportunidades hay en cada etapa. Las oportunidades avanzan sin criterios objetivos, lo que impide gestionar con anticipación.",
    desarrollo: "El pipeline se gestiona, pero de forma poco disciplinada: el CRM está desactualizado en partes y las oportunidades estancadas se detectan tarde.",
    buen_nivel: "Hay disciplina razonable en el manejo del pipeline y buena parte de las oportunidades avanzan con criterios objetivos. Sistematizar la detección temprana de estancamientos es el siguiente paso.",
    fortaleza: "El pipeline se gestiona con rigor: el CRM refleja la realidad, las oportunidades avanzan con criterios claros y los estancamientos se detectan a tiempo para actuar.",
  },
  forecast: {
    critica: "El forecast no es confiable: depende del optimismo individual de cada vendedor y no permite anticipar desvíos con anticipación real.",
    desarrollo: "El forecast mejora pero todavía tiene ruido: conviven criterios distintos entre vendedores y las proyecciones no siempre se sostienen en el tiempo.",
    buen_nivel: "El forecast es razonablemente preciso y se revisa con criterios más homogéneos. Anticipar desvíos con varias semanas de margen es la oportunidad de mejora principal.",
    fortaleza: "El forecast es una herramienta de gestión real: preciso, con criterios homogéneos y con capacidad de anticipar desvíos con semanas de anticipación.",
  },
  coaching_comercial: {
    critica: "El coaching comercial casi no existe como práctica: las reuniones individuales no desarrollan habilidades y el feedback, cuando aparece, no es específico ni accionable.",
    desarrollo: "Hay intención de desarrollar al equipo, pero el coaching es esporádico y el feedback suele ser genérico en lugar de específico y accionable.",
    buen_nivel: "El coaching está instalado como práctica: hay observación de la venta y feedback específico. Sostenerlo con la misma consistencia en los momentos de mayor presión por resultados es el próximo desafío.",
    fortaleza: "El coaching comercial es una disciplina real: se observa cómo vende el equipo, el feedback es específico y accionable, y hay tiempo genuino dedicado a desarrollar personas, no solo a revisar números.",
  },
  indicadores_gestion: {
    critica: "El negocio se gestiona con reportes, no con indicadores que impulsen decisiones. Hay demasiados datos y pocos KPIs realmente comprendidos por el equipo.",
    desarrollo: "Existen indicadores, pero conviven demasiados y no todos son comprendidos por el equipo. Las reuniones comerciales no siempre terminan en acciones concretas.",
    buen_nivel: "El equipo trabaja con indicadores relevantes que la mayoría comprende, y las reuniones suelen cerrar con acciones concretas. Falta que los indicadores impulsen decisiones de forma sistemática y no solo en las reuniones formales.",
    fortaleza: "La gestión por indicadores está madura: pocos KPIs, bien comprendidos, que impulsan decisiones reales y no solo reportes para mostrar.",
  },
  liderazgo: {
    critica: "El liderazgo comercial está capturado por la urgencia: se apagan incendios en lugar de liderar, la delegación es baja y el equipo no tiene claridad sobre lo que se espera de cada uno.",
    desarrollo: "Hay intención de liderar con claridad, pero el día a día operativo consume la mayor parte del tiempo y la delegación todavía es limitada.",
    buen_nivel: "El equipo tiene bastante claridad sobre lo que se espera de cada uno y hay una delegación razonable. Sostener disciplina de equipo sin depender de la presencia constante del líder es el siguiente nivel.",
    fortaleza: "El liderazgo es claro, consistente y orientado al desarrollo: el equipo sabe lo que se espera, la delegación funciona y la disciplina se sostiene aunque el líder no esté presente todo el tiempo.",
  },
  inteligencia_artificial: {
    critica: "La IA todavía no forma parte de la gestión comercial: no hay estrategia ni uso concreto en tareas administrativas, reuniones o propuestas.",
    desarrollo: "Hay primeros usos de IA, aislados y sin estrategia, que todavía no se traducen en una reducción real de tareas administrativas ni en un uso sistemático.",
    buen_nivel: "El equipo ya usa IA para reducir tareas administrativas y preparar reuniones o propuestas. Falta convertir eso en una estrategia explícita de incorporación en ventas.",
    fortaleza: "La IA está integrada en la gestión comercial con una estrategia clara: reduce tareas administrativas, potencia la preparación de reuniones y propuestas, y el equipo la usa de forma habitual.",
  },
  escalabilidad: {
    critica: "El crecimiento del negocio está atado al esfuerzo individual: los procesos no están documentados y no hay aprendizaje sistemático de lo que mejor funciona.",
    desarrollo: "Hay procesos parcialmente documentados y algo de aprendizaje de las mejores prácticas, pero el crecimiento todavía exige aumentar la estructura casi en la misma proporción que el negocio.",
    buen_nivel: "El negocio puede crecer sin escalar la estructura en la misma proporción, y hay aprendizaje sistemático de las mejores prácticas. Consolidar la documentación de procesos es lo que falta para una escalabilidad plena.",
    fortaleza: "El negocio está preparado para crecer de forma sostenible: procesos documentados, aprendizaje sistemático de los mejores vendedores y mejora continua de la forma de vender, sin depender del esfuerzo heroico individual.",
  },
};

export const overallBandCopy = {
  critica: "El modelo comercial está en una etapa temprana: la gestión depende más del esfuerzo y talento individual que de un sistema. Hay una oportunidad grande de mejora, y el punto de partida más eficiente es priorizar 2 o 3 dimensiones antes que atacar las diez al mismo tiempo.",
  desarrollo: "Hay bases instaladas pero conviven con procesos informales y dependencia de personas clave. El foco debería estar en consolidar lo que ya funciona en algunas dimensiones y llevarlo al resto del equipo.",
  buen_nivel: "El modelo comercial tiene una base sólida y sistematizada en la mayoría de las dimensiones. El trabajo que sigue es afinar el detalle en los focos prioritarios y sostener la disciplina en el tiempo.",
  fortaleza: "El modelo comercial está en un estadio maduro: sistematizado, medido y con capacidad de anticipación. El desafío ya no es instalar procesos sino mantener la disciplina y seguir elevando el estándar.",
};
