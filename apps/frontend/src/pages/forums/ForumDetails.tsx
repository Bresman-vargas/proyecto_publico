import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getForumsRequest } from "../../api/forums";
import { getDiscussionsByForum } from "../../api/discussions";
import Loader from "../../components/Loader";
import DiscussionCard from "../../components/DiscussionsCard"; // <-- Importamos tu tarjeta

interface Forum {
  id: number;
  titulo: string;
  categoria: string;
  descripcion: string;
  imagen: string;
}

interface Discussion {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  is_active: boolean;
  keywords?: string[];
  nombre?: string;
  apellido?: string;
  commentCount?: number;
  created_at?: string;
  updated_at?: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "No especificada";
  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function ForumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foro, setForo] = useState<Forum | null>(null);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [forosData, discussionsData] = await Promise.all([
          getForumsRequest(),
          getDiscussionsByForum(id!),
        ]);

        const foroEncontrado = forosData.find(
          (f: Forum) => String(f.id) === String(id),
        );

        if (!foroEncontrado) {
          setError("Foro no encontrado");
          return;
        }

        setForo(foroEncontrado);
        setDiscussions(discussionsData);
      } catch (err) {
        setError("Error al cargar el foro");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Manejador para cuando hacen click en la discusión para expandir/ver comentarios
  const handleExpand = (discussionId: string | number) => {
    navigate(`/comments/${discussionId}`);
  };

  if (loading) return <Loader className="h-[calc(100vh-8rem)]" />;

  if (error || !foro) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-err">{error ?? "Foro no encontrado"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Banner + Avatar */}
      <div className="relative">
        <div className="w-full h-24 rounded-md bg-linear-to-r from-accent/40 to-accent/10 border border-border" />
        <Link
          to="/explore"
          className="absolute top-3 right-3 flex items-center gap-2 text-white text-sm bg-black/30 hover:bg-black/50 px-3 py-1 rounded-md transition-colors"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
        <div className="absolute -bottom-16 left-6">
          <img
            src={foro.imagen}
            alt={foro.titulo}
            className="w-32 h-32 rounded-full object-cover border-4 border-bg-sec shadow-md"
          />
        </div>
      </div>

      {/* Info principal */}
      <section className="bg-bg-sec rounded-md border border-border p-6 pt-20 flex flex-col gap-4">
        <div>
          <p className="text-accent capitalize text-sm">{foro.categoria}</p>
          <h1 className="font-bold text-3xl">{foro.titulo}</h1>
        </div>
        <p className="text-txt-sec">{foro.descripcion}</p>
        <div className="flex flex-wrap gap-4 pt-2 border-t border-border">
          <div className="flex gap-4 items-center bg-bg border border-border rounded-md px-4 py-2">
            <span className="font-bold text-xl">{discussions.length}</span>
            <span className="text-txt-sec text-sm">Discusiones</span>
          </div>
        </div>
      </section>

      {/* Sección discusiones */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Discusiones</h2>
          <Link
            to={`/discussions/new/${id}`}
            className="border border-border px-4 py-2 bg-bg font-bold rounded-md flex items-center gap-2 text-sm hover:bg-accent/10 transition-colors"
          >
            <MessageSquarePlus size={16} className="text-accent" />
            Nueva discusión
          </Link>
        </div>

        {discussions.length === 0 ? (
          <p className="text-txt-sec text-center py-10">
            No hay discusiones en este foro aún.
          </p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {discussions.map((dis) => {
              const adaptedDis = {
                ...dis,
                id: String(dis.id),
                category: foro.categoria,
                // Aseguramos que keywords se mapee correctamente si viene del backend
                keywords: dis.keywords || [],
              };

              return (
                <DiscussionCard
                  key={dis.id}
                  dis={adaptedDis as any}
                  devMode={true} // Evita que aparezca el menú de editar/eliminar (Ellipsis)
                  showStatus={false} // Oculta por completo la badge de estado (Activo/No activo)
                  onExpand={() => handleExpand(dis.id)}
                >
                  {/* El bloque "Ver más" que contiene EXCLUSIVAMENTE las fechas */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-bg-sec p-4 m-2 border border-border rounded-md animate-in fade-in duration-300">
                    <p className="font-bold text-nowrap truncate">Inicio:</p>
                    <p className="text-txt-sec text-nowrap truncate">
                      {formatDate(dis.created_at)}
                    </p>

                    <p className="font-bold text-nowrap truncate">Término:</p>
                    <p className="text-txt-sec text-nowrap truncate">
                      {formatDate(dis.updated_at)}
                    </p>
                  </div>
                </DiscussionCard>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
