import axios from "../config/axios";

export const CreatePost = formData => axios.post("/post/createPost", formData);

export const getDataPost = () => axios.get("/post/getCreatePost");

export const unlike = postId => axios.delete(`/post/${postId}/likes`);
export const createLike = postId => axios.post(`/post/${postId}/likes`);

export const getCreatePostById = userId =>
  axios.get(`/post/getCreatePost/${userId}`);

export const createComment = input =>
  axios.post(`/post/${input.postId}/comments`, input);

export const editComment = input =>
  axios.post(`/post/${input.postId}/editComments`, input);

export const deleteCommentId = input =>
  axios.delete(`/post/${input.id}`, { params: { userId: input.userId } });
