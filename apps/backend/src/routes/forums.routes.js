import { Router } from "express";
import { getForums, createNewForum, updateForum, deleteForum } from "../controllers/forums.controller.js";
import { forumSchema } from "@proyecto_publico/schemas";

const router = Router();

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
router.patch("/forums/:id", validateSchema(forumSchema), updateForum);
router.delete("/forums/:id", deleteForum);

export default router;