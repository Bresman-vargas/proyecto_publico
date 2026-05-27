import * as commentService from "../services/comment.services.js";

export const createComment = async (req, res) => {
  try {
    const newComment = await commentService.createCommentService(req.body);
    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el comentario" });
  }
};

export const getCommentsByDiscussion = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByDiscussionService(req.params.discussionId);
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los comentarios" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await commentService.deleteCommentService(req.params.id);
    return res.status(200).json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    if (error.message === "COMMENT_NOT_FOUND") {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    return res.status(500).json({ message: "Error al eliminar el comentario" });
  }
};

export const voteComment = async (req, res) => {
  const { type, user_id } = req.body; 
  
  if (type !== "up" && type !== "down") {
    return res.status(400).json({ message: "Tipo de voto inválido. Use 'up' o 'down'." });
  }
  if (!user_id) {
    return res.status(400).json({ message: "El ID de usuario es requerido para votar." });
  }

  try {
    const result = await commentService.voteCommentService(req.params.id, user_id, type);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al procesar el voto" });
  }
};