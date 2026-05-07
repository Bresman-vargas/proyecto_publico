import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Flame,
  Hourglass,
  Ellipsis,
  Pencil,
  Trash2,
  Maximize2,
  MessagesSquare,
} from "lucide-react";
import { useState } from "react";
import { comentariosData, type Comentario } from "./HarcoComments";

import { useAuth } from "../../context/AuthContext";

export default function Comments() {
  return (
    <div className="flex justify-center">
      <div className="max-w-3xl">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="h-20 flex flex-col justify-center">
            <h1 className="text-xl font-bold">Mis comentarios</h1>
            <p className="text-txt-sec">
              En esta sección podrás ver tus comentarios
            </p>
          </div>
          <div className="grid grid-cols-2 md:flex gap-4">
            <button className="flex justify-center gap-2 text-txt-sec hover:text-accent cursor-pointer bg-bg border border-border px-4 py-1 rounded-md">
              <Flame /> Más famosos
            </button>
            <button className="flex justify-center gap-2 text-txt-sec hover:text-accent cursor-pointer bg-bg border border-border px-4 py-1 rounded-md">
              <Hourglass />
              Más reciente
            </button>
          </div>
        </header>

        {comentariosData.length > 0 ? (
          <section className="bg-bg-sec p-4 rounded-md grid grid-cols-1 gap-4">
            {comentariosData.map((comment) => (
              <CommentItem comment={comment} key={comment.id} />
            ))}
          </section>
        ) : (
          <div className="bg-bg-sec rounded-md p-10 flex flex-col items-center justify-center border-2 border-border border-dashed">
            <div className="bg-bg p-4 mb-4 rounded-full text-txt/30">
              <MessagesSquare size={60}/>
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

function CommentItem({
  comment,
  isReply = false,
}: {
  comment: Comentario;
  isReply?: boolean;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const hasReplies = comment.respuestas && comment.respuestas.length > 0;
  const { user } = useAuth();
  return (
    <div className={`flex flex-col ${isReply ? "mt-2" : ""}`}>
      <div
        className="flex flex-col justify-between bg-bg p-4 rounded-md border border-border"
        key={comment.id}
      >
        <header className="flex justify-between">
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center text-bg bg-accent size-8 rounded-full">
                {sliceTetxt(comment.nombre)}
              </div>
              <p className="font-bold">{comment.nombre}</p>
              <p className="text-txt-sec">
                {formatDate(comment.fecha_creacion.toString())}
              </p>
              {comment.editado && (
                <div className="flex items-center gap-4">
                  <Dot className="text-accent" />
                  <p className="text-txt-sec">
                    Editado el{" "}
                    {formatDate(comment.fecha_edicion?.toString() || "")}
                  </p>
                </div>
              )}
            </div>
            {user && user.id === comment.id_user && (
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-1 cursor-pointer"
                >
                  <Ellipsis size={20} className="text-txt-sec" />
                </button>

                {showOptions && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowOptions(false)}
                    />
                    <div className="absolute right-0 mt-2 w-32 bg-bg border border-border rounded-md z-50 overflow-hidden">
                      <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-bg-sec text-left cursor-pointer">
                        <Maximize2 size={14} /> Editar
                      </button>
                      <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-bg-sec text-left cursor-pointer">
                        <Pencil size={14} /> Editar
                      </button>
                      <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-err/10 text-err text-left cursor-pointer">
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div></div>
        </header>
        <aside className="my-4">{comment.texto}</aside>
        <footer className="flex justify-between">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 text-txt-sec bg-bg-sec px-2 rounded-md cursor-pointer hover:text-ok">
              <ArrowBigUp size={20} />
              {comment.votos_up}
            </button>
            <button className="flex items-center gap-2 text-txt-sec bg-bg-sec px-2 rounded-md cursor-pointer hover:text-err">
              <ArrowBigDown size={20} />
              {comment.votos_up}
            </button>
          </div>
          <div className="flex items-center gap-5">
            {hasReplies && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-accent text-xs font-semibold hover:underline cursor-pointer"
              >
                {showReplies
                  ? "Ocultar respuestas"
                  : `${comment.respuestas?.length} Respuestas`}
              </button>
            )}
          </div>
        </footer>
      </div>
      {showReplies && hasReplies && (
        <div className="relative ml-6 mt-2 isolate">
          <div className="absolute left-0 top-0 bottom-0 w-1 h-full border-l-2 border-accent z-10" />

          <div>
            {comment.respuestas?.map((reply) => (
              <div key={reply.id} className="relative pl-6">
                <div className="absolute left-0 top-0 w-5 h-20 border-l-2 border-b-2 rounded-bl-2xl border-accent -z-10" />
                <CommentItem comment={reply} isReply={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function sliceTetxt(text: string | undefined) {
  return text?.slice(0, 2);
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
