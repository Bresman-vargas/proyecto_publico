import { Router } from "express";
import {
  createSurvey,
  getSurveys,
  getSurvey,
  getSurveysByUser,
  updateSurvey,
  deleteSurvey,
  voteSurveyOption,
} from "../controllers/surveys.controllers.js";

import { validateSchema } from "../middleware/validator.middleware.js";
import { surveySchema } from "@proyecto_publico/schemas";

const survey_router = Router();

survey_router.get("/surveys", getSurveys);
survey_router.get("/surveys/:id", getSurvey);
survey_router.get("/users/:userId/surveys", getSurveysByUser);

survey_router.post("/surveys", validateSchema(surveySchema), createSurvey);

survey_router.patch("/surveys/:id", validateSchema(surveySchema), updateSurvey);

survey_router.delete("/surveys/:id", deleteSurvey);

survey_router.post("/surveys/:id/options/:optionId/vote", voteSurveyOption);

export default survey_router;