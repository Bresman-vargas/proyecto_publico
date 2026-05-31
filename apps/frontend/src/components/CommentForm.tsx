import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createCommentRequest } from "../api/comments";
import ButtonLoading from "./ButtonLoading";

interface CommentFormProps {
  discussionId: string;
  parentCommentId?: string | null; // Si se pasa, cuenta como una respuesta jerárquica
  onCommentCreated: (newComment: any) => void; // Callback para actualizar la lista en tiempo real
  onSubmitting?: () => void; // <--- AGREGADO: Propiedad opcional para activar el loader global en la vista padre
}

export default function CommentForm({
  discussionId,
  parentCommentId = null,
  onCommentCreated,
  onSubmitting, // <--- AGREGADO: Desestructuración de la nueva prop
}: CommentFormProps) {
  const { user } = useAuth(); // 1. Obtenemos el usuario autenticado de forma segura
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !user?.id) return;

    try {
      if (onSubmitting) onSubmitting();
      setLoading(true);

      const payload = {
        content: content.trim(),
        discussion_id: discussionId,
        user_id: user.id,
        parent_comment_id: parentCommentId,
      };

      const res = await createCommentRequest(payload);
      onCommentCreated(res.data);
      setContent("");
    } catch (error) {
      console.error("Error al publicar el comentario:", error);
      // Opcional: Si falla la petición, forzamos apagar el loader del componente padre pasando un objeto vacío o manejando un callback de error
      onCommentCreated(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full mt-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          parentCommentId
            ? "Escribe una respuesta..."
            : "Escribe un comentario público..."
        }
        className="w-full bg-bg p-3 border border-border rounded-md focus:outline-1 outline-accent/30 text-sm resize-none h-24"
        required
      />
      <div className="flex justify-end">
        <div className="w-32">
          <ButtonLoading loading={loading} isValid={content.trim().length > 0}>
            {parentCommentId ? "Responder" : "Comentar"}
          </ButtonLoading>
        </div>
      </div>
    </form>
  );
}
