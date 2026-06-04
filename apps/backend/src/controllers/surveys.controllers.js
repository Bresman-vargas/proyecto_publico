import * as surveyService from "../services/surveys.services.js";

export const createSurvey = async (req, res) => {
  try {
    const newSurvey = await surveyService.createSurveyService(req.body);

    return res.status(201).json(newSurvey);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear la encuesta",
    });
  }
};

export const getSurveys = async (req, res) => {
  try {
    const surveys = await surveyService.getAllSurveysService();

    return res.status(200).json(surveys);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener las encuestas",
    });
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

    return res.status(500).json({
      message: "Error al obtener las encuestas del usuario",
    });
  }
};

export const getSurvey = async (req, res) => {
  try {
    const survey = await surveyService.getSurveyByIdService(req.params.id);

    return res.status(200).json(survey);
  } catch (error) {
    if (error.message === "SURVEY_NOT_FOUND") {
      return res.status(404).json({
        message: "Encuesta no encontrada",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Error al obtener la encuesta",
    });
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
      return res.status(404).json({
        message: "Encuesta no encontrada",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Error al actualizar la encuesta",
    });
  }
};