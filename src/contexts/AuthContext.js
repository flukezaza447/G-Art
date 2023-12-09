import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login, getMe } from "../apis/auth-api";
import { getUserInfoById } from "../apis/user-api";
import { updateProfile, updatecoverImage } from "../apis/user-api";

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authenticateUser, setAuthenticatedUser] = useState(
    getAccessToken() ? true : null
  );
  // console.log("authenticateUser", authenticateUser.id);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await getMe();
        // console.log("getMe", res);
        setAuthenticatedUser(res.data.user);
      } catch (err) {
        removeAccessToken();
      }
    };
    if (getAccessToken) {
      fetchAuthUser();
    }
  }, []);

  const userLogin = async (email, password) => {
    const res = await login({ email, password });
    setAccessToken(res.data.accessToken);
    setAuthenticatedUser(jwtDecode(res.data.accessToken));
  };

  const logout = () => {
    removeAccessToken();
    setAuthenticatedUser(null);
  };

  const userUpdateProfile = async data => {
    const res = await updateProfile(data);
    setAuthenticatedUser({ ...authenticateUser, ...res.data });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        userLogin,
        logout,
        userUpdateProfile,
        setAuthenticatedUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
