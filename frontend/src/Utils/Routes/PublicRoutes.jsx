import { Navigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";

export default function PublicRoute({ children }) {
  const { isAuthenticated, user } = useUser();
  const { t } = useTranslation();

  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center">{t("common.loading")}</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}