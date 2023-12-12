import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RedirectAdmin({ children }) {
  const { authenticateUser } = useAuth();
  if (authenticateUser && authenticateUser.isAdmin === false) {
    return <Navigate to={"/"} />;
  }
  return children;
}
