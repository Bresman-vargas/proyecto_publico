import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Ellipsis,
  Flame,
  Hourglass
} from "lucide-react";

interface Comentario {
  id: string;
  nombre: string;
  apellido_paterno: string;
  fecha_creacion: Date;
  fecha_edicion: Date | null;
  texto: string;
  votos_up: number;
  votos_down: number;
  avatar_url: string;
  editado: boolean;
  estado: "aprobado" | "pendiente" | "rechazado";
  respuestas?: Comentario[]; // <-- Nueva propiedad opcional
}

const comentariosData: Comentario[] = [
  {
    id: "1",
    nombre: "Bresman",
    apellido_paterno: "Pérez",
    fecha_creacion: new Date("2026-04-20T10:30:00"),
    fecha_edicion: null,
    texto: "Me parece una excelente iniciativa para mejorar la transparencia en Santo Domingo. ¡Hacia falta un espacio así!",
    votos_up: 25,
    votos_down: 2,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bresman",
    editado: false,
    estado: "aprobado",
    respuestas: [
      {
        id: "1-1",
        nombre: "Javiera",
        apellido_paterno: "González",
        fecha_creacion: new Date("2026-04-20T11:15:00"),
        fecha_edicion: null,
        texto: "¡Totalmente! Hacía falta algo así en la muni.",
        votos_up: 8,
        votos_down: 0,
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Javiera",
        editado: false,
        estado: "aprobado",
        respuestas: [
          {
            id: "1-1-1",
            nombre: "Andrés",
            apellido_paterno: "Soto",
            fecha_creacion: new Date("2026-04-20T12:00:00"),
            fecha_edicion: null,
            texto: "Ojalá que el soporte técnico sea rápido y no se caiga cuando subamos reportes.",
            votos_up: 3,
            votos_down: 1,
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andres",
            editado: false,
            estado: "aprobado",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    nombre: "Roberto",
    apellido_paterno: "Díaz",
    fecha_creacion: new Date("2026-04-21T09:10:00"),
    fecha_edicion: null,
    texto: "El soporte para React en la plataforma móvil está funcionando muy fluido. La integración con Tailwind v4 se nota en la velocidad de carga de los estilos.",
    votos_up: 42,
    votos_down: 3,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    editado: false,
    estado: "aprobado",
  },
  {
    id: "3",
    nombre: "Carla",
    apellido_paterno: "Méndez",
    fecha_creacion: new Date("2026-04-21T11:45:00"),
    fecha_edicion: new Date("2026-04-21T12:00:00"),
    texto: "¿Alguien sabe si se pueden adjuntar fotos de baches en las calles? Intenté subir una pero me dio un error de formato.",
    votos_up: 12,
    votos_down: 1,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla",
    editado: true,
    estado: "aprobado",
    respuestas: [
      {
        id: "3-1",
        nombre: "Soporte Muni",
        apellido_paterno: "Técnico",
        fecha_creacion: new Date("2026-04-21T12:15:00"),
        fecha_edicion: null,
        texto: "Hola Carla, por ahora solo aceptamos JPG y PNG hasta 5MB. Estamos trabajando para habilitar formatos HEIC de iPhone.",
        votos_up: 15,
        votos_down: 0,
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        editado: false,
        estado: "aprobado",
      }
    ]
  },
  {
    id: "4",
    nombre: "Sebastián",
    apellido_paterno: "Tapia",
    fecha_creacion: new Date("2026-04-21T13:20:00"),
    fecha_edicion: null,
    texto: "La sección de votación ciudadana debería tener un filtro por sector (Litoral vs Campo). Sería más útil para los vecinos.",
    votos_up: 56,
    votos_down: 4,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian",
    editado: false,
    estado: "aprobado",
  },
  {
    id: "5",
    nombre: "Usuario",
    apellido_paterno: "Anónimo",
    fecha_creacion: new Date("2026-04-21T14:05:00"),
    fecha_edicion: null,
    texto: "Este comentario está pendiente de revisión por el sistema de moderación de contenido.",
    votos_up: 0,
    votos_down: 0,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anon",
    editado: false,
    estado: "pendiente",
  },
  {
    id: "6",
    nombre: "Valentina",
    apellido_paterno: "Ríos",
    fecha_creacion: new Date("2026-04-21T15:30:00"),
    fecha_edicion: null,
    texto: "Me gusta mucho el modo oscuro de la app, se nota el trabajo en la UI con Ionic. ¡Sigan así!",
    votos_up: 19,
    votos_down: 0,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
    editado: false,
    estado: "aprobado",
  }
];

export default function Comments() {
  return (
    <div className="flex justify-center">
      <div className="max-w-3xl">
        <header className="flex items-center justify-between mb-4">
          <div className="h-20 flex flex-col justify-center">
            <h1 className="text-xl font-bold">Mis comentarios</h1>
            <p className="text-txt-sec">
              En esta sección podrás ver tus comentarios
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex gap-2 text-txt-sec hover:text-accent cursor-pointer bg-bg border border-border px-4 py-1 rounded-md">
              <Flame /> Más famosos
            </button>
            <button className="flex gap-2 text-txt-sec hover:text-accent cursor-pointer bg-bg border border-border px-4 py-1 rounded-md">
              <Hourglass />
              Más reciente
            </button>
          </div>
        </header>

        <section className="bg-bg-sec p-4 rounded-md grid grid-cols-1 gap-4">
          {comentariosData.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </section>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  isReply = false,
}: {
  comment: Comentario;
  isReply?: boolean;
}) {
  return (
    <div className={`flex flex-col ${isReply ? "mt-2" : ""}`}>
      <div
        className="flex flex-col justify-between bg-bg p-4 rounded-md border border-border"
        key={comment.id}
      >
        <header className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center text-bg bg-accent size-8 rounded-full">
              {sliceTetxt(comment.nombre)}
            </div>
            <p className="font-bold">{comment.nombre}</p>
            <p className="text-txt-sec">
              {formatDate(comment.fecha_creacion.toString())}
            </p>
            {comment.editado && (
              <div className="flex items-center gap-4">
                <Dot className="text-accent" />
                <p className="text-txt-sec">
                  Editado el{" "}
                  {formatDate(comment.fecha_edicion?.toString() || "")}
                </p>
              </div>
            )}
          </div>
          <Ellipsis className="cursor-pointer" />
        </header>
        <aside className="my-4">{comment.texto}</aside>
        <footer className="flex justify-between">
          <div className="flex gap-2">
            <div className="flex items-center gap-2 text-txt-sec bg-bg-sec px-2 rounded-md">
              <ArrowBigUp size={20} />
              {comment.votos_up}
            </div>
            <div className="flex items-center gap-2 text-txt-sec bg-bg-sec px-2 rounded-md">
              <ArrowBigDown size={20} />
              {comment.votos_up}
            </div>
          </div>
          {!isReply && <p className="text-accent cursor-pointer">Respuestas</p>}
        </footer>
      </div>
      {comment.respuestas && comment.respuestas.length > 0 && (
        <div className="ml-4 mt-2 border-l-2 border-border pl-4">
          {comment.respuestas.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );
}

function sliceTetxt(text: string | undefined) {
  return text?.slice(0, 2);
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
