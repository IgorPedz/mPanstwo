import { Navigate } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";

export default function PublicRoute({ children }) {
  const { isAuthenticated, user } = useUser();

  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center">Ładowanie...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}