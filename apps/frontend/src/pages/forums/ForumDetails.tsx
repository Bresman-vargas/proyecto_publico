import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getForumsRequest } from "../../api/forums";
import { getDiscussionsByForum } from "../../api/discussions";
import Loader from "../../components/Loader";

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
}

export default function ForumDetail() {
  const { id } = useParams();
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
          (f: Forum) => String(f.id) === String(id)
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
          <div className="flex gap-4 items-center bg-green-500/10 border border-green-500/40 rounded-md px-4 py-2">
            <span className="font-bold text-xl text-green-600">
              {discussions.filter((d) => d.is_active).length}
            </span>
            <span className="text-green-600 text-sm">Abiertas</span>
          </div>
          <div className="flex gap-4 items-center bg-gray-500/10 border border-gray-400/40 rounded-md px-4 py-2">
            <span className="font-bold text-xl text-gray-500">
              {discussions.filter((d) => !d.is_active).length}
            </span>
            <span className="text-gray-500 text-sm">Cerradas</span>
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
          <div className="flex flex-col gap-3">
            {discussions.map((dis) => (
              <article
                key={dis.id}
                className="bg-bg-sec border border-border rounded-md p-4 flex flex-col gap-3 hover:border-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base">{dis.title}</h3>
                    {dis.subtitle && (
                      <p className="text-txt-sec text-sm">{dis.subtitle}</p>
                    )}
                  </div>
                  <span
                    className={`text-nowrap text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
                      dis.is_active
                        ? "bg-green-500/10 text-green-600 border-green-500/40"
                        : "bg-gray-500/10 text-gray-500 border-gray-400/40"
                    }`}
                  >
                    ● {dis.is_active ? "Activa" : "Cerrada"}
                  </span>
                </div>

                <p className="text-sm text-txt line-clamp-2">{dis.content}</p>

                {dis.keywords && dis.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {dis.keywords.map((word, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-0.5 bg-accent/10 text-accent rounded-full border border-accent/50"
                      >
                        #{word}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-txt-sec">
                  {dis.nombre && (
                    <span>
                      Por{" "}
                      <span className="font-semibold text-txt">
                        {dis.nombre} {dis.apellido}
                      </span>
                    </span>
                  )}
                  {dis.commentCount !== undefined && (
                    <span>{dis.commentCount} comentarios</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}