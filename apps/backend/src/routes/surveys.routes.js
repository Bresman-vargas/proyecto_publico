import { Router } from "express";

import {
  createSurvey,
  getSurveys,
  getSurveysByUser,
  getSurvey,
  updateSurvey,
} from "../controllers/surveys.controllers.js";

import { validateSchema } from "../middleware/validator.middleware.js";
import { surveySchema } from "@proyecto_publico/schemas";

const survey_router = Router();

survey_router.get("/surveys", getSurveys);
survey_router.get("/users/:userId/surveys", getSurveysByUser);
survey_router.get("/surveys/:id", getSurvey);

survey_router.post("/surveys", validateSchema(surveySchema), createSurvey);
survey_router.patch("/surveys/:id", validateSchema(surveySchema), updateSurvey);

export default survey_router;