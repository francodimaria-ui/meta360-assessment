// Estructura del Meta360 Commercial Leadership Assessment
// 10 dimensiones x 4 afirmaciones, escala Likert 1 (Nunca) a 5 (Siempre)

export const dimensions = [
  {
    id: "diagnostico_estrategico",
    number: 1,
    title: "Diagnóstico Estratégico",
    guidingQuestion: "¿Sé exactamente dónde se pierde dinero en mi proceso comercial?",
    items: [
      { id: "q1", text: "Conozco con precisión en qué etapa del embudo perdemos más oportunidades." },
      { id: "q2", text: "Tengo identificadas las principales causas de pérdida de ventas." },
      { id: "q3", text: "Distingo claramente problemas de mercado de problemas de ejecución." },
      { id: "q4", text: "Mis decisiones comerciales se basan en datos y no en intuición." },
    ],
  },
  {
    id: "sistema_comercial",
    number: 2,
    title: "Sistema Comercial",
    guidingQuestion: "¿Existe un sistema o dependemos del talento?",
    items: [
      { id: "q5", text: "Existe una metodología comercial común para todo el equipo." },
      { id: "q6", text: "Todos los vendedores siguen el mismo proceso comercial." },
      { id: "q7", text: "Las mejores prácticas están documentadas." },
      { id: "q8", text: "Si un vendedor estrella se fuera, el negocio seguiría funcionando." },
    ],
  },
  {
    id: "prospeccion",
    number: 3,
    title: "Prospección",
    guidingQuestion: "¿La generación de oportunidades es predecible?",
    items: [
      { id: "q9", text: "El equipo genera prospectos nuevos todas las semanas." },
      { id: "q10", text: "La prospección no depende únicamente de referidos." },
      { id: "q11", text: "Existe un proceso definido para prospectar." },
      { id: "q12", text: "Medimos indicadores de prospección semanalmente." },
    ],
  },
  {
    id: "gestion_pipeline",
    number: 4,
    title: "Gestión del Pipeline",
    guidingQuestion: "¿Gestionamos las oportunidades de manera disciplinada y predecible?",
    items: [
      { id: "q13", text: "El CRM refleja la realidad comercial." },
      { id: "q14", text: "Sé cuántas oportunidades hay en cada etapa." },
      { id: "q15", text: "Las oportunidades avanzan siguiendo criterios objetivos." },
      { id: "q16", text: "Detectamos tempranamente oportunidades estancadas." },
    ],
  },
  {
    id: "forecast",
    number: 5,
    title: "Forecast",
    guidingQuestion: "¿Nuestro forecast es confiable y permite anticipar resultados?",
    items: [
      { id: "q17", text: "Nuestro forecast suele ser preciso." },
      { id: "q18", text: "Las proyecciones no dependen del optimismo de los vendedores." },
      { id: "q19", text: "Revisamos el pipeline con criterios homogéneos." },
      { id: "q20", text: "Podemos anticipar desvíos con varias semanas de anticipación." },
    ],
  },
  {
    id: "coaching_comercial",
    number: 6,
    title: "Coaching Comercial",
    guidingQuestion: "¿Desarrollo a mi equipo de manera consistente?",
    items: [
      { id: "q21", text: "Mis reuniones individuales desarrollan habilidades." },
      { id: "q22", text: "Observo cómo venden mis vendedores." },
      { id: "q23", text: "Doy feedback específico y accionable." },
      { id: "q24", text: "Dedico tiempo a desarrollar personas y no solo revisar números." },
    ],
  },
  {
    id: "indicadores_gestion",
    number: 7,
    title: "Indicadores de Gestión",
    guidingQuestion: "¿Gestionamos el negocio a partir de indicadores que impulsan decisiones?",
    items: [
      { id: "q25", text: "El equipo trabaja con pocos indicadores realmente relevantes." },
      { id: "q26", text: "Los KPIs son comprendidos por todos." },
      { id: "q27", text: "Las reuniones comerciales terminan con acciones concretas." },
      { id: "q28", text: "Los indicadores impulsan decisiones y no solo reportes." },
    ],
  },
  {
    id: "liderazgo",
    number: 8,
    title: "Liderazgo",
    guidingQuestion: "¿Lidero al equipo de manera clara, consistente y orientada al desarrollo?",
    items: [
      { id: "q29", text: "Mi equipo sabe exactamente qué espero de cada uno." },
      { id: "q30", text: "Paso más tiempo liderando que apagando incendios." },
      { id: "q31", text: "Delego correctamente." },
      { id: "q32", text: "Logro que el equipo mantenga disciplina sin depender de mi presencia." },
    ],
  },
  {
    id: "inteligencia_artificial",
    number: 9,
    title: "Inteligencia Artificial",
    guidingQuestion: "¿La Inteligencia Artificial potencia la productividad y la calidad de la gestión comercial?",
    items: [
      { id: "q33", text: "Mi equipo utiliza IA en el proceso comercial." },
      { id: "q34", text: "La IA reduce tareas administrativas." },
      { id: "q35", text: "Utilizamos IA para preparar reuniones o propuestas." },
      { id: "q36", text: "Tengo una estrategia clara para incorporar IA en ventas." },
    ],
  },
  {
    id: "escalabilidad",
    number: 10,
    title: "Escalabilidad",
    guidingQuestion: "¿El negocio puede crecer de manera sostenible sin depender del esfuerzo individual?",
    items: [
      { id: "q37", text: "El negocio puede crecer sin aumentar proporcionalmente la estructura." },
      { id: "q38", text: "Los procesos están documentados." },
      { id: "q39", text: "La empresa aprende sistemáticamente de sus mejores vendedores." },
      { id: "q40", text: "La organización mejora continuamente su forma de vender." },
    ],
  },
];

export const totalQuestions = dimensions.reduce((acc, d) => acc + d.items.length, 0);
