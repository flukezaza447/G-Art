import axios from "../config/axios";

export const getDataTag = () => axios.get("/tag/getTag");
