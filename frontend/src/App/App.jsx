import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";

import DashboardPage from "../pages/MainPages/DashboardPage";
import AuthPage from "../pages/AuthPages/AuthPage";
import DocumentsPage from "../pages/InfoPages/DocumentsPage";
import ContactPage from "../pages/InfoPages/ContactPage";
import FAQPage from "../pages/InfoPages/FAQPage";
import ProfilePage from "../pages/ProfilPages/ProfilePage";
import AchievementsPage from "../pages/ProfilPages/AchievementsPage";
import SurveyBoxPage from "../pages/ProfilPages/SurveyBoxPage";
import NotificationsPage from "../pages/ProfilPages/NotificationsPage";
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage"
import { useUser } from "../Contexts/UserContext";
import useNotifications from "../Hooks/useUnreadNotification";
import ProtectedRoute from "../Utils/Routes/ProtectedRoutes";
import PublicRoute from "../Utils/Routes/PublicRoutes";

import Layout from "../components/Layout/Layout";

import { initSocket } from "../lib/socket/socketClient";
import { initSocketListeners } from "../lib/socket/socketListeners";

function App() {
  const { user } = useUser();

  useNotifications(user?.id);

  // Remove no-transition class on app initialization to enable animations
  useEffect(() => {
    document.documentElement.classList.remove("no-transition");
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const socket = initSocket(user.id);

    initSocketListeners();

    return () => {
      socket?.disconnect();
    };
  }, [user?.id]);
  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/achievements"
            element={
              <ProtectedRoute>
                <AchievementsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/survey-box"
            element={
              <ProtectedRoute>
                <SurveyBoxPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />

          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
