import { useContext } from "react";
import { TagContext } from "../contexts/TagContext";

export default function useTag() {
  return useContext(TagContext);
}
