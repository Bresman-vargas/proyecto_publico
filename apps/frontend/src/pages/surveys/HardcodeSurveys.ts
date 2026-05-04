
export interface SurveyData {
  id: string;
  title: string;
  nombreAdmin: string;
  descripcionEncuesta: string;
  cantVotos: string;
  apellidoPaternoVotante: string;
  voto: "favor" | "contra";
  fechaVoto: string;
}

export const surveys: SurveyData[] = [
  {
    id: "srv_001",
    title: "Actualización de Equipos de Red",
    nombreAdmin: "Marcela Rojas",
    descripcionEncuesta:
      "Propuesta para renovar los routers y switches del laboratorio principal para soportar nuevas topologías.",
    cantVotos: "4500",
    apellidoPaternoVotante: "Morales ",
    voto: "favor",
    fechaVoto: "2026-05-01T10:30:00Z",
  },
  {
    id: "srv_002",
    title: "Migración a Entorno Linux ",
    nombreAdmin: "Roberto Soto",
    descripcionEncuesta:
      "Evaluar la transición de los equipos de la biblioteca hacia distribuciones Linux para optimizar el rendimiento y la seguridad.",
    cantVotos: "9000",
    apellidoPaternoVotante: "Jara",
    voto: "favor",
    fechaVoto: "2026-05-02T11:15:00Z",
  },
  {
    id: "srv_003",
    title: "Nuevo Horario de Talleres Deportivos",
    nombreAdmin: "Andrea Valdés",
    descripcionEncuesta:
      "Votación para extender el horario del gimnasio y habilitar más bloques para entrenamiento funcional y judo.",
    cantVotos: "6897",
    apellidoPaternoVotante: "Silva",
    voto: "contra",
    fechaVoto: "2026-05-03T09:45:00Z",
  },
  {
    id: "srv_004",
    title: "Implementación de Sistema de Votación",
    nombreAdmin: "Marcela Rojas",
    descripcionEncuesta:
      "Aprobación de la nueva interfaz desarrollada para el registro de votaciones del centro de alumnos.",
    cantVotos: "11674",
    apellidoPaternoVotante: "Pérez",
    voto: "favor",
    fechaVoto: "2026-05-03T14:20:00Z",
  },
];