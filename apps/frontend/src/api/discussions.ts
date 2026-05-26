import axios from "./axios";

export const discussionsByUser = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/discussions`);
  return response.data;
};

export const createDiscussion = async (discussion: any) => {
  axios.post(`/discussions`, discussion);
};

export const editDiscussion = async (discussion: any) => {
  return axios.patch(`/discussions/${discussion.id}`, discussion);
};

export const editDiscussionState = async (id: string) => {
  const response = await axios.patch(`/discussions/${id}/status`);
  return response.data; 
};

export const getDiscussionId = async (id: string) => {
  const response = await axios.get(`/discussions/${id}`);
  return response.data;
};

export const delateDiscussion = async (id: string) => {
  const response = await axios.delete(`/discussions/${id}`);
  return response.data;
};
