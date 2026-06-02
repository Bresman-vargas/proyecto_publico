import * as surveyService from "../services/surveys.services.js";

export const createSurvey = async (req, res) => {
  try {
    const newSurvey = await surveyService.createSurveyService(req.body);
    return res.status(201).json(newSurvey);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear la encuesta" });
  }
};

export const getSurveys = async (req, res) => {
  try {
    const surveys = await surveyService.getAllSurveysService();
    return res.status(200).json(surveys);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener las encuestas" });
  }
};

export const getSurvey = async (req, res) => {
  try {
    const survey = await surveyService.getSurveyByIdService(req.params.id);
    return res.status(200).json(survey);
  } catch (error) {
    if (error.message === "SURVEY_NOT_FOUND") {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getSurveysByUser = async (req, res) => {
  try {
    const surveys = await surveyService.getSurveysByUserService(
      req.params.userId,
    );

    return res.status(200).json(surveys);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener las encuestas del usuario" });
  }
};

export const updateSurvey = async (req, res) => {
  try {
    const updatedSurvey = await surveyService.updateSurveyService(
      req.params.id,
      req.body,
    );

    return res.status(200).json(updatedSurvey);
  } catch (error) {
    if (error.message === "SURVEY_NOT_FOUND") {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    console.error(error);
    return res.status(500).json({ message: "Error al actualizar la encuesta" });
  }
};

export const deleteSurvey = async (req, res) => {
  try {
    await surveyService.deleteSurveyService(req.params.id);
    return res.status(200).json({ message: "Encuesta eliminada con éxito" });
  } catch (error) {
    if (error.message === "SURVEY_NOT_FOUND") {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    console.error(error);
    return res.status(500).json({ message: "Error al eliminar la encuesta" });
  }
};

export const voteSurveyOption = async (req, res) => {
  try {
    const result = await surveyService.voteSurveyOptionService({
      surveyId: req.params.id,
      optionId: req.params.optionId,
      userId: req.body.user_id,
    });

    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "SURVEY_OPTION_NOT_FOUND") {
      return res.status(404).json({ message: "Opción no encontrada" });
    }

    console.error(error);
    return res.status(500).json({ message: "Error al votar en la encuesta" });
  }
};