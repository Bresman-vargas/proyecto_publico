import * as discussionService from "../services/discussion.services.js";
export const createDiscussion = async (req, res) => {
  try {
    const newDiscussion = await discussionService.createDiscussionService(
      req.body,
    );
    return res.status(201).json(newDiscussion);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear una discusion" });
  }
};

export const getDiscussionsByUser = async (req, res) => {
  try {
    const discussion = await discussionService.getAllDiscussionByUserService(
      req.params.userId,
    );
    return res.status(200).json(discussion);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener las discusiones" });
  }
};

export const getDiscussion = async (req, res) => {
  try {
    const discussion = await discussionService.getDiscussionByIdService(
      req.params.id,
    );
    return res.status(200).json(discussion);
  } catch (error) {
    if (error.message === "DISCUSSION_NOT_FOUND") {
      return res.status(404).json({ message: "Discusión no encontrada" });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateDiscussion = async (req, res) => {
  try {
    const updated = await discussionService.updateDiscussionService(
      req.params.id,
      req.body,
    );
    return res.status(200).json(updated);
  } catch (error) {
    if (error.message === "DISCUSSION_NOT_FOUND") {
      return res.status(404).json({ message: "Discusión no encontrada" });
    }
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar la discusión" });
  }
};

export const updateState = async (req, res) => {
  try {
    const updated = await discussionService.updateDiscussionStateService(
      req.params.id,
    );
    return res.status(200).json(updated);
  } catch (error) {
    if (error.message === "DISCUSSION_NOT_FOUND") {
      return res.status(404).json({ message: "Discusión no encontrada" });
    }
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar la discusión" });
  }
};

export const deleteDiscussion = async (req, res) => {
  try {
    await discussionService.deleteDiscussionService(req.params.id);
    return res.status(200).json({ message: "Discusión eliminada con éxito" });
  } catch (error) {
    if (error.message === "DISCUSSION_NOT_FOUND") {
      return res.status(404).json({ message: "Discusión no encontrada" });
    }
    return res.status(500).json({ message: "Error al eliminar la discusión" });
  }
};

export const getDiscussionsByForum = async (req, res) => {
  try {
    const { forumId } = req.params;
    const discussions =
      await discussionService.getDiscussionsByForumService(forumId);
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
