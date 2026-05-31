import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessagesSquare } from "lucide-react";
import { getCommentsByDiscussionRequest } from "../../api/comments";
import { CommentItem } from "../../components/CommentItem";
import CommentForm from "../../components/CommentForm";
import Loader from "../../components/Loader";

export default function Comments() {
  const { id } = useParams(); 
  const [commentsFlat, setCommentsFlat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para la carga al agregar un nuevo comentario

  const fetchComments = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await getCommentsByDiscussionRequest(id);
      setCommentsFlat(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // Convierte la lista plana a la jerarquía de árbol
  const estructurarArbol = (lista: any[]) => {
    const mapa = new Map(lista.map((c) => [c.id, { ...c, respuestas: [] }]));
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

  // Callback para cuando se presiona el botón y se empieza el proceso de subida en CommentForm
  const handleCommentSubmitting = () => {
    setIsSubmitting(true);
  };

  // Callback ejecutado cuando CommentForm crea exitosamente el comentario en la Base de Datos
  const handleNewCommentAdded = (newComment: any) => {
    setCommentsFlat((prev) => [...prev, newComment]);
    setIsSubmitting(false); // Quitamos el loader una vez añadido
  };

  if (loading) return <Loader />;

  const comentariosEstructurados = estructurarArbol(commentsFlat);

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-6">
      <h1 className="text-xl font-bold">Conversación</h1>

      {/* Formulario Principal para Comentarios Raíz */}
      {id && (
        <div className="bg-bg-sec p-4 rounded-md">
          <CommentForm 
            discussionId={id} 
            onCommentCreated={handleNewCommentAdded}
            onSubmitting={handleCommentSubmitting}
            // Puedes pasar un prop opcional si quieres controlar el envío desde el hijo,
            // o simplemente dejas que cargue visualmente en la lista de abajo con el bloque de isSubmitting
          />
        </div>
      )}

      {/* Si se está enviando un nuevo comentario, muestra el Loader arriba de la sección */}
      {isSubmitting && (
        <div className="flex justify-center py-4">
          <Loader />
        </div>
      )}

      {/* Renderizado del Árbol de Comentarios o Mensaje de Vacío */}
      <section className="flex flex-col gap-4">
        {comentariosEstructurados.length > 0 ? (
          comentariosEstructurados.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))
        ) : (
          /* Estado Vacío Adaptado */
          <div className="bg-bg-sec rounded-md p-20 flex flex-col items-center justify-center border-2 border-border border-dashed">
            <div className="bg-accent/10 p-4 mb-4 rounded-full text-accent">
              <MessagesSquare size={36} />
            </div>
            <h2 className="text-xl font-bold text-txt">
              Aún no hay comentarios
            </h2>
            <p className="text-txt-sec mt-2 w-100 text-center text-pretty">
              Sé el primero en iniciar la conversación escribiendo un comentario público arriba.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}