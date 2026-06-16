import * as forumsService from "../services/forums.services.js";

export const getForums = async (req, res) => {
  try {
    const forums = await forumsService.getAllForums();
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener foros" });
  }
};

export const createNewForum = async (req, res) => {
  try {
    const newForum = await forumsService.createForum(req.body);
    res.status(201).json(newForum);
  } catch (error) {
    res.status(500).json({ message: "Error al crear foro" });
  }
};

export const updateForum = async (req, res) => {
  try {
    const updated = await forumsService.updateForum(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Foro no encontrado" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar foro" });
  }
};

export const deleteForum = async (req, res) => {
  try {
    const deleted = await forumsService.deleteForum(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Foro no encontrado" });
    }
    res.status(200).json({ message: "Foro eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar foro" });
  }
};