import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // If not logged in, redirect to login
  if (!user?.token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // If user is not admin, redirect home with a message
  if (user?.type !== "admin") {
    return (
      <Navigate
        to="/"
        replace
        state={{
          notice:
            "Access denied: Admins only. You have been redirected to Homepage.",
        }}
      />
    );
  }

  return children;
}
