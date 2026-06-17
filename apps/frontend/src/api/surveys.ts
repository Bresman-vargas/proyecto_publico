import axios from "./axios";

export const getSurveys = async (userId?: string) => {
  const response = await axios.get("/surveys", {
    params: {
      userId,
    },
  });

  return response.data;
};

export const createSurvey = async (survey: unknown) => {
  const response = await axios.post("/surveys", survey);
  return response.data;
};

export const editSurvey = async (survey: any) => {
  const response = await axios.patch(`/surveys/${survey.id}`, survey);
  return response.data;
};

export const getSurveyId = async (id: string) => {
  const response = await axios.get(`/surveys/${id}`);
  return response.data;
};

export const surveysByUser = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/surveys`);
  return response.data;
};

export const voteSurvey = async ({
  surveyId,
  option_id,
  user_id,
}: {
  surveyId: string;
  option_id: string;
  user_id: string;
}) => {
  const response = await axios.post(`/surveys/${surveyId}/vote`, {
    option_id,
    user_id,
  });

  return response.data;
};

export const surveysByDiscussion = async (
  discussionId: string,
  userId?: string,
) => {
  const response = await axios.get(`/discussions/${discussionId}/surveys`, {
    params: {
      userId,
    },
  });

  return response.data;
};

