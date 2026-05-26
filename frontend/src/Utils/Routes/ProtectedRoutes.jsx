import { Navigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useUser();
  const { t } = useTranslation();

  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center">{t("common.loading")}</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}