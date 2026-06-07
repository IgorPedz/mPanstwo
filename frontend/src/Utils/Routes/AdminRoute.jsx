import { Navigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";

export default function AdminRoute({ children }) {
  const { user } = useUser();

  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Ładowanie...</div>;
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== "Administrator") return <Navigate to="/dashboard" replace />;

  return children;
}
