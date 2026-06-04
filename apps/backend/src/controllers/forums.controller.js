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