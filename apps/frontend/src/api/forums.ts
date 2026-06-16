import axios from "./axios";

export const getForumsRequest = async () => {
  const response = await axios.get("/forums");
  return response.data;
};

export const createForumRequest = async (forum: any) => {
  const response = await axios.post("/forums", forum);
  return response.data;
};

export const updateForumRequest = async (id: number, forum: any) => {
  const response = await axios.patch(`/forums/${id}`, forum);
  return response.data;
};

export const deleteForumRequest = async (id: number) => {
  const response = await axios.delete(`/forums/${id}`);
  return response.data;
};
