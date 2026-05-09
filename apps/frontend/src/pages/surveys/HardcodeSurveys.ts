export interface SurveyOption {
  id: string;
  text: string;
  votes: number;
}

export interface SurveyData {
  id: string;
  title: string;
  nombreAdmin: string;
  descripcionEncuesta: string;
  cantVotos: number;
  apellidoPaternoVotante: string;
  fechaVoto: string;
  options: SurveyOption[];
}

export const surveys: SurveyData[] = [
  {
    id: "srv_001",
    title: "Actualización de Equipos de Red",
    nombreAdmin: "Marcela Rojas",
    descripcionEncuesta:
      "Propuesta para renovar los routers y switches del laboratorio principal para soportar nuevas topologías.",
    cantVotos: 4500,
    apellidoPaternoVotante: "Morales",
    fechaVoto: "2026-05-01T10:30:00Z",
    options: [
      { id: "opt_001_1", text: "Renovar todos los equipos", votes: 2600 },
      { id: "opt_001_2", text: "Renovar solo routers", votes: 1200 },
      { id: "opt_001_3", text: "Mantener equipos actuales", votes: 700 },
    ],
  },
  {
    id: "srv_002",
    title: "Migración a Entorno Linux",
    nombreAdmin: "Roberto Soto",
    descripcionEncuesta:
      "Evaluar la transición de los equipos de la biblioteca hacia distribuciones Linux para optimizar el rendimiento y la seguridad.",
    cantVotos: 9000,
    apellidoPaternoVotante: "Jara",
    fechaVoto: "2026-05-02T11:15:00Z",
    options: [
      { id: "opt_002_1", text: "Migrar todos los equipos", votes: 5300 },
      { id: "opt_002_2", text: "Migrar solo equipos antiguos", votes: 2400 },
      { id: "opt_002_3", text: "Mantener Windows", votes: 1300 },
    ],
  },
  {
    id: "srv_003",
    title: "Nuevo Horario de Talleres Deportivos",
    nombreAdmin: "Andrea Valdés",
    descripcionEncuesta:
      "Votación para extender el horario del gimnasio y habilitar más bloques para entrenamiento funcional y judo.",
    cantVotos: 6897,
    apellidoPaternoVotante: "Silva",
    fechaVoto: "2026-05-03T09:45:00Z",
    options: [
      { id: "opt_003_1", text: "Extender hasta las 18:00", votes: 1800 },
      { id: "opt_003_2", text: "Extender hasta las 19:00", votes: 3497 },
      { id: "opt_003_3", text: "Mantener horario actual", votes: 1600 },
    ],
  },
  {
    id: "srv_004",
    title: "Implementación de Sistema de Votación",
    nombreAdmin: "Marcela Rojas",
    descripcionEncuesta:
      "Aprobación de la nueva interfaz desarrollada para el registro de votaciones del centro de alumnos.",
    cantVotos: 11674,
    apellidoPaternoVotante: "Pérez",
    fechaVoto: "2026-05-03T14:20:00Z",
    options: [
      { id: "opt_004_1", text: "Implementar versión actual", votes: 6500 },
      { id: "opt_004_2", text: "Hacer mejoras antes de implementar", votes: 3974 },
      { id: "opt_004_3", text: "Rehacer la interfaz", votes: 1200 },
    ],
  },

  // Encuestas de Vicente Mery
  {
    id: "srv_005",
    title: "Renovación del Laboratorio de Computación",
    nombreAdmin: "Vicente Mery",
    descripcionEncuesta:
      "Propuesta para actualizar computadores, monitores y periféricos del laboratorio de desarrollo web.",
    cantVotos: 3400,
    apellidoPaternoVotante: "Mery",
    fechaVoto: "2026-05-04T10:00:00Z",
    options: [
      { id: "opt_005_1", text: "Renovar computadores", votes: 1400 },
      { id: "opt_005_2", text: "Renovar monitores", votes: 700 },
      { id: "opt_005_3", text: "Renovar todo el laboratorio", votes: 1300 },
    ],
  },
  {
    id: "srv_006",
    title: "Implementar Taller de Programación Web",
    nombreAdmin: "Vicente Mery",
    descripcionEncuesta:
      "Encuesta para decidir si se agrega un taller práctico de HTML, CSS, JavaScript, React y bases de datos.",
    cantVotos: 5200,
    apellidoPaternoVotante: "Mery",
    fechaVoto: "2026-05-05T12:30:00Z",
    options: [
      { id: "opt_006_1", text: "Taller de HTML y CSS", votes: 900 },
      { id: "opt_006_2", text: "Taller de React", votes: 2600 },
      { id: "opt_006_3", text: "Taller fullstack", votes: 1700 },
    ],
  },
  {
    id: "srv_007",
    title: "Uso de Software Libre en Clases",
    nombreAdmin: "Vicente Mery",
    descripcionEncuesta:
      "Consulta para evaluar el uso de herramientas libres como Linux, LibreOffice y editores open source en asignaturas técnicas.",
    cantVotos: 2800,
    apellidoPaternoVotante: "Mery",
    fechaVoto: "2026-05-06T09:15:00Z",
    options: [
      { id: "opt_007_1", text: "Usar Linux", votes: 1100 },
      { id: "opt_007_2", text: "Usar LibreOffice", votes: 500 },
      { id: "opt_007_3", text: "Usar herramientas mixtas", votes: 1200 },
    ],
  },
  {
    id: "srv_008",
    title: "Extensión del Horario de Biblioteca",
    nombreAdmin: "Vicente Mery",
    descripcionEncuesta:
      "Votación para extender el horario de biblioteca durante la semana de pruebas y entregas de proyectos.",
    cantVotos: 4100,
    apellidoPaternoVotante: "Mery",
    fechaVoto: "2026-05-07T15:45:00Z",
    options: [
      { id: "opt_008_1", text: "Extender hasta las 18:00", votes: 1000 },
      { id: "opt_008_2", text: "Extender hasta las 19:00", votes: 2300 },
      { id: "opt_008_3", text: "Abrir también los sábados", votes: 800 },
    ],
  },
];