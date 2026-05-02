export interface DiscussionData {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  isActive: boolean;
  reason: string;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  keywords: string[];
  category: string;
  commentCount: number;
  nombre: string;
  apellido: string;
}

export const discussions: DiscussionData[] = [
  {
    id: "dsc_88293",
    title: "Mejora de luminarias en Plaza Las Flores",
    subtitle: "Proyecto de seguridad ciudadana y eficiencia energética",
    content:
      "Se propone el cambio de las luminarias actuales por tecnología LED de alta potencia para mejorar la visibilidad nocturna en el sector norte de la plaza.",
    isActive: false,
    reason: "Resuelto",
    resolvedAt: "2026-04-15T14:30:00Z",
    createdAt: "2026-04-01T09:00:00Z",
    updatedAt: "2026-04-15T14:30:00Z",
    keywords: ["Seguridad", "Infraestructura", "Iluminación"],
    category: "Obras Públicas",
    commentCount: 24,
    nombre: "Bresman",
    apellido: "Pérez",
  },
  {
    id: "dsc_88294",
    title: "Campaña de Vacunación Veterinaria",
    subtitle: "Operativo gratuito para mascotas del sector sur",
    content:
      "Solicitamos coordinar un operativo de vacunación antirrábica y desparasitación para los perros y gatos de la junta de vecinos N°4.",
    isActive: true,
    reason: "En Proceso",
    resolvedAt: null,
    createdAt: "2026-04-10T11:20:00Z",
    updatedAt: "2026-04-12T16:45:00Z",
    keywords: ["Mascotas", "Salud", "Comunidad"],
    category: "Medio Ambiente",
    commentCount: 15,
    nombre: "Bresman",
    apellido: "Soto",
  },
  {
    id: "dsc_88295",
    title: "Reparación de Ciclovía Costanera",
    subtitle: "Mantenimiento por baches en tramo principal",
    content:
      "La ciclovía presenta grietas peligrosas a la altura del balneario. Es necesario un reasfaltado urgente.",
    isActive: true,
    reason: "Pendiente",
    resolvedAt: null,
    createdAt: "2026-04-14T08:00:00Z",
    updatedAt: "2026-04-14T08:00:00Z",
    keywords: ["Deporte", "Vialidad", "Mantención"],
    category: "Tránsito",
    commentCount: 8,
    nombre: "Bresman",
    apellido: "Contreras",
  },
  {
    id: "dsc_88296",
    title: "Talleres de Robótica Municipal",
    subtitle: "Propuesta de cursos de tecnología para jóvenes",
    content:
      "Buscamos apoyo para financiar kits de Arduino y realizar talleres gratuitos en la biblioteca municipal.",
    isActive: false,
    reason: "Resuelto",
    resolvedAt: "2026-04-16T18:00:00Z",
    createdAt: "2026-03-20T14:30:00Z",
    updatedAt: "2026-04-16T18:00:00Z",
    keywords: ["Educación", "Tecnología", "Juventud"],
    category: "Cultura",
    commentCount: 42,
    nombre: "Bresman",
    apellido: "Fernández",
  },
  {
    id: "dsc_88297",
    title: "Limpieza de Microbasural",
    subtitle: "Denuncia por escombros en Calle Los Alerces",
    content:
      "Se reporta acumulación de basura en sitio eriazo. Se requiere fiscalización y retiro de residuos.",
    isActive: true,
    reason: "Bajo Revisión",
    resolvedAt: null,
    createdAt: "2026-04-16T10:00:00Z",
    updatedAt: "2026-04-17T09:15:00Z",
    keywords: ["Aseo", "Denuncia", "Basura"],
    category: "Seguridad Pública",
    commentCount: 5,
    nombre: "Bresman",
    apellido: "Vargas",
  },
];