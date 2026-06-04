import axios from "./axios";

export const getForumsRequest = async () => {
  const response = await axios.get("/forums");
  return response.data;
};

export const createForumRequest = async (forum: any) => {
  const response = await axios.post("/forums", forum);
  return response.data;
};