import { createContext, useEffect, useState } from "react";
import { getDataPost, getCreatePostById } from "../apis/post-api";

export const PostContext = createContext();

export default function PostContextProvider({ children }) {
  const [postData, setPostData] = useState([]);
  // console.log("postData:", postData);

  useEffect(() => {
    const fetchCreateRoom = async () => {
      const res = await getDataPost();
      setPostData(res?.data?.pureCreatePost);
    };
    fetchCreateRoom();
  }, []);

  return (
    <PostContext.Provider value={{ postData }}>{children}</PostContext.Provider>
  );
}
