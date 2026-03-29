import { Navigate } from "react-router-dom";

export default function RedirectIfLoggedIn({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/user/home" replace />;
  }

  return children;
}
