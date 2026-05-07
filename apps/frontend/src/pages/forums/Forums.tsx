import { Anchor } from "lucide-react";
import { Link } from "react-router-dom";

interface ForumData {
  id: number;
  categoria: string;
  titulo: string;
  discusiones: number;
  etiqueta: string;
  descripcion: string;
  imagen: string;
}

const forosData: ForumData[] = [
  {
    id: 1,
    categoria: "Medio Ambiente",
    titulo: "Áreas Verdes, Parques y convivencia",
    discusiones: 120,
    etiqueta: "foro de comunicación",
    descripcion: "Espacio para debatir sobre el cuidado de nuestros parques, propuestas para nuevas áreas verdes y normas de convivencia en espacios públicos de la comuna.",
    imagen: "https://comoli.es/wp-content/uploads/2023/12/creacion-espacios-verdes-foto.jpg"
  },
  {
    id: 2,
    categoria: "Seguridad",
    titulo: "Seguridad Ciudadana y Prevención",
    discusiones: 345,
    etiqueta: "foro vecinal",
    descripcion: "Foro destinado a coordinar acciones preventivas, reportar luminarias en mal estado y proponer mejoras en la seguridad de los barrios.",
    imagen: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    categoria: "Infraestructura",
    titulo: "Tránsito, Transporte y Movilidad",
    discusiones: 210,
    etiqueta: "foro de transporte",
    descripcion: "Debate sobre el transporte público local, estado de calles, creación de ciclovías y problemas de congestión vehicular.",
    imagen: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    categoria: "Servicios",
    titulo: "Gestión de Residuos y Reciclaje",
    discusiones: 89,
    etiqueta: "foro sustentable",
    descripcion: "Consultas sobre los horarios del camión recolector, puntos limpios disponibles y estrategias para mejorar el reciclaje municipal.",
    imagen: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    categoria: "Urbanismo",
    titulo: "Desarrollo Urbano y Obras Públicas",
    discusiones: 156,
    etiqueta: "foro de proyectos",
    descripcion: "Información y opiniones ciudadanas sobre las nuevas obras en la comuna, permisos de edificación y consultas sobre el plan regulador.",
    imagen: "https://images.unsplash.com/photo-1541888081628-6623bc164104?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    categoria: "Comunidad",
    titulo: "Salud Pública y Bienestar Animal",
    discusiones: 274,
    etiqueta: "foro de salud",
    descripcion: "Espacio de información sobre vacunatorios, atención en los recintos de salud municipales y campañas de tenencia responsable de mascotas.",
    imagen: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Forums() {
  return (
    <div>
      <header className="py-3 gap-5 flex flex-col md:flex-row items-start justify-between">
        <div className="">
          <h1 className="text-xl font-bold">Foros</h1>
          <p className="text-txt-sec">
            En este lugar podras visualizar todo tipo de Foros
          </p>
        </div>
        <Link
          to="/papu"
          className="border w-full md:w-fit border-border px-5 py-2 bg-bg text-ok font-bold rounded-md flex justify-center gap-4 capitalize"
        >
          {" "}
          <Anchor /> Crear un foro{" "}
        </Link>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-bg-sec p-4">
        {forosData.map((foro) => (
          <section key={foro.id} className="w-full grid grid-cols-3 border-2 border-border rounded-md">
            <div className="col-span-2 bg-bg rounded-l-md p-3 flex flex-col gap-2">
              <div className="">
                <p className="text-txt-sec capitalize"> {foro.categoria}</p>
                <h2 className="font-bold text-xl">
                  {" "}
                  {foro.titulo}{" "}
                </h2>
              </div>
              <div className="flex gap-4 ">
                <p className="text-txt-sec"> ({foro.discusiones} Discusiones)</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="text-sm px-4 py-1 bg-accent/10 text-accent rounded-full border border-accent/50">
                  {foro.etiqueta}
                </div>
              </div>
              <p className="py-5">
                {foro.descripcion}
              </p>
            </div>
            <aside className="flex flex-col justify-between ">
              {" "}
              <img
                src={foro.imagen}
                alt={foro.titulo}
                className="h-full object-cover bg-linear-to-t from-bg to-transparent"
              />{" "}
              <footer className="p-2 grid grid-cols-2">
                <p> Abierto </p>
                <p> Cerrado </p>
              </footer>{" "}
            </aside>
          </section>
        ))}
      </section>
    </div>
  );
}