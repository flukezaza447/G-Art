import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login, getMe } from "../apis/auth-api";
import { updateProfile, getUserInfoById } from "../apis/user-api";
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

  const [getUserData, setGetUserData] = useState([]);
  // console.log("getUserData:", getUserData);

  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchUserInfoById = async () => {
      try {
        if (authenticateUser && authenticateUser.id) {
          const res = await getUserInfoById(authenticateUser.id);
          // console.log("getUserInfoById", res.data);
          setGetUserData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserInfoById();
  }, [authenticateUser]);

  const refreshUserData = async () => {
    try {
      setIsLoading(true);
      if (authenticateUser && authenticateUser.id) {
        const res = await getUserInfoById(authenticateUser.id);
        setGetUserData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        setAuthenticatedUser,
        getMe,
        getUserData,
        setGetUserData,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
