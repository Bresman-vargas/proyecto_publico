import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessagesSquare, ArrowLeft } from "lucide-react";
import { getCommentsByDiscussionRequest } from "../../api/comments";
import { useAuth } from "../../context/AuthContext";
import { CommentItem } from "../../components/CommentItem";
import CommentForm from "../../components/CommentForm";
import Loader from "../../components/Loader";

export default function Comments() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = (user as any)?.rol === "admin";

  const [commentsFlat, setCommentsFlat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async (isSilent = false) => {
    if (!id) return;

    try {
      if (!isSilent) setLoading(true);

      const data = await getCommentsByDiscussionRequest(id, user?.id);

      setCommentsFlat(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(false);
  }, [id, user?.id]);

  const handleCommentSubmitting = () => {
    setIsSubmitting(true);
  };

  const handleNewCommentAdded = async () => {
    await fetchComments(true);
    setIsSubmitting(false);
  };

  const estructurarArbol = (lista: any[]) => {
    const listaValida = lista.filter((c) => c && c.id);

    const mapa = new Map(
      listaValida.map((c) => [c.id, { ...c, respuestas: [] }]),
    );

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

  if (loading || isSubmitting) {
    return <Loader className="h-[calc(100vh-8rem)]" />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)} // Navega a la página anterior en el historial
          className="flex items-center justify-center p-2 rounded-full hover:bg-bg-sec text-text transition-colors cursor-pointer"
          aria-label="Volver atrás"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Conversación</h1>
      </div>

      {id && (
        <div className="bg-bg-sec p-4 rounded-md">
          <CommentForm
            discussionId={id}
            onCommentCreated={handleNewCommentAdded}
            onSubmitting={handleCommentSubmitting}
          />

          {isAdmin && (
            <button
              type="button"
              onClick={() => navigate(`/surveys/new?discussionId=${id}`)}
              className="mt-3 w-full rounded-md border border-border bg-bg px-4 py-2 font-bold text-accent hover:bg-bg-sec cursor-pointer"
            >
              Crear encuesta para esta discusión
            </button>
          )}
        </div>
      )}

      <section className="flex flex-col gap-4">
        {comentariosEstructurados.length > 0 ? (
          comentariosEstructurados.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment.id}
              onRefresh={handleNewCommentAdded}
            />
          ))
        ) : (
          <div className="bg-bg-sec rounded-md p-20 flex flex-col items-center justify-center border-2 border-border border-dashed">
            <div className="bg-accent/10 p-4 mb-4 rounded-full text-accent">
              <MessagesSquare size={36} />
            </div>

            <h2 className="text-xl font-bold text-txt">
              Aún no hay comentarios
            </h2>

            <p className="text-txt-sec mt-2 w-100 text-center text-pretty">
              Sé el primero en iniciar la conversación escribiendo un comentario
              público arriba.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
