import { Navigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";

const ALLOWED = ["Ekspert"];

export default function ExpertRoute({ children }) {
  const { user } = useUser();

  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Ładowanie...</div>;
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!ALLOWED.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return children;
}
