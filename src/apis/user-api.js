import axios from "../config/axios";

export const updateProfile = formData => axios.patch("/user", formData);

export const updateUserInfo = input => axios.patch("/user/info", input);
