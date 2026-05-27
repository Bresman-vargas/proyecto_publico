import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios"; // Ajusta la ruta si es necesario para tu axios configurado
import { CommentItem, type Comentario } from "../../components/CommentItem"; // Ajusta la ruta a tu componente
import { MessageSquarePlus} from "lucide-react";
import Loader from "../../components/Loader";

function buildCommentTree(flatComments: Comentario[]): Comentario[] {
  const map: { [key: string]: Comentario } = {};
  const roots: Comentario[] = [];

  // 1. Inicializar el mapa con copias limpias y la propiedad respuestas vacía
  flatComments.forEach((comment) => {
    map[comment.id] = { ...comment, respuestas: [] };
  });

  // 2. Estructurar la relación Padre -> Hijo
  flatComments.forEach((comment) => {
    const mappedComment = map[comment.id];
    
    if (mappedComment.parent_comment_id) {
      // Si tiene padre, lo metemos en la propiedad respuestas del padre
      const parent = map[mappedComment.parent_comment_id];
      if (parent) {
        parent.respuestas = parent.respuestas || [];
        parent.respuestas.push(mappedComment);
      }
    } else {
      // Si no tiene padre, es un comentario raíz
      roots.push(mappedComment);
    }
  });

  return roots;
}

export default function Comments() {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/discussions/${id}/comments`);
        const structuredTree = buildCommentTree(response.data);
        setComments(structuredTree);
        setError(null);
      } catch (err) {
        console.error("Error al cargar los comentarios:", err);
        setError("No se pudieron cargar los comentarios de esta discusión.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  if (loading) return <Loader className="h-[calc(100vh-8rem)]"/>

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold border-b border-border pb-2 text-txt">
        Comentarios de la discusión
      </h2>

      {/* 3. Renderizado Condicional: No hay comentarios */}
      {comments.length === 0 ? (
        <section className="flex flex-col items-center justify-center p-12 bg-bg-sec border-2 border-dashed border-border rounded-md text-center gap-4 my-4">
          <div className="p-4 bg-accent/10 text-accent rounded-full">
            <MessageSquarePlus size={36} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-txt">Aún no hay comentarios</h3>
            <p className="text-txt-sec text-sm max-w-sm">
              Nadie ha iniciado el debate en este foro todavía. ¡Aprovecha la oportunidad y sé el primero en expresar tu opinión!
            </p>
          </div>
          {/* Aquí podrías poner el botón o el formulario directamente para crear el primer comentario */}
          <button className="mt-2 px-4 py-2 bg-accent text-bg font-semibold rounded-md shadow-sm hover:bg-accent/90 transition-colors text-sm cursor-pointer">
            Escribir un comentario
          </button>
        </section>
      ) : (
        /* 4. Renderizado Condicional: Sí hay comentarios */
        <div className="flex flex-col gap-4 p-4 bg-bg-sec border border-border rounded-md">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}