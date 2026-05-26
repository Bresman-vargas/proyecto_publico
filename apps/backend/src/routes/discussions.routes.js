import { Router } from "express";
import {
  createDiscussion,
  getDiscussionsByUser,
  getDiscussion,
  deleteDiscussion,
  updateDiscussion,
  updateState
} from "../controllers/discussions.controllers.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { discussionSchema } from "@proyecto_publico/schemas";

const discussion_router = Router();

discussion_router.get("/users/:userId/discussions", getDiscussionsByUser);
discussion_router.get("/discussions/:id", getDiscussion);
discussion_router.post("/discussions", validateSchema(discussionSchema), createDiscussion);
discussion_router.patch("/discussions/:id", validateSchema(discussionSchema), updateDiscussion);
discussion_router.patch("/discussions/:id/status", updateState);
discussion_router.delete("/discussions/:id", deleteDiscussion);

export default discussion_router;
