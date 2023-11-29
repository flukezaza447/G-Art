import axios from "../config/axios";

export const getDataTag = () => axios.get("/tag/getTag");

export const createTage = formData => axios.post("/tag/createTage", formData);

export const deleteTag = tagId => axios.delete(`/tag/${tagId}`);
