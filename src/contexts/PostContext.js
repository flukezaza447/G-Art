import { createContext, useEffect, useState } from "react";
import { getDataPost, getCreatePostById } from "../apis/post-api";

export const PostContext = createContext();

export default function PostContextProvider({ children }) {
  const [postData, setPostData] = useState([]);
  // console.log("postData:", postData);

  useEffect(() => {
    const fetchCreatePost = async () => {
      const res = await getDataPost();
      setPostData(res?.data?.pureCreatePost);
    };
    fetchCreatePost();
  }, []);

  return (
    <PostContext.Provider value={{ postData, setPostData }}>
      {children}
    </PostContext.Provider>
  );
}
