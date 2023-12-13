import { createContext, useEffect, useState } from "react";
import { getDataTag } from "../apis/tag-api";

export const TagContext = createContext();

export default function TagContextProvider({ children }) {
  const [dataTag, setDataTag] = useState([]);
  // console.log("dataTag:", dataTag);

  useEffect(() => {
    const fetchTagData = async () => {
      const res = await getDataTag();
      setDataTag(res.data.tags);
    };
    fetchTagData();
  }, []);

  return (
    <TagContext.Provider value={{ dataTag, setDataTag }}>
      {children}
    </TagContext.Provider>
  );
}
