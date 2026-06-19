import { useState } from "react";
import SurveyCommentCard from "./SurveyCommentCard";
import {
  Ellipsis,
  Pencil,
  Trash2,
  ArrowBigUp,
  ArrowBigDown,
  Reply,
  Send,
  X,
  PenLine,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import * as apiComments from "../api/comments";
import Loader from "./Loader";

export interface Comentario {
  id: string;
  content: string;
  discussion_id: string;
  user_id: string;
  parent_comment_id: string | null;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
  nombre_usuario: string;
  comment_type?: "text" | "survey";
  is_pinned?: boolean;
  survey?: {
    id: string;
    title: string;
    description: string;
    user_id: string;
    creator_name?: string | null;
    date_start?: string | null;
    date_end?: string | null;
    has_voted?: boolean;
    voted_option_id?: string | null;
    options: {
      id: string;
      texto: string;
      votes: number;
    }[];
  } | null;
  respuestas?: Comentario[];
}
interface CommentItemProps {
  comment: Comentario;
  isReply?: boolean;
  onRefresh: () => void;
}

export function CommentItem({
  comment,
  isReply = false,
  onRefresh,
}: CommentItemProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const [showReplies, setShowReplies] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { user } = useAuth();
  const hasReplies = comment.respuestas && comment.respuestas.length > 0;
  const isEdited = comment.created_at !== comment.updated_at;

  const handleVote = async (voteType: "up" | "down") => {
    if (!user) {
      alert("Debes iniciar sesión para votar.");
      return;
    }

    try {
      setIsProcessing(true);

      await apiComments.voteCommentRequest(comment.id, {
        user_id: user.id,
        type: voteType,
      });

      await onRefresh();
    } catch (error) {
      console.error(`Error al registrar el voto (${voteType}):`, error);
      alert("No se pudo registrar tu voto.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !user) return;

    try {
      setIsProcessing(true);

      await axios.post("/comments", {
        content: replyContent,
        discussion_id: comment.discussion_id,
        user_id: user.id,
        parent_comment_id: comment.id,
      });

      setReplyContent("");
      setIsReplying(false);

      await onRefresh();
      setShowReplies(true);
    } catch (error) {
      console.error("Error al responder el comentario:", error);
      alert("No se pudo enviar la respuesta.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este comentario?",
    );
    if (!confirmDelete) return;

    try {
      setIsProcessing(true);
      setShowOptions(false);

      await apiComments.deleteCommentRequest(comment.id);

      await onRefresh();
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
      alert("No se pudo eliminar el comentario. Inténtalo de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    try {
      setIsProcessing(true);

      await apiComments.updateCommentRequest(comment.id, {
        content: editContent,
      });

      setIsEditing(false);
      await onRefresh();
    } catch (error) {
      console.error("Error al editar el comentario:", error);
      alert("No se pudo actualizar el comentario.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`flex flex-col ${isReply ? "mt-2" : ""}`}>
      <div className="relative flex flex-col justify-between bg-bg p-4 rounded-md border border-border">
        {isProcessing && (
          <div className="absolute inset-0 bg-bg/80 flex rounded-md items-center justify-center z-50">
            <Loader className="h-[calc(100vh-8rem)]" />
          </div>
        )}
        <header className="flex justify-between">
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center text-bg bg-accent size-8 rounded-full font-bold uppercase text-xs">
                {sliceText(comment.nombre_usuario)}
              </div>
              <p className="font-bold">{comment.nombre_usuario}</p>
              <p className="text-txt-sec text-sm">
                {formatDate(comment.created_at)}
              </p>
            </div>

            {user && user.id === comment.user_id && !comment.survey && (
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-1 cursor-pointer hover:bg-bg-sec rounded"
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
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setEditContent(comment.content);
                          setShowOptions(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-bg-sec text-left cursor-pointer"
                      >
                        <Pencil size={14} /> Editar
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-err/10 text-err text-left cursor-pointer"
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        <aside className="my-4 text-wrap">
          {isEditing ? (
            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col gap-2 w-full"
            >
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={2}
                disabled={isProcessing}
                className="w-full bg-bg-sec border border-border rounded-md p-2 text-sm focus:outline-none focus:border-accent resize-none text-txt placeholder:text-txt-sec"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md border border-border text-txt-sec bg-bg hover:bg-bg-sec cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isProcessing || !editContent.trim()}
                  className="px-4 py-2 bg-accent/80 text-bg text-xs border-transparent font-semibold rounded-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <PenLine size={14} />
                  Guardar cambios
                </button>
              </div>
            </form>
          ) : comment.survey ? (
            <SurveyCommentCard survey={comment.survey} onRefresh={onRefresh} />
          ) : (
            <p className="whitespace-pre-wrap">{comment.content}</p>
          )}
        </aside>

        <footer className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => handleVote("up")}
              className="flex items-center gap-1 text-txt-sec bg-bg-sec px-2 py-1 rounded-md cursor-pointer hover:text-ok text-sm"
            >
              <ArrowBigUp size={18} />
              {comment.upvotes}
            </button>
            <button
              onClick={() => handleVote("down")}
              className="flex items-center gap-1 text-txt-sec bg-bg-sec px-2 py-1 rounded-md cursor-pointer hover:text-err text-sm"
            >
              <ArrowBigDown size={18} />
              {comment.downvotes}
            </button>

            {user && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md cursor-pointer transition-colors ${
                  isReplying
                    ? "bg-err/10 text-err"
                    : "text-txt-sec bg-bg-sec hover:text-accent"
                }`}
              >
                {isReplying ? <X size={14} /> : <Reply size={14} />}
                {isReplying ? "Cancelar" : "Responder"}
              </button>
            )}
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

        {isReplying && (
          <form
            onSubmit={handleReplySubmit}
            className="mt-4 pt-4 border-t border-border flex flex-col gap-2"
          >
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={`Responder a ${comment.nombre_usuario}...`}
                rows={2}
                disabled={isProcessing}
                className="w-full bg-bg-sec border border-border rounded-md p-2 text-sm focus:outline-none focus:border-accent resize-none text-txt placeholder:text-txt-sec"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isProcessing || !replyContent.trim()}
                className="px-3 py-2 w-fit bg-accent text-bg rounded-md hover:bg-accent/90 transition-colors text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={14} />
                {isProcessing ? "Enviando..." : "Responder"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Renderizado Recursivo de Comentarios Hijos */}
      {showReplies && hasReplies && (
        <div className="relative ml-6 mt-2 isolate">
          <div className="absolute left-0 top-0 bottom-0 w-1 h-full border-l-2 border-border z-10" />
          <div className="flex flex-col gap-2">
            {comment.respuestas?.map((reply) => (
              <div key={reply.id} className="relative pl-6">
                <div className="absolute left-0 top-0 w-5 h-10 border-l-2 border-b-2 rounded-bl-xl border-border -z-10" />
                <CommentItem
                  comment={reply}
                  isReply={true}
                  onRefresh={onRefresh}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function sliceText(text: string | undefined): string {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
