import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquarePlus, Pencil, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { forumSchema } from "@proyecto_publico/schemas";
import InputForm from "../../components/InputForm";
import TextAreaForm from "../../components/TextAreaForm";
import SelectForm from "../../components/SelectForm";

type ForumFormData = z.infer<typeof forumSchema>;

interface ForumData {
  id: number;
  categoria: string;
  titulo: string;
  discusiones: number;
  abiertas: number;
  cerradas: number;
  descripcion: string;
  imagen: string;
}

const categoriasOptions = [
  { value: "Medio Ambiente", label: "Medio Ambiente" },
  { value: "Seguridad", label: "Seguridad" },
  { value: "Infraestructura", label: "Infraestructura" },
  { value: "Servicios", label: "Servicios" },
  { value: "Urbanismo", label: "Urbanismo" },
  { value: "Comunidad", label: "Comunidad" },
];

const toTitleCase = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

const toSentenceCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());

const forosData: ForumData[] = [
  {
    id: 1,
    categoria: "Medio Ambiente",
    titulo: "Áreas Verdes, Parques y convivencia",
    discusiones: 120,
    abiertas: 73,
    cerradas: 47,
    descripcion:
      "Espacio para debatir sobre el cuidado de nuestros parques, propuestas para nuevas áreas verdes y normas de convivencia en espacios públicos de la comuna.",
    imagen:
      "https://comoli.es/wp-content/uploads/2023/12/creacion-espacios-verdes-foto.jpg",
  },
  {
    id: 2,
    categoria: "Seguridad",
    titulo: "Seguridad Ciudadana y Prevención",
    discusiones: 345,
    abiertas: 198,
    cerradas: 147,
    descripcion:
      "Foro destinado a coordinar acciones preventivas, reportar luminarias en mal estado y proponer mejoras en la seguridad de los barrios.",
    imagen:
      "https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    categoria: "Infraestructura",
    titulo: "Tránsito, Transporte y Movilidad",
    discusiones: 210,
    abiertas: 134,
    cerradas: 76,
    descripcion:
      "Debate sobre el transporte público local, estado de calles, creación de ciclovías y problemas de congestión vehicular.",
    imagen:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    categoria: "Servicios",
    titulo: "Gestión de Residuos y Reciclaje",
    discusiones: 89,
    abiertas: 42,
    cerradas: 47,
    descripcion:
      "Consultas sobre los horarios del camión recolector, puntos limpios disponibles y estrategias para mejorar el reciclaje municipal.",
    imagen:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    categoria: "Urbanismo",
    titulo: "Desarrollo Urbano y Obras Públicas",
    discusiones: 156,
    abiertas: 89,
    cerradas: 67,
    descripcion:
      "Información y opiniones ciudadanas sobre las nuevas obras en la comuna, permisos de edificación y consultas sobre el plan regulador.",
    imagen:
      "https://www.ecologiapolitica.info/wp-content/uploads/2014/07/santiago-chile.jpg",
  },
  {
    id: 6,
    categoria: "Comunidad",
    titulo: "Salud Pública y Bienestar Animal",
    discusiones: 274,
    abiertas: 155,
    cerradas: 119,
    descripcion:
      "Espacio de información sobre vacunatorios, atención en los recintos de salud municipales y campañas de tenencia responsable de mascotas.",
    imagen:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Forums() {
  const [foroEditando, setForoEditando] = useState<ForumData | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForumFormData>({
    resolver: zodResolver(forumSchema),
    mode: "onChange",
  });

  const forosFiltrados = forosData.filter((foro) => {
    const texto = busqueda.toLowerCase();
    return (
      foro.titulo.toLowerCase().includes(texto) ||
      foro.categoria.toLowerCase().includes(texto) ||
      foro.descripcion.toLowerCase().includes(texto)
    );
  });

  const abrirModal = (foro: ForumData) => {
    setForoEditando(foro);
    reset({
      titulo: foro.titulo,
      categoria: foro.categoria,
      descripcion: foro.descripcion,
      imagen: foro.imagen,
    });
  };

  const cerrarModal = () => {
    setForoEditando(null);
    reset();
  };

  const onSubmit = (data: ForumFormData) => {
    console.log("Foro editado:", data);
    cerrarModal();
  };

  return (
    <div>
      <header className="py-3 gap-3 flex flex-col md:flex-row items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">Foros</h1>
          <p className="text-txt-sec">
            En este lugar podras visualizar todo tipo de Foros
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-fit">
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-sec" />
            <input
              type="text"
              placeholder="Buscar foro..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-border bg-bg rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <Link
            to="/newforum"
            className="border w-full md:w-fit border-border px-5 py-2 bg-bg font-bold rounded-md flex justify-center gap-4 capitalize"
          >
            <MessageSquarePlus className="text-accent" /> Crear un foro
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-bg-sec p-4">
        {forosFiltrados.length === 0 ? (
          <p className="text-txt-sec col-span-2 text-center py-10">
            No se encontraron foros para "{busqueda}"
          </p>
        ) : (
          forosFiltrados.map((foro) => (
            <section
              key={foro.id}
              className="w-full grid grid-cols-1 md:grid-cols-3 border-2 border-border rounded-md overflow-hidden"
            >
              <div className="col-span-2 bg-bg rounded-l-md rounded-tr-md rounded-br-md p-3 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-accent capitalize">{foro.categoria}</p>
                    <h2 className="font-bold text-xl">{foro.titulo}</h2>
                  </div>
                  <button
                    onClick={() => abrirModal(foro)}
                    className="flex items-center justify-center w-8 h-8 border border-border rounded-md text-accent bg-bg hover:bg-accent/10 transition-colors flex-shrink-0"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
                <div className="flex gap-4">
                  <p className="text-txt-sec">({foro.discusiones} Discusiones)</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1 text-sm px-3 py-1 bg-green-500/10 text-green-600 rounded-full border border-green-500/40">
                    ● {foro.abiertas} Abiertas
                  </span>
                  <span className="flex items-center gap-1 text-sm px-3 py-1 bg-gray-500/10 text-gray-500 rounded-full border border-gray-400/40">
                    ● {foro.cerradas} Cerradas
                  </span>
                </div>
                <p className="py-5">{foro.descripcion}</p>
              </div>

              <aside className="row-start-1 flex flex-col w-full w-fit justify-between">
                <img
                  src={foro.imagen}
                  alt={foro.titulo}
                  className="w-full h-48 md:h-full object-cover"
                />
              </aside>
            </section>
          ))
        )}
      </section>

      {foroEditando && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={cerrarModal}
        >
          <section
            className="w-full max-w-2xl bg-bg-sec border border-border rounded-md p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-2xl">Editar Foro</h2>
              <button
                onClick={cerrarModal}
                className="text-txt-sec hover:text-accent transition-colors"
              >
                <X />
              </button>
            </div>
            <p className="text-txt-sec pb-4">
              Modifica los datos del foro y guarda los cambios.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-bg border border-border px-4 rounded-md py-8">
              <InputForm
                label="Título del Foro"
                name="titulo"
                register={register}
                errors={errors}
                require
                onChange={(e) => {
                  e.target.value = toTitleCase(e.target.value);
                  register("titulo").onChange(e);
                }}
              />

              <SelectForm
                label="Categoría"
                name="categoria"
                register={register}
                errors={errors}
                options={categoriasOptions}
                placeholder="Selecciona una categoría"
                require
              />

              <TextAreaForm
                label="Descripción"
                name="descripcion"
                register={register}
                errors={errors}
                require
                onChange={(e) => {
                  e.target.value = toSentenceCase(e.target.value);
                  register("descripcion").onChange(e);
                }}
              />

              <InputForm
                label="URL de Imagen"
                name="imagen"
                placeholder="https://ejemplo.com/imagen.jpg"
                register={register}
                errors={errors}
                require
              />

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="border border-border px-4 py-2 rounded-md text-txt-sec hover:bg-bg transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="border border-border px-4 py-2 rounded-md bg-bg text-accent font-bold flex items-center gap-2 hover:bg-accent/10 transition-colors text-sm"
                >
                  <Pencil size={14} /> Guardar cambios
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}