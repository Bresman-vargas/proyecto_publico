import { MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCommentsByUserRequest } from "../../api/comments";
import { CommentItem } from "../../components/CommentItem";
import Loader from "../../components/Loader";

export default function UserComments() {
  const { user } = useAuth();
  const [commentsFlat, setCommentsFlat] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserComments = async (isSilent = false) => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    try {
      if (!isSilent) setLoading(true);
      const res = await getCommentsByUserRequest(user.id);
      setCommentsFlat(res.data);
    } catch (error) {
      console.error("Error al cargar tus comentarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserComments(false);
  }, [user]);

  const handleRefreshComments = async () => {
    await fetchUserComments(true);
  };

  if (loading) return <Loader className="h-[calc(100vh-8rem)]" />;


  const estructurarArbol = (lista: any[]) => {
    const listaValida = lista.filter((c) => c && c.id);
    const mapa = new Map(listaValida.map((c) => [c.id, { ...c, respuestas: [] }]));
    const raices: any[] = [];

    for (const item of mapa.values()) {
      if (item.parent_comment_id && mapa.has(item.parent_comment_id)) {
        mapa.get(item.parent_comment_id).respuestas.push(item);
      } else {
        raices.push(item);
      }
    }
    return raices;
  };

  const comentariosEstructurados = estructurarArbol(commentsFlat);

  return (
    <div className="flex justify-center">
      <div className="max-w-3xl w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="h-20 flex flex-col justify-center">
            <h1 className="text-xl font-bold">Mis comentarios</h1>
            <p className="text-txt-sec">
              En esta sección podrás ver tus comentarios
            </p>
          </div>
        </header>

        {comentariosEstructurados.length > 0 ? (
          <section className="bg-bg-sec p-4 rounded-md grid grid-cols-1 gap-4">
            {comentariosEstructurados.map((comment) => (
              <CommentItem 
                comment={comment} 
                key={comment.id} 
                onRefresh={handleRefreshComments} 
              />
            ))}
          </section>
        ) : (
          <div className="bg-bg-sec rounded-md p-10 flex flex-col items-center justify-center border-2 border-border border-dashed">
            <div className="bg-accent/10 p-4 mb-4 rounded-full">
              <MessagesSquare size={36} className="text-accent"/>
            </div>
            <h2 className="text-xl font-bold text-txt">
              Aún no tienes comentarios
            </h2>

            <p className="text-txt-sec mt-2">
              Comienza creando tu primer comentario e interactuar con la
              comunidad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}