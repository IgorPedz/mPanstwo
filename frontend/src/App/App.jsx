import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";

import DashboardPage from "../pages/MainPages/DashboardPage";
import CoursesPage from "../pages/EducationPages/CoursesPage";
import AuthPage from "../pages/AuthPages/AuthPage";
import DocumentsPage from "../pages/InfoPages/DocumentsPage";
import ContactPage from "../pages/InfoPages/ContactPage";
import FAQPage from "../pages/InfoPages/FAQPage";
import ProfilePage from "../pages/ProfilPages/ProfilePage";
import AchievementsPage from "../pages/ProfilPages/AchievementsPage";
import SurveyBoxPage from "../pages/ProfilPages/SurveyBoxPage";
import NotificationsPage from "../pages/ProfilPages/NotificationsPage";
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage";
import CourseMapPage from "../pages/EducationPages/CourseMapPage";
import LessonPage from "../pages/EducationPages/LessonPage";
import MinistryPage from "../pages/InstitutionPages/MinistryPage";
import PresidentPage from "../pages/InstitutionPages/PresidentPage";
import SejmPage from "../pages/InstitutionPages/SejmPage";
import MpListPage from "../pages/InstitutionPages/MpListPage";
import MpProfilePage from "../pages/InstitutionPages/MpProfilePage";
import SenatPage from "../pages/InstitutionPages/SenatPage";
import JudicialPage from "../pages/InstitutionPages/JudicialPage";
import ClubsPage from "../pages/InstitutionPages/ClubsPage";
import LegislacjaPage from "../pages/InstitutionPages/LegislacjaPage";
import LegislacjaDetailPage from "../pages/InstitutionPages/LegislacjaDetailPage";
import FactsPage from "../pages/InfoPages/FactsPage";
import { useUser } from "../Contexts/UserContext";
import useNotifications from "../Hooks/useUnreadNotification";
import ProtectedRoute from "../Utils/Routes/ProtectedRoutes";
import PublicRoute from "../Utils/Routes/PublicRoutes";

import Layout from "../components/Layout/Layout";

import { initSocket } from "../lib/socket/socketClient";
import { initSocketListeners } from "../lib/socket/socketListeners";
import { useFollowStore } from "../store/useFollowStore";

function App() {
  const { user } = useUser();
  const syncFollows = useFollowStore((s) => s.syncFromServer);

  useNotifications(user?.id);

  useEffect(() => {
    document.documentElement.classList.remove("no-transition");
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    syncFollows(user.id);
  }, [user?.id, syncFollows]);

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
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseMapPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/:courseId/lesson/:lessonId"
            element={
              <ProtectedRoute>
                <LessonPage />
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

          <Route
            path="/ministry/:slug"
            element={
              <ProtectedRoute>
                <MinistryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/president"
            element={
              <ProtectedRoute>
                <PresidentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sejm"
            element={
              <ProtectedRoute>
                <SejmPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sejm/mp"
            element={
              <ProtectedRoute>
                <MpListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sejm/mp/:id"
            element={
              <ProtectedRoute>
                <MpProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/senat"
            element={
              <ProtectedRoute>
                <SenatPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courts/:slug"
            element={
              <ProtectedRoute>
                <JudicialPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clubs"
            element={
              <ProtectedRoute>
                <ClubsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/legislation"
            element={
              <ProtectedRoute>
                <LegislacjaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/legislation/:num"
            element={
              <ProtectedRoute>
                <LegislacjaDetailPage />
              </ProtectedRoute>
            }
          />

          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/facts" element={<FactsPage />} />

          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
