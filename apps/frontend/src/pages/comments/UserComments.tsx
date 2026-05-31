import { MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCommentsByUserRequest } from "../../api/comments";
import { CommentItem } from "../../components/CommentItem";
import Loader from "../../components/Loader";

export default function UserComments() {
  const { user } = useAuth();
  const [commentsTree, setCommentsTree] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserComments = async () => {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getCommentsByUserRequest(user.id);
        const datosPlanos = res.data;

        // --- FUNCIÓN PARA CONVERTIR LISTA PLANA A ÁRBOL DE RESPUESTAS ---
        const mapearComentariosAArbol = (listaPlana: any[]) => {
          // 1. Mapeamos cada comentario agregándole un array vacío de respuestas por defecto
          const mapa = new Map(
            listaPlana.map((c) => [c.id, { ...c, respuestas: [] }]),
          );

          const raices: any[] = [];

          // 2. Armamos la estructura de hijos y nietos
          for (const item of mapa.values()) {
            if (item.parent_comment_id && mapa.has(item.parent_comment_id)) {
              // Si tiene un padre y ese padre está en nuestra lista, lo metemos en sus respuestas
              const padre = mapa.get(item.parent_comment_id);
              padre.respuestas.push(item);
            } else {
              // Si no tiene padre (es un comentario raíz) o el padre no es de este usuario,
              // se considera un elemento principal en esta sección para que no desaparezca de la vista.
              raices.push(item);
            }
          }

          return raices;
        };

        setCommentsTree(mapearComentariosAArbol(datosPlanos));
      } catch (error) {
        console.error("Error al cargar tus comentarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserComments();
  }, [user]);

  if (loading) return <Loader className="h-[calc(100vh-8rem)]" />;

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

        {commentsTree.length > 0 ? (
          <section className="bg-bg-sec p-4 rounded-md grid grid-cols-1 gap-4">
            {commentsTree.map((comment) => (
              <CommentItem comment={comment} key={comment.id} />
            ))}
          </section>
        ) : (
          <div className="bg-bg-sec rounded-md p-10 flex flex-col items-center justify-center border-2 border-border border-dashed">
            <div className="bg-bg p-4 mb-4 rounded-full text-txt/30">
              <MessagesSquare size={60} />
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
