import axios from "../config/axios";

export const requestFollow = userId => axios.post(`/follow/${userId}/`);
export const deleteFollow = followId => axios.delete(`/follow/${followId}/`);
