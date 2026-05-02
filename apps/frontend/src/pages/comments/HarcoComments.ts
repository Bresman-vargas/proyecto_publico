
export interface Comentario {
  id: string;
  nombre: string;
  id_user?: string;
  apellido_paterno: string;
  fecha_creacion: Date;
  fecha_edicion: Date | null;
  texto: string;
  votos_up: number;
  votos_down: number;
  avatar_url?: string;
  editado: boolean;
  estado: "aprobado" | "pendiente" | "rechazado";
  respuestas?: Comentario[];
}

export const comentariosData: Comentario[] = [
  {
    id: "1",
    nombre: "Bresman",
    id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
    apellido_paterno: "Pérez",
    fecha_creacion: new Date("2026-04-20T10:30:00"),
    fecha_edicion: null,
    texto:
      "He notado que el alumbrado público en la zona rural ha fallado últimamente. ¿Hay algún plan de mantenimiento programado para esta semana?",
    votos_up: 25,
    votos_down: 2,
    editado: false,
    estado: "aprobado",
    respuestas: [
      {
        id: "1-1",
        nombre: "Javiera",
        apellido_paterno: "González",
        fecha_creacion: new Date("2026-04-20T11:15:00"),
        fecha_edicion: null,
        texto: "En mi sector también estamos a oscuras hace tres días.",
        votos_up: 8,
        votos_down: 0,
        editado: false,
        estado: "aprobado",
      },
      {
        id: "1-2",
        nombre: "Ricardo",
        apellido_paterno: "Lagos",
        fecha_creacion: new Date("2026-04-20T11:20:00"),
        fecha_edicion: null,
        texto: "Es peligroso para los que volvemos tarde del trabajo.",
        votos_up: 5,
        votos_down: 0,
        editado: false,
        estado: "aprobado",
        respuestas: [
          {
            id: "1-2-1",
            nombre: "Bresman",
            id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
            apellido_paterno: "Pérez",
            fecha_creacion: new Date("2026-04-20T12:00:00"),
            fecha_edicion: null,
            texto:
              "Exacto, por eso es urgente que la municipalidad centralice estos reportes en el mapa de incidencias.",
            votos_up: 12,
            votos_down: 0,
            editado: false,
            estado: "aprobado",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    nombre: "Bresman",
    id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
    apellido_paterno: "Pérez",
    fecha_creacion: new Date("2026-04-21T09:10:00"),
    fecha_edicion: null,
    texto:
      "La nueva ordenanza sobre el retiro de escombros no está clara para los vecinos del sector sur. Necesitamos más difusión presencial.",
    votos_up: 42,
    votos_down: 3,
    editado: false,
    estado: "aprobado",
    respuestas: [
      {
        id: "2-1",
        nombre: "Camila",
        apellido_paterno: "Rojas",
        fecha_creacion: new Date("2026-04-21T10:00:00"),
        fecha_edicion: new Date("2026-04-21T10:00:00"),
        texto: "¿Saben si hay multas por dejar sacos de cemento en la vereda?",
        votos_up: 4,
        votos_down: 1,
        editado: true,
        estado: "aprobado",
        respuestas: [
          {
            id: "2-1-1",
            nombre: "Bresman",
            id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
            apellido_paterno: "Pérez",
            fecha_creacion: new Date("2026-04-21T10:30:00"),
            fecha_edicion: null,
            texto:
              "Según el artículo 15 de la nueva ley municipal, sí hay multas. Podrías revisar el PDF en la sección de normativas.",
            votos_up: 15,
            votos_down: 0,
            editado: false,
            estado: "aprobado",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    nombre: "Bresman",
    id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
    apellido_paterno: "Pérez",
    fecha_creacion: new Date("2026-04-21T11:45:00"),
    fecha_edicion: null,
    texto:
      "Propongo implementar un sistema de alertas por WhatsApp para los cortes de agua programados en Santo Domingo.",
    votos_up: 60,
    votos_down: 1,
    editado: false,
    estado: "aprobado",
    respuestas: [
      {
        id: "3-1",
        nombre: "Andrés",
        apellido_paterno: "Soto",
        fecha_creacion: new Date("2026-04-21T12:00:00"),
        fecha_edicion: null,
        texto:
          "Buena idea, pero mucha gente mayor no usa tanto la app. Quizás SMS también.",
        votos_up: 10,
        votos_down: 0,
        editado: false,
        estado: "aprobado",
        respuestas: [
          {
            id: "3-1-1",
            nombre: "Bresman",
            id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
            apellido_paterno: "Pérez",
            fecha_creacion: new Date("2026-04-21T12:45:00"),
            fecha_edicion: null,
            texto:
              "Buen punto, Andrés. Un sistema híbrido sería lo ideal para no dejar a nadie fuera.",
            votos_up: 8,
            votos_down: 0,
            editado: false,
            estado: "aprobado",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    nombre: "Bresman",
    id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
    apellido_paterno: "Pérez",
    fecha_creacion: new Date("2026-04-21T13:20:00"),
    fecha_edicion: null,
    texto:
      "El estado de la señalética en el cruce hacia el litoral es deficiente. Los turistas se pierden y generan congestión innecesaria.",
    votos_up: 33,
    votos_down: 2,
    editado: false,
    estado: "aprobado",
    respuestas: [
      {
        id: "4-1",
        nombre: "Valentina",
        apellido_paterno: "Ríos",
        fecha_creacion: new Date("2026-04-21T14:10:00"),
        fecha_edicion: null,
        texto:
          "Ayer casi hubo un choque por lo mismo, el disco Pare está tapado por un árbol.",
        votos_up: 14,
        votos_down: 0,
        editado: false,
        estado: "aprobado",
        respuestas: [
          {
            id: "4-1-1",
            nombre: "Bresman",
            id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
            apellido_paterno: "Pérez",
            fecha_creacion: new Date("2026-04-21T15:00:00"),
            fecha_edicion: null,
            texto:
              "Voy a subir una foto del árbol al módulo de reportes para que la cuadrilla de áreas verdes lo revise.",
            votos_up: 20,
            votos_down: 0,
            editado: false,
            estado: "aprobado",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    nombre: "Bresman",
    id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
    apellido_paterno: "Pérez",
    fecha_creacion: new Date("2026-04-22T08:30:00"),
    fecha_edicion: null,
    texto:
      "¿Alguien sabe si los talleres deportivos de la muni en el gimnasio central siguen abiertos durante las reparaciones?",
    votos_up: 12,
    votos_down: 0,
    editado: false,
    estado: "aprobado",
    respuestas: [
      {
        id: "5-1",
        nombre: "Soporte Muni",
        apellido_paterno: "Técnico",
        fecha_creacion: new Date("2026-04-22T09:15:00"),
        fecha_edicion: null,
        texto:
          "Se trasladaron temporalmente a la multicancha de la escuela vecina.",
        votos_up: 5,
        votos_down: 0,
        editado: false,
        estado: "aprobado",
        respuestas: [
          {
            id: "5-1-1",
            nombre: "Bresman",
            id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
            apellido_paterno: "Pérez",
            fecha_creacion: new Date("2026-04-22T10:00:00"),
            fecha_edicion: null,
            texto: "Perfecto, gracias por la información. Iré hoy mismo.",
            votos_up: 3,
            votos_down: 0,
            editado: false,
            estado: "aprobado",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    nombre: "Bresman",
    id_user: "fe475a03-d51d-4ca0-8f94-060d9a46530d", 
    apellido_paterno: "Pérez",
    fecha_creacion: new Date("2026-04-22T15:30:00"),
    fecha_edicion: null,
    texto:
      "Excelente la gestión de reciclaje de este mes, pero los contenedores de cartón en el centro se llenan demasiado rápido.",
    votos_up: 19,
    votos_down: 0,
    editado: false,
    estado: "aprobado",
    respuestas: [
      {
        id: "6-1",
        nombre: "Roberto",
        apellido_paterno: "Díaz",
        fecha_creacion: new Date("2026-04-22T16:00:00"),
        fecha_edicion: null,
        texto:
          "Confirmo, a veces la gente deja las cajas fuera y con la humedad se echan a perder.",
        votos_up: 7,
        votos_down: 0,
        editado: false,
        estado: "aprobado",
      },
    ],
  },
];