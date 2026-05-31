import axios from "./axios";

export const getCommentsByDiscussionRequest = (discussionId: string) =>
  axios.get(`/discussions/${discussionId}/comments`);

export const getCommentsByUserRequest = (userId: string) =>
  axios.get(`/users/${userId}/comments`);

export const createCommentRequest = (commentData: {
  content: string;
  discussion_id: string;
  user_id: string;
  parent_comment_id?: string | null;
}) => axios.post("/comments", commentData);
