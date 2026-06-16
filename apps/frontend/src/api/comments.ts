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

export const voteCommentRequest = (
  commentId: string,
  voteData: { user_id: string; type: "up" | "down" },
) => axios.post(`/comments/${commentId}/vote`, voteData);

export const deleteCommentRequest = (commentId: string) =>
  axios.delete(`/comments/${commentId}`);

export const updateCommentRequest = (
  commentId: string,
  commentData: { content: string },
) => axios.put(`/comments/${commentId}`, commentData);
