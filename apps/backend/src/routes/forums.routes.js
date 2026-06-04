import { Router } from "express";
import { getForums, createNewForum } from "../controllers/forums.controller.js";
import { forumSchema } from "@proyecto_publico/schemas"; // Importas tu esquema

const router = Router();

// Middleware rapidito para validar con Zod
const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ errors: error.errors });
  }
};

router.get("/forums", getForums);
router.post("/forums", validateSchema(forumSchema), createNewForum);

export default router;