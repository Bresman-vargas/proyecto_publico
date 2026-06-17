import { Router } from "express";
import {
  createComment,
  getCommentsByDiscussion,
  deleteComment,
  voteComment,
  getCommentsByUser,
  updateComment,
  createSurveyComment,
} from "../controllers/comments.controllers.js";

import { validateSchema } from "../middleware/validator.middleware.js";
import { commentSchema } from "@proyecto_publico/schemas";

const comment_router = Router();

comment_router.get("/discussions/:discussionId/comments", getCommentsByDiscussion);
comment_router.get("/users/:userId/comments", getCommentsByUser);

comment_router.post("/comments", validateSchema(commentSchema), createComment);
comment_router.put("/comments/:id", updateComment);

comment_router.post("/comments/:id/vote", voteComment);
comment_router.delete("/comments/:id", deleteComment);

comment_router.post(
  "/discussions/:discussionId/survey-comment",
  createSurveyComment,
);

export default comment_router;