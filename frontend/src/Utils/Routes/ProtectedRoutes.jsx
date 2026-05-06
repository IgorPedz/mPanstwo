import { Navigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useUser();

  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center">Ładowanie...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}