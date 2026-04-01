import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user?.token || user.token === "null" || user.token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
